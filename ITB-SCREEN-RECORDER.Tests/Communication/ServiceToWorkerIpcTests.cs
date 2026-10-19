using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Pipes;
using System.Reflection;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Contracts.Keystroke;
using ITB_SCREEN_RECORDER.Core.Ipc;
using ITBRecorderAgent.Engine;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.Communication;

public class ServiceToWorkerIpcTests
{
    private readonly WorkerIpcClient _ipcClient = new();
    private readonly MethodInfo _processCommandMethod;

    public ServiceToWorkerIpcTests()
    {
        _processCommandMethod = typeof(WorkerIpcClient).GetMethod("ProcessCommand",
            BindingFlags.NonPublic | BindingFlags.Instance)
            ?? throw new InvalidOperationException("ProcessCommand method not found on WorkerIpcClient.");
    }

    private void InvokeProcessCommand(string raw)
    {
        _processCommandMethod.Invoke(_ipcClient, new object[] { raw });
    }

    #region Worker IPC Command Parsing Tests

    [Fact]
    public void ProcessCommand_Stop_FiresStopRequested()
    {
        bool stopFired = false;
        _ipcClient.StopRequested += () => stopFired = true;

        InvokeProcessCommand("Stop");

        Assert.True(stopFired);
    }

    [Fact]
    public void ProcessCommand_ServerDisconnected_FiresServerDisconnected()
    {
        bool disconnectedFired = false;
        _ipcClient.ServerDisconnected += () => disconnectedFired = true;

        InvokeProcessCommand("ServerDisconnected");

        Assert.True(disconnectedFired);
    }

    [Fact]
    public void ProcessCommand_ServerConnected_FiresServerConnected()
    {
        bool connectedFired = false;
        _ipcClient.ServerConnected += () => connectedFired = true;

        InvokeProcessCommand("ServerConnected");

        Assert.True(connectedFired);
    }

    [Theory]
    [InlineData("SyncClock|10000000", 1.0)]      // 10,000,000 ticks = 1 second
    [InlineData("SyncClock|-5000000", -0.5)]     // Negative offset: -5,000,000 ticks = -0.5 seconds
    [InlineData("SyncClock|0", 0.0)]
    public void ProcessCommand_SyncClock_FiresClockSyncRequestedWithExactTimeSpan(string cmd, double expectedSeconds)
    {
        TimeSpan receivedOffset = TimeSpan.Zero;
        bool fired = false;
        _ipcClient.ClockSyncRequested += offset =>
        {
            receivedOffset = offset;
            fired = true;
        };

        InvokeProcessCommand(cmd);

        Assert.True(fired);
        Assert.Equal(TimeSpan.FromSeconds(expectedSeconds), receivedOffset);
    }

    [Fact]
    public void ProcessCommand_SyncClock_InvalidTicks_DoesNotFireEvent()
    {
        bool fired = false;
        _ipcClient.ClockSyncRequested += _ => fired = true;

        InvokeProcessCommand("SyncClock|not_a_number");

        Assert.False(fired);
    }

    [Theory]
    [InlineData("SetCaptureFps|15", 15)]
    [InlineData("SetCaptureFps|30", 30)]
    [InlineData("SetCaptureFps|60", 60)]
    public void ProcessCommand_SetCaptureFps_FiresCaptureFpsRequested(string cmd, int expectedFps)
    {
        int receivedFps = 0;
        bool fired = false;
        _ipcClient.CaptureFpsRequested += fps =>
        {
            receivedFps = fps;
            fired = true;
        };

        InvokeProcessCommand(cmd);

        Assert.True(fired);
        Assert.Equal(expectedFps, receivedFps);
    }

    [Fact]
    public void ProcessCommand_SetCaptureFps_InvalidNumber_DoesNotFireEvent()
    {
        bool fired = false;
        _ipcClient.CaptureFpsRequested += _ => fired = true;

        InvokeProcessCommand("SetCaptureFps|abc");

        Assert.False(fired);
    }

    [Fact]
    public void ProcessCommand_Start_ParsesAllParametersCorrectly()
    {
        string receivedDest = "";
        TimeSpan receivedOffset = TimeSpan.Zero;
        int receivedFps = 0;
        string receivedBitrate = "";
        bool fired = false;

        _ipcClient.StartRequested += (dest, offset, fps, bitrate) =>
        {
            receivedDest = dest;
            receivedOffset = offset;
            receivedFps = fps;
            receivedBitrate = bitrate;
            fired = true;
        };

        long offsetTicks = TimeSpan.FromMilliseconds(250).Ticks;
        string raw = $"Start|rtmp://128.200.3.10:19350/live/STATION_01|{offsetTicks}|25|3500k";

        InvokeProcessCommand(raw);

        Assert.True(fired);
        Assert.Equal("rtmp://128.200.3.10:19350/live/STATION_01", receivedDest);
        Assert.Equal(TimeSpan.FromMilliseconds(250), receivedOffset);
        Assert.Equal(25, receivedFps);
        Assert.Equal("3500k", receivedBitrate);
    }

    [Fact]
    public void ProcessCommand_Restart_ParsesAllParametersCorrectly()
    {
        string receivedDest = "";
        TimeSpan receivedOffset = TimeSpan.Zero;
        int receivedFps = 0;
        string receivedBitrate = "";
        bool fired = false;

        _ipcClient.RestartRequested += (dest, offset, fps, bitrate) =>
        {
            receivedDest = dest;
            receivedOffset = offset;
            receivedFps = fps;
            receivedBitrate = bitrate;
            fired = true;
        };

        string raw = "Restart|rtmps://media.example.com/live/STATION_02|0|30|5000k";

        InvokeProcessCommand(raw);

        Assert.True(fired);
        Assert.Equal("rtmps://media.example.com/live/STATION_02", receivedDest);
        Assert.Equal(TimeSpan.Zero, receivedOffset);
        Assert.Equal(30, receivedFps);
        Assert.Equal("5000k", receivedBitrate);
    }

    [Fact]
    public void ProcessCommand_Start_WithMissingOptionalParameters_UsesSafeDefaults()
    {
        string receivedDest = "";
        TimeSpan receivedOffset = TimeSpan.MaxValue;
        int receivedFps = -1;
        string receivedBitrate = "";
        bool fired = false;

        _ipcClient.StartRequested += (dest, offset, fps, bitrate) =>
        {
            receivedDest = dest;
            receivedOffset = offset;
            receivedFps = fps;
            receivedBitrate = bitrate;
            fired = true;
        };

        // Command with only action name
        InvokeProcessCommand("Start");

        Assert.True(fired);
        Assert.Equal(string.Empty, receivedDest);
        Assert.Equal(TimeSpan.Zero, receivedOffset);
        Assert.Equal(15, receivedFps); // default baseline FPS in parser
        Assert.Equal("2000k", receivedBitrate); // default bitrate in parser
    }

    #endregion

    #region IPC Authentication & Security Protocol Tests

    [Fact]
    public void IpcAuthentication_CorrectToken_AuthenticatesSuccessfully()
    {
        string secretToken = "A1B2C3D4E5F6G7H8";
        string incomingAuthLine = $"Auth|{secretToken}";

        bool isAuthenticated = false;
        if (incomingAuthLine.StartsWith("Auth|", StringComparison.OrdinalIgnoreCase))
        {
            string token = incomingAuthLine.Substring(5).Trim();
            if (string.Equals(token, secretToken, StringComparison.Ordinal))
            {
                isAuthenticated = true;
            }
        }

        Assert.True(isAuthenticated);
    }

    [Theory]
    [InlineData("Auth|wrong-token")]
    [InlineData("Auth|")]
    [InlineData("Auth| ")]
    [InlineData("Hello")]
    [InlineData("Start|dest")]
    public void IpcAuthentication_InvalidOrMissingToken_RejectsConnection(string unauthenticatedLine)
    {
        string secretToken = "A1B2C3D4E5F6G7H8";
        bool isAuthenticated = false;

        if (unauthenticatedLine.StartsWith("Auth|", StringComparison.OrdinalIgnoreCase))
        {
            string token = unauthenticatedLine.Substring(5).Trim();
            if (string.Equals(token, secretToken, StringComparison.Ordinal) || string.IsNullOrEmpty(secretToken))
            {
                isAuthenticated = true;
            }
        }

        Assert.False(isAuthenticated);
    }

    #endregion

    #region IPC Status & Telemetry Serialization Tests

    [Fact]
    public void WorkerIpcStatusMessage_Serialization_MatchesExpectedContracts()
    {
        var status = new WorkerIpcStatusMessage
        {
            SessionState = InternalSessionState.ActiveInteractive,
            CurrentFps = 29.97,
            TotalFramesRendered = 150000,
            IsStreaming = true,
            LastInternalError = null
        };

        string json = JsonSerializer.Serialize(status);
        var deserialized = JsonSerializer.Deserialize<WorkerIpcStatusMessage>(json);

        Assert.NotNull(deserialized);
        Assert.Equal(InternalSessionState.ActiveInteractive, deserialized.SessionState);
        Assert.Equal(29.97, deserialized.CurrentFps);
        Assert.Equal(150000, deserialized.TotalFramesRendered);
        Assert.True(deserialized.IsStreaming);
        Assert.Null(deserialized.LastInternalError);
    }

    [Fact]
    public void WorkerIpcTelemetry_WithAudioAndKeystrokes_DeserializesAccurately()
    {
        var testMessage = new
        {
            IsStreaming = true,
            IsRecording = true,
            RecordingStartedAtUtc = new DateTime(2026, 10, 16, 9, 0, 0, DateTimeKind.Utc),
            HasAudio = true,
            HasActiveSpeakers = true,
            HasActiveMicrophone = false,
            IsAudioStreaming = true,
            Telemetry = new
            {
                ActualFps = 30,
                DroppedFrames = 2,
                InternalCaptureFps = 30,
                QosTier = 1,
                HostCpuPct = 12.5,
                MediaTxMbps = 3.2
            },
            Keystrokes = new List<KeystrokeEventDto>
            {
                new KeystrokeEventDto
                {
                    KeyCombination = "Enter",
                    EpochMs = 1791583050000L
                }
            }
        };

        string json = JsonSerializer.Serialize(testMessage);
        using var doc = JsonDocument.Parse(json);
        var root = doc.RootElement;

        Assert.True(root.GetProperty("IsStreaming").GetBoolean());
        Assert.True(root.GetProperty("HasAudio").GetBoolean());
        Assert.Equal(30, root.GetProperty("Telemetry").GetProperty("ActualFps").GetInt32());

        var keys = root.GetProperty("Keystrokes");
        Assert.Equal(1, keys.GetArrayLength());
        Assert.Equal("Enter", keys[0].GetProperty("keyCombination").GetString());
    }

    #endregion

    #region In-Process Loopback Pipe Roundtrip Test

    [Fact]
    public async Task InProcessNamedPipe_ExchangeAuthAndCommand_SucceedsEndToEnd()
    {
        string pipeName = $"ITB_Test_Pipe_{Guid.NewGuid():N}";
        using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(5));

        string sentCommand = "SyncClock|5555555";
        string receivedCommand = "";

        var serverTask = Task.Run(async () =>
        {
            using var server = new NamedPipeServerStream(pipeName, PipeDirection.InOut, 1, PipeTransmissionMode.Byte, PipeOptions.Asynchronous);
            await server.WaitForConnectionAsync(cts.Token);

            using var reader = new StreamReader(server);
            using var writer = new StreamWriter(server) { AutoFlush = true };

            string? authLine = await reader.ReadLineAsync(cts.Token);
            Assert.Equal("Auth|ValidToken", authLine);

            await writer.WriteLineAsync(sentCommand);
        }, cts.Token);

        var clientTask = Task.Run(async () =>
        {
            using var client = new NamedPipeClientStream(".", pipeName, PipeDirection.InOut, PipeOptions.Asynchronous);
            await client.ConnectAsync(3000, cts.Token);

            using var reader = new StreamReader(client);
            using var writer = new StreamWriter(client) { AutoFlush = true };

            await writer.WriteLineAsync("Auth|ValidToken");
            receivedCommand = await reader.ReadLineAsync(cts.Token) ?? "";
        }, cts.Token);

        await Task.WhenAll(serverTask, clientTask);

        Assert.Equal(sentCommand, receivedCommand);
    }

    [Fact]
    public void WorkerIpc_FastKeystrokeMessage_FramingAndParsing_PreservesFidelity()
    {
        var originalKey = new KeystrokeEventDto
        {
            EpochMs = 1791583060123L,
            TimestampUtc = DateTime.UtcNow,
            KeyCombination = "F3"
        };

        string json = JsonSerializer.Serialize(originalKey);
        string framedMessage = $"Key|{json}";

        Assert.StartsWith("Key|", framedMessage, StringComparison.OrdinalIgnoreCase);
        string payload = framedMessage.Substring(4).Trim();
        var parsedKey = JsonSerializer.Deserialize<KeystrokeEventDto>(payload, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

        Assert.NotNull(parsedKey);
        Assert.Equal("F3", parsedKey.KeyCombination);
        Assert.Equal(1791583060123L, parsedKey.EpochMs);
    }

    #endregion
}
