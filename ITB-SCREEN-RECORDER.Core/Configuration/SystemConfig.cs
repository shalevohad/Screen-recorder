// ==========================================
// File: ITB-SCREEN-RECORDER.Core/Configuration/SystemConfig.cs
// ==========================================
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ITB_SCREEN_RECORDER.Core.Configuration
{
    public class SystemConfig
    {
        public const string SectionName = "SystemConfig";

        /// <summary>
        /// HTTP listener and dashboard port for the central ASP.NET Core server.
        /// </summary>
        [Range(1, 65535)]
        public int HttpPort { get; set; } = 5090;

        [Range(1, 365, ErrorMessage = "RecordingRetentionDays must be between 1 and 365")]
        public int RecordingRetentionDays { get; set; }

        [Range(10, 100000)]
        public int MaxStorageQuotaGb { get; set; }

        [Range(500, 60000)]
        public int DashboardRefreshRateMs { get; set; }

        public string DisplayTimezone { get; set; } = "UTC";

        public string DisplayLocale { get; set; } = "en-US";

        /// <summary>
        /// Cross-platform manual Daylight Saving Time (DST) transition rules.
        /// </summary>
        public List<DstTransitionRule> ManualDstTransitions { get; set; } = new();

        /// <summary>
        /// Tactical dashboard settings including snapshot polling intervals and live concurrency limits.
        /// </summary>
        public DashboardSettings Dashboard { get; set; } = new DashboardSettings();

        [Required]
        public MediaMtxSettings MediaMtx { get; set; } = null!;

        [Required]
        public StorageSettings Storage { get; set; } = null!;

        [Required]
        public SecuritySettings Security { get; set; } = null!;

        [Required]
        [RegularExpression(ConfigValidationRules.BitrateRegex, ErrorMessage = ConfigValidationRules.BitrateErrorMessage)]
        public string DefaultVideoBitrate { get; set; } = "2500K";

        [Required]
        [Range(10, 60, ErrorMessage = "DefaultTargetFps must be between 10 and 60.")]
        public int DefaultTargetFps { get; set; } = 20;

        [Required]
        public DiscoverySettings Discovery { get; set; } = new DiscoverySettings();

        /// <summary>
        /// Settings for the automated multi-monitor focus director and forensic replay cuts.
        /// </summary>
        public AutoDirectorSettings AutoDirector { get; set; } = new AutoDirectorSettings();
    }

    public class DiscoverySettings
    {
        public bool Enabled { get; set; } = true;

        [Range(1024, 65535)]
        public int Port { get; set; } = 5098;

        public string MulticastAddress { get; set; } = "239.210.1.5";

        public bool EnableBroadcastFallback { get; set; } = true;

        public string BroadcastAddress { get; set; } = "255.255.255.255";

        public string ServerDisplayName { get; set; } = "ITB Central Server";

        public string EnvironmentName { get; set; } = "Production";

        public string ServiceName { get; set; } = "ITB-SCREEN-RECORDER";

        public string Role { get; set; } = "Active-Active"; // "Active-Active", "Active-Standby", "Standalone", "Aggregate"

        public string NodeRole { get; set; } = "Primary"; // "Primary", "Secondary", "Orchestrator", "Worker"

        /// <summary>
        /// Node operational mode in the cluster: "Active" (ingest & compute) or "Standby" (hot backup spare).
        /// Allows hybrid topologies where some nodes are Active and some are Standby.
        /// </summary>
        public string NodeMode { get; set; } = "Active"; // "Active", "Standby"

        /// <summary>
        /// Logical cluster group identifier. Nodes broadcasting this group ID autonomously merge into the same cluster grid.
        /// </summary>
        public string ClusterGroup { get; set; } = "Production";

        /// <summary>
        /// When true, enables autonomous peer auto-discovery via UDP Multicast and Subnet Broadcast.
        /// Eliminates the need to manually configure peer IP addresses or seed URLs.
        /// </summary>
        public bool AutoPeerDiscovery { get; set; } = true;

        [Range(0, 100)]
        public int Priority { get; set; } = 1;

        public string? PartnerServerUrl { get; set; }

        /// <summary>
        /// Seed/peer cluster node endpoints for Active-Active multi-server federation (e.g. ["http://192.168.1.101:5090", "http://192.168.1.102:5090"]).
        /// </summary>
        public List<string> ClusterPeerUrls { get; set; } = new();

        /// <summary>
        /// When true, node dynamically computes its stream and NLE job capacity from actual hardware specs (CPU, RAM, GPU).
        /// </summary>
        public bool AutoHardwareCapacity { get; set; } = true;

        /// <summary>
        /// Maximum concurrent ingest streams assigned to this node before load balancing diverts to other nodes.
        /// When AutoHardwareCapacity is true or value is 0, dynamically derived from hardware probe.
        /// </summary>
        [Range(0, 500)]
        public int MaxIngestStreamsCapacity { get; set; } = 0;

        /// <summary>
        /// Maximum concurrent video export/render jobs allowed on this node.
        /// When AutoHardwareCapacity is true or value is 0, dynamically derived from hardware probe.
        /// </summary>
        [Range(0, 32)]
        public int MaxConcurrentRenderJobs { get; set; } = 0;

        /// <summary>
        /// When true, Orchestrator automatically balances incoming agent streams across online cluster nodes.
        /// </summary>
        public bool AutoBalanceStreams { get; set; } = true;

        /// <summary>
        /// When true, video export and forensic cutting jobs are distributed across cluster nodes based on GPU/CPU availability.
        /// </summary>
        public bool DistributedVideoProcessingEnabled { get; set; } = true;

        public bool AutoFailoverDashboard { get; set; } = true;

        [Range(1, 60)]
        public int DashboardFailoverDelaySeconds { get; set; } = 8;

        [Range(1, 30)]
        public int HeartbeatIntervalSeconds { get; set; } = 2;

        [Range(1, 10)]
        public int HeartbeatMissedThreshold { get; set; } = 3;

        public bool PreemptLowerPriority { get; set; } = false;

        public bool EnableVirtualIp { get; set; } = false;

        public string? VirtualIp { get; set; }

        public string VirtualIpSubnetMask { get; set; } = "255.255.255.0";

        public string? NetworkInterfaceName { get; set; }
    }

    public class DstTransitionRule
    {
        public DateTime SwitchUtc { get; set; }
        public int OffsetBeforeMinutes { get; set; }
        public int OffsetAfterMinutes { get; set; }
        public string LabelBefore { get; set; } = "IDT";
        public string LabelAfter { get; set; } = "IST";
        public string Description { get; set; } = string.Empty;
    }

    public class DashboardSettings
    {
        public int SnapshotMinDelayMs { get; set; } = 1500;
        public int SnapshotMaxDelayMs { get; set; } = 4500;
        public int SnapshotBufferMarginPx { get; set; } = 250;
        public int MaxConcurrentLiveStreams { get; set; } = 9;
    }

    public class MediaMtxSettings
    {
        [Required(ErrorMessage = "MediaMtx ExecutablePath is required in appsettings.json")]
        public string ExecutablePath { get; set; } = "MediaMTX\\mediamtx.exe";

        [Range(1024, 65535)]
        public int RtmpPort { get; set; } = 19350;

        [Range(1024, 65535)]
        public int ApiPort { get; set; } = 9997;

        [Range(1024, 65535)]
        public int HlsPort { get; set; } = 8888;

        [Range(1024, 65535)]
        public int PlaybackPort { get; set; } = 9996;

        [Range(1024, 65535)]
        public int MetricsPort { get; set; } = 9998;

        [Range(1024, 65535)]
        public int PprofPort { get; set; } = 9999;

        public bool EnableMetrics { get; set; } = true;

        public bool EnablePprof { get; set; } = true;

        public bool EnablePlayback { get; set; } = true;

        public bool HlsAlwaysRemux { get; set; } = true;

        public string HlsVariant { get; set; } = "fmp4";

        public string HlsSegmentDuration { get; set; } = "2s";

        public string Timezone { get; set; } = "UTC";
    }

    public class StorageSettings
    {
        [Required(ErrorMessage = "NetAppUncPath is required in appsettings.json")]
        public string NetAppUncPath { get; set; } = string.Empty;

        [Required(ErrorMessage = "LocalFallbackPath is required in appsettings.json")]
        public string LocalFallbackPath { get; set; } = string.Empty;

        [Range(1, 60)]
        public int ChunkIntervalMinutes { get; set; }

        [Range(1, 365)]
        public int RetentionDays { get; set; }

        [Required(ErrorMessage = "ChunkEventLogPath is required in appsettings.json")]
        public string ChunkEventLogPath { get; set; } = string.Empty;

        public string RecordFormat { get; set; } = "fmp4";
    }

    public class SecuritySettings
    {
        [Required]
        public string AllowedAdAdminGroup { get; set; } = string.Empty;

        public string JwtSecretKey { get; set; } = string.Empty;

        [Range(1, 24)]
        public int TokenExpirationHours { get; set; }
    }

    public class StationOverride
    {
        public string? VideoBitrate { get; set; }
        public int? TargetFps { get; set; }
    }

    public class AutoDirectorSettings
    {
        /// <summary>
        /// Minimum duration in seconds that the Auto-Director camera remains focused on an active screen before allowing a cut to another screen.
        /// Default is 10 seconds. Range: 1 to 120 seconds.
        /// </summary>
        [Range(1, 120, ErrorMessage = "MinDwellSeconds must be between 1 and 120 seconds.")]
        public int MinDwellSeconds { get; set; } = 10;

        /// <summary>
        /// Maximum concurrent live video decoders / playback streams permitted simultaneously in the Replay & Editing Studio.
        /// Hard capped at 6 to guarantee zero browser/server decode exhaustion. Range: 1 to 6. Default is 6.
        /// </summary>
        [Range(1, 6, ErrorMessage = "MaxConcurrentScreens must be between 1 and 6.")]
        public int MaxConcurrentScreens { get; set; } = 6;

        /// <summary>
        /// Preload buffer duration in seconds before starting synchronized playback across multiple screens.
        /// Default is 2.0 seconds. Range: 0.5 to 5.0 seconds.
        /// </summary>
        [Range(0.5, 5.0, ErrorMessage = "BufferPreloadSeconds must be between 0.5 and 5.0 seconds.")]
        public double BufferPreloadSeconds { get; set; } = 2.0;

        /// <summary>
        /// Master toggle for Auto-Director automated camera cuts in Replay Studio.
        /// </summary>
        public bool EnableAutoDirector { get; set; } = true;
    }
}