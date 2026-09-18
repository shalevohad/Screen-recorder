// Client/src/components/Extractor/studioSessionStore.js

let activeSessionCache = null;

export const getStudioSessionCache = () => activeSessionCache;

export const saveStudioSessionCache = (data) => {
    activeSessionCache = {
        ...(activeSessionCache || {}),
        ...data,
        lastUpdated: Date.now()
    };
};

export const clearStudioSessionCache = () => {
    activeSessionCache = null;
};

// האזנה לאירוע גלובלי המאפשר למערכת האב לכבות ולאפס את הזיכרון
if (typeof window !== 'undefined') {
    window.addEventListener('extractor:clear-session', clearStudioSessionCache);
}