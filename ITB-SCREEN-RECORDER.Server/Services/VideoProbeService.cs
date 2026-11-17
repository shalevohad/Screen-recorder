namespace ITB_SCREEN_RECORDER.Server.Services;

using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using ITB_SCREEN_RECORDER.Core.Media.Engine;

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

    public VideoProbeService(ILogger<VideoProbeService> logger)
    {
        _logger = logger;
    }

    public async Task<MediaProbeResult?> ProbeFileAsync(string filePath, CancellationToken ct = default)
    {
        if (string.IsNullOrWhiteSpace(filePath) || !File.Exists(filePath))
        {
            return null;
        }

        try
        {
            var inProcessProbe = new FfmpegInProcessProbe();
            var probeResult = await inProcessProbe.ProbeFileAsync(filePath, ct).ConfigureAwait(false);
            if (probeResult.Success)
            {
                return new MediaProbeResult(
                    probeResult.Width > 0 ? probeResult.Width : 1920,
                    probeResult.Height > 0 ? probeResult.Height : 1080,
                    probeResult.Fps > 0 ? (int)Math.Round(probeResult.Fps) : 30,
                    probeResult.Duration.TotalSeconds,
                    probeResult.HasAudio
                );
            }
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "[VideoProbeService] In-process probe failed for '{Path}'.", filePath);
        }

        return null;
    }
}
