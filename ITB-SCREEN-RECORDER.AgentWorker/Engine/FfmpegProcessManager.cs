// ==========================================
// File: AgentWorker/Engine/FfmpegProcessManager.cs
// ==========================================
using ITB_SCREEN_RECORDER.Core.Common;
using ITB_SCREEN_RECORDER.Core.Configuration;
using ITB_SCREEN_RECORDER.Core.Diagnostics;
using System;
using System.Diagnostics;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace ITBRecorderAgent.Engine
{
    public class FfmpegProcessManager : IDisposable
    {
        private Process? _ffmpegProcess;
        private Stream? _videoStdinStream;
        private TcpListener? _tcpListener;
        private Socket? _audioSocket;
        private readonly AppConfig _config;
        private readonly object _videoLock = new object();
        private readonly object _audioLock = new object();
        private bool _isDisposed = false;
        public bool HasAudio { get; private set; }

        public bool IsRunning
        {
            get
            {
                try
                {
                    return _ffmpegProcess != null && !_ffmpegProcess.HasExited;
                }
                catch (InvalidOperationException)
                {
                    return false;
                }
            }
        }

        public FfmpegProcessManager(AppConfig config)
        {
            _config = config ?? throw new ArgumentNullException(nameof(config));
        }

        public async Task<bool> StartAsync(
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
            try
            {
                if (!destinationUrl.StartsWith("rtmp://", StringComparison.OrdinalIgnoreCase) &&
                    !destinationUrl.StartsWith("rtmps://", StringComparison.OrdinalIgnoreCase) &&
                    (destinationUrl.Contains(":\\") || destinationUrl.StartsWith("/")))
                {
                    string? dir = Path.GetDirectoryName(destinationUrl);
                    if (!string.IsNullOrEmpty(dir) && !Directory.Exists(dir))
                    {
                        Directory.CreateDirectory(dir);
                        Logger.Info($"[ENGINE] Created local buffer directory: {dir}");
                    }
                }

                string ffmpegPath = AppConfig.GetResolvedFFmpegPath();

                if (OperatingSystem.IsLinux())
                {
                    if (ffmpegPath.EndsWith(".exe", StringComparison.OrdinalIgnoreCase))
                    {
                        string fallbackPath = Path.Combine(AppContext.BaseDirectory, "ffmpeg");
                        Logger.Warn($"[FFMPEG] Configuration specifies a Windows executable ('{ffmpegPath}') but agent is running on Linux. Overriding to local binary: {fallbackPath}");
                        ffmpegPath = fallbackPath;
                    }

                    if (!File.Exists(ffmpegPath))
                    {
                        var localCandidate = Path.Combine(AppContext.BaseDirectory, "ffmpeg");
                        if (File.Exists(localCandidate))
                        {
                            ffmpegPath = localCandidate;
                        }
                    }

                    if (File.Exists(ffmpegPath))
                    {
                        try
                        {
                            File.SetUnixFileMode(ffmpegPath,
                                UnixFileMode.UserRead | UnixFileMode.UserWrite | UnixFileMode.UserExecute |
                                UnixFileMode.GroupRead | UnixFileMode.GroupExecute |
                                UnixFileMode.OtherRead | UnixFileMode.OtherExecute);
                        }
                        catch (Exception pEx)
                        {
                            Logger.Warn($"[FFMPEG] Could not apply chmod to '{ffmpegPath}': {pEx.Message}");
                        }
                    }
                }

                Logger.Info($"[FFMPEG] Resolved FFmpeg path: {ffmpegPath}");

                string activeEncoder = await HardwareProbe.ResolveEncoderAsync(ffmpegPath, _config.VideoEncoder);

                int localPort = 0;
                HasAudio = audioChannels > 0;
                if (audioChannels > 0)
                {
                    _tcpListener = new TcpListener(IPAddress.Loopback, 0);
                    _tcpListener.Start();
                    localPort = ((IPEndPoint)_tcpListener.LocalEndpoint).Port;
                }

                string arguments = BuildFfmpegArguments(
                    destinationUrl,
                    calibratedStartTime,
                    videoWidth,
                    videoHeight,
                    audioSampleRate,
                    audioChannels,
                    audioFormat,
                    activeEncoder,
                    localPort,
                    targetFps,
                    videoBitrate);

                Logger.Info($"[FFMPEG] Starting FFmpeg process with arguments: {arguments}");

                var startInfo = new ProcessStartInfo
                {
                    FileName = ffmpegPath,
                    Arguments = arguments,
                    WorkingDirectory = AppContext.BaseDirectory,
                    RedirectStandardInput = true,
                    RedirectStandardError = true,
                    RedirectStandardOutput = false,
                    UseShellExecute = false,
                    CreateNoWindow = true
                };

                _ffmpegProcess = new Process { StartInfo = startInfo };

                _ffmpegProcess.ErrorDataReceived += (sender, e) =>
                {
                    if (!string.IsNullOrWhiteSpace(e.Data))
                    {
                        if (e.Data.Contains("Error", StringComparison.OrdinalIgnoreCase) ||
                            e.Data.Contains("fatal", StringComparison.OrdinalIgnoreCase))
                        {
                            Logger.Error($"[FFMPEG NATIVE ERROR] {e.Data}");
                        }
                        else if (e.Data.Contains("warning", StringComparison.OrdinalIgnoreCase))
                        {
                            Logger.Warn($"[FFMPEG NATIVE WARN] {e.Data}");
                        }
                    }
                };

                bool started = _ffmpegProcess.Start();
                if (!started)
                {
                    Logger.Error("[FFMPEG] Failed to start process.");
                    return false;
                }

                _ffmpegProcess.BeginErrorReadLine();
                _videoStdinStream = _ffmpegProcess.StandardInput.BaseStream;

                return true;
            }
            catch (Exception ex)
            {
                Logger.Error($"[FFMPEG] Launch failed: {ex.Message}");
                Dispose();
                return false;
            }
        }

        public async Task<bool> CompleteAudioHandshakeAsync(CancellationToken cancellationToken)
        {
            if (_tcpListener == null) return true; // Video-only secondary stream
            try
            {
                using var timeoutCts = new CancellationTokenSource(TimeSpan.FromSeconds(5));
                using var linkedCts = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken, timeoutCts.Token);

                var acceptTask = _tcpListener.AcceptSocketAsync(linkedCts.Token).AsTask();
                var timeoutTask = Task.Delay(5000, linkedCts.Token);

                var completedTask = await Task.WhenAny(acceptTask, timeoutTask).ConfigureAwait(false);
                if (completedTask == timeoutTask)
                {
                    Logger.Warn("[AUDIO] TCP Loopback handshake timeout.");
                    return false;
                }

                _audioSocket = await acceptTask.ConfigureAwait(false);
                _audioSocket.NoDelay = true;
                _audioSocket.SendBufferSize = 65536;

                Logger.Info($"[ENGINE] FFmpeg Audio channel connected cleanly over TCP Loopback.");
                return true;
            }
            catch (Exception ex)
            {
                Logger.Error($"[FFMPEG] Audio socket handshake failed: {ex.Message}");
                return false;
            }
        }

        private string BuildFfmpegArguments(
            string destinationUrl, DateTime calibratedStartTime,
            int videoWidth, int videoHeight, int audioSampleRate, int audioChannels,
            string audioFormat, string videoEncoder, int tcpPort,
            int targetFps, string videoBitrate)
        {
            var ffmpegArgs = new StringBuilder();

            int effectiveFps = targetFps > 0 ? targetFps : (_config.TargetFps > 0 ? _config.TargetFps : 30);

            string normalizedBitrate = string.IsNullOrWhiteSpace(videoBitrate) ? _config.VideoBitrate : videoBitrate.Trim();
            if (int.TryParse(normalizedBitrate, out _))
            {
                normalizedBitrate += "k";
            }
            string bufferSizeStr = normalizedBitrate;

            int gopSize = effectiveFps;
            int keyintMin = effectiveFps;

            // Ensure UTC normalization and compute absolute start epoch in milliseconds
            DateTime calibratedUtc = calibratedStartTime.Kind == DateTimeKind.Utc
                ? calibratedStartTime
                : calibratedStartTime.ToUniversalTime();

            long startEpochMs = new DateTimeOffset(calibratedUtc).ToUnixTimeMilliseconds();
            string utcIso = calibratedUtc.ToString("yyyy-MM-ddTHH:mm:ss.ffffffZ");

            // 1. Raw video input stream piped via standard input (Stdin)
            ffmpegArgs.Append($"-thread_queue_size 1024 -analyzeduration 0 -probesize 32 -framerate {effectiveFps} -f rawvideo -pix_fmt bgra -s {videoWidth}x{videoHeight} -i pipe:0 ");

            // 2. Audio input stream via loopback TCP socket if configured
            if (audioChannels > 0)
            {
                ffmpegArgs.Append($"-thread_queue_size 1024 -analyzeduration 0 -probesize 32 -f {audioFormat} -ar {audioSampleRate} -ac {audioChannels} -i tcp://127.0.0.1:{tcpPort} ");
                ffmpegArgs.Append("-map 0:v -map 1:a ");
            }
            else
            {
                ffmpegArgs.Append("-map 0:v -an ");
            }

            // 3. Video encoding - hardware rate control, sharp visuals, and massive static screen bandwidth reduction (True Constrained VBR)
            string pixFmt = "yuv420p";
            if (videoEncoder.Contains("nvenc", StringComparison.OrdinalIgnoreCase))
            {
                ffmpegArgs.Append($"-c:v h264_nvenc -preset p4 -tune ll -rc vbr -cq 21 -b:v 0 -maxrate {normalizedBitrate} -bufsize {bufferSizeStr} -spatial-aq 1 -temporal-aq 1 -forced-idr 1 ");
            }
            else if (videoEncoder.Contains("qsv", StringComparison.OrdinalIgnoreCase))
            {
                // QSV encodes natively in NV12. Avoiding yuv420p avoids an unnecessary double software color conversion.
                pixFmt = "nv12";
                ffmpegArgs.Append($"-c:v h264_qsv -preset veryfast -global_quality 21 -b:v 0 -maxrate {normalizedBitrate} -bufsize {bufferSizeStr} -idr_interval 1 -bf 0 -forced_idr 1 ");
            }
            else
            {
                ffmpegArgs.Append($"-c:v libx264 -preset ultrafast -tune zerolatency -crf 21 -maxrate {normalizedBitrate} -bufsize {bufferSizeStr} -sc_threshold 0 ");
            }

            // 4. Force 1-second IDR Keyframe intervals for sub-second seek and wall-clock segmentation
            ffmpegArgs.Append($"-g {gopSize} -keyint_min {keyintMin} -force_key_frames \"expr:gte(t,n_forced*1)\" -fps_mode cfr -r {effectiveFps} -pix_fmt {pixFmt} ");

            // 5. Continuous audio re-sampling and timestamp synchronization with embedded UTC/epoch metadata
            if (audioChannels > 0)
            {
                ffmpegArgs.Append($"-c:a aac -b:a 128k -ar {audioSampleRate} -af \"aresample=async=1000\" -max_muxing_queue_size 2048 ");
            }
            ffmpegArgs.Append($"-metadata creation_time=\"{utcIso}\" ");
            ffmpegArgs.Append($"-metadata itb_start_epoch_ms=\"{startEpochMs}\" ");
            ffmpegArgs.Append($"-metadata comment=\"ITB_EPOCH:{startEpochMs}\" ");
            ffmpegArgs.Append($"-metadata hostname=\"{Environment.MachineName}\" ");

            // 6. Multiplexed output stream (supporting TLS-encrypted RTMPS, plain RTMP, and fragmented MP4)
            bool isRtmps = destinationUrl.StartsWith("rtmps://", StringComparison.OrdinalIgnoreCase);
            bool isRtmp = isRtmps || destinationUrl.StartsWith("rtmp://", StringComparison.OrdinalIgnoreCase);
            if (isRtmp)
            {
                if (isRtmps)
                {
                    ffmpegArgs.Append("-tls_verify 0 ");
                }
                ffmpegArgs.Append($"-flvflags no_duration_filesize -y -f flv \"{destinationUrl}\"");
            }
            else
            {
                ffmpegArgs.Append($"-movflags +frag_keyframe+empty_moov+default_base_moof -y -f mp4 \"{destinationUrl}\"");
            }

            return ffmpegArgs.ToString();
        }

        public bool WriteVideoFrame(byte[] frameData)
        {
            if (_isDisposed || _videoStdinStream == null || !IsRunning) return false;

            try
            {
                lock (_videoLock)
                {
                    _videoStdinStream.Write(frameData, 0, frameData.Length);
                }
                return true;
            }
            catch
            {
                return false;
            }
        }

        public void WriteAudioData(byte[] audioData)
        {
            WriteAudioData(audioData, 0, audioData.Length);
        }

        public void WriteAudioData(byte[] audioData, int offset, int count)
        {
            if (_isDisposed || !IsRunning || _audioSocket == null || !HasAudio) return;

            try
            {
                lock (_audioLock)
                {
                    if (_audioSocket.Connected)
                    {
                        _audioSocket.Send(audioData, offset, count, SocketFlags.None);
                    }
                }
            }
            catch
            {
            }
        }

        public void Dispose()
        {
            if (_isDisposed) return;
            _isDisposed = true;
            HasAudio = false;

            try
            {
                lock (_audioLock)
                {
                    _audioSocket?.Close();
                    _audioSocket?.Dispose();
                    _audioSocket = null;
                }

                _tcpListener?.Stop();
                _tcpListener = null;

                lock (_videoLock)
                {
                    _videoStdinStream?.Close();
                    _videoStdinStream = null;
                }

                if (_ffmpegProcess != null && !_ffmpegProcess.HasExited)
                {
                    _ffmpegProcess.Kill();
                    _ffmpegProcess.WaitForExit(1000);
                }

                _ffmpegProcess?.Dispose();
                _ffmpegProcess = null;
            }
            catch { }
        }
    }
}