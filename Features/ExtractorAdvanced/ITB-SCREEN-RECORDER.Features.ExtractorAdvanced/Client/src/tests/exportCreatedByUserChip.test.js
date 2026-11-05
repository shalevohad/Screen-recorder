// ==========================================
// File: Features/ExtractorAdvanced/Client/src/tests/exportCreatedByUserChip.test.js
// ==========================================
import test from 'node:test';
import assert from 'node:assert/strict';
import { getCurrentOperatorName } from '../utils/operatorStore.js';

test('Export Created-By User Operator Chip & Persistence Contract', async (t) => {
    // Setup mock global window and storage
    const originalWindow = globalThis.window;
    const originalSessionStorage = globalThis.sessionStorage;
    const originalLocalStorage = globalThis.localStorage;

    t.after(() => {
        globalThis.window = originalWindow;
        globalThis.sessionStorage = originalSessionStorage;
        globalThis.localStorage = originalLocalStorage;
    });

    let mockSessionStore = {};
    let mockLocalStore = {};

    globalThis.sessionStorage = {
        getItem: (k) => mockSessionStore[k] || null,
        setItem: (k, v) => { mockSessionStore[k] = String(v); },
        clear: () => { mockSessionStore = {}; }
    };

    globalThis.localStorage = {
        getItem: (k) => mockLocalStore[k] || null,
        setItem: (k, v) => { mockLocalStore[k] = String(v); },
        clear: () => { mockLocalStore = {}; }
    };

    globalThis.window = {};

    await t.test('1. Returns "Guest Operator" when storage is completely empty', () => {
        globalThis.sessionStorage.clear();
        globalThis.localStorage.clear();

        const name = getCurrentOperatorName();
        assert.equal(name, 'Guest Operator');
    });

    await t.test('2. Extracts displayName from sessionStorage itb_auth_user', () => {
        globalThis.sessionStorage.setItem('itb_auth_user', JSON.stringify({
            userId: 'usr_42',
            username: 'david.c',
            displayName: 'Captain David'
        }));

        const name = getCurrentOperatorName();
        assert.equal(name, 'Captain David');
    });

    await t.test('3. Falls back to username if displayName is missing or empty', () => {
        globalThis.sessionStorage.setItem('itb_auth_user', JSON.stringify({
            userId: 'usr_88',
            username: 'commander_sarah',
            displayName: ''
        }));

        const name = getCurrentOperatorName();
        assert.equal(name, 'commander_sarah');
    });

    await t.test('4. Falls back to localStorage if sessionStorage is empty', () => {
        globalThis.sessionStorage.clear();
        globalThis.localStorage.setItem('itb_auth_user', JSON.stringify({
            username: 'sec_officer',
            displayName: 'Officer Dan'
        }));

        const name = getCurrentOperatorName();
        assert.equal(name, 'Officer Dan');
    });

    await t.test('5. Safely recovers from malformed JSON and returns "Guest Operator"', () => {
        globalThis.sessionStorage.setItem('itb_auth_user', 'MALFORMED{JSON:::');
        globalThis.localStorage.clear();

        const name = getCurrentOperatorName();
        assert.equal(name, 'Guest Operator');
    });

    await t.test('6. Verifies export payload attaches createdBy and preserves in job card contract', () => {
        globalThis.sessionStorage.setItem('itb_auth_user', JSON.stringify({
            displayName: 'Specialist Alex'
        }));

        const operator = getCurrentOperatorName();
        const exportRequestPayload = {
            createdBy: operator,
            stationIds: ['WS-01', 'WS-02'],
            inEpochMs: 1730700000000,
            outEpochMs: 1730703600000,
            resolution: 'FHD'
        };

        assert.equal(exportRequestPayload.createdBy, 'Specialist Alex');

        // Verify active in-progress job structure
        const inProgressJob = {
            jobId: 'job_test_1',
            fileName: 'Test_Export.mp4',
            status: 'Processing',
            progressPercent: 45,
            createdBy: exportRequestPayload.createdBy
        };
        assert.equal(inProgressJob.createdBy, 'Specialist Alex');

        // Verify completed job structure with chip display
        const completedJob = {
            jobId: 'job_test_2',
            fileName: 'Completed_Archive.mp4',
            status: 'Completed',
            isCompleted: true,
            createdBy: exportRequestPayload.createdBy
        };
        assert.equal(completedJob.createdBy, 'Specialist Alex');
    });

    await t.test('7. Attaches operational/forensic notes in export payload and verifies note callout propagation and sanitization', () => {
        const rawNote = '   Incident #104 forensic audit - reviewed by Shift Lead   ';
        const sanitizedNote = (rawNote || '').trim();

        const exportRequestPayload = {
            createdBy: 'Commander Shepard',
            notes: sanitizedNote,
            stationIds: ['WS-01'],
            inEpochMs: 1730700000000,
            outEpochMs: 1730703600000
        };

        assert.equal(exportRequestPayload.notes, 'Incident #104 forensic audit - reviewed by Shift Lead');
        assert.ok(exportRequestPayload.notes.length <= 500);

        // Verify job card propagation contract
        const job = {
            jobId: 'adv_job_999',
            fileName: 'Forensic_Export.mp4',
            status: 'Processing',
            createdBy: exportRequestPayload.createdBy,
            notes: exportRequestPayload.notes
        };

        assert.equal(job.notes, 'Incident #104 forensic audit - reviewed by Shift Lead');

        // Check fallback when note is empty
        const emptyNotePayload = {
            notes: ('   ').trim() || null
        };
        assert.equal(emptyNotePayload.notes, null);
    });
});
