using System;
using System.Threading;
using System.Threading.Tasks;
using System.Runtime.Versioning;
using ITB_SCREEN_RECORDER.Core.Common;
using ITBRecorderAgent.Providers.Video;

namespace ITB_SCREEN_RECORDER.AgentWorker.Providers.Video
{
    public interface ISessionGuard : IDisposable
    {
        Task MonitorUntilRestoredAsync(CancellationToken ct);
    }

    public static class SessionGuardFactory
    {
        public static ISessionGuard Create(Action onSessionRestored, Action? onDisplaySettingsChanged = null)
        {
#if WINDOWS
            if (OperatingSystem.IsWindows())
            {
                return new WindowsDesktopSessionGuard(onSessionRestored, onDisplaySettingsChanged);
            }
#endif
            return new LinuxDesktopSessionGuard(onSessionRestored, onDisplaySettingsChanged);
        }
    }

#if WINDOWS
    [SupportedOSPlatform("windows")]
    internal sealed class WindowsDesktopSessionGuard : ISessionGuard
    {
        private readonly Action _onSessionRestored;
        private readonly Action? _onDisplaySettingsChanged;
        private Microsoft.Win32.SessionSwitchEventHandler? _switchHandler;
        private EventHandler? _displayHandler;

        public WindowsDesktopSessionGuard(Action onSessionRestored, Action? onDisplaySettingsChanged = null)
        {
            _onSessionRestored = onSessionRestored ?? throw new ArgumentNullException(nameof(onSessionRestored));
            _onDisplaySettingsChanged = onDisplaySettingsChanged;

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

            _displayHandler = (s, e) =>
            {
                Logger.Info("[SessionGuard] Windows DisplaySettingsChanged detected. Scheduling topology refresh...");
                _ = Task.Run(async () =>
                {
                    await Task.Delay(500).ConfigureAwait(false);
                    _onDisplaySettingsChanged?.Invoke();
                });
            };

            try
            {
                Microsoft.Win32.SystemEvents.DisplaySettingsChanged += _displayHandler;
            }
            catch (Exception ex)
            {
                Logger.Warn($"[SessionGuard] Failed to register Windows DisplaySettingsChanged: {ex.Message}");
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
            if (_displayHandler != null)
            {
                try { Microsoft.Win32.SystemEvents.DisplaySettingsChanged -= _displayHandler; } catch { }
            }
        }
    }
#endif

    internal sealed class LinuxDesktopSessionGuard : ISessionGuard
    {
        private readonly Action _onSessionRestored;
        private readonly Action? _onDisplaySettingsChanged;
        private readonly CancellationTokenSource _cts = new();
        private int _lastMonitorCount = -1;

        public LinuxDesktopSessionGuard(Action onSessionRestored, Action? onDisplaySettingsChanged = null)
        {
            _onSessionRestored = onSessionRestored ?? throw new ArgumentNullException(nameof(onSessionRestored));
            _onDisplaySettingsChanged = onDisplaySettingsChanged;

            if (_onDisplaySettingsChanged != null)
            {
                _ = Task.Run(() => MonitorLinuxDisplayHotPlugAsync(_cts.Token));
            }
        }

        private async Task MonitorLinuxDisplayHotPlugAsync(CancellationToken ct)
        {
            try
            {
                var initial = LinuxX11DisplayEnumerator.EnumerateDisplays();
                _lastMonitorCount = initial.Count;
            }
            catch { }

            while (!ct.IsCancellationRequested)
            {
                try
                {
                    await Task.Delay(3000, ct).ConfigureAwait(false);
                    var current = LinuxX11DisplayEnumerator.EnumerateDisplays();
                    if (_lastMonitorCount != -1 && current.Count != _lastMonitorCount)
                    {
                        Logger.Info($"[SessionGuard:Linux] Display count changed from {_lastMonitorCount} to {current.Count}. Scheduling topology refresh...");
                        _lastMonitorCount = current.Count;
                        _onDisplaySettingsChanged?.Invoke();
                    }
                }
                catch (OperationCanceledException) { break; }
                catch { }
            }
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

        public void Dispose()
        {
            try { _cts.Cancel(); _cts.Dispose(); } catch { }
        }
    }
}