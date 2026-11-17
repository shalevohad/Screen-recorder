// ==========================================
// File: ITB-SCREEN-RECORDER.Core/Media/Engine/FfmpegInProcessAudioDecoder.cs
// ==========================================
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using FFmpeg.AutoGen;
using ITB_SCREEN_RECORDER.Core.Common;
using ITB_SCREEN_RECORDER.Core.Media.Contracts;

namespace ITB_SCREEN_RECORDER.Core.Media.Engine
{
    /// <summary>
    /// High-performance, in-process audio decoder using native FFmpeg shared libraries (FFmpeg.AutoGen).
    /// Decodes compressed audio tracks (AAC/MP3/Opus) directly in-memory and extracts normalized waveform peak envelopes
    /// without spawning external ffmpeg.exe processes or stressing OS pipe buffers.
    /// </summary>
    public unsafe class FfmpegInProcessAudioDecoder : IAudioDecoderService
    {
        static FfmpegInProcessAudioDecoder()
        {
            FfmpegNativeResolver.EnsureInitialized();
        }

        public Task<float[]> ExtractWaveformPeaksAsync(
            string filePath,
            double startSec,
            double durationSec,
            int targetPoints,
            CancellationToken ct = default)
        {
            return Task.Run(() => ExtractWaveformPeaksInternal(filePath, startSec, durationSec, targetPoints, ct), ct);
        }

        public Task<short[]> DecodeAudioSamplesAsync(
            string filePath,
            double startSec,
            double durationSec,
            int targetSampleRate = 1000,
            int targetChannels = 1,
            CancellationToken ct = default)
        {
            return Task.Run(() => DecodeAudioSamplesInternal(filePath, startSec, durationSec, targetSampleRate, targetChannels, ct), ct);
        }

        private static float[] ExtractWaveformPeaksInternal(
            string filePath,
            double startSec,
            double durationSec,
            int targetPoints,
            CancellationToken ct)
        {
            int safePoints = Math.Max(1, targetPoints);
            float[] peaks = new float[safePoints];

            if (string.IsNullOrWhiteSpace(filePath) || !File.Exists(filePath) || durationSec <= 0)
            {
                return peaks;
            }

            if (!FfmpegNativeResolver.EnsureInitialized())
            {
                Logger.Warn("[AUDIO-DECODER] Native FFmpeg libraries not available for waveform extraction.");
                return peaks;
            }

            AVFormatContext* pFormatContext = null;
            AVCodecContext* pCodecContext = null;
            SwrContext* pSwrContext = null;
            AVPacket* pPacket = null;
            AVFrame* pFrame = null;
            short* outBuffer = null;

            try
            {
                string normalizedPath = filePath.Replace('\\', '/');

                int openRet = ffmpeg.avformat_open_input(&pFormatContext, normalizedPath, null, null);
                if (openRet < 0 || pFormatContext == null)
                {
                    return peaks;
                }

                if (ffmpeg.avformat_find_stream_info(pFormatContext, null) < 0)
                {
                    return peaks;
                }

                int audioStreamIndex = -1;
                AVStream* pAudioStream = null;
                for (uint i = 0; i < pFormatContext->nb_streams; i++)
                {
                    if (pFormatContext->streams[i]->codecpar->codec_type == AVMediaType.AVMEDIA_TYPE_AUDIO)
                    {
                        audioStreamIndex = (int)i;
                        pAudioStream = pFormatContext->streams[i];
                        break;
                    }
                }

                if (audioStreamIndex < 0 || pAudioStream == null)
                {
                    return peaks;
                }

                AVCodec* pCodec = ffmpeg.avcodec_find_decoder(pAudioStream->codecpar->codec_id);
                if (pCodec == null)
                {
                    return peaks;
                }

                pCodecContext = ffmpeg.avcodec_alloc_context3(pCodec);
                if (pCodecContext == null)
                {
                    return peaks;
                }

                if (ffmpeg.avcodec_parameters_to_context(pCodecContext, pAudioStream->codecpar) < 0 ||
                    ffmpeg.avcodec_open2(pCodecContext, pCodec, null) < 0)
                {
                    return peaks;
                }

                double timeBase = ffmpeg.av_q2d(pAudioStream->time_base);
                double safeStartSec = Math.Max(0, startSec);
                double endSec = safeStartSec + durationSec;

                if (safeStartSec > 0 && timeBase > 0)
                {
                    long seekPts = (long)(safeStartSec / timeBase);
                    ffmpeg.av_seek_frame(pFormatContext, audioStreamIndex, seekPts, ffmpeg.AVSEEK_FLAG_BACKWARD);
                    ffmpeg.avcodec_flush_buffers(pCodecContext);
                }

                const int resampleRate = 1000; // 1000 Hz sampling for millisecond precision
                AVChannelLayout outLayout;
                ffmpeg.av_channel_layout_default(&outLayout, 1);

                SwrContext* swr = null;
                ffmpeg.swr_alloc_set_opts2(
                    &swr,
                    &outLayout, AVSampleFormat.AV_SAMPLE_FMT_S16, resampleRate,
                    &pCodecContext->ch_layout, pCodecContext->sample_fmt, pCodecContext->sample_rate,
                    0, null);
                pSwrContext = swr;

                if (ffmpeg.swr_init(pSwrContext) < 0)
                {
                    return peaks;
                }

                pPacket = ffmpeg.av_packet_alloc();
                pFrame = ffmpeg.av_frame_alloc();

                const int outCapacity = 4096;
                outBuffer = (short*)ffmpeg.av_malloc((ulong)(outCapacity * sizeof(short)));

                bool reachedEnd = false;

                while (!reachedEnd && ffmpeg.av_read_frame(pFormatContext, pPacket) == 0)
                {
                    if (ct.IsCancellationRequested) break;

                    if (pPacket->stream_index == audioStreamIndex)
                    {
                        if (ffmpeg.avcodec_send_packet(pCodecContext, pPacket) == 0)
                        {
                            while (ffmpeg.avcodec_receive_frame(pCodecContext, pFrame) == 0)
                            {
                                double frameSec = pFrame->pts != ffmpeg.AV_NOPTS_VALUE && timeBase > 0
                                    ? pFrame->pts * timeBase
                                    : safeStartSec;

                                if (frameSec >= endSec)
                                {
                                    reachedEnd = true;
                                    break;
                                }

                                byte* outPtr = (byte*)outBuffer;
                                byte** inData = (byte**)&pFrame->data;

                                int converted = ffmpeg.swr_convert(
                                    pSwrContext,
                                    &outPtr, outCapacity,
                                    inData, pFrame->nb_samples);

                                for (int s = 0; s < converted; s++)
                                {
                                    short sampleVal = outBuffer[s];
                                    float amp = Math.Abs(sampleVal) / 32768.0f;

                                    double sampleRelSec = (frameSec - safeStartSec) + ((double)s / resampleRate);
                                    if (sampleRelSec >= 0 && sampleRelSec < durationSec)
                                    {
                                        int pIdx = (int)Math.Clamp(Math.Floor((sampleRelSec / durationSec) * safePoints), 0, safePoints - 1);
                                        if (amp > peaks[pIdx])
                                        {
                                            peaks[pIdx] = amp;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    ffmpeg.av_packet_unref(pPacket);
                }

                return peaks;
            }
            catch (Exception ex)
            {
                Logger.Warn($"[AUDIO-DECODER] Error extracting waveform peaks from '{filePath}': {ex.Message}");
                return peaks;
            }
            finally
            {
                if (outBuffer != null)
                {
                    ffmpeg.av_free(outBuffer);
                }

                if (pFrame != null)
                {
                    ffmpeg.av_frame_free(&pFrame);
                }

                if (pPacket != null)
                {
                    ffmpeg.av_packet_free(&pPacket);
                }

                if (pSwrContext != null)
                {
                    ffmpeg.swr_free(&pSwrContext);
                }

                if (pCodecContext != null)
                {
                    ffmpeg.avcodec_free_context(&pCodecContext);
                }

                if (pFormatContext != null)
                {
                    ffmpeg.avformat_close_input(&pFormatContext);
                }
            }
        }

        private static short[] DecodeAudioSamplesInternal(
            string filePath,
            double startSec,
            double durationSec,
            int targetSampleRate,
            int targetChannels,
            CancellationToken ct)
        {
            var samples = new List<short>();

            if (string.IsNullOrWhiteSpace(filePath) || !File.Exists(filePath) || durationSec <= 0)
            {
                return samples.ToArray();
            }

            if (!FfmpegNativeResolver.EnsureInitialized())
            {
                Logger.Warn("[AUDIO-DECODER] Native FFmpeg libraries not available for audio decoding.");
                return samples.ToArray();
            }

            AVFormatContext* pFormatContext = null;
            AVCodecContext* pCodecContext = null;
            SwrContext* pSwrContext = null;
            AVPacket* pPacket = null;
            AVFrame* pFrame = null;
            short* outBuffer = null;

            try
            {
                string normalizedPath = filePath.Replace('\\', '/');

                int openRet = ffmpeg.avformat_open_input(&pFormatContext, normalizedPath, null, null);
                if (openRet < 0 || pFormatContext == null)
                {
                    return samples.ToArray();
                }

                if (ffmpeg.avformat_find_stream_info(pFormatContext, null) < 0)
                {
                    return samples.ToArray();
                }

                int audioStreamIndex = -1;
                AVStream* pAudioStream = null;
                for (uint i = 0; i < pFormatContext->nb_streams; i++)
                {
                    if (pFormatContext->streams[i]->codecpar->codec_type == AVMediaType.AVMEDIA_TYPE_AUDIO)
                    {
                        audioStreamIndex = (int)i;
                        pAudioStream = pFormatContext->streams[i];
                        break;
                    }
                }

                if (audioStreamIndex < 0 || pAudioStream == null)
                {
                    return samples.ToArray();
                }

                AVCodec* pCodec = ffmpeg.avcodec_find_decoder(pAudioStream->codecpar->codec_id);
                if (pCodec == null)
                {
                    return samples.ToArray();
                }

                pCodecContext = ffmpeg.avcodec_alloc_context3(pCodec);
                if (pCodecContext == null)
                {
                    return samples.ToArray();
                }

                if (ffmpeg.avcodec_parameters_to_context(pCodecContext, pAudioStream->codecpar) < 0 ||
                    ffmpeg.avcodec_open2(pCodecContext, pCodec, null) < 0)
                {
                    return samples.ToArray();
                }

                double timeBase = ffmpeg.av_q2d(pAudioStream->time_base);
                double safeStartSec = Math.Max(0, startSec);
                double endSec = safeStartSec + durationSec;

                if (safeStartSec > 0 && timeBase > 0)
                {
                    long seekPts = (long)(safeStartSec / timeBase);
                    ffmpeg.av_seek_frame(pFormatContext, audioStreamIndex, seekPts, ffmpeg.AVSEEK_FLAG_BACKWARD);
                    ffmpeg.avcodec_flush_buffers(pCodecContext);
                }

                int safeRate = targetSampleRate > 0 ? targetSampleRate : 1000;
                int safeChannels = targetChannels > 0 ? targetChannels : 1;

                AVChannelLayout outLayout;
                ffmpeg.av_channel_layout_default(&outLayout, safeChannels);

                SwrContext* swr = null;
                ffmpeg.swr_alloc_set_opts2(
                    &swr,
                    &outLayout, AVSampleFormat.AV_SAMPLE_FMT_S16, safeRate,
                    &pCodecContext->ch_layout, pCodecContext->sample_fmt, pCodecContext->sample_rate,
                    0, null);
                pSwrContext = swr;

                if (ffmpeg.swr_init(pSwrContext) < 0)
                {
                    return samples.ToArray();
                }

                pPacket = ffmpeg.av_packet_alloc();
                pFrame = ffmpeg.av_frame_alloc();

                const int outCapacity = 4096;
                outBuffer = (short*)ffmpeg.av_malloc((ulong)(outCapacity * sizeof(short) * safeChannels));

                bool reachedEnd = false;

                while (!reachedEnd && ffmpeg.av_read_frame(pFormatContext, pPacket) == 0)
                {
                    if (ct.IsCancellationRequested) break;

                    if (pPacket->stream_index == audioStreamIndex)
                    {
                        if (ffmpeg.avcodec_send_packet(pCodecContext, pPacket) == 0)
                        {
                            while (ffmpeg.avcodec_receive_frame(pCodecContext, pFrame) == 0)
                            {
                                double frameSec = pFrame->pts != ffmpeg.AV_NOPTS_VALUE && timeBase > 0
                                    ? pFrame->pts * timeBase
                                    : safeStartSec;

                                if (frameSec >= endSec)
                                {
                                    reachedEnd = true;
                                    break;
                                }

                                byte* outPtr = (byte*)outBuffer;
                                byte** inData = (byte**)&pFrame->data;

                                int converted = ffmpeg.swr_convert(
                                    pSwrContext,
                                    &outPtr, outCapacity,
                                    inData, pFrame->nb_samples);

                                int totalVals = converted * safeChannels;
                                for (int s = 0; s < totalVals; s++)
                                {
                                    samples.Add(outBuffer[s]);
                                }
                            }
                        }
                    }

                    ffmpeg.av_packet_unref(pPacket);
                }

                return samples.ToArray();
            }
            catch (Exception ex)
            {
                Logger.Warn($"[AUDIO-DECODER] Error decoding audio samples from '{filePath}': {ex.Message}");
                return samples.ToArray();
            }
            finally
            {
                if (outBuffer != null)
                {
                    ffmpeg.av_free(outBuffer);
                }

                if (pFrame != null)
                {
                    ffmpeg.av_frame_free(&pFrame);
                }

                if (pPacket != null)
                {
                    ffmpeg.av_packet_free(&pPacket);
                }

                if (pSwrContext != null)
                {
                    ffmpeg.swr_free(&pSwrContext);
                }

                if (pCodecContext != null)
                {
                    ffmpeg.avcodec_free_context(&pCodecContext);
                }

                if (pFormatContext != null)
                {
                    ffmpeg.avformat_close_input(&pFormatContext);
                }
            }
        }
    }
}
