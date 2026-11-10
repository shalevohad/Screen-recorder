// ==========================================
// File: Features/ExtractorAdvanced/Client/src/tests/arrowKeyFocusCoordination.test.js
// Verification Suite: Focus-Aware Arrow Key Routing (Playhead Scrubbing vs. Canvas Screen Nudging)
// ==========================================
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('Focus-Aware Arrow Key Routing Invariants', async (t) => {
    // Simulated NLE state
    const totalTimelineDurationMs = 3600000; // 1 hour
    let currentPlayheadMs = 10000;
    const setPlayheadMs = (updater) => {
        if (typeof updater === 'function') {
            currentPlayheadMs = updater(currentPlayheadMs);
        } else {
            currentPlayheadMs = updater;
        }
    };

    // Simulated Canvas placements
    const virtualW = 1920;
    const virtualH = 1080;
    let placements = [
        { stationId: 'ST-01', displayId: 'mon-0', x: 100, y: 100, width: 960, height: 540 }
    ];
    const updateActivePlacements = (next) => {
        placements = next;
    };

    // Helper simulating Arrow key routing logic
    function simulateArrowKeypress({ key, code, activeFocusZone, selectedFeedIndex, ctrlKey = false, shiftKey = false, altKey = false }) {
        let preventedDefault = false;
        let actionTaken = null;

        const e = {
            key,
            code: code || key,
            ctrlKey,
            shiftKey,
            altKey,
            metaKey: false,
            preventDefault: () => { preventedDefault = true; }
        };

        // 1. MulticamViewport logic
        if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
            // If holding Ctrl, Alt, or Meta: ALWAYS yield to timeline playhead scrubbing
            if (e.ctrlKey || e.altKey || e.metaKey) {
                // Yield
            } else if (activeFocusZone === 'canvas' && selectedFeedIndex !== null && selectedFeedIndex >= 0 && placements[selectedFeedIndex]) {
                e.preventDefault();
                const step = e.shiftKey ? 20 : 5;
                let dx = 0;
                let dy = 0;
                if (e.key === 'ArrowLeft') dx = -step;
                if (e.key === 'ArrowRight') dx = step;
                if (e.key === 'ArrowUp') dy = -step;
                if (e.key === 'ArrowDown') dy = step;

                const target = placements[selectedFeedIndex];
                const newX = Math.max(0, Math.min(virtualW - target.width, target.x + dx));
                const newY = Math.max(0, Math.min(virtualH - target.height, target.y + dy));
                const next = placements.map((p, idx) => idx === selectedFeedIndex ? { ...p, x: newX, y: newY } : p);
                updateActivePlacements(next);
                actionTaken = 'canvas-nudge';
                return { actionTaken, preventedDefault, playheadMs: currentPlayheadMs, placements };
            }
        }

        // 2. useStudioHotkeys logic (Timeline Playhead Stepping)
        if (e.code === 'ArrowLeft' || e.code === 'ArrowRight') {
            // If canvas is in active focus (and no Ctrl/Alt held), yield
            if (activeFocusZone === 'canvas' && !e.ctrlKey && !e.altKey && !e.metaKey) {
                return { actionTaken: 'yield-to-canvas', preventedDefault, playheadMs: currentPlayheadMs, placements };
            }

            e.preventDefault();
            const isLeft = e.code === 'ArrowLeft';
            let stepMs;
            if (e.ctrlKey || e.metaKey) {
                stepMs = 33; // 1 frame
            } else if (e.shiftKey) {
                stepMs = 5000; // 5s
            } else {
                stepMs = 1000; // 1s
            }

            setPlayheadMs(prev => isLeft ? Math.max(0, prev - stepMs) : Math.min(totalTimelineDurationMs, prev + stepMs));
            actionTaken = 'playhead-step';
            return { actionTaken, preventedDefault, playheadMs: currentPlayheadMs, placements };
        }

        return { actionTaken, preventedDefault, playheadMs: currentPlayheadMs, placements };
    }

    await t.test('1. When activeFocusZone is "timeline", Arrow keys step Playhead and do NOT move canvas screens', () => {
        currentPlayheadMs = 10000;
        placements[0] = { stationId: 'ST-01', displayId: 'mon-0', x: 100, y: 100, width: 960, height: 540 };

        // Press ArrowRight: steps playhead forward by 1s (1000ms)
        const res1 = simulateArrowKeypress({ key: 'ArrowRight', activeFocusZone: 'timeline', selectedFeedIndex: 0 });
        assert.equal(res1.actionTaken, 'playhead-step');
        assert.equal(res1.playheadMs, 11000);
        assert.equal(placements[0].x, 100, 'Canvas placement X coordinate must remain completely unchanged');

        // Press ArrowLeft: steps playhead backward by 1s (1000ms)
        const res2 = simulateArrowKeypress({ key: 'ArrowLeft', activeFocusZone: 'timeline', selectedFeedIndex: 0 });
        assert.equal(res2.actionTaken, 'playhead-step');
        assert.equal(res2.playheadMs, 10000);
        assert.equal(placements[0].x, 100, 'Canvas placement X coordinate must remain completely unchanged');

        // Press Shift + ArrowRight: steps playhead by 5s (5000ms)
        const res3 = simulateArrowKeypress({ key: 'ArrowRight', activeFocusZone: 'timeline', selectedFeedIndex: 0, shiftKey: true });
        assert.equal(res3.actionTaken, 'playhead-step');
        assert.equal(res3.playheadMs, 15000);
        assert.equal(placements[0].x, 100);

        // Press Ctrl + ArrowLeft: steps 1 frame (~33ms)
        const res4 = simulateArrowKeypress({ key: 'ArrowLeft', activeFocusZone: 'timeline', selectedFeedIndex: 0, ctrlKey: true });
        assert.equal(res4.actionTaken, 'playhead-step');
        assert.equal(res4.playheadMs, 15000 - 33);
        assert.equal(placements[0].x, 100);
    });

    await t.test('2. When activeFocusZone is "canvas" and a screen is selected, Arrow keys nudge canvas screen position', () => {
        currentPlayheadMs = 10000;
        placements[0] = { stationId: 'ST-01', displayId: 'mon-0', x: 100, y: 100, width: 960, height: 540 };

        // Press ArrowRight: nudges X by 5px
        const res1 = simulateArrowKeypress({ key: 'ArrowRight', activeFocusZone: 'canvas', selectedFeedIndex: 0 });
        assert.equal(res1.actionTaken, 'canvas-nudge');
        assert.equal(res1.preventedDefault, true);
        assert.equal(placements[0].x, 105, 'X coordinate must be nudged by 5px');
        assert.equal(res1.playheadMs, 10000, 'Playhead must NOT move when nudging canvas screen');

        // Press Shift + ArrowRight: nudges X by 20px
        const res2 = simulateArrowKeypress({ key: 'ArrowRight', activeFocusZone: 'canvas', selectedFeedIndex: 0, shiftKey: true });
        assert.equal(res2.actionTaken, 'canvas-nudge');
        assert.equal(placements[0].x, 125, 'X coordinate must be nudged by 20px with Shift');
        assert.equal(res2.playheadMs, 10000);

        // Press ArrowDown: nudges Y by 5px
        const res3 = simulateArrowKeypress({ key: 'ArrowDown', activeFocusZone: 'canvas', selectedFeedIndex: 0 });
        assert.equal(res3.actionTaken, 'canvas-nudge');
        assert.equal(placements[0].y, 105, 'Y coordinate must be nudged by 5px');
        assert.equal(res3.playheadMs, 10000);
    });

    await t.test('3. Ctrl modifier always steps Playhead frames even when a screen is focused on Canvas', () => {
        currentPlayheadMs = 10000;
        placements[0] = { stationId: 'ST-01', displayId: 'mon-0', x: 100, y: 100, width: 960, height: 540 };

        // Press Ctrl + ArrowRight: steps playhead forward by 1 frame (33ms) without moving canvas screen
        const res1 = simulateArrowKeypress({ key: 'ArrowRight', activeFocusZone: 'canvas', selectedFeedIndex: 0, ctrlKey: true });
        assert.equal(res1.actionTaken, 'playhead-step');
        assert.equal(res1.playheadMs, 10033);
        assert.equal(placements[0].x, 100, 'Canvas placement must NOT move when Ctrl is held');
    });

    await t.test('4. Boundary Clamping: Canvas nudging clamps strictly within virtual canvas bounds', () => {
        // Placement at (0, 0)
        placements[0] = { stationId: 'ST-01', displayId: 'mon-0', x: 0, y: 0, width: 960, height: 540 };

        // Nudge Left: clamps at X = 0
        simulateArrowKeypress({ key: 'ArrowLeft', activeFocusZone: 'canvas', selectedFeedIndex: 0 });
        assert.equal(placements[0].x, 0, 'Cannot nudge past left edge (X >= 0)');

        // Nudge Up: clamps at Y = 0
        simulateArrowKeypress({ key: 'ArrowUp', activeFocusZone: 'canvas', selectedFeedIndex: 0 });
        assert.equal(placements[0].y, 0, 'Cannot nudge past top edge (Y >= 0)');

        // Placement at right edge (1920 - 960 = 960)
        placements[0].x = 960;
        placements[0].y = 540;
        simulateArrowKeypress({ key: 'ArrowRight', activeFocusZone: 'canvas', selectedFeedIndex: 0 });
        assert.equal(placements[0].x, 960, 'Cannot nudge past right edge (X + width <= virtualW)');

        simulateArrowKeypress({ key: 'ArrowDown', activeFocusZone: 'canvas', selectedFeedIndex: 0 });
        assert.equal(placements[0].y, 540, 'Cannot nudge past bottom edge (Y + height <= virtualH)');
    });
});

test('Focus UI & Component Integration Invariants', async (t) => {
    const studioPath = path.resolve(__dirname, '../ExtractorAdvancedStudio.jsx');
    const studioContent = fs.readFileSync(studioPath, 'utf8');

    const viewportPath = path.resolve(__dirname, '../components/Viewport/MulticamViewport.jsx');
    const viewportContent = fs.readFileSync(viewportPath, 'utf8');

    const transportPath = path.resolve(__dirname, '../components/TransportBar/TransportBar.jsx');
    const transportContent = fs.readFileSync(transportPath, 'utf8');

    const hotkeysPath = path.resolve(__dirname, '../hooks/useStudioHotkeys.js');
    const hotkeysContent = fs.readFileSync(hotkeysPath, 'utf8');

    await t.test('1. ExtractorAdvancedStudio declares activeFocusZone state and propagates to components', () => {
        assert.ok(studioContent.includes("useState('timeline')"), 'Studio must initialize activeFocusZone with timeline default');
        assert.ok(studioContent.includes('activeFocusZone={activeFocusZone}'), 'Studio must pass activeFocusZone prop');
        assert.ok(studioContent.includes('onFocusZoneChange={setActiveFocusZone}'), 'Studio must pass onFocusZoneChange handler');
    });

    await t.test('2. MulticamViewport accepts activeFocusZone and onFocusZoneChange and respects focus', () => {
        assert.ok(viewportContent.includes("activeFocusZone = 'timeline'"), 'Viewport must accept activeFocusZone');
        assert.ok(viewportContent.includes('onFocusZoneChange = null'), 'Viewport must accept onFocusZoneChange');
        assert.ok(viewportContent.includes("activeFocusZone === 'canvas'"), 'Viewport must gate arrow nudging by canvas focus');
        assert.ok(viewportContent.includes("badge-focus-nudge"), 'Viewport must render badge-focus-nudge');
    });

    await t.test('3. TransportBar renders focus mode indicator button and resets focus on click', () => {
        assert.ok(transportContent.includes('btn-focus-indicator'), 'TransportBar must render btn-focus-indicator');
        assert.ok(transportContent.includes('activeFocusZone'), 'TransportBar must accept activeFocusZone');
        assert.ok(transportContent.includes("onFocusZoneChange?.('timeline')"), 'TransportBar must set timeline focus on mouse down');
    });

    await t.test('4. useStudioHotkeys yields Arrow keys to Canvas only when activeFocusZone is canvas and no modifier held', () => {
        assert.ok(hotkeysContent.includes("activeFocusZone = 'timeline'"), 'useStudioHotkeys must accept activeFocusZone');
        assert.ok(hotkeysContent.includes("activeFocusZone === 'canvas' && !e.ctrlKey && !e.altKey && !e.metaKey"), 'Must yield Arrow keys when canvas is focused');
    });
});
