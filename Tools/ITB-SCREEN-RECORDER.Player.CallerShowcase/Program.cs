using System;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Player.Core.Ipc;

namespace ITB_SCREEN_RECORDER.Player.CallerShowcase;

/// <summary>
/// Reference showcase application demonstrating how external third-party applications
/// (CAD, C2, CRM, Dispatch) securely launch, control, and monitor ITB Player sessions.
/// </summary>
public static class Program
{
    private static DateTime _lastKnownPlayheadUtc = DateTime.UtcNow;
    private static bool _isPlaying = true;
    private static int _currentAudioIdx = 0;
    private static readonly string[] SampleStations = new[] { "WS-ALPHA", "WS-BRAVO", "WS-CHARLIE", "WS-DELTA" };

    public static async Task Main(string[] args)
    {
        Console.OutputEncoding = System.Text.Encoding.UTF8;
        PrintHeader();

        // 1. Locate ITB Player Executable
        string playerExe = LocatePlayerExecutable();
        if (string.IsNullOrEmpty(playerExe) || !File.Exists(playerExe))
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine($"[ERROR] ITB Player executable not found.");
            Console.WriteLine("Please build the player first: dotnet build Tools/ITB-SCREEN-RECORDER.Player/ITB-SCREEN-RECORDER.Player.csproj");
            Console.ResetColor();
            return;
        }

        Console.ForegroundColor = ConsoleColor.Green;
        Console.WriteLine($"[FOUND] Player Binary: {playerExe}");
        Console.ResetColor();
        Console.WriteLine();

        // 2. Configure Replay Parameters
        var now = DateTime.UtcNow;
        var replayParams = new ReplayLaunchParams
        {
            Stations = SampleStations.ToList(),
            StartTimeUtc = now.AddMinutes(-20),
            EndTimeUtc = now,
            SeekTimeUtc = now.AddMinutes(-8),
            AudioStation = SampleStations[0],
            KeystrokeMode = "BurnIn",
            MulticastAddress = "239.210.1.5",
            MulticastPort = 5098
        };

        Console.ForegroundColor = ConsoleColor.Cyan;
        Console.WriteLine("=== REPLAY SESSION SPECIFICATION ===");
        Console.WriteLine($"  Workstations : {string.Join(", ", replayParams.Stations)}");
        Console.WriteLine($"  Range Start  : {replayParams.StartTimeUtc:yyyy-MM-dd HH:mm:ss} UTC");
        Console.WriteLine($"  Range End    : {replayParams.EndTimeUtc:yyyy-MM-dd HH:mm:ss} UTC");
        Console.WriteLine($"  Initial Seek : {replayParams.SeekTimeUtc:yyyy-MM-dd HH:mm:ss} UTC");
        Console.WriteLine($"  Audio Solo   : {replayParams.AudioStation}");
        Console.WriteLine($"  Keystrokes   : {replayParams.KeystrokeMode}");
        Console.WriteLine($"  Discovery    : {replayParams.MulticastAddress}:{replayParams.MulticastPort}");
        Console.WriteLine("====================================");
        Console.ResetColor();
        Console.WriteLine();

        Console.WriteLine("Press [ENTER] to launch ITB Player over Encrypted Duplex IPC...");
        Console.ReadLine();

        // 3. Initialize Secure Launcher
        await using var launcher = new PlayerSecureLauncher();

        // Wire event handlers
        launcher.OnStateChanged += (sender, state) =>
        {
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine($"[STATE TRANSITION] ===> {state}");
            Console.ResetColor();
        };

        launcher.OnEventReceived += (sender, ev) =>
        {
            if (string.Equals(ev.EventType, "STATE_CHANGED", StringComparison.OrdinalIgnoreCase))
            {
                Console.ForegroundColor = ConsoleColor.Cyan;
                string prog = ev.ProgressPercent.HasValue ? $" ({ev.ProgressPercent}%)" : "";
                Console.WriteLine($"[EVENT] {ev.State}{prog}: {ev.Message}");
                Console.ResetColor();
            }
            else if (string.Equals(ev.EventType, "COMMAND_ACK", StringComparison.OrdinalIgnoreCase))
            {
                Console.ForegroundColor = ConsoleColor.DarkGray;
                Console.WriteLine($"[COMMAND ACK] ID: {ev.CommandId} | Success: {ev.Success}");
                Console.ResetColor();
            }
        };

        launcher.OnHeartbeatReceived += (sender, hb) =>
        {
            if (hb.CurrentPlayheadUtc.HasValue) _lastKnownPlayheadUtc = hb.CurrentPlayheadUtc.Value;
            if (hb.IsPlaying.HasValue) _isPlaying = hb.IsPlaying.Value;

            Console.ForegroundColor = ConsoleColor.Green;
            Console.Write($"\r[HEARTBEAT] Playhead: {hb.CurrentPlayheadUtc:HH:mm:ss.fff} UTC | Playing: {hb.IsPlaying} | Rate: {hb.PlaybackRate:0.0}x | Audio: {hb.ActiveAudioStation,-10} | Time: {hb.TimelineSeconds:0.0}s / {hb.TotalDurationSeconds:0.0}s   ");
            Console.ResetColor();
        };

        launcher.OnErrorReceived += (sender, err) =>
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine($"\n[SECURITY/ENGINE ALERT] Code: {err.ErrorCode} | Fatal: {err.IsFatal}");
            Console.WriteLine($"  Message: {err.Message}");
            if (err.ErrorDetails != null)
            {
                foreach (var (k, v) in err.ErrorDetails)
                {
                    Console.WriteLine($"  Detail: {k} = {v}");
                }
            }
            Console.ResetColor();
        };

        Console.ForegroundColor = ConsoleColor.Magenta;
        Console.WriteLine($"[SECURITY] Generated 256-bit AES Ephemeral Session Key.");
        Console.WriteLine($"[SECURITY] Restricted Named Pipe: \\\\.\\pipe\\{launcher.PipeName}");
        Console.WriteLine($"[SECURITY] Transmitting key exclusively via child process kernel stdin pipe...");
        Console.ResetColor();

        // 4. Launch Player Process
        using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(30));
        try
        {
            await launcher.LaunchAsync(playerExe, replayParams, ct: cts.Token);
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine("\n[CONNECTED] Handshake complete! Duplex encrypted IPC link established.");
            Console.ResetColor();
        }
        catch (Exception ex)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine($"\n[LAUNCH FAILED] {ex.Message}");
            Console.ResetColor();
            return;
        }

        // 5. Interactive Tactical Remote Control Loop
        PrintControlsMenu();

        bool running = true;
        while (running && launcher.IsConnected)
        {
            if (!Console.KeyAvailable)
            {
                await Task.Delay(100);
                continue;
            }

            var key = Console.ReadKey(intercept: true);
            switch (key.Key)
            {
                case ConsoleKey.Spacebar:
                    if (_isPlaying)
                    {
                        Console.WriteLine("\n[COMMAND] -> PAUSE");
                        await launcher.PauseAsync();
                    }
                    else
                    {
                        Console.WriteLine("\n[COMMAND] -> PLAY");
                        await launcher.PlayAsync();
                    }
                    break;

                case ConsoleKey.S:
                    var targetSeek = _lastKnownPlayheadUtc.AddSeconds(30);
                    Console.WriteLine($"\n[COMMAND] -> SEEK (+30s to {targetSeek:HH:mm:ss} UTC)");
                    await launcher.SeekAsync(targetSeek);
                    break;

                case ConsoleKey.D1:
                    Console.WriteLine("\n[COMMAND] -> SET_RATE (1.0x Normal)");
                    await launcher.SetPlaybackRateAsync(1.0);
                    break;

                case ConsoleKey.D2:
                    Console.WriteLine("\n[COMMAND] -> SET_RATE (2.0x Double)");
                    await launcher.SetPlaybackRateAsync(2.0);
                    break;

                case ConsoleKey.D4:
                    Console.WriteLine("\n[COMMAND] -> SET_RATE (4.0x Fast)");
                    await launcher.SetPlaybackRateAsync(4.0);
                    break;

                case ConsoleKey.A:
                    _currentAudioIdx = (_currentAudioIdx + 1) % SampleStations.Length;
                    string nextStation = SampleStations[_currentAudioIdx];
                    Console.WriteLine($"\n[COMMAND] -> SET_AUDIO (Switch Solo to {nextStation})");
                    await launcher.SetAudioStationAsync(nextStation);
                    break;

                case ConsoleKey.H:
                    Console.WriteLine("\n[COMMAND] -> GET_STATUS (Polling Heartbeat)");
                    await launcher.GetStatusAsync();
                    break;

                case ConsoleKey.Q:
                case ConsoleKey.Escape:
                    Console.WriteLine("\n[COMMAND] -> CLOSE (Graceful shutdown)");
                    await launcher.CloseAsync();
                    running = false;
                    break;
            }
        }

        Console.ForegroundColor = ConsoleColor.Cyan;
        Console.WriteLine("\n[SESSION TERMINATED] Showcase ended gracefully.");
        Console.ResetColor();
    }

    private static void PrintHeader()
    {
        Console.ForegroundColor = ConsoleColor.Cyan;
        Console.WriteLine(@"
██╗████████╗██████╗     ██████╗ ██╗      █████╗ ██╗   ██╗███████╗██████╗ 
██║╚══██╔══╝██╔══██╗    ██╔══██╗██║     ██╔══██╗╚██╗ ██╔╝██╔════╝██╔══██╗
██║   ██║   ██████╔╝    ██████╔╝██║     ███████║ ╚████╔╝ █████╗  ██████╔╝
██║   ██║   ██╔══██╗    ██╔═══╝ ██║     ██╔══██║  ╚██╔╝  ██╔══╝  ██╔══██╗
██║   ██║   ██████╔╝    ██║     ███████╗██║  ██║   ██║   ███████╗██║  ██║
╚═╝   ╚═╝   ╚═════╝     ╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝
                CALLER INTEGRATION SHOWCASE & TACTICAL C2                ");
        Console.ForegroundColor = ConsoleColor.DarkCyan;
        Console.WriteLine("  Encrypted Duplex IPC (AES-256-GCM + Anti-Replay + Private Kernel Stdin)");
        Console.WriteLine("==========================================================================");
        Console.ResetColor();
        Console.WriteLine();
    }

    private static void PrintControlsMenu()
    {
        Console.WriteLine();
        Console.ForegroundColor = ConsoleColor.DarkYellow;
        Console.WriteLine("┌────────────────────────────────────────────────────────────────────────┐");
        Console.WriteLine("│ TACTICAL REMOTE CONTROL - DISPATCH ENCRYPTED COMMANDS:                 │");
        Console.WriteLine("│   [SPACE] Toggle Play / Pause                                          │");
        Console.WriteLine("│   [S]     Seek (+30 seconds forward)                                   │");
        Console.WriteLine("│   [1]     Set Speed 1.0x (Normal)                                      │");
        Console.WriteLine("│   [2]     Set Speed 2.0x (Double)                                      │");
        Console.WriteLine("│   [4]     Set Speed 4.0x (Fast)                                        │");
        Console.WriteLine("│   [A]     Switch Active Solo Audio Station                             │");
        Console.WriteLine("│   [H]     Request Immediate Status Heartbeat                           │");
        Console.WriteLine("│   [Q]     Close ITB Player & Exit                                      │");
        Console.WriteLine("└────────────────────────────────────────────────────────────────────────┘");
        Console.ResetColor();
        Console.WriteLine();
    }

    private static string LocatePlayerExecutable()
    {
        string baseDir = AppContext.BaseDirectory;
        string[] candidates = new[]
        {
            // Debug build output
            Path.GetFullPath(Path.Combine(baseDir, @"..\..\..\..\ITB-SCREEN-RECORDER.Player\bin\Debug\net8.0-windows\ITB-SCREEN-RECORDER.Player.exe")),
            // Release build output
            Path.GetFullPath(Path.Combine(baseDir, @"..\..\..\..\ITB-SCREEN-RECORDER.Player\bin\Release\net8.0-windows\ITB-SCREEN-RECORDER.Player.exe")),
            // Solution publish build
            Path.GetFullPath(Path.Combine(baseDir, @"..\..\..\..\..\Publish\Player\windows\Build\ITB-SCREEN-RECORDER.Player.exe")),
            // Production install location
            @"C:\Program Files\ITB\Player\ITB-SCREEN-RECORDER.Player.exe"
        };

        foreach (var candidate in candidates)
        {
            if (File.Exists(candidate)) return candidate;
        }

        return candidates[0]; // fallback
    }
}
