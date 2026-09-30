// ==========================================
// File: Features/Extractor/Services/FfmpegConcatRunner.cs
// ==========================================
using System;
using System.Diagnostics;
using System.IO;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace ITB_SCREEN_RECORDER.Features.Extractor.Services
{
    public class FfmpegConcatRunner : IFfmpegConcatRunner
    {
        private readonly string _ffmpegPath;
        private readonly ILogger<FfmpegConcatRunner> _logger;

        public FfmpegConcatRunner(
            IFfmpegBinaryResolver binaryResolver,
            ILogger<FfmpegConcatRunner> logger)
        {
            _logger = logger;
            _ffmpegPath = binaryResolver.ResolveFfmpeg();
            _logger.LogInformation("Extractor initialized FFmpeg at: {Path}", _ffmpegPath);
        }

        public virtual async Task ExecuteStreamCopyAsync(string concatManifestContent, Stream destinationStream, CancellationToken ct)
        {
            if (string.IsNullOrWhiteSpace(concatManifestContent))
            {
                throw new ArgumentException("Concat manifest content cannot be empty.", nameof(concatManifestContent));
            }

            // בדיקה חכמה: האם המניפסט מכיל שקופיות Dummy (פערי Gaps)?
            bool hasDummyGaps = concatManifestContent.Contains("dummy", StringComparison.OrdinalIgnoreCase);

            string tempManifestPath = Path.Combine(Path.GetTempPath(), $"concat_{Guid.NewGuid():N}.txt");
            await File.WriteAllTextAsync(tempManifestPath, concatManifestContent, new UTF8Encoding(false), ct);

            string arguments;
            if (hasDummyGaps)
            {
                _logger.LogInformation("[FFmpeg Runner] Gaps/Dummy segments detected in manifest. Switching to synchronized re-encoding pipeline.");
                arguments = $"-f concat -safe 0 -i \"{tempManifestPath.Replace('\\', '/')}\" " +
                            $"-c:v libx264 -preset veryfast -crf 20 -c:a aac -b:a 128k " +
                            $"-movflags frag_keyframe+empty_moov+default_base_moof " +
                            $"-f mp4 pipe:1";
            }
            else
            {
                arguments = $"-f concat -safe 0 -i \"{tempManifestPath.Replace('\\', '/')}\" " +
                            $"-c copy -avoid_negative_ts make_zero " +
                            $"-movflags frag_keyframe+empty_moov " +
                            $"-f mp4 pipe:1";
            }

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
    }
}