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

        // 1. חישוב נתיב מוחלט לתיקיית ה-MediaMTX
        string baseDir = AppContext.BaseDirectory;

        // אופציה א': הקבצים יושבים בתיקיית משנה MediaMTX
        string mtxFolder = Path.Combine(baseDir, "MediaMTX");
        string mtxExePath = Path.Combine(mtxFolder, "mediamtx.exe");

        // אופציה ב' (Fallback): הקבצים יושבים ישירות בתיקיית השורש לצד ה-C# Server
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
                    // וידוא שהקובץ הבינארי אכן קיים לפני ניסיון ההרצה
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
                        // הגדרת WorkingDirectory קריטית כדי ש-MediaMTX ימצא את mediamtx.yml שצמוד אליו!
                        WorkingDirectory = mtxFolder,
                        CreateNoWindow = true,
                        UseShellExecute = false,
                        RedirectStandardOutput = true,
                        RedirectStandardError = true
                    };

                    _mtxProcess = new Process { StartInfo = startInfo };

                    // הזרמת לוגים מ-MediaMTX ל-Logger המרכזי של C#
                    _mtxProcess.OutputDataReceived += (s, e) => { if (e.Data != null) _logger.LogInformation("[MediaMTX] {Log}", e.Data); };
                    _mtxProcess.ErrorDataReceived += (s, e) => { if (e.Data != null) _logger.LogWarning("[MediaMTX Err] {Log}", e.Data); };

                    _mtxProcess.Start();
                    _mtxProcess.BeginOutputReadLine();
                    _mtxProcess.BeginErrorReadLine();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to start or monitor MediaMTX process.");
            }

            await Task.Delay(TimeSpan.FromSeconds(5), stoppingToken);
        }

        // סגירה מסודרת בעת הורדת השרת
        if (_mtxProcess != null && !_mtxProcess.HasExited)
        {
            _logger.LogInformation("Terminating MediaMTX process...");
            _mtxProcess.Kill(true);
        }
    }
}