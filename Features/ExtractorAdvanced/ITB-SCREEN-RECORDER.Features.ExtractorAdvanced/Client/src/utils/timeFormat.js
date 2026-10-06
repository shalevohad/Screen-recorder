// ==========================================
// File: Features/ExtractorAdvanced/Client/src/utils/timeFormat.js
// ==========================================
import { getLocalOffsetMinutes } from './dstEngine.js';

const pad = (n) => String(n).padStart(2, '0');

/**
 * עיצוב חותמת זמן Epoch לשעון תצוגה בציר הזמן (Timeline Clock)
 * מותאם ומכויל באופן מלא מול מנוע ה-DST המנוהל של השרת ללא תלות באזור הזמן של מערכת ההפעלה.
 * 
 * @param {number} epochMs - זמן ב-Unix Epoch (מילי-שניות)
 * @param {'LOCAL'|'UTC'} mode - מצב תצוגה
 * @param {boolean|{showZone?: boolean, includeSeconds?: boolean}} options - אפשרויות תצוגה
 * @returns {string} מחרוזת שעה מפורמטת (למשל: "14:30:00" או "01:30:00 IDT")
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

    // 💡 מצב LOCAL - חישוב הזמן המקומי על בסיס סטיית השעון של מנוע ה-DST מהשרת
    const { offsetMin, label } = getLocalOffsetMinutes(epochMs);
    const localDate = new Date(epochMs + (offsetMin * 60 * 1000));

    const hh = pad(localDate.getUTCHours());
    const mm = pad(localDate.getUTCMinutes());
    const ss = pad(localDate.getUTCSeconds());
    const timeStr = includeSeconds ? `${hh}:${mm}:${ss}` : `${hh}:${mm}`;

    return showZone ? `${timeStr} ${label}` : timeStr;
}

/**
 * עיצוב משך זמן במילי-שניות למחרוזת שעות:דקות:שניות
 * @param {number} ms - משך זמן במילי-שניות
 * @returns {string} למשל "01:23:45" או "05:30"
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