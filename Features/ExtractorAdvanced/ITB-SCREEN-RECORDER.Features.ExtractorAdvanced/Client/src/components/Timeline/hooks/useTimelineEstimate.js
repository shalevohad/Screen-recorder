// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Timeline/hooks/useTimelineEstimate.js
// ==========================================
import { useState, useEffect, useRef } from 'react';

export const formatEstimateSize = (bytes) => {
    if (!bytes || bytes <= 0) return '0 MB';
    const mb = bytes / (1024 * 1024);
    if (mb >= 1000) return `${(mb / 1024).toFixed(1)} GB`;
    return `${Math.round(mb)} MB`;
};

export function useTimelineEstimate({
    stationIdsKey,
    inPointMs,
    outPointMs,
    baseEpochMs,
    onEstimateLoaded
}) {
    const [estimateData, setEstimateData] = useState(null);
    const [isEstimating, setIsEstimating] = useState(false);
    const onEstimateLoadedRef = useRef(onEstimateLoaded);

    useEffect(() => {
        onEstimateLoadedRef.current = onEstimateLoaded;
    }, [onEstimateLoaded]);

    useEffect(() => {
        if (!stationIdsKey || outPointMs <= inPointMs || !baseEpochMs) {
            setEstimateData(null);
            return;
        }

        const controller = new AbortController();
        setIsEstimating(true);

        const timer = setTimeout(async () => {
            try {
                const payload = {
                    stationIds: stationIdsKey.split(','),
                    inEpochMs: baseEpochMs + Math.round(inPointMs),
                    outEpochMs: baseEpochMs + Math.round(outPointMs)
                };

                const res = await fetch('/api/v1/extractor-advanced/estimate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                    signal: controller.signal
                });

                if (res.ok) {
                    const data = await res.json();
                    setEstimateData(data);
                    if (onEstimateLoadedRef.current) {
                        onEstimateLoadedRef.current(data);
                    }
                }
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.warn('[useTimelineEstimate] Failed estimating cut:', err);
                }
            } finally {
                setIsEstimating(false);
            }
        }, 350);

        return () => {
            clearTimeout(timer);
            controller.abort();
        };
    }, [stationIdsKey, inPointMs, outPointMs, baseEpochMs]);

    return { estimateData, isEstimating, formatEstimateSize };
}