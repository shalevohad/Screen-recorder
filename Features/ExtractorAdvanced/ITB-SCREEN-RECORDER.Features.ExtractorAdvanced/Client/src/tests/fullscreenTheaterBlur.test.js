// ==========================================
// File: Features/ExtractorAdvanced/Client/src/tests/fullscreenTheaterBlur.test.js
// Tactical Fullscreen Theater Frosted Glass Blur & System Isolation Invariants
// ==========================================

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Fullscreen Theater Frosted Glass Blur Invariants', () => {

    it('1. MulticamViewport.scss applies heavy blur to CAD rulers in fullscreen mode', () => {
        const scssPath = path.resolve(__dirname, '../components/Viewport/MulticamViewport.scss');
        const scssContent = fs.readFileSync(scssPath, 'utf8');

        assert.ok(scssContent.includes('fullscreen-grid-active'), 'Must declare .fullscreen-grid-active class rules');
        assert.ok(scssContent.includes('.canvas-rulers-top-row'), 'Must target canvas-rulers-top-row');
        assert.ok(scssContent.includes('.canvas-ruler-left-bar'), 'Must target canvas-ruler-left-bar');
        assert.ok(scssContent.includes('filter: blur(14px) opacity(0.25)'), 'Must blur rulers to 14px with 0.25 opacity so numbers cannot be read');
        assert.ok(scssContent.includes('pointer-events: none'), 'Rulers must disable pointer events when blurred');
    });

    it('2. MulticamViewport.scss applies heavy blur to Left & Right Wing Docks with hover unblur', () => {
        const scssPath = path.resolve(__dirname, '../components/Viewport/MulticamViewport.scss');
        const scssContent = fs.readFileSync(scssPath, 'utf8');

        assert.ok(scssContent.includes('.canvas-left-wing-dock'), 'Must target canvas-left-wing-dock');
        assert.ok(scssContent.includes('.canvas-right-wing-dock'), 'Must target canvas-right-wing-dock');
        assert.ok(scssContent.includes('filter: blur(14px) opacity(0.35)'), 'Wing docks must be blurred to 14px with 0.35 opacity');
        assert.ok(scssContent.includes('filter: blur(0px) opacity(1)'), 'Wing docks must smoothly unblur to 0px on hover or when popout is active');
    });

    it('3. ExtractorAdvancedStudio.scss applies heavy blur to TopScopeBar in cinema mode', () => {
        const scssPath = path.resolve(__dirname, '../ExtractorAdvancedStudio.scss');
        const scssContent = fs.readFileSync(scssPath, 'utf8');

        assert.ok(scssContent.includes('is-cinema-mode'), 'Must declare .is-cinema-mode rules');
        assert.ok(scssContent.includes('.studio-top-scope-bar'), 'Must target studio-top-scope-bar');
        assert.ok(scssContent.includes('filter: blur(18px) brightness(0.3) saturate(120%)'), 'Must heavily blur studio top scope bar to 18px');
        assert.ok(scssContent.includes('pointer-events: none'), 'Top scope bar must disable pointer events when blurred in cinema mode');
    });

    it('4. DashboardGrid.scss blurs host C2 dock, FleetTabs and header during studio fullscreen', () => {
        const scssPath = path.resolve(__dirname, '../../../../../../ITB-SCREEN-RECORDER.Server/ClientApp/src/components/Dashboard/DashboardGrid.scss');
        const scssContent = fs.readFileSync(scssPath, 'utf8');

        assert.ok(scssContent.includes('studio-theater-active'), 'Must declare .studio-theater-active rules');
        assert.ok(scssContent.includes('body.is-studio-fullscreen'), 'Must declare body.is-studio-fullscreen rules');
        assert.ok(scssContent.includes('.dashboard-vertical-dock'), 'Must target dashboard-vertical-dock');
        assert.ok(scssContent.includes('.dashboard-tabs-bar-wrapper'), 'Must target dashboard-tabs-bar-wrapper (FleetTabs)');
        assert.ok(scssContent.includes('header.command-center-top-bar'), 'Must target command-center-top-bar');
        assert.ok(scssContent.includes('backdrop-filter: none !important'), 'Must remove backdrop-filter on feature pane to prevent trapping fixed elements');
    });

    it('5. ExtractorAdvancedStudio.jsx dispatches itb:studio-fullscreen-change and manages body class', () => {
        const jsxPath = path.resolve(__dirname, '../ExtractorAdvancedStudio.jsx');
        const jsxContent = fs.readFileSync(jsxPath, 'utf8');

        assert.ok(jsxContent.includes("itb:studio-fullscreen-change"), 'Must dispatch itb:studio-fullscreen-change custom event');
        assert.ok(jsxContent.includes("document.body?.classList?.add('is-studio-fullscreen')"), 'Must add is-studio-fullscreen class to document.body');
        assert.ok(jsxContent.includes("document.body?.classList?.remove('is-studio-fullscreen')"), 'Must remove is-studio-fullscreen class on exit/cleanup');
        assert.ok(jsxContent.includes("is-cinema-mode"), 'Must apply is-cinema-mode class to root container when isGridFullscreen is true');
    });

    it('6. DashboardGrid.jsx listens to studio and native fullscreen transitions', () => {
        const jsxPath = path.resolve(__dirname, '../../../../../../ITB-SCREEN-RECORDER.Server/ClientApp/src/components/Dashboard/DashboardGrid.jsx');
        const jsxContent = fs.readFileSync(jsxPath, 'utf8');

        assert.ok(jsxContent.includes("isStudioFullscreen"), 'Must declare isStudioFullscreen state');
        assert.ok(jsxContent.includes("itb:studio-fullscreen-change"), 'Must listen to itb:studio-fullscreen-change event');
        assert.ok(jsxContent.includes("fullscreenchange"), 'Must listen to native fullscreenchange event');
        assert.ok(jsxContent.includes("studio-theater-active"), 'Must attach studio-theater-active class to dashboard layout wrapper');
    });
});
