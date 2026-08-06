using System;

namespace ITB_SCREEN_RECORDER.Core.Models
{
    /// <summary>
    /// דיווח טלמטריה תקופתי שנשלח מה-Agent אל ה-Server.
    /// </summary>
    public class AgentTelemetry
    {
        public string MachineName { get; set; } = string.Empty;
        public string IpAddress { get; set; } = string.Empty;
        public string ActiveUser { get; set; } = string.Empty;
        public string ActiveOu { get; set; } = string.Empty; // שיוך Active Directory
        public bool IsStreaming { get; set; }
        public bool IsAudioActive { get; set; }
        public double CpuUsagePercent { get; set; }
        public double MemoryUsageMb { get; set; }
        public double BitrateKbps { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }
}