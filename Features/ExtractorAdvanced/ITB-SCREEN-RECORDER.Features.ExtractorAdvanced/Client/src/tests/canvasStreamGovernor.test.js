// ==========================================
// File: Client/src/tests/canvasStreamGovernor.test.js
// Tactical Canvas Stream & Hardware Decoder Governor Invariants
// ==========================================

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
    MAX_CONCURRENT_CANVAS_DECODERS,
    resolveStreamQuality,
    computeDecoderAllocations
} from '../utils/canvasStreamGovernor.js';

describe('Canvas Stream & Decoder Governor Invariants', () => {

    it('1. MAX_CONCURRENT_CANVAS_DECODERS is safely capped at 4 for browser hardware decoder immunity', () => {
        assert.equal(MAX_CONCURRENT_CANVAS_DECODERS, 4);
    });

    it('2. resolveStreamQuality dynamically calculates lightweight proxy profiles based on rendered pixels', () => {
        // Miniature thumbnail (e.g. 9-screen grid)
        assert.equal(resolveStreamQuality(320, 180), 360);
        assert.equal(resolveStreamQuality(480, 270), 360);
        assert.equal(resolveStreamQuality(500, 360), 360);

        // Medium card (e.g. 4-screen grid)
        assert.equal(resolveStreamQuality(640, 400), 480);
        assert.equal(resolveStreamQuality(854, 480), 480);
        assert.equal(resolveStreamQuality(960, 540), 480);

        // Sub-hero card
        assert.equal(resolveStreamQuality(1280, 720), 720);
        assert.equal(resolveStreamQuality(1366, 750), 720);

        // Hero card or full-screen solo display
        assert.equal(resolveStreamQuality(1920, 1080), null);
        assert.equal(resolveStreamQuality(2560, 1440), null);
        assert.equal(resolveStreamQuality(0, 0), null);
    });

    it('3. When total placements <= maxConcurrentDecoders, ALL placements are granted video decoders', () => {
        const placements3 = [
            { stationId: 'WS-01', width: 640, height: 360 },
            { stationId: 'WS-02', width: 640, height: 360 },
            { stationId: 'WS-03', width: 640, height: 360 }
        ];

        const allocations = computeDecoderAllocations(placements3, { maxConcurrentDecoders: 4 });
        assert.deepEqual(allocations, [true, true, true]);
    });

    it('4. When total placements > maxConcurrentDecoders, active decoders are strictly capped at budget', () => {
        const placements8 = [
            { stationId: 'WS-01', width: 400, height: 225 },
            { stationId: 'WS-02', width: 400, height: 225 },
            { stationId: 'WS-03', width: 400, height: 225 },
            { stationId: 'WS-04', width: 400, height: 225 },
            { stationId: 'WS-05', width: 400, height: 225 },
            { stationId: 'WS-06', width: 400, height: 225 },
            { stationId: 'WS-07', width: 400, height: 225 },
            { stationId: 'WS-08', width: 400, height: 225 }
        ];

        const allocations = computeDecoderAllocations(placements8, { maxConcurrentDecoders: 4 });
        const activeCount = allocations.filter(Boolean).length;
        assert.equal(activeCount, 4);
        assert.equal(allocations.length, 8);
    });

    it('5. Solo Audio Station is guaranteed Top Priority decoder allocation for lip/audio sync', () => {
        const placements = [
            { stationId: 'WS-01', width: 800, height: 450 },
            { stationId: 'WS-02', width: 800, height: 450 },
            { stationId: 'WS-03', width: 800, height: 450 },
            { stationId: 'WS-04', width: 800, height: 450 },
            { stationId: 'WS-05', width: 300, height: 168 } // Tiny peripheral tile with audio solo
        ];

        const allocations = computeDecoderAllocations(placements, {
            maxConcurrentDecoders: 4,
            activeAudioStationId: 'WS-05'
        });

        // WS-05 (index 4) MUST receive decoder despite being the smallest tile
        assert.equal(allocations[4], true);
        assert.equal(allocations.filter(Boolean).length, 4);
    });

    it('6. Selected placement under inspection/editing is guaranteed decoder allocation', () => {
        const placements = [
            { stationId: 'WS-01', width: 800, height: 450 },
            { stationId: 'WS-02', width: 800, height: 450 },
            { stationId: 'WS-03', width: 800, height: 450 },
            { stationId: 'WS-04', width: 800, height: 450 },
            { stationId: 'WS-05', width: 300, height: 168 },
            { stationId: 'WS-06', width: 300, height: 168 }
        ];

        // Operator selects WS-06 (index 5)
        const allocations = computeDecoderAllocations(placements, {
            maxConcurrentDecoders: 4,
            selectedFeedIndex: 5
        });

        assert.equal(allocations[5], true);
        assert.equal(allocations.filter(Boolean).length, 4);
    });

    it('7. Largest placements on canvas by on-screen area receive remaining decoder slots', () => {
        const placements = [
            { stationId: 'WS-01', width: 300, height: 168 }, // Area: 50,400
            { stationId: 'WS-02', width: 1200, height: 675 }, // Hero Area: 810,000 (Slot 1)
            { stationId: 'WS-03', width: 900, height: 506 }, // Sub-Hero Area: 455,400 (Slot 2)
            { stationId: 'WS-04', width: 600, height: 337 }, // Medium Area: 202,200 (Slot 3)
            { stationId: 'WS-05', width: 500, height: 281 }, // Medium Area: 140,500 (Slot 4)
            { stationId: 'WS-06', width: 200, height: 112 }  // Micro tile: 22,400
        ];

        const allocations = computeDecoderAllocations(placements, { maxConcurrentDecoders: 4 });

        assert.equal(allocations[1], true); // WS-02
        assert.equal(allocations[2], true); // WS-03
        assert.equal(allocations[3], true); // WS-04
        assert.equal(allocations[4], true); // WS-05
        assert.equal(allocations[0], false); // WS-01 overflow
        assert.equal(allocations[5], false); // WS-06 overflow
    });

    it('8. Safely handles empty or non-array inputs without throwing', () => {
        assert.deepEqual(computeDecoderAllocations(null), []);
        assert.deepEqual(computeDecoderAllocations([]), []);
    });
});
