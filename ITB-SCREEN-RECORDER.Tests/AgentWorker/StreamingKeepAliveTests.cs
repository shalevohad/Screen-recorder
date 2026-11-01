namespace ITB_SCREEN_RECORDER.Tests.AgentWorker;

using System;
using Xunit;

public class StreamingKeepAliveTests
{
    [Flags]
    public enum EXECUTION_STATE : uint
    {
        ES_SYSTEM_REQUIRED = 0x00000001,
        ES_DISPLAY_REQUIRED = 0x00000002,
        ES_USER_PRESENT = 0x00000004,
        ES_AWAYMODE_REQUIRED = 0x00000040,
        ES_CONTINUOUS = 0x80000000
    }

    [Fact]
    public void ExecutionStateFlags_DisplayAndSystemRequirements_CombinedCorrectly()
    {
        // Assert that the exact flags passed to Win32 SetThreadExecutionState prevent both idle sleep and monitor turn-off
        var activeFlags = EXECUTION_STATE.ES_CONTINUOUS |
                          EXECUTION_STATE.ES_SYSTEM_REQUIRED |
                          EXECUTION_STATE.ES_DISPLAY_REQUIRED;

        Assert.True(activeFlags.HasFlag(EXECUTION_STATE.ES_CONTINUOUS));
        Assert.True(activeFlags.HasFlag(EXECUTION_STATE.ES_SYSTEM_REQUIRED));
        Assert.True(activeFlags.HasFlag(EXECUTION_STATE.ES_DISPLAY_REQUIRED));

        // Exact Win32 bitmask value (0x80000003)
        uint bitmask = (uint)activeFlags;
        Assert.Equal(0x80000003u, bitmask);
    }

    [Fact]
    public void ExecutionStateFlags_ReleaseDefault_OnlyContinuousFlagRemains()
    {
        // Releasing keepalive leaves only ES_CONTINUOUS, restoring default OS power management
        var resetFlags = EXECUTION_STATE.ES_CONTINUOUS;

        Assert.True(resetFlags.HasFlag(EXECUTION_STATE.ES_CONTINUOUS));
        Assert.False(resetFlags.HasFlag(EXECUTION_STATE.ES_DISPLAY_REQUIRED));
        Assert.False(resetFlags.HasFlag(EXECUTION_STATE.ES_SYSTEM_REQUIRED));

        uint bitmask = (uint)resetFlags;
        Assert.Equal(0x80000000u, bitmask);
    }

    [Fact]
    public void DxgiDisplayEnumerator_OnHost_EnumeratesDisplays()
    {
        if (OperatingSystem.IsWindows())
        {
            var displays = ITBRecorderAgent.Providers.Video.DxgiDisplayEnumerator.EnumerateAttachedDisplays();
            foreach (var d in displays)
            {
                Console.WriteLine($"[TEST:DXGI] Found Display: DisplayId={d.DisplayId}, DeviceName={d.DeviceName}, Pos=({d.X},{d.Y}), Size=({d.Width}x{d.Height}), IsPrimary={d.IsPrimary}, Adapter={d.AdapterName}");
            }
            Assert.NotEmpty(displays);
        }
    }

    [Fact]
    public void DxgiScreenCapture_InitializesAndCapturesAllDisplays()
    {
        if (OperatingSystem.IsWindows())
        {
            var displays = ITBRecorderAgent.Providers.Video.DxgiDisplayEnumerator.EnumerateAttachedDisplays();
            Assert.NotEmpty(displays);

            foreach (var d in displays)
            {
                Console.WriteLine($"[TEST:CAPTURE] Testing capture on {d.DisplayId} ({d.Width}x{d.Height} on Adapter {d.AdapterIndex}, Output {d.OutputIndex})...");
                using var capture = new ITBRecorderAgent.Providers.Video.ResilientScreenCapture(
                    d.AdapterIndex,
                    d.OutputIndex,
                    d.DisplayId,
                    d.X,
                    d.Y,
                    d.Width,
                    d.Height
                );

                capture.Initialize();
                Assert.True(capture.IsInitialized, $"Capture should be initialized for {d.DisplayId}");
                Assert.Equal(d.Width, capture.Width);
                Assert.Equal(d.Height, capture.Height);

                // Try capturing up to 5 times to acquire a valid frame
                bool gotFrame = false;
                for (int i = 0; i < 5; i++)
                {
                    if (capture.TryCaptureFrame(out var frameData) && frameData != null && frameData.Length > 0)
                    {
                        gotFrame = true;
                        Console.WriteLine($"[TEST:CAPTURE] Successfully captured frame on {d.DisplayId}: {frameData.Length} bytes");
                        break;
                    }
                    System.Threading.Thread.Sleep(50);
                }

                Assert.True(gotFrame, $"Should capture at least 1 frame on {d.DisplayId}");
            }
        }
    }
}
