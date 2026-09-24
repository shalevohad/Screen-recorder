// ==========================================
// File: Features/ExtractorAdvanced/Services/NoSignalPatternService.cs
// ==========================================
using System;
using System.Collections.Concurrent;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Services
{
    public interface INoSignalPatternService
    {
        Task<byte[]> GetOrCreateNoSignalFrameAsync(string ffmpegPath, CancellationToken ct = default);
        Task<byte[]> GetOrCreateBlackTileAsync(string ffmpegPath, int width, int height, int frameCount, CancellationToken ct = default);
    }

    public class NoSignalPatternService : INoSignalPatternService
    {
        private readonly ILogger<NoSignalPatternService> _logger;
        private static byte[]? _noSignalFrameCache;
        private static readonly ConcurrentDictionary<string, byte[]> _blackTilesCache = new();
        private static readonly SemaphoreSlim _initLock = new(1, 1);

        public NoSignalPatternService(ILogger<NoSignalPatternService> logger)
        {
            _logger = logger;
        }

        public async Task<byte[]> GetOrCreateNoSignalFrameAsync(string ffmpegPath, CancellationToken ct = default)
        {
            if (_noSignalFrameCache != null && _noSignalFrameCache.Length > 0)
            {
                return _noSignalFrameCache;
            }

            await _initLock.WaitAsync(ct);
            try
            {
                if (_noSignalFrameCache != null && _noSignalFrameCache.Length > 0)
                {
                    return _noSignalFrameCache;
                }

                var baseDir = AppContext.BaseDirectory;
                var currentDir = Directory.GetCurrentDirectory();

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
                    Path.Combine(currentDir, "Assets", "no_signal.jpg"),
                    Path.Combine(currentDir, "Assets", "pm5544.jpg")
                };

                foreach (var imgPath in imageCandidates)
                {
                    if (File.Exists(imgPath))
                    {
                        try
                        {
                            using var imgMs = new MemoryStream(65536);
                            var procInfo = new ProcessStartInfo
                            {
                                FileName = ffmpegPath,
                                Arguments = $"-nostdin -loglevel error -i \"{imgPath.Replace('\\', '/')}\" " +
                                            $"-vf \"scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2:color=black,hue=s=0\" " +
                                            $"-vframes 1 -q:v 3 -f image2pipe -vcodec mjpeg pipe:1",
                                RedirectStandardOutput = true,
                                RedirectStandardError = false,
                                UseShellExecute = false,
                                CreateNoWindow = true
                            };

                            using var proc = new Process { StartInfo = procInfo };
                            proc.Start();
                            await proc.StandardOutput.BaseStream.CopyToAsync(imgMs, ct);
                            await proc.WaitForExitAsync(ct);

                            if (imgMs.Length > 1024)
                            {
                                _noSignalFrameCache = imgMs.ToArray();
                                return _noSignalFrameCache;
                            }
                        }
                        catch (Exception ex)
                        {
                            _logger.LogWarning(ex, "[NO SIGNAL] Failed processing static image {Path}", imgPath);
                        }
                    }
                }

                // מחולל פנימי מובנה של מעגל הבדיקה בשחור-לבן (Philips PM5544 Grayscale)
                using var ms = new MemoryStream(65536);
                string fontClause = ResolveFontClause();

                string filterGraph =
                    "color=c=0x383838:s=1280x720," +
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

                var startInfo = new ProcessStartInfo
                {
                    FileName = ffmpegPath,
                    Arguments = $"-nostdin -loglevel error -f lavfi -i \"{filterGraph}\" -vframes 1 -q:v 3 -f image2pipe -vcodec mjpeg pipe:1",
                    RedirectStandardOutput = true,
                    RedirectStandardError = false,
                    UseShellExecute = false,
                    CreateNoWindow = true
                };

                using var process = new Process { StartInfo = startInfo };
                process.Start();
                await process.StandardOutput.BaseStream.CopyToAsync(ms, ct);
                await process.WaitForExitAsync(ct);

                if (ms.Length > 1024)
                {
                    _noSignalFrameCache = ms.ToArray();
                    return _noSignalFrameCache;
                }

                // Fallback
                using var fallbackMs = new MemoryStream(32768);
                var fallbackInfo = new ProcessStartInfo
                {
                    FileName = ffmpegPath,
                    Arguments = "-nostdin -loglevel error -f lavfi -i smptehdbars=s=1280x720,hue=s=0 -vf \"drawbox=x=(w-500)/2:y=(h-120)/2:w=500:h=120:c=black:t=fill,drawbox=x=(w-500)/2:y=(h-120)/2:w=500:h=120:c=white:t=2\" -vframes 1 -q:v 4 -f image2pipe -vcodec mjpeg pipe:1",
                    RedirectStandardOutput = true,
                    RedirectStandardError = false,
                    UseShellExecute = false,
                    CreateNoWindow = true
                };
                using var fbProc = new Process { StartInfo = fallbackInfo };
                fbProc.Start();
                await fbProc.StandardOutput.BaseStream.CopyToAsync(fallbackMs, ct);
                await fbProc.WaitForExitAsync(ct);

                _noSignalFrameCache = fallbackMs.ToArray();
                return _noSignalFrameCache;
            }
            finally
            {
                _initLock.Release();
            }
        }

        public async Task<byte[]> GetOrCreateBlackTileAsync(string ffmpegPath, int width, int height, int frameCount, CancellationToken ct = default)
        {
            string key = $"{width}x{height}_{frameCount}";
            if (_blackTilesCache.TryGetValue(key, out var cachedBytes)) return cachedBytes;

            using var ms = new MemoryStream(32768);
            var startInfo = new ProcessStartInfo
            {
                FileName = ffmpegPath,
                Arguments = $"-nostdin -loglevel error -f lavfi -i color=c=0x0a0f1d:s={width}x{height} -vf \"tile={frameCount}x1\" -frames:v 1 -q:v 5 -f image2pipe -vcodec mjpeg pipe:1",
                RedirectStandardOutput = true,
                RedirectStandardError = false,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            using var process = new Process { StartInfo = startInfo };
            process.Start();
            await process.StandardOutput.BaseStream.CopyToAsync(ms, ct);
            await process.WaitForExitAsync(ct);

            byte[] tileBytes = ms.ToArray();
            _blackTilesCache.TryAdd(key, tileBytes);
            return tileBytes;
        }

        private static string ResolveFontClause()
        {
            if (OperatingSystem.IsWindows())
            {
                string winFont = "C:/Windows/Fonts/arial.ttf";
                if (File.Exists(winFont)) return $":fontfile='{winFont.Replace(":", "\\\\:")}'";
            }
            else if (OperatingSystem.IsLinux())
            {
                string[] linuxFonts = {
                    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
                    "/usr/share/fonts/dejavu/DejaVuSans-Bold.ttf",
                    "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"
                };
                var found = linuxFonts.FirstOrDefault(File.Exists);
                if (found != null) return $":fontfile='{found}'";
            }
            return "";
        }
    }
}