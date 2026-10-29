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
        None = 0,     // Clean cut without subtitles or burn-in
        Caption = 1,  // Soft subtitle track (mov_text)
        BurnIn = 2    // Hard burn-in onto video frames (subtitles filter)
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
    /// Keystroke telemetry repository interface accessible to central server and extensible feature plugins.
    /// </summary>
    public interface IKeystrokeRepository
    {
        /// <summary>
        /// Bulk inserts captured keystroke events for a given station.
        /// </summary>
        /// <param name="stationId">Target station identifier.</param>
        /// <param name="events">Collection of keystroke events to store.</param>
        Task BulkInsertKeystrokesAsync(string stationId, IEnumerable<KeystrokeEventDto> events);

        /// <summary>
        /// Retrieves recorded keystrokes for a station within the specified epoch millisecond time window.
        /// </summary>
        /// <param name="stationId">Target station identifier.</param>
        /// <param name="fromEpochMs">Start epoch timestamp in milliseconds.</param>
        /// <param name="toEpochMs">End epoch timestamp in milliseconds.</param>
        /// <returns>Read-only list of keystroke event DTOs.</returns>
        Task<IReadOnlyList<KeystrokeEventDto>> GetKeystrokesForWindowAsync(string stationId, long fromEpochMs, long toEpochMs);
    }

    /// <summary>
    /// Subtitle generator interface decoupled from server infrastructure, consumed by export and synchronized track cutting engines.
    /// </summary>
    public interface IKeystrokeSrtGenerator
    {
        /// <summary>
        /// Generates a standard SubRip (SRT) subtitle file for a continuous soft caption track.
        /// </summary>
        /// <param name="stationId">Station identifier.</param>
        /// <param name="inEpochMs">In-point timestamp in epoch milliseconds.</param>
        /// <param name="outEpochMs">Out-point timestamp in epoch milliseconds.</param>
        /// <param name="ct">Cancellation token.</param>
        /// <returns>Path to generated SRT file, or null if no keystrokes found.</returns>
        Task<string?> CreateSrtFileAsync(string stationId, long inEpochMs, long outEpochMs, CancellationToken ct = default);

        /// <summary>
        /// Generates an Advanced SubStation Alpha (ASS) file with tactical keycap styling for hard burn-in.
        /// </summary>
        /// <param name="stationId">Station identifier.</param>
        /// <param name="inEpochMs">In-point timestamp in epoch milliseconds.</param>
        /// <param name="outEpochMs">Out-point timestamp in epoch milliseconds.</param>
        /// <param name="ct">Cancellation token.</param>
        /// <returns>Path to generated ASS file, or null if no keystrokes found.</returns>
        Task<string?> CreateAssKeycapsFileAsync(string stationId, long inEpochMs, long outEpochMs, CancellationToken ct = default);

        /// <summary>
        /// Generates a time-compensated SRT subtitle file matching active timeline segments and accounting for removed global gaps.
        /// </summary>
        /// <param name="stationId">Station identifier.</param>
        /// <param name="activeSegments">Active timeline segments list of (StartEpochMs, EndEpochMs).</param>
        /// <param name="ct">Cancellation token.</param>
        /// <returns>Path to time-aligned SRT file, or null if empty.</returns>
        Task<string?> CreateSrtFileForSegmentsAsync(string stationId, IReadOnlyList<(long StartEpochMs, long EndEpochMs)> activeSegments, CancellationToken ct = default);

        /// <summary>
        /// Generates a time-compensated ASS keycap subtitle file matching active timeline segments and accounting for removed global gaps.
        /// </summary>
        /// <param name="stationId">Station identifier.</param>
        /// <param name="activeSegments">Active timeline segments list of (StartEpochMs, EndEpochMs).</param>
        /// <param name="ct">Cancellation token.</param>
        /// <returns>Path to time-aligned ASS file, or null if empty.</returns>
        Task<string?> CreateAssKeycapsFileForSegmentsAsync(string stationId, IReadOnlyList<(long StartEpochMs, long EndEpochMs)> activeSegments, CancellationToken ct = default);
    }
}