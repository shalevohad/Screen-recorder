namespace ITB_SCREEN_RECORDER.Server.Services;

using System;
using System.ComponentModel;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

public class MediaMtxSupervisorWorker : BackgroundService
{
    private readonly ILogger<MediaMtxSupervisorWorker> _logger;
    private readonly IOptionsMonitor<SystemConfig> _configMonitor;
    private readonly StoragePathResolver _storageResolver;
    private readonly MediaMtxApiClient _apiClient;
    private Process? _mtxProcess;

    public MediaMtxSupervisorWorker(
        ILogger<MediaMtxSupervisorWorker> logger,
        IOptionsMonitor<SystemConfig> configMonitor,
        StoragePathResolver storageResolver,
        MediaMtxApiClient apiClient)
    {
        _logger = logger;
        _configMonitor = configMonitor;
        _storageResolver = storageResolver;
        _apiClient = apiClient;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("MediaMTX Supervisor Service starting...");

        // 1. ניקוי אקטיבי של תהליכים יתומים מיד עם עליית השרת
        CleanupOrphanedMediaMtxProcesses();
        await Task.Delay(1000, stoppingToken);

        string baseDir = AppContext.BaseDirectory;
        string mtxFolder = Path.Combine(baseDir, "MediaMTX");
        string mtxExePath = Path.Combine(mtxFolder, "mediamtx.exe");

        if (!File.Exists(mtxExePath))
        {
            mtxFolder = baseDir;
            mtxExePath = Path.Combine(baseDir, "mediamtx.exe");
        }

        // האזנה לשינויי קונפיגורציה בזמן אמת (Hot-Reload) ללא צורך באיתחול השרת
        using var changeListener = _configMonitor.OnChange(async updatedConfig =>
        {
            try
            {
                _logger.LogInformation("[MediaMTX Supervisor] Detected configuration change, updating MediaMTX recording parameters...");
                await ApplyRecordingConfigAsync(stoppingToken);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[MediaMTX Supervisor] Failed to apply updated recording configuration.");
            }
        });

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                if (_mtxProcess == null || _mtxProcess.HasExited)
                {
                    if (!File.Exists(mtxExePath))
                    {
                        _logger.LogError("[CRITICAL] mediamtx.exe not found at path: {Path}", mtxExePath);
                        await Task.Delay(TimeSpan.FromSeconds(10), stoppingToken);
                        continue;
                    }

                    // 2. הבטחת שטח נקי וסגירת פורטים תפוסים לפני כל הרמה
                    CleanupOrphanedMediaMtxProcesses();
                    await Task.Delay(1000, stoppingToken);

                    // עדכון פורטים מדויק בקובץ mediamtx.yml ללא פגיעה בשאר ההגדרות
                    string ymlPath = Path.Combine(mtxFolder, "mediamtx.yml");
                    PatchMediaMtxYaml(ymlPath, _configMonitor.CurrentValue);

                    _logger.LogInformation("Launching MediaMTX from: {Path}", mtxExePath);

                    var startInfo = new ProcessStartInfo
                    {
                        FileName = mtxExePath,
                        WorkingDirectory = mtxFolder,
                        UseShellExecute = false,
                        RedirectStandardOutput = true,
                        RedirectStandardError = true,
                        CreateNoWindow = true
                    };

                    // שליפת אזור הזמן מתוך הקונפיגורציה (ברירת מחדל: UTC)
                    string targetTz = string.IsNullOrWhiteSpace(_configMonitor.CurrentValue.MediaMtx.Timezone)
                        ? "UTC"
                        : _configMonitor.CurrentValue.MediaMtx.Timezone;

                    // כפיית אזור הזמן הנבחר על מנוע ה-Go של MediaMTX
                    startInfo.EnvironmentVariables["TZ"] = targetTz;

                    _logger.LogInformation("Configuring MediaMTX environment with TZ={Timezone}", targetTz);

                    _mtxProcess = new Process { StartInfo = startInfo };

                    // הזרמת לוגים של MediaMTX ישירות ל-ILogger של השרת
                    _mtxProcess.OutputDataReceived += (sender, args) =>
                    {
                        if (!string.IsNullOrEmpty(args.Data))
                            _logger.LogInformation("[MediaMTX Content]: {Log}", args.Data);
                    };

                    _mtxProcess.ErrorDataReceived += (sender, args) =>
                    {
                        if (!string.IsNullOrEmpty(args.Data))
                            _logger.LogError("[MediaMTX Error Stream]: {Log}", args.Data);
                    };

                    _mtxProcess.Start();
                    _mtxProcess.BeginOutputReadLine();
                    _mtxProcess.BeginErrorReadLine();

                    _logger.LogInformation("MediaMTX started successfully with PID: {Pid} (TZ: {Tz})", _mtxProcess.Id, targetTz);

                    // הזרקת הגדרות ההקלטה דרך ה-API מיד כשהשרת זמין
                    _ = Task.Run(() => ApplyRecordingConfigAsync(stoppingToken), stoppingToken);
                }
            }
            catch (OperationCanceledException) when (stoppingToken.IsCancellationRequested)
            {
                break;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to start or monitor MediaMTX process.");
            }

            try
            {
                await Task.Delay(TimeSpan.FromSeconds(5), stoppingToken);
            }
            catch (OperationCanceledException) when (stoppingToken.IsCancellationRequested)
            {
                break;
            }
        }
    }

    private void PatchMediaMtxYaml(string ymlPath, SystemConfig config)
    {
        if (!File.Exists(ymlPath))
        {
            _logger.LogWarning("[MediaMTX] Cannot patch {Path} because the file does not exist.", ymlPath);
            return;
        }

        var lines = File.ReadAllLines(ymlPath);
        bool isModified = false;

        for (int i = 0; i < lines.Length; i++)
        {
            string line = lines[i];

            if (string.IsNullOrWhiteSpace(line) || line.TrimStart().StartsWith("#"))
                continue;

            if (line.StartsWith("api:"))
            {
                lines[i] = "api: yes";
                isModified = true;
            }
            else if (line.StartsWith("apiAddress:"))
            {
                lines[i] = $"apiAddress: 127.0.0.1:{config.MediaMtx.ApiPort}";
                isModified = true;
            }
            else if (line.StartsWith("hlsAddress:"))
            {
                lines[i] = $"hlsAddress: :{config.MediaMtx.HlsPort}";
                isModified = true;
            }
            else if (line.StartsWith("rtmpAddress:"))
            {
                lines[i] = $"rtmpAddress: :{config.MediaMtx.RtmpPort}";
                isModified = true;
            }
        }

        if (isModified)
        {
            File.WriteAllLines(ymlPath, lines);
            _logger.LogInformation("[MediaMTX] Successfully patched mediamtx.yml with current ports from appsettings.json.");
        }
    }

    private async Task ApplyRecordingConfigAsync(CancellationToken stoppingToken)
    {
        SystemConfig config = _configMonitor.CurrentValue;
        int apiPort = config.MediaMtx.ApiPort;

        bool ready = await _apiClient.WaitUntilReadyAsync(apiPort, TimeSpan.FromSeconds(15), stoppingToken).ConfigureAwait(false);
        if (!ready)
        {
            _logger.LogError("[CRITICAL] MediaMTX API did not become ready in time. Recording settings were not applied.");
            return;
        }

        string root = await _storageResolver.ResolveActiveRootAsync(config.Storage, _logger).ConfigureAwait(false);
        string cleanRoot = root.Replace('\\', '/').TrimEnd('/');

        // סיומת Z תקנית עבור UTC, או מבנה שעה נקי לכל אזור זמן אחר
        string targetTz = string.IsNullOrWhiteSpace(config.MediaMtx.Timezone) ? "UTC" : config.MediaMtx.Timezone;
        bool isUtc = string.Equals(targetTz, "UTC", StringComparison.OrdinalIgnoreCase);
        string timeFormat = isUtc ? "%Y%m%dT%H%M%SZ" : "%Y%m%dT%H%M%S";

        // תבנית שמירה ישירה: ללא ספריית live, שמירה ישירה תחת מזהה העמדה (%path)
        string recordPath = $"{cleanRoot}/%path/{timeFormat}";

        string chunkDuration = $"{config.Storage.ChunkIntervalMinutes}m";
        string retentionHours = $"{config.Storage.RetentionDays * 24}h";

        // שליפת פורמט ההקלטה מתוך הקונפיגורציה (fmp4 כברירת מחדל)
        string recordFormat = string.IsNullOrWhiteSpace(config.Storage.RecordFormat)
            ? "fmp4"
            : config.Storage.RecordFormat.Trim().ToLowerInvariant();

        bool applied = await _apiClient.PatchPathDefaultsAsync(
            apiPort,
            recordPath,
            recordFormat,
            chunkDuration,
            retentionHours,
            stoppingToken).ConfigureAwait(false);

        if (applied)
        {
            _logger.LogInformation("[STORAGE] Recording configuration applied -> Root: '{Root}', Path: '{RecordPath}', Format: '{Format}', Chunk: {Interval}, Retention: {Retention}",
                cleanRoot, recordPath, recordFormat, chunkDuration, retentionHours);
        }
        else
        {
            _logger.LogError("[CRITICAL] Failed to apply recording configuration to MediaMTX via API.");
        }
    }

    private void CleanupOrphanedMediaMtxProcesses()
    {
        try
        {
            var orphanedProcesses = Process.GetProcessesByName("mediamtx");

            if (orphanedProcesses.Any())
            {
                _logger.LogWarning("[MediaMTX Supervisor] Found {Count} orphaned mediamtx processes. Terminating them actively...", orphanedProcesses.Length);

                foreach (var proc in orphanedProcesses)
                {
                    try
                    {
                        if (!proc.HasExited)
                        {
                            int pid = proc.Id;
                            proc.Kill(entireProcessTree: true);
                            proc.WaitForExit(2000);
                            _logger.LogInformation("[MediaMTX Supervisor] Successfully terminated orphaned process PID: {Pid}", pid);
                        }
                    }
                    catch (Win32Exception ex) when (ex.NativeErrorCode == 5)
                    {
                        _logger.LogWarning("[MediaMTX Supervisor] Insufficient permissions to terminate process {Pid} (Access Denied).", proc.Id);
                    }
                    catch (InvalidOperationException)
                    {
                    }
                    catch (Exception ex)
                    {
                        _logger.LogWarning("[MediaMTX Supervisor] Failed to kill process {Pid}: {Message}", proc.Id, ex.Message);
                    }
                    finally
                    {
                        proc.Dispose();
                    }
                }
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("[MediaMTX Supervisor] Error occurred during process sanitization: {Message}", ex.Message);
        }
    }

    public override async Task StopAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("Server shutting down. Terminating MediaMTX process...");

        try
        {
            if (_mtxProcess != null && !_mtxProcess.HasExited)
            {
                try
                {
                    _mtxProcess.Kill(entireProcessTree: true);
                    _mtxProcess.WaitForExit(3000);
                    _logger.LogInformation("MediaMTX process terminated successfully.");
                }
                catch (Win32Exception ex) when (ex.NativeErrorCode == 5)
                {
                    _logger.LogWarning("[MediaMTX Supervisor] Access denied when attempting to terminate MediaMTX on shutdown.");
                }
                catch (InvalidOperationException)
                {
                }
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while terminating MediaMTX process.");
        }
        finally
        {
            _mtxProcess?.Dispose();
        }

        await base.StopAsync(cancellationToken);
    }
}