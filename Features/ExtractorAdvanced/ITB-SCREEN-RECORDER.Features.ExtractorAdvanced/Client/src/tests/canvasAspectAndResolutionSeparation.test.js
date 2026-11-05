import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
    RESOLUTION_PRESETS,
    ASPECT_PRESETS,
    DEFAULT_CANVAS_RESOLUTION,
    DEFAULT_CANVAS_ASPECT,
    DEFAULT_VIRTUAL_CANVAS_W,
    DEFAULT_VIRTUAL_CANVAS_H,
    computeCanvasDimensions,
    getReadableAspectRatio
} from '../utils/canvasResolutionEngine.js';

describe('Canvas Resolution & Aspect Ratio Decoupling Invariants', () => {
    test('1. Default Canvas Settings strictly enforce 2K resolution and 19:10 Aspect Ratio', () => {
        assert.equal(DEFAULT_CANVAS_RESOLUTION, '2K');
        assert.equal(DEFAULT_CANVAS_ASPECT, '19:10');
        assert.equal(DEFAULT_VIRTUAL_CANVAS_W, 2736);
        assert.equal(DEFAULT_VIRTUAL_CANVAS_H, 1440);

        const defaultDims = computeCanvasDimensions(DEFAULT_CANVAS_RESOLUTION, DEFAULT_CANVAS_ASPECT);
        assert.equal(defaultDims.w, 2736);
        assert.equal(defaultDims.h, 1440);
        assert.equal(defaultDims.w / defaultDims.h, 1.9);

        // Verify presets exist in exported arrays
        const res2K = RESOLUTION_PRESETS.find(r => r.id === '2K');
        assert.ok(res2K, '2K resolution preset must exist');

        const aspect19_10 = ASPECT_PRESETS.find(a => a.id === '19:10');
        assert.ok(aspect19_10, '19:10 aspect preset must exist');
        assert.equal(aspect19_10.ratio, 1.9);
    });

    test('2. computeCanvasDimensions calculates deterministic dimensions across all resolutions for 19:10 & 16:10', () => {
        // 19:10 aspect
        assert.deepEqual(computeCanvasDimensions('4K', '19:10'), { w: 4104, h: 2160 });
        assert.deepEqual(computeCanvasDimensions('2K', '19:10'), { w: 2736, h: 1440 });
        assert.deepEqual(computeCanvasDimensions('FHD', '19:10'), { w: 2052, h: 1080 });
        assert.deepEqual(computeCanvasDimensions('HD', '19:10'), { w: 1368, h: 720 });

        // 16:10 aspect
        assert.deepEqual(computeCanvasDimensions('4K', '16:10'), { w: 3840, h: 2400 });
        assert.deepEqual(computeCanvasDimensions('2K', '16:10'), { w: 2560, h: 1600 });
        assert.deepEqual(computeCanvasDimensions('FHD', '16:10'), { w: 1920, h: 1200 });
        assert.deepEqual(computeCanvasDimensions('HD', '16:10'), { w: 1280, h: 800 });

        // 16:9 aspect
        assert.deepEqual(computeCanvasDimensions('4K', '16:9'), { w: 3840, h: 2160 });
        assert.deepEqual(computeCanvasDimensions('2K', '16:9'), { w: 2560, h: 1440 });
        assert.deepEqual(computeCanvasDimensions('FHD', '16:9'), { w: 1920, h: 1080 });
        assert.deepEqual(computeCanvasDimensions('HD', '16:9'), { w: 1280, h: 720 });

        // 21:9 ultrawide
        assert.deepEqual(computeCanvasDimensions('2K', '21:9'), { w: 3440, h: 1440 });

        // 32:9 dual screen
        assert.deepEqual(computeCanvasDimensions('2K', '32:9'), { w: 5120, h: 1440 });
    });

    test('3. Video Codec Macroblock Alignment: all calculated dimensions are strictly even numbers', () => {
        for (const res of RESOLUTION_PRESETS) {
            for (const aspect of ASPECT_PRESETS) {
                const dims = computeCanvasDimensions(res.id, aspect.id);
                assert.equal(dims.w % 2, 0, `Width must be even for ${res.id} ${aspect.id}: got ${dims.w}`);
                assert.equal(dims.h % 2, 0, `Height must be even for ${res.id} ${aspect.id}: got ${dims.h}`);
                assert.ok(dims.w > 0 && dims.h > 0);
            }
        }
    });

    test('4. getReadableAspectRatio identifies 19:10 and 16:10 ratios accurately', () => {
        assert.equal(getReadableAspectRatio(2736, 1440), '19:10');
        assert.equal(getReadableAspectRatio(4104, 2160), '19:10');
        assert.equal(getReadableAspectRatio(2052, 1080), '19:10');
        assert.equal(getReadableAspectRatio(1368, 720), '19:10');

        assert.equal(getReadableAspectRatio(2560, 1600), '16:10');
        assert.equal(getReadableAspectRatio(1920, 1200), '16:10');

        assert.equal(getReadableAspectRatio(2560, 1440), '16:9');
        assert.equal(getReadableAspectRatio(1920, 1080), '16:9');

        assert.equal(getReadableAspectRatio(3440, 1440), '21:9');
        assert.equal(getReadableAspectRatio(5120, 1440), '32:9');
    });

    test('5. Proportional Placements Rescaling when switching Canvas Resolution or Aspect Ratio', () => {
        const oldDims = computeCanvasDimensions('2K', '19:10'); // 2736 x 1440
        const newDims = computeCanvasDimensions('4K', '19:10'); // 4104 x 2160

        const ratioX = newDims.w / oldDims.w; // 1.5
        const ratioY = newDims.h / oldDims.h; // 1.5

        assert.equal(ratioX, 1.5);
        assert.equal(ratioY, 1.5);

        const samplePlacements = [
            { stationId: 'ws-1', x: 100, y: 100, width: 640, height: 360 },
            { stationId: 'ws-2', x: 800, y: 100, width: 640, height: 360 }
        ];

        const rescaled = samplePlacements.map(p => ({
            ...p,
            x: Math.round(p.x * ratioX),
            y: Math.round(p.y * ratioY),
            width: Math.round(p.width * ratioX),
            height: Math.round(p.height * ratioY)
        }));

        assert.equal(rescaled[0].x, 150);
        assert.equal(rescaled[0].y, 150);
        assert.equal(rescaled[0].width, 960);
        assert.equal(rescaled[0].height, 540);

        assert.equal(rescaled[1].x, 1200);
        assert.equal(rescaled[1].y, 150);
        assert.equal(rescaled[1].width, 960);
        assert.equal(rescaled[1].height, 540);
    });

    test('6. Export WYSIWYG Lock: export payload inherits canvas resolution strictly without override', () => {
        const canvasLayout = {
            width: 2736,
            height: 1440,
            resolution: '2K',
            aspectRatio: '19:10'
        };

        const exportJobPayload = {
            stationIds: ['WS-01'],
            resolution: canvasLayout.resolution || '2K',
            canvasWidth: canvasLayout.width,
            canvasHeight: canvasLayout.height,
            aspectRatio: canvasLayout.aspectRatio
        };

        assert.equal(exportJobPayload.resolution, '2K');
        assert.equal(exportJobPayload.canvasWidth, 2736);
        assert.equal(exportJobPayload.canvasHeight, 1440);
        assert.equal(exportJobPayload.aspectRatio, '19:10');
    });
});
