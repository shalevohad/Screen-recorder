// ==========================================
// File: Features/ExtractorAdvanced/Services/AdvancedDummyVideoGenerator.cs
// ==========================================
using System;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using ITB_SCREEN_RECORDER.Features.Extractor.Models;
using ITB_SCREEN_RECORDER.Features.Extractor.Services;

namespace ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Services
{
    public class AdvancedDummyVideoGenerator : DummyVideoGenerator
    {
        private readonly ILogger<AdvancedDummyVideoGenerator> _advancedLogger;

        public AdvancedDummyVideoGenerator(
            IOptions<ExtractorOptions> options,
            ILogger<DummyVideoGenerator> baseLogger,
            ILogger<AdvancedDummyVideoGenerator> advancedLogger)
            : base(options, baseLogger)
        {
            _advancedLogger = advancedLogger;
        }

        protected override async Task GenerateDummyVideoAsync(string outputPath, string width, string height, string fps)
        {
            string ffmpegPath = GetExecutablePath("ffmpeg");
            var baseDir = AppContext.BaseDirectory;
            var currentDir = Directory.GetCurrentDirectory();

            // איתור קובץ no_signal.jpg שהועלה למערכת
            string[] imageCandidates = {
                Path.Combine(baseDir, "wwwroot", "assets", "no_signal.jpg"),
                Path.Combine(baseDir, "wwwroot", "assets", "no_signal.png"),
                Path.Combine(currentDir, "wwwroot", "assets", "no_signal.jpg"),
                Path.Combine(currentDir, "wwwroot", "assets", "no_signal.png"),
                Path.Combine(currentDir, "Features", "ExtractorAdvanced", "wwwroot", "assets", "no_signal.jpg"),
                Path.Combine(baseDir, "Features", "ExtractorAdvanced", "wwwroot", "assets", "no_signal.jpg"),
                Path.Combine(currentDir, "Features", "ExtractorAdvanced", "Client", "public", "assets", "no_signal.jpg"),
                Path.Combine(baseDir, "Features", "ExtractorAdvanced", "Client", "public", "assets", "no_signal.jpg"),
                Path.Combine(baseDir, "Assets", "no_signal.jpg"),
                Path.Combine(baseDir, "Assets", "pm5544.jpg"),
                Path.Combine(currentDir, "Assets", "no_signal.jpg")
            };

            string? foundImagePath = imageCandidates.FirstOrDefault(File.Exists);

            // 1. תרחיש א': יצירת וידאו Dummy מתוך תמונת no_signal.jpg בשחור-לבן
            if (!string.IsNullOrEmpty(foundImagePath))
            {
                try
                {
                    string imageFilter = $"scale={width}:{height}:force_original_aspect_ratio=decrease," +
                                         $"pad={width}:{height}:(ow-iw)/2:(oh-ih)/2:color=black,hue=s=0";

                    string imgArgs = $"-y " +
                                     $"-loop 1 -framerate {fps} -i \"{foundImagePath.Replace('\\', '/')}\" " +
                                     $"-f lavfi -i anullsrc=channel_layout=stereo:sample_rate=48000 " +
                                     $"-vf \"{imageFilter}\" " +
                                     $"-c:v libx264 -preset ultrafast -tune stillimage -crf 24 -pix_fmt yuv420p " +
                                     $"-c:a aac -b:a 64k -t 3600 -shortest \"{outputPath}\"";

                    var proc = Process.Start(new ProcessStartInfo
                    {
                        FileName = ffmpegPath,
                        Arguments = imgArgs,
                        UseShellExecute = false,
                        CreateNoWindow = true
                    });

                    if (proc != null)
                    {
                        await proc.WaitForExitAsync();
                        if (proc.ExitCode == 0 && File.Exists(outputPath) && new FileInfo(outputPath).Length > 1024)
                        {
                            _advancedLogger.LogInformation("Successfully generated B&W NO SIGNAL dummy video from static asset: {Path}", foundImagePath);
                            return;
                        }
                    }
                }
                catch (Exception ex)
                {
                    _advancedLogger.LogWarning(ex, "Failed generating dummy video from image, falling back to PM5544 procedural generator.");
                }
            }

            // 2. תרחיש ב': מחולל שקופית מעגל שידור קלאסי בשחור-לבן (Philips PM5544 Grayscale)
            string fontClause = "";
            if (OperatingSystem.IsWindows())
            {
                string winFont = "C:/Windows/Fonts/arial.ttf";
                if (File.Exists(winFont)) fontClause = $":fontfile='{winFont.Replace(":", "\\\\:")}'";
            }

            string filterGraph =
                $"color=c=0x383838:s={width}x{height}:r={fps}," +
                "drawgrid=w=56:h=56:t=1:c=white@0.35," +
                "drawbox=x=(w-680)/2:y=(h-680)/2:w=680:h=680:c=black@0.95:t=fill," +
                "drawbox=x=(w-680)/2:y=(h-680)/2:w=680:h=680:c=white:t=3," +
                "drawbox=x=(w-620)/2:y=90:w=103:h=90:c=white:t=fill," +
                "drawbox=x=(w-620)/2+103:y=90:w=103:h=90:c=0xcccccc:t=fill," +
                "drawbox=x=(w-620)/2+206:y=90:w=103:h=90:c=0x999999:t=fill," +
                "drawbox=x=(w-620)/2+309:y=90:w=103:h=90:c=0x666666:t=fill," +
                "drawbox=x=(w-620)/2+412:y=90:w=103:h=90:c=0x333333:t=fill," +
                "drawbox=x=(w-620)/2+515:y=90:w=105:h=90:c=black:t=fill," +
                "drawgrid=x=(w-620)/2:y=200:w=16:h=120:t=4:c=white@0.9," +
                "drawgrid=x=(w-620)/2+200:y=200:w=8:h=120:t=2:c=white@0.9," +
                "drawgrid=x=(w-620)/2+400:y=200:w=4:h=120:t=1:c=white@0.9," +
                "drawbox=x=(w-540)/2:y=(h-140)/2:w=540:h=140:c=black:t=fill," +
                "drawbox=x=(w-540)/2:y=(h-140)/2:w=540:h=140:c=white:t=2," +
                $"drawtext=text='NO SIGNAL'{fontClause}:fontcolor=white:fontsize=48:x=(w-text_w)/2:y=(h-text_h)/2-16," +
                $"drawtext=text='CH-01 • IBA ISRAEL'{fontClause}:fontcolor=0xcccccc:fontsize=18:x=(w-text_w)/2:y=(h-text_h)/2+24," +
                "drawbox=x=(w-620)/2:y=520:w=620:h=60:c=0x181818:t=fill," +
                "drawbox=x=(w-620)/2:y=580:w=620:h=40:c=white:t=fill," +
                "hue=s=0";

            string arguments = $"-y " +
                               $"-f lavfi -i \"{filterGraph}\" " +
                               $"-f lavfi -i anullsrc=channel_layout=stereo:sample_rate=48000 " +
                               $"-c:v libx264 -preset ultrafast -tune stillimage -crf 24 -pix_fmt yuv420p " +
                               $"-c:a aac -b:a 64k -t 3600 \"{outputPath}\"";

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
            string errorOutput = await process.StandardError.ReadToEndAsync();
            await process.WaitForExitAsync();

            if (process.ExitCode != 0)
            {
                _advancedLogger.LogWarning("PM5544 generator failed. Falling back to grayscale SMPTE bars.");

                string fallbackArgs = $"-y " +
                                      $"-f lavfi -i smptehdbars=s={width}x{height}:r={fps},hue=s=0 " +
                                      $"-f lavfi -i anullsrc=channel_layout=stereo:sample_rate=48000 " +
                                      $"-c:v libx264 -preset ultrafast -tune stillimage -crf 26 -pix_fmt yuv420p " +
                                      $"-c:a aac -b:a 64k -t 3600 \"{outputPath}\"";

                using var fallbackProcess = Process.Start(new ProcessStartInfo
                {
                    FileName = ffmpegPath,
                    Arguments = fallbackArgs,
                    UseShellExecute = false,
                    CreateNoWindow = true
                });

                if (fallbackProcess != null)
                {
                    await fallbackProcess.WaitForExitAsync();
                }
            }
            else
            {
                _advancedLogger.LogInformation("Successfully generated B&W PM5544 dummy video for {W}x{H} @ {Fps}", width, height, fps);
            }
        }
    }
}