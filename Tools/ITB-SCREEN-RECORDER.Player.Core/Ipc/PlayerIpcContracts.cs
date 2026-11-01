using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ITB_SCREEN_RECORDER.Player.Core.Ipc;

/// <summary>
/// Standard error codes for the encrypted ITB Player IPC channel.
/// </summary>
public static class PlayerErrorCodes
{
    public const string ErrDiscoveryTimeout = "ERR_DISCOVERY_TIMEOUT";
    public const string ErrServerUnreachable = "ERR_SERVER_UNREACHABLE";
    public const string ErrNoRecordingCoverage = "ERR_NO_RECORDING_COVERAGE";
    public const string ErrPartialCoverage = "ERR_PARTIAL_COVERAGE";
    public const string ErrExtractionFailed = "ERR_EXTRACTION_FAILED";
    public const string ErrDownloadFailed = "ERR_DOWNLOAD_FAILED";
    public const string ErrPackageInvalid = "ERR_PACKAGE_INVALID";
    public const string ErrSeekOutOfBounds = "ERR_SEEK_OUT_OF_BOUNDS";
    public const string ErrTamperingDetected = "ERR_TAMPERING_DETECTED";
    public const string ErrAuthFailed = "ERR_AUTH_FAILED";
    public const string ErrProcessUnauthorized = "ERR_PROCESS_UNAUTHORIZED";
    public const string ErrGeneralException = "ERR_GENERAL_EXCEPTION";
}

/// <summary>
/// Parameters defining an automated multi-station replay request.
/// </summary>
public sealed class ReplayLaunchParams
{
    [JsonPropertyName("stations")]
    public List<string> Stations { get; set; } = new();

    [JsonPropertyName("startTimeUtc")]
    public DateTime StartTimeUtc { get; set; }

    [JsonPropertyName("endTimeUtc")]
    public DateTime EndTimeUtc { get; set; }

    [JsonPropertyName("seekTimeUtc")]
    public DateTime? SeekTimeUtc { get; set; }

    [JsonPropertyName("audioStation")]
    public string? AudioStation { get; set; }

    [JsonPropertyName("keystrokeMode")]
    public string KeystrokeMode { get; set; } = "BurnIn";

    [JsonPropertyName("layoutMode")]
    public string LayoutMode { get; set; } = "grid";

    [JsonPropertyName("multicastAddress")]
    public string MulticastAddress { get; set; } = "239.210.1.5";

    [JsonPropertyName("multicastPort")]
    public int MulticastPort { get; set; } = 5098;

    [JsonPropertyName("serverApiUrl")]
    public string? ServerApiUrl { get; set; }

    [JsonPropertyName("packagePath")]
    public string? PackagePath { get; set; }
}

/// <summary>
/// Duplex command sent from Calling Application (Caller) to ITB Player.
/// </summary>
public sealed class PlayerIpcCommand
{
    [JsonPropertyName("command")]
    public string Command { get; set; } = string.Empty;

    [JsonPropertyName("commandId")]
    public string CommandId { get; set; } = Guid.NewGuid().ToString("N");

    [JsonPropertyName("launchParams")]
    public ReplayLaunchParams? LaunchParams { get; set; }

    [JsonPropertyName("targetUtc")]
    public DateTime? TargetUtc { get; set; }

    [JsonPropertyName("rate")]
    public double? Rate { get; set; }

    [JsonPropertyName("audioStation")]
    public string? AudioStation { get; set; }

    [JsonPropertyName("muted")]
    public bool? Muted { get; set; }

    public static PlayerIpcCommand InitReplay(ReplayLaunchParams parameters) => new()
    {
        Command = "INIT_REPLAY",
        LaunchParams = parameters
    };

    public static PlayerIpcCommand Play() => new() { Command = "PLAY" };
    public static PlayerIpcCommand Pause() => new() { Command = "PAUSE" };
    public static PlayerIpcCommand Seek(DateTime targetUtc) => new() { Command = "SEEK", TargetUtc = targetUtc };
    public static PlayerIpcCommand SetRate(double rate) => new() { Command = "SET_RATE", Rate = rate };
    public static PlayerIpcCommand SetAudioStation(string station) => new() { Command = "SET_AUDIO", AudioStation = station };
    public static PlayerIpcCommand GetStatus() => new() { Command = "GET_STATUS" };
    public static PlayerIpcCommand Close() => new() { Command = "CLOSE" };
}

/// <summary>
/// Encrypted event emitted from ITB Player to the Calling Application (Caller).
/// </summary>
public sealed class PlayerIpcEvent
{
    [JsonPropertyName("eventType")]
    public string EventType { get; set; } = "STATE_CHANGED";

    [JsonPropertyName("state")]
    public string? State { get; set; }

    [JsonPropertyName("timestampUtc")]
    public DateTime TimestampUtc { get; set; } = DateTime.UtcNow;

    [JsonPropertyName("currentPlayheadUtc")]
    public DateTime? CurrentPlayheadUtc { get; set; }

    [JsonPropertyName("isPlaying")]
    public bool? IsPlaying { get; set; }

    [JsonPropertyName("playbackRate")]
    public double? PlaybackRate { get; set; }

    [JsonPropertyName("activeAudioStation")]
    public string? ActiveAudioStation { get; set; }

    [JsonPropertyName("timelineSeconds")]
    public double? TimelineSeconds { get; set; }

    [JsonPropertyName("totalDurationSeconds")]
    public double? TotalDurationSeconds { get; set; }

    [JsonPropertyName("progressPercent")]
    public int? ProgressPercent { get; set; }

    [JsonPropertyName("message")]
    public string? Message { get; set; }

    [JsonPropertyName("isFatal")]
    public bool IsFatal { get; set; }

    [JsonPropertyName("errorCode")]
    public string? ErrorCode { get; set; }

    [JsonPropertyName("errorDetails")]
    public Dictionary<string, string>? ErrorDetails { get; set; }

    [JsonPropertyName("commandId")]
    public string? CommandId { get; set; }

    [JsonPropertyName("success")]
    public bool? Success { get; set; }

    public static PlayerIpcEvent StateChanged(string state, string? message = null, int? progress = null) => new()
    {
        EventType = "STATE_CHANGED",
        State = state,
        Message = message,
        ProgressPercent = progress
    };

    public static PlayerIpcEvent Heartbeat(DateTime playheadUtc, bool isPlaying, double rate, string? audioStation, double timelineSec, double durationSec) => new()
    {
        EventType = "HEARTBEAT",
        State = isPlaying ? "PLAYING" : "PAUSED",
        CurrentPlayheadUtc = playheadUtc,
        IsPlaying = isPlaying,
        PlaybackRate = rate,
        ActiveAudioStation = audioStation,
        TimelineSeconds = timelineSec,
        TotalDurationSeconds = durationSec
    };

    public static PlayerIpcEvent Error(string errorCode, string message, bool isFatal = true, Dictionary<string, string>? details = null) => new()
    {
        EventType = "ERROR",
        State = "ERROR",
        ErrorCode = errorCode,
        Message = message,
        IsFatal = isFatal,
        ErrorDetails = details
    };

    public static PlayerIpcEvent CommandAck(string commandId, bool success, string? message = null) => new()
    {
        EventType = "COMMAND_ACK",
        CommandId = commandId,
        Success = success,
        Message = message
    };
}
