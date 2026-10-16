using System.Diagnostics;
using System.Threading;
using ITBRecorderAgent.Engine;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.AgentWorker;

public class AudioPacerTests
{
    [Fact]
    public void AudioPacer_BeforeStart_IsNotFlowing()
    {
        var pacer = new AudioPacer();
        Assert.False(pacer.IsAudioFlowing());
    }

    [Fact]
    public void AudioPacer_AfterRecordingBytes_IsFlowing()
    {
        var pacer = new AudioPacer();
        long nowTicks = Stopwatch.GetTimestamp();
        pacer.Start(nowTicks);

        pacer.RecordIncomingBytes(19200);

        Assert.True(pacer.IsAudioFlowing());
    }

    [Fact]
    public void AudioPacer_MultipleIncomingPackets_AccumulatesCorrectly()
    {
        var pacer = new AudioPacer();
        pacer.Start(Stopwatch.GetTimestamp());

        pacer.RecordIncomingBytes(4800);
        pacer.RecordIncomingBytes(4800);
        pacer.RecordIncomingBytes(9600);

        Assert.True(pacer.IsAudioFlowing());
    }
}
