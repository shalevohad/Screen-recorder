using System;
using System.Threading;
using System.Threading.Tasks;
using System.Runtime.Versioning;
using ITB_SCREEN_RECORDER.Core.Common;
using ITBRecorderAgent.Providers.Video;

namespace ITBRecorderAgent.Providers.Video
{
    public interface ISessionGuard : IDisposable
    {
        Task MonitorUntilRestoredAsync(CancellationToken ct);
    }

    public static class SessionGuardFactory
    {
        public static ISessionGuard Create(Action onSessionRestored)
        {
            if (OperatingSystem.IsWindows())
            {
                return new WindowsDesktopSessionGuard(onSessionRestored);
            }

            return new LinuxDesktopSessionGuard(onSessionRestored);
        }
    }

    [SupportedOSPlatform("windows")]
    internal sealed class WindowsDesktopSessionGuard : ISessionGuard
    {
        private readonly Action _onSessionRestored;
        private Microsoft.Win32.SessionSwitchEventHandler? _switchHandler;

        public WindowsDesktopSessionGuard(Action onSessionRestored)
        {
            _onSessionRestored = onSessionRestored ?? throw new ArgumentNullException(nameof(onSessionRestored));

            _switchHandler = (s, e) =>
            {
                if (e.Reason == Microsoft.Win32.SessionSwitchReason.SessionUnlock)
                {
                    Logger.Info("[SessionGuard] Windows SessionUnlock detected. Scheduling recovery...");
                    _ = Task.Run(async () =>
                    {
                        await Task.Delay(400).ConfigureAwait(false);
                        _onSessionRestored();
                    });
                }
            };

            try
            {
                Microsoft.Win32.SystemEvents.SessionSwitch += _switchHandler;
            }
            catch (Exception ex)
            {
                Logger.Warn($"[SessionGuard] Failed to register Windows SessionSwitch: {ex.Message}");
            }
        }

        public async Task MonitorUntilRestoredAsync(CancellationToken ct)
        {
            Logger.Warn("[SessionGuard] Capture lost. Probing for desktop recovery...");
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
                    // שולחן העבודה עדיין נעול או אינו נגיש
                }
            }
        }

        public void Dispose()
        {
            if (_switchHandler != null)
            {
                try { Microsoft.Win32.SystemEvents.SessionSwitch -= _switchHandler; } catch { }
            }
        }
    }

    internal sealed class LinuxDesktopSessionGuard : ISessionGuard
    {
        private readonly Action _onSessionRestored;

        public LinuxDesktopSessionGuard(Action onSessionRestored)
        {
            _onSessionRestored = onSessionRestored ?? throw new ArgumentNullException(nameof(onSessionRestored));
        }

        public async Task MonitorUntilRestoredAsync(CancellationToken ct)
        {
            Logger.Warn("[SessionGuard] Linux capture device lost (X11/Wayland). Probing for display recovery...");
            while (!ct.IsCancellationRequested)
            {
                await Task.Delay(750, ct).ConfigureAwait(false);
                try
                {
                    using var probe = ScreenCaptureFactory.Create();
                    probe.Initialize();

                    Logger.Info("[SessionGuard] Linux display server reconnected successfully.");
                    await Task.Delay(300, ct).ConfigureAwait(false);
                    _onSessionRestored();
                    return;
                }
                catch
                {
                    // תצוגת X11/Wayland טרם התאוששה
                }
            }
        }

        public void Dispose() { }
    }
}