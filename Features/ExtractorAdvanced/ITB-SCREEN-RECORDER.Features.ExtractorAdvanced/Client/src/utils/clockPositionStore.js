// ==========================================
// File: Features/ExtractorAdvanced/Client/src/utils/clockPositionStore.js
// Tactical Canvas UTC Wall Clock Position Parser & Coordinate Resolver
// ==========================================

export const CORNER_POSITIONS = ['top-right', 'bottom-right', 'bottom-left', 'top-left'];

/**
 * Parses a position descriptor string into structured coordinates and presets
 * Supports: 'top-right', 'top-left', 'bottom-right', 'bottom-left', or 'custom:X,Y' (percentages 0-100)
 */
export function parseClockPosition(posStr) {
    if (!posStr || typeof posStr !== 'string') {
        return { isCustom: false, preset: 'top-right', xPct: 100, yPct: 0 };
    }
    const clean = posStr.trim().toLowerCase();
    if (CORNER_POSITIONS.includes(clean)) {
        const xPct = clean.includes('right') ? 100 : 0;
        const yPct = clean.includes('bottom') ? 100 : 0;
        return { isCustom: false, preset: clean, xPct, yPct };
    }
    if (clean.startsWith('custom:') || clean.includes(',')) {
        const coords = clean.replace('custom:', '').split(/[,;]/);
        if (coords.length >= 2) {
            const x = parseFloat(coords[0].replace('%', ''));
            const y = parseFloat(coords[1].replace('%', ''));
            if (!isNaN(x) && !isNaN(y)) {
                return {
                    isCustom: true,
                    preset: null,
                    xPct: Math.max(0, Math.min(100, x)),
                    yPct: Math.max(0, Math.min(100, y))
                };
            }
        }
    }
    return { isCustom: false, preset: 'top-right', xPct: 100, yPct: 0 };
}

/**
 * Formats a position string into a human-readable operator label
 */
export function formatClockPositionLabel(posStr) {
    const parsed = parseClockPosition(posStr);
    if (parsed.isCustom) {
        return `CUSTOM (${Math.round(parsed.xPct)}% X, ${Math.round(parsed.yPct)}% Y)`;
    }
    return (parsed.preset || 'top-right').toUpperCase();
}

/**
 * Resolves mathematical FFmpeg drawtext coordinate expressions
 */
export function resolveFfmpegClockCoords(rawPosition) {
    const clean = (rawPosition || 'top-right').trim().toLowerCase();
    if (clean.startsWith('custom:') || clean.includes(',')) {
        const coords = clean.replace('custom:', '').split(/[,;]/);
        const x = Math.max(0, Math.min(100, parseFloat(coords[0]) || 0));
        const y = Math.max(0, Math.min(100, parseFloat(coords[1]) || 0));
        const xRatio = (x / 100.0).toFixed(4);
        const yRatio = (y / 100.0).toFixed(4);
        return {
            x: `16+(w-tw-32)*${xRatio}`,
            y: `16+(h-th-32)*${yRatio}`
        };
    }
    switch (clean) {
        case 'top-left': return { x: '24', y: '24' };
        case 'bottom-left': return { x: '24', y: 'h-th-24' };
        case 'bottom-right': return { x: 'w-tw-24', y: 'h-th-24' };
        case 'top-right':
        default: return { x: 'w-tw-24', y: '24' };
    }
}
