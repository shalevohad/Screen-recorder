namespace ITB_SCREEN_RECORDER.Features.Extractor.Data;

using System;
using Dapper;
using ITB_SCREEN_RECORDER.Core.Abstractions;
using ITB_SCREEN_RECORDER.Core.Data;

/// <summary>
/// Initializes and migrates the SQLite database schema for the Extractor feature.
/// </summary>
public sealed class ExtractorDbInitializer : IFeatureDbInitializer
{
    private readonly IExtractorConnectionFactory _factory;

    public string FeatureName => "Features.Extractor";
    public int ExecutionOrder => 10;

    /// <summary>
    /// Initializes a new instance of the <see cref="ExtractorDbInitializer"/> class.
    /// </summary>
    /// <param name="factory">SQLite connection factory for the Extractor database.</param>
    public ExtractorDbInitializer(IExtractorConnectionFactory factory)
    {
        _factory = factory;
    }

    /// <summary>
    /// Executes SQLite PRAGMA tuning, schema table creation, column backfilling, and index configuration.
    /// </summary>
    public void Initialize()
    {
        try
        {
            using var db = _factory.CreateConnection();

            // Enable WAL mode and memory temp store to prevent file locking during packaging and export
            db.Execute(@"
                PRAGMA journal_mode = WAL;
                PRAGMA synchronous = NORMAL;
                PRAGMA temp_store = MEMORY;
            ");

            // 1. Create tables if they do not exist
            db.Execute(@"
                CREATE TABLE IF NOT EXISTS export_jobs (
                    JobId TEXT PRIMARY KEY,
                    FileName TEXT NOT NULL,
                    Status TEXT NOT NULL DEFAULT 'Queued',
                    ProgressPercent INTEGER NOT NULL DEFAULT 0,
                    StatusMessage TEXT NOT NULL DEFAULT '',
                    SpeedMBps REAL NOT NULL DEFAULT 0,
                    EtaSeconds INTEGER NOT NULL DEFAULT 0,
                    FileSizeBytes INTEGER NOT NULL DEFAULT 0,
                    CreatedAtUtc TEXT NOT NULL,
                    CompletedAtUtc TEXT,
                    ErrorMessage TEXT,
                    OutputFilePath TEXT,
                    NetworkFolderPath TEXT NOT NULL DEFAULT '',
                    DownloadCount INTEGER NOT NULL DEFAULT 0,
                    IsBookmarked INTEGER NOT NULL DEFAULT 0
                );
            ");

            // 2. Incremental migration - ensure newly added columns exist in existing databases
            db.EnsureColumn("export_jobs", "NetworkFolderPath", "TEXT NOT NULL DEFAULT ''");
            db.EnsureColumn("export_jobs", "DownloadCount", "INTEGER NOT NULL DEFAULT 0");
            db.EnsureColumn("export_jobs", "IsBookmarked", "INTEGER NOT NULL DEFAULT 0");
            db.EnsureColumn("export_jobs", "FileSizeBytes", "INTEGER NOT NULL DEFAULT 0");
            db.EnsureColumn("export_jobs", "SpeedMBps", "REAL NOT NULL DEFAULT 0");
            db.EnsureColumn("export_jobs", "EtaSeconds", "INTEGER NOT NULL DEFAULT 0");
            db.EnsureColumn("export_jobs", "ErrorMessage", "TEXT");
            db.EnsureColumn("export_jobs", "OutputFilePath", "TEXT");
            db.EnsureColumn("export_jobs", "CompletedAtUtc", "TEXT");

            // 3. Database indexes
            db.Execute(@"
                CREATE INDEX IF NOT EXISTS idx_export_jobs_created 
                ON export_jobs (CreatedAtUtc DESC);

                CREATE INDEX IF NOT EXISTS idx_export_jobs_status 
                ON export_jobs (Status);
            ");
        }
        catch (Exception ex)
        {
            var root = ex;
            while (root.InnerException != null)
            {
                root = root.InnerException;
            }
            throw new InvalidOperationException($"[{FeatureName}] Database init/migration failure: {root.Message}", ex);
        }
    }
}