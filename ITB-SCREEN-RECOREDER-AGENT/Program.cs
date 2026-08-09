using System;
using System.Threading;
using System.Threading.Tasks;
using ITBRecorderAgent.Core;

namespace ITBRecorderAgent
{
    internal class Program
    {
        private static Mutex? _singleInstanceMutex;
        private static readonly CancellationTokenSource _cts = new CancellationTokenSource();

        private static async Task Main(string[] args)
        {
            // שם אבסולוטי וגלובלי ל-Mutex במערכת ההפעלה
            string mutexName = @"Global\ITB_SCREEN_RECORDER_AGENT_SINGLETON";
            bool hasHandle = false;

            try
            {
                _singleInstanceMutex = new Mutex(true, mutexName, out bool createdNew);

                if (!createdNew)
                {
                    Logger.Warn("Another instance of ITB.Agent is already running. Exiting cleanly.");
                    return;
                }

                hasHandle = true;

                // רישום מאזין לאירועי סגירה (Ctrl+C / Process Termination)
                Console.CancelKeyPress += (sender, eventArgs) =>
                {
                    Logger.Info("Shutdown signal received. Stopping agent...");
                    eventArgs.Cancel = true; // מניעת קריסה מיידית ואפשרות לסגירה מסודרת
                    _cts.Cancel();
                };

                AppDomain.CurrentDomain.ProcessExit += (sender, eventArgs) =>
                {
                    if (!_cts.IsCancellationRequested)
                    {
                        _cts.Cancel();
                    }
                };

                // טעינת תצורה והרצת ה-Engine
                AppConfig config = ConfigLoader.Load();
                using (var engine = new AgentEngine(config))
                {
                    await engine.StartAsync(_cts.Token).ConfigureAwait(false);
                }
            }
            catch (OperationCanceledException)
            {
                // סגירה נקייה ומבוקרת עקב ביטול ה-CancellationToken
                Logger.Info("Agent loop cancelled gracefully.");
            }
            catch (Exception ex)
            {
                Logger.Error($"Unhandled exception in Agent execution: {ex.Message}");
            }
            finally
            {
                // שחרור בטוח של ה-Mutex
                if (_singleInstanceMutex != null)
                {
                    if (hasHandle)
                    {
                        try
                        {
                            _singleInstanceMutex.ReleaseMutex();
                        }
                        catch (ApplicationException)
                        {
                            // התעלמות מאי-התאמת Thread בעת סגירת התהליך ב-OS
                        }
                    }
                    _singleInstanceMutex.Dispose();
                    _singleInstanceMutex = null;
                }

                Logger.Info("Agent exited cleanly.");
            }
        }
    }
}