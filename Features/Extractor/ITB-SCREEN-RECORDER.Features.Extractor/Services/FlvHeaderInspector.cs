// ==========================================
// File: Features/Extractor/Services/FlvHeaderInspector.cs
// ==========================================
using System;
using System.IO;
using System.Text;
using System.Globalization;
using System.Text.RegularExpressions;

namespace ITB_SCREEN_RECORDER.Features.Extractor.Services
{
    public record VideoMetadataResult(DateTime StartUtc, TimeSpan Duration)
    {
        public DateTime EndUtc => StartUtc + Duration;
    }

    public static class FlvHeaderInspector
    {
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

                byte[] buffer = new byte[65536];
                int bytesRead = fs.Read(buffer, 0, buffer.Length);
                if (bytesRead < 32) return null;

                var span = new ReadOnlySpan<byte>(buffer, 0, bytesRead);

                // 1. אם הקובץ הוא FLV טהור
                if (buffer[0] == 0x46 && buffer[1] == 0x4C && buffer[2] == 0x56)
                {
                    DateTime? startUtc = ReadCreationTime(span);
                    TimeSpan? duration = ReadDuration(span);

                    if (startUtc.HasValue)
                    {
                        return new VideoMetadataResult(startUtc.Value, duration ?? TimeSpan.FromMinutes(15));
                    }
                }

                // 2. בדיקת MP4 / fMP4 / כל קובץ וידאו המכיל In-Band Metadata של ITB
                string headerText = Encoding.ASCII.GetString(buffer, 0, bytesRead);

                // בדיקת ITB_EPOCH:1759583561000
                var matchEpoch = Regex.Match(headerText, @"ITB_EPOCH:(\d{10,13})");
                if (matchEpoch.Success && long.TryParse(matchEpoch.Groups[1].Value, out long epoch))
                {
                    long startMs = epoch < 100000000000L ? epoch * 1000 : epoch;
                    DateTime startUtc = DateTimeOffset.FromUnixTimeMilliseconds(startMs).UtcDateTime;
                    return new VideoMetadataResult(startUtc, TimeSpan.FromMinutes(15));
                }

                // בדיקת itb_start_epoch_ms
                var matchStartEpoch = Regex.Match(headerText, @"itb_start_epoch_ms[^\d]*(\d{10,13})");
                if (matchStartEpoch.Success && long.TryParse(matchStartEpoch.Groups[1].Value, out long startEpoch))
                {
                    long startMs = startEpoch < 100000000000L ? startEpoch * 1000 : startEpoch;
                    DateTime startUtc = DateTimeOffset.FromUnixTimeMilliseconds(startMs).UtcDateTime;
                    return new VideoMetadataResult(startUtc, TimeSpan.FromMinutes(15));
                }

                // בדיקת creation_time בפורמט ISO
                var matchIso = Regex.Match(headerText, @"creation_time[^\d]*(\d{4}-\d{2}-\d{2}[T_ ]\d{2}:\d{2}:\d{2}(?:\.\d+)?Z?)");
                if (matchIso.Success && DateTime.TryParse(matchIso.Groups[1].Value, CultureInfo.InvariantCulture,
                    DateTimeStyles.AssumeUniversal | DateTimeStyles.AdjustToUniversal, out DateTime parsedUtc))
                {
                    return new VideoMetadataResult(parsedUtc, TimeSpan.FromMinutes(15));
                }
            }
            catch
            {
            }

            return null;
        }

        private static DateTime? ReadCreationTime(ReadOnlySpan<byte> span)
        {
            int keyIndex = span.IndexOf(CreationTimeKey);
            if (keyIndex == -1) return null;

            int valueOffset = keyIndex + CreationTimeKey.Length;
            if (valueOffset + 3 >= span.Length) return null;

            if (span[valueOffset] == 0x02)
            {
                int stringLength = (span[valueOffset + 1] << 8) | span[valueOffset + 2];
                int stringStart = valueOffset + 3;

                if (stringStart + stringLength <= span.Length)
                {
                    string dateStr = Encoding.UTF8.GetString(span.Slice(stringStart, stringLength));

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