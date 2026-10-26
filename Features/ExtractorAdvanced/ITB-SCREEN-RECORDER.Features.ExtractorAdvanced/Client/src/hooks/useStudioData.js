// ==========================================
// File: Features/ExtractorAdvanced/Client/src/hooks/useStudioData.js
// ==========================================
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';

/**
 * Hook for loading stations, coverage, and timeline recording segments for the active studio time range.
 * 
 * @param {number} timelineBaseEpochMs - Base Unix Epoch timestamp in milliseconds.
 * @param {number} totalTimelineDurationMs - Total span of the timeline in milliseconds.
 * @param {{ start: string, end: string }} timeRange - Range string bounds.
 * @param {'LOCAL'|'UTC'} timeMode - Active time display mode.
 * @param {string|null} [activeStationId=null] - Currently selected station ID.
 * @returns {{ allStations: Array, recordingSegments: Object, isLoadingStations: boolean, setAllStations: Function }}
 */
export function useStudioData(timelineBaseEpochMs, totalTimelineDurationMs, timeRange, timeMode, activeStationId = null) {
    const [allStations, setAllStations] = useState([]);
    const [recordingSegments, setRecordingSegments] = useState({});
    const [isLoadingStations, setIsLoadingStations] = useState(false);
    const allStationsRef = useRef(allStations);
    allStationsRef.current = allStations;

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
                        hostname: item.hostname || 'Station',
                        roleAlias: item.roleAlias || null,
                        displayName: item.displayName || item.roleAlias || item.hostname || 'Station',
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

                    setAllStations(prevStations => {
                        if (!prevStations || prevStations.length === 0) return normalized;

                        const prevMap = new Map(prevStations.map(s => [s.id, s]));
                        let hasAnyChange = prevStations.length !== normalized.length;

                        const merged = normalized.map(nextItem => {
                            const prevItem = prevMap.get(nextItem.id);
                            if (!prevItem) {
                                hasAnyChange = true;
                                return nextItem;
                            }

                            const isIdentical =
                                prevItem.isOnline === nextItem.isOnline &&
                                prevItem.displayName === nextItem.displayName &&
                                prevItem.feedSpec === nextItem.feedSpec &&
                                prevItem.recordingsCount === nextItem.recordingsCount &&
                                prevItem.fps === nextItem.fps;

                            if (isIdentical) {
                                return prevItem;
                            }

                            hasAnyChange = true;
                            return { ...prevItem, ...nextItem };
                        });

                        return hasAnyChange ? merged : prevStations;
                    });
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

    // Distinct query keys (IDs and hostnames) to prevent segment omissions
    const stationQueryKeys = useMemo(() => {
        const set = new Set();
        allStations.forEach(s => {
            if (s.id) set.add(s.id);
            if (s.hostname) set.add(s.hostname);
        });
        return Array.from(set).sort().join(',');
    }, [allStations]);

    useEffect(() => {
        if (!stationQueryKeys || isNaN(timelineBaseEpochMs)) {
            setRecordingSegments({});
            return;
        }

        let isMounted = true;
        const fetchSegments = async () => {
            try {
                const endEpochMs = timelineBaseEpochMs + totalTimelineDurationMs;
                const res = await fetch(`/api/v1/extractor/timeline-segments?stations=${encodeURIComponent(stationQueryKeys)}&startEpoch=${timelineBaseEpochMs}&endEpoch=${endEpochMs}`);
                if (res.ok && isMounted) {
                    const rawData = await res.json() || {};

                    // Dual Keying: Map segments by both station.id and station.hostname
                    const normalizedMap = {};
                    (allStationsRef.current || []).forEach(st => {
                        const segs = rawData[st.id] || rawData[st.hostname] || rawData[st.displayName] || [];
                        normalizedMap[st.id] = segs;
                        normalizedMap[st.hostname] = segs;
                    });

                    // Retain any direct server key
                    Object.keys(rawData).forEach(k => {
                        if (!normalizedMap[k]) normalizedMap[k] = rawData[k];
                    });

                    setRecordingSegments(normalizedMap);
                }
            } catch {
                if (isMounted) setRecordingSegments({});
            }
        };

        fetchSegments();
        return () => { isMounted = false; };
    }, [stationQueryKeys, timelineBaseEpochMs, totalTimelineDurationMs]);

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