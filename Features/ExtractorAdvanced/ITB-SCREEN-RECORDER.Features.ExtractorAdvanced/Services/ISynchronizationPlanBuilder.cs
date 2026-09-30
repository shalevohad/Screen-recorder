// ==========================================
// File: Features/ExtractorAdvanced/Services/ISynchronizationPlanBuilder.cs
// ==========================================
using System;
using System.Collections.Generic;
using ITB_SCREEN_RECORDER.Features.Extractor.Models;
using ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Models;

namespace ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Services
{
    public interface ISynchronizationPlanBuilder
    {
        SynchronizationPlan BuildSynchronizationPlan(
            List<string> stationIds,
            DateTime startUtc,
            DateTime endUtc,
            Dictionary<string, List<RecordingChunkMetadata>> stationChunks);
    }
}