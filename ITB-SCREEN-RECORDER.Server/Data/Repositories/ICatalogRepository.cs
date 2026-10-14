namespace ITB_SCREEN_RECORDER.Server.Data.Repositories;

using System.Collections.Generic;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Contracts.Keystroke;
using ITB_SCREEN_RECORDER.Core.Contracts.Storage;
using ITB_SCREEN_RECORDER.Server.Models.Security;

public record StationOverrideRecord(string Hostname, string? VideoBitrate, int? TargetFps, long UpdatedAtUtc);

public record CustomTabRecord(
    string Id,
    string Name,
    string HostnamesJson,
    string OusJson,
    bool IsDefault,
    int DisplayOrder,
    long UpdatedAtUtc
);

public interface ICatalogRepository : IKeystrokeRepository
{
    // Recording Chunks
    Task BulkUpsertChunksAsync(IEnumerable<ChunkFinalizedEvent> chunks);
    Task UpsertActiveChunkAsync(string stationId, string filePath, long startEpochMs, int fps, int width, int height, bool hasAudio);
    Task FinalizeChunkAsync(string filePath, long endEpochMs, long fileSizeBytes);
    Task<IReadOnlyList<ChunkFinalizedEvent>> GetChunksForWindowAsync(string stationId, long fromEpochMs, long toEpochMs);
    Task<IReadOnlyList<ChunkFinalizedEvent>> GetExpiredCandidateChunksAsync(long cutoffUtc, int batchLimit);
    Task RemoveChunksAsync(IEnumerable<string> filePaths);

    // Keystrokes Maintenance
    Task<int> PurgeExpiredKeystrokesAsync(long cutoffEpochMs);

    // System Configurations
    Task<string?> GetConfigurationAsync(string key);
    Task SetConfigurationAsync(string key, string jsonValue);
    Task<Dictionary<string, string>> GetAllConfigurationsAsync();

    // Custom Tabs
    Task<List<CustomTabRecord>> GetAllTabsAsync();
    Task UpsertTabAsync(CustomTabRecord tab);
    Task<bool> DeleteTabAsync(string tabId);

    // Station Overrides
    Task<Dictionary<string, StationOverrideRecord>> GetAllOverridesAsync();
    Task UpsertOverrideAsync(string hostname, string? videoBitrate, int? targetFps);
    Task<bool> DeleteOverrideAsync(string hostname);

    // Station Roles
    Task<Dictionary<string, string>> GetAllStationRoleAliasesAsync();
    Task SetStationRoleAliasAsync(string hostname, string? roleAlias);
    Task BulkUpdateStationRoleAliasesAsync(IEnumerable<(string Hostname, string? RoleAlias)> mappings);

    // Security & Policies
    Task<SecurityPolicyStateDto> GetSecurityPolicyAsync();
    Task SetSecurityPolicyModeAsync(AuthMode mode);
    Task UpdateLdapPolicySettingsAsync(string server, int port, string baseDn, bool useSsl);

    // Roles
    Task<IReadOnlyList<RoleDto>> GetAllRolesAsync();
    Task<RoleDto?> GetRoleByIdAsync(string roleId);
    Task UpsertRoleAsync(RoleDto role);
    Task<bool> DeleteRoleAsync(string roleId);

    // Users
    Task<IReadOnlyList<UserDto>> GetAllUsersAsync();
    Task<UserDto?> GetUserByUsernameAsync(string username);
    Task<UserDto?> GetUserByIdAsync(string userId);
    Task<string> CreateUserAsync(string username, string displayName, string passwordHash, string authSource, IEnumerable<string> roleIds);
    Task UpdateUserPasswordAsync(string userId, string newPasswordHash);
    Task UpdateUserRolesAndOverridesAsync(string userId, IEnumerable<string> roleIds, IEnumerable<string> grantedOverrides, IEnumerable<string> revokedOverrides);
    Task UpdateUserLastLoginAsync(string userId, long loginEpochMs);
    Task<bool> DeleteUserAsync(string userId);

    // LDAP Mappings
    Task<IReadOnlyList<LdapGroupMappingDto>> GetAllLdapGroupMappingsAsync();
    Task UpsertLdapGroupMappingAsync(string adGroupName, string roleId);
    Task<bool> DeleteLdapGroupMappingAsync(string mappingId);

    // Direct Recovery
    Task<bool> ResetRootPasswordDirectAsync(string newPasswordHash);
}