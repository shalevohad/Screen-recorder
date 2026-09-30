// ==========================================
// File: Features/ExtractorAdvanced/Client/src/utils/spritesheetStore.js
// ==========================================

const tileCache = new Map();
const pendingTiles = new Map();
let requestQueue = [];
let activeWorkers = 0;

// 💡 שמירה על משאבי ה-CPU של השרת בריבוי משתמשים במקביל
const MAX_CONCURRENT = 2;
const TASK_TIMEOUT_MS = 8000;
const MAX_CACHE_ENTRIES = 250; // מניעת דליפות זיכרון ב-RAM בדפדפן

function scheduleQueueProcessing() {
    setTimeout(processQueue, 0);
}

function processQueue() {
    if (activeWorkers >= MAX_CONCURRENT || requestQueue.length === 0) return;

    // סינון משימות שבוטלו טרם הריצה
    requestQueue = requestQueue.filter(task => !task.signal?.aborted);

    while (activeWorkers < MAX_CONCURRENT && requestQueue.length > 0) {
        // 💡 FIFO: שליפת המשימה הראשונה (מההתחלה לסוף כרונולוגית)
        const task = requestQueue.shift();
        if (!task || task.signal?.aborted) continue;

        activeWorkers++;
        executeTask(task);
    }
}

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

        if (res.ok) {
            const blob = await res.blob();
            const blobUrl = URL.createObjectURL(blob);

            // ניהול LRU: שחרור אריח ישן אם המטמון חורג מהגודל המרבי
            if (tileCache.size >= MAX_CACHE_ENTRIES) {
                const oldestKey = tileCache.keys().next().value;
                const oldestUrl = tileCache.get(oldestKey);
                if (oldestUrl) URL.revokeObjectURL(oldestUrl);
                tileCache.delete(oldestKey);
            }

            tileCache.set(key, blobUrl);
            resolve(blobUrl); // 💡 שיבוץ מיידי ברגע שהאריח מוכן
        } else {
            resolve(null);
        }
    } catch {
        resolve(null);
    } finally {
        cleanupWorker();
    }
}

export const spritesheetStore = {
    get(hostname, startEpoch, endEpoch, frameCount = 6) {
        const key = `${hostname}_${startEpoch}_${endEpoch}_${frameCount}`;
        return tileCache.get(key);
    },

    fetchTile(hostname, startEpoch, endEpoch, frameCount = 6, signal = null) {
        const key = `${hostname}_${startEpoch}_${endEpoch}_${frameCount}`;

        // 1. שליפה מיידית מזיכרון ה-RAM (0ms)
        if (tileCache.has(key)) {
            return Promise.resolve(tileCache.get(key));
        }

        // 2. אם הבקשה כבר בתהליך, החזרת ה-Promise הקיים למניעת כפילות
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