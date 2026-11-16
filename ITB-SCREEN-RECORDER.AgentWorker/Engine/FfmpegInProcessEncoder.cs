// ==========================================
// File: ITB-SCREEN-RECORDER.AgentWorker/Engine/FfmpegInProcessEncoder.cs
// ==========================================
using System;
using System.IO;
using System.Runtime.InteropServices;
using System.Threading;
using System.Threading.Tasks;
using FFmpeg.AutoGen;
using ITB_SCREEN_RECORDER.Core.Common;
using ITB_SCREEN_RECORDER.Core.Configuration;

namespace ITBRecorderAgent.Engine
{
    /// <summary>
    /// High-performance, in-process hardware-accelerated video & audio encoder using native FFmpeg NuGet bindings (FFmpeg.AutoGen).
    /// Eliminates the need to spawn external ffmpeg.exe processes by executing compression and RTMP streaming entirely in-memory.
    /// </summary>
    public unsafe class FfmpegInProcessEncoder : IMediaStreamEncoder
    {
        private readonly AppConfig _config;
        private readonly object _syncLock = new();

        private AVFormatContext* _formatContext;
        private AVCodecContext* _videoCodecContext;
        private AVCodecContext* _audioCodecContext;
        private AVStream* _videoStream;
        private AVStream* _audioStream;

        private SwsContext* _swsContext;
        private SwrContext* _swrContext;

        private AVFrame* _encodedVideoFrame;

        private AVPacket* _videoPacket;
        private AVPacket* _audioPacket;

        private long _videoFrameIndex = 0;
        private long _audioSampleIndex = 0;
        private bool _isInitialized = false;
        private bool _isDisposed = false;

        public bool IsRunning => _isInitialized && !_isDisposed;
        public bool HasAudio { get; private set; }

        static FfmpegInProcessEncoder()
        {
            InitializeNativeLibraries();
        }

        public FfmpegInProcessEncoder(AppConfig config)
        {
            _config = config ?? throw new ArgumentNullException(nameof(config));
        }

        private static void InitializeNativeLibraries()
        {
            try
            {
                string baseDir = AppContext.BaseDirectory;
                string[] candidatePaths =
                {
                    baseDir,
                    Path.Combine(baseDir, "runtimes", OperatingSystem.IsWindows() ? "win-x64" : "linux-x64", "native"),
                    Path.Combine(baseDir, "..", "..", "..", "..", "Tools", OperatingSystem.IsWindows() ? "Win" : "Linux"),
                    Path.Combine(baseDir, "Tools", OperatingSystem.IsWindows() ? "Win" : "Linux")
                };

                foreach (var path in candidatePaths)
                {
                    if (Directory.Exists(path))
                    {
                        ffmpeg.RootPath = Path.GetFullPath(path);
                        Logger.Info($"[INPROCESS-ENCODER] Configured FFmpeg native root path: {ffmpeg.RootPath}");
                        break;
                    }
                }

                ffmpeg.avformat_network_init();
                Logger.Info("[INPROCESS-ENCODER] FFmpeg network subsystem initialized.");
            }
            catch (Exception ex)
            {
                Logger.Warn($"[INPROCESS-ENCODER] Native library initialization note: {ex.Message}");
            }
        }

        public Task<bool> StartAsync(
            string destinationUrl,
            DateTime calibratedStartTime,
            int videoWidth,
            int videoHeight,
            int audioSampleRate,
            int audioChannels,
            string audioFormat,
            int targetFps,
            string videoBitrate,
            CancellationToken cancellationToken)
        {
            return Task.Run(() =>
            {
                lock (_syncLock)
                {
                    try
                    {
                        Logger.Info($"[INPROCESS-ENCODER] Starting in-process media stream to: {destinationUrl} ({videoWidth}x{videoHeight} @ {targetFps}fps)");

                        // 1. Allocate Output Format Context (FLV for RTMP, MP4 for local buffer)
                        string formatName = destinationUrl.StartsWith("rtmp://", StringComparison.OrdinalIgnoreCase) ||
                                           destinationUrl.StartsWith("rtmps://", StringComparison.OrdinalIgnoreCase)
                            ? "flv"
                            : "mp4";

                        fixed (AVFormatContext** fmtCtxPtr = &_formatContext)
                        {
                            int ret = ffmpeg.avformat_alloc_output_context2(fmtCtxPtr, null, formatName, destinationUrl);
                            if (ret < 0 || _formatContext == null)
                            {
                                Logger.Error($"[INPROCESS-ENCODER] Failed to allocate format context for format '{formatName}'. Error code: {ret}");
                                return false;
                            }
                        }

                        // 2. Setup Video Stream & Codec Context
                        int effectiveFps = targetFps > 0 ? targetFps : (_config.TargetFps > 0 ? _config.TargetFps : 30);
                        string encoderName = ResolveVideoEncoderName(_config.VideoEncoder);

                        AVCodec* videoCodec = ffmpeg.avcodec_find_encoder_by_name(encoderName);
                        if (videoCodec == null)
                        {
                            Logger.Warn($"[INPROCESS-ENCODER] Preferred video encoder '{encoderName}' not found. Falling back to default H.264 encoder.");
                            videoCodec = ffmpeg.avcodec_find_encoder(AVCodecID.AV_CODEC_ID_H264);
                        }

                        if (videoCodec == null)
                        {
                            Logger.Error("[INPROCESS-ENCODER] No H.264 video encoder found in native FFmpeg libraries.");
                            return false;
                        }

                        _videoStream = ffmpeg.avformat_new_stream(_formatContext, null);
                        if (_videoStream == null)
                        {
                            Logger.Error("[INPROCESS-ENCODER] Failed to create video stream.");
                            return false;
                        }

                        _videoCodecContext = ffmpeg.avcodec_alloc_context3(videoCodec);
                        if (_videoCodecContext == null)
                        {
                            Logger.Error("[INPROCESS-ENCODER] Failed to allocate video codec context.");
                            return false;
                        }

                        _videoCodecContext->codec_id = videoCodec->id;
                        _videoCodecContext->codec_type = AVMediaType.AVMEDIA_TYPE_VIDEO;
                        _videoCodecContext->width = videoWidth;
                        _videoCodecContext->height = videoHeight;
                        _videoCodecContext->time_base = new AVRational { num = 1, den = effectiveFps };
                        _videoCodecContext->framerate = new AVRational { num = effectiveFps, den = 1 };
                        _videoCodecContext->gop_size = effectiveFps; // 1-second keyframe interval (Rule 1)
                        _videoCodecContext->keyint_min = effectiveFps;
                        _videoCodecContext->has_b_frames = 0;

                        // Target bitrate parsing
                        long bitrateNum = 4_000_000;
                        if (!string.IsNullOrWhiteSpace(videoBitrate) && int.TryParse(videoBitrate.TrimEnd('k', 'K', 'm', 'M'), out int parsed))
                        {
                            bitrateNum = videoBitrate.EndsWith("m", StringComparison.OrdinalIgnoreCase)
                                ? (long)parsed * 1_000_000
                                : (long)parsed * 1_000;
                        }
                        _videoCodecContext->bit_rate = bitrateNum;

                        // Determine pixel format and private options
                        AVDictionary* videoOptions = null;
                        if (encoderName.Contains("nvenc", StringComparison.OrdinalIgnoreCase))
                        {
                            _videoCodecContext->pix_fmt = AVPixelFormat.AV_PIX_FMT_YUV420P;
                            ffmpeg.av_dict_set(&videoOptions, "preset", "p2", 0);
                            ffmpeg.av_dict_set(&videoOptions, "tune", "ll", 0);
                            ffmpeg.av_dict_set(&videoOptions, "rc", "vbr", 0);
                            ffmpeg.av_dict_set(&videoOptions, "forced-idr", "1", 0);
                        }
                        else if (encoderName.Contains("qsv", StringComparison.OrdinalIgnoreCase))
                        {
                            _videoCodecContext->pix_fmt = AVPixelFormat.AV_PIX_FMT_NV12;
                            ffmpeg.av_dict_set(&videoOptions, "preset", "veryfast", 0);
                            ffmpeg.av_dict_set(&videoOptions, "forced_idr", "1", 0);
                        }
                        else
                        {
                            _videoCodecContext->pix_fmt = AVPixelFormat.AV_PIX_FMT_YUV420P;
                            ffmpeg.av_dict_set(&videoOptions, "preset", "ultrafast", 0);
                            ffmpeg.av_dict_set(&videoOptions, "tune", "zerolatency", 0);
                        }

                        if ((_formatContext->oformat->flags & ffmpeg.AVFMT_GLOBALHEADER) != 0)
                        {
                            _videoCodecContext->flags |= ffmpeg.AV_CODEC_FLAG_GLOBAL_HEADER;
                        }

                        int openRet = ffmpeg.avcodec_open2(_videoCodecContext, videoCodec, &videoOptions);
                        ffmpeg.av_dict_free(&videoOptions);
                        if (openRet < 0)
                        {
                            Logger.Error($"[INPROCESS-ENCODER] Failed to open video codec '{encoderName}'. Error code: {openRet}");
                            return false;
                        }

                        ffmpeg.avcodec_parameters_from_context(_videoStream->codecpar, _videoCodecContext);
                        _videoStream->time_base = _videoCodecContext->time_base;

                        // 3. Setup Software Video Scaler (BGRA -> Target Pixel Format)
                        _swsContext = ffmpeg.sws_getContext(
                            videoWidth, videoHeight, AVPixelFormat.AV_PIX_FMT_BGRA,
                            videoWidth, videoHeight, _videoCodecContext->pix_fmt,
                            ffmpeg.SWS_BILINEAR, null, null, null);

                        if (_swsContext == null)
                        {
                            Logger.Error("[INPROCESS-ENCODER] Failed to initialize SwsContext color conversion.");
                            return false;
                        }

                        // 4. Setup Audio Stream (if enabled)
                        HasAudio = audioChannels > 0;
                        if (HasAudio)
                        {
                            AVCodec* audioCodec = ffmpeg.avcodec_find_encoder(AVCodecID.AV_CODEC_ID_AAC);
                            if (audioCodec != null)
                            {
                                _audioStream = ffmpeg.avformat_new_stream(_formatContext, null);
                                _audioCodecContext = ffmpeg.avcodec_alloc_context3(audioCodec);

                                _audioCodecContext->codec_id = AVCodecID.AV_CODEC_ID_AAC;
                                _audioCodecContext->codec_type = AVMediaType.AVMEDIA_TYPE_AUDIO;
                                _audioCodecContext->sample_rate = audioSampleRate > 0 ? audioSampleRate : 48000;
                                _audioCodecContext->sample_fmt = AVSampleFormat.AV_SAMPLE_FMT_FLTP;
                                _audioCodecContext->bit_rate = 128_000;
                                _audioCodecContext->time_base = new AVRational { num = 1, den = _audioCodecContext->sample_rate };

                                ffmpeg.av_channel_layout_default(&_audioCodecContext->ch_layout, audioChannels);

                                if ((_formatContext->oformat->flags & ffmpeg.AVFMT_GLOBALHEADER) != 0)
                                {
                                    _audioCodecContext->flags |= ffmpeg.AV_CODEC_FLAG_GLOBAL_HEADER;
                                }

                                if (ffmpeg.avcodec_open2(_audioCodecContext, audioCodec, null) == 0)
                                {
                                    ffmpeg.avcodec_parameters_from_context(_audioStream->codecpar, _audioCodecContext);
                                    _audioStream->time_base = _audioCodecContext->time_base;

                                    // Allocate SwrContext for float interleaved -> FLTP planar conversion
                                    AVChannelLayout inLayout;
                                    ffmpeg.av_channel_layout_default(&inLayout, audioChannels);

                                    SwrContext* swr = null;
                                    ffmpeg.swr_alloc_set_opts2(
                                        &swr,
                                        &_audioCodecContext->ch_layout, _audioCodecContext->sample_fmt, _audioCodecContext->sample_rate,
                                        &inLayout, AVSampleFormat.AV_SAMPLE_FMT_FLT, audioSampleRate,
                                        0, null);
                                    _swrContext = swr;
                                    ffmpeg.swr_init(_swrContext);

                                    Logger.Info("[INPROCESS-ENCODER] In-process AAC audio encoder initialized.");
                                }
                                else
                                {
                                    Logger.Warn("[INPROCESS-ENCODER] Failed to open AAC audio codec.");
                                    HasAudio = false;
                                }
                            }
                        }

                        // 5. Open Destination URL (RTMP/File)
                        if ((_formatContext->oformat->flags & ffmpeg.AVFMT_NOFILE) == 0)
                        {
                            AVIOContext* pb = null;
                            int ioRet = ffmpeg.avio_open2(&pb, destinationUrl, ffmpeg.AVIO_FLAG_WRITE, null, null);
                            if (ioRet < 0)
                            {
                                Logger.Error($"[INPROCESS-ENCODER] Failed to open output URL: {destinationUrl}. Error: {ioRet}");
                                return false;
                            }
                            _formatContext->pb = pb;
                        }

                        // Set metadata tags
                        long startEpochMs = new DateTimeOffset(calibratedStartTime.ToUniversalTime()).ToUnixTimeMilliseconds();
                        ffmpeg.av_dict_set(&_formatContext->metadata, "itb_start_epoch_ms", startEpochMs.ToString(), 0);
                        ffmpeg.av_dict_set(&_formatContext->metadata, "hostname", Environment.MachineName, 0);

                        // 6. Write Stream Header
                        int headerRet = ffmpeg.avformat_write_header(_formatContext, null);
                        if (headerRet < 0)
                        {
                            Logger.Error($"[INPROCESS-ENCODER] avformat_write_header failed with code: {headerRet}");
                            return false;
                        }

                        // 7. Allocate reusable frames & packets
                        _encodedVideoFrame = ffmpeg.av_frame_alloc();
                        _encodedVideoFrame->format = (int)_videoCodecContext->pix_fmt;
                        _encodedVideoFrame->width = _videoCodecContext->width;
                        _encodedVideoFrame->height = _videoCodecContext->height;
                        ffmpeg.av_frame_get_buffer(_encodedVideoFrame, 32);

                        _videoPacket = ffmpeg.av_packet_alloc();
                        _audioPacket = ffmpeg.av_packet_alloc();

                        _videoFrameIndex = 0;
                        _audioSampleIndex = 0;
                        _isInitialized = true;

                        Logger.Info($"[INPROCESS-ENCODER] Pipeline initialized and ready. Output format: {formatName}");
                        return true;
                    }
                    catch (Exception ex)
                    {
                        Logger.Error($"[INPROCESS-ENCODER] Initialization exception: {ex.Message}");
                        Dispose();
                        return false;
                    }
                }
            }, cancellationToken);
        }

        public Task<bool> CompleteAudioHandshakeAsync(CancellationToken cancellationToken)
        {
            // In-process encoder does not require external TCP loopback socket handshake
            return Task.FromResult(true);
        }

        public bool WriteVideoFrame(byte[] frameData)
        {
            if (!_isInitialized || _isDisposed || _videoCodecContext == null || _formatContext == null) return false;

            lock (_syncLock)
            {
                try
                {
                    fixed (byte* pSrc = frameData)
                    {
                        byte*[] srcData = { pSrc };
                        int[] srcLinesize = { _videoCodecContext->width * 4 };

                        ffmpeg.av_frame_make_writable(_encodedVideoFrame);

                        ffmpeg.sws_scale(
                            _swsContext,
                            srcData, srcLinesize, 0, _videoCodecContext->height,
                            _encodedVideoFrame->data, _encodedVideoFrame->linesize);

                        _encodedVideoFrame->pts = _videoFrameIndex++;

                        int sendRet = ffmpeg.avcodec_send_frame(_videoCodecContext, _encodedVideoFrame);
                        if (sendRet < 0) return false;

                        while (ffmpeg.avcodec_receive_packet(_videoCodecContext, _videoPacket) == 0)
                        {
                            _videoPacket->stream_index = _videoStream->index;
                            ffmpeg.av_packet_rescale_ts(_videoPacket, _videoCodecContext->time_base, _videoStream->time_base);

                            ffmpeg.av_interleaved_write_frame(_formatContext, _videoPacket);
                            ffmpeg.av_packet_unref(_videoPacket);
                        }
                    }

                    return true;
                }
                catch (Exception ex)
                {
                    Logger.Warn($"[INPROCESS-ENCODER] WriteVideoFrame error: {ex.Message}");
                    return false;
                }
            }
        }

        public void WriteAudioData(byte[] audioData)
        {
            WriteAudioData(audioData, 0, audioData.Length);
        }

        public void WriteAudioData(byte[] audioData, int offset, int count)
        {
            if (!_isInitialized || _isDisposed || !HasAudio || _audioCodecContext == null) return;

            lock (_syncLock)
            {
                try
                {
                    // Audio frame encoding from PCM bytes
                    int bytesPerSample = sizeof(float) * _audioCodecContext->ch_layout.nb_channels;
                    int samplesCount = count / bytesPerSample;
                    if (samplesCount <= 0) return;

                    fixed (byte* pAudio = &audioData[offset])
                    {
                        AVFrame* audioFrame = ffmpeg.av_frame_alloc();
                        audioFrame->nb_samples = samplesCount;
                        audioFrame->format = (int)_audioCodecContext->sample_fmt;
                        audioFrame->sample_rate = _audioCodecContext->sample_rate;
                        ffmpeg.av_channel_layout_copy(&audioFrame->ch_layout, &_audioCodecContext->ch_layout);
                        ffmpeg.av_frame_get_buffer(audioFrame, 0);

                        byte* inPtr = pAudio;
                        byte** inData = &inPtr;
                        byte** outData = (byte**)&audioFrame->data;
                        ffmpeg.swr_convert(_swrContext, outData, samplesCount, inData, samplesCount);

                        audioFrame->pts = _audioSampleIndex;
                        _audioSampleIndex += samplesCount;

                        if (ffmpeg.avcodec_send_frame(_audioCodecContext, audioFrame) == 0)
                        {
                            while (ffmpeg.avcodec_receive_packet(_audioCodecContext, _audioPacket) == 0)
                            {
                                _audioPacket->stream_index = _audioStream->index;
                                ffmpeg.av_packet_rescale_ts(_audioPacket, _audioCodecContext->time_base, _audioStream->time_base);
                                ffmpeg.av_interleaved_write_frame(_formatContext, _audioPacket);
                                ffmpeg.av_packet_unref(_audioPacket);
                            }
                        }

                        ffmpeg.av_frame_free(&audioFrame);
                    }
                }
                catch
                {
                }
            }
        }

        private static string ResolveVideoEncoderName(string configured)
        {
            if (string.IsNullOrWhiteSpace(configured) || configured.Equals("auto", StringComparison.OrdinalIgnoreCase))
            {
                return "h264_nvenc";
            }
            return configured;
        }

        public void Dispose()
        {
            if (_isDisposed) return;
            _isDisposed = true;
            _isInitialized = false;

            lock (_syncLock)
            {
                try
                {
                    if (_formatContext != null)
                    {
                        // Flush video encoder
                        if (_videoCodecContext != null)
                        {
                            ffmpeg.avcodec_send_frame(_videoCodecContext, null);
                            while (ffmpeg.avcodec_receive_packet(_videoCodecContext, _videoPacket) == 0)
                            {
                                _videoPacket->stream_index = _videoStream->index;
                                ffmpeg.av_interleaved_write_frame(_formatContext, _videoPacket);
                                ffmpeg.av_packet_unref(_videoPacket);
                            }
                        }

                        ffmpeg.av_write_trailer(_formatContext);

                        if ((_formatContext->oformat->flags & ffmpeg.AVFMT_NOFILE) == 0 && _formatContext->pb != null)
                        {
                            AVIOContext* pb = _formatContext->pb;
                            ffmpeg.avio_closep(&pb);
                            _formatContext->pb = pb;
                        }
                    }

                    if (_swsContext != null)
                    {
                        ffmpeg.sws_freeContext(_swsContext);
                        _swsContext = null;
                    }

                    if (_swrContext != null)
                    {
                        fixed (SwrContext** swrPtr = &_swrContext)
                        {
                            ffmpeg.swr_free(swrPtr);
                        }
                    }

                    if (_encodedVideoFrame != null)
                    {
                        fixed (AVFrame** framePtr = &_encodedVideoFrame)
                        {
                            ffmpeg.av_frame_free(framePtr);
                        }
                    }

                    if (_videoPacket != null)
                    {
                        fixed (AVPacket** pktPtr = &_videoPacket)
                        {
                            ffmpeg.av_packet_free(pktPtr);
                        }
                    }

                    if (_audioPacket != null)
                    {
                        fixed (AVPacket** pktPtr = &_audioPacket)
                        {
                            ffmpeg.av_packet_free(pktPtr);
                        }
                    }

                    if (_videoCodecContext != null)
                    {
                        fixed (AVCodecContext** ctxPtr = &_videoCodecContext)
                        {
                            ffmpeg.avcodec_free_context(ctxPtr);
                        }
                    }

                    if (_audioCodecContext != null)
                    {
                        fixed (AVCodecContext** ctxPtr = &_audioCodecContext)
                        {
                            ffmpeg.avcodec_free_context(ctxPtr);
                        }
                    }

                    if (_formatContext != null)
                    {
                        fixed (AVFormatContext** fmtCtxPtr = &_formatContext)
                        {
                            ffmpeg.avformat_free_context(*fmtCtxPtr);
                        }
                        _formatContext = null;
                    }

                    Logger.Info("[INPROCESS-ENCODER] Disposed cleanly.");
                }
                catch (Exception ex)
                {
                    Logger.Warn($"[INPROCESS-ENCODER] Cleanup note: {ex.Message}");
                }
            }
        }
    }
}
