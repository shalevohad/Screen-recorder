using System.IO;
using System.Text;
using System.Text.Json;
using System.Xml.Serialization;
using ITB_SCREEN_RECORDER.Core.Contracts.Keystroke;
using ITB_SCREEN_RECORDER.Core.Contracts.Network;
using ITB_SCREEN_RECORDER.Core.Contracts.Topology;
using ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Models;
using Moq;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.ExtractorAdvanced;

public class ExternalApiAndCustomCanvasTests
{
    [Fact]
    public void CustomCanvasLayoutDto_CanSerializeAndDeserialize_Json()
    {
        var layout = new CustomCanvasLayoutDto
        {
            Width = 1920,
            Height = 1080,
            BackgroundColor = "#070A10",
            Placements = new List<CanvasPlacementDto>
            {
                new CanvasPlacementDto
                {
                    StationId = "WS-COMMANDER",
                    DisplayId = "mon-0",
                    X = 0,
                    Y = 0,
                    Width = 1920,
                    Height = 1080,
                    ZIndex = 0,
                    Label = "Main Hero View",
                    BorderWidth = 0
                },
                new CanvasPlacementDto
                {
                    StationId = "WS-RADAR",
                    DisplayId = "mon-1",
                    X = 1400,
                    Y = 700,
                    Width = 480,
                    Height = 320,
                    ZIndex = 1,
                    Label = "PiP Radar Stream",
                    BorderWidth = 2,
                    BorderColor = "#06B6D4",
                    StartOffsetMs = 5000,
                    EndOffsetMs = 25000
                }
            }
        };

        var jsonOptions = new JsonSerializerOptions { WriteIndented = true, PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
        string json = JsonSerializer.Serialize(layout, jsonOptions);

        Assert.Contains("\"width\": 1920", json);
        Assert.Contains("\"zIndex\": 1", json);
        Assert.Contains("\"#06B6D4\"", json);

        var deserialized = JsonSerializer.Deserialize<CustomCanvasLayoutDto>(json, jsonOptions);
        Assert.NotNull(deserialized);
        Assert.Equal(1920, deserialized.Width);
        Assert.Equal(1080, deserialized.Height);
        Assert.Equal("#070A10", deserialized.BackgroundColor);
        Assert.Equal(2, deserialized.Placements.Count);

        var pip = deserialized.Placements[1];
        Assert.Equal("WS-RADAR", pip.StationId);
        Assert.Equal(1, pip.ZIndex);
        Assert.Equal(480, pip.Width);
        Assert.Equal(320, pip.Height);
        Assert.Equal(5000, pip.StartOffsetMs);
        Assert.Equal(25000, pip.EndOffsetMs);
    }

    [Fact]
    public void CustomCanvasLayoutDto_CanSerializeAndDeserialize_Xml()
    {
        var layout = new CustomCanvasLayoutDto
        {
            Width = 2560,
            Height = 1440,
            BackgroundColor = "#000000",
            Placements = new List<CanvasPlacementDto>
            {
                new CanvasPlacementDto
                {
                    StationId = "WS-TOC-1",
                    DisplayId = "mon-0",
                    X = 0.0,
                    Y = 0.0,
                    Width = 0.5,
                    Height = 1.0,
                    ZIndex = 0,
                    Label = "Left Station"
                },
                new CanvasPlacementDto
                {
                    StationId = "WS-TOC-2",
                    DisplayId = "mon-0",
                    X = 0.5,
                    Y = 0.0,
                    Width = 0.5,
                    Height = 1.0,
                    ZIndex = 0,
                    Label = "Right Station"
                }
            }
        };

        var serializer = new XmlSerializer(typeof(CustomCanvasLayoutDto));
        string xml;
        using (var sw = new StringWriter())
        {
            serializer.Serialize(sw, layout);
            xml = sw.ToString();
        }

        Assert.Contains("<Width>2560</Width>", xml);
        Assert.Contains("<StationId>WS-TOC-1</StationId>", xml);
        Assert.Contains("<StationId>WS-TOC-2</StationId>", xml);

        CustomCanvasLayoutDto? deserialized;
        using (var sr = new StringReader(xml))
        {
            deserialized = (CustomCanvasLayoutDto?)serializer.Deserialize(sr);
        }

        Assert.NotNull(deserialized);
        Assert.Equal(2560, deserialized.Width);
        Assert.Equal(1440, deserialized.Height);
        Assert.Equal(2, deserialized.Placements.Count);
        Assert.Equal(0.5, deserialized.Placements[0].Width);
    }

    [Fact]
    public void AdvanceCutRequestDto_WithCanvasLayoutAndAudioRouting_RoundtripsXml()
    {
        var request = new AdvanceCutRequestDto
        {
            StationIds = new List<string> { "CommanderRole", "RadarOperatorRole" },
            LayoutMode = "custom",
            KeystrokeMode = KeystrokeExportMode.BurnIn,
            AudioSourceStation = "CommanderRole",
            CanvasLayout = new CustomCanvasLayoutDto
            {
                Width = 1920,
                Height = 1080,
                Placements = new List<CanvasPlacementDto>
                {
                    new CanvasPlacementDto
                    {
                        StationId = "CommanderRole",
                        DisplayId = "mon-0",
                        X = 0,
                        Y = 0,
                        Width = 1920,
                        Height = 1080,
                        ZIndex = 0
                    },
                    new CanvasPlacementDto
                    {
                        StationId = "RadarOperatorRole",
                        DisplayId = "mon-1",
                        X = 1380,
                        Y = 720,
                        Width = 500,
                        Height = 320,
                        ZIndex = 1,
                        BorderWidth = 2,
                        BorderColor = "#F59E0B"
                    }
                }
            }
        };

        var serializer = new XmlSerializer(typeof(AdvanceCutRequestDto));
        string xml;
        using (var sw = new StringWriter())
        {
            serializer.Serialize(sw, request);
            xml = sw.ToString();
        }

        Assert.Contains("<LayoutMode>custom</LayoutMode>", xml);
        Assert.Contains("<AudioSourceStation>CommanderRole</AudioSourceStation>", xml);
        Assert.Contains("<BorderColor>#F59E0B</BorderColor>", xml);

        AdvanceCutRequestDto? deserialized;
        using (var sr = new StringReader(xml))
        {
            deserialized = (AdvanceCutRequestDto?)serializer.Deserialize(sr);
        }

        Assert.NotNull(deserialized);
        Assert.Equal("custom", deserialized.LayoutMode);
        Assert.Equal("CommanderRole", deserialized.AudioSourceStation);
        Assert.Equal(KeystrokeExportMode.BurnIn, deserialized.KeystrokeMode);
        Assert.NotNull(deserialized.CanvasLayout);
        Assert.Equal(2, deserialized.CanvasLayout.Placements.Count);
        Assert.Equal(1, deserialized.CanvasLayout.Placements[1].ZIndex);
    }

    [Fact]
    public void ForensicInspectionResultDto_SerializesAndRoundtrips_JsonAndXml()
    {
        var result = new ForensicInspectionResultDto
        {
            TimeRange = new ForensicTimeRangeDto
            {
                StartEpochMs = 1700000000000,
                EndEpochMs = 1700003600000,
                StartUtc = new DateTime(2026, 11, 2, 10, 0, 0, DateTimeKind.Utc),
                EndUtc = new DateTime(2026, 11, 2, 11, 0, 0, DateTimeKind.Utc),
                DurationSeconds = 3600
            },
            TotalStationsFound = 2,
            ActiveRecordingStationsCount = 2,
            StationsWithAudioCount = 1,
            StationsWithKeystrokesCount = 2,
            RoleToStationMap = new Dictionary<string, string>
            {
                { "Commander", "WS-ALPHA" },
                { "Tactical Officer", "WS-BRAVO" }
            },
            StationToRoleMap = new Dictionary<string, string>
            {
                { "WS-ALPHA", "Commander" },
                { "WS-BRAVO", "Tactical Officer" }
            },
            Stations = new List<StationInspectionDto>
            {
                new StationInspectionDto
                {
                    StationId = "WS-ALPHA",
                    RoleAlias = "Commander",
                    HasAudio = true,
                    HasKeystrokes = true,
                    KeystrokeCount = 1420,
                    Displays = new List<StationDisplayInspectionDto>
                    {
                        new StationDisplayInspectionDto { DisplayId = "mon-0", DisplayName = "Display 1", Width = 1920, Height = 1080, IsPrimary = true },
                        new StationDisplayInspectionDto { DisplayId = "mon-1", DisplayName = "Display 2", Width = 1920, Height = 1080, IsPrimary = false }
                    },
                    RecordingSegments = new List<TimelineSegmentInspectionDto>
                    {
                        new TimelineSegmentInspectionDto { DisplayId = "mon-0", StartEpochMs = 1700000000000, EndEpochMs = 1700003600000, DurationSeconds = 3600 }
                    }
                },
                new StationInspectionDto
                {
                    StationId = "WS-BRAVO",
                    RoleAlias = "Tactical Officer",
                    HasAudio = false,
                    HasKeystrokes = true,
                    KeystrokeCount = 850,
                    Displays = new List<StationDisplayInspectionDto>
                    {
                        new StationDisplayInspectionDto { DisplayId = "mon-0", DisplayName = "Display 1", Width = 1920, Height = 1080, IsPrimary = true }
                    }
                }
            }
        };

        // 1. JSON Roundtrip
        string json = JsonSerializer.Serialize(result, new JsonSerializerOptions { WriteIndented = true });
        var deserializedJson = JsonSerializer.Deserialize<ForensicInspectionResultDto>(json);
        Assert.NotNull(deserializedJson);
        Assert.Equal(2, deserializedJson.TotalStationsFound);
        Assert.Equal("WS-ALPHA", deserializedJson.RoleToStationMap["Commander"]);
        Assert.Equal("Tactical Officer", deserializedJson.StationToRoleMap["WS-BRAVO"]);
        Assert.Equal(1420, deserializedJson.Stations[0].KeystrokeCount);
        Assert.True(deserializedJson.Stations[0].HasAudio);
        Assert.False(deserializedJson.Stations[1].HasAudio);

        // 2. XML Roundtrip
        var serializer = new XmlSerializer(typeof(ForensicInspectionResultDto));
        string xml;
        using (var sw = new StringWriter())
        {
            serializer.Serialize(sw, result);
            xml = sw.ToString();
        }

        Assert.Contains("<TotalStationsFound>2</TotalStationsFound>", xml);
        Assert.Contains("<StationId>WS-ALPHA</StationId>", xml);
        Assert.Contains("<RoleAlias>Commander</RoleAlias>", xml);

        ForensicInspectionResultDto? deserializedXml;
        using (var sr = new StringReader(xml))
        {
            deserializedXml = (ForensicInspectionResultDto?)serializer.Deserialize(sr);
        }

        Assert.NotNull(deserializedXml);
        Assert.Equal(2, deserializedXml.TotalStationsFound);
        Assert.Equal("WS-ALPHA", deserializedXml.Stations[0].StationId);
        Assert.Equal(2, deserializedXml.Stations[0].Displays.Count);
        Assert.Equal("WS-ALPHA", deserializedXml.RoleToStationMap["Commander"]);
        Assert.Equal("Commander", deserializedXml.StationToRoleMap["WS-ALPHA"]);
    }

    [Fact]
    public void Placements_ZIndexSorting_MaintainsCorrectStackingOrder()
    {
        var placements = new List<CanvasPlacementDto>
        {
            new CanvasPlacementDto { StationId = "WS-PIP-2", DisplayId = "mon-0", ZIndex = 2 },
            new CanvasPlacementDto { StationId = "WS-HERO", DisplayId = "mon-0", ZIndex = 0 },
            new CanvasPlacementDto { StationId = "WS-PIP-1", DisplayId = "mon-0", ZIndex = 1 },
        };

        var ordered = placements.OrderBy(p => p.ZIndex).ToList();

        Assert.Equal("WS-HERO", ordered[0].StationId);
        Assert.Equal(0, ordered[0].ZIndex);

        Assert.Equal("WS-PIP-1", ordered[1].StationId);
        Assert.Equal(1, ordered[1].ZIndex);

        Assert.Equal("WS-PIP-2", ordered[2].StationId);
        Assert.Equal(2, ordered[2].ZIndex);
    }

    [Fact]
    public async Task RoleAliasResolution_ResolvesRolesToHostnamesCorrectly()
    {
        var mockRoleProvider = new Mock<IStationRoleProvider>();
        var roleDict = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
        {
            { "WS-01", "Commander" },
            { "WS-02", "Radar Specialist" }
        };

        mockRoleProvider
            .Setup(p => p.GetAllStationRoleAliasesAsync())
            .ReturnsAsync(roleDict);

        var roles = await mockRoleProvider.Object.GetAllStationRoleAliasesAsync();
        var aliasToHost = roles.ToDictionary(kvp => kvp.Value, kvp => kvp.Key, StringComparer.OrdinalIgnoreCase);

        string Resolve(string input)
        {
            if (aliasToHost.TryGetValue(input, out var resolvedHost)) return resolvedHost;
            return input;
        }

        // Test resolution of role names
        Assert.Equal("WS-01", Resolve("Commander"));
        Assert.Equal("WS-01", Resolve("commander")); // case-insensitive
        Assert.Equal("WS-02", Resolve("Radar Specialist"));

        // Direct hostname should remain intact
        Assert.Equal("WS-01", Resolve("WS-01"));
        Assert.Equal("WS-03", Resolve("WS-03")); // Unknown remains unchanged
    }

    [Fact]
    public async Task RoleAliasResolution_ResolvesHistoricStationBasedOnEpochWindow()
    {
        var mockRoleProvider = new Mock<IStationRoleProvider>();

        long shift1Start = 1700000000000;
        long shift1End = 1700003600000;

        long shift2Start = 1700003600000;
        long shift2End = 1700007200000;

        // Shift 1: WS-ALPHA was Commander
        var shift1Roles = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
        {
            { "WS-ALPHA", "Commander" },
            { "WS-BRAVO", "Radar" }
        };

        // Shift 2: WS-BRAVO became Commander, WS-ALPHA became Observer
        var shift2Roles = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
        {
            { "WS-BRAVO", "Commander" },
            { "WS-ALPHA", "Observer" }
        };

        mockRoleProvider
            .Setup(p => p.GetStationRoleAliasesForTimeRangeAsync(shift1Start, shift1End))
            .ReturnsAsync(shift1Roles);

        mockRoleProvider
            .Setup(p => p.GetStationRoleAliasesForTimeRangeAsync(shift2Start, shift2End))
            .ReturnsAsync(shift2Roles);

        // When cutting Shift 1: "Commander" MUST resolve to WS-ALPHA
        var rolesShift1 = await mockRoleProvider.Object.GetStationRoleAliasesForTimeRangeAsync(shift1Start, shift1End);
        var map1 = rolesShift1.ToDictionary(kvp => kvp.Value, kvp => kvp.Key, StringComparer.OrdinalIgnoreCase);
        Assert.Equal("WS-ALPHA", map1["Commander"]);
        Assert.Equal("WS-BRAVO", map1["Radar"]);

        // When cutting Shift 2: "Commander" MUST resolve to WS-BRAVO (not WS-ALPHA!)
        var rolesShift2 = await mockRoleProvider.Object.GetStationRoleAliasesForTimeRangeAsync(shift2Start, shift2End);
        var map2 = rolesShift2.ToDictionary(kvp => kvp.Value, kvp => kvp.Key, StringComparer.OrdinalIgnoreCase);
        Assert.Equal("WS-BRAVO", map2["Commander"]);
        Assert.Equal("WS-ALPHA", map2["Observer"]);
    }

    [Fact]
    public void ActivityFocusAnalyzer_NumbersDisplaysStartingFromOne()
    {
        var analyzer = new ITB_SCREEN_RECORDER.Features.Extractor.Services.Engine.ActivityFocusAnalyzer();
        var topology = new StationDisplayTopologyDto
        {
            Hostname = "WS-COMMAND",
            Displays = new List<DisplayMetadataDto>
            {
                new DisplayMetadataDto { DisplayId = "mon-0", DisplayNumber = 1, DisplayName = "Screen 1", IsPrimary = true, X = 0, Y = 0, Width = 1920, Height = 1080 },
                new DisplayMetadataDto { DisplayId = "mon-1", DisplayNumber = 2, DisplayName = "Screen 2", IsPrimary = false, X = 1920, Y = 0, Width = 1920, Height = 1080 }
            }
        };

        var events = new List<ActivityEventDto>
        {
            new ActivityEventDto { TimestampEpochMs = 1700000005000, Type = ActivityEventType.MouseClick, DisplayId = "mon-1" }
        };

        var plan = analyzer.AnalyzeFocus("WS-COMMAND", 1700000000000, 1700000010000, topology, events);

        Assert.NotEmpty(plan.Segments);
        // First segment (mon-0) must be numbered starting at 1
        var seg0 = plan.Segments[0];
        Assert.Equal("mon-0", seg0.TargetDisplayId);
        Assert.Equal(1, seg0.TargetDisplayNumber);
        Assert.Equal("Screen 1", seg0.TargetDisplayName);

        // Second segment (mon-1) must be numbered starting at 2
        var seg1 = plan.Segments[1];
        Assert.Equal("mon-1", seg1.TargetDisplayId);
        Assert.Equal(2, seg1.TargetDisplayNumber);
        Assert.Equal("Screen 2", seg1.TargetDisplayName);
    }

    [Theory]
    [InlineData("1", "mon-0")]
    [InlineData("2", "mon-1")]
    [InlineData("Screen 1", "mon-0")]
    [InlineData("Screen 2", "mon-1")]
    [InlineData("Display 1", "mon-0")]
    [InlineData("Display 2", "mon-1")]
    [InlineData("mon-0", "mon-0")]
    [InlineData("mon-1", "mon-1")]
    public void AdvanceJobManager_ResolveTargetDisplayKey_SupportsOneBasedAndCanonicalKeys(string inputKey, string expectedResolved)
    {
        var availableDisplays = new[] { "mon-0", "mon-1" };
        string resolved = ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Services.AdvanceJobManager.ResolveTargetDisplayKey(inputKey, availableDisplays);
        Assert.Equal(expectedResolved, resolved);
    }

    [Theory]
    [InlineData("1", "mon-0", 0, true)]
    [InlineData("Screen 1", "mon-0", 0, true)]
    [InlineData("2", "mon-1", 1, true)]
    [InlineData("Screen 2", "mon-1", 1, true)]
    [InlineData("mon-0", "mon-0", 0, true)]
    [InlineData("mon-1", "mon-1", 1, true)]
    [InlineData("mon-0", "mon-1", 1, false)]
    [InlineData("Screen 1", "mon-1", 1, false)]
    public void AdvanceJobManager_MatchesDisplay_CorrectlyMatchesTracks(string target, string trackDisplayId, int displayIndex, bool expectedMatch)
    {
        bool matched = ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Services.AdvanceJobManager.MatchesDisplay(target, trackDisplayId, displayIndex);
        Assert.Equal(expectedMatch, matched);
    }

    [Fact]
    public void CanvasLayoutTimelineDto_JsonSerialization_PreservesKeyframesAndTransitions()
    {
        var timeline = new CanvasLayoutTimelineDto
        {
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
                        Placements = new List<CanvasPlacementDto>
                        {
                            new CanvasPlacementDto { StationId = "WS-01", DisplayId = "mon-0", X = 0, Y = 0, Width = 960, Height = 1080, ZIndex = 0 },
                            new CanvasPlacementDto { StationId = "WS-02", DisplayId = "mon-0", X = 960, Y = 0, Width = 960, Height = 1080, ZIndex = 1 }
                        }
                    }
                },
                new CanvasLayoutKeyframeDto
                {
                    TimestampEpochMs = 1700000015000,
                    TransitionType = "dip",
                    TransitionDurationSec = 0.3,
                    Layout = new CustomCanvasLayoutDto
                    {
                        Width = 1920,
                        Height = 1080,
                        Placements = new List<CanvasPlacementDto>
                        {
                            new CanvasPlacementDto { StationId = "WS-01", DisplayId = "mon-0", X = 0, Y = 0, Width = 1920, Height = 1080, ZIndex = 0 },
                            new CanvasPlacementDto { StationId = "WS-02", DisplayId = "mon-0", X = 1380, Y = 40, Width = 500, Height = 281, ZIndex = 10, BorderWidth = 2, BorderColor = "#06B6D4" }
                        }
                    }
                }
            }
        };

        string json = JsonSerializer.Serialize(timeline);
        var deserialized = JsonSerializer.Deserialize<CanvasLayoutTimelineDto>(json);

        Assert.NotNull(deserialized);
        Assert.Equal(2, deserialized.Keyframes.Count);

        Assert.Equal(1700000000000, deserialized.Keyframes[0].TimestampEpochMs);
        Assert.Equal("smooth", deserialized.Keyframes[0].TransitionType);
        Assert.Equal(0.5, deserialized.Keyframes[0].TransitionDurationSec);
        Assert.Equal(2, deserialized.Keyframes[0].Layout.Placements.Count);

        Assert.Equal(1700000015000, deserialized.Keyframes[1].TimestampEpochMs);
        Assert.Equal("dip", deserialized.Keyframes[1].TransitionType);
        Assert.Equal(0.3, deserialized.Keyframes[1].TransitionDurationSec);
        Assert.Equal(2, deserialized.Keyframes[1].Layout.Placements.Count);
        Assert.Equal(10, deserialized.Keyframes[1].Layout.Placements[1].ZIndex);
        Assert.Equal("#06B6D4", deserialized.Keyframes[1].Layout.Placements[1].BorderColor);
    }

    [Fact]
    public void CanvasLayoutTimelineDto_XmlSerialization_PreservesKeyframesAndTransitions()
    {
        var timeline = new CanvasLayoutTimelineDto
        {
            Keyframes = new List<CanvasLayoutKeyframeDto>
            {
                new CanvasLayoutKeyframeDto
                {
                    TimestampEpochMs = 1700000000000,
                    TransitionType = "cut",
                    TransitionDurationSec = 0.0,
                    Layout = new CustomCanvasLayoutDto
                    {
                        Width = 1920,
                        Height = 1080,
                        BackgroundColor = "#070A10",
                        Placements = new List<CanvasPlacementDto>
                        {
                            new CanvasPlacementDto { StationId = "WS-ALPHA", DisplayId = "mon-0", X = 0, Y = 0, Width = 1920, Height = 1080, ZIndex = 0, Label = "Commander Screen 1" }
                        }
                    }
                }
            }
        };

        var serializer = new XmlSerializer(typeof(CanvasLayoutTimelineDto));
        using var stringWriter = new StringWriter();
        serializer.Serialize(stringWriter, timeline);
        string xml = stringWriter.ToString();

        Assert.Contains("CanvasLayoutTimeline", xml);
        Assert.Contains("timestampEpochMs=\"1700000000000\"", xml);
        Assert.Contains("transitionType=\"cut\"", xml);
        Assert.Contains("<StationId>WS-ALPHA</StationId>", xml);
        Assert.Contains("<Label>Commander Screen 1</Label>", xml);

        using var stringReader = new StringReader(xml);
        var deserialized = (CanvasLayoutTimelineDto)serializer.Deserialize(stringReader)!;

        Assert.NotNull(deserialized);
        Assert.Single(deserialized.Keyframes);
        Assert.Equal(1700000000000, deserialized.Keyframes[0].TimestampEpochMs);
        Assert.Equal("cut", deserialized.Keyframes[0].TransitionType);
        Assert.Single(deserialized.Keyframes[0].Layout.Placements);
        Assert.Equal("WS-ALPHA", deserialized.Keyframes[0].Layout.Placements[0].StationId);
        Assert.Equal("Commander Screen 1", deserialized.Keyframes[0].Layout.Placements[0].Label);
    }

    [Fact]
    public void CanvasLayoutTimeline_IntervalCalculation_CorrectlyPartitionsExportDuration()
    {
        long inEpochMs = 1700000000000;
        long outEpochMs = 1700000030000; // 30 seconds cut
        double exportedDurationSec = (outEpochMs - inEpochMs) / 1000.0; // 30.0s

        var keyframes = new List<CanvasLayoutKeyframeDto>
        {
            new CanvasLayoutKeyframeDto { TimestampEpochMs = inEpochMs, TransitionType = "cut" },
            new CanvasLayoutKeyframeDto { TimestampEpochMs = inEpochMs + 10000, TransitionType = "smooth", TransitionDurationSec = 0.5 },
            new CanvasLayoutKeyframeDto { TimestampEpochMs = inEpochMs + 25000, TransitionType = "dip", TransitionDurationSec = 0.3 }
        };

        var sortedKeyframes = keyframes.OrderBy(k => k.TimestampEpochMs).ToList();
        var intervals = new List<(double StartSec, double EndSec, string TransType, double TransDur)>();

        for (int k = 0; k < sortedKeyframes.Count; k++)
        {
            var currentKf = sortedKeyframes[k];
            double kfStartSec = (k == 0) ? 0.0 : Math.Max(0, (currentKf.TimestampEpochMs - inEpochMs) / 1000.0);
            double kfEndSec = (k < sortedKeyframes.Count - 1)
                ? Math.Max(0, (sortedKeyframes[k + 1].TimestampEpochMs - inEpochMs) / 1000.0)
                : exportedDurationSec;

            intervals.Add((kfStartSec, kfEndSec, currentKf.TransitionType, currentKf.TransitionDurationSec));
        }

        Assert.Equal(3, intervals.Count);

        // Interval 0: [0, 10s]
        Assert.Equal(0.0, intervals[0].StartSec);
        Assert.Equal(10.0, intervals[0].EndSec);
        Assert.Equal(10.0, intervals[0].EndSec - intervals[0].StartSec);

        // Interval 1: [10s, 25s]
        Assert.Equal(10.0, intervals[1].StartSec);
        Assert.Equal(25.0, intervals[1].EndSec);
        Assert.Equal(15.0, intervals[1].EndSec - intervals[1].StartSec);
        Assert.Equal("smooth", intervals[1].TransType);

        // Interval 2: [25s, 30s]
        Assert.Equal(25.0, intervals[2].StartSec);
        Assert.Equal(30.0, intervals[2].EndSec);
        Assert.Equal(5.0, intervals[2].EndSec - intervals[2].StartSec);
        Assert.Equal("dip", intervals[2].TransType);

        // Total partitioned duration must equal exportedDurationSec
        double totalSum = intervals.Sum(i => i.EndSec - i.StartSec);
        Assert.Equal(exportedDurationSec, totalSum);
    }
}
