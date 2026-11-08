// ==========================================
// File: Features/ExtractorAdvanced/Client/src/tests/keyframeQuickDeleteAndAudioRedesign.test.js
// Verification of:
// 1. Direct keyframe deletion from navigator cluster & quick-jump dropdown
// 2. Decoupling of UTC clock position from KF settings inspector (canvas-saved per KF)
// 3. Audio Track overhaul: 52px track matching workstation layout, source selector, SYS/MIC/BOTH channel toggle, master GAIN slider + relative nudges, draggable clip D&D
// 4. Feature Settings dynamic secrecy based on server active features
// ==========================================
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('1. Keyframe Fast Deletion & Protection Invariants', async (t) => {
    const trackJsxPath = path.resolve(__dirname, '../components/Timeline/tracks/CanvasKeyframeTrack.jsx');
    const trackJsx = fs.readFileSync(trackJsxPath, 'utf8');

    const trackScssPath = path.resolve(__dirname, '../components/Timeline/tracks/CanvasKeyframeTrack.scss');
    const trackScss = fs.readFileSync(trackScssPath, 'utf8');

    const studioJsxPath = path.resolve(__dirname, '../ExtractorAdvancedStudio.jsx');
    const studioJsx = fs.readFileSync(studioJsxPath, 'utf8');

    await t.test('1.1 Navigator cluster contains btn-del-current-kf disabled for root keyframe', () => {
        assert.ok(trackJsx.includes('btn-del-current-kf'), 'Must include btn-del-current-kf button in navigator cluster');
        assert.ok(trackJsx.includes('disabled={activeKfIndex <= 0'), 'Root keyframe 0 must be strictly protected from deletion');
        assert.ok(trackJsx.includes('onDeleteKeyframe(activeKfIndex)'), 'Clicking delete button must invoke onDeleteKeyframe with active index');
    });

    await t.test('1.2 Quick-jump dropdown rows include inline btn-row-delete for non-root keyframes', () => {
        assert.ok(trackJsx.includes('btn-row-delete'), 'Must include btn-row-delete in quick-jump list rows');
        assert.ok(trackJsx.includes('kIdx > 0'), 'Inline delete button must only appear for kIdx > 0');
        assert.ok(trackJsx.includes('onDeleteKeyframe(kIdx)'), 'Inline delete must pass kIdx to onDeleteKeyframe');
    });

    await t.test('1.3 CSS styles btn-del-current-kf and btn-row-delete with tactical alert colors', () => {
        assert.ok(trackScss.includes('.btn-del-current-kf'), 'SCSS must style .btn-del-current-kf');
        assert.ok(trackScss.includes('.btn-row-delete'), 'SCSS must style .btn-row-delete');
        assert.ok(trackScss.includes('#F43F5E'), 'Must use tactical alert red/rose #F43F5E');
    });

    await t.test('1.4 ExtractorAdvancedStudio protects root keyframe 0 and safely updates active index', () => {
        assert.ok(studioJsx.includes('if (idxToDelete === 0) return prev;'), 'Studio must explicitly reject deleting root keyframe 0');
        assert.ok(studioJsx.includes('setActiveKfIndex'), 'Studio must safely adjust activeKfIndex');
    });
});

test('2. Canvas Clock Position Decoupling from KF Settings UI', async (t) => {
    const trackJsxPath = path.resolve(__dirname, '../components/Timeline/tracks/CanvasKeyframeTrack.jsx');
    const trackJsx = fs.readFileSync(trackJsxPath, 'utf8');

    const viewportJsxPath = path.resolve(__dirname, '../components/Viewport/MulticamViewport.jsx');
    const viewportJsx = fs.readFileSync(viewportJsxPath, 'utf8');

    await t.test('2.1 KF Inspector popover in CanvasKeyframeTrack does not contain the clock position button grid', () => {
        // Popover must not contain the clock position selector buttons
        assert.ok(!trackJsx.includes('onUpdateKeyframeClockPosition?.(idx, pos.id)'), 'Clock button grid must be removed from KF inspector popover');
    });

    await t.test('2.2 Stage HUD settings popover in MulticamViewport does not contain clock position grid', () => {
        assert.ok(!viewportJsx.includes('handleUpdateActiveKfClockPos(pos.id)'), 'Clock button grid must be removed from Stage HUD popover');
    });

    await t.test('2.3 CanvasUtcWallClock directly updates active keyframe clock position on canvas move/drag', () => {
        assert.ok(viewportJsx.includes('<CanvasUtcWallClock'), 'Must render CanvasUtcWallClock');
        assert.ok(viewportJsx.includes('updateKeyframeClockPosition(prev, safeActiveIdx, newPos)'), 'Canvas clock onPositionChange must save to active keyframe in layout timeline');
    });

    await t.test('2.4 Quick-jump dropdown continues to display clock position as informational badge', () => {
        assert.ok(trackJsx.includes('clock-badge'), 'Quick-jump row must show clock-badge for operator situational awareness');
        assert.ok(trackJsx.includes('formatClockPositionLabel'), 'Must format clock label for badge readout');
    });
});

test('3. Audio Track Redesign & Clip Drag-and-Drop Invariants', async (t) => {
    const audioJsxPath = path.resolve(__dirname, '../components/Timeline/tracks/AudioRoutingTrack.jsx');
    const audioJsx = fs.readFileSync(audioJsxPath, 'utf8');

    const audioScssPath = path.resolve(__dirname, '../components/Timeline/tracks/AudioRoutingTrack.scss');
    const audioScss = fs.readFileSync(audioScssPath, 'utf8');

    await t.test('3.1 Audio Track renders unified 52px track matching workstation layout', () => {
        assert.ok(audioJsx.includes('timeline-track-container audio-routing-track-container station-collapsed-track'), 'Track container must use station-collapsed-track matching TimelineTrack');
        assert.ok(audioJsx.includes('track-sidebar station-collapsed-sidebar audio-track-sidebar'), 'Track sidebar must match station-collapsed-sidebar 230px');
        assert.ok(audioScss.includes('height: 52px !important'), 'Track height must strictly be 52px !important');
        assert.ok(audioScss.includes('width: 230px !important'), 'Track sidebar width must strictly be 230px !important');
    });

    await t.test('3.2 Sidebar contains Workstation Selector, Channel Toggle (SYS\\MIC\\BOTH), and GAIN Controls', () => {
        assert.ok(audioJsx.includes('audio-station-select'), 'Sidebar must include audio-station-select dropdown');
        assert.ok(audioJsx.includes('btn-channel-toggle'), 'Sidebar must include btn-channel-toggle button');
        assert.ok(audioJsx.includes('handleCycleLaneChannelMode'), 'Channel toggle must cycle channel modes');
        assert.ok(audioJsx.includes('audio-gain-slider'), 'Sidebar must include audio-gain-slider');
        assert.ok(audioJsx.includes('btn-gain-nudge'), 'Sidebar must include btn-gain-nudge relative gain buttons');
        assert.ok(audioJsx.includes('handleNudgeLaneGain'), 'Must implement handleNudgeLaneGain');
    });

    await t.test('3.3 Timeline surface supports draggable audio clips with snapping and clamping', () => {
        assert.ok(audioJsx.includes('handleClipMoveDrag'), 'Must implement handleClipMoveDrag');
        assert.ok(audioJsx.includes('handleTrimDrag'), 'Must implement handleTrimDrag');
        assert.ok(audioJsx.includes('audio-clip-block'), 'Must render audio-clip-block');
        assert.ok(audioJsx.includes('AudioClipRenderer'), 'Must render AudioClipRenderer');
        assert.ok(audioJsx.includes('isDraggingRef'), 'Must use isDraggingRef to prevent drag interruptions');
    });

    await t.test('3.4 AudioRoutingTrack synchronizes lanes whenever audioPlan updates from parent', () => {
        assert.ok(audioJsx.includes('useEffect(() => {'), 'Must have synchronization useEffect');
        assert.ok(audioJsx.includes('if (!audioPlan?.segments'), 'Must check audioPlan segments');
        assert.ok(audioJsx.includes('syncLanesToPlan'), 'Must dispatch updates back via syncLanesToPlan');
    });
});

test('4. Feature Settings Dynamic Secrecy (עקרון החשאיות)', async (t) => {
    const settingsCtrlPath = path.resolve(__dirname, '../../../../../../ITB-SCREEN-RECORDER.Server/Controllers/SettingsController.cs');
    const settingsCtrl = fs.readFileSync(settingsCtrlPath, 'utf8');

    const settingsViewPath = path.resolve(__dirname, '../../../../../../ITB-SCREEN-RECORDER.Server/ClientApp/src/components/Settings/SettingsView.jsx');
    const settingsView = fs.readFileSync(settingsViewPath, 'utf8');

    const netTabPath = path.resolve(__dirname, '../../../../../../ITB-SCREEN-RECORDER.Server/ClientApp/src/components/Settings/tabs/SystemNetworkTab.jsx');
    const netTab = fs.readFileSync(netTabPath, 'utf8');

    await t.test('4.1 SettingsController.cs injects IFeatureModule and suppresses AutoDirector settings if feature is absent', () => {
        assert.ok(settingsCtrl.includes('IEnumerable<IFeatureModule>? features = null'), 'SettingsController must accept injected IFeatureModule collection');
        assert.ok(settingsCtrl.includes('HasFeature("extractor")'), 'Must check if extractor feature is installed');
        assert.ok(settingsCtrl.includes('AutoDirector = hasExtractor ?'), 'AutoDirector settings must be strictly null when feature is absent');
        assert.ok(settingsCtrl.includes('updatedConfig.AutoDirector != null && HasFeature("extractor")'), 'PUT must reject AutoDirector changes if feature is absent');
    });

    await t.test('4.2 SettingsView.jsx queries /api/v1/features/active and passes activeFeatures to tabs', () => {
        assert.ok(settingsView.includes("fetch('/api/v1/features/active')"), 'SettingsView must query active features');
        assert.ok(settingsView.includes('activeFeatures={activeFeatures}'), 'Must pass activeFeatures to SystemNetworkTab');
    });

    await t.test('4.3 SystemNetworkTab.jsx strictly hides Auto-Director & Replay Studio unless server has feature active', () => {
        assert.ok(netTab.includes('hasReplayStudioFeature'), 'Must define hasReplayStudioFeature check');
        assert.ok(netTab.includes('isStealthAuthorized && hasReplayStudioFeature'), 'Must require both stealth authorization AND server feature presence');
    });
});
