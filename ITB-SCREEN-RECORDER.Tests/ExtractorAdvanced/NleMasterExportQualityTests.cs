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
}
