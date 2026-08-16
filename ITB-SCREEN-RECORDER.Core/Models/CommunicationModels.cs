using System;
using System.Text.Json.Serialization; // <--- חובה להוסיף את ה-using הזה בראש הקובץ!

namespace ITB_SCREEN_RECORDER.Core.Models
{
    public enum AgentStatus { Offline = 0, Standby = 1, Streaming = 2, Error = 3 }
    public enum ServerCommand { Standby = 0, StartStream = 1, StopStream = 2 }

    public class AgentTelemetryReport
    {
        // זיהוי ורשת
        [JsonPropertyName("hostname")]
        public string Hostname { get; set; } = string.Empty;

        [JsonPropertyName("ipAddress")]
        public string IpAddress { get; set; } = string.Empty;

        // סטטוס אופרטיבי
        [JsonPropertyName("status")]
        public AgentStatus Status { get; set; }

        [JsonPropertyName("clientTimestamp")]
        public DateTime ClientTimestamp { get; set; }

        // מדדי חומרה ותהליכים
        [JsonPropertyName("isProcessRunning")]
        public bool IsProcessRunning { get; set; }

        [JsonPropertyName("isScreenCapturing")]
        public bool IsScreenCapturing { get; set; }

        [JsonPropertyName("hasActiveSpeakers")]
        public bool HasActiveSpeakers { get; set; }

        [JsonPropertyName("hasActiveMicrophone")]
        public bool HasActiveMicrophone { get; set; }

        // שינוי מ-float ל-double מבטיח פרסור חלק של מספרים עשרוניים ארוכים
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
    }
}