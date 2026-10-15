// ==========================================
// File: Features/ExtractorAdvanced/Client/src/utils/frameStore.js
// ==========================================

const MAX_CACHE_SIZE = 600; // הגבלת פריימים מקסימלית ב-RAM
const QUANTIZE_MS = 250;    // סנכרון מדרגות מול השרת ל-Scrubbing חלק

const frameCache = new Map();
const pendingPromises = new Map();
const listeners = new Set();

const MAX_CONCURRENT = 4; // שמירה על מעבד השרת והדפדפן מתחרות תהליכים
let activeRequests = 0;
let requestQueue = [];

function quantize(epochMs) {
    if (!epochMs || isNaN(epochMs)) return 0;
    return Math.round(epochMs / QUANTIZE_MS) * QUANTIZE_MS;
}

function processQueue() {
    if (activeRequests >= MAX_CONCURRENT || requestQueue.length === 0) return;

    // ניקוי משימות שבוטלו
    requestQueue = requestQueue.filter(t => !t.signal?.aborted);

    while (activeRequests < MAX_CONCURRENT && requestQueue.length > 0) {
        // 💡 LIFO (Last-In-First-Out): שליפת המשימה האחרונה שנוספה (הפריים העדכני ביותר שהמשתמש עומד עליו כעת!)
        const task = requestQueue.pop();
        if (!task || task.signal?.aborted) continue;

        activeRequests++;
        executeTask(task);
    }
}

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
        requestQueue = [];
        activeRequests = 0;
    },

    subscribe(listener) {
        listeners.add(listener);
        return () => listeners.delete(listener);
    },

    fetchFrame(hostname, rawEpochMs, signal = null) {
        const epochMs = quantize(rawEpochMs);
        const key = `${hostname}_${epochMs}`;

        // 1. שליפה מיידית מ-RAM (0ms)
        if (frameCache.has(key)) {
            return Promise.resolve(this.get(hostname, epochMs));
        }

        // 2. אם כבר קיים Promise באוויר, מחזירים אותו
        if (pendingPromises.has(key)) {
            return pendingPromises.get(key);
        }

        const promise = new Promise((resolve) => {
            if (signal?.aborted) {
                resolve(null);
                return;
            }

            // 💡 אופטימיזציה קריטית: ביטול משימות קודמות של אותה תחנה הממתינות בתור
            // אם המשתמש גרר את הפלייהד לתחנה זו, הפריימים הישנים בתור מיותרים לחלוטין!
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