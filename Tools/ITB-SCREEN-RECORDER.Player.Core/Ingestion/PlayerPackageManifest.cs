using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ITB_SCREEN_RECORDER.Player.Core.Ingestion
{
    /// <summary>
    /// Deserialized model of session.json embedded inside an ITB export package (.tar/.itbp).
    /// </summary>
    public sealed class PlayerPackageManifest
    {
        [JsonPropertyName("sessionId")]
        public string SessionId { get; set; } = string.Empty;

        [JsonPropertyName("rangeStartUtc")]
        public DateTime RangeStartUtc { get; set; }

        [JsonPropertyName("rangeEndUtc")]
        public DateTime RangeEndUtc { get; set; }

        [JsonPropertyName("keystrokeMode")]
        public string KeystrokeMode { get; set; } = "None";

        [JsonPropertyName("originalDurationSeconds")]
        public double OriginalDurationSeconds { get; set; }

        [JsonPropertyName("exportedDurationSeconds")]
        public double ExportedDurationSeconds { get; set; }

        [JsonPropertyName("audioConfiguration")]
        public PlayerAudioConfiguration AudioConfiguration { get; set; } = new();

        [JsonPropertyName("removedGlobalGaps")]
        public List<PlayerGlobalGap> RemovedGlobalGaps { get; set; } = new();

        [JsonPropertyName("stationGaps")]
        public List<PlayerStationGap> StationGaps { get; set; } = new();

        [JsonPropertyName("tracks")]
        public List<PlayerTrackInfo> Tracks { get; set; } = new();

        [JsonPropertyName("directorSegments")]
        public List<PlayerDirectorSegment>? DirectorSegments { get; set; }
    }

    public sealed class PlayerDirectorSegment
    {
        [JsonPropertyName("startEpochMs")]
        public long StartEpochMs { get; set; }

        [JsonPropertyName("endEpochMs")]
        public long EndEpochMs { get; set; }

        [JsonPropertyName("targetDisplayId")]
        public string TargetDisplayId { get; set; } = "mon-0";

        [JsonPropertyName("isManualOverride")]
        public bool IsManualOverride { get; set; }
    }

    public sealed class PlayerAudioConfiguration
    {
        [JsonPropertyName("channels")]
        public int Channels { get; set; } = 2;

        [JsonPropertyName("sampleRate")]
        public int SampleRate { get; set; } = 48000;

        [JsonPropertyName("discreteMapping")]
        public Dictionary<string, string> DiscreteMapping { get; set; } = new()
        {
            ["0"] = "Loopback",
            ["1"] = "Microphone"
        };

        [JsonPropertyName("description")]
        public string Description { get; set; } = string.Empty;
    }

    public sealed class PlayerGlobalGap
    {
        [JsonPropertyName("gapIndex")]
        public int GapIndex { get; set; }

        [JsonPropertyName("startUtc")]
        public DateTime StartUtc { get; set; }

        [JsonPropertyName("endUtc")]
        public DateTime EndUtc { get; set; }

        [JsonPropertyName("skippedDurationSeconds")]
        public double SkippedDurationSeconds { get; set; }

        [JsonPropertyName("timelineOffsetSeconds")]
        public double TimelineOffsetSeconds { get; set; }
    }

    public sealed class PlayerStationGap
    {
        [JsonPropertyName("stationId")]
        public string StationId { get; set; } = string.Empty;

        [JsonPropertyName("startUtc")]
        public DateTime StartUtc { get; set; }

        [JsonPropertyName("endUtc")]
        public DateTime EndUtc { get; set; }

        [JsonPropertyName("durationSeconds")]
        public double DurationSeconds { get; set; }

        [JsonPropertyName("bridgeType")]
        public string BridgeType { get; set; } = "NoSignal";
    }

    public sealed class PlayerTrackInfo
    {
        [JsonPropertyName("hostname")]
        public string Hostname { get; set; } = string.Empty;

        [JsonPropertyName("videoFileName")]
        public string VideoFileName { get; set; } = string.Empty;

        [JsonPropertyName("startOffsetMs")]
        public double StartOffsetMs { get; set; }

        [JsonPropertyName("durationMs")]
        public double DurationMs { get; set; }

        [JsonPropertyName("hasAudio")]
        public bool HasAudio { get; set; }

        [JsonPropertyName("audioChannels")]
        public int AudioChannels { get; set; } = 2;

        [JsonPropertyName("audioChannelMapping")]
        public string? AudioChannelMapping { get; set; } = "0:Loopback,1:Microphone";

        [JsonPropertyName("displayId")]
        public string DisplayId { get; set; } = "mon-0";

        [JsonPropertyName("isPrimary")]
        public bool IsPrimary { get; set; } = true;

        [JsonPropertyName("isDirectorCut")]
        public bool IsDirectorCut { get; set; } = false;

        [JsonPropertyName("width")]
        public int Width { get; set; } = 1920;

        [JsonPropertyName("height")]
        public int Height { get; set; } = 1080;

        [JsonPropertyName("x")]
        public int X { get; set; } = 0;

        [JsonPropertyName("y")]
        public int Y { get; set; } = 0;
    }
}
