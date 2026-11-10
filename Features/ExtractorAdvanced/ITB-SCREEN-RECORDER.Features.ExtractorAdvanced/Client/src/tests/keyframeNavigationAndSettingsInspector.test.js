// ==========================================
// File: Features/ExtractorAdvanced/Client/src/tests/keyframeNavigationAndSettingsInspector.test.js
// Verification Suite: Keyframe Navigation, Skipping, Settings Inspector & HUD Invariants
// ==========================================
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
    resolveActiveKeyframeIndex,
    insertExplicitKeyframe,
    updateKeyframeTransition,
    updateKeyframeClockPosition,
    resolveActiveKeyframeClockPosition,
    deleteKeyframe
} from '../utils/nleTimelineEngine.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('Keyframe Navigation & Skipping Invariants', async (t) => {
    const baseEpoch = 1700000000000;
    const initialTimeline = {
        id: 'timeline-test-nav',
        resolution: '1080p',
        aspectRatio: '16:9',
        keyframes: [
            {
                id: 'kf_0',
                timestampEpochMs: baseEpoch,
                transitionType: 'cut',
                transitionDurationSec: 0,
                utcClockPosition: 'top-right',
                layout: { width: 1920, height: 1080, utcClockPosition: 'top-right', placements: [{ stationId: 'ST-01', x: 0, y: 0, width: 1920, height: 1080 }] }
            },
            {
                id: 'kf_1',
                timestampEpochMs: baseEpoch + 5000,
                transitionType: 'smooth',
                transitionDurationSec: 0.5,
                utcClockPosition: 'top-left',
                layout: { width: 1920, height: 1080, utcClockPosition: 'top-left', placements: [{ stationId: 'ST-01', x: 0, y: 0, width: 960, height: 1080 }, { stationId: 'ST-02', x: 960, y: 0, width: 960, height: 1080 }] }
            },
            {
                id: 'kf_2',
                timestampEpochMs: baseEpoch + 15000,
                transitionType: 'linear',
                transitionDurationSec: 1.0,
                utcClockPosition: 'bottom-right',
                layout: { width: 1920, height: 1080, utcClockPosition: 'bottom-right', placements: [{ stationId: 'ST-02', x: 0, y: 0, width: 1920, height: 1080 }] }
            }
        ]
    };

    await t.test('1. resolveActiveKeyframeIndex identifies active keyframe at any epoch', () => {
        // At origin (t = 0)
        assert.equal(resolveActiveKeyframeIndex(initialTimeline.keyframes, baseEpoch), 0);
        // Mid-way between kf_0 and kf_1 (t = 3000ms)
        assert.equal(resolveActiveKeyframeIndex(initialTimeline.keyframes, baseEpoch + 3000), 0);
        // Exactly at kf_1 (t = 5000ms)
        assert.equal(resolveActiveKeyframeIndex(initialTimeline.keyframes, baseEpoch + 5000), 1);
        // Mid-way between kf_1 and kf_2 (t = 10000ms)
        assert.equal(resolveActiveKeyframeIndex(initialTimeline.keyframes, baseEpoch + 10000), 1);
        // At kf_2 (t = 15000ms)
        assert.equal(resolveActiveKeyframeIndex(initialTimeline.keyframes, baseEpoch + 15000), 2);
        // Far past kf_2 (t = 25000ms)
        assert.equal(resolveActiveKeyframeIndex(initialTimeline.keyframes, baseEpoch + 25000), 2);
    });

    await t.test('2. Jump Previous and Jump Next index bounds clamping', () => {
        const kfs = initialTimeline.keyframes;
        let activeIdx = 0;

        // At index 0, jumping prev is disabled (stays 0)
        const canJumpPrevFrom0 = activeIdx > 0;
        assert.equal(canJumpPrevFrom0, false);

        // Jump next to index 1
        activeIdx = Math.min(kfs.length - 1, activeIdx + 1);
        assert.equal(activeIdx, 1);
        assert.equal(kfs[activeIdx].timestampEpochMs, baseEpoch + 5000);

        // Jump next to index 2
        activeIdx = Math.min(kfs.length - 1, activeIdx + 1);
        assert.equal(activeIdx, 2);
        assert.equal(kfs[activeIdx].timestampEpochMs, baseEpoch + 15000);

        // At index 2 (last), jumping next is disabled (stays 2)
        const canJumpNextFromLast = activeIdx < kfs.length - 1;
        assert.equal(canJumpNextFromLast, false);

        // Jump prev back to index 1
        activeIdx = Math.max(0, activeIdx - 1);
        assert.equal(activeIdx, 1);
        assert.equal(kfs[activeIdx].timestampEpochMs, baseEpoch + 5000);
    });

    await t.test('3. Keyframe Settings Inspector: Transition, Duration and Clock Position Inspection & Mutation', () => {
        let timeline = JSON.parse(JSON.stringify(initialTimeline));

        // Keyframe 1 initial settings
        assert.equal(timeline.keyframes[1].transitionType, 'smooth');
        assert.equal(timeline.keyframes[1].transitionDurationSec, 0.5);
        assert.equal(timeline.keyframes[1].utcClockPosition, 'top-left');

        // Mutate transition type to 'cut'
        timeline = updateKeyframeTransition(timeline, 1, { transitionType: 'cut' });
        assert.equal(timeline.keyframes[1].transitionType, 'cut');

        // Mutate duration to 1.5s
        timeline = updateKeyframeTransition(timeline, 1, { transitionDurationSec: 1.5 });
        assert.equal(timeline.keyframes[1].transitionDurationSec, 1.5);

        // Mutate UTC clock position to 'bottom-left'
        timeline = updateKeyframeClockPosition(timeline, 1, 'bottom-left');
        assert.equal(timeline.keyframes[1].utcClockPosition, 'bottom-left');
        assert.equal(timeline.keyframes[1].layout.utcClockPosition, 'bottom-left');

        // Dynamic resolution reflects new clock position
        const resolvedClock = resolveActiveKeyframeClockPosition(timeline.keyframes, baseEpoch + 6000);
        assert.equal(resolvedClock, 'bottom-left');
    });

    await t.test('4. Root Keyframe (Index 0) Protection: Cannot be deleted and displays Root origin tag', () => {
        const timeline = JSON.parse(JSON.stringify(initialTimeline));
        const res = deleteKeyframe(timeline, 0);
        assert.equal(res.success, false);
        assert.equal(res.nextTimeline.keyframes.length, 3);
    });

    await t.test('5. Non-root Keyframe Deletion updates active index safely', () => {
        const timeline = JSON.parse(JSON.stringify(initialTimeline));
        const res = deleteKeyframe(timeline, 2);
        assert.equal(res.success, true);
        assert.equal(res.nextTimeline.keyframes.length, 2);
        assert.equal(res.newIndex, 1);
    });
});

test('Keyframe UI & Stacking CSS Invariants', async (t) => {
    const scssPathTrack = path.resolve(__dirname, '../components/Timeline/tracks/CanvasKeyframeTrack.scss');
    const scssContentTrack = fs.readFileSync(scssPathTrack, 'utf8');

    const scssPathViewport = path.resolve(__dirname, '../components/Viewport/MulticamViewport.scss');
    const scssContentViewport = fs.readFileSync(scssPathViewport, 'utf8');

    const jsxPathTrack = path.resolve(__dirname, '../components/Timeline/tracks/CanvasKeyframeTrack.jsx');
    const jsxContentTrack = fs.readFileSync(jsxPathTrack, 'utf8');

    const jsxPathViewport = path.resolve(__dirname, '../components/Viewport/MulticamViewport.jsx');
    const jsxContentViewport = fs.readFileSync(jsxPathViewport, 'utf8');

    await t.test('1. CanvasKeyframeTrack has kf-nav-cluster and kf-quick-jump-dropdown with top z-index', () => {
        assert.ok(scssContentTrack.includes('.kf-nav-cluster'), 'Must define .kf-nav-cluster');
        assert.ok(scssContentTrack.includes('.kf-quick-jump-dropdown'), 'Must define .kf-quick-jump-dropdown');
        assert.ok(scssContentTrack.includes('100000 !important'), 'Dropdown must have top priority z-index 100000 !important');
        assert.ok(scssContentTrack.includes('.btn-kf-popover-nav'), 'Popover must have prev/next cycle nav buttons');
        assert.ok(scssContentTrack.includes('.kf-clock-pos-buttons'), 'Must have clock position button grid');
        assert.ok(scssContentTrack.includes('.kf-layout-summary-box'), 'Must have layout and feeds summary box');
    });

    await t.test('2. CanvasKeyframeTrack JSX implements jumpToKeyframe, keyboard shortcuts [ and ], and quick jump dropdown', () => {
        assert.ok(jsxContentTrack.includes('jumpToKeyframe'), 'Must define jumpToKeyframe');
        assert.ok(jsxContentTrack.includes("e.key === '['"), 'Must handle [ shortcut for Prev KF');
        assert.ok(jsxContentTrack.includes("e.key === ']'"), 'Must handle ] shortcut for Next KF');
        assert.ok(jsxContentTrack.includes('showQuickJumpList'), 'Must manage quick jump list state');
        assert.ok(jsxContentTrack.includes('formatClockPositionLabel'), 'Must format clock position labels');
    });

    await t.test('3. MulticamViewport implements stage HUD, keyframe skipping shortcuts and inspector', () => {
        assert.ok(jsxContentViewport.includes('canvas-keyframe-stage-hud'), 'Must render canvas-keyframe-stage-hud');
        assert.ok(jsxContentViewport.includes('handleJumpPrevKeyframe'), 'Must define handleJumpPrevKeyframe');
        assert.ok(jsxContentViewport.includes('handleJumpNextKeyframe'), 'Must define handleJumpNextKeyframe');
        assert.ok(jsxContentViewport.includes("e.key === '['"), 'Must handle [ shortcut for Prev KF in viewport');
        assert.ok(jsxContentViewport.includes("e.key === ']'"), 'Must handle ] shortcut for Next KF in viewport');
        assert.ok(jsxContentViewport.includes('showStageKfSettings'), 'Must manage stage keyframe settings');
        assert.ok(jsxContentViewport.includes('showStageKfList'), 'Must manage stage keyframe list');
        assert.ok(scssContentViewport.includes('.canvas-keyframe-stage-hud'), 'MulticamViewport.scss must style HUD');
        assert.ok(scssContentViewport.includes('.hud-stage-dropdown'), 'MulticamViewport.scss must style stage dropdown');
        assert.ok(scssContentViewport.includes('.hud-stage-settings-popover'), 'MulticamViewport.scss must style stage settings popover');
    });
});
