using System;
using System.Diagnostics;
using System.IO;
using System.IO.Pipes;
using System.Security.Cryptography;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

#if WINDOWS
using System.Security.AccessControl;
using System.Security.Principal;
#endif

namespace ITB_SCREEN_RECORDER.Player.Core.Ipc;

/// <summary>
/// Client SDK component used by external calling applications (CAD, C2, CRM, or Dispatch software)
/// to securely launch, control, and monitor ITB Player sessions over an encrypted, tamper-proof duplex IPC channel.
/// </summary>
public sealed class PlayerSecureLauncher : IAsyncDisposable, IDisposable
{
    private readonly string _pipeName;
    private readonly byte[] _sessionKey;
    private NamedPipeServerStream? _pipeServer;
    private SecureIpcChannel? _channel;
    private Process? _playerProcess;
    private CancellationTokenSource? _sessionCts;
    private Task? _readLoopTask;
    private bool _disposed;

    public string PipeName => _pipeName;
    public bool IsConnected => _pipeServer?.IsConnected == true && _channel != null;
    public Process? PlayerProcess => _playerProcess;

    public event EventHandler<PlayerIpcEvent>? OnEventReceived;
    public event EventHandler<PlayerIpcEvent>? OnHeartbeatReceived;
    public event EventHandler<PlayerIpcEvent>? OnErrorReceived;
    public event EventHandler<string>? OnStateChanged;

    public PlayerSecureLauncher(string? pipeName = null, byte[]? sessionKey = null)
    {
        _pipeName = string.IsNullOrWhiteSpace(pipeName)
            ? $"ITB_Player_IPC_{Guid.NewGuid():N}"
            : pipeName.Trim();

        if (sessionKey != null)
        {
            if (sessionKey.Length != 32)
                throw new ArgumentException("Session key must be exactly 32 bytes (256-bit AES key).", nameof(sessionKey));
            _sessionKey = (byte[])sessionKey.Clone();
        }
        else
        {
            _sessionKey = new byte[32];
            RandomNumberGenerator.Fill(_sessionKey);
        }
    }

    /// <summary>
    /// Launches the ITB Player executable with redirected stdin, transmits the ephemeral session key,
    /// establishes the secure duplex IPC channel, and optionally initializes a replay session.
    /// </summary>
    /// <param name="playerExecutablePath">Absolute path to itb-player.exe (or 'itb-player' on Linux).</param>
    /// <param name="initialReplayParams">Optional replay parameters to launch immediately.</param>
    /// <param name="connectTimeoutMs">Maximum time to wait for player connection (default: 15000ms).</param>
    /// <param name="ct">Cancellation token.</param>
    public async Task LaunchAsync(
        string playerExecutablePath,
        ReplayLaunchParams? initialReplayParams = null,
        int connectTimeoutMs = 15000,
        CancellationToken ct = default)
    {
        ObjectDisposedException.ThrowIf(_disposed, this);

        if (!File.Exists(playerExecutablePath))
        {
            throw new FileNotFoundException($"ITB Player executable not found at: {playerExecutablePath}", playerExecutablePath);
        }

        // 1. Create secure pipe server restricted to current user SID
        _pipeServer = CreateRestrictedPipeServer(_pipeName);

        // 2. Start ITB Player process with redirected stdin
        string args = $"--pipe \"{_pipeName}\"";
        var psi = new ProcessStartInfo
        {
            FileName = playerExecutablePath,
            Arguments = args,
            UseShellExecute = false,
            RedirectStandardInput = true,
            CreateNoWindow = false
        };

        _playerProcess = Process.Start(psi) ?? throw new InvalidOperationException("Failed to spawn ITB Player process.");

        // 3. Securely transmit ephemeral 256-bit AES key through the private kernel stdin pipe
        string keyBase64 = Convert.ToBase64String(_sessionKey);
        await _playerProcess.StandardInput.WriteLineAsync(keyBase64).ConfigureAwait(false);
        await _playerProcess.StandardInput.FlushAsync().ConfigureAwait(false);

        // 4. Wait for player to connect to the named pipe
        using var connectCts = CancellationTokenSource.CreateLinkedTokenSource(ct);
        connectCts.CancelAfter(connectTimeoutMs);

        try
        {
            await _pipeServer.WaitForConnectionAsync(connectCts.Token).ConfigureAwait(false);
        }
        catch (OperationCanceledException) when (!ct.IsCancellationRequested)
        {
            throw new TimeoutException($"ITB Player process failed to connect to IPC pipe '{_pipeName}' within {connectTimeoutMs}ms.");
        }

        // 5. Initialize encrypted AEAD channel
        _channel = new SecureIpcChannel(_pipeServer, _sessionKey);
        _sessionCts = new CancellationTokenSource();
        _readLoopTask = Task.Run(() => BackgroundReadLoopAsync(_sessionCts.Token));

        // 6. If initial replay parameters provided, dispatch INIT_REPLAY
        if (initialReplayParams != null)
        {
            await InitializeReplayAsync(initialReplayParams, ct).ConfigureAwait(false);
        }
    }

    /// <summary>
    /// Connects to an existing Player that is hosting an IPC pipe server (alternative connection model).
    /// </summary>
    public async Task ConnectToExistingPlayerAsync(
        NamedPipeClientStream clientStream,
        CancellationToken ct = default)
    {
        ObjectDisposedException.ThrowIf(_disposed, this);
        _channel = new SecureIpcChannel(clientStream, _sessionKey);
        _sessionCts = new CancellationTokenSource();
        _readLoopTask = Task.Run(() => BackgroundReadLoopAsync(_sessionCts.Token));
        await Task.CompletedTask;
    }

    /// <summary>
    /// Dispatches an encrypted command to initialize and start an automated multi-station replay session.
    /// </summary>
    public Task InitializeReplayAsync(ReplayLaunchParams parameters, CancellationToken ct = default)
    {
        var cmd = PlayerIpcCommand.InitReplay(parameters);
        return SendCommandAsync(cmd, ct);
    }

    public Task PlayAsync(CancellationToken ct = default) => SendCommandAsync(PlayerIpcCommand.Play(), ct);
    public Task PauseAsync(CancellationToken ct = default) => SendCommandAsync(PlayerIpcCommand.Pause(), ct);
    public Task SeekAsync(DateTime targetUtc, CancellationToken ct = default) => SendCommandAsync(PlayerIpcCommand.Seek(targetUtc), ct);
    public Task SetPlaybackRateAsync(double rate, CancellationToken ct = default) => SendCommandAsync(PlayerIpcCommand.SetRate(rate), ct);
    public Task SetAudioStationAsync(string station, CancellationToken ct = default) => SendCommandAsync(PlayerIpcCommand.SetAudioStation(station), ct);
    public Task GetStatusAsync(CancellationToken ct = default) => SendCommandAsync(PlayerIpcCommand.GetStatus(), ct);
    public Task CloseAsync(CancellationToken ct = default) => SendCommandAsync(PlayerIpcCommand.Close(), ct);

    /// <summary>
    /// Sends an encrypted, authenticated command to ITB Player.
    /// </summary>
    public async Task SendCommandAsync(PlayerIpcCommand command, CancellationToken ct = default)
    {
        ObjectDisposedException.ThrowIf(_disposed, this);
        if (_channel == null || !IsConnected)
        {
            throw new InvalidOperationException("Encrypted IPC channel is not connected.");
        }

        string json = JsonSerializer.Serialize(command);
        await _channel.SendMessageAsync(json, ct).ConfigureAwait(false);
    }

    private async Task BackgroundReadLoopAsync(CancellationToken ct)
    {
        try
        {
            while (!ct.IsCancellationRequested && _channel != null)
            {
                string json = await _channel.ReceiveMessageAsync(ct).ConfigureAwait(false);
                if (string.IsNullOrWhiteSpace(json)) continue;

                var ev = JsonSerializer.Deserialize<PlayerIpcEvent>(json);
                if (ev == null) continue;

                OnEventReceived?.Invoke(this, ev);

                if (string.Equals(ev.EventType, "HEARTBEAT", StringComparison.OrdinalIgnoreCase))
                {
                    OnHeartbeatReceived?.Invoke(this, ev);
                }
                else if (string.Equals(ev.EventType, "ERROR", StringComparison.OrdinalIgnoreCase))
                {
                    OnErrorReceived?.Invoke(this, ev);
                }
                else if (string.Equals(ev.EventType, "STATE_CHANGED", StringComparison.OrdinalIgnoreCase))
                {
                    if (!string.IsNullOrEmpty(ev.State))
                    {
                        OnStateChanged?.Invoke(this, ev.State);
                    }
                }
            }
        }
        catch (OperationCanceledException)
        {
            // Graceful shutdown
        }
        catch (CryptographicException ex)
        {
            var tamperingEvent = PlayerIpcEvent.Error(
                PlayerErrorCodes.ErrTamperingDetected,
                $"Security alert: IPC message authentication failed (possible tampering detected): {ex.Message}",
                isFatal: true);
            OnErrorReceived?.Invoke(this, tamperingEvent);
        }
        catch (Exception ex)
        {
            var errEvent = PlayerIpcEvent.Error(
                PlayerErrorCodes.ErrGeneralException,
                $"IPC channel exception: {ex.Message}",
                isFatal: false);
            OnErrorReceived?.Invoke(this, errEvent);
        }
    }

    private static NamedPipeServerStream CreateRestrictedPipeServer(string pipeName)
    {
        if (OperatingSystem.IsWindows())
        {
#if WINDOWS
            // Restrict pipe ACL strictly to the current user SID (prevents other local processes/users from connecting)
            var pipeSecurity = new PipeSecurity();
            var currentUser = WindowsIdentity.GetCurrent().User;
            if (currentUser != null)
            {
                pipeSecurity.AddAccessRule(new PipeAccessRule(
                    currentUser,
                    PipeAccessRights.ReadWrite,
                    AccessControlType.Allow));
            }

            return NamedPipeServerStreamAcl.Create(
                pipeName,
                PipeDirection.InOut,
                1,
                PipeTransmissionMode.Byte,
                PipeOptions.Asynchronous,
                0,
                0,
                pipeSecurity);
#else
            return new NamedPipeServerStream(pipeName, PipeDirection.InOut, 1, PipeTransmissionMode.Byte, PipeOptions.Asynchronous);
#endif
        }

        return new NamedPipeServerStream(pipeName, PipeDirection.InOut, 1, PipeTransmissionMode.Byte, PipeOptions.Asynchronous);
    }

    public async ValueTask DisposeAsync()
    {
        if (_disposed) return;
        _disposed = true;

        _sessionCts?.Cancel();
        if (_readLoopTask != null)
        {
            try { await _readLoopTask.ConfigureAwait(false); } catch { }
        }

        _channel?.Dispose();
        _pipeServer?.Dispose();
        _sessionCts?.Dispose();
        CryptographicOperations.ZeroMemory(_sessionKey);

        if (_playerProcess != null && !_playerProcess.HasExited)
        {
            try
            {
                _playerProcess.CloseMainWindow();
                if (!_playerProcess.WaitForExit(3000))
                {
                    _playerProcess.Kill(entireProcessTree: true);
                }
            }
            catch { }
            finally
            {
                _playerProcess.Dispose();
            }
        }
    }

    public void Dispose()
    {
        DisposeAsync().AsTask().GetAwaiter().GetResult();
    }
}
