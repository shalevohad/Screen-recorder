// ==========================================
// File: Features/ExtractorAdvanced/Client/src/utils/frameStore.js
// ==========================================

const MAX_CACHE_SIZE = 400; // הגבלת פריימים מקסימלית ב-RAM
const QUANTIZE_MS = 250;    // סנכרון מדרגות מול השרת ל-Scrubbing חלק

const frameCache = new Map();
const pendingPromises = new Map();
const listeners = new Set();

const MAX_CONCURRENT = 8;
let activeRequests = 0;
const requestQueue = [];

function quantize(epochMs) {
    if (!epochMs || isNaN(epochMs)) return 0;
    return Math.round(epochMs / QUANTIZE_MS) * QUANTIZE_MS;
}

function processQueue() {
    while (activeRequests < MAX_CONCURRENT && requestQueue.length > 0) {
        const task = requestQueue.shift();
        if (task) task();
    }
}

export const frameStore = {
    get(hostname, rawEpochMs) {
        const epochMs = quantize(rawEpochMs);
        const key = `${hostname}_${epochMs}`;
        if (!frameCache.has(key)) return null;

        // רענון מיקום ב-LRU
        const val = frameCache.get(key);
        frameCache.delete(key);
        frameCache.set(key, val);
        return val;
    },

    set(hostname, rawEpochMs, value) {
        const epochMs = quantize(rawEpochMs);
        const key = `${hostname}_${epochMs}`;

        // פינוי זיכרון LRU אם חורגים מהמגבלה
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

    clearAll() {
        frameCache.forEach((val) => {
            if (val && val.startsWith('blob:')) {
                URL.revokeObjectURL(val);
            }
        });
        frameCache.clear();
        pendingPromises.clear();
        requestQueue.length = 0;
    },

    subscribe(listener) {
        listeners.add(listener);
        return () => listeners.delete(listener);
    },

    fetchFrame(hostname, rawEpochMs, signal) {
        const epochMs = quantize(rawEpochMs);
        const key = `${hostname}_${epochMs}`;

        if (frameCache.has(key)) {
            return Promise.resolve(this.get(hostname, epochMs));
        }

        if (pendingPromises.has(key)) {
            return pendingPromises.get(key);
        }

        const promise = new Promise((resolve) => {
            const executeTask = async () => {
                activeRequests++;
                try {
                    const res = await fetch(`/api/v1/extractor-advanced/frame?hostname=${encodeURIComponent(hostname)}&epochMs=${epochMs}`, { signal });
                    if (res.status === 200) {
                        const blob = await res.blob();
                        const blobUrl = URL.createObjectURL(blob);
                        this.set(hostname, epochMs, blobUrl);
                        resolve(blobUrl);
                    } else {
                        this.set(hostname, epochMs, 'NO_SIGNAL');
                        resolve('NO_SIGNAL');
                    }
                } catch (err) {
                    if (err.name !== 'AbortError') {
                        this.set(hostname, epochMs, 'NO_SIGNAL');
                        resolve('NO_SIGNAL');
                    } else {
                        resolve(null);
                    }
                } finally {
                    activeRequests--;
                    pendingPromises.delete(key);
                    processQueue();
                }
            };

            requestQueue.push(executeTask);
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