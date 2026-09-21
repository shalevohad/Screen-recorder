// ==========================================
// File: Features/ExtractorAdvanced/Services/AdvancedExtractorService.cs
// ==========================================
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using ITB_SCREEN_RECORDER.Features.Extractor.Models;
using ITB_SCREEN_RECORDER.Features.Extractor.Services;

namespace ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Services
{
    public static class DummyVideoGeneratorExtensions
    {
        public static async Task<string> GetOrCreateDummyVideoAsync(
            this IDummyVideoGenerator generator,
            double durationSeconds,
            CancellationToken ct)
        {
            if (generator == null) return string.Empty;

            var type = generator.GetType();
            var methods = type.GetMethods(BindingFlags.Public | BindingFlags.Instance);

            foreach (var m in methods)
            {
                var pars = m.GetParameters();
                if (pars.Length >= 1 && (pars[0].ParameterType == typeof(double) || pars[0].ParameterType == typeof(float) || pars[0].ParameterType == typeof(int)))
                {
                    try
                    {
                        object[] args = pars.Length >= 2 && pars[1].ParameterType == typeof(CancellationToken)
                            ? new object[] { durationSeconds, ct }
                            : new object[] { durationSeconds };

                        var res = m.Invoke(generator, args);
                        if (res is Task<string> taskStr) return await taskStr;
                        if (res is Task taskObj) { await taskObj; return string.Empty; }
                        if (res is string strPath) return strPath;
                    }
                    catch { }
                }
            }
            return string.Empty;
        }
    }

    public class AdvancedExtractorService : ExtractorService
    {
        private readonly IDummyVideoGenerator _dummyVideoGenerator;
        private readonly ILogger<AdvancedExtractorService> _advancedLogger;
        private readonly ExtractorOptions _extractorOptions;
        private readonly IMemoryCache? _memoryCache;

        public AdvancedExtractorService(
            IStorageScannerService storageScanner,
            IFfmpegConcatRunner ffmpegRunner,
            IOptions<ExtractorOptions> extractorOptions,
            IDummyVideoGenerator dummyVideoGenerator,
            ILogger<AdvancedExtractorService> logger,
            IMemoryCache? memoryCache = null)
            : base(storageScanner, ffmpegRunner, extractorOptions, logger)
        {
            _dummyVideoGenerator = dummyVideoGenerator;
            _advancedLogger = logger;
            _extractorOptions = extractorOptions.Value;
            _memoryCache = memoryCache;
        }

        protected new string ResolveFfmpegBinary()
        {
            string binaryName = OperatingSystem.IsWindows() ? "ffmpeg.exe" : "ffmpeg";

            string? assemblyDir = Path.GetDirectoryName(typeof(AdvancedExtractorService).Assembly.Location);
            if (!string.IsNullOrWhiteSpace(assemblyDir))
            {
                string pluginBinPath = Path.Combine(assemblyDir, binaryName);
                if (File.Exists(pluginBinPath))
                {
                    EnsureLinuxExecutablePermissions(pluginBinPath);
                    return pluginBinPath;
                }
            }

            if (!string.IsNullOrWhiteSpace(_extractorOptions.FfmpegPath) && File.Exists(_extractorOptions.FfmpegPath))
            {
                EnsureLinuxExecutablePermissions(_extractorOptions.FfmpegPath);
                return _extractorOptions.FfmpegPath;
            }

            var baseDir = AppContext.BaseDirectory;
            string[] directCandidates =
            {
                Path.Combine(baseDir, "Features", "ExtractorAdvanced", binaryName),
                Path.Combine(baseDir, "Features", "Extractor", binaryName),
                Path.Combine(baseDir, "Features", "Extractor", "Bin", binaryName),
                Path.Combine(baseDir, "Features", "Extractor", "Tools", "Win", binaryName),
                Path.Combine(baseDir, binaryName)
            };

            foreach (var path in directCandidates)
            {
                var full = Path.GetFullPath(path);
                if (File.Exists(full))
                {
                    EnsureLinuxExecutablePermissions(full);
                    return full;
                }
            }

            if (OperatingSystem.IsLinux())
            {
                string[] standardPaths = { "/usr/bin/ffmpeg", "/usr/local/bin/ffmpeg" };
                foreach (var path in standardPaths)
                {
                    if (File.Exists(path)) return path;
                }
            }

            return binaryName;
        }

        private void EnsureLinuxExecutablePermissions(string filePath)
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

        public async Task<Stream> ExtractFrameAsync(string hostname, long epochMs, CancellationToken ct = default)
        {
            long epochSec = epochMs / 1000;
            string cacheKey = $"frame_{hostname}_{epochSec}";

            if (_memoryCache != null && _memoryCache.TryGetValue(cacheKey, out byte[]? cachedBytes) && cachedBytes != null)
            {
                return new MemoryStream(cachedBytes);
            }

            DateTime targetUtc = DateTimeOffset.FromUnixTimeMilliseconds(epochMs).UtcDateTime;

            var chunks = await _storageScanner.GetChunksForStationAsync(hostname, targetUtc.AddMinutes(-5), targetUtc.AddMinutes(5));
            var matchingChunk = chunks.FirstOrDefault(c => c.StartUtc <= targetUtc && targetUtc <= c.EndUtc);

            if (matchingChunk == null)
            {
                chunks = await _storageScanner.GetChunksForStationAsync(hostname, targetUtc.AddHours(-1), targetUtc.AddHours(1));
                matchingChunk = chunks.FirstOrDefault(c => c.StartUtc <= targetUtc && targetUtc <= c.EndUtc)
                                ?? chunks.OrderBy(c => Math.Abs((c.StartUtc - targetUtc).Ticks)).FirstOrDefault();
            }

            string ffmpegPath = ResolveFfmpegBinary();
            var memoryStream = new MemoryStream(65536);

            try
            {
                string arguments;
                if (matchingChunk != null && File.Exists(matchingChunk.FullPath) && matchingChunk.StartUtc <= targetUtc && targetUtc <= matchingChunk.EndUtc)
                {
                    double offsetSeconds = Math.Max(0, (targetUtc - matchingChunk.StartUtc).TotalSeconds);
                    string normalizedChunkPath = matchingChunk.FullPath.Replace('\\', '/');

                    arguments = $"-nostdin -noautorotate -noaccurate_seek -ss {offsetSeconds.ToString("0.000", CultureInfo.InvariantCulture)} " +
                                $"-i \"{normalizedChunkPath}\" " +
                                $"-an -sn -dn -threads 2 -vframes 1 -q:v 4 -f image2pipe -vcodec mjpeg pipe:1";
                }
                else
                {
                    arguments = $"-nostdin -f lavfi -i color=c=black:s=640x360 -vframes 1 -q:v 5 -f image2pipe -vcodec mjpeg pipe:1";
                }

                var startInfo = new ProcessStartInfo
                {
                    FileName = ffmpegPath,
                    Arguments = arguments,
                    RedirectStandardOutput = true,
                    RedirectStandardError = false,
                    UseShellExecute = false,
                    CreateNoWindow = true
                };

                using var process = new Process { StartInfo = startInfo };
                process.Start();

                using var reg = ct.Register(() =>
                {
                    try { if (!process.HasExited) process.Kill(true); } catch { }
                });

                await process.StandardOutput.BaseStream.CopyToAsync(memoryStream, 32768, ct);
                await process.WaitForExitAsync(ct);

                if (memoryStream.Length > 0)
                {
                    byte[] frameBytes = memoryStream.ToArray();
                    _memoryCache?.Set(cacheKey, frameBytes, TimeSpan.FromMinutes(3));
                    return new MemoryStream(frameBytes);
                }

                return Stream.Null;
            }
            catch (OperationCanceledException)
            {
                return Stream.Null;
            }
            catch
            {
                return Stream.Null;
            }
        }

        public async Task<string> CutSynchronizedStationTrackAsync(
            string stationId,
            DateTime startUtc,
            DateTime endUtc,
            string tempOutputDir,
            CancellationToken ct = default)
        {
            var chunks = await _storageScanner.GetChunksForStationAsync(stationId, startUtc, endUtc);
            var orderedChunks = chunks.OrderBy(c => c.StartUtc).ToList();

            var manifestLines = new List<string>();
            DateTime currentCursor = startUtc;

            if (orderedChunks.Count == 0 || orderedChunks[0].StartUtc > startUtc)
            {
                DateTime gapEnd = orderedChunks.Count == 0 ? endUtc : orderedChunks[0].StartUtc;
                double gapDuration = (gapEnd - currentCursor).TotalSeconds;

                if (gapDuration > 0)
                {
                    string dummyPath = await _dummyVideoGenerator.GetOrCreateDummyVideoAsync(gapDuration, ct);
                    if (!string.IsNullOrEmpty(dummyPath) && File.Exists(dummyPath))
                    {
                        manifestLines.Add($"file '{dummyPath.Replace('\\', '/')}'");
                    }
                }
                currentCursor = gapEnd;
            }

            for (int i = 0; i < orderedChunks.Count; i++)
            {
                var chunk = orderedChunks[i];

                if (chunk.StartUtc > currentCursor)
                {
                    double gapDuration = (chunk.StartUtc - currentCursor).TotalSeconds;
                    string dummyPath = await _dummyVideoGenerator.GetOrCreateDummyVideoAsync(gapDuration, ct);
                    if (!string.IsNullOrEmpty(dummyPath) && File.Exists(dummyPath))
                    {
                        manifestLines.Add($"file '{dummyPath.Replace('\\', '/')}'");
                    }
                }

                manifestLines.Add($"file '{chunk.FullPath.Replace('\\', '/')}'");
                currentCursor = chunk.EndUtc > currentCursor ? chunk.EndUtc : currentCursor;
            }

            if (currentCursor < endUtc)
            {
                double trailingDuration = (endUtc - currentCursor).TotalSeconds;
                if (trailingDuration > 0)
                {
                    string dummyPath = await _dummyVideoGenerator.GetOrCreateDummyVideoAsync(trailingDuration, ct);
                    if (!string.IsNullOrEmpty(dummyPath) && File.Exists(dummyPath))
                    {
                        manifestLines.Add($"file '{dummyPath.Replace('\\', '/')}'");
                    }
                }
            }

            string tempManifestPath = Path.Combine(Path.GetTempPath(), $"sync_{stationId}_{Guid.NewGuid():N}.txt");
            await File.WriteAllLinesAsync(tempManifestPath, manifestLines, new UTF8Encoding(false), ct);

            string outputFileName = $"{stationId}_{startUtc:yyyyMMdd_HHmmss}.mp4";
            string outputPath = Path.Combine(tempOutputDir, outputFileName);

            double targetDurationSeconds = (endUtc - startUtc).TotalSeconds;
            string ffmpegPath = ResolveFfmpegBinary();

            string arguments = $"-f concat -safe 0 -i \"{tempManifestPath.Replace('\\', '/')}\" " +
                               $"-t {targetDurationSeconds.ToString("0.000", CultureInfo.InvariantCulture)} " +
                               $"-c:v libx264 -preset veryfast -crf 20 -c:a aac -b:a 128k -movflags +faststart -y \"{outputPath.Replace('\\', '/')}\"";

            _advancedLogger.LogInformation("[SYNC CUT] Rendering synchronized track for {Station} ({Duration}s) via FFmpeg at {Path}", stationId, targetDurationSeconds, ffmpegPath);

            var startInfo = new ProcessStartInfo
            {
                FileName = ffmpegPath,
                Arguments = arguments,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            await _concurrencyThrottle.WaitAsync(ct);
            using var process = new Process { StartInfo = startInfo };

            try
            {
                process.Start();
                string errorOutput = await process.StandardError.ReadToEndAsync(ct);
                await process.WaitForExitAsync(ct);

                if (process.ExitCode != 0)
                {
                    _advancedLogger.LogError("[SYNC CUT ERROR] Station {Station} failed: {Err}", stationId, errorOutput);
                    throw new InvalidOperationException($"FFmpeg failed for {stationId} with exit code {process.ExitCode}: {errorOutput}");
                }

                return outputPath;
            }
            finally
            {
                _concurrencyThrottle.Release();
                if (File.Exists(tempManifestPath))
                {
                    try { File.Delete(tempManifestPath); } catch { }
                }
            }
        }

        /// <summary>
        /// הפקת Spritesheet מבוססת מקטעים (Chunk/Tile) עם מטמון קשיח בדיסק ודילוג על פערי זמן
        /// </summary>
        public async Task<Stream> GenerateSpritesheetAsync(
            string hostname,
            DateTime startUtc,
            DateTime endUtc,
            int frameCount,
            int tileWidth = 160,
            int tileHeight = 90,
            CancellationToken ct = default)
        {
            frameCount = Math.Clamp(frameCount, 2, 8);
            tileWidth = Math.Clamp(tileWidth, 80, 240);
            tileHeight = Math.Clamp(tileHeight, 45, 135);

            // 1. בדיקת מטמון בדיסק: קבצי עבר אינם משתנים לעולם
            string cacheDir = Path.Combine(Path.GetTempPath(), "itb_sprites_cache", hostname);
            Directory.CreateDirectory(cacheDir);

            string cacheFileName = $"{startUtc:yyyyMMddHHmmss}_{endUtc:yyyyMMddHHmmss}_{frameCount}_{tileWidth}x{tileHeight}.jpg";
            string cacheFilePath = Path.Combine(cacheDir, cacheFileName);

            if (File.Exists(cacheFilePath) && new FileInfo(cacheFilePath).Length > 0)
            {
                return new FileStream(cacheFilePath, FileMode.Open, FileAccess.Read, FileShare.Read);
            }

            // 2. בדיקת קבצים פיזיים: אם אין הקלטות במקטע זה - החזרה מיידית של 204 No Content ללא הרצת FFmpeg
            var chunks = await _storageScanner.GetChunksForStationAsync(hostname, startUtc, endUtc);
            if (chunks.Count == 0)
            {
                return Stream.Null;
            }

            // 3. ייצור מהיר של האריח הנקודתי (מקיף 1-2 צ'אנקים בלבד)
            string concatManifest = await _storageScanner.BuildConcatManifestAsync(chunks, startUtc, endUtc);
            string tempManifestPath = Path.Combine(Path.GetTempPath(), $"spritesheet_{Guid.NewGuid():N}.txt");
            await File.WriteAllTextAsync(tempManifestPath, concatManifest, new UTF8Encoding(false), ct);

            double totalSeconds = (endUtc - startUtc).TotalSeconds;
            double interval = Math.Max(0.1, totalSeconds / frameCount);

            string filters = $"fps=1/{interval.ToString("F3", CultureInfo.InvariantCulture)}," +
                             $"scale={tileWidth}:{tileHeight}:force_original_aspect_ratio=decrease," +
                             $"pad={tileWidth}:{tileHeight}:(ow-iw)/2:(oh-ih)/2:color=black," +
                             $"tile={frameCount}x1";

            string ffmpegPath = ResolveFfmpegBinary();
            string arguments = $"-nostdin -noautorotate -skip_frame nokey " +
                               $"-f concat -safe 0 -i \"{tempManifestPath.Replace('\\', '/')}\" " +
                               $"-vf \"{filters}\" -an -sn -dn -threads 2 " +
                               $"-frames:v 1 -q:v 5 -y \"{cacheFilePath.Replace('\\', '/')}\"";

            var startInfo = new ProcessStartInfo
            {
                FileName = ffmpegPath,
                Arguments = arguments,
                RedirectStandardOutput = false,
                RedirectStandardError = false,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            await _visualConcurrencyThrottle.WaitAsync(ct);
            using var process = new Process { StartInfo = startInfo };

            try
            {
                process.Start();

                using var reg = ct.Register(() =>
                {
                    try { if (!process.HasExited) process.Kill(true); } catch { }
                });

                await process.WaitForExitAsync(ct);

                if (File.Exists(cacheFilePath) && new FileInfo(cacheFilePath).Length > 0)
                {
                    return new FileStream(cacheFilePath, FileMode.Open, FileAccess.Read, FileShare.Read);
                }

                return Stream.Null;
            }
            catch (OperationCanceledException)
            {
                return Stream.Null;
            }
            finally
            {
                _visualConcurrencyThrottle.Release();
                if (File.Exists(tempManifestPath))
                {
                    try { File.Delete(tempManifestPath); } catch { }
                }
            }
        }
    }
}