import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import './StationThumbnail.scss';
import VirtualTopologyCanvas from './VirtualTopologyCanvas';
import StationDisplayBar from './StationDisplayBar';
import LiveKeystrokeOverlay from '../Keystroke/LiveKeystrokeOverlay';
import { useAuth } from '../../context/AuthContext';
import { useAudioSolo } from '../../context/AudioSoloContext';

export default function StationThumbnail(props) {
    const {
        hostname = 'UNKNOWN',
        isOnline = false,
        isStreaming = false,
        ipAddress = 'N/A',
        droppedFrames = 0,
        hostCpuPct = 0,
        gpuNvencPct = 0,
        hasActiveSpeakers = false,
        hasActiveMicrophone = false,
        isAudioStreaming = false,
        hasAudio = false,
        targetFps,
        videoBitrate,
        isCustomOverride = false,
        isPending = false,
        onToggleStream,
        onSelectStation,
        onOpenFullscreen,
        onQuickExport
    } = props;

    const [recordingSeconds, setRecordingSeconds] = useState(0);
    const [activeDisplayId, setActiveDisplayId] = useState('canvas');

    const { hasPermission } = useAuth();
    const { activeAudioStationIds, isListeningStation, audioVolume, isGlobalMuted, toggleAudioSolo, registerStationStream } = useAudioSolo();
    const isListeningThisStation = isListeningStation ? isListeningStation(hostname) : ((activeAudioStationIds || []).includes(hostname) && !isGlobalMuted);
    const canControl = hasPermission('stations.control');
    const canExport = hasPermission('playback.export');

    const isRecording = props.isRecording !== undefined
        ? Boolean(props.isRecording)
        : (props.status === 'Recording' || (Boolean(isStreaming) && props.status !== 'Monitoring'));
    const isStarting = isPending === 'starting' || (Boolean(isPending) && !isRecording);
    const isStopping = isPending === 'stopping' || (Boolean(isPending) && isRecording);
    // Workstations stream continuous live RTMP/WebRTC regardless of recording state.
    // Keep isLive true during record toggles so the stream is never unmounted or reloaded.
    const isLive = Boolean(isOnline && (isStreaming || isRecording));
    const hasCriticalError = isOnline && (droppedFrames > 5);

    const audioHasPlayback = Boolean(hasActiveSpeakers);
    const audioHasMic = Boolean(hasActiveMicrophone);
    const hasExpectedAudio = Boolean(hasActiveSpeakers || hasActiveMicrophone || hasAudio);
    const isDirectAudioFlowing = Boolean(isAudioStreaming);

    const [audioStatus, setAudioStatus] = useState(() => {
        if (!isOnline) return 'muted';
        if (isDirectAudioFlowing) return 'active';
        if (hasExpectedAudio) return 'fault';
        return 'muted';
    });

    const audioDebounceRef = useRef(null);

    useEffect(() => {
        if (!isOnline) {
            setAudioStatus('muted');
            return;
        }

        if (isDirectAudioFlowing) {
            if (audioDebounceRef.current) {
                clearTimeout(audioDebounceRef.current);
                audioDebounceRef.current = null;
            }
            setAudioStatus('active');
        } else if (hasExpectedAudio) {
            if (!audioDebounceRef.current) {
                audioDebounceRef.current = setTimeout(() => {
                    setAudioStatus('fault');
                    audioDebounceRef.current = null;
                }, 3500);
            }
        } else {
            if (audioDebounceRef.current) {
                clearTimeout(audioDebounceRef.current);
                audioDebounceRef.current = null;
            }
            setAudioStatus('muted');
        }

        return () => {
            if (audioDebounceRef.current) {
                clearTimeout(audioDebounceRef.current);
            }
        };
    }, [isOnline, isDirectAudioFlowing, hasExpectedAudio]);

    const isAudioLive = audioStatus === 'active';

    const hasCustomPolicy = Boolean(
        isCustomOverride ||
        props.hasCustomPolicy ||
        props.isOverridden ||
        (targetFps && targetFps !== 20 && targetFps !== 30) ||
        (videoBitrate && videoBitrate !== '2500k' && videoBitrate !== '3M')
    );

    useEffect(() => {
        if (!isLive || !isRecording) {
            setRecordingSeconds(0);
            return;
        }
        const timer = setInterval(() => setRecordingSeconds(p => p + 1), 1000);
        return () => {
            clearInterval(timer);
            setRecordingSeconds(0);
        };
    }, [isLive, isRecording]);

    const displays = useMemo(() => {
        const raw = props.displays || props.Displays || props.displayTopology?.displays || props.DisplayTopology?.Displays;
        if (raw && raw.length > 0) {
            return raw.map(d => ({
                DisplayId: d.DisplayId || d.displayId || 'mon-0',
                DisplayName: d.DisplayName || d.displayName || 'Display',
                IsPrimary: Boolean(d.IsPrimary ?? d.isPrimary),
                X: d.X ?? d.x ?? 0,
                Y: d.Y ?? d.y ?? 0,
                Width: d.Width || d.width || 1920,
                Height: d.Height || d.height || 1080
            }));
        }
        return [];
    }, [props.displays, props.Displays, props.displayTopology, props.DisplayTopology]);

    const formatTimer = (sec) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    };

    const triggerFullscreenModal = (e) => {
        e?.stopPropagation?.();
        if (!isLive) return;
        onOpenFullscreen?.({ ...props, initialDisplayId: activeDisplayId });
    };

    const handleViewportClick = (e) => {
        e.stopPropagation();
        if (isLive) {
            triggerFullscreenModal(e);
        } else {
            onSelectStation?.(props);
        }
    };

    const handleQuickToggleRec = (e) => {
        e.stopPropagation();
        if (!canControl || !isOnline || isPending) return;
        onToggleStream?.(hostname, isRecording);
    };

    const computeHealthScore = () => {
        if (!isOnline) return 0;
        let score = 100;
        if (droppedFrames > 0) score -= Math.min(40, droppedFrames * 5);
        if (hostCpuPct > 85) score -= 25;
        if (gpuNvencPct > 90) score -= 20;
        return Math.max(10, score);
    };

    const health = computeHealthScore();

    const getAudioBadgeText = () => {
        if (!isOnline) return 'OFF';
        if (audioHasPlayback && audioHasMic) return 'SPK + MIC';
        if (audioHasPlayback) return 'SPK ONLY';
        if (audioHasMic) return 'MIC ONLY';
        return isAudioLive ? 'AUDIO ON' : 'MUTED';
    };

    const isAlertActive = isLive && !isRecording && !props.isSnoozed;
    const isAlertSnoozed = isLive && !isRecording && Boolean(props.isSnoozed);

    const handleStreamAvailable = useCallback((stream) => {
        registerStationStream(hostname, stream);
    }, [hostname, registerStationStream]);

    const handleSelectDisplay = useCallback((dispId) => {
        setActiveDisplayId(dispId);
    }, []);

    const operationalTitle = props.roleAlias || props.displayName || props.RoleAlias || hostname;
    const hasAlias = Boolean(props.roleAlias || (props.displayName && props.displayName.toLowerCase() !== hostname.toLowerCase()));

    return (
        <div
            className={`station-tactical-card ${!isOnline ? 'is-offline' : ''} ${isLive && !isRecording ? 'is-not-recording' : ''} ${isAlertActive ? 'alert-active' : ''} ${isAlertSnoozed ? 'alert-snoozed' : ''} ${hasCriticalError ? 'has-critical' : ''}`}
            onClick={() => onSelectStation?.(props)}
            title="Click card to open Station Inspector"
        >
            <div className="card-minimal-header">
                <div className="station-brand" title={`${operationalTitle}${hasAlias ? ` (${hostname})` : ''} � ${ipAddress}`}>
                    <div className="station-title-row">
                        <span className="station-name">{operationalTitle}</span>
                        {hasAlias && (
                            <span className="station-host-badge" title={`Physical Machine: ${hostname}`}>
                                {hostname}
                            </span>
                        )}
                    </div>
                    <span className="station-ip">{ipAddress}</span>
                </div>

                <div className="station-header-right">
                    <button
                        type="button"
                        className={`tactical-audio-listen-btn ${isListeningThisStation ? 'listening' : ''}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleAudioSolo(hostname);
                        }}
                        title={isListeningThisStation ? "Mute audio intercom for this station" : "Listen to audio feed (Multi-sink)"}
                    >
                        <span className="audio-icon">{isListeningThisStation ? '🔊' : '🎧'}</span>
                        <span>{isListeningThisStation ? 'LISTENING' : 'LISTEN'}</span>
                    </button>

                    {isLive && !isRecording && (
                        <button
                            type="button"
                            className={`tactical-snooze-btn ${isAlertSnoozed ? 'is-snoozed' : ''}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                props.onOpenSnoozeModal?.(hostname);
                            }}
                            title={isAlertSnoozed ? `Postponed for ${props.snoozeRemainingMinutes || 0}m. Click to adjust or cancel.` : "Postpone recording alert (Snooze)"}
                        >
                            <span>?</span>
                            <span>{isAlertSnoozed ? `SNOOZED (${props.snoozeRemainingMinutes || 0}m)` : 'SNOOZE'}</span>
                        </button>
                    )}

                    <button
                        type="button"
                        className={`one-click-rec-btn ${!isOnline ? 'is-offline' : isRecording && !isStopping ? 'is-rec' : 'is-monitor'} ${isPending ? 'is-pending' : ''} ${!canControl ? 'no-perm' : ''}`}
                        onClick={handleQuickToggleRec}
                        disabled={!isOnline || Boolean(isPending) || !canControl}
                        title={!canControl ? "Access restricted (requires stations.control)" : (isRecording ? "Stop Recording (Remain in Live Monitor)" : "Start Recording")}
                    >
                        <span className="rec-indicator-dot" />
                        <div className="rec-text-wrapper">
                            <span className="rec-state">
                                {!canControl ? 'LOCKED' : !isOnline ? 'OFFLINE' : isStarting ? 'STARTING...' : isStopping ? 'STOPPING...' : isRecording ? 'REC' : 'MONITOR'}
                            </span>
                            {isRecording && <span className="rec-time">{formatTimer(recordingSeconds)}</span>}
                        </div>
                    </button>

                    <button
                        type="button"
                        className={`header-action-icon-btn fullscreen-btn ${!isLive ? 'disabled' : ''}`}
                        onClick={triggerFullscreenModal}
                        disabled={!isLive}
                        title={isLive ? "Open Fullscreen Theater Mode" : "Fullscreen unavailable (Standby / Offline)"}
                        aria-label="Toggle Fullscreen"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                        </svg>
                    </button>

                    <button
                        type="button"
                        className="header-action-icon-btn inspect-drawer-trigger"
                        onClick={(e) => {
                            e.stopPropagation();
                            onSelectStation?.(props);
                        }}
                        title="Open Station Inspector: Telemetry & Tuning"
                        aria-label="Open Station Inspector"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="4" y1="21" x2="4" y2="14" />
                            <line x1="4" y1="10" x2="4" y2="3" />
                            <line x1="12" y1="21" x2="12" y2="12" />
                            <line x1="12" y1="8" x2="12" y2="3" />
                            <line x1="20" y1="21" x2="20" y2="16" />
                            <line x1="20" y1="12" x2="20" y2="3" />
                        </svg>
                    </button>
                </div>
            </div>

            <div
                className="card-screen-viewport"
                onClick={handleViewportClick}
                title={isLive ? "Click video to open Fullscreen Theater" : "Click screen to open Station Inspector"}
            >
                {isLive ? (
                    <div className={`webrtc-container ${!isRecording ? 'is-not-recording' : ''}`} style={{ pointerEvents: 'none' }}>
                        <VirtualTopologyCanvas
                            station={props}
                            activeDisplayId={activeDisplayId}
                            onSelectDisplay={handleSelectDisplay}
                            isMuted={!isListeningThisStation}
                            volume={audioVolume}
                            webrtcBaseUrl={props.webrtcBaseUrl || '/api/v1/whep'}
                            onStreamAvailable={handleStreamAvailable}
                        />
                        <div className={`monitor-only-overlay ${isRecording ? 'hidden' : 'visible'}`}>
                            <button
                                type="button"
                                className={`monitor-tag ${isAlertActive ? 'alert' : 'snoozed'}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    props.onOpenSnoozeModal?.(hostname);
                                }}
                                title={isAlertSnoozed ? `Alert postponed for ${props.snoozeRemainingMinutes || 0}m. Click to adjust.` : "Station is in Monitor-Only mode. Click to postpone alert."}
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="11" height="11">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                                <span>{isAlertActive ? '?? MONITOR ONLY' : `? SNOOZED (${props.snoozeRemainingMinutes || 0}m)`}</span>
                            </button>
                        </div>
                    </div>
                ) : (isStarting || isStopping) ? (
                    <div className="stream-loading-matte">
                        <div className="tactical-stream-spinner" />
                        <span className="loading-label">{isStarting ? 'STARTING RECORDING...' : 'STOPPING RECORDING...'}</span>
                        <span className="loading-sub">{isStarting ? 'CONNECTING MEDIA PIPELINE' : 'FLUSHING RECORDING BUFFER'}</span>
                    </div>
                ) : (
                    <div className="offline-screen-matte">
                        <span>{isOnline ? 'STANDBY' : 'OFFLINE'}</span>
                    </div>
                )}

                {displays.length > 1 && (
                    <StationDisplayBar
                        displays={displays}
                        activeDisplayId={activeDisplayId}
                        onSelectDisplay={(dispId) => setActiveDisplayId(dispId)}
                    />
                )}

                {Boolean(isStreaming || isLive || props.recentKeystrokes?.length || props.keystrokes?.length || props.Keystrokes?.length) && (
                    <LiveKeystrokeOverlay
                        keystrokes={props.recentKeystrokes || props.keystrokes || props.Keystrokes}
                        isLive={true}
                        variant="viewport"
                        mode={props.keystrokeMode || 'burn-in'}
                    />
                )}

                <div
                    className={`tactical-audio-indicator ${isAudioLive ? 'active' : 'muted'}`}
                    title={`Audio Status: ${getAudioBadgeText()}`}
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" width="12" height="12">
                        {isAudioLive ? (
                            <>
                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                            </>
                        ) : (
                            <>
                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                <line x1="23" y1="9" x2="17" y2="15" />
                                <line x1="17" y1="9" x2="23" y2="15" />
                            </>
                        )}
                    </svg>
                    <span>{getAudioBadgeText()}</span>
                </div>

                {hasCustomPolicy && (
                    <div
                        className="tactical-override-tag"
                        title={`Custom Policy: ${targetFps ? `${targetFps} FPS` : ''} ${videoBitrate ? `| ${videoBitrate}` : ''}`}
                    >
                        <span>MOD // {targetFps ? `${targetFps}F` : ''}{targetFps && videoBitrate ? ' � ' : ''}{videoBitrate || ''}</span>
                    </div>
                )}

                <div className="hover-action-bar" onClick={(e) => e.stopPropagation()}>
                    <button
                        type="button"
                        className={`action-btn ${isRecording ? 'stop' : 'start'} ${!canControl || Boolean(isPending) ? 'disabled' : ''}`}
                        onClick={handleQuickToggleRec}
                        disabled={!canControl || Boolean(isPending)}
                        title={!canControl ? "Access restricted (stations.control)" : (isRecording ? "Stop Recording (Remain in Live Monitor)" : "Start Recording")}
                    >
                        {isPending ? '...' : isRecording ? 'STOP REC' : 'START REC'}
                    </button>
                    <button
                        type="button"
                        className={`action-btn ${!isLive ? 'disabled' : ''}`}
                        onClick={triggerFullscreenModal}
                        disabled={!isLive}
                        title={isLive ? "Fullscreen Theater Mode" : "Fullscreen unavailable"}
                    >
                        FULL
                    </button>
                    {canExport && (
                        <button
                            type="button"
                            className="action-btn"
                            onClick={() => onQuickExport?.(hostname)}
                            title="Export Clip"
                        >
                            EXP
                        </button>
                    )}
                </div>
            </div>

            <div className="card-minimal-footer">
                {droppedFrames > 0 && (
                    <div className={`dropped-frames-notice ${droppedFrames > 5 ? 'critical' : 'warning'}`}>
                        <span className="drop-indicator-dot" />
                        <span className="drop-label">{droppedFrames} DROPS</span>
                    </div>
                )}
                <div className="health-bar-track" title={`Station Health: ${health}%`}>
                    <div
                        className={`health-bar-fill ${health < 50 ? 'crit' : health < 80 ? 'warn' : 'good'}`}
                        style={{ width: `${health}%` }}
                    />
                </div>
            </div>
        </div>
    );
}