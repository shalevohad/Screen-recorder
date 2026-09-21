// ==========================================
// File: Features/ExtractorAdvanced/Services/AdvancedDummyVideoGenerator.cs
// ==========================================
using System;
using System.Diagnostics;
using System.IO;
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

            // פילטר וידאו טקטי: רקע כהה (#090E1A), תיבת ציאן, וכיתוב NO SIGNAL
            string videoFilter = $"drawbox=x=(w-520)/2:y=(h-180)/2:w=520:h=180:color=0x06b6d4@0.35:t=2," +
                                 $"drawtext=text='NO SIGNAL':fontcolor=0xf43f5e:fontsize=52:x=(w-text_w)/2:y=(h-text_h)/2-18," +
                                 $"drawtext=text='FEED INTERRUPTED - ARCHIVE GAP':fontcolor=0x94a3b8:fontsize=18:x=(w-text_w)/2:y=(h-text_h)/2+32";

            string arguments = $"-y " +
                               $"-f lavfi -i color=c=0x090e1a:s={width}x{height}:r={fps}:d=3600 " +
                               $"-f lavfi -i anullsrc=channel_layout=stereo:sample_rate=48000 " +
                               $"-vf \"{videoFilter}\" " +
                               $"-c:v libx264 -preset ultrafast -tune stillimage -crf 26 -pix_fmt yuv420p " +
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
                _advancedLogger.LogWarning("Tactical text filter failed (possibly missing font library in FFmpeg). Falling back to dark plate.");

                // Fallback לרקע טקטי חלק ללא טקסט במקרה ש-FFmpeg קומפל ללא libfreetype
                string fallbackArgs = $"-y " +
                                      $"-f lavfi -i color=c=0x090e1a:s={width}x{height}:r={fps}:d=3600 " +
                                      $"-f lavfi -i anullsrc=channel_layout=stereo:sample_rate=48000 " +
                                      $"-c:v libx264 -preset ultrafast -tune stillimage -crf 28 -pix_fmt yuv420p " +
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
                _advancedLogger.LogInformation("Successfully generated tactical NO SIGNAL dummy video for {W}x{H} @ {Fps}", width, height, fps);
            }
        }
    }
}