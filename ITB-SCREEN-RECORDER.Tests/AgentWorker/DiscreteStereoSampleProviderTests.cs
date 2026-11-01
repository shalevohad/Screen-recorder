using System;
using NAudio.Wave;
using ITBRecorderAgent.Providers.Audio;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.AgentWorker
{
    public class DiscreteStereoSampleProviderTests
    {
        private class TestMonoSampleProvider : ISampleProvider
        {
            private readonly float[] _data;
            private int _position;

            public WaveFormat WaveFormat { get; }

            public TestMonoSampleProvider(float[] data, int sampleRate = 48000)
            {
                _data = data;
                WaveFormat = WaveFormat.CreateIeeeFloatWaveFormat(sampleRate, 1);
            }

            public int Read(float[] buffer, int offset, int count)
            {
                int available = Math.Min(count, _data.Length - _position);
                if (available <= 0) return 0;
                Array.Copy(_data, _position, buffer, offset, available);
                _position += available;
                return available;
            }
        }

        [Fact]
        public void WaveFormat_Matches48kHzStereo_IeeeFloat()
        {
            var loopback = new TestMonoSampleProvider(new float[100], 48000);
            var mic = new TestMonoSampleProvider(new float[100], 48000);

            var provider = new DiscreteStereoSampleProvider(loopback, mic);

            Assert.Equal(48000, provider.WaveFormat.SampleRate);
            Assert.Equal(2, provider.WaveFormat.Channels);
            Assert.Equal(WaveFormatEncoding.IeeeFloat, provider.WaveFormat.Encoding);
        }

        [Fact]
        public void Read_InterleavesChannelsCorrectly_WithoutSumOrCrosstalk()
        {
            // Channel 0 (Loopback): 1.0, 0.8, 0.6, 0.4
            // Channel 1 (Mic): -1.0, -0.8, -0.6, -0.4
            float[] loopbackData = new float[] { 1.0f, 0.8f, 0.6f, 0.4f };
            float[] micData = new float[] { -1.0f, -0.8f, -0.6f, -0.4f };

            var loopback = new TestMonoSampleProvider(loopbackData);
            var mic = new TestMonoSampleProvider(micData);
            var provider = new DiscreteStereoSampleProvider(loopback, mic);

            float[] outputBuffer = new float[8];
            int samplesRead = provider.Read(outputBuffer, 0, 8);

            Assert.Equal(8, samplesRead);

            // Verify interleaving:
            // Frame 0: Left = 1.0, Right = -1.0
            Assert.Equal(1.0f, outputBuffer[0]);
            Assert.Equal(-1.0f, outputBuffer[1]);

            // Frame 1: Left = 0.8, Right = -0.8
            Assert.Equal(0.8f, outputBuffer[2]);
            Assert.Equal(-0.8f, outputBuffer[3]);

            // Frame 2: Left = 0.6, Right = -0.6
            Assert.Equal(0.6f, outputBuffer[4]);
            Assert.Equal(-0.6f, outputBuffer[5]);

            // Frame 3: Left = 0.4, Right = -0.4
            Assert.Equal(0.4f, outputBuffer[6]);
            Assert.Equal(-0.4f, outputBuffer[7]);
        }

        [Fact]
        public void Read_WhenMicIsSilent_PadsMicChannelWithZeroSilence_PreservingLoopback()
        {
            float[] loopbackData = new float[] { 0.75f, 0.50f, 0.25f, 0.10f };
            float[] micData = Array.Empty<float>(); // Mic has no audio

            var loopback = new TestMonoSampleProvider(loopbackData);
            var mic = new TestMonoSampleProvider(micData);
            var provider = new DiscreteStereoSampleProvider(loopback, mic);

            float[] outputBuffer = new float[8];
            int samplesRead = provider.Read(outputBuffer, 0, 8);

            Assert.Equal(8, samplesRead);

            // Channel 0 should contain loopback samples, Channel 1 should be pure silence (0.0f)
            Assert.Equal(0.75f, outputBuffer[0]);
            Assert.Equal(0.0f, outputBuffer[1]);

            Assert.Equal(0.50f, outputBuffer[2]);
            Assert.Equal(0.0f, outputBuffer[3]);

            Assert.Equal(0.25f, outputBuffer[4]);
            Assert.Equal(0.0f, outputBuffer[5]);

            Assert.Equal(0.10f, outputBuffer[6]);
            Assert.Equal(0.0f, outputBuffer[7]);
        }

        [Fact]
        public void Read_WhenLoopbackIsSilent_PadsLoopbackChannelWithZeroSilence_PreservingMic()
        {
            float[] loopbackData = Array.Empty<float>(); // Loopback has no audio
            float[] micData = new float[] { 0.99f, 0.88f, 0.77f, 0.66f };

            var loopback = new TestMonoSampleProvider(loopbackData);
            var mic = new TestMonoSampleProvider(micData);
            var provider = new DiscreteStereoSampleProvider(loopback, mic);

            float[] outputBuffer = new float[8];
            int samplesRead = provider.Read(outputBuffer, 0, 8);

            Assert.Equal(8, samplesRead);

            // Channel 0 should be pure silence (0.0f), Channel 1 should contain mic samples
            Assert.Equal(0.0f, outputBuffer[0]);
            Assert.Equal(0.99f, outputBuffer[1]);

            Assert.Equal(0.0f, outputBuffer[2]);
            Assert.Equal(0.88f, outputBuffer[3]);

            Assert.Equal(0.0f, outputBuffer[4]);
            Assert.Equal(0.77f, outputBuffer[5]);

            Assert.Equal(0.0f, outputBuffer[6]);
            Assert.Equal(0.66f, outputBuffer[7]);
        }

        [Fact]
        public void Read_WithBufferOffset_WritesAtCorrectPosition()
        {
            float[] loopbackData = new float[] { 0.5f };
            float[] micData = new float[] { -0.5f };

            var loopback = new TestMonoSampleProvider(loopbackData);
            var mic = new TestMonoSampleProvider(micData);
            var provider = new DiscreteStereoSampleProvider(loopback, mic);

            float[] outputBuffer = new float[6]; // Pre-filled with 0.0f
            int samplesRead = provider.Read(outputBuffer, 2, 2); // Request 2 samples starting at offset 2

            Assert.Equal(2, samplesRead);

            Assert.Equal(0.0f, outputBuffer[0]);
            Assert.Equal(0.0f, outputBuffer[1]);
            Assert.Equal(0.5f, outputBuffer[2]);  // Left channel at offset 2
            Assert.Equal(-0.5f, outputBuffer[3]); // Right channel at offset 3
            Assert.Equal(0.0f, outputBuffer[4]);
            Assert.Equal(0.0f, outputBuffer[5]);
        }
    }
}
