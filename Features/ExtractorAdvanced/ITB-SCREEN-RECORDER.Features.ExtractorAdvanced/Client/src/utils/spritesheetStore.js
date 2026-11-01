// ==========================================
// File: Features/ExtractorAdvanced/Client/src/utils/spritesheetStore.js
// ==========================================

const tileCache = new Map();
const pendingTiles = new Map();
let requestQueue = [];
let activeWorkers = 0;

// Controlled concurrency (3 workers) to maintain server responsiveness and video/timeline playback
const MAX_CONCURRENT = 3;
const TASK_TIMEOUT_MS = 8000;
const MAX_CACHE_ENTRIES = 80; // Compact RAM cache (~3-5MB max) to prevent browser memory exhaustion

function scheduleQueueProcessing() {
    setTimeout(processQueue, 0);
}

/**
 * Processes queued spritesheet generation requests in LIFO order.
 */
function processQueue() {
    if (activeWorkers >= MAX_CONCURRENT || requestQueue.length === 0) return;

    // Filter out requests aborted prior to execution
    requestQueue = requestQueue.filter(task => !task.signal?.aborted);

    while (activeWorkers < MAX_CONCURRENT && requestQueue.length > 0) {
        // LIFO: Fetch the most recent tile currently visible in viewport
        const task = requestQueue.pop();
        if (!task || task.signal?.aborted) continue;

        activeWorkers++;
        executeTask(task);
    }
}

/**
 * Executes a single spritesheet tile generation task.
 * 
 * @param {{ key: string, hostname: string, startEpoch: number, endEpoch: number, frameCount: number, signal: AbortSignal, resolve: (val: any) => void }} task
 */
async function executeTask(task) {
    const { key, hostname, startEpoch, endEpoch, frameCount, signal, resolve } = task;
    let isCleanedUp = false;
    let taskTimer = null;

    const cleanupWorker = () => {
        if (!isCleanedUp) {
            isCleanedUp = true;
            if (taskTimer) clearTimeout(taskTimer);
            activeWorkers = Math.max(0, activeWorkers - 1);
            pendingTiles.delete(key);
            scheduleQueueProcessing();
        }
    };

    taskTimer = setTimeout(() => {
        cleanupWorker();
        resolve(null);
    }, TASK_TIMEOUT_MS);

    try {
        const url = `/api/v1/extractor-advanced/spritesheet?hostname=${encodeURIComponent(hostname)}&startEpoch=${startEpoch}&endEpoch=${endEpoch}&frameCount=${frameCount}&tileWidth=100&tileHeight=50`;
        const res = await fetch(url, { signal });

        if (res.ok && res.status !== 204) {
            const blob = await res.blob();
            if (blob && blob.size > 1500) {
                const blobUrl = URL.createObjectURL(blob);

                // LRU eviction: revoke and remove oldest entry when exceeding cache limit
                if (tileCache.size >= MAX_CACHE_ENTRIES) {
                    const oldestKey = tileCache.keys().next().value;
                    const oldestUrl = tileCache.get(oldestKey);
                    if (oldestUrl) URL.revokeObjectURL(oldestUrl);
                    tileCache.delete(oldestKey);
                }

                tileCache.set(key, blobUrl);
                resolve(blobUrl); // Immediate resolve upon tile readiness
                return;
            }
        }
        resolve(null);
    } catch {
        resolve(null);
    } finally {
        cleanupWorker();
    }
}

export const spritesheetStore = {
    /**
     * Gets a cached spritesheet tile URL synchronously.
     * 
     * @param {string} hostname
     * @param {number} startEpoch
     * @param {number} endEpoch
     * @param {number} [frameCount=6]
     * @returns {string|undefined} Blob URL if cached.
     */
    get(hostname, startEpoch, endEpoch, frameCount = 6) {
        const key = `${hostname}_${startEpoch}_${endEpoch}_${frameCount}`;
        return tileCache.get(key);
    },

    /**
     * Fetches a spritesheet tile asynchronously with queueing and deduplication.
     * 
     * @param {string} hostname
     * @param {number} startEpoch
     * @param {number} endEpoch
     * @param {number} [frameCount=6]
     * @param {AbortSignal} [signal=null]
     * @returns {Promise<string|null>}
     */
    fetchTile(hostname, startEpoch, endEpoch, frameCount = 6, signal = null) {
        const key = `${hostname}_${startEpoch}_${endEpoch}_${frameCount}`;

        // 1. Immediate retrieval from RAM cache (0ms)
        if (tileCache.has(key)) {
            return Promise.resolve(tileCache.get(key));
        }

        // 2. Return in-flight promise to prevent duplicate requests
        if (pendingTiles.has(key)) {
            return pendingTiles.get(key);
        }

        const promise = new Promise((resolve) => {
            if (signal?.aborted) {
                resolve(null);
                return;
            }

            const task = {
                key,
                hostname,
                startEpoch,
                endEpoch,
                frameCount,
                signal,
                resolve
            };

            if (signal) {
                signal.addEventListener('abort', () => {
                    requestQueue = requestQueue.filter(t => t.key !== key);
                    pendingTiles.delete(key);
                    resolve(null);
                }, { once: true });
            }

            requestQueue.push(task);
            scheduleQueueProcessing();
        });

        pendingTiles.set(key, promise);
        return promise;
    },

    clear() {
        tileCache.forEach(url => URL.revokeObjectURL(url));
        tileCache.clear();
        pendingTiles.clear();
        requestQueue = [];
        activeWorkers = 0;
    }
};