import React from 'react';

export default function TimelineMinimap({
    durationMs,
    zoomLevel,
    onZoomIn,
    onZoomOut,
    onZoomReset,
    inPointMs,
    outPointMs,
    playheadMs
}) {
    const toPercent = (ms) => `${Math.max(0, Math.min((ms / durationMs) * 100, 100))}%`;

    return (
        <div className="flex items-center h-5 bg-[#050812] border-b border-[#1e293b] px-3 select-none text-[10px]">
            {/* כפתורי זום */}
            <div className="flex items-center gap-1 shrink-0 mr-3 border-r border-[#1e293b] pr-2">
                <button
                    onClick={onZoomOut}
                    className="w-4 h-4 bg-[#111c33] hover:bg-[#1a2b4f] text-[#94a3b8] hover:text-white rounded flex items-center justify-center font-bold"
                    title="Zoom Out"
                >
                    -
                </button>
                <span className="text-[#64748b] font-mono px-1">{zoomLevel}x</span>
                <button
                    onClick={onZoomIn}
                    className="w-4 h-4 bg-[#111c33] hover:bg-[#1a2b4f] text-[#94a3b8] hover:text-white rounded flex items-center justify-center font-bold"
                    title="Zoom In"
                >
                    +
                </button>
                <button
                    onClick={onZoomReset}
                    className="px-1.5 h-4 bg-[#111c33] hover:bg-[#1a2b4f] text-[#64748b] hover:text-[#00e5ff] rounded text-[9px] font-mono"
                    title="Reset Zoom (Fit)"
                >
                    FIT
                </button>
            </div>

            {/* רצועת ה-Minimap הכללית */}
            <div className="relative flex-1 h-2 bg-[#0a1020] rounded-sm overflow-hidden border border-[#1a2744]">
                {/* תחום ה-Cut IN / OUT */}
                <div
                    className="absolute top-0 bottom-0 bg-[#00e5ff]/25 border-l border-r border-[#00e5ff]"
                    style={{ left: toPercent(inPointMs), width: `${((outPointMs - inPointMs) / durationMs) * 100}%` }}
                />

                {/* סמן ה-Playhead במפה */}
                <div
                    className="absolute top-0 bottom-0 w-[2px] bg-[#f43f5e]"
                    style={{ left: toPercent(playheadMs) }}
                />
            </div>
        </div>
    );
}