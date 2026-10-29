// ==========================================
// File: ClientApp/src/utils/keyUtils.js
// ==========================================

/**
 * Normalizes a single key label to uniform tactical display representation.
 * @param {string} part - Raw key name string.
 * @returns {string} Normalized key name (e.g. 'Ctrl', 'Shift', 'Alt', 'Esc').
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
 * Parses a keystroke combination string (e.g. "Ctrl+C", "Alt+Tab", "Ctrl+Shift+Esc")
 * into a deduplicated list of cleaned and normalized key parts.
 * @param {string} rawCombo - Raw keystroke combination string.
 * @returns {string[]} Array of normalized key names.
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
 * Returns a formatted, human-readable representation of a key combination.
 * @param {string} rawCombo - Raw key combination string.
 * @param {string} [joiner=' + '] - Delimiter string.
 * @returns {string} Formatted combination string.
 */
export function cleanKeyCombination(rawCombo, joiner = ' + ') {
    const keys = parseKeyCombination(rawCombo);
    return keys.join(joiner);
}
