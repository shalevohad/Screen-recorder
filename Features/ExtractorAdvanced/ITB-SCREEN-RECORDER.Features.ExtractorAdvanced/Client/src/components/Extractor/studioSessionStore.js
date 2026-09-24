// Client/src/components/Extractor/studioSessionStore.js

const STORAGE_KEY = 'extractor_advanced_studio_session_v1';

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