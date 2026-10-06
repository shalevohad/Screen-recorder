// ==========================================
// File: ClientApp/src/utils/dstEngine.js
// ==========================================

let configuredTransitions = [];
let defaultOffsetMinutes = 120; // ברירת מחדל חורף (IST = UTC+2)
let isInitialized = false;

/**
 * טעינת מעברי השעון מהשרת דרך SettingsController
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