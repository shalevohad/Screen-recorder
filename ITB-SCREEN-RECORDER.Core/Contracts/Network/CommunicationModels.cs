using System;
using System.Text.Json.Serialization;

namespace ITB_SCREEN_RECORDER.Core.Contracts.Network
{
    public enum AgentStatus { Offline = 0, Standby = 1, Streaming = 2, Error = 3 }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum ServerCommand { Standby = 0, StartStream = 1, StopStream = 2 }

    public class AgentStreamPolicy
    {
        [JsonPropertyName("rtmpServerBaseUrl")]
        public string RtmpServerBaseUrl { get; set; } = string.Empty;

        [JsonPropertyName("videoBitrate")]
        public string VideoBitrate { get; set; } = "5M";

        [JsonPropertyName("targetFps")]
        public int TargetFps { get; set; } = 30;
    }

    public class AgentTelemetryReport
    {
        [JsonPropertyName("hostname")]
        public string Hostname { get; set; } = string.Empty;

        [JsonPropertyName("ipAddress")]
        public string IpAddress { get; set; } = string.Empty;

        [JsonPropertyName("status")]
        public AgentStatus Status { get; set; }

        [JsonPropertyName("clientTimestamp")]
        public DateTime ClientTimestamp { get; set; }

        [JsonPropertyName("isProcessRunning")]
        public bool IsProcessRunning { get; set; }

        [JsonPropertyName("isScreenCapturing")]
        public bool IsScreenCapturing { get; set; }

        [JsonPropertyName("hasActiveSpeakers")]
        public bool HasActiveSpeakers { get; set; }

        [JsonPropertyName("hasActiveMicrophone")]
        public bool HasActiveMicrophone { get; set; }

        [JsonPropertyName("cpuUsagePercentage")]
        public double CpuUsagePercentage { get; set; }

        [JsonPropertyName("gpuUsagePercentage")]
        public double GpuUsagePercentage { get; set; }

        [JsonPropertyName("isStreaming")]
        public bool IsStreaming { get; set; }

        [JsonPropertyName("timestamp")]
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }

    public class AgentHeartbeatResponse
    {
        [JsonPropertyName("shouldStream")]
        public bool ShouldStream { get; set; }

        [JsonPropertyName("command")]
        public ServerCommand Command { get; set; } = ServerCommand.Standby;

        [JsonPropertyName("serverTime")]
        public DateTime ServerTime { get; set; } = DateTime.UtcNow;

        [JsonPropertyName("serverUtcTime")]
        public DateTime ServerUtcTime { get; set; } = DateTime.UtcNow;

        [JsonPropertyName("policy")]
        public AgentStreamPolicy? Policy { get; set; }
    }
}