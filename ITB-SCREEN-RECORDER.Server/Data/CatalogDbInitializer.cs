namespace ITB_SCREEN_RECORDER.Server.Data;

using System;
using Dapper;
using ITB_SCREEN_RECORDER.Core.Abstractions;

public sealed class CatalogDbInitializer : IFeatureDbInitializer
{
    private readonly ICatalogConnectionFactory _factory;

    public string FeatureName => "Server.SystemCatalog";
    public int ExecutionOrder => 0;

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

            // 1. יצירת טבלאות בסיס אם אינן קיימות
            db.Execute(@"
                CREATE TABLE IF NOT EXISTS station_nodes (
                    station_id TEXT PRIMARY KEY,
                    display_name TEXT NOT NULL,
                    ip_address TEXT,
                    agent_version TEXT,
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
                    target_fps INTEGER,
                    target_bitrate_kbps INTEGER,
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
            ");

            // 2. מיגרציה רציפה של שדות שנוספו לטבלאות קיימות
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

            db.EnsureColumn("station_nodes", "ip_address", "TEXT");
            db.EnsureColumn("station_nodes", "agent_version", "TEXT");
            db.EnsureColumn("station_nodes", "is_active", "INTEGER NOT NULL DEFAULT 1");
            db.EnsureColumn("station_nodes", "last_heartbeat_utc", "INTEGER NOT NULL DEFAULT 0");

            // 3. אינדקסים
            db.Execute(@"
                CREATE INDEX IF NOT EXISTS idx_chunks_station_window_covering 
                ON recording_chunks (station_id, start_epoch_ms, end_epoch_ms, is_finalized, file_path, file_size_bytes, fps, width, height, has_audio);

                CREATE INDEX IF NOT EXISTS idx_keystrokes_station_epoch
                ON keystroke_events (station_id, epoch_ms ASC);

                CREATE INDEX IF NOT EXISTS idx_chunks_retention_lookup
                ON recording_chunks (end_epoch_ms, is_finalized);

                CREATE INDEX IF NOT EXISTS idx_custom_tabs_order 
                ON custom_tabs (display_order ASC);
            ");
        }
        catch (Exception ex)
        {
            var root = ex;
            while (root.InnerException != null) root = root.InnerException;
            throw new InvalidOperationException($"[SystemCatalog] Database init/migration failure: {root.Message}", ex);
        }
    }
}