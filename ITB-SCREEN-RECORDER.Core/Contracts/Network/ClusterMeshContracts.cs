// ==========================================
// File: ITB-SCREEN-RECORDER.Core/Contracts/Network/ClusterMeshContracts.cs
// ==========================================
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ITB_SCREEN_RECORDER.Core.Contracts.Network
{
    public static class ClusterMeshConstants
    {
        public const string BeaconMagic = "ITB_CLUSTER_NODE_BEACON";
        public const string ProtocolVersion = "1.0";
        public const string ModeActiveActive = "Active-Active";
        public const string ModeStandalone = "Standalone";

        public const int DefaultBeaconIntervalSeconds = 3;
        public const int DefaultNodeDegradedTimeoutSeconds = 10;
        public const int DefaultNodeOfflineTimeoutSeconds = 30;
    }

    public class NodeHardwareProfile
    {
        [JsonPropertyName("cpuCores")]
        public int CpuCores { get; set; } = Environment.ProcessorCount;

        [JsonPropertyName("totalRamMb")]
        public double TotalRamMb { get; set; }

        [JsonPropertyName("detectedEncoder")]
        public string DetectedEncoder { get; set; } = "libx264";

        [JsonPropertyName("gpuName")]
        public string? GpuName { get; set; }

        [JsonPropertyName("capacityWeight")]
        public double CapacityWeight { get; set; } = 1.0;

        [JsonPropertyName("isHardwareAccelerated")]
        public bool IsHardwareAccelerated => !string.Equals(DetectedEncoder, "libx264", StringComparison.OrdinalIgnoreCase);

        public static double CalculateCapacityWeight(string encoder, int cpuCores)
        {
            if (string.IsNullOrWhiteSpace(encoder)) return 1.0;

            if (encoder.Contains("nvenc", StringComparison.OrdinalIgnoreCase))
            {
                // NVIDIA Dedicated ASIC GPU encoder: Massive multi-channel stream transcoding throughput
                return 3.5;
            }
            if (encoder.Contains("amf", StringComparison.OrdinalIgnoreCase))
            {
                // AMD Radeon Hardware acceleration
                return 2.5;
            }
            if (encoder.Contains("qsv", StringComparison.OrdinalIgnoreCase))
            {
                // Intel QuickSync dedicated silicon
                return 2.0;
            }
            if (encoder.Contains("vaapi", StringComparison.OrdinalIgnoreCase))
            {
                // Linux Hardware VAAPI
                return 1.8;
            }

            // CPU Fallback: proportional to core count (min 1.0)
            return Math.Max(1.0, Math.Round(cpuCores / 8.0, 1));
        }
    }

    public class NodeWorkloadMetrics
    {
        [JsonPropertyName("hostCpuPct")]
        public double HostCpuPct { get; set; }

        [JsonPropertyName("processCpuPct")]
        public double ProcessCpuPct { get; set; }

        [JsonPropertyName("hostRamPct")]
        public double HostRamPct { get; set; }

        [JsonPropertyName("processRamMb")]
        public double ProcessRamMb { get; set; }

        [JsonPropertyName("gpuNvencPct")]
        public double GpuNvencPct { get; set; }

        [JsonPropertyName("activeStreams")]
        public int ActiveStreams { get; set; }

        [JsonPropertyName("onlineAgents")]
        public int OnlineAgents { get; set; }

        [JsonPropertyName("totalAgents")]
        public int TotalAgents { get; set; }

        [JsonPropertyName("normalizedLoadScore")]
        public double NormalizedLoadScore { get; set; }

        public static double ComputeLoadScore(double cpuPct, double ramPct, double gpuNvencPct, int activeStreams, double capacityWeight)
        {
            double safeWeight = capacityWeight > 0.1 ? capacityWeight : 1.0;
            // Raw pressure: CPU (40%), RAM (10%), Active Streams (5 pts each), GPU (30%)
            double rawLoad = (cpuPct * 0.4) + (ramPct * 0.1) + (activeStreams * 5.0) + (gpuNvencPct * 0.3);
            return Math.Round(rawLoad / safeWeight, 2);
        }
    }

    public class ClusterNodeBeacon
    {
        [JsonPropertyName("magic")]
        public string Magic { get; set; } = ClusterMeshConstants.BeaconMagic;

        [JsonPropertyName("version")]
        public string Version { get; set; } = ClusterMeshConstants.ProtocolVersion;

        [JsonPropertyName("nodeId")]
        public string NodeId { get; set; } = string.Empty;

        [JsonPropertyName("machineName")]
        public string MachineName { get; set; } = Environment.MachineName;

        [JsonPropertyName("serverDisplayName")]
        public string ServerDisplayName { get; set; } = string.Empty;

        [JsonPropertyName("apiBaseUrl")]
        public string ApiBaseUrl { get; set; } = string.Empty;

        [JsonPropertyName("rtmpBaseUrl")]
        public string RtmpBaseUrl { get; set; } = string.Empty;

        [JsonPropertyName("serverIps")]
        public List<string> ServerIps { get; set; } = new();

        [JsonPropertyName("httpPort")]
        public int HttpPort { get; set; } = 5090;

        [JsonPropertyName("rtmpPort")]
        public int RtmpPort { get; set; } = 19350;

        [JsonPropertyName("role")]
        public string Role { get; set; } = ClusterMeshConstants.ModeActiveActive;

        [JsonPropertyName("priority")]
        public int Priority { get; set; } = 1;

        [JsonPropertyName("isHoldingVip")]
        public bool IsHoldingVip { get; set; }

        [JsonPropertyName("enableVirtualIp")]
        public bool EnableVirtualIp { get; set; }

        [JsonPropertyName("virtualIp")]
        public string? VirtualIp { get; set; }

        [JsonPropertyName("hardware")]
        public NodeHardwareProfile Hardware { get; set; } = new();

        [JsonPropertyName("workload")]
        public NodeWorkloadMetrics Workload { get; set; } = new();

        [JsonPropertyName("timestampUtc")]
        public DateTime TimestampUtc { get; set; } = DateTime.UtcNow;
    }

    public class ClusterNodeInfo
    {
        public string NodeId { get; set; } = string.Empty;
        public string MachineName { get; set; } = string.Empty;
        public string ServerDisplayName { get; set; } = string.Empty;
        public string ApiBaseUrl { get; set; } = string.Empty;
        public string RtmpBaseUrl { get; set; } = string.Empty;
        public List<string> ServerIps { get; set; } = new();
        public int HttpPort { get; set; }
        public int RtmpPort { get; set; }
        public string Role { get; set; } = ClusterMeshConstants.ModeActiveActive;
        public int Priority { get; set; } = 1;
        public bool IsHoldingVip { get; set; }
        public bool EnableVirtualIp { get; set; }
        public string? VirtualIp { get; set; }
        public bool IsLocal { get; set; }
        public DateTime LastSeenUtc { get; set; } = DateTime.UtcNow;
        public string Status { get; set; } = "Healthy"; // Healthy, Degraded, Offline
        public long LatencyMs { get; set; }
        public NodeHardwareProfile Hardware { get; set; } = new();
        public NodeWorkloadMetrics Workload { get; set; } = new();
    }
}
