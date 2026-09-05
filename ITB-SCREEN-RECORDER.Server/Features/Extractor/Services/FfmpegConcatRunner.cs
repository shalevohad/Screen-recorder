using System;
using System.Diagnostics;
using System.IO;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Logging;
using ITB_SCREEN_RECORDER.Server.Features.Extractor.Models;

namespace ITB_SCREEN_RECORDER.Server.Features.Extractor.Services
{
    public interface IFfmpegConcatRunner
    {
        Task ExecuteStreamCopyAsync(string concatManifestContent, Stream destinationStream, CancellationToken ct);
        Task ExtractSingleFrameAsync(string filePath, double offsetSeconds, Stream destinationStream, CancellationToken ct);
    }

    public class FfmpegConcatRunner : IFfmpegConcatRunner
    {
        private readonly string _ffmpegPath;
        private readonly ILogger<FfmpegConcatRunner> _logger;

        public FfmpegConcatRunner(IOptions<ExtractorOptions> options, ILogger<FfmpegConcatRunner> logger)
        {
            _logger = logger;
            _ffmpegPath = ResolveFfmpegBinary(options.Value.FfmpegPath);
            _logger.LogInformation("Extractor FFmpeg runner initialized using binary: {Path}", _ffmpegPath);
        }

        private static string ResolveFfmpegBinary(string? configuredPath)
        {
            string binaryName = OperatingSystem.IsWindows() ? "ffmpeg.exe" : "ffmpeg";

            // 1. אם הוגדר נתיב ייעודי ספציפי
            if (!string.IsNullOrWhiteSpace(configuredPath) && File.Exists(configuredPath))
            {
                return configuredPath;
            }

            // 2. איתור בתיקיית ה-Bin המבודדת של ה-Feature בפלט הריצה
            string featureBinPath = Path.Combine(AppContext.BaseDirectory, "Features", "Extractor", "Bin", binaryName);
            if (File.Exists(featureBinPath))
            {
                return featureBinPath;
            }

            // 3. בדיקה ישירה בשורש ספריית הריצה
            string rootAppPath = Path.Combine(AppContext.BaseDirectory, binaryName);
            if (File.Exists(rootAppPath))
            {
                return rootAppPath;
            }

            // 4. Fallback ל-PATH של מערכת ההפעלה (שימושי עבור Ubuntu ב-GitHub Actions)
            return binaryName;
        }

        public async Task ExecuteStreamCopyAsync(string concatManifestContent, Stream destinationStream, CancellationToken ct)
        {
            if (string.IsNullOrWhiteSpace(concatManifestContent))
            {
                throw new ArgumentException("Concat manifest content cannot be empty.", nameof(concatManifestContent));
            }

            string tempManifestPath = Path.Combine(Path.GetTempPath(), $"concat_{Guid.NewGuid():N}.txt");
            await File.WriteAllTextAsync(tempManifestPath, concatManifestContent, new UTF8Encoding(false), ct);

            // תיקון הדגלים להזרמת MP4 מקוטע (fMP4) ב-pipe:1 ללא שגיאות פרסר
            string arguments = $"-f concat -safe 0 -i \"{tempManifestPath.Replace('\\', '/')}\" " +
                               "-c copy -avoid_negative_ts make_zero " +
                               "-movflags frag_keyframe+empty_moov " +
                               "-f mp4 pipe:1";

            var startInfo = new ProcessStartInfo
            {
                FileName = _ffmpegPath,
                Arguments = arguments,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            using var process = new Process { StartInfo = startInfo };

            try
            {
                process.Start();

                using var registration = ct.Register(() =>
                {
                    try
                    {
                        if (!process.HasExited)
                        {
                            process.Kill(entireProcessTree: true);
                        }
                    }
                    catch { }
                });

                var stderrTask = process.StandardError.ReadToEndAsync(ct);

                await process.StandardOutput.BaseStream.CopyToAsync(destinationStream, 81920, ct);
                await process.WaitForExitAsync(ct);

                if (process.ExitCode != 0)
                {
                    string stderrOutput = await stderrTask;
                    _logger.LogError("FFmpeg concat failed with exit code {ExitCode}. Error: {Error}", process.ExitCode, stderrOutput);
                    throw new InvalidOperationException($"FFmpeg process exited with code {process.ExitCode}: {stderrOutput}");
                }
            }
            finally
            {
                if (File.Exists(tempManifestPath))
                {
                    try { File.Delete(tempManifestPath); } catch { }
                }
            }
        }

        public async Task ExtractSingleFrameAsync(string filePath, double offsetSeconds, Stream destinationStream, CancellationToken ct)
        {
            string normalizedPath = filePath.Replace('\\', '/');
            string arguments = $"-ss {offsetSeconds:F3} -i \"{normalizedPath}\" -vframes 1 -q:v 2 -f image2 pipe:1";

            var startInfo = new ProcessStartInfo
            {
                FileName = _ffmpegPath,
                Arguments = arguments,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            using var process = new Process { StartInfo = startInfo };
            process.Start();

            using var registration = ct.Register(() =>
            {
                try
                {
                    if (!process.HasExited)
                    {
                        process.Kill(entireProcessTree: true);
                    }
                }
                catch { }
            });

            await process.StandardOutput.BaseStream.CopyToAsync(destinationStream, 16384, ct);
            await process.WaitForExitAsync(ct);
        }
    }
}