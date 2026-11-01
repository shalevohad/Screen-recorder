using System;
using System.IO;
using System.IO.Pipes;
using System.Security.Cryptography;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Player.Core.Ipc;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.Player;

public class PlayerSecureIpcTests
{
    [Fact]
    public async Task SecureIpcChannel_Roundtrip_EncryptsAndDecryptsSuccessfully()
    {
        byte[] key = new byte[32];
        RandomNumberGenerator.Fill(key);

        using var memoryPipe = new MemoryStreamPipe();
        using var senderChannel = new SecureIpcChannel(memoryPipe.ClientStream, key);
        using var receiverChannel = new SecureIpcChannel(memoryPipe.ServerStream, key);

        string originalPayload = "{\"command\":\"SEEK\",\"targetUtc\":\"2026-11-01T10:04:30Z\"}";

        // Send encrypted
        await senderChannel.SendMessageAsync(originalPayload);

        // Receive & decrypt
        string decrypted = await receiverChannel.ReceiveMessageAsync();

        Assert.Equal(originalPayload, decrypted);
    }

    [Fact]
    public async Task SecureIpcChannel_TamperingWithCiphertext_ThrowsCryptographicException()
    {
        byte[] key = new byte[32];
        RandomNumberGenerator.Fill(key);

        using var pipeStream = new MemoryStream();
        using var senderChannel = new SecureIpcChannel(pipeStream, key);

        // Send normal message into stream
        await senderChannel.SendMessageAsync("{\"command\":\"PLAY\"}");

        // Now tamper with 1 byte of the ciphertext in the memory stream
        byte[] buffer = pipeStream.ToArray();
        Assert.True(buffer.Length > 44);
        buffer[^1] ^= 0xFF; // Flip last byte of ciphertext

        // Attempt to decrypt tampered stream
        using var tamperedStream = new MemoryStream(buffer);
        using var receiverChannel = new SecureIpcChannel(tamperedStream, key);

        var ex = await Assert.ThrowsAsync<CryptographicException>(async () =>
        {
            await receiverChannel.ReceiveMessageAsync();
        });

        Assert.Contains("tampered with", ex.Message, StringComparison.OrdinalIgnoreCase);
    }

    [Fact]
    public async Task SecureIpcChannel_AntiReplayViolation_ThrowsCryptographicException()
    {
        byte[] key = new byte[32];
        RandomNumberGenerator.Fill(key);

        using var memoryPipe = new MemoryStreamPipe();
        using var senderChannel = new SecureIpcChannel(memoryPipe.ClientStream, key);
        using var receiverChannel = new SecureIpcChannel(memoryPipe.ServerStream, key);

        // Send first message (Seq = 1)
        await senderChannel.SendMessageAsync("{\"msg\":\"1\"}");
        string res1 = await receiverChannel.ReceiveMessageAsync();
        Assert.Equal("{\"msg\":\"1\"}", res1);

        // Send second message (Seq = 2)
        await senderChannel.SendMessageAsync("{\"msg\":\"2\"}");
        string res2 = await receiverChannel.ReceiveMessageAsync();
        Assert.Equal("{\"msg\":\"2\"}", res2);

        // If an attacker replays a frame with Seq = 1, receiver (currently at Seq = 2) must reject it
        using var captureStream = new MemoryStream();
        using var captureSender = new SecureIpcChannel(captureStream, key);
        await captureSender.SendMessageAsync("{\"replayed\":\"frame\"}"); // Seq = 1 on this channel
        byte[] replayedBytes = captureStream.ToArray();

        // Feed replayed frame into the pipe that receiverChannel is reading from
        await memoryPipe.ClientStream.WriteAsync(replayedBytes);

        // Receiver already saw seq 2. When it reads seq 1 <= 2, it must throw CryptographicException
        var ex = await Assert.ThrowsAsync<CryptographicException>(async () =>
        {
            await receiverChannel.ReceiveMessageAsync();
        });

        Assert.Contains("Anti-replay violation", ex.Message, StringComparison.OrdinalIgnoreCase);
    }

    [Fact]
    public void PlayerIpcContracts_SerializeAndDeserialize_MaintainsIntegrity()
    {
        var launchParams = new ReplayLaunchParams
        {
            Stations = new() { "WS-01", "WS-02", "WS-03", "WS-04" },
            StartTimeUtc = new DateTime(2026, 11, 1, 10, 0, 0, DateTimeKind.Utc),
            EndTimeUtc = new DateTime(2026, 11, 1, 10, 15, 0, DateTimeKind.Utc),
            SeekTimeUtc = new DateTime(2026, 11, 1, 10, 4, 30, DateTimeKind.Utc),
            AudioStation = "WS-01",
            KeystrokeMode = "BurnIn",
            MulticastAddress = "239.210.1.5",
            MulticastPort = 5098
        };

        var cmd = PlayerIpcCommand.InitReplay(launchParams);
        string json = JsonSerializer.Serialize(cmd);

        var deserialized = JsonSerializer.Deserialize<PlayerIpcCommand>(json);
        Assert.NotNull(deserialized);
        Assert.Equal("INIT_REPLAY", deserialized.Command);
        Assert.NotNull(deserialized.LaunchParams);
        Assert.Equal(4, deserialized.LaunchParams.Stations.Count);
        Assert.Equal("WS-01", deserialized.LaunchParams.AudioStation);
        Assert.Equal("BurnIn", deserialized.LaunchParams.KeystrokeMode);
        Assert.Equal(5098, deserialized.LaunchParams.MulticastPort);
    }

    [Fact]
    public async Task DuplexIpc_BidirectionalStreaming_ExchangesCommandsAndEvents()
    {
        byte[] sessionKey = new byte[32];
        RandomNumberGenerator.Fill(sessionKey);
        string uniquePipe = $"ITB_Test_Pipe_{Guid.NewGuid():N}";
        using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(5));

        string? receivedCmdJson = null;
        string? receivedEventJson = null;

        var serverTask = Task.Run(async () =>
        {
            using var serverPipe = new NamedPipeServerStream(uniquePipe, PipeDirection.InOut, 1, PipeTransmissionMode.Byte, PipeOptions.Asynchronous);
            await serverPipe.WaitForConnectionAsync(cts.Token);

            using var callerChannel = new SecureIpcChannel(serverPipe, sessionKey);

            // 1. Caller sends encrypted command to Player
            var seekCmd = PlayerIpcCommand.Seek(new DateTime(2026, 11, 1, 10, 8, 0, DateTimeKind.Utc));
            await callerChannel.SendMessageAsync(JsonSerializer.Serialize(seekCmd), cts.Token);

            // 4. Caller receives encrypted Heartbeat from Player
            receivedEventJson = await callerChannel.ReceiveMessageAsync(cts.Token);
        }, cts.Token);

        var clientTask = Task.Run(async () =>
        {
            using var clientPipe = new NamedPipeClientStream(".", uniquePipe, PipeDirection.InOut, PipeOptions.Asynchronous);
            await clientPipe.ConnectAsync(3000, cts.Token);

            using var playerChannel = new SecureIpcChannel(clientPipe, sessionKey);

            // 2. Player receives and parses
            receivedCmdJson = await playerChannel.ReceiveMessageAsync(cts.Token);
            var parsedCmd = JsonSerializer.Deserialize<PlayerIpcCommand>(receivedCmdJson);
            Assert.NotNull(parsedCmd);

            // 3. Player sends encrypted Heartbeat event back to Caller
            var hbEvent = PlayerIpcEvent.Heartbeat(
                playheadUtc: parsedCmd.TargetUtc!.Value,
                isPlaying: true,
                rate: 1.0,
                audioStation: "WS-01",
                timelineSec: 480.0,
                durationSec: 900.0);
            await playerChannel.SendMessageAsync(JsonSerializer.Serialize(hbEvent), cts.Token);
        }, cts.Token);

        await Task.WhenAll(serverTask, clientTask);

        // Validate results
        Assert.NotNull(receivedCmdJson);
        var validatedCmd = JsonSerializer.Deserialize<PlayerIpcCommand>(receivedCmdJson);
        Assert.Equal("SEEK", validatedCmd?.Command);
        Assert.Equal(new DateTime(2026, 11, 1, 10, 8, 0, DateTimeKind.Utc), validatedCmd?.TargetUtc);

        Assert.NotNull(receivedEventJson);
        var validatedEvent = JsonSerializer.Deserialize<PlayerIpcEvent>(receivedEventJson);
        Assert.Equal("HEARTBEAT", validatedEvent?.EventType);
        Assert.True(validatedEvent?.IsPlaying);
        Assert.Equal("WS-01", validatedEvent?.ActiveAudioStation);
        Assert.Equal(480.0, validatedEvent?.TimelineSeconds);
    }

    [Fact]
    public async Task LauncherAndService_EndToEndLifecycle_ExchangesCommandsAndStatusEvents()
    {
        byte[] sessionKey = new byte[32];
        RandomNumberGenerator.Fill(sessionKey);
        string uniquePipe = $"ITB_Launcher_Test_{Guid.NewGuid():N}";
        using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(5));

        using var serverPipe = new NamedPipeServerStream(uniquePipe, PipeDirection.InOut, 1, PipeTransmissionMode.Byte, PipeOptions.Asynchronous, 65536, 65536);

        var playerService = new PlayerSecureIpcService(uniquePipe, sessionKey);

        PlayerIpcCommand? receivedCommand = null;
        playerService.OnCommandReceived += (sender, cmd) =>
        {
            receivedCommand = cmd;
        };

        var serverConnectTask = Task.Run(async () =>
        {
            await serverPipe.WaitForConnectionAsync(cts.Token);
            using var callerChannel = new SecureIpcChannel(serverPipe, sessionKey);

            // Receive initial CONNECTED event emitted by PlayerSecureIpcService
            string initialEventJson = await callerChannel.ReceiveMessageAsync(cts.Token);
            var initialEvent = JsonSerializer.Deserialize<PlayerIpcEvent>(initialEventJson);
            Assert.NotNull(initialEvent);
            Assert.Equal("STATE_CHANGED", initialEvent.EventType);
            Assert.Equal("CONNECTED", initialEvent.State);

            // Caller sends INIT_REPLAY
            var launchParams = new ReplayLaunchParams
            {
                Stations = new() { "WS-01", "WS-02" },
                StartTimeUtc = DateTime.UtcNow.AddMinutes(-10),
                EndTimeUtc = DateTime.UtcNow,
                AudioStation = "WS-01"
            };
            await callerChannel.SendMessageAsync(JsonSerializer.Serialize(PlayerIpcCommand.InitReplay(launchParams)), cts.Token);

            // Caller receives progress event
            string progressEventJson = await callerChannel.ReceiveMessageAsync(cts.Token);
            var progressEvent = JsonSerializer.Deserialize<PlayerIpcEvent>(progressEventJson);
            Assert.NotNull(progressEvent);
            Assert.Equal("EXTRACTING_MEDIA", progressEvent.State);
            Assert.Equal(45, progressEvent.ProgressPercent);
        }, cts.Token);

        var playerStartTask = Task.Run(async () =>
        {
            await playerService.StartAsync(timeoutMs: 3000, ct: cts.Token);

            // Wait a brief moment for received command
            for (int i = 0; i < 50 && receivedCommand == null; i++)
            {
                await Task.Delay(20, cts.Token);
            }

            Assert.NotNull(receivedCommand);
            Assert.Equal("INIT_REPLAY", receivedCommand.Command);
            Assert.Equal(2, receivedCommand.LaunchParams?.Stations.Count);

            // Player publishes progress event
            await playerService.PublishEventAsync(PlayerIpcEvent.StateChanged("EXTRACTING_MEDIA", "Slicing on server...", 45), cts.Token);
        }, cts.Token);

        await Task.WhenAll(serverConnectTask, playerStartTask);
        await playerService.DisposeAsync();
    }
}

/// <summary>
/// Helper in-memory bidirectional pipe stream for fast unit testing without OS named pipes.
/// </summary>
public sealed class MemoryStreamPipe : IDisposable
{
    private readonly MemoryStream _serverToClient = new();
    private readonly MemoryStream _clientToServer = new();

    public Stream ClientStream { get; }
    public Stream ServerStream { get; }

    public MemoryStreamPipe()
    {
        ClientStream = new BidirectionalStream(_serverToClient, _clientToServer);
        ServerStream = new BidirectionalStream(_clientToServer, _serverToClient);
    }

    public void Dispose()
    {
        ClientStream.Dispose();
        ServerStream.Dispose();
        _serverToClient.Dispose();
        _clientToServer.Dispose();
    }

    private sealed class BidirectionalStream : Stream
    {
        private readonly MemoryStream _readStream;
        private readonly MemoryStream _writeStream;
        private long _readPosition = 0;

        public BidirectionalStream(MemoryStream readStream, MemoryStream writeStream)
        {
            _readStream = readStream;
            _writeStream = writeStream;
        }

        public override bool CanRead => true;
        public override bool CanSeek => false;
        public override bool CanWrite => true;
        public override long Length => _readStream.Length;
        public override long Position
        {
            get => _readPosition;
            set => throw new NotSupportedException();
        }

        public override void Flush() { }

        public override int Read(byte[] buffer, int offset, int count)
        {
            lock (_readStream)
            {
                long currentLen = _readStream.Length;
                if (_readPosition >= currentLen) return 0;

                long oldPos = _readStream.Position;
                _readStream.Position = _readPosition;
                int read = _readStream.Read(buffer, offset, count);
                _readPosition += read;
                _readStream.Position = oldPos;
                return read;
            }
        }

        public override void Write(byte[] buffer, int offset, int count)
        {
            lock (_writeStream)
            {
                _writeStream.Write(buffer, offset, count);
            }
        }

        public override long Seek(long offset, SeekOrigin origin) => throw new NotSupportedException();
        public override void SetLength(long value) => throw new NotSupportedException();
    }
}
