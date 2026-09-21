// ==========================================
// File: Features/Extractor/Services/DummyVideoGenerator.cs
// ==========================================
using System;
using System.Diagnostics;
using System.IO;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using ITB_SCREEN_RECORDER.Features.Extractor.Models;

namespace ITB_SCREEN_RECORDER.Features.Extractor.Services
{
    public class DummyVideoGenerator : IDummyVideoGenerator
    {
        protected readonly ExtractorOptions _options;
        protected readonly ILogger<DummyVideoGenerator> _logger;
        protected readonly string _assetsDirectory;

        public DummyVideoGenerator(IOptions<ExtractorOptions> options, ILogger<DummyVideoGenerator> logger)
        {
            _options = options.Value;
            _logger = logger;
            _assetsDirectory = Path.Combine(AppContext.BaseDirectory, "Assets");
            if (!Directory.Exists(_assetsDirectory))
            {
                Directory.CreateDirectory(_assetsDirectory);
            }
        }

        /// <summary>
        /// מימוש מתודת הממשק: איתור שקופית קיימת או ייצור שקופית NO SIGNAL חדשה לפי מאפייני הווידאו
        /// </summary>
        public virtual async Task<string> GetOrGenerateDummyVideoAsync(string sampleFilePath)
        {
            var (width, height, fps) = await ProbeVideoPropertiesAsync(sampleFilePath);

            string safeFps = fps.Replace("/", "_");
            string dummyFileName = GetDummyFileName(width, height, safeFps);
            string dummyFilePath = Path.Combine(_assetsDirectory, dummyFileName);

            if (File.Exists(dummyFilePath) && new FileInfo(dummyFilePath).Length > 1024)
            {
                return dummyFilePath;
            }

            _logger.LogInformation("[DummyVideo] Generating tactical NO SIGNAL gap video: {DummyFilePath}", dummyFilePath);
            await GenerateDummyVideoAsync(dummyFilePath, width, height, fps);

            return dummyFilePath;
        }

        protected virtual string GetDummyFileName(string width, string height, string safeFps)
        {
            return $"dummy_nosignal_{width}x{height}_{safeFps}fps.mp4";
        }

        protected virtual async Task<(string Width, string Height, string Fps)> ProbeVideoPropertiesAsync(string filePath)
        {
            try
            {
                string ffprobePath = GetExecutablePath("ffprobe");

                var startInfo = new ProcessStartInfo
                {
                    FileName = ffprobePath,
                    Arguments = $"-v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate -of default=noprint_wrappers=1:nokey=1 \"{filePath}\"",
                    RedirectStandardOutput = true,
                    UseShellExecute = false,
                    CreateNoWindow = true
                };

                using var process = new Process { StartInfo = startInfo };
                process.Start();

                string output = await process.StandardOutput.ReadToEndAsync();
                await process.WaitForExitAsync();

                var lines = output.Split('\n', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
                if (lines.Length >= 3)
                {
                    return (lines[0], lines[1], lines[2]);
                }
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "[DummyVideo] ffprobe failed or not found. Falling back to default 1920x1080 @ 30fps.");
            }

            return ("1920", "1080", "30/1");
        }

        protected virtual async Task GenerateDummyVideoAsync(string outputPath, string width, string height, string fps)
        {
            try
            {
                string ffmpegPath = GetExecutablePath("ffmpeg");
                string tempPath = outputPath + ".tmp.mp4";

                // יצירת לוח טקטי כהה עם כיתוב NO SIGNAL מודגש על גבי הווידאו
                string vfFilter =
                    $"drawbox=y=0:color=black@0.9:width=iw:height=ih:t=fill," +
                    $"drawbox=y=ih/2-50:color=#0f172a@0.85:width=iw:height=100:t=fill," +
                    $"drawtext=text='NO SIGNAL':fontcolor=#f43f5e:fontsize=52:x=(w-text_w)/2:y=(h-text_h)/2-15:bold=1," +
                    $"drawtext=text='TELEMETRY LOSS - ARCHIVE GAP':fontcolor=#38bdf8:fontsize=22:x=(w-text_w)/2:y=(h-text_h)/2+25";

                string arguments = $"-y -f lavfi -i color=c=#090e17:s={width}x{height}:r={fps} " +
                                   $"-vf \"{vfFilter}\" " +
                                   $"-c:v libx264 -preset ultrafast -crf 26 -t 3600 -pix_fmt yuv420p \"{tempPath}\"";

                var startInfo = new ProcessStartInfo
                {
                    FileName = ffmpegPath,
                    Arguments = arguments,
                    RedirectStandardError = true,
                    UseShellExecute = false,
                    CreateNoWindow = true
                };

                using var process = new Process { StartInfo = startInfo };
                process.Start();
                string error = await process.StandardError.ReadToEndAsync();
                await process.WaitForExitAsync();

                if (process.ExitCode != 0)
                {
                    // Fallback במידה ו-FFmpeg לא קומפל עם libfreetype (drawtext): יצירת רקע שחור פשוט
                    _logger.LogWarning("[DummyVideo] Text overlay failed, falling back to clean tactical background: {Error}", error);

                    string fallbackArgs = $"-y -f lavfi -i color=c=#090e17:s={width}x{height}:r={fps} " +
                                          $"-c:v libx264 -preset ultrafast -crf 28 -t 3600 -pix_fmt yuv420p \"{tempPath}\"";

                    var fallbackInfo = new ProcessStartInfo
                    {
                        FileName = ffmpegPath,
                        Arguments = fallbackArgs,
                        UseShellExecute = false,
                        CreateNoWindow = true
                    };
                    using var fallbackProcess = Process.Start(fallbackInfo);
                    if (fallbackProcess != null) await fallbackProcess.WaitForExitAsync();
                }

                if (File.Exists(tempPath))
                {
                    File.Move(tempPath, outputPath, true);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[DummyVideo] Failed generating dummy gap video.");
            }
        }

        protected virtual string GetExecutablePath(string binaryBaseName)
        {
            string binaryName = OperatingSystem.IsWindows() ? $"{binaryBaseName}.exe" : binaryBaseName;

            // 1. קונפיגורציה ייעודית (אם הוגדר נתיב מלא)
            if (binaryBaseName == "ffmpeg" && !string.IsNullOrWhiteSpace(_options.FfmpegPath) && File.Exists(_options.FfmpegPath))
            {
                return _options.FfmpegPath;
            }

            // 2. באותה תיקייה שבה מוגדר ffmpeg
            if (!string.IsNullOrWhiteSpace(_options.FfmpegPath))
            {
                string ffmpegDir = Path.GetDirectoryName(_options.FfmpegPath) ?? "";
                string probeBesideFfmpeg = Path.Combine(ffmpegDir, binaryName);
                if (File.Exists(probeBesideFfmpeg)) return probeBesideFfmpeg;
            }

            // 3. תיקיית הפיצ'ר הישירה: Features/Extractor/<binaryName>
            string directFeaturePath = Path.Combine(AppContext.BaseDirectory, "Features", "Extractor", binaryName);
            if (File.Exists(directFeaturePath)) return directFeaturePath;

            // 4. לצד ה-Assembly של הפיצ'ר הנטען
            string asmLocation = typeof(DummyVideoGenerator).Assembly.Location;
            if (!string.IsNullOrWhiteSpace(asmLocation))
            {
                string asmDir = Path.GetDirectoryName(asmLocation) ?? "";
                string besideAsmPath = Path.Combine(asmDir, binaryName);
                if (File.Exists(besideAsmPath)) return besideAsmPath;
            }

            // 5. תת-תיקיית Bin של הפיצ'ר
            string featureBinPath = Path.Combine(AppContext.BaseDirectory, "Features", "Extractor", "Bin", binaryName);
            if (File.Exists(featureBinPath)) return featureBinPath;

            // 6. תיקיית השורש הראשית (win-x64)
            string rootPath = Path.Combine(AppContext.BaseDirectory, binaryName);
            if (File.Exists(rootPath)) return rootPath;

            return binaryName;
        }
    }
}