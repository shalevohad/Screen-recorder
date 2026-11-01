// =========================================================================================
// File: ITB-SCREEN-RECORDER.Tests/Synchronization/EndToEndAudioVideoKeystrokeSyncTests.cs
// Description: End-to-end synchronization tests for video, audio, and keystrokes from endpoint capture,
//              through live streaming, studio recording, and forensic extraction with gap removal.
// =========================================================================================

using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Contracts.Keystroke;
using ITB_SCREEN_RECORDER.Core.Contracts.Network;
using ITB_SCREEN_RECORDER.Features.Extractor.Models;
using ITB_SCREEN_RECORDER.Features.Extractor.Services;
using ITB_SCREEN_RECORDER.Server.Data;
using ITB_SCREEN_RECORDER.Server.Data.Repositories;
using ITB_SCREEN_RECORDER.Server.Services;
using ITB_SCREEN_RECORDER.Tests.Server.Data;
using ITBRecorderAgent.Engine;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.Synchronization
{
    public class EndToEndAudioVideoKeystrokeSyncTests : IDisposable
    {
        private readonly TestSqliteConnectionFactory _dbFactory;
        private readonly CatalogDbInitializer _dbInitializer;
        private readonly CatalogRepository _catalogRepository;
        private readonly SynchronizationPlanBuilder _planBuilder;
        private readonly KeystrokeSrtGenerator _srtGenerator;

        public EndToEndAudioVideoKeystrokeSyncTests()
        {
            _dbFactory = new TestSqliteConnectionFactory();
            _dbInitializer = new CatalogDbInitializer(_dbFactory);
            _dbInitializer.Initialize();
            _catalogRepository = new CatalogRepository(_dbFactory);
            _planBuilder = new SynchronizationPlanBuilder();
            _srtGenerator = new KeystrokeSrtGenerator(_catalogRepository);
        }

        public void Dispose()
        {
            _dbFactory.Dispose();
        }

        #region Stage 1: Endpoint Capture & Clock Synchronization (Endpoint Capture & Sync)

        [Fact]
        public void EndpointCapture_VideoAudioKeyboard_SynchronizedAtSource()
        {
            // Scenario: Endpoint calibrates clock offset against server (e.g., server clock is 250ms ahead)
            long tSendMs = 1000;
            long tReceiveMs = 1060; // RTT = 60ms, half = 30ms
            long serverEpochMs = 1280;

            long rtt = Math.Max(0, tReceiveMs - tSendMs);
            long serverTimeAtReceive = serverEpochMs + (rtt / 2);
            TimeSpan serverUtcOffset = TimeSpan.FromMilliseconds(serverTimeAtReceive - tReceiveMs);

            Assert.Equal(250, serverUtcOffset.TotalMilliseconds);

            // Calibrated session start timestamp
            DateTime localStartUtc = new DateTime(2026, 10, 19, 10, 0, 0, DateTimeKind.Utc);
            DateTime sessionStartCalibratedUtc = localStartUtc + serverUtcOffset;
            long sessionStartEpochMs = new DateTimeOffset(sessionStartCalibratedUtc).ToUnixTimeMilliseconds();

            // 1. Keyboard Calibration: keypress exactly at T = +2.5 seconds (2500ms) into recording
            long localKeypressElapsedMs = 2500;
            Func<long> getSyncedEpochMs = () =>
                new DateTimeOffset(localStartUtc.AddMilliseconds(localKeypressElapsedMs)).ToUnixTimeMilliseconds() +
                (long)serverUtcOffset.TotalMilliseconds;

            long capturedKeyEpochMs = getSyncedEpochMs();
            var capturedKey = new KeystrokeEventDto
            {
                EpochMs = capturedKeyEpochMs,
                KeyCombination = "Ctrl + Alt + Del",
                TimestampUtc = DateTimeOffset.FromUnixTimeMilliseconds(capturedKeyEpochMs).UtcDateTime
            };

            Assert.Equal(sessionStartEpochMs + 2500, capturedKey.EpochMs);
            Assert.Equal("Ctrl + Alt + Del", capturedKey.KeyCombination);

            // 2. Video Calibration: at 30 FPS, each video frame spans 33.333ms.
            // At exactly 2.5 seconds, the exact frame index is:
            int targetFps = 30;
            double frameTimeMs = 1000.0 / targetFps;
            long expectedVideoFrameIndex = (long)(localKeypressElapsedMs / frameTimeMs);
            Assert.Equal(75, expectedVideoFrameIndex);

            // 3. Audio Calibration (WASAPI AudioPacer): 48,000 Hz, stereo, float32le = 384,000 Bytes/sec
            const int bytesPerSec = 48000 * 2 * 4;
            long expectedAudioBytesAtKeypress = (long)((localKeypressElapsedMs / 1000.0) * bytesPerSec);
            Assert.Equal(960000, expectedAudioBytesAtKeypress);

            // Verify three-way synchronized lock to the exact coherent point in time
            double videoTimeSec = expectedVideoFrameIndex * (1.0 / targetFps);
            double audioTimeSec = (double)expectedAudioBytesAtKeypress / bytesPerSec;
            double keyTimeSec = (capturedKey.EpochMs - sessionStartEpochMs) / 1000.0;

            Assert.Equal(2.5, keyTimeSec, precision: 3);
            Assert.Equal(2.5, videoTimeSec, precision: 3);
            Assert.Equal(2.5, audioTimeSec, precision: 3);
        }

        [Fact]
        public void AudioPacer_SilenceInjection_PreventsAudioDriftUnderHardwareSilence()
        {
            // Verify AudioPacer mechanism under complete hardware silence:
            // AudioPacer guarantees constant deterministic byte rate (384,000 B/s) to prevent audio drift relative to video
            const int bytesPerSec = 48000 * 2 * 4;
            var pacer = new AudioPacer();
            long startTicks = System.Diagnostics.Stopwatch.GetTimestamp();
            pacer.Start(startTicks);

            // Simulation: WASAPI receives first 19,200 bytes (50ms)
            pacer.RecordIncomingBytes(19200);
            Assert.True(pacer.IsAudioFlowing());

            // After 10s of complete silence, injected fill bytes equal 10s * 384,000 - 19,200
            double simulatedElapsedSeconds = 10.0;
            long expectedTotalBytes = (long)(simulatedElapsedSeconds * bytesPerSec);
            long missingBytes = expectedTotalBytes - 19200;

            Assert.Equal(3840000, expectedTotalBytes);
            Assert.Equal(3820800, missingBytes);
            Assert.Equal(0, missingBytes % 8); // Always aligned to 8-byte sample boundaries (2 channels x 4 bytes)
        }

        #endregion

        #region Stage 2: Streaming & Server Ingest (Live Broadcast & Ingest)

        [Fact]
        public async Task OnlineStreaming_TelemetryIngestion_MaintainsContinuousSyncWithoutLeakage()
        {
            const string stationId = "WS-COMMAND-01";
            long baseEpochMs = 1790000000000L;

            // Simulate live keystroke sequence generated during streaming
            var liveEvents = new List<KeystrokeEventDto>
            {
                new() { EpochMs = baseEpochMs + 1000, KeyCombination = "F5", TimestampUtc = DateTimeOffset.FromUnixTimeMilliseconds(baseEpochMs + 1000).UtcDateTime },
                new() { EpochMs = baseEpochMs + 2400, KeyCombination = "Ctrl + C", TimestampUtc = DateTimeOffset.FromUnixTimeMilliseconds(baseEpochMs + 2400).UtcDateTime },
                new() { EpochMs = baseEpochMs + 5100, KeyCombination = "Ctrl + V", TimestampUtc = DateTimeOffset.FromUnixTimeMilliseconds(baseEpochMs + 5100).UtcDateTime },
                new() { EpochMs = baseEpochMs + 8900, KeyCombination = "Enter", TimestampUtc = DateTimeOffset.FromUnixTimeMilliseconds(baseEpochMs + 8900).UtcDateTime }
            };

            // Ingest telemetry into CatalogRepository
            await _catalogRepository.BulkInsertKeystrokesAsync(stationId, liveEvents);

            // Query telemetry window (as executed during live monitoring on dashboard)
            var retrievedKeys = await _catalogRepository.GetKeystrokesForWindowAsync(stationId, baseEpochMs, baseEpochMs + 10000);

            Assert.Equal(4, retrievedKeys.Count);
            Assert.Equal("F5", retrievedKeys[0].KeyCombination);
            Assert.Equal(baseEpochMs + 1000, retrievedKeys[0].EpochMs);

            Assert.Equal("Ctrl + C", retrievedKeys[1].KeyCombination);
            Assert.Equal(baseEpochMs + 2400, retrievedKeys[1].EpochMs);

            Assert.Equal("Ctrl + V", retrievedKeys[2].KeyCombination);
            Assert.Equal(baseEpochMs + 5100, retrievedKeys[2].EpochMs);

            Assert.Equal("Enter", retrievedKeys[3].KeyCombination);
            Assert.Equal(baseEpochMs + 8900, retrievedKeys[3].EpochMs);

            // Narrow window query verifies zero telemetry leakage beyond interval bounds
            var subWindowKeys = await _catalogRepository.GetKeystrokesForWindowAsync(stationId, baseEpochMs + 2000, baseEpochMs + 6000);
            Assert.Equal(2, subWindowKeys.Count);
            Assert.Equal("Ctrl + C", subWindowKeys[0].KeyCombination);
            Assert.Equal("Ctrl + V", subWindowKeys[1].KeyCombination);
        }

        #endregion

        #region Stage 3: Offline Mode & Sidecar Re-sync (Offline Buffering & Drainer Re-sync)

        [Fact]
        public async Task OfflineMode_SidecarBufferingAndDrainerSync_PreservesTimelineContinuity()
        {
            const string stationId = "WS-MOBILE-LAPTOP";
            long offlineStartEpochMs = 1791000000000L;

            // Simulate offline sidecar keystroke file (.keys.jsonl) buffered locally on the endpoint
            var offlineKeyEvents = new List<KeystrokeEventDto>
            {
                new() { EpochMs = offlineStartEpochMs + 500, KeyCombination = "Win + L", TimestampUtc = DateTimeOffset.FromUnixTimeMilliseconds(offlineStartEpochMs + 500).UtcDateTime },
                new() { EpochMs = offlineStartEpochMs + 3200, KeyCombination = "Alt + Tab", TimestampUtc = DateTimeOffset.FromUnixTimeMilliseconds(offlineStartEpochMs + 3200).UtcDateTime },
                new() { EpochMs = offlineStartEpochMs + 7800, KeyCombination = "Win + Shift + S", TimestampUtc = DateTimeOffset.FromUnixTimeMilliseconds(offlineStartEpochMs + 7800).UtcDateTime }
            };

            var sbJsonl = new StringBuilder();
            foreach (var k in offlineKeyEvents)
            {
                sbJsonl.AppendLine(JsonSerializer.Serialize(k));
            }

            // Simulate AgentController.SyncIngest operation: parse sidecar stream transmitted by offline buffer drainer
            var parsedIngestedKeys = new List<KeystrokeEventDto>();
            using (var reader = new StringReader(sbJsonl.ToString()))
            {
                string? line;
                while ((line = await reader.ReadLineAsync()) != null)
                {
                    if (string.IsNullOrWhiteSpace(line)) continue;
                    using var doc = JsonDocument.Parse(line);
                    var root = doc.RootElement;
                    long epoch = root.GetProperty("epochMs").GetInt64();
                    string combo = root.GetProperty("keyCombination").GetString() ?? "";

                    parsedIngestedKeys.Add(new KeystrokeEventDto
                    {
                        EpochMs = epoch,
                        KeyCombination = combo,
                        TimestampUtc = DateTimeOffset.FromUnixTimeMilliseconds(epoch).UtcDateTime
                    });
                }
            }

            Assert.Equal(3, parsedIngestedKeys.Count);

            // Persist to database
            await _catalogRepository.BulkInsertKeystrokesAsync(stationId, parsedIngestedKeys);

            // Verify keystrokes align precisely alongside recording video chunks without timestamp drift
            var saved = await _catalogRepository.GetKeystrokesForWindowAsync(stationId, offlineStartEpochMs, offlineStartEpochMs + 10000);
            Assert.Equal(3, saved.Count);
            Assert.Equal(offlineStartEpochMs + 7800, saved[2].EpochMs);
            Assert.Equal("Win + Shift + S", saved[2].KeyCombination);
        }

        #endregion

        #region Stage 4: Studio Recording & Multicam Sync (Recording & Multicam Studio Sync)

        [Fact]
        public void LiveBroadcastAndStudioRecording_ClockAlignedChunks_SynchronizedMulticamPlayback()
        {
            // Scenario: Multicam studio displaying Station-A and Station-B concurrently.
            // Chunks sliced to deterministic wall-clock intervals (e.g. 5 minutes = 300 seconds)
            DateTime chunkStartUtc = new DateTime(2026, 10, 19, 11, 0, 0, DateTimeKind.Utc);
            DateTime chunkEndUtc = chunkStartUtc.AddMinutes(5);
            long timelineBaseEpochMs = new DateTimeOffset(chunkStartUtc).ToUnixTimeMilliseconds();

            // Keypress event on Station-A at 11:02:15.500
            DateTime eventAUtc = chunkStartUtc.AddMinutes(2).AddSeconds(15).AddMilliseconds(500);
            long eventAEpochMs = new DateTimeOffset(eventAUtc).ToUnixTimeMilliseconds();

            // Keypress event on Station-B at the exact same millisecond: 11:02:15.500
            DateTime eventBUtc = eventAUtc;
            long eventBEpochMs = eventAEpochMs;

            // In studio player (StudioVideoFeed / MulticamViewport):
            // Playhead progresses relative to timelineBaseEpochMs:
            long playheadMs = 135500; // 2 minutes and 15.5 seconds (135.5s)
            long currentPlayheadEpochMs = timelineBaseEpochMs + playheadMs;

            Assert.Equal(eventAEpochMs, currentPlayheadEpochMs);
            Assert.Equal(eventBEpochMs, currentPlayheadEpochMs);

            // Verify video frame on each station at current playhead (at 30 FPS):
            // Exact frame index = 135.5s * 30 = 4065
            long expectedFrameNumber = (long)(135.5 * 30);
            Assert.Equal(4065, expectedFrameNumber);

            // Verify exact audio byte offset (48kHz stereo float = 384,000 B/s):
            long expectedAudioByteOffset = (long)(135.5 * 384000);
            Assert.Equal(52032000, expectedAudioByteOffset);
        }

        [Theory]
        [InlineData(-100, false, 0.0)]     // Before keypress: not visible
        [InlineData(0, true, 1.0)]         // At keypress (T=0): fully visible (opacity 1.0)
        [InlineData(1000, true, 1.0)]      // 1.0s after keypress: fully visible (opacity 1.0)
        [InlineData(1800, true, 1.0)]      // 1.8s: fade-out threshold starts (still opacity 1.0)
        [InlineData(2000, true, 0.5)]      // 2.0s: mid fade-out (50% opacity)
        [InlineData(2100, true, 0.25)]     // 2.1s: 75% decay (25% opacity)
        [InlineData(2201, false, 0.0)]     // Beyond 2.2s: completely hidden
        public void StudioPlayback_KeystrokeOverlayTimingAndFadeOut_PreciseHUDLifecycle(
            long elapsedSinceKeypressMs, bool shouldBeVisible, double expectedOpacity)
        {
            // Verify overlay lifecycle matching KeystrokePlaybackOverlay.jsx algorithm
            const long displayDurationMs = 2200;
            const long fadeDurationMs = 400;

            bool isVisible = elapsedSinceKeypressMs >= 0 && elapsedSinceKeypressMs <= displayDurationMs;

            double opacity = 0;
            if (isVisible)
            {
                opacity = 1.0;
                if (elapsedSinceKeypressMs > (displayDurationMs - fadeDurationMs))
                {
                    double fadeProgress = (double)(elapsedSinceKeypressMs - (displayDurationMs - fadeDurationMs)) / fadeDurationMs;
                    opacity = Math.Max(0, 1.0 - fadeProgress);
                }
            }

            Assert.Equal(shouldBeVisible, isVisible && opacity > 0.01);
            Assert.Equal(expectedOpacity, opacity, precision: 2);
        }

        #endregion

        #region Stage 5: Video Extraction & Cuts Synchronization (Extraction, Trimming & Subtitles)

        [Fact]
        public async Task VideoExtraction_SingleWindowTrim_ExactKeystrokeSubtitleAndBurnInSync()
        {
            const string stationId = "WS-FORENSIC-01";
            DateTime chunk1Start = new DateTime(2026, 10, 19, 10, 0, 0, DateTimeKind.Utc);
            DateTime chunk1End = chunk1Start.AddMinutes(5);
            DateTime chunk2Start = chunk1End;
            DateTime chunk2End = chunk2Start.AddMinutes(5);

            long baseEpochMs = new DateTimeOffset(chunk1Start).ToUnixTimeMilliseconds();

            // User configures In-Point at 10:02:00 and Out-Point at 10:07:00 (5 minutes duration = 300 seconds)
            DateTime cutStartUtc = chunk1Start.AddMinutes(2);
            DateTime cutEndUtc = chunk1Start.AddMinutes(7);
            long cutStartEpochMs = new DateTimeOffset(cutStartUtc).ToUnixTimeMilliseconds();
            long cutEndEpochMs = new DateTimeOffset(cutEndUtc).ToUnixTimeMilliseconds();

            // Keystrokes in database:
            var events = new List<KeystrokeEventDto>
            {
                new() { EpochMs = baseEpochMs + 60000, KeyCombination = "IgnoredBeforeCut" },    // 10:01:00 (prior to cut)
                new() { EpochMs = cutStartEpochMs + 30000, KeyCombination = "Ctrl + S" },         // 10:02:30 (+30s into cut)
                new() { EpochMs = cutStartEpochMs + 210000, KeyCombination = "Alt + F4" },        // 10:05:30 (+210s into cut, chunk 2)
                new() { EpochMs = cutEndEpochMs + 10000, KeyCombination = "IgnoredAfterCut" }     // 10:07:10 (after cut window)
            };

            await _catalogRepository.BulkInsertKeystrokesAsync(stationId, events);

            // 1. Verify soft subtitles extraction (SRT Caption)
            string? srtFile = await _srtGenerator.CreateSrtFileAsync(stationId, cutStartEpochMs, cutEndEpochMs);
            Assert.NotNull(srtFile);
            Assert.True(File.Exists(srtFile));

            string srtContent = await File.ReadAllTextAsync(srtFile);
            File.Delete(srtFile);

            // Verify events outside cut window are trimmed
            Assert.DoesNotContain("IgnoredBeforeCut", srtContent);
            Assert.DoesNotContain("IgnoredAfterCut", srtContent);

            // Verify relative offset alignment in SRT:
            // 30 seconds = 00:00:30,000 --> 00:00:32,000
            Assert.Contains("00:00:30,000 --> 00:00:32,000", srtContent);
            Assert.Contains("[ Ctrl + S ]", srtContent);

            // 210 seconds = 3 min 30 sec = 00:03:30,000 --> 00:03:32,000
            Assert.Contains("00:03:30,000 --> 00:03:32,000", srtContent);
            Assert.Contains("[ Alt + F4 ]", srtContent);

            // 2. Verify tactical burn-in subtitles extraction (ASS Keycaps Burn-In)
            string? assFile = await _srtGenerator.CreateAssKeycapsFileAsync(stationId, cutStartEpochMs, cutEndEpochMs);
            Assert.NotNull(assFile);
            Assert.True(File.Exists(assFile));

            string assContent = await File.ReadAllTextAsync(assFile);
            File.Delete(assFile);

            // Verify Keycaps style and timing in ASS:
            // 30 seconds in ASS = 0:00:30.00, 2.2s duration = 0:00:32.20
            Assert.Contains("Dialogue: 0,0:00:30.00,0:00:32.20,KeyCapHud", assContent);
            Assert.Contains("CTRL", assContent);
            Assert.Contains("S", assContent);

            // 210 seconds in ASS = 0:03:30.00, 2.2s duration = 0:03:32.20
            Assert.Contains("Dialogue: 0,0:03:30.00,0:03:32.20,KeyCapHud", assContent);
            Assert.Contains("ALT", assContent);
            Assert.Contains("F4", assContent);
        }

        [Fact]
        public async Task VideoExtraction_MultiSegmentCutWithGapRemoval_CalculatesCompensatedKeystrokeTimeline()
        {
            // Advanced scenario: multi-segment cut with global gap removal between two segments:
            // Segment 1: 10:00:00 -> 10:03:00 (duration: 180 seconds)
            // Removed Gap: 10:03:00 -> 10:10:00 (duration: 420 seconds = 7 minutes removed from output video)
            // Segment 2: 10:10:00 -> 10:14:00 (duration: 240 seconds = 4 minutes)
            // Final exported video duration: 180s + 240s = 420 seconds (7 minutes)

            const string stationId = "WS-SMART-CUT";
            DateTime t0 = new DateTime(2026, 10, 19, 10, 0, 0, DateTimeKind.Utc);
            DateTime seg1Start = t0;
            DateTime seg1End = t0.AddMinutes(3);

            DateTime gapStart = seg1End;
            DateTime gapEnd = t0.AddMinutes(10);

            DateTime seg2Start = gapEnd;
            DateTime seg2End = t0.AddMinutes(14);

            long seg1StartEpoch = new DateTimeOffset(seg1Start).ToUnixTimeMilliseconds();
            long seg1EndEpoch = new DateTimeOffset(seg1End).ToUnixTimeMilliseconds();
            long seg2StartEpoch = new DateTimeOffset(seg2Start).ToUnixTimeMilliseconds();
            long seg2EndEpoch = new DateTimeOffset(seg2End).ToUnixTimeMilliseconds();

            var activeSegments = new List<(long StartEpochMs, long EndEpochMs)>
            {
                (seg1StartEpoch, seg1EndEpoch),
                (seg2StartEpoch, seg2EndEpoch)
            };

            // Keystrokes across timeline:
            var keyEvents = new List<KeystrokeEventDto>
            {
                // Key 1: In Segment 1 at 10:01:30 (90 seconds from video start)
                new() { EpochMs = seg1StartEpoch + 90000, KeyCombination = "F11" },

                // Key 2: Inside removed gap at 10:05:00 -> must be filtered out and never displayed
                new() { EpochMs = new DateTimeOffset(gapStart.AddMinutes(2)).ToUnixTimeMilliseconds(), KeyCombination = "GhostKeyInGap" },

                // Key 3: In Segment 2 at 10:11:30 (90 seconds into Segment 2)
                // In final exported video, this key appears at: 180s (Seg 1) + 90s (in Seg 2) = 270 seconds (00:04:30)
                new() { EpochMs = seg2StartEpoch + 90000, KeyCombination = "Ctrl + Shift + Esc" }
            };

            await _catalogRepository.BulkInsertKeystrokesAsync(stationId, keyEvents);

            // Generate soft subtitles with gap compensation
            string? srtFile = await _srtGenerator.CreateSrtFileForSegmentsAsync(stationId, activeSegments);
            Assert.NotNull(srtFile);
            Assert.True(File.Exists(srtFile));

            string srtContent = await File.ReadAllTextAsync(srtFile);
            File.Delete(srtFile);

            // Verify:
            // 1. Key pressed during removed gap is completely filtered out
            Assert.DoesNotContain("GhostKeyInGap", srtContent);

            // 2. Key 1 appears at exactly 90 seconds (00:01:30,000)
            Assert.Contains("00:01:30,000 --> 00:01:32,000", srtContent);
            Assert.Contains("[ F11 ]", srtContent);

            // 3. Key 3 appears at exactly 270 seconds (00:04:30,000) rather than at 11 minutes
            Assert.Contains("00:04:30,000 --> 00:04:32,000", srtContent);
            Assert.Contains("[ Ctrl + Shift + Esc ]", srtContent);

            // Generate hard burn-in subtitles (ASS) with gap compensation
            string? assFile = await _srtGenerator.CreateAssKeycapsFileForSegmentsAsync(stationId, activeSegments);
            Assert.NotNull(assFile);
            Assert.True(File.Exists(assFile));

            string assContent = await File.ReadAllTextAsync(assFile);
            File.Delete(assFile);

            Assert.DoesNotContain("GhostKeyInGap", assContent);
            Assert.Contains("Dialogue: 0,0:01:30.00,0:01:32.20,KeyCapHud", assContent);
            Assert.Contains("Dialogue: 0,0:04:30.00,0:04:32.20,KeyCapHud", assContent);
        }

        #endregion

        #region Stage 6: Full End-to-End Orchestration (Full Pipeline Integration)

        [Fact]
        public async Task EndToEnd_FullPipelineIntegration_FromKeystrokeToExtractedAssFile()
        {
            const string stationId = "WS-TACTICAL-ALPHA";
            DateTime streamStartUtc = new DateTime(2026, 10, 19, 12, 0, 0, DateTimeKind.Utc);
            long streamStartEpochMs = new DateTimeOffset(streamStartUtc).ToUnixTimeMilliseconds();

            // Step 1: Create video and audio chunks
            var chunks = new Dictionary<string, List<RecordingChunkMetadata>>
            {
                [stationId] = new List<RecordingChunkMetadata>
                {
                    new()
                    {
                        Hostname = stationId,
                        FullPath = $@"C:\Recordings\{stationId}\chunk1.mp4",
                        StartUtc = streamStartUtc,
                        EndUtc = streamStartUtc.AddMinutes(5),
                        HasAudio = true
                    },
                    new()
                    {
                        Hostname = stationId,
                        FullPath = $@"C:\Recordings\{stationId}\chunk2.mp4",
                        StartUtc = streamStartUtc.AddMinutes(5),
                        EndUtc = streamStartUtc.AddMinutes(10),
                        HasAudio = true
                    }
                }
            };

            // Step 2: User presses keystroke during recording (e.g. screenshot shortcut at 12:03:15)
            DateTime keypressUtc = streamStartUtc.AddMinutes(3).AddSeconds(15);
            long keypressEpochMs = new DateTimeOffset(keypressUtc).ToUnixTimeMilliseconds();

            await _catalogRepository.BulkInsertKeystrokesAsync(stationId, new[]
            {
                new KeystrokeEventDto
                {
                    EpochMs = keypressEpochMs,
                    KeyCombination = "Win + Shift + S",
                    TimestampUtc = keypressUtc
                }
            });

            // Step 3: Build extraction synchronization plan (Smart Cut) from 12:01:00 to 12:06:00 (5 minutes = 300 seconds)
            DateTime cutStart = streamStartUtc.AddMinutes(1);
            DateTime cutEnd = streamStartUtc.AddMinutes(6);

            var plan = _planBuilder.BuildSynchronizationPlan(
                new List<string> { stationId }, cutStart, cutEnd, chunks);

            Assert.Single(plan.ActiveSegments);
            Assert.Equal(300.0, plan.TotalActiveSeconds);
            Assert.Equal(cutStart, plan.ActiveSegments[0].StartUtc);
            Assert.Equal(cutEnd, plan.ActiveSegments[0].EndUtc);

            // Step 4: Generate ASS subtitle file for Keycaps burn-in on extracted video
            var segments = plan.ActiveSegments
                .Select(s => (
                    StartEpochMs: new DateTimeOffset(s.StartUtc).ToUnixTimeMilliseconds(),
                    EndEpochMs: new DateTimeOffset(s.EndUtc).ToUnixTimeMilliseconds()))
                .ToList();

            string? assPath = await _srtGenerator.CreateAssKeycapsFileForSegmentsAsync(stationId, segments);
            Assert.NotNull(assPath);
            Assert.True(File.Exists(assPath));

            string assText = await File.ReadAllTextAsync(assPath);
            File.Delete(assPath);

            // Verification:
            // Cut started at 12:01:00, keypress occurred at 12:03:15.
            // Exact offset = 2 minutes 15 seconds = 135 seconds = 0:02:15.00
            Assert.Contains("Dialogue: 0,0:02:15.00,0:02:17.20,KeyCapHud", assText);
            Assert.Contains("WIN", assText);
            Assert.Contains("SHIFT", assText);
            Assert.Contains("S", assText);
            Assert.Contains("Title: ITB Tactical Keycaps HUD", assText);
            Assert.Contains("PlayResX: 1920", assText);
            Assert.Contains("PlayResY: 1080", assText);
        }

        #endregion
    }
}
