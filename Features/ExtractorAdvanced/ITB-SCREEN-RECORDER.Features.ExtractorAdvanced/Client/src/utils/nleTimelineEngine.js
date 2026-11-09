// ==========================================
// File: Features/ExtractorAdvanced/Client/src/utils/nleTimelineEngine.js
// Enterprise NLE Timeline Engine (Adobe Premiere-Style Keyframing & Interpolation)
// High-Precision Keyframe Synthesis, Dynamic Interpolation, Transitions & Layers
// ==========================================

/**
 * Clamps numeric value to [min, max]
 */
export function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
}

/**
 * Standard cubic ease-in-out curve for organic video transitions
 */
export function cubicEaseInOut(t) {
    const clamped = clamp(t, 0, 1);
    return clamped < 0.5
        ? 4 * clamped * clamped * clamped
        : 1 - Math.pow(-2 * clamped + 2, 3) / 2;
}

/**
 * Resolves the currently active keyframe index based on playhead epoch timestamp.
 * Includes a small 100ms lookahead tolerance for smooth boundary transitions.
 */
export function resolveActiveKeyframeIndex(keyframes, currentEpochMs) {
    if (!Array.isArray(keyframes) || keyframes.length === 0) return 0;
    let activeIdx = 0;
    for (let i = 0; i < keyframes.length; i++) {
        if (keyframes[i].timestampEpochMs <= currentEpochMs + 100) {
            activeIdx = i;
        } else {
            break;
        }
    }
    return Math.min(activeIdx, keyframes.length - 1);
}

/**
 * Computes interpolated placements for live playback across keyframes.
 * Handles:
 * - Position (X, Y) and Dimension (Width, Height) morphing
 * - Rotation angle interpolation
 * - Mid-stream station introduction (fades in from 0 to 1 opacity)
 * - Mid-stream station pruning / deletion (fades out from 1 to 0 opacity)
 * - Transition types: 'smooth' (cubic easing), 'linear' (linear lerp), 'cut' (step function)
 */
export function interpolateKeyframePlacements({
    keyframes = [],
    currentEpochMs = 0,
    currentPlacements = [],
    isEditing = false
}) {
    if (isEditing || !Array.isArray(keyframes) || keyframes.length <= 1) {
        return currentPlacements;
    }

    let kfA = keyframes[0];
    let kfB = keyframes[0];

    for (let i = 0; i < keyframes.length; i++) {
        if (keyframes[i].timestampEpochMs <= currentEpochMs) {
            kfA = keyframes[i];
            kfB = keyframes[i + 1] || keyframes[i];
        } else {
            if (kfB === kfA && keyframes[i]) {
                kfB = keyframes[i];
            }
            break;
        }
    }

    if (kfA === kfB) {
        return kfA.layout?.placements || currentPlacements;
    }

    const transDurMs = Math.max(100, (kfB.transitionDurationSec || 0.5) * 1000);
    const transType = kfB.transitionType || 'smooth';
    const transStartEpoch = kfB.timestampEpochMs - transDurMs;

    if (currentEpochMs < transStartEpoch) {
        return kfA.layout?.placements || currentPlacements;
    }
    if (currentEpochMs >= kfB.timestampEpochMs) {
        return kfB.layout?.placements || currentPlacements;
    }

    if (transType === 'cut') {
        return kfA.layout?.placements || currentPlacements;
    }

    const rawRatio = (currentEpochMs - transStartEpoch) / transDurMs;
    const ratio = clamp(rawRatio, 0, 1);
    const tEased = transType === 'linear' ? ratio : cubicEaseInOut(ratio);

    const aPlacements = kfA.layout?.placements || [];
    const bPlacements = kfB.layout?.placements || [];

    const result = bPlacements.map(pB => {
        const pA = aPlacements.find(x => x.stationId === pB.stationId && x.displayId === pB.displayId);
        if (!pA) {
            // Newly introduced station mid-stream! Fade in with easing
            return {
                ...pB,
                opacity: Math.max(0.05, tEased)
            };
        }

        const interpX = Math.round(pA.x + (pB.x - pA.x) * tEased);
        const interpY = Math.round(pA.y + (pB.y - pA.y) * tEased);
        const interpW = Math.round(pA.width + (pB.width - pA.width) * tEased);
        const interpH = Math.round(pA.height + (pB.height - pA.height) * tEased);
        const interpRot = Number(((pA.rotation || 0) + ((pB.rotation || 0) - (pA.rotation || 0)) * tEased).toFixed(1));

        return {
            ...pB,
            x: interpX,
            y: interpY,
            width: interpW,
            height: interpH,
            rotation: interpRot,
            opacity: 1
        };
    });

    // Fade out windows removed in kfB during transition
    aPlacements.forEach(pA => {
        const stillInB = bPlacements.some(x => x.stationId === pA.stationId && x.displayId === pA.displayId);
        if (!stillInB) {
            result.push({
                ...pA,
                opacity: Math.max(0, 1 - tEased)
            });
        }
    });

    return result;
}

/**
 * Premiere-Style Auto-Keyframe Synthesis
 * When layout modifications occur (feed added, moved, resized, preset applied, or feed pruned):
 * 1. Near origin (t <= baseEpochMs + tolerance): Updates root keyframe 0 in place.
 * 2. Near existing keyframe (within tolerance): Updates existing keyframe in place.
 * 3. Mid-stream (t > baseEpochMs + tolerance): Automatically creates a new keyframe at the exact playhead epoch,
 *    preserving preceding keyframes and layout state!
 */
export function synthesizeAutoKeyframe({
    prevTimeline,
    newPlacements,
    currentEpochMs,
    baseEpochMs,
    toleranceMs = 500,
    virtualW = 1920,
    virtualH = 1080,
    fps = 30.0,
    utcClockPosition = null
}) {
    const nextKfs = [...(prevTimeline?.keyframes || [])];

    // CASE 0: Empty timeline -> Initialize Root Keyframe
    if (nextKfs.length === 0) {
        const resolvedClock = utcClockPosition || 'top-right';
        const initialKf = {
            id: `kf_root_${Date.now()}`,
            timestampEpochMs: baseEpochMs,
            transitionDurationSec: 0.5,
            transitionType: 'smooth',
            utcClockPosition: resolvedClock,
            layout: {
                width: virtualW,
                height: virtualH,
                backgroundColor: '#070A10',
                fps,
                utcClockPosition: resolvedClock,
                placements: newPlacements
            }
        };
        const nextTimeline = { ...(prevTimeline || {}), keyframes: [initialKf] };
        return {
            nextTimeline,
            newIndex: 0,
            isNewKeyframe: true,
            activeKeyframe: initialKf
        };
    }
    // CASE 1: Near existing keyframe (within tolerance) -> Edit in place
    const closeIdx = nextKfs.findIndex(k => Math.abs(k.timestampEpochMs - currentEpochMs) <= toleranceMs);
    if (closeIdx >= 0) {
        const existingClock = nextKfs[closeIdx].utcClockPosition || nextKfs[closeIdx].layout?.utcClockPosition;
        const targetClock = utcClockPosition || existingClock || 'top-right';
        nextKfs[closeIdx] = {
            ...nextKfs[closeIdx],
            utcClockPosition: targetClock,
            layout: {
                ...nextKfs[closeIdx].layout,
                width: virtualW,
                height: virtualH,
                utcClockPosition: targetClock,
                placements: newPlacements
            }
        };
        const nextTimeline = { ...prevTimeline, keyframes: nextKfs };
        return {
            nextTimeline,
            newIndex: closeIdx,
            isNewKeyframe: false,
            activeKeyframe: nextKfs[closeIdx]
        };
    }

    // CASE 2: Near origin (within tolerance of baseEpochMs) -> Edit root keyframe in place
    if (currentEpochMs <= baseEpochMs + toleranceMs) {
        const existingClock = nextKfs[0].utcClockPosition || nextKfs[0].layout?.utcClockPosition;
        const targetClock = utcClockPosition || existingClock || 'top-right';
        nextKfs[0] = {
            ...nextKfs[0],
            utcClockPosition: targetClock,
            layout: {
                ...nextKfs[0].layout,
                width: virtualW,
                height: virtualH,
                utcClockPosition: targetClock,
                placements: newPlacements
            }
        };
        const nextTimeline = { ...prevTimeline, keyframes: nextKfs };
        return {
            nextTimeline,
            newIndex: 0,
            isNewKeyframe: false,
            activeKeyframe: nextKfs[0]
        };
    }

    // CASE 3: Mid-stream Auto-Keyframe Synthesis (NLE Premiere-Style)
    const prevKf = [...nextKfs].reverse().find(k => k.timestampEpochMs <= currentEpochMs) || nextKfs[0];
    const targetClock = utcClockPosition || prevKf?.utcClockPosition || prevKf?.layout?.utcClockPosition || 'top-right';
    const newKf = {
        id: `kf_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        timestampEpochMs: Math.round(currentEpochMs),
        transitionDurationSec: 0.5,
        transitionType: 'smooth',
        utcClockPosition: targetClock,
        layout: {
            width: virtualW,
            height: virtualH,
            backgroundColor: '#070A10',
            fps,
            utcClockPosition: targetClock,
            placements: newPlacements
        }
    };

    const sortedKfs = [...nextKfs, newKf].sort((a, b) => a.timestampEpochMs - b.timestampEpochMs);
    const newIndex = sortedKfs.findIndex(k => k.id === newKf.id);
    const nextTimeline = { ...prevTimeline, keyframes: sortedKfs };

    return {
        nextTimeline,
        newIndex: newIndex >= 0 ? newIndex : 0,
        isNewKeyframe: true,
        activeKeyframe: newKf
    };
}

/**
 * Updates transition properties (type, duration) of a specified keyframe
 */
export function updateKeyframeTransition(timeline, keyframeIndex, { transitionType, transitionDurationSec }) {
    if (!timeline || !Array.isArray(timeline.keyframes) || keyframeIndex < 0 || keyframeIndex >= timeline.keyframes.length) {
        return timeline;
    }

    const nextKfs = [...timeline.keyframes];
    const targetKf = nextKfs[keyframeIndex];

    nextKfs[keyframeIndex] = {
        ...targetKf,
        ...(transitionType !== undefined ? { transitionType } : {}),
        ...(transitionDurationSec !== undefined ? { transitionDurationSec: Math.max(0.1, Number(transitionDurationSec)) } : {})
    };

    return {
        ...timeline,
        keyframes: nextKfs
    };
}

/**
 * Updates the clock position of a specified keyframe
 */
export function updateKeyframeClockPosition(timeline, keyframeIndex, newClockPosition) {
    if (!timeline || !Array.isArray(timeline.keyframes) || keyframeIndex < 0 || keyframeIndex >= timeline.keyframes.length) {
        return timeline;
    }

    const nextKfs = [...timeline.keyframes];
    const targetKf = nextKfs[keyframeIndex];
    const resolvedPos = newClockPosition || 'top-right';

    nextKfs[keyframeIndex] = {
        ...targetKf,
        utcClockPosition: resolvedPos,
        layout: {
            ...(targetKf.layout || {}),
            utcClockPosition: resolvedPos
        }
    };

    return {
        ...timeline,
        keyframes: nextKfs
    };
}

/**
 * Resolves the effective UTC clock position at a given epoch based on keyframe chronology.
 */
export function resolveActiveKeyframeClockPosition(keyframes, currentEpochMs, defaultPosition = 'top-right') {
    if (!Array.isArray(keyframes) || keyframes.length === 0) {
        return defaultPosition;
    }
    const sorted = [...keyframes].sort((a, b) => a.timestampEpochMs - b.timestampEpochMs);
    let activePos = sorted[0].utcClockPosition || sorted[0].layout?.utcClockPosition || defaultPosition;
    for (const kf of sorted) {
        if (kf.timestampEpochMs <= currentEpochMs) {
            activePos = kf.utcClockPosition || kf.layout?.utcClockPosition || activePos;
        } else {
            break;
        }
    }
    return activePos;
}

/**
 * Safely deletes a keyframe (protecting Keyframe 0 root)
 */
export function deleteKeyframe(timeline, keyframeIndex) {
    if (!timeline || !Array.isArray(timeline.keyframes) || keyframeIndex <= 0 || keyframeIndex >= timeline.keyframes.length) {
        return {
            nextTimeline: timeline,
            success: false,
            newIndex: Math.max(0, keyframeIndex || 0)
        };
    }

    const nextKfs = timeline.keyframes.filter((_, idx) => idx !== keyframeIndex);
    const newIndex = Math.max(0, keyframeIndex - 1);

    return {
        nextTimeline: {
            ...timeline,
            keyframes: nextKfs
        },
        success: true,
        newIndex
    };
}

/**
 * Inserts explicit keyframe at current epoch if none exists within tolerance
 */
export function insertExplicitKeyframe(timeline, currentEpochMs, activeLayout, toleranceMs = 500) {
    const keyframes = timeline?.keyframes || [];
    const existingIdx = keyframes.findIndex(k => Math.abs(k.timestampEpochMs - currentEpochMs) <= toleranceMs);
    if (existingIdx >= 0) {
        return {
            nextTimeline: timeline,
            newIndex: existingIdx,
            isNew: false
        };
    }

    const prevKf = [...keyframes].reverse().find(k => k.timestampEpochMs <= currentEpochMs) || keyframes[0];
    const targetClock = activeLayout?.utcClockPosition || prevKf?.utcClockPosition || prevKf?.layout?.utcClockPosition || 'top-right';

    const clonedLayout = activeLayout ? JSON.parse(JSON.stringify(activeLayout)) : {};
    clonedLayout.utcClockPosition = targetClock;

    const newKf = {
        id: `kf_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        timestampEpochMs: Math.round(currentEpochMs),
        transitionDurationSec: 0.5,
        transitionType: 'smooth',
        utcClockPosition: targetClock,
        layout: clonedLayout
    };

    const nextKfs = [...keyframes, newKf].sort((a, b) => a.timestampEpochMs - b.timestampEpochMs);
    const newIdx = nextKfs.findIndex(k => k.id === newKf.id);

    return {
        nextTimeline: {
            ...timeline,
            keyframes: nextKfs
        },
        newIndex: newIdx >= 0 ? newIdx : 0,
        isNew: true
    };
}

/**
 * Fits a media rectangle of given aspect ratio inside a bounding grid cell preserving aspect
 */
export function fitInCell(cellX, cellY, cellW, cellH, aspect) {
    const safeAspect = aspect > 0 ? aspect : (16 / 9);
    const cellAspect = cellW / cellH;
    let w, h, x, y;
    if (safeAspect >= cellAspect) {
        w = cellW;
        h = Math.round(w / safeAspect);
        x = cellX;
        y = cellY + Math.round((cellH - h) / 2);
    } else {
        h = cellH;
        w = Math.round(h * safeAspect);
        x = cellX + Math.round((cellW - w) / 2);
        y = cellY;
    }
    return { x, y, width: w, height: h };
}

export const DEFAULT_CANVAS_SLOT_BORDER_COLORS = [
    '#06B6D4', // Cyan
    '#10B981', // Emerald
    '#F59E0B', // Amber
    '#F43F5E', // Rose
    '#A855F7', // Purple
    '#38BDF8'  // Sky
];

/**
 * Computes deterministic bounding cells for packing `count` video feeds onto [W, H].
 */
export function getPackCells(count, W, H) {
    if (count <= 0) return [];

    const isUltrawide = (W / H) >= 2.5;

    // Dynamically resolve columns as a single variable
    const cols = count === 1 ? 1
        : count === 2 ? 2
        : count === 3 && isUltrawide ? 3
        : count <= 4 ? 2
        : count <= 6 ? 3
        : count <= 8 ? 4
        : Math.ceil(Math.sqrt(count));

    const rows = Math.ceil(count / cols);
    const cellW = Math.round(W / cols);
    const cellH = Math.round(H / rows);

    return Array.from({ length: count }, (_, i) => {
        const r = Math.floor(i / cols);
        const c = i % cols;
        // Center any remaining items in an incomplete last row
        const itemsInRow = (r === rows - 1 && count % cols !== 0) ? (count % cols) : cols;
        const rowOffsetX = Math.round((cols - itemsInRow) * cellW / 2);

        return {
            cx: rowOffsetX + c * cellW,
            cy: r * cellH,
            cw: cellW,
            ch: cellH
        };
    });
}

/**
 * Creates a standard placement object fitted inside a cell.
 */
export function createPlacementFromFeed(f, idx, cell, totalCount = 2, borderColors = DEFAULT_CANVAS_SLOT_BORDER_COLORS) {
    const aspect = f.nativeAspectRatio || (f.sourceWidth && f.sourceHeight ? f.sourceWidth / f.sourceHeight : 16 / 9);
    const { x, y, width, height } = fitInCell(cell.cx, cell.cy, cell.cw, cell.ch, aspect);

    return {
        ...f,
        x,
        y,
        width,
        height,
        sourceWidth: f.sourceWidth || 1920,
        sourceHeight: f.sourceHeight || 1080,
        nativeAspectRatio: aspect,
        aspectRatio: aspect,
        zIndex: idx,
        rotation: 0,
        borderWidth: totalCount === 1 ? 0 : 2,
        borderColor: borderColors[idx % borderColors.length],
        shadowEffect: 'deep',
        borderRadius: 0
    };
}

/**
 * Auto-packs feeds onto a virtual canvas stage according to aspect ratio and feed count.
 * Strictly packs ONLY the feeds passed into the argument.
 */
export function generateAutoPackPlacements(feeds, W = 1920, H = 1080, borderColors = DEFAULT_CANVAS_SLOT_BORDER_COLORS) {
    const count = feeds ? feeds.length : 0;
    if (count === 0) return [];

    const cells = getPackCells(count, W, H);
    return feeds.slice(0, count).map((f, idx) => createPlacementFromFeed(f, idx, cells[idx], count, borderColors));
}

/**
 * Invariant (Rule 13 & 2026-11-04 Update):
 * 1. Screen switches (cuts) within any gap region (local or global) are merged into preceding segments to eliminate mid-gap jitter.
 * 2. Auto-Director is strictly forbidden from selecting or covering GLOBAL GAP regions.
 *    Global gaps must remain completely unselected ('לא בחורים').
 *    Local gaps (station-specific gaps with 'No Signal' synthetic slate) remain covered without cuts.
 */
export function cleanDirectorSegmentsWithGaps(
    rawSegments,
    stationGaps = [],
    globalGaps = [],
    cutStartEpoch = null,
    cutEndEpoch = null,
    primaryDisplayId = 'mon-0'
) {
    let segs = Array.isArray(rawSegments) ? rawSegments.map(s => ({
        ...s,
        startEpochMs: s.startEpochMs ?? s.StartEpochMs ?? 0,
        endEpochMs: s.endEpochMs ?? s.EndEpochMs ?? 0,
        targetDisplayId: (s.targetDisplayId || s.TargetDisplayId || primaryDisplayId || 'mon-0').toLowerCase()
    })).sort((a, b) => a.startEpochMs - b.startEpochMs) : [];

    // 0. Ensure full coverage across the active CUT region [cutStartEpoch, cutEndEpoch]:
    // Invariant (2026-11-05): When the user expands or adjusts the cut area, Auto-Director must
    // dynamically plan transitions across the entire delta so that all active media inside the cut is covered.
    if (cutStartEpoch !== null && cutEndEpoch !== null && cutEndEpoch > cutStartEpoch) {
        if (segs.length === 0) {
            segs.push({
                startEpochMs: cutStartEpoch,
                endEpochMs: cutEndEpoch,
                targetDisplayId: (primaryDisplayId || 'mon-0').toLowerCase(),
                isManualOverride: false
            });
        } else {
            // Delta before first segment: extend first segment backwards
            if (segs[0].startEpochMs > cutStartEpoch) {
                segs[0].startEpochMs = cutStartEpoch;
            }

            // Delta after last segment: extend last segment forwards
            if (segs[segs.length - 1].endEpochMs < cutEndEpoch) {
                segs[segs.length - 1].endEpochMs = cutEndEpoch;
            }

            // Internal deltas between segments: bridge contiguous edges
            for (let i = 0; i < segs.length - 1; i++) {
                if (segs[i + 1].startEpochMs > segs[i].endEpochMs) {
                    segs[i].endEpochMs = segs[i + 1].startEpochMs;
                }
            }
        }
    }

    // 1. Subtract GLOBAL GAPS completely:
    // Invariant: Auto-Director is strictly forbidden from selecting or covering GLOBAL GAP regions.
    // Global gaps must remain completely unselected ('לא בחורים').
    const activeGlobalGaps = [];
    if (Array.isArray(globalGaps) && globalGaps.length > 0) {
        globalGaps.forEach(g => {
            const gs = g.startEpochMs ?? g.StartEpochMs ?? g.startEpoch ?? 0;
            const ge = g.endEpochMs ?? g.EndEpochMs ?? g.endEpoch ?? 0;
            if (ge > gs) activeGlobalGaps.push({ startEpoch: gs, endEpoch: ge });
        });
    }
    if (Array.isArray(stationGaps)) {
        stationGaps.filter(g => g.type === 'global').forEach(g => {
            const gs = g.startEpochMs ?? g.startEpoch ?? 0;
            const ge = g.endEpochMs ?? g.endEpoch ?? 0;
            if (ge > gs && !activeGlobalGaps.some(ag => ag.startEpoch === gs && ag.endEpoch === ge)) {
                activeGlobalGaps.push({ startEpoch: gs, endEpoch: ge });
            }
        });
    }

    activeGlobalGaps.forEach(g => {
        const gStart = g.startEpoch;
        const gEnd = g.endEpoch;
        const newSegs = [];

        segs.forEach(s => {
            if (s.endEpochMs <= gStart || s.startEpochMs >= gEnd) {
                // No overlap
                newSegs.push(s);
            } else {
                // Overlaps with global gap
                if (s.startEpochMs < gStart) {
                    newSegs.push({
                        ...s,
                        endEpochMs: gStart
                    });
                }
                if (s.endEpochMs > gEnd) {
                    newSegs.push({
                        ...s,
                        startEpochMs: gEnd
                    });
                }
                // The region [gStart, gEnd] is left completely empty / unselected!
            }
        });

        segs = newSegs;
    });

    // 2. Merge cuts inside local gaps (station-specific gaps) so screens do not switch mid-gap
    const localGaps = (stationGaps || []).filter(g => g.type !== 'global');
    localGaps.forEach(gap => {
        const gStart = gap.startEpochMs ?? gap.StartEpochMs ?? gap.startEpoch ?? 0;
        const gEnd = gap.endEpochMs ?? gap.EndEpochMs ?? gap.endEpoch ?? 0;
        if (!gStart || !gEnd || gEnd <= gStart) return;

        for (let i = segs.length - 1; i > 0; i--) {
            const cutEpoch = segs[i].startEpochMs;
            if (cutEpoch >= gStart && cutEpoch <= gEnd && segs[i].startEpochMs === segs[i - 1].endEpochMs) {
                segs[i - 1].endEpochMs = segs[i].endEpochMs;
                segs.splice(i, 1);
            }
        }
    });

    // 3. Merge contiguous segments that share the same targetDisplayId and touch exactly
    for (let i = segs.length - 1; i > 0; i--) {
        if (segs[i].targetDisplayId === segs[i - 1].targetDisplayId && segs[i].startEpochMs === segs[i - 1].endEpochMs) {
            segs[i - 1].endEpochMs = segs[i].endEpochMs;
            segs.splice(i, 1);
        }
    }

    return segs;
}
