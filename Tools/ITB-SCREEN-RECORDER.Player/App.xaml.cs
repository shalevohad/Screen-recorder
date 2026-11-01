using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Windows;
using ITB_SCREEN_RECORDER.Player.Core.Ipc;
using ITB_SCREEN_RECORDER.Player.ViewModels;
using ITB_SCREEN_RECORDER.Player.Views;

namespace ITB_SCREEN_RECORDER.Player;

/// <summary>
/// Application startup lifecycle handler.
/// Configures encrypted duplex IPC communication and CLI automated replay arguments.
/// </summary>
public partial class App : Application
{
    private PlayerSecureIpcService? _ipcService;

    protected override void OnStartup(StartupEventArgs e)
    {
        base.OnStartup(e);

        string? pipeName = null;
        string? directPackagePath = null;
        var replayParams = new ReplayLaunchParams();
        bool hasReplayParams = false;

        // Parse CLI arguments
        for (int i = 0; i < e.Args.Length; i++)
        {
            string arg = e.Args[i];

            if (arg.Equals("--pipe", StringComparison.OrdinalIgnoreCase) && i + 1 < e.Args.Length)
            {
                pipeName = e.Args[++i];
            }
            else if (arg.Equals("--package", StringComparison.OrdinalIgnoreCase) && i + 1 < e.Args.Length)
            {
                directPackagePath = e.Args[++i];
            }
            else if (arg.Equals("--stations", StringComparison.OrdinalIgnoreCase) && i + 1 < e.Args.Length)
            {
                replayParams.Stations = e.Args[++i].Split(new[] { ',', ';', ' ' }, StringSplitOptions.RemoveEmptyEntries).ToList();
                hasReplayParams = true;
            }
            else if (arg.Equals("--start", StringComparison.OrdinalIgnoreCase) && i + 1 < e.Args.Length)
            {
                if (DateTime.TryParse(e.Args[++i], out var start))
                {
                    replayParams.StartTimeUtc = start.ToUniversalTime();
                    hasReplayParams = true;
                }
            }
            else if (arg.Equals("--end", StringComparison.OrdinalIgnoreCase) && i + 1 < e.Args.Length)
            {
                if (DateTime.TryParse(e.Args[++i], out var end))
                {
                    replayParams.EndTimeUtc = end.ToUniversalTime();
                    hasReplayParams = true;
                }
            }
            else if (arg.Equals("--seek", StringComparison.OrdinalIgnoreCase) && i + 1 < e.Args.Length)
            {
                if (DateTime.TryParse(e.Args[++i], out var seek))
                {
                    replayParams.SeekTimeUtc = seek.ToUniversalTime();
                }
            }
            else if (arg.Equals("--audio", StringComparison.OrdinalIgnoreCase) && i + 1 < e.Args.Length)
            {
                replayParams.AudioStation = e.Args[++i];
            }
            else if (arg.Equals("--keystrokes", StringComparison.OrdinalIgnoreCase) && i + 1 < e.Args.Length)
            {
                replayParams.KeystrokeMode = e.Args[++i];
            }
            else if (arg.Equals("--mcast", StringComparison.OrdinalIgnoreCase) && i + 1 < e.Args.Length)
            {
                replayParams.MulticastAddress = e.Args[++i];
            }
            else if (arg.Equals("--port", StringComparison.OrdinalIgnoreCase) && i + 1 < e.Args.Length)
            {
                if (int.TryParse(e.Args[++i], out var port))
                {
                    replayParams.MulticastPort = port;
                }
            }
            else if (File.Exists(arg) && (arg.EndsWith(".tar", StringComparison.OrdinalIgnoreCase) || arg.EndsWith(".itbp", StringComparison.OrdinalIgnoreCase)))
            {
                directPackagePath = arg;
            }
        }

        // Initialize IPC and playback once MainWindow is ready
        Dispatcher.InvokeAsync(async () =>
        {
            if (MainWindow is not MainWindow win || win.DataContext is not MainViewModel vm) return;

            // 1. If IPC pipe requested, initialize PlayerSecureIpcService
            if (!string.IsNullOrWhiteSpace(pipeName))
            {
                try
                {
                    _ipcService = new PlayerSecureIpcService(pipeName);
                    vm.IpcService = _ipcService;

                    _ipcService.OnCommandReceived += async (sender, cmd) =>
                    {
                        await HandleIpcCommandAsync(cmd, vm);
                    };

                    _ = Task.Run(async () =>
                    {
                        try
                        {
                            await _ipcService.StartAsync();
                        }
                        catch (Exception ex)
                        {
                            System.Diagnostics.Debug.WriteLine($"[IPC:ERROR] Failed to start IPC service: {ex.Message}");
                        }
                    });
                }
                catch (Exception ex)
                {
                    System.Diagnostics.Debug.WriteLine($"[IPC:INIT:ERROR] {ex.Message}");
                }
            }

            // 2. Direct package load from CLI
            if (!string.IsNullOrWhiteSpace(directPackagePath) && File.Exists(directPackagePath))
            {
                await vm.LoadPackageAsync(directPackagePath);
            }
            // 3. Automated Replay from CLI
            else if (hasReplayParams && replayParams.Stations.Count > 0 && replayParams.StartTimeUtc < replayParams.EndTimeUtc)
            {
                await vm.HandleReplayRequestAsync(replayParams);
            }
        });
    }

    private async Task HandleIpcCommandAsync(PlayerIpcCommand cmd, MainViewModel vm)
    {
        switch (cmd.Command.ToUpperInvariant())
        {
            case "INIT_REPLAY":
                if (cmd.LaunchParams != null)
                {
                    await vm.HandleReplayRequestAsync(cmd.LaunchParams);
                }
                break;

            case "PLAY":
                Dispatcher.Invoke(() =>
                {
                    if (!vm.IsPlaying) vm.PlayPauseCommand.Execute(null);
                });
                break;

            case "PAUSE":
                Dispatcher.Invoke(() =>
                {
                    if (vm.IsPlaying) vm.PlayPauseCommand.Execute(null);
                });
                break;

            case "SEEK":
                Dispatcher.Invoke(() =>
                {
                    vm.SeekToUtc(cmd.TargetUtc);
                });
                break;

            case "SET_RATE":
                if (cmd.Rate.HasValue)
                {
                    Dispatcher.Invoke(() =>
                    {
                        vm.PlaybackRate = cmd.Rate.Value;
                    });
                }
                break;

            case "SET_AUDIO":
                if (!string.IsNullOrEmpty(cmd.AudioStation))
                {
                    Dispatcher.Invoke(() =>
                    {
                        vm.SetAudioSolo(cmd.AudioStation);
                    });
                }
                break;

            case "GET_STATUS":
                vm.EmitHeartbeatNow();
                break;

            case "CLOSE":
                Dispatcher.Invoke(() =>
                {
                    Shutdown();
                });
                break;
        }

        // Return command ACK
        if (_ipcService != null)
        {
            await _ipcService.PublishEventAsync(PlayerIpcEvent.CommandAck(cmd.CommandId, success: true));
        }
    }

    protected override void OnExit(ExitEventArgs e)
    {
        _ipcService?.Dispose();
        base.OnExit(e);
    }
}
