using System;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Common;
using ITB_SCREEN_RECORDER.Core.Configuration;

namespace ITB_SCREEN_RECORDER.AgentWorker
{
    internal class Program
    {
        private static readonly CancellationTokenSource _cts = new CancellationTokenSource();

        private static async Task Main(string[] args)
        {
#if WINDOWS
            if (OperatingSystem.IsWindows())
            {
                if (args.Length > 0)
                {
                    [System.Runtime.InteropServices.DllImport("kernel32.dll", SetLastError = true)]
                    static extern bool AttachConsole(int dwProcessId);
                    AttachConsole(-1);
                }
                ITBRecorderAgent.Providers.Video.WindowsDpiHelper.EnablePerMonitorDpiAwareness();
            }
#endif
            var config = ConfigLoader.Load();
            Logger.Initialize(config, "Worker");

#if WINDOWS
            if (OperatingSystem.IsWindows())
            {
                ITBRecorderAgent.Providers.Video.DesktopSecurityManager.EnsureProcessWindowStation();
            }
#endif

            Logger.AlwaysInfo($"[WORKER:STARTUP] Process started. PID: {Environment.ProcessId}, Args: '{string.Join(" ", args)}', WorkDir: '{AppContext.BaseDirectory}'");

            AppDomain.CurrentDomain.UnhandledException += (sender, eventArgs) =>
            {
                Logger.Error($"[WORKER:FATAL] Unhandled domain exception: {eventArgs.ExceptionObject}");
            };

            using var singleLock = new SingleInstanceLock("ITB_AgentWorker_Lock");
            if (!singleLock.Acquire())
            {
                Logger.Warn($"[WORKER:STARTUP] Another instance of ITB.AgentWorker is already running in this session. Process PID {Environment.ProcessId} exiting cleanly.");
                return;
            }

            Logger.AlwaysInfo("[WORKER:STARTUP] Single-instance lock 'ITB_AgentWorker_Lock' acquired successfully.");

            Console.CancelKeyPress += (sender, eventArgs) =>
            {
                Logger.Info("[WORKER:LIFECYCLE] Stop signal received (Ctrl+C). Performing graceful shutdown...");
                eventArgs.Cancel = true;
                _cts.Cancel();
            };

            AppDomain.CurrentDomain.ProcessExit += (sender, eventArgs) =>
            {
                if (!_cts.IsCancellationRequested)
                {
                    Logger.Info("[WORKER:LIFECYCLE] Process exit event detected. Canceling active tasks...");
                    _cts.Cancel();
                }
            };

            try
            {
                var engine = new WorkerEngine(config);
                await engine.RunAsync(_cts.Token).ConfigureAwait(false);
            }
            catch (OperationCanceledException)
            {
                Logger.Info("[WORKER:LIFECYCLE] Worker loop stopped gracefully.");
            }
            catch (Exception ex)
            {
                Logger.Error($"[WORKER:FATAL] Critical unhandled exception during AgentWorker execution: {ex.Message}\n{ex.StackTrace}");
            }
            finally
            {
                Logger.AlwaysInfo($"[WORKER:SHUTDOWN] AgentWorker PID {Environment.ProcessId} has finished its work and is unloading from memory.");
            }
        }
    }
}