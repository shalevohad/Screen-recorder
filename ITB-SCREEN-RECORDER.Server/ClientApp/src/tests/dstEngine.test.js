import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
    getLocalOffsetMinutes,
    setCustomDstTransitions,
    getLocalTimeComponents,
    getUtcTimeComponents,
    getTimeComponents,
    formatDateTimeComponents,
    dateTimeToEpochMs
} from '../utils/dstEngine.js';

describe('Server DST Engine & Host-Independent Time Calibration', () => {
    it('computes default local offset (+120 min) when no rules configured', () => {
        const epoch = Date.UTC(2026, 10, 1, 12, 0, 0); // 2026-11-01 12:00:00 UTC
        const res = getLocalOffsetMinutes(epoch);
        assert.equal(res.offsetMin, 120);
    });

    it('getLocalTimeComponents yields exact calibrated local time independent of client OS timezone', () => {
        const epochUtc = Date.UTC(2026, 10, 1, 12, 0, 0); // 12:00 UTC
        const comp = getLocalTimeComponents(epochUtc);

        assert.equal(comp.year, 2026);
        assert.equal(comp.month, 11);
        assert.equal(comp.day, 1);
        assert.equal(comp.hour, 14); // 12:00 UTC + 2h = 14:00
        assert.equal(comp.minute, 0);
        assert.equal(comp.second, 0);
        assert.equal(comp.offsetMin, 120);
    });

    it('getUtcTimeComponents yields exact UTC time components', () => {
        const epochUtc = Date.UTC(2026, 10, 1, 12, 34, 56);
        const comp = getUtcTimeComponents(epochUtc);

        assert.equal(comp.year, 2026);
        assert.equal(comp.month, 11);
        assert.equal(comp.day, 1);
        assert.equal(comp.hour, 12);
        assert.equal(comp.minute, 34);
        assert.equal(comp.second, 56);
        assert.equal(comp.offsetMin, 0);
        assert.equal(comp.label, 'UTC');
    });

    it('getTimeComponents toggles cleanly between LOCAL and UTC modes', () => {
        const epochUtc = Date.UTC(2026, 10, 1, 12, 0, 0);
        const localComp = getTimeComponents(epochUtc, 'LOCAL');
        assert.equal(localComp.hour, 14);

        const utcComp = getTimeComponents(epochUtc, 'UTC');
        assert.equal(utcComp.hour, 12);
    });

    it('formatDateTimeComponents correctly formats LOCAL and UTC strings', () => {
        const epochUtc = Date.UTC(2026, 10, 1, 12, 30, 45);

        const localFormatted = formatDateTimeComponents(epochUtc, 'LOCAL');
        assert.equal(localFormatted.dateStr, '2026-11-01');
        assert.equal(localFormatted.timeStr, '14:30:45');
        assert.equal(localFormatted.fullStr, '2026-11-01T14:30:45');

        const utcFormatted = formatDateTimeComponents(epochUtc, 'UTC');
        assert.equal(utcFormatted.dateStr, '2026-11-01');
        assert.equal(utcFormatted.timeStr, '12:30:45');
        assert.equal(utcFormatted.fullStr, '2026-11-01T12:30:45');
    });

    it('dateTimeToEpochMs correctly converts nominal local string to UTC epoch and round-trips', () => {
        const originalUtcEpoch = Date.UTC(2026, 10, 1, 12, 0, 0);

        // Decompose to nominal local
        const localComp = getLocalTimeComponents(originalUtcEpoch);
        assert.equal(localComp.hour, 14);

        // Convert back to epoch
        const resolvedEpoch = dateTimeToEpochMs('2026-11-01', '14:00:00', 'LOCAL');
        assert.equal(resolvedEpoch, originalUtcEpoch);

        // Convert UTC
        const resolvedUtc = dateTimeToEpochMs('2026-11-01', '12:00:00', 'UTC');
        assert.equal(resolvedUtc, originalUtcEpoch);
    });

    it('handles midnight crossings correctly without date skew', () => {
        // 2026-11-01 22:30:00 UTC -> Local time is 2026-11-02 00:30:00 (+2h)
        const epochUtc = Date.UTC(2026, 10, 1, 22, 30, 0);
        const comp = getLocalTimeComponents(epochUtc);

        assert.equal(comp.year, 2026);
        assert.equal(comp.month, 11);
        assert.equal(comp.day, 2); // Next day!
        assert.equal(comp.hour, 0);
        assert.equal(comp.minute, 30);

        const roundTripEpoch = dateTimeToEpochMs('2026-11-02', '00:30:00', 'LOCAL');
        assert.equal(roundTripEpoch, epochUtc);
    });

    it('supports custom DST transition tables and dynamic offset switching', () => {
        const switchEpoch = Date.UTC(2026, 2, 27, 0, 0, 0); // Friday 02:00 -> 03:00 (+3h IDT)
        setCustomDstTransitions([{
            switchUtc: '2026-03-27T00:00:00.000Z',
            offsetBeforeMinutes: 120,
            offsetAfterMinutes: 180,
            labelBefore: 'IST',
            labelAfter: 'IDT',
            description: 'Summer DST Start'
        }]);

        const beforeSwitch = getLocalOffsetMinutes(switchEpoch - 1000);
        assert.equal(beforeSwitch.offsetMin, 120);
        assert.equal(beforeSwitch.label, 'IST');

        const afterSwitch = getLocalOffsetMinutes(switchEpoch + 1000);
        assert.equal(afterSwitch.offsetMin, 180);
        assert.equal(afterSwitch.label, 'IDT');

        // Reset to empty rules for other tests
        setCustomDstTransitions([]);
    });
});
