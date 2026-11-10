// ==========================================
// File: ITB-SCREEN-RECORDER.Core/Contracts/Network/ServerDiscoveryContracts.cs
// ==========================================
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using ITB_SCREEN_RECORDER.Core.Configuration;

namespace ITB_SCREEN_RECORDER.Core.Contracts.Network
{
    public static class ServerDiscoveryConstants
    {
        /// <summary>
        /// Administratively scoped IPv4 Multicast address (RFC 2365: 239.255.0.0/16).
        /// Safe for private/enterprise networks without public routing.
        /// </summary>
        public const string DefaultMulticastAddress = "239.210.1.5";
        public const string DefaultBroadcastAddress = "255.255.255.255";
        public const string DefaultSubnetMask = "255.255.255.0";

        /// <summary>
        /// Dedicated UDP port for autonomous ITB server discovery.
        /// </summary>
        public const int DefaultDiscoveryPort = 5098;

        public const string ProbeMagic = "ITB_DISCOVERY_PROBE";
        public const string ResponseMagic = "ITB_DISCOVERY_RESPONSE";
        public const string ClusterBeaconMagic = "ITB_CLUSTER_BEACON";
        public const string ProtocolVersion = "1.0";
        public const string RoleActiveActive = "Active-Active";
        public const string RoleActiveStandby = "Active-Standby";
        public const string RoleStandalone = "Standalone";
        public const string RolePrimary = "Primary";
        public const string RoleSecondary = "Secondary";
        public const string RoleAggregate = "Aggregate";
        public const string RoleOrchestrator = "Orchestrator";
        public const string RoleWorker = "Worker";
        public const string RolePeer = "Peer";
        public const string NodeModeActive = "Active";
        public const string NodeModeStandby = "Standby";
    }

    public class ServerDiscoveryProbe
    {
        [JsonPropertyName("magic")]
        public string Magic { get; set; } = ServerDiscoveryConstants.ProbeMagic;

        [JsonPropertyName("version")]
        public string Version { get; set; } = ServerDiscoveryConstants.ProtocolVersion;

        [JsonPropertyName("clientMachineName")]
        public string ClientMachineName { get; set; } = Environment.MachineName;

        [JsonPropertyName("timestampUtc")]
        public DateTime TimestampUtc { get; set; } = DateTime.UtcNow;
    }

    public class ServerDiscoveryResponse
    {
        [JsonPropertyName("magic")]
        public string Magic { get; set; } = ServerDiscoveryConstants.ResponseMagic;

        [JsonPropertyName("serverId")]
        public string ServerId { get; set; } = string.Empty;

        [JsonPropertyName("serverName")]
        public string ServerName { get; set; } = string.Empty;

        [JsonPropertyName("environment")]
        public string Environment { get; set; } = "Production";

        [JsonPropertyName("role")]
        public string Role { get; set; } = ServerDiscoveryConstants.RoleActiveActive;

        [JsonPropertyName("priority")]
        public int Priority { get; set; } = 1;

        [JsonIgnore]
        public bool IsActiveActive => string.Equals(Role, ServerDiscoveryConstants.RoleActiveActive, StringComparison.OrdinalIgnoreCase) ||
                                      string.Equals(Role, "Active", StringComparison.OrdinalIgnoreCase);

        [JsonIgnore]
        public bool IsActiveStandby => string.Equals(Role, ServerDiscoveryConstants.RoleActiveStandby, StringComparison.OrdinalIgnoreCase) ||
                                       string.Equals(Role, "Standby", StringComparison.OrdinalIgnoreCase);

        [JsonIgnore]
        public bool IsStandalone => string.Equals(Role, ServerDiscoveryConstants.RoleStandalone, StringComparison.OrdinalIgnoreCase);

        [JsonIgnore]
        public bool IsAggregate => string.Equals(Role, ServerDiscoveryConstants.RoleAggregate, StringComparison.OrdinalIgnoreCase);

        [JsonIgnore]
        public bool IsPrimary => string.Equals(Role, ServerDiscoveryConstants.RolePrimary, StringComparison.OrdinalIgnoreCase) || IsActiveActive;

        [JsonIgnore]
        public bool IsSecondary => string.Equals(Role, ServerDiscoveryConstants.RoleSecondary, StringComparison.OrdinalIgnoreCase) ||
                                   string.Equals(Role, "Standby", StringComparison.OrdinalIgnoreCase);

        [JsonPropertyName("apiBaseUrl")]
        public string ApiBaseUrl { get; set; } = string.Empty;

        [JsonPropertyName("rtmpBaseUrl")]
        public string RtmpBaseUrl { get; set; } = string.Empty;

        [JsonPropertyName("httpPort")]
        public int HttpPort { get; set; } = 5090;

        [JsonPropertyName("rtmpPort")]
        public int RtmpPort { get; set; } = 19350;

        [JsonPropertyName("tlsThumbprint")]
        public string? TlsThumbprint { get; set; }

        [JsonPropertyName("version")]
        public string Version { get; set; } = "1.0.0";

        [JsonPropertyName("serverIps")]
        public List<string> ServerIps { get; set; } = new();

        [JsonPropertyName("serverUtcTime")]
        public DateTime ServerUtcTime { get; set; } = DateTime.UtcNow;

        [JsonPropertyName("acceptingNewAgents")]
        public bool AcceptingNewAgents { get; set; } = true;

        [JsonPropertyName("virtualIp")]
        public string? VirtualIp { get; set; }

        [JsonPropertyName("enableVirtualIp")]
        public bool EnableVirtualIp { get; set; }
    }

    public class AgentRegistrationRequest
    {
        [JsonPropertyName("machineName")]
        public string MachineName { get; set; } = Environment.MachineName;

        [JsonPropertyName("osVersion")]
        public string? OsVersion { get; set; }

        [JsonPropertyName("hardwareUuid")]
        public string? HardwareUuid { get; set; }

        [JsonPropertyName("macAddress")]
        public string? MacAddress { get; set; }

        [JsonPropertyName("agentVersion")]
        public string? AgentVersion { get; set; }

        [JsonPropertyName("requestTimestampUtc")]
        public DateTime RequestTimestampUtc { get; set; } = DateTime.UtcNow;
    }

    public class AgentRegistrationResponse
    {
        [JsonPropertyName("agentId")]
        public string AgentId { get; set; } = string.Empty;

        [JsonPropertyName("serverName")]
        public string ServerName { get; set; } = string.Empty;

        [JsonPropertyName("assignedStreamKey")]
        public string AssignedStreamKey { get; set; } = string.Empty;

        [JsonPropertyName("rtmpServerBaseUrl")]
        public string RtmpServerBaseUrl { get; set; } = string.Empty;

        [JsonPropertyName("policy")]
        public AgentStreamPolicy Policy { get; set; } = new();

        [JsonPropertyName("heartbeatIntervalSeconds")]
        public int HeartbeatIntervalSeconds { get; set; } = 2;

        [JsonPropertyName("serverUtcTime")]
        public DateTime ServerUtcTime { get; set; } = DateTime.UtcNow;

        [JsonPropertyName("serverUtcEpochMs")]
        public long ServerUtcEpochMs { get; set; } = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();

        [JsonPropertyName("keystrokeKeyId")]
        public string? KeystrokeKeyId { get; set; }

        [JsonPropertyName("keystrokeKeyMaterial")]
        public string? KeystrokeKeyMaterial { get; set; }
    }

    public enum ClusterNodeState
    {
        Standalone,
        Active,
        Standby,
        Promoting,
        Demoting,
        Degraded,
        Unreachable,
        Draining
    }

    public class ClusterStatusDto
    {
        [JsonPropertyName("localNodeId")]
        public string LocalNodeId { get; set; } = string.Empty;

        [JsonPropertyName("serverDisplayName")]
        public string ServerDisplayName { get; set; } = string.Empty;

        [JsonPropertyName("clusterMode")]
        public string ClusterMode { get; set; } = ServerDiscoveryConstants.RoleStandalone;

        [JsonPropertyName("nodeRole")]
        public string NodeRole { get; set; } = ServerDiscoveryConstants.RolePrimary;

        [JsonPropertyName("state")]
        public string State { get; set; } = ClusterNodeState.Standalone.ToString();

        [JsonPropertyName("priority")]
        public int Priority { get; set; } = 1;

        [JsonPropertyName("enableVirtualIp")]
        public bool EnableVirtualIp { get; set; }

        [JsonPropertyName("virtualIp")]
        public string? VirtualIp { get; set; }

        [JsonPropertyName("virtualIpSubnetMask")]
        public string VirtualIpSubnetMask { get; set; } = ServerDiscoveryConstants.DefaultSubnetMask;

        [JsonPropertyName("isVipBoundLocally")]
        public bool IsVipBoundLocally { get; set; }

        [JsonPropertyName("networkInterface")]
        public string? NetworkInterface { get; set; }

        [JsonPropertyName("partnerServerUrl")]
        public string? PartnerServerUrl { get; set; }

        [JsonPropertyName("partnerStatus")]
        public string PartnerStatus { get; set; } = "Unknown"; // "Healthy", "Unreachable", "Standby", "Active", "Unknown"

        [JsonPropertyName("lastHeartbeatUtc")]
        public DateTime? LastHeartbeatUtc { get; set; }

        [JsonPropertyName("failoverCount")]
        public int FailoverCount { get; set; }

        [JsonPropertyName("uptimeSeconds")]
        public double UptimeSeconds { get; set; }

        [JsonPropertyName("preemptLowerPriority")]
        public bool PreemptLowerPriority { get; set; }

        [JsonIgnore]
        public bool IsActive => string.Equals(State, ClusterNodeState.Active.ToString(), StringComparison.OrdinalIgnoreCase) ||
                                string.Equals(State, ClusterNodeState.Standalone.ToString(), StringComparison.OrdinalIgnoreCase);

        [JsonIgnore]
        public bool IsStandby => string.Equals(State, ClusterNodeState.Standby.ToString(), StringComparison.OrdinalIgnoreCase);
    }

    public class ClusterPartnerHealthDto
    {
        [JsonPropertyName("nodeId")]
        public string NodeId { get; set; } = string.Empty;

        [JsonPropertyName("clusterMode")]
        public string ClusterMode { get; set; } = string.Empty;

        [JsonPropertyName("nodeRole")]
        public string NodeRole { get; set; } = string.Empty;

        [JsonPropertyName("state")]
        public string State { get; set; } = string.Empty;

        [JsonPropertyName("priority")]
        public int Priority { get; set; }

        [JsonPropertyName("isVipOwner")]
        public bool IsVipOwner { get; set; }

        [JsonPropertyName("timestampUtc")]
        public DateTime TimestampUtc { get; set; } = DateTime.UtcNow;
    }

    public class ClusterFailoverResultDto
    {
        [JsonPropertyName("success")]
        public bool Success { get; set; }

        [JsonPropertyName("state")]
        public string State { get; set; } = string.Empty;

        [JsonPropertyName("isVipBound")]
        public bool IsVipBound { get; set; }

        [JsonPropertyName("message")]
        public string Message { get; set; } = string.Empty;
    }

    public class ClusterNodeDescriptor
    {
        [JsonPropertyName("nodeId")]
        public string NodeId { get; set; } = string.Empty;

        [JsonPropertyName("displayName")]
        public string DisplayName { get; set; } = string.Empty;

        [JsonPropertyName("apiBaseUrl")]
        public string ApiBaseUrl { get; set; } = string.Empty;

        [JsonPropertyName("rtmpBaseUrl")]
        public string RtmpBaseUrl { get; set; } = string.Empty;

        [JsonPropertyName("hlsBaseUrl")]
        public string HlsBaseUrl { get; set; } = string.Empty;

        [JsonPropertyName("whepPort")]
        public int WhepPort { get; set; } = 8889;

        [JsonPropertyName("role")]
        public string Role { get; set; } = ServerDiscoveryConstants.RoleWorker; // Orchestrator or Worker

        [JsonPropertyName("nodeMode")]
        public string NodeMode { get; set; } = ServerDiscoveryConstants.NodeModeActive; // Active or Standby

        [JsonPropertyName("state")]
        public string State { get; set; } = ClusterNodeState.Active.ToString();

        [JsonPropertyName("priority")]
        public int Priority { get; set; } = 50;

        [JsonPropertyName("activeStreamsCount")]
        public int ActiveStreamsCount { get; set; }

        [JsonPropertyName("autoHardwareCapacity")]
        public bool AutoHardwareCapacity { get; set; } = true;

        [JsonPropertyName("maxStreamsCapacity")]
        public int MaxStreamsCapacity { get; set; }

        [JsonPropertyName("recommendedStreamsCapacity")]
        public int RecommendedStreamsCapacity { get; set; }

        [JsonPropertyName("activeJobsCount")]
        public int ActiveJobsCount { get; set; }

        [JsonPropertyName("maxConcurrentJobs")]
        public int MaxConcurrentJobs { get; set; }

        [JsonPropertyName("recommendedConcurrentJobs")]
        public int RecommendedConcurrentJobs { get; set; }

        [JsonPropertyName("hostCpuPct")]
        public double HostCpuPct { get; set; }

        [JsonPropertyName("gpuNvencPct")]
        public double GpuNvencPct { get; set; }

        [JsonPropertyName("processRamMb")]
        public double ProcessRamMb { get; set; }

        [JsonPropertyName("hostRamPct")]
        public double HostRamPct { get; set; }

        [JsonPropertyName("nicTotalTxMbps")]
        public double NicTotalTxMbps { get; set; }

        [JsonPropertyName("nicTotalRxMbps")]
        public double NicTotalRxMbps { get; set; }

        [JsonPropertyName("linkSpeedMbps")]
        public double LinkSpeedMbps { get; set; } = 1000;

        [JsonPropertyName("lastSeenUtc")]
        public DateTime LastSeenUtc { get; set; } = DateTime.UtcNow;

        [JsonPropertyName("assignedStations")]
        public List<string> AssignedStations { get; set; } = new();

        [JsonPropertyName("localIps")]
        public List<string> LocalIps { get; set; } = new();

        [JsonPropertyName("isVipBound")]
        public bool IsVipBound { get; set; }

        [JsonPropertyName("cpuCores")]
        public int CpuCores { get; set; } = 4;

        [JsonPropertyName("totalRamGb")]
        public double TotalRamGb { get; set; } = 8.0;

        [JsonPropertyName("gpuModel")]
        public string GpuModel { get; set; } = "CPU Software";

        [JsonPropertyName("encoderType")]
        public string EncoderType { get; set; } = "libx264";

        [JsonPropertyName("osPlatform")]
        public string OsPlatform { get; set; } = OperatingSystem.IsWindows() ? "Windows" : (OperatingSystem.IsLinux() ? "Linux" : "Other");

        [JsonPropertyName("osDescription")]
        public string OsDescription { get; set; } = System.Runtime.InteropServices.RuntimeInformation.OSDescription;

        [JsonPropertyName("hardwareCapabilityScore")]
        public int HardwareCapabilityScore { get; set; } = 200;

        [JsonPropertyName("effectiveStreamsCapacity")]
        public int EffectiveStreamsCapacity { get; set; } = 50;

        [JsonPropertyName("ingestPressureScore")]
        public double IngestPressureScore { get; set; }

        [JsonPropertyName("computeFitnessScore")]
        public double ComputeFitnessScore { get; set; }

        [JsonIgnore]
        public bool IsOverloaded => HostCpuPct >= 75.0 || GpuNvencPct >= 85.0;

        [JsonIgnore]
        public bool IsOnline => (DateTime.UtcNow - LastSeenUtc).TotalSeconds <= 12;

        [JsonIgnore]
        public bool IsOrchestrator => string.Equals(Role, ServerDiscoveryConstants.RoleOrchestrator, StringComparison.OrdinalIgnoreCase) ||
                                      string.Equals(Role, ServerDiscoveryConstants.RolePrimary, StringComparison.OrdinalIgnoreCase);

        [JsonIgnore]
        public bool IsStandby => string.Equals(NodeMode, ServerDiscoveryConstants.NodeModeStandby, StringComparison.OrdinalIgnoreCase) ||
                                 string.Equals(Role, ServerDiscoveryConstants.RoleSecondary, StringComparison.OrdinalIgnoreCase) ||
                                 string.Equals(State, ClusterNodeState.Standby.ToString(), StringComparison.OrdinalIgnoreCase);

        [JsonIgnore]
        public bool IsDraining => string.Equals(State, ClusterNodeState.Draining.ToString(), StringComparison.OrdinalIgnoreCase);

        [JsonIgnore]
        public double LoadRatio => MaxStreamsCapacity > 0 ? (double)ActiveStreamsCount / MaxStreamsCapacity : 1.0;
    }

    /// <summary>
    /// Autonomous Zero-Configuration Cluster Beacon broadcast via UDP Multicast and Broadcast.
    /// Allows servers in a LAN to self-discover, elect leaders, and balance workloads with zero manual IP input.
    /// </summary>
    public class ClusterBeaconPacket
    {
        [JsonPropertyName("magic")]
        public string Magic { get; set; } = ServerDiscoveryConstants.ClusterBeaconMagic;

        [JsonPropertyName("clusterGroup")]
        public string ClusterGroup { get; set; } = "Production";

        [JsonPropertyName("nodeId")]
        public string NodeId { get; set; } = Environment.MachineName;

        [JsonPropertyName("displayName")]
        public string DisplayName { get; set; } = Environment.MachineName;

        [JsonPropertyName("nodeMode")]
        public string NodeMode { get; set; } = ServerDiscoveryConstants.NodeModeActive; // "Active" or "Standby"

        [JsonPropertyName("nodeRole")]
        public string NodeRole { get; set; } = ServerDiscoveryConstants.RoleWorker; // "Orchestrator", "Worker", "Standby"

        [JsonPropertyName("priority")]
        public int Priority { get; set; } = 50;

        [JsonPropertyName("apiBaseUrl")]
        public string ApiBaseUrl { get; set; } = string.Empty;

        [JsonPropertyName("rtmpBaseUrl")]
        public string RtmpBaseUrl { get; set; } = string.Empty;

        [JsonPropertyName("hlsBaseUrl")]
        public string HlsBaseUrl { get; set; } = string.Empty;

        [JsonPropertyName("whepPort")]
        public int WhepPort { get; set; } = 8889;

        [JsonPropertyName("activeStreamsCount")]
        public int ActiveStreamsCount { get; set; }

        [JsonPropertyName("autoHardwareCapacity")]
        public bool AutoHardwareCapacity { get; set; } = true;

        [JsonPropertyName("maxStreamsCapacity")]
        public int MaxStreamsCapacity { get; set; }

        [JsonPropertyName("recommendedStreamsCapacity")]
        public int RecommendedStreamsCapacity { get; set; }

        [JsonPropertyName("activeJobsCount")]
        public int ActiveJobsCount { get; set; }

        [JsonPropertyName("maxConcurrentJobs")]
        public int MaxConcurrentJobs { get; set; }

        [JsonPropertyName("recommendedConcurrentJobs")]
        public int RecommendedConcurrentJobs { get; set; }

        [JsonPropertyName("hostCpuPct")]
        public double HostCpuPct { get; set; }

        [JsonPropertyName("gpuNvencPct")]
        public double GpuNvencPct { get; set; }

        [JsonPropertyName("hostRamPct")]
        public double HostRamPct { get; set; }

        [JsonPropertyName("nicTotalTxMbps")]
        public double NicTotalTxMbps { get; set; }

        [JsonPropertyName("nicTotalRxMbps")]
        public double NicTotalRxMbps { get; set; }

        [JsonPropertyName("linkSpeedMbps")]
        public double LinkSpeedMbps { get; set; } = 1000;

        [JsonPropertyName("isVipBound")]
        public bool IsVipBound { get; set; }

        [JsonPropertyName("localIps")]
        public List<string> LocalIps { get; set; } = new();

        [JsonPropertyName("cpuCores")]
        public int CpuCores { get; set; } = 4;

        [JsonPropertyName("totalRamGb")]
        public double TotalRamGb { get; set; } = 8.0;

        [JsonPropertyName("gpuModel")]
        public string GpuModel { get; set; } = "CPU Software";

        [JsonPropertyName("encoderType")]
        public string EncoderType { get; set; } = "libx264";

        [JsonPropertyName("osPlatform")]
        public string OsPlatform { get; set; } = OperatingSystem.IsWindows() ? "Windows" : (OperatingSystem.IsLinux() ? "Linux" : "Other");

        [JsonPropertyName("osDescription")]
        public string OsDescription { get; set; } = System.Runtime.InteropServices.RuntimeInformation.OSDescription;

        [JsonPropertyName("hardwareCapabilityScore")]
        public int HardwareCapabilityScore { get; set; } = 200;

        [JsonPropertyName("assignedStations")]
        public List<string> AssignedStations { get; set; } = new();

        [JsonPropertyName("isDraining")]
        public bool IsDraining { get; set; }

        [JsonPropertyName("timestampUtc")]
        public DateTime TimestampUtc { get; set; } = DateTime.UtcNow;

        /// <summary>
        /// Calculates a composite hardware horsepower score based on GPU encoder tier, CPU core count, and RAM.
        /// </summary>
        public static int CalculateHardwareCapabilityScore(int cpuCores, double totalRamGb, string encoderType, string? gpuModel)
        {
            int score = 0;

            // 1. GPU Encoder tier
            if (string.Equals(encoderType, "h264_nvenc", StringComparison.OrdinalIgnoreCase) ||
                (!string.IsNullOrEmpty(gpuModel) && gpuModel.Contains("NVIDIA", StringComparison.OrdinalIgnoreCase)))
            {
                score += 500; // Tier 1: Dedicated NVENC HW encoder
            }
            else if (string.Equals(encoderType, "h264_qsv", StringComparison.OrdinalIgnoreCase) ||
                     (!string.IsNullOrEmpty(gpuModel) && gpuModel.Contains("Intel", StringComparison.OrdinalIgnoreCase)))
            {
                score += 250; // Tier 2: Intel QuickSync
            }
            else if (string.Equals(encoderType, "h264_amf", StringComparison.OrdinalIgnoreCase) ||
                     (!string.IsNullOrEmpty(gpuModel) && gpuModel.Contains("AMD", StringComparison.OrdinalIgnoreCase)))
            {
                score += 250; // Tier 2: AMD AMF
            }
            else
            {
                score += 50;  // Tier 4: CPU Software encoder (libx264)
            }

            // 2. CPU cores: 25 points per core
            score += Math.Clamp(cpuCores, 1, 64) * 25;

            // 3. RAM: 5 points per GB
            score += (int)Math.Clamp(totalRamGb, 1.0, 128.0) * 5;

            return score;
        }

        /// <summary>
        /// Derives recommended maximum ingest streams and concurrent NLE render jobs based on server hardware specifications.
        /// </summary>
        public static (int RecommendedStreams, int RecommendedConcurrentJobs) CalculateHardwareCapacities(int cpuCores, double totalRamGb, string encoderType, string? gpuModel)
        {
            bool isNvenc = string.Equals(encoderType, "h264_nvenc", StringComparison.OrdinalIgnoreCase) ||
                           (!string.IsNullOrEmpty(gpuModel) && gpuModel.Contains("NVIDIA", StringComparison.OrdinalIgnoreCase));
            bool isQsv = string.Equals(encoderType, "h264_qsv", StringComparison.OrdinalIgnoreCase) ||
                         (!string.IsNullOrEmpty(gpuModel) && gpuModel.Contains("Intel", StringComparison.OrdinalIgnoreCase));
            bool isAmf = string.Equals(encoderType, "h264_amf", StringComparison.OrdinalIgnoreCase) ||
                         (!string.IsNullOrEmpty(gpuModel) && gpuModel.Contains("AMD", StringComparison.OrdinalIgnoreCase));

            int streams;
            int jobs;

            if (isNvenc)
            {
                // Dedicated NVIDIA GPU: High throughput hardware offload
                // Streams: 15 streams per CPU core + 2 streams per GB RAM
                streams = (cpuCores * 15) + (int)(totalRamGb * 2.0);
                streams = Math.Clamp(streams, 15, 200);

                // NLE Render Jobs: NVENC handles multiple concurrent sessions.
                // Each job allocates ~2 CPU cores and ~4 GB RAM.
                int jobByCpu = Math.Max(1, cpuCores / 2);
                int jobByRam = Math.Max(1, (int)(totalRamGb / 4.0));
                jobs = Math.Clamp(Math.Min(jobByCpu, jobByRam), 2, 8);
            }
            else if (isQsv || isAmf)
            {
                // Integrated Hardware GPU (Intel QuickSync / AMD AMF)
                streams = (cpuCores * 10) + (int)(totalRamGb * 1.5);
                streams = Math.Clamp(streams, 10, 120);

                int jobByCpu = Math.Max(1, cpuCores / 3);
                int jobByRam = Math.Max(1, (int)(totalRamGb / 4.0));
                jobs = Math.Clamp(Math.Min(jobByCpu, jobByRam), 1, 4);
            }
            else
            {
                // CPU Software Encoder (libx264)
                // Reserve CPU cycles for continuous recording without drops
                streams = cpuCores * 4;
                streams = Math.Clamp(streams, 5, 40);

                if (cpuCores < 8 || totalRamGb < 16.0)
                {
                    jobs = 1;
                }
                else if (cpuCores < 16 || totalRamGb < 32.0)
                {
                    jobs = 2;
                }
                else
                {
                    jobs = 3;
                }
            }

            return (streams, jobs);
        }
    }

    public class ClusterHeartbeatRequest
    {
        [JsonPropertyName("node")]
        public ClusterNodeDescriptor Node { get; set; } = new();

        [JsonPropertyName("stations")]
        public List<AgentTelemetryReport> Stations { get; set; } = new();

        [JsonPropertyName("reportedAtUtc")]
        public DateTime ReportedAtUtc { get; set; } = DateTime.UtcNow;
    }

    public class ClusterHeartbeatResponse
    {
        [JsonPropertyName("acknowledged")]
        public bool Acknowledged { get; set; } = true;

        [JsonPropertyName("orchestratorNodeId")]
        public string OrchestratorNodeId { get; set; } = string.Empty;

        [JsonPropertyName("isLocalNodeOrchestrator")]
        public bool IsLocalNodeOrchestrator { get; set; }

        [JsonPropertyName("activeNodes")]
        public List<ClusterNodeDescriptor> ActiveNodes { get; set; } = new();

        [JsonPropertyName("assignedStations")]
        public List<string> AssignedStations { get; set; } = new();

        [JsonPropertyName("clusterStations")]
        public List<AgentTelemetryReport>? ClusterStations { get; set; }

        [JsonPropertyName("desiredStreamPolicies")]
        public Dictionary<string, bool> DesiredStreamPolicies { get; set; } = new();

        [JsonPropertyName("serverUtcTime")]
        public DateTime ServerUtcTime { get; set; } = DateTime.UtcNow;
    }

    public class ClusterGridStatusDto
    {
        [JsonPropertyName("clusterMode")]
        public string ClusterMode { get; set; } = ServerDiscoveryConstants.RoleActiveActive;

        [JsonPropertyName("clusterGroup")]
        public string ClusterGroup { get; set; } = "Production";

        [JsonPropertyName("autoPeerDiscovery")]
        public bool AutoPeerDiscovery { get; set; } = true;

        [JsonPropertyName("localNodeId")]
        public string LocalNodeId { get; set; } = string.Empty;

        [JsonPropertyName("localNodeRole")]
        public string LocalNodeRole { get; set; } = ServerDiscoveryConstants.RoleOrchestrator;

        [JsonPropertyName("orchestratorNodeId")]
        public string OrchestratorNodeId { get; set; } = string.Empty;

        [JsonPropertyName("isLocalNodeOrchestrator")]
        public bool IsLocalNodeOrchestrator { get; set; }

        [JsonPropertyName("totalNodes")]
        public int TotalNodes { get; set; }

        [JsonPropertyName("onlineNodesCount")]
        public int OnlineNodesCount { get; set; }

        [JsonPropertyName("totalIngestedStreams")]
        public int TotalIngestedStreams { get; set; }

        [JsonPropertyName("totalStreamsCapacity")]
        public int TotalStreamsCapacity { get; set; }

        [JsonPropertyName("totalActiveRenderJobs")]
        public int TotalActiveRenderJobs { get; set; }

        [JsonPropertyName("totalConcurrentJobsCapacity")]
        public int TotalConcurrentJobsCapacity { get; set; }

        [JsonPropertyName("activeNodesCount")]
        public int ActiveNodesCount { get; set; }

        [JsonPropertyName("standbyNodesCount")]
        public int StandbyNodesCount { get; set; }

        [JsonPropertyName("aggregateCpuPct")]
        public double AggregateCpuPct { get; set; }

        [JsonPropertyName("aggregateAppCpuPct")]
        public double AggregateAppCpuPct { get; set; }

        [JsonPropertyName("aggregateRamPct")]
        public double AggregateRamPct { get; set; }

        [JsonPropertyName("aggregateTotalRamGb")]
        public double AggregateTotalRamGb { get; set; }

        [JsonPropertyName("aggregateUsedRamGb")]
        public double AggregateUsedRamGb { get; set; }

        [JsonPropertyName("aggregateAppRamMb")]
        public double AggregateAppRamMb { get; set; }

        [JsonPropertyName("aggregateNicTxMbps")]
        public double AggregateNicTxMbps { get; set; }

        [JsonPropertyName("aggregateNicRxMbps")]
        public double AggregateNicRxMbps { get; set; }

        [JsonPropertyName("aggregateNicTotalMbps")]
        public double AggregateNicTotalMbps { get; set; }

        [JsonPropertyName("aggregateLinkSpeedMbps")]
        public double AggregateLinkSpeedMbps { get; set; }

        [JsonPropertyName("aggregateNicUtilizationPct")]
        public double AggregateNicUtilizationPct { get; set; }

        [JsonPropertyName("enableVirtualIp")]
        public bool EnableVirtualIp { get; set; }

        [JsonPropertyName("virtualIp")]
        public string? VirtualIp { get; set; }

        [JsonPropertyName("isVipBoundLocally")]
        public bool IsVipBoundLocally { get; set; }

        [JsonPropertyName("clusterEncoderStatus")]
        public string ClusterEncoderStatus { get; set; } = "Hardware Accelerated";

        [JsonPropertyName("clusterHardwareEncodersCount")]
        public int ClusterHardwareEncodersCount { get; set; }

        [JsonPropertyName("clusterTotalEncoderCapacityStreams")]
        public int ClusterTotalEncoderCapacityStreams { get; set; }

        [JsonPropertyName("clusterGpuModels")]
        public List<string> ClusterGpuModels { get; set; } = new();

        [JsonPropertyName("nodes")]
        public List<ClusterNodeDescriptor> Nodes { get; set; } = new();
    }

    public class ClusterNodeModeRequest
    {
        [JsonPropertyName("nodeId")]
        public string NodeId { get; set; } = string.Empty;

        [JsonPropertyName("mode")]
        public string Mode { get; set; } = ServerDiscoveryConstants.NodeModeActive; // "Active" (Hot) or "Standby"
    }

    public class ClusterJobDispatchRequest
    {
        [JsonPropertyName("jobId")]
        public string JobId { get; set; } = Guid.NewGuid().ToString("N");

        [JsonPropertyName("targetNodeId")]
        public string? TargetNodeId { get; set; }

        [JsonPropertyName("requestPayloadJson")]
        public string RequestPayloadJson { get; set; } = string.Empty;

        [JsonPropertyName("submittedBy")]
        public string SubmittedBy { get; set; } = "Cluster Operator";

        [JsonPropertyName("dispatchedAtUtc")]
        public DateTime DispatchedAtUtc { get; set; } = DateTime.UtcNow;
    }

    public class ClusterJobStatusDto
    {
        [JsonPropertyName("jobId")]
        public string JobId { get; set; } = string.Empty;

        [JsonPropertyName("executingNodeId")]
        public string ExecutingNodeId { get; set; } = string.Empty;

        [JsonPropertyName("executingNodeName")]
        public string ExecutingNodeName { get; set; } = string.Empty;

        [JsonPropertyName("status")]
        public string Status { get; set; } = "Queued"; // Queued, Processing, Completed, Failed, Cancelled

        [JsonPropertyName("progressPercent")]
        public double ProgressPercent { get; set; }

        [JsonPropertyName("speedMBps")]
        public double SpeedMBps { get; set; }

        [JsonPropertyName("statusMessage")]
        public string StatusMessage { get; set; } = string.Empty;

        [JsonPropertyName("outputFilePath")]
        public string? OutputFilePath { get; set; }

        [JsonPropertyName("outputFileName")]
        public string? OutputFileName { get; set; }

        [JsonPropertyName("fileSizeBytes")]
        public long FileSizeBytes { get; set; }

        [JsonPropertyName("errorMessage")]
        public string? ErrorMessage { get; set; }

        [JsonPropertyName("updatedAtUtc")]
        public DateTime UpdatedAtUtc { get; set; } = DateTime.UtcNow;
    }

    public class HardwareSizingRequest
    {
        [JsonPropertyName("targetStations")]
        public int TargetStations { get; set; } = 50;

        [JsonPropertyName("targetConcurrentJobs")]
        public int TargetConcurrentJobs { get; set; } = 2;

        [JsonPropertyName("redundancyMode")]
        public string RedundancyMode { get; set; } = "Active-Active"; // "Standalone", "Active-Standby", "Active-Active"

        [JsonPropertyName("hardwareProfile")]
        public string HardwareProfile { get; set; } = "Auto"; // "Auto", "NVENC", "QSV", "Software"
    }

    public class HardwareSizingResult
    {
        [JsonPropertyName("targetStations")]
        public int TargetStations { get; set; } = 50;

        [JsonPropertyName("targetConcurrentJobs")]
        public int TargetConcurrentJobs { get; set; } = 2;

        [JsonPropertyName("redundancyMode")]
        public string RedundancyMode { get; set; } = "Active-Active";

        [JsonPropertyName("recommendedNodeCount")]
        public int RecommendedNodeCount { get; set; } = 2;

        [JsonPropertyName("recommendedActiveNodes")]
        public int RecommendedActiveNodes { get; set; } = 2;

        [JsonPropertyName("recommendedStandbyNodes")]
        public int RecommendedStandbyNodes { get; set; } = 0;

        [JsonPropertyName("minCpuCoresPerNode")]
        public int MinCpuCoresPerNode { get; set; } = 8;

        [JsonPropertyName("minRamGbPerNode")]
        public int MinRamGbPerNode { get; set; } = 32;

        [JsonPropertyName("recommendedGpuTier")]
        public string RecommendedGpuTier { get; set; } = "NVIDIA NVENC (GeForce RTX 3060/4060 or Quadro/RTX A2000)";

        [JsonPropertyName("minNetworkSpeedMbps")]
        public int MinNetworkSpeedMbps { get; set; } = 1000;

        [JsonPropertyName("recommendedNetworkCard")]
        public string RecommendedNetworkCard { get; set; } = "1 Gbps Dedicated LAN (Dual-Port LACP recommended)";

        [JsonPropertyName("storageWriteRateMBps")]
        public double StorageWriteRateMBps { get; set; } = 25.0;

        [JsonPropertyName("storageRequirementsText")]
        public string StorageRequirementsText { get; set; } = "Enterprise NVMe PCIe 4.0 or Dedicated NetApp/SAN with SSD caching (Sustained write >= 50 MB/s)";

        [JsonPropertyName("currentClusterCapable")]
        public bool CurrentClusterCapable { get; set; } = true;

        [JsonPropertyName("currentClusterMaxStreams")]
        public int CurrentClusterMaxStreams { get; set; }

        [JsonPropertyName("currentClusterMaxJobs")]
        public int CurrentClusterMaxJobs { get; set; }

        [JsonPropertyName("currentClusterOnlineNodes")]
        public int CurrentClusterOnlineNodes { get; set; }

        [JsonPropertyName("clusterStreamsUtilizationPct")]
        public int ClusterStreamsUtilizationPct { get; set; }

        [JsonPropertyName("clusterJobsUtilizationPct")]
        public int ClusterJobsUtilizationPct { get; set; }

        [JsonPropertyName("headroomStreams")]
        public int HeadroomStreams { get; set; }

        [JsonPropertyName("headroomJobs")]
        public int HeadroomJobs { get; set; }

        [JsonPropertyName("isGpuAccelerationRecommended")]
        public bool IsGpuAccelerationRecommended { get; set; }

        [JsonPropertyName("evaluationSummary")]
        public string EvaluationSummary { get; set; } = string.Empty;

        [JsonPropertyName("evaluationStatus")]
        public string EvaluationStatus { get; set; } = "Ready"; // "Ready", "Warning", "Deficit"

        [JsonPropertyName("sizingReport")]
        public string SizingReport { get; set; } = string.Empty;
    }

    public static class HardwareSizingCalculator
    {
        public static HardwareSizingResult Calculate(HardwareSizingRequest request, ClusterGridStatusDto? currentGrid = null)
        {
            var req = request ?? new HardwareSizingRequest();
            int stations = Math.Max(1, req.TargetStations);
            int jobs = Math.Max(1, req.TargetConcurrentJobs);
            string mode = !string.IsNullOrWhiteSpace(req.RedundancyMode) ? req.RedundancyMode : "Active-Active";
            string profile = !string.IsNullOrWhiteSpace(req.HardwareProfile) ? req.HardwareProfile : "Auto";

            // Determine GPU profile based on cluster reality or user preference
            bool hasClusterGpus = (currentGrid?.ClusterHardwareEncodersCount ?? 0) > 0;
            bool clusterHasNvidia = currentGrid?.ClusterGpuModels?.Any(m => m.Contains("NVIDIA", StringComparison.OrdinalIgnoreCase)) ?? false;
            bool clusterHasIntel = currentGrid?.ClusterGpuModels?.Any(m => m.Contains("Intel", StringComparison.OrdinalIgnoreCase)) ?? false;

            bool useNvenc = string.Equals(profile, "NVENC", StringComparison.OrdinalIgnoreCase) ||
                           (string.Equals(profile, "Auto", StringComparison.OrdinalIgnoreCase) && (clusterHasNvidia || (!hasClusterGpus && stations >= 40)));
            bool useQsv = !useNvenc && (string.Equals(profile, "QSV", StringComparison.OrdinalIgnoreCase) ||
                          (string.Equals(profile, "Auto", StringComparison.OrdinalIgnoreCase) && (clusterHasIntel || (!hasClusterGpus && stations >= 20))));

            // Determine nominal single-node capability based on hardware encoder tier:
            // Derived from ClusterBeaconPacket.CalculateHardwareCapacities with enterprise safety margins
            int nominalStreamsPerNode;
            int nominalJobsPerNode;

            if (useNvenc)
            {
                // Typical NVENC node (8-16 cores, 32GB RAM, dedicated RTX GPU)
                nominalStreamsPerNode = 50;
                nominalJobsPerNode = 2;
            }
            else if (useQsv)
            {
                // Typical Intel QuickSync node (8-12 cores, 32GB RAM, integrated Iris Xe/UHD GPU)
                nominalStreamsPerNode = 35;
                nominalJobsPerNode = 2;
            }
            else
            {
                // CPU Software (libx264 software only, 8-16 cores, 32GB RAM)
                nominalStreamsPerNode = 20;
                nominalJobsPerNode = 1;
            }

            // Node count calculation based on BOTH streams AND concurrent NLE jobs
            int neededForStreams = (int)Math.Ceiling((double)stations / nominalStreamsPerNode);
            int neededForJobs = (int)Math.Ceiling((double)jobs / nominalJobsPerNode);
            int activeNodes = Math.Max(neededForStreams, neededForJobs);
            int standbyNodes = 0;

            if (string.Equals(mode, "Active-Standby", StringComparison.OrdinalIgnoreCase))
            {
                activeNodes = Math.Max(1, activeNodes);
                standbyNodes = 1;
            }
            else if (string.Equals(mode, "Active-Active", StringComparison.OrdinalIgnoreCase))
            {
                if (stations > 40 || jobs > 2)
                {
                    activeNodes = Math.Max(2, activeNodes);
                }
                activeNodes = Math.Clamp(activeNodes, 1, 16);
                standbyNodes = 0;
            }
            else
            {
                // Standalone
                activeNodes = 1;
                standbyNodes = 0;
            }

            int stationsPerNode = (int)Math.Ceiling((double)stations / Math.Max(1, activeNodes));
            int jobsPerNode = (int)Math.Ceiling((double)jobs / Math.Max(1, activeNodes));

            // Minimum Hardware per node (derived dynamically from load)
            int minCpuCores;
            int minRamGb;
            string gpuTier;

            if (useNvenc)
            {
                // Ingest: 1 core per 12 streams; NLE: 2 dedicated cores per concurrent cut; Base OS: 2 cores
                minCpuCores = 2 + (int)Math.Ceiling(stationsPerNode / 12.0) + (jobsPerNode * 2);
                minRamGb = 4 + (int)Math.Ceiling(stationsPerNode * 0.15) + (jobsPerNode * 4);
                gpuTier = "NVIDIA NVENC (GeForce RTX 3060/4060 or Quadro/RTX A2000/A4000 6GB+ VRAM)";
            }
            else if (useQsv)
            {
                minCpuCores = 2 + (int)Math.Ceiling(stationsPerNode / 8.0) + (jobsPerNode * 3);
                minRamGb = 4 + (int)Math.Ceiling(stationsPerNode * 0.20) + (jobsPerNode * 4);
                gpuTier = "Intel QuickSync (Core i7/i9 11th Gen+ / Xeon E-2300+ with UHD Graphics P750/Iris Xe)";
            }
            else
            {
                minCpuCores = 2 + (int)Math.Ceiling(stationsPerNode / 4.0) + (jobsPerNode * 4);
                minRamGb = 4 + (int)Math.Ceiling(stationsPerNode * 0.35) + (jobsPerNode * 6);
                gpuTier = "CPU Software Encoding (libx264 - Multi-node Active-Active cluster strongly recommended)";
            }

            minCpuCores = Math.Clamp(minCpuCores, 4, 64);
            if (minCpuCores % 2 != 0) minCpuCores++;

            // Align RAM to standard enterprise memory DIMMs
            if (minRamGb <= 16) minRamGb = 16;
            else if (minRamGb <= 32) minRamGb = 32;
            else if (minRamGb <= 64) minRamGb = 64;
            else if (minRamGb <= 128) minRamGb = 128;
            else minRamGb = 256;

            // Network throughput calculation
            double ingestMbps = stations * 3.5;
            double liveViewerMbps = (stations * 0.3) * 3.5;
            double totalBandwidthMbps = Math.Round((ingestMbps + liveViewerMbps) * 1.15, 1);
            double perNodeBandwidthMbps = Math.Round(totalBandwidthMbps / Math.Max(1, activeNodes), 1);
            int minNetSpeed = perNodeBandwidthMbps > 700 ? 10000 : 1000;
            string netCard = perNodeBandwidthMbps > 700
                ? "10 Gbps SFP+ (High-Density Stream Aggregation & Forensic Bus)"
                : "1 Gbps Dedicated LAN (Dual-Port LACP Teamed)";

            // Storage I/O
            double storageWriteMBps = Math.Round((stations * 0.44) + (jobs * 25.0), 1);
            double perNodeWriteMBps = Math.Round(storageWriteMBps / Math.Max(1, activeNodes), 1);
            string storageText = perNodeWriteMBps > 50.0
                ? $"High-Speed NVMe PCIe 4.0 SSD or 10GbE NetApp NAS with SSD caching (Sustained write >= {Math.Ceiling(perNodeWriteMBps * 1.5)} MB/s, >= 15,000 IOPS)"
                : $"Enterprise SSD (SATA/NVMe) or Enterprise CIFS/SMB UNC path (Sustained write >= {Math.Ceiling(perNodeWriteMBps * 1.5)} MB/s, >= 5,000 IOPS)";

            // Current Cluster Evaluation
            bool capable = true;
            string status = "Ready";
            string summary;
            int curStreams = currentGrid?.TotalStreamsCapacity ?? 0;
            int curJobs = currentGrid?.TotalConcurrentJobsCapacity ?? 0;
            int curOnlineNodes = currentGrid?.OnlineNodesCount ?? 0;
            int streamUtil = curStreams > 0 ? (int)Math.Round(((double)stations / curStreams) * 100) : 0;
            int jobsUtil = curJobs > 0 ? (int)Math.Round(((double)jobs / curJobs) * 100) : 0;
            int headroomStreams = Math.Max(0, curStreams - stations);
            int headroomJobs = Math.Max(0, curJobs - jobs);

            if (currentGrid != null && currentGrid.TotalNodes > 0)
            {
                if (curStreams >= stations && curJobs >= jobs)
                {
                    status = "Ready";
                    capable = true;
                    summary = $"Current cluster is fully qualified! Capacity: {curStreams} streams (+{headroomStreams} headroom, {streamUtil}% load) and {curJobs} NLE jobs (+{headroomJobs} slots, {jobsUtil}% load).";
                }
                else if (curStreams >= (int)(stations * 0.8) && curJobs >= (int)(jobs * 0.8))
                {
                    status = "Warning";
                    capable = true;
                    summary = $"Cluster near operational threshold ({curStreams}/{stations} streams, {curJobs}/{jobs} NLE jobs). Consider adding 1 Active node for safety margin.";
                }
                else
                {
                    status = "Deficit";
                    capable = false;
                    int deficitStreams = Math.Max(0, stations - curStreams);
                    int deficitJobs = Math.Max(0, jobs - curJobs);
                    int addNodes = Math.Max(1, activeNodes - curOnlineNodes);
                    summary = $"Cluster capacity deficit detected! Short by {deficitStreams} streams and/or {deficitJobs} NLE jobs. Add {addNodes} more Active node(s) or upgrade GPU to NVENC.";
                }
            }
            else
            {
                summary = "Standalone host or initial deployment. Hardware sizing recommendations computed based on target workloads.";
            }

            var reportSb = new System.Text.StringBuilder();
            reportSb.AppendLine("================================================================================");
            reportSb.AppendLine("ITB SCREEN RECORDER — CLUSTER HARDWARE SIZING & FLEET SPECIFICATION");
            reportSb.AppendLine("================================================================================");
            reportSb.AppendLine($"Target Fleet Size:          {stations} Workstations (24/7 continuous capture)");
            reportSb.AppendLine($"Simultaneous NLE Cuts:      {jobs} Concurrent Multi-Cam Render Jobs");
            reportSb.AppendLine($"Cluster Architecture:       {mode} (Distributed Compute Grid)");
            reportSb.AppendLine("--------------------------------------------------------------------------------");
            reportSb.AppendLine("RECOMMENDED CLUSTER TOPOLOGY:");
            reportSb.AppendLine($"• Total Cluster Nodes:      {activeNodes + standbyNodes} Nodes ({activeNodes} Active" + (standbyNodes > 0 ? $", {standbyNodes} Standby)" : ")"));
            reportSb.AppendLine($"• Target Workload Per Node:  ~{stationsPerNode} Ingest Streams & ~{jobsPerNode} Concurrent NLE Cuts");
            reportSb.AppendLine("--------------------------------------------------------------------------------");
            reportSb.AppendLine("MINIMUM HARDWARE SPECIFICATIONS (PER NODE):");
            reportSb.AppendLine($"• Processor (CPU):          {minCpuCores} Physical Cores ({minCpuCores * 2} vCPUs) @ 3.0GHz+");
            reportSb.AppendLine($"• System Memory (RAM):       {minRamGb} GB DDR4/DDR5 ECC");
            reportSb.AppendLine($"• Hardware GPU Encoder:     {gpuTier}");
            reportSb.AppendLine($"• Network Interface (NIC):  {netCard} (Aggregated Peak: {totalBandwidthMbps} Mbps, Per Node: {perNodeBandwidthMbps} Mbps)");
            reportSb.AppendLine($"• Storage Sustained I/O:    {storageText} (Write Rate: {storageWriteMBps} MB/s)");
            reportSb.AppendLine("--------------------------------------------------------------------------------");
            reportSb.AppendLine($"FLEET READINESS STATUS:     [{status.ToUpperInvariant()}] {summary}");
            reportSb.AppendLine("================================================================================");

            return new HardwareSizingResult
            {
                TargetStations = stations,
                TargetConcurrentJobs = jobs,
                RedundancyMode = mode,
                RecommendedNodeCount = activeNodes + standbyNodes,
                RecommendedActiveNodes = activeNodes,
                RecommendedStandbyNodes = standbyNodes,
                MinCpuCoresPerNode = minCpuCores,
                MinRamGbPerNode = minRamGb,
                RecommendedGpuTier = gpuTier,
                MinNetworkSpeedMbps = minNetSpeed,
                RecommendedNetworkCard = netCard,
                StorageWriteRateMBps = storageWriteMBps,
                StorageRequirementsText = storageText,
                CurrentClusterCapable = capable,
                CurrentClusterMaxStreams = curStreams,
                CurrentClusterMaxJobs = curJobs,
                CurrentClusterOnlineNodes = curOnlineNodes,
                ClusterStreamsUtilizationPct = streamUtil,
                ClusterJobsUtilizationPct = jobsUtil,
                HeadroomStreams = headroomStreams,
                HeadroomJobs = headroomJobs,
                IsGpuAccelerationRecommended = stations >= 30 || jobs >= 2,
                EvaluationStatus = status,
                EvaluationSummary = summary,
                SizingReport = reportSb.ToString()
            };
        }
    }

    #region Inter-Node C2 Coordination Contracts

    public class ClusterStreamPolicyRequest
    {
        [JsonPropertyName("hostname")]
        public string Hostname { get; set; } = string.Empty;

        [JsonPropertyName("enable")]
        public bool Enable { get; set; }

        [JsonPropertyName("sourceNodeId")]
        public string SourceNodeId { get; set; } = Environment.MachineName;

        [JsonPropertyName("timestampUtc")]
        public DateTime TimestampUtc { get; set; } = DateTime.UtcNow;
    }

    public class ClusterFleetStreamPolicyRequest
    {
        [JsonPropertyName("hostnames")]
        public List<string> Hostnames { get; set; } = new();

        [JsonPropertyName("enable")]
        public bool Enable { get; set; }

        [JsonPropertyName("sourceNodeId")]
        public string SourceNodeId { get; set; } = Environment.MachineName;

        [JsonPropertyName("timestampUtc")]
        public DateTime TimestampUtc { get; set; } = DateTime.UtcNow;
    }

    public class ClusterStationOverrideRequest
    {
        [JsonPropertyName("hostname")]
        public string Hostname { get; set; } = string.Empty;

        [JsonPropertyName("videoBitrate")]
        public string? VideoBitrate { get; set; }

        [JsonPropertyName("targetFps")]
        public int? TargetFps { get; set; }

        [JsonPropertyName("isDelete")]
        public bool IsDelete { get; set; }

        [JsonPropertyName("sourceNodeId")]
        public string SourceNodeId { get; set; } = Environment.MachineName;

        [JsonPropertyName("timestampUtc")]
        public DateTime TimestampUtc { get; set; } = DateTime.UtcNow;
    }

    public class ClusterConfigSyncRequest
    {
        [JsonPropertyName("sourceNodeId")]
        public string SourceNodeId { get; set; } = Environment.MachineName;

        [JsonPropertyName("systemConfig")]
        public SystemConfig SystemConfig { get; set; } = new();

        [JsonPropertyName("timestampUtc")]
        public DateTime TimestampUtc { get; set; } = DateTime.UtcNow;
    }

    public class ClusterNodeCapacitiesUpdateRequest
    {
        [JsonPropertyName("autoHardwareCapacity")]
        public bool? AutoHardwareCapacity { get; set; }

        [JsonPropertyName("maxStreamsCapacity")]
        public int? MaxStreamsCapacity { get; set; }

        [JsonPropertyName("maxConcurrentJobs")]
        public int? MaxConcurrentJobs { get; set; }

        [JsonPropertyName("nodeMode")]
        public string? NodeMode { get; set; }
    }

    public class ClusterActionResultDto
    {
        [JsonPropertyName("success")]
        public bool Success { get; set; }

        [JsonPropertyName("message")]
        public string Message { get; set; } = string.Empty;

        [JsonPropertyName("targetNodeId")]
        public string TargetNodeId { get; set; } = string.Empty;

        [JsonPropertyName("state")]
        public string? State { get; set; }
    }

    #endregion
}
