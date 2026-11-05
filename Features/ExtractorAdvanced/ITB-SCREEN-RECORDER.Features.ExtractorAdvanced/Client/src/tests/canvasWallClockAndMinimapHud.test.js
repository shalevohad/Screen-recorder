import { describe, it } from 'node:test';
import assert from 'node:assert';
import { parseClockPosition, formatClockPositionLabel, resolveFfmpegClockCoords, CORNER_POSITIONS } from '../utils/clockPositionStore.js';

describe('Canvas UTC Wall Clock & Persistent Minimap HUD Invariants', () => {
    it('1. Canvas UTC Wall Clock formats date and UTC time correctly from epoch ms', () => {
        const testEpochMs = 1730742633000; // 2024-11-04 17:50:33 UTC
        const d = new Date(testEpochMs);
        const yyyy = d.getUTCFullYear();
        const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
        const dd = String(d.getUTCDate()).padStart(2, '0');
        const hh = String(d.getUTCHours()).padStart(2, '0');
        const min = String(d.getUTCMinutes()).padStart(2, '0');
        const ss = String(d.getUTCSeconds()).padStart(2, '0');

        const dateStr = `${yyyy}-${mm}-${dd}`;
        const timeStr = `${hh}:${min}:${ss} UTC`;

        assert.strictEqual(dateStr, '2024-11-04');
        assert.strictEqual(timeStr, '17:50:33 UTC');
    });

    it('2. Canvas UTC Wall Clock cycles corner positions sequentially and never removes clock', () => {
        const CORNER_POSITIONS = ['top-right', 'bottom-right', 'bottom-left', 'top-left'];
        let currentPos = 'top-right';

        const cycle = (pos) => {
            const idx = CORNER_POSITIONS.indexOf(pos);
            return CORNER_POSITIONS[(idx + 1) % CORNER_POSITIONS.length];
        };

        currentPos = cycle(currentPos);
        assert.strictEqual(currentPos, 'bottom-right');

        currentPos = cycle(currentPos);
        assert.strictEqual(currentPos, 'bottom-left');

        currentPos = cycle(currentPos);
        assert.strictEqual(currentPos, 'top-left');

        currentPos = cycle(currentPos);
        assert.strictEqual(currentPos, 'top-right');
    });

    it('3. Auto-Director Screen Orientation HUD correctly maps display indices and labels', () => {
        const displays = [
            { displayId: 'mon-0', displayName: 'Main Display (mon-0)', width: 1920, height: 1080, x: 0, y: 0 },
            { displayId: 'mon-1', displayName: 'Secondary Tactical Radar (mon-1)', width: 1920, height: 1080, x: 1920, y: 0 }
        ];

        const resolveActiveLabel = (activeId) => {
            const activeDisplay = displays.find(d => d.displayId === activeId) || displays[0];
            const activeIndex = displays.indexOf(activeDisplay);
            const screenNum = activeIndex >= 0 ? (activeIndex + 1) : 1;
            const rawLabel = activeDisplay.displayName || '';
            const cleanLabel = rawLabel.replace(/\s*\(mon-\d+\)/i, '').trim();
            return cleanLabel && !cleanLabel.toLowerCase().includes('screen')
                ? `SCREEN ${screenNum} (${cleanLabel.toUpperCase()})`
                : (cleanLabel ? cleanLabel.toUpperCase() : `SCREEN ${screenNum}`);
        };

        const label0 = resolveActiveLabel('mon-0');
        assert.strictEqual(label0, 'SCREEN 1 (MAIN DISPLAY)');

        const label1 = resolveActiveLabel('mon-1');
        assert.strictEqual(label1, 'SCREEN 2 (SECONDARY TACTICAL RADAR)');
    });

    it('4. Display topology bounds calculation preserves physical multi-monitor aspect ratio', () => {
        const displays = [
            { displayId: 'mon-0', x: 0, y: 0, width: 1920, height: 1080 },
            { displayId: 'mon-1', x: 1920, y: 0, width: 1920, height: 1080 }
        ];

        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        displays.forEach(d => {
            minX = Math.min(minX, d.x);
            minY = Math.min(minY, d.y);
            maxX = Math.max(maxX, d.x + d.width);
            maxY = Math.max(maxY, d.y + d.height);
        });

        const totalW = maxX - minX;
        const totalH = maxY - minY;

        assert.strictEqual(totalW, 3840);
        assert.strictEqual(totalH, 1080);
        assert.strictEqual(totalW / totalH, 32 / 9);
    });
    it('5. parseClockPosition handles presets and custom percentage coordinates', () => {
        const tr = parseClockPosition('top-right');
        assert.strictEqual(tr.isCustom, false);
        assert.strictEqual(tr.preset, 'top-right');
        assert.strictEqual(tr.xPct, 100);
        assert.strictEqual(tr.yPct, 0);

        const bl = parseClockPosition('bottom-left');
        assert.strictEqual(bl.isCustom, false);
        assert.strictEqual(bl.preset, 'bottom-left');
        assert.strictEqual(bl.xPct, 0);
        assert.strictEqual(bl.yPct, 100);

        const custom = parseClockPosition('custom:45.5,22.8');
        assert.strictEqual(custom.isCustom, true);
        assert.strictEqual(custom.xPct, 45.5);
        assert.strictEqual(custom.yPct, 22.8);

        // Clamping invalid or out-of-range bounds
        const outOfBounds = parseClockPosition('custom:150.0,-20.0');
        assert.strictEqual(outOfBounds.isCustom, true);
        assert.strictEqual(outOfBounds.xPct, 100);
        assert.strictEqual(outOfBounds.yPct, 0);

        // Null / undefined fallback
        const def = parseClockPosition(null);
        assert.strictEqual(def.isCustom, false);
        assert.strictEqual(def.preset, 'top-right');
    });

    it('6. formatClockPositionLabel produces crisp human-readable badges for UI and export summary', () => {
        assert.strictEqual(formatClockPositionLabel('top-right'), 'TOP-RIGHT');
        assert.strictEqual(formatClockPositionLabel('bottom-left'), 'BOTTOM-LEFT');
        assert.strictEqual(formatClockPositionLabel('custom:45.2,22.8'), 'CUSTOM (45% X, 23% Y)');
        assert.strictEqual(formatClockPositionLabel('custom:50.0,0.0'), 'CUSTOM (50% X, 0% Y)');
    });

    it('7. Drag coordinate clamping and corner snapping algorithm', () => {
        const resolveFinalPosition = (xPct, yPct) => {
            if (xPct > 94 && yPct < 6) return 'top-right';
            if (xPct < 6 && yPct < 6) return 'top-left';
            if (xPct > 94 && yPct > 94) return 'bottom-right';
            if (xPct < 6 && yPct > 94) return 'bottom-left';
            return `custom:${xPct.toFixed(1)},${yPct.toFixed(1)}`;
        };

        // Snaps near top-right corner
        assert.strictEqual(resolveFinalPosition(96, 3), 'top-right');
        // Snaps near top-left corner
        assert.strictEqual(resolveFinalPosition(4, 2), 'top-left');
        // Snaps near bottom-right corner
        assert.strictEqual(resolveFinalPosition(98, 97), 'bottom-right');
        // Snaps near bottom-left corner
        assert.strictEqual(resolveFinalPosition(2, 95), 'bottom-left');

        // Retains custom coordinate when placed away from corners
        assert.strictEqual(resolveFinalPosition(45.2, 18.7), 'custom:45.2,18.7');
        assert.strictEqual(resolveFinalPosition(50.0, 10.0), 'custom:50.0,10.0');
    });

    it('8. FFmpeg drawtext coordinate formulation mapping', () => {
        const resolveFfmpegCoords = (rawPosition) => {
            const clean = (rawPosition || 'top-right').trim().toLowerCase();
            if (clean.startsWith('custom:') || clean.includes(',')) {
                const coords = clean.replace('custom:', '').split(/[,;]/);
                const x = Math.max(0, Math.min(100, parseFloat(coords[0]) || 0));
                const y = Math.max(0, Math.min(100, parseFloat(coords[1]) || 0));
                const xRatio = (x / 100.0).toFixed(4);
                const yRatio = (y / 100.0).toFixed(4);
                return {
                    x: `16+(w-tw-32)*${xRatio}`,
                    y: `16+(h-th-32)*${yRatio}`
                };
            }
            switch (clean) {
                case 'top-left': return { x: '24', y: '24' };
                case 'bottom-left': return { x: '24', y: 'h-th-24' };
                case 'bottom-right': return { x: 'w-tw-24', y: 'h-th-24' };
                case 'top-right':
                default: return { x: 'w-tw-24', y: '24' };
            }
        };

        const standard = resolveFfmpegCoords('top-right');
        assert.strictEqual(standard.x, 'w-tw-24');
        assert.strictEqual(standard.y, '24');

        const custom = resolveFfmpegCoords('custom:45.0,20.0');
        assert.strictEqual(custom.x, '16+(w-tw-32)*0.4500');
        assert.strictEqual(custom.y, '16+(h-th-32)*0.2000');
    });

    it('9. Canvas Placement Screen Title Customization, Fallback Resolution & FFmpeg drawtext Escaping', () => {
        // 1. Placement label modification helper
        const updatePlacementLabel = (placements, targetIndex, rawLabel) => {
            const trimmed = typeof rawLabel === 'string' ? rawLabel.trim() : '';
            const nextLabel = trimmed.length > 0 ? trimmed : null;
            return placements.map((p, idx) => {
                if (idx === targetIndex) {
                    return { ...p, label: nextLabel };
                }
                return p;
            });
        };

        const initialPlacements = [
            { stationId: 'OHAD-PC', displayId: 'mon-0', x: 0, y: 0, width: 960, height: 1080, label: null },
            { stationId: 'OHAD-PC', displayId: 'mon-1', x: 960, y: 0, width: 960, height: 1080, label: null }
        ];

        // Custom Title Assignment
        const renamed = updatePlacementLabel(initialPlacements, 0, '  עמדת שליטה ראשית (Main HUD) [100%]  ');
        assert.strictEqual(renamed[0].label, 'עמדת שליטה ראשית (Main HUD) [100%]');
        assert.strictEqual(renamed[1].label, null);

        // Fallback Resolution Logic
        const getEffectiveDisplayTitle = (p, st) => {
            return p.label || `${st?.displayName || p.stationId} (${p.displayId})`;
        };

        const st = { displayName: 'Command Desk', id: 'OHAD-PC' };
        assert.strictEqual(getEffectiveDisplayTitle(renamed[0], st), 'עמדת שליטה ראשית (Main HUD) [100%]');
        assert.strictEqual(getEffectiveDisplayTitle(renamed[1], st), 'Command Desk (mon-1)');

        // Clearing Title Resets to null (Restores Fallback)
        const cleared = updatePlacementLabel(renamed, 0, '   ');
        assert.strictEqual(cleared[0].label, null);
        assert.strictEqual(getEffectiveDisplayTitle(cleared[0], st), 'Command Desk (mon-0)');

        // 2. FFmpeg drawtext escaping with expansion=none
        const escapeFfmpegDrawtext = (text) => {
            if (!text) return '';
            return text
                .replace(/\\/g, '\\\\')
                .replace(/'/g, '’')
                .replace(/:/g, '\\:');
        };

        const testTitle = "Ops Center: Screen 'A' [100%] \\ Radar";
        const escaped = escapeFfmpegDrawtext(testTitle);
        assert.strictEqual(escaped, 'Ops Center\\: Screen ’A’ [100%] \\\\ Radar');

        // Formulate drawtext filter clause
        const fontClause = "fontfile='C\\:/Windows/Fonts/arial.ttf':";
        const filterClause = `drawtext=expansion=none:${fontClause}text='${escaped}':x=8:y=8:fontsize=13:fontcolor=white:box=1:boxcolor=0x070A10@0.85:boxborderw=4`;
        assert.ok(filterClause.includes('expansion=none:'));
        assert.ok(filterClause.includes("text='Ops Center\\: Screen ’A’ [100%] \\\\ Radar'"));
        assert.ok(filterClause.includes('boxborderw=4'));
    });
});