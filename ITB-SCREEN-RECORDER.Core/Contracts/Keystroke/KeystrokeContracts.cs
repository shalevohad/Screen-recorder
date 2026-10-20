using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using System.Threading;
using System.Threading.Tasks;

namespace ITB_SCREEN_RECORDER.Core.Contracts.Keystroke
{
    using System.Text.Json;

    [JsonConverter(typeof(FlexibleKeystrokeExportModeConverter))]
    public enum KeystrokeExportMode
    {
        None = 0,     // חיתוך נקי ללא כתוביות או צריבה
        Caption = 1,  // רצועת כתוביות רכה (mov_text)
        BurnIn = 2    // צריבה קשיחה על גבי הפיקסלים (subtitles filter)
    }

    public class FlexibleKeystrokeExportModeConverter : JsonConverter<KeystrokeExportMode>
    {
        public override KeystrokeExportMode Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            if (reader.TokenType == JsonTokenType.String)
            {
                string? str = reader.GetString();
                if (string.IsNullOrWhiteSpace(str)) return KeystrokeExportMode.None;

                str = str.Trim().ToUpperInvariant().Replace("-", "_");
                if (str == "BURN_IN" || str == "BURNIN" || str == "HARD") return KeystrokeExportMode.BurnIn;
                if (str == "CAPTION" || str == "SOFT" || str == "SUBTITLE") return KeystrokeExportMode.Caption;
                if (str == "NONE" || str == "OFF" || str == "CLEAN") return KeystrokeExportMode.None;

                if (Enum.TryParse<KeystrokeExportMode>(str, true, out var parsed)) return parsed;
            }
            else if (reader.TokenType == JsonTokenType.Number)
            {
                int val = reader.GetInt32();
                return val switch
                {
                    0 => KeystrokeExportMode.None,
                    1 => KeystrokeExportMode.Caption,
                    2 => KeystrokeExportMode.BurnIn,
                    _ => KeystrokeExportMode.None
                };
            }

            return KeystrokeExportMode.None;
        }

        public override void Write(Utf8JsonWriter writer, KeystrokeExportMode value, JsonSerializerOptions options)
        {
            writer.WriteStringValue(value.ToString());
        }
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