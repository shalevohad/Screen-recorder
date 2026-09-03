import { useMemo, useState, useRef, useEffect } from 'react';
import './LiveTelemetryChart.scss';

export default function LiveTelemetryChart({ chartData, activeLayers, onToggleLayer, type = 'hardware' }) {
    const [hoverState, setHoverState] = useState(null);
    const [zoomWindow, setZoomWindow] = useState(null);
    const [amplitudeMax, setAmplitudeMax] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState(null);
    const [dragEnd, setDragEnd] = useState(null);
    const [currentTime, setCurrentTime] = useState(() => Date.now());
    const svgRef = useRef(null);

    useEffect(() => {
        let animationFrameId;
        const updateSmoothTime = () => {
            setCurrentTime(Date.now());
            animationFrameId = requestAnimationFrame(updateSmoothTime);
        };
        animationFrameId = requestAnimationFrame(updateSmoothTime);
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

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

    const timeWindow = useMemo(() => {
        const maxTime = currentTime;
        const minTime = maxTime - 60000;

        if (zoomWindow) {
            return { minTime: zoomWindow.startMs, maxTime: zoomWindow.endMs };
        }
        return { minTime, maxTime };
    }, [currentTime, zoomWindow]);

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

    // 💡 חישוב דינמי של ציר ה-Y לפי ה-Peak (הערך המקסימלי) בתוך חלון הזמן הנוכחי
    const scaleMax = useMemo(() => {
        if (amplitudeMax) return amplitudeMax;
        if (!timeStampedData || timeStampedData.length === 0) return type === 'hardware' ? 100 : 10;

        const { minTime, maxTime } = timeWindow;
        let currentMax = 0;

        timeStampedData.forEach(pt => {
            if (pt.timestamp >= minTime && pt.timestamp <= maxTime) {
                if (type === 'hardware') {
                    if (activeLayers.hostCpu && (pt.hostCpuPct || pt.cpuAvg) > currentMax) currentMax = pt.hostCpuPct || pt.cpuAvg;
                    if (activeLayers.appCpu && (pt.processCpuPct || pt.appCpuPct) > currentMax) currentMax = pt.processCpuPct || pt.appCpuPct;
                    if (activeLayers.ramAvg && pt.ramAvg > currentMax) currentMax = pt.ramAvg;
                } else {
                    if (activeLayers.netTotal && (pt.netTotalTxMbps || pt.nicTotalTxMbps) > currentMax) currentMax = pt.netTotalTxMbps || pt.nicTotalTxMbps;
                    if (activeLayers.netApp && (pt.netTxMbps || pt.mediaTxMbps) > currentMax) currentMax = pt.netTxMbps || pt.mediaTxMbps;
                    if (activeLayers.telem && (pt.telemNorm || pt.telemetryTxKbps) > currentMax) currentMax = pt.telemNorm || pt.telemetryTxKbps;
                }
            }
        });

        if (currentMax <= 0) return type === 'hardware' ? 100 : 10;
        return Math.ceil(currentMax * 1.15); // מרווח של 15% מעל הפีק הגבוה ביותר בחלון
    }, [timeStampedData, timeWindow, activeLayers, type, amplitudeMax]);

    const { paths, labels } = useMemo(() => {
        if (!timeStampedData || timeStampedData.length === 0) {
            return { paths: {}, labels: {} };
        }

        const w = 1000;
        const h = 130;
        const { minTime, maxTime } = timeWindow;
        const spanMs = maxTime - minTime || 1;
        const maxVal = scaleMax || 100;

        const buildPath = (getKey) => {
            let path = "";
            let isFirst = true;

            for (let i = 0; i < timeStampedData.length; i++) {
                const pt = timeStampedData[i];
                const x = ((pt.timestamp - minTime) / spanMs) * w;

                if (x >= -50 && x <= w + 50) {
                    const rawVal = getKey(pt);
                    const val = Math.min(maxVal, Math.max(0, rawVal || 0));
                    const y = h - (val / maxVal) * h;

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
                    hostCpu: activeLayers.hostCpu ? buildPath(d => d.hostCpuPct || d.cpuAvg) : '',
                    appCpu: activeLayers.appCpu ? buildPath(d => d.processCpuPct || d.appCpuPct) : '',
                    ramAvg: activeLayers.ramAvg ? buildPath(d => d.ramAvg) : '',
                },
                labels: { title: '⚡ HOST vs APP HARDWARE (CPU & RAM)' }
            };
        } else {
            return {
                paths: {
                    netTotal: activeLayers.netTotal ? buildPath(d => d.netTotalTxMbps || d.nicTotalTxMbps) : '',
                    netApp: activeLayers.netApp ? buildPath(d => d.netTxMbps || d.mediaTxMbps) : '',
                    telem: activeLayers.telem ? buildPath(d => d.telemNorm || d.telemetryTxKbps) : '',
                },
                labels: { title: `🌐 TOTAL NETWORK vs APP STREAMING (Dynamic Peak Scale)` }
            };
        }
    }, [timeStampedData, timeWindow, activeLayers, type, scaleMax]);

    const isHardware = type === 'hardware';

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

            if (newEndMs - newStartMs > 2000) {
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
                            <button onClick={() => onToggleLayer('hostCpu')} className={`toggle-btn ${activeLayers.hostCpu ? 'active-cpu' : ''}`}>{activeLayers.hostCpu ? '🟡' : '◯'} Host CPU</button>
                            <button onClick={() => onToggleLayer('appCpu')} className={`toggle-btn ${activeLayers.appCpu ? 'active-cpu-max' : ''}`}>{activeLayers.appCpu ? '🟠' : '◯'} App CPU</button>
                            <button onClick={() => onToggleLayer('ramAvg')} className={`toggle-btn ${activeLayers.ramAvg ? 'active-ram' : ''}`}>{activeLayers.ramAvg ? '🔵' : '◯'} RAM</button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => onToggleLayer('netTotal')} className={`toggle-btn ${activeLayers.netTotal ? 'active-media' : ''}`}>{activeLayers.netTotal ? '🟢' : '◯'} Total Net Tx</button>
                            <button onClick={() => onToggleLayer('netApp')} className={`toggle-btn ${activeLayers.netApp ? 'active-media-max' : ''}`}>{activeLayers.netApp ? '🔵' : '◯'} App Media Tx</button>
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
                    <span>Peak Max: {scaleMax.toFixed(1)} {isHardware ? '%' : 'Mbps'}</span>
                    <span>Smooth Rolling 60s (Peak Y-Axis Scale)</span>
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
                                <span style={{ color: '#f59e0b' }}>Host CPU: {(activeDataPoint.hostCpuPct || activeDataPoint.cpuAvg)?.toFixed(1)}%</span>
                                <span style={{ color: '#f97316' }}>App CPU: {(activeDataPoint.processCpuPct || activeDataPoint.appCpuPct)?.toFixed(1)}%</span>
                                <span style={{ color: '#3b82f6' }}>RAM: {activeDataPoint.ramAvg?.toFixed(1)}%</span>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <span style={{ color: '#38bdf8' }}>Total Net: {(activeDataPoint.netTotalTxMbps || activeDataPoint.nicTotalTxMbps)?.toFixed(2)} Mbps</span>
                                <span style={{ color: '#60a5fa' }}>App Tx: {(activeDataPoint.netTxMbps || activeDataPoint.mediaTxMbps)?.toFixed(2)} Mbps</span>
                                <span style={{ color: '#a855f7' }}>C2: {(activeDataPoint.telemNorm || activeDataPoint.telemetryTxKbps)?.toFixed(1)}</span>
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
                            {activeLayers.appCpu && <path d={paths.appCpu} fill="none" stroke="#f97316" strokeWidth="1.5" strokeDasharray="2 2" />}
                            {activeLayers.hostCpu && <path d={paths.hostCpu} fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinejoin="round" />}
                            {activeLayers.ramAvg && <path d={paths.ramAvg} fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinejoin="round" />}
                        </>
                    ) : (
                        <>
                            {activeLayers.netApp && <path d={paths.netApp} fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="2 2" />}
                            {activeLayers.netTotal && <path d={paths.netTotal} fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinejoin="round" />}
                            {activeLayers.telem && <path d={paths.telem} fill="none" stroke="#a855f7" strokeWidth="2" strokeLinejoin="round" />}
                        </>
                    )}
                </svg>

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