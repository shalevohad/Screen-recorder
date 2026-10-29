using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using ITB_SCREEN_RECORDER.Core.Contracts.Topology;

namespace ITB_SCREEN_RECORDER.Features.Extractor.Services.Engine
{
    /// <summary>
    /// Implements Rule 13: Zero-Time-Drift Millisecond Dip-to-Black Video Transition Builder.
    /// Preserves exact mathematical timeline duration by applying symmetrical fade-out and fade-in
    /// around transition points and concatenating the resulting filtered streams.
    /// </summary>
    public class DipToBlackFilterBuilder : IDipToBlackFilterBuilder
    {
        public string BuildFilterComplex(
            IReadOnlyList<StationDirectorSegmentDto> segments, 
            int videoStreamCount, 
            double transitionDurationSec = 0.3)
        {
            if (segments == null || segments.Count == 0 || videoStreamCount <= 0)
            {
                return string.Empty;
            }

            if (segments.Count == 1)
            {
                // Single segment requires no dip-to-black transitions
                return "[0:v]copy[outv]";
            }

            double halfTransition = Math.Max(0.05, transitionDurationSec / 2.0);
            var sb = new StringBuilder();
            var concatInputs = new List<string>();

            for (int i = 0; i < segments.Count; i++)
            {
                var seg = segments[i];
                double durationSec = Math.Max(0.1, (seg.EndEpochMs - seg.StartEpochMs) / 1000.0);
                string inputLabel = $"[{i}:v]";
                string outputLabel = $"[v_seg_{i}]";

                bool hasFadeIn = i > 0;
                bool hasFadeOut = i < segments.Count - 1;

                var filterOps = new List<string>();

                if (hasFadeIn)
                {
                    double inDur = Math.Min(halfTransition, durationSec / 2.0);
                    filterOps.Add($"fade=type=in:start_time=0:duration={inDur.ToString("F3", CultureInfo.InvariantCulture)}");
                }

                if (hasFadeOut)
                {
                    double outDur = Math.Min(halfTransition, durationSec / 2.0);
                    double startTime = Math.Max(0, durationSec - outDur);
                    filterOps.Add($"fade=type=out:start_time={startTime.ToString("F3", CultureInfo.InvariantCulture)}:duration={outDur.ToString("F3", CultureInfo.InvariantCulture)}");
                }

                if (filterOps.Count > 0)
                {
                    sb.Append($"{inputLabel}{string.Join(",", filterOps)}{outputLabel};");
                    concatInputs.Add(outputLabel);
                }
                else
                {
                    concatInputs.Add(inputLabel);
                }
            }

            // Concatenate all filtered segments into master stream
            sb.Append($"{string.Join("", concatInputs)}concat=n={segments.Count}:v=1:a=0[outv]");

            return sb.ToString();
        }
    }
}
