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
    fps = 30.0
}) {
    const nextKfs = [...(prevTimeline?.keyframes || [])];

    // CASE 0: Empty timeline -> Initialize Root Keyframe
    if (nextKfs.length === 0) {
        const initialKf = {
            id: `kf_root_${Date.now()}`,
            timestampEpochMs: baseEpochMs,
            transitionDurationSec: 0.5,
            transitionType: 'smooth',
            layout: {
                width: virtualW,
                height: virtualH,
                backgroundColor: '#070A10',
                fps,
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
        nextKfs[closeIdx] = {
            ...nextKfs[closeIdx],
            layout: {
                ...nextKfs[closeIdx].layout,
                width: virtualW,
                height: virtualH,
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
        nextKfs[0] = {
            ...nextKfs[0],
            layout: {
                ...nextKfs[0].layout,
                width: virtualW,
                height: virtualH,
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
    const newKf = {
        id: `kf_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        timestampEpochMs: Math.round(currentEpochMs),
        transitionDurationSec: 0.5,
        transitionType: 'smooth',
        layout: {
            width: virtualW,
            height: virtualH,
            backgroundColor: '#070A10',
            fps,
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

    const newKf = {
        id: `kf_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        timestampEpochMs: Math.round(currentEpochMs),
        transitionDurationSec: 0.5,
        transitionType: 'smooth',
        layout: JSON.parse(JSON.stringify(activeLayout))
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
