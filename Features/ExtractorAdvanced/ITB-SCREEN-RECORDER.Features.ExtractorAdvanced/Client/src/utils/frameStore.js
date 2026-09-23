// ==========================================
// File: Features/ExtractorAdvanced/Client/src/utils/frameStore.js
// ==========================================

const frameCache = new Map();
const pendingPromises = new Map();
const listeners = new Set();

const MAX_CONCURRENT = 4;
let activeRequests = 0;
const requestQueue = [];

function processQueue() {
    while (activeRequests < MAX_CONCURRENT && requestQueue.length > 0) {
        const task = requestQueue.shift();
        if (task) task();
    }
}

export const frameStore = {
    get(hostname, epochMs) {
        return frameCache.get(`${hostname}_${epochMs}`);
    },

    set(hostname, epochMs, value) {
        const key = `${hostname}_${epochMs}`;
        frameCache.set(key, value);
        listeners.forEach(listener => listener(hostname, epochMs, value));
    },

    subscribe(listener) {
        listeners.add(listener);
        return () => listeners.delete(listener);
    },

    fetchFrame(hostname, epochMs, signal) {
        const key = `${hostname}_${epochMs}`;
        if (frameCache.has(key)) {
            return Promise.resolve(frameCache.get(key));
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