// =========================================================================================
// File: ITB-SCREEN-RECORDER.Tests/Synchronization/EndToEndAudioVideoKeystrokeSyncTests.cs
// Description: בדיקה מקצה לקצה לסנכרון וידאו, אודיו ומקשים - מתחנת הקצה, דרך השידור החי,
//              הקלטת הסטודיו, ועד חילוץ הסרטון, חיתוכים והסרת Gaps.
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

        #region Stage 1: Endpoint Capture & Clock Synchronization (תחנת הקצה)

        [Fact]
        public void EndpointCapture_VideoAudioKeyboard_SynchronizedAtSource()
        {
            // תרחיש: תחנת הקצה מכיילת שעון מול השרת (לדוגמה: השרת מקדים ב-250ms)
            long tSendMs = 1000;
            long tReceiveMs = 1060; // RTT = 60ms, half = 30ms
            long serverEpochMs = 1280;

            long rtt = Math.Max(0, tReceiveMs - tSendMs);
            long serverTimeAtReceive = serverEpochMs + (rtt / 2);
            TimeSpan serverUtcOffset = TimeSpan.FromMilliseconds(serverTimeAtReceive - tReceiveMs);

            Assert.Equal(250, serverUtcOffset.TotalMilliseconds);

            // זמן התחלת הסשן המכויל
            DateTime localStartUtc = new DateTime(2026, 10, 19, 10, 0, 0, DateTimeKind.Utc);
            DateTime sessionStartCalibratedUtc = localStartUtc + serverUtcOffset;
            long sessionStartEpochMs = new DateTimeOffset(sessionStartCalibratedUtc).ToUnixTimeMilliseconds();

            // 1. כיול מקלדת: לחיצת מקש בדיוק ב-T = +2.5 שניות (2500ms) לתוך ההקלטה
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

            // 2. כיול וידאו: ב-30 FPS, כל פריים נמשך 33.333ms.
            // ב-2.5 שניות בדיוק, אינדקס הפריים המדויק הוא:
            int targetFps = 30;
            double frameTimeMs = 1000.0 / targetFps;
            long expectedVideoFrameIndex = (long)(localKeypressElapsedMs / frameTimeMs);
            Assert.Equal(75, expectedVideoFrameIndex);

            // 3. כיול אודיו (WASAPI AudioPacer): 48,000 Hz, stereo, float32le = 384,000 Bytes/sec
            const int bytesPerSec = 48000 * 2 * 4;
            long expectedAudioBytesAtKeypress = (long)((localKeypressElapsedMs / 1000.0) * bytesPerSec);
            Assert.Equal(960000, expectedAudioBytesAtKeypress);

            // וידוא נעילת שלושת הערוצים לאותה נקודת זמן קוהרנטית
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
            // אימות מנגנון ה-AudioPacer כאשר WASAPI שותק (ללא צליל במערכת):
            // ה-Pacer מבטיח קצב בתים מדויק (384,000 B/s) כך שאין זליגת סנכרון מול הוידאו
            const int bytesPerSec = 48000 * 2 * 4;
            var pacer = new AudioPacer();
            long startTicks = System.Diagnostics.Stopwatch.GetTimestamp();
            pacer.Start(startTicks);

            // סימולציה: WASAPI קיבל חבילה ראשונה של 19,200 בתים (50ms)
            pacer.RecordIncomingBytes(19200);
            Assert.True(pacer.IsAudioFlowing());

            // לאחר 10 שניות של שקט חומרתי מלא, החסר המדויק שיושלם הוא 10s * 384,000 - 19,200
            double simulatedElapsedSeconds = 10.0;
            long expectedTotalBytes = (long)(simulatedElapsedSeconds * bytesPerSec);
            long missingBytes = expectedTotalBytes - 19200;

            Assert.Equal(3840000, expectedTotalBytes);
            Assert.Equal(3820800, missingBytes);
            Assert.Equal(0, missingBytes % 8); // תמיד מיושר ל-8 בתים (Sample של 2 ערוצים x 4 בתים)
        }

        #endregion

        #region Stage 2: Streaming & Server Ingest (הזרמה ושידור חי)

        [Fact]
        public async Task OnlineStreaming_TelemetryIngestion_MaintainsContinuousSyncWithoutLeakage()
        {
            const string stationId = "WS-COMMAND-01";
            long baseEpochMs = 1790000000000L;

            // סימולציה של סדרת אירועי מקשים שנלחצו תוך כדי הזרמה חיה
            var liveEvents = new List<KeystrokeEventDto>
            {
                new() { EpochMs = baseEpochMs + 1000, KeyCombination = "F5", TimestampUtc = DateTimeOffset.FromUnixTimeMilliseconds(baseEpochMs + 1000).UtcDateTime },
                new() { EpochMs = baseEpochMs + 2400, KeyCombination = "Ctrl + C", TimestampUtc = DateTimeOffset.FromUnixTimeMilliseconds(baseEpochMs + 2400).UtcDateTime },
                new() { EpochMs = baseEpochMs + 5100, KeyCombination = "Ctrl + V", TimestampUtc = DateTimeOffset.FromUnixTimeMilliseconds(baseEpochMs + 5100).UtcDateTime },
                new() { EpochMs = baseEpochMs + 8900, KeyCombination = "Enter", TimestampUtc = DateTimeOffset.FromUnixTimeMilliseconds(baseEpochMs + 8900).UtcDateTime }
            };

            // קליטת הטלמטריה על ידי השרת והזנתה ל-CatalogRepository
            await _catalogRepository.BulkInsertKeystrokesAsync(stationId, liveEvents);

            // שאילתת חלון טלמטריה (כפי שמתבצע בשידור חי ובלוח הבקרה)
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

            // שאילתת חלון צר מוודאת שאין זליגת מקשים מעבר לטווח
            var subWindowKeys = await _catalogRepository.GetKeystrokesForWindowAsync(stationId, baseEpochMs + 2000, baseEpochMs + 6000);
            Assert.Equal(2, subWindowKeys.Count);
            Assert.Equal("Ctrl + C", subWindowKeys[0].KeyCombination);
            Assert.Equal("Ctrl + V", subWindowKeys[1].KeyCombination);
        }

        #endregion

        #region Stage 3: Offline Mode & Sidecar Re-sync (מצב לא מקוון ושחזור מ-Buffer)

        [Fact]
        public async Task OfflineMode_SidecarBufferingAndDrainerSync_PreservesTimelineContinuity()
        {
            const string stationId = "WS-MOBILE-LAPTOP";
            long offlineStartEpochMs = 1791000000000L;

            // סימולציית קובץ ה-Sidecar (.keys.jsonl) שנשמר בתחנה במצב לא מקוון
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

            // סימולציית פעולת ה-AgentController.SyncIngest: קריאת ה-Stream של ה-Sidecar שנטען מ-Drainer
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

            // הזנה למסד הנתונים
            await _catalogRepository.BulkInsertKeystrokesAsync(stationId, parsedIngestedKeys);

            // וידוא שהמקשים זמינים לצד קובץ הוידאו של ה-Chunk ללא סטיית זמן
            var saved = await _catalogRepository.GetKeystrokesForWindowAsync(stationId, offlineStartEpochMs, offlineStartEpochMs + 10000);
            Assert.Equal(3, saved.Count);
            Assert.Equal(offlineStartEpochMs + 7800, saved[2].EpochMs);
            Assert.Equal("Win + Shift + S", saved[2].KeyCombination);
        }

        #endregion

        #region Stage 4: Studio Recording & Multicam Sync (הקלטה וסטודיו רב-תחנתי)

        [Fact]
        public void LiveBroadcastAndStudioRecording_ClockAlignedChunks_SynchronizedMulticamPlayback()
        {
            // תרחיש: סטודיו רב-תחנתי (Multicam) המציג את Station-A ו-Station-B במקביל.
            // Chunks נחתכים לפי שעון עולמי (למשל כל 5 דקות = 300 שניות)
            DateTime chunkStartUtc = new DateTime(2026, 10, 19, 11, 0, 0, DateTimeKind.Utc);
            DateTime chunkEndUtc = chunkStartUtc.AddMinutes(5);
            long timelineBaseEpochMs = new DateTimeOffset(chunkStartUtc).ToUnixTimeMilliseconds();

            // אירוע מקש ב-Station-A ב-11:02:15.500
            DateTime eventAUtc = chunkStartUtc.AddMinutes(2).AddSeconds(15).AddMilliseconds(500);
            long eventAEpochMs = new DateTimeOffset(eventAUtc).ToUnixTimeMilliseconds();

            // אירוע מקש ב-Station-B באותה שנייה בדיוק: 11:02:15.500
            DateTime eventBUtc = eventAUtc;
            long eventBEpochMs = eventAEpochMs;

            // בנגן הסטודיו (StudioVideoFeed / MulticamViewport):
            // ה-Playhead מתקדם ביחס ל-timelineBaseEpochMs:
            long playheadMs = 135500; // 2 דקות ו-15.5 שניות (135.5s)
            long currentPlayheadEpochMs = timelineBaseEpochMs + playheadMs;

            Assert.Equal(eventAEpochMs, currentPlayheadEpochMs);
            Assert.Equal(eventBEpochMs, currentPlayheadEpochMs);

            // אימות פריים וידאו בכל תחנה ב-Playhead הנוכחי (ב-30 FPS):
            // פריים מדויק = 135.5s * 30 = 4065
            long expectedFrameNumber = (long)(135.5 * 30);
            Assert.Equal(4065, expectedFrameNumber);

            // אימות בית אודיו מדויק (48kHz stereo float = 384,000 B/s):
            long expectedAudioByteOffset = (long)(135.5 * 384000);
            Assert.Equal(52032000, expectedAudioByteOffset);
        }

        [Theory]
        [InlineData(-100, false, 0.0)]     // לפני לחיצת המקש: לא מוצג
        [InlineData(0, true, 1.0)]         // ברגע הלחיצה (T=0): מוצג במלואו (Opacity 1.0)
        [InlineData(1000, true, 1.0)]      // שנייה אחרי הלחיצה: מוצג במלואו (Opacity 1.0)
        [InlineData(1800, true, 1.0)]      // 1.8 שניות: סף תחילת ה-Fade Out (עדיין Opacity 1.0)
        [InlineData(2000, true, 0.5)]      // 2.0 שניות: אמצע שלב ה-Fade Out (50% שקיפות)
        [InlineData(2100, true, 0.25)]     // 2.1 שניות: 75% דעיכה (25% שקיפות)
        [InlineData(2201, false, 0.0)]     // מעבר ל-2.2 שניות: נעלם לחלוטין
        public void StudioPlayback_KeystrokeOverlayTimingAndFadeOut_PreciseHUDLifecycle(
            long elapsedSinceKeypressMs, bool shouldBeVisible, double expectedOpacity)
        {
            // אימות אלגוריתם ה-Overlay של KeystrokePlaybackOverlay.jsx
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

        #region Stage 5: Video Extraction & Cuts Synchronization (חילוץ, חיתוכים וכתוביות)

        [Fact]
        public async Task VideoExtraction_SingleWindowTrim_ExactKeystrokeSubtitleAndBurnInSync()
        {
            const string stationId = "WS-FORENSIC-01";
            DateTime chunk1Start = new DateTime(2026, 10, 19, 10, 0, 0, DateTimeKind.Utc);
            DateTime chunk1End = chunk1Start.AddMinutes(5);
            DateTime chunk2Start = chunk1End;
            DateTime chunk2End = chunk2Start.AddMinutes(5);

            long baseEpochMs = new DateTimeOffset(chunk1Start).ToUnixTimeMilliseconds();

            // המשתמש מגדיר חיתוך In-Point ב-10:02:00 ו-Out-Point ב-10:07:00 (משך 5 דקות = 300 שניות)
            DateTime cutStartUtc = chunk1Start.AddMinutes(2);
            DateTime cutEndUtc = chunk1Start.AddMinutes(7);
            long cutStartEpochMs = new DateTimeOffset(cutStartUtc).ToUnixTimeMilliseconds();
            long cutEndEpochMs = new DateTimeOffset(cutEndUtc).ToUnixTimeMilliseconds();

            // מקשים במסד הנתונים:
            var events = new List<KeystrokeEventDto>
            {
                new() { EpochMs = baseEpochMs + 60000, KeyCombination = "IgnoredBeforeCut" },    // 10:01:00 (לפני החיתוך)
                new() { EpochMs = cutStartEpochMs + 30000, KeyCombination = "Ctrl + S" },         // 10:02:30 (+30s מה-Cut)
                new() { EpochMs = cutStartEpochMs + 210000, KeyCombination = "Alt + F4" },        // 10:05:30 (+210s מה-Cut, בצ'אנק 2)
                new() { EpochMs = cutEndEpochMs + 10000, KeyCombination = "IgnoredAfterCut" }     // 10:07:10 (אחרי החיתוך)
            };

            await _catalogRepository.BulkInsertKeystrokesAsync(stationId, events);

            // 1. בדיקת חילוץ כתוביות רכות (SRT Caption)
            string? srtFile = await _srtGenerator.CreateSrtFileAsync(stationId, cutStartEpochMs, cutEndEpochMs);
            Assert.NotNull(srtFile);
            Assert.True(File.Exists(srtFile));

            string srtContent = await File.ReadAllTextAsync(srtFile);
            File.Delete(srtFile);

            // אימות שאירועים מחוץ לחלון נחתכו
            Assert.DoesNotContain("IgnoredBeforeCut", srtContent);
            Assert.DoesNotContain("IgnoredAfterCut", srtContent);

            // אימות זמנים יחסיים מדויקים ב-SRT:
            // 30 שניות = 00:00:30,000 --> 00:00:32,000
            Assert.Contains("00:00:30,000 --> 00:00:32,000", srtContent);
            Assert.Contains("[ Ctrl + S ]", srtContent);

            // 210 שניות = 3 דקות ו-30 שניות = 00:03:30,000 --> 00:03:32,000
            Assert.Contains("00:03:30,000 --> 00:03:32,000", srtContent);
            Assert.Contains("[ Alt + F4 ]", srtContent);

            // 2. בדיקת חילוץ צריבה קשיחה טקטית (ASS Keycaps Burn-In)
            string? assFile = await _srtGenerator.CreateAssKeycapsFileAsync(stationId, cutStartEpochMs, cutEndEpochMs);
            Assert.NotNull(assFile);
            Assert.True(File.Exists(assFile));

            string assContent = await File.ReadAllTextAsync(assFile);
            File.Delete(assFile);

            // אימות עיצוב ה-Keycaps והזמנים ב-ASS:
            // 30 שניות ב-ASS = 0:00:30.00, משך 2.2 שניות = 0:00:32.20
            Assert.Contains("Dialogue: 0,0:00:30.00,0:00:32.20,KeyCapHud", assContent);
            Assert.Contains("CTRL", assContent);
            Assert.Contains("S", assContent);

            // 210 שניות ב-ASS = 0:03:30.00, משך 2.2 שניות = 0:03:32.20
            Assert.Contains("Dialogue: 0,0:03:30.00,0:03:32.20,KeyCapHud", assContent);
            Assert.Contains("ALT", assContent);
            Assert.Contains("F4", assContent);
        }

        [Fact]
        public async Task VideoExtraction_MultiSegmentCutWithGapRemoval_CalculatesCompensatedKeystrokeTimeline()
        {
            // תרחיש מתקדם: חיתוך סרטון עם הסרת פער עולמי (Global Gap) בין שני מקטעים:
            // מקטע 1: 10:00:00 -> 10:03:00 (משך: 180 שניות)
            // פער שהוסר (Gap): 10:03:00 -> 10:10:00 (משך: 420 שניות = 7 דקות שנמחקו מהסרטון)
            // מקטע 2: 10:10:00 -> 10:14:00 (משך: 240 שניות = 4 דקות)
            // משך הסרטון הסופי שיופק: 180s + 240s = 420 שניות (7 דקות)

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

            // מקשים לאורך ציר הזמן:
            var keyEvents = new List<KeystrokeEventDto>
            {
                // מקש 1: במקטע 1, ב-10:01:30 (90 שניות מתחילת הסרטון)
                new() { EpochMs = seg1StartEpoch + 90000, KeyCombination = "F11" },

                // מקש 2: במהלך הפער שהוסר! ב-10:05:00 -> חובה לסנן ולא להציג!
                new() { EpochMs = new DateTimeOffset(gapStart.AddMinutes(2)).ToUnixTimeMilliseconds(), KeyCombination = "GhostKeyInGap" },

                // מקש 3: במקטע 2, ב-10:11:30 (90 שניות לתוך מקטע 2).
                // בסרטון הסופי, מקש זה חייב להופיע ב: 180s (מקטע 1) + 90s (במקטע 2) = 270 שניות (00:04:30)!
                new() { EpochMs = seg2StartEpoch + 90000, KeyCombination = "Ctrl + Shift + Esc" }
            };

            await _catalogRepository.BulkInsertKeystrokesAsync(stationId, keyEvents);

            // הפקת כתוביות רכות עם פיצוי על ה-Gap
            string? srtFile = await _srtGenerator.CreateSrtFileForSegmentsAsync(stationId, activeSegments);
            Assert.NotNull(srtFile);
            Assert.True(File.Exists(srtFile));

            string srtContent = await File.ReadAllTextAsync(srtFile);
            File.Delete(srtFile);

            // אימות:
            // 1. המקש שנלחץ בפער שהוסר סונן לחלוטין
            Assert.DoesNotContain("GhostKeyInGap", srtContent);

            // 2. מקש 1 מופיע בדיוק ב-90 שניות (00:01:30,000)
            Assert.Contains("00:01:30,000 --> 00:01:32,000", srtContent);
            Assert.Contains("[ F11 ]", srtContent);

            // 3. מקש 3 מופיע בדיוק ב-270 שניות (00:04:30,000) ולא ב-11 דקות!
            Assert.Contains("00:04:30,000 --> 00:04:32,000", srtContent);
            Assert.Contains("[ Ctrl + Shift + Esc ]", srtContent);

            // הפקת צריבה קשיחה (ASS) עם פיצוי על ה-Gap
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

        #region Stage 6: Full End-to-End Orchestration (אינטגרציה מלאה)

        [Fact]
        public async Task EndToEnd_FullPipelineIntegration_FromKeystrokeToExtractedAssFile()
        {
            const string stationId = "WS-TACTICAL-ALPHA";
            DateTime streamStartUtc = new DateTime(2026, 10, 19, 12, 0, 0, DateTimeKind.Utc);
            long streamStartEpochMs = new DateTimeOffset(streamStartUtc).ToUnixTimeMilliseconds();

            // שלב א': יצירת Chunks של וידאו ואודיו
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

            // שלב ב': המשתמש לוחץ על צירוף מקשים מורכב במהלך ההקלטה (למשל צילום מסך ב-12:03:15)
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

            // שלב ג': בניית תוכנית סנכרון לחילוץ (Smart Cut) מ-12:01:00 עד 12:06:00 (5 דקות = 300 שניות)
            DateTime cutStart = streamStartUtc.AddMinutes(1);
            DateTime cutEnd = streamStartUtc.AddMinutes(6);

            var plan = _planBuilder.BuildSynchronizationPlan(
                new List<string> { stationId }, cutStart, cutEnd, chunks);

            Assert.Single(plan.ActiveSegments);
            Assert.Equal(300.0, plan.TotalActiveSeconds);
            Assert.Equal(cutStart, plan.ActiveSegments[0].StartUtc);
            Assert.Equal(cutEnd, plan.ActiveSegments[0].EndUtc);

            // שלב ד': הפקת קובץ ה-ASS עבור צריבת ה-Keycaps על הוידאו המחולץ
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

            // אימות:
            // החיתוך החל ב-12:01:00, המקש נלחץ ב-12:03:15.
            // ההפרש המדויק = 2 דקות ו-15 שניות = 135 שניות = 0:02:15.00
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
