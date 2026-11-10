// ==========================================
// File: Features/ExtractorAdvanced/Client/src/tests/calendarRecordingIndicator.test.js
// Verification Suite: Calendar Recording Indicator (Green Dot on Recorded Dates)
// ==========================================
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('Calendar Recording Indicator Invariants', async (t) => {
    // 1. Static Contract & AST Inspection of MasterTimeRangeModal.jsx
    await t.test('1. MasterTimeRangeModal declares recordingDates state and fetches from backend', () => {
        const modalPath = path.resolve(__dirname, '../components/Modals/MasterTimeRangeModal.jsx');
        assert.ok(fs.existsSync(modalPath), 'MasterTimeRangeModal.jsx must exist');
        const content = fs.readFileSync(modalPath, 'utf8');

        assert.match(content, /const \[recordingDates, setRecordingDates\] = useState\(\[\]\);/,
            'MasterTimeRangeModal must declare recordingDates state');
        assert.match(content, /const recordingDatesSet = useMemo\(\(\) => new Set\(recordingDates\), \[recordingDates\]\);/,
            'MasterTimeRangeModal must memoize recordingDatesSet for O(1) cell lookup');
        assert.match(content, /\/api\/v1\/extractor-advanced\/recording-dates\?timeMode=\$\{timeMode\}/,
            'MasterTimeRangeModal must query /api/v1/extractor-advanced/recording-dates with active timeMode');
    });

    // 2. Cell Rendering Logic & Class Association
    await t.test('2. Calendar cell logic flags dates with recordings and attaches green dot indicator', () => {
        const mockRecordedDates = ['2026-11-02', '2026-11-03', '2026-11-08'];
        const recordingDatesSet = new Set(mockRecordedDates);

        const mockBookmarks = {
            '2026-11-08': [{ id: 'bm-1', title: 'Critical Event' }]
        };

        const testDates = [
            { dateStr: '2026-11-01', expectedDot: false, expectedBookmark: false },
            { dateStr: '2026-11-02', expectedDot: true, expectedBookmark: false },
            { dateStr: '2026-11-03', expectedDot: true, expectedBookmark: false },
            { dateStr: '2026-11-04', expectedDot: false, expectedBookmark: false },
            { dateStr: '2026-11-08', expectedDot: true, expectedBookmark: true }
        ];

        for (const { dateStr, expectedDot, expectedBookmark } of testDates) {
            const hasRecordings = recordingDatesSet.has(dateStr);
            const dayBms = mockBookmarks[dateStr];
            const hasBookmarks = Boolean(dayBms && dayBms.length > 0);

            assert.strictEqual(hasRecordings, expectedDot,
                `Date ${dateStr} hasRecordings expectation mismatch`);
            assert.strictEqual(hasBookmarks, expectedBookmark,
                `Date ${dateStr} hasBookmarks expectation mismatch`);

            let cellTitle = '';
            if (hasBookmarks) {
                cellTitle += `${dayBms.length} Bookmark(s) on this date`;
            }
            if (hasRecordings) {
                cellTitle += (cellTitle ? ' • ' : '') + 'Recordings available';
            }

            if (expectedDot && expectedBookmark) {
                assert.ok(cellTitle.includes('Recordings available') && cellTitle.includes('Bookmark(s)'),
                    'Cell title must include both bookmarks and recordings info when both exist');
            } else if (expectedDot) {
                assert.strictEqual(cellTitle, 'Recordings available',
                    'Cell title must indicate recordings available');
            } else {
                assert.strictEqual(cellTitle, '',
                    'Cell title must be empty when no recordings or bookmarks exist');
            }
        }
    });

    // 3. SCSS Styling Rules for Tactical Green Dot
    await t.test('3. MasterTimeRangeModal.scss contains tactical green styling and glow for .cal-cell-recording-dot', () => {
        const scssPath = path.resolve(__dirname, '../components/Modals/MasterTimeRangeModal.scss');
        assert.ok(fs.existsSync(scssPath), 'MasterTimeRangeModal.scss must exist');
        const scss = fs.readFileSync(scssPath, 'utf8');

        assert.ok(scss.includes('.cal-cell-recording-dot'),
            'SCSS must define .cal-cell-recording-dot');
        assert.ok(scss.includes('#10B981') || scss.includes('--accent-emerald'),
            'SCSS must use emerald green token for the recording dot');
        assert.ok(scss.includes('.cal-indicators-legend'),
            'SCSS must style .cal-indicators-legend explaining green dot and bookmarks');
    });

    // 4. Backend Controller & Scanner Service Contract
    await t.test('4. ExtractorAdvancedController and StorageScannerService define GetRecordingDates contract', () => {
        const controllerPath = path.resolve(__dirname, '../../../Controllers/ExtractorAdvancedController.cs');
        assert.ok(fs.existsSync(controllerPath), 'ExtractorAdvancedController.cs must exist');
        const csharp = fs.readFileSync(controllerPath, 'utf8');

        assert.match(csharp, /\[HttpGet\("recording-dates"\)\]/,
            'ExtractorAdvancedController must expose [HttpGet("recording-dates")]');
        assert.match(csharp, /_storageScanner\.GetRecordingDatesAsync\(year, month, stationId, timeMode/,
            'Controller must delegate to _storageScanner.GetRecordingDatesAsync');
    });
});
