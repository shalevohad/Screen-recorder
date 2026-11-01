using System.Collections.Generic;
using ITB_SCREEN_RECORDER.Core.Contracts.Topology;

namespace ITB_SCREEN_RECORDER.Features.Extractor.Services.Engine
{
    public interface IActivityFocusAnalyzer
    {
        StationDirectorPlanDto AnalyzeFocus(
            string stationId,
            long timelineStartEpochMs,
            long timelineEndEpochMs,
            StationDisplayTopologyDto? topology,
            IReadOnlyList<ActivityEventDto> events,
            long preRollLeadInMs = 1000,
            long minDwellMs = 2000);
    }
}
