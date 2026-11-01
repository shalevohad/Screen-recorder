// ==========================================
// File: ClientApp/src/utils/dstEngine.js
// ==========================================

let configuredTransitions = [];
let defaultOffsetMinutes = 120; // Default winter offset (IST = UTC+2)
let isInitialized = false;

/**
 * Initializes and fetches DST transition tables from server via SettingsController.
 * @returns {Promise<void>}
 */
export async function initDstEngineAsync() {
    if (isInitialized) return;
    try {
        const res = await fetch('/api/v1/settings/dst-transitions');
        if (res.ok) {
            const data = await res.json();
            const list = Array.isArray(data) ? data : (data.transitions || data.manualDstTransitions || []);
            if (list.length > 0) {
                setCustomDstTransitions(list);
                isInitialized = true;
                return;
            }
        }
    } catch (err) {
        console.warn('[DST Engine] Failed to fetch server transitions:', err);
    }
    isInitialized = true;
}

export function setCustomDstTransitions(rules) {
    if (Array.isArray(rules)) {
        configuredTransitions = rules.map(r => ({
            switchEpochMs: new Date(r.switchUtc || r.SwitchUtc).getTime(),
            offsetBeforeMin: r.offsetBeforeMinutes ?? r.OffsetBeforeMinutes,
            offsetAfterMin: r.offsetAfterMinutes ?? r.OffsetAfterMinutes,
            labelBefore: r.labelBefore || r.LabelBefore || 'IDT',
            labelAfter: r.labelAfter || r.LabelAfter || 'IST',
            description: r.description || r.Description || 'DST Transition'
        })).sort((a, b) => a.switchEpochMs - b.switchEpochMs);
    }
}

export function getLocalOffsetMinutes(epochMs) {
    for (let i = configuredTransitions.length - 1; i >= 0; i--) {
        const tr = configuredTransitions[i];
        if (epochMs >= tr.switchEpochMs) {
            return { offsetMin: tr.offsetAfterMin, label: tr.labelAfter };
        }
    }

    if (configuredTransitions.length > 0) {
        return {
            offsetMin: configuredTransitions[0].offsetBeforeMin,
            label: configuredTransitions[0].labelBefore
        };
    }

    return { offsetMin: defaultOffsetMinutes, label: 'LOCAL' };
}

export function findTransitionsInRange(startEpochMs, endEpochMs) {
    return configuredTransitions.filter(
        t => t.switchEpochMs >= startEpochMs && t.switchEpochMs <= endEpochMs
    );
}

export function formatLocalClockWithDst(epochMs, includeSeconds = true) {
    const pad = (n) => String(n).padStart(2, '0');
    const { offsetMin, label } = getLocalOffsetMinutes(epochMs);
    const localMs = epochMs + (offsetMin * 60 * 1000);
    const d = new Date(localMs);
    const hh = pad(d.getUTCHours());
    const mm = pad(d.getUTCMinutes());
    const ss = pad(d.getUTCSeconds());
    const timeStr = includeSeconds ? `${hh}:${mm}:${ss}` : `${hh}:${mm}`;
    return `${timeStr} ${label}`;
}

export function checkTimeAmbiguity(dateStr, timeStr) {
    if (!dateStr || !timeStr) return { isAmbiguous: false };
    const [y, m, d] = dateStr.split('-').map(Number);
    const [hh, mm, ss] = timeStr.split(':').map(Number);

    for (const tr of configuredTransitions) {
        if (tr.offsetBeforeMin > tr.offsetAfterMin) {
            const diffHours = (tr.offsetBeforeMin - tr.offsetAfterMin) / 60;
            const switchLocalAfter = new Date(tr.switchEpochMs + (tr.offsetAfterMin * 60000));

            if (switchLocalAfter.getUTCFullYear() === y &&
                switchLocalAfter.getUTCMonth() + 1 === m &&
                switchLocalAfter.getUTCDate() === d) {

                const switchHour = switchLocalAfter.getUTCHours();
                if (hh >= switchHour && hh < switchHour + diffHours) {
                    return {
                        isAmbiguous: true,
                        transition: tr,
                        firstOccurrenceEpoch: new Date(Date.UTC(y, m - 1, d, hh, mm, ss)).getTime() - (tr.offsetBeforeMin * 60000),
                        secondOccurrenceEpoch: new Date(Date.UTC(y, m - 1, d, hh, mm, ss)).getTime() - (tr.offsetAfterMin * 60000)
                    };
                }
            }
        }
    }
    return { isAmbiguous: false };
}

/**
 * Returns year, month (1-12), day, hour, minute, second for an epoch timestamp
 * according to server-managed DST offset, immune to host browser timezone.
 * 
 * @param {number} epochMs 
 * @returns {{ year: number, month: number, day: number, hour: number, minute: number, second: number, offsetMin: number, label: string }}
 */
export function getLocalTimeComponents(epochMs) {
    const { offsetMin, label } = getLocalOffsetMinutes(epochMs);
    const localMs = epochMs + (offsetMin * 60 * 1000);
    const d = new Date(localMs);
    return {
        year: d.getUTCFullYear(),
        month: d.getUTCMonth() + 1,
        day: d.getUTCDate(),
        hour: d.getUTCHours(),
        minute: d.getUTCMinutes(),
        second: d.getUTCSeconds(),
        offsetMin,
        label
    };
}

/**
 * Returns UTC date and time components for an epoch timestamp.
 * 
 * @param {number} epochMs 
 * @returns {{ year: number, month: number, day: number, hour: number, minute: number, second: number, offsetMin: number, label: string }}
 */
export function getUtcTimeComponents(epochMs) {
    const d = new Date(epochMs);
    return {
        year: d.getUTCFullYear(),
        month: d.getUTCMonth() + 1,
        day: d.getUTCDate(),
        hour: d.getUTCHours(),
        minute: d.getUTCMinutes(),
        second: d.getUTCSeconds(),
        offsetMin: 0,
        label: 'UTC'
    };
}

/**
 * Returns time components in either 'LOCAL' or 'UTC' mode.
 * 
 * @param {number} epochMs 
 * @param {'LOCAL'|'UTC'} mode 
 * @returns {{ year: number, month: number, day: number, hour: number, minute: number, second: number, offsetMin: number, label: string }}
 */
export function getTimeComponents(epochMs, mode = 'LOCAL') {
    return mode === 'UTC' ? getUtcTimeComponents(epochMs) : getLocalTimeComponents(epochMs);
}

/**
 * Formats epoch into standardized dateStr (YYYY-MM-DD), timeStr (HH:MM:SS), and fullStr (ISO nominal).
 * 
 * @param {number} epochMs 
 * @param {'LOCAL'|'UTC'} mode 
 * @returns {{ dateStr: string, timeStr: string, fullStr: string, label: string, offsetMin: number }}
 */
export function formatDateTimeComponents(epochMs, mode = 'LOCAL') {
    const pad = (n) => String(n).padStart(2, '0');
    const comp = getTimeComponents(epochMs, mode);
    return {
        dateStr: `${comp.year}-${pad(comp.month)}-${pad(comp.day)}`,
        timeStr: `${pad(comp.hour)}:${pad(comp.minute)}:${pad(comp.second)}`,
        fullStr: `${comp.year}-${pad(comp.month)}-${pad(comp.day)}T${pad(comp.hour)}:${pad(comp.minute)}:${pad(comp.second)}`,
        label: comp.label,
        offsetMin: comp.offsetMin
    };
}

/**
 * Converts nominal date ("YYYY-MM-DD") and time ("HH:MM:SS") strings into UTC epoch milliseconds
 * using calibrated server DST rules, completely independent of host machine timezone.
 * 
 * @param {string} dateStr 
 * @param {string} timeStr 
 * @param {'LOCAL'|'UTC'} mode 
 * @param {number} occurrence - 1 for first occurrence during fallback transition, 2 for second
 * @returns {number|null}
 */
export function dateTimeToEpochMs(dateStr, timeStr, mode = 'LOCAL', occurrence = 1) {
    if (!dateStr) return null;
    const [y, m, d] = dateStr.split('-').map(Number);
    const [hh, mm, ss = 0] = (timeStr || '00:00:00').split(':').map(Number);
    if (isNaN(y) || isNaN(m) || isNaN(d) || isNaN(hh) || isNaN(mm)) return null;

    const nominalMs = Date.UTC(y, m - 1, d, hh, mm, ss);

    if (mode === 'UTC') {
        return nominalMs;
    }

    const amb = checkTimeAmbiguity(dateStr, timeStr);
    if (amb.isAmbiguous) {
        return occurrence === 2 ? amb.secondOccurrenceEpoch : amb.firstOccurrenceEpoch;
    }

    const approxUtc = nominalMs - (defaultOffsetMinutes * 60000);
    const { offsetMin } = getLocalOffsetMinutes(approxUtc);
    let epochMs = nominalMs - (offsetMin * 60000);

    const verified = getLocalOffsetMinutes(epochMs);
    if (verified.offsetMin !== offsetMin) {
        epochMs = nominalMs - (verified.offsetMin * 60000);
    }
    return epochMs;
}