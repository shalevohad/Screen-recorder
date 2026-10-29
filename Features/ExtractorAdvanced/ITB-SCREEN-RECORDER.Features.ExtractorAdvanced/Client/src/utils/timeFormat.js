// ==========================================
// File: Features/ExtractorAdvanced/Client/src/utils/timeFormat.js
// ==========================================
import { getLocalOffsetMinutes } from './dstEngine.js';

const pad = (n) => String(n).padStart(2, '0');

/**
 * Formats an Epoch timestamp in milliseconds into a timeline clock string.
 * Calibrated against server-managed DST offset independent of host OS timezone.
 * 
 * @param {number} epochMs - Unix Epoch timestamp in milliseconds.
 * @param {'LOCAL'|'UTC'} mode - Display mode ('LOCAL' or 'UTC').
 * @param {boolean|{showZone?: boolean, includeSeconds?: boolean}} options - Display options.
 * @returns {string} Formatted time string (e.g., "14:30:00" or "01:30:00 IDT").
 */
export function formatTimelineClock(epochMs, mode = 'LOCAL', options = {}) {
    if (!epochMs || isNaN(epochMs) || epochMs <= 0) return '--:--:--';

    let showZone = false;
    let includeSeconds = true;

    if (typeof options === 'boolean') {
        showZone = options;
    } else if (typeof options === 'object' && options !== null) {
        if (options.showZone !== undefined) showZone = Boolean(options.showZone);
        if (options.includeSeconds !== undefined) includeSeconds = Boolean(options.includeSeconds);
    }

    if (mode === 'UTC') {
        const d = new Date(epochMs);
        const hh = pad(d.getUTCHours());
        const mm = pad(d.getUTCMinutes());
        const ss = pad(d.getUTCSeconds());
        const timeStr = includeSeconds ? `${hh}:${mm}:${ss}` : `${hh}:${mm}`;
        return showZone ? `${timeStr} UTC` : timeStr;
    }

    // LOCAL mode - Compute local time based on DST offset engine from server
    const { offsetMin, label } = getLocalOffsetMinutes(epochMs);
    const localDate = new Date(epochMs + (offsetMin * 60 * 1000));

    const hh = pad(localDate.getUTCHours());
    const mm = pad(localDate.getUTCMinutes());
    const ss = pad(localDate.getUTCSeconds());
    const timeStr = includeSeconds ? `${hh}:${mm}:${ss}` : `${hh}:${mm}`;

    return showZone ? `${timeStr} ${label}` : timeStr;
}

/**
 * Formats duration in milliseconds to HH:MM:SS or MM:SS string.
 * 
 * @param {number} ms - Duration in milliseconds.
 * @returns {string} Formatted duration (e.g. "01:23:45" or "05:30").
 */
export function formatDuration(ms) {
    if (!ms || isNaN(ms)) ms = 0;
    const totalSec = Math.floor(ms / 1000);
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    if (hrs > 0) {
        return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
    }
    return `${pad(mins)}:${pad(secs)}`;
}