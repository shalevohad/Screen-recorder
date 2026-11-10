// ==========================================
// File: ITB-SCREEN-RECORDER.Core/Contracts/Network/ServerDiscoveryContracts.cs
// ==========================================
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

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
        Unreachable
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

        [JsonPropertyName("state")]
        public string State { get; set; } = ClusterNodeState.Active.ToString();

        [JsonPropertyName("priority")]
        public int Priority { get; set; } = 50;

        [JsonPropertyName("activeStreamsCount")]
        public int ActiveStreamsCount { get; set; }

        [JsonPropertyName("maxStreamsCapacity")]
        public int MaxStreamsCapacity { get; set; } = 50;

        [JsonPropertyName("activeJobsCount")]
        public int ActiveJobsCount { get; set; }

        [JsonPropertyName("maxConcurrentJobs")]
        public int MaxConcurrentJobs { get; set; } = 2;

        [JsonPropertyName("hostCpuPct")]
        public double HostCpuPct { get; set; }

        [JsonPropertyName("gpuNvencPct")]
        public double GpuNvencPct { get; set; }

        [JsonPropertyName("processRamMb")]
        public double ProcessRamMb { get; set; }

        [JsonPropertyName("lastSeenUtc")]
        public DateTime LastSeenUtc { get; set; } = DateTime.UtcNow;

        [JsonPropertyName("assignedStations")]
        public List<string> AssignedStations { get; set; } = new();

        [JsonIgnore]
        public bool IsOnline => (DateTime.UtcNow - LastSeenUtc).TotalSeconds <= 12;

        [JsonIgnore]
        public bool IsOrchestrator => string.Equals(Role, ServerDiscoveryConstants.RoleOrchestrator, StringComparison.OrdinalIgnoreCase) ||
                                      string.Equals(Role, ServerDiscoveryConstants.RolePrimary, StringComparison.OrdinalIgnoreCase);

        [JsonIgnore]
        public double LoadRatio => MaxStreamsCapacity > 0 ? (double)ActiveStreamsCount / MaxStreamsCapacity : 1.0;
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

        [JsonPropertyName("serverUtcTime")]
        public DateTime ServerUtcTime { get; set; } = DateTime.UtcNow;
    }

    public class ClusterGridStatusDto
    {
        [JsonPropertyName("clusterMode")]
        public string ClusterMode { get; set; } = ServerDiscoveryConstants.RoleActiveActive;

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

        [JsonPropertyName("enableVirtualIp")]
        public bool EnableVirtualIp { get; set; }

        [JsonPropertyName("virtualIp")]
        public string? VirtualIp { get; set; }

        [JsonPropertyName("isVipBoundLocally")]
        public bool IsVipBoundLocally { get; set; }

        [JsonPropertyName("nodes")]
        public List<ClusterNodeDescriptor> Nodes { get; set; } = new();
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
}
