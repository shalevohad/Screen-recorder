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

    it('8. Precision CAD / NLE Rulers are positioned outside the screen box (.canvas-master-frame-16-9)', () => {
        // Must contain .canvas-viewport-with-rulers, .canvas-rulers-top-row and .canvas-rulers-main-row outside canvas-master-frame-16-9
        assert.match(
            jsxContent,
            /canvas-viewport-with-rulers/,
            'JSX must wrap canvas frame in .canvas-viewport-with-rulers'
        );
        assert.match(
            jsxContent,
            /canvas-rulers-top-row/,
            'JSX must render .canvas-rulers-top-row outside and above canvas frame'
        );
        assert.match(
            jsxContent,
            /canvas-rulers-main-row/,
            'JSX must render .canvas-rulers-main-row with left ruler outside canvas frame'
        );
        // canvas-rulers-container must NOT exist inside canvas-master-frame
        assert.ok(
            !jsxContent.includes('className="canvas-rulers-container"'),
            'canvas-rulers-container must be replaced by outside rulers to prevent obscuring screens'
        );
    });

    it('9. Screen inspector menu is positioned at the top of the card with z-index: 4500 (above canvas, beneath side menus)', () => {
        // Check topStyle formulation positioning inspector at the top
        assert.match(
            jsxContent,
            /isDockedInsideTop\s*=\s*p\.y\s*<\s*38/,
            'Inspector must detect when card is near top of canvas'
        );
        assert.ok(
            jsxContent.includes('topStyle = `calc(${((p.y) / virtualH) * 100}% - 34px)`'),
            'Inspector must float directly above card top edge when space permits'
        );
        // Inspector zIndex must be 4500 (above canvas 1-2000, below wing docks 5000 and popouts 30000)
        assert.match(
            jsxContent,
            /zIndex:\s*4500/,
            'JSX must assign zIndex: 4500 to floating inspector'
        );
        assert.match(
            scssContent,
            /\.floating-feed-inspector\s*\{[^}]*z-index:\s*4500;/s,
            'SCSS must declare z-index: 4500 for .floating-feed-inspector'
        );
    });

    it('10. Canvas window border color popover is never clipped (overflow: visible !important and z-index: 100000 !important)', () => {
        // Must declare overflow: visible !important on floating-feed-inspector and compact-hud-inspector
        assert.match(
            scssContent,
            /\.floating-feed-inspector\.compact-hud-inspector\s*\{[^}]*overflow:\s*visible\s*!important;/s,
            '.floating-feed-inspector.compact-hud-inspector must have overflow: visible !important to prevent popover clipping'
        );
        assert.match(
            scssContent,
            /\.floating-feed-inspector\s*\{[^}]*overflow:\s*visible\s*!important;/s,
            '.floating-feed-inspector must have overflow: visible !important'
        );
        // Popover must declare z-index: 100000 !important
        assert.match(
            scssContent,
            /\.compact-color-palette-popover\s*\{[^}]*z-index:\s*100000\s*!important;/s,
            '.compact-color-palette-popover must declare z-index: 100000 !important'
        );
    });

    it('11. Canvas window border color popover supports intelligent boundary positioning and outside-click dismissal', () => {
        // JSX must calculate openUpwards and isNearRight based on placement coordinates
        assert.match(
            jsxContent,
            /const\s+openUpwards\s*=\s*isNearBottom\s*&&\s*!isNearTop;/,
            'JSX must compute openUpwards boundary check'
        );
        assert.match(
            jsxContent,
            /className=\{`compact-color-palette-popover\s+\$\{openUpwards\s*\?\s*'open-upwards'\s*:\s*'open-downwards'\}\s+\$\{isNearRight\s*\?\s*'align-right'\s*:\s*'align-left'\}`\}/,
            'JSX must apply dynamic boundary positioning classes'
        );
        // Outside click dismiss handler must exist for showColorPicker
        assert.match(
            jsxContent,
            /colorPickerRef\.current\s*&&\s*!colorPickerRef\.current\.contains\(e\.target\)/,
            'JSX must dismiss color picker when clicking outside colorPickerRef'
        );
        // SCSS must define .open-upwards and .align-right
        assert.match(
            scssContent,
            /&.open-upwards\s*\{[^}]*bottom:\s*calc\(100%\s*\+\s*6px\);/s,
            'SCSS must position open-upwards palette above inspector'
        );
        assert.match(
            scssContent,
            /&.align-right\s*\{[^}]*right:\s*0;/s,
            'SCSS must align palette to the right edge'
        );
    });

    it('12. Keyframe Track Popover (.kf-inspector-popover) has z-index: 35000 !important and boundary clamping', () => {
        const kfScssPath = path.resolve(__dirname, '../components/Timeline/tracks/CanvasKeyframeTrack.scss');
        const kfJsxPath = path.resolve(__dirname, '../components/Timeline/tracks/CanvasKeyframeTrack.jsx');
        const kfScss = fs.readFileSync(kfScssPath, 'utf-8');
        const kfJsx = fs.readFileSync(kfJsxPath, 'utf-8');

        // Elevate popover to z-index: 35000 !important (above playhead needle 500)
        assert.match(
            kfScss,
            /\.kf-inspector-popover\s*\{[^}]*z-index:\s*35000\s*!important;/s,
            '.kf-inspector-popover must declare z-index: 35000 !important'
        );
        // Elevate parent row to z-index: 25000 !important when popover is open
        assert.match(
            kfScss,
            /has-active-popover\s*\{[^}]*z-index:\s*25000\s*!important;/s,
            'CanvasKeyframeTrack row must elevate to z-index: 25000 !important when popover is active'
        );
        // Supports align-left and align-right clamping
        assert.match(
            kfScss,
            /&.align-left\s*\{[^}]*left:\s*0;/s,
            'SCSS must define align-left clamping'
        );
        assert.match(
            kfScss,
            /&.align-right\s*\{[^}]*right:\s*0;/s,
            'SCSS must define align-right clamping'
        );
        assert.match(
            kfJsx,
            /const\s+popoverAlignClass\s*=\s*isNearLeft\s*\?\s*'align-left'\s*:\s*\(isNearRight\s*\?\s*'align-right'\s*:\s*'align-center'\);/,
            'JSX must compute popoverAlignClass'
        );
    });

    it('13. Station Context Menu clamps coordinates within viewport and has z-index: 100000 !important', () => {
        const menuJsxPath = path.resolve(__dirname, '../components/Modals/StationContextMenu.jsx');
        const menuScssPath = path.resolve(__dirname, '../components/Modals/StationContextMenu.scss');
        const menuJsx = fs.readFileSync(menuJsxPath, 'utf-8');
        const menuScss = fs.readFileSync(menuScssPath, 'utf-8');

        // JSX edge clamping
        assert.match(
            menuJsx,
            /const\s+posX\s*=\s*Math\.max\(10,\s*Math\.min\(x,\s*[\s\S]*?menuWidth\s*-\s*12\)\);/,
            'StationContextMenu must clamp posX within viewport width'
        );
        assert.match(
            menuJsx,
            /const\s+posY\s*=\s*Math\.max\(10,\s*Math\.min\(y,\s*[\s\S]*?menuHeight\s*-\s*12\)\);/,
            'StationContextMenu must clamp posY within viewport height'
        );
        // SCSS top priority z-index
        assert.match(
            menuScss,
            /z-index:\s*100000\s*!important;/,
            'StationContextMenu must declare z-index: 100000 !important'
        );
    });
});
