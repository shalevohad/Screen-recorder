using System.Collections.Generic;
using ITB_SCREEN_RECORDER.Core.Contracts.Topology;
using ITB_SCREEN_RECORDER.Features.Extractor.Services.Engine;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.Extractor
{
    public class DipToBlackFilterBuilderTests
    {
        private readonly DipToBlackFilterBuilder _builder = new();
        private readonly MinimapOverlaySvgGenerator _svgGenerator = new();

        [Fact]
        public void SingleSegment_ReturnsSimpleCopyFilter()
        {
            var segments = new List<StationDirectorSegmentDto>
            {
                new() { StartEpochMs = 0, EndEpochMs = 5000, TargetDisplayId = "mon-0" }
            };

            var filter = _builder.BuildFilterComplex(segments, 1);

            Assert.Equal("[0:v]copy[outv]", filter);
        }

        [Fact]
        public void MultiSegment_GeneratesSymmetricFadesAndConcatWithOutv()
        {
            var segments = new List<StationDirectorSegmentDto>
            {
                new() { StartEpochMs = 0, EndEpochMs = 4000, TargetDisplayId = "mon-0" },
                new() { StartEpochMs = 4000, EndEpochMs = 10000, TargetDisplayId = "mon-1" }
            };

            var filter = _builder.BuildFilterComplex(segments, 2, transitionDurationSec: 0.3);

            // Segment 0 should fade out at the end
            Assert.Contains("[0:v]fade=type=out:start_time=3.850:duration=0.150[v_seg_0]", filter);

            // Segment 1 should fade in at the beginning
            Assert.Contains("[1:v]fade=type=in:start_time=0:duration=0.150[v_seg_1]", filter);

            // Concat should join them together without time loss
            Assert.Contains("[v_seg_0][v_seg_1]concat=n=2:v=1:a=0[outv]", filter);
        }

        [Fact]
        public void MinimapOverlaySvgGenerator_ProducesValidSvgWithAllDisplays()
        {
            var topology = new StationDisplayTopologyDto
            {
                Hostname = "WS-01",
                Displays = new List<DisplayMetadataDto>
                {
                    new() { DisplayId = "mon-0", X = 0, Y = 0, Width = 1920, Height = 1080 },
                    new() { DisplayId = "mon-1", X = 1920, Y = 0, Width = 1920, Height = 1080 }
                }
            };

            var svg = _svgGenerator.GenerateMinimapSvg(topology, "mon-1");

            Assert.StartsWith("<svg", svg);
            Assert.EndsWith("</svg>", svg);
            Assert.Contains("HUD: MON-1", svg);
            Assert.Contains("#06B6D4", svg); // Active cyan color
            Assert.Contains(">1<", svg);
            Assert.Contains(">2<", svg);
        }
    }
}
