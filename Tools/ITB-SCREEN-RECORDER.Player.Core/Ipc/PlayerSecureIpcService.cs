using System;
using System.IO;
using System.IO.Pipes;
using System.Security.Cryptography;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace ITB_SCREEN_RECORDER.Player.Core.Ipc;

/// <summary>
/// Server-side (Player) IPC endpoint that connects to the caller's secure named pipe,
/// decrypts commands using the ephemeral AES-256 session key received via stdin,
/// and streams encrypted lifecycle events, heartbeats, and error notifications.
/// </summary>
public sealed class PlayerSecureIpcService : IAsyncDisposable, IDisposable
{
    private readonly string _pipeName;
    private readonly byte[] _sessionKey;
    private NamedPipeClientStream? _pipeClient;
    private SecureIpcChannel? _channel;
    private CancellationTokenSource? _cts;
    private Task? _readLoopTask;
    private bool _disposed;

    public bool IsConnected => _pipeClient?.IsConnected == true && _channel != null;
    public string PipeName => _pipeName;

    public event EventHandler<PlayerIpcCommand>? OnCommandReceived;
    public event EventHandler<string>? OnConnectionStateChanged;

    public PlayerSecureIpcService(string pipeName, byte[]? sessionKey = null)
    {
        if (string.IsNullOrWhiteSpace(pipeName))
            throw new ArgumentException("Pipe name cannot be null or empty.", nameof(pipeName));

        _pipeName = pipeName.Trim();

        if (sessionKey != null)
        {
            if (sessionKey.Length != 32)
                throw new ArgumentException("Session key must be exactly 32 bytes (256-bit AES key).", nameof(sessionKey));
            _sessionKey = (byte[])sessionKey.Clone();
        }
        else
        {
            // Read 256-bit key from standard input (passed directly by parent process kernel stdin pipe)
            string? keyBase64 = Console.In.ReadLine();
            if (string.IsNullOrWhiteSpace(keyBase64))
            {
                throw new InvalidOperationException("Failed to read ephemeral IPC session key from StandardInput.");
            }

            try
            {
                _sessionKey = Convert.FromBase64String(keyBase64.Trim());
                if (_sessionKey.Length != 32)
                {
                    throw new CryptographicException("Received session key length is invalid (must be 32 bytes).");
                }
            }
            catch (FormatException ex)
            {
                throw new CryptographicException("Session key transmitted via stdin is not valid Base64.", ex);
            }
        }
    }

    /// <summary>
    /// Connects to the caller's secure Named Pipe and begins bidirectional encrypted communication.
    /// </summary>
    public async Task StartAsync(int timeoutMs = 10000, CancellationToken ct = default)
    {
        ObjectDisposedException.ThrowIf(_disposed, this);

        _pipeClient = new NamedPipeClientStream(".", _pipeName, PipeDirection.InOut, PipeOptions.Asynchronous);

        using var connectCts = CancellationTokenSource.CreateLinkedTokenSource(ct);
        connectCts.CancelAfter(timeoutMs);

        try
        {
            await _pipeClient.ConnectAsync(connectCts.Token).ConfigureAwait(false);
        }
        catch (OperationCanceledException) when (!ct.IsCancellationRequested)
        {
            throw new TimeoutException($"Timed out connecting to caller IPC pipe '{_pipeName}' after {timeoutMs}ms.");
        }

        _channel = new SecureIpcChannel(_pipeClient, _sessionKey);
        _cts = new CancellationTokenSource();
        _readLoopTask = Task.Run(() => BackgroundReadLoopAsync(_cts.Token));

        OnConnectionStateChanged?.Invoke(this, "CONNECTED");

        // Notify caller that player is connected and ready
        await PublishEventAsync(PlayerIpcEvent.StateChanged("CONNECTED", "Player securely connected to IPC pipe."), ct).ConfigureAwait(false);
    }

    /// <summary>
    /// Encrypts and publishes an event or error notification to the caller.
    /// </summary>
    public async Task PublishEventAsync(PlayerIpcEvent ev, CancellationToken ct = default)
    {
        ObjectDisposedException.ThrowIf(_disposed, this);
        if (_channel == null) return;

        try
        {
            string json = JsonSerializer.Serialize(ev);
            await _channel.SendMessageAsync(json, ct).ConfigureAwait(false);
        }
        catch (Exception ex)
        {
            System.Diagnostics.Debug.WriteLine($"[PlayerSecureIpcService] PublishEventAsync error: {ex}");
        }
    }

    private async Task BackgroundReadLoopAsync(CancellationToken ct)
    {
        try
        {
            while (!ct.IsCancellationRequested && _channel != null)
            {
                string json = await _channel.ReceiveMessageAsync(ct).ConfigureAwait(false);
                if (string.IsNullOrWhiteSpace(json)) continue;

                var cmd = JsonSerializer.Deserialize<PlayerIpcCommand>(json);
                if (cmd == null) continue;

                OnCommandReceived?.Invoke(this, cmd);
            }
        }
        catch (OperationCanceledException)
        {
            // Normal cancellation
        }
        catch (CryptographicException ex)
        {
            // Tampering detected on incoming command
            await PublishEventAsync(PlayerIpcEvent.Error(
                PlayerErrorCodes.ErrTamperingDetected,
                $"Security alert: Incoming IPC command failed authentication tag check: {ex.Message}",
                isFatal: true), CancellationToken.None).ConfigureAwait(false);
        }
        catch (Exception ex)
        {
            OnConnectionStateChanged?.Invoke(this, $"DISCONNECTED: {ex.Message}");
        }
    }

    public async ValueTask DisposeAsync()
    {
        if (_disposed) return;
        _disposed = true;

        _cts?.Cancel();
        if (_readLoopTask != null)
        {
            try { await _readLoopTask.ConfigureAwait(false); } catch { }
        }

        _channel?.Dispose();
        _pipeClient?.Dispose();
        _cts?.Dispose();
        CryptographicOperations.ZeroMemory(_sessionKey);
    }

    public void Dispose()
    {
        DisposeAsync().AsTask().GetAwaiter().GetResult();
    }
}
