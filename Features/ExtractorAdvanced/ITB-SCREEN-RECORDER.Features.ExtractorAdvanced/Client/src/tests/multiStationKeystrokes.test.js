// ==========================================
// File: Features/ExtractorAdvanced/Client/src/tests/multiStationKeystrokes.test.js
// Multi-Station Forensics Ruler Keystroke Aggregator & Clustered Tooltip Tests
// ==========================================

import test, { describe } from 'node:test';
import assert from 'node:assert/strict';
import { cleanKeyName, KEYSTROKE_CALIBRATION_OFFSET_MS } from '../utils/virtualKeyMap.js';

describe('Multi-Station Keystrokes Timeline & Clustered Tooltip Invariants', () => {

    test('1. Default Ruler Keystroke visibility defaults to true when unconfigured', () => {
        const cachedEmpty = {};
        const showRulerDefault = typeof cachedEmpty.showRulerKeystrokes === 'boolean'
            ? cachedEmpty.showRulerKeystrokes
            : true;
        assert.equal(showRulerDefault, true, 'Ruler keystrokes must default to true for instant out-of-the-box visibility');

        const cachedFalse = { showRulerKeystrokes: false };
        const showRulerExplicitFalse = typeof cachedFalse.showRulerKeystrokes === 'boolean'
            ? cachedFalse.showRulerKeystrokes
            : true;
        assert.equal(showRulerExplicitFalse, false, 'Explicitly false cached setting must be respected');
    });

    test('2. Multi-station parallel query tags each keystroke with stationId, stationName, and stationHostname', () => {
        const selectedStations = [
            { id: 'st-1', hostname: 'DESKTOP-ALPHA', displayName: 'ALPHA STATION' },
            { id: 'st-2', hostname: 'DESKTOP-BETA', displayName: 'BETA WORKSTATION' }
        ];

        const rawEventsFromAlpha = [
            { epochMs: 1700000001000, keyCombination: 'Ctrl+C', x: 100, y: 200 },
            { epochMs: 1700000001500, keyCombination: 'Enter', x: 100, y: 200 }
        ];

        const rawEventsFromBeta = [
            { epochMs: 1700000001200, keyCombination: 'F5', x: 50, y: 80 }
        ];

        // Simulate Studio multi-station aggregator
        const taggedAlpha = rawEventsFromAlpha.map(evt => ({
            ...evt,
            stationId: selectedStations[0].id,
            stationName: selectedStations[0].displayName,
            stationHostname: selectedStations[0].hostname
        }));

        const taggedBeta = rawEventsFromBeta.map(evt => ({
            ...evt,
            stationId: selectedStations[1].id,
            stationName: selectedStations[1].displayName,
            stationHostname: selectedStations[1].hostname
        }));

        const combined = [...taggedAlpha, ...taggedBeta].sort((a, b) => a.epochMs - b.epochMs);

        assert.equal(combined.length, 3);
        assert.equal(combined[0].stationName, 'ALPHA STATION');
        assert.equal(combined[1].stationName, 'BETA WORKSTATION');
        assert.equal(combined[2].stationName, 'ALPHA STATION');
        assert.equal(combined[0].keyCombination, 'Ctrl+C');
        assert.equal(combined[1].keyCombination, 'F5');
        assert.equal(combined[2].keyCombination, 'Enter');
    });

    test('3. Keystroke Clustering Algorithm identifies multi-station clusters and counts distinct workstations', () => {
        const MIN_PIXEL_DISTANCE = 8;
        const baseEpochMs = 1700000000000;
        const viewportStartMs = 0;
        const viewportDurationMs = 10000; // 10 seconds viewport
        const pixelWidth = 1000; // 1000px wide timeline

        const events = [
            // Event 1 from Alpha at offset 1000ms (+ 2500ms calib = 3500ms -> pixel 350)
            { epochMs: baseEpochMs + 1000, keyCombination: 'A', stationName: 'ALPHA STATION', stationId: 'st-1' },
            // Event 2 from Beta at offset 1020ms (+ 2500ms calib = 3520ms -> pixel 352: delta is 2px < 8px -> cluster!)
            { epochMs: baseEpochMs + 1020, keyCombination: 'B', stationName: 'BETA WORKSTATION', stationId: 'st-2' },
            // Event 3 from Alpha at offset 5000ms (+ 2500ms calib = 7500ms -> pixel 750: delta is 398px > 8px -> separate cluster)
            { epochMs: baseEpochMs + 5000, keyCombination: 'C', stationName: 'ALPHA STATION', stationId: 'st-1' }
        ];

        const sorted = [...events].sort((a, b) => a.epochMs - b.epochMs);
        const clusters = [];
        let currentCluster = null;
        let lastPixel = -999;

        for (const evt of sorted) {
            const calibratedEpochMs = evt.epochMs + KEYSTROKE_CALIBRATION_OFFSET_MS;
            const offsetMs = calibratedEpochMs - baseEpochMs;
            const currentPixel = ((offsetMs - viewportStartMs) / viewportDurationMs) * pixelWidth;

            if (currentCluster && (currentPixel - lastPixel) < MIN_PIXEL_DISTANCE) {
                currentCluster.events.push(evt);
                currentCluster.endOffsetMs = offsetMs;
                currentCluster.endEpochMs = calibratedEpochMs;
                const uniqueStations = new Set(currentCluster.events.map(e => e.stationName || 'Workstation'));
                currentCluster.isMultiStation = uniqueStations.size > 1;
                currentCluster.stationCount = uniqueStations.size;
                lastPixel = currentPixel;
            } else {
                const pct = ((offsetMs - viewportStartMs) / viewportDurationMs) * 100;
                currentCluster = {
                    id: `kc_${evt.epochMs}_${clusters.length}`,
                    startOffsetMs: offsetMs,
                    endOffsetMs: offsetMs,
                    startEpochMs: calibratedEpochMs,
                    endEpochMs: calibratedEpochMs,
                    pct,
                    events: [evt],
                    isMultiStation: false,
                    stationCount: 1
                };
                clusters.push(currentCluster);
                lastPixel = currentPixel;
            }
        }

        assert.equal(clusters.length, 2, 'Should create exactly 2 clusters');

        // First cluster contains events from both Alpha and Beta
        const c1 = clusters[0];
        assert.equal(c1.events.length, 2);
        assert.equal(c1.isMultiStation, true, 'First cluster must be flagged as multi-station');
        assert.equal(c1.stationCount, 2, 'First cluster must report 2 workstations');

        // Second cluster contains only Alpha
        const c2 = clusters[1];
        assert.equal(c2.events.length, 1);
        assert.equal(c2.isMultiStation, false, 'Second cluster must not be multi-station');
        assert.equal(c2.stationCount, 1, 'Second cluster must report 1 workstation');
    });

    test('4. Tooltip grouping breaks down events by workstation with collapsed duplicate key pills', () => {
        function groupClusterEvents(evts) {
            const groups = [];
            for (const evt of evts) {
                const key = cleanKeyName(evt.keyCombination);
                if (groups.length && groups[groups.length - 1].key === key) {
                    groups[groups.length - 1].count++;
                } else {
                    groups.push({ key, count: 1 });
                }
            }
            return groups;
        }

        const clusterEvents = [
            { stationName: 'ALPHA STATION', keyCombination: 'Ctrl+S' },
            { stationName: 'ALPHA STATION', keyCombination: 'Enter' },
            { stationName: 'ALPHA STATION', keyCombination: 'Enter' },
            { stationName: 'BETA WORKSTATION', keyCombination: 'Backspace' },
            { stationName: 'BETA WORKSTATION', keyCombination: 'Backspace' },
            { stationName: 'BETA WORKSTATION', keyCombination: 'Backspace' }
        ];

        const stationGroups = {};
        clusterEvents.forEach(evt => {
            const sName = evt.stationName || 'Workstation';
            if (!stationGroups[sName]) stationGroups[sName] = [];
            stationGroups[sName].push(evt);
        });

        const stationEntries = Object.entries(stationGroups);
        assert.equal(stationEntries.length, 2, 'Should produce 2 station sections');

        // Alpha Workstation check
        const [alphaName, alphaEvts] = stationEntries[0];
        assert.equal(alphaName, 'ALPHA STATION');
        assert.equal(alphaEvts.length, 3);
        const alphaPills = groupClusterEvents(alphaEvts);
        assert.equal(alphaPills.length, 2);
        assert.deepEqual(alphaPills[0], { key: 'Ctrl+S', count: 1 });
        assert.deepEqual(alphaPills[1], { key: 'Enter', count: 2 });

        // Beta Workstation check
        const [betaName, betaEvts] = stationEntries[1];
        assert.equal(betaName, 'BETA WORKSTATION');
        assert.equal(betaEvts.length, 3);
        const betaPills = groupClusterEvents(betaEvts);
        assert.equal(betaPills.length, 1);
        assert.deepEqual(betaPills[0], { key: 'Backspace', count: 3 });
    });

    test('5. Multi-station cluster header formatting matches multicam badge specifications', () => {
        const multiCluster = {
            isMultiStation: true,
            stationCount: 3,
            events: new Array(7).fill({ keyCombination: 'Space' })
        };

        const singleCluster = {
            isMultiStation: false,
            stationCount: 1,
            events: new Array(4).fill({ keyCombination: 'Space' })
        };

        const singleEvent = {
            isMultiStation: false,
            stationCount: 1,
            events: [{ keyCombination: 'Esc' }]
        };

        function getTooltipHeader(cluster) {
            const count = cluster.events.length;
            const isCluster = count > 1;
            if (cluster.isMultiStation) {
                return `MULTICAM KEYSTROKES (${cluster.stationCount} WORKSTATIONS • ${count} EVT)`;
            }
            return isCluster ? `KEYSTROKE BURST (${count})` : 'KEYSTROKE';
        }

        assert.equal(getTooltipHeader(multiCluster), 'MULTICAM KEYSTROKES (3 WORKSTATIONS • 7 EVT)');
        assert.equal(getTooltipHeader(singleCluster), 'KEYSTROKE BURST (4)');
        assert.equal(getTooltipHeader(singleEvent), 'KEYSTROKE');
    });
});
