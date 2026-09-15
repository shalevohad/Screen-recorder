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
        private readonly ExtractorOptions _options;
        private readonly ILogger<DummyVideoGenerator> _logger;
        private readonly string _assetsDirectory;

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

        public async Task<string> GetOrGenerateDummyVideoAsync(string sampleFilePath)
        {
            var (width, height, fps) = await ProbeVideoPropertiesAsync(sampleFilePath);

            // יצירת מפתח ייחודי למטמון (Cache Key)
            string safeFps = fps.Replace("/", "_");
            string dummyFileName = $"nosignal_{width}x{height}_{safeFps}fps.mp4";
            string dummyFilePath = Path.Combine(_assetsDirectory, dummyFileName);

            if (File.Exists(dummyFilePath))
            {
                return dummyFilePath; // Lazy Load - כבר קיים במטמון
            }

            _logger.LogInformation("Dummy video not found in cache. Generating: {DummyFilePath}", dummyFilePath);
            await GenerateDummyVideoAsync(dummyFilePath, width, height, fps);

            return dummyFilePath;
        }

        private async Task<(string Width, string Height, string Fps)> ProbeVideoPropertiesAsync(string filePath)
        {
            string ffprobePath = GetExecutablePath("ffprobe");
            string arguments = $"-v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate -of default=noprint_wrappers=1:nokey=1 \"{filePath}\"";

            var startInfo = new ProcessStartInfo
            {
                FileName = ffprobePath,
                Arguments = arguments,
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

            // Fallback במקרה של כשל בזיהוי
            return ("1920", "1080", "30/1");
        }

        private async Task GenerateDummyVideoAsync(string outputPath, string width, string height, string fps)
        {
            string ffmpegPath = GetExecutablePath("ffmpeg");
            // יצירת סרטון שחור עם אודיו ריק באורך שעה (3600 שניות)
            string arguments = $"-f lavfi -i color=c=black:s={width}x{height}:r={fps} " +
                               $"-f lavfi -i anullsrc=channel_layout=stereo:sample_rate=48000 " +
                               $"-c:v libx264 -preset veryfast -crf 28 -c:a aac -t 3600 -pix_fmt yuv420p \"{outputPath}\"";

            var startInfo = new ProcessStartInfo
            {
                FileName = ffmpegPath,
                Arguments = arguments,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            using var process = new Process { StartInfo = startInfo };
            process.Start();
            await process.WaitForExitAsync();
        }

        private string GetExecutablePath(string binaryBaseName)
        {
            string binaryName = OperatingSystem.IsWindows() ? $"{binaryBaseName}.exe" : binaryBaseName;

            // תעדף את הנתיב מהקונפיגורציה אם קיים, אחרת השתמש בבינארי המקומי
            if (binaryBaseName == "ffmpeg" && !string.IsNullOrWhiteSpace(_options.FfmpegPath))
            {
                return _options.FfmpegPath;
            }

            string featureBinPath = Path.Combine(AppContext.BaseDirectory, "Features", "Extractor", "Bin", binaryName);
            return File.Exists(featureBinPath) ? featureBinPath : binaryName;
        }
    }
}