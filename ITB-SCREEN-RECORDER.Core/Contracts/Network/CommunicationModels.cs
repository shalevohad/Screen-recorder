using System;
using System.Text.Json.Serialization;

namespace ITB_SCREEN_RECORDER.Core.Contracts.Network
{
    public enum AgentStatus { Offline = 0, Standby = 1, Streaming = 2, Error = 3 }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum ServerCommand { Standby = 0, StartStream = 1, StopStream = 2 }

    // 💡 נוסף Enum פקודות סנכרון 
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum BufferCommand { WAIT = 0, UPLOAD_GRANTED = 1, DISCARD_ALL = 2 }

    public class AgentStreamPolicy
    {
        [JsonPropertyName("rtmpServerBaseUrl")]
        public string RtmpServerBaseUrl { get; set; } = string.Empty;

        [JsonPropertyName("videoBitrate")]
        public string VideoBitrate { get; set; } = "2M";

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

        [JsonPropertyName("isStreaming")]
        public bool IsStreaming { get; set; }

        [JsonPropertyName("timestamp")]
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;

        [JsonPropertyName("actualFps")]
        public int ActualFps { get; set; }

        [JsonPropertyName("droppedFrames")]
        public int DroppedFrames { get; set; }

        [JsonPropertyName("internalCaptureFps")]
        public int InternalCaptureFps { get; set; }

        [JsonPropertyName("qosTier")]
        public int QosTier { get; set; }

        // מדדי רשת
        [JsonPropertyName("mediaTxMbps")]
        public double MediaTxMbps { get; set; }

        [JsonPropertyName("telemetryTxKbps")]
        public double TelemetryTxKbps { get; set; }

        [JsonPropertyName("nicUtilizationPct")]
        public double NicUtilizationPct { get; set; }

        // מדדי חומרה - מעבד וזיכרון
        [JsonPropertyName("hostCpuPct")]
        public double HostCpuPct { get; set; }

        [JsonPropertyName("processCpuPct")]
        public double ProcessCpuPct { get; set; }

        [JsonPropertyName("processRamMb")]
        public double ProcessRamMb { get; set; }

        // מדדי חומרה - כרטיס מסך
        [JsonPropertyName("gpu3dPct")]
        public double Gpu3dPct { get; set; }

        [JsonPropertyName("gpuNvencPct")]
        public double GpuNvencPct { get; set; }

        // 💡 נוספו מדדי חוב באפר מקומי
        [JsonPropertyName("offlineFilesCount")]
        public int OfflineFilesCount { get; set; }

        [JsonPropertyName("offlineFilesTotalSizeMb")]
        public long OfflineFilesTotalSizeMb { get; set; }

        // מדדי רשת כלליים של כרטיס הרשת (העומס הכללי על המכונה)
        [JsonPropertyName("nicTotalTxMbps")]
        public double NicTotalTxMbps { get; set; }

        [JsonPropertyName("nicTotalRxMbps")]
        public double NicTotalRxMbps { get; set; }
    }

    public class AgentHeartbeatResponse
    {
        [JsonPropertyName("shouldStream")]
        public bool ShouldStream { get; set; }

        [JsonPropertyName("command")]
        public ServerCommand Command { get; set; } = ServerCommand.Standby;

        [JsonPropertyName("serverUtcTime")]
        public DateTime ServerUtcTime { get; set; } = DateTime.UtcNow;

        [JsonPropertyName("policy")]
        public AgentStreamPolicy? Policy { get; set; }

        // 💡 נוספה פקודת סנכרון חוב אופליין
        [JsonPropertyName("offlineBufferAction")]
        public BufferCommand OfflineBufferAction { get; set; } = BufferCommand.WAIT;
    }
}