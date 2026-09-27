namespace ITB_SCREEN_RECORDER.Server.Data;

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
        using var db = _factory.CreateConnection();
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
                file_size_bytes INTEGER NOT NULL DEFAULT 0,
                is_finalized INTEGER NOT NULL DEFAULT 0,
                indexed_at_utc INTEGER NOT NULL
            );

            CREATE INDEX IF NOT EXISTS idx_chunks_station_window 
            ON recording_chunks (station_id, start_epoch_ms, end_epoch_ms);

            CREATE INDEX IF NOT EXISTS idx_chunks_retention_lookup
            ON recording_chunks (end_epoch_ms, is_finalized);
        ");
    }
}