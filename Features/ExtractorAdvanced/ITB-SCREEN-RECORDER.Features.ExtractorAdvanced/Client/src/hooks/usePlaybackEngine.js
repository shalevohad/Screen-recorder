// ==========================================
// File: Features/ExtractorAdvanced/Client/src/hooks/usePlaybackEngine.js
// ==========================================
import { useState, useRef, useEffect, useCallback } from 'react';

export function usePlaybackEngine({
    timelineBaseEpochMs,
    inPointMs,
    outPointMs,
    globalGaps = [],
    activeStation,
    spotlightStation,
    recordingSegments = {},
    initialPlayheadMs = 0,
    initialIsPlaying = false,
    initialIsLooping = true,
    initialPlaybackSpeed = 1
}) {
    const [playheadMs, setPlayheadMs] = useState(initialPlayheadMs);
    const [isPlaying, setIsPlaying] = useState(initialIsPlaying);
    const [isLooping, setIsLooping] = useState(initialIsLooping);
    const [playbackSpeed, setPlaybackSpeed] = useState(initialPlaybackSpeed);

    const lastTickRef = useRef(null);
    const requestRef = useRef(null);

    const currentStationToCheck = spotlightStation || activeStation;
    const stationSegmentsToCheck = currentStationToCheck
        ? (recordingSegments[currentStationToCheck.id] || currentStationToCheck.segments || [])
        : [];

    const isCurrentInValidSegment = stationSegmentsToCheck.some(seg => {
        const s = seg.startEpochMs ?? seg.startEpoch ?? 0;
        const e = seg.endEpochMs ?? seg.endEpoch ?? 0;
        const curEp = timelineBaseEpochMs + playheadMs;
        return curEp >= s && curEp <= e;
    });

    const isVideoDirectlyDrivingClock = Boolean(currentStationToCheck && isCurrentInValidSegment);

    useEffect(() => {
        setPlayheadMs((prev) => {
            if (prev < inPointMs) return inPointMs;
            if (prev > outPointMs) {
                setIsPlaying(false);
                return outPointMs;
            }
            return prev;
        });
    }, [inPointMs, outPointMs]);

    const updatePlayhead = useCallback((timestamp) => {
        if (!lastTickRef.current) lastTickRef.current = timestamp;

        const rawDelta = (timestamp - lastTickRef.current) * playbackSpeed;
        const deltaMs = Math.min(rawDelta, 250 * playbackSpeed);
        lastTickRef.current = timestamp;

        setPlayheadMs((prev) => {
            let nextPos = prev + deltaMs;

            if (globalGaps && globalGaps.length > 0) {
                const currentEpoch = timelineBaseEpochMs + nextPos;
                const activeGap = globalGaps.find(g => currentEpoch >= g.startEpochMs && currentEpoch < g.endEpochMs);
                if (activeGap) {
                    nextPos = activeGap.endEpochMs - timelineBaseEpochMs;
                }
            }

            if (nextPos >= outPointMs) {
                if (isLooping) {
                    nextPos = inPointMs;
                } else {
                    setIsPlaying(false);
                    nextPos = outPointMs;
                }
            }
            return nextPos;
        });

        if (isPlaying && !isVideoDirectlyDrivingClock) {
            requestRef.current = requestAnimationFrame(updatePlayhead);
        }
    }, [isPlaying, isLooping, inPointMs, outPointMs, globalGaps, timelineBaseEpochMs, isVideoDirectlyDrivingClock, playbackSpeed]);

    useEffect(() => {
        if (isPlaying && !isVideoDirectlyDrivingClock) {
            lastTickRef.current = performance.now();
            requestRef.current = requestAnimationFrame(updatePlayhead);
        } else {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            lastTickRef.current = null;
        }

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [isPlaying, updatePlayhead, isVideoDirectlyDrivingClock]);

    const togglePlaySmart = useCallback(() => {
        if (!isPlaying) {
            let targetPlayhead = playheadMs;
            const curEpoch = timelineBaseEpochMs + targetPlayhead;

            const activeGlobalGap = globalGaps?.find(g => curEpoch >= g.startEpochMs && curEpoch < g.endEpochMs);
            if (activeGlobalGap) {
                targetPlayhead = activeGlobalGap.endEpochMs - timelineBaseEpochMs;
            } else if (currentStationToCheck && !isCurrentInValidSegment) {
                const nextSeg = stationSegmentsToCheck
                    .map(seg => ({ start: seg.startEpochMs ?? seg.startEpoch ?? 0, end: seg.endEpochMs ?? seg.endEpoch ?? 0 }))
                    .filter(s => s.start > curEpoch)
                    .sort((a, b) => a.start - b.start)[0];

                if (nextSeg) {
                    targetPlayhead = nextSeg.start - timelineBaseEpochMs;
                }
            }

            if (targetPlayhead !== playheadMs) {
                setPlayheadMs(targetPlayhead);
            }
            setIsPlaying(true);
        } else {
            setIsPlaying(false);
        }
    }, [isPlaying, playheadMs, timelineBaseEpochMs, globalGaps, currentStationToCheck, isCurrentInValidSegment, stationSegmentsToCheck]);

    return {
        playheadMs,
        setPlayheadMs,
        isPlaying,
        setIsPlaying,
        isLooping,
        setIsLooping,
        playbackSpeed,
        setPlaybackSpeed,
        togglePlaySmart
    };
}