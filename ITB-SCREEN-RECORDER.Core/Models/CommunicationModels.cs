using System;

namespace ITB_SCREEN_RECORDER.Core.Models
{
    public enum AgentStatus { Offline = 0, Standby = 1, Streaming = 2, Error = 3 }
    public enum ServerCommand { Standby = 0, StartStream = 1, StopStream = 2 }

    public class AgentTelemetryReport
    {
        // זיהוי ורשת
        public string Hostname { get; set; } = string.Empty;
        public string IpAddress { get; set; } = string.Empty;

        // סטטוס אופרטיבי
        public AgentStatus Status { get; set; }
        public DateTime ClientTimestamp { get; set; }

        // מדדי חומרה ותהליכים (מוזג מהמודל המקורי שלך)
        public bool IsProcessRunning { get; set; }
        public bool IsScreenCapturing { get; set; }
        public bool HasActiveSpeakers { get; set; }
        public bool HasActiveMicrophone { get; set; }
        public float CpuUsagePercentage { get; set; }
        public float GpuUsagePercentage { get; set; }
        public bool IsStreaming { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }

    public class AgentHeartbeatResponse
    {
        public bool ShouldStream { get; set; }
        public ServerCommand Command { get; set; } = ServerCommand.Standby;
        public DateTime ServerTime { get; set; } = DateTime.UtcNow; // כיול שעון אבסולוטי
    }
}