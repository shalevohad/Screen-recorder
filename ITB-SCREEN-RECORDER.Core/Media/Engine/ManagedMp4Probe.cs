// ==========================================
// File: ITB-SCREEN-RECORDER.Core/Media/Engine/ManagedMp4Probe.cs
// ==========================================
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using ITB_SCREEN_RECORDER.Core.Common;
using ITB_SCREEN_RECORDER.Core.Media.Models;

namespace ITB_SCREEN_RECORDER.Core.Media.Engine
{
    /// <summary>
    /// Pure managed, zero-dependency ISO Base Media File Format (MP4 / MOV) container and stream probe.
    /// Extracts video/audio geometry, codecs, sample rates, channel layouts, framerates, and forensic metadata (itb_start_epoch_ms)
    /// in sub-millisecond time entirely in-memory without spawning external ffprobe.exe or requiring native C shared libraries.
    /// Strictly complies with Rule 10 (non-locking file access: FileShare.ReadWrite | FileShare.Delete).
    /// </summary>
    public static class ManagedMp4Probe
    {
        public static MediaProbeResult ProbeFile(string filePath)
        {
            var result = new MediaProbeResult
            {
                FilePath = filePath,
                FormatName = "mp4",
                PixelFormat = "yuv420p"
            };

            if (string.IsNullOrWhiteSpace(filePath) || !File.Exists(filePath))
            {
                result.ErrorMessage = "File does not exist or invalid path.";
                return result;
            }

            try
            {
                var fileInfo = new FileInfo(filePath);
                long fileLength = fileInfo.Length;
                if (fileLength < 16)
                {
                    result.ErrorMessage = "File is too small to be a valid MP4 container.";
                    return result;
                }

                // Rule 10: Non-locking file access for near-live chunk files
                using var stream = new FileStream(filePath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite | FileShare.Delete, 8192);

                double movieTimescale = 0;
                double movieDurationUnits = 0;

                while (stream.Position + 8 <= fileLength)
                {
                    long boxStart = stream.Position;
                    uint size32 = ReadUInt32BE(stream);
                    string boxType = ReadAscii(stream, 4);

                    long boxSize = size32 == 1 ? ReadInt64BE(stream) : size32;
                    if (boxSize == 0)
                    {
                        boxSize = fileLength - boxStart;
                    }

                    if (boxSize < 8 || boxStart + boxSize > fileLength && boxStart + boxSize != fileLength)
                    {
                        // Some files in flight might have partial chunks, clamp to fileLength
                        boxSize = fileLength - boxStart;
                    }

                    long boxEnd = boxStart + boxSize;

                    if (boxType == "moov")
                    {
                        ParseMoov(stream, boxEnd, result, ref movieTimescale, ref movieDurationUnits);
                    }
                    else if (boxType == "udta")
                    {
                        ParseUdta(stream, boxEnd, result);
                    }

                    stream.Position = Math.Min(boxEnd, fileLength);
                }

                if (movieTimescale > 0 && movieDurationUnits > 0)
                {
                    double totalSec = movieDurationUnits / movieTimescale;
                    result.Duration = TimeSpan.FromSeconds(totalSec);
                    if (totalSec > 0 && fileLength > 0)
                    {
                        result.Bitrate = (long)((fileLength * 8.0) / totalSec);
                    }
                }

                result.Success = result.HasVideo || result.HasAudio;
                return result;
            }
            catch (Exception ex)
            {
                result.ErrorMessage = $"Managed MP4 probe error: {ex.Message}";
                Logger.Warn($"[MANAGED-MP4-PROBE] Failed probing '{filePath}': {ex.Message}");
                return result;
            }
        }

        private static void ParseMoov(
            Stream stream,
            long moovEnd,
            MediaProbeResult result,
            ref double movieTimescale,
            ref double movieDurationUnits)
        {
            while (stream.Position + 8 <= moovEnd)
            {
                long boxStart = stream.Position;
                uint size32 = ReadUInt32BE(stream);
                string boxType = ReadAscii(stream, 4);

                long boxSize = size32 == 1 ? ReadInt64BE(stream) : size32;
                if (boxSize == 0) boxSize = moovEnd - boxStart;
                long boxEnd = Math.Min(boxStart + boxSize, moovEnd);

                if (boxType == "mvhd")
                {
                    ParseMvhd(stream, boxEnd, ref movieTimescale, ref movieDurationUnits);
                }
                else if (boxType == "trak")
                {
                    ParseTrak(stream, boxEnd, result, movieTimescale, movieDurationUnits);
                }
                else if (boxType == "udta")
                {
                    ParseUdta(stream, boxEnd, result);
                }

                stream.Position = boxEnd;
            }
        }

        private static void ParseMvhd(
            Stream stream,
            long mvhdEnd,
            ref double movieTimescale,
            ref double movieDurationUnits)
        {
            if (stream.Position >= mvhdEnd) return;

            byte version = (byte)stream.ReadByte();
            stream.Seek(3, SeekOrigin.Current); // flags

            if (version == 0)
            {
                stream.Seek(8, SeekOrigin.Current); // creation_time (4), modification_time (4)
                uint timescale = ReadUInt32BE(stream);
                uint duration = ReadUInt32BE(stream);
                movieTimescale = timescale;
                movieDurationUnits = duration;
            }
            else if (version == 1)
            {
                stream.Seek(16, SeekOrigin.Current); // creation_time (8), modification_time (8)
                uint timescale = ReadUInt32BE(stream);
                ulong duration = (ulong)ReadInt64BE(stream);
                movieTimescale = timescale;
                movieDurationUnits = duration;
            }
        }

        private static void ParseTrak(
            Stream stream,
            long trakEnd,
            MediaProbeResult result,
            double movieTimescale,
            double movieDurationUnits)
        {
            string handlerType = string.Empty;
            int tkhdWidth = 0;
            int tkhdHeight = 0;
            double trackTimescale = movieTimescale;
            double trackDurationUnits = movieDurationUnits;

            while (stream.Position + 8 <= trakEnd)
            {
                long boxStart = stream.Position;
                uint size32 = ReadUInt32BE(stream);
                string boxType = ReadAscii(stream, 4);

                long boxSize = size32 == 1 ? ReadInt64BE(stream) : size32;
                if (boxSize == 0) boxSize = trakEnd - boxStart;
                long boxEnd = Math.Min(boxStart + boxSize, trakEnd);

                if (boxType == "tkhd")
                {
                    ParseTkhd(stream, boxEnd, out tkhdWidth, out tkhdHeight);
                }
                else if (boxType == "mdia")
                {
                    ParseMdia(stream, boxEnd, result, ref handlerType, ref trackTimescale, ref trackDurationUnits, tkhdWidth, tkhdHeight);
                }

                stream.Position = boxEnd;
            }
        }

        private static void ParseTkhd(Stream stream, long tkhdEnd, out int width, out int height)
        {
            width = 0;
            height = 0;
            if (stream.Position >= tkhdEnd) return;

            byte version = (byte)stream.ReadByte();
            stream.Seek(3, SeekOrigin.Current); // flags

            if (version == 0)
            {
                stream.Seek(20, SeekOrigin.Current); // creation(4), mod(4), track_id(4), reserved(4), duration(4)
            }
            else
            {
                stream.Seek(32, SeekOrigin.Current); // creation(8), mod(8), track_id(4), reserved(4), duration(8)
            }

            stream.Seek(8 + 2 + 2 + 2 + 2 + 36, SeekOrigin.Current); // reserved(8), layer(2), alt(2), vol(2), res(2), matrix(36)

            if (stream.Position + 8 <= tkhdEnd)
            {
                uint fixedWidth = ReadUInt32BE(stream);
                uint fixedHeight = ReadUInt32BE(stream);
                width = (int)(fixedWidth >> 16);
                height = (int)(fixedHeight >> 16);
            }
        }

        private static void ParseMdia(
            Stream stream,
            long mdiaEnd,
            MediaProbeResult result,
            ref string handlerType,
            ref double trackTimescale,
            ref double trackDurationUnits,
            int tkhdWidth,
            int tkhdHeight)
        {
            while (stream.Position + 8 <= mdiaEnd)
            {
                long boxStart = stream.Position;
                uint size32 = ReadUInt32BE(stream);
                string boxType = ReadAscii(stream, 4);

                long boxSize = size32 == 1 ? ReadInt64BE(stream) : size32;
                if (boxSize == 0) boxSize = mdiaEnd - boxStart;
                long boxEnd = Math.Min(boxStart + boxSize, mdiaEnd);

                if (boxType == "mdhd")
                {
                    ParseMdhd(stream, boxEnd, ref trackTimescale, ref trackDurationUnits);
                }
                else if (boxType == "hdlr")
                {
                    handlerType = ParseHdlr(stream, boxEnd);
                }
                else if (boxType == "minf")
                {
                    ParseMinf(stream, boxEnd, result, handlerType, trackTimescale, trackDurationUnits, tkhdWidth, tkhdHeight);
                }

                stream.Position = boxEnd;
            }
        }

        private static void ParseMdhd(
            Stream stream,
            long mdhdEnd,
            ref double trackTimescale,
            ref double trackDurationUnits)
        {
            if (stream.Position >= mdhdEnd) return;

            byte version = (byte)stream.ReadByte();
            stream.Seek(3, SeekOrigin.Current);

            if (version == 0)
            {
                stream.Seek(8, SeekOrigin.Current);
                uint timescale = ReadUInt32BE(stream);
                uint duration = ReadUInt32BE(stream);
                if (timescale > 0) trackTimescale = timescale;
                if (duration > 0) trackDurationUnits = duration;
            }
            else if (version == 1)
            {
                stream.Seek(16, SeekOrigin.Current);
                uint timescale = ReadUInt32BE(stream);
                ulong duration = (ulong)ReadInt64BE(stream);
                if (timescale > 0) trackTimescale = timescale;
                if (duration > 0) trackDurationUnits = duration;
            }
        }

        private static string ParseHdlr(Stream stream, long hdlrEnd)
        {
            if (stream.Position + 12 > hdlrEnd) return string.Empty;
            stream.Seek(4, SeekOrigin.Current); // version + flags
            stream.Seek(4, SeekOrigin.Current); // pre_defined
            return ReadAscii(stream, 4);        // handler_type ("vide" or "soun")
        }

        private static void ParseMinf(
            Stream stream,
            long minfEnd,
            MediaProbeResult result,
            string handlerType,
            double trackTimescale,
            double trackDurationUnits,
            int tkhdWidth,
            int tkhdHeight)
        {
            while (stream.Position + 8 <= minfEnd)
            {
                long boxStart = stream.Position;
                uint size32 = ReadUInt32BE(stream);
                string boxType = ReadAscii(stream, 4);

                long boxSize = size32 == 1 ? ReadInt64BE(stream) : size32;
                if (boxSize == 0) boxSize = minfEnd - boxStart;
                long boxEnd = Math.Min(boxStart + boxSize, minfEnd);

                if (boxType == "stbl")
                {
                    ParseStbl(stream, boxEnd, result, handlerType, trackTimescale, trackDurationUnits, tkhdWidth, tkhdHeight);
                }

                stream.Position = boxEnd;
            }
        }

        private static void ParseStbl(
            Stream stream,
            long stblEnd,
            MediaProbeResult result,
            string handlerType,
            double trackTimescale,
            double trackDurationUnits,
            int tkhdWidth,
            int tkhdHeight)
        {
            while (stream.Position + 8 <= stblEnd)
            {
                long boxStart = stream.Position;
                uint size32 = ReadUInt32BE(stream);
                string boxType = ReadAscii(stream, 4);

                long boxSize = size32 == 1 ? ReadInt64BE(stream) : size32;
                if (boxSize == 0) boxSize = stblEnd - boxStart;
                long boxEnd = Math.Min(boxStart + boxSize, stblEnd);

                if (boxType == "stsd")
                {
                    ParseStsd(stream, boxEnd, result, handlerType, tkhdWidth, tkhdHeight);
                }
                else if (boxType == "stts" && (handlerType == "vide" || result.HasVideo))
                {
                    ParseStts(stream, boxEnd, result, trackTimescale, trackDurationUnits);
                }

                stream.Position = boxEnd;
            }
        }

        private static void ParseStsd(
            Stream stream,
            long stsdEnd,
            MediaProbeResult result,
            string handlerType,
            int tkhdWidth,
            int tkhdHeight)
        {
            if (stream.Position + 8 > stsdEnd) return;
            stream.Seek(4, SeekOrigin.Current); // version + flags
            uint entryCount = ReadUInt32BE(stream);

            for (uint i = 0; i < entryCount && stream.Position + 8 <= stsdEnd; i++)
            {
                long entryStart = stream.Position;
                uint entrySize = ReadUInt32BE(stream);
                string format = ReadAscii(stream, 4);
                long entryEnd = Math.Min(entryStart + entrySize, stsdEnd);

                bool isAudio = handlerType == "soun" ||
                               format.Equals("mp4a", StringComparison.OrdinalIgnoreCase) ||
                               format.Equals("aac ", StringComparison.OrdinalIgnoreCase) ||
                               format.Equals("opus", StringComparison.OrdinalIgnoreCase) ||
                               format.Equals("alac", StringComparison.OrdinalIgnoreCase) ||
                               format.Equals("flac", StringComparison.OrdinalIgnoreCase);

                bool isVideo = handlerType == "vide" ||
                               format.Equals("avc1", StringComparison.OrdinalIgnoreCase) ||
                               format.Equals("hvc1", StringComparison.OrdinalIgnoreCase) ||
                               format.Equals("hev1", StringComparison.OrdinalIgnoreCase) ||
                               format.Equals("vp09", StringComparison.OrdinalIgnoreCase) ||
                               format.Equals("av01", StringComparison.OrdinalIgnoreCase);

                if (isAudio && !result.HasAudio)
                {
                    result.HasAudio = true;
                    // AudioSampleEntry offset:
                    // 0..3: size
                    // 4..7: format
                    // 8..13: reserved (6)
                    // 14..15: data_reference_index (2)
                    // 16..17: sound_version (2)
                    // 18..19: reserved (2)
                    // 20..23: reserved (4)
                    // 24..25: channel_count (2)
                    // 26..27: sample_size (2)
                    // 28..29: compression_id (2)
                    // 30..31: packet_size (2)
                    // 32..35: sample_rate (4, 16.16)
                    if (entryStart + 36 <= entryEnd)
                    {
                        stream.Position = entryStart + 24;
                        ushort channels = ReadUInt16BE(stream);
                        stream.Position = entryStart + 32;
                        uint sampleRate = ReadUInt32BE(stream) >> 16;

                        result.AudioChannels = channels > 0 ? channels : 2;
                        result.AudioSampleRate = sampleRate > 0 ? (int)sampleRate : 48000;
                    }
                    result.AudioCodec = format.Equals("mp4a", StringComparison.OrdinalIgnoreCase) ? "aac" : format.Trim().ToLowerInvariant();
                }
                else if (isVideo && !result.HasVideo)
                {
                    result.HasVideo = true;
                    // VisualSampleEntry offset:
                    // 0..3: size
                    // 4..7: format
                    // 8..31: reserved & pre_defined (24)
                    // 32..33: width (2)
                    // 34..35: height (2)
                    int w = tkhdWidth;
                    int h = tkhdHeight;
                    if (entryStart + 36 <= entryEnd)
                    {
                        stream.Position = entryStart + 32;
                        ushort parsedW = ReadUInt16BE(stream);
                        ushort parsedH = ReadUInt16BE(stream);
                        if (parsedW > 0) w = parsedW;
                        if (parsedH > 0) h = parsedH;
                    }
                    result.Width = w > 0 ? w : 1920;
                    result.Height = h > 0 ? h : 1080;

                    if (format.Equals("avc1", StringComparison.OrdinalIgnoreCase)) result.VideoCodec = "h264";
                    else if (format.Equals("hvc1", StringComparison.OrdinalIgnoreCase) || format.Equals("hev1", StringComparison.OrdinalIgnoreCase)) result.VideoCodec = "hevc";
                    else result.VideoCodec = format.Trim().ToLowerInvariant();
                }

                stream.Position = entryEnd;
            }
        }

        private static void ParseStts(
            Stream stream,
            long sttsEnd,
            MediaProbeResult result,
            double trackTimescale,
            double trackDurationUnits)
        {
            if (stream.Position + 8 > sttsEnd) return;
            stream.Seek(4, SeekOrigin.Current); // version + flags
            uint entryCount = ReadUInt32BE(stream);

            long totalSamples = 0;
            for (uint i = 0; i < entryCount && stream.Position + 8 <= sttsEnd && i < 10000; i++)
            {
                uint count = ReadUInt32BE(stream);
                uint delta = ReadUInt32BE(stream);
                totalSamples += count;
            }

            if (trackTimescale > 0 && trackDurationUnits > 0 && totalSamples > 0)
            {
                double durationSec = trackDurationUnits / trackTimescale;
                if (durationSec > 0.1)
                {
                    double fps = Math.Round((double)totalSamples / durationSec, 2);
                    if (fps >= 1.0 && fps <= 240.0)
                    {
                        result.Fps = fps;
                    }
                }
            }
        }

        private static void ParseUdta(Stream stream, long udtaEnd, MediaProbeResult result)
        {
            try
            {
                // Scan udta box for ASCII / UTF-8 metadata strings like "itb_start_epoch_ms"
                long length = udtaEnd - stream.Position;
                if (length <= 0 || length > 1024 * 1024) return;

                byte[] buffer = new byte[(int)length];
                int bytesRead = stream.Read(buffer, 0, buffer.Length);
                if (bytesRead <= 0) return;

                string text = Encoding.UTF8.GetString(buffer, 0, bytesRead);
                const string marker = "itb_start_epoch_ms";
                int idx = text.IndexOf(marker, StringComparison.OrdinalIgnoreCase);
                if (idx >= 0)
                {
                    int start = idx + marker.Length;
                    // Skip delimiters like '=', ':', or null bytes
                    while (start < text.Length && (text[start] == '=' || text[start] == ':' || text[start] == ' ' || text[start] == '\0'))
                    {
                        start++;
                    }
                    int end = start;
                    while (end < text.Length && char.IsDigit(text[end]))
                    {
                        end++;
                    }
                    if (end > start)
                    {
                        string epochStr = text.Substring(start, end - start);
                        result.Metadata["itb_start_epoch_ms"] = epochStr;
                    }
                }
            }
            catch
            {
                // Udta parse is purely opportunistic
            }
        }

        private static uint ReadUInt32BE(Stream stream)
        {
            Span<byte> buf = stackalloc byte[4];
            int read = stream.Read(buf);
            if (read < 4) return 0;
            return (uint)((buf[0] << 24) | (buf[1] << 16) | (buf[2] << 8) | buf[3]);
        }

        private static ushort ReadUInt16BE(Stream stream)
        {
            Span<byte> buf = stackalloc byte[2];
            int read = stream.Read(buf);
            if (read < 2) return 0;
            return (ushort)((buf[0] << 8) | buf[1]);
        }

        private static long ReadInt64BE(Stream stream)
        {
            Span<byte> buf = stackalloc byte[8];
            int read = stream.Read(buf);
            if (read < 8) return 0;
            return ((long)buf[0] << 56) |
                   ((long)buf[1] << 48) |
                   ((long)buf[2] << 40) |
                   ((long)buf[3] << 32) |
                   ((long)buf[4] << 24) |
                   ((long)buf[5] << 16) |
                   ((long)buf[6] << 8) |
                   (long)buf[7];
        }

        private static string ReadAscii(Stream stream, int length)
        {
            Span<byte> buf = stackalloc byte[length];
            int read = stream.Read(buf);
            if (read < length) return string.Empty;
            return Encoding.ASCII.GetString(buf);
        }
    }
}
