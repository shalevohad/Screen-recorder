import React, { useEffect, useRef } from 'react';
import { useAudioSolo } from '../../context/AudioSoloContext';
import './MasterAudioDock.scss';

export default function MasterAudioDock({ stations = [] }) {
    const {
        activeAudioStationIds = [],
        audioVolume,
        isGlobalMuted,
        activeAudioStream,
        activeAudioStreams = [],
        setAudioVolume,
        toggleGlobalMute,
        stopAudioSolo,
        muteStation
    } = useAudioSolo();

    const bar1Ref = useRef(null);
    const bar2Ref = useRef(null);
    const bar3Ref = useRef(null);
    const bar4Ref = useRef(null);
    const bar5Ref = useRef(null);

    const audioCtxRef = useRef(null);
    const analyserRef = useRef(null);
    const sourcesRef = useRef([]);
    const animFrameRef = useRef(null);

    const activeStreamToAnalyze = activeAudioStream || (activeAudioStreams && activeAudioStreams[0]) || null;

    useEffect(() => {
        const bars = [bar1Ref.current, bar2Ref.current, bar3Ref.current, bar4Ref.current, bar5Ref.current];

        const resetBars = () => {
            bars.forEach(b => {
                if (b) {
                    b.style.height = '3px';
                    b.style.background = isGlobalMuted ? '#64748B' : 'linear-gradient(180deg, #10B981, #06B6D4)';
                }
            });
        };

        if (!activeStreamToAnalyze || isGlobalMuted) {
            resetBars();
            return;
        }

        const audioTracks = activeStreamToAnalyze.getAudioTracks();
        if (!audioTracks || audioTracks.length === 0) {
            resetBars();
            return;
        }

        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;

        let ctx = audioCtxRef.current;
        if (!ctx || ctx.state === 'closed') {
            ctx = new AudioContextClass();
            audioCtxRef.current = ctx;
        }

        if (ctx.state === 'suspended') {
            ctx.resume().catch(() => {});
        }

        try {
            const analyser = ctx.createAnalyser();
            analyser.fftSize = 64; // 32 frequency bins
            analyser.smoothingTimeConstant = 0.45;
            analyserRef.current = analyser;

            const source = ctx.createMediaStreamSource(activeStreamToAnalyze);
            sourcesRef.current = [source];
            source.connect(analyser);

            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            const renderMeter = () => {
                if (!analyserRef.current) return;
                analyserRef.current.getByteFrequencyData(dataArray);

                const bands = [
                    dataArray[1] || 0,
                    dataArray[3] || 0,
                    dataArray[6] || 0,
                    dataArray[10] || 0,
                    dataArray[15] || 0
                ];

                const maxHeight = 20; // px
                bands.forEach((val, idx) => {
                    const el = bars[idx];
                    if (el) {
                        const normalized = val < 10 ? 0 : (val - 10) / 245;
                        const h = Math.max(3, Math.round(3 + normalized * (maxHeight - 3)));
                        el.style.height = `${h}px`;

                        if (val > 150) {
                            el.style.background = 'linear-gradient(180deg, #F59E0B, #10B981)';
                        } else {
                            el.style.background = 'linear-gradient(180deg, #10B981, #06B6D4)';
                        }
                    }
                });

                animFrameRef.current = requestAnimationFrame(renderMeter);
            };

            animFrameRef.current = requestAnimationFrame(renderMeter);

            return () => {
                if (animFrameRef.current) {
                    cancelAnimationFrame(animFrameRef.current);
                    animFrameRef.current = null;
                }
                sourcesRef.current.forEach(s => {
                    try { s.disconnect(); } catch { }
                });
                sourcesRef.current = [];
                analyserRef.current = null;
                resetBars();
            };
        } catch (err) {
            console.warn('[MasterAudioDock] Web Audio visualizer setup:', err);
        }
    }, [activeStreamToAnalyze, isGlobalMuted]);

    // Cleanup audio context on unmount
    useEffect(() => {
        return () => {
            if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
                try { audioCtxRef.current.close(); } catch { }
            }
        };
    }, []);

    const listeningCount = activeAudioStationIds.length;
    if (listeningCount === 0) {
        return null;
    }

    return (
        <aside className="master-audio-dock" aria-label="Master Audio Intercom Sink" role="region">
            <div className="dock-left-meta">
                <span className={`intercom-pulse-dot ${isGlobalMuted ? 'muted' : 'live'}`} />
                <span className="intercom-badge">
                    {listeningCount > 1 ? `🎧 MULTI-INTERCOM (${listeningCount})` : '🎧 LIVE INTERCOM'}
                </span>

                <div className="dock-station-chips-list">
                    {activeAudioStationIds.map(stId => {
                        const station = stations.find(s => (s.hostname || s.Hostname) === stId) || {
                            hostname: stId,
                            roleAlias: null
                        };
                        const hostName = station.hostname || station.Hostname || stId;
                        const stationLabel = station.roleAlias || station.RoleAlias || hostName;

                        return (
                            <div key={stId} className="station-audio-chip" title={`Station: ${hostName}`}>
                                <span className="chip-label">{stationLabel}</span>
                                {listeningCount > 1 && (
                                    <button
                                        type="button"
                                        className="chip-remove-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            muteStation?.(stId);
                                        }}
                                        title={`Mute ${stationLabel}`}
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Tactical Spectral VU Meter (Real-time Web Audio Analyser) */}
            <div className={`dock-spectral-vu ${isGlobalMuted ? 'silent' : 'active'}`} title="Real-time Web Audio Spectrum Waveform">
                <span ref={bar1Ref} className="vu-bar bar-1" />
                <span ref={bar2Ref} className="vu-bar bar-2" />
                <span ref={bar3Ref} className="vu-bar bar-3" />
                <span ref={bar4Ref} className="vu-bar bar-4" />
                <span ref={bar5Ref} className="vu-bar bar-5" />
            </div>

            {/* Volume Control Slider */}
            <div className="dock-volume-controls">
                <button
                    type="button"
                    className={`btn-mute-toggle ${isGlobalMuted ? 'is-muted' : ''}`}
                    onClick={toggleGlobalMute}
                    title="Toggle Mute (Hotkey: M)"
                >
                    {isGlobalMuted ? '🔇 MUTED' : '🔊 LIVE'}
                    <span className="hotkey-pill">M</span>
                </button>

                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isGlobalMuted ? 0 : audioVolume}
                    disabled={isGlobalMuted}
                    onChange={(e) => setAudioVolume(parseFloat(e.target.value))}
                    className="volume-slider-tactical"
                    title={`Volume: ${Math.round(audioVolume * 100)}%`}
                />
                <span className="volume-pct">
                    {isGlobalMuted ? '0%' : `${Math.round(audioVolume * 100)}%`}
                </span>
            </div>

            {/* Disconnect/Stop Button */}
            <button
                type="button"
                className="btn-dock-close"
                onClick={stopAudioSolo}
                title="Stop Audio Listening (Mute All Sinks)"
            >
                ✕
            </button>
        </aside>
    );
}
