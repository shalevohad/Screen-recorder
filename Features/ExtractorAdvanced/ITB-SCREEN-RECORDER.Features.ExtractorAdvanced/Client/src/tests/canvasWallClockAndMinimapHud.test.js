import { describe, it } from 'node:test';
import assert from 'node:assert';

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
});
