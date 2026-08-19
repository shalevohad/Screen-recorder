using ITB_SCREEN_RECORDER.Core.Diagnostics;
using System;
using System.Diagnostics;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Common;
using ITB_SCREEN_RECORDER.Core.Configuration;

namespace ITBRecorderAgent.Engine
{
    public class FfmpegProcessManager : IDisposable
    {
        private Process? _ffmpegProcess;
        private Stream? _videoStdinStream;
        private TcpListener? _tcpListener;
        private Socket? _audioSocket;
        private readonly AppConfig _config;
        private readonly object _writeLock = new object();
        private bool _isDisposed = false;

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
            CancellationToken cancellationToken)
        {
            try
            {
                // הבטחת קיום תיקיית יעד במידה ומדובר בנתיב מקומי (Offline Buffer)
                if (destinationUrl.Contains(":\\") || destinationUrl.StartsWith("/"))
                {
                    string? dir = Path.GetDirectoryName(destinationUrl);
                    if (!string.IsNullOrEmpty(dir) && !Directory.Exists(dir))
                    {
                        Directory.CreateDirectory(dir);
                        Logger.Info($"[ENGINE] Created local buffer directory: {dir}");
                    }
                }

                Logger.Info($"[FFMPEG] Resolved FFmpeg path: {_config.FFmpegPath}");

                string activeEncoder = await HardwareProbe.ResolveEncoderAsync(_config.FFmpegPath, _config.VideoEncoder);
                string fontPath = ResolvePlatformFontPath();

                _tcpListener = new TcpListener(IPAddress.Loopback, 0);
                _tcpListener.Start();
                int localPort = ((IPEndPoint)_tcpListener.LocalEndpoint).Port;

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
                    fontPath);

                Logger.Info($"[FFMPEG] Starting FFmpeg process with arguments: {arguments}");

                var startInfo = new ProcessStartInfo
                {
                    FileName = _config.FFmpegPath,
                    Arguments = arguments,
                    RedirectStandardInput = true,
                    RedirectStandardError = true,
                    RedirectStandardOutput = false,
                    UseShellExecute = false,
                    CreateNoWindow = true
                };

                _ffmpegProcess = new Process { StartInfo = startInfo };

                _ffmpegProcess.ErrorDataReceived += (sender, e) =>
                {
                    if (!string.IsNullOrWhiteSpace(e.Data) && e.Data.Contains("Error", StringComparison.OrdinalIgnoreCase))
                    {
                        Logger.Error($"[FFMPEG NATIVE ERROR] {e.Data}");
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
            if (_tcpListener == null) return false;
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

        private string ResolvePlatformFontPath()
        {
            if (OperatingSystem.IsWindows())
            {
                string localFont = "arial.ttf";

                // גישה מחוץ לקופסה: העתקת הפונט לתיקיית הריצה עוקפת לחלוטין את כל בעיות ה-Parsing וה-Fontconfig של FFmpeg
                if (!File.Exists(localFont))
                {
                    try
                    {
                        File.Copy(@"C:\Windows\Fonts\arial.ttf", localFont, true);
                    }
                    catch (Exception ex)
                    {
                        Logger.Warn($"[ENGINE] Could not copy local font, execution will continue without it: {ex.Message}");
                    }
                }

                return localFont; // החזרת שם קובץ נקי ללא אותיות כונן או לוכסנים
            }

            string[] linuxFontPaths =
            {
                "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
                "/usr/share/fonts/truetype/freefont/FreeSans.ttf",
                "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
                "/usr/share/fonts/TTF/DejaVuSans.ttf"
            };

            foreach (var path in linuxFontPaths)
            {
                if (File.Exists(path)) return path;
            }

            return "DejaVuSans.ttf";
        }

        private string BuildFfmpegArguments(
            string destinationUrl,
            DateTime calibratedStartTime,
            int videoWidth,
            int videoHeight,
            int audioSampleRate,
            int audioChannels,
            string audioFormat,
            string videoEncoder,
            int tcpPort,
            string fontPath)
        {
            var ffmpegArgs = new StringBuilder();

            string presetValue;
            string hardwareFlags = "";

            if (videoEncoder.Contains("nvenc", StringComparison.OrdinalIgnoreCase))
            {
                presetValue = "p2";
                hardwareFlags = "-tune ll -forced-idr 1";
            }
            else if (videoEncoder.Contains("qsv", StringComparison.OrdinalIgnoreCase))
            {
                presetValue = "veryfast";
                // low_power: fixed-function low-latency encode path on Intel Quick Sync.
                hardwareFlags = "-low_power 1";
            }
            else
            {
                presetValue = "ultrafast";
                hardwareFlags = "-tune zerolatency";
            }

            // 2-second keyframe interval (instead of 1s) trims recording/stream size, since
            // keyframes are much larger than delta frames. Tradeoff: live HLS viewers joining
            // mid-stream wait up to ~2s for their first full frame instead of ~1s.
            int gopSize = _config.TargetFps * 2;
            string utcTimestampIso = calibratedStartTime.ToString("o");

            // 1. קלט וידאו (מותאם לפורמט בזיכרון של רכיב ה-DXGI)
            // use_wallclock_as_timestamps: stamp each frame by real arrival time instead of a
            // nominal frame-count clock. Without this, capture jitter (DXGI overhead, GC pauses,
            // frame padding) makes the encoded stream's timestamps silently drift from wall-clock
            // time, which trips MediaMTX's recorder drift-detection and force-resets the segment
            // every ~15-30s regardless of Storage.ChunkIntervalMinutes.
            ffmpegArgs.Append($"-thread_queue_size 1024 -use_wallclock_as_timestamps 1 -f rawvideo -pix_fmt bgra -s {videoWidth}x{videoHeight} -r {_config.TargetFps} -i pipe:0 ");

            // 2. קלט אודיו ב-TCP
            ffmpegArgs.Append($"-thread_queue_size 1024 -use_wallclock_as_timestamps 1 -f {audioFormat} -ar {audioSampleRate} -ac {audioChannels} -i tcp://127.0.0.1:{tcpPort} ");

            // פילטר טקסט לחותמת זמן (ללא ציטוטים מיותרים שמרסקים את ה-Parser)
            long startUnixEpoch = new DateTimeOffset(calibratedStartTime).ToUnixTimeSeconds();
            string filterArg = $"-vf \"drawtext=fontfile={fontPath}:text='%{{pts\\:localtime\\:{startUnixEpoch}}}':x=10:y=10:fontsize=20:fontcolor=white:box=1:boxcolor=black@0.6\" ";
            ffmpegArgs.Append(filterArg);

            // 3. קידוד וידאו
            // profile:v baseline is forced explicitly across all three encoders (libx264,
            // h264_nvenc, h264_qsv all accept it) so the actual bitstream profile is
            // deterministic. Without it, the encoded profile is left implicit/encoder-decided
            // and can end up not matching what MediaMTX declares in the HLS manifest's CODECS
            // attribute (observed: manifest declared High Profile "avc1.640028" while the
            // actual libx264 output was Constrained Baseline) - browsers' strict MSE codec
            // validation rejects that mismatch with MEDIA_ERR_DECODE.
            ffmpegArgs.Append($"-c:v {videoEncoder} -preset {presetValue} {hardwareFlags} -profile:v baseline -pix_fmt yuv420p -g {gopSize} -keyint_min {gopSize} -sc_threshold 0 -fps_mode cfr -b:v {_config.VideoBitrate} -maxrate {_config.VideoBitrate} -bufsize 10M ");

            // 4. קידוד אודיו
            if (audioChannels > 0)
            {
                ffmpegArgs.Append("-c:a aac -b:a 128k ");
            }

            // 5. אריזת FLV מהירה לשמירה מקומית או שידור
            ffmpegArgs.Append($"-metadata utc_start_time=\"{utcTimestampIso}\" -metadata hostname=\"{Environment.MachineName}\" ");
            ffmpegArgs.Append($"-flvflags no_duration_filesize -y -f flv \"{destinationUrl}\"");

            return ffmpegArgs.ToString();
        }

        public bool WriteVideoFrame(byte[] frameData)
        {
            if (_isDisposed || _videoStdinStream == null || !IsRunning) return false;

            try
            {
                lock (_writeLock)
                {
                    _videoStdinStream.Write(frameData, 0, frameData.Length);
                    _videoStdinStream.Flush();
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
            if (_isDisposed || !IsRunning || _audioSocket == null) return;

            try
            {
                if (_audioSocket.Connected)
                {
                    _audioSocket.Send(audioData, 0, audioData.Length, SocketFlags.None);
                }
            }
            catch
            {
                // בלימת שגיאות רשת רגעיות
            }
        }

        public void Dispose()
        {
            if (_isDisposed) return;
            _isDisposed = true;

            try
            {
                _audioSocket?.Close();
                _audioSocket?.Dispose();
                _audioSocket = null;

                _tcpListener?.Stop();
                _tcpListener = null;

                _videoStdinStream?.Close();
                _videoStdinStream = null;

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