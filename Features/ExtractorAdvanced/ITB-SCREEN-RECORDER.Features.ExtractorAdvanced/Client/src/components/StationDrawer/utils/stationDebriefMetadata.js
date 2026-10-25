// Client/src/components/StationDrawer/utils/stationDebriefMetadata.js
import { COVERAGE_THRESHOLDS, evaluateTrafficLight } from './stationCoverageConfig.js';

/**
 * Formats duration in milliseconds into HH:mm:ss string.
 * 
 * @param {number} durationMs - Duration in milliseconds.
 * @returns {string} Formatted duration.
 */
function formatDurationMs(durationMs) {
    if (!durationMs || durationMs <= 0) return '00:00:00';
    const totalSec = Math.floor(durationMs / 1000);
    const hours = Math.floor(totalSec / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    const seconds = totalSec % 60;
    const pad = (n) => String(n).padStart(2, '0');
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

/**
 * Formats bytes into human-readable string (MB / GB).
 * 
 * @param {number} bytes - Size in bytes.
 * @returns {string} Formatted file size.
 */
function formatBytes(bytes) {
    if (!bytes || bytes <= 0) return '0 MB';
    const gb = bytes / (1024 * 1024 * 1024);
    if (gb >= 1) return `${gb.toFixed(1)} GB`;
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(0)} MB`;
}

/**
 * Computes station debrief telemetry, health status, recorded duration, and coverage segments.
 *
 * @param {Object} station - Server station object.
 * @param {Array<{ startEpoch: number, endEpoch: number }>} [rawSegments=[]] - Recorded segments list.
 * @param {{ baseEpochMs: number, durationMs: number }} [scope={ baseEpochMs: 0, durationMs: 0 }] - Time window bounds.
 * @param {Object} [thresholds=COVERAGE_THRESHOLDS] - Coverage traffic light thresholds.
 * @returns {Object} Debrief telemetry metadata.
 */
export function getStationDebriefMeta(
    station,
    rawSegments = [],
    scope = { baseEpochMs: 0, durationMs: 0 },
    thresholds = COVERAGE_THRESHOLDS
) {
    const { baseEpochMs, durationMs } = scope;

    // Video and audio properties directly from server entity
    const hasAudio = Boolean(station?.hasAudio);
    const audioChannels = station?.audioChannels || (hasAudio ? 'AUDIO STREAM' : 'MUTED');
    const resolution = station?.resolution || (station?.width && station?.height ? `${station.height}p` : '1080p');
    const fps = station?.fps || 30;
    const fileSize = station?.fileSize || (station?.bytesRecorded ? formatBytes(station.bytesRecorded) : '--');

    // Return empty gap profile if window or segments are missing
    if (!durationMs || durationMs <= 0 || !Array.isArray(rawSegments) || rawSegments.length === 0) {
        const trafficStatus = evaluateTrafficLight(0, false, thresholds);
        return {
            coveragePct: 0,
            recordedDuration: '00:00:00',
            hasAudio,
            audioChannels,
            resolution,
            fps,
            fileSize,
            hasGaps: false,
            gapsCount: 0,
            trafficStatus,
            segments: [{ type: 'gap', startPct: 0, widthPct: 100 }]
        };
    }

    const windowStart = baseEpochMs;
    const windowEnd = baseEpochMs + durationMs;

    // 1. Clip segments to the active time window
    const clippedSegments = [];
    for (const seg of rawSegments) {
        const s = Math.max(seg.startEpoch, windowStart);
        const e = Math.min(seg.endEpoch, windowEnd);
        if (e > s) {
            clippedSegments.push({ startEpoch: s, endEpoch: e });
        }
    }

    // Chronological ordering
    clippedSegments.sort((a, b) => a.startEpoch - b.endEpoch);

    // 2. Merge overlapping or adjacent segments
    const merged = [];
    for (const seg of clippedSegments) {
        if (merged.length === 0) {
            merged.push({ ...seg });
        } else {
            const last = merged[merged.length - 1];
            if (seg.startEpoch <= last.endEpoch + 1000) { // 1-second tolerance
                last.endEpoch = Math.max(last.endEpoch, seg.endEpoch);
            } else {
                merged.push({ ...seg });
            }
        }
    }

    // 3. Compute total recorded duration in milliseconds
    let totalRecordedMs = 0;
    for (const seg of merged) {
        totalRecordedMs += (seg.endEpoch - seg.startEpoch);
    }

    const coveragePct = Math.min(100, Math.round((totalRecordedMs / durationMs) * 100));

    // 4. Construct visual segment and gap percentages (0-100%)
    const trackSegments = [];
    let currentCursor = windowStart;
    let gapsCount = 0;

    for (const seg of merged) {
        // Gap preceding current segment
        if (seg.startEpoch > currentCursor + 2000) { // Gap > 2 seconds
            const gapWidthPct = ((seg.startEpoch - currentCursor) / durationMs) * 100;
            const gapStartPct = ((currentCursor - windowStart) / durationMs) * 100;
            trackSegments.push({
                type: 'gap',
                startPct: Math.max(0, gapStartPct),
                widthPct: Math.min(100, gapWidthPct)
            });
            gapsCount++;
        }

        // Active recording segment
        const recWidthPct = ((seg.endEpoch - seg.startEpoch) / durationMs) * 100;
        const recStartPct = ((seg.startEpoch - windowStart) / durationMs) * 100;
        trackSegments.push({
            type: 'rec',
            startPct: Math.max(0, recStartPct),
            widthPct: Math.min(100, recWidthPct)
        });

        currentCursor = seg.endEpoch;
    }

    // Trailing gap up to windowEnd
    if (currentCursor < windowEnd - 2000) {
        const gapWidthPct = ((windowEnd - currentCursor) / durationMs) * 100;
        const gapStartPct = ((currentCursor - windowStart) / durationMs) * 100;
        trackSegments.push({
            type: 'gap',
            startPct: Math.max(0, gapStartPct),
            widthPct: Math.min(100, gapWidthPct)
        });
        gapsCount++;
    }

    const hasGaps = gapsCount > 0;
    const trafficStatus = evaluateTrafficLight(coveragePct, hasGaps, thresholds);

    return {
        coveragePct,
        recordedDuration: formatDurationMs(totalRecordedMs),
        hasAudio,
        audioChannels,
        resolution,
        fps,
        fileSize,
        hasGaps,
        gapsCount,
        trafficStatus,
        segments: trackSegments.length > 0 ? trackSegments : [{ type: 'gap', startPct: 0, widthPct: 100 }]
    };
}