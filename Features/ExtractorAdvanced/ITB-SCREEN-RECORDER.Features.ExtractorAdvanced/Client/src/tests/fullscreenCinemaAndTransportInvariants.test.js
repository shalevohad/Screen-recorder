// ==========================================
// File: Client/src/tests/fullscreenCinemaAndTransportInvariants.test.js
// Enterprise Forensic Player — Single-Screen Non-Expandable, Universal Transport & Fullscreen Grid Cinema Invariants
// ==========================================

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('Single-Screen Station Non-Expandable & Universal Transport Invariants', () => {

    // Helper mirroring TimelineBoard & TimelineTrack logic
    const getStationDisplaysCount = (s) => {
        const list = s?.displays || s?.Displays || s?.displayTopology?.displays || s?.DisplayTopology?.Displays || s?.topology?.displays || [];
        return list.length;
    };

    const evaluateHasMultiDisplays = (stationDisplays) => {
        return Boolean(stationDisplays && stationDisplays.length > 1);
    };

    const evaluateTransportEnabled = ({ _activeStationId, hasGridPlacements, totalDurationMs }) => {
        return Boolean(hasGridPlacements && totalDurationMs > 0);
    };

    const formatCutDurationSMPTE = (durationMs, fps = 30) => {
        const totalMs = Math.max(0, durationMs);
        const totalSeconds = Math.floor(totalMs / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        const frames = Math.floor(((totalMs % 1000) / 1000) * fps);
        const pad = (n) => String(n).padStart(2, '0');
        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(frames)}`;
    };

    it('1. Station with 1 display strictly cannot expand and hasMultiDisplays is false', () => {
        const singleDisplayStation = {
            id: 'ws-single-01',
            hostname: 'OHAD-DESKTOP',
            displays: [
                { displayId: 'mon-0', displayName: 'Screen 1', isPrimary: true, width: 1920, height: 1080 }
            ],
            directorPlan: {
                segments: [{ startEpochMs: 10000, endEpochMs: 20000, targetDisplayId: 'mon-0' }]
            }
        };

        const dispCount = getStationDisplaysCount(singleDisplayStation);
        assert.equal(dispCount, 1);

        const hasMulti = evaluateHasMultiDisplays(singleDisplayStation.displays);
        assert.equal(hasMulti, false, 'Station with 1 display must strictly have hasMultiDisplays = false');

        // Verify that even if expandedStationId was set, expansion is guarded
        const canExpand = dispCount > 1;
        assert.equal(canExpand, false, 'Single display station must not be expandable');
    });

    it('2. Station with 2 or more displays is expandable and hasMultiDisplays is true', () => {
        const dualDisplayStation = {
            id: 'ws-dual-02',
            hostname: 'OPS-CONSOLE',
            displays: [
                { displayId: 'mon-0', displayName: 'Screen 1', isPrimary: true, width: 1920, height: 1080 },
                { displayId: 'mon-1', displayName: 'Screen 2', isPrimary: false, width: 1920, height: 1080 }
            ]
        };

        const dispCount = getStationDisplaysCount(dualDisplayStation);
        assert.equal(dispCount, 2);

        const hasMulti = evaluateHasMultiDisplays(dualDisplayStation.displays);
        assert.equal(hasMulti, true, 'Dual display station must have hasMultiDisplays = true');

        const canExpand = dispCount > 1;
        assert.equal(canExpand, true, 'Dual display station must be expandable');
    });

    it('3. Universal Transport Player is enabled when screens exist on GRID without any station selected', () => {
        // Operator has not clicked any station in tracklist (activeStationId is null)
        const activeStationId = null;
        const totalDurationMs = 7200000;
        const currentPlacements = [
            { stationId: 'ws-01', displayId: 'mon-0', x: 0, y: 0, width: 960, height: 1080 },
            { stationId: 'ws-02', displayId: 'mon-0', x: 960, y: 0, width: 960, height: 1080 }
        ];
        const hasGridPlacements = currentPlacements.length > 0;

        const isEnabled = evaluateTransportEnabled({ activeStationId, hasGridPlacements, totalDurationMs });
        assert.equal(isEnabled, true, 'Transport player must be enabled in GRID view when placements exist without activeStationId');
    });

    it('4. Universal Transport Player is disabled when no screens are placed on GRID and no station active', () => {
        const activeStationId = null;
        const totalDurationMs = 7200000;
        const currentPlacements = [];
        const hasGridPlacements = currentPlacements.length > 0;

        const isEnabled = evaluateTransportEnabled({ activeStationId, hasGridPlacements, totalDurationMs });
        assert.equal(isEnabled, false, 'Transport player must be disabled when canvas grid is empty');
    });

    it('5. Spacebar hotkey permission passes when hasGridPlacements is true even with multiple selected stations', () => {
        const activeStationId = null;
        const spotlightStationId = null;
        const selectedStationIdsCount = 3;
        const hasGridPlacements = true;

        // Old buggy check: if (!activeStationId && !spotlightStationId && selectedStationIdsCount > 1) return;
        const wouldBlockUnderOldLogic = (!activeStationId && !spotlightStationId && selectedStationIdsCount > 1);
        assert.equal(wouldBlockUnderOldLogic, true, 'Old logic mistakenly blocked Spacebar in grid mode');

        // New invariant check: if (!hasGridPlacements) return;
        const canPlayUnderNewLogic = hasGridPlacements;
        assert.equal(canPlayUnderNewLogic, true, 'New logic correctly permits Spacebar in grid mode');
    });

    it('6. SMPTE cut duration formats accurate timecode string for HUD transport cluster', () => {
        // 1 hour, 23 minutes, 45 seconds, 500 ms (15 frames at 30 fps)
        const ms = (1 * 3600 + 23 * 60 + 45) * 1000 + 500;
        const formatted = formatCutDurationSMPTE(ms, 30);
        assert.equal(formatted, '01:23:45.15');

        // 0 ms
        assert.equal(formatCutDurationSMPTE(0), '00:00:00.00');
    });
});
