import { useEffect, useRef, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import VirtualTopologyCanvas from './VirtualTopologyCanvas';
import FullscreenMinimapNavigator from './FullscreenMinimapNavigator';
import CyberLoadingOverlay from '../UI/CyberLoadingOverlay';
import LiveKeystrokeOverlay from '../Keystroke/LiveKeystrokeOverlay';
import { useAudioSolo } from '../../context/AudioSoloContext';
import './FullscreenModal.scss';

export default function FullscreenModal(props) {
    const { registerStationStream } = useAudioSolo();
    const {
        hostname,
        actualFps = 0,
        targetFps = 30,
        droppedFrames = 0,
        hostCpuPct = 0,
        appCpuPct = 0,
        hostRamPct = 0,
        appRamMb = 0,
        gpuNvencPct = 0,
        gpu3dPct = 0,
        mediaTxMbps = 0,
        telemetryTxKbps = 0,
        streamingSinceUtc,
        isStreaming = false,
        onToggleStream,
        onOpenInspector,
        onClose
    } = props;

    const modalBoxRef = useRef(null);
    const sessionStartTimeRef = useRef(null);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [confirmStop, setConfirmStop] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const [activeDisplayId, setActiveDisplayId] = useState(props.initialDisplayId || 'canvas');

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

    // Dynamic aspect ratio that adapts to the station's stream geometry (default 16:9)
    const [aspectRatio, setAspectRatio] = useState(16 / 9);

    // Detect actual video dimensions and adjust modal frame to eliminate black letterbox bars
    useEffect(() => {
        const checkVideoDimensions = () => {
            if (!modalBoxRef.current) return;
            const videoEl = modalBoxRef.current.querySelector('video');
            if (videoEl && videoEl.videoWidth > 0 && videoEl.videoHeight > 0) {
                setIsVideoPlaying(true);
                const streamRatio = videoEl.videoWidth / videoEl.videoHeight;
                if (Math.abs(streamRatio - aspectRatio) > 0.01) {
                    setAspectRatio(streamRatio);
                }
            }
        };

        const interval = setInterval(checkVideoDimensions, 300);
        return () => clearInterval(interval);
    }, [aspectRatio]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose?.();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    useEffect(() => {
        if (!confirmStop) return;
        const timer = setTimeout(() => setConfirmStop(false), 4000);
        return () => clearTimeout(timer);
    }, [confirmStop]);

    const isRecording = props.isRecording !== undefined
        ? Boolean(props.isRecording)
        : (props.status === 'Recording' || (Boolean(isStreaming) && props.status !== 'Monitoring'));

    // Active recording timer - updates only when station is actively recording
    useEffect(() => {
        if (!isRecording) {
            sessionStartTimeRef.current = null;
            setElapsedSeconds(0);
            return;
        }

        const rawStart = props.recordingStartedAtUtc || props.recordingStartTime || streamingSinceUtc || props.startedAt || props.streamingStartedAt;
        const parsedStart = rawStart ? new Date(rawStart).getTime() : null;
        const hasValidDate = parsedStart && !isNaN(parsedStart) && parsedStart > 0;

        if (!hasValidDate && !sessionStartTimeRef.current) {
            sessionStartTimeRef.current = Date.now();
        }

        const updateClock = () => {
            const startTimestamp = hasValidDate ? parsedStart : sessionStartTimeRef.current;
            const diff = Math.max(0, Math.floor((Date.now() - startTimestamp) / 1000));
            setElapsedSeconds(diff);
        };

        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, [isRecording, props.recordingStartedAtUtc, props.recordingStartTime, streamingSinceUtc, props.startedAt, props.streamingStartedAt]);

    const displayElapsedSeconds = isRecording ? elapsedSeconds : 0;

    const formatElapsedTime = (totalSec) => {
        const days = Math.floor(totalSec / 86400);
        let rem = totalSec % 86400;
        const hours = Math.floor(rem / 3600);
        rem %= 3600;
        const minutes = Math.floor(rem / 60);
        const seconds = rem % 60;

        const pad = (n) => String(n).padStart(2, '0');
        if (days > 0) return `${days}d ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    };

    const handleBackdropClick = (e) => {
        if (modalBoxRef.current && !modalBoxRef.current.contains(e.target)) {
            onClose?.();
        }
    };

    const hostCpu = Number(hostCpuPct || 0);
    const appCpu = Number(appCpuPct || 0);
    const hostRam = Number(hostRamPct || 0);
    const appRam = Number(appRamMb || 0);

    const formatRamSub = (mb) => {
        if (!mb) return '';
        if (mb >= 1024) return `(${(mb / 1024).toFixed(1)}G)`;
        return `(${Math.round(mb)}M)`;
    };

    const modalContent = (
        <div className="stream-modal-backdrop" onClick={handleBackdropClick}>
            <div
                ref={modalBoxRef}
                className="stream-modal-box"
                style={{ '--video-aspect': aspectRatio }}
            >
                <div className="stream-modal-header">
                    <div className="stream-modal-title">
                        <span className={`live-dot ${isRecording ? 'streaming' : 'monitor'}`}></span>
                        <h2>LIVE // {hostname}</h2>
                        {isRecording ? (
                            <span className="uptime-badge" title="Active recording duration">
                                {formatElapsedTime(displayElapsedSeconds)}
                            </span>
                        ) : (
                            <span className="monitor-only-pill" title="Station is streaming live in monitor-only mode, not recording to disk">
                                👁 MONITOR ONLY • NOT RECORDING
                            </span>
                        )}
                    </div>

                    <div className="modal-network-stats">
                        <span className="stat-pill" title={`Target: ${targetFps} FPS`}>
                            FPS <span className="val green">{actualFps}</span>
                        </span>

                        <span className="stat-pill">
                            DROP <span className={`val ${droppedFrames > 0 ? 'red' : 'gray'}`}>{droppedFrames}</span>
                        </span>

                        <span className="stat-pill" title={`Host CPU: ${hostCpu.toFixed(1)}% | App: ${appCpu.toFixed(1)}%`}>
                            CPU <span className="val yellow">{hostCpu.toFixed(1)}%</span>
                            {appCpu > 0 && <span className="val cyan">({appCpu.toFixed(1)}%)</span>}
                        </span>

                        <span className="stat-pill" title={`RAM Usage: ${hostRam.toFixed(1)}% | App: ${appRam}MB`}>
                            RAM <span className="val yellow">{hostRam.toFixed(1)}%</span>
                            {appRam > 0 && <span className="val cyan">{formatRamSub(appRam)}</span>}
                        </span>

                        <span className="stat-pill" title={`GPU 3D: ${Number(gpu3dPct).toFixed(0)}% | NVENC: ${Number(gpuNvencPct).toFixed(0)}%`}>
                            GPU <span className="val yellow">{Number(gpu3dPct).toFixed(0)}%</span>
                            <span className="val cyan">({Number(gpuNvencPct).toFixed(0)}%)</span>
                        </span>

                        <span className="stat-pill">
                            VBR <span className="val blue">{Number(mediaTxMbps).toFixed(2)}M</span>
                        </span>

                        <span className="stat-pill">
                            C2 <span className="val purple">{Number(telemetryTxKbps).toFixed(1)}k</span>
                        </span>
                    </div>

                    {displays.length > 1 && (
                        <div className="modal-display-switcher">
                            <button
                                type="button"
                                className={`modal-pill-btn ${activeDisplayId === 'canvas' ? 'is-active' : ''}`}
                                onClick={() => setActiveDisplayId('canvas')}
                                title="Virtual Desktop Canvas Layout"
                            >
                                ⊞ CANVAS
                            </button>
                            {displays.map((d, idx) => (
                                <button
                                    key={d.DisplayId}
                                    type="button"
                                    className={`modal-pill-btn ${activeDisplayId === d.DisplayId ? 'is-active' : ''}`}
                                    onClick={() => setActiveDisplayId(d.DisplayId)}
                                    title={`Monitor ${idx + 1} (${d.Width}x${d.Height})`}
                                >
                                    🖥 {idx + 1}
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="modal-actions-cluster">
                        {!isRecording ? (
                            <button
                                type="button"
                                className="act-pill-btn start-rec"
                                onClick={() => onToggleStream?.(hostname, false)}
                                title="Start Recording"
                            >
                                START REC
                            </button>
                        ) : !confirmStop ? (
                            <button
                                type="button"
                                className="act-pill-btn stop"
                                onClick={() => setConfirmStop(true)}
                                title="Stop Recording (Remain in Live Monitor)"
                            >
                                STOP REC
                            </button>
                        ) : (
                            <div className="safe-stop-confirm">
                                <span>STOP REC?</span>
                                <button
                                    type="button"
                                    className="confirm-btn yes"
                                    onClick={() => {
                                        onToggleStream?.(hostname, true);
                                        setConfirmStop(false);
                                    }}
                                >
                                    YES
                                </button>
                                <button
                                    type="button"
                                    className="confirm-btn no"
                                    onClick={() => setConfirmStop(false)}
                                >
                                    NO
                                </button>
                            </div>
                        )}

                        <button
                            type="button"
                            className="act-pill-btn inspect"
                            onClick={() => {
                                onClose?.();
                                onOpenInspector?.();
                            }}
                            title="Open Station Inspector Drawer"
                        >
                            INSPECT ↗
                        </button>
                    </div>

                    <button type="button" onClick={onClose} className="stream-modal-close-btn" title="Close Fullscreen (ESC)">
                        ✕
                    </button>
                </div>

                <div className={`stream-modal-body ${!isRecording ? 'is-not-recording' : ''}`}>
                    {!isVideoPlaying && (
                        <div style={{ position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none' }}>
                            <CyberLoadingOverlay
                                text="ESTABLISHING SECURE STREAM..."
                                size="large"
                            />
                        </div>
                    )}

                    <VirtualTopologyCanvas
                        station={{ ...props, hostname }}
                        activeDisplayId={activeDisplayId}
                        onSelectDisplay={(dispId) => setActiveDisplayId(dispId)}
                        isMuted={isMuted}
                        volume={1}
                        isInteractive={false}
                        onPlaying={() => setIsVideoPlaying(true)}
                        onStreamAvailable={(stream) => {
                            registerStationStream?.(hostname, stream);
                        }}
                    />

                    {!isRecording && (
                        <div className="fullscreen-monitor-watermark">
                            👁 MONITOR ONLY — NOT RECORDING
                        </div>
                    )}

                    {isStreaming && (
                        <LiveKeystrokeOverlay
                            keystrokes={props.recentKeystrokes || props.keystrokes}
                            isLive={isStreaming}
                            variant="fullscreen"
                            mode={props.keystrokeMode || 'burn-in'}
                        />
                    )}

                    {activeDisplayId !== 'canvas' && displays.length > 1 && (
                        <FullscreenMinimapNavigator
                            station={props}
                            activeDisplayId={activeDisplayId}
                            onSelectDisplay={(dispId) => setActiveDisplayId(dispId)}
                        />
                    )}

                    <div className="fullscreen-audio-corner">
                        <button
                            type="button"
                            className={`audio-floating-btn ${isMuted ? 'muted' : 'active'}`}
                            onClick={() => setIsMuted(p => !p)}
                            title={isMuted ? "Unmute Audio" : "Mute Audio"}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="13" height="13">
                                {isMuted ? (
                                    <>
                                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                        <line x1="23" y1="9" x2="17" y2="15" />
                                        <line x1="17" y1="9" x2="23" y2="15" />
                                    </>
                                ) : (
                                    <>
                                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                                    </>
                                )}
                            </svg>
                            <span>{isMuted ? 'MUTED' : 'LIVE AUDIO'}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}