// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Viewport/utils/viewportLayoutCalculator.js
// ==========================================

export function calculateOptimalGrid(count, containerWidth, containerHeight, gap = 14) {
    const availableWidth = containerWidth - 24;
    const availableHeight = containerHeight - 24;

    if (availableWidth <= 0 || availableHeight <= 0 || count <= 0) {
        return { cols: 1, rows: 1 };
    }

    let bestArea = 0;
    let bestCols = 1;
    let bestRows = 1;

    for (let cols = 1; cols <= count; cols++) {
        const rows = Math.ceil(count / cols);
        const cellW = (availableWidth - (cols - 1) * gap) / cols;
        const cellH = (availableHeight - (rows - 1) * gap) / rows;

        if (cellW <= 0 || cellH <= 0) continue;

        let camW = cellW;
        let camH = cellW * (9 / 16);

        if (camH > cellH) {
            camH = cellH;
            camW = cellH * (16 / 9);
        }

        const area = camW * camH;
        if (area > bestArea) {
            bestArea = area;
            bestCols = cols;
            bestRows = rows;
        }
    }

    return { cols: bestCols, rows: bestRows };
}