// ==========================================
// File: Features/ExtractorAdvanced/Services/AdvancedExtractorService.cs
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
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using ITB_SCREEN_RECORDER.Features.Extractor.Models;
using ITB_SCREEN_RECORDER.Features.Extractor.Services;
using ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Models;

namespace ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Services
{
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

        public string ResolveFfmpegBinary() => ResolveBinary("ffmpeg");
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
            var chunks = await _storageScanner.GetChunksForStationAsync(hostname, targetUtc.AddMinutes(-2), targetUtc.AddMinutes(2));
            await AdjustChunksToAccuratePtsAsync(chunks, ct);

            var matchingChunk = chunks.FirstOrDefault(c => c.StartUtc <= targetUtc && targetUtc <= c.EndUtc);
            if (matchingChunk == null)
            {
                chunks = await _storageScanner.GetChunksForStationAsync(hostname, targetUtc.AddHours(-1), targetUtc.AddHours(1));
                await AdjustChunksToAccuratePtsAsync(chunks, ct);
                matchingChunk = chunks.FirstOrDefault(c => c.StartUtc <= targetUtc && targetUtc <= c.EndUtc);
            }

            string ffmpegPath = ResolveFfmpegBinary();

            if (matchingChunk == null || !File.Exists(matchingChunk.FullPath) || targetUtc < matchingChunk.StartUtc || targetUtc > matchingChunk.EndUtc)
            {
                byte[] noSignal = await _patternService.GetOrCreateNoSignalFrameAsync(ffmpegPath, ct);
                _memoryCache?.Set(cacheKey, noSignal, TimeSpan.FromMinutes(5));
                return new MemoryStream(noSignal);
            }

            using var memoryStream = new MemoryStream(65536);
            using var linkedCts = CancellationTokenSource.CreateLinkedTokenSource(ct);
            linkedCts.CancelAfter(TimeSpan.FromSeconds(5));

            try
            {
                double offsetSeconds = Math.Max(0, (targetUtc - matchingChunk.StartUtc).TotalSeconds);
                string normalizedPath = matchingChunk.FullPath.Replace('\\', '/');

                var startInfo = new ProcessStartInfo
                {
                    FileName = ffmpegPath,
                    Arguments = $"-nostdin -loglevel error -noautorotate -ss {offsetSeconds.ToString("0.000", CultureInfo.InvariantCulture)} " +
                                $"-i \"{normalizedPath}\" -an -sn -dn -threads 2 -vframes 1 -q:v 4 -f image2pipe -vcodec mjpeg pipe:1",
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
                    byte[] bytes = memoryStream.ToArray();
                    _memoryCache?.Set(cacheKey, bytes, TimeSpan.FromMinutes(3));
                    return new MemoryStream(bytes);
                }

                byte[] fallback = await _patternService.GetOrCreateNoSignalFrameAsync(ffmpegPath, ct);
                return new MemoryStream(fallback);
            }
            catch
            {
                byte[] fallback = await _patternService.GetOrCreateNoSignalFrameAsync(ffmpegPath, ct);
                return new MemoryStream(fallback);
            }
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
            DateTime currentCursor = startUtc;

            if (orderedChunks[0].StartUtc > startUtc)
            {
                double gapDur = (orderedChunks[0].StartUtc - currentCursor).TotalSeconds;
                if (gapDur > 0.1)
                {
                    string dummy = await _dummyVideoGenerator.GetOrCreateDummyVideoAsync(gapDur, ct);
                    if (!string.IsNullOrEmpty(dummy) && File.Exists(dummy)) manifestLines.Add($"file '{dummy.Replace('\\', '/')}'");
                }
                currentCursor = orderedChunks[0].StartUtc;
            }

            for (int i = 0; i < orderedChunks.Count; i++)
            {
                var chunk = orderedChunks[i];
                if (chunk.StartUtc > currentCursor)
                {
                    double gapDur = (chunk.StartUtc - currentCursor).TotalSeconds;
                    if (gapDur > 0.1)
                    {
                        string dummy = await _dummyVideoGenerator.GetOrCreateDummyVideoAsync(gapDur, ct);
                        if (!string.IsNullOrEmpty(dummy) && File.Exists(dummy)) manifestLines.Add($"file '{dummy.Replace('\\', '/')}'");
                    }
                }
                manifestLines.Add($"file '{chunk.FullPath.Replace('\\', '/')}'");
                currentCursor = chunk.EndUtc > currentCursor ? chunk.EndUtc : currentCursor;
            }

            if (currentCursor < endUtc)
            {
                double trailingDur = (endUtc - currentCursor).TotalSeconds;
                if (trailingDur > 0.1)
                {
                    string dummy = await _dummyVideoGenerator.GetOrCreateDummyVideoAsync(trailingDur, ct);
                    if (!string.IsNullOrEmpty(dummy) && File.Exists(dummy)) manifestLines.Add($"file '{dummy.Replace('\\', '/')}'");
                }
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

        public async Task<string> CutSynchronizedStationTrackAsync(
            string stationId,
            DateTime startUtc,
            DateTime endUtc,
            string tempOutputDir,
            IProgress<(double SecondsProcessed, double Fps, double SpeedMultiplier)>? progress = null,
            CancellationToken ct = default)
        {
            var chunks = await _storageScanner.GetChunksForStationAsync(stationId, startUtc, endUtc);
            await AdjustChunksToAccuratePtsAsync(chunks, ct);

            var orderedChunks = chunks.OrderBy(c => c.StartUtc).ToList();
            var manifestLines = new List<string>();
            DateTime currentCursor = startUtc;

            if (orderedChunks.Count == 0 || orderedChunks[0].StartUtc > startUtc)
            {
                DateTime gapEnd = orderedChunks.Count == 0 ? endUtc : orderedChunks[0].StartUtc;
                if (gapEnd > endUtc) gapEnd = endUtc;

                double gapDur = (gapEnd - currentCursor).TotalSeconds;
                if (gapDur > 0.05)
                {
                    string dummy = await _dummyVideoGenerator.GetOrCreateDummyVideoAsync(gapDur, ct);
                    if (!string.IsNullOrEmpty(dummy) && File.Exists(dummy))
                        manifestLines.Add($"file '{dummy.Replace('\\', '/')}'");
                }
                currentCursor = gapEnd;
            }

            for (int i = 0; i < orderedChunks.Count; i++)
            {
                var chunk = orderedChunks[i];

                if (chunk.StartUtc > currentCursor)
                {
                    double gapDur = (chunk.StartUtc - currentCursor).TotalSeconds;
                    if (gapDur > 0.05)
                    {
                        string dummy = await _dummyVideoGenerator.GetOrCreateDummyVideoAsync(gapDur, ct);
                        if (!string.IsNullOrEmpty(dummy) && File.Exists(dummy))
                            manifestLines.Add($"file '{dummy.Replace('\\', '/')}'");
                    }
                }

                if (chunk.EndUtc > currentCursor)
                {
                    manifestLines.Add($"file '{chunk.FullPath.Replace('\\', '/')}'");
                    currentCursor = chunk.EndUtc > currentCursor ? chunk.EndUtc : currentCursor;
                }

                if (currentCursor >= endUtc) break;
            }

            if (currentCursor < endUtc)
            {
                double trailingDur = (endUtc - currentCursor).TotalSeconds;
                if (trailingDur > 0.05)
                {
                    string dummy = await _dummyVideoGenerator.GetOrCreateDummyVideoAsync(trailingDur, ct);
                    if (!string.IsNullOrEmpty(dummy) && File.Exists(dummy))
                        manifestLines.Add($"file '{dummy.Replace('\\', '/')}'");
                }
            }

            string tempManifestPath = Path.Combine(Path.GetTempPath(), $"sync_{stationId}_{Guid.NewGuid():N}.txt");
            await File.WriteAllLinesAsync(tempManifestPath, manifestLines, new UTF8Encoding(false), ct);

            string outputPath = Path.Combine(tempOutputDir, $"{stationId}_{startUtc:yyyyMMdd_HHmmss}.mp4");
            double targetSeconds = (endUtc - startUtc).TotalSeconds;

            string vfFilter = "fade=t=in:st=0:d=0.3,fade=t=out:st=" + Math.Max(0.1, targetSeconds - 0.3).ToString("0.03", CultureInfo.InvariantCulture) + ":d=0.3,format=yuv420p";

            string arguments = $"-nostdin -v error -stats -progress pipe:1 -f concat -safe 0 -i \"{tempManifestPath.Replace('\\', '/')}\" " +
                               $"-t {targetSeconds.ToString("0.000", CultureInfo.InvariantCulture)} " +
                               $"-vf \"{vfFilter}\" " +
                               $"-c:v libx264 -preset veryfast -crf 20 -c:a aac -b:a 128k -movflags +faststart -y \"{outputPath.Replace('\\', '/')}\"";

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
                    double currentSeconds = 0;
                    double currentFps = 0;
                    double currentSpeed = 1.0;

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
                            currentSeconds = us / 1_000_000.0;
                            progress?.Report((currentSeconds, currentFps, currentSpeed));
                        }
                        else if (key == "fps" && double.TryParse(val, NumberStyles.Any, CultureInfo.InvariantCulture, out double f))
                        {
                            currentFps = f;
                        }
                        else if (key == "speed")
                        {
                            string sVal = val.Replace("x", "").Trim();
                            if (double.TryParse(sVal, NumberStyles.Any, CultureInfo.InvariantCulture, out double sp) && sp > 0)
                            {
                                currentSpeed = sp;
                            }
                        }
                    }
                }, ct);

                string errorOutput = await process.StandardError.ReadToEndAsync(ct);
                await Task.WhenAll(process.WaitForExitAsync(ct), readProgressTask);

                if (process.ExitCode != 0)
                    throw new InvalidOperationException($"FFmpeg failed for {stationId}: {errorOutput}");

                return outputPath;
            }
            finally
            {
                _concurrencyThrottle.Release();
                if (File.Exists(tempManifestPath)) try { File.Delete(tempManifestPath); } catch { }
            }
        }
    }
}