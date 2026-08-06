using System;
using System.Threading;
using System.Threading.Tasks;
using ITBRecorderAgent.Core;

namespace ITBRecorderAgent
{
    internal class Program
    {
        private static Mutex? _singleInstanceMutex;

        static async Task Main(string[] args)
        {
            const string mutexName = @"Global\ITBRecorderAgent_SingleInstance_Mutex";
            _singleInstanceMutex = new Mutex(true, mutexName, out bool createdNew);

            if (!createdNew)
            {
                Console.WriteLine("[WARNING] Active duplicate instance detected. Exiting.");
                return;
            }

            // טעינת ההגדרות מ-appsettings.json
            AppConfig config = ConfigLoader.Load();

            // אתחול הנתיב בלוגר (אם השדה ריק ב-JSON - ייפול אוטומטית ל-Temp)
            Logger.Initialize(config.LogFilePath);

            Logger.Info("Starting ITBRecorderAgent (.NET 8 Edge Agent)...");

            using var engine = new AgentEngine(config);
            using var cts = new CancellationTokenSource();

            Console.CancelKeyPress += (s, e) =>
            {
                e.Cancel = true;
                Logger.Info("Shutdown signal received. Stopping agent...");
                cts.Cancel();
            };

            try
            {
                await engine.StartAsync(cts.Token);
            }
            finally
            {
                _singleInstanceMutex.ReleaseMutex();
            }
        }
    }
}