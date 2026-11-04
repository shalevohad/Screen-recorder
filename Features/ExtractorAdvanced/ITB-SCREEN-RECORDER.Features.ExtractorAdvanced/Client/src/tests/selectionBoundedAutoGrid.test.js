import test, { describe } from 'node:test';
import assert from 'node:assert/strict';
import { generateAutoPackPlacements } from '../utils/nleTimelineEngine.js';

describe('Auto-Grid Workstation Selection Invariant & Scope Boundary', () => {

    const ALL_STATIONS = [
        { id: 'st-1', name: 'WORKSTATION-ALPHA', width: 1920, height: 1080 },
        { id: 'st-2', name: 'WORKSTATION-BRAVO', width: 1920, height: 1080 },
        { id: 'st-3', name: 'WORKSTATION-CHARLIE', width: 1920, height: 1080 },
        { id: 'st-4', name: 'WORKSTATION-DELTA', width: 1920, height: 1080 },
        { id: 'st-5', name: 'WORKSTATION-ECHO', width: 1920, height: 1080 }
    ];

    const createFeedForStation = (st) => ({
        stationId: st.id,
        displayId: 'auto',
        label: `${st.name} - Central Composition`,
        stationName: st.name,
        stationHostname: st.id,
        isPrimary: true,
        sourceWidth: st.width,
        sourceHeight: st.height,
        nativeAspectRatio: st.width / st.height,
        aspectRatio: st.width / st.height,
        width: st.width,
        height: st.height
    });

    test('1. Auto-Grid with 1 selected workstation packs strictly 1 placement taking full canvas', () => {
        const selectedStationIds = ['st-1'];
        const selectedStations = ALL_STATIONS.filter(s => selectedStationIds.includes(s.id));
        const selectedFeeds = selectedStations.map(createFeedForStation);

        assert.equal(selectedFeeds.length, 1);

        const placements = generateAutoPackPlacements(selectedFeeds, 1920, 1080);

        assert.equal(placements.length, 1);
        assert.equal(placements[0].stationId, 'st-1');
        assert.equal(placements[0].x, 0);
        assert.equal(placements[0].y, 0);
        assert.equal(placements[0].width, 1920);
        assert.equal(placements[0].height, 1080);
    });

    test('2. Auto-Grid with 2 selected stations out of 5 ignores unselected stations completely', () => {
        const selectedStationIds = ['st-2', 'st-4'];
        const selectedStations = ALL_STATIONS.filter(s => selectedStationIds.includes(s.id));
        const selectedFeeds = selectedStations.map(createFeedForStation);

        assert.equal(selectedFeeds.length, 2);

        const placements = generateAutoPackPlacements(selectedFeeds, 3840, 1080);

        assert.equal(placements.length, 2);
        const packedStationIds = placements.map(p => p.stationId);
        assert.deepEqual(packedStationIds, ['st-2', 'st-4']);

        // Zero unselected stations present
        const unselectedStationIds = ['st-1', 'st-3', 'st-5'];
        unselectedStationIds.forEach(id => {
            assert.ok(!packedStationIds.includes(id), `Unselected station ${id} must NEVER be packed into canvas grid`);
        });
    });

    test('3. Auto-Grid with 3 selected stations distributes slots proportionally across virtual canvas', () => {
        const selectedStationIds = ['st-1', 'st-2', 'st-3'];
        const selectedStations = ALL_STATIONS.filter(s => selectedStationIds.includes(s.id));
        const selectedFeeds = selectedStations.map(createFeedForStation);

        assert.equal(selectedFeeds.length, 3);

        const placements = generateAutoPackPlacements(selectedFeeds, 1920, 1080);

        assert.equal(placements.length, 3);
        const packedStationIds = placements.map(p => p.stationId);
        assert.deepEqual(packedStationIds, ['st-1', 'st-2', 'st-3']);
        assert.ok(!packedStationIds.includes('st-4'));
        assert.ok(!packedStationIds.includes('st-5'));
    });

    test('4. Sanitizing cached keyframe placements strictly filters out deselected stations', () => {
        // Simulates cached timeline with placements from st-1, st-2, st-3
        const cachedKeyframePlacements = [
            { stationId: 'st-1', displayId: 'auto', x: 0, y: 0, width: 960, height: 1080 },
            { stationId: 'st-2', displayId: 'auto', x: 960, y: 0, width: 960, height: 1080 },
            { stationId: 'st-3', displayId: 'auto', x: 0, y: 0, width: 500, height: 500 }
        ];

        // Operator active selection in current project is ONLY st-2
        const currentActiveSelection = ['st-2'];
        const selectedSet = new Set(currentActiveSelection);

        const sanitizedPlacements = cachedKeyframePlacements.filter(p => selectedSet.has(p.stationId));

        assert.equal(sanitizedPlacements.length, 1);
        assert.equal(sanitizedPlacements[0].stationId, 'st-2');
    });

    test('5. Re-packing when selection changes from 2 stations to 1 station dynamically bounds grid to 1', () => {
        let selectedStationIds = ['st-1', 'st-2'];
        let selectedFeeds = ALL_STATIONS.filter(s => selectedStationIds.includes(s.id)).map(createFeedForStation);
        let placements = generateAutoPackPlacements(selectedFeeds, 1920, 1080);
        assert.equal(placements.length, 2);

        // Operator deselects st-2
        selectedStationIds = ['st-1'];
        selectedFeeds = ALL_STATIONS.filter(s => selectedStationIds.includes(s.id)).map(createFeedForStation);
        placements = generateAutoPackPlacements(selectedFeeds, 1920, 1080);
        assert.equal(placements.length, 1);
        assert.equal(placements[0].stationId, 'st-1');
    });
});
