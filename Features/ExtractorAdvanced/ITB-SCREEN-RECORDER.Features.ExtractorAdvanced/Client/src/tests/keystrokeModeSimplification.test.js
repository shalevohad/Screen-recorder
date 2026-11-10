// ==========================================
// File: Features/ExtractorAdvanced/Client/src/tests/keystrokeModeSimplification.test.js
// ==========================================
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Keystroke Export Mode Simplification Invariants (Burn-In or None)', () => {
    it('1. TimelineHeaderActions toggles strictly between BURN_IN and NONE (bi-state)', () => {
        const filePath = path.resolve(__dirname, '../components/Timeline/header/TimelineHeaderActions.jsx');
        const content = fs.readFileSync(filePath, 'utf-8');

        // Verify bi-state toggle logic
        assert.ok(content.includes("normalizedMode === 'BURN_IN' ? onChangeKeystrokeMode('NONE') : onChangeKeystrokeMode('BURN_IN')") ||
                  content.includes("if (normalizedMode === 'BURN_IN') onChangeKeystrokeMode('NONE')"),
            'Must toggle strictly between BURN_IN and NONE');

        // Verify CAPTION cycling is completely removed
        assert.ok(!content.includes("onChangeKeystrokeMode('CAPTION')"),
            'Must not cycle to CAPTION');
        assert.ok(!content.includes("case 'CAPTION'"),
            'Must not declare CAPTION case');

        // Verify labels
        assert.ok(content.includes("normalizedMode === 'BURN_IN' ? 'KEYS: BURN-IN' : 'KEYS: OFF'"),
            'Must display KEYS: BURN-IN or KEYS: OFF');
    });

    it('2. KeystrokePlaybackOverlay strictly renders Burn-In mode and eliminates Caption banner', () => {
        const compPath = path.resolve(__dirname, '../components/Player/KeystrokePlaybackOverlay.jsx');
        const content = fs.readFileSync(compPath, 'utf-8');

        // Verify isVisibleMode is strictly BURN_IN
        assert.ok(content.includes("const isVisibleMode = normalizedMode === 'BURN_IN';"),
            'Overlay visibility must be strictly bound to BURN_IN');

        // Verify soft caption rendering block is eliminated
        assert.ok(!content.includes("normalizedMode === 'CAPTION'"),
            'Must not have CAPTION conditional block');
        assert.ok(!content.includes('mode-caption'),
            'Must not render mode-caption element');

        // Verify CSS styling eliminates mode-caption
        const scssPath = path.resolve(__dirname, '../components/Player/KeystrokePlaybackOverlay.scss');
        const scssContent = fs.readFileSync(scssPath, 'utf-8');
        assert.ok(!scssContent.includes('&.mode-caption'),
            'SCSS must not contain .mode-caption rule');
    });

    it('3. SoloSpotlightModal maps non-none keystroke mode strictly to BurnIn', () => {
        const modalPath = path.resolve(__dirname, '../components/Modals/SoloSpotlightModal.jsx');
        const content = fs.readFileSync(modalPath, 'utf-8');

        // Verify export trigger resolves strictly to BurnIn or None
        assert.ok(content.includes("(normMode === 'NONE' || normMode === 'OFF') ? 'None' : 'BurnIn'"),
            'Must resolve strictly to None or BurnIn');
        assert.ok(!content.includes("normMode === 'CAPTION'"),
            'Must not contain CAPTION branching in SoloSpotlightModal');
    });

    it('4. ExtractorTile & ExportOptionsModal offer BurnIn or None without Caption card', () => {
        const tilePath = path.resolve(__dirname, '../../../../../Extractor/ITB-SCREEN-RECORDER.Features.Extractor/Client/src/ExtractorTile.jsx');
        const tileContent = fs.readFileSync(tilePath, 'utf-8');

        assert.ok(tileContent.includes("useState('BurnIn')"),
            'Default export mode must be BurnIn');
        assert.ok(!tileContent.includes('SOFT CAPTIONS (RECOMMENDED)'),
            'Must eliminate SOFT CAPTIONS card');
        assert.ok(tileContent.includes('HARD BURN-IN (RECOMMENDED)'),
            'HARD BURN-IN must be recommended default');
    });

    it('5. Server ClientApp Dashboard Dock toggles strictly between Burn-In and Off', () => {
        const dockPath = path.resolve(__dirname, '../../../../../../ITB-SCREEN-RECORDER.Server/ClientApp/src/components/Dashboard/DashboardDock.jsx');
        const dockContent = fs.readFileSync(dockPath, 'utf-8');

        assert.ok(dockContent.includes("keystrokeMode === 'burn-in' ? 'BURN' : 'OFF'"),
            'Dock indicator must display BURN or OFF');
        assert.ok(!dockContent.includes("keystrokeMode === 'caption'"),
            'Dock must not check caption mode');

        const logicPath = path.resolve(__dirname, '../../../../../../ITB-SCREEN-RECORDER.Server/ClientApp/src/components/Dashboard/useDashboardLogic.js');
        const logicContent = fs.readFileSync(logicPath, 'utf-8');
        assert.ok(logicContent.includes("norm === 'burn-in' ? 'none' : 'burn-in'"),
            'Dashboard logic must toggle strictly between burn-in and none');
    });
});
