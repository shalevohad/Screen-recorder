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
                string winFont = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.Windows), "Fonts", "arial.ttf");
                if (File.Exists(winFont))
                {
                    return winFont.Replace("\\", "/").Replace(":", "\\:");
                }
            }
            else if (OperatingSystem.IsLinux())
            {
                string[] linuxFontPaths =
                {
                    "/usr/share/fonts/liberation/LiberationSans-Regular.ttf",
                    "/usr/share/fonts/dejavu/DejaVuSans.ttf",
                    "/usr/share/fonts/gnu-free/FreeSans.ttf",
                    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
                    "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf"
                };

                foreach (var path in linuxFontPaths)
                {
                    if (File.Exists(path))
                    {
                        return path.Replace(":", "\\:");
                    }
                }
            }

            return "arial";
        }

        private string BuildFfmpegArguments(
            string destinationUrl, DateTime calibratedStartTime,
            int videoWidth, int videoHeight, int audioSampleRate, int audioChannels,
            string audioFormat, string videoEncoder, int tcpPort, string fontPath)
        {
            var ffmpegArgs = new StringBuilder();

            string presetValue;
            string hardwareFlags = "";

            if (videoEncoder.Contains("nvenc", StringComparison.OrdinalIgnoreCase))
            {
                presetValue = "p2";
                hardwareFlags = "-tune ll -forced-idr 1 -delay 0";
            }
            else if (videoEncoder.Contains("qsv", StringComparison.OrdinalIgnoreCase))
            {
                presetValue = "veryfast";
                hardwareFlags = "-low_power 1";
            }
            else
            {
                presetValue = "ultrafast";
                hardwareFlags = "-tune zerolatency";
            }

            int gopSize = _config.TargetFps;
            string utcTimestampIso = calibratedStartTime.ToString("o");

            // קביעת קצב פנימי יציב ללא Wallclock
            ffmpegArgs.Append($"-thread_queue_size 512 -f rawvideo -pix_fmt bgra -s {videoWidth}x{videoHeight} -r {_config.TargetFps} -i pipe:0 ");
            ffmpegArgs.Append($"-thread_queue_size 512 -f {audioFormat} -ar {audioSampleRate} -ac {audioChannels} -i tcp://127.0.0.1:{tcpPort} ");

            long startUnixEpoch = new DateTimeOffset(calibratedStartTime).ToUnixTimeSeconds();
            string filterArg = $"-vf \"drawtext=fontfile='{fontPath}':text='%{{pts\\:localtime\\:{startUnixEpoch}}}':x=10:y=10:fontsize=20:fontcolor=white:box=1:boxcolor=black@0.6\" ";
            ffmpegArgs.Append(filterArg);

            // CFR מושלם (Constant Frame Rate) + חיתוך Keyframe בכל שנייה בדיוק
            ffmpegArgs.Append($"-c:v {videoEncoder} -preset {presetValue} {hardwareFlags} -pix_fmt yuv420p -g {gopSize} -keyint_min {gopSize} -sc_threshold 0 -fps_mode cfr -b:v {_config.VideoBitrate} -maxrate {_config.VideoBitrate} -bufsize 5M ");

            if (audioChannels > 0)
            {
                ffmpegArgs.Append("-c:a aac -b:a 128k -af aresample=async=1000 ");
            }

            ffmpegArgs.Append($"-metadata utc_start_time=\"{utcTimestampIso}\" -metadata hostname=\"{Environment.MachineName}\" ");
            ffmpegArgs.Append($"-flvflags no_duration_filesize -f flv \"{destinationUrl}\"");

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
            finally
            {
                _isDisposed = false;
            }
        }
    }
}