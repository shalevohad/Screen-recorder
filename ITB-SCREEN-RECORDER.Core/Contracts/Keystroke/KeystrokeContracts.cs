using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using System.Threading;
using System.Threading.Tasks;

namespace ITB_SCREEN_RECORDER.Core.Contracts.Keystroke
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum KeystrokeExportMode
    {
        Caption = 0, // רצועת כתוביות רכה (mov_text) - ללא Re-encoding
        BurnIn = 1,  // צריבה קשיחה על גבי הפיקסלים (subtitles filter)
        None = 2     // חיתוך נקי ללא כתוביות או צריבה
    }

    public sealed class KeystrokeEventDto
    {
        [JsonPropertyName("epochMs")]
        public long EpochMs { get; set; }

        [JsonPropertyName("keyCombination")]
        public string KeyCombination { get; set; } = string.Empty;

        [JsonPropertyName("timestampUtc")]
        public DateTime TimestampUtc { get; set; } = DateTime.UtcNow;
    }

    /// <summary>
    /// ממשק גישה לנתוני המקלדת - נגיש הן לשרת והן לכלל הפלאגינים
    /// </summary>
    public interface IKeystrokeRepository
    {
        Task BulkInsertKeystrokesAsync(string stationId, IEnumerable<KeystrokeEventDto> events);
        Task<IReadOnlyList<KeystrokeEventDto>> GetKeystrokesForWindowAsync(string stationId, long fromEpochMs, long toEpochMs);
    }

    /// <summary>
    /// ממשק מחולל כתוביות ה-SRT - נגיש ל-SynchronizedTrackCutter ללא תלות ב-Server
    /// </summary>
    public interface IKeystrokeSrtGenerator
    {
        /// <summary>
        /// מייצר קובץ SRT סטנדרטי עבור רצועת כתוביות רכה (Caption Track)
        /// </summary>
        Task<string?> CreateSrtFileAsync(string stationId, long inEpochMs, long outEpochMs, CancellationToken ct = default);

        /// <summary>
        /// מייצר קובץ ASS מתקדם עם תגיות Keycaps טקטיות עבור צריבה קשיחה בווידאו (Burn-In)
        /// </summary>
        Task<string?> CreateAssKeycapsFileAsync(string stationId, long inEpochMs, long outEpochMs, CancellationToken ct = default);

        /// <summary>
        /// מייצר קובץ SRT המותאם למקטעים פעילים ומפצה על פערים שהוסרו (Global Gaps)
        /// </summary>
        Task<string?> CreateSrtFileForSegmentsAsync(string stationId, IReadOnlyList<(long StartEpochMs, long EndEpochMs)> activeSegments, CancellationToken ct = default);

        /// <summary>
        /// מייצר קובץ ASS המותאם למקטעים פעילים ומפצה על פערים שהוסרו (Global Gaps)
        /// </summary>
        Task<string?> CreateAssKeycapsFileForSegmentsAsync(string stationId, IReadOnlyList<(long StartEpochMs, long EndEpochMs)> activeSegments, CancellationToken ct = default);
    }
}