// ==========================================
// File: ClientApp/src/utils/keyUtils.js
// ==========================================

/**
 * מנרמל שם מקש בודד לתצוגה אחידה
 */
export function normalizeKeyPart(part) {
    if (!part || typeof part !== 'string') return '';
    const trimmed = part.trim();
    if (!trimmed) return '';

    const lower = trimmed.toLowerCase();
    if (lower === 'ctrl' || lower === 'control' || lower === 'rctrl' || lower === 'lctrl') return 'Ctrl';
    if (lower === 'shift' || lower === 'rshift' || lower === 'lshift') return 'Shift';
    if (lower === 'alt' || lower === 'ralt' || lower === 'lalt') return 'Alt';
    if (lower === 'win' || lower === 'windows' || lower === 'super' || lower === 'meta') return 'Win';
    if (lower === 'backspace') return 'Backspace';
    if (lower === 'enter' || lower === 'return') return 'Enter';
    if (lower === 'escape' || lower === 'esc') return 'Esc';
    if (lower === 'space') return 'Space';
    if (lower === 'tab') return 'Tab';
    if (lower === 'delete' || lower === 'del') return 'Delete';
    if (lower === 'capslock' || lower === 'caps lock') return 'Caps';
    if (lower === 'printscreen' || lower === 'prtscr') return 'PrtScn';

    return trimmed;
}

/**
 * מפרק מחרוזת של צירוף מקשים (כגון "Ctrl+C", "Alt+Tab", "Ctrl+Shift+Esc", "*")
 * לרשימת מקשים נקיים ומסוננים ללא כפילויות
 */
export function parseKeyCombination(rawCombo) {
    if (!rawCombo || typeof rawCombo !== 'string') return [];

    const parts = rawCombo.split('+').map(p => p.trim()).filter(Boolean);
    const normalized = parts.map(normalizeKeyPart);

    const seen = new Set();
    const result = [];

    for (const k of normalized) {
        if (!k) continue;
        if (!seen.has(k)) {
            seen.add(k);
            result.push(k);
        }
    }

    return result;
}

/**
 * מחזיר מחרוזת נקייה, מעוצבת וקריאה של צירוף המקשים
 */
export function cleanKeyCombination(rawCombo, joiner = ' + ') {
    const keys = parseKeyCombination(rawCombo);
    return keys.join(joiner);
}
