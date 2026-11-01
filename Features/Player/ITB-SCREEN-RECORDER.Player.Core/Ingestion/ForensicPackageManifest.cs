using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ITB_SCREEN_RECORDER.Player.Core.Ingestion
{
    /// <summary>
    /// Deserialized model of session.json embedded inside an ITB forensic investigation export package (.tar/.itbp).
    /// </summary>
    public sealed class ForensicPackageManifest
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
        public ForensicAudioConfiguration AudioConfiguration { get; set; } = new();

        [JsonPropertyName("removedGlobalGaps")]
        public List<ForensicGlobalGap> RemovedGlobalGaps { get; set; } = new();

        [JsonPropertyName("stationGaps")]
        public List<ForensicStationGap> StationGaps { get; set; } = new();

        [JsonPropertyName("tracks")]
        public List<ForensicTrackInfo> Tracks { get; set; } = new();
    }

    public sealed class ForensicAudioConfiguration
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

    public sealed class ForensicGlobalGap
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

    public sealed class ForensicStationGap
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

    public sealed class ForensicTrackInfo
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
    }
}
