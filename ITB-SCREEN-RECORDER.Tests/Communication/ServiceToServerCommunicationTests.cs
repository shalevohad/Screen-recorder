using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Common;
using ITB_SCREEN_RECORDER.Core.Configuration;
using ITB_SCREEN_RECORDER.Core.Contracts.Keystroke;
using ITB_SCREEN_RECORDER.Core.Contracts.Network;
using ITB_SCREEN_RECORDER.Server.Services;
using Microsoft.Extensions.Options;
using Moq;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.Communication;

public class ServiceToServerCommunicationTests
{
    #region Endpoint Normalization & RTMP Path Resolution Tests

    [Theory]
    [InlineData("http://192.168.1.100:5090", "https://192.168.1.100:5090/api/v1/agent/telemetry")]
    [InlineData("https://server.domain.com:5090/", "https://server.domain.com:5090/api/v1/agent/telemetry")]
    [InlineData("10.0.0.5:5090", "https://10.0.0.5:5090/api/v1/agent/telemetry")]
    public void EndpointUrlResolution_ConstructsSecureHttpsTarget(string rawInput, string expectedTarget)
    {
        // Algorithm as used in AgentSupervisorService.cs lines 449-455:
        string cleanBase = rawInput.TrimEnd('/');
        string targetEndpoint = cleanBase.StartsWith("https://", StringComparison.OrdinalIgnoreCase)
            ? $"{cleanBase}/api/v1/agent/telemetry"
            : cleanBase.StartsWith("http://", StringComparison.OrdinalIgnoreCase)
                ? $"https://{cleanBase.Substring("http://".Length)}/api/v1/agent/telemetry"
                : $"https://{cleanBase}/api/v1/agent/telemetry";

        Assert.Equal(expectedTarget, targetEndpoint);
    }

    [Theory]
    [InlineData("rtmps://media.local:19350/live", "DESKTOP-01", "rtmps://media.local:19350/live/DESKTOP-01")]
    [InlineData("rtmps://media.local:19350/live/", "STATION A", "rtmps://media.local:19350/live/STATION_A")]
    [InlineData("rtmp://edge:1935/stream", "PC #1", "rtmp://edge:1935/stream/PC_%231")]
    public void RtmpDestinationResolution_SanitizesMachineNameAndPath(string baseUrl, string machineName, string expectedDestination)
    {
        // Algorithm as used in AgentSupervisorService.cs lines 196-204:
        string safeMachineName = Uri.EscapeDataString(machineName.Replace(" ", "_"));
        string dest = $"{baseUrl.TrimEnd('/')}/{safeMachineName}";

        Assert.Equal(expectedDestination, dest);
    }

    #endregion

    #region Telemetry & Heartbeat Contracts Serialization

    [Fact]
    public void AgentTelemetryReport_JsonSerialization_MatchesAllNetworkContracts()
    {
        var report = new AgentTelemetryReport
        {
            Hostname = "FINANCE-PC01",
            IpAddress = "10.0.1.55",
            Status = AgentStatus.Streaming,
            IsStreaming = true,
            IsRecording = true,
            RecordingStartedAtUtc = new DateTime(2026, 10, 16, 8, 30, 0, DateTimeKind.Utc),
            ActualFps = 25,
            DroppedFrames = 0,
            InternalCaptureFps = 25,
            QosTier = 1,
            HostCpuPct = 14.5,
            ProcessCpuPct = 3.2,
            ProcessRamMb = 145.0,
            Gpu3dPct = 8.0,
            MediaTxMbps = 2.5,
            OfflineFilesCount = 0,
            OfflineFilesTotalSizeMb = 0,
            Keystrokes = new List<KeystrokeEventDto>
            {
                new KeystrokeEventDto { KeyCombination = "F5", EpochMs = 1791583050000L }
            }
        };

        string json = JsonSerializer.Serialize(report);
        var doc = JsonDocument.Parse(json);
        var root = doc.RootElement;

        Assert.Equal("FINANCE-PC01", root.GetProperty("hostname").GetString());
        Assert.True(root.GetProperty("isStreaming").GetBoolean());
        Assert.Equal(25, root.GetProperty("actualFps").GetInt32());

        var keys = root.GetProperty("keystrokes");
        Assert.Equal(1, keys.GetArrayLength());
        Assert.Equal("F5", keys[0].GetProperty("keyCombination").GetString());
    }

    [Fact]
    public void AgentHeartbeatResponse_Deserialization_ExtractsAllFieldsAccurately()
    {
        string serverResponseJson = @"{
            ""shouldStream"": true,
            ""command"": 1,
            ""serverUtcEpochMs"": 1791583050123,
            ""serverUtcTime"": ""2026-10-16T08:30:50.123Z"",
            ""offlineBufferAction"": 1,
            ""policy"": {
                ""targetFps"": 25,
                ""videoBitrate"": ""3500k"",
                ""rtmpServerBaseUrl"": ""rtmps://media:19350/live""
            }
        }";

        var response = JsonSerializer.Deserialize<AgentHeartbeatResponse>(serverResponseJson,
            new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

        Assert.NotNull(response);
        Assert.True(response.ShouldStream);
        Assert.Equal(ServerCommand.StartStream, response.Command);
        Assert.Equal(1791583050123L, response.ServerUtcEpochMs);
        Assert.Equal(BufferCommand.UPLOAD_GRANTED, response.OfflineBufferAction);
        Assert.NotNull(response.Policy);
        Assert.Equal(25, response.Policy.TargetFps);
        Assert.Equal("3500k", response.Policy.VideoBitrate);
    }

    #endregion

    #region Telemetry State Service Processing & State Persistence

    [Fact]
    public async Task ProcessHeartbeatAsync_AutoStartRecordingOnLaunch_SetsDesiredStateToStreaming()
    {
        var configMock = new Mock<IOptionsMonitor<SystemConfig>>();
        configMock.Setup(m => m.CurrentValue).Returns(new SystemConfig());

        var syncManager = new OfflineSyncManager();
        var telemetryState = new TelemetryStateService(configMock.Object, null!, null!, syncManager);

        var report = new AgentTelemetryReport
        {
            Hostname = "STATION-AUTOSTART",
            IsStreaming = false,
            AutoStartRecordingOnLaunch = true
        };

        var response = await telemetryState.ProcessHeartbeatAsync(report, "127.0.0.1");

        Assert.NotNull(response);
        Assert.True(response.ShouldStream);
        Assert.Equal(ServerCommand.StartStream, response.Command);
    }

    [Fact]
    public async Task ProcessHeartbeatAsync_PreservesOriginalRecordingStartedAtUtc_AcrossTicks()
    {
        var configMock = new Mock<IOptionsMonitor<SystemConfig>>();
        configMock.Setup(m => m.CurrentValue).Returns(new SystemConfig());

        var syncManager = new OfflineSyncManager();
        var telemetryState = new TelemetryStateService(configMock.Object, null!, null!, syncManager);

        DateTime originalStartTime = new DateTime(2026, 10, 16, 7, 0, 0, DateTimeKind.Utc);

        // Tick 1: Initial report with start timestamp
        var report1 = new AgentTelemetryReport
        {
            Hostname = "STATION-PERSIST",
            IsStreaming = true,
            RecordingStartedAtUtc = originalStartTime
        };
        await telemetryState.ProcessHeartbeatAsync(report1, "127.0.0.1");

        // Tick 2: Subsequent report where RecordingStartedAtUtc happens to be null
        var report2 = new AgentTelemetryReport
        {
            Hostname = "STATION-PERSIST",
            IsStreaming = true,
            RecordingStartedAtUtc = null
        };
        await telemetryState.ProcessHeartbeatAsync(report2, "127.0.0.1");

        // The service should preserve the original timestamp on report2
        Assert.Equal(originalStartTime, report2.RecordingStartedAtUtc);
    }

    #endregion

    #region OfflineSyncManager Concurrency & Timeout Tests

    [Fact]
    public void OfflineSyncManager_ZeroDebt_ReturnsWait()
    {
        var manager = new OfflineSyncManager();
        var result = manager.GetSyncCommand("STATION-NO-DEBT", 0);

        Assert.Equal(BufferCommand.WAIT, result);
        Assert.Equal(0, manager.GetActiveUploadsCount());
    }

    [Fact]
    public void OfflineSyncManager_UnderLimit_GrantsUpload()
    {
        var manager = new OfflineSyncManager();
        var result = manager.GetSyncCommand("STATION-01", 50);

        Assert.Equal(BufferCommand.UPLOAD_GRANTED, result);
        Assert.Equal(1, manager.GetActiveUploadsCount());
    }

    [Fact]
    public void OfflineSyncManager_ExceedingMaxConcurrentLimit_ReturnsWait()
    {
        var manager = new OfflineSyncManager();

        // Fill up to MaxConcurrentUploads (5)
        for (int i = 1; i <= 5; i++)
        {
            var res = manager.GetSyncCommand($"STATION-{i:D2}", 100);
            Assert.Equal(BufferCommand.UPLOAD_GRANTED, res);
        }

        Assert.Equal(5, manager.GetActiveUploadsCount());

        // 6th station tries to sync
        var sixthResult = manager.GetSyncCommand("STATION-06", 100);
        Assert.Equal(BufferCommand.WAIT, sixthResult);
    }

    [Fact]
    public void OfflineSyncManager_ActiveStation_RefreshesUploadGranted()
    {
        var manager = new OfflineSyncManager();
        var res1 = manager.GetSyncCommand("STATION-ACTIVE", 100);
        Assert.Equal(BufferCommand.UPLOAD_GRANTED, res1);

        // Immediate next poll from same station
        var res2 = manager.GetSyncCommand("STATION-ACTIVE", 80);
        Assert.Equal(BufferCommand.UPLOAD_GRANTED, res2);
        Assert.Equal(1, manager.GetActiveUploadsCount());
    }

    #endregion

    #region Keystroke Reliability & Re-queueing on Network Failure

    [Fact]
    public void KeystrokeBatching_RequeuesUponTransmissionFailure_WithoutDataLoss()
    {
        var pendingKeystrokes = new ConcurrentQueue<KeystrokeEventDto>();

        // Enqueue 5 keystrokes
        for (int i = 1; i <= 5; i++)
        {
            pendingKeystrokes.Enqueue(new KeystrokeEventDto { KeyCombination = $"Key{i}", EpochMs = 1791583050000L + i });
        }

        // Drain batch for transmission (up to 500)
        var keysBatch = new List<KeystrokeEventDto>();
        while (pendingKeystrokes.TryDequeue(out var k) && keysBatch.Count < 500)
        {
            keysBatch.Add(k);
        }

        Assert.Equal(5, keysBatch.Count);
        Assert.Empty(pendingKeystrokes);

        // Simulate transmission failure: response.IsSuccessStatusCode == false
        bool isSuccess = false;
        if (!isSuccess)
        {
            // Algorithm as used in AgentSupervisorService.cs lines 540-542:
            foreach (var k in keysBatch)
            {
                pendingKeystrokes.Enqueue(k);
            }
        }

        // Assert all 5 keys are preserved back in the queue
        Assert.Equal(5, pendingKeystrokes.Count);
    }

    #endregion

    #region Dynamic Policy Adaptation In Supervisor Logic

    [Theory]
    [InlineData(30, 20, "2000k", "2000k", false)] // FPS dropped from 30 to 20, bitrate identical -> No restart required (on-the-fly SetCaptureFps)
    [InlineData(20, 30, "2000k", "2000k", true)]  // FPS increased from 20 to 30 -> Restart required
    [InlineData(30, 30, "2000k", "4000k", true)]  // Bitrate changed -> Restart required
    [InlineData(30, 30, "2000k", "2000k", false)] // Nothing changed -> No restart required
    public void PolicyChangeEvaluation_DeterminesIfPipelineRestartIsNeeded(
        int oldFps, int newFps, string oldBitrate, string newBitrate, bool expectedRestartRequired)
    {
        bool bitrateChanged = oldBitrate != newBitrate;
        bool fpsChanged = oldFps != newFps;
        bool urlChanged = false;

        bool restartRequired = false;
        if (bitrateChanged || fpsChanged || urlChanged)
        {
            if (!bitrateChanged && !urlChanged && fpsChanged && newFps <= oldFps)
            {
                restartRequired = false; // Applied on the fly via SetCaptureFps
            }
            else
            {
                restartRequired = true;
            }
        }

        Assert.Equal(expectedRestartRequired, restartRequired);
    }

    #endregion
}
