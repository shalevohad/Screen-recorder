namespace ITB_SCREEN_RECORDER.Server.Services;

using System;
using System.Collections.Generic;
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
        _logger.LogInformation("[MediaMTX Supervisor] Service starting on {OS}...",
            OperatingSystem.IsWindows() ? "Windows" : "Linux");

        CleanupOrphanedMediaMtxProcesses();
        await Task.Delay(1000, stoppingToken);

        using var changeListener = _configMonitor.OnChange(async _ =>
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
                    var currentConfig = _configMonitor.CurrentValue;
                    string mtxBinaryPath = ResolveMediaMtxBinaryPath(currentConfig.MediaMtx.ExecutablePath);

                    if (!File.Exists(mtxBinaryPath))
                    {
                        _logger.LogError("[CRITICAL] MediaMTX binary not found at resolved path: {Path}", mtxBinaryPath);
                        await Task.Delay(TimeSpan.FromSeconds(10), stoppingToken);
                        continue;
                    }

                    EnsureExecutablePermissions(mtxBinaryPath);
                    CleanupOrphanedMediaMtxProcesses();
                    await Task.Delay(1000, stoppingToken);

                    string mtxFolder = Path.GetDirectoryName(mtxBinaryPath) ?? AppContext.BaseDirectory;
                    string ymlPath = Path.Combine(mtxFolder, "mediamtx.yml");
                    if (!File.Exists(ymlPath))
                    {
                        ymlPath = Path.Combine(AppContext.BaseDirectory, "mediamtx.yml");
                    }

                    // סנכרון אוטומטי של קובץ ה-YAML הנקי מתיקיית המקור בפיתוח לדריסת כל קובץ פגום ב-bin
                    string devSourceYml = Path.GetFullPath(Path.Combine(AppContext.BaseDirectory, "..", "..", "..", "MediaMTX", "mediamtx.yml"));
                    if (File.Exists(devSourceYml) && File.Exists(ymlPath) && !string.Equals(Path.GetFullPath(devSourceYml), Path.GetFullPath(ymlPath), StringComparison.OrdinalIgnoreCase))
                    {
                        try
                        {
                            File.Copy(devSourceYml, ymlPath, overwrite: true);
                            _logger.LogInformation("[MediaMTX Supervisor] Synchronized clean mediamtx.yml from project source.");
                        }
                        catch (Exception ex)
                        {
                            _logger.LogWarning("[MediaMTX Supervisor] Could not auto-sync mediamtx.yml: {Message}", ex.Message);
                        }
                    }

                    _logger.LogInformation("[MediaMTX Supervisor] Launching MediaMTX: {Path}", mtxBinaryPath);

                    var startInfo = new ProcessStartInfo
                    {
                        FileName = mtxBinaryPath,
                        WorkingDirectory = mtxFolder,
                        UseShellExecute = false,
                        RedirectStandardOutput = true,
                        RedirectStandardError = true,
                        CreateNoWindow = true
                    };

                    if (File.Exists(ymlPath))
                    {
                        startInfo.Arguments = $"\"{ymlPath}\"";
                    }

                    // 1. Control API
                    startInfo.Environment["MTX_API"] = "yes";
                    startInfo.Environment["MTX_APIADDRESS"] = $"127.0.0.1:{currentConfig.MediaMtx.ApiPort}";
                    startInfo.Environment["MTX_APIALLOWORIGINS"] = "[\"*\"]";

                    // 2. Metrics Server
                    startInfo.Environment["MTX_METRICS"] = currentConfig.MediaMtx.EnableMetrics ? "yes" : "no";
                    startInfo.Environment["MTX_METRICSADDRESS"] = $":{currentConfig.MediaMtx.MetricsPort}";
                    startInfo.Environment["MTX_METRICSALLOWORIGINS"] = "[\"*\"]";

                    // 3. PPROF Profiling Server
                    startInfo.Environment["MTX_PPROF"] = currentConfig.MediaMtx.EnablePprof ? "yes" : "no";
                    startInfo.Environment["MTX_PPROFADDRESS"] = $":{currentConfig.MediaMtx.PprofPort}";

                    // 4. Playback Server
                    startInfo.Environment["MTX_PLAYBACK"] = currentConfig.MediaMtx.EnablePlayback ? "yes" : "no";
                    startInfo.Environment["MTX_PLAYBACKADDRESS"] = $":{currentConfig.MediaMtx.PlaybackPort}";
                    startInfo.Environment["MTX_PLAYBACKALLOWORIGINS"] = "[\"*\"]";

                    // 5. RTMP Ingest Server
                    startInfo.Environment["MTX_RTMP"] = "yes";
                    startInfo.Environment["MTX_RTMPADDRESS"] = $":{currentConfig.MediaMtx.RtmpPort}";

                    // 6. HLS Server
                    startInfo.Environment["MTX_HLS"] = "yes";
                    startInfo.Environment["MTX_HLSADDRESS"] = $":{currentConfig.MediaMtx.HlsPort}";
                    startInfo.Environment["MTX_HLSALWAYSREMUX"] = currentConfig.MediaMtx.HlsAlwaysRemux ? "yes" : "no";
                    startInfo.Environment["MTX_HLSVARIANT"] = currentConfig.MediaMtx.HlsVariant;
                    startInfo.Environment["MTX_HLSSEGMENTDURATION"] = currentConfig.MediaMtx.HlsSegmentDuration;

                    // 7. Timezone
                    startInfo.Environment["TZ"] = string.IsNullOrWhiteSpace(currentConfig.MediaMtx.Timezone)
                        ? "UTC"
                        : currentConfig.MediaMtx.Timezone;

                    _mtxProcess = new Process
                    {
                        StartInfo = startInfo,
                        EnableRaisingEvents = true
                    };

                    _mtxProcess.OutputDataReceived += (sender, args) =>
                    {
                        if (string.IsNullOrEmpty(args.Data)) return;

                        if (args.Data.Contains("ERR") || args.Data.Contains("fatal") || args.Data.Contains("panic"))
                            _logger.LogError("[MediaMTX Core ERROR]: {Log}", args.Data);
                        else if (args.Data.Contains("WAR"))
                            _logger.LogWarning("[MediaMTX Core WARN]: {Log}", args.Data);
                        else
                            _logger.LogInformation("[MediaMTX Core]: {Log}", args.Data);
                    };

                    _mtxProcess.ErrorDataReceived += (sender, args) =>
                    {
                        if (!string.IsNullOrEmpty(args.Data))
                            _logger.LogError("[MediaMTX Core STDERR]: {Log}", args.Data);
                    };

                    _mtxProcess.Exited += (sender, args) =>
                    {
                        _logger.LogWarning("[MediaMTX Supervisor] Process exited with exit code: {ExitCode}", _mtxProcess?.ExitCode);
                    };

                    _mtxProcess.Start();
                    _mtxProcess.BeginOutputReadLine();
                    _mtxProcess.BeginErrorReadLine();

                    _logger.LogInformation("[MediaMTX Supervisor] MediaMTX started successfully (PID: {Pid})", _mtxProcess.Id);

                    _ = Task.Run(() => ApplyRecordingConfigAsync(stoppingToken), stoppingToken);
                }
            }
            catch (OperationCanceledException) when (stoppingToken.IsCancellationRequested)
            {
                break;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[MediaMTX Supervisor] Error in supervisor monitoring loop.");
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

    private string ResolveMediaMtxBinaryPath(string configuredPath)
    {
        string baseDir = AppContext.BaseDirectory;
        string defaultBinaryName = OperatingSystem.IsWindows() ? "mediamtx.exe" : "mediamtx";

        if (!string.IsNullOrWhiteSpace(configuredPath))
        {
            string normalized = configuredPath
                .Replace('\\', Path.DirectorySeparatorChar)
                .Replace('/', Path.DirectorySeparatorChar);

            // בלינוקס - הסרת סיומת .exe אם נרשמה ב-appsettings.json
            if (!OperatingSystem.IsWindows() && normalized.EndsWith(".exe", StringComparison.OrdinalIgnoreCase))
            {
                normalized = normalized[..^4];
            }

            string candidate = Path.IsPathRooted(normalized)
                ? normalized
                : Path.Combine(baseDir, normalized);

            if (File.Exists(candidate))
            {
                return candidate;
            }
        }

        // גיבוי לתיקיית המשנה MediaMTX
        string fallbackMtx = Path.Combine(baseDir, "MediaMTX", defaultBinaryName);
        if (File.Exists(fallbackMtx)) return fallbackMtx;

        // גיבוי לשורש הריצה
        string fallbackRoot = Path.Combine(baseDir, defaultBinaryName);
        if (File.Exists(fallbackRoot)) return fallbackRoot;

        // גיבוי לסביבת פיתוח (Debug / VS)
        string devFallback = Path.GetFullPath(Path.Combine(baseDir, "..", "..", "..", "MediaMTX", defaultBinaryName));
        if (File.Exists(devFallback)) return devFallback;

        return fallbackMtx;
    }

    private void EnsureExecutablePermissions(string filePath)
    {
        if (!OperatingSystem.IsLinux() || !File.Exists(filePath))
            return;

        try
        {
            File.SetUnixFileMode(filePath,
                UnixFileMode.UserRead | UnixFileMode.UserWrite | UnixFileMode.UserExecute |
                UnixFileMode.GroupRead | UnixFileMode.GroupExecute |
                UnixFileMode.OtherRead | UnixFileMode.OtherExecute);

            _logger.LogInformation("[MediaMTX Supervisor] Verified Linux execution permissions for: {Path}", filePath);
        }
        catch (Exception ex)
        {
            _logger.LogWarning("[MediaMTX Supervisor] Could not set Unix permissions on {Path}: {Message}", filePath, ex.Message);
        }
    }

    private async Task ApplyRecordingConfigAsync(CancellationToken stoppingToken)
    {
        SystemConfig config = _configMonitor.CurrentValue;
        int apiPort = config.MediaMtx.ApiPort;

        _logger.LogInformation("[STORAGE RESOLVER] Resolving active recording directory...");
        string root = await _storageResolver.ResolveActiveRootAsync(config.Storage, _logger).ConfigureAwait(false);
        string cleanRoot = root.Replace('\\', '/').TrimEnd('/');

        _logger.LogInformation("[STORAGE RESOLVER] Resolved target storage root: '{Root}'", cleanRoot);

        try
        {
            if (!Directory.Exists(root))
            {
                _logger.LogWarning("[STORAGE] Target directory '{Path}' does not exist. Creating...", root);
                Directory.CreateDirectory(root);
            }

            string testFile = Path.Combine(root, $".write_test_{Guid.NewGuid():N}.tmp");
            File.WriteAllText(testFile, "probe");
            File.Delete(testFile);
            _logger.LogInformation("[STORAGE] Write permission test to '{Path}' PASSED.", root);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "[STORAGE CRITICAL] Write permission test to folder '{Path}' FAILED! MediaMTX will fail to write files!", root);
        }

        bool ready = await _apiClient.WaitUntilReadyAsync(apiPort, TimeSpan.FromSeconds(15), stoppingToken).ConfigureAwait(false);
        if (!ready)
        {
            _logger.LogError("[CRITICAL] MediaMTX API did not become ready in time at port {Port}. Aborting configuration injection.", apiPort);
            return;
        }

        string recordPath = $"{cleanRoot}/%path/%Y-%m-%d_%H-%M-%S-%f";
        string chunkDuration = $"{config.Storage.ChunkIntervalMinutes}m";
        string retentionHours = $"{config.Storage.RetentionDays * 24}h";

        string recordFormat = string.IsNullOrWhiteSpace(config.Storage.RecordFormat)
            ? "fmp4"
            : config.Storage.RecordFormat.Trim().ToLowerInvariant();

        _logger.LogInformation("[INJECTING CONFIG] Pushing recording parameters -> RecordPath: '{Path}', Format: '{Format}', SegmentDuration: '{Chunk}', Retention: '{Retention}'",
            recordPath, recordFormat, chunkDuration, retentionHours);

        bool applied = await _apiClient.PatchPathDefaultsAsync(
            apiPort,
            recordPath,
            recordFormat,
            chunkDuration,
            retentionHours,
            stoppingToken).ConfigureAwait(false);

        if (applied)
        {
            _logger.LogInformation("[STORAGE CONFIGURED] Successfully applied recording parameters to MediaMTX via API.");
        }
        else
        {
            _logger.LogError("[CRITICAL] Failed to apply recording configuration to MediaMTX via API. See previous error logs for details.");
        }
    }

    private void CleanupOrphanedMediaMtxProcesses()
    {
        try
        {
            var orphanedProcesses = Process.GetProcessesByName("mediamtx");
            if (orphanedProcesses.Any())
            {
                _logger.LogWarning("[MediaMTX Supervisor] Found {Count} running mediamtx processes. Terminating...", orphanedProcesses.Length);
                foreach (var proc in orphanedProcesses)
                {
                    try
                    {
                        if (!proc.HasExited)
                        {
                            int pid = proc.Id;
                            proc.Kill(entireProcessTree: true);
                            proc.WaitForExit(2000);
                            _logger.LogInformation("[MediaMTX Supervisor] Terminated process PID: {Pid}", pid);
                        }
                    }
                    catch (Win32Exception ex) when (ex.NativeErrorCode == 5)
                    {
                        _logger.LogWarning("[MediaMTX Supervisor] Access denied killing process {Pid}.", proc.Id);
                    }
                    catch (Exception ex)
                    {
                        _logger.LogWarning("[MediaMTX Supervisor] Failed to kill PID {Pid}: {Message}", proc.Id, ex.Message);
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
            _logger.LogError(ex, "[MediaMTX Supervisor] Error during process cleanup.");
        }
    }

    public override async Task StopAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("[MediaMTX Supervisor] Shutting down. Terminating MediaMTX process...");
        try
        {
            if (_mtxProcess != null && !_mtxProcess.HasExited)
            {
                _mtxProcess.Kill(entireProcessTree: true);
                _mtxProcess.WaitForExit(3000);
            }
        }
        catch { }
        finally
        {
            _mtxProcess?.Dispose();
        }

        await base.StopAsync(cancellationToken);
    }
}