// ==========================================
// File: Features/ExtractorAdvanced/Client/src/hooks/useStudioData.js
// ==========================================
import { useState, useEffect, useCallback, useMemo } from 'react';

export function useStudioData(timelineBaseEpochMs, totalTimelineDurationMs, timeRange, timeMode, activeStationId = null) {
    const [allStations, setAllStations] = useState([]);
    const [recordingSegments, setRecordingSegments] = useState({});
    const [isLoadingStations, setIsLoadingStations] = useState(false);

    const fetchActiveStationsForTimeScope = useCallback(async () => {
        if (isNaN(timelineBaseEpochMs)) return;
        const endEpochMs = timelineBaseEpochMs + totalTimelineDurationMs;

        setIsLoadingStations(true);
        try {
            const queryParams = new URLSearchParams({
                startEpoch: String(timelineBaseEpochMs),
                endEpoch: String(endEpochMs),
                startTime: timeRange.start,
                endTime: timeRange.end,
                timeMode: timeMode
            });

            const res = await fetch(`/api/v1/extractor-advanced/stations?${queryParams.toString()}`);
            if (res.ok) {
                const contentType = res.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    const data = await res.json();
                    const rawList = Array.isArray(data) ? data : (data.stations || data.items || []);

                    const normalized = rawList.map(item => ({
                        id: String(item.id || item.stationId || item.agentId || item.hostname),
                        hostname: item.hostname || item.displayName || item.name || 'Station',
                        displayName: item.displayName || item.hostname || item.name,
                        isOnline: item.isOnline !== undefined ? item.isOnline : true,
                        recordingsCount: item.recordingsCount || 0,
                        segments: item.segments || [],
                        hasAudio: Boolean(item.hasAudio),
                        audioCodec: item.audioCodec || '',
                        audioChannels: item.audioChannels || 0,
                        audioLabel: item.audioLabel || (item.hasAudio ? 'AAC' : 'NONE'),
                        width: item.width || 1920,
                        height: item.height || 1080,
                        fps: item.fps || 30,
                        isVfr: Boolean(item.isVfr),
                        resolution: item.resolution || '1080p',
                        feedSpec: item.feedSpec || '1080p • 30fps'
                    }));

                    setAllStations(normalized);
                }
            }
        } catch (err) {
            console.warn('[useStudioData] Failed fetching active stations:', err);
        } finally {
            setIsLoadingStations(false);
        }
    }, [timelineBaseEpochMs, totalTimelineDurationMs, timeRange.start, timeRange.end, timeMode]);

    useEffect(() => {
        fetchActiveStationsForTimeScope();
    }, [fetchActiveStationsForTimeScope]);

    const stationIdsKey = useMemo(() => allStations.map(s => s.id).sort().join(','), [allStations]);

    useEffect(() => {
        if (!stationIdsKey || isNaN(timelineBaseEpochMs)) {
            setRecordingSegments({});
            return;
        }

        let isMounted = true;
        const fetchSegments = async () => {
            try {
                const endEpochMs = timelineBaseEpochMs + totalTimelineDurationMs;
                const res = await fetch(`/api/v1/extractor/timeline-segments?stations=${stationIdsKey}&startEpoch=${timelineBaseEpochMs}&endEpoch=${endEpochMs}`);
                if (res.ok && isMounted) {
                    const data = await res.json();
                    setRecordingSegments(data || {});
                }
            } catch {
                if (isMounted) setRecordingSegments({});
            }
        };

        fetchSegments();
        return () => { isMounted = false; };
    }, [stationIdsKey, timelineBaseEpochMs, totalTimelineDurationMs]);

    const movieBoundaries = useMemo(() => {
        if (!allStations.length || !timelineBaseEpochMs) {
            return { globalFirstMs: null, globalLastMs: null, currentFirstMs: null, currentLastMs: null };
        }

        let gMin = Infinity, gMax = -Infinity;
        allStations.forEach(st => {
            const segs = recordingSegments[st.id] || recordingSegments[st.hostname] || st.segments || [];
            segs.forEach(seg => {
                const s = seg.startEpochMs ?? seg.startEpoch ?? 0;
                const e = seg.endEpochMs ?? seg.endEpoch ?? 0;
                if (s > 0 && s < gMin) gMin = s;
                if (e > 0 && e > gMax) gMax = e;
            });
        });

        let curMin = Infinity, curMax = -Infinity;
        if (activeStationId) {
            const activeSegs = recordingSegments[activeStationId] || [];
            activeSegs.forEach(seg => {
                const s = seg.startEpochMs ?? seg.startEpoch ?? 0;
                const e = seg.endEpochMs ?? seg.endEpoch ?? 0;
                if (s > 0 && s < curMin) curMin = s;
                if (e > 0 && e > curMax) curMax = e;
            });
        }

        const toRel = (epoch) => (epoch === Infinity || epoch === -Infinity ? null : Math.max(0, Math.min(totalTimelineDurationMs, epoch - timelineBaseEpochMs)));

        return {
            globalFirstMs: toRel(gMin),
            globalLastMs: toRel(gMax),
            currentFirstMs: toRel(curMin),
            currentLastMs: toRel(curMax)
        };
    }, [allStations, recordingSegments, activeStationId, timelineBaseEpochMs, totalTimelineDurationMs]);

    return {
        allStations,
        setAllStations,
        recordingSegments,
        setRecordingSegments,
        isLoadingStations,
        refetchStations: fetchActiveStationsForTimeScope,
        movieBoundaries
    };
}