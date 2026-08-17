using System;
using System.Threading;
using System.Threading.Tasks;
using ITBRecorderAgent.Core;

namespace ITBRecorderAgent
{
    internal class Program
    {
        private static readonly CancellationTokenSource _cts = new CancellationTokenSource();

        private static async Task Main(string[] args)
        {
            AppConfig config = ConfigLoader.Load();
            Logger.Initialize(config);

            using var singleLock = new SingleInstanceLock("ITB_SCREEN_RECORDER_AGENT");
            if (!singleLock.IsAcquired)
            {
                Logger.Warn("Another instance of ITB.Agent is already running. Exiting cleanly.");
                return;
            }

            Console.CancelKeyPress += (sender, eventArgs) =>
            {
                Logger.Info("Shutdown signal received. Stopping agent...");
                eventArgs.Cancel = true;
                _cts.Cancel();
            };

            AppDomain.CurrentDomain.ProcessExit += (sender, eventArgs) =>
            {
                if (!_cts.IsCancellationRequested) _cts.Cancel();
            };

            try
            {
                using var engine = new AgentEngine(config);
                await engine.StartAsync(_cts.Token).ConfigureAwait(false);
            }
            catch (OperationCanceledException)
            {
                Logger.Info("Agent loop cancelled gracefully.");
            }
            catch (Exception ex)
            {
                Logger.Error($"Unhandled exception in Agent execution: {ex.Message}");
            }
            finally
            {
                Logger.Info("Agent exited cleanly.");
            }
        }
    }
}