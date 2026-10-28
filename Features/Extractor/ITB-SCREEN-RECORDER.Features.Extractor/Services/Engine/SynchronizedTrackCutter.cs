// ==========================================
// File: Features/Extractor/Services/Engine/SynchronizedTrackCutter.cs
// ==========================================
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Contracts.Keystroke;
using ITB_SCREEN_RECORDER.Features.Extractor.Models;
using Microsoft.Extensions.Logging;

namespace ITB_SCREEN_RECORDER.Features.Extractor.Services
{
    public class SynchronizedTrackCutter : ISynchronizedTrackCutter
    {
        private readonly IDummyVideoGenerator _dummyGenerator;
        private readonly IMediaProbeService _mediaProbeService;
        private readonly IFfmpegBinaryResolver _binaryResolver;
        private readonly IKeystrokeSrtGenerator? _srtGenerator;
        private readonly ILogger<SynchronizedTrackCutter> _logger;
        private static readonly SemaphoreSlim _concurrencyThrottle = new(2, 2);

        public SynchronizedTrackCutter(
            IDummyVideoGenerator dummyGenerator,
            IMediaProbeService mediaProbeService,
            IFfmpegBinaryResolver binaryResolver,
            ILogger<SynchronizedTrackCutter> logger,
            IKeystrokeSrtGenerator? srtGenerator = null)
        {
            _dummyGenerator = dummyGenerator;
            _mediaProbeService = mediaProbeService;
            _binaryResolver = binaryResolver;
            _logger = logger;
            _srtGenerator = srtGenerator;
        }

        public async Task<(string OutputFilePath, bool HasAudio)> CutSynchronizedTrackAsync(
            string stationId,
            SynchronizationPlan plan,
            List<RecordingChunkMetadata> stationChunks,
            string tempOutputDir,
            bool isMultiStation,
            IProgress<(double SecondsProcessed, double Fps, double SpeedMultiplier)>? progress = null,
            CancellationToken ct = default)
        {
            string safeStationId = stationId.Replace('/', '_').Replace('\\', '_');
            var tempManifestFiles = new List<string>();
            string? subtitleTempPath = null;

            // Group all station chunks by DisplayId ("mon-0", "mon-1", etc.)
            var chunksByDisplay = stationChunks
                .GroupBy(c => string.IsNullOrEmpty(c.DisplayId) ? "mon-0" : c.DisplayId.ToLowerInvariant())
                .ToDictionary(g => g.Key, g => g.OrderBy(c => c.StartUtc).ToList());

            string? requestedDisplay = null;
            if (stationId.Contains('/'))
            {
                var parts = stationId.Split('/');
                if (parts.Length > 1 && parts[^1].StartsWith("mon-", StringComparison.OrdinalIgnoreCase))
                {
                    requestedDisplay = parts[^1].ToLowerInvariant();
                }
            }

            string layoutMode = (plan.LayoutMode ?? "director").Trim().ToLowerInvariant();
            if (!string.IsNullOrEmpty(requestedDisplay))
            {
                layoutMode = requestedDisplay;
            }
            else if (!string.IsNullOrEmpty(plan.TargetDisplayId))
            {
                layoutMode = plan.TargetDisplayId.Trim().ToLowerInvariant();
            }

            bool hasMultipleDisplays = chunksByDisplay.Count > 1;
            bool isMultiDisplayLayout = hasMultipleDisplays && (layoutMode == "split" || layoutMode == "pip");

            var probeCache = new Dictionary<string, ProbedStationMetadata>(StringComparer.OrdinalIgnoreCase);

            async Task<ProbedStationMetadata> GetChunkProbeAsync(RecordingChunkMetadata? chunk)
            {
                if (chunk == null || string.IsNullOrEmpty(chunk.FullPath) || !File.Exists(chunk.FullPath))
                    return new ProbedStationMetadata();

                if (probeCache.TryGetValue(chunk.FullPath, out var cached))
                    return cached;

                var probed = await _mediaProbeService.ProbeMediaFileDirectlyAsync(chunk.FullPath, stationId, ct);
                probeCache[chunk.FullPath] = probed;
                return probed;
            }

            DateTime cutStartUtc = plan.ActiveSegments.FirstOrDefault()?.StartUtc ?? DateTime.UtcNow;
            DateTime cutEndUtc = plan.ActiveSegments.LastOrDefault()?.EndUtc ?? DateTime.UtcNow;

            async Task<ProbedStationMetadata> GetBaselineProbeForChunksAsync(List<RecordingChunkMetadata> chunks)
            {
                ProbedStationMetadata baselineProbe;
                if (chunks.Count > 0)
                {
                    var representativeChunk = chunks
                        .Where(c => !string.IsNullOrEmpty(c.FullPath) && File.Exists(c.FullPath))
                        .OrderBy(c => Math.Abs((c.StartUtc - cutStartUtc).TotalSeconds))
                        .FirstOrDefault();

                    baselineProbe = await GetChunkProbeAsync(representativeChunk);
                }
                else
                {
                    baselineProbe = await _mediaProbeService.GetOrProbeStationMetadataAsync(stationId, cutStartUtc, cutEndUtc, ct);
                }

                if (!baselineProbe.HasAudio && chunks.Count > 0)
                {
                    foreach (var ch in chunks.Take(5))
                    {
                        var p = await GetChunkProbeAsync(ch);
                        if (p.HasAudio)
                        {
                            baselineProbe.HasAudio = true;
                            baselineProbe.AudioSampleRate = p.AudioSampleRate;
                            baselineProbe.AudioChannels = p.AudioChannels;
                            break;
                        }
                    }
                }
                return baselineProbe;
            }

            async Task<(string ManifestPath, List<double> CutJunctions, double RunningSeconds)> BuildManifestForDisplayAsync(
                string dispId,
                List<RecordingChunkMetadata> chunks,
                ProbedStationMetadata probe,
                bool trackHasAudio,
                bool enforceGaps)
            {
                string? masterDummyPath = null;
                var manifestLines = new List<string> { "ffconcat version 1.0" };
                var cutJunctions = new List<double>();
                double runningSeconds = 0;

                async Task AppendDummyGapAsync(double gapSeconds)
                {
                    if ((!isMultiStation && !enforceGaps) || gapSeconds <= 0.02) return;

                    if (masterDummyPath == null)
                    {
                        try
                        {
                            masterDummyPath = await _dummyGenerator.GetOrCreateDummyVideoAsync(
                                5.0, probe.Width > 0 ? probe.Width : 1920, probe.Height > 0 ? probe.Height : 1080, probe.Fps > 0 ? probe.Fps : 30.0, trackHasAudio, ct);
                        }
                        catch (Exception ex)
                        {
                            _logger.LogWarning(ex, "[SynchronizedTrackCutter] Failed creating dummy video for station {StationId}/{DisplayId}", stationId, dispId);
                        }
                    }

                    if (string.IsNullOrEmpty(masterDummyPath)) return;

                    double rem = gapSeconds;
                    while (rem > 0.02)
                    {
                        double slice = Math.Min(rem, 5.0);
                        manifestLines.Add($"file '{masterDummyPath.Replace('\\', '/')}'");
                        manifestLines.Add("inpoint 0.000");
                        manifestLines.Add(string.Format(CultureInfo.InvariantCulture, "outpoint {0:F3}", slice));
                        rem -= slice;
                    }
                    runningSeconds += gapSeconds;
                }

                for (int segIdx = 0; segIdx < plan.ActiveSegments.Count; segIdx++)
                {
                    var seg = plan.ActiveSegments[segIdx];
                    DateTime cursor = seg.StartUtc;

                    if (segIdx > 0 && runningSeconds > 0.6)
                    {
                        cutJunctions.Add(runningSeconds);
                    }

                    var segChunks = chunks
                        .Where(c => c.EndUtc > seg.StartUtc && c.StartUtc < seg.EndUtc)
                        .OrderBy(c => c.StartUtc).ToList();

                    if (segChunks.Count == 0)
                    {
                        double gapDur = seg.DurationSeconds;
                        if (gapDur > 0.05)
                        {
                            await AppendDummyGapAsync(gapDur);
                        }
                        continue;
                    }

                    foreach (var chunk in segChunks)
                    {
                        if (chunk.StartUtc > cursor.AddSeconds(0.2))
                        {
                            double gapDur = (chunk.StartUtc - cursor).TotalSeconds;
                            await AppendDummyGapAsync(gapDur);
                        }

                        DateTime effStart = chunk.StartUtc < cursor ? cursor : chunk.StartUtc;
                        DateTime effEnd = chunk.EndUtc > seg.EndUtc ? seg.EndUtc : chunk.EndUtc;
                        double dur = (effEnd - effStart).TotalSeconds;

                        if (dur > 0.05 && File.Exists(chunk.FullPath))
                        {
                            manifestLines.Add($"file '{chunk.FullPath.Replace('\\', '/')}'");

                            if (effStart > chunk.StartUtc.AddSeconds(0.05))
                            {
                                double inPoint = (effStart - chunk.StartUtc).TotalSeconds;
                                manifestLines.Add(string.Format(CultureInfo.InvariantCulture, "inpoint {0:F3}", inPoint));
                            }

                            if (effEnd < chunk.EndUtc.AddSeconds(-0.05))
                            {
                                double outPoint = (effEnd - chunk.StartUtc).TotalSeconds;
                                manifestLines.Add(string.Format(CultureInfo.InvariantCulture, "outpoint {0:F3}", outPoint));
                            }

                            runningSeconds += dur;
                            cursor = effEnd;
                        }
                    }

                    if (cursor < seg.EndUtc.AddSeconds(-0.2))
                    {
                        double gapDur = (seg.EndUtc - cursor).TotalSeconds;
                        await AppendDummyGapAsync(gapDur);
                    }
                }

                if (manifestLines.Count <= 1)
                {
                    // Secondary monitor had no media during interval; fill with dummy slate to guarantee synchronized frames
                    foreach (var seg in plan.ActiveSegments)
                    {
                        await AppendDummyGapAsync(seg.DurationSeconds);
                    }
                }

                if (manifestLines.Count <= 1)
                {
                    throw new InvalidOperationException($"No media timeline created for station {stationId} display {dispId}.");
                }

                string manifestPath = Path.Combine(Path.GetTempPath(), $"concat_{safeStationId}_{dispId}_{Guid.NewGuid():N}.txt");
                await File.WriteAllLinesAsync(manifestPath, manifestLines, new UTF8Encoding(false), ct);
                tempManifestFiles.Add(manifestPath);
                return (manifestPath, cutJunctions, runningSeconds);
            }

            string outputPath = Path.Combine(tempOutputDir, $"{safeStationId}_{DateTime.UtcNow:yyyyMMdd_HHmmss}.mp4");
            string ffmpegPath = _binaryResolver.ResolveFfmpeg();

            await _concurrencyThrottle.WaitAsync(ct);
            try
            {
                if (isMultiDisplayLayout)
                {
                    // === MULTI-DISPLAY LAYOUT PIPELINE (PiP or Split Screen) ===
                    string primaryKey = chunksByDisplay.Keys.FirstOrDefault(k => k == "mon-0") ?? chunksByDisplay.Keys.OrderBy(k => k).First();
                    string secondaryKey = chunksByDisplay.Keys.FirstOrDefault(k => k != primaryKey) ?? chunksByDisplay.Keys.OrderBy(k => k).Skip(1).First();

                    var primaryChunks = chunksByDisplay[primaryKey];
                    var secondaryChunks = chunksByDisplay[secondaryKey];

                    var probe0 = await GetBaselineProbeForChunksAsync(primaryChunks);
                    var probe1 = await GetBaselineProbeForChunksAsync(secondaryChunks);
                    bool trackHasAudio = probe0.HasAudio || probe1.HasAudio;

                    var (manifest0, _, runSec0) = await BuildManifestForDisplayAsync(primaryKey, primaryChunks, probe0, probe0.HasAudio, true);
                    var (manifest1, _, runSec1) = await BuildManifestForDisplayAsync(secondaryKey, secondaryChunks, probe1, probe1.HasAudio, true);

                    double maxDuration = Math.Max(runSec0, runSec1);
                    var vfPost = new List<string> { "fade=t=in:st=0:d=0.3:enable='between(t,0,0.3)'" };

                    if (maxDuration > 0.6)
                    {
                        double endStart = Math.Max(0, maxDuration - 0.3);
                        string endStartStr = endStart.ToString("0.00", CultureInfo.InvariantCulture);
                        string totalStr = maxDuration.ToString("0.00", CultureInfo.InvariantCulture);
                        vfPost.Add($"fade=t=out:st={endStartStr}:d=0.3:enable='between(t,{endStartStr},{totalStr})'");
                    }

                    string filterGraph;
                    if (layoutMode == "split")
                    {
                        // Side-by-Side (Split): Left & Right at 960x1080 each, aspect ratio preserved, with 2px tactical divider
                        string leftIn = !plan.IsPipSwapped ? "[0:v]" : "[1:v]";
                        string rightIn = !plan.IsPipSwapped ? "[1:v]" : "[0:v]";
                        filterGraph = $"{leftIn}scale=960:1080:force_original_aspect_ratio=decrease,pad=960:1080:(ow-iw)/2:(oh-ih)/2:black[left]; " +
                                      $"{rightIn}scale=960:1080:force_original_aspect_ratio=decrease,pad=960:1080:(ow-iw)/2:(oh-ih)/2:black[right]; " +
                                      $"[left][right]hstack=inputs=2,drawbox=x=959:y=0:w=2:h=1080:color=0x1E293B@0.8:t=fill[vbase];";
                    }
                    else
                    {
                        // Picture-in-Picture (PiP): Hero 1080p full display with 30% floating inset in bottom-right with tactical cyan border
                        string mainIn = !plan.IsPipSwapped ? "[0:v]" : "[1:v]";
                        string insetIn = !plan.IsPipSwapped ? "[1:v]" : "[0:v]";
                        filterGraph = $"{mainIn}scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2:black[main]; " +
                                      $"{insetIn}scale=576:324:force_original_aspect_ratio=decrease,pad=576:324:(ow-iw)/2:(oh-ih)/2:black,drawbox=x=0:y=0:w=iw:h=ih:color=0x06B6D4@0.9:t=2[inset]; " +
                                      $"[main][inset]overlay=W-w-24:H-h-24[vbase];";
                    }

                    string subInputArgs = "";
                    string mapArgs = "-map \"[outv]\"";

                    if (plan.KeystrokeMode != KeystrokeExportMode.None && _srtGenerator != null)
                    {
                        var segments = plan.ActiveSegments
                            .Select(s => (
                                StartEpochMs: new DateTimeOffset(s.StartUtc).ToUnixTimeMilliseconds(),
                                EndEpochMs: new DateTimeOffset(s.EndUtc).ToUnixTimeMilliseconds()))
                            .ToList();

                        if (segments.Count == 0)
                        {
                            segments.Add((new DateTimeOffset(cutStartUtc).ToUnixTimeMilliseconds(), new DateTimeOffset(cutEndUtc).ToUnixTimeMilliseconds()));
                        }

                        if (plan.KeystrokeMode == KeystrokeExportMode.BurnIn)
                        {
                            subtitleTempPath = await _srtGenerator.CreateAssKeycapsFileForSegmentsAsync(stationId, segments, ct);
                            if (subtitleTempPath != null && File.Exists(subtitleTempPath) && new FileInfo(subtitleTempPath).Length > 0)
                            {
                                string escapedAss = subtitleTempPath.Replace("\\", "/").Replace(":", "\\:").Replace("'", "\\'");
                                vfPost.Add($"subtitles='{escapedAss}'");
                            }
                        }
                        else if (plan.KeystrokeMode == KeystrokeExportMode.Caption)
                        {
                            subtitleTempPath = await _srtGenerator.CreateSrtFileForSegmentsAsync(stationId, segments, ct);
                            if (subtitleTempPath != null && File.Exists(subtitleTempPath) && new FileInfo(subtitleTempPath).Length > 0)
                            {
                                subInputArgs = $"-i \"{subtitleTempPath.Replace('\\', '/')}\"";
                                mapArgs += " -map 2:s -c:s mov_text -metadata:s:s:0 title=\"Keystroke Audit\"";
                            }
                        }
                    }

                    vfPost.Add("format=yuv420p");
                    filterGraph += $"[vbase]{string.Join(",", vfPost)}[outv]";

                    int safeAudioRate = probe0.AudioSampleRate > 0 ? probe0.AudioSampleRate : (probe1.AudioSampleRate > 0 ? probe1.AudioSampleRate : 48000);
                    int safeAudioChannels = probe0.AudioChannels > 0 ? probe0.AudioChannels : (probe1.AudioChannels > 0 ? probe1.AudioChannels : 2);

                    string audioInputIdx = probe0.HasAudio ? "0" : (probe1.HasAudio ? "1" : "0");
                    string audioArg = trackHasAudio
                        ? $"-map {audioInputIdx}:a? -c:a aac -b:a 128k -ar {safeAudioRate} -ac {safeAudioChannels}"
                        : "-an";

                    string arguments = $"-nostdin -v error -progress pipe:1 -fflags +genpts+discardcorrupt " +
                                       $"-f concat -safe 0 -i \"{manifest0.Replace('\\', '/')}\" " +
                                       $"-f concat -safe 0 -i \"{manifest1.Replace('\\', '/')}\" " +
                                       $"{subInputArgs} -filter_complex \"{filterGraph}\" {mapArgs} " +
                                       $"-c:v libx264 -preset veryfast -crf 20 -avoid_negative_ts make_zero {audioArg} -movflags +faststart -y \"{outputPath.Replace('\\', '/')}\"";

                    return await ExecuteFfmpegCommandAsync(ffmpegPath, arguments, outputPath, trackHasAudio, maxDuration, stationId, progress, ct);
                }
                else
                {
                    // === SINGLE DISPLAY / SOLO / AUTO-DIRECTOR TIMELINE PIPELINE ===
                    List<RecordingChunkMetadata> targetChunks;

                    if (layoutMode.StartsWith("mon-", StringComparison.OrdinalIgnoreCase) && chunksByDisplay.TryGetValue(layoutMode, out var specificDisplayChunks))
                    {
                        targetChunks = specificDisplayChunks;
                    }
                    else if (chunksByDisplay.TryGetValue("mon-0", out var primaryDisplayChunks))
                    {
                        targetChunks = primaryDisplayChunks;
                    }
                    else
                    {
                        targetChunks = chunksByDisplay.Values.FirstOrDefault() ?? stationChunks;
                    }

                    var baselineProbe = await GetBaselineProbeForChunksAsync(targetChunks);
                    bool trackHasAudio = baselineProbe.HasAudio;

                    // If target chunks lack audio (e.g. secondary monitor), check if mon-0 has audio
                    string? secondaryAudioManifest = null;
                    if (!trackHasAudio && chunksByDisplay.TryGetValue("mon-0", out var mon0Chunks) && mon0Chunks.Any(c => c.HasAudio))
                    {
                        var mon0Probe = await GetBaselineProbeForChunksAsync(mon0Chunks);
                        if (mon0Probe.HasAudio)
                        {
                            var (aManifest, _, _) = await BuildManifestForDisplayAsync("mon-0", mon0Chunks, mon0Probe, true, true);
                            secondaryAudioManifest = aManifest;
                            trackHasAudio = true;
                            baselineProbe.AudioSampleRate = mon0Probe.AudioSampleRate;
                            baselineProbe.AudioChannels = mon0Probe.AudioChannels;
                        }
                    }

                    string targetDisplayId = layoutMode.StartsWith("mon-", StringComparison.OrdinalIgnoreCase) ? layoutMode : "mon-0";
                    var (tempManifestPath, cutJunctions, runningSeconds) = await BuildManifestForDisplayAsync(
                        targetDisplayId, targetChunks, baselineProbe, trackHasAudio, false);

                    var vfFilters = new List<string> { "fade=t=in:st=0:d=0.3:enable='between(t,0,0.3)'" };

                    foreach (var junc in cutJunctions.Distinct())
                    {
                        double outStart = Math.Max(0, junc - 0.3);
                        string outStartStr = outStart.ToString("0.00", CultureInfo.InvariantCulture);
                        string juncStr = junc.ToString("0.00", CultureInfo.InvariantCulture);
                        double inEnd = Math.Min(runningSeconds, junc + 0.3);
                        string inEndStr = inEnd.ToString("0.00", CultureInfo.InvariantCulture);

                        vfFilters.Add($"fade=t=out:st={outStartStr}:d=0.3:enable='between(t,{outStartStr},{juncStr})'");
                        vfFilters.Add($"fade=t=in:st={juncStr}:d=0.3:enable='between(t,{juncStr},{inEndStr})'");
                    }

                    if (runningSeconds > 0.6)
                    {
                        double endStart = Math.Max(0, runningSeconds - 0.3);
                        string endStartStr = endStart.ToString("0.00", CultureInfo.InvariantCulture);
                        string totalStr = runningSeconds.ToString("0.00", CultureInfo.InvariantCulture);
                        vfFilters.Add($"fade=t=out:st={endStartStr}:d=0.3:enable='between(t,{endStartStr},{totalStr})'");
                    }

                    string subInputArgs = "";
                    string mapArgs = "";

                    if (plan.KeystrokeMode != KeystrokeExportMode.None && _srtGenerator != null)
                    {
                        var segments = plan.ActiveSegments
                            .Select(s => (
                                StartEpochMs: new DateTimeOffset(s.StartUtc).ToUnixTimeMilliseconds(),
                                EndEpochMs: new DateTimeOffset(s.EndUtc).ToUnixTimeMilliseconds()))
                            .ToList();

                        if (segments.Count == 0)
                        {
                            segments.Add((new DateTimeOffset(cutStartUtc).ToUnixTimeMilliseconds(), new DateTimeOffset(cutEndUtc).ToUnixTimeMilliseconds()));
                        }

                        if (plan.KeystrokeMode == KeystrokeExportMode.BurnIn)
                        {
                            subtitleTempPath = await _srtGenerator.CreateAssKeycapsFileForSegmentsAsync(stationId, segments, ct);
                            if (subtitleTempPath != null && File.Exists(subtitleTempPath) && new FileInfo(subtitleTempPath).Length > 0)
                            {
                                string escapedAss = subtitleTempPath.Replace("\\", "/").Replace(":", "\\:").Replace("'", "\\'");
                                vfFilters.Add($"subtitles='{escapedAss}'");
                            }
                        }
                        else if (plan.KeystrokeMode == KeystrokeExportMode.Caption)
                        {
                            subtitleTempPath = await _srtGenerator.CreateSrtFileForSegmentsAsync(stationId, segments, ct);
                            if (subtitleTempPath != null && File.Exists(subtitleTempPath) && new FileInfo(subtitleTempPath).Length > 0)
                            {
                                int subIndex = secondaryAudioManifest != null ? 2 : 1;
                                subInputArgs = $"-i \"{subtitleTempPath.Replace('\\', '/')}\"";
                                mapArgs = $"-map 0:v {(secondaryAudioManifest != null ? "-map 1:a?" : (trackHasAudio ? "-map 0:a?" : ""))} -map {subIndex}:s -c:s mov_text -metadata:s:s:0 title=\"Keystroke Audit\"";
                            }
                        }
                    }

                    vfFilters.Add("format=yuv420p");
                    string videoFilterArg = string.Join(",", vfFilters);

                    int safeAudioRate = baselineProbe.AudioSampleRate > 0 ? baselineProbe.AudioSampleRate : 48000;
                    int safeAudioChannels = baselineProbe.AudioChannels > 0 ? baselineProbe.AudioChannels : 2;

                    string audioInputArg = secondaryAudioManifest != null
                        ? $"-f concat -safe 0 -i \"{secondaryAudioManifest.Replace('\\', '/')}\""
                        : "";

                    if (string.IsNullOrEmpty(mapArgs))
                    {
                        if (secondaryAudioManifest != null)
                        {
                            mapArgs = "-map 0:v -map 1:a?";
                        }
                        else if (trackHasAudio)
                        {
                            mapArgs = "-map 0:v -map 0:a?";
                        }
                        else
                        {
                            mapArgs = "-map 0:v";
                        }
                    }

                    string audioArg = trackHasAudio
                        ? $"-c:a aac -b:a 128k -ar {safeAudioRate} -ac {safeAudioChannels}"
                        : "-an";

                    string arguments = $"-nostdin -v error -progress pipe:1 -fflags +genpts+discardcorrupt " +
                                       $"-f concat -safe 0 -i \"{tempManifestPath.Replace('\\', '/')}\" " +
                                       $"{audioInputArg} {subInputArgs} {mapArgs} -vf \"{videoFilterArg}\" " +
                                       $"-c:v libx264 -preset veryfast -crf 20 -avoid_negative_ts make_zero {audioArg} -movflags +faststart -y \"{outputPath.Replace('\\', '/')}\"";

                    return await ExecuteFfmpegCommandAsync(ffmpegPath, arguments, outputPath, trackHasAudio, runningSeconds, stationId, progress, ct);
                }
            }
            finally
            {
                _concurrencyThrottle.Release();
                foreach (var mf in tempManifestFiles)
                {
                    if (File.Exists(mf)) try { File.Delete(mf); } catch { }
                }
                if (subtitleTempPath != null && File.Exists(subtitleTempPath))
                {
                    try { File.Delete(subtitleTempPath); } catch { }
                }
            }
        }

        private async Task<(string OutputFilePath, bool HasAudio)> ExecuteFfmpegCommandAsync(
            string ffmpegPath,
            string arguments,
            string outputPath,
            bool trackHasAudio,
            double expectedDurationSec,
            string stationId,
            IProgress<(double SecondsProcessed, double Fps, double SpeedMultiplier)>? progress,
            CancellationToken ct)
        {
            var startInfo = new ProcessStartInfo
            {
                FileName = ffmpegPath,
                Arguments = arguments,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            using var process = new Process { StartInfo = startInfo };
            process.Start();
            ExtractorGarbageCollectorService.TrackProcess(process.Id);

            try
            {
                var readProgressTask = Task.Run(async () =>
                {
                    using var reader = process.StandardOutput;
                    string? line;
                    double currentSeconds = 0;
                    double currentFps = 0;
                    double currentSpeed = 1.0;

                    while ((line = await reader.ReadLineAsync(ct)) != null)
                    {
                        var parts = line.Split('=', 2);
                        if (parts.Length != 2) continue;

                        string key = parts[0].Trim();
                        string val = parts[1].Trim();

                        if (key == "out_time_us" && long.TryParse(val, out long us))
                        {
                            currentSeconds = Math.Max(currentSeconds, us / 1_000_000.0);
                            progress?.Report((currentSeconds, currentFps, currentSpeed));
                        }
                        else if (key == "fps" && double.TryParse(val, NumberStyles.Any, CultureInfo.InvariantCulture, out double f))
                        {
                            currentFps = f;
                        }
                        else if (key == "speed")
                        {
                            string sClean = val.TrimEnd('x', 'X').Trim();
                            if (double.TryParse(sClean, NumberStyles.Any, CultureInfo.InvariantCulture, out double sp) && sp > 0)
                            {
                                currentSpeed = sp;
                            }
                        }
                        else if (key == "progress")
                        {
                            progress?.Report((currentSeconds, currentFps, currentSpeed));
                        }
                    }
                }, ct);

                string errorOutput = await process.StandardError.ReadToEndAsync(ct);
                await Task.WhenAll(process.WaitForExitAsync(ct), readProgressTask);

                if (process.ExitCode != 0)
                {
                    throw new InvalidOperationException($"FFmpeg failed for {stationId} (ExitCode {process.ExitCode}): {errorOutput.Trim()}");
                }

                return (outputPath, trackHasAudio);
            }
            finally
            {
                try { ExtractorGarbageCollectorService.UntrackProcess(process.Id); } catch { }
            }
        }
    }
}