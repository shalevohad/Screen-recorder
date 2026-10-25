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
        private Microsoft.Win32.PowerModeChangedEventHandler? _powerHandler;
        private EventHandler? _displayHandler;
        private readonly CancellationTokenSource _guardCts = new();
        private bool _wasDesktopInaccessible = false;

        public WindowsDesktopSessionGuard(Action onSessionRestored, Action? onDisplaySettingsChanged = null)
        {
            _onSessionRestored = onSessionRestored ?? throw new ArgumentNullException(nameof(onSessionRestored));
            _onDisplaySettingsChanged = onDisplaySettingsChanged;

            _switchHandler = (s, e) =>
            {
                if (e.Reason == Microsoft.Win32.SessionSwitchReason.SessionUnlock ||
                    e.Reason == Microsoft.Win32.SessionSwitchReason.SessionLogon ||
                    e.Reason == Microsoft.Win32.SessionSwitchReason.ConsoleConnect ||
                    e.Reason == Microsoft.Win32.SessionSwitchReason.RemoteConnect)
                {
                    Logger.Info($"[SessionGuard] Windows session event ({e.Reason}) detected. Scheduling recovery...");
                    _ = Task.Run(async () =>
                    {
                        await Task.Delay(500).ConfigureAwait(false);
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

            _powerHandler = (s, e) =>
            {
                if (e.Mode == Microsoft.Win32.PowerModes.Resume)
                {
                    Logger.Info("[SessionGuard] Windows PowerModes.Resume detected (woke from sleep/modern standby). Scheduling recovery...");
                    _ = Task.Run(async () =>
                    {
                        await Task.Delay(1500).ConfigureAwait(false); // Give GPU/display drivers 1.5s to restore
                        _onSessionRestored();
                    });
                }
            };

            try
            {
                Microsoft.Win32.SystemEvents.PowerModeChanged += _powerHandler;
            }
            catch (Exception ex)
            {
                Logger.Warn($"[SessionGuard] Failed to register Windows PowerModeChanged: {ex.Message}");
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

            // 💡 Proactive background watchdog: checks every 2s for desktop restoration even if Windows message pump was delayed
            Task.Run(async () =>
            {
                var ct = _guardCts.Token;
                while (!ct.IsCancellationRequested)
                {
                    try
                    {
                        await Task.Delay(2000, ct).ConfigureAwait(false);
                        bool isAttached = ITBRecorderAgent.Providers.Video.DesktopSecurityManager.TryAttachToInputDesktop();
                        if (isAttached)
                        {
                            if (_wasDesktopInaccessible)
                            {
                                _wasDesktopInaccessible = false;
                                Logger.Info("[SessionGuard:Watchdog] Desktop became accessible after lock/sleep. Triggering session restoration...");
                                _onSessionRestored();
                            }
                        }
                        else
                        {
                            _wasDesktopInaccessible = true;
                        }
                    }
                    catch (OperationCanceledException) { break; }
                    catch { }
                }
            }, _guardCts.Token);
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
            try { _guardCts.Cancel(); } catch { }
            try { _guardCts.Dispose(); } catch { }

            if (_switchHandler != null)
            {
                try { Microsoft.Win32.SystemEvents.SessionSwitch -= _switchHandler; } catch { }
            }
            if (_powerHandler != null)
            {
                try { Microsoft.Win32.SystemEvents.PowerModeChanged -= _powerHandler; } catch { }
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