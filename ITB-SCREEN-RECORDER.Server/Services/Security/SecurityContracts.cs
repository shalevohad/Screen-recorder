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
    long UpdatedAtUtc
);