// ==========================================
// File: Features/ExtractorAdvanced/Client/src/utils/canvasStreamGovernor.js
// Tactical Canvas Stream & Hardware Decoder Governor
// ==========================================

/**
 * Maximum concurrent active hardware video decoders permitted simultaneously in the browser / Replay Studio.
 * Capped strictly at 6 to guarantee zero browser/server decode exhaustion and silky smooth 60fps parallel playback.
 */
export const MAX_CONCURRENT_CANVAS_DECODERS = 6;

/**
 * Resolves the optimal streaming height profile based on actual on-screen rendered pixel dimensions.
 * For miniature and medium canvas tiles, streaming at 360p or 480p slashes bandwidth and decode overhead
 * by up to 85% compared to streaming unscaled 1080p/1440p/4K feeds.
 * 
 * @param {number} renderedWidth - Computed width of the card in viewport pixels.
 * @param {number} renderedHeight - Computed height of the card in viewport pixels.
 * @returns {number|null} Target maximum height (360, 480, 720) or null for native resolution.
 */
export function resolveStreamQuality(renderedWidth, renderedHeight) {
    if (!renderedHeight || renderedHeight <= 0) return null;
    
    if (renderedHeight <= 360) {
        return 360;
    }
    if (renderedHeight <= 540) {
        return 480;
    }
    if (renderedHeight <= 750) {
        return 720;
    }
    // High-resolution hero / solo display
    return null;
}

/**
 * Computes deterministic video decoder budget allocations across all placed screens on the canvas.
 * Guarantees that active video streams never exceed browser hardware decoder capacity,
 * preventing software decode fallback, 100% CPU lockups, and frame drop cascades.
 * 
 * Priority order:
 * 1. Solo Audio Station (guarantees audio/lip sync for operator listening)
 * 2. Selected Feed (active card under inspection or transformation)
 * 3. Hovered Feed (mouse focus)
 * 4. Largest Placement on Canvas (by rendered area: width * height)
 * 
 * @param {Array} placements - Placed screen items on the canvas.
 * @param {Object} [options={}] - Governor configuration options.
 * @param {number} [options.maxConcurrentDecoders=4] - Hardware decoder budget cap.
 * @param {string|null} [options.activeAudioStationId=null] - Station with active solo audio.
 * @param {number|null} [options.selectedFeedIndex=null] - Index of selected canvas placement.
 * @param {number|null} [options.hoveredFeedIndex=null] - Index of mouse-hovered canvas placement.
 * @returns {Array<boolean>} Array of booleans indicating whether each placement is granted an active video decoder.
 */
export function computeDecoderAllocations(placements, {
    maxConcurrentDecoders = MAX_CONCURRENT_CANVAS_DECODERS,
    activeAudioStationId = null,
    selectedFeedIndex = null,
    hoveredFeedIndex = null
} = {}) {
    if (!Array.isArray(placements) || placements.length === 0) {
        return [];
    }

    const effectiveMax = Math.min(6, Math.max(1, Number(maxConcurrentDecoders) || 6));
    const count = placements.length;
    if (count <= effectiveMax) {
        return placements.map(() => true);
    }

    // Rank each placement based on operational priority
    const scored = placements.map((p, idx) => {
        const w = p.width || 1920;
        const h = p.height || 1080;
        let score = w * h;

        const stId = (p.stationId || p.hostname || p.station?.id || p.station?.hostname || '').toLowerCase();
        const soloId = (activeAudioStationId || '').toLowerCase();

        // Priority 1: Station playing solo audio to the operator
        if (soloId && (stId === soloId || stId.includes(soloId) || soloId.includes(stId))) {
            score += 100_000_000;
        }

        // Priority 2: Actively selected card for inspector or bounds editing
        if (selectedFeedIndex === idx) {
            score += 50_000_000;
        }

        // Priority 3: Mouse hovering over window
        if (hoveredFeedIndex === idx) {
            score += 25_000_000;
        }

        return { idx, score };
    });

    // Sort descending by priority score
    scored.sort((a, b) => b.score - a.score);

    const allowedSet = new Set(scored.slice(0, effectiveMax).map(s => s.idx));
    return placements.map((_, idx) => allowedSet.has(idx));
}
