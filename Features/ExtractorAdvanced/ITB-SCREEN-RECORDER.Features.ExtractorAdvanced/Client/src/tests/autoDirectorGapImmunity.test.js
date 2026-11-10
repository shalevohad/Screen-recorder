import test, { describe } from 'node:test';
import assert from 'node:assert/strict';
import { cleanDirectorSegmentsWithGaps } from '../utils/nleTimelineEngine.js';

describe('Auto-Director Gap Immunity & Global Gap Exclusion Invariant', () => {

    test('1. Cuts planned inside any gap are merged into preceding segment to prevent switching', () => {
        const rawSegments = [
            { startEpochMs: 1000, endEpochMs: 5000, targetDisplayId: 'mon-0' },
            { startEpochMs: 5000, endEpochMs: 10000, targetDisplayId: 'mon-1' } // Cut at 5000ms
        ];

        // Gap covers 4000ms to 6000ms (so cut at 5000ms is inside gap)
        const stationGaps = [
            { startEpoch: 4000, endEpoch: 6000, type: 'station' }
        ];

        const cleaned = cleanDirectorSegmentsWithGaps(rawSegments, stationGaps, []);

        // Cut at 5000ms should be merged: screen switch eliminated
        assert.equal(cleaned.length, 1);
        assert.equal(cleaned[0].startEpochMs, 1000);
        assert.equal(cleaned[0].endEpochMs, 10000);
        assert.equal(cleaned[0].targetDisplayId, 'mon-0');
    });

    test('2. Global gaps are strictly subtracted: auto-director never selects global gaps and leaves them unselected', () => {
        const rawSegments = [
            { startEpochMs: 0, endEpochMs: 10000, targetDisplayId: 'mon-0' }
        ];

        const globalGaps = [
            { startEpochMs: 3000, endEpochMs: 6000 }
        ];

        const cleaned = cleanDirectorSegmentsWithGaps(rawSegments, [], globalGaps);

        // Segment should be split into [0, 3000] and [6000, 10000]
        // [3000, 6000] must have ZERO director segments (unselected)
        assert.equal(cleaned.length, 2);

        assert.equal(cleaned[0].startEpochMs, 0);
        assert.equal(cleaned[0].endEpochMs, 3000);
        assert.equal(cleaned[0].targetDisplayId, 'mon-0');

        assert.equal(cleaned[1].startEpochMs, 6000);
        assert.equal(cleaned[1].endEpochMs, 10000);
        assert.equal(cleaned[1].targetDisplayId, 'mon-0');

        // Confirm 3000-6000 is completely uncovered
        const coversGap = cleaned.some(s => s.startEpochMs < 6000 && s.endEpochMs > 3000);
        assert.equal(coversGap, false, 'Auto-Director must NEVER cover or select a global gap region');
    });

    test('3. Local gaps remain covered without cuts, while global gaps are excluded', () => {
        const rawSegments = [
            { startEpochMs: 0, endEpochMs: 5000, targetDisplayId: 'mon-0' },
            { startEpochMs: 5000, endEpochMs: 15000, targetDisplayId: 'mon-1' }
        ];

        // Local gap on this station at 2000-3000ms
        const stationGaps = [
            { startEpoch: 2000, endEpoch: 3000, type: 'station' }
        ];

        // Global gap across all stations at 10000-12000ms
        const globalGaps = [
            { startEpochMs: 10000, endEpochMs: 12000 }
        ];

        const cleaned = cleanDirectorSegmentsWithGaps(rawSegments, stationGaps, globalGaps);

        // Local gap 2000-3000 remains covered by mon-0 (no cuts inside it)
        // Global gap 10000-12000 is split: mon-1 has [5000, 10000] and [12000, 15000]
        assert.equal(cleaned.length, 3);

        assert.equal(cleaned[0].startEpochMs, 0);
        assert.equal(cleaned[0].endEpochMs, 5000);
        assert.equal(cleaned[0].targetDisplayId, 'mon-0');

        assert.equal(cleaned[1].startEpochMs, 5000);
        assert.equal(cleaned[1].endEpochMs, 10000);
        assert.equal(cleaned[1].targetDisplayId, 'mon-1');

        assert.equal(cleaned[2].startEpochMs, 12000);
        assert.equal(cleaned[2].endEpochMs, 15000);
        assert.equal(cleaned[2].targetDisplayId, 'mon-1');

        // Verify global gap [10000, 12000] is unselected
        const coversGlobal = cleaned.some(s => s.startEpochMs < 12000 && s.endEpochMs > 10000);
        assert.equal(coversGlobal, false);
    });

    test('4. Segment completely inside a global gap is completely discarded', () => {
        const rawSegments = [
            { startEpochMs: 1000, endEpochMs: 3000, targetDisplayId: 'mon-0' },
            { startEpochMs: 4000, endEpochMs: 6000, targetDisplayId: 'mon-1' }, // completely inside gap
            { startEpochMs: 7000, endEpochMs: 9000, targetDisplayId: 'mon-0' }
        ];

        const globalGaps = [
            { startEpochMs: 3500, endEpochMs: 6500 }
        ];

        const cleaned = cleanDirectorSegmentsWithGaps(rawSegments, [], globalGaps);

        assert.equal(cleaned.length, 2);
        assert.equal(cleaned[0].startEpochMs, 1000);
        assert.equal(cleaned[0].endEpochMs, 3000);
        assert.equal(cleaned[1].startEpochMs, 7000);
        assert.equal(cleaned[1].endEpochMs, 9000);
    });

    test('5. Trailing global gap to the end of timeline leaves trailing range unselected', () => {
        const rawSegments = [
            { startEpochMs: 1000, endEpochMs: 8000, targetDisplayId: 'mon-0' }
        ];

        const globalGaps = [
            { startEpochMs: 6000, endEpochMs: 10000 }
        ];

        const cleaned = cleanDirectorSegmentsWithGaps(rawSegments, [], globalGaps);

        assert.equal(cleaned.length, 1);
        assert.equal(cleaned[0].startEpochMs, 1000);
        assert.equal(cleaned[0].endEpochMs, 6000);
    });
});
