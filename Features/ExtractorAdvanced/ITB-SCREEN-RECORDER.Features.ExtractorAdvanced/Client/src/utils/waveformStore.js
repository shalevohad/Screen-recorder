// ==========================================
// File: Features/ExtractorAdvanced/Client/src/utils/waveformStore.js
// Tactical Audio Waveform Store & SVG Envelope Generator
// High-Performance In-Memory Peak Caching & Mirrored Acoustic Polygon Rendering
// ==========================================

const _waveformCache = new Map();
const _inFlightRequests = new Map();

/**
 * Normalizes epoch timestamps into cache key
 */
function makeWaveformKey(stationId, startEpoch, endEpoch, points = 200) {
    return `${(stationId || '').toLowerCase()}_${Math.round(startEpoch)}_${Math.round(endEpoch)}_${points}`;
}

export const waveformStore = {
    /**
     * Gets cached waveform peaks synchronously if already fetched.
     */
    get(stationId, startEpoch, endEpoch, points = 200) {
        const key = makeWaveformKey(stationId, startEpoch, endEpoch, points);
        return _waveformCache.get(key) || null;
    },

    /**
     * Asynchronously fetches acoustic peaks from the server.
     * Deduplicates in-flight calls and caches responses in memory.
     */
    async fetchWaveform(stationId, startEpoch, endEpoch, signal = null, points = 200) {
        if (!stationId || endEpoch <= startEpoch) return null;
        const key = makeWaveformKey(stationId, startEpoch, endEpoch, points);

        if (_waveformCache.has(key)) {
            return _waveformCache.get(key);
        }

        if (_inFlightRequests.has(key)) {
            return _inFlightRequests.get(key);
        }

        const fetchPromise = (async () => {
            try {
                const url = `/api/v1/extractor-advanced/audio-waveform?stationId=${encodeURIComponent(stationId)}&startEpoch=${Math.round(startEpoch)}&endEpoch=${Math.round(endEpoch)}&points=${points}`;
                const res = await fetch(url, { signal });
                if (!res.ok) {
                    if (res.status === 204) return null;
                    throw new Error(`HTTP ${res.status}`);
                }

                const peaks = await res.json();
                if (Array.isArray(peaks) && peaks.length > 0) {
                    _waveformCache.set(key, peaks);
                    return peaks;
                }
            } catch (err) {
                if (err.name !== 'AbortError') {
                    // Cache a flat fallback to avoid thrashing on network/recording voids
                    const fallback = new Array(points).fill(0.03);
                    _waveformCache.set(key, fallback);
                    return fallback;
                }
            } finally {
                _inFlightRequests.delete(key);
            }
            return null;
        })();

        _inFlightRequests.set(key, fetchPromise);
        return fetchPromise;
    },

    /**
     * Clears cached waveforms (e.g. on project change)
     */
    clear() {
        _waveformCache.clear();
        _inFlightRequests.clear();
    }
};

/**
 * Generates an SVG path data string representing a professional mirrored acoustic envelope.
 * 
 * @param {number[]} peaks - Normalized peak amplitudes (0.0 to 1.0)
 * @param {number} width - Target width in SVG viewBox units (default 100)
 * @param {number} height - Target height in SVG viewBox units (default 24)
 * @param {number} gain - Gain multiplier (e.g. 1.0 = 100%, 1.5 = 150%)
 * @returns {string} SVG Path string 'M... L... Z'
 */
export function generateWaveformSvgPath(peaks, width = 100, height = 24, gain = 1.0) {
    if (!peaks || !Array.isArray(peaks) || peaks.length === 0) {
        const mid = height / 2;
        return `M 0,${mid} L ${width},${mid}`;
    }

    const n = peaks.length;
    const mid = height / 2;
    const maxHalfHeight = (height / 2) - 1.5;
    const step = width / Math.max(1, n - 1);
    const effectiveGain = Math.max(0, Math.min(3.0, Number(gain) || 1.0));

    // Top envelope (left to right)
    let topD = '';
    for (let i = 0; i < n; i++) {
        const x = i * step;
        const amp = Math.min(1.0, Math.max(0.02, (peaks[i] || 0) * effectiveGain));
        const y = mid - (amp * maxHalfHeight);
        topD += (i === 0 ? `M ${x.toFixed(2)},${y.toFixed(2)}` : ` L ${x.toFixed(2)},${y.toFixed(2)}`);
    }

    // Bottom envelope (right to left)
    let botD = '';
    for (let i = n - 1; i >= 0; i--) {
        const x = i * step;
        const amp = Math.min(1.0, Math.max(0.02, (peaks[i] || 0) * effectiveGain));
        const y = mid + (amp * maxHalfHeight);
        botD += ` L ${x.toFixed(2)},${y.toFixed(2)}`;
    }

    return `${topD}${botD} Z`;
}
