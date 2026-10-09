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
        Task<string?> CreateSrtFileAsync(string stationId, long inEpochMs, long outEpochMs, CancellationToken ct = default);
    }
}