/**
 * Multi-Monitor Virtual Desktop Topology Geometry Helpers for ExtractorAdvanced Studio
 */

export function calculateTopologyBounds(displays) {
    if (!displays || displays.length === 0) {
        return { minX: 0, minY: 0, totalWidth: 1920, totalHeight: 1080 };
    }
    const minX = Math.min(...displays.map(d => (d.X ?? d.x ?? 0)));
    const minY = Math.min(...displays.map(d => (d.Y ?? d.y ?? 0)));
    const maxX = Math.max(...displays.map(d => ((d.X ?? d.x ?? 0) + (d.Width || d.width || 1920))));
    const maxY = Math.max(...displays.map(d => ((d.Y ?? d.y ?? 0) + (d.Height || d.height || 1080))));

    return {
        minX,
        minY,
        totalWidth: Math.max(1, maxX - minX),
        totalHeight: Math.max(1, maxY - minY)
    };
}

export function calculateNormalizedDisplayRect(display, bounds) {
    if (!display || !bounds || bounds.totalWidth <= 0 || bounds.totalHeight <= 0) {
        return { leftPct: 0, topPct: 0, widthPct: 100, heightPct: 100 };
    }

    const x = display.X ?? display.x ?? 0;
    const y = display.Y ?? display.y ?? 0;
    const width = display.Width || display.width || 1920;
    const height = display.Height || display.height || 1080;

    return {
        leftPct: ((x - bounds.minX) / bounds.totalWidth) * 100,
        topPct: ((y - bounds.minY) / bounds.totalHeight) * 100,
        widthPct: (width / bounds.totalWidth) * 100,
        heightPct: (height / bounds.totalHeight) * 100
    };
}
