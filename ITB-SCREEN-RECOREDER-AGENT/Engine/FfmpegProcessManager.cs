using System;
using System.Diagnostics;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using ITBRecorderAgent.Core;

namespace ITBRecorderAgent.Engine
{
    public class FfmpegProcessManager : IDisposable
    {
        private Process? _ffmpegProcess;
        private Stream? _videoStdinStream;
        private TcpListener? _tcpListener;
        private Socket? _audioSocket;
        private readonly AppConfig _config;

        public bool IsRunning => _ffmpegProcess != null && !_ffmpegProcess.HasExited;

        public FfmpegProcessManager(AppConfig config)
        {
            _config = config;
        }

        public async Task<bool> StartAsync(string targetDestination, DateTime calibratedUtcTime, int width, int height, int audioSampleRate, int audioChannels, string audioFmt, CancellationToken cancellationToken)
        {
            string ffmpegExecutable = Path.IsPathRooted(_config.FFmpegPath)
                ? _config.FFmpegPath
                : Path.Combine(AppDomain.CurrentDomain.BaseDirectory, _config.FFmpegPath);

            if (!File.Exists(ffmpegExecutable))
            {
                Logger.Error($"[FATAL] FFmpeg executable not found at: {ffmpegExecutable}");
                return false;
            }

            _tcpListener = new TcpListener(IPAddress.Loopback, 0);
            _tcpListener.Start();
            int localPort = ((IPEndPoint)_tcpListener.LocalEndpoint).Port;

            string utcTimestampIso = calibratedUtcTime.ToString("o");
            var ffmpegArgs = new StringBuilder();

            string presetValue;
            string hardwareFlags = "";

            if (_config.VideoEncoder.Contains("nvenc", StringComparison.OrdinalIgnoreCase))
            {
                presetValue = "p1";
                hardwareFlags = "-tune zerolatency -forced-idr 1";
            }
            else
            {
                presetValue = "ultrafast";
                hardwareFlags = "-tune zerolatency";
            }

            int gopSize = _config.TargetFps;

            // 1. קלט וידאו
            ffmpegArgs.Append($"-f rawvideo -pix_fmt bgra -s {width}x{height} -r {_config.TargetFps} -i pipe:0 ");

            // 2. קלט אודיו
            ffmpegArgs.Append($"-f {audioFmt} -ar {audioSampleRate} -ac {audioChannels} -i tcp://127.0.0.1:{localPort} ");

            // 3. תיקון: שימוש ב-fps_mode cfr במקום vsync cfr לביצוע תאימות מלאה
            ffmpegArgs.Append($"-c:v {_config.VideoEncoder} -preset {presetValue} {hardwareFlags} -g {gopSize} -keyint_min {gopSize} -sc_threshold 0 -fps_mode cfr -b:v {_config.VideoBitrate} ");

            // 4. קידוד אודיו
            if (audioChannels > 0)
            {
                ffmpegArgs.Append("-c:a aac -b:a 128k ");
            }

            // 5. יעד
            ffmpegArgs.Append($"-metadata utc_start_time=\"{utcTimestampIso}\" -metadata hostname=\"{Environment.MachineName}\" ");
            ffmpegArgs.Append($"-y -f flv \"{targetDestination}\"");

            try
            {
                _ffmpegProcess = new Process
                {
                    StartInfo = new ProcessStartInfo
                    {
                        FileName = ffmpegExecutable,
                        Arguments = ffmpegArgs.ToString(),
                        UseShellExecute = false,
                        CreateNoWindow = true,
                        RedirectStandardInput = true,
                        RedirectStandardError = true
                    }
                };

                _ffmpegProcess.ErrorDataReceived += (sender, e) =>
                {
                    if (!string.IsNullOrEmpty(e.Data) && e.Data.Contains("Error", StringComparison.OrdinalIgnoreCase))
                    {
                        Logger.Error($"[FFMPEG NATIVE ERROR] {e.Data}");
                    }
                };

                _ffmpegProcess.Start();
                _ffmpegProcess.BeginErrorReadLine();
                _videoStdinStream = _ffmpegProcess.StandardInput.BaseStream;

                return true;
            }
            catch (Exception ex)
            {
                Logger.Error($"Failed to start FFmpeg process over TCP: {ex.Message}");
                return false;
            }
        }

        public async Task<bool> CompleteAudioHandshakeAsync(CancellationToken cancellationToken)
        {
            if (_tcpListener == null) return false;
            try
            {
                var acceptTask = _tcpListener.AcceptSocketAsync(cancellationToken).AsTask();
                var timeoutTask = Task.Delay(3000, cancellationToken);

                var completedTask = await Task.WhenAny(acceptTask, timeoutTask).ConfigureAwait(false);
                if (completedTask == timeoutTask)
                {
                    Logger.Warn("[AUDIO] TCP Loopback handshake timeout inside CompleteAudioHandshakeAsync.");
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
                Logger.Error($"Failed to accept audio socket connection: {ex.Message}");
                return false;
            }
        }

        public bool WriteVideoFrame(byte[] frameData)
        {
            if (_videoStdinStream == null || _ffmpegProcess == null || _ffmpegProcess.HasExited) return false;
            try
            {
                _videoStdinStream.Write(frameData, 0, frameData.Length);
                _videoStdinStream.Flush();
                return true;
            }
            catch (IOException) { return false; }
        }

        public void WriteAudioData(byte[] audioData)
        {
            if (_audioSocket != null && _audioSocket.Connected)
            {
                try
                {
                    _audioSocket.Send(audioData, 0, audioData.Length, SocketFlags.None);
                }
                catch (SocketException) { }
            }
        }

        public void Dispose()
        {
            try
            {
                _audioSocket?.Close();
                _audioSocket?.Dispose();
                _tcpListener?.Stop();
                _videoStdinStream?.Close();

                if (_ffmpegProcess != null && !_ffmpegProcess.HasExited)
                {
                    _ffmpegProcess.CancelErrorRead();
                    _ffmpegProcess.WaitForExit(1000);
                    if (!_ffmpegProcess.HasExited) _ffmpegProcess.Kill();
                }
                _ffmpegProcess?.Dispose();
            }
            catch (Exception ex) { Logger.Error($"FFmpeg shutdown error: {ex.Message}"); }
        }
    }
}