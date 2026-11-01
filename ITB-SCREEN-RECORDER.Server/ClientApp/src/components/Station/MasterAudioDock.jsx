import React, { useEffect, useRef } from 'react';
import { useAudioSolo } from '../../context/AudioSoloContext';
import './MasterAudioDock.scss';

export default function MasterAudioDock({ stations = [] }) {
    const {
        activeAudioStationIds = [],
        audioVolume,
        isGlobalMuted,
        audioChannelMode = 'both',
        setAudioChannelMode,
        activeAudioStream,
        activeAudioStreams = [],
        setAudioVolume,
        toggleGlobalMute,
        stopAudioSolo,
        muteStation
    } = useAudioSolo();

    // Dual VU meters: System (Channel 0) and Mic (Channel 1)
    const sysBar1Ref = useRef(null);
    const sysBar2Ref = useRef(null);
    const sysBar3Ref = useRef(null);

    const micBar1Ref = useRef(null);
    const micBar2Ref = useRef(null);
    const micBar3Ref = useRef(null);

    const audioCtxRef = useRef(null);
    const sourcesRef = useRef([]);
    const masterGainRef = useRef(null);
    const matrixGainsRef = useRef({});
    const animFrameRef = useRef(null);

    const activeStreamToAnalyze = activeAudioStream || (activeAudioStreams && activeAudioStreams[0]) || null;

    useEffect(() => {
        const sysBars = [sysBar1Ref.current, sysBar2Ref.current, sysBar3Ref.current];
        const micBars = [micBar1Ref.current, micBar2Ref.current, micBar3Ref.current];

        const resetBars = () => {
            [...sysBars, ...micBars].forEach(b => {
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
            // Channel Splitter: separates discrete Channel 0 (System Loopback) and Channel 1 (Microphone)
            const splitter = ctx.createChannelSplitter(2);
            const merger = ctx.createChannelMerger(2);

            const analyserSys = ctx.createAnalyser();
            analyserSys.fftSize = 32;
            analyserSys.smoothingTimeConstant = 0.4;

            const analyserMic = ctx.createAnalyser();
            analyserMic.fftSize = 32;
            analyserMic.smoothingTimeConstant = 0.4;

            splitter.connect(analyserSys, 0); // Channel 0: System
            splitter.connect(analyserMic, 1); // Channel 1: Mic

            // Matrix mixer routing nodes
            const gainSysL = ctx.createGain();
            const gainSysR = ctx.createGain();
            const gainMicL = ctx.createGain();
            const gainMicR = ctx.createGain();

            splitter.connect(gainSysL, 0);
            splitter.connect(gainSysR, 0);
            splitter.connect(gainMicL, 1);
            splitter.connect(gainMicR, 1);

            gainSysL.connect(merger, 0, 0);
            gainSysR.connect(merger, 0, 1);
            gainMicL.connect(merger, 0, 0);
            gainMicR.connect(merger, 0, 1);

            // Configure Matrix gains based on active audioChannelMode
            // 'both' (default balanced): System and Mic downmixed to both ears equally
            // 'mic': Only microphone in both ears
            // 'sys': Only system loopback in both ears
            // 'stereo': System in Left ear, Mic in Right ear
            if (audioChannelMode === 'mic') {
                gainSysL.gain.value = 0.0;
                gainSysR.gain.value = 0.0;
                gainMicL.gain.value = 1.0;
                gainMicR.gain.value = 1.0;
            } else if (audioChannelMode === 'sys') {
                gainSysL.gain.value = 1.0;
                gainSysR.gain.value = 1.0;
                gainMicL.gain.value = 0.0;
                gainMicR.gain.value = 0.0;
            } else if (audioChannelMode === 'stereo') {
                gainSysL.gain.value = 1.0;
                gainSysR.gain.value = 0.0;
                gainMicL.gain.value = 0.0;
                gainMicR.gain.value = 1.0;
            } else {
                // 'both' (balanced downmix)
                gainSysL.gain.value = 0.5;
                gainSysR.gain.value = 0.5;
                gainMicL.gain.value = 0.5;
                gainMicR.gain.value = 0.5;
            }

            matrixGainsRef.current = { gainSysL, gainSysR, gainMicL, gainMicR };

            const masterGain = ctx.createGain();
            masterGain.gain.setValueAtTime(isGlobalMuted ? 0 : audioVolume, ctx.currentTime);
            masterGainRef.current = masterGain;

            merger.connect(masterGain);
            masterGain.connect(ctx.destination);

            const source = ctx.createMediaStreamSource(activeStreamToAnalyze);
            sourcesRef.current = [source];
            source.connect(splitter);

            const sysBuffer = new Uint8Array(analyserSys.frequencyBinCount);
            const micBuffer = new Uint8Array(analyserMic.frequencyBinCount);

            const renderMeter = () => {
                analyserSys.getByteFrequencyData(sysBuffer);
                analyserMic.getByteFrequencyData(micBuffer);

                const updateBars = (bars, buf) => {
                    const maxHeight = 18;
                    bars.forEach((el, idx) => {
                        if (!el) return;
                        const val = buf[idx * 2 + 1] || 0;
                        const normalized = val < 10 ? 0 : (val - 10) / 245;
                        const h = Math.max(3, Math.round(3 + normalized * (maxHeight - 3)));
                        el.style.height = `${h}px`;
                        el.style.background = val > 160
                            ? 'linear-gradient(180deg, #F59E0B, #10B981)'
                            : 'linear-gradient(180deg, #10B981, #06B6D4)';
                    });
                };

                updateBars(sysBars, sysBuffer);
                updateBars(micBars, micBuffer);

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
                try {
                    splitter.disconnect();
                    merger.disconnect();
                    masterGain.disconnect();
                } catch { }
                resetBars();
            };
        } catch (err) {
            console.warn('[MasterAudioDock] Web Audio visualizer setup:', err);
        }
    }, [activeStreamToAnalyze, isGlobalMuted, audioVolume, audioChannelMode]);

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
                    {listeningCount > 1 ? `🎧 MULTI (${listeningCount})` : '🎧 LIVE'}
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

            {/* Tactical Dual VU Meter: Discrete System (Ch0) and Microphone (Ch1) */}
            <div className="dock-dual-vu-container">
                <div className={`dock-spectral-vu sys-vu ${isGlobalMuted ? 'silent' : 'active'}`} title="System Audio (Ch 0)">
                    <span className="vu-label">SYS</span>
                    <span ref={sysBar1Ref} className="vu-bar bar-1" />
                    <span ref={sysBar2Ref} className="vu-bar bar-2" />
                    <span ref={sysBar3Ref} className="vu-bar bar-3" />
                </div>
                <div className={`dock-spectral-vu mic-vu ${isGlobalMuted ? 'silent' : 'active'}`} title="Microphone (Ch 1)">
                    <span className="vu-label">MIC</span>
                    <span ref={micBar1Ref} className="vu-bar bar-1" />
                    <span ref={micBar2Ref} className="vu-bar bar-2" />
                    <span ref={micBar3Ref} className="vu-bar bar-3" />
                </div>
            </div>

            {/* Discrete Channel Mode Selector */}
            <div className="dock-channel-mode-selector">
                <button
                    type="button"
                    className={`btn-channel-mode ${audioChannelMode === 'both' ? 'active' : ''}`}
                    onClick={() => setAudioChannelMode?.('both')}
                    title="Balanced: Mix System and Microphone to both ears equally"
                >
                    🎧 BOTH
                </button>
                <button
                    type="button"
                    className={`btn-channel-mode ${audioChannelMode === 'mic' ? 'active' : ''}`}
                    onClick={() => setAudioChannelMode?.('mic')}
                    title="Mic Only: Listen only to local operator microphone (eliminates echo)"
                >
                    🎤 MIC
                </button>
                <button
                    type="button"
                    className={`btn-channel-mode ${audioChannelMode === 'sys' ? 'active' : ''}`}
                    onClick={() => setAudioChannelMode?.('sys')}
                    title="System Only: Listen only to computer sound / incoming calls"
                >
                    🔊 SYS
                </button>
                <button
                    type="button"
                    className={`btn-channel-mode ${audioChannelMode === 'stereo' ? 'active' : ''}`}
                    onClick={() => setAudioChannelMode?.('stereo')}
                    title="Stereo Split: System in Left ear, Mic in Right ear"
                >
                    ⮂ STEREO
                </button>
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
