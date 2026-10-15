namespace ITB_SCREEN_RECORDER.Server.Data.Repositories;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using ITB_SCREEN_RECORDER.Core.Contracts.Keystroke;
using ITB_SCREEN_RECORDER.Core.Contracts.Storage;
using ITB_SCREEN_RECORDER.Server.Data;
using ITB_SCREEN_RECORDER.Server.Models.Security;

public sealed class CatalogRepository : ICatalogRepository
{
    private readonly ICatalogConnectionFactory _factory;

    public CatalogRepository(ICatalogConnectionFactory factory)
    {
        _factory = factory;
    }

    #region Recording Chunks
    public async Task BulkUpsertChunksAsync(IEnumerable<ChunkFinalizedEvent> chunks)
    {
        using var db = _factory.CreateConnection();
        using var tx = db.BeginTransaction();

        const string sql = @"
            INSERT INTO recording_chunks 
            (station_id, file_path, start_epoch_ms, end_epoch_ms, duration_ms, file_size_bytes, 
             width, height, fps, has_audio, is_finalized, indexed_at_utc)
            VALUES (@StationId, @FilePath, @StartEpochMs, @EndEpochMs, (@EndEpochMs - @StartEpochMs), 
                    @FileSizeBytes, @Width, @Height, @Fps, @HasAudio, @IsFinalized, @IndexedAtUtc)
            ON CONFLICT(file_path) DO UPDATE SET
                end_epoch_ms = excluded.end_epoch_ms,
                duration_ms = (excluded.end_epoch_ms - recording_chunks.start_epoch_ms),
                file_size_bytes = excluded.file_size_bytes,
                width = CASE WHEN excluded.width > 0 THEN excluded.width ELSE recording_chunks.width END,
                height = CASE WHEN excluded.height > 0 THEN excluded.height ELSE recording_chunks.height END,
                fps = CASE WHEN excluded.fps > 0 THEN excluded.fps ELSE recording_chunks.fps END,
                has_audio = excluded.has_audio,
                is_finalized = excluded.is_finalized,
                indexed_at_utc = excluded.indexed_at_utc;
        ";

        var now = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
        var records = chunks.Select(c => new
        {
            c.StationId,
            c.FilePath,
            c.StartEpochMs,
            c.EndEpochMs,
            c.FileSizeBytes,
            Width = c.Width > 0 ? c.Width : 1920,
            Height = c.Height > 0 ? c.Height : 1080,
            Fps = c.Fps > 0 ? c.Fps : 30,
            HasAudio = c.HasAudio ? 1 : 0,
            IsFinalized = c.IsFinalized ? 1 : 0,
            IndexedAtUtc = now
        });

        await db.ExecuteAsync(sql, records, tx);
        tx.Commit();
    }

    public async Task UpsertActiveChunkAsync(string stationId, string filePath, long startEpochMs, int fps, int width, int height, bool hasAudio)
    {
        using var db = _factory.CreateConnection();
        const string sql = @"
            INSERT INTO recording_chunks 
            (station_id, file_path, start_epoch_ms, end_epoch_ms, duration_ms, file_size_bytes, 
             width, height, fps, has_audio, is_finalized, indexed_at_utc)
            VALUES (@stationId, @filePath, @startEpochMs, @startEpochMs, 0, 0, 
                    @width, @height, @fps, @hasAudio, 0, @indexedAtUtc)
            ON CONFLICT(file_path) DO NOTHING;
        ";

        await db.ExecuteAsync(sql, new
        {
            stationId,
            filePath,
            startEpochMs,
            width = width > 0 ? width : 1920,
            height = height > 0 ? height : 1080,
            fps = fps > 0 ? fps : 30,
            hasAudio = hasAudio ? 1 : 0,
            indexedAtUtc = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()
        });
    }

    public async Task FinalizeChunkAsync(string filePath, long endEpochMs, long fileSizeBytes)
    {
        using var db = _factory.CreateConnection();
        const string sql = @"
            UPDATE recording_chunks 
            SET end_epoch_ms = @endEpochMs,
                duration_ms = (@endEpochMs - start_epoch_ms),
                file_size_bytes = @fileSizeBytes,
                is_finalized = 1,
                indexed_at_utc = @indexedAtUtc
            WHERE file_path = @filePath;
        ";

        await db.ExecuteAsync(sql, new
        {
            filePath,
            endEpochMs,
            fileSizeBytes,
            indexedAtUtc = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()
        });
    }

    public async Task<IReadOnlyList<ChunkFinalizedEvent>> GetChunksForWindowAsync(string stationId, long fromEpochMs, long toEpochMs)
    {
        using var db = _factory.CreateConnection();
        const string sql = @"
            SELECT station_id AS StationId, file_path AS FilePath, 
                   start_epoch_ms AS StartEpochMs, end_epoch_ms AS EndEpochMs, 
                   file_size_bytes AS FileSizeBytes, is_finalized AS IsFinalized,
                   width AS Width, height AS Height, fps AS Fps, has_audio AS HasAudio
            FROM recording_chunks INDEXED BY idx_chunks_station_window_covering
            WHERE station_id = @stationId
              AND end_epoch_ms >= @fromEpochMs
              AND start_epoch_ms <= @toEpochMs
            ORDER BY start_epoch_ms ASC;
        ";

        var result = await db.QueryAsync<ChunkFinalizedEvent>(sql, new { stationId, fromEpochMs, toEpochMs });
        return result.AsList();
    }

    public async Task<IReadOnlyList<ChunkFinalizedEvent>> GetExpiredCandidateChunksAsync(long cutoffUtc, int batchLimit)
    {
        using var db = _factory.CreateConnection();
        const string sql = @"
            SELECT station_id AS StationId, file_path AS FilePath, 
                   start_epoch_ms AS StartEpochMs, end_epoch_ms AS EndEpochMs, 
                   file_size_bytes AS FileSizeBytes, is_finalized AS IsFinalized,
                   width AS Width, height AS Height, fps AS Fps, has_audio AS HasAudio
            FROM recording_chunks
            WHERE end_epoch_ms < @cutoffUtc
              AND is_finalized = 1
            ORDER BY end_epoch_ms ASC
            LIMIT @batchLimit;
        ";

        var result = await db.QueryAsync<ChunkFinalizedEvent>(sql, new { cutoffUtc, batchLimit });
        return result.AsList();
    }

    public async Task RemoveChunksAsync(IEnumerable<string> filePaths)
    {
        using var db = _factory.CreateConnection();
        using var tx = db.BeginTransaction();
        const string sql = "DELETE FROM recording_chunks WHERE file_path = @filePath;";
        await db.ExecuteAsync(sql, filePaths.Select(f => new { filePath = f }), tx);
        tx.Commit();
    }
    #endregion

    #region Keystrokes
    public async Task BulkInsertKeystrokesAsync(string stationId, IEnumerable<KeystrokeEventDto> events)
    {
        if (events == null || !events.Any()) return;

        using var db = _factory.CreateConnection();
        using var tx = db.BeginTransaction();

        const string sql = @"
            INSERT INTO keystroke_events (station_id, epoch_ms, key_combination, timestamp_utc)
            VALUES (@StationId, @EpochMs, @KeyCombination, @TimestampUtc);
        ";

        var records = events.Select(e => new
        {
            StationId = stationId,
            e.EpochMs,
            e.KeyCombination,
            TimestampUtc = e.TimestampUtc.ToString("o")
        });

        await db.ExecuteAsync(sql, records, tx);
        tx.Commit();
    }

    public async Task<IReadOnlyList<KeystrokeEventDto>> GetKeystrokesForWindowAsync(string stationId, long fromEpochMs, long toEpochMs)
    {
        using var db = _factory.CreateConnection();
        const string sql = @"
            SELECT epoch_ms AS EpochMs, key_combination AS KeyCombination, timestamp_utc AS TimestampUtc
            FROM keystroke_events INDEXED BY idx_keystrokes_station_epoch
            WHERE station_id = @stationId
              AND epoch_ms >= @fromEpochMs
              AND epoch_ms <= @toEpochMs
            ORDER BY epoch_ms ASC;
        ";

        var results = await db.QueryAsync<KeystrokeEventDto>(sql, new { stationId, fromEpochMs, toEpochMs });
        return results.AsList();
    }

    public async Task<int> PurgeExpiredKeystrokesAsync(long cutoffEpochMs)
    {
        using var db = _factory.CreateConnection();
        const string sql = "DELETE FROM keystroke_events WHERE epoch_ms < @cutoffEpochMs;";
        return await db.ExecuteAsync(sql, new { cutoffEpochMs });
    }
    #endregion

    #region System Configurations & Overrides
    public async Task<string?> GetConfigurationAsync(string key)
    {
        using var db = _factory.CreateConnection();
        const string sql = "SELECT config_value FROM system_configurations WHERE config_key = @key;";
        return await db.QuerySingleOrDefaultAsync<string?>(sql, new { key });
    }

    public async Task SetConfigurationAsync(string key, string jsonValue)
    {
        using var db = _factory.CreateConnection();
        const string sql = @"
            INSERT INTO system_configurations (config_key, config_value, updated_at_utc)
            VALUES (@key, @jsonValue, @now)
            ON CONFLICT(config_key) DO UPDATE SET
                config_value = excluded.config_value,
                updated_at_utc = excluded.updated_at_utc;
        ";
        await db.ExecuteAsync(sql, new { key, jsonValue, now = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds() });
    }

    public async Task<Dictionary<string, string>> GetAllConfigurationsAsync()
    {
        using var db = _factory.CreateConnection();
        const string sql = "SELECT config_key, config_value FROM system_configurations;";
        var rows = await db.QueryAsync<(string Key, string Value)>(sql);
        return rows.ToDictionary(r => r.Key, r => r.Value);
    }

    public async Task<Dictionary<string, StationOverrideRecord>> GetAllOverridesAsync()
    {
        using var db = _factory.CreateConnection();
        const string sql = @"
            SELECT hostname AS Hostname, video_bitrate AS VideoBitrate, 
                   target_fps AS TargetFps, updated_at_utc AS UpdatedAtUtc 
            FROM station_overrides;
        ";
        var rows = await db.QueryAsync<StationOverrideRecord>(sql);
        return rows.ToDictionary(r => r.Hostname, StringComparer.OrdinalIgnoreCase);
    }

    public async Task UpsertOverrideAsync(string hostname, string? videoBitrate, int? targetFps)
    {
        using var db = _factory.CreateConnection();
        const string sql = @"
            INSERT INTO station_overrides (hostname, video_bitrate, target_fps, updated_at_utc)
            VALUES (@hostname, @videoBitrate, @targetFps, @now)
            ON CONFLICT(hostname) DO UPDATE SET
                video_bitrate = excluded.video_bitrate,
                target_fps = excluded.target_fps,
                updated_at_utc = excluded.updated_at_utc;
        ";
        await db.ExecuteAsync(sql, new { hostname, videoBitrate, targetFps, now = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds() });
    }

    public async Task<bool> DeleteOverrideAsync(string hostname)
    {
        using var db = _factory.CreateConnection();
        const string sql = "DELETE FROM station_overrides WHERE hostname = @hostname;";
        int affected = await db.ExecuteAsync(sql, new { hostname });
        return affected > 0;
    }
    #endregion

    #region Custom Tabs
    public async Task<List<CustomTabRecord>> GetAllTabsAsync()
    {
        using var db = _factory.CreateConnection();
        const string sql = @"
            SELECT id AS Id, name AS Name, hostnames_json AS HostnamesJson, ous_json AS OusJson, 
                   is_default AS IsDefault, display_order AS DisplayOrder, updated_at_utc AS UpdatedAtUtc 
            FROM custom_tabs 
            ORDER BY display_order ASC, name ASC;
        ";
        var results = await db.QueryAsync<CustomTabRecord>(sql);
        return results.AsList();
    }

    public async Task UpsertTabAsync(CustomTabRecord tab)
    {
        using var db = _factory.CreateConnection();
        const string sql = @"
            INSERT INTO custom_tabs 
            (id, name, hostnames_json, ous_json, is_default, display_order, updated_at_utc)
            VALUES (@Id, @Name, @HostnamesJson, @OusJson, @IsDefault, @DisplayOrder, @UpdatedAtUtc)
            ON CONFLICT(id) DO UPDATE SET
                name = excluded.name,
                hostnames_json = excluded.hostnames_json,
                ous_json = excluded.ous_json,
                is_default = excluded.is_default,
                display_order = excluded.display_order,
                updated_at_utc = excluded.updated_at_utc;
        ";
        await db.ExecuteAsync(sql, tab);
    }

    public async Task<bool> DeleteTabAsync(string tabId)
    {
        using var db = _factory.CreateConnection();
        const string sql = "DELETE FROM custom_tabs WHERE id = @tabId AND is_default = 0;";
        int affected = await db.ExecuteAsync(sql, new { tabId });
        return affected > 0;
    }
    #endregion

    #region Station Role Aliases
    public async Task<Dictionary<string, string>> GetAllStationRoleAliasesAsync()
    {
        using var db = _factory.CreateConnection();
        const string sql = "SELECT station_id, role_alias FROM station_nodes WHERE role_alias IS NOT NULL AND role_alias != '';";
        var rows = await db.QueryAsync<(string StationId, string RoleAlias)>(sql);
        return rows.ToDictionary(r => r.StationId, r => r.RoleAlias, StringComparer.OrdinalIgnoreCase);
    }

    public async Task SetStationRoleAliasAsync(string hostname, string? roleAlias)
    {
        using var db = _factory.CreateConnection();
        const string sql = @"
            INSERT INTO station_nodes (station_id, display_name, role_alias, is_active, last_heartbeat_utc)
            VALUES (@hostname, @hostname, @roleAlias, 1, @now)
            ON CONFLICT(station_id) DO UPDATE SET
                role_alias = excluded.role_alias;
        ";
        await db.ExecuteAsync(sql, new { hostname, roleAlias, now = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds() });
    }

    public async Task BulkUpdateStationRoleAliasesAsync(IEnumerable<(string Hostname, string? RoleAlias)> mappings)
    {
        using var db = _factory.CreateConnection();
        using var tx = db.BeginTransaction();
        const string sql = @"
            INSERT INTO station_nodes (station_id, display_name, role_alias, is_active, last_heartbeat_utc)
            VALUES (@Hostname, @Hostname, @RoleAlias, 1, @now)
            ON CONFLICT(station_id) DO UPDATE SET
                role_alias = excluded.role_alias;
        ";
        var now = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
        await db.ExecuteAsync(sql, mappings.Select(m => new { m.Hostname, m.RoleAlias, now }), tx);
        tx.Commit();
    }
    #endregion

    #region Security Policy
    private sealed class SecurityPolicyEntity
    {
        public long CurrentMode { get; set; }
        public string? LdapServer { get; set; }
        public long LdapPort { get; set; }
        public string? LdapBaseDn { get; set; }
        public long UseSsl { get; set; }
        public long UpdatedAtUtc { get; set; }
    }

    public async Task<SecurityPolicyStateDto> GetSecurityPolicyAsync()
    {
        using var db = _factory.CreateConnection();
        const string sql = @"
            SELECT auth_mode AS CurrentMode, ldap_server AS LdapServer, 
                   ldap_port AS LdapPort, ldap_base_dn AS LdapBaseDn, 
                   ldap_use_ssl AS UseSsl, updated_at_utc AS UpdatedAtUtc
            FROM security_policies WHERE id = 'GLOBAL';
        ";

        var row = await db.QuerySingleOrDefaultAsync<SecurityPolicyEntity>(sql);
        if (row == null)
        {
            return new SecurityPolicyStateDto(AuthMode.Open, false, null, 389, null, false, 0);
        }

        bool isLdapConfigured = !string.IsNullOrWhiteSpace(row.LdapServer);
        return new SecurityPolicyStateDto(
            (AuthMode)(int)row.CurrentMode,
            isLdapConfigured,
            row.LdapServer,
            (int)row.LdapPort,
            row.LdapBaseDn,
            row.UseSsl == 1,
            row.UpdatedAtUtc
        );
    }

    public async Task SetSecurityPolicyModeAsync(AuthMode mode)
    {
        using var db = _factory.CreateConnection();
        const string sql = @"
            UPDATE security_policies 
            SET auth_mode = @mode, updated_at_utc = @now 
            WHERE id = 'GLOBAL';
        ";
        await db.ExecuteAsync(sql, new { mode = (int)mode, now = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds() });
    }

    public async Task UpdateLdapPolicySettingsAsync(string server, int port, string baseDn, bool useSsl)
    {
        using var db = _factory.CreateConnection();
        const string sql = @"
            UPDATE security_policies 
            SET ldap_server = @server, ldap_port = @port, ldap_base_dn = @baseDn, 
                ldap_use_ssl = @useSsl, updated_at_utc = @now 
            WHERE id = 'GLOBAL';
        ";
        await db.ExecuteAsync(sql, new
        {
            server,
            port,
            baseDn,
            useSsl = useSsl ? 1 : 0,
            now = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()
        });
    }
    #endregion

    #region Roles & Permissions
    private sealed class RoleEntity
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Icon { get; set; } = "Shield";
        public string Color { get; set; } = "#06B6D4";
        public long DisplayOrder { get; set; }
        public long IsBuiltIn { get; set; }
    }

    public async Task<IReadOnlyList<RoleDto>> GetAllRolesAsync()
    {
        using var db = _factory.CreateConnection();
        const string rolesSql = @"
            SELECT id AS Id, name AS Name, description AS Description, 
                   icon AS Icon, color AS Color, display_order AS DisplayOrder, 
                   is_built_in AS IsBuiltIn
            FROM roles ORDER BY display_order ASC;
        ";
        const string permsSql = "SELECT role_id AS RoleId, permission_key AS PermissionKey FROM role_permissions;";

        var roles = (await db.QueryAsync<RoleEntity>(rolesSql)).ToList();
        var perms = await db.QueryAsync<(string RoleId, string PermissionKey)>(permsSql);

        var permsLookup = perms.GroupBy(p => p.RoleId)
                               .ToDictionary(g => g.Key, g => g.Select(x => x.PermissionKey).ToList());

        return roles.Select(r => new RoleDto(
            Id: r.Id,
            Name: r.Name,
            Description: r.Description,
            Icon: r.Icon,
            Color: r.Color,
            DisplayOrder: (int)r.DisplayOrder,
            IsBuiltIn: r.IsBuiltIn == 1,
            Permissions: permsLookup.TryGetValue(r.Id, out var pList) ? pList : new List<string>()
        )).ToList();
    }

    public async Task<RoleDto?> GetRoleByIdAsync(string roleId)
    {
        var all = await GetAllRolesAsync();
        return all.FirstOrDefault(r => string.Equals(r.Id, roleId, StringComparison.OrdinalIgnoreCase));
    }

    public async Task UpsertRoleAsync(RoleDto role)
    {
        using var db = _factory.CreateConnection();
        using var tx = db.BeginTransaction();

        const string upsertRoleSql = @"
            INSERT INTO roles (id, name, description, icon, color, display_order, is_built_in, updated_at_utc)
            VALUES (@Id, @Name, @Description, @Icon, @Color, @DisplayOrder, @IsBuiltIn, @now)
            ON CONFLICT(id) DO UPDATE SET
                name = excluded.name,
                description = excluded.description,
                icon = excluded.icon,
                color = excluded.color,
                display_order = excluded.display_order,
                updated_at_utc = excluded.updated_at_utc;
        ";

        var now = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
        await db.ExecuteAsync(upsertRoleSql, new
        {
            role.Id,
            role.Name,
            role.Description,
            role.Icon,
            role.Color,
            role.DisplayOrder,
            IsBuiltIn = role.IsBuiltIn ? 1 : 0,
            now
        }, tx);

        await db.ExecuteAsync("DELETE FROM role_permissions WHERE role_id = @roleId;", new { roleId = role.Id }, tx);
        if (role.Permissions.Any())
        {
            const string insertPermSql = "INSERT INTO role_permissions (role_id, permission_key) VALUES (@RoleId, @Perm);";
            await db.ExecuteAsync(insertPermSql, role.Permissions.Select(p => new { RoleId = role.Id, Perm = p }), tx);
        }

        tx.Commit();
    }

    public async Task<bool> DeleteRoleAsync(string roleId)
    {
        using var db = _factory.CreateConnection();
        const string sql = "DELETE FROM roles WHERE id = @roleId AND is_built_in = 0;";
        int affected = await db.ExecuteAsync(sql, new { roleId });
        return affected > 0;
    }
    #endregion

    #region Users
    private sealed class UserEntity
    {
        public string Id { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public string DisplayName { get; set; } = string.Empty;
        public string AuthSource { get; set; } = "Local";
        public long IsActive { get; set; }
        public long IsSystemImmutable { get; set; }
        public long CreatedAtUtc { get; set; }
        public long? LastLoginUtc { get; set; }
    }

    public async Task<IReadOnlyList<UserDto>> GetAllUsersAsync()
    {
        using var db = _factory.CreateConnection();
        const string usersSql = @"
            SELECT id AS Id, username AS Username, display_name AS DisplayName, 
                   auth_source AS AuthSource, is_active AS IsActive, 
                   is_system_immutable AS IsSystemImmutable, created_at_utc AS CreatedAtUtc, 
                   last_login_utc AS LastLoginUtc
            FROM users 
            WHERE is_system_immutable = 0
            ORDER BY username ASC;
        ";

        var users = (await db.QueryAsync<UserEntity>(usersSql)).ToList();

        var userRoles = (await db.QueryAsync<(string UserId, string RoleId)>("SELECT user_id, role_id FROM user_roles;")).ToList();
        var overrides = (await db.QueryAsync<(string UserId, string Perm, long Granted)>("SELECT user_id, permission_key, is_granted FROM user_permission_overrides;")).ToList();

        var rolesGroup = userRoles.GroupBy(ur => ur.UserId).ToDictionary(g => g.Key, g => g.Select(x => x.RoleId).ToList());
        var grantsGroup = overrides.Where(o => o.Granted == 1).GroupBy(o => o.UserId).ToDictionary(g => g.Key, g => g.Select(x => x.Perm).ToList());
        var revokesGroup = overrides.Where(o => o.Granted == 0).GroupBy(o => o.UserId).ToDictionary(g => g.Key, g => g.Select(x => x.Perm).ToList());

        return users.Select(u => new UserDto(
            Id: u.Id,
            Username: u.Username,
            DisplayName: u.DisplayName,
            AuthSource: u.AuthSource,
            IsActive: u.IsActive == 1,
            IsSystemImmutable: u.IsSystemImmutable == 1,
            CreatedAtUtc: u.CreatedAtUtc,
            LastLoginUtc: u.LastLoginUtc,
            AssignedRoleIds: rolesGroup.TryGetValue(u.Id, out var rList) ? rList : new List<string>(),
            PermissionOverridesGranted: grantsGroup.TryGetValue(u.Id, out var gList) ? gList : new List<string>(),
            PermissionOverridesRevoked: revokesGroup.TryGetValue(u.Id, out var vList) ? vList : new List<string>()
        )).ToList();
    }

    public async Task<UserDto?> GetUserByUsernameAsync(string username)
    {
        using var db = _factory.CreateConnection();
        const string userSql = @"
            SELECT id AS Id, username AS Username, display_name AS DisplayName, 
                   auth_source AS AuthSource, is_active AS IsActive, 
                   is_system_immutable AS IsSystemImmutable, created_at_utc AS CreatedAtUtc, 
                   last_login_utc AS LastLoginUtc
            FROM users WHERE username = @username COLLATE NOCASE;
        ";
        var u = await db.QuerySingleOrDefaultAsync<UserEntity>(userSql, new { username });
        if (u == null) return null;

        string userId = u.Id;
        var roleIds = (await db.QueryAsync<string>("SELECT role_id FROM user_roles WHERE user_id = @userId;", new { userId })).ToList();
        var overrides = (await db.QueryAsync<(string Perm, long Granted)>("SELECT permission_key, is_granted FROM user_permission_overrides WHERE user_id = @userId;", new { userId })).ToList();

        return new UserDto(
            Id: userId,
            Username: u.Username,
            DisplayName: u.DisplayName,
            AuthSource: u.AuthSource,
            IsActive: u.IsActive == 1,
            IsSystemImmutable: u.IsSystemImmutable == 1,
            CreatedAtUtc: u.CreatedAtUtc,
            LastLoginUtc: u.LastLoginUtc,
            AssignedRoleIds: roleIds,
            PermissionOverridesGranted: overrides.Where(o => o.Granted == 1).Select(o => o.Perm).ToList(),
            PermissionOverridesRevoked: overrides.Where(o => o.Granted == 0).Select(o => o.Perm).ToList()
        );
    }

    public async Task<UserDto?> GetUserByIdAsync(string userId)
    {
        using var db = _factory.CreateConnection();
        const string userSql = @"
            SELECT id AS Id, username AS Username, display_name AS DisplayName, 
                   auth_source AS AuthSource, is_active AS IsActive, 
                   is_system_immutable AS IsSystemImmutable, created_at_utc AS CreatedAtUtc, 
                   last_login_utc AS LastLoginUtc
            FROM users WHERE id = @userId;
        ";
        var u = await db.QuerySingleOrDefaultAsync<UserEntity>(userSql, new { userId });
        if (u == null) return null;

        var roleIds = (await db.QueryAsync<string>("SELECT role_id FROM user_roles WHERE user_id = @userId;", new { userId })).ToList();
        var overrides = (await db.QueryAsync<(string Perm, long Granted)>("SELECT permission_key, is_granted FROM user_permission_overrides WHERE user_id = @userId;", new { userId })).ToList();

        return new UserDto(
            Id: userId,
            Username: u.Username,
            DisplayName: u.DisplayName,
            AuthSource: u.AuthSource,
            IsActive: u.IsActive == 1,
            IsSystemImmutable: u.IsSystemImmutable == 1,
            CreatedAtUtc: u.CreatedAtUtc,
            LastLoginUtc: u.LastLoginUtc,
            AssignedRoleIds: roleIds,
            PermissionOverridesGranted: overrides.Where(o => o.Granted == 1).Select(o => o.Perm).ToList(),
            PermissionOverridesRevoked: overrides.Where(o => o.Granted == 0).Select(o => o.Perm).ToList()
        );
    }

    public async Task<string> CreateUserAsync(string username, string displayName, string passwordHash, string authSource, IEnumerable<string> roleIds)
    {
        using var db = _factory.CreateConnection();
        using var tx = db.BeginTransaction();

        string userId = $"usr_{Guid.NewGuid():N}";
        long now = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();

        const string sql = @"
            INSERT INTO users (id, username, display_name, password_hash, auth_source, is_active, is_system_immutable, created_at_utc, updated_at_utc)
            VALUES (@userId, @username, @displayName, @passwordHash, @authSource, 1, 0, @now, @now);
        ";

        await db.ExecuteAsync(sql, new { userId, username, displayName, passwordHash, authSource, now }, tx);

        if (roleIds != null && roleIds.Any())
        {
            const string roleSql = "INSERT INTO user_roles (user_id, role_id) VALUES (@userId, @roleId);";
            await db.ExecuteAsync(roleSql, roleIds.Select(r => new { userId, roleId = r }), tx);
        }

        tx.Commit();
        return userId;
    }

    public async Task UpdateUserPasswordAsync(string userId, string newPasswordHash)
    {
        using var db = _factory.CreateConnection();
        const string sql = @"
            UPDATE users 
            SET password_hash = @newPasswordHash, updated_at_utc = @now 
            WHERE id = @userId AND is_system_immutable = 0;
        ";
        await db.ExecuteAsync(sql, new { userId, newPasswordHash, now = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds() });
    }

    public async Task UpdateUserRolesAndOverridesAsync(string userId, IEnumerable<string> roleIds, IEnumerable<string> grantedOverrides, IEnumerable<string> revokedOverrides)
    {
        using var db = _factory.CreateConnection();
        using var tx = db.BeginTransaction();

        var isImmutable = await db.ExecuteScalarAsync<long>("SELECT is_system_immutable FROM users WHERE id = @userId;", new { userId }, tx);
        if (isImmutable == 1)
        {
            throw new InvalidOperationException("Cannot alter roles or overrides for the system root user.");
        }

        await db.ExecuteAsync("DELETE FROM user_roles WHERE user_id = @userId;", new { userId }, tx);
        if (roleIds != null && roleIds.Any())
        {
            const string rSql = "INSERT INTO user_roles (user_id, role_id) VALUES (@userId, @roleId);";
            await db.ExecuteAsync(rSql, roleIds.Select(r => new { userId, roleId = r }), tx);
        }

        await db.ExecuteAsync("DELETE FROM user_permission_overrides WHERE user_id = @userId;", new { userId }, tx);
        if (grantedOverrides != null && grantedOverrides.Any())
        {
            const string gSql = "INSERT INTO user_permission_overrides (user_id, permission_key, is_granted) VALUES (@userId, @perm, 1);";
            await db.ExecuteAsync(gSql, grantedOverrides.Select(p => new { userId, perm = p }), tx);
        }
        if (revokedOverrides != null && revokedOverrides.Any())
        {
            const string vSql = "INSERT INTO user_permission_overrides (user_id, permission_key, is_granted) VALUES (@userId, @perm, 0);";
            await db.ExecuteAsync(vSql, revokedOverrides.Select(p => new { userId, perm = p }), tx);
        }

        tx.Commit();
    }

    public async Task UpdateUserLastLoginAsync(string userId, long loginEpochMs)
    {
        using var db = _factory.CreateConnection();
        const string sql = "UPDATE users SET last_login_utc = @loginEpochMs WHERE id = @userId;";
        await db.ExecuteAsync(sql, new { userId, loginEpochMs });
    }

    public async Task<bool> DeleteUserAsync(string userId)
    {
        using var db = _factory.CreateConnection();
        const string sql = "DELETE FROM users WHERE id = @userId AND is_system_immutable = 0;";
        int affected = await db.ExecuteAsync(sql, new { userId });
        return affected > 0;
    }
    #endregion

    #region LDAP Group Mappings
    public async Task<IReadOnlyList<LdapGroupMappingDto>> GetAllLdapGroupMappingsAsync()
    {
        using var db = _factory.CreateConnection();
        const string sql = @"
            SELECT id AS Id, ad_group_name AS AdGroupName, role_id AS RoleId, updated_at_utc AS UpdatedAtUtc
            FROM ldap_group_mappings ORDER BY ad_group_name ASC;
        ";
        var rows = await db.QueryAsync<LdapGroupMappingDto>(sql);
        return rows.AsList();
    }

    public async Task UpsertLdapGroupMappingAsync(string adGroupName, string roleId)
    {
        using var db = _factory.CreateConnection();
        const string sql = @"
            INSERT INTO ldap_group_mappings (id, ad_group_name, role_id, updated_at_utc)
            VALUES (@id, @adGroupName, @roleId, @now)
            ON CONFLICT(ad_group_name) DO UPDATE SET
                role_id = excluded.role_id,
                updated_at_utc = excluded.updated_at_utc;
        ";
        string id = $"map_{Guid.NewGuid():N}";
        long now = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
        await db.ExecuteAsync(sql, new { id, adGroupName, roleId, now });
    }

    public async Task<bool> DeleteLdapGroupMappingAsync(string mappingId)
    {
        using var db = _factory.CreateConnection();
        const string sql = "DELETE FROM ldap_group_mappings WHERE id = @mappingId;";
        int affected = await db.ExecuteAsync(sql, new { mappingId });
        return affected > 0;
    }
    #endregion

    #region Direct Superuser Recovery
    public async Task<bool> ResetRootPasswordDirectAsync(string newPasswordHash)
    {
        using var db = _factory.CreateConnection();
        const string sql = @"
            UPDATE users 
            SET password_hash = @newPasswordHash, updated_at_utc = @now 
            WHERE is_system_immutable = 1;
        ";
        long now = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
        int affected = await db.ExecuteAsync(sql, new { newPasswordHash, now });
        return affected > 0;
    }
    #endregion
}