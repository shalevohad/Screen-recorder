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
            var config = ConfigLoader.Load();
            Logger.Initialize(config);

            using var singleLock = new SingleInstanceLock("ITB_AgentWorker_Lock");
            if (!singleLock.Acquire())
            {
                Logger.Warn("Another instance of ITB.AgentWorker is already running in this session. Exiting cleanly.");
                return;
            }

            Logger.Info("=== ITB-SCREEN-RECORDER AgentWorker Initialized Successfully ===");

            Console.CancelKeyPress += (sender, eventArgs) =>
            {
                Logger.Info("Stop signal received (Ctrl+C). Performing graceful shutdown of the Worker...");
                eventArgs.Cancel = true;
                _cts.Cancel();
            };

            AppDomain.CurrentDomain.ProcessExit += (sender, eventArgs) =>
            {
                if (!_cts.IsCancellationRequested)
                {
                    Logger.Info("Process exit event detected. Canceling active tasks...");
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
                Logger.Info("Worker loop stopped gracefully.");
            }
            catch (Exception ex)
            {
                Logger.Error($"Critical unhandled exception during AgentWorker execution: {ex.Message}");
            }
            finally
            {
                Logger.Info("AgentWorker has finished its work and is unloading from memory.");
            }
        }
    }
}