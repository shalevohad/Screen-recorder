using System;
using System.Collections.Generic;
using System.Linq;
using ITB_SCREEN_RECORDER.Core.Contracts.Topology;

namespace ITB_SCREEN_RECORDER.Features.Extractor.Services.Engine
{
    /// <summary>
    /// Implements Rule 13 "Auto-Director" focus heuristic engine:
    /// Analyzes recorded mouse and keystroke telemetry to construct contiguous timeline segments
    /// with an enforced 1.0-second pre-roll lead-in buffer and hysteresis dampening.
    /// </summary>
    public class ActivityFocusAnalyzer : IActivityFocusAnalyzer
    {
        public StationDirectorPlanDto AnalyzeFocus(
            string stationId,
            long timelineStartEpochMs,
            long timelineEndEpochMs,
            StationDisplayTopologyDto? topology,
            IReadOnlyList<ActivityEventDto> events,
            long preRollLeadInMs = 1000,
            long minDwellMs = 2000)
        {
            var plan = new StationDirectorPlanDto
            {
                StationId = stationId,
                TimelineStartEpochMs = timelineStartEpochMs,
                TimelineEndEpochMs = timelineEndEpochMs,
                Topology = topology
            };

            if (timelineEndEpochMs <= timelineStartEpochMs)
            {
                return plan;
            }

            var displays = topology?.Displays ?? new List<DisplayMetadataDto>();
            string primaryDisplayId = displays.FirstOrDefault(d => d.IsPrimary)?.DisplayId 
                                      ?? displays.FirstOrDefault()?.DisplayId 
                                      ?? "mon-0";

            // If station has 0 or 1 display, entire duration is single primary display segment
            if (displays.Count <= 1)
            {
                plan.Segments.Add(new StationDirectorSegmentDto
                {
                    StartEpochMs = timelineStartEpochMs,
                    EndEpochMs = timelineEndEpochMs,
                    TargetDisplayId = primaryDisplayId,
                    IsManualOverride = false,
                    TriggerReason = DirectorTriggerReason.Default,
                    TransitionDurationSec = 0.3
                });
                return plan;
            }

            // Filter and sort events within the active timeline window
            var validEvents = (events ?? Array.Empty<ActivityEventDto>())
                .Where(e => e.TimestampEpochMs >= timelineStartEpochMs && e.TimestampEpochMs <= timelineEndEpochMs)
                .OrderBy(e => e.TimestampEpochMs)
                .ToList();

            string currentDisplayId = primaryDisplayId;
            long currentSegmentStart = timelineStartEpochMs;
            DirectorTriggerReason currentReason = DirectorTriggerReason.Default;

            // Track potential hover candidate for hysteresis dampening on mouse move
            string? pendingHoverDisplayId = null;
            long pendingHoverFirstSeenMs = 0;

            foreach (var evt in validEvents)
            {
                string targetDisplay = ResolveDisplayForCoordinates(evt.X, evt.Y, displays, primaryDisplayId);

                if (string.Equals(targetDisplay, currentDisplayId, StringComparison.OrdinalIgnoreCase))
                {
                    // Reset pending hover if returned to current display
                    pendingHoverDisplayId = null;
                    continue;
                }

                bool shouldSwitch = false;
                DirectorTriggerReason switchReason = DirectorTriggerReason.Default;

                if (evt.Type == ActivityEventType.MouseClick)
                {
                    shouldSwitch = true;
                    switchReason = DirectorTriggerReason.MouseClick;
                    pendingHoverDisplayId = null;
                }
                else if (evt.Type == ActivityEventType.Keystroke)
                {
                    shouldSwitch = true;
                    switchReason = DirectorTriggerReason.Keystroke;
                    pendingHoverDisplayId = null;
                }
                else if (evt.Type == ActivityEventType.MouseMove)
                {
                    // Hysteresis: requires staying on the other display for minDwellMs before triggering move switch
                    if (!string.Equals(targetDisplay, pendingHoverDisplayId, StringComparison.OrdinalIgnoreCase))
                    {
                        pendingHoverDisplayId = targetDisplay;
                        pendingHoverFirstSeenMs = evt.TimestampEpochMs;
                    }
                    else if (evt.TimestampEpochMs - pendingHoverFirstSeenMs >= minDwellMs)
                    {
                        shouldSwitch = true;
                        switchReason = DirectorTriggerReason.CursorActivity;
                        pendingHoverDisplayId = null;
                    }
                }

                if (shouldSwitch)
                {
                    // Rule 13: 1-Second Pre-Roll Lead-In Invariant:
                    // Transition initiates 1.0 second prior to the interaction timestamp T (T - 1000ms),
                    // but never earlier than the current segment start + minimum dwell time.
                    long idealCutTime = evt.TimestampEpochMs - preRollLeadInMs;
                    long earliestCutTime = currentSegmentStart + (minDwellMs / 2);
                    long cutTime = Math.Max(earliestCutTime, idealCutTime);

                    // Clamp cutTime to ensure positive progress and within timeline
                    cutTime = Math.Clamp(cutTime, timelineStartEpochMs, evt.TimestampEpochMs);

                    if (cutTime > currentSegmentStart)
                    {
                        plan.Segments.Add(new StationDirectorSegmentDto
                        {
                            StartEpochMs = currentSegmentStart,
                            EndEpochMs = cutTime,
                            TargetDisplayId = currentDisplayId,
                            IsManualOverride = false,
                            TriggerReason = currentReason,
                            TransitionDurationSec = 0.3
                        });

                        currentDisplayId = targetDisplay;
                        currentSegmentStart = cutTime;
                        currentReason = switchReason;
                    }
                }
            }

            // Close trailing segment
            if (currentSegmentStart < timelineEndEpochMs)
            {
                plan.Segments.Add(new StationDirectorSegmentDto
                {
                    StartEpochMs = currentSegmentStart,
                    EndEpochMs = timelineEndEpochMs,
                    TargetDisplayId = currentDisplayId,
                    IsManualOverride = false,
                    TriggerReason = currentReason,
                    TransitionDurationSec = 0.3
                });
            }

            return plan;
        }

        private static string ResolveDisplayForCoordinates(
            int x, 
            int y, 
            IReadOnlyList<DisplayMetadataDto> displays, 
            string fallbackDisplayId)
        {
            foreach (var d in displays)
            {
                if (x >= d.X && x < (d.X + d.Width) &&
                    y >= d.Y && y < (d.Y + d.Height))
                {
                    return d.DisplayId;
                }
            }
            return fallbackDisplayId;
        }
    }
}
