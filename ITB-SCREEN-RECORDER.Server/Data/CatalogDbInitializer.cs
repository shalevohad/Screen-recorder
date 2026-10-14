namespace ITB_SCREEN_RECORDER.Server.Data;

using System;
using System.Collections.Generic;
using Dapper;
using ITB_SCREEN_RECORDER.Core.Abstractions;
using ITB_SCREEN_RECORDER.Server.Services.Security;
using ITB_SCREEN_RECORDER.Server.Models.Security;

public sealed class CatalogDbInitializer : IFeatureDbInitializer
{
    private readonly ICatalogConnectionFactory _factory;

    public string FeatureName => "Server.SystemCatalog";
    public int ExecutionOrder => 0;

    private const string RootUserId = "usr_sys_root";
    private const string RootUsername = "sys_master";

    public CatalogDbInitializer(ICatalogConnectionFactory factory)
    {
        _factory = factory;
    }

    public void Initialize()
    {
        try
        {
            using var db = _factory.CreateConnection();

            db.Execute(@"
                PRAGMA journal_mode = WAL;
                PRAGMA synchronous = NORMAL;
                PRAGMA temp_store = MEMORY;
                PRAGMA mmap_size = 268435456;
            ");

            db.Execute(@"
                CREATE TABLE IF NOT EXISTS station_nodes (
                    station_id TEXT PRIMARY KEY,
                    display_name TEXT NOT NULL,
                    ip_address TEXT,
                    agent_version TEXT,
                    role_alias TEXT,
                    is_active INTEGER NOT NULL DEFAULT 1,
                    last_heartbeat_utc INTEGER NOT NULL
                );

                CREATE TABLE IF NOT EXISTS recording_chunks (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    station_id TEXT NOT NULL,
                    file_path TEXT NOT NULL UNIQUE,
                    start_epoch_ms INTEGER NOT NULL,
                    end_epoch_ms INTEGER NOT NULL,
                    duration_ms INTEGER NOT NULL DEFAULT 0,
                    file_size_bytes INTEGER NOT NULL DEFAULT 0,
                    width INTEGER NOT NULL DEFAULT 0,
                    height INTEGER NOT NULL DEFAULT 0,
                    fps INTEGER NOT NULL DEFAULT 0,
                    has_audio INTEGER NOT NULL DEFAULT 0,
                    is_finalized INTEGER NOT NULL DEFAULT 0,
                    indexed_at_utc INTEGER NOT NULL
                );

                CREATE TABLE IF NOT EXISTS keystroke_events (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    station_id TEXT NOT NULL,
                    epoch_ms INTEGER NOT NULL,
                    key_combination TEXT NOT NULL,
                    timestamp_utc TEXT NOT NULL
                );

                CREATE TABLE IF NOT EXISTS custom_tabs (
                    id TEXT PRIMARY KEY,
                    name TEXT NOT NULL,
                    hostnames_json TEXT NOT NULL DEFAULT '[]',
                    ous_json TEXT NOT NULL DEFAULT '[]',
                    is_default INTEGER NOT NULL DEFAULT 0,
                    display_order INTEGER NOT NULL DEFAULT 0,
                    updated_at_utc INTEGER NOT NULL
                );

                CREATE TABLE IF NOT EXISTS station_overrides (
                    hostname TEXT PRIMARY KEY,
                    video_bitrate TEXT,
                    target_fps INTEGER,
                    updated_at_utc INTEGER NOT NULL
                );

                CREATE TABLE IF NOT EXISTS system_configurations (
                    config_key TEXT PRIMARY KEY,
                    config_value TEXT NOT NULL,
                    updated_at_utc INTEGER NOT NULL
                );

                CREATE TABLE IF NOT EXISTS roles (
                    id TEXT PRIMARY KEY,
                    name TEXT NOT NULL UNIQUE,
                    description TEXT NOT NULL DEFAULT '',
                    icon TEXT NOT NULL DEFAULT 'Shield',
                    color TEXT NOT NULL DEFAULT '#06B6D4',
                    display_order INTEGER NOT NULL DEFAULT 0,
                    is_built_in INTEGER NOT NULL DEFAULT 0,
                    updated_at_utc INTEGER NOT NULL
                );

                CREATE TABLE IF NOT EXISTS role_permissions (
                    role_id TEXT NOT NULL,
                    permission_key TEXT NOT NULL,
                    PRIMARY KEY (role_id, permission_key),
                    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
                );

                CREATE TABLE IF NOT EXISTS users (
                    id TEXT PRIMARY KEY,
                    username TEXT NOT NULL UNIQUE,
                    display_name TEXT NOT NULL,
                    password_hash TEXT,
                    auth_source TEXT NOT NULL DEFAULT 'Local',
                    is_active INTEGER NOT NULL DEFAULT 1,
                    is_system_immutable INTEGER NOT NULL DEFAULT 0,
                    created_at_utc INTEGER NOT NULL,
                    last_login_utc INTEGER,
                    updated_at_utc INTEGER NOT NULL
                );

                CREATE TABLE IF NOT EXISTS user_roles (
                    user_id TEXT NOT NULL,
                    role_id TEXT NOT NULL,
                    PRIMARY KEY (user_id, role_id),
                    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
                );

                CREATE TABLE IF NOT EXISTS user_permission_overrides (
                    user_id TEXT NOT NULL,
                    permission_key TEXT NOT NULL,
                    is_granted INTEGER NOT NULL,
                    PRIMARY KEY (user_id, permission_key),
                    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
                );

                CREATE TABLE IF NOT EXISTS ldap_group_mappings (
                    id TEXT PRIMARY KEY,
                    ad_group_name TEXT NOT NULL UNIQUE,
                    role_id TEXT NOT NULL,
                    updated_at_utc INTEGER NOT NULL,
                    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
                );

                CREATE TABLE IF NOT EXISTS security_policies (
                    id TEXT PRIMARY KEY,
                    auth_mode INTEGER NOT NULL DEFAULT 0,
                    ldap_server TEXT,
                    ldap_port INTEGER NOT NULL DEFAULT 389,
                    ldap_base_dn TEXT,
                    ldap_use_ssl INTEGER NOT NULL DEFAULT 0,
                    recovery_key_hash TEXT,
                    updated_at_utc INTEGER NOT NULL
                );
            ");

            db.EnsureColumn("station_nodes", "role_alias", "TEXT");
            db.EnsureColumn("station_nodes", "ip_address", "TEXT");
            db.EnsureColumn("station_nodes", "agent_version", "TEXT");
            db.EnsureColumn("station_nodes", "is_active", "INTEGER NOT NULL DEFAULT 1");
            db.EnsureColumn("station_nodes", "last_heartbeat_utc", "INTEGER NOT NULL DEFAULT 0");

            db.EnsureColumn("custom_tabs", "ous_json", "TEXT NOT NULL DEFAULT '[]'");
            db.EnsureColumn("custom_tabs", "target_fps", "INTEGER");
            db.EnsureColumn("custom_tabs", "target_bitrate_kbps", "INTEGER");
            db.EnsureColumn("custom_tabs", "is_default", "INTEGER NOT NULL DEFAULT 0");
            db.EnsureColumn("custom_tabs", "display_order", "INTEGER NOT NULL DEFAULT 0");
            db.EnsureColumn("custom_tabs", "updated_at_utc", "INTEGER NOT NULL DEFAULT 0");

            db.EnsureColumn("recording_chunks", "duration_ms", "INTEGER NOT NULL DEFAULT 0");
            db.EnsureColumn("recording_chunks", "width", "INTEGER NOT NULL DEFAULT 0");
            db.EnsureColumn("recording_chunks", "height", "INTEGER NOT NULL DEFAULT 0");
            db.EnsureColumn("recording_chunks", "fps", "INTEGER NOT NULL DEFAULT 0");
            db.EnsureColumn("recording_chunks", "has_audio", "INTEGER NOT NULL DEFAULT 0");
            db.EnsureColumn("recording_chunks", "is_finalized", "INTEGER NOT NULL DEFAULT 0");
            db.EnsureColumn("recording_chunks", "indexed_at_utc", "INTEGER NOT NULL DEFAULT 0");

            db.Execute(@"
                CREATE INDEX IF NOT EXISTS idx_chunks_station_window_covering 
                ON recording_chunks (station_id, start_epoch_ms, end_epoch_ms, is_finalized, file_path, file_size_bytes, fps, width, height, has_audio);

                CREATE INDEX IF NOT EXISTS idx_keystrokes_station_epoch
                ON keystroke_events (station_id, epoch_ms ASC);

                CREATE INDEX IF NOT EXISTS idx_chunks_retention_lookup
                ON recording_chunks (end_epoch_ms, is_finalized);

                CREATE INDEX IF NOT EXISTS idx_custom_tabs_order 
                ON custom_tabs (display_order ASC);

                CREATE INDEX IF NOT EXISTS idx_roles_display_order
                ON roles (display_order ASC);

                CREATE INDEX IF NOT EXISTS idx_users_username
                ON users (username ASC);

                CREATE INDEX IF NOT EXISTS idx_station_nodes_role_alias
                ON station_nodes (role_alias);
            ");

            SeedSecurityDefaults(db);
        }
        catch (Exception ex)
        {
            var root = ex;
            while (root.InnerException != null) root = root.InnerException;
            throw new InvalidOperationException($"[SystemCatalog] Database init/migration failure: {root.Message}", ex);
        }
    }

    private static void SeedSecurityDefaults(System.Data.IDbConnection db)
    {
        long now = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();

        db.Execute(@"
            INSERT INTO security_policies (id, auth_mode, ldap_server, ldap_port, ldap_base_dn, ldap_use_ssl, updated_at_utc)
            VALUES ('GLOBAL', 0, NULL, 389, NULL, 0, @now)
            ON CONFLICT(id) DO NOTHING;
        ", new { now });

        var defaultRoles = new[]
        {
            new { Id = "role_admin", Name = "מנהל מערכת", Desc = "ניהול מלא של המערכת, עמדות, משתמשים והגדרות אחסון", Icon = "ShieldCheck", Color = "#06B6D4", Order = 1 },
            new { Id = "role_operator", Name = "מפעיל חמ\"ל", Desc = "שליטה מלאה בשידור, ניהול טאבים וחילוצי וידאו", Icon = "Activity", Color = "#10B981", Order = 2 },
            new { Id = "role_investigator", Name = "חוקר תחקירים", Desc = "גישה לתחקור ציר זמן, סטודיו עריכה וייצוא קטעים", Icon = "Search", Color = "#F59E0B", Order = 3 },
            new { Id = "role_viewer", Name = "צופה", Desc = "צפייה בלבד בשידור חי וטלמטריה ללא יכולת שליטה", Icon = "Eye", Color = "#64748B", Order = 4 }
        };

        foreach (var r in defaultRoles)
        {
            db.Execute(@"
                INSERT INTO roles (id, name, description, icon, color, display_order, is_built_in, updated_at_utc)
                VALUES (@Id, @Name, @Desc, @Icon, @Color, @Order, 1, @now)
                ON CONFLICT(id) DO NOTHING;
            ", new { r.Id, r.Name, r.Desc, r.Icon, r.Color, r.Order, now });
        }

        var rolePermissionsMap = new Dictionary<string, string[]>
        {
            ["role_admin"] = (string[])PermissionKeys.All,
            ["role_operator"] = new[]
            {
                PermissionKeys.StationsView,
                PermissionKeys.StationsControl,
                PermissionKeys.StationsManage,
                PermissionKeys.PlaybackView,
                PermissionKeys.PlaybackExport,
                PermissionKeys.BookmarksManage,
                PermissionKeys.ExtractorView
            },
            ["role_investigator"] = new[]
            {
                PermissionKeys.StationsView,
                PermissionKeys.PlaybackView,
                PermissionKeys.PlaybackExport,
                PermissionKeys.BookmarksManage,
                PermissionKeys.ExtractorView,
                PermissionKeys.StudioView
            },
            ["role_viewer"] = new[]
            {
                PermissionKeys.StationsView
            }
        };

        foreach (var (roleId, permissions) in rolePermissionsMap)
        {
            foreach (var perm in permissions)
            {
                db.Execute(@"
                    INSERT INTO role_permissions (role_id, permission_key)
                    VALUES (@roleId, @perm)
                    ON CONFLICT(role_id, permission_key) DO NOTHING;
                ", new { roleId, perm });
            }
        }

        // גיבוב PBKDF2 תקני עבור SysMaster2026!
        string initialPasswordHash = PasswordHasher.Hash("SysMaster2026!");

        db.Execute(@"
            INSERT INTO users (id, username, display_name, password_hash, auth_source, is_active, is_system_immutable, created_at_utc, updated_at_utc)
            VALUES (@RootUserId, @RootUsername, 'System Root', @initialPasswordHash, 'Local', 1, 1, @now, @now)
            ON CONFLICT(id) DO UPDATE SET 
                is_system_immutable = 1,
                password_hash = CASE 
                    WHEN users.password_hash LIKE '100000.%' THEN users.password_hash 
                    ELSE @initialPasswordHash 
                END;
        ", new { RootUserId, RootUsername, initialPasswordHash, now });

        db.Execute(@"
            INSERT INTO user_roles (user_id, role_id)
            VALUES (@RootUserId, 'role_admin')
            ON CONFLICT(user_id, role_id) DO NOTHING;
        ", new { RootUserId });
    }
}