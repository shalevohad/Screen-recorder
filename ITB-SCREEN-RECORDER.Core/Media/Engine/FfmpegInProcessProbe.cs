// ==========================================
// File: ITB-SCREEN-RECORDER.Core/Media/Engine/FfmpegInProcessProbe.cs
// ==========================================
using System;
using System.IO;
using System.Runtime.InteropServices;
using System.Threading;
using System.Threading.Tasks;
using FFmpeg.AutoGen;
using ITB_SCREEN_RECORDER.Core.Common;
using ITB_SCREEN_RECORDER.Core.Media.Contracts;
using ITB_SCREEN_RECORDER.Core.Media.Models;

namespace ITB_SCREEN_RECORDER.Core.Media.Engine
{
    /// <summary>
    /// High-performance, in-process media container and stream probe using native FFmpeg shared libraries (FFmpeg.AutoGen).
    /// Extracts video/audio geometry, codecs, framerates, and forensic metadata (itb_start_epoch_ms)
    /// in microseconds entirely in-memory without spawning external ffprobe.exe processes.
    /// Strictly complies with Rule 10 (non-locking probe parameters: -analyzeduration 1M -probesize 1M -threads 2).
    /// </summary>
    public unsafe class FfmpegInProcessProbe : IMediaProbeService
    {
        static FfmpegInProcessProbe()
        {
            FfmpegNativeResolver.EnsureInitialized();
        }

        public Task<MediaProbeResult> ProbeFileAsync(string filePath, CancellationToken ct = default)
        {
            return Task.Run(() => ProbeFile(filePath), ct);
        }

        public MediaProbeResult ProbeFile(string filePath)
        {
            var result = new MediaProbeResult { FilePath = filePath };

            if (string.IsNullOrWhiteSpace(filePath) || !File.Exists(filePath))
            {
                result.ErrorMessage = "File does not exist or invalid path.";
                return result;
            }

            if (!FfmpegNativeResolver.EnsureInitialized())
            {
                result.ErrorMessage = "Native FFmpeg libraries not available.";
                return result;
            }

            AVFormatContext* pFormatContext = null;
            AVDictionary* options = null;

            try
            {
                // Set Rule 10 non-locking probe options
                ffmpeg.av_dict_set(&options, "analyzeduration", "1000000", 0);
                ffmpeg.av_dict_set(&options, "probesize", "1000000", 0);
                ffmpeg.av_dict_set(&options, "threads", "2", 0);

                string normalizedPath = filePath.Replace('\\', '/');

                int openRet = ffmpeg.avformat_open_input(&pFormatContext, normalizedPath, null, &options);
                if (openRet < 0 || pFormatContext == null)
                {
                    result.ErrorMessage = $"avformat_open_input failed with code: {openRet}";
                    return result;
                }

                int findInfoRet = ffmpeg.avformat_find_stream_info(pFormatContext, &options);
                if (findInfoRet < 0)
                {
                    Logger.Warn($"[INPROCESS-PROBE] avformat_find_stream_info warning ({findInfoRet}) on '{filePath}'");
                }

                // Extract container duration and bitrate
                if (pFormatContext->duration > 0)
                {
                    result.Duration = TimeSpan.FromSeconds((double)pFormatContext->duration / ffmpeg.AV_TIME_BASE);
                }
                result.Bitrate = pFormatContext->bit_rate;

                if (pFormatContext->iformat != null && pFormatContext->iformat->name != null)
                {
                    result.FormatName = Marshal.PtrToStringUTF8((IntPtr)pFormatContext->iformat->name) ?? string.Empty;
                }

                // Extract container-level metadata tags
                ExtractMetadataDictionary(pFormatContext->metadata, result);

                // Enumerate streams
                for (uint i = 0; i < pFormatContext->nb_streams; i++)
                {
                    AVStream* pStream = pFormatContext->streams[i];
                    if (pStream == null || pStream->codecpar == null) continue;

                    // Merge stream-level metadata
                    ExtractMetadataDictionary(pStream->metadata, result);

                    if (pStream->codecpar->codec_type == AVMediaType.AVMEDIA_TYPE_VIDEO && !result.HasVideo)
                    {
                        result.HasVideo = true;
                        result.Width = pStream->codecpar->width;
                        result.Height = pStream->codecpar->height;
                        result.VideoCodec = ResolveCodecName(pStream->codecpar->codec_id);

                        string? pixFmtName = ffmpeg.av_get_pix_fmt_name((AVPixelFormat)pStream->codecpar->format);
                        result.PixelFormat = pixFmtName ?? "yuv420p";

                        // Calculate FPS from avg_frame_rate and r_frame_rate
                        double aFps = 0.0;
                        double rFps = 0.0;

                        if (pStream->avg_frame_rate.den > 0 && pStream->avg_frame_rate.num > 0)
                        {
                            aFps = (double)pStream->avg_frame_rate.num / pStream->avg_frame_rate.den;
                        }
                        if (pStream->r_frame_rate.den > 0 && pStream->r_frame_rate.num > 0)
                        {
                            rFps = (double)pStream->r_frame_rate.num / pStream->r_frame_rate.den;
                        }

                        if (aFps >= 5 && aFps <= 240) result.Fps = Math.Round(aFps, 2);
                        else if (rFps >= 5 && rFps <= 240) result.Fps = Math.Round(rFps, 2);
                        else if (aFps > 0) result.Fps = Math.Round(aFps, 2);
                        else if (rFps > 0) result.Fps = Math.Round(rFps, 2);

                        if (aFps > 0 && rFps > 0 && Math.Abs(aFps - rFps) > 0.8)
                        {
                            result.IsVfr = true;
                        }
                    }
                    else if (pStream->codecpar->codec_type == AVMediaType.AVMEDIA_TYPE_AUDIO && !result.HasAudio)
                    {
                        result.HasAudio = true;
                        result.AudioSampleRate = pStream->codecpar->sample_rate > 0 ? pStream->codecpar->sample_rate : 48000;
                        result.AudioChannels = pStream->codecpar->ch_layout.nb_channels > 0 ? pStream->codecpar->ch_layout.nb_channels : 2;
                        result.AudioCodec = ResolveCodecName(pStream->codecpar->codec_id);
                    }
                }

                result.Success = result.HasVideo || result.HasAudio;
                return result;
            }
            catch (Exception ex)
            {
                result.ErrorMessage = ex.Message;
                Logger.Error($"[INPROCESS-PROBE] Exception probing '{filePath}': {ex.Message}");
                return result;
            }
            finally
            {
                if (options != null)
                {
                    ffmpeg.av_dict_free(&options);
                }

                if (pFormatContext != null)
                {
                    ffmpeg.avformat_close_input(&pFormatContext);
                }
            }
        }

        private static void ExtractMetadataDictionary(AVDictionary* dict, MediaProbeResult result)
        {
            if (dict == null) return;

            AVDictionaryEntry* tag = null;
            while ((tag = ffmpeg.av_dict_get(dict, "", tag, ffmpeg.AV_DICT_IGNORE_SUFFIX)) != null)
            {
                if (tag->key != null && tag->value != null)
                {
                    string key = Marshal.PtrToStringUTF8((IntPtr)tag->key) ?? string.Empty;
                    string value = Marshal.PtrToStringUTF8((IntPtr)tag->value) ?? string.Empty;

                    if (!string.IsNullOrEmpty(key) && !result.Metadata.ContainsKey(key))
                    {
                        result.Metadata[key] = value;
                    }
                }
            }
        }

        private static string ResolveCodecName(AVCodecID codecId)
        {
            string? name = ffmpeg.avcodec_get_name(codecId);
            return string.IsNullOrEmpty(name) ? "unknown" : name;
        }
    }
}
