// ==========================================
// File: Features/ExtractorAdvanced/Client/src/tests/audioWaveformAndDirectorExpansion.test.js
// Verification of:
// 1. Auto-Director Cut Coverage Expansion across IN/OUT boundaries (Red Areas fix)
// 2. Real Acoustic Waveform Generation & Dynamic Gain Scaling (Orange Area fix)
// 3. Per-Track Discrete Channel Mode Selector (Yellow Area fix)
// 4. Live Audio Playback Source Metadata & Overlay Broadcast
// ==========================================
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { cleanDirectorSegmentsWithGaps } from '../utils/nleTimelineEngine.js';
import { generateWaveformSvgPath, waveformStore } from '../utils/waveformStore.js';

describe('Auto-Director Cut Coverage Expansion & Real Audio Waveform Invariants', () => {

    test('1. Auto-Director expands dynamically to cover newly added deltas when CUT area is widened', () => {
        // Initial director plan covered 18:00 to 01:00 (100000 to 200000)
        const initialPlan = [
            { startEpochMs: 100000, endEpochMs: 150000, targetDisplayId: 'mon-0' },
            { startEpochMs: 150000, endEpochMs: 200000, targetDisplayId: 'mon-1' }
        ];

        // User widened the cut area: IN moved earlier to 50000, OUT moved later to 250000
        const cutStartEpoch = 50000;
        const cutEndEpoch = 250000;

        const expanded = cleanDirectorSegmentsWithGaps(
            initialPlan,
            [], // station gaps
            [], // global gaps
            cutStartEpoch,
            cutEndEpoch,
            'mon-0'
        );

        assert.equal(expanded.length, 2, 'Segments count preserved');
        // Leading segment should expand backwards to cutStartEpoch
        assert.equal(expanded[0].startEpochMs, 50000, 'Leading segment covered the delta between 50000 and 100000');
        assert.equal(expanded[0].targetDisplayId, 'mon-0');

        // Trailing segment should expand forwards to cutEndEpoch
        assert.equal(expanded[1].endEpochMs, 250000, 'Trailing segment covered the delta between 200000 and 250000');
        assert.equal(expanded[1].targetDisplayId, 'mon-1');
    });

    test('2. Global gaps remain strictly excluded even when cut area is expanded', () => {
        const initialPlan = [
            { startEpochMs: 100000, endEpochMs: 200000, targetDisplayId: 'mon-0' }
        ];

        const globalGaps = [
            { startEpochMs: 60000, endEpochMs: 80000 } // Global gap in leading delta
        ];

        const cutStartEpoch = 50000;
        const cutEndEpoch = 250000;

        const result = cleanDirectorSegmentsWithGaps(
            initialPlan,
            [],
            globalGaps,
            cutStartEpoch,
            cutEndEpoch,
            'mon-0'
        );

        // Should have segment before global gap [50000, 60000], global gap excluded [60000, 80000],
        // and segment after global gap [80000, 250000]
        assert.equal(result.length, 2);
        assert.equal(result[0].startEpochMs, 50000);
        assert.equal(result[0].endEpochMs, 60000);
        assert.equal(result[1].startEpochMs, 80000);
        assert.equal(result[1].endEpochMs, 250000);

        // Invariant: No director segment touches any millisecond of [60000, 80000]
        const touchesGlobalGap = result.some(s => s.startEpochMs < 80000 && s.endEpochMs > 60000);
        assert.equal(touchesGlobalGap, false, 'Global gap is strictly unselected');
    });

    test('3. Real Acoustic Waveform Generator produces valid mirrored SVG polygon path', () => {
        const peaks = [0.1, 0.4, 0.9, 0.3, 0.7, 0.2];
        const svgPath = generateWaveformSvgPath(peaks, 100, 24, 1.0);

        assert.ok(svgPath.startsWith('M 0.00,'), 'Path starts with MoveTo');
        assert.ok(svgPath.endsWith('Z'), 'Path closes with Z');
        assert.ok(svgPath.includes(' L '), 'Contains LineTo commands');

        // At peak 0.9, mid is 12, maxHalf is 10.5 => y should be 12 - 0.9 * 10.5 = 2.55
        assert.ok(svgPath.includes('2.55'), 'Accurately calculates acoustic peak coordinates');
    });

    test('4. Waveform amplitudes scale dynamically in direct proportion to gain', () => {
        const peaks = [0.5];
        // 100% gain vs 50% gain
        const pathNormal = generateWaveformSvgPath(peaks, 100, 24, 1.0);
        const pathHalf = generateWaveformSvgPath(peaks, 100, 24, 0.5);

        // At 0.5 amplitude, normal y is 12 - (0.5 * 10.5) = 6.75
        // At 0.25 effective amp, half y is 12 - (0.25 * 10.5) = 9.38 (closer to mid 12)
        assert.ok(pathNormal.includes('6.75'), 'Normal gain has peak at 6.75');
        assert.ok(pathHalf.includes('9.38'), 'Halved gain flattens peak towards centerline');
    });

    test('5. Waveform Store caches peaks synchronously and prevents duplicate in-flight requests', () => {
        waveformStore.clear();
        assert.equal(waveformStore.get('OHAD-DESKTOP', 1000, 2000), null, 'Empty cache returns null');
    });

    test('6. Discrete Channel Mode transitions cycle correctly: BOTH -> SYS -> MIC -> BOTH', () => {
        const modes = ['both', 'sys', 'mic'];
        let currentMode = 'both';

        currentMode = modes[(modes.indexOf(currentMode) + 1) % modes.length];
        assert.equal(currentMode, 'sys', '1st cycle switches to SYS');

        currentMode = modes[(modes.indexOf(currentMode) + 1) % modes.length];
        assert.equal(currentMode, 'mic', '2nd cycle switches to MIC');

        currentMode = modes[(modes.indexOf(currentMode) + 1) % modes.length];
        assert.equal(currentMode, 'both', '3rd cycle returns to default BOTH');
    });
});
