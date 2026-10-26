// ==========================================
// File: ClientApp/src/tests/streamHealth.test.js
// ==========================================
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

/**
 * Validates whether a raw video frame buffer is pitch black (all 0x00 or luma < threshold).
 * Used by stream diagnostics to catch black screen drops early.
 */
function isBlackFrame(pixelBuffer, width = 64, height = 36, lumaThreshold = 2.0) {
    if (!pixelBuffer || pixelBuffer.length === 0) return true;

    let totalLuma = 0;
    const pixelCount = Math.floor(pixelBuffer.length / 4);
    if (pixelCount === 0) return true;

    // Sample pixels across the buffer
    const step = Math.max(1, Math.floor(pixelCount / 500));
    let sampledCount = 0;

    for (let i = 0; i < pixelBuffer.length; i += step * 4) {
        const r = pixelBuffer[i] || 0;
        const g = pixelBuffer[i + 1] || 0;
        const b = pixelBuffer[i + 2] || 0;
        // Standard Rec. 601 luma formula
        const y = 0.299 * r + 0.587 * g + 0.114 * b;
        totalLuma += y;
        sampledCount++;
    }

    const avgLuma = sampledCount > 0 ? totalLuma / sampledCount : 0;
    return avgLuma < lumaThreshold;
}

/**
 * Resolves WHEP stream path and handles dual-path compatibility fallback.
 */
function resolveStreamPath(hostname, displayId, knownActivePaths = new Set()) {
    if (!hostname) return '';
    const cleanHost = hostname.trim();
    const primaryPath = displayId ? `live/${cleanHost}/${displayId}` : `live/${cleanHost}`;

    if (knownActivePaths.has(primaryPath)) {
        return primaryPath;
    }

    // Bidirectional fallback
    if (primaryPath.endsWith('/mon-0')) {
        const rootPath = `live/${cleanHost}`;
        if (knownActivePaths.has(rootPath)) return rootPath;
    } else if (!displayId || displayId === 'mon-0') {
        const subPath = `live/${cleanHost}/mon-0`;
        if (knownActivePaths.has(subPath)) return subPath;
    }

    return primaryPath;
}

/**
 * Manages active WebRTC connections in the grid, virtualizing off-screen cards
 * to strictly prevent hitting the browser's PeerConnection limit.
 */
class StreamConnectionGovernor {
    constructor(maxConcurrentActive = 24) {
        this.maxConcurrentActive = maxConcurrentActive;
        this.activeConnections = new Map(); // streamPath -> { pc, isVisible }
    }

    registerCard(streamPath, isVisible, mockPcFactory) {
        if (!isVisible) {
            this.disconnect(streamPath);
            return null;
        }

        if (this.activeConnections.has(streamPath)) {
            return this.activeConnections.get(streamPath).pc;
        }

        // Check if we exceed safe limit
        if (this.activeConnections.size >= this.maxConcurrentActive) {
            // Evict oldest connection
            const oldestKey = this.activeConnections.keys().next().value;
            this.disconnect(oldestKey);
        }

        const pc = mockPcFactory ? mockPcFactory(streamPath) : { streamPath, closed: false, close() { this.closed = true; } };
        this.activeConnections.set(streamPath, { pc, isVisible: true });
        return pc;
    }

    disconnect(streamPath) {
        if (this.activeConnections.has(streamPath)) {
            const entry = this.activeConnections.get(streamPath);
            if (entry.pc && typeof entry.pc.close === 'function') {
                entry.pc.close();
            }
            this.activeConnections.delete(streamPath);
        }
    }

    getActiveCount() {
        return this.activeConnections.size;
    }
}

describe('Stream Health & Black Screen Prevention Tests', () => {
    it('detects pure black frame buffer accurately', () => {
        // Pure black 64x36 RGBA buffer (all zeroes)
        const blackBuffer = new Uint8Array(64 * 36 * 4);
        assert.equal(isBlackFrame(blackBuffer), true);

        // Near-black noise (e.g. luma 0.5) -> Still considered black
        const darkNoise = new Uint8Array(64 * 36 * 4);
        for (let i = 0; i < darkNoise.length; i += 4) {
            darkNoise[i] = 1;
            darkNoise[i + 1] = 1;
            darkNoise[i + 2] = 1;
        }
        assert.equal(isBlackFrame(darkNoise), true);
    });

    it('identifies valid video frame buffer with real desktop graphics', () => {
        // Simulated desktop image with text, UI bars, icons
        const desktopBuffer = new Uint8Array(64 * 36 * 4);
        for (let i = 0; i < desktopBuffer.length; i += 4) {
            desktopBuffer[i] = (i % 255);       // Red
            desktopBuffer[i + 1] = ((i * 2) % 255); // Green
            desktopBuffer[i + 2] = 180;         // Blue
            desktopBuffer[i + 3] = 255;         // Alpha
        }

        assert.equal(isBlackFrame(desktopBuffer), false);
    });

    it('generates non-colliding stream paths for 100 stations with multiple monitors', () => {
        const fleetSize = 100;
        const allPaths = new Set();
        let totalDisplays = 0;

        for (let s = 1; s <= fleetSize; s++) {
            const host = `STATION-${String(s).padStart(3, '0')}`;
            // Simulating stations with 1 to 4 monitors
            const monitorCount = (s % 3) + 1;

            for (let m = 0; m < monitorCount; m++) {
                const displayId = `mon-${m}`;
                const path = resolveStreamPath(host, displayId);
                assert.equal(allPaths.has(path), false, `Collision detected on path: ${path}`);
                allPaths.add(path);
                totalDisplays++;
            }
        }

        assert.ok(totalDisplays >= 200, 'Expected at least 200 display streams across 100 stations');
        assert.equal(allPaths.size, totalDisplays, 'Every stream path in the fleet must be unique');
    });

    it('resolves bidirectional stream fallback between legacy and multi-monitor agents', () => {
        // Agent 1: Legacy agent streaming to root 'live/LEGACY-01'
        const activeServerStreams = new Set(['live/LEGACY-01', 'live/MODERN-01/mon-0', 'live/MODERN-01/mon-1']);

        // Frontend requests 'mon-0' for legacy station -> should fallback to 'live/LEGACY-01'
        const resolvedLegacy = resolveStreamPath('LEGACY-01', 'mon-0', activeServerStreams);
        assert.equal(resolvedLegacy, 'live/LEGACY-01');

        // Frontend requests root for modern station -> should fallback to 'live/MODERN-01/mon-0'
        const resolvedModernRoot = resolveStreamPath('MODERN-01', null, activeServerStreams);
        assert.equal(resolvedModernRoot, 'live/MODERN-01/mon-0');

        // Modern secondary display
        const resolvedSecondary = resolveStreamPath('MODERN-01', 'mon-1', activeServerStreams);
        assert.equal(resolvedSecondary, 'live/MODERN-01/mon-1');
    });

    it('governs WebRTC connections to strictly prevent exceeding browser limits in dense fleet', () => {
        const governor = new StreamConnectionGovernor(24);

        // 80 stations enter the fleet, only 18 are currently in the viewport
        for (let i = 1; i <= 80; i++) {
            const host = `STATION-${i}`;
            const isVisible = (i >= 1 && i <= 18);
            governor.registerCard(`live/${host}/mon-0`, isVisible);
        }

        // Active connections must match visible count (18) and never exceed the budget (24)
        assert.equal(governor.getActiveCount(), 18);

        // User scrolls down: stations 1-18 leave viewport, stations 19-36 enter viewport
        for (let i = 1; i <= 18; i++) {
            governor.disconnect(`live/STATION-${i}/mon-0`);
        }
        for (let i = 19; i <= 36; i++) {
            governor.registerCard(`live/STATION-${i}/mon-0`, true);
        }

        assert.equal(governor.getActiveCount(), 18);
        assert.ok(governor.getActiveCount() <= governor.maxConcurrentActive);
    });
});
