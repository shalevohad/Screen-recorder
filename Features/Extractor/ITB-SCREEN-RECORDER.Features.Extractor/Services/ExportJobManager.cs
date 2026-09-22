// ==========================================
// File: Features/Extractor/Services/ExportJobManager.cs
// מנגנון ניהול משימות עם שרידות מלאה לאחר Restart (State Persistence)
// ==========================================
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using ITB_SCREEN_RECORDER.Features.Extractor.Models;

namespace ITB_SCREEN_RECORDER.Features.Extractor.Services
{
    public interface IExportJobManager
    {
        ExportJobInfo EnqueueExportJob(ExtractionRequestDto request);
        List<ExportJobInfo> GetAllJobs();
        ExportJobInfo? GetJob(string jobId);
        bool DismissJob(string jobId);
        bool ToggleBookmark(string jobId);
        void RegisterDownload(string jobId);
    }

    public class ExportJobManager : IExportJobManager
    {
        protected readonly ConcurrentDictionary<string, ExportJobInfo> _jobs = new();
        protected readonly IExtractorService _extractorService;
        protected readonly ExtractorOptions _options;
        protected readonly ILogger<ExportJobManager> _logger;
        protected readonly Timer _retentionTimer;
        protected readonly string _exportDirectory;
        protected readonly string _stateFilePath;
        protected readonly object _stateLock = new();

        protected static readonly TimeSpan RetentionPeriod = TimeSpan.FromHours(24);

        public ExportJobManager(
            IExtractorService extractorService,
            IOptions<ExtractorOptions> options,
            ILogger<ExportJobManager> logger)
        {
            _extractorService = extractorService;
            _options = options.Value;
            _logger = logger;

            _exportDirectory = !string.IsNullOrWhiteSpace(_options.ExportPath)
                ? _options.ExportPath
                : Path.Combine(AppContext.BaseDirectory, "Exports");

            Directory.CreateDirectory(_exportDirectory);
            _stateFilePath = Path.Combine(_exportDirectory, "jobs_state.json");

            LoadJobsFromDisk();

            _retentionTimer = new Timer(ExecuteRetentionCleanup, null, TimeSpan.FromMinutes(10), TimeSpan.FromMinutes(30));
        }

        public virtual ExportJobInfo EnqueueExportJob(ExtractionRequestDto request)
        {
            var job = CreateJobInstance(request);
            job.NetworkFolderPath = _exportDirectory;

            _jobs[job.JobId] = job;
            PersistJobsToDisk();

            _ = Task.Run(() => ProcessJobAsync(job));
            return job;
        }

        protected virtual ExportJobInfo CreateJobInstance(ExtractionRequestDto request)
        {
            string hostSummary = string.Join("_", request.Hostnames.Take(2));
            if (request.Hostnames.Count > 2)
            {
                hostSummary += $"_and_{request.Hostnames.Count - 2}_more";
            }

            return new ExportJobInfo
            {
                Request = request,
                FileName = $"Export_{hostSummary}_{request.StartTimeUtc:yyyyMMdd_HHmm}_to_{request.EndTimeUtc:yyyyMMdd_HHmm}.tar"
            };
        }

        public virtual List<ExportJobInfo> GetAllJobs() =>
            _jobs.Values.OrderByDescending(j => j.CreatedAtUtc).ToList();

        public virtual ExportJobInfo? GetJob(string jobId)
        {
            _jobs.TryGetValue(jobId, out var job);
            return job;
        }

        public virtual bool DismissJob(string jobId)
        {
            if (_jobs.TryRemove(jobId, out var job))
            {
                DeleteJobArtifacts(job);
                PersistJobsToDisk();
                return true;
            }
            return false;
        }

        public virtual bool ToggleBookmark(string jobId)
        {
            var job = GetJob(jobId);
            if (job == null) return false;

            lock (job)
            {
                job.IsBookmarked = !job.IsBookmarked;
            }
            PersistJobsToDisk();
            return true;
        }

        public virtual void RegisterDownload(string jobId)
        {
            var job = GetJob(jobId);
            if (job == null) return;

            lock (job)
            {
                job.DownloadCount++;
            }
            PersistJobsToDisk();
        }

        protected virtual async Task ProcessJobAsync(ExportJobInfo job)
        {
            job.Status = "Processing";
            job.StatusMessage = "Packaging archive...";

            string tempTarget = Path.Combine(_exportDirectory, $"{job.JobId}.tmp.tar");
            string finalTarget = Path.Combine(_exportDirectory, job.FileName);

            using var progressCts = new CancellationTokenSource();
            var progressTask = MonitorPackagingProgressAsync(job, tempTarget, progressCts.Token);

            try
            {
                await using (var fileStream = new FileStream(tempTarget, FileMode.Create, FileAccess.Write, FileShare.None, 1048576, useAsync: true))
                {
                    await _extractorService.StreamTarArchiveAsync(job.Request!, fileStream, CancellationToken.None);
                }

                progressCts.Cancel();
                try { await progressTask; } catch { }

                if (File.Exists(finalTarget)) File.Delete(finalTarget);
                File.Move(tempTarget, finalTarget);

                job.OutputFilePath = finalTarget;
                job.FileSizeBytes = new FileInfo(finalTarget).Length;
                job.ProgressPercent = 100;
                job.Status = "Completed";
                job.StatusMessage = "Ready for download";
                job.CompletedAtUtc = DateTime.UtcNow;

                PersistJobsToDisk();
            }
            catch (Exception ex)
            {
                progressCts.Cancel();
                job.Status = "Failed";
                job.ErrorMessage = ex.Message;
                _logger.LogError(ex, "Job {JobId} failed", job.JobId);

                try { if (File.Exists(tempTarget)) File.Delete(tempTarget); } catch { }
                PersistJobsToDisk();
            }
        }

        protected virtual async Task MonitorPackagingProgressAsync(ExportJobInfo job, string tempFilePath, CancellationToken ct)
        {
            long lastBytes = 0;
            while (!ct.IsCancellationRequested)
            {
                try
                {
                    await Task.Delay(1000, ct);
                    if (File.Exists(tempFilePath))
                    {
                        var fi = new FileInfo(tempFilePath);
                        long currentBytes = fi.Length;
                        long delta = currentBytes - lastBytes;
                        lastBytes = currentBytes;

                        job.FileSizeBytes = currentBytes;
                        job.SpeedMBps = Math.Round((double)delta / (1024 * 1024), 1);
                        if (job.ProgressPercent < 95) job.ProgressPercent += 5;
                        job.StatusMessage = $"Streaming • {Math.Round((double)currentBytes / (1024 * 1024), 1)} MB";
                    }
                }
                catch { }
            }
        }

        protected virtual void DeleteJobArtifacts(ExportJobInfo job)
        {
            try
            {
                if (!string.IsNullOrWhiteSpace(job.OutputFilePath) && File.Exists(job.OutputFilePath))
                {
                    File.Delete(job.OutputFilePath);
                }
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Error deleting artifacts for job {JobId}", job.JobId);
            }
        }

        protected virtual void ExecuteRetentionCleanup(object? state)
        {
            var now = DateTime.UtcNow;
            var cutoffUtc = now - RetentionPeriod;

            var jobsToPurge = _jobs.Values.Where(job =>
            {
                if (job.IsBookmarked) return false;
                if (job.IsCompleted)
                {
                    var baselineTime = job.CompletedAtUtc ?? job.CreatedAtUtc;
                    return baselineTime < cutoffUtc;
                }
                if (job.IsFailed && job.CreatedAtUtc < now.AddHours(-2)) return true;
                return false;
            }).ToList();

            if (jobsToPurge.Count > 0)
            {
                foreach (var job in jobsToPurge)
                {
                    DeleteJobArtifacts(job);
                    _jobs.TryRemove(job.JobId, out _);
                }
                PersistJobsToDisk();
            }
        }

        protected virtual void LoadJobsFromDisk()
        {
            lock (_stateLock)
            {
                if (!File.Exists(_stateFilePath)) return;

                try
                {
                    string json = File.ReadAllText(_stateFilePath);
                    var savedJobs = JsonSerializer.Deserialize<List<ExportJobInfo>>(json);

                    if (savedJobs != null)
                    {
                        foreach (var job in savedJobs)
                        {
                            if (job.Status == "Processing" || job.Status == "Queued")
                            {
                                job.Status = "Failed";
                                job.ErrorMessage = "Interrupted by server restart";
                                _jobs[job.JobId] = job;
                                continue;
                            }

                            if (job.IsCompleted)
                            {
                                if (!string.IsNullOrWhiteSpace(job.OutputFilePath) && File.Exists(job.OutputFilePath))
                                {
                                    _jobs[job.JobId] = job;
                                }
                                else
                                {
                                    _logger.LogWarning("Purging job {JobId} metadata - target file missing from disk", job.JobId);
                                }
                            }
                            else
                            {
                                _jobs[job.JobId] = job;
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Failed loading export jobs state from disk");
                }
            }
        }

        protected virtual void PersistJobsToDisk()
        {
            lock (_stateLock)
            {
                try
                {
                    var jobsList = _jobs.Values.ToList();
                    string tempPath = _stateFilePath + ".tmp";
                    string json = JsonSerializer.Serialize(jobsList, new JsonSerializerOptions { WriteIndented = true });

                    File.WriteAllText(tempPath, json);
                    File.Move(tempPath, _stateFilePath, overwrite: true);
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "Failed persisting export jobs state to disk");
                }
            }
        }
    }
}