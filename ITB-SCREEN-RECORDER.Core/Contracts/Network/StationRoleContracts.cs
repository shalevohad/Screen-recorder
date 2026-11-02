namespace ITB_SCREEN_RECORDER.Core.Contracts.Network;

using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using System.Xml.Serialization;

/// <summary>
/// Represents a historical or time-bounded operational station role assignment interval.
/// </summary>
public class StationRoleIntervalDto
{
    [JsonPropertyName("stationId")]
    [XmlElement("StationId")]
    public string StationId { get; set; } = string.Empty;

    [JsonPropertyName("roleAlias")]
    [XmlElement("RoleAlias")]
    public string RoleAlias { get; set; } = string.Empty;

    [JsonPropertyName("assignedAtUtcMs")]
    [XmlElement("AssignedAtUtcMs")]
    public long AssignedAtUtcMs { get; set; }

    [JsonPropertyName("releasedAtUtcMs")]
    [XmlElement("ReleasedAtUtcMs")]
    public long? ReleasedAtUtcMs { get; set; }

    [JsonPropertyName("assignedUtc")]
    [XmlIgnore]
    public DateTime AssignedUtc => DateTimeOffset.FromUnixTimeMilliseconds(AssignedAtUtcMs).UtcDateTime;

    [JsonPropertyName("releasedUtc")]
    [XmlIgnore]
    public DateTime? ReleasedUtc => ReleasedAtUtcMs.HasValue 
        ? DateTimeOffset.FromUnixTimeMilliseconds(ReleasedAtUtcMs.Value).UtcDateTime 
        : null;

    [JsonPropertyName("isActive")]
    [XmlIgnore]
    public bool IsActive => !ReleasedAtUtcMs.HasValue;
}

/// <summary>
/// Operational station role and alias provider accessible across server and feature plugins.
/// Supports temporal/historical role resolution for court-admissible forensic replay and multi-station cutting.
/// </summary>
public interface IStationRoleProvider
{
    /// <summary>
    /// Retrieves current active station role aliases (keyed by physical hostname, case-insensitive).
    /// </summary>
    Task<Dictionary<string, string>> GetAllStationRoleAliasesAsync();

    /// <summary>
    /// Retrieves station role aliases valid at a specific point in time (keyed by physical hostname).
    /// </summary>
    Task<Dictionary<string, string>> GetStationRoleAliasesAtEpochAsync(long epochMs);

    /// <summary>
    /// Retrieves station role aliases valid during a time range [startEpochMs, endEpochMs] (keyed by physical hostname).
    /// If an alias changed during the range, resolves to the assignment active during that period.
    /// </summary>
    Task<Dictionary<string, string>> GetStationRoleAliasesForTimeRangeAsync(long startEpochMs, long endEpochMs);

    /// <summary>
    /// Retrieves complete station role assignment history across optional time window or station filter.
    /// </summary>
    Task<List<StationRoleIntervalDto>> GetStationRoleHistoryAsync(long? startEpochMs = null, long? endEpochMs = null, string? stationId = null);
}
