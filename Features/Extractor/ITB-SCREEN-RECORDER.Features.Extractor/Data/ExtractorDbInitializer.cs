namespace ITB_SCREEN_RECORDER.Features.Extractor.Data;

using System;
using Dapper;
using ITB_SCREEN_RECORDER.Core.Abstractions;
using ITB_SCREEN_RECORDER.Core.Data;

public sealed class ExtractorDbInitializer : IFeatureDbInitializer
{
    private readonly IExtractorConnectionFactory _factory;

    public string FeatureName => "Features.Extractor";
    public int ExecutionOrder => 10;

    public ExtractorDbInitializer(IExtractorConnectionFactory factory)
    {
        _factory = factory;
    }

    public void Initialize()
    {
        try
        {
            using var db = _factory.CreateConnection();

            // הפעלת WAL Mode למניעת נעילות בעת אריזת TAR וייצוא
            db.Execute(@"
                PRAGMA journal_mode = WAL;
                PRAGMA synchronous = NORMAL;
                PRAGMA temp_store = MEMORY;
            ");

            // 1. יצירת טבלאות במידה ואינן קיימות
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

            // 2. מיגרציה רציפה - וידוא קיום עמודות שנוספו עם הזמן עבור מסדים קיימים
            db.EnsureColumn("export_jobs", "NetworkFolderPath", "TEXT NOT NULL DEFAULT ''");
            db.EnsureColumn("export_jobs", "DownloadCount", "INTEGER NOT NULL DEFAULT 0");
            db.EnsureColumn("export_jobs", "IsBookmarked", "INTEGER NOT NULL DEFAULT 0");
            db.EnsureColumn("export_jobs", "FileSizeBytes", "INTEGER NOT NULL DEFAULT 0");
            db.EnsureColumn("export_jobs", "SpeedMBps", "REAL NOT NULL DEFAULT 0");
            db.EnsureColumn("export_jobs", "EtaSeconds", "INTEGER NOT NULL DEFAULT 0");
            db.EnsureColumn("export_jobs", "ErrorMessage", "TEXT");
            db.EnsureColumn("export_jobs", "OutputFilePath", "TEXT");
            db.EnsureColumn("export_jobs", "CompletedAtUtc", "TEXT");

            // 3. אינדקסים
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