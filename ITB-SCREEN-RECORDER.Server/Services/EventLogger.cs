namespace ITB_SCREEN_RECORDER.Server.Services;

using System;
using System.Collections.Concurrent;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

/// <summary>
/// Generic append-only event logger, independent of the regular application/ILogger output.
/// <see cref="LogAsync"/> is the generic core (UTC timestamp, event name, key, free-form details,
/// and time-since-last-event-for-that-key) shared by every event type. Add a small typed wrapper
/// method here per feature as new event sources come along (recording chunk cuts today; agent
/// connect/disconnect, storage failover, etc. later) so callers get a purpose-built signature
/// instead of hand-formatting strings at each call site.
/// </summary>
public class EventLogger
{
    private readonly ILogger<EventLogger> _logger;
    private readonly ConcurrentDictionary<string, DateTime> _lastEventUtc = new(StringComparer.OrdinalIgnoreCase);
    private readonly SemaphoreSlim _writeLock = new(1, 1);

    public EventLogger(ILogger<EventLogger> logger)
    {
        _logger = logger;
    }

    /// <summary>
    /// Generic core writer. <paramref name="key"/> scopes the "time since previous event" tracking
    /// (e.g. a station name), so unrelated event streams sharing the same log file don't interfere
    /// with each other's cadence measurement.
    /// </summary>
    public async Task LogAsync(
        string logFilePath,
        string eventName,
        string key,
        string details,
        CancellationToken cancellationToken)
    {
        DateTime nowUtc = DateTime.UtcNow;
        TimeSpan? sincePrevious = _lastEventUtc.TryGetValue(key, out DateTime previousUtc)
            ? nowUtc - previousUtc
            : null;
        _lastEventUtc[key] = nowUtc;

        string sincePreviousText = sincePrevious.HasValue
            ? sincePrevious.Value.ToString(@"hh\:mm\:ss\.fff")
            : "N/A (first event for this key)";

        string line = $"{nowUtc:yyyy-MM-ddTHH:mm:ss.fffZ} | sincePrevious={sincePreviousText} | event={eventName} | key={key} | {details}";

        if (string.IsNullOrWhiteSpace(logFilePath))
        {
            return;
        }

        try
        {
            await _writeLock.WaitAsync(cancellationToken).ConfigureAwait(false);
            try
            {
                string? directory = Path.GetDirectoryName(logFilePath);
                if (!string.IsNullOrEmpty(directory))
                {
                    Directory.CreateDirectory(directory);
                }

                await File.AppendAllTextAsync(logFilePath, line + Environment.NewLine, cancellationToken).ConfigureAwait(false);
            }
            finally
            {
                _writeLock.Release();
            }
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "[EVENT LOG] Failed to write event to '{Path}'.", logFilePath);
        }
    }

    /// <summary>
    /// Typed wrapper for a recording-chunk cut: logs the UTC time, time since this station's
    /// previous cut, the station (recording) path, and whether MediaMTX confirmed the rotation.
    /// </summary>
    public Task LogChunkCutAsync(
        string logFilePath,
        string stationPath,
        string recordingRoot,
        bool succeeded,
        CancellationToken cancellationToken)
    {
        string eventName = succeeded ? "ChunkCut" : "ChunkCutFailed";
        string details = $"root={recordingRoot}";
        return LogAsync(logFilePath, eventName, stationPath, details, cancellationToken);
    }
}
