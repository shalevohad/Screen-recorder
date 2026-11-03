// ==========================================
// File: Features/ExtractorAdvanced/Client/src/utils/audioLevelMonitor.js
// Enterprise Tactical Real-Time Audio Level & Web Audio Gain Monitor
// ==========================================

let sharedAudioCtx = null;
let activeMonitoredVideo = null;
let rafId = null;
let currentRms = 0;
let currentPeak = 0;
let currentDb = -60;
let currentGain = 1.0;

/**
 * Returns or initializes the shared browser AudioContext safely.
 */
export function getSharedAudioContext() {
    if (!sharedAudioCtx) {
        const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
        if (AudioCtxClass) {
            sharedAudioCtx = new AudioCtxClass();
        }
    }
    if (sharedAudioCtx && sharedAudioCtx.state === 'suspended') {
        sharedAudioCtx.resume().catch(() => {});
    }
    return sharedAudioCtx;
}

/**
 * Attaches real-time Web Audio analysis and Gain boost to an HTMLMediaElement (video/audio).
 */
export function attachVideoAudio(videoEl, gain = 1.0) {
    if (!videoEl) return null;
    currentGain = (typeof gain === 'number' && gain >= 0) ? gain : 1.0;

    try {
        const ctx = getSharedAudioContext();
        if (!ctx) return null;

        let srcNode = videoEl.__audioSourceNode;
        let gainNode = videoEl.__audioGainNode;
        let analyserNode = videoEl.__audioAnalyserNode;

        if (!srcNode) {
            try {
                srcNode = ctx.createMediaElementSource(videoEl);
                gainNode = ctx.createGain();
                analyserNode = ctx.createAnalyser();
                analyserNode.fftSize = 256;
                analyserNode.smoothingTimeConstant = 0.5;

                srcNode.connect(gainNode);
                gainNode.connect(analyserNode);
                analyserNode.connect(ctx.destination);

                videoEl.__audioSourceNode = srcNode;
                videoEl.__audioGainNode = gainNode;
                videoEl.__audioAnalyserNode = analyserNode;
            } catch (attachErr) {
                // In case element was already attached or cross-origin restricted
                console.warn('[AudioLevelMonitor] createMediaElementSource warning:', attachErr);
            }
        }

        if (gainNode) {
            gainNode.gain.setValueAtTime(currentGain, ctx.currentTime);
        }

        activeMonitoredVideo = videoEl;
        startLevelMonitorLoop();

        return { ctx, gainNode, analyserNode };
    } catch (err) {
        console.warn('[AudioLevelMonitor] Failed to attach video audio:', err);
        return null;
    }
}

/**
 * Updates the active gain boost in real-time.
 */
export function setAudioGain(gainValue) {
    currentGain = Math.max(0, Number(gainValue) || 1.0);
    if (activeMonitoredVideo?.__audioGainNode && sharedAudioCtx) {
        try {
            activeMonitoredVideo.__audioGainNode.gain.setValueAtTime(currentGain, sharedAudioCtx.currentTime);
        } catch (e) {
            // Ignore Web Audio schedule timing error
        }
    }
}

/**
 * Get the current instantaneous audio levels.
 */
export function getLiveAudioLevel() {
    return {
        rms: currentRms,
        peak: currentPeak,
        db: currentDb,
        gain: currentGain
    };
}

/**
 * Continuous 60fps RMS & Peak acoustic measurement loop.
 */
function startLevelMonitorLoop() {
    if (rafId) return;

    const timeData = new Uint8Array(256);

    const step = () => {
        const video = activeMonitoredVideo;
        const analyser = video?.__audioAnalyserNode;

        if (!video || !analyser || video.paused || video.ended || video.muted) {
            // Decay levels smoothly to zero when paused, muted or silent
            currentRms *= 0.85;
            currentPeak *= 0.85;
            if (currentRms < 0.001) currentRms = 0;
            if (currentPeak < 0.001) currentPeak = 0;
            currentDb = currentRms > 0.001 ? 20 * Math.log10(currentRms) : -60;
        } else {
            try {
                analyser.getByteTimeDomainData(timeData);
                let sumSquares = 0;
                let maxDev = 0;

                for (let i = 0; i < timeData.length; i++) {
                    const norm = (timeData[i] - 128) / 128; // -1.0 to 1.0
                    sumSquares += norm * norm;
                    const absNorm = Math.abs(norm);
                    if (absNorm > maxDev) maxDev = absNorm;
                }

                const measuredRms = Math.sqrt(sumSquares / timeData.length);
                // Smooth attack and release for organic VU response
                currentRms = measuredRms > currentRms 
                    ? currentRms * 0.3 + measuredRms * 0.7 
                    : currentRms * 0.85 + measuredRms * 0.15;

                currentPeak = Math.max(currentRms, maxDev);
                currentDb = currentRms > 0.0001 ? 20 * Math.log10(currentRms) : -60;
            } catch (e) {
                currentRms = 0;
                currentPeak = 0;
                currentDb = -60;
            }
        }

        // Broadcast level update to any subscribing UI components
        window.dispatchEvent(new CustomEvent('itb-live-audio-level', {
            detail: {
                rms: currentRms,
                peak: currentPeak,
                db: currentDb,
                gain: currentGain,
                isPlaying: Boolean(video && !video.paused && !video.muted)
            }
        }));

        rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
}

/**
 * Detach monitoring.
 */
export function stopLevelMonitor() {
    if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
    }
    activeMonitoredVideo = null;
    currentRms = 0;
    currentPeak = 0;
    currentDb = -60;
}
