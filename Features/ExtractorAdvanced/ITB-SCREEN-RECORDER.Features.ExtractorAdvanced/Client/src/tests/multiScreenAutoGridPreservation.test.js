import test, { describe } from 'node:test';
import assert from 'node:assert/strict';
import { generateAutoPackPlacements } from '../utils/nleTimelineEngine.js';

describe('Multi-Screen Auto-Grid Preservation & Manual Display Scope Invariant', () => {

    test('1. When a station has multiple displays on canvas (mon-0 & mon-1), Auto-Grid packs BOTH without dropping mon-1', () => {
        const placementsOnCanvas = [
            {
                stationId: 'st-alpha',
                displayId: 'mon-0',
                label: 'WORKSTATION-ALPHA - Screen 1 (Main)',
                width: 1920,
                height: 1080,
                sourceWidth: 1920,
                sourceHeight: 1080,
                nativeAspectRatio: 16 / 9,
                aspectRatio: 16 / 9
            },
            {
                stationId: 'st-alpha',
                displayId: 'mon-1',
                label: 'WORKSTATION-ALPHA - Screen 2',
                width: 1920,
                height: 1080,
                sourceWidth: 1920,
                sourceHeight: 1080,
                nativeAspectRatio: 16 / 9,
                aspectRatio: 16 / 9
            }
        ];

        const packed = generateAutoPackPlacements(placementsOnCanvas, 3840, 1080);

        assert.equal(packed.length, 2, 'Must pack strictly 2 screens, zero screens dropped');
        const displays = packed.map(p => p.displayId);
        assert.deepEqual(displays, ['mon-0', 'mon-1']);

        // Verify side-by-side positioning
        assert.equal(packed[0].x, 0);
        assert.equal(packed[0].width, 1920);
        assert.equal(packed[1].x, 1920);
        assert.equal(packed[1].width, 1920);
    });

    test('2. When mon-0 is removed and only mon-1 remains for that station, Auto-Grid packs mon-1 full frame', () => {
        const placementsOnCanvas = [
            {
                stationId: 'st-alpha',
                displayId: 'mon-1',
                label: 'WORKSTATION-ALPHA - Screen 2',
                width: 1920,
                height: 1080,
                sourceWidth: 1920,
                sourceHeight: 1080,
                nativeAspectRatio: 16 / 9,
                aspectRatio: 16 / 9
            }
        ];

        const packed = generateAutoPackPlacements(placementsOnCanvas, 1920, 1080);

        assert.equal(packed.length, 1);
        assert.equal(packed[0].displayId, 'mon-1');
        assert.equal(packed[0].x, 0);
        assert.equal(packed[0].y, 0);
        assert.equal(packed[0].width, 1920);
        assert.equal(packed[0].height, 1080);
    });

    test('3. Multi-Station with mixed single and dual screens: all displays preserved in grid', () => {
        const mixedFeeds = [
            {
                stationId: 'st-1',
                displayId: 'mon-0',
                label: 'ST-1 Screen 1',
                width: 1920,
                height: 1080,
                nativeAspectRatio: 16 / 9
            },
            {
                stationId: 'st-1',
                displayId: 'mon-1',
                label: 'ST-1 Screen 2',
                width: 1920,
                height: 1080,
                nativeAspectRatio: 16 / 9
            },
            {
                stationId: 'st-2',
                displayId: 'auto',
                label: 'ST-2 Central Composite',
                width: 1920,
                height: 1080,
                nativeAspectRatio: 16 / 9
            }
        ];

        const packed = generateAutoPackPlacements(mixedFeeds, 1920, 1080);

        assert.equal(packed.length, 3, 'Must preserve all 3 screens (2 from st-1, 1 from st-2)');
        const st1Displays = packed.filter(p => p.stationId === 'st-1').map(p => p.displayId);
        assert.deepEqual(st1Displays, ['mon-0', 'mon-1']);
        assert.equal(packed.find(p => p.stationId === 'st-2').displayId, 'auto');
    });

    test('4. Display on canvas resolution correctly identifies mon-0 when placement has displayId "auto"', () => {
        const placements = [
            { stationId: 'st-alpha', displayId: 'auto' }
        ];

        const isDisplayOnCanvas = (dispId) => {
            const norm = (dispId || 'mon-0').toLowerCase();
            return placements.some(p => {
                if (p.stationId !== 'st-alpha') return false;
                const pDisp = (p.displayId || 'mon-0').toLowerCase();
                if (pDisp === norm) return true;
                if (pDisp === 'auto' && (norm === 'mon-0' || norm === 'screen-0')) return true;
                return false;
            });
        };

        // When placement is 'auto', Screen 1 (mon-0) is recognized as ON CANVAS
        assert.equal(isDisplayOnCanvas('mon-0'), true);
        assert.equal(isDisplayOnCanvas('screen-0'), true);

        // Secondary display is recognized as NOT on canvas
        assert.equal(isDisplayOnCanvas('mon-1'), false);
    });
});
