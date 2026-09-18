using System;
using System.Diagnostics;
using System.IO;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using ITB_SCREEN_RECORDER.Features.Extractor.Models;

namespace ITB_SCREEN_RECORDER.Features.Extractor.Services
{
    public class FfmpegConcatRunner : IFfmpegConcatRunner
    {
        private readonly string _ffmpegPath;
        private readonly ILogger<FfmpegConcatRunner> _logger;

        public FfmpegConcatRunner(IOptions<ExtractorOptions> options, ILogger<FfmpegConcatRunner> logger)
        {
            _logger = logger;
            _ffmpegPath = ResolveFfmpegBinary(options.Value.FfmpegPath, _logger);
            _logger.LogInformation("Extractor initialized FFmpeg at: {Path}", _ffmpegPath);
        }

        public virtual async Task ExecuteStreamCopyAsync(string concatManifestContent, Stream destinationStream, CancellationToken ct)
        {
            if (string.IsNullOrWhiteSpace(concatManifestContent))
            {
                throw new ArgumentException("Concat manifest content cannot be empty.", nameof(concatManifestContent));
            }

            string tempManifestPath = Path.Combine(Path.GetTempPath(), $"concat_{Guid.NewGuid():N}.txt");
            await File.WriteAllTextAsync(tempManifestPath, concatManifestContent, new UTF8Encoding(false), ct);

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
                    _logger.LogError("FFmpeg failed with exit code {ExitCode}: {Error}", process.ExitCode, stderrOutput);
                    throw new InvalidOperationException($"FFmpeg exited with code {process.ExitCode}: {stderrOutput}");
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

        private static string ResolveFfmpegBinary(string? configuredPath, ILogger logger)
        {
            string binaryName = OperatingSystem.IsWindows() ? "ffmpeg.exe" : "ffmpeg";

            // 1. נתיב שהוגדר במפורש בקונפיגורציה
            if (!string.IsNullOrWhiteSpace(configuredPath) && File.Exists(configuredPath))
            {
                EnsureLinuxExecutablePermissions(configuredPath, logger);
                return configuredPath;
            }

            // 2. בדיקה בשורש תיקיית הפיצ'ר (לפי ה-Link ב-csproj)
            string featureRootPath = Path.Combine(AppContext.BaseDirectory, "Features", "Extractor", binaryName);
            if (File.Exists(featureRootPath))
            {
                EnsureLinuxExecutablePermissions(featureRootPath, logger);
                return featureRootPath;
            }

            // 3. בדיקה בתיקיית Bin תחת הפיצ'ר
            string featureBinPath = Path.Combine(AppContext.BaseDirectory, "Features", "Extractor", "Bin", binaryName);
            if (File.Exists(featureBinPath))
            {
                EnsureLinuxExecutablePermissions(featureBinPath, logger);
                return featureBinPath;
            }

            // 4. בדיקה בשורש השרת
            string serverRootPath = Path.Combine(AppContext.BaseDirectory, binaryName);
            if (File.Exists(serverRootPath))
            {
                EnsureLinuxExecutablePermissions(serverRootPath, logger);
                return serverRootPath;
            }

            // 5. בדיקה בנתיבי המערכת הסטנדרטיים של לינוקס (סביבת Podman)
            if (OperatingSystem.IsLinux())
            {
                string[] standardPaths = ["/usr/bin/ffmpeg", "/usr/local/bin/ffmpeg"];
                foreach (var path in standardPaths)
                {
                    if (File.Exists(path))
                        return path;
                }
            }

            // ברירת מחדל: הסתמכות על ה-PATH
            return binaryName;
        }

        private static void EnsureLinuxExecutablePermissions(string filePath, ILogger logger)
        {
            if (!OperatingSystem.IsLinux() || !File.Exists(filePath))
                return;

            try
            {
                File.SetUnixFileMode(filePath,
                    UnixFileMode.UserRead | UnixFileMode.UserWrite | UnixFileMode.UserExecute |
                    UnixFileMode.GroupRead | UnixFileMode.GroupExecute |
                    UnixFileMode.OtherRead | UnixFileMode.OtherExecute);

                logger.LogInformation("Applied Linux execution permissions (0755) to: {Path}", filePath);
            }
            catch (Exception ex)
            {
                logger.LogWarning("Failed to set Unix permissions on {Path}: {Message}", filePath, ex.Message);
            }
        }
    }
}