using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using ITB_SCREEN_RECORDER.Core.Common;
using ITB_SCREEN_RECORDER.Core.Contracts.Keystroke;
using ITB_SCREEN_RECORDER.Core.Contracts.Network;
using ITB_SCREEN_RECORDER.Core.Security;
using ITB_SCREEN_RECORDER.Server.Data;
using ITB_SCREEN_RECORDER.Server.Data.Repositories;
using ITB_SCREEN_RECORDER.Server.Services;
using ITB_SCREEN_RECORDER.Server.Services.Security;
using ITB_SCREEN_RECORDER.Tests.Server.Data;
using Microsoft.Extensions.Options;
using Moq;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.Core;

public class KeystrokeEndToEndEncryptionTests : IDisposable
{
    private readonly TestSqliteConnectionFactory _factory;
    private readonly CatalogDbInitializer _initializer;

    public KeystrokeEndToEndEncryptionTests()
    {
        _factory = new TestSqliteConnectionFactory();
        _initializer = new CatalogDbInitializer(_factory);
        _initializer.Initialize();
    }

    public void Dispose()
    {
        _factory.Dispose();
    }

    [Fact]
    public void WorkerPayloadEncryption_ProducesCompliantEnvelope_AndObfuscatesKeystrokes()
    {
        // 1. Simulate active key dispatched from server to agent and worker via IPC
        byte[] activeKey = PayloadEncryptionManager.GenerateKey();
        string keyId = "KEY-TACTICAL-2026-X1";
        string plainCombo = "Ctrl + Alt + Delete";

        // 2. Execute keystroke encryption inside WorkerEngine
        string encrypted = PayloadEncryptionManager.Encrypt(plainCombo, keyId, activeKey);

        // 3. Verify envelope structure and cleartext obfuscation
        Assert.NotNull(encrypted);
        Assert.StartsWith(PayloadEncryptionManager.EnvelopePrefix + keyId + ":", encrypted);
        Assert.DoesNotContain("Ctrl", encrypted);
        Assert.DoesNotContain("Alt", encrypted);
        Assert.DoesNotContain("Delete", encrypted);

        // Verify base64 component contains at least 28 bytes (12 bytes Nonce + 16 bytes Tag)
        string base64Part = encrypted.Substring((PayloadEncryptionManager.EnvelopePrefix + keyId + ":").Length);
        byte[] payloadBytes = Convert.FromBase64String(base64Part);
        Assert.True(payloadBytes.Length >= 28);
    }

    [Fact]
    public async Task ServerHeartbeatPipeline_IngestsEncryptedToDatabase_AndDecryptsForSignalRBroadcast()
    {
        // 1. Initialize key ring management service (KeyRingService)
        var keyRing = new KeyRingService(_factory);
        await keyRing.InitializeAsync();
        var (activeKeyId, activeKeyBytes) = keyRing.GetActiveKey();

        var catalogRepo = new CatalogRepository(_factory, keyRing);

        // 2. Simulate worker-side encrypted keystroke capture
        string host = "FINANCE-STATION-01";
        long baseEpoch = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();

        var rawEvents = new List<(string ClearText, long Epoch)>
        {
            ("WIN + SHIFT + S", baseEpoch + 100),
            ("ALT + TAB", baseEpoch + 500),
            ("CTRL + C", baseEpoch + 1200)
        };

        var encryptedKeystrokeDtos = rawEvents.Select(e => new KeystrokeEventDto
        {
            EpochMs = e.Epoch,
            TimestampUtc = DateTime.UtcNow,
            KeyCombination = PayloadEncryptionManager.Encrypt(e.ClearText, activeKeyId, activeKeyBytes)
        }).ToList();

        // 3. Simulate heartbeat ingestion in AgentController: store to database (At-Rest Encryption)
        await catalogRepo.BulkInsertKeystrokesAsync(host, encryptedKeystrokeDtos);

        // Verify stored rows in database are strictly encrypted (zero cleartext leakage on disk)
        using (var db = _factory.CreateConnection())
        {
            var storedRows = (await db.QueryAsync<string>(
                "SELECT key_combination FROM keystroke_events WHERE station_id = @host ORDER BY epoch_ms ASC;",
                new { host })).ToList();

            Assert.Equal(3, storedRows.Count);
            foreach (var storedCipher in storedRows)
            {
                Assert.StartsWith(PayloadEncryptionManager.EnvelopePrefix + activeKeyId + ":", storedCipher);
                Assert.DoesNotContain("SHIFT", storedCipher);
                Assert.DoesNotContain("TAB", storedCipher);
            }
        }

        // 4. Simulate server-side automatic decryption for live SignalR broadcast to authorized dashboard subscribers
        var decryptedForBroadcast = encryptedKeystrokeDtos.Select(k => new KeystrokeEventDto
        {
            EpochMs = k.EpochMs,
            TimestampUtc = k.TimestampUtc,
            KeyCombination = keyRing.Decrypt(k.KeyCombination)
        }).ToList();

        Assert.Equal("WIN + SHIFT + S", decryptedForBroadcast[0].KeyCombination);
        Assert.Equal("ALT + TAB", decryptedForBroadcast[1].KeyCombination);
        Assert.Equal("CTRL + C", decryptedForBroadcast[2].KeyCombination);
    }

    [Fact]
    public async Task KeyRotation_PreservesSeamlessDecryptionOfPastKeys()
    {
        var keyRing = new KeyRingService(_factory);
        await keyRing.InitializeAsync();

        // Initial key: Generation 1
        var (k1Id, k1Bytes) = keyRing.GetActiveKey();
        string text1 = "PasswordPhase1!";
        string enc1 = PayloadEncryptionManager.Encrypt(text1, k1Id, k1Bytes);

        // First rotation -> Generation 2
        string k2Id = await keyRing.RotateKeyAsync();
        var (k2ActiveId, k2Bytes) = keyRing.GetActiveKey();
        Assert.Equal(k2Id, k2ActiveId);
        string text2 = "SensitiveCommandPhase2";
        string enc2 = PayloadEncryptionManager.Encrypt(text2, k2Id, k2Bytes);

        // Second rotation -> Generation 3
        string k3Id = await keyRing.RotateKeyAsync();
        var (k3ActiveId, k3Bytes) = keyRing.GetActiveKey();
        Assert.Equal(k3Id, k3ActiveId);
        string text3 = "RestrictedInputPhase3";
        string enc3 = PayloadEncryptionManager.Encrypt(text3, k3Id, k3Bytes);

        // Verify KeyRingService transparently decrypts all generations (both past and current) without re-encryption
        Assert.Equal(text1, keyRing.Decrypt(enc1));
        Assert.Equal(text2, keyRing.Decrypt(enc2));
        Assert.Equal(text3, keyRing.Decrypt(enc3));
    }

    [Fact]
    public void TamperedCiphertext_GcmTagMismatch_FailsSafelyWithoutCrashing()
    {
        byte[] key = PayloadEncryptionManager.GenerateKey();
        string keyId = "KEY-TEST-RESILIENCE";
        string plaintext = "AdminSuperSecretToken";

        string validEncrypted = PayloadEncryptionManager.Encrypt(plaintext, keyId, key);

        // 1. Deliberately tamper with one byte in the ciphertext payload (simulates tampering or transit corruption)
        string prefix = $"{PayloadEncryptionManager.EnvelopePrefix}{keyId}:";
        string base64Payload = validEncrypted.Substring(prefix.Length);
        byte[] payloadBytes = Convert.FromBase64String(base64Payload);

        // Modify byte in ciphertext portion
        payloadBytes[payloadBytes.Length - 1] ^= 0xFF;
        string tamperedEncrypted = prefix + Convert.ToBase64String(payloadBytes);

        // Decryption of tampered ciphertext: AesGcm throws AuthenticationTagMismatchException and returns DECRYPTION_FAILED
        string result = PayloadEncryptionManager.Decrypt(tamperedEncrypted, id => id == keyId ? key : null);
        Assert.Equal("[DECRYPTION_FAILED]", result);

        // 2. Tampered payload length (<28 bytes)
        byte[] shortBytes = new byte[15];
        string shortEncrypted = prefix + Convert.ToBase64String(shortBytes);
        string shortResult = PayloadEncryptionManager.Decrypt(shortEncrypted, id => id == keyId ? key : null);
        Assert.Equal("[CORRUPTED_PAYLOAD]", shortResult);

        // 3. Completely invalid Base64 string
        string corruptBase64 = prefix + "!!!NOT_VALID_BASE64@@@";
        string corruptResult = PayloadEncryptionManager.Decrypt(corruptBase64, id => id == keyId ? key : null);
        Assert.Equal("[DECRYPTION_FAILED]", corruptResult);

        // 4. Unrecognized key identifier
        string unknownKeyEncrypted = $"{PayloadEncryptionManager.EnvelopePrefix}UNKNOWN-KEY-999:{base64Payload}";
        string unknownResult = PayloadEncryptionManager.Decrypt(unknownKeyEncrypted, _ => null);
        Assert.Equal("[UNRESOLVED_KEY:UNKNOWN-KEY-999]", unknownResult);
    }

    [Fact]
    public void LegacyUnencryptedKeystrokes_RoundTripUnmodified()
    {
        byte[] key = PayloadEncryptionManager.GenerateKey();
        string[] legacyCombos = { "Ctrl + C", "F11", "BACKSPACE", "ENTER", "WIN + L", "" };

        foreach (var combo in legacyCombos)
        {
            string decrypted = PayloadEncryptionManager.Decrypt(combo, _ => key);
            Assert.Equal(combo, decrypted);
        }
    }

    [Fact]
    public void SensitiveMaskedKeystrokes_And_UnicodeHebrew_PreserveFidelity()
    {
        byte[] key = PayloadEncryptionManager.GenerateKey();
        string keyId = "KEY-UNICODE-TEST";

        string[] testStrings =
        {
            "********",
            "●●●●●●●●",
            "Ctrl + ע",
            "שלום עולם",
            "WIN + SHIFT + ₪",
            "Alt + ~!@#$%^&*()_+{}|:\"<>?"
        };

        foreach (var original in testStrings)
        {
            string enc = PayloadEncryptionManager.Encrypt(original, keyId, key);
            string dec = PayloadEncryptionManager.Decrypt(enc, _ => key);
            Assert.Equal(original, dec);
        }
    }

    [Fact]
    public async Task KeystrokeSubtitleExport_WithEncryptedDatabase_DecodesToCleartextInSrtAndAss()
    {
        var keyRing = new KeyRingService(_factory);
        await keyRing.InitializeAsync();
        var (activeKeyId, activeKeyBytes) = keyRing.GetActiveKey();

        var catalogRepo = new CatalogRepository(_factory, keyRing);
        string stationId = "EXPORT-STATION-01";
        long baseEpoch = 1790000000000L;

        // Insert encrypted keystrokes into database
        var keys = new List<KeystrokeEventDto>
        {
            new KeystrokeEventDto
            {
                EpochMs = baseEpoch + 1000,
                KeyCombination = PayloadEncryptionManager.Encrypt("Ctrl + Shift + Esc", activeKeyId, activeKeyBytes),
                TimestampUtc = DateTime.UtcNow
            },
            new KeystrokeEventDto
            {
                EpochMs = baseEpoch + 4000,
                KeyCombination = PayloadEncryptionManager.Encrypt("Win + D", activeKeyId, activeKeyBytes),
                TimestampUtc = DateTime.UtcNow
            }
        };

        await catalogRepo.BulkInsertKeystrokesAsync(stationId, keys);

        // Execute subtitle generator (SRT + ASS Keycaps)
        var srtGenerator = new KeystrokeSrtGenerator(catalogRepo);

        // 1. Generate SRT subtitle file
        string? srtPath = await srtGenerator.CreateSrtFileAsync(stationId, baseEpoch, baseEpoch + 10000);
        Assert.NotNull(srtPath);
        Assert.True(File.Exists(srtPath));

        try
        {
            string srtContent = await File.ReadAllTextAsync(srtPath);
            Assert.Contains("[ Ctrl + Shift + Esc ]", srtContent);
            Assert.Contains("[ Win + D ]", srtContent);
            Assert.DoesNotContain(PayloadEncryptionManager.EnvelopePrefix, srtContent);
        }
        finally
        {
            if (File.Exists(srtPath)) File.Delete(srtPath);
        }

        // 2. Generate styled ASS Keycaps subtitle file
        string? assPath = await srtGenerator.CreateAssKeycapsFileAsync(stationId, baseEpoch, baseEpoch + 10000);
        Assert.NotNull(assPath);
        Assert.True(File.Exists(assPath));

        try
        {
            string assContent = await File.ReadAllTextAsync(assPath);
            Assert.Contains("[Script Info]", assContent);
            Assert.Contains("[V4+ Styles]", assContent);
            Assert.Contains("CTRL", assContent);
            Assert.Contains("SHIFT", assContent);
            Assert.Contains("ESC", assContent);
            Assert.Contains("WIN", assContent);
            Assert.Contains("D", assContent);
            Assert.DoesNotContain(PayloadEncryptionManager.EnvelopePrefix, assContent);
        }
        finally
        {
            if (File.Exists(assPath)) File.Delete(assPath);
        }
    }

    [Fact]
    public async Task FleetStreamingPolicy_BulkStartAndStop_EnforcesDesiredStateAcrossFleet()
    {
        var configMock = new Mock<IOptionsMonitor<ITB_SCREEN_RECORDER.Core.Configuration.SystemConfig>>();
        configMock.Setup(m => m.CurrentValue).Returns(new ITB_SCREEN_RECORDER.Core.Configuration.SystemConfig());

        var syncManager = new OfflineSyncManager();
        var telemetryState = new TelemetryStateService(configMock.Object, null!, null!, syncManager);

        string stationA = "FLEET-PC-01";
        string stationB = "FLEET-PC-02";

        // Station A initially in standby (not streaming)
        var reportA = new AgentTelemetryReport
        {
            Hostname = stationA,
            IsStreaming = false
        };
        await telemetryState.ProcessHeartbeatAsync(reportA, "127.0.0.1");

        // Station B initially streaming actively
        var reportB = new AgentTelemetryReport
        {
            Hostname = stationB,
            IsStreaming = true,
            RecordingStartedAtUtc = DateTime.UtcNow.AddMinutes(-5)
        };
        await telemetryState.ProcessHeartbeatAsync(reportB, "127.0.0.1");

        // 1. Trigger Start All targeting Station A (Start Requested)
        telemetryState.SetAgentStreamState(stationA, true);

        // The next heartbeat from Station A receives StartStream command and ShouldStream = true
        var nextRespA = await telemetryState.ProcessHeartbeatAsync(reportA, "127.0.0.1");
        Assert.NotNull(nextRespA);
        Assert.True(nextRespA.ShouldStream);
        Assert.Equal(ServerCommand.StartStream, nextRespA.Command);

        // 2. Trigger Stop Recording targeting Station B (Stop Recording Requested -> Monitor Only)
        telemetryState.SetAgentStreamState(stationB, false);

        // Station continues live streaming (24/7 live monitoring), but recording state is stopped
        var nextRespB = await telemetryState.ProcessHeartbeatAsync(reportB, "127.0.0.1");
        Assert.NotNull(nextRespB);
        Assert.True(nextRespB.ShouldStream);
        Assert.False(reportB.IsRecording);
        Assert.Null(reportB.RecordingStartedAtUtc);
    }
}
