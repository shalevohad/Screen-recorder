using System;
using System.Linq;
using ITB_SCREEN_RECORDER.Player.Core.Audio;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.Player;

public class PlayerAudioMixerTests
{
    [Fact]
    public void MultiStationMixing_MixesSignalsLinearly()
    {
        var mixer = new PlayerAudioMixer();
        mixer.RegisterStation("WS-01", "Station 1");
        mixer.RegisterStation("WS-02", "Station 2");

        var outL = new float[4];
        var outR = new float[4];

        var s1Ch0 = new float[] { 0.1f, 0.1f, 0.1f, 0.1f };
        var s1Ch1 = new float[] { 0.2f, 0.2f, 0.2f, 0.2f };

        var s2Ch0 = new float[] { 0.3f, 0.3f, 0.3f, 0.3f };
        var s2Ch1 = new float[] { 0.0f, 0.0f, 0.0f, 0.0f };

        mixer.ProcessAudioFrame("WS-01", s1Ch0, s1Ch1, outL, outR);
        mixer.ProcessAudioFrame("WS-02", s2Ch0, s2Ch1, outL, outR);

        // Pan is 0 (Center), Volume is 1.0.
        // Expected per sample:
        // Left:  (0.1 + 0.2) + (0.3 + 0.0) = 0.6
        // Right: (0.1 + 0.2) + (0.3 + 0.0) = 0.6
        for (int i = 0; i < 4; i++)
        {
            Assert.Equal(0.6f, outL[i], precision: 4);
            Assert.Equal(0.6f, outR[i], precision: 4);
        }
    }

    [Fact]
    public void SoloLogic_MutesNonSoloStations()
    {
        var mixer = new PlayerAudioMixer();
        mixer.RegisterStation("WS-01", "Station 1");
        mixer.RegisterStation("WS-02", "Station 2");

        mixer.SetSolo("WS-01", true);

        var outL = new float[2];
        var outR = new float[2];

        var s1Ch0 = new float[] { 0.5f, 0.5f };
        var s1Ch1 = new float[] { 0.0f, 0.0f };

        var s2Ch0 = new float[] { 0.5f, 0.5f };
        var s2Ch1 = new float[] { 0.0f, 0.0f };

        mixer.ProcessAudioFrame("WS-01", s1Ch0, s1Ch1, outL, outR);
        mixer.ProcessAudioFrame("WS-02", s2Ch0, s2Ch1, outL, outR);

        // WS-01 is soloed, so WS-02 is ignored. Total output is only 0.5
        Assert.Equal(0.5f, outL[0], precision: 4);
        Assert.Equal(0.5f, outR[0], precision: 4);
    }

    [Fact]
    public void DiscreteChannelMode_IsolatesCh0AndCh1()
    {
        var mixer = new PlayerAudioMixer();
        mixer.RegisterStation("WS-MIC", "Mic Test");
        mixer.SetChannelMode("WS-MIC", AudioChannelMode.MicrophoneOnly);

        var outL = new float[2];
        var outR = new float[2];

        var ch0Loopback = new float[] { 0.9f, 0.9f }; // Loopback noise
        var ch1Mic = new float[] { 0.4f, 0.4f };      // Operator voice

        mixer.ProcessAudioFrame("WS-MIC", ch0Loopback, ch1Mic, outL, outR);

        // Only mic should pass
        Assert.Equal(0.4f, outL[0], precision: 4);
        Assert.Equal(0.4f, outR[0], precision: 4);

        // Now test StereoSplit
        mixer.SetChannelMode("WS-MIC", AudioChannelMode.StereoSplit);
        Array.Clear(outL);
        Array.Clear(outR);

        mixer.ProcessAudioFrame("WS-MIC", ch0Loopback, ch1Mic, outL, outR);

        // Left gets Ch0 (0.9), Right gets Ch1 (0.4)
        Assert.Equal(0.9f, outL[0], precision: 4);
        Assert.Equal(0.4f, outR[0], precision: 4);
    }

    [Fact]
    public void VoiceActivityCrossDucker_AttenuatesListeningStationLoopback()
    {
        var mixer = new PlayerAudioMixer();
        mixer.RegisterStation("WS-A", "Station A");
        mixer.RegisterStation("WS-B", "Station B");

        var now = DateTime.UtcNow;

        // Station A speaks into mic (peak = 0.5 > threshold 0.0316)
        var aCh0 = new float[] { 0.0f, 0.0f };
        var aCh1 = new float[] { 0.5f, 0.5f };

        // Station B is silent in mic (peak = 0.0), but has audio on loopback (delayed intercom = 1.0)
        var bCh0 = new float[] { 1.0f, 1.0f };
        var bCh1 = new float[] { 0.0f, 0.0f };

        var outL = new float[2];
        var outR = new float[2];

        // 1. First frame measures energy
        mixer.ProcessAudioFrame("WS-A", aCh0, aCh1, outL, outR);
        mixer.ProcessAudioFrame("WS-B", bCh0, bCh1, outL, outR);

        // Evaluate ducking
        mixer.UpdateSpeechEnergyAndDucking(now);

        var settingsA = mixer.GetSettings("WS-A");
        var settingsB = mixer.GetSettings("WS-B");

        Assert.NotNull(settingsA);
        Assert.NotNull(settingsB);

        Assert.True(settingsA.IsMicActive);
        Assert.False(settingsA.IsDucked); // Speaker is not ducked
        Assert.Equal(1.0f, settingsA.DuckingGain);

        Assert.False(settingsB.IsMicActive);
        Assert.True(settingsB.IsDucked); // Listener station is ducked!
        Assert.True(settingsB.DuckingGain < 0.2f); // ~0.1585 (-16dB)

        // 2. Next frame: verify Station B's loopback audio is ducked in output
        Array.Clear(outL);
        Array.Clear(outR);
        mixer.ProcessAudioFrame("WS-B", bCh0, bCh1, outL, outR);

        Assert.True(outL[0] < 0.2f); // attenuated from 1.0 down to ~0.1585
    }
}
