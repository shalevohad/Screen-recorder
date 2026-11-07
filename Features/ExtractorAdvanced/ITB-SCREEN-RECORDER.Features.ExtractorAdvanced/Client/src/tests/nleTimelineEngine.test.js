// ==========================================
// File: Features/ExtractorAdvanced/Client/src/tests/nleTimelineEngine.test.js
// Unit & Integration Tests: Premiere-Style NLE Timeline Engine
// Critical Verification Points: Auto-Keyframing, Interpolation, Transitions, Pruning
// ==========================================
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
    clamp,
    cubicEaseInOut,
    resolveActiveKeyframeIndex,
    interpolateKeyframePlacements,
    synthesizeAutoKeyframe,
    updateKeyframeTransition,
    deleteKeyframe,
    insertExplicitKeyframe
} from '../utils/nleTimelineEngine.js';

describe('NLE Timeline Engine - Critical Verification Test Suite', () => {

    const BASE_EPOCH = 1700000000000; // 1,700,000,000,000 ms

    const sampleFeed1 = {
        stationId: 'station-alpha',
        displayId: 'mon-0',
        label: 'Alpha Main',
        x: 0,
        y: 0,
        width: 1920,
        height: 1080,
        zIndex: 1,
        rotation: 0
    };

    const sampleFeed2 = {
        stationId: 'station-beta',
        displayId: 'mon-0',
        label: 'Beta Main',
        x: 400,
        y: 300,
        width: 960,
        height: 540,
        zIndex: 2,
        rotation: 0
    };

    describe('1. Auto-Keyframe Synthesis Logic', () => {
        it('initializes Root Keyframe 0 at baseEpoch when timeline is empty', () => {
            const result = synthesizeAutoKeyframe({
                prevTimeline: { keyframes: [] },
                newPlacements: [sampleFeed1],
                currentEpochMs: BASE_EPOCH,
                baseEpochMs: BASE_EPOCH,
                virtualW: 1920,
                virtualH: 1080
            });

            assert.equal(result.isNewKeyframe, true);
            assert.equal(result.newIndex, 0);
            assert.equal(result.nextTimeline.keyframes.length, 1);
            assert.equal(result.nextTimeline.keyframes[0].timestampEpochMs, BASE_EPOCH);
            assert.deepEqual(result.nextTimeline.keyframes[0].layout.placements, [sampleFeed1]);
        });

        it('modifying layout near origin (<= baseEpoch + 500ms) updates Keyframe 0 in place', () => {
            const initialTimeline = {
                keyframes: [{
                    id: 'kf_root',
                    timestampEpochMs: BASE_EPOCH,
                    transitionDurationSec: 0.5,
                    transitionType: 'smooth',
                    layout: { width: 1920, height: 1080, placements: [sampleFeed1] }
                }]
            };

            const updatedFeed1 = { ...sampleFeed1, width: 1280, height: 720 };
            const result = synthesizeAutoKeyframe({
                prevTimeline: initialTimeline,
                newPlacements: [updatedFeed1],
                currentEpochMs: BASE_EPOCH + 200, // within 500ms
                baseEpochMs: BASE_EPOCH,
                virtualW: 1920,
                virtualH: 1080
            });

            assert.equal(result.isNewKeyframe, false);
            assert.equal(result.newIndex, 0);
            assert.equal(result.nextTimeline.keyframes.length, 1, 'Should NOT create an extra keyframe');
            assert.equal(result.nextTimeline.keyframes[0].layout.placements[0].width, 1280);
        });

        it('modifying layout mid-stream (> 500ms from origin) creates a NEW keyframe, preserving Keyframe 0', () => {
            const initialTimeline = {
                keyframes: [{
                    id: 'kf_root',
                    timestampEpochMs: BASE_EPOCH,
                    transitionDurationSec: 0.5,
                    transitionType: 'smooth',
                    layout: { width: 1920, height: 1080, placements: [sampleFeed1] }
                }]
            };

            const midStreamEpoch = BASE_EPOCH + 15000; // +15 seconds
            const midStreamPlacements = [sampleFeed1, sampleFeed2]; // Introduced station-beta mid-stream!

            const result = synthesizeAutoKeyframe({
                prevTimeline: initialTimeline,
                newPlacements: midStreamPlacements,
                currentEpochMs: midStreamEpoch,
                baseEpochMs: BASE_EPOCH,
                virtualW: 1920,
                virtualH: 1080
            });

            assert.equal(result.isNewKeyframe, true);
            assert.equal(result.newIndex, 1);
            assert.equal(result.nextTimeline.keyframes.length, 2);

            // Verify Keyframe 0 is preserved with only sampleFeed1
            assert.equal(result.nextTimeline.keyframes[0].layout.placements.length, 1);
            assert.equal(result.nextTimeline.keyframes[0].layout.placements[0].stationId, 'station-alpha');

            // Verify Keyframe 1 has both sampleFeed1 and sampleFeed2
            assert.equal(result.nextTimeline.keyframes[1].timestampEpochMs, midStreamEpoch);
            assert.equal(result.nextTimeline.keyframes[1].layout.placements.length, 2);
        });

        it('modifying layout near an existing keyframe updates that keyframe in place without duplicating', () => {
            const initialTimeline = {
                keyframes: [
                    {
                        id: 'kf_root',
                        timestampEpochMs: BASE_EPOCH,
                        transitionDurationSec: 0.5,
                        transitionType: 'smooth',
                        layout: { width: 1920, height: 1080, placements: [sampleFeed1] }
                    },
                    {
                        id: 'kf_1',
                        timestampEpochMs: BASE_EPOCH + 15000,
                        transitionDurationSec: 0.5,
                        transitionType: 'smooth',
                        layout: { width: 1920, height: 1080, placements: [sampleFeed1, sampleFeed2] }
                    }
                ]
            };

            // Scrubbing slightly around KF1 (+15050ms, within 500ms tolerance)
            const modifiedPlacements = [{ ...sampleFeed1, x: 50 }, sampleFeed2];
            const result = synthesizeAutoKeyframe({
                prevTimeline: initialTimeline,
                newPlacements: modifiedPlacements,
                currentEpochMs: BASE_EPOCH + 15050,
                baseEpochMs: BASE_EPOCH,
                virtualW: 1920,
                virtualH: 1080
            });

            assert.equal(result.isNewKeyframe, false);
            assert.equal(result.newIndex, 1);
            assert.equal(result.nextTimeline.keyframes.length, 2, 'Must not duplicate keyframe');
            assert.equal(result.nextTimeline.keyframes[1].layout.placements[0].x, 50);
        });

        it('automatically maintains chronological ordering when keyframe inserted between existing ones', () => {
            const initialTimeline = {
                keyframes: [
                    { id: 'kf_0', timestampEpochMs: BASE_EPOCH, layout: { placements: [sampleFeed1] } },
                    { id: 'kf_2', timestampEpochMs: BASE_EPOCH + 20000, layout: { placements: [sampleFeed2] } }
                ]
            };

            // Insert intermediate keyframe at +10s
            const result = synthesizeAutoKeyframe({
                prevTimeline: initialTimeline,
                newPlacements: [sampleFeed1, sampleFeed2],
                currentEpochMs: BASE_EPOCH + 10000,
                baseEpochMs: BASE_EPOCH
            });

            assert.equal(result.nextTimeline.keyframes.length, 3);
            assert.equal(result.nextTimeline.keyframes[0].timestampEpochMs, BASE_EPOCH);
            assert.equal(result.nextTimeline.keyframes[1].timestampEpochMs, BASE_EPOCH + 10000);
            assert.equal(result.nextTimeline.keyframes[2].timestampEpochMs, BASE_EPOCH + 20000);
            assert.equal(result.newIndex, 1);
        });
    });

    describe('2. Active Keyframe Index Tracking', () => {
        const keyframes = [
            { id: 'kf_0', timestampEpochMs: BASE_EPOCH },
            { id: 'kf_1', timestampEpochMs: BASE_EPOCH + 10000 },
            { id: 'kf_2', timestampEpochMs: BASE_EPOCH + 30000 }
        ];

        it('resolves active keyframe index across scrubbing epochs correctly', () => {
            assert.equal(resolveActiveKeyframeIndex(keyframes, BASE_EPOCH), 0);
            assert.equal(resolveActiveKeyframeIndex(keyframes, BASE_EPOCH + 5000), 0);
            assert.equal(resolveActiveKeyframeIndex(keyframes, BASE_EPOCH + 10000), 1);
            assert.equal(resolveActiveKeyframeIndex(keyframes, BASE_EPOCH + 25000), 1);
            assert.equal(resolveActiveKeyframeIndex(keyframes, BASE_EPOCH + 30000), 2);
            assert.equal(resolveActiveKeyframeIndex(keyframes, BASE_EPOCH + 60000), 2);
        });
    });

    describe('3. Keyframe Transition Interpolation & Mid-Stream Feed Entrance/Exit', () => {
        const kf0 = {
            id: 'kf_0',
            timestampEpochMs: BASE_EPOCH,
            transitionDurationSec: 0.5,
            transitionType: 'smooth',
            layout: {
                placements: [
                    { stationId: 's1', displayId: 'mon-0', x: 0, y: 0, width: 1000, height: 1000, rotation: 0 }
                ]
            }
        };

        const kf1 = {
            id: 'kf_1',
            timestampEpochMs: BASE_EPOCH + 10000, // 10s mark
            transitionDurationSec: 2.0, // 2s transition (8s to 10s)
            transitionType: 'linear',
            layout: {
                placements: [
                    // s1 moves and scales
                    { stationId: 's1', displayId: 'mon-0', x: 200, y: 100, width: 800, height: 600, rotation: 10 },
                    // s2 introduced mid-stream!
                    { stationId: 's2', displayId: 'mon-0', x: 1000, y: 100, width: 800, height: 600, rotation: 0 }
                ]
            }
        };

        const keyframes = [kf0, kf1];

        it('returns Keyframe 0 layout before transition starts (< 8s mark)', () => {
            const placements = interpolateKeyframePlacements({
                keyframes,
                currentEpochMs: BASE_EPOCH + 7000,
                currentPlacements: kf0.layout.placements
            });

            assert.equal(placements.length, 1);
            assert.equal(placements[0].stationId, 's1');
            assert.equal(placements[0].x, 0);
            assert.equal(placements[0].width, 1000);
            assert.equal(placements[0].opacity ?? 1, 1);
        });

        it('interpolates coordinates linearly at 50% transition progress (9s mark)', () => {
            const placements = interpolateKeyframePlacements({
                keyframes,
                currentEpochMs: BASE_EPOCH + 9000, // Exactly 50% through 2s transition
                currentPlacements: kf0.layout.placements
            });

            const s1 = placements.find(p => p.stationId === 's1');
            assert.ok(s1);
            assert.equal(s1.x, 100, 'x: lerp(0, 200, 0.5) = 100');
            assert.equal(s1.y, 50, 'y: lerp(0, 100, 0.5) = 50');
            assert.equal(s1.width, 900, 'width: lerp(1000, 800, 0.5) = 900');
            assert.equal(s1.height, 800, 'height: lerp(1000, 600, 0.5) = 800');
            assert.equal(s1.rotation, 5, 'rot: lerp(0, 10, 0.5) = 5');
            assert.equal(s1.opacity, 1);
        });

        it('mid-stream introduced station (s2) fades in smoothly from 0 to 1 opacity', () => {
            const placementsAtMid = interpolateKeyframePlacements({
                keyframes,
                currentEpochMs: BASE_EPOCH + 9000, // 50%
                currentPlacements: kf0.layout.placements
            });

            const s2 = placementsAtMid.find(p => p.stationId === 's2');
            assert.ok(s2, 's2 must exist during transition');
            assert.equal(s2.opacity, 0.5, 's2 opacity should be 0.5 at 50% linear progress');
        });

        it('mid-stream deleted station fades out smoothly from 1 to 0 opacity', () => {
            const kfPrune = {
                id: 'kf_prune',
                timestampEpochMs: BASE_EPOCH + 20000,
                transitionDurationSec: 2.0,
                transitionType: 'linear',
                layout: {
                    placements: [
                        // s1 preserved, s2 is removed/pruned
                        { stationId: 's1', displayId: 'mon-0', x: 200, y: 100, width: 800, height: 600, rotation: 10 }
                    ]
                }
            };

            const kfsWithPruning = [kf1, kfPrune];

            // 50% through transition to kfPrune (19s mark)
            const placements = interpolateKeyframePlacements({
                keyframes: kfsWithPruning,
                currentEpochMs: BASE_EPOCH + 19000,
                currentPlacements: kf1.layout.placements
            });

            const s2Pruned = placements.find(p => p.stationId === 's2');
            assert.ok(s2Pruned, 'Pruned station remains in display list with fading opacity');
            assert.equal(s2Pruned.opacity, 0.5, 's2 should have faded to 0.5 opacity (1 - 0.5)');
        });

        it('cut transition switches instantaneously at keyframe timestamp without intermediate interpolation', () => {
            const kfCut = {
                id: 'kf_cut',
                timestampEpochMs: BASE_EPOCH + 10000,
                transitionDurationSec: 1.0,
                transitionType: 'cut',
                layout: {
                    placements: [
                        { stationId: 's1', displayId: 'mon-0', x: 500, y: 500, width: 500, height: 500 }
                    ]
                }
            };

            const kfsCut = [kf0, kfCut];

            // Just before timestamp (9.5s mark)
            const beforeCut = interpolateKeyframePlacements({
                keyframes: kfsCut,
                currentEpochMs: BASE_EPOCH + 9500,
                currentPlacements: kf0.layout.placements
            });
            assert.equal(beforeCut[0].x, 0, 'Must remain at preceding state during cut transition lead-in');

            // At or after timestamp (10.0s mark)
            const afterCut = interpolateKeyframePlacements({
                keyframes: kfsCut,
                currentEpochMs: BASE_EPOCH + 10000,
                currentPlacements: kf0.layout.placements
            });
            assert.equal(afterCut[0].x, 500, 'Must flip instantaneously to new state at cut timestamp');
        });
    });

    describe('4. Keyframe Mutations & Transition Adjustments', () => {
        const timeline = {
            keyframes: [
                { id: 'kf_0', timestampEpochMs: BASE_EPOCH, transitionType: 'smooth', transitionDurationSec: 0.5 },
                { id: 'kf_1', timestampEpochMs: BASE_EPOCH + 10000, transitionType: 'smooth', transitionDurationSec: 0.5 }
            ]
        };

        it('updates keyframe transition type and duration accurately', () => {
            const updated = updateKeyframeTransition(timeline, 1, {
                transitionType: 'cut',
                transitionDurationSec: 1.5
            });

            assert.equal(updated.keyframes[1].transitionType, 'cut');
            assert.equal(updated.keyframes[1].transitionDurationSec, 1.5);
            assert.equal(updated.keyframes[0].transitionType, 'smooth', 'Preceding keyframe untouched');
        });

        it('deletes mid-stream keyframe and updates active index', () => {
            const result = deleteKeyframe(timeline, 1);
            assert.equal(result.success, true);
            assert.equal(result.nextTimeline.keyframes.length, 1);
            assert.equal(result.newIndex, 0);
        });

        it('strictly rejects deleting root keyframe 0 to protect timeline integrity', () => {
            const result = deleteKeyframe(timeline, 0);
            assert.equal(result.success, false);
            assert.equal(result.nextTimeline.keyframes.length, 2);
        });

        it('inserts explicit keyframe at playhead and prevents duplicate within tolerance', () => {
            const insertResult1 = insertExplicitKeyframe(timeline, BASE_EPOCH + 5000, { placements: [sampleFeed1] });
            assert.equal(insertResult1.isNew, true);
            assert.equal(insertResult1.nextTimeline.keyframes.length, 3);
            assert.equal(insertResult1.newIndex, 1);

            // Attempt duplicate insertion at +5100ms
            const duplicateResult = insertExplicitKeyframe(insertResult1.nextTimeline, BASE_EPOCH + 5100, { placements: [sampleFeed1] });
            assert.equal(duplicateResult.isNew, false);
            assert.equal(duplicateResult.nextTimeline.keyframes.length, 3, 'Must not insert duplicate');
        });
    });

    describe('5. Two Screens Layout Transformation with Keyframe Transition', () => {
        // Layout 0: Split screen (2 screens side by side)
        const screenA_Layout0 = {
            stationId: 'WS-01',
            displayId: 'mon-0',
            x: 0,
            y: 0,
            width: 960,
            height: 1080,
            zIndex: 0
        };

        const screenB_Layout0 = {
            stationId: 'WS-02',
            displayId: 'mon-0',
            x: 960,
            y: 0,
            width: 960,
            height: 1080,
            zIndex: 1
        };

        // Layout 1: Screen A fullscreen, Screen B PiP
        const screenA_Layout1 = {
            stationId: 'WS-01',
            displayId: 'mon-0',
            x: 0,
            y: 0,
            width: 1920,
            height: 1080,
            zIndex: 0
        };

        const screenB_Layout1 = {
            stationId: 'WS-02',
            displayId: 'mon-0',
            x: 1400,
            y: 700,
            width: 480,
            height: 270,
            zIndex: 1
        };

        const keyframe0 = {
            id: 'kf_0',
            timestampEpochMs: BASE_EPOCH, // t = 0
            transitionType: 'cut',
            transitionDurationSec: 0.0,
            layout: {
                width: 1920,
                height: 1080,
                placements: [screenA_Layout0, screenB_Layout0]
            }
        };

        const keyframe1 = {
            id: 'kf_1',
            timestampEpochMs: BASE_EPOCH + 5000, // t = 5.0s
            transitionType: 'smooth',
            transitionDurationSec: 1.0, // 1s smooth transition (4.0s -> 5.0s)
            layout: {
                width: 1920,
                height: 1080,
                placements: [screenA_Layout1, screenB_Layout1]
            }
        };

        const twoScreenTimeline = [keyframe0, keyframe1];

        it('displays exact Layout 0 initial configuration from start of cut until transition window', () => {
            // At t = 0s
            const at0 = interpolateKeyframePlacements({
                keyframes: twoScreenTimeline,
                currentEpochMs: BASE_EPOCH,
                currentPlacements: keyframe0.layout.placements
            });

            const a0 = at0.find(p => p.stationId === 'WS-01');
            const b0 = at0.find(p => p.stationId === 'WS-02');
            assert.equal(a0.x, 0);
            assert.equal(a0.width, 960);
            assert.equal(b0.x, 960);
            assert.equal(b0.width, 960);

            // At t = 3.5s (before transition lead-in at 4.0s)
            const at35 = interpolateKeyframePlacements({
                keyframes: twoScreenTimeline,
                currentEpochMs: BASE_EPOCH + 3500,
                currentPlacements: keyframe0.layout.placements
            });

            const a35 = at35.find(p => p.stationId === 'WS-01');
            const b35 = at35.find(p => p.stationId === 'WS-02');
            assert.equal(a35.x, 0);
            assert.equal(a35.width, 960);
            assert.equal(b35.x, 960);
            assert.equal(b35.width, 960);
        });

        it('smoothly animates positions and dimensions between Layout 0 and Layout 1 during transition window', () => {
            // Mid-transition at t = 4.5s (50% progress)
            const mid = interpolateKeyframePlacements({
                keyframes: twoScreenTimeline,
                currentEpochMs: BASE_EPOCH + 4500,
                currentPlacements: keyframe0.layout.placements
            });

            const aMid = mid.find(p => p.stationId === 'WS-01');
            const bMid = mid.find(p => p.stationId === 'WS-02');

            // Screen A expands smoothly from 960 towards 1920
            assert.ok(aMid.width > 960, `Screen A width (${aMid.width}) should have expanded past 960`);
            assert.ok(aMid.width < 1920, `Screen A width (${aMid.width}) should not yet have reached 1920`);

            // Screen B moves smoothly from x=960 towards x=1400 and shrinks from 960 towards 480
            assert.ok(bMid.x > 960, `Screen B x (${bMid.x}) should have moved past 960`);
            assert.ok(bMid.x < 1400, `Screen B x (${bMid.x}) should not yet have reached 1400`);
            assert.ok(bMid.width < 960, `Screen B width (${bMid.width}) should have shrunk below 960`);
            assert.ok(bMid.width > 480, `Screen B width (${bMid.width}) should not yet have reached 480`);
        });

        it('settles precisely into Layout 1 configuration after transition completes', () => {
            // At t = 5.0s
            const at5 = interpolateKeyframePlacements({
                keyframes: twoScreenTimeline,
                currentEpochMs: BASE_EPOCH + 5000,
                currentPlacements: keyframe0.layout.placements
            });

            const a5 = at5.find(p => p.stationId === 'WS-01');
            const b5 = at5.find(p => p.stationId === 'WS-02');
            assert.equal(a5.x, 0);
            assert.equal(a5.width, 1920);
            assert.equal(b5.x, 1400);
            assert.equal(b5.y, 700);
            assert.equal(b5.width, 480);
            assert.equal(b5.height, 270);

            // At t = 10.0s (well after transition)
            const at10 = interpolateKeyframePlacements({
                keyframes: twoScreenTimeline,
                currentEpochMs: BASE_EPOCH + 10000,
                currentPlacements: keyframe0.layout.placements
            });

            const a10 = at10.find(p => p.stationId === 'WS-01');
            const b10 = at10.find(p => p.stationId === 'WS-02');
            assert.equal(a10.width, 1920);
            assert.equal(b10.width, 480);
            assert.equal(b10.x, 1400);
        });
    });
});
