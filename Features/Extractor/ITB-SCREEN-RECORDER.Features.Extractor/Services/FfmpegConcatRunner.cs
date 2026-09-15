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
            _ffmpegPath = ResolveFfmpegBinary(options.Value.FfmpegPath);
            _logger.LogInformation("Extractor initialized FFmpeg at: {Path}", _ffmpegPath);
        }

        public async Task ExecuteStreamCopyAsync(string concatManifestContent, Stream destinationStream, CancellationToken ct)
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

        private static string ResolveFfmpegBinary(string? configuredPath)
        {
            string binaryName = OperatingSystem.IsWindows() ? "ffmpeg.exe" : "ffmpeg";

            if (!string.IsNullOrWhiteSpace(configuredPath) && File.Exists(configuredPath))
            {
                return configuredPath;
            }

            string featureBinPath = Path.Combine(AppContext.BaseDirectory, "Features", "Extractor", "Bin", binaryName);
            if (File.Exists(featureBinPath))
            {
                return featureBinPath;
            }

            string rootPath = Path.Combine(AppContext.BaseDirectory, binaryName);
            if (File.Exists(rootPath))
            {
                return rootPath;
            }

            return binaryName;
        }
    }
}