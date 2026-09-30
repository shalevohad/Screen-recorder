// ==========================================
// File: Features/Extractor/Services/ExportJobManager.cs
// ==========================================
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using ITB_SCREEN_RECORDER.Features.Extractor.Data.Repositories;
using ITB_SCREEN_RECORDER.Features.Extractor.Models;

namespace ITB_SCREEN_RECORDER.Features.Extractor.Services
{
    public interface IExportJobManager
    {
        ExportJobInfo EnqueueExportJob(ExtractionRequestDto request);
        ExportJobInfo? GetJob(string jobId);
        IEnumerable<ExportJobInfo> GetAllJobs();
        bool ClearCompletedJob(string jobId);
        bool DismissJob(string jobId);
        bool ToggleBookmark(string jobId);
        void RegisterDownload(string jobId);
    }

    public class ExportJobManager : IExportJobManager
    {
        protected readonly ConcurrentDictionary<string, ExportJobInfo> _jobs = new();
        protected readonly IExtractorService _extractorService;
        protected readonly IExportJobRepository _jobRepository;
        protected readonly ExtractorOptions _options;
        protected readonly ILogger<ExportJobManager> _logger;
        protected readonly string _exportDirectory;
        private readonly Timer _retentionTimer;

        public ExportJobManager(
            IExtractorService extractorService,
            IExportJobRepository jobRepository,
            IOptions<ExtractorOptions> options,
            ILogger<ExportJobManager> logger)
        {
            _extractorService = extractorService;
            _jobRepository = jobRepository;
            _options = options.Value;
            _logger = logger;

            _exportDirectory = !string.IsNullOrWhiteSpace(_options.ExportPath)
                ? _options.ExportPath
                : Path.Combine(AppContext.BaseDirectory, "Exports");

            Directory.CreateDirectory(_exportDirectory);

            // שחזור משימות מ-extractor.db בעליית השרת
            _ = RecoverJobsFromDatabaseAsync();

            // טיימר לניקוי קובצי ארכיון שחלפו 24 שעות מסיומם (מוגן מפני מחיקה אם מסומן כ-Bookmark)
            _retentionTimer = new Timer(ExecuteRetentionPurge, null, TimeSpan.FromMinutes(5), TimeSpan.FromMinutes(30));
        }

        private async Task RecoverJobsFromDatabaseAsync()
        {
            try
            {
                var dbJobs = await _jobRepository.GetAllJobsAsync();
                foreach (var job in dbJobs)
                {
                    if (job.Status == "Processing" || job.Status == "Queued")
                    {
                        job.Status = "Failed";
                        job.ErrorMessage = "Task interrupted by server restart.";
                        job.CompletedAtUtc = DateTime.UtcNow;
                        await _jobRepository.UpsertJobAsync(job);
                    }

                    _jobs[job.JobId] = job;
                }
                _logger.LogInformation("[ExportJobManager] Recovered {Count} export jobs from SQLite extractor.db", dbJobs.Count);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[ExportJobManager] Failed to restore jobs from extractor.db");
            }
        }

        public virtual ExportJobInfo EnqueueExportJob(ExtractionRequestDto request)
        {
            string hostnamesSummary = string.Join("_", request.Hostnames.Take(2));
            if (request.Hostnames.Count > 2) hostnamesSummary += $"_and_{request.Hostnames.Count - 2}_more";

            var job = new ExportJobInfo
            {
                Request = request,
                FileName = $"Investigation_{hostnamesSummary}_{request.StartTimeUtc:yyyyMMdd_HHmm}_to_{request.EndTimeUtc:yyyyMMdd_HHmm}.tar",
                NetworkFolderPath = _exportDirectory,
                Status = "Queued",
                StatusMessage = "Queued for packaging...",
                ProgressPercent = 0,
                CreatedAtUtc = DateTime.UtcNow
            };

            _jobs[job.JobId] = job;
            _ = _jobRepository.UpsertJobAsync(job);

            _ = Task.Run(() => ProcessJobAsync(job));
            return job;
        }

        public virtual ExportJobInfo? GetJob(string jobId)
        {
            _jobs.TryGetValue(jobId, out var job);
            return job;
        }

        public virtual IEnumerable<ExportJobInfo> GetAllJobs()
        {
            return _jobs.Values.OrderByDescending(j => j.CreatedAtUtc);
        }

        public virtual bool ClearCompletedJob(string jobId) => DismissJob(jobId);

        public virtual bool DismissJob(string jobId)
        {
            if (_jobs.TryRemove(jobId, out var job))
            {
                if (!string.IsNullOrWhiteSpace(job.OutputFilePath) && File.Exists(job.OutputFilePath))
                {
                    try { File.Delete(job.OutputFilePath); } catch { }
                }

                _ = _jobRepository.DeleteJobAsync(jobId);
                return true;
            }
            return false;
        }

        public virtual bool ToggleBookmark(string jobId)
        {
            if (_jobs.TryGetValue(jobId, out var job))
            {
                job.IsBookmarked = !job.IsBookmarked;
                _ = _jobRepository.UpdateBookmarkAsync(jobId, job.IsBookmarked);
                return true;
            }
            return false;
        }

        public virtual void RegisterDownload(string jobId)
        {
            if (_jobs.TryGetValue(jobId, out var job))
            {
                job.DownloadCount++;
                _ = _jobRepository.IncrementDownloadCountAsync(jobId);
            }
        }

        protected virtual async Task ProcessJobAsync(ExportJobInfo job)
        {
            if (job.Request == null) return;

            job.Status = "Processing";
            job.StatusMessage = "Estimating archive payload...";
            await _jobRepository.UpsertJobAsync(job);

            job.OutputFilePath = Path.Combine(_exportDirectory, job.FileName);

            try
            {
                var preview = await _extractorService.GetPreviewAsync(job.Request);
                long totalEstimatedBytes = preview.EstimatedTotalSizeBytes > 0
                    ? preview.EstimatedTotalSizeBytes
                    : (5L * 1024 * 1024 * 1024);

                job.FileSizeBytes = totalEstimatedBytes;
                DateTime transferStartTime = DateTime.UtcNow;
                DateTime lastDbUpdate = DateTime.UtcNow;

                await using var fileStream = new FileStream(
                    job.OutputFilePath,
                    FileMode.Create,
                    FileAccess.Write,
                    FileShare.Read,
                    bufferSize: 1048576,
                    useAsync: true);

                await using var progressStream = new ProgressReportingStream(fileStream, bytesWritten =>
                {
                    double elapsedSec = Math.Max(0.5, (DateTime.UtcNow - transferStartTime).TotalSeconds);
                    double bytesPerSec = bytesWritten / elapsedSec;
                    job.SpeedMBps = Math.Round(bytesPerSec / (1024 * 1024), 1);

                    int pct = (int)Math.Min(99, (bytesWritten * 100) / Math.Max(1, totalEstimatedBytes));
                    job.ProgressPercent = pct;

                    long remainingBytes = Math.Max(0, totalEstimatedBytes - bytesWritten);
                    job.EtaSeconds = bytesPerSec > 0 ? (int)(remainingBytes / bytesPerSec) : 0;
                    job.StatusMessage = $"Packaging: {pct}% ({(bytesWritten / (1024 * 1024)):F0}MB / {(totalEstimatedBytes / (1024 * 1024)):F0}MB) | {job.SpeedMBps:F1} MB/s";

                    if ((DateTime.UtcNow - lastDbUpdate).TotalSeconds >= 1.5)
                    {
                        lastDbUpdate = DateTime.UtcNow;
                        _ = _jobRepository.UpsertJobAsync(job);
                    }
                });

                await _extractorService.StreamTarArchiveAsync(job.Request, progressStream, CancellationToken.None);
                await fileStream.FlushAsync();

                var fi = new FileInfo(job.OutputFilePath);
                job.FileSizeBytes = fi.Exists ? fi.Length : job.FileSizeBytes;
                job.Status = "Completed";
                job.ProgressPercent = 100;
                job.EtaSeconds = 0;
                job.StatusMessage = "Archive ready for download";
                job.CompletedAtUtc = DateTime.UtcNow;

                await _jobRepository.UpsertJobAsync(job);
                _logger.LogInformation("[ExportJobManager] Job {JobId} completed: {Path} ({Size} MB)",
                    job.JobId, job.OutputFilePath, job.FileSizeBytes / (1024 * 1024));
            }
            catch (Exception ex)
            {
                job.Status = "Failed";
                job.ErrorMessage = ex.Message;
                job.StatusMessage = "Packaging failed";
                await _jobRepository.UpsertJobAsync(job);
                _logger.LogError(ex, "[ExportJobManager] Job {JobId} failed", job.JobId);
            }
        }

        private void ExecuteRetentionPurge(object? state)
        {
            var cutoff = DateTime.UtcNow.AddHours(-24);
            var expiredJobs = _jobs.Values
                .Where(j => j.IsCompleted && !j.IsBookmarked && j.CompletedAtUtc.HasValue && j.CompletedAtUtc.Value < cutoff)
                .ToList();

            foreach (var expired in expiredJobs)
            {
                _logger.LogInformation("[ExportJobManager:Retention] Auto-purging 24h expired export archive: {File}", expired.FileName);
                DismissJob(expired.JobId);
            }
        }
    }

    public class ProgressReportingStream : Stream
    {
        private readonly Stream _inner;
        private readonly Action<long> _onProgress;
        private long _totalBytesWritten;

        public ProgressReportingStream(Stream inner, Action<long> onProgress)
        {
            _inner = inner;
            _onProgress = onProgress;
        }

        public override bool CanRead => _inner.CanRead;
        public override bool CanSeek => _inner.CanSeek;
        public override bool CanWrite => _inner.CanWrite;
        public override long Length => _inner.Length;
        public override long Position { get => _inner.Position; set => _inner.Position = value; }

        public override void Flush() => _inner.Flush();
        public override Task FlushAsync(CancellationToken cancellationToken) => _inner.FlushAsync(cancellationToken);

        public override int Read(byte[] buffer, int offset, int count) => _inner.Read(buffer, offset, count);
        public override long Seek(long offset, SeekOrigin origin) => _inner.Seek(offset, origin);
        public override void SetLength(long value) => _inner.SetLength(value);

        public override void Write(byte[] buffer, int offset, int count)
        {
            _inner.Write(buffer, offset, count);
            _totalBytesWritten += count;
            _onProgress(_totalBytesWritten);
        }

        public override async ValueTask WriteAsync(ReadOnlyMemory<byte> buffer, CancellationToken cancellationToken = default)
        {
            await _inner.WriteAsync(buffer, cancellationToken);
            _totalBytesWritten += buffer.Length;
            _onProgress(_totalBytesWritten);
        }

        public override async Task WriteAsync(byte[] buffer, int offset, int count, CancellationToken cancellationToken)
        {
            await _inner.WriteAsync(buffer, offset, count, cancellationToken);
            _totalBytesWritten += count;
            _onProgress(_totalBytesWritten);
        }
    }
}