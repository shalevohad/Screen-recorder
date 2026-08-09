namespace ITB_SCREEN_RECORDER.Server.Services;

using System;
using System.Diagnostics;
using System.IO;
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
                        _logger.LogError("[CRITICAL] mediamtx.exe was not found at path: {Path}. Waiting 10 seconds...", mtxExePath);
                        await Task.Delay(TimeSpan.FromSeconds(10), stoppingToken);
                        continue;
                    }

                    _logger.LogInformation("Launching MediaMTX process from: {Path}", mtxExePath);

                    var startInfo = new ProcessStartInfo
                    {
                        FileName = mtxExePath,
                        WorkingDirectory = mtxFolder,
                        CreateNoWindow = true,
                        UseShellExecute = false,
                        RedirectStandardOutput = true,
                        RedirectStandardError = true
                    };

                    _mtxProcess = new Process { StartInfo = startInfo };

                    _mtxProcess.OutputDataReceived += (s, e) => { if (e.Data != null) _logger.LogInformation("[MediaMTX] {Log}", e.Data); };
                    _mtxProcess.ErrorDataReceived += (s, e) => { if (e.Data != null) _logger.LogWarning("[MediaMTX Err] {Log}", e.Data); };

                    _mtxProcess.Start();
                    _mtxProcess.BeginOutputReadLine();
                    _mtxProcess.BeginErrorReadLine();
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

    // 💡 פתרון מובטח: StopAsync רץ בצורה בטוחה וישירה בעת סגירת השרת
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

        // קריאה למתודת הבסיס לסיום שאר תהליכי ה-BackgroundService
        await base.StopAsync(cancellationToken);
    }
}