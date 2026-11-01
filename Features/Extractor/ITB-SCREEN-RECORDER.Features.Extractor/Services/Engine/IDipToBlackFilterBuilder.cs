using System.Collections.Generic;
using ITB_SCREEN_RECORDER.Core.Contracts.Topology;

namespace ITB_SCREEN_RECORDER.Features.Extractor.Services.Engine
{
    public interface IDipToBlackFilterBuilder
    {
        /// <summary>
        /// Generates a frame-accurate, Zero-Time-Drift FFmpeg filter_complex script that applies 
        /// fade-to-black on segment exits and fade-in on segment entrances, concatenating them cleanly.
        /// </summary>
        string BuildFilterComplex(
            IReadOnlyList<StationDirectorSegmentDto> segments, 
            int videoStreamCount, 
            double transitionDurationSec = 0.3);
    }
}
