// ==========================================
// File: Client/src/hooks/useAlertSnooze.js
// ==========================================
import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'itb_snoozed_recording_alerts';

function loadStoredSnoozes() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return {};
        const parsed = JSON.parse(raw);
        const now = Date.now();
        const valid = {};
        for (const [host, info] of Object.entries(parsed)) {
            if (info && info.until && info.until > now) {
                valid[host.toLowerCase()] = info;
            }
        }
        return valid;
    } catch {
        return {};
    }
}

export function useAlertSnooze() {
    const [snoozedMap, setSnoozedMap] = useState(loadStoredSnoozes);

    // Sync with localStorage & purge expired entries
    const purgeAndSave = useCallback((updated) => {
        const now = Date.now();
        const valid = {};
        for (const [h, info] of Object.entries(updated)) {
            if (info && info.until && info.until > now) {
                valid[h.toLowerCase()] = info;
            }
        }
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(valid));
        } catch { /* storage full / unavailable */ }
        setSnoozedMap(valid);
    }, []);

    // Periodic sweep for expired snoozes
    useEffect(() => {
        const timer = setInterval(() => {
            setSnoozedMap(prev => {
                const now = Date.now();
                let hasExpired = false;
                const next = {};
                for (const [h, info] of Object.entries(prev)) {
                    if (info && info.until && info.until > now) {
                        next[h] = info;
                    } else {
                        hasExpired = true;
                    }
                }
                if (hasExpired) {
                    try {
                        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
                    } catch {}
                    return next;
                }
                return prev;
            });
        }, 3000);

        return () => clearInterval(timer);
    }, []);

    const isStationSnoozed = useCallback((hostname) => {
        if (!hostname) return false;
        const info = snoozedMap[hostname.toLowerCase()];
        return Boolean(info && info.until && info.until > Date.now());
    }, [snoozedMap]);

    const getSnoozeRemainingMinutes = useCallback((hostname) => {
        if (!hostname) return 0;
        const info = snoozedMap[hostname.toLowerCase()];
        if (!info || !info.until) return 0;
        const diffMs = info.until - Date.now();
        if (diffMs <= 0) return 0;
        return Math.max(1, Math.ceil(diffMs / 60000));
    }, [snoozedMap]);

    const snoozeStation = useCallback((hostname, minutes = 30, reason = '') => {
        if (!hostname) return;
        const cleanHost = hostname.toLowerCase();
        const parsedMins = Math.max(1, Number(minutes) || 30);
        const until = Date.now() + (parsedMins * 60 * 1000);

        setSnoozedMap(prev => {
            const next = {
                ...prev,
                [cleanHost]: {
                    until,
                    minutes: parsedMins,
                    reason: reason.trim() || 'Operator Postponed',
                    snoozedAt: Date.now()
                }
            };
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
            } catch {}
            return next;
        });
    }, []);

    const snoozeMultipleStations = useCallback((hostnames, minutes = 30, reason = '') => {
        if (!Array.isArray(hostnames) || hostnames.length === 0) return;
        const parsedMins = Math.max(1, Number(minutes) || 30);
        const until = Date.now() + (parsedMins * 60 * 1000);

        setSnoozedMap(prev => {
            const next = { ...prev };
            hostnames.forEach(h => {
                if (h) {
                    next[h.toLowerCase()] = {
                        until,
                        minutes: parsedMins,
                        reason: reason.trim() || 'Fleet Bulk Postpone',
                        snoozedAt: Date.now()
                    };
                }
            });
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
            } catch {}
            return next;
        });
    }, []);

    const cancelSnooze = useCallback((hostname) => {
        if (!hostname) return;
        const cleanHost = hostname.toLowerCase();
        setSnoozedMap(prev => {
            if (!prev[cleanHost]) return prev;
            const next = { ...prev };
            delete next[cleanHost];
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
            } catch {}
            return next;
        });
    }, []);

    const cancelAllSnoozes = useCallback(() => {
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch {}
        setSnoozedMap({});
    }, []);

    return {
        snoozedMap,
        isStationSnoozed,
        getSnoozeRemainingMinutes,
        snoozeStation,
        snoozeMultipleStations,
        cancelSnooze,
        cancelAllSnoozes
    };
}
