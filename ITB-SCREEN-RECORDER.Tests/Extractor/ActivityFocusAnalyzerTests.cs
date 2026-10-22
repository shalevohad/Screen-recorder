using System.Collections.Generic;
using ITB_SCREEN_RECORDER.Core.Contracts.Topology;
using ITB_SCREEN_RECORDER.Features.Extractor.Services.Engine;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.Extractor
{
    public class ActivityFocusAnalyzerTests
    {
        private readonly ActivityFocusAnalyzer _analyzer = new();

        [Fact]
        public void SingleDisplay_ReturnsSingleContiguousSegment()
        {
            var topology = new StationDisplayTopologyDto
            {
                Hostname = "WS-01",
                Displays = new List<DisplayMetadataDto>
                {
                    new() { DisplayId = "mon-0", IsPrimary = true, X = 0, Y = 0, Width = 1920, Height = 1080 }
                }
            };

            var plan = _analyzer.AnalyzeFocus(
                "WS-01", 
                10000, 
                20000, 
                topology, 
                new List<ActivityEventDto>());

            Assert.Single(plan.Segments);
            Assert.Equal(10000, plan.Segments[0].StartEpochMs);
            Assert.Equal(20000, plan.Segments[0].EndEpochMs);
            Assert.Equal("mon-0", plan.Segments[0].TargetDisplayId);
            Assert.Equal(DirectorTriggerReason.Default, plan.Segments[0].TriggerReason);
        }

        [Fact]
        public void MultiDisplay_ClickTriggersPreRollCutExactlyOneSecondPrior()
        {
            // Setup dual 1080p monitors side-by-side
            var topology = new StationDisplayTopologyDto
            {
                Hostname = "WS-01",
                Displays = new List<DisplayMetadataDto>
                {
                    new() { DisplayId = "mon-0", IsPrimary = true, X = 0, Y = 0, Width = 1920, Height = 1080 },
                    new() { DisplayId = "mon-1", IsPrimary = false, X = 1920, Y = 0, Width = 1920, Height = 1080 }
                }
            };

            // Operator clicks on Mon 1 (X=2500) at T=5000ms
            var events = new List<ActivityEventDto>
            {
                new()
                {
                    TimestampEpochMs = 5000,
                    X = 2500,
                    Y = 500,
                    Type = ActivityEventType.MouseClick,
                    Button = "Left"
                }
            };

            var plan = _analyzer.AnalyzeFocus(
                "WS-01", 
                0, 
                10000, 
                topology, 
                events, 
                preRollLeadInMs: 1000, 
                minDwellMs: 2000);

            Assert.Equal(2, plan.Segments.Count);

            // First segment on mon-0 should end at 4000ms (1000ms prior to the click at 5000ms)
            Assert.Equal(0, plan.Segments[0].StartEpochMs);
            Assert.Equal(4000, plan.Segments[0].EndEpochMs);
            Assert.Equal("mon-0", plan.Segments[0].TargetDisplayId);

            // Second segment on mon-1 should start at 4000ms and run to end
            Assert.Equal(4000, plan.Segments[1].StartEpochMs);
            Assert.Equal(10000, plan.Segments[1].EndEpochMs);
            Assert.Equal("mon-1", plan.Segments[1].TargetDisplayId);
            Assert.Equal(DirectorTriggerReason.MouseClick, plan.Segments[1].TriggerReason);
        }

        [Fact]
        public void MultiDisplay_MouseMoveRequiresDwellTimeHysteresis()
        {
            var topology = new StationDisplayTopologyDto
            {
                Hostname = "WS-01",
                Displays = new List<DisplayMetadataDto>
                {
                    new() { DisplayId = "mon-0", IsPrimary = true, X = 0, Y = 0, Width = 1920, Height = 1080 },
                    new() { DisplayId = "mon-1", IsPrimary = false, X = 1920, Y = 0, Width = 1920, Height = 1080 }
                }
            };

            // Brief cursor sweep across Mon 1 for only 500ms (below minDwellMs of 2000ms)
            var events = new List<ActivityEventDto>
            {
                new() { TimestampEpochMs = 3000, X = 2000, Y = 200, Type = ActivityEventType.MouseMove },
                new() { TimestampEpochMs = 3500, X = 1000, Y = 200, Type = ActivityEventType.MouseMove } // Returned to mon-0
            };

            var plan = _analyzer.AnalyzeFocus("WS-01", 0, 10000, topology, events, minDwellMs: 2000);

            // Should NOT switch to mon-1 because dwell time was not met
            Assert.Single(plan.Segments);
            Assert.Equal("mon-0", plan.Segments[0].TargetDisplayId);
        }

        [Fact]
        public void MultiDisplay_MouseMoveMeetingDwellTimeSwitchesWithPreRoll()
        {
            var topology = new StationDisplayTopologyDto
            {
                Hostname = "WS-01",
                Displays = new List<DisplayMetadataDto>
                {
                    new() { DisplayId = "mon-0", IsPrimary = true, X = 0, Y = 0, Width = 1920, Height = 1080 },
                    new() { DisplayId = "mon-1", IsPrimary = false, X = 1920, Y = 0, Width = 1920, Height = 1080 }
                }
            };

            // Sustained mouse movement on Mon 1 from T=3000 to T=5500 (2500ms >= 2000ms dwell)
            var events = new List<ActivityEventDto>
            {
                new() { TimestampEpochMs = 3000, X = 2000, Y = 200, Type = ActivityEventType.MouseMove },
                new() { TimestampEpochMs = 5500, X = 2100, Y = 300, Type = ActivityEventType.MouseMove }
            };

            var plan = _analyzer.AnalyzeFocus("WS-01", 0, 10000, topology, events, preRollLeadInMs: 1000, minDwellMs: 2000);

            Assert.Equal(2, plan.Segments.Count);
            Assert.Equal("mon-0", plan.Segments[0].TargetDisplayId);
            Assert.Equal("mon-1", plan.Segments[1].TargetDisplayId);
            Assert.Equal(DirectorTriggerReason.CursorActivity, plan.Segments[1].TriggerReason);
        }
    }
}
