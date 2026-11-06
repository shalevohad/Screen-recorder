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
 * Computes deterministic, even-integer virtual canvas bounds based on decoupled resolution and aspect ratio.
 * @param {string} resolutionId '4K' | '2K' | 'FHD' | 'HD'
 * @param {string} aspectId '16:9' | '16:10' | '19:10' | '21:9' | '32:9' | '4:3'
 * @returns {{ w: number, h: number }}
 */
export function computeCanvasDimensions(resolutionId = '2K', aspectId = '16:9') {
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
    const ratio = aspectObj ? aspectObj.ratio : (16 / 9);
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
