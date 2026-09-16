using System;
using System.ComponentModel;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace ITB_SCREEN_RECORDER.Server.Services
{
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

            string baseDir = AppContext.BaseDirectory;

            // 1. קביעה דינמית של שם הבינארי לפי מערכת ההפעלה
            string binaryName = OperatingSystem.IsWindows() ? "mediamtx.exe" : "mediamtx";

            // 2. איתור הנתיב - בדיקה קודם בתיקיית המשנה MediaMTX ואז בשורש
            string mtxFolder = Path.Combine(baseDir, "MediaMTX");
            string mtxBinaryPath = Path.Combine(mtxFolder, binaryName);

            if (!File.Exists(mtxBinaryPath))
            {
                mtxFolder = baseDir;
                mtxBinaryPath = Path.Combine(baseDir, binaryName);
            }

            // 3. בלינוקס: וידוא הרשאות ביצוע לקובץ (Execution Flag)
            EnsureExecutablePermissions(mtxBinaryPath);

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
                        if (!File.Exists(mtxBinaryPath))
                        {
                            _logger.LogError("[CRITICAL] MediaMTX binary '{Binary}' not found at path: {Path}", binaryName, mtxBinaryPath);
                            await Task.Delay(TimeSpan.FromSeconds(10), stoppingToken);
                            continue;
                        }

                        CleanupOrphanedMediaMtxProcesses();
                        await Task.Delay(1000, stoppingToken);

                        // איתור קובץ mediamtx.yml
                        string ymlPath = Path.Combine(mtxFolder, "mediamtx.yml");
                        if (!File.Exists(ymlPath))
                        {
                            ymlPath = Path.Combine(baseDir, "mediamtx.yml");
                        }

                        PatchMediaMtxYaml(ymlPath, _configMonitor.CurrentValue);

                        _logger.LogInformation("[MediaMTX Supervisor] Launching MediaMTX binary: {Path}", mtxBinaryPath);

                        var startInfo = new ProcessStartInfo
                        {
                            FileName = mtxBinaryPath,
                            WorkingDirectory = mtxFolder,
                            UseShellExecute = false,
                            RedirectStandardOutput = true,
                            RedirectStandardError = true,
                            CreateNoWindow = true
                        };

                        // העברת נתיב הקונפיגורציה במפורש כארגומנט אם הקובץ קיים
                        if (File.Exists(ymlPath))
                        {
                            startInfo.Arguments = $"\"{ymlPath}\"";
                        }

                        _mtxProcess = new Process { StartInfo = startInfo };

                        _mtxProcess.OutputDataReceived += (sender, args) =>
                        {
                            if (!string.IsNullOrEmpty(args.Data))
                                _logger.LogInformation("[MediaMTX Core]: {Log}", args.Data);
                        };

                        _mtxProcess.ErrorDataReceived += (sender, args) =>
                        {
                            if (!string.IsNullOrEmpty(args.Data))
                                _logger.LogError("[MediaMTX Core ERROR]: {Log}", args.Data);
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

        private void EnsureExecutablePermissions(string filePath)
        {
            // בדיקה ישירה שמשקיטה לחלוטין את מנתח הקוד (Roslyn CA1416)
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

        private void PatchMediaMtxYaml(string ymlPath, SystemConfig config)
        {
            if (!File.Exists(ymlPath))
            {
                _logger.LogWarning("[MediaMTX] Cannot patch {Path} because the file does not exist.", ymlPath);
                return;
            }

            try
            {
                var lines = File.ReadAllLines(ymlPath).ToList();
                bool isModified = false;

                var targetSettings = new System.Collections.Generic.Dictionary<string, string>
                {
                    ["api"] = "yes",
                    ["apiAddress"] = $"127.0.0.1:{config.MediaMtx.ApiPort}",
                    ["rtmpAddress"] = $":{config.MediaMtx.RtmpPort}",
                    ["hlsAddress"] = $":{config.MediaMtx.HlsPort}"
                };

                foreach (var entry in targetSettings)
                {
                    string key = entry.Key;
                    string targetValue = entry.Value;
                    string targetLine = $"{key}: {targetValue}";

                    int activeIndex = lines.FindIndex(line => IsActiveKey(line, key));
                    if (activeIndex != -1)
                    {
                        if (lines[activeIndex].Trim() != targetLine)
                        {
                            lines[activeIndex] = targetLine;
                            isModified = true;
                        }
                    }
                    else
                    {
                        int commentedIndex = lines.FindIndex(line => IsCommentedKey(line, key));
                        if (commentedIndex != -1)
                        {
                            lines[commentedIndex] = targetLine;
                            isModified = true;
                        }
                        else
                        {
                            lines.Add(targetLine);
                            isModified = true;
                        }
                    }
                }

                if (isModified)
                {
                    File.WriteAllLines(ymlPath, lines, Encoding.UTF8);
                    _logger.LogInformation("[MediaMTX] Successfully patched mediamtx.yml with configured ports (API: {Api}, RTMP: {Rtmp}, HLS: {Hls})",
                        config.MediaMtx.ApiPort, config.MediaMtx.RtmpPort, config.MediaMtx.HlsPort);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[MediaMTX] Error occurred while patching mediamtx.yml at: {Path}", ymlPath);
            }
        }

        private static bool IsActiveKey(string line, string key)
        {
            if (string.IsNullOrWhiteSpace(line)) return false;
            string trimmed = line.Trim();
            if (trimmed.StartsWith("#")) return false;
            return line.StartsWith($"{key}:", StringComparison.OrdinalIgnoreCase) ||
                   line.StartsWith($"{key} :", StringComparison.OrdinalIgnoreCase);
        }

        private static bool IsCommentedKey(string line, string key)
        {
            if (string.IsNullOrWhiteSpace(line)) return false;
            string trimmed = line.Trim();
            if (!trimmed.StartsWith("#")) return false;
            string afterHash = trimmed.TrimStart('#').TrimStart();
            return afterHash.StartsWith($"{key}:", StringComparison.OrdinalIgnoreCase) ||
                   afterHash.StartsWith($"{key} :", StringComparison.OrdinalIgnoreCase);
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
}