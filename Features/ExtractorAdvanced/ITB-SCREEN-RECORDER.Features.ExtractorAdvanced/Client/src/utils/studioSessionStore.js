// ==========================================
// File: Features/ExtractorAdvanced/Client/src/utils/studioSessionStore.js
// ==========================================

const STORAGE_KEY = 'ITB_STUDIO_SESSION_CACHE_V2';
const AUDIO_STORAGE_KEY = 'itb_player_audio_settings';

let debounceTimer = null;

/**
 * טעינת נתוני הסשן השמורים
 */
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

/**
 * שמירת נתוני הסשן עם Debounce של 600ms וסינון אובייקטים כבדים
 */
export function saveStudioSessionCache(data) {
    if (!data) return;

    if (debounceTimer) {
        clearTimeout(debounceTimer);
    }

    debounceTimer = setTimeout(() => {
        try {
            // סינון סגמנטים כבדים מהתחנות כדי לא לחרוג ממגבלת ה-Quota
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
                isLooping: typeof data.isLooping === 'boolean' ? data.isLooping : true,
                playbackSpeed: typeof data.playbackSpeed === 'number' ? data.playbackSpeed : 1,
                lastSavedAt: Date.now()
            };

            localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
        } catch (err) {
            console.warn('[SessionStore] Quota exceeded or failed saving session:', err);
        }
    }, 600);
}

/**
 * איפוס סשן הסטודיו
 */
export function clearStudioSessionCache() {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
        console.warn('[SessionStore] Failed to clear session storage', e);
    }
}

/**
 * טעינת הגדרות שמע גלובליות (Muted כברירת מחדל)
 */
export function getAudioSettings() {
    try {
        const raw = localStorage.getItem(AUDIO_STORAGE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            return {
                volume: typeof parsed.volume === 'number' ? parsed.volume : 0.8,
                isMuted: typeof parsed.isMuted === 'boolean' ? parsed.isMuted : true
            };
        }
    } catch (e) {
        console.warn('[SessionStore] Failed to read audio settings:', e);
    }

    return { volume: 0.8, isMuted: true };
}

/**
 * שמירת הגדרות שמע גלובליות וסנכרון בין כל חלקי המערכת בזמן אמת
 */
export function saveAudioSettings(settings) {
    try {
        localStorage.setItem(AUDIO_STORAGE_KEY, JSON.stringify(settings));
        window.dispatchEvent(new CustomEvent('itb-audio-state-changed', { detail: settings }));
    } catch (e) {
        console.warn('[SessionStore] Failed to persist audio settings:', e);
    }
}