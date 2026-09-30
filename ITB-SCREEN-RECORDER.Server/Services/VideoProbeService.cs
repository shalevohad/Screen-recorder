namespace ITB_SCREEN_RECORDER.Server.Services;

using System;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

public record MediaProbeResult(
    int Width,
    int Height,
    int Fps,
    double DurationSeconds,
    bool HasAudio
);

public interface IVideoProbeService
{
    Task<MediaProbeResult?> ProbeFileAsync(string filePath, CancellationToken ct = default);
}

public class VideoProbeService : IVideoProbeService
{
    private readonly ILogger<VideoProbeService> _logger;
    private readonly string _ffprobePath;

    public VideoProbeService(ILogger<VideoProbeService> logger)
    {
        _logger = logger;
        _ffprobePath = ResolveFfprobePath();
    }

    public async Task<MediaProbeResult?> ProbeFileAsync(string filePath, CancellationToken ct = default)
    {
        if (!File.Exists(filePath) || string.IsNullOrWhiteSpace(_ffprobePath) || !File.Exists(_ffprobePath))
        {
            return null;
        }

        try
        {
            var startInfo = new ProcessStartInfo
            {
                FileName = _ffprobePath,
                Arguments = $"-v error -show_entries stream=codec_type,width,height,r_frame_rate -show_entries format=duration -of json \"{filePath}\"",
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            using var process = new Process { StartInfo = startInfo };
            process.Start();

            using var timeoutCts = CancellationTokenSource.CreateLinkedTokenSource(ct);
            timeoutCts.CancelAfter(TimeSpan.FromSeconds(8));

            string stdout = await process.StandardOutput.ReadToEndAsync(timeoutCts.Token).ConfigureAwait(false);
            await process.WaitForExitAsync(timeoutCts.Token).ConfigureAwait(false);

            if (process.ExitCode != 0 || string.IsNullOrWhiteSpace(stdout))
            {
                return null;
            }

            using var doc = JsonDocument.Parse(stdout);
            var root = doc.RootElement;

            double duration = 0;
            if (root.TryGetProperty("format", out var formatElem) &&
                formatElem.TryGetProperty("duration", out var durElem) &&
                double.TryParse(durElem.GetString(), NumberStyles.Any, CultureInfo.InvariantCulture, out double parsedDur))
            {
                duration = parsedDur;
            }

            int width = 1920;
            int height = 1080;
            int fps = 30;
            bool hasAudio = false;

            if (root.TryGetProperty("streams", out var streamsElem) && streamsElem.ValueKind == JsonValueKind.Array)
            {
                foreach (var stream in streamsElem.EnumerateArray())
                {
                    if (stream.TryGetProperty("codec_type", out var typeProp))
                    {
                        string? type = typeProp.GetString();
                        if (type == "video")
                        {
                            if (stream.TryGetProperty("width", out var wProp)) width = wProp.GetInt32();
                            if (stream.TryGetProperty("height", out var hProp)) height = hProp.GetInt32();
                            if (stream.TryGetProperty("r_frame_rate", out var fpsProp))
                            {
                                fps = ParseFrameRate(fpsProp.GetString());
                            }
                        }
                        else if (type == "audio")
                        {
                            hasAudio = true;
                        }
                    }
                }
            }

            return new MediaProbeResult(width, height, fps, duration, hasAudio);
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "[PROBE] ffprobe failed for file: '{Path}'", filePath);
            return null;
        }
    }

    private static int ParseFrameRate(string? rFrameRate)
    {
        if (string.IsNullOrWhiteSpace(rFrameRate)) return 30;
        var parts = rFrameRate.Split('/');
        if (parts.Length == 2 &&
            double.TryParse(parts[0], NumberStyles.Any, CultureInfo.InvariantCulture, out double num) &&
            double.TryParse(parts[1], NumberStyles.Any, CultureInfo.InvariantCulture, out double den) &&
            den > 0)
        {
            return (int)Math.Round(num / den);
        }
        if (int.TryParse(rFrameRate, out int parsed)) return parsed;
        return 30;
    }

    private static string? ResolveFfprobePath()
    {
        string baseDir = AppContext.BaseDirectory;
        bool isWindows = OperatingSystem.IsWindows();

        string binaryPath = isWindows
            ? Path.Combine(baseDir, "Tools", "Win", "ffprobe.exe")
            : Path.Combine(baseDir, "Tools", "Linux", "ffprobe");

        if (File.Exists(binaryPath))
        {
            return binaryPath;
        }

        // Fallback לסביבת פיתוח (IDE)
        string devPath = isWindows
            ? Path.Combine(baseDir, "..", "..", "..", "Tools", "Win", "ffprobe.exe")
            : Path.Combine(baseDir, "..", "..", "..", "Tools", "Linux", "ffprobe");

        if (File.Exists(devPath))
        {
            return Path.GetFullPath(devPath);
        }

        // בדיקה אחרונה ב-PATH של מערכת ההפעלה
        return isWindows ? "ffprobe.exe" : "ffprobe";
    }
}