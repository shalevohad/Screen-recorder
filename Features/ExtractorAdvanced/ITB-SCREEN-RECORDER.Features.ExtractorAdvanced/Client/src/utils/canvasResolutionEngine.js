// ==========================================
// File: Features/ExtractorAdvanced/Client/src/utils/canvasResolutionEngine.js
// Decoupled Canvas Resolution & Aspect Ratio Calculation Engine
// ==========================================

export const RESOLUTION_PRESETS = [
    { id: '4K', label: '4K UHD', shortLabel: '4K', baseH: 2160, desc: 'Ultra-High Density' },
    { id: '2K', label: '2K QHD / WQXGA', shortLabel: '2K', baseH: 1440, desc: 'High Pixel Density (Default)' },
    { id: 'FHD', label: '1080p FHD', shortLabel: 'FHD', baseH: 1080, desc: 'Standard Full HD' },
    { id: 'HD', label: '720p HD', shortLabel: 'HD', baseH: 720, desc: 'Compact Fast Export' }
];

export const CUSTOM_RESOLUTION_ID = 'CUSTOM';

export const ASPECT_PRESETS = [
    { id: '16:9', label: '16:9 Broadcast', ratio: 16 / 9, w: 2560, h: 1440 },
    { id: '16:10', label: '16:10 WUXGA / WQXGA', ratio: 16 / 10, w: 2560, h: 1600 },
    { id: '19:10', label: '19:10 NOC Extended', ratio: 19 / 10, w: 2736, h: 1440 },
    { id: '21:9', label: '21:9 Ultrawide', ratio: 21 / 9, w: 3440, h: 1440 },
    { id: '32:9', label: '32:9 Dual Screen', ratio: 32 / 9, w: 5120, h: 1440 },
    { id: '4:3', label: '4:3 Standard', ratio: 4 / 3, w: 1920, h: 1440 }
];

export const DEFAULT_CANVAS_RESOLUTION = '2K';
export const DEFAULT_CANVAS_ASPECT = '16:9';
export const DEFAULT_VIRTUAL_CANVAS_W = 2560;
export const DEFAULT_VIRTUAL_CANVAS_H = 1440;

/**
 * Sanitizes dimension to an even integer within safe macroblock bounds.
 * @param {number|string} val
 * @param {number} min Minimum allowed pixel size (default 320)
 * @param {number} max Maximum allowed pixel size (default 7680)
 * @returns {number} Strictly even integer
 */
export function sanitizeEvenDimension(val, min = 320, max = 7680) {
    let num = Number(val);
    if (isNaN(num)) num = min;
    num = Math.max(min, Math.min(max, Math.round(num)));
    num -= (num % 2); // strictly ensure even integer for macroblock alignment
    return num;
}

/**
 * Parses a custom resolution string such as "2560x1080", "3440X1440", "1920×1080".
 * @param {string} str
 * @returns {{ w: number, h: number } | null}
 */
export function parseResolutionString(str) {
    if (!str || typeof str !== 'string') return null;
    const match = str.trim().match(/^(\d{3,5})\s*[xX×]\s*(\d{3,5})$/);
    if (match) {
        const w = sanitizeEvenDimension(parseInt(match[1], 10), 320, 7680);
        const h = sanitizeEvenDimension(parseInt(match[2], 10), 180, 4320);
        return { w, h };
    }
    return null;
}

/**
 * Parses an aspect ratio string like "16:9", "2.39:1", or "4:3".
 * @param {string} str
 * @returns {number | null}
 */
export function parseAspectRatioString(str) {
    if (!str || typeof str !== 'string') return null;
    const match = str.trim().match(/^([\d.]+)\s*:\s*([\d.]+)$/);
    if (match) {
        const num = parseFloat(match[1]);
        const den = parseFloat(match[2]);
        if (num > 0 && den > 0) {
            return num / den;
        }
    }
    return null;
}

/**
 * Computes deterministic, even-integer virtual canvas bounds based on decoupled resolution and aspect ratio.
 * Supports manual custom dimensions or formatted resolution strings.
 * @param {string} resolutionId '4K' | '2K' | 'FHD' | 'HD' | 'CUSTOM' | string
 * @param {string} aspectId '16:9' | '16:10' | '19:10' | '21:9' | '32:9' | '4:3' | string
 * @param {{ w: number, h: number } | null} customDims Optional custom dimensions
 * @returns {{ w: number, h: number }}
 */
export function computeCanvasDimensions(resolutionId = '2K', aspectId = '16:9', customDims = null) {
    // 1. Explicit Custom resolution mode or customDims provided for non-preset
    if (resolutionId === 'CUSTOM' || (customDims && !RESOLUTION_PRESETS.some(r => r.id === resolutionId))) {
        if (customDims && customDims.w && customDims.h) {
            return {
                w: sanitizeEvenDimension(customDims.w, 320, 7680),
                h: sanitizeEvenDimension(customDims.h, 180, 4320)
            };
        }
    }

    // 2. Exact dimension string like "3440x1440" or "2560X1080"
    if (typeof resolutionId === 'string' && (resolutionId.includes('x') || resolutionId.includes('X') || resolutionId.includes('×'))) {
        const parsed = parseResolutionString(resolutionId);
        if (parsed) return parsed;
    }

    // 3. Preset resolutions matching standard aspects
    if (aspectId === '16:9') {
        switch (resolutionId) {
            case '4K': return { w: 3840, h: 2160 };
            case '2K': return { w: 2560, h: 1440 };
            case 'HD': return { w: 1280, h: 720 };
            case 'FHD':
            default:   return { w: 1920, h: 1080 };
        }
    }
    if (aspectId === '16:10') {
        switch (resolutionId) {
            case '4K': return { w: 3840, h: 2400 };
            case '2K': return { w: 2560, h: 1600 };
            case 'HD': return { w: 1280, h: 800 };
            case 'FHD':
            default:   return { w: 1920, h: 1200 };
        }
    }
    if (aspectId === '19:10') {
        switch (resolutionId) {
            case '4K': return { w: 4104, h: 2160 };
            case '2K': return { w: 2736, h: 1440 };
            case 'HD': return { w: 1368, h: 720 };
            case 'FHD':
            default:   return { w: 2052, h: 1080 };
        }
    }
    if (aspectId === '21:9') {
        switch (resolutionId) {
            case '4K': return { w: 5120, h: 2160 };
            case '2K': return { w: 3440, h: 1440 };
            case 'HD': return { w: 1720, h: 720 };
            case 'FHD':
            default:   return { w: 2560, h: 1080 };
        }
    }
    if (aspectId === '32:9') {
        switch (resolutionId) {
            case '4K': return { w: 7680, h: 2160 };
            case '2K': return { w: 5120, h: 1440 };
            case 'HD': return { w: 2560, h: 720 };
            case 'FHD':
            default:   return { w: 3840, h: 1080 };
        }
    }
    if (aspectId === '4:3') {
        switch (resolutionId) {
            case '4K': return { w: 2880, h: 2160 };
            case '2K': return { w: 1920, h: 1440 };
            case 'HD': return { w: 960, h: 720 };
            case 'FHD':
            default:   return { w: 1440, h: 1080 };
        }
    }

    const aspectObj = ASPECT_PRESETS.find(a => a.id === aspectId);
    const ratio = aspectObj ? aspectObj.ratio : (parseAspectRatioString(aspectId) || (16 / 9));
    const baseH = resolutionId === '4K' ? 2160 : resolutionId === '2K' ? 1440 : resolutionId === 'HD' ? 720 : 1080;
    let w = Math.round(baseH * ratio);
    w -= (w % 2);
    return { w, h: baseH };
}

/**
 * Returns a human-readable tactical aspect ratio label.
 * @param {number} w Width
 * @param {number} h Height
 * @returns {string}
 */
export function getReadableAspectRatio(w, h) {
    if (!w || !h || w <= 0 || h <= 0) return '16:9';
    const ratio = w / h;
    if (Math.abs(ratio - (16 / 9)) < 0.04) return '16:9';
    if (Math.abs(ratio - (16 / 10)) < 0.04) return '16:10';
    if (Math.abs(ratio - (19 / 10)) < 0.04) return '19:10';
    if (Math.abs(ratio - (4 / 3)) < 0.04) return '4:3';
    if (Math.abs(ratio - (21 / 9)) < 0.06) return '21:9';
    if (Math.abs(ratio - (32 / 9)) < 0.08) return '32:9';
    if (Math.abs(ratio - (5 / 4)) < 0.04) return '5:4';
    if (Math.abs(ratio - (9 / 16)) < 0.04) return '9:16';
    if (Math.abs(ratio - 1) < 0.04) return '1:1';
    return `${ratio.toFixed(2)}:1`;
}
