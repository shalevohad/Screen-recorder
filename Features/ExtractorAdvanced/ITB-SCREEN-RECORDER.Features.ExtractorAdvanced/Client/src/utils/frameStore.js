// ==========================================
// File: Features/ExtractorAdvanced/Client/src/utils/frameStore.js
// ==========================================

const MAX_CACHE_SIZE = 600; // Maximum frame cache capacity in RAM
const QUANTIZE_MS = 250;    // Quantization step for smooth scrubbing against server probe

const frameCache = new Map();
const pendingPromises = new Map();
const listeners = new Set();

const MAX_CONCURRENT = 4; // Concurrency limit to prevent network and browser contention
let activeRequests = 0;
let requestQueue = [];

/**
 * Quantizes epoch timestamp to nearest quantization boundary.
 * 
 * @param {number} epochMs - Raw timestamp in milliseconds.
 * @returns {number} Quantized timestamp.
 */
function quantize(epochMs) {
    if (!epochMs || isNaN(epochMs)) return 0;
    return Math.round(epochMs / QUANTIZE_MS) * QUANTIZE_MS;
}

/**
 * Drains request queue prioritizing recent tasks (LIFO) within concurrency limits.
 */
function processQueue() {
    if (activeRequests >= MAX_CONCURRENT || requestQueue.length === 0) return;

    // Remove cancelled/aborted tasks
    requestQueue = requestQueue.filter(t => !t.signal?.aborted);

    while (activeRequests < MAX_CONCURRENT && requestQueue.length > 0) {
        // LIFO (Last-In-First-Out): Pick the most recently enqueued frame under active playhead
        const task = requestQueue.pop();
        if (!task || task.signal?.aborted) continue;

        activeRequests++;
        executeTask(task);
    }
}

/**
 * Executes a frame retrieval HTTP task.
 * 
 * @param {{ key: string, hostname: string, epochMs: number, signal: AbortSignal, resolve: (val: any) => void }} task
 */
async function executeTask(task) {
    const { key, hostname, epochMs, signal, resolve } = task;
    try {
        if (signal?.aborted) {
            resolve(null);
            return;
        }

        const res = await fetch(`/api/v1/extractor-advanced/frame?hostname=${encodeURIComponent(hostname)}&epochMs=${epochMs}`, { signal });
        if (res.status === 200) {
            const blob = await res.blob();
            const blobUrl = URL.createObjectURL(blob);
            frameStore.set(hostname, epochMs, blobUrl);
            resolve(blobUrl);
        } else if (res.status === 204) {
            frameStore.set(hostname, epochMs, 'NO_SIGNAL');
            resolve('NO_SIGNAL');
        } else {
            resolve(null);
        }
    } catch (err) {
        if (err.name !== 'AbortError') {
            frameStore.set(hostname, epochMs, 'NO_SIGNAL');
            resolve('NO_SIGNAL');
        } else {
            resolve(null);
        }
    } finally {
        activeRequests = Math.max(0, activeRequests - 1);
        pendingPromises.delete(key);
        processQueue();
    }
}

export const frameStore = {
    /**
     * Gets a cached frame URL by station and timestamp.
     * 
     * @param {string} hostname
     * @param {number} rawEpochMs
     * @returns {string|null} Blob URL, 'NO_SIGNAL', or null if not cached.
     */
    get(hostname, rawEpochMs) {
        const epochMs = quantize(rawEpochMs);
        const key = `${hostname}_${epochMs}`;
        if (!frameCache.has(key)) return null;

        // Refresh position in LRU cache
        const val = frameCache.get(key);
        frameCache.delete(key);
        frameCache.set(key, val);
        return val;
    },

    /**
     * Stores a frame value and notifies subscribers.
     * 
     * @param {string} hostname
     * @param {number} rawEpochMs
     * @param {string} value
     */
    set(hostname, rawEpochMs, value) {
        const epochMs = quantize(rawEpochMs);
        const key = `${hostname}_${epochMs}`;

        // LRU eviction if cache exceeds capacity
        if (frameCache.size >= MAX_CACHE_SIZE) {
            const oldestKey = frameCache.keys().next().value;
            const oldestVal = frameCache.get(oldestKey);
            if (oldestVal && oldestVal.startsWith('blob:')) {
                URL.revokeObjectURL(oldestVal);
            }
            frameCache.delete(oldestKey);
        }

        frameCache.set(key, value);
        listeners.forEach(listener => listener(hostname, epochMs, value));
    },

    /**
     * Clears all cached frames, releases blob URLs, and flushes queues.
     */
    clearAll() {
        frameCache.forEach((val) => {
            if (val && val.startsWith('blob:')) {
                URL.revokeObjectURL(val);
            }
        });
        frameCache.clear();
        pendingPromises.clear();
        requestQueue = [];
        activeRequests = 0;
    },

    /**
     * Subscribes to frame store updates.
     * 
     * @param {(hostname: string, epochMs: number, value: string) => void} listener
     * @returns {() => void} Unsubscribe callback.
     */
    subscribe(listener) {
        listeners.add(listener);
        return () => listeners.delete(listener);
    },

    /**
     * Fetches a frame for the specified station and timestamp with deduplication and queueing.
     * 
     * @param {string} hostname
     * @param {number} rawEpochMs
     * @param {AbortSignal} [signal=null]
     * @returns {Promise<string|null>}
     */
    fetchFrame(hostname, rawEpochMs, signal = null) {
        const epochMs = quantize(rawEpochMs);
        const key = `${hostname}_${epochMs}`;

        // 1. Immediate retrieval from RAM cache (0ms)
        if (frameCache.has(key)) {
            return Promise.resolve(this.get(hostname, epochMs));
        }

        // 2. Return existing in-flight promise if available
        if (pendingPromises.has(key)) {
            return pendingPromises.get(key);
        }

        const promise = new Promise((resolve) => {
            if (signal?.aborted) {
                resolve(null);
                return;
            }

            // Optimization: Cancel outdated queued requests for this station
            requestQueue = requestQueue.filter(t => {
                if (t.hostname === hostname && t.key !== key) {
                    pendingPromises.delete(t.key);
                    t.resolve(null);
                    return false;
                }
                return true;
            });

            const task = { key, hostname, epochMs, signal, resolve };

            if (signal) {
                signal.addEventListener('abort', () => {
                    requestQueue = requestQueue.filter(t => t.key !== key);
                    pendingPromises.delete(key);
                    resolve(null);
                }, { once: true });
            }

            requestQueue.push(task);
            processQueue();
        });

        pendingPromises.set(key, promise);
        return promise;
    }
};

if (typeof window !== 'undefined') {
    window.addEventListener('extractor:clear-session', () => {
        frameStore.clearAll();
    });
}