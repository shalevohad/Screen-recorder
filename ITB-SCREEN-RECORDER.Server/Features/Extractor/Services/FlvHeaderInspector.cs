using System;
using System.IO;
using System.Text;
using System.Globalization;

namespace ITB_SCREEN_RECORDER.Server.Features.Extractor.Services
{
    public record VideoMetadataResult(DateTime StartUtc, TimeSpan Duration)
    {
        public DateTime EndUtc => StartUtc + Duration;
    }

    public static class FlvHeaderInspector
    {
        // 💡 עדכון המפתח לסטנדרט של FFmpeg
        private static readonly byte[] CreationTimeKey = "creation_time"u8.ToArray();
        private static readonly byte[] DurationKey = "duration"u8.ToArray();

        public static VideoMetadataResult? ExtractMetadata(string filePath)
        {
            try
            {
                using var fs = new FileStream(
                    filePath,
                    FileMode.Open,
                    FileAccess.Read,
                    FileShare.ReadWrite | FileShare.Delete
                );

                byte[] buffer = new byte[4096];
                int bytesRead = fs.Read(buffer, 0, buffer.Length);
                if (bytesRead < 128) return null;

                if (buffer[0] != 0x46 || buffer[1] != 0x4C || buffer[2] != 0x56)
                {
                    return null;
                }

                var span = new ReadOnlySpan<byte>(buffer, 0, bytesRead);

                DateTime? startUtc = ReadCreationTime(span);
                TimeSpan? duration = ReadDuration(span);

                if (startUtc.HasValue && duration.HasValue)
                {
                    return new VideoMetadataResult(startUtc.Value, duration.Value);
                }
            }
            catch
            {
                // File locked or inaccessible
            }

            return null;
        }

        private static DateTime? ReadCreationTime(ReadOnlySpan<byte> span)
        {
            int keyIndex = span.IndexOf(CreationTimeKey);
            if (keyIndex == -1) return null;

            int valueOffset = keyIndex + CreationTimeKey.Length;
            if (valueOffset + 3 >= span.Length) return null;

            // AMF0 String Type: 0x02
            if (span[valueOffset] == 0x02)
            {
                int stringLength = (span[valueOffset + 1] << 8) | span[valueOffset + 2];
                int stringStart = valueOffset + 3;

                if (stringStart + stringLength <= span.Length)
                {
                    string dateStr = Encoding.UTF8.GetString(span.Slice(stringStart, stringLength));

                    // FFmpeg שומר את ה-creation_time ב-UTC כברירת מחדל
                    if (DateTime.TryParse(
                        dateStr,
                        CultureInfo.InvariantCulture,
                        DateTimeStyles.AdjustToUniversal | DateTimeStyles.AssumeUniversal,
                        out DateTime parsedDate))
                    {
                        return parsedDate;
                    }
                }
            }

            return null;
        }

        private static TimeSpan? ReadDuration(ReadOnlySpan<byte> span)
        {
            int keyIndex = span.IndexOf(DurationKey);
            if (keyIndex == -1) return null;

            int valueOffset = keyIndex + DurationKey.Length;
            if (valueOffset + 9 >= span.Length) return null;

            // AMF0 Number Type: 0x00 (8-byte double)
            if (span[valueOffset] == 0x00)
            {
                byte[] doubleBytes = span.Slice(valueOffset + 1, 8).ToArray();
                if (BitConverter.IsLittleEndian)
                {
                    Array.Reverse(doubleBytes);
                }

                double seconds = BitConverter.ToDouble(doubleBytes, 0);
                if (seconds > 0 && !double.IsNaN(seconds) && !double.IsInfinity(seconds))
                {
                    return TimeSpan.FromSeconds(seconds);
                }
            }

            return null;
        }
    }
}