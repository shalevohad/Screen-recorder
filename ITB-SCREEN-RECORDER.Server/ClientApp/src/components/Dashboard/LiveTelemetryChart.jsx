import { useMemo, useState, useRef, useEffect } from 'react';
import './LiveTelemetryChart.scss';

export default function LiveTelemetryChart({ chartData, activeLayers, onToggleLayer, type = 'hardware' }) {
    const [hoverState, setHoverState] = useState(null);
    const [zoomWindow, setZoomWindow] = useState(null);
    const [amplitudeMax, setAmplitudeMax] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState(null);
    const [dragEnd, setDragEnd] = useState(null);
    const [currentTime, setCurrentTime] = useState(Date.now());
    const svgRef = useRef(null);

    // עדכון תדיר ורציף של הזמן עבור החלקה ויזואלית מלאה (Smooth Animation Frame)
    useEffect(() => {
        let animationFrameId;
        const updateSmoothTime = () => {
            setCurrentTime(Date.now());
            animationFrameId = requestAnimationFrame(updateSmoothTime);
        };
        animationFrameId = requestAnimationFrame(updateSmoothTime);
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    // יצירת מערך נתונים עם חותמות זמן מדויקות מבוססות מילישניות
    const timeStampedData = useMemo(() => {
        if (!chartData || chartData.length === 0) return [];
        const now = currentTime;
        const intervalMs = 1000;
        return chartData.map((d, idx) => {
            const timeOffset = (chartData.length - 1 - idx) * intervalMs;
            return {
                ...d,
                timestamp: now - timeOffset
            };
        });
    }, [chartData, currentTime]);

    // הגדרת חלון הזמן הגולש (60 השניות האחרונות או אזור זום מוגדר)
    const timeWindow = useMemo(() => {
        const maxTime = currentTime;
        const minTime = maxTime - 60000;

        if (zoomWindow) {
            return { minTime: zoomWindow.startMs, maxTime: zoomWindow.endMs };
        }
        return { minTime, maxTime };
    }, [currentTime, zoomWindow]);

    // תוויות ציר X בקפיצות של 5 שניות שנעות וגולשות הצידה ברציפות
    const timeLabels = useMemo(() => {
        const { minTime, maxTime } = timeWindow;
        const spanMs = maxTime - minTime || 1;
        const arr = [];

        const firstTick = Math.ceil(minTime / 5000) * 5000;
        for (let t = firstTick; t <= maxTime; t += 5000) {
            const leftPct = ((t - minTime) / spanMs) * 100;
            const timeString = new Date(t).toTimeString().split(' ')[0];
            arr.push({ timeString, leftPct });
        }
        return arr;
    }, [timeWindow]);

    // בניית הנתיבים (Paths) של הגרף הממופים במדויק לפי חותמות הזמן
    const { paths, labels, maxScale } = useMemo(() => {
        if (!timeStampedData || timeStampedData.length === 0) {
            return { paths: {}, labels: {}, maxScale: 100 };
        }

        const w = 1000;
        const h = 130;
        const { minTime, maxTime } = timeWindow;
        const spanMs = maxTime - minTime || 1;

        const defaultMax = type === 'hardware' ? 100 : 10000;
        const scaleMax = amplitudeMax || defaultMax;

        const buildPath = (key) => {
            let path = "";
            let isFirst = true;

            for (let i = 0; i < timeStampedData.length; i++) {
                const pt = timeStampedData[i];
                const x = ((pt.timestamp - minTime) / spanMs) * w;

                if (x >= -50 && x <= w + 50) {
                    const val = Math.min(scaleMax, Math.max(0, pt[key] || 0));
                    const y = h - (val / scaleMax) * h;

                    if (isFirst) {
                        path += `M ${x},${y}`;
                        isFirst = false;
                    } else {
                        path += ` L ${x},${y}`;
                    }
                }
            }
            return path;
        };

        if (type === 'hardware') {
            return {
                paths: {
                    avg: activeLayers.cpuAvg ? buildPath('cpuAvg') : '',
                    max: activeLayers.cpuMax ? buildPath('cpuMax') : '',
                    ramAvg: activeLayers.ramAvg ? buildPath('ramAvg') : '',
                },
                labels: { title: '⚡ SYSTEM HARDWARE (CPU AVG vs MAX & RAM)' },
                maxScale: 100
            };
        } else {
            return {
                paths: {
                    avg: activeLayers.netAvg ? buildPath('netAvg') : '',
                    max: activeLayers.netMax ? buildPath('netMax') : '',
                    telem: activeLayers.telem ? buildPath('telemNorm') : '',
                },
                labels: { title: `🌐 NETWORK TRAFFIC (BANDWIDTH - Scale: ${scaleMax >= 1000 ? (scaleMax / 1000) + ' Gbps' : scaleMax + ' Mbps'})` },
                maxScale: scaleMax
            };
        }
    }, [timeStampedData, timeWindow, activeLayers, type, amplitudeMax]);

    const isHardware = type === 'hardware';

    // חישוב מדויק של מיקום העכבר והצגת ה-Tooltip
    const handleMouseMove = (e) => {
        if (!svgRef.current || timeStampedData.length === 0) return;
        const rect = svgRef.current.getBoundingClientRect();
        const offsetX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        const percentage = offsetX / rect.width;

        const { minTime, maxTime } = timeWindow;
        const targetTime = minTime + percentage * (maxTime - minTime);

        let closestIdx = 0;
        let minDiff = Infinity;
        timeStampedData.forEach((d, idx) => {
            const diff = Math.abs(d.timestamp - targetTime);
            if (diff < minDiff) {
                minDiff = diff;
                closestIdx = idx;
            }
        });

        setHoverState({
            index: closestIdx,
            x: percentage * 1000,
            left: e.clientX - rect.left
        });

        if (isDragging && dragStart !== null) {
            setDragEnd(offsetX);
        }
    };

    const handleMouseDown = (e) => {
        if (!svgRef.current) return;
        const rect = svgRef.current.getBoundingClientRect();
        setIsDragging(true);
        setDragStart(e.clientX - rect.left);
        setDragEnd(e.clientX - rect.left);
    };

    // תיקון חישוב הזום כך שיתפוס בדיוק את תחום הגרירה
    const handleMouseUp = () => {
        if (isDragging && dragStart !== null && dragEnd !== null && Math.abs(dragEnd - dragStart) > 10) {
            if (!svgRef.current) return;
            const rect = svgRef.current.getBoundingClientRect();
            const minX = Math.min(dragStart, dragEnd);
            const maxX = Math.max(dragStart, dragEnd);

            const startPct = minX / rect.width;
            const endPct = maxX / rect.width;

            const { minTime, maxTime } = timeWindow;
            const span = maxTime - minTime;

            const newStartMs = minTime + startPct * span;
            const newEndMs = minTime + endPct * span;

            if (newEndMs - newStartMs > 2000) { // מינימום 2 שניות לזום
                setZoomWindow({ startMs: newStartMs, endMs: newEndMs });
            }
        }
        setIsDragging(false);
        setDragStart(null);
        setDragEnd(null);
    };

    const handleMouseLeave = () => {
        setHoverState(null);
        if (isDragging) {
            setIsDragging(false);
            setDragStart(null);
            setDragEnd(null);
        }
    };

    const handleResetZoom = () => {
        setZoomWindow(null);
        setAmplitudeMax(null);
    };

    const activeDataPoint = hoverState !== null && timeStampedData[hoverState.index] ? timeStampedData[hoverState.index] : null;

    return (
        <div className="live-telemetry-container" style={{ marginBottom: '1.5rem' }}>
            <div className="telemetry-toggles" style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 'bold', fontFamily: 'monospace' }}>
                        {labels?.title}
                    </span>
                    <button onClick={handleResetZoom} title="Reset Zoom" style={{ background: '#1e293b', color: '#38bdf8', border: '1px solid #334155', borderRadius: '4px', padding: '2px 8px', fontSize: '10px', cursor: 'pointer', fontWeight: 'bold' }}>
                        🔍 Reset Zoom
                    </button>
                </div>

                <div style={{ display: 'flex', gap: '8px', fontSize: '11px' }}>
                    {isHardware ? (
                        <>
                            <button onClick={() => onToggleLayer('cpuAvg')} className={`toggle-btn ${activeLayers.cpuAvg ? 'active-cpu' : ''}`}>{activeLayers.cpuAvg ? '🟡' : '◯'} CPU Avg</button>
                            <button onClick={() => onToggleLayer('cpuMax')} className={`toggle-btn ${activeLayers.cpuMax ? 'active-cpu-max' : ''}`}>{activeLayers.cpuMax ? '🟠' : '◯'} CPU Max</button>
                            <button onClick={() => onToggleLayer('ramAvg')} className={`toggle-btn ${activeLayers.ramAvg ? 'active-ram' : ''}`}>{activeLayers.ramAvg ? '🔵' : '◯'} RAM</button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => onToggleLayer('netAvg')} className={`toggle-btn ${activeLayers.netAvg ? 'active-media' : ''}`}>{activeLayers.netAvg ? '🟢' : '◯'} Net Avg</button>
                            <button onClick={() => onToggleLayer('netMax')} className={`toggle-btn ${activeLayers.netMax ? 'active-media-max' : ''}`}>{activeLayers.netMax ? '🔵' : '◯'} Net Peak</button>
                            <button onClick={() => onToggleLayer('telem')} className={`toggle-btn ${activeLayers.telem ? 'active-telemetry' : ''}`}>{activeLayers.telem ? '🟣' : '◯'} C2</button>
                        </>
                    )}
                </div>
            </div>

            <div
                className="chart-canvas-wrapper"
                style={{ height: '180px', position: 'relative', cursor: 'crosshair', display: 'flex', flexDirection: 'column' }}
                onMouseMove={handleMouseMove}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
            >
                <div className="chart-max-label" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '0 5px', color: '#64748b', fontSize: '10px' }}>
                    <span>{isHardware ? '100%' : (maxScale >= 1000 ? (maxScale / 1000) + ' Gbps' : maxScale + ' Mbps')}</span>
                    <span>Smooth Rolling 60s (Drag to Zoom)</span>
                </div>

                {activeDataPoint && hoverState && (
                    <div style={{
                        position: 'absolute',
                        top: '15px',
                        left: `${Math.min(Math.max(hoverState.left - 75, 10), window.innerWidth - 300)}px`,
                        background: 'rgba(2, 6, 23, 0.95)',
                        border: '1px solid #334155',
                        borderRadius: '6px',
                        padding: '6px 10px',
                        fontSize: '11px',
                        fontFamily: 'monospace',
                        color: '#f8fafc',
                        zIndex: 20,
                        pointerEvents: 'none',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.7)'
                    }}>
                        {isHardware ? (
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <span style={{ color: '#f59e0b' }}>CPU Avg: {activeDataPoint.cpuAvg?.toFixed(1)}%</span>
                                <span style={{ color: '#f97316' }}>CPU Max: {activeDataPoint.cpuMax?.toFixed(1)}%</span>
                                <span style={{ color: '#3b82f6' }}>RAM: {activeDataPoint.ramAvg?.toFixed(1)}%</span>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <span style={{ color: '#38bdf8' }}>Net Avg: {activeDataPoint.netAvg?.toFixed(2)} Mbps</span>
                                <span style={{ color: '#60a5fa' }}>Net Peak: {activeDataPoint.netMax?.toFixed(2)} Mbps</span>
                                <span style={{ color: '#a855f7' }}>C2: {activeDataPoint.telemNorm?.toFixed(1)}%</span>
                            </div>
                        )}
                    </div>
                )}

                <svg ref={svgRef} width="100%" height="130px" viewBox="0 0 1000 130" preserveAspectRatio="none" style={{ overflow: 'visible', flexGrow: 1 }}>
                    <line x1="0" y1="32.5" x2="1000" y2="32.5" stroke="#1e293b" strokeDasharray="4 4" />
                    <line x1="0" y1="65" x2="1000" y2="65" stroke="#1e293b" strokeDasharray="4 4" />
                    <line x1="0" y1="97.5" x2="1000" y2="97.5" stroke="#1e293b" strokeDasharray="4 4" />

                    {isDragging && dragStart !== null && dragEnd !== null && (
                        <rect
                            x={Math.min(dragStart, dragEnd)}
                            y="0"
                            width={Math.abs(dragEnd - dragStart)}
                            height="130"
                            fill="rgba(56, 189, 248, 0.2)"
                            stroke="#38bdf8"
                            strokeDasharray="2 2"
                        />
                    )}

                    {hoverState && !isDragging && (
                        <line x1={hoverState.x} y1="0" x2={hoverState.x} y2="130" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />
                    )}

                    {isHardware ? (
                        <>
                            {activeLayers.cpuMax && <path d={paths.max} fill="none" stroke="#f97316" strokeWidth="1.5" strokeDasharray="2 2" />}
                            {activeLayers.cpuAvg && <path d={paths.avg} fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinejoin="round" />}
                            {activeLayers.ramAvg && <path d={paths.ramAvg} fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinejoin="round" />}
                        </>
                    ) : (
                        <>
                            {activeLayers.netMax && <path d={paths.max} fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="2 2" />}
                            {activeLayers.netAvg && <path d={paths.avg} fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinejoin="round" />}
                            {activeLayers.telem && <path d={paths.telem} fill="none" stroke="#a855f7" strokeWidth="2" strokeLinejoin="round" />}
                        </>
                    )}
                </svg>

                {/* ציר זמן תחתתי חלק שגולש שמאלה בקפיצות של 5 שניות */}
                <div style={{ position: 'relative', height: '20px', width: '100%', marginTop: '4px', fontSize: '10px', color: '#64748b', fontFamily: 'monospace' }}>
                    {timeLabels.map((t, idx) => (
                        <div key={idx} style={{ position: 'absolute', left: `${t.leftPct}%`, transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}>
                            | {t.timeString}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}