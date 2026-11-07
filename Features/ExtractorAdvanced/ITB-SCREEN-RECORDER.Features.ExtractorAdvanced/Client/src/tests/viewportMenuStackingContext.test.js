// ==========================================
// File: Features/ExtractorAdvanced/Client/src/tests/viewportMenuStackingContext.test.js
// Verification of Viewport Stacking Context & Popout Menu Elevation Invariants
// ==========================================

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scssPath = path.resolve(__dirname, '../components/Viewport/MulticamViewport.scss');
const jsxPath = path.resolve(__dirname, '../components/Viewport/MulticamViewport.jsx');

describe('Viewport Stacking Context & Popout Menu Elevation Invariants', () => {
    const scssContent = fs.readFileSync(scssPath, 'utf-8');
    const jsxContent = fs.readFileSync(jsxPath, 'utf-8');

    it('1. Canvas Master Frame establishes its own local stacking context (z-index: 10)', () => {
        // Must contain .canvas-master-frame-16-9 with position: relative and z-index: 10
        assert.match(
            scssContent,
            /\.canvas-master-frame-16-9\s*\{[^}]*position:\s*relative;[^}]*z-index:\s*10;/s,
            '.canvas-master-frame-16-9 must declare position: relative and z-index: 10 to establish its own stacking context'
        );
    });

    it('2. Tactical Wing Docks are elevated above Canvas Frame (z-index: 5000 / 20000)', () => {
        // Wing docks must have z-index: 5000 !important base and 20000 !important on active/hover
        assert.match(
            scssContent,
            /z-index:\s*5000\s*!important;/,
            'Wing docks must declare z-index: 5000 !important'
        );
        assert.match(
            scssContent,
            /has-active-popout\s*\{[^}]*z-index:\s*20000\s*!important;/s,
            'Wing docks must elevate to z-index: 20000 !important when active popout or hover'
        );
    });

    it('3. Wing Floating Popout menus have top-priority z-index: 30000 !important', () => {
        assert.match(
            scssContent,
            /\.wing-floating-popout\s*\{[^}]*z-index:\s*30000\s*!important;/s,
            '.wing-floating-popout must declare z-index: 30000 !important to guarantee rendering over all canvas cards'
        );
    });

    it('4. Feeds & Layers Drawer and Saved Presets Dropdown are elevated above canvas', () => {
        assert.match(
            scssContent,
            /\.canvas-side-drawer\s*\{[^}]*z-index:\s*25000\s*!important;/s,
            '.canvas-side-drawer must declare z-index: 25000 !important'
        );
        assert.match(
            scssContent,
            /\.saved-presets-menu-popover\s*\{[^}]*z-index:\s*30000\s*!important;/s,
            '.saved-presets-menu-popover must declare z-index: 30000 !important'
        );
    });

    it('5. JSX dynamically attaches has-active-popout class to wing docks when menus are open', () => {
        assert.match(
            jsxContent,
            /<aside\s+className=\{`canvas-left-wing-dock \$\{[^}]*has-active-popout/s,
            'Left wing dock must dynamically attach has-active-popout class'
        );
        assert.match(
            jsxContent,
            /<aside\s+className=\{`canvas-right-wing-dock \$\{[^}]*has-active-popout/s,
            'Right wing dock must dynamically attach has-active-popout class'
        );
    });

    it('6. Wing floating popouts include close buttons (.btn-close-pop) for quick operator dismissal', () => {
        // Layout presets, resolution and aspect popouts must contain btn-close-pop
        assert.ok(
            jsxContent.includes('LAYOUT PRESETS') && jsxContent.includes('btn-close-pop'),
            'Layout presets popout must include btn-close-pop'
        );
        assert.ok(
            jsxContent.includes('CANVAS RESOLUTION') && jsxContent.includes('btn-close-pop'),
            'Resolution presets popout must include btn-close-pop'
        );
        assert.ok(
            jsxContent.includes('CANVAS ASPECT') && jsxContent.includes('btn-close-pop'),
            'Aspect ratio popout must include btn-close-pop'
        );
    });

    it('7. Outside-click listener dismisses wing popouts on background or canvas click', () => {
        assert.match(
            jsxContent,
            /handleOutsideClick\s*=\s*\(e\)\s*=>/s,
            'handleOutsideClick function must be declared'
        );
        assert.match(
            jsxContent,
            /setShowLayoutPresetsPopout\(false\)/s,
            'Outside click handler must close layout presets popout'
        );
    });
});
