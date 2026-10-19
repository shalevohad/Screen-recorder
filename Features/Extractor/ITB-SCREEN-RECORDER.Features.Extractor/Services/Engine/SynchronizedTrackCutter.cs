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
            var orderedChunks = stationChunks.OrderBy(c => c.StartUtc).ToList();
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

            ProbedStationMetadata baselineProbe;
            if (orderedChunks.Count > 0)
            {
                var representativeChunk = orderedChunks
                    .Where(c => !string.IsNullOrEmpty(c.FullPath) && File.Exists(c.FullPath))
                    .OrderBy(c => Math.Abs((c.StartUtc - cutStartUtc).TotalSeconds))
                    .FirstOrDefault();

                baselineProbe = await GetChunkProbeAsync(representativeChunk);
            }
            else
            {
                baselineProbe = await _mediaProbeService.GetOrProbeStationMetadataAsync(stationId, cutStartUtc, cutEndUtc, ct);
            }

            bool trackHasAudio = baselineProbe.HasAudio;
            if (!trackHasAudio && orderedChunks.Count > 0)
            {
                foreach (var ch in orderedChunks.Take(5))
                {
                    var p = await GetChunkProbeAsync(ch);
                    if (p.HasAudio)
                    {
                        trackHasAudio = true;
                        baselineProbe.AudioSampleRate = p.AudioSampleRate;
                        baselineProbe.AudioChannels = p.AudioChannels;
                        break;
                    }
                }
            }

            // 💡 יצירת Master Dummy יחיד לכל אורך ה-Timeline
            string? masterDummyPath = null;
            double totalDurationSecs = (cutEndUtc - cutStartUtc).TotalSeconds;
            if (totalDurationSecs > 0 && (plan.ActiveSegments.Count > 1 || orderedChunks.Count == 0))
            {
                double requiredDummyLength = Math.Max(3600, totalDurationSecs + 60);
                masterDummyPath = await _dummyGenerator.GetOrCreateDummyVideoAsync(
                    requiredDummyLength, baselineProbe.Width, baselineProbe.Height, baselineProbe.Fps, trackHasAudio, ct);
            }

            var manifestLines = new List<string> { "ffconcat version 1.0" };
            var cutJunctions = new List<double>();
            double runningSeconds = 0;

            for (int segIdx = 0; segIdx < plan.ActiveSegments.Count; segIdx++)
            {
                var seg = plan.ActiveSegments[segIdx];
                DateTime cursor = seg.StartUtc;

                if (segIdx > 0 && runningSeconds > 0.6)
                {
                    cutJunctions.Add(runningSeconds);
                }

                var segChunks = orderedChunks
                    .Where(c => c.EndUtc > seg.StartUtc && c.StartUtc < seg.EndUtc)
                    .OrderBy(c => c.StartUtc).ToList();

                if (segChunks.Count == 0)
                {
                    double gapDur = seg.DurationSeconds;
                    if (gapDur > 0.05 && masterDummyPath != null)
                    {
                        // 💡 חיתוך וירטואלי מתוך ה-Master
                        manifestLines.Add($"file '{masterDummyPath.Replace('\\', '/')}'");
                        manifestLines.Add("inpoint 0.000");
                        manifestLines.Add(string.Format(CultureInfo.InvariantCulture, "outpoint {0:F3}", gapDur));
                        runningSeconds += gapDur;
                    }
                    continue;
                }

                foreach (var chunk in segChunks)
                {
                    if (chunk.StartUtc > cursor.AddSeconds(0.2))
                    {
                        double gapDur = (chunk.StartUtc - cursor).TotalSeconds;
                        if (masterDummyPath != null)
                        {
                            manifestLines.Add($"file '{masterDummyPath.Replace('\\', '/')}'");
                            manifestLines.Add("inpoint 0.000");
                            manifestLines.Add(string.Format(CultureInfo.InvariantCulture, "outpoint {0:F3}", gapDur));
                            runningSeconds += gapDur;
                        }
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
                    if (masterDummyPath != null)
                    {
                        manifestLines.Add($"file '{masterDummyPath.Replace('\\', '/')}'");
                        manifestLines.Add("inpoint 0.000");
                        manifestLines.Add(string.Format(CultureInfo.InvariantCulture, "outpoint {0:F3}", gapDur));
                        runningSeconds += gapDur;
                    }
                }
            }

            if (manifestLines.Count <= 1)
            {
                throw new InvalidOperationException($"No media timeline created for station {stationId}.");
            }

            string tempManifestPath = Path.Combine(Path.GetTempPath(), $"concat_{stationId}_{Guid.NewGuid():N}.txt");
            await File.WriteAllLinesAsync(tempManifestPath, manifestLines, new UTF8Encoding(false), ct);

            string outputPath = Path.Combine(tempOutputDir, $"{stationId}_{DateTime.UtcNow:yyyyMMdd_HHmmss}.mp4");

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

            string? subtitleTempPath = null;
            string subInputArgs = "";
            string mapArgs = "";

            if (plan.KeystrokeMode != KeystrokeExportMode.None && _srtGenerator != null)
            {
                long startEpochMs = new DateTimeOffset(cutStartUtc).ToUnixTimeMilliseconds();
                long endEpochMs = new DateTimeOffset(cutEndUtc).ToUnixTimeMilliseconds();

                if (plan.KeystrokeMode == KeystrokeExportMode.BurnIn)
                {
                    subtitleTempPath = await _srtGenerator.CreateAssKeycapsFileAsync(stationId, startEpochMs, endEpochMs, ct);
                    if (subtitleTempPath != null && File.Exists(subtitleTempPath) && new FileInfo(subtitleTempPath).Length > 0)
                    {
                        string escapedAss = subtitleTempPath.Replace("\\", "/").Replace(":", "\\:").Replace("'", "\\'");
                        vfFilters.Add($"subtitles='{escapedAss}'");
                    }
                }
                else if (plan.KeystrokeMode == KeystrokeExportMode.Caption)
                {
                    subtitleTempPath = await _srtGenerator.CreateSrtFileAsync(stationId, startEpochMs, endEpochMs, ct);
                    if (subtitleTempPath != null && File.Exists(subtitleTempPath) && new FileInfo(subtitleTempPath).Length > 0)
                    {
                        subInputArgs = $"-i \"{subtitleTempPath.Replace('\\', '/')}\"";
                        mapArgs = trackHasAudio
                            ? "-map 0:v -map 0:a? -map 1:s -c:s mov_text -metadata:s:s:0 title=\"Keystroke Audit\""
                            : "-map 0:v -map 1:s -c:s mov_text -metadata:s:s:0 title=\"Keystroke Audit\"";
                    }
                }
            }

            vfFilters.Add("format=yuv420p");
            string videoFilterArg = string.Join(",", vfFilters);

            string audioArg = trackHasAudio
                ? $"-c:a aac -b:a 128k -ar {baselineProbe.AudioSampleRate} -ac {baselineProbe.AudioChannels}"
                : "-an";

            string ffmpegPath = _binaryResolver.ResolveFfmpeg();

            string arguments = $"-nostdin -v error -progress pipe:1 -fflags +genpts+discardcorrupt -f concat -safe 0 -i \"{tempManifestPath.Replace('\\', '/')}\" {subInputArgs} " +
                               $"{mapArgs} -vf \"{videoFilterArg}\" " +
                               $"-c:v libx264 -preset veryfast -crf 20 -avoid_negative_ts make_zero {audioArg} -movflags +faststart -y \"{outputPath.Replace('\\', '/')}\"";

            var startInfo = new ProcessStartInfo
            {
                FileName = ffmpegPath,
                Arguments = arguments,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            await _concurrencyThrottle.WaitAsync(ct);
            using var process = new Process { StartInfo = startInfo };

            try
            {
                process.Start();

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
                _concurrencyThrottle.Release();
                if (File.Exists(tempManifestPath)) try { File.Delete(tempManifestPath); } catch { }
                if (subtitleTempPath != null && File.Exists(subtitleTempPath)) try { File.Delete(subtitleTempPath); } catch { }

                // מחיקת ה-Master Dummy של התחנה בסוף התהליך כדי לפנות מקום
                if (masterDummyPath != null && File.Exists(masterDummyPath))
                {
                    try { File.Delete(masterDummyPath); } catch { }
                }
            }
        }
    }
}