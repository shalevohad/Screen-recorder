import { useState, useEffect } from 'react';
import '../styles/StationThumbnail.css';
import FullscreenModal from './FullscreenModal';
import WebRTCPlayer from './WebRTCPlayer';

export default function StationThumbnail({
    hostname,
    isOnline,
    isStreaming,
    ipAddress = 'N/A',
    cpuUsage = 0,
    gpuUsage = 0,
    hasAudio = false,
    isPending = false,
    onToggleStream,
    actualFps = 0,
    internalCaptureFps = 0,
    droppedFrames = 0,
    qosTier = 3
}) {
    const [showFullscreen, setShowFullscreen] = useState(false);
    const [showStats, setShowStats] = useState(false);

    // 💡 מנגנון Auto-Retry חכם למניעת הצורך ברענון ידני בטעינה ראשונה
    const [retryKey, setRetryKey] = useState(0);

    const serverHost = window.location.hostname;
    const webrtcPort = import.meta.env?.VITE_WEBRTC_PORT || '8889';
    const dynamicWebrtcBaseUrl = `http://${serverHost}:${webrtcPort}`;

    // אם העמדה עוברת למצב סטרימינג והוידאו לא נטען, נבצע ניסיון חיבור אוטומטי נוסף לאחר 2 שניות
    useEffect(() => {
        let timer;
        if (isOnline && isStreaming) {
            timer = setTimeout(() => {
                setRetryKey(prev => prev + 1);
            }, 2000);
        }
        return () => clearTimeout(timer);
    }, [isOnline, isStreaming]);

    const formatTelemetry = (val) => {
        if (val === null || val === undefined || isNaN(val)) return '0.0';
        return Number(val).toFixed(1);
    };

    const getBarColor = (val) => {
        const num = Number(val);
        if (num < 60) return '#10b981';
        if (num < 85) return '#f59e0b';
        return '#ef4444';
    };

    const getTrafficLightStyle = () => {
        if (qosTier === 3) return { backgroundColor: '#22c55e', boxShadow: '0 0 12px rgba(34,197,94,0.9)' };
        if (qosTier >= 1) return { backgroundColor: '#eab308', boxShadow: '0 0 12px rgba(234,179,8,0.9)' };
        return { backgroundColor: '#ef4444', boxShadow: '0 0 12px rgba(239,68,68,1)' };
    };

    const isLive = isOnline && isStreaming;

    return (
        <>
            {/* 💡 עיצוב מודרני וחלקלק: זכוכית עדינה, מעברי צבע, וצלליות עומק */}
            <div className={`station-card group transition-all duration-300 hover:border-gray-600 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] ${!isOnline ? 'opacity-60' : ''}`}
                style={{
                    background: 'linear-gradient(145deg, #111827 0%, #030712 100%)',
                    borderRadius: '16px',
                    border: '1px solid #1f2937',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >

                {/* Header */}
                <div className="station-card-header" style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(31, 41, 55, 0.6)' }}>
                    <div className="header-left-actions" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div className={`status-pill ${isOnline ? 'online' : 'offline'}`} style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold', letterSpacing: '0.05em' }}>
                            {isOnline ? 'ONLINE' : 'OFFLINE'}
                        </div>

                        {hasAudio && isOnline && (
                            <div className="mic-indicator text-emerald-400" title="Audio Stream Active">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                                    <line x1="12" y1="19" x2="12" y2="23"></line>
                                    <line x1="8" y1="23" x2="16" y2="23"></line>
                                </svg>
                            </div>
                        )}

                        {isOnline && (
                            <button
                                className={`transition-all duration-200 active:scale-95 ${isPending ? 'opacity-50 cursor-not-allowed' : 'hover:brightness-110'}`}
                                onClick={onToggleStream}
                                disabled={isPending}
                                title={isStreaming ? "Stop Streaming" : "Start Streaming"}
                                style={{
                                    backgroundColor: isStreaming ? '#dc2626' : '#16a34a',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '5px 12px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    fontWeight: 'bold',
                                    cursor: isPending ? 'not-allowed' : 'pointer',
                                    boxShadow: isStreaming ? '0 4px 12px rgba(220,38,38,0.4)' : '0 4px 12px rgba(22,163,74,0.4)'
                                }}
                            >
                                {isPending ? (
                                    <svg className="animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                                        <circle cx="12" cy="12" r="10" strokeDasharray="30" strokeDashoffset="0"></circle>
                                    </svg>
                                ) : isStreaming ? (
                                    <>
                                        <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12"><rect x="6" y="6" width="12" height="12"></rect></svg>
                                        <span style={{ fontSize: '11px', letterSpacing: '0.05em' }}>STOP</span>
                                    </>
                                ) : (
                                    <>
                                        <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                                        <span style={{ fontSize: '11px', letterSpacing: '0.05em' }}>START</span>
                                    </>
                                )}
                            </button>
                        )}
                    </div>

                    <div className="station-identity" style={{ textAlign: 'right' }}>
                        <span className="station-hostname" style={{ color: '#f3f4f6', fontWeight: 'bold', fontSize: '14px', display: 'block' }}>{hostname}</span>
                        <span className="station-ip" style={{ color: '#9ca3af', fontSize: '11px', fontFamily: 'monospace' }}>{ipAddress}</span>
                    </div>
                </div>

                {/* Video Stage / Thumbnail */}
                <div
                    className="station-screen-area relative bg-black cursor-pointer overflow-hidden"
                    style={{ aspectRatio: '16/9', width: '100%' }}
                    onClick={() => isLive && setShowFullscreen(true)}
                >
                    {isLive && (
                        <div
                            style={{
                                position: 'absolute',
                                top: '12px',
                                left: '12px',
                                zIndex: 10,
                                cursor: 'help'
                            }}
                            title={`FPS: ${actualFps} | Tier: ${qosTier} ${droppedFrames > 0 ? `| Drops: ${droppedFrames}` : ''}`}
                        >
                            <div style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                border: '2px solid rgba(0,0,0,0.8)',
                                ...getTrafficLightStyle()
                            }}></div>
                        </div>
                    )}

                    {isLive ? (
                        <>
                            <div className="station-thumbnail-video w-full h-full overflow-hidden" style={{ pointerEvents: 'none' }}>
                                {/* 💡 הוספת key דינמי מאפשר טעינה מחדש נקייה ואוטומטית במידה והסטרים עלה באיחור */}
                                <WebRTCPlayer
                                    key={retryKey}
                                    streamPath={`live/${hostname}`}
                                    webrtcBaseUrl={dynamicWebrtcBaseUrl}
                                />
                            </div>
                            <div className="play-overlay-hint absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center text-white gap-2">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8v8m0-8a4 4 0 018 0v8m0-8a4 4 0 018 0v8m0-8V8m0 8a4 4 0 118 0" />
                                </svg>
                                <span style={{ fontSize: '11px', letterSpacing: '0.1em', fontWeight: 'bold' }}>EXPAND FULLSCREEN</span>
                            </div>
                        </>
                    ) : (
                        <div className="screen-offline-placeholder flex items-center justify-center h-full text-gray-500 font-mono text-xs tracking-wider">
                            <span>{isOnline && !isStreaming ? 'WAITING FOR STREAM...' : 'STATION OFFLINE'}</span>
                        </div>
                    )}
                </div>

                {/* Telemetry Footer */}
                <div className="station-telemetry" style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div className="telemetry-row">
                        <div className="telemetry-label" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px', fontFamily: 'monospace' }}>
                            <span style={{ color: '#9ca3af' }}>CPU</span>
                            <span style={{ color: getBarColor(cpuUsage), fontWeight: 'bold' }}>{formatTelemetry(cpuUsage)}%</span>
                        </div>
                        <div className="telemetry-bar-bg" style={{ height: '5px', backgroundColor: '#1f2937', borderRadius: '3px', overflow: 'hidden' }}>
                            <div
                                className="telemetry-bar-fill transition-all duration-500"
                                style={{ height: '100%', width: `${Math.min(100, Math.max(0, cpuUsage))}%`, backgroundColor: getBarColor(cpuUsage), borderRadius: '3px' }}
                            />
                        </div>
                    </div>
                    <div className="telemetry-row">
                        <div className="telemetry-label" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px', fontFamily: 'monospace' }}>
                            <span style={{ color: '#9ca3af' }}>GPU</span>
                            <span style={{ color: getBarColor(gpuUsage), fontWeight: 'bold' }}>{formatTelemetry(gpuUsage)}%</span>
                        </div>
                        <div className="telemetry-bar-bg" style={{ height: '5px', backgroundColor: '#1f2937', borderRadius: '3px', overflow: 'hidden' }}>
                            <div
                                className="telemetry-bar-fill transition-all duration-500"
                                style={{ height: '100%', width: `${Math.min(100, Math.max(0, gpuUsage))}%`, backgroundColor: getBarColor(gpuUsage), borderRadius: '3px' }}
                            />
                        </div>
                    </div>

                    {isStreaming && (
                        <div style={{ marginTop: '4px', borderTop: '1px solid rgba(31, 41, 55, 0.8)', paddingTop: '8px' }}>
                            <div style={{ textAlign: 'center', marginBottom: '4px' }}>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowStats(!showStats);
                                    }}
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        color: '#9ca3af',
                                        fontSize: '10px',
                                        cursor: 'pointer',
                                        fontFamily: 'monospace',
                                        letterSpacing: '0.05em'
                                    }}
                                    className="hover:text-white transition-colors"
                                >
                                    {showStats ? '▴ HIDE NETWORK STATS' : '▾ SHOW NETWORK STATS'}
                                </button>
                            </div>

                            {showStats && (
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: '6px',
                                    fontSize: '11px',
                                    fontFamily: 'monospace',
                                    marginTop: '6px'
                                }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', background: '#030712', padding: '6px', borderRadius: '6px', border: '1px solid #1f2937' }}>
                                        <span style={{ color: '#6b7280', fontSize: '9px' }}>FPS (Out)</span>
                                        <span style={{ color: '#22c55e', fontWeight: 'bold' }}>{actualFps}</span>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', background: '#030712', padding: '6px', borderRadius: '6px', border: '1px solid #1f2937' }}>
                                        <span style={{ color: '#6b7280', fontSize: '9px' }}>Capture FPS</span>
                                        <span style={{ color: '#eab308', fontWeight: 'bold' }}>{internalCaptureFps}</span>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', background: '#030712', padding: '6px', borderRadius: '6px', border: '1px solid #1f2937' }}>
                                        <span style={{ color: '#6b7280', fontSize: '9px' }}>Drops (1s)</span>
                                        <span style={{ color: droppedFrames > 0 ? '#ef4444' : '#9ca3af', fontWeight: 'bold' }}>{droppedFrames}</span>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', background: '#030712', padding: '6px', borderRadius: '6px', border: '1px solid #1f2937' }}>
                                        <span style={{ color: '#6b7280', fontSize: '9px' }}>QoS Tier</span>
                                        <span style={{ color: '#3b82f6', fontWeight: 'bold' }}>T{qosTier}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {showFullscreen && (
                <FullscreenModal
                    hostname={hostname}
                    webrtcBaseUrl={dynamicWebrtcBaseUrl}
                    onClose={() => setShowFullscreen(false)}
                />
            )}
        </>
    );
}