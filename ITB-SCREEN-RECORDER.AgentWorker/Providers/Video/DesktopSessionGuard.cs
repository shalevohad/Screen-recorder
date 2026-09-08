using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Win32;
using ITB_SCREEN_RECORDER.Core.Common;
using ITBRecorderAgent.Providers.Video;

namespace ITB_SCREEN_RECORDER.AgentWorker.Providers.Video
{
    public class DesktopSessionGuard : IDisposable
    {
        private readonly Action _onSessionRestored;
        private SessionSwitchEventHandler? _switchHandler;

        public DesktopSessionGuard(Action onSessionRestored)
        {
            _onSessionRestored = onSessionRestored ?? throw new ArgumentNullException(nameof(onSessionRestored));

            if (OperatingSystem.IsWindows())
            {
                _switchHandler = (s, e) =>
                {
                    if (e.Reason == SessionSwitchReason.SessionUnlock)
                    {
                        Logger.Info("[SessionGuard] Windows SessionUnlock detected. Triggering recovery...");
                        _ = Task.Run(async () =>
                        {
                            await Task.Delay(400);
                            _onSessionRestored();
                        });
                    }
                };

                try
                {
                    SystemEvents.SessionSwitch += _switchHandler;
                }
                catch (Exception ex)
                {
                    Logger.Warn($"[SessionGuard] Failed to hook SessionSwitch: {ex.Message}");
                }
            }
        }

        public async Task MonitorUntilRestoredAsync(CancellationToken ct)
        {
            Logger.Warn("[SessionGuard] Screen capture access lost. Monitoring for desktop restoration...");
            while (!ct.IsCancellationRequested)
            {
                await Task.Delay(500, ct).ConfigureAwait(false);
                try
                {
                    using var probe = ScreenCaptureFactory.Create();
                    probe.Initialize();

                    Logger.Info("[SessionGuard] Desktop session restored and accessible.");
                    await Task.Delay(300, ct).ConfigureAwait(false);
                    _onSessionRestored();
                    return;
                }
                catch
                {
                    // שולחן העבודה עדיין נעול
                }
            }
        }

        public void Dispose()
        {
            if (OperatingSystem.IsWindows() && _switchHandler != null)
            {
                try { SystemEvents.SessionSwitch -= _switchHandler; } catch { }
            }
        }
    }
}