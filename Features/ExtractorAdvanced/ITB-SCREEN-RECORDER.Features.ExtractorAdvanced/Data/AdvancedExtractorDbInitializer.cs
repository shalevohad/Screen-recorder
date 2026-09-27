namespace ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Data;

using System;
using System.Collections.Generic;
using Dapper;
using ITB_SCREEN_RECORDER.Core.Abstractions;
using ITB_SCREEN_RECORDER.Core.Data;

public sealed class AdvancedExtractorDbInitializer : IFeatureDbInitializer
{
    private readonly IAdvancedExtractorConnectionFactory _factory;

    public string FeatureName => "Features.ExtractorAdvanced";
    public int ExecutionOrder => 20;

    public AdvancedExtractorDbInitializer(IAdvancedExtractorConnectionFactory factory)
    {
        _factory = factory;
    }

    public void Initialize()
    {
        try
        {
            // רישום ממיר גנרי עבור שדה ה-StationIds
            SqlMapper.AddTypeHandler(new JsonTypeHandler<List<string>>());

            using var db = _factory.CreateConnection();
            db.Execute(@"
                -- 1. טבלת משימות עריכה מתקדמות
                CREATE TABLE IF NOT EXISTS advance_jobs (
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
                    IsBookmarked INTEGER NOT NULL DEFAULT 0,
                    StationIds TEXT NOT NULL DEFAULT '[]',
                    InEpochMs INTEGER NOT NULL DEFAULT 0,
                    OutEpochMs INTEGER NOT NULL DEFAULT 0,
                    CutMode TEXT NOT NULL DEFAULT 'SynchronizedMultiTrack',
                    EstimatedSecondsRemaining REAL NOT NULL DEFAULT 0
                );

                CREATE INDEX IF NOT EXISTS idx_advance_jobs_created 
                ON advance_jobs (CreatedAtUtc DESC);

                CREATE INDEX IF NOT EXISTS idx_advance_jobs_status 
                ON advance_jobs (Status);

                -- 2. טבלת סימניות להגנת מחיקה (Retention Shield)
                CREATE TABLE IF NOT EXISTS bookmarks (
                    Id TEXT PRIMARY KEY,
                    StationId TEXT NOT NULL,
                    Title TEXT NOT NULL,
                    Description TEXT,
                    StartUtc TEXT NOT NULL,
                    EndUtc TEXT NOT NULL,
                    Tags TEXT,
                    CreatedBy TEXT,
                    CreatedAtUtc TEXT NOT NULL
                );

                CREATE INDEX IF NOT EXISTS idx_bookmarks_station_range 
                ON bookmarks (StationId, StartUtc, EndUtc);

                -- 3. טבלת טיוטות עריכת ציר זמן
                CREATE TABLE IF NOT EXISTS editing_drafts (
                    DraftId TEXT PRIMARY KEY,
                    Title TEXT NOT NULL,
                    StateJson TEXT NOT NULL DEFAULT '{}',
                    CreatedAtUtc TEXT NOT NULL,
                    UpdatedAtUtc TEXT NOT NULL
                );

                CREATE INDEX IF NOT EXISTS idx_drafts_updated 
                ON editing_drafts (UpdatedAtUtc DESC);
            ");
        }
        catch (Exception ex)
        {
            var root = ex;
            while (root.InnerException != null)
            {
                root = root.InnerException;
            }
            throw new InvalidOperationException($"[{FeatureName}] Database init failure: {root.Message}", ex);
        }
    }
}