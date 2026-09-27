namespace ITB_SCREEN_RECORDER.Features.Extractor.Data;

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
        using var db = _factory.CreateConnection();
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

            CREATE INDEX IF NOT EXISTS idx_export_jobs_created 
            ON export_jobs (CreatedAtUtc DESC);

            CREATE INDEX IF NOT EXISTS idx_export_jobs_status 
            ON export_jobs (Status);
        ");
    }
}