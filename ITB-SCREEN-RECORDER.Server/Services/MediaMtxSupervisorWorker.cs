namespace ITB_SCREEN_RECORDER.Server.Services;

using System;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

public class MediaMtxSupervisorWorker : BackgroundService
{
    private readonly ILogger<MediaMtxSupervisorWorker> _logger;
    private Process? _mtxProcess;

    public MediaMtxSupervisorWorker(ILogger<MediaMtxSupervisorWorker> logger)
    {
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("MediaMTX Supervisor Service starting...");

        // 1. ניקוי אקטיבי ראשוני של תהליכים יתומים מיד עם עליית השרת
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

                    // 2. הבטחת שטח נקי וסגירת פורטים תפוסים לפני כל ניסיון הרמה מחדש
                    CleanupOrphanedMediaMtxProcesses();
                    await Task.Delay(1000, stoppingToken);

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

                    _logger.LogInformation("MediaMTX started successfully with PID: {Pid}", _mtxProcess.Id);
                }
            }
            catch (OperationCanceledException) when (stoppingToken.IsCancellationRequested)
            {
                // עצירה תקינה לבקשת השרת
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

    /// <summary>
    /// פונקציית ניקוי עצמית (Self-Healing) שמחסלת תהליכי MediaMTX יתומים התופסים את משאבי הרשת.
    /// </summary>
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
                        int pid = proc.Id;
                        proc.Kill(entireProcessTree: true);
                        proc.WaitForExit(2000);
                        _logger.LogInformation("[MediaMTX Supervisor] Successfully terminated orphaned process PID: {Pid}", pid);
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError("[MediaMTX Supervisor] Failed to kill process {Pid}: {Message}", proc.Id, ex.Message);
                    }
                }
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("[MediaMTX Supervisor] Error occurred during process sanitization: {Message}", ex.Message);
        }
    }

    // פתרון מובטח: StopAsync רץ בצורה בטוחה וישירה בעת סגירת השרת
    public override async Task StopAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("Server shutting down. Terminating MediaMTX process...");

        try
        {
            if (_mtxProcess != null && !_mtxProcess.HasExited)
            {
                // הורדת התהליך וכל עץ הבנים שלו באגרסיביות כדי שלא ישארו יתומים ברקע
                _mtxProcess.Kill(entireProcessTree: true);
                _mtxProcess.WaitForExit(3000);
                _logger.LogInformation("MediaMTX process terminated successfully.");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while terminating MediaMTX process.");
        }

        await base.StopAsync(cancellationToken);
    }
}