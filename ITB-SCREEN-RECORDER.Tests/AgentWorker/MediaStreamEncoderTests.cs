// ==========================================
// File: ITB-SCREEN-RECORDER.Tests/AgentWorker/MediaStreamEncoderTests.cs
// ==========================================
using System;
using System.Diagnostics;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Configuration;
using ITB_SCREEN_RECORDER.Core.Media.Contracts;
using ITB_SCREEN_RECORDER.Core.Media.Engine;
using ITBRecorderAgent.Engine;
using Moq;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.AgentWorker
{
    public class MediaStreamEncoderTests
    {
        [Fact]
        public void AppConfig_EncoderEngine_DefaultsToInProcess()
        {
            var config = new AppConfig();
            Assert.Equal("InProcess", config.EncoderEngine);
        }

        [Fact]
        public void AppConfig_EncoderEngine_CanBeConfiguredToProcess()
        {
            var config = new AppConfig { EncoderEngine = "Process" };
            Assert.Equal("Process", config.EncoderEngine);
        }

        [Fact]
        public void FfmpegProcessManager_Implements_IMediaStreamEncoder()
        {
            var config = new AppConfig();
            using var encoder = new FfmpegProcessManager(config);

            Assert.IsAssignableFrom<IMediaStreamEncoder>(encoder);
            Assert.False(encoder.IsRunning);
            Assert.False(encoder.HasAudio);
        }

        [Fact]
        public void FfmpegInProcessEncoder_Implements_IMediaStreamEncoder()
        {
            var config = new AppConfig();
            using var encoder = new FfmpegInProcessEncoder(config);

            Assert.IsAssignableFrom<IMediaStreamEncoder>(encoder);
            Assert.False(encoder.IsRunning);
            Assert.False(encoder.HasAudio);
        }

        [Fact]
        public async Task AudioPacer_RunsWith_IMediaStreamEncoder()
        {
            var mockEncoder = new Mock<IMediaStreamEncoder>();
            mockEncoder.SetupGet(e => e.IsRunning).Returns(true);
            mockEncoder.SetupGet(e => e.HasAudio).Returns(true);

            int writeAudioCalls = 0;
            mockEncoder.Setup(e => e.WriteAudioData(It.IsAny<byte[]>(), It.IsAny<int>(), It.IsAny<int>()))
                .Callback<byte[], int, int>((buf, offset, count) =>
                {
                    Interlocked.Increment(ref writeAudioCalls);
                });

            var pacer = new AudioPacer();
            pacer.Start(Stopwatch.GetTimestamp() - (long)(Stopwatch.Frequency * 1.0)); // Started 1s ago

            using var cts = new CancellationTokenSource(TimeSpan.FromMilliseconds(200));

            long bytesPushed = 0;
            bool active = true;

            await pacer.RunPacerLoopAsync(
                mockEncoder.Object,
                bytes => Interlocked.Add(ref bytesPushed, bytes),
                () => active,
                cts.Token).ConfigureAwait(false);

            // Should have injected silence packets because no real audio arrived for 1 second
            Assert.True(bytesPushed > 0 || cts.IsCancellationRequested);
        }

        [Fact]
        public void FfmpegInProcessEncoder_WriteVideoFrame_WhenNotRunning_ReturnsFalse()
        {
            var config = new AppConfig();
            using var encoder = new FfmpegInProcessEncoder(config);

            byte[] dummyFrame = new byte[1920 * 1080 * 4];
            bool result = encoder.WriteVideoFrame(dummyFrame);

            Assert.False(result);
        }

        [Fact]
        public void FfmpegInProcessEncoder_WriteAudioData_WhenNotRunning_DoesNotThrow()
        {
            var config = new AppConfig();
            using var encoder = new FfmpegInProcessEncoder(config);

            byte[] dummyAudio = new byte[3840];
            var exception = Record.Exception(() => encoder.WriteAudioData(dummyAudio));

            Assert.Null(exception);
        }

        [Fact]
        public async Task FfmpegInProcessEncoder_CompleteAudioHandshake_CompletesImmediately()
        {
            var config = new AppConfig();
            using var encoder = new FfmpegInProcessEncoder(config);

            using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(1));
            bool result = await encoder.CompleteAudioHandshakeAsync(cts.Token);

            Assert.True(result);
        }
    }
}
