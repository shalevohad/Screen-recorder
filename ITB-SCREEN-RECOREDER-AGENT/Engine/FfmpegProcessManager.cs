using System;
using System.Diagnostics;
using System.IO;
using System.IO.Pipes;
using System.Runtime.InteropServices;
using System.Threading;
using System.Threading.Tasks;
using ITBRecorderAgent.Core;

namespace ITBRecorderAgent.Engine
{
    public class FfmpegProcessManager : IDisposable
    {
        [DllImport("libc", EntryPoint = "mkfifo", SetLastError = true)]
        private static extern int MkFifoLinux(string path, uint mode);

        private readonly AppConfig _config;
        private Process? _ffmpegProcess;
        private Stream? _videoStream;
        private Stream? _audioStream;
        private NamedPipeServerStream? _windowsAudioPipe;
        private string? _linuxFifoPath;

        private readonly string _audioPipeId;
        private readonly object _writeLock = new object();
        private bool _isDisposed = false;

        public bool IsRunning => _ffmpegProcess != null && !_ffmpegProcess.HasExited;

        public FfmpegProcessManager(AppConfig config)
        {
            _config = config ?? throw new ArgumentNullException(nameof(config));
            _audioPipeId = $"ITB_Audio_{Guid.NewGuid():N}";
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
                string activeEncoder = await HardwareProbe.ResolveEncoderAsync(_config.FFmpegPath, _config.VideoEncoder);
                string audioInputArg = SetupAudioIpcPipe();
                string fontPath = ResolvePlatformFontPath();

                string arguments = BuildFfmpegArguments(
                    destinationUrl,
                    calibratedStartTime,
                    videoWidth,
                    videoHeight,
                    audioSampleRate,
                    audioChannels,
                    audioFormat,
                    activeEncoder,
                    audioInputArg,
                    fontPath);

                Logger.Info($"[FFMPEG] Starting FFmpeg process...");

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
                    if (!string.IsNullOrWhiteSpace(e.Data))
                    {
                        if (e.Data.Contains("Error", StringComparison.OrdinalIgnoreCase) ||
                            e.Data.Contains("fatal", StringComparison.OrdinalIgnoreCase))
                        {
                            Logger.Error($"[FFMPEG STDERR] {e.Data}");
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
                _videoStream = _ffmpegProcess.StandardInput.BaseStream;

                return true;
            }
            catch (Exception ex)
            {
                Logger.Error($"[FFMPEG] Launch failed: {ex.Message}");
                Dispose();
                return false;
            }
        }

        private string SetupAudioIpcPipe()
        {
            if (OperatingSystem.IsWindows())
            {
                _windowsAudioPipe = new NamedPipeServerStream(
                    _audioPipeId,
                    PipeDirection.Out,
                    1,
                    PipeTransmissionMode.Byte,
                    PipeOptions.Asynchronous);

                return $"-f f32le -ar 48000 -ac 2 -i \"\\\\.\\pipe\\{_audioPipeId}\"";
            }
            else
            {
                _linuxFifoPath = Path.Combine(Path.GetTempPath(), $"{_audioPipeId}.fifo");

                if (File.Exists(_linuxFifoPath)) File.Delete(_linuxFifoPath);

                MkFifoLinux(_linuxFifoPath, 438); // 0666 permissions
                return $"-f f32le -ar 48000 -ac 2 -i \"{_linuxFifoPath}\"";
            }
        }

        public async Task<bool> CompleteAudioHandshakeAsync(CancellationToken cancellationToken)
        {
            try
            {
                if (OperatingSystem.IsWindows() && _windowsAudioPipe != null)
                {
                    using var timeoutCts = new CancellationTokenSource(TimeSpan.FromSeconds(5));
                    using var linkedCts = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken, timeoutCts.Token);

                    await _windowsAudioPipe.WaitForConnectionAsync(linkedCts.Token).ConfigureAwait(false);
                    _audioStream = _windowsAudioPipe;
                    return true;
                }
                else if (OperatingSystem.IsLinux() && _linuxFifoPath != null)
                {
                    _audioStream = new FileStream(_linuxFifoPath, FileMode.Open, FileAccess.Write, FileShare.ReadWrite);
                    return true;
                }

                return false;
            }
            catch (Exception ex)
            {
                Logger.Error($"[FFMPEG] Audio handshake failed: {ex.Message}");
                return false;
            }
        }

        private string ResolvePlatformFontPath()
        {
            if (OperatingSystem.IsWindows())
            {
                return "C\\\\:/Windows/Fonts/arial.ttf";
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
            string audioInputArg,
            string fontPath)
        {
            string videoInput = $"-f rawvideo -pix_fmt bgra -s {videoWidth}x{videoHeight} -r {_config.TargetFps} -i -";
            int gopSize = _config.TargetFps * 2;

            string encoderArgs = videoEncoder.Equals("h264_nvenc", StringComparison.OrdinalIgnoreCase)
                ? $"-c:v h264_nvenc -preset p4 -tune ll -rc cbr -b:v {_config.VideoBitrate} -maxrate {_config.VideoBitrate} -bufsize 10M -g {gopSize} -pix_fmt yuv420p"
                : $"-c:v libx264 -preset ultrafast -tune zerolatency -b:v {_config.VideoBitrate} -maxrate {_config.VideoBitrate} -bufsize 10M -g {gopSize} -pix_fmt yuv420p";

            string audioEncoderArgs = "-c:a aac -b:a 128k -ar 48000 -af aresample=async=1000";

            long startUnixEpoch = new DateTimeOffset(calibratedStartTime).ToUnixTimeSeconds();
            string filterArg = $"-vf \"drawtext=fontfile='{fontPath}':text='%{{pts\\:localtime\\:{startUnixEpoch}\\:%Y-%m-%d %H\\\\:%M\\\\:%S}}':x=10:y=10:fontsize=20:fontcolor=white:box=1:boxcolor=black@0.6\"";

            return $"{videoInput} {audioInputArg} {filterArg} {encoderArgs} {audioEncoderArgs} -f flv \"{destinationUrl}\"";
        }

        public bool WriteVideoFrame(byte[] frameData)
        {
            if (_isDisposed || _videoStream == null || !IsRunning) return false;

            try
            {
                lock (_writeLock)
                {
                    _videoStream.Write(frameData, 0, frameData.Length);
                }
                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool WriteAudioData(byte[] audioData)
        {
            if (_isDisposed || _audioStream == null || !IsRunning) return false;

            try
            {
                _audioStream.Write(audioData, 0, audioData.Length);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public void Dispose()
        {
            if (_isDisposed) return;
            _isDisposed = true;

            try
            {
                _videoStream?.Flush();
                _videoStream?.Dispose();
                _videoStream = null;

                _audioStream?.Flush();
                _audioStream?.Dispose();
                _audioStream = null;

                _windowsAudioPipe?.Dispose();
                _windowsAudioPipe = null;

                if (!string.IsNullOrEmpty(_linuxFifoPath) && File.Exists(_linuxFifoPath))
                {
                    try { File.Delete(_linuxFifoPath); } catch { }
                }

                if (_ffmpegProcess != null && !_ffmpegProcess.HasExited)
                {
                    _ffmpegProcess.Kill();
                    _ffmpegProcess.WaitForExit(2000);
                }

                _ffmpegProcess?.Dispose();
                _ffmpegProcess = null;
            }
            catch { }
        }
    }
}