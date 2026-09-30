// ==========================================
// File: Features/ExtractorAdvanced/Services/SynchronizationPlanBuilder.cs
// ==========================================
using System;
using System.Collections.Generic;
using System.Linq;
using ITB_SCREEN_RECORDER.Features.Extractor.Models;
using ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Models;

namespace ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Services
{
    public class SynchronizationPlanBuilder : ISynchronizationPlanBuilder
    {
        public SynchronizationPlan BuildSynchronizationPlan(
            List<string> stationIds,
            DateTime startUtc,
            DateTime endUtc,
            Dictionary<string, List<RecordingChunkMetadata>> stationChunks)
        {
            var plan = new SynchronizationPlan();

            var allActiveRaw = new List<TimeInterval>();
            foreach (var kvp in stationChunks)
            {
                foreach (var chunk in kvp.Value)
                {
                    var segStart = chunk.StartUtc < startUtc ? startUtc : chunk.StartUtc;
                    var segEnd = chunk.EndUtc > endUtc ? endUtc : chunk.EndUtc;
                    if (segEnd > segStart)
                    {
                        allActiveRaw.Add(new TimeInterval { StartUtc = segStart, EndUtc = segEnd });
                    }
                }
            }

            if (allActiveRaw.Count == 0) return plan;

            var sortedRaw = allActiveRaw.OrderBy(r => r.StartUtc).ToList();
            var mergedActive = new List<TimeInterval>();
            var current = new TimeInterval { StartUtc = sortedRaw[0].StartUtc, EndUtc = sortedRaw[0].EndUtc };

            for (int i = 1; i < sortedRaw.Count; i++)
            {
                if (sortedRaw[i].StartUtc <= current.EndUtc.AddSeconds(1.0))
                {
                    if (sortedRaw[i].EndUtc > current.EndUtc) current.EndUtc = sortedRaw[i].EndUtc;
                }
                else
                {
                    mergedActive.Add(current);
                    current = new TimeInterval { StartUtc = sortedRaw[i].StartUtc, EndUtc = sortedRaw[i].EndUtc };
                }
            }
            mergedActive.Add(current);
            plan.ActiveSegments = mergedActive;

            int gapIdx = 1;
            double runningOffset = 0;

            if (mergedActive[0].StartUtc > startUtc)
            {
                double dur = (mergedActive[0].StartUtc - startUtc).TotalSeconds;
                if (dur >= 1.0)
                {
                    plan.RemovedGlobalGaps.Add(new GlobalGapRecord
                    {
                        GapIndex = gapIdx++,
                        StartUtc = startUtc,
                        EndUtc = mergedActive[0].StartUtc,
                        SkippedDurationSeconds = dur,
                        TimelineOffsetSeconds = 0
                    });
                }
            }

            for (int i = 0; i < mergedActive.Count - 1; i++)
            {
                runningOffset += mergedActive[i].DurationSeconds;
                var gStart = mergedActive[i].EndUtc;
                var gEnd = mergedActive[i + 1].StartUtc;
                double dur = (gEnd - gStart).TotalSeconds;

                if (dur >= 1.0)
                {
                    plan.RemovedGlobalGaps.Add(new GlobalGapRecord
                    {
                        GapIndex = gapIdx++,
                        StartUtc = gStart,
                        EndUtc = gEnd,
                        SkippedDurationSeconds = dur,
                        TimelineOffsetSeconds = runningOffset
                    });
                }
            }

            if (mergedActive.Last().EndUtc < endUtc)
            {
                double dur = (endUtc - mergedActive.Last().EndUtc).TotalSeconds;
                if (dur >= 1.0)
                {
                    plan.RemovedGlobalGaps.Add(new GlobalGapRecord
                    {
                        GapIndex = gapIdx++,
                        StartUtc = mergedActive.Last().EndUtc,
                        EndUtc = endUtc,
                        SkippedDurationSeconds = dur,
                        TimelineOffsetSeconds = plan.TotalActiveSeconds
                    });
                }
            }

            if (stationIds.Count > 1)
            {
                foreach (var sId in stationIds)
                {
                    var sChunks = stationChunks.GetValueOrDefault(sId, new List<RecordingChunkMetadata>())
                                               .OrderBy(c => c.StartUtc).ToList();

                    foreach (var activeSeg in mergedActive)
                    {
                        DateTime segCursor = activeSeg.StartUtc;
                        var overlapping = sChunks
                            .Where(c => c.EndUtc > activeSeg.StartUtc && c.StartUtc < activeSeg.EndUtc)
                            .OrderBy(c => c.StartUtc).ToList();

                        foreach (var chunk in overlapping)
                        {
                            if (chunk.StartUtc > segCursor.AddSeconds(1.0))
                            {
                                plan.StationGaps.Add(new StationGapRecord
                                {
                                    StationId = sId,
                                    StartUtc = segCursor,
                                    EndUtc = chunk.StartUtc,
                                    DurationSeconds = (chunk.StartUtc - segCursor).TotalSeconds
                                });
                            }
                            segCursor = chunk.EndUtc > segCursor ? chunk.EndUtc : segCursor;
                        }

                        if (segCursor < activeSeg.EndUtc.AddSeconds(-1.0))
                        {
                            plan.StationGaps.Add(new StationGapRecord
                            {
                                StationId = sId,
                                StartUtc = segCursor,
                                EndUtc = activeSeg.EndUtc,
                                DurationSeconds = (activeSeg.EndUtc - segCursor).TotalSeconds
                            });
                        }
                    }
                }
            }

            return plan;
        }
    }
}