using System;
using System.Diagnostics;
using System.IO;
using System.IO.Pipes;
using System.Threading;
using System.Threading.Tasks;
using ITBRecorderAgent.Core;

namespace ITBRecorderAgent.Engine
{
    public class FfmpegProcessManager : IDisposable
    {
        private Process? _ffmpegProcess;
        private Stream? _videoStdinStream;
        private NamedPipeServerStream? _audioPipe;
        private readonly AppConfig _config;
        private readonly string _rtmpTarget;

        public bool IsRunning => _ffmpegProcess != null && !_ffmpegProcess.HasExited;

        public FfmpegProcessManager(AppConfig config, string rtmpTarget)
        {
            _config = config;
            _rtmpTarget = rtmpTarget;
        }

        public async Task<bool> StartAsync(int width, int height, int audioSampleRate, int audioChannels, string audioFmt, CancellationToken cancellationToken)
        {
            string ffmpegExecutable = Path.IsPathRooted(_config.FFmpegPath)
                ? _config.FFmpegPath
                : Path.Combine(AppDomain.CurrentDomain.BaseDirectory, _config.FFmpegPath);

            if (!File.Exists(ffmpegExecutable))
            {
                Logger.Error($"[FATAL] FFmpeg executable not found at: {ffmpegExecutable}");
                return false;
            }

            string audioPipeName = $"ITBAudio_{Guid.NewGuid():N}";
            _audioPipe = new NamedPipeServerStream(audioPipeName, PipeDirection.Out, 1, PipeTransmissionMode.Byte, PipeOptions.Asynchronous);

            // שימו לב: ללא מרכאות סביב _rtmpTarget כדי למנוע את שגיאה -138
            string arguments =
                $"-y " +
                $"-f rawvideo -pix_fmt bgra -s {width}x{height} -r {_config.TargetFps} -i pipe:0 " +
                $"-f {audioFmt} -ar {audioSampleRate} -ac {audioChannels} -i \\\\.\\pipe\\{audioPipeName} " +
                $"-c:v h264_nvenc -preset p4 -tune ull -b:v {_config.VideoBitrate} " +
                $"-c:a aac -b:a 128k " +
                $"-f flv {_rtmpTarget}";

            var psi = new ProcessStartInfo
            {
                FileName = ffmpegExecutable,
                Arguments = arguments,
                UseShellExecute = false,
                RedirectStandardInput = true,
                RedirectStandardError = true,
                CreateNoWindow = true
            };

            _ffmpegProcess = new Process { StartInfo = psi };
            _ffmpegProcess.ErrorDataReceived += (s, e) =>
            {
                if (!string.IsNullOrEmpty(e.Data)) Logger.Info($"[FFmpeg] {e.Data}");
            };

            try
            {
                _ffmpegProcess.Start();
                _videoStdinStream = _ffmpegProcess.StandardInput.BaseStream;
                _ffmpegProcess.BeginErrorReadLine();

                Logger.Info("Waiting for FFmpeg to connect to the audio IPC pipe...");
                await _audioPipe.WaitForConnectionAsync(cancellationToken);

                Logger.Info($"FFmpeg Muxer started (Video: {_config.VideoBitrate} @ {_config.TargetFps}fps | Audio: AAC 128k).");
                return true;
            }
            catch (Exception ex)
            {
                Logger.Error($"Failed to start FFmpeg process or connect IPC: {ex.Message}");
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
            if (_audioPipe != null && _audioPipe.IsConnected)
            {
                try { _audioPipe.Write(audioData, 0, audioData.Length); }
                catch (IOException) { }
            }
        }

        public void Dispose()
        {
            try
            {
                _audioPipe?.Dispose();
                _videoStdinStream?.Close();
                if (_ffmpegProcess != null && !_ffmpegProcess.HasExited)
                {
                    _ffmpegProcess.WaitForExit(1000);
                    if (!_ffmpegProcess.HasExited) _ffmpegProcess.Kill();
                }
                _ffmpegProcess?.Dispose();
            }
            catch (Exception ex) { Logger.Error($"FFmpeg shutdown error: {ex.Message}"); }
        }
    }
}