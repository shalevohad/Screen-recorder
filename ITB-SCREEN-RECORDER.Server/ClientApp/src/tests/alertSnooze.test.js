// ==========================================
// File: ClientApp/src/tests/alertSnooze.test.js
// ==========================================
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

// Pure logic implementations mirroring the hooks for robust unit testing
function isStationNotRecording(s) {
    if (!s) return false;
    const isOnline = Boolean(s.isOnline || s.status === 1 || s.status === 2 || s.isProcessRunning);
    if (!isOnline) return false;
    const isRec = Boolean(s.isRecording ?? (s.status === 'Recording'));
    return !isRec;
}

function calculateRemainingMinutes(untilMs, nowMs = Date.now()) {
    const diffMs = untilMs - nowMs;
    return diffMs > 0 ? Math.ceil(diffMs / (60 * 1000)) : 0;
}

function sortStations(stations, { isPrioritizeAlertsAtFront = true, snoozedHostnames = new Set(), sortAsc = true } = {}) {
    return [...stations].sort((a, b) => {
        if (isPrioritizeAlertsAtFront) {
            const aAlertActive = isStationNotRecording(a) && !snoozedHostnames.has(a.hostname);
            const bAlertActive = isStationNotRecording(b) && !snoozedHostnames.has(b.hostname);
            if (aAlertActive && !bAlertActive) return -1;
            if (!aAlertActive && bAlertActive) return 1;
        }
        const comp = (a.displayName || a.hostname || '').toLowerCase().localeCompare(
            (b.displayName || b.hostname || '').toLowerCase(),
            undefined,
            { numeric: true, sensitivity: 'base' }
        );
        return sortAsc ? comp : -comp;
    });
}

describe('Recording Alert & Snooze Logic Tests', () => {
    it('correctly classifies stations as needing recording alert', () => {
        // Online station not recording -> Alert TRUE
        assert.equal(isStationNotRecording({ hostname: 'ST-01', isOnline: true, isRecording: false }), true);
        assert.equal(isStationNotRecording({ hostname: 'ST-02', status: 1, isRecording: false }), true);

        // Recording station -> Alert FALSE
        assert.equal(isStationNotRecording({ hostname: 'ST-03', isOnline: true, isRecording: true }), false);
        assert.equal(isStationNotRecording({ hostname: 'ST-04', isOnline: true, status: 'Recording' }), false);

        // Offline station -> Alert FALSE (offline is handled by offline status/filter)
        assert.equal(isStationNotRecording({ hostname: 'ST-05', isOnline: false, isRecording: false }), false);
        assert.equal(isStationNotRecording(null), false);
    });

    it('calculates snooze remaining minutes accurately', () => {
        const now = 1000000;
        const in15m = now + 15 * 60 * 1000;
        const in30s = now + 30 * 1000;
        const expired = now - 5000;

        assert.equal(calculateRemainingMinutes(in15m, now), 15);
        assert.equal(calculateRemainingMinutes(in30s, now), 1);
        assert.equal(calculateRemainingMinutes(expired, now), 0);
    });

    it('prioritizes unrecorded stations to the front of the fleet when enabled', () => {
        const stations = [
            { hostname: 'ST-ALPHA', isOnline: true, isRecording: true },
            { hostname: 'ST-BETA', isOnline: true, isRecording: false }, // Alert active!
            { hostname: 'ST-GAMMA', isOnline: true, isRecording: true },
            { hostname: 'ST-DELTA', isOnline: true, isRecording: false }  // Alert active!
        ];

        const sorted = sortStations(stations, { isPrioritizeAlertsAtFront: true });

        // BETA and DELTA must be at index 0 and 1
        assert.equal(sorted[0].hostname, 'ST-BETA');
        assert.equal(sorted[1].hostname, 'ST-DELTA');
        assert.equal(sorted[2].hostname, 'ST-ALPHA');
        assert.equal(sorted[3].hostname, 'ST-GAMMA');
    });

    it('snoozed stations do not float to front when alert is postponed', () => {
        const stations = [
            { hostname: 'ST-ALPHA', isOnline: true, isRecording: true },
            { hostname: 'ST-BETA', isOnline: true, isRecording: false },  // Alert snoozed!
            { hostname: 'ST-GAMMA', isOnline: true, isRecording: false } // Alert active!
        ];

        // Snooze ST-BETA
        const snoozed = new Set(['ST-BETA']);
        const sorted = sortStations(stations, { isPrioritizeAlertsAtFront: true, snoozedHostnames: snoozed });

        // Only ST-GAMMA floats to front; ST-BETA stays in normal alphabetical position
        assert.equal(sorted[0].hostname, 'ST-GAMMA');
        assert.equal(sorted[1].hostname, 'ST-ALPHA');
        assert.equal(sorted[2].hostname, 'ST-BETA');
    });

    it('respects pure alphabetical sorting when prioritization is disabled', () => {
        const stations = [
            { hostname: 'ST-DELTA', isOnline: true, isRecording: false },
            { hostname: 'ST-BETA', isOnline: true, isRecording: true },
            { hostname: 'ST-ALPHA', isOnline: true, isRecording: true }
        ];

        const sorted = sortStations(stations, { isPrioritizeAlertsAtFront: false });
        assert.equal(sorted[0].hostname, 'ST-ALPHA');
        assert.equal(sorted[1].hostname, 'ST-BETA');
        assert.equal(sorted[2].hostname, 'ST-DELTA');
    });
});
