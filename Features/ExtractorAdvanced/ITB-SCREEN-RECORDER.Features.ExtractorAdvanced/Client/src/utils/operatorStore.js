// ==========================================
// File: Features/ExtractorAdvanced/Client/src/utils/operatorStore.js
// ==========================================

const STORAGE_KEYS = {
    USER: 'itb_auth_user',
    ROLES: 'itb_auth_roles'
};

/**
 * Retrieves the currently authenticated operator's display name or username from session/local storage.
 * Defaults cleanly to 'Guest Operator' for air-gapped / unauthenticated sessions.
 * 
 * @returns {string} The active operator's display name.
 */
export function getCurrentOperatorName() {
    try {
        if (typeof window === 'undefined') return 'Guest Operator';
        const raw = sessionStorage.getItem(STORAGE_KEYS.USER) || localStorage.getItem(STORAGE_KEYS.USER);
        if (raw) {
            const parsed = JSON.parse(raw);
            const name = parsed?.displayName || parsed?.username;
            if (name && typeof name === 'string' && name.trim()) {
                return name.trim();
            }
        }
    } catch {
        // Ignore JSON parse errors and return fallback
    }
    return 'Guest Operator';
}

/**
 * Retrieves the currently authenticated operator's role badges or empty list.
 * 
 * @returns {string[]} Array of role identifiers.
 */
export function getCurrentOperatorRoles() {
    try {
        if (typeof window === 'undefined') return [];
        const raw = sessionStorage.getItem(STORAGE_KEYS.ROLES) || localStorage.getItem(STORAGE_KEYS.ROLES);
        if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) return parsed;
        }
    } catch {
        // Ignore JSON parse errors
    }
    return [];
}
