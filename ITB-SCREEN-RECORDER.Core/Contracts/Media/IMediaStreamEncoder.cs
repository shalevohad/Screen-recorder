// ==========================================
// File: ITB-SCREEN-RECORDER.Core/Media/Contracts/IMediaStreamEncoder.cs
// ==========================================
using System;
using System.Threading;
using System.Threading.Tasks;

namespace ITB_SCREEN_RECORDER.Core.Media.Contracts
{
    /// <summary>
    /// Represents an abstract media encoder and RTMP/FLV/MP4 stream transport.
    /// Decouples capture pipelines from specific encoder implementations (e.g. out-of-process ffmpeg.exe vs. in-process NuGet bindings).
    /// </summary>
    public interface IMediaStreamEncoder : IDisposable
    {
        /// <summary>
        /// Gets whether the encoder engine is actively running and ready to accept media data.
        /// </summary>
        bool IsRunning { get; }

        /// <summary>
        /// Gets whether this encoder instance is configured to receive and stream audio.
        /// </summary>
        bool HasAudio { get; }

        /// <summary>
        /// Initializes and starts the encoder engine targeting the specified destination.
        /// </summary>
        Task<bool> StartAsync(
            string destinationUrl,
            DateTime calibratedStartTime,
            int videoWidth,
            int videoHeight,
            int audioSampleRate,
            int audioChannels,
            string audioFormat,
            int targetFps,
            string videoBitrate,
            CancellationToken cancellationToken);

        /// <summary>
        /// Completes any required audio connection handshake before audio data transmission begins.
        /// </summary>
        Task<bool> CompleteAudioHandshakeAsync(CancellationToken cancellationToken);

        /// <summary>
        /// Writes a single uncompressed video frame (BGRA) into the video encoder stream.
        /// </summary>
        /// <param name="frameData">Raw pixel bytes.</param>
        /// <returns>True if frame was written successfully, false if pipe/stream broke.</returns>
        bool WriteVideoFrame(byte[] frameData);

        /// <summary>
        /// Writes uncompressed raw audio PCM samples into the audio encoder stream.
        /// </summary>
        void WriteAudioData(byte[] audioData);

        /// <summary>
        /// Writes uncompressed raw audio PCM samples into the audio encoder stream with buffer offset and count.
        /// </summary>
        void WriteAudioData(byte[] audioData, int offset, int count);
    }
}
