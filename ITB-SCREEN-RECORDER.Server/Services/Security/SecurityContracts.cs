namespace ITB_SCREEN_RECORDER.Server.Models.Security;

using System.Collections.Generic;

public enum AuthMode
{
    Open = 0,
    StrictLocal = 1,
    StrictLdap = 2
}

public record RoleDto(
    string Id,
    string Name,
    string Description,
    string Icon,
    string Color,
    int DisplayOrder,
    bool IsBuiltIn,
    IReadOnlyList<string> Permissions
);

public record UserDto(
    string Id,
    string Username,
    string DisplayName,
    string AuthSource,
    bool IsActive,
    bool IsSystemImmutable,
    long CreatedAtUtc,
    long? LastLoginUtc,
    IReadOnlyList<string> AssignedRoleIds,
    IReadOnlyList<string> PermissionOverridesGranted,
    IReadOnlyList<string> PermissionOverridesRevoked
);

public record StationRoleMappingDto(
    string Hostname,
    string? RoleAlias,
    string? MachineId,
    long UpdatedAtUtc
);

public record LdapGroupMappingDto(
    string Id,
    string AdGroupName,
    string RoleId,
    long UpdatedAtUtc
);

public record SecurityPolicyStateDto(
    AuthMode CurrentMode,
    bool IsLdapConfigured,
    string? LdapServer,
    int LdapPort,
    string? LdapBaseDn,
    bool UseSsl,
    long UpdatedAtUtc,
    string? LdapBindDn = null,
    bool HasBindPassword = false
);

public record PermissionItemDto(
    string Key,
    string Name,
    string Category,
    string Description
);

public record AdEntityDto(
    string SamAccountName,
    string DisplayName,
    string DistinguishedName,
    string Type, // "Security Group" | "Distribution Group" | "User"
    string Description,
    string? ParentOu
);

public record AdOuNodeDto(
    string DistinguishedName,
    string Name,
    string Type, // "ou" | "container" | "domain"
    bool HasChildren,
    int EntityCount
);

public record AdBrowseResultDto(
    string CurrentDn,
    string CurrentName,
    IReadOnlyList<AdOuNodeDto> SubOus,
    IReadOnlyList<AdEntityDto> Entities,
    bool IsSimulated = false,
    string? Message = null
);

public record AdSearchResultDto(
    string Query,
    IReadOnlyList<AdEntityDto> Results,
    bool IsSimulated = false,
    string? Message = null
);

public record LdapTestResultDto(
    bool Success,
    string Message,
    string? DefaultNamingContext = null,
    string? Server = null
);

public record AdAutoDetectResultDto(
    bool Success,
    string Message,
    string? DiscoveredServer,
    int DiscoveredPort,
    string? DiscoveredBaseDn,
    bool UseSsl,
    long LatencyMs,
    IReadOnlyList<string>? Details = null
);

public record AdDiagnosticStepDto(
    string StepName,
    bool Success,
    long LatencyMs,
    string Message,
    string? Details = null
);

public record AdDiagnosticsReportDto(
    bool OverallSuccess,
    string Summary,
    IReadOnlyList<AdDiagnosticStepDto> Steps,
    string? Recommendation = null
);