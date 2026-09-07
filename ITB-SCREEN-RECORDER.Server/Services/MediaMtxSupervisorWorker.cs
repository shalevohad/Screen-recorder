namespace ITB_SCREEN_RECORDER.Server.Services;

using System;
using System.IO;
using System.Linq;
using System.Diagnostics;
using System.ComponentModel;
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
    private string _activeTimezone = "UTC";

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

        using var changeListener = _configMonitor.OnChange(async updatedConfig =>
        {
            try
            {
                string newTz = string.IsNullOrWhiteSpace(updatedConfig.MediaMtx.Timezone) ? "UTC" : updatedConfig.MediaMtx.Timezone.Trim();

                if (!string.Equals(newTz, _activeTimezone, StringComparison.OrdinalIgnoreCase))
                {
                    _logger.LogInformation("[MediaMTX Supervisor] MediaMtx.Timezone changed. Restarting process...");
                    if (_mtxProcess != null && !_mtxProcess.HasExited)
                    {
                        _mtxProcess.Kill(entireProcessTree: true);
                    }
                }
                else
                {
                    await ApplyRecordingConfigAsync(stoppingToken);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[MediaMTX Supervisor] Failed to apply configuration change.");
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

                    CleanupOrphanedMediaMtxProcesses();
                    await Task.Delay(1000, stoppingToken);

                    string root = await _storageResolver.ResolveActiveRootAsync(_configMonitor.CurrentValue.Storage, _logger).ConfigureAwait(false);
                    string ymlPath = Path.Combine(mtxFolder, "mediamtx.yml");

                    // שימוש ב-StoragePathResolver להזרקת נתיב תקני בתוך קובץ ה-YAML
                    InjectRecordingConfigIntoYaml(ymlPath, _configMonitor.CurrentValue, root);

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

                    _activeTimezone = string.IsNullOrWhiteSpace(_configMonitor.CurrentValue.MediaMtx.Timezone)
                        ? "UTC"
                        : _configMonitor.CurrentValue.MediaMtx.Timezone.Trim();

                    startInfo.EnvironmentVariables["TZ"] = _activeTimezone;

                    _mtxProcess = new Process { StartInfo = startInfo };

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

                    _logger.LogInformation("MediaMTX started with PID: {Pid}", _mtxProcess.Id);

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

    private void InjectRecordingConfigIntoYaml(string ymlPath, SystemConfig config, string root)
    {
        if (!File.Exists(ymlPath)) return;

        try
        {
            // שימוש מובנה ב-StoragePathResolver ליצירת נתיב מותאם עם לוכסנים חוקיים
            string recordPath = _storageResolver.BuildRecordPath(root, config);
            string chunkDuration = $"{config.Storage.ChunkIntervalMinutes}m";
            string retentionHours = $"{config.Storage.RetentionDays * 24}h";

            var lines = File.ReadAllLines(ymlPath).ToList();
            bool inPathDefaults = false;

            for (int i = 0; i < lines.Count; i++)
            {
                string raw = lines[i];
                string trimmed = raw.Trim();

                if (trimmed.StartsWith("#")) continue;

                if (trimmed.StartsWith("pathDefaults:"))
                {
                    inPathDefaults = true;
                    continue;
                }
                else if (trimmed.EndsWith(":") && !trimmed.StartsWith(" ") && !trimmed.StartsWith("\t") && !trimmed.StartsWith("pathDefaults"))
                {
                    inPathDefaults = false;
                }

                if (trimmed.StartsWith("apiAddress:"))
                {
                    lines[i] = $"apiAddress: 127.0.0.1:{config.MediaMtx.ApiPort}";
                }
                else if (trimmed.StartsWith("hlsAddress:"))
                {
                    lines[i] = $"hlsAddress: :{config.MediaMtx.HlsPort}";
                }
                else if (trimmed.StartsWith("rtmpAddress:"))
                {
                    lines[i] = $"rtmpAddress: :{config.MediaMtx.RtmpPort}";
                }

                if (inPathDefaults)
                {
                    if (trimmed.StartsWith("record:") && (trimmed.Contains("no") || trimmed.Contains("false")))
                    {
                        int indent = raw.IndexOf("record:");
                        lines[i] = new string(' ', indent) + "record: yes";
                    }
                    else if (trimmed.StartsWith("recordPath:"))
                    {
                        int indent = raw.IndexOf("recordPath:");
                        lines[i] = new string(' ', indent) + $"recordPath: {recordPath}";
                    }
                    else if (trimmed.StartsWith("recordSegmentDuration:"))
                    {
                        int indent = raw.IndexOf("recordSegmentDuration:");
                        lines[i] = new string(' ', indent) + $"recordSegmentDuration: {chunkDuration}";
                    }
                    else if (trimmed.StartsWith("recordDeleteAfter:"))
                    {
                        int indent = raw.IndexOf("recordDeleteAfter:");
                        lines[i] = new string(' ', indent) + $"recordDeleteAfter: {retentionHours}";
                    }
                }
            }

            File.WriteAllLines(ymlPath, lines);
            _logger.LogInformation("[MediaMTX] Successfully injected recording configuration via StoragePathResolver into mediamtx.yml.");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "[MediaMTX] Failed to safely inject configuration into mediamtx.yml.");
        }
    }

    private async Task ApplyRecordingConfigAsync(CancellationToken stoppingToken)
    {
        SystemConfig config = _configMonitor.CurrentValue;
        int apiPort = config.MediaMtx.ApiPort;

        bool ready = await _apiClient.WaitUntilReadyAsync(apiPort, TimeSpan.FromSeconds(15), stoppingToken).ConfigureAwait(false);
        if (!ready)
        {
            _logger.LogError("[CRITICAL] MediaMTX API did not become ready in time.");
            return;
        }

        string root = await _storageResolver.ResolveActiveRootAsync(config.Storage, _logger).ConfigureAwait(false);
        string recordPath = _storageResolver.BuildRecordPath(root, config);
        string chunkDuration = $"{config.Storage.ChunkIntervalMinutes}m";
        string retentionHours = $"{config.Storage.RetentionDays * 24}h";
        string recordFormat = string.IsNullOrWhiteSpace(config.Storage.RecordFormat) ? "fmp4" : config.Storage.RecordFormat.Trim().ToLowerInvariant();

        await _apiClient.PatchPathDefaultsAsync(apiPort, recordPath, recordFormat, chunkDuration, retentionHours, stoppingToken).ConfigureAwait(false);
        _logger.LogInformation("[STORAGE] Applied runtime recording sync via API.");
    }

    private void CleanupOrphanedMediaMtxProcesses()
    {
        try
        {
            var orphanedProcesses = Process.GetProcessesByName("mediamtx");
            foreach (var proc in orphanedProcesses)
            {
                try
                {
                    if (!proc.HasExited)
                    {
                        int pid = proc.Id;
                        proc.Kill(entireProcessTree: true);
                        proc.WaitForExit(2000);
                        _logger.LogInformation("[MediaMTX Supervisor] Terminated orphaned PID: {Pid}", pid);
                    }
                }
                catch { }
                finally { proc.Dispose(); }
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "[MediaMTX Supervisor] Cleanup error");
        }
    }

    public override async Task StopAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("Server shutting down. Terminating MediaMTX...");
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