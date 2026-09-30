// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Extractor/studioSessionStore.js
// ==========================================

const STORAGE_KEY = 'extractor_advanced_studio_session_v1';
const AUDIO_STORAGE_KEY = 'itb_player_audio_settings';

const loadFromStorage = () => {
    try {
        const raw = sessionStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch (e) {
        console.warn('[StudioStore] Failed to read sessionStorage', e);
        return null;
    }
};

let activeSessionCache = loadFromStorage();

export const getStudioSessionCache = () => activeSessionCache;

export const saveStudioSessionCache = (data) => {
    activeSessionCache = {
        ...activeSessionCache,
        ...data,
        lastUpdated: Date.now()
    };
    try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(activeSessionCache));
    } catch (e) {
        console.warn('[StudioStore] Failed to persist sessionStorage', e);
    }
};

export const clearStudioSessionCache = () => {
    activeSessionCache = null;
    try {
        sessionStorage.removeItem(STORAGE_KEY);
    } catch (e) {
        console.warn('[StudioStore] Failed to clear sessionStorage', e);
    }
};

// 💡 ניהול שמע גלובלי שמסונכרן ומאוחסן ב-localStorage
export const getAudioSettings = () => {
    try {
        const raw = localStorage.getItem(AUDIO_STORAGE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            return {
                volume: typeof parsed.volume === 'number' ? parsed.volume : 0.8,
                isMuted: typeof parsed.isMuted === 'boolean' ? parsed.isMuted : true // ברירת מחדל: Muted
            };
        }
    } catch (e) {
        console.warn('[StudioStore] Failed to read audio settings', e);
    }

    return { volume: 0.8, isMuted: true };
};

export const saveAudioSettings = (settings) => {
    try {
        localStorage.setItem(AUDIO_STORAGE_KEY, JSON.stringify(settings));
        window.dispatchEvent(new CustomEvent('itb-audio-state-changed', { detail: settings }));
    } catch (e) {
        console.warn('[StudioStore] Failed to persist audio settings', e);
    }
};