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

    it('computes correct bounds and normalized geometry for 3-monitor layout with portrait and vertically stacked displays', () => {
        const displays = [
            { DisplayId: 'mon-0', X: 0, Y: 0, Width: 1920, Height: 1080, IsPrimary: true },
            { DisplayId: 'mon-1', X: 1920, Y: 0, Width: 1080, Height: 1920, IsPrimary: false }, // Portrait: Height > Width
            { DisplayId: 'mon-2', X: 0, Y: -1080, Width: 1920, Height: 1080, IsPrimary: false } // Stacked above mon-0
        ];

        const bounds = calculateTopologyBounds(displays);
        assert.equal(bounds.minX, 0);
        assert.equal(bounds.minY, -1080);
        assert.equal(bounds.totalWidth, 3000); // 1920 + 1080
        assert.equal(bounds.totalHeight, 3000); // from -1080 to +1920

        // mon-2 (Top stacked): left = 0/3000 = 0%, top = (-1080 - (-1080))/3000 = 0%, width = 1920/3000 = 64%, height = 1080/3000 = 36%
        const rectTop = calculateNormalizedDisplayRect(displays[2], bounds);
        assert.equal(rectTop.leftPct, 0);
        assert.equal(rectTop.topPct, 0);
        assert.equal(rectTop.widthPct, 64);
        assert.equal(rectTop.heightPct, 36);

        // mon-0 (Primary center): left = 0/3000 = 0%, top = (0 - (-1080))/3000 = 36%, width = 1920/3000 = 64%, height = 1080/3000 = 36%
        const rectCenter = calculateNormalizedDisplayRect(displays[0], bounds);
        assert.equal(rectCenter.leftPct, 0);
        assert.equal(rectCenter.topPct, 36);
        assert.equal(rectCenter.widthPct, 64);
        assert.equal(rectCenter.heightPct, 36);

        // mon-1 (Portrait right): left = 1920/3000 = 64%, top = (0 - (-1080))/3000 = 36%, width = 1080/3000 = 36%, height = 1920/3000 = 64%
        const rectPortrait = calculateNormalizedDisplayRect(displays[1], bounds);
        assert.equal(rectPortrait.leftPct, 64);
        assert.equal(rectPortrait.topPct, 36);
        assert.equal(rectPortrait.widthPct, 36);
        assert.equal(rectPortrait.heightPct, 64);
    });

    it('handles arbitrary 4-monitor layout with negative X offset (extended left wing)', () => {
        const displays = [
            { DisplayId: 'mon-0', X: 0, Y: 0, Width: 1920, Height: 1080, IsPrimary: true },
            { DisplayId: 'mon-1', X: 1920, Y: 0, Width: 1080, Height: 1920, IsPrimary: false },
            { DisplayId: 'mon-2', X: 0, Y: -1080, Width: 1920, Height: 1080, IsPrimary: false },
            { DisplayId: 'mon-3', X: -1920, Y: 0, Width: 1920, Height: 1080, IsPrimary: false } // Left wing
        ];

        const bounds = calculateTopologyBounds(displays);
        assert.equal(bounds.minX, -1920);
        assert.equal(bounds.minY, -1080);
        assert.equal(bounds.totalWidth, 4920); // 1920 + 1920 + 1080
        assert.equal(bounds.totalHeight, 3000);

        const rectLeft = calculateNormalizedDisplayRect(displays[3], bounds);
        assert.equal(rectLeft.leftPct, 0); // starts at leftmost minX (-1920)
        assert.equal(rectLeft.topPct, 36); // (0 - (-1080)) / 3000
    });

    it('clamps volume properly to [0, 1]', () => {
        assert.equal(clampVolume(-0.5), 0);
        assert.equal(clampVolume(1.5), 1);
        assert.equal(clampVolume(0.42), 0.42);
        assert.equal(clampVolume(NaN), 0.8);
    });
});

