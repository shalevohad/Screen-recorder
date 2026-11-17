// ==========================================
// File: ITB-SCREEN-RECORDER.Core/Media/Models/MediaProbeResult.cs
// ==========================================
using System;
using System.Collections.Generic;

namespace ITB_SCREEN_RECORDER.Core.Media.Models
{
    /// <summary>
    /// Represents structured metadata and stream attributes probed from a media file or stream.
    /// Replaces external ffprobe JSON output with native in-process data structures.
    /// </summary>
    public class MediaProbeResult
    {
        public string FilePath { get; set; } = string.Empty;
        public bool Success { get; set; }
        public string? ErrorMessage { get; set; }

        public TimeSpan Duration { get; set; } = TimeSpan.Zero;
        public long Bitrate { get; set; }
        public string FormatName { get; set; } = string.Empty;

        // Video Stream
        public bool HasVideo { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public double Fps { get; set; } = 30.0;
        public bool IsVfr { get; set; }
        public string VideoCodec { get; set; } = string.Empty;
        public string PixelFormat { get; set; } = "yuv420p";

        // Audio Stream
        public bool HasAudio { get; set; }
        public int AudioSampleRate { get; set; } = 48000;
        public int AudioChannels { get; set; } = 2;
        public string AudioCodec { get; set; } = "aac";

        // Metadata Tags (e.g. itb_start_epoch_ms, hostname)
        public Dictionary<string, string> Metadata { get; set; } = new(StringComparer.OrdinalIgnoreCase);

        /// <summary>
        /// Retrieves the calibrated millisecond start epoch timestamp embedded by AgentWorker.
        /// </summary>
        public long? GetStartEpochMs()
        {
            if (Metadata.TryGetValue("itb_start_epoch_ms", out var val) && long.TryParse(val, out long epoch))
            {
                return epoch;
            }
            return null;
        }

        /// <summary>
        /// Retrieves the calibrated start timestamp as UTC DateTimeOffset.
        /// </summary>
        public DateTimeOffset? GetStartEpochUtc()
        {
            var epoch = GetStartEpochMs();
            return epoch.HasValue ? DateTimeOffset.FromUnixTimeMilliseconds(epoch.Value) : null;
        }
    }
}
