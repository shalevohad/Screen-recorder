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
        public const string DefaultMulticastAddress = "239.255.10.90";

        /// <summary>
        /// Dedicated UDP port for autonomous ITB server discovery.
        /// </summary>
        public const int DefaultDiscoveryPort = 5098;

        public const string ProbeMagic = "ITB_DISCOVERY_PROBE";
        public const string ResponseMagic = "ITB_DISCOVERY_RESPONSE";
        public const string ProtocolVersion = "1.0";
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
        public string Role { get; set; } = "Primary";

        [JsonPropertyName("priority")]
        public int Priority { get; set; } = 1;

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
    }
}
