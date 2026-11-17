// ==========================================
// File: ITB-SCREEN-RECORDER.Tests/Core/Media/MediaProbeAndDecoderTests.cs
// ==========================================
using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Media.Contracts;
using ITB_SCREEN_RECORDER.Core.Media.Engine;
using ITB_SCREEN_RECORDER.Core.Media.Models;
using Moq;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.Core.Media
{
    public class MediaProbeAndDecoderTests
    {
        [Fact]
        public void MediaProbeResult_Defaults_AreSafeAndConsistent()
        {
            var result = new MediaProbeResult();

            Assert.False(result.Success);
            Assert.False(result.HasVideo);
            Assert.False(result.HasAudio);
            Assert.Equal(0, result.Width);
            Assert.Equal(0, result.Height);
            Assert.Equal(30.0, result.Fps);
            Assert.Equal(48000, result.AudioSampleRate);
            Assert.Equal(2, result.AudioChannels);
            Assert.Equal(TimeSpan.Zero, result.Duration);
            Assert.NotNull(result.Metadata);
            Assert.Null(result.GetStartEpochMs());
            Assert.Null(result.GetStartEpochUtc());
        }

        [Fact]
        public void MediaProbeResult_GetStartEpochUtc_ParsesValidTimestamp()
        {
            var result = new MediaProbeResult();
            long testEpoch = 1731794400000; // 2024-11-16 22:00:00 UTC
            result.Metadata["itb_start_epoch_ms"] = testEpoch.ToString();

            Assert.Equal(testEpoch, result.GetStartEpochMs());
            var dt = result.GetStartEpochUtc();
            Assert.NotNull(dt);
            Assert.Equal(DateTimeOffset.FromUnixTimeMilliseconds(testEpoch), dt.Value);
        }

        [Fact]
        public void FfmpegInProcessProbe_Implements_IMediaProbeService()
        {
            var probe = new FfmpegInProcessProbe();
            Assert.IsAssignableFrom<IMediaProbeService>(probe);
        }

        [Fact]
        public void FfmpegInProcessProbe_HandlesNonExistentFile_Gracefully()
        {
            var probe = new FfmpegInProcessProbe();
            string nonExistentPath = Path.Combine(Path.GetTempPath(), "itb_non_existent_file_test.mp4");

            var result = probe.ProbeFile(nonExistentPath);

            Assert.False(result.Success);
            Assert.Contains("does not exist", result.ErrorMessage, StringComparison.OrdinalIgnoreCase);
        }

        [Fact]
        public async Task FfmpegInProcessProbe_ProbeFileAsync_HandlesCancellation()
        {
            var probe = new FfmpegInProcessProbe();
            using var cts = new CancellationTokenSource();
            cts.Cancel();

            await Assert.ThrowsAnyAsync<OperationCanceledException>(async () =>
            {
                await probe.ProbeFileAsync("some_path.mp4", cts.Token);
            });
        }

        [Fact]
        public void FfmpegInProcessAudioDecoder_Implements_IAudioDecoderService()
        {
            var decoder = new FfmpegInProcessAudioDecoder();
            Assert.IsAssignableFrom<IAudioDecoderService>(decoder);
        }

        [Fact]
        public async Task FfmpegInProcessAudioDecoder_HandlesNonExistentFile_ReturnsEmpty()
        {
            var decoder = new FfmpegInProcessAudioDecoder();
            string nonExistentPath = Path.Combine(Path.GetTempPath(), "itb_non_existent_audio.mp4");

            var peaks = await decoder.ExtractWaveformPeaksAsync(nonExistentPath, 0, 10, 100);
            Assert.NotNull(peaks);
            Assert.Equal(100, peaks.Length);
            Assert.All(peaks, p => Assert.Equal(0.0f, p));

            var samples = await decoder.DecodeAudioSamplesAsync(nonExistentPath, 0, 10);
            Assert.NotNull(samples);
            Assert.Empty(samples);
        }

        [Fact]
        public async Task FfmpegInProcessAudioDecoder_HandlesZeroDuration_ReturnsEmpty()
        {
            var decoder = new FfmpegInProcessAudioDecoder();
            var peaks = await decoder.ExtractWaveformPeaksAsync("any_path.mp4", 0, 0, 50);
            Assert.NotNull(peaks);
            Assert.Equal(50, peaks.Length);

            var samples = await decoder.DecodeAudioSamplesAsync("any_path.mp4", 0, 0);
            Assert.NotNull(samples);
            Assert.Empty(samples);
        }

        [Fact]
        public async Task MediaProbeService_Mockable_Via_Interface()
        {
            var mock = new Mock<IMediaProbeService>();
            mock.Setup(p => p.ProbeFileAsync("test.mp4", It.IsAny<CancellationToken>()))
                .ReturnsAsync(new MediaProbeResult
                {
                    Success = true,
                    Width = 1920,
                    Height = 1080,
                    Fps = 60.0,
                    HasVideo = true,
                    HasAudio = true,
                    AudioSampleRate = 48000
                });

            var result = await mock.Object.ProbeFileAsync("test.mp4");
            Assert.True(result.Success);
            Assert.Equal(1920, result.Width);
            Assert.Equal(1080, result.Height);
            Assert.Equal(60.0, result.Fps);
        }
    }
}
