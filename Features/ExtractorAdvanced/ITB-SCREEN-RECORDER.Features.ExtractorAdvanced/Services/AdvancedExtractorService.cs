// ==========================================
// File: Features/ExtractorAdvanced/Services/AdvancedExtractorService.cs
// ==========================================
using ITB_SCREEN_RECORDER.Features.Extractor.Models;
using ITB_SCREEN_RECORDER.Features.Extractor.Services;
using ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Models;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Services
{
    public class TimeInterval
    {
        public DateTime StartUtc { get; set; }
        public DateTime EndUtc { get; set; }
        public double DurationSeconds => Math.Max(0, (EndUtc - StartUtc).TotalSeconds);
    }

    public class GlobalGapRecord
    {
        public int GapIndex { get; set; }
        public DateTime StartUtc { get; set; }
        public DateTime EndUtc { get; set; }
        public double SkippedDurationSeconds { get; set; }
        public double TimelineOffsetSeconds { get; set; }
    }

    public class StationGapRecord
    {
        public string StationId { get; set; } = string.Empty;
        public DateTime StartUtc { get; set; }
        public DateTime EndUtc { get; set; }
        public double DurationSeconds { get; set; }
    }

    public class SynchronizationPlan
    {
        public List<TimeInterval> ActiveSegments { get; set; } = new();
        public List<GlobalGapRecord> RemovedGlobalGaps { get; set; } = new();
        public List<StationGapRecord> StationGaps { get; set; } = new();
        public double TotalActiveSeconds => ActiveSegments.Sum(s => s.DurationSeconds);
    }

    public class ProbedStationMetadata
    {
        public int Width { get; set; } = 1920;
        public int Height { get; set; } = 1080;
        public double Fps { get; set; } = 30.0;
        public string PixFmt { get; set; } = "yuv420p";
        public bool HasAudio { get; set; } = false;
        public int AudioSampleRate { get; set; } = 48000;
        public int AudioChannels { get; set; } = 2;
        public string AudioCodec { get; set; } = "aac";
    }

    public class AdvancedExtractorService : ExtractorService
    {
        private readonly IDummyVideoGenerator _dummyVideoGenerator;
        private readonly INoSignalPatternService _patternService;
        private readonly IVideoMetadataService _metadataService;
        private readonly ILogger<AdvancedExtractorService> _advancedLogger;
        private readonly ExtractorOptions _extractorOptions;
        private readonly IMemoryCache? _memoryCache;
        private static readonly SemaphoreSlim _localVisualThrottle = new(6, 6);

        public AdvancedExtractorService(
            IStorageScannerService storageScanner,
            IFfmpegConcatRunner ffmpegRunner,
            IOptions<ExtractorOptions> extractorOptions,
            IDummyVideoGenerator dummyVideoGenerator,
            INoSignalPatternService patternService,
            IVideoMetadataService metadataService,
            ILogger<AdvancedExtractorService> logger,
            IMemoryCache? memoryCache = null)
            : base(storageScanner, ffmpegRunner, extractorOptions, logger)
        {
            _dummyVideoGenerator = dummyVideoGenerator;
            _patternService = patternService;
            _metadataService = metadataService;
            _advancedLogger = logger;
            _extractorOptions = extractorOptions.Value;
            _memoryCache = memoryCache;
        }

        public new string ResolveFfmpegBinary() => ResolveBinary("ffmpeg");
        public string ResolveFfprobeBinary() => ResolveBinary("ffprobe");

        private string ResolveBinary(string baseName)
        {
            string binaryName = OperatingSystem.IsWindows() ? $"{baseName}.exe" : baseName;
            string? assemblyDir = Path.GetDirectoryName(typeof(AdvancedExtractorService).Assembly.Location);
            if (!string.IsNullOrWhiteSpace(assemblyDir))
            {
                string pluginBin = Path.Combine(assemblyDir, binaryName);
                if (File.Exists(pluginBin)) { EnsureLinuxPermissions(pluginBin); return pluginBin; }
            }

            if (!string.IsNullOrWhiteSpace(_extractorOptions.FfmpegPath) && File.Exists(_extractorOptions.FfmpegPath) && baseName == "ffmpeg")
            {
                EnsureLinuxPermissions(_extractorOptions.FfmpegPath);
                return _extractorOptions.FfmpegPath;
            }

            var baseDir = AppContext.BaseDirectory;
            string[] directCandidates = {
                Path.Combine(baseDir, "Features", "ExtractorAdvanced", binaryName),
                Path.Combine(baseDir, "Features", "Extractor", binaryName),
                Path.Combine(baseDir, "Features", "Extractor", "Bin", binaryName),
                Path.Combine(baseDir, "Features", "Extractor", "Tools", "Win", binaryName),
                Path.Combine(baseDir, binaryName)
            };

            foreach (var path in directCandidates)
            {
                var full = Path.GetFullPath(path);
                if (File.Exists(full)) { EnsureLinuxPermissions(full); return full; }
            }

            return binaryName;
        }

        private static void EnsureLinuxPermissions(string filePath)
        {
            if (!OperatingSystem.IsLinux() || !File.Exists(filePath)) return;
            try
            {
                File.SetUnixFileMode(filePath,
                    UnixFileMode.UserRead | UnixFileMode.UserWrite | UnixFileMode.UserExecute |
                    UnixFileMode.GroupRead | UnixFileMode.GroupExecute |
                    UnixFileMode.OtherRead | UnixFileMode.OtherExecute);
            }
            catch { }
        }

        public Task<StreamMetadataDto> GetStreamMetadataAsync(string hostname, long epochMs, CancellationToken ct = default) =>
            _metadataService.GetStreamMetadataAsync(hostname, epochMs, ResolveFfprobeBinary(), ct);

        public Task AdjustChunksToAccuratePtsAsync<T>(IEnumerable<T> chunks, CancellationToken ct = default) where T : class =>
            _metadataService.AdjustChunksToAccuratePtsAsync(chunks, ResolveFfprobeBinary(), ct);

        public async Task<Stream> ExtractFrameAsync(string hostname, long epochMs, CancellationToken ct = default)
        {
            string cacheKey = $"frame_{hostname}_{epochMs}";
            if (_memoryCache != null && _memoryCache.TryGetValue(cacheKey, out byte[]? cached) && cached != null)
                return new MemoryStream(cached);

            DateTime targetUtc = DateTimeOffset.FromUnixTimeMilliseconds(epochMs).UtcDateTime;

            var chunks = await _storageScanner.GetChunksForStationAsync(hostname, targetUtc.AddMinutes(-1), targetUtc.AddMinutes(1));
            await AdjustChunksToAccuratePtsAsync(chunks, ct);

            var matchingChunk = chunks.FirstOrDefault(c =>
                !string.IsNullOrEmpty(c.FullPath) &&
                File.Exists(c.FullPath) &&
                c.StartUtc <= targetUtc &&
                targetUtc <= c.EndUtc);

            if (matchingChunk == null)
            {
                return Stream.Null;
            }

            string ffmpegPath = ResolveFfmpegBinary();
            double offsetSeconds = Math.Max(0, (targetUtc - matchingChunk.StartUtc).TotalSeconds);
            string normalizedPath = matchingChunk.FullPath.Replace('\\', '/');

            // 💡 מנגנון Fallback כפול לחילוץ פריים מדויק ללא שגיאות 204
            byte[]? frameBytes = await TryExtractFrameInternalAsync(ffmpegPath, normalizedPath, offsetSeconds, fastSeek: true, ct);
            if (frameBytes == null || frameBytes.Length == 0)
            {
                // ניסיון שני: Seek מוקדם יותר עם פתיחת מרווח פענוח מדויק (-accurate_seek)
                frameBytes = await TryExtractFrameInternalAsync(ffmpegPath, normalizedPath, offsetSeconds, fastSeek: false, ct);
            }

            if (frameBytes != null && frameBytes.Length > 0)
            {
                _memoryCache?.Set(cacheKey, frameBytes, TimeSpan.FromMinutes(3));
                return new MemoryStream(frameBytes);
            }

            return Stream.Null;
        }

        private async Task<byte[]?> TryExtractFrameInternalAsync(string ffmpegPath, string inputPath, double offsetSeconds, bool fastSeek, CancellationToken ct)
        {
            using var memoryStream = new MemoryStream(65536);
            using var linkedCts = CancellationTokenSource.CreateLinkedTokenSource(ct);
            linkedCts.CancelAfter(TimeSpan.FromSeconds(4));

            try
            {
                string seekArgs;
                double targetTime = offsetSeconds;

                if (fastSeek)
                {
                    seekArgs = $"-ss {offsetSeconds.ToString("0.000", CultureInfo.InvariantCulture)}";
                }
                else
                {
                    // הליכה אחורה אל ה-Keyframe הקרוב ופענוח מדויק קדימה
                    double safeSeek = Math.Max(0, offsetSeconds - 3.0);
                    seekArgs = $"-ss {safeSeek.ToString("0.000", CultureInfo.InvariantCulture)} -accurate_seek";
                    targetTime = offsetSeconds - safeSeek;
                }

                var startInfo = new ProcessStartInfo
                {
                    FileName = ffmpegPath,
                    Arguments = $"-nostdin -loglevel error -noautorotate {seekArgs} " +
                                $"-i \"{inputPath}\" -ss {targetTime.ToString("0.000", CultureInfo.InvariantCulture)} " +
                                $"-an -sn -dn -threads 2 -vframes 1 -q:v 4 -f image2pipe -vcodec mjpeg pipe:1",
                    RedirectStandardOutput = true,
                    RedirectStandardError = false,
                    UseShellExecute = false,
                    CreateNoWindow = true
                };

                using var process = new Process { StartInfo = startInfo };
                process.Start();

                using var reg = linkedCts.Token.Register(() => { try { if (!process.HasExited) process.Kill(true); } catch { } });
                await process.StandardOutput.BaseStream.CopyToAsync(memoryStream, 32768, linkedCts.Token);
                await process.WaitForExitAsync(linkedCts.Token);

                if (memoryStream.Length > 0)
                {
                    return memoryStream.ToArray();
                }
            }
            catch
            {
                // התעלמות ושקט כדי לאפשר Fallback
            }

            return null;
        }

        public async Task<Stream> GenerateSpritesheetAsync(string hostname, DateTime startUtc, DateTime endUtc, int frameCount, int tileWidth = 120, int tileHeight = 52, CancellationToken ct = default)
        {
            frameCount = Math.Clamp(frameCount, 2, 8);
            tileWidth = Math.Clamp(tileWidth, 60, 240);
            tileHeight = Math.Clamp(tileHeight, 30, 135);

            double totalSeconds = (endUtc - startUtc).TotalSeconds;
            if (totalSeconds <= 0) return Stream.Null;

            string cacheDir = Path.Combine(Path.GetTempPath(), "itb_sprites_cache", hostname);
            Directory.CreateDirectory(cacheDir);

            string cacheFilePath = Path.Combine(cacheDir, $"{startUtc:yyyyMMddHHmmss}_{endUtc:yyyyMMddHHmmss}_{frameCount}_{tileWidth}x{tileHeight}.jpg");
            if (File.Exists(cacheFilePath) && new FileInfo(cacheFilePath).Length > 0)
                return new FileStream(cacheFilePath, FileMode.Open, FileAccess.Read, FileShare.Read);

            var chunks = await _storageScanner.GetChunksForStationAsync(hostname, startUtc, endUtc);
            await AdjustChunksToAccuratePtsAsync(chunks, ct);

            string ffmpegPath = ResolveFfmpegBinary();
            if (chunks.Count == 0)
            {
                byte[] blackTile = await _patternService.GetOrCreateBlackTileAsync(ffmpegPath, tileWidth, tileHeight, frameCount, ct);
                return new MemoryStream(blackTile);
            }

            var orderedChunks = chunks.OrderBy(c => c.StartUtc).ToList();
            var manifestLines = new List<string>();

            foreach (var chunk in orderedChunks)
            {
                manifestLines.Add($"file '{chunk.FullPath.Replace('\\', '/')}'");
            }

            string tempManifestPath = Path.Combine(Path.GetTempPath(), $"spritesheet_{Guid.NewGuid():N}.txt");
            await File.WriteAllLinesAsync(tempManifestPath, manifestLines, new UTF8Encoding(false), ct);

            double interval = Math.Max(0.05, totalSeconds / frameCount);
            string filters = $"fps=1/{interval.ToString("F3", CultureInfo.InvariantCulture)},scale={tileWidth}:{tileHeight},tile={frameCount}x1";

            var startInfo = new ProcessStartInfo
            {
                FileName = ffmpegPath,
                Arguments = $"-nostdin -loglevel error -noautorotate -f concat -safe 0 -i \"{tempManifestPath.Replace('\\', '/')}\" " +
                            $"-vf \"{filters}\" -an -sn -dn -threads 2 -frames:v 1 -q:v 4 -y \"{cacheFilePath.Replace('\\', '/')}\"",
                RedirectStandardOutput = false,
                RedirectStandardError = false,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            using var linkedCts = CancellationTokenSource.CreateLinkedTokenSource(ct);
            linkedCts.CancelAfter(TimeSpan.FromSeconds(8));
            await _localVisualThrottle.WaitAsync(linkedCts.Token);

            try
            {
                using var process = new Process { StartInfo = startInfo };
                process.Start();
                using var reg = linkedCts.Token.Register(() => { try { if (!process.HasExited) process.Kill(true); } catch { } });
                await process.WaitForExitAsync(linkedCts.Token);

                if (File.Exists(cacheFilePath) && new FileInfo(cacheFilePath).Length > 0)
                    return new FileStream(cacheFilePath, FileMode.Open, FileAccess.Read, FileShare.Read);

                byte[] blackTile = await _patternService.GetOrCreateBlackTileAsync(ffmpegPath, tileWidth, tileHeight, frameCount, ct);
                return new MemoryStream(blackTile);
            }
            finally
            {
                _localVisualThrottle.Release();
                if (File.Exists(tempManifestPath)) try { File.Delete(tempManifestPath); } catch { }
            }
        }

        public SynchronizationPlan BuildSynchronizationPlan(
            List<string> stationIds,
            DateTime startUtc,
            DateTime endUtc,
            Dictionary<string, List<RecordingChunkMetadata>> stationChunks)
        {
            var plan = new SynchronizationPlan();

            var allActiveRaw = new List<TimeInterval>();
            foreach (var kvp in stationChunks)
            {
                foreach (var chunk in kvp.Value)
                {
                    var segStart = chunk.StartUtc < startUtc ? startUtc : chunk.StartUtc;
                    var segEnd = chunk.EndUtc > endUtc ? endUtc : chunk.EndUtc;
                    if (segEnd > segStart)
                    {
                        allActiveRaw.Add(new TimeInterval { StartUtc = segStart, EndUtc = segEnd });
                    }
                }
            }

            if (allActiveRaw.Count == 0) return plan;

            var sortedRaw = allActiveRaw.OrderBy(r => r.StartUtc).ToList();
            var mergedActive = new List<TimeInterval>();
            var current = new TimeInterval { StartUtc = sortedRaw[0].StartUtc, EndUtc = sortedRaw[0].EndUtc };

            for (int i = 1; i < sortedRaw.Count; i++)
            {
                if (sortedRaw[i].StartUtc <= current.EndUtc.AddSeconds(1.0))
                {
                    if (sortedRaw[i].EndUtc > current.EndUtc) current.EndUtc = sortedRaw[i].EndUtc;
                }
                else
                {
                    mergedActive.Add(current);
                    current = new TimeInterval { StartUtc = sortedRaw[i].StartUtc, EndUtc = sortedRaw[i].EndUtc };
                }
            }
            mergedActive.Add(current);
            plan.ActiveSegments = mergedActive;

            int gapIdx = 1;
            double runningOffset = 0;

            if (mergedActive[0].StartUtc > startUtc)
            {
                double dur = (mergedActive[0].StartUtc - startUtc).TotalSeconds;
                if (dur >= 1.0)
                {
                    plan.RemovedGlobalGaps.Add(new GlobalGapRecord
                    {
                        GapIndex = gapIdx++,
                        StartUtc = startUtc,
                        EndUtc = mergedActive[0].StartUtc,
                        SkippedDurationSeconds = dur,
                        TimelineOffsetSeconds = 0
                    });
                }
            }

            for (int i = 0; i < mergedActive.Count - 1; i++)
            {
                runningOffset += mergedActive[i].DurationSeconds;
                var gStart = mergedActive[i].EndUtc;
                var gEnd = mergedActive[i + 1].StartUtc;
                double dur = (gEnd - gStart).TotalSeconds;

                if (dur >= 1.0)
                {
                    plan.RemovedGlobalGaps.Add(new GlobalGapRecord
                    {
                        GapIndex = gapIdx++,
                        StartUtc = gStart,
                        EndUtc = gEnd,
                        SkippedDurationSeconds = dur,
                        TimelineOffsetSeconds = runningOffset
                    });
                }
            }

            if (mergedActive.Last().EndUtc < endUtc)
            {
                double dur = (endUtc - mergedActive.Last().EndUtc).TotalSeconds;
                if (dur >= 1.0)
                {
                    plan.RemovedGlobalGaps.Add(new GlobalGapRecord
                    {
                        GapIndex = gapIdx++,
                        StartUtc = mergedActive.Last().EndUtc,
                        EndUtc = endUtc,
                        SkippedDurationSeconds = dur,
                        TimelineOffsetSeconds = plan.TotalActiveSeconds
                    });
                }
            }

            if (stationIds.Count > 1)
            {
                foreach (var sId in stationIds)
                {
                    var sChunks = stationChunks.GetValueOrDefault(sId, new List<RecordingChunkMetadata>())
                                               .OrderBy(c => c.StartUtc).ToList();

                    foreach (var activeSeg in mergedActive)
                    {
                        DateTime segCursor = activeSeg.StartUtc;
                        var overlapping = sChunks
                            .Where(c => c.EndUtc > activeSeg.StartUtc && c.StartUtc < activeSeg.EndUtc)
                            .OrderBy(c => c.StartUtc).ToList();

                        foreach (var chunk in overlapping)
                        {
                            if (chunk.StartUtc > segCursor.AddSeconds(1.0))
                            {
                                plan.StationGaps.Add(new StationGapRecord
                                {
                                    StationId = sId,
                                    StartUtc = segCursor,
                                    EndUtc = chunk.StartUtc,
                                    DurationSeconds = (chunk.StartUtc - segCursor).TotalSeconds
                                });
                            }
                            segCursor = chunk.EndUtc > segCursor ? chunk.EndUtc : segCursor;
                        }

                        if (segCursor < activeSeg.EndUtc.AddSeconds(-1.0))
                        {
                            plan.StationGaps.Add(new StationGapRecord
                            {
                                StationId = sId,
                                StartUtc = segCursor,
                                EndUtc = activeSeg.EndUtc,
                                DurationSeconds = (activeSeg.EndUtc - segCursor).TotalSeconds
                            });
                        }
                    }
                }
            }

            return plan;
        }

        /// <summary>
        /// דוגם ישירות באמצעות FFprobe קובץ וידאו פיזי של התחנה
        /// </summary>
        public async Task<ProbedStationMetadata> ProbeMediaFileDirectlyAsync(string filePath, string stationId, CancellationToken ct)
        {
            var meta = new ProbedStationMetadata();
            string ffprobePath = ResolveFfprobeBinary();

            var psi = new ProcessStartInfo
            {
                FileName = ffprobePath,
                Arguments = $"-v error -show_streams -show_format -of json \"{filePath.Replace('\\', '/')}\"",
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            using var proc = new Process { StartInfo = psi };
            var sb = new StringBuilder();
            proc.OutputDataReceived += (_, e) => { if (e.Data != null) sb.AppendLine(e.Data); };

            try
            {
                proc.Start();
                proc.BeginOutputReadLine();
                await proc.WaitForExitAsync(ct);

                string json = sb.ToString();
                if (string.IsNullOrWhiteSpace(json))
                {
                    _advancedLogger.LogWarning("[FFprobe Direct Probe] Empty output for '{File}'. Using defaults.", filePath);
                    return meta;
                }

                using var doc = JsonDocument.Parse(json);
                if (doc.RootElement.TryGetProperty("streams", out var streams) && streams.ValueKind == JsonValueKind.Array)
                {
                    bool foundVideo = false;
                    foreach (var stream in streams.EnumerateArray())
                    {
                        if (!stream.TryGetProperty("codec_type", out var typeProp)) continue;
                        string type = typeProp.GetString() ?? "";

                        if (type == "video" && !foundVideo)
                        {
                            foundVideo = true;
                            if (stream.TryGetProperty("width", out var w)) meta.Width = w.GetInt32();
                            if (stream.TryGetProperty("height", out var h)) meta.Height = h.GetInt32();
                            if (stream.TryGetProperty("pix_fmt", out var pf)) meta.PixFmt = pf.GetString() ?? "yuv420p";

                            if (stream.TryGetProperty("r_frame_rate", out var rfr) && ParseFpsFraction(rfr.GetString(), out double rFps))
                            {
                                meta.Fps = rFps;
                            }
                            else if (stream.TryGetProperty("avg_frame_rate", out var afr) && ParseFpsFraction(afr.GetString(), out double aFps))
                            {
                                meta.Fps = aFps;
                            }
                        }
                        else if (type == "audio")
                        {
                            meta.HasAudio = true;
                            if (stream.TryGetProperty("sample_rate", out var sr) && int.TryParse(sr.GetString(), out int srVal) && srVal > 0)
                            {
                                meta.AudioSampleRate = srVal;
                            }
                            if (stream.TryGetProperty("channels", out var ch))
                            {
                                meta.AudioChannels = ch.GetInt32();
                            }
                            if (stream.TryGetProperty("codec_name", out var cn))
                            {
                                meta.AudioCodec = cn.GetString() ?? "aac";
                            }
                        }
                    }
                }

                _advancedLogger.LogInformation(
                    "[FFprobe Direct Probe] Station '{StationId}' file '{File}': {Width}x{Height} @ {Fps:0.##} fps ({PixFmt}), HasAudio={HasAudio} ({SampleRate}Hz, {Channels}ch)",
                    stationId, Path.GetFileName(filePath), meta.Width, meta.Height, meta.Fps, meta.PixFmt, meta.HasAudio, meta.AudioSampleRate, meta.AudioChannels);
            }
            catch (Exception ex)
            {
                _advancedLogger.LogError(ex, "[FFprobe Direct Probe] Failed probing file '{File}' for station '{StationId}'.", filePath, stationId);
            }

            return meta;
        }

        private static bool ParseFpsFraction(string? fpsStr, out double fps)
        {
            fps = 30.0;
            if (string.IsNullOrWhiteSpace(fpsStr)) return false;
            var parts = fpsStr.Split('/');
            if (parts.Length == 2 &&
                double.TryParse(parts[0], NumberStyles.Any, CultureInfo.InvariantCulture, out double num) &&
                double.TryParse(parts[1], NumberStyles.Any, CultureInfo.InvariantCulture, out double den) && den > 0)
            {
                fps = num / den;
                return true;
            }
            if (double.TryParse(fpsStr, NumberStyles.Any, CultureInfo.InvariantCulture, out double val) && val > 0)
            {
                fps = val;
                return true;
            }
            return false;
        }

        /// <summary>
        /// מייצר שקופית גישור התואמת 1:1 למטא-דאטה של הצ'אנק הצמוד אליה
        /// </summary>
        private async Task<string> GenerateMatchedBridgeVideoAsync(
            double durationSeconds,
            ProbedStationMetadata probe,
            string tempDir,
            CancellationToken ct)
        {
            string bridgePath = Path.Combine(tempDir, $"bridge_{Guid.NewGuid():N}.mp4");
            string ffmpegPath = ResolveFfmpegBinary();
            string durStr = durationSeconds.ToString("0.000", CultureInfo.InvariantCulture);
            string fpsStr = Math.Clamp(probe.Fps, 10, 120).ToString("0.00", CultureInfo.InvariantCulture);

            string args;
            if (probe.HasAudio)
            {
                string channelLayout = probe.AudioChannels == 1 ? "mono" : "stereo";
                args = $"-nostdin -loglevel error -y " +
                       $"-f lavfi -i color=c=black:s={probe.Width}x{probe.Height}:r={fpsStr} " +
                       $"-f lavfi -i anullsrc=r={probe.AudioSampleRate}:cl={channelLayout} " +
                       $"-t {durStr} " +
                       $"-c:v libx264 -preset ultrafast -pix_fmt yuv420p " +
                       $"-c:a aac -b:a 128k -ar {probe.AudioSampleRate} -ac {probe.AudioChannels} " +
                       $"\"{bridgePath.Replace('\\', '/')}\"";
            }
            else
            {
                args = $"-nostdin -loglevel error -y " +
                       $"-f lavfi -i color=c=black:s={probe.Width}x{probe.Height}:r={fpsStr} " +
                       $"-t {durStr} " +
                       $"-c:v libx264 -preset ultrafast -pix_fmt yuv420p " +
                       $"-an \"{bridgePath.Replace('\\', '/')}\"";
            }

            var psi = new ProcessStartInfo
            {
                FileName = ffmpegPath,
                Arguments = args,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            using var proc = Process.Start(psi);
            if (proc != null)
            {
                await proc.WaitForExitAsync(ct);
            }

            return bridgePath;
        }

        /// <summary>
        /// מרנדר קובץ MP4 עבור התחנה: דוגם את הצ'אנק הקרוב לחיתוך, ודוגם צ'אנק שכן עבור כל פער פנימי
        /// </summary>
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
            if (orderedChunks.Count == 0)
            {
                throw new InvalidOperationException($"No video chunks found for station '{stationId}'.");
            }

            // מנגנון מטמון מקומי לדגימות FFprobe לפי נתיב קובץ
            var probeCache = new Dictionary<string, ProbedStationMetadata>(StringComparer.OrdinalIgnoreCase);

            async Task<ProbedStationMetadata> GetChunkProbeAsync(RecordingChunkMetadata? chunk)
            {
                if (chunk == null || string.IsNullOrEmpty(chunk.FullPath) || !File.Exists(chunk.FullPath))
                    return new ProbedStationMetadata();

                if (probeCache.TryGetValue(chunk.FullPath, out var cached))
                    return cached;

                var probed = await ProbeMediaFileDirectlyAsync(chunk.FullPath, stationId, ct);
                probeCache[chunk.FullPath] = probed;
                return probed;
            }

            // 💡 1. דגימת Baseline ממוקדת: הצ'אנק שהכי קרוב לתחילת ה-Cut המבוקש (ולא הקובץ הראשון והמרוחק)
            DateTime cutStartUtc = plan.ActiveSegments.FirstOrDefault()?.StartUtc ?? orderedChunks[0].StartUtc;
            var representativeChunk = orderedChunks
                .Where(c => !string.IsNullOrEmpty(c.FullPath) && File.Exists(c.FullPath))
                .OrderBy(c => Math.Abs((c.StartUtc - cutStartUtc).TotalSeconds))
                .FirstOrDefault();

            var baselineProbe = await GetChunkProbeAsync(representativeChunk);
            _advancedLogger.LogInformation(
                "[CutSynchronizedTrack] Station '{StationId}' baseline probed from closest chunk '{File}' (Delta: {Delta:0.1}s from cut start).",
                stationId, Path.GetFileName(representativeChunk?.FullPath ?? "none"),
                representativeChunk != null ? Math.Abs((representativeChunk.StartUtc - cutStartUtc).TotalSeconds) : 0);

            var manifestLines = new List<string>();
            var cutJunctions = new List<double>();
            double runningSeconds = 0;
            bool anyChunkHasAudio = baselineProbe.HasAudio;

            for (int segIdx = 0; segIdx < plan.ActiveSegments.Count; segIdx++)
            {
                var seg = plan.ActiveSegments[segIdx];
                DateTime cursor = seg.StartUtc;
                RecordingChunkMetadata? lastPlayedChunkInSeg = null;

                if (segIdx > 0 && runningSeconds > 0.6)
                {
                    cutJunctions.Add(runningSeconds);
                }

                var segChunks = orderedChunks
                    .Where(c => c.EndUtc > seg.StartUtc && c.StartUtc < seg.EndUtc)
                    .OrderBy(c => c.StartUtc).ToList();

                foreach (var chunk in segChunks)
                {
                    // 💡 2. אם יש פער פנימי בריבוי תחנות: דוגמים את הצ'אנק השכן הצמוד לפער (הקודם או הנוכחי)
                    if (isMultiStation && chunk.StartUtc > cursor.AddSeconds(0.2))
                    {
                        double gapDur = (chunk.StartUtc - cursor).TotalSeconds;
                        var neighborChunk = lastPlayedChunkInSeg ?? chunk;
                        var neighborProbe = await GetChunkProbeAsync(neighborChunk);

                        _advancedLogger.LogInformation(
                            "[Bridge Neighbor Probe] Station '{StationId}' gap of {Dur:0.2}s bridged using neighbor chunk '{File}' ({W}x{H} @ {Fps:0.##}fps)",
                            stationId, gapDur, Path.GetFileName(neighborChunk.FullPath), neighborProbe.Width, neighborProbe.Height, neighborProbe.Fps);

                        string bridge = await GenerateMatchedBridgeVideoAsync(gapDur, neighborProbe, tempOutputDir, ct);
                        if (File.Exists(bridge))
                        {
                            manifestLines.Add($"file '{bridge.Replace('\\', '/')}'");
                            runningSeconds += gapDur;
                        }
                    }

                    DateTime effStart = chunk.StartUtc < cursor ? cursor : chunk.StartUtc;
                    DateTime effEnd = chunk.EndUtc > seg.EndUtc ? seg.EndUtc : chunk.EndUtc;
                    double dur = (effEnd - effStart).TotalSeconds;

                    if (dur > 0.05 && File.Exists(chunk.FullPath))
                    {
                        manifestLines.Add($"file '{chunk.FullPath.Replace('\\', '/')}'");
                        runningSeconds += dur;
                        cursor = effEnd;
                        lastPlayedChunkInSeg = chunk;
                    }
                }

                // 💡 3. סגירת פער פרטני בסוף המקטע הפעיל: דוגמים את הצ'אנק האחרון שניגן
                if (isMultiStation && cursor < seg.EndUtc.AddSeconds(-0.2))
                {
                    double gapDur = (seg.EndUtc - cursor).TotalSeconds;
                    var neighborChunk = lastPlayedChunkInSeg ?? representativeChunk;
                    var neighborProbe = await GetChunkProbeAsync(neighborChunk);

                    _advancedLogger.LogInformation(
                        "[Bridge Trailing Neighbor Probe] Station '{StationId}' trailing gap of {Dur:0.2}s bridged using chunk '{File}'",
                        stationId, gapDur, Path.GetFileName(neighborChunk?.FullPath ?? "none"));

                    string bridge = await GenerateMatchedBridgeVideoAsync(gapDur, neighborProbe, tempOutputDir, ct);
                    if (File.Exists(bridge))
                    {
                        manifestLines.Add($"file '{bridge.Replace('\\', '/')}'");
                        runningSeconds += gapDur;
                    }
                }
            }

            if (manifestLines.Count == 0)
            {
                throw new InvalidOperationException($"No valid media segments found to bundle for station {stationId}.");
            }

            string tempManifestPath = Path.Combine(Path.GetTempPath(), $"concat_{stationId}_{Guid.NewGuid():N}.txt");
            await File.WriteAllLinesAsync(tempManifestPath, manifestLines, new UTF8Encoding(false), ct);

            string outputPath = Path.Combine(tempOutputDir, $"{stationId}_{DateTime.UtcNow:yyyyMMdd_HHmmss}.mp4");

            // בניית פילטרי ה-Fade המאובטחים בנקודות הדילוג על פערים משותפים
            var vfFilters = new List<string>();
            vfFilters.Add("fade=t=in:st=0:d=0.3:enable='between(t,0,0.3)'");

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

            vfFilters.Add("format=yuv420p");
            string videoFilterArg = string.Join(",", vfFilters);

            // הגדרת ערוץ אודיו בהתאם לדגימת ה-FFprobe הממוקדת
            string audioArg = anyChunkHasAudio
                ? $"-c:a aac -b:a 128k -ar {baselineProbe.AudioSampleRate} -ac {baselineProbe.AudioChannels}"
                : "-an";

            string arguments = $"-nostdin -v error -stats -progress pipe:1 -f concat -safe 0 -i \"{tempManifestPath.Replace('\\', '/')}\" " +
                               $"-vf \"{videoFilterArg}\" " +
                               $"-c:v libx264 -preset veryfast -crf 20 {audioArg} -movflags +faststart -y \"{outputPath.Replace('\\', '/')}\"";

            var startInfo = new ProcessStartInfo
            {
                FileName = ResolveFfmpegBinary(),
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
                    while ((line = await reader.ReadLineAsync(ct)) != null)
                    {
                        var parts = line.Split('=', 2);
                        if (parts.Length != 2) continue;

                        string key = parts[0].Trim();
                        string val = parts[1].Trim();

                        if (key == "out_time_us" && long.TryParse(val, out long us))
                        {
                            progress?.Report((us / 1_000_000.0, 0, 1.0));
                        }
                        else if (key == "fps" && double.TryParse(val, NumberStyles.Any, CultureInfo.InvariantCulture, out double f))
                        {
                            progress?.Report((0, f, 1.0));
                        }
                    }
                }, ct);

                string errorOutput = await process.StandardError.ReadToEndAsync(ct);
                await Task.WhenAll(process.WaitForExitAsync(ct), readProgressTask);

                if (process.ExitCode != 0)
                {
                    throw new InvalidOperationException($"FFmpeg failed for {stationId}: {errorOutput}");
                }

                return (outputPath, anyChunkHasAudio);
            }
            finally
            {
                _concurrencyThrottle.Release();
                if (File.Exists(tempManifestPath)) try { File.Delete(tempManifestPath); } catch { }
            }
        }
    }
}