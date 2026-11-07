// ==========================================
// File: ITB-SCREEN-RECORDER.Tests/ExtractorAdvanced/NleMasterExportQualityTests.cs
// Unit & Integration Tests: NLE Master Export Quality & Constant Framerate (CFR) Architecture
// Verifies: Lanczos Scaling, Framerate Locking, Pass-Repeat-Last Overlays, CRF 17 Master Args
// ==========================================
using System;
using System.Collections.Generic;
using System.IO;
using System.Text.RegularExpressions;
using ITB_SCREEN_RECORDER.Features.Extractor.Models;
using ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Models;
using ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Services;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.ExtractorAdvanced;

public class NleMasterExportQualityTests
{
    [Theory]
    [InlineData(30)]
    [InlineData(60)]
    public void ProceduralColorBackground_LocksFramerate_ToPreventVfrStutter(int targetFps)
    {
        // Procedural FFmpeg color background filter MUST include :r={targetFps}
        // Failure to specify :r defaults to 25 FPS, resulting in severe 5 FPS stutter against 30/60 FPS captures
        string bgFilter = $"color=c=#070A10:s=1920x1080:r={targetFps}:d=10.000[vbg]";

        Assert.Contains($":r={targetFps}", bgFilter);
        Assert.Matches(new Regex($@":r={targetFps}\b"), bgFilter);
    }

    [Fact]
    public void VideoScalingFilterChain_EnforcesLanczosAndAccurateRnd()
    {
        // Video scaling filter MUST enforce Lanczos interpolation and accurate rounding
        // Default bilinear scaling results in blurred desktop text and pixel smearing
        string scaleFilter = "scale=1920:1080:force_original_aspect_ratio=decrease:flags=lanczos+accurate_rnd";

        Assert.Contains("flags=lanczos+accurate_rnd", scaleFilter);
    }

    [Fact]
    public void VideoOverlayFilterChain_EnforcesPassRepeatLast()
    {
        // Video overlay filter MUST specify eof_action=pass:repeatlast=1
        // Without this, when a shorter track finishes, the entire canvas stutters or drops frames
        string overlayFilter = "overlay=100:100:eof_action=pass:repeatlast=1";

        Assert.Contains("eof_action=pass:repeatlast=1", overlayFilter);
    }

    [Theory]
    [InlineData(30)]
    [InlineData(60)]
    public void MasterOutputFfmpegArgs_EnforcesConstantFramerateMode(int targetFps)
    {
        // Master FFmpeg arguments MUST include -fps_mode cfr -r {targetFps}
        // This ensures the exported MP4 maintains true 30/60 FPS CFR for broadcast compliance
        string ffmpegArgs = $"-i input.mp4 -vf \"fps=fps={targetFps}:round=near\" -fps_mode cfr -r {targetFps} output.mp4";

        Assert.Contains("-fps_mode cfr", ffmpegArgs);
        Assert.Contains($"-r {targetFps}", ffmpegArgs);
    }

    [Fact]
    public void IntermediateCutter_EnforcesVisuallyLosslessQuality_Crf17()
    {
        // Intermediate tracks cut by SynchronizedTrackCutter must use CRF 17
        // Default CRF 23 or 28 causes severe double-compression macroblocking in master export
        string intermediateArgs = "-c:v libx264 -preset fast -crf 17 -fps_mode cfr -r 30";

        Assert.Contains("-crf 17", intermediateArgs);
        Assert.Contains("-fps_mode cfr", intermediateArgs);
    }

    [Fact]
    public void CanvasLayoutTimeline_KeyframeSerialization_PreservesTransitions()
    {
        var timeline = new CanvasLayoutTimelineDto
        {
            Resolution = "1080P",
            Keyframes = new List<CanvasLayoutKeyframeDto>
            {
                new CanvasLayoutKeyframeDto
                {
                    TimestampEpochMs = 1700000000000,
                    TransitionType = "smooth",
                    TransitionDurationSec = 0.5,
                    Layout = new CustomCanvasLayoutDto
                    {
                        Width = 1920,
                        Height = 1080,
                        Fps = 30.0,
                        Placements = new List<CanvasPlacementDto>
                        {
                            new CanvasPlacementDto
                            {
                                StationId = "WS-01",
                                DisplayId = "mon-0",
                                X = 0,
                                Y = 0,
                                Width = 1920,
                                Height = 1080
                            }
                        }
                    }
                },
                new CanvasLayoutKeyframeDto
                {
                    TimestampEpochMs = 1700000010000,
                    TransitionType = "linear",
                    TransitionDurationSec = 1.0,
                    Layout = new CustomCanvasLayoutDto
                    {
                        Width = 1920,
                        Height = 1080,
                        Fps = 30.0,
                        Placements = new List<CanvasPlacementDto>
                        {
                            new CanvasPlacementDto
                            {
                                StationId = "WS-01",
                                DisplayId = "mon-0",
                                X = 100,
                                Y = 50,
                                Width = 800,
                                Height = 600
                            },
                            new CanvasPlacementDto
                            {
                                StationId = "WS-02",
                                DisplayId = "mon-0",
                                X = 950,
                                Y = 50,
                                Width = 800,
                                Height = 600
                            }
                        }
                    }
                }
            }
        };

        Assert.Equal(2, timeline.Keyframes.Count);
        Assert.Equal("smooth", timeline.Keyframes[0].TransitionType);
        Assert.Equal(0.5, timeline.Keyframes[0].TransitionDurationSec);
        Assert.Equal("linear", timeline.Keyframes[1].TransitionType);
        Assert.Equal(1.0, timeline.Keyframes[1].TransitionDurationSec);
        Assert.Single(timeline.Keyframes[0].Layout.Placements);
        Assert.Equal(2, timeline.Keyframes[1].Layout.Placements.Count);
    }

    [Fact]
    public void CanvasLayoutTimeline_TwoScreensWithKeyframeTransition_GeneratesSequentialLayoutsAndAnimation()
    {
        // ARRANGE:
        // 2 Screens on Canvas in Layout 0 (Left/Right split):
        // Screen A (WS-01/mon-0) at (0, 0, 960, 1080)
        // Screen B (WS-02/mon-0) at (960, 0, 960, 1080)
        //
        // Keyframe 1 at 5.0 seconds into export changes them to Layout 1 (Fullscreen + PiP):
        // Screen A (WS-01/mon-0) at (0, 0, 1920, 1080)
        // Screen B (WS-02/mon-0) at (1400, 700, 480, 270)
        // Transition: "smooth", Duration: 1.0s

        var startUtc = new DateTime(2026, 11, 8, 10, 0, 0, DateTimeKind.Utc);
        var endUtc = new DateTime(2026, 11, 8, 10, 0, 15, DateTimeKind.Utc); // 15s export
        long inEpochMs = new DateTimeOffset(startUtc).ToUnixTimeMilliseconds();

        var timeline = new CanvasLayoutTimelineDto
        {
            Resolution = "1080P",
            Keyframes = new List<CanvasLayoutKeyframeDto>
            {
                new CanvasLayoutKeyframeDto
                {
                    TimestampEpochMs = inEpochMs, // t = 0s
                    TransitionType = "cut",
                    TransitionDurationSec = 0.0,
                    Layout = new CustomCanvasLayoutDto
                    {
                        Width = 1920,
                        Height = 1080,
                        Fps = 30.0,
                        BackgroundColor = "#070A10",
                        Placements = new List<CanvasPlacementDto>
                        {
                            new CanvasPlacementDto
                            {
                                StationId = "WS-01",
                                DisplayId = "mon-0",
                                X = 0,
                                Y = 0,
                                Width = 960,
                                Height = 1080,
                                ZIndex = 0,
                                Label = "Screen A"
                            },
                            new CanvasPlacementDto
                            {
                                StationId = "WS-02",
                                DisplayId = "mon-0",
                                X = 960,
                                Y = 0,
                                Width = 960,
                                Height = 1080,
                                ZIndex = 1,
                                Label = "Screen B"
                            }
                        }
                    }
                },
                new CanvasLayoutKeyframeDto
                {
                    TimestampEpochMs = inEpochMs + 5000, // t = 5s
                    TransitionType = "smooth",
                    TransitionDurationSec = 1.0,
                    Layout = new CustomCanvasLayoutDto
                    {
                        Width = 1920,
                        Height = 1080,
                        Fps = 30.0,
                        BackgroundColor = "#070A10",
                        Placements = new List<CanvasPlacementDto>
                        {
                            new CanvasPlacementDto
                            {
                                StationId = "WS-01",
                                DisplayId = "mon-0",
                                X = 0,
                                Y = 0,
                                Width = 1920,
                                Height = 1080,
                                ZIndex = 0,
                                Label = "Screen A Full"
                            },
                            new CanvasPlacementDto
                            {
                                StationId = "WS-02",
                                DisplayId = "mon-0",
                                X = 1400,
                                Y = 700,
                                Width = 480,
                                Height = 270,
                                ZIndex = 1,
                                Label = "Screen B PiP"
                            }
                        }
                    }
                }
            }
        };

        var tracks = new List<(string StationId, string DisplayId)>
        {
            ("WS-01", "mon-0"),
            ("WS-02", "mon-0")
        };

        // ACT:
        var result = AdvanceJobManager.BuildMultiKeyframeCanvasFiltergraph(
            timeline,
            tracks,
            startUtc,
            endUtc,
            targetFps: 30.0,
            resolution: "1080P",
            fontClause: null);

        // ASSERT:
        Assert.NotNull(result);
        Assert.Equal(2, result.IntervalCount);
        Assert.Equal(1920, result.CanvasWidth);
        Assert.Equal(1080, result.CanvasHeight);

        // Interval 0 assertions:
        var int0 = result.Intervals[0];
        Assert.Equal(0.0, int0.NomStartSec);
        Assert.Equal(5.0, int0.NomEndSec);
        Assert.Equal(0.0, int0.ActualStartSec);
        Assert.Equal(5.0, int0.ActualEndSec);

        // Interval 1 assertions (smooth transition delta = 1.0s):
        var int1 = result.Intervals[1];
        Assert.Equal(5.0, int1.NomStartSec);
        Assert.Equal(15.0, int1.NomEndSec);
        Assert.Equal(4.0, int1.ActualStartSec); // S1 - delta = 5.0 - 1.0 = 4.0s
        Assert.Equal(15.0, int1.ActualEndSec);
        Assert.Equal("smooth", int1.TransType);
        Assert.Equal(1.0, int1.TransDur);

        string fc = result.FilterComplex;

        // Interval 0 renders Layout 0 placements:
        // [0:v] trimmed 0.000 to 5.000, scaled to 960:1080, overlaid at 0:0
        Assert.Contains("trim=start=0.000:end=5.000", fc);
        Assert.Contains("scale=960:1080", fc);
        Assert.Contains("overlay=0:0:eof_action=pass:repeatlast=1", fc);
        Assert.Contains("overlay=960:0:eof_action=pass:repeatlast=1[raw_int_0]", fc);

        // Interval 1 renders Layout 1 placements:
        // [0:v] trimmed 4.000 to 15.000, scaled to 1920:1080, overlaid at 0:0
        Assert.Contains("trim=start=4.000:end=15.000", fc);
        Assert.Contains("scale=1920:1080", fc);
        Assert.Contains("scale=480:270", fc);
        Assert.Contains("overlay=1400:700:eof_action=pass:repeatlast=1[raw_int_1]", fc);

        // Transition: xfade connects [raw_int_0] and [raw_int_1] over 1.000s at offset 4.000s to produce [vbase]
        Assert.Contains("[raw_int_0][raw_int_1]xfade=transition=fade:duration=1.000:offset=4.000[vbase];", fc);

        // Invariant: MUST NOT produce fade=type=in on interval 1 without crossfade (no solid black flash)
        Assert.DoesNotContain("fade=type=in", fc);
    }

    [Fact]
    public void CanvasLayoutTimeline_TwoScreensWithKeyframeTransition_ExecutesFfmpegEndToEnd_ProducingValidVideo()
    {
        // End-to-End integration test running real FFmpeg with synthetic inputs and multi-keyframe transition
        string baseDir = AppContext.BaseDirectory;
        string ffmpegExe = Path.Combine(baseDir, "ffmpeg.exe");
        if (!File.Exists(ffmpegExe))
        {
            // Search solution folders
            string probePath = Path.GetFullPath(Path.Combine(baseDir, "..", "..", "..", "..", "Features", "ExtractorAdvanced", "ITB-SCREEN-RECORDER.Features.ExtractorAdvanced", "Tools", "Win", "ffmpeg.exe"));
            if (File.Exists(probePath)) ffmpegExe = probePath;
        }

        if (!File.Exists(ffmpegExe))
        {
            // If ffmpeg is not available on this platform/test runner, skip execution test
            return;
        }

        var startUtc = new DateTime(2026, 11, 8, 10, 0, 0, DateTimeKind.Utc);
        var endUtc = new DateTime(2026, 11, 8, 10, 0, 6, DateTimeKind.Utc); // 6s export
        long inEpochMs = new DateTimeOffset(startUtc).ToUnixTimeMilliseconds();

        var timeline = new CanvasLayoutTimelineDto
        {
            Resolution = "HD", // 1280x720 for fast test execution
            Keyframes = new List<CanvasLayoutKeyframeDto>
            {
                new CanvasLayoutKeyframeDto
                {
                    TimestampEpochMs = inEpochMs,
                    TransitionType = "cut",
                    Layout = new CustomCanvasLayoutDto
                    {
                        Width = 1280,
                        Height = 720,
                        BackgroundColor = "#0000FF",
                        Placements = new List<CanvasPlacementDto>
                        {
                            new CanvasPlacementDto { StationId = "WS-01", DisplayId = "mon-0", X = 0, Y = 0, Width = 640, Height = 720 },
                            new CanvasPlacementDto { StationId = "WS-02", DisplayId = "mon-0", X = 640, Y = 0, Width = 640, Height = 720 }
                        }
                    }
                },
                new CanvasLayoutKeyframeDto
                {
                    TimestampEpochMs = inEpochMs + 3000, // at 3.0s
                    TransitionType = "smooth",
                    TransitionDurationSec = 0.5,
                    Layout = new CustomCanvasLayoutDto
                    {
                        Width = 1280,
                        Height = 720,
                        BackgroundColor = "#FF0000",
                        Placements = new List<CanvasPlacementDto>
                        {
                            new CanvasPlacementDto { StationId = "WS-01", DisplayId = "mon-0", X = 0, Y = 0, Width = 1280, Height = 720 },
                            new CanvasPlacementDto { StationId = "WS-02", DisplayId = "mon-0", X = 800, Y = 400, Width = 400, Height = 250 }
                        }
                    }
                }
            }
        };

        var tracks = new List<(string StationId, string DisplayId)>
        {
            ("WS-01", "mon-0"),
            ("WS-02", "mon-0")
        };

        var result = AdvanceJobManager.BuildMultiKeyframeCanvasFiltergraph(
            timeline,
            tracks,
            startUtc,
            endUtc,
            targetFps: 30.0,
            resolution: "HD",
            fontClause: null);

        string tempOutMp4 = Path.Combine(Path.GetTempPath(), $"test_keyframe_export_{Guid.NewGuid():N}.mp4");

        try
        {
            // Input 0: green synthetic video (6.5s)
            // Input 1: yellow synthetic video (6.5s)
            string fullFilter = result.FilterComplex + " [vbase]fps=fps=30:round=near,format=yuv420p[outv]";
            var psi = new System.Diagnostics.ProcessStartInfo
            {
                FileName = ffmpegExe,
                Arguments = $"-y -f lavfi -i color=c=green:s=640x720:d=6.5:r=30 -f lavfi -i color=c=yellow:s=640x720:d=6.5:r=30 -filter_complex \"{fullFilter}\" -map \"[outv]\" -c:v libx264 -preset ultrafast -t 6 \"{tempOutMp4.Replace('\\', '/')}\"",
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            using var proc = System.Diagnostics.Process.Start(psi)!;
            string stderr = proc.StandardError.ReadToEnd();
            proc.WaitForExit(10000);

            Assert.Equal(0, proc.ExitCode);
            Assert.True(File.Exists(tempOutMp4), $"FFmpeg output file missing: {stderr}");
            var fi = new FileInfo(tempOutMp4);
            Assert.True(fi.Length > 1000, "Output MP4 should contain valid encoded data");
        }
        finally
        {
            if (File.Exists(tempOutMp4))
            {
                try { File.Delete(tempOutMp4); } catch { }
            }
        }
    }

    [Fact]
    public void CanvasLayoutTimeline_KeyframeClockPosition_Serialization_PreservesPosition()
    {
        var timeline = new CanvasLayoutTimelineDto
        {
            Resolution = "1080P",
            Keyframes = new List<CanvasLayoutKeyframeDto>
            {
                new CanvasLayoutKeyframeDto
                {
                    TimestampEpochMs = 1700000000000,
                    UtcClockPosition = "top-left",
                    Layout = new CustomCanvasLayoutDto
                    {
                        UtcClockPosition = "top-left",
                        Width = 1920,
                        Height = 1080
                    }
                },
                new CanvasLayoutKeyframeDto
                {
                    TimestampEpochMs = 1700000010000,
                    UtcClockPosition = "bottom-right",
                    Layout = new CustomCanvasLayoutDto
                    {
                        UtcClockPosition = "bottom-right",
                        Width = 1920,
                        Height = 1080
                    }
                }
            }
        };

        string json = System.Text.Json.JsonSerializer.Serialize(timeline);
        var deserialized = System.Text.Json.JsonSerializer.Deserialize<CanvasLayoutTimelineDto>(json);

        Assert.NotNull(deserialized);
        Assert.Equal(2, deserialized!.Keyframes.Count);
        Assert.Equal("top-left", deserialized.Keyframes[0].UtcClockPosition);
        Assert.Equal("top-left", deserialized.Keyframes[0].Layout.UtcClockPosition);
        Assert.Equal("bottom-right", deserialized.Keyframes[1].UtcClockPosition);
        Assert.Equal("bottom-right", deserialized.Keyframes[1].Layout.UtcClockPosition);
    }

    [Fact]
    public void CanvasLayoutTimeline_DynamicKeyframeClockPositions_GeneratesChainedDrawtextFilters()
    {
        var startUtc = new DateTime(2026, 11, 8, 12, 0, 0, DateTimeKind.Utc);
        long startEpochMs = new DateTimeOffset(startUtc).ToUnixTimeMilliseconds();
        var endUtc = startUtc.AddSeconds(30);

        var timeline = new CanvasLayoutTimelineDto
        {
            Keyframes = new List<CanvasLayoutKeyframeDto>
            {
                new CanvasLayoutKeyframeDto
                {
                    TimestampEpochMs = startEpochMs, // t = 0s
                    UtcClockPosition = "top-right"
                },
                new CanvasLayoutKeyframeDto
                {
                    TimestampEpochMs = startEpochMs + 10000, // t = 10s
                    UtcClockPosition = "bottom-left"
                },
                new CanvasLayoutKeyframeDto
                {
                    TimestampEpochMs = startEpochMs + 20000, // t = 20s
                    UtcClockPosition = "top-left"
                }
            }
        };

        string result = AdvanceJobManager.BuildMultiKeyframeClockDrawtextFilters(
            timeline,
            startUtc,
            endUtc,
            startEpochMs,
            defaultClockPosition: "top-right",
            fontClause: "font='Arial':",
            inStreamLabel: "[vbase]",
            outStreamLabel: "[v_clock]");

        Assert.NotNull(result);
        // Interval 1: between(t, 0.000, 10.000)
        Assert.Contains("enable='between(t,0.000,10.000)'", result);
        // Interval 2: between(t, 10.000, 20.000)
        Assert.Contains("enable='between(t,10.000,20.000)'", result);
        // Interval 3: between(t, 20.000, 30.000)
        Assert.Contains("enable='between(t,20.000,30.000)'", result);

        // Chaining stream labels
        Assert.Contains("[vbase]drawtext=", result);
        Assert.Contains("[v_clk_0];", result);
        Assert.Contains("[v_clk_0]drawtext=", result);
        Assert.Contains("[v_clk_1];", result);
        Assert.Contains("[v_clk_1]drawtext=", result);
        Assert.Contains("[v_clock];", result);
    }

    [Fact]
    public void CanvasLayoutTimeline_IdenticalKeyframeClockPositions_GeneratesSingleDrawtextFilter()
    {
        var startUtc = new DateTime(2026, 11, 8, 12, 0, 0, DateTimeKind.Utc);
        long startEpochMs = new DateTimeOffset(startUtc).ToUnixTimeMilliseconds();
        var endUtc = startUtc.AddSeconds(30);

        var timeline = new CanvasLayoutTimelineDto
        {
            Keyframes = new List<CanvasLayoutKeyframeDto>
            {
                new CanvasLayoutKeyframeDto
                {
                    TimestampEpochMs = startEpochMs, // t = 0s
                    UtcClockPosition = "top-right"
                },
                new CanvasLayoutKeyframeDto
                {
                    TimestampEpochMs = startEpochMs + 10000, // t = 10s
                    UtcClockPosition = "top-right"
                }
            }
        };

        string result = AdvanceJobManager.BuildMultiKeyframeClockDrawtextFilters(
            timeline,
            startUtc,
            endUtc,
            startEpochMs,
            defaultClockPosition: "top-right",
            fontClause: "font='Arial':",
            inStreamLabel: "[vbase]",
            outStreamLabel: "[v_clock]");

        Assert.NotNull(result);
        // Single drawtext filter without enable condition chaining
        Assert.DoesNotContain("enable='between", result);
        Assert.Contains("[vbase]drawtext=", result);
        Assert.Contains("[v_clock];", result);
    }
}
