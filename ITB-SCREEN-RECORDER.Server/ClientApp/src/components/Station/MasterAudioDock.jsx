import React, { useEffect, useRef } from 'react';
import { useAudioSolo } from '../../context/AudioSoloContext';
import './MasterAudioDock.scss';

export default function MasterAudioDock({ stations = [] }) {
    const {
        activeAudioStationId,
        audioVolume,
        isGlobalMuted,
        activeAudioStream,
        setAudioVolume,
        toggleGlobalMute,
        stopAudioSolo
    } = useAudioSolo();

    const bar1Ref = useRef(null);
    const bar2Ref = useRef(null);
    const bar3Ref = useRef(null);
    const bar4Ref = useRef(null);
    const bar5Ref = useRef(null);

    const audioCtxRef = useRef(null);
    const analyserRef = useRef(null);
    const sourceRef = useRef(null);
    const animFrameRef = useRef(null);

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

        if (!activeAudioStream || isGlobalMuted) {
            resetBars();
            return;
        }

        const audioTracks = activeAudioStream.getAudioTracks();
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
            analyser.smoothingTimeConstant = 0.45; // Responsive to voice and speech dynamics
            analyserRef.current = analyser;

            const source = ctx.createMediaStreamSource(activeAudioStream);
            sourceRef.current = source;
            source.connect(analyser);

            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            const renderMeter = () => {
                if (!analyserRef.current) return;
                analyserRef.current.getByteFrequencyData(dataArray);

                // Sample 5 frequency bands:
                // Bin 1: Sub/Bass (~100-300Hz)
                // Bin 3: Human voice fundamental (~300-800Hz)
                // Bin 6: Speech vowel & formant clarity (~1-2kHz)
                // Bin 10: Speech presence & sibilance (~2.5-4kHz)
                // Bin 15: Highs (~5-8kHz)
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
                        // Noise threshold: ignore ambient noise below 10
                        const normalized = val < 10 ? 0 : (val - 10) / 245;
                        const h = Math.max(3, Math.round(3 + normalized * (maxHeight - 3)));
                        el.style.height = `${h}px`;

                        // Peak indicator for active speech
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
                if (sourceRef.current) {
                    try { sourceRef.current.disconnect(); } catch { }
                    sourceRef.current = null;
                }
                analyserRef.current = null;
                resetBars();
            };
        } catch (err) {
            console.warn('[MasterAudioDock] Web Audio visualizer setup:', err);
        }
    }, [activeAudioStream, isGlobalMuted]);

    // Cleanup audio context on unmount
    useEffect(() => {
        return () => {
            if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
                try { audioCtxRef.current.close(); } catch { }
            }
        };
    }, []);

    if (!activeAudioStationId) {
        return null;
    }

    const activeStation = stations.find(s => (s.hostname || s.Hostname) === activeAudioStationId) || {
        hostname: activeAudioStationId,
        roleAlias: null
    };

    const hostName = activeStation.hostname || activeStation.Hostname || activeAudioStationId;
    const stationLabel = activeStation.roleAlias || activeStation.RoleAlias || hostName;

    return (
        <aside className="master-audio-dock" aria-label="Master Audio Intercom Sink" role="region">
            <div className="dock-left-meta">
                <span className={`intercom-pulse-dot ${isGlobalMuted ? 'muted' : 'live'}`} />
                <span className="intercom-badge">🎧 LIVE INTERCOM</span>
                <span className="station-name-pill" title={hostName}>
                    {stationLabel}
                </span>
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
                title="Stop Audio Listening (Mute Sink)"
            >
                ✕
            </button>
        </aside>
    );
}
