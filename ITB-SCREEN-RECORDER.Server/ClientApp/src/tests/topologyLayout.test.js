import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
    calculateTopologyBounds,
    calculateNormalizedDisplayRect,
    clampVolume
} from '../utils/topologyLayout.js';

describe('Multi-Monitor Topology Layout Engine', () => {
    it('returns default 1080p bounds when displays array is empty or undefined', () => {
        const boundsEmpty = calculateTopologyBounds([]);
        assert.deepEqual(boundsEmpty, { minX: 0, minY: 0, totalWidth: 1920, totalHeight: 1080 });

        const boundsNull = calculateTopologyBounds(null);
        assert.deepEqual(boundsNull, { minX: 0, minY: 0, totalWidth: 1920, totalHeight: 1080 });
    });

    it('computes correct bounds for a single 1440p monitor', () => {
        const displays = [
            { DisplayId: 'mon-0', X: 0, Y: 0, Width: 2560, Height: 1440, IsPrimary: true }
        ];
        const bounds = calculateTopologyBounds(displays);
        assert.equal(bounds.minX, 0);
        assert.equal(bounds.minY, 0);
        assert.equal(bounds.totalWidth, 2560);
        assert.equal(bounds.totalHeight, 1440);
    });

    it('handles side-by-side dual monitors with negative coordinates on extended display', () => {
        const displays = [
            { DisplayId: 'mon-0', X: 0, Y: 0, Width: 1920, Height: 1080, IsPrimary: true },
            { DisplayId: 'mon-1', X: -1920, Y: 0, Width: 1920, Height: 1080, IsPrimary: false }
        ];

        const bounds = calculateTopologyBounds(displays);
        assert.equal(bounds.minX, -1920);
        assert.equal(bounds.minY, 0);
        assert.equal(bounds.totalWidth, 3840);
        assert.equal(bounds.totalHeight, 1080);

        // Check normalized percentages
        const rectMon1 = calculateNormalizedDisplayRect(displays[1], bounds);
        assert.equal(rectMon1.leftPct, 0);
        assert.equal(rectMon1.topPct, 0);
        assert.equal(rectMon1.widthPct, 50);
        assert.equal(rectMon1.heightPct, 100);

        const rectMon0 = calculateNormalizedDisplayRect(displays[0], bounds);
        assert.equal(rectMon0.leftPct, 50);
        assert.equal(rectMon0.topPct, 0);
        assert.equal(rectMon0.widthPct, 50);
        assert.equal(rectMon0.heightPct, 100);
    });

    it('handles vertically stacked dual monitors', () => {
        const displays = [
            { DisplayId: 'mon-0', X: 0, Y: 0, Width: 1920, Height: 1080, IsPrimary: true },
            { DisplayId: 'mon-1', X: 0, Y: -1080, Width: 1920, Height: 1080, IsPrimary: false }
        ];

        const bounds = calculateTopologyBounds(displays);
        assert.equal(bounds.minX, 0);
        assert.equal(bounds.minY, -1080);
        assert.equal(bounds.totalWidth, 1920);
        assert.equal(bounds.totalHeight, 2160);

        const rectTop = calculateNormalizedDisplayRect(displays[1], bounds);
        assert.equal(rectTop.topPct, 0);
        assert.equal(rectTop.heightPct, 50);

        const rectBottom = calculateNormalizedDisplayRect(displays[0], bounds);
        assert.equal(rectBottom.topPct, 50);
        assert.equal(rectBottom.heightPct, 50);
    });

    it('clamps volume properly to [0, 1]', () => {
        assert.equal(clampVolume(-0.5), 0);
        assert.equal(clampVolume(1.5), 1);
        assert.equal(clampVolume(0.42), 0.42);
        assert.equal(clampVolume(NaN), 0.8);
    });
});
