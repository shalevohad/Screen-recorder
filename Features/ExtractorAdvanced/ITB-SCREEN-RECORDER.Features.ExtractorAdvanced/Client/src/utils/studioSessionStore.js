// ==========================================
// File: Features/ExtractorAdvanced/Client/src/utils/studioSessionStore.js
// ==========================================

const STORAGE_KEY = 'ITB_STUDIO_SESSION_CACHE_V2';
let debounceTimer = null;

export function getStudioSessionCache() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch (e) {
        console.warn('[SessionStore] Failed reading studio session cache:', e);
        return null;
    }
}

export function saveStudioSessionCache(data) {
    if (!data) return;

    if (debounceTimer) {
        clearTimeout(debounceTimer);
    }

    debounceTimer = setTimeout(() => {
        try {
            const sanitizedStations = (data.allStations || []).map(s => ({
                id: s.id,
                hostname: s.hostname,
                displayName: s.displayName,
                isOnline: s.isOnline,
                recordingsCount: s.recordingsCount
            }));

            const payload = {
                timeRange: data.timeRange,
                timeMode: data.timeMode || 'LOCAL',
                inPointMs: typeof data.inPointMs === 'number' ? data.inPointMs : null,
                outPointMs: typeof data.outPointMs === 'number' ? data.outPointMs : null,
                playheadMs: typeof data.playheadMs === 'number' ? data.playheadMs : null,
                selectedStationIds: Array.isArray(data.selectedStationIds) ? data.selectedStationIds : [],
                activeStationId: data.activeStationId || null,
                zoomLevel: data.zoomLevel || 1,
                viewportStartMs: typeof data.viewportStartMs === 'number' ? data.viewportStartMs : 0,
                isWorkspaceActive: Boolean(data.isWorkspaceActive),
                allStations: sanitizedStations,
                lastSavedAt: Date.now()
            };

            localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
        } catch (err) {
            console.warn('[SessionStore] Quota exceeded or failed saving session:', err);
        }
    }, 600);
}