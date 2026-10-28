import { useEffect, useRef, useState } from 'react';
import './VideoPlayer.scss';

export default function WebRTCPlayer({
    streamPath,
    webrtcBaseUrl = '/api/v1/whep',
    showControls = false,
    onPlaying,
    onStreamAvailable,
    isMuted: propIsMuted = true,
    volume: propVolume = 1
}) {
    const containerRef = useRef(null);
    const videoRef = useRef(null);
    const peerRef = useRef(null);

    const onPlayingRef = useRef(onPlaying);
    const onStreamAvailableRef = useRef(onStreamAvailable);
    useEffect(() => { onPlayingRef.current = onPlaying; }, [onPlaying]);
    useEffect(() => { onStreamAvailableRef.current = onStreamAvailable; }, [onStreamAvailable]);

    const [retryCount, setRetryCount] = useState(0);
    const retryCountRef = useRef(0);
    const maxRetries = 5;
    const retryTimeoutRef = useRef(null);

    const [isVisible, setIsVisible] = useState(false);
    const [hasError, setHasError] = useState(false);

    const [isHovered, setIsHovered] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(propIsMuted);
    const [volume, setVolume] = useState(propVolume);
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        if (typeof propIsMuted === 'boolean') {
            setIsMuted(propIsMuted);
            if (videoRef.current) videoRef.current.muted = propIsMuted;
        }
    }, [propIsMuted]);

    useEffect(() => {
        if (typeof propVolume === 'number') {
            setVolume(propVolume);
            if (videoRef.current) videoRef.current.volume = propVolume;
        }
    }, [propVolume]);

    useEffect(() => {
        const currentContainer = containerRef.current;

        const observer = new IntersectionObserver(
            (entries) => {
                setIsVisible(entries[0].isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (currentContainer) observer.observe(currentContainer);

        return () => {
            if (currentContainer) observer.unobserve(currentContainer);
        };
    }, []);

    useEffect(() => {
        const currentVideo = videoRef.current;

        const cleanupPeerConnection = () => {
            if (retryTimeoutRef.current) {
                clearTimeout(retryTimeoutRef.current);
                retryTimeoutRef.current = null;
            }
            if (peerRef.current) {
                const pc = peerRef.current;
                peerRef.current = null;
                try {
                    pc.ontrack = null;
                    pc.onconnectionstatechange = null;
                    pc.onicecandidate = null;
                    if (pc.getTransceivers) {
                        pc.getTransceivers().forEach(t => {
                            try { t.stop(); } catch { }
                        });
                    }
                    if (pc.signalingState !== 'closed') {
                        pc.close();
                    }
                } catch { }
            }
        };

        if (!isVisible) {
            cleanupPeerConnection();
            if (currentVideo) currentVideo.srcObject = null;
            return;
        }

        let isSubscribed = true;

        const connectToWHEP = async () => {
            if (!isSubscribed) return;
            if (!streamPath || streamPath.includes('undefined')) return;

            // Thoroughly close and de-allocate any previous peer connection
            cleanupPeerConnection();

            // Air-gapped intranet configuration: zero external STUN lookups
            let pc;
            try {
                pc = new RTCPeerConnection({
                    iceServers: []
                });
                peerRef.current = pc;
            } catch (err) {
                console.error("[WebRTC] Failed to construct RTCPeerConnection (resource limit reached):", err);
                setHasError(true);
                return; // Do NOT cascade into endless retry loop if browser peer limit is saturated
            }

            try {
                pc.addTransceiver('video', { direction: 'recvonly' });
                pc.addTransceiver('audio', { direction: 'recvonly' });
            } catch (err) {
                console.error("[WebRTC] Failed to add transceivers:", err);
                cleanupPeerConnection();
                setHasError(true);
                return;
            }

            pc.ontrack = (event) => {
                if (!isSubscribed) return;
                if (event.receiver) {
                    try {
                        if ('playoutDelayHint' in event.receiver) {
                            event.receiver.playoutDelayHint = 0;
                        }
                        if ('jitterBufferTarget' in event.receiver) {
                            event.receiver.jitterBufferTarget = 0;
                        }
                    } catch { }
                }
                if (currentVideo && event.streams && event.streams[0]) {
                    currentVideo.srcObject = event.streams[0];
                    currentVideo.play().catch(err => {
                        if (err.name !== 'AbortError') console.warn("[WebRTC] Play error:", err);
                    });
                    if (onStreamAvailableRef.current) {
                        try { onStreamAvailableRef.current(event.streams[0]); } catch { }
                    }
                    if (onPlayingRef.current) {
                        try { onPlayingRef.current(); } catch { }
                    }
                }
            };

            pc.onconnectionstatechange = () => {
                if (!isSubscribed) return;

                if (pc.connectionState === 'connected') {
                    retryCountRef.current = 0;
                    setRetryCount(0);
                    setHasError(false);
                } else if (pc.connectionState === 'failed' || pc.connectionState === 'disconnected') {
                    handleSmartRetry();
                }
            };

            try {
                const offer = await pc.createOffer();

                // 💡 SDP Bandwidth allocation for High-Definition Screen Streaming:
                // Instruct browser WebRTC BWE and MediaMTX to allocate high bandwidth (up to 12Mbps)
                // for crisp, sharp high-resolution screen rendering without downsampling or blur.
                let mungedSdp = offer.sdp || '';
                if (mungedSdp.includes('m=video')) {
                    mungedSdp = mungedSdp.replace(
                        /(m=video [^\r\n]+[\r\n]+)/,
                        '$1b=AS:12000\r\nb=TIAS:12000000\r\n'
                    );
                }

                await pc.setLocalDescription({
                    type: offer.type,
                    sdp: mungedSdp
                });

                const effectiveBase = webrtcBaseUrl.startsWith('http:')
                    ? (typeof window !== 'undefined' && window.location.protocol === 'https:' ? '/api/v1/whep' : webrtcBaseUrl)
                    : (webrtcBaseUrl || '/api/v1/whep');
                const cleanStreamPath = (streamPath || '').replace(/\/whep\/?$/i, '').replace(/^\/+/, '');
                const cleanBase = effectiveBase.replace(/\/+$/, '');
                const whepUrl = `${cleanBase}/${cleanStreamPath}/whep`;
                const response = await fetch(whepUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/sdp' },
                    body: pc.localDescription?.sdp || mungedSdp
                });

                if (!response.ok) throw new Error(`WHEP failed with status ${response.status}`);

                const answerSdp = await response.text();

                if (isSubscribed && pc.signalingState !== 'closed') {
                    await pc.setRemoteDescription(new RTCSessionDescription({
                        type: 'answer',
                        sdp: answerSdp
                    }));
                    setHasError(false);
                }
            } catch (err) {
                console.error(`[WebRTC] Connection attempt failed:`, err);
                cleanupPeerConnection();
                handleSmartRetry();
            }
        };

        let lastPlayheadTime = -1;
        let stallCount = 0;
        const stallCheckInterval = setInterval(() => {
            if (!isSubscribed || !videoRef.current) return;
            const cur = videoRef.current.currentTime;
            if (cur > 0 && !videoRef.current.paused && peerRef.current?.connectionState === 'connected') {
                if (cur === lastPlayheadTime) {
                    stallCount++;
                    if (stallCount >= 2) { // 2 intervals = 6-8 seconds without time progress
                        console.warn("[WebRTC] Playback stall detected (frozen frame). Initiating silent renegotiation...");
                        stallCount = 0;
                        handleSmartRetry();
                    }
                } else {
                    lastPlayheadTime = cur;
                    stallCount = 0;
                }
            }
        }, 3500);

        const handleSmartRetry = () => {
            if (!isSubscribed) return;

            cleanupPeerConnection();

            const nextAttempt = retryCountRef.current + 1;
            retryCountRef.current = nextAttempt;
            setRetryCount(nextAttempt);
            setHasError(true);

            // Resilient backoff: fast exponential retry for first 5 attempts, then steady 6s cadence indefinitely
            const delay = nextAttempt <= 5
                ? Math.min(1200 * Math.pow(1.5, nextAttempt - 1), 6000)
                : 6000;

            console.warn(`[WebRTC] Connection lost for '${streamPath}'. Reconnecting in ${Math.round(delay)}ms (Attempt ${nextAttempt})...`);

            if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
            retryTimeoutRef.current = setTimeout(() => {
                if (isSubscribed) connectToWHEP();
            }, delay);
        };

        connectToWHEP();

        return () => {
            isSubscribed = false;
            clearInterval(stallCheckInterval);
            cleanupPeerConnection();
            if (currentVideo) currentVideo.srcObject = null;
        };
    }, [isVisible, streamPath, webrtcBaseUrl]);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            const nextMuteState = !isMuted;
            videoRef.current.muted = nextMuteState;
            setIsMuted(nextMuteState);
            if (!nextMuteState && volume === 0) {
                setVolume(1);
                videoRef.current.volume = 1;
            }
        }
    };

    const handleVolumeChange = (e) => {
        const val = parseFloat(e.target.value);
        setVolume(val);
        if (videoRef.current) {
            videoRef.current.volume = val;
            videoRef.current.muted = val === 0;
            setIsMuted(val === 0);
        }
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen().catch(err => {
                console.error("Error attempting to enable fullscreen:", err);
            });
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    return (
        <div
            ref={containerRef}
            className="video-player-container"
            style={{ width: '100%', height: '100%', position: 'relative', backgroundColor: '#000' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {hasError && retryCount >= 1 && (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#f59e0b', zIndex: 10, background: 'rgba(0,0,0,0.65)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(15,23,42,0.9)', border: '1px solid rgba(245,158,11,0.3)', padding: '6px 14px', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.8rem', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
                        <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></span>
                        <span>{retryCount < 5 ? `RECONNECTING... (${retryCount})` : `RECONNECTING STREAM (ATTEMPT ${retryCount})...`}</span>
                    </div>
                </div>
            )}

            <video
                ref={videoRef}
                autoPlay
                muted={isMuted}
                playsInline
                onPlaying={() => {
                    setIsPlaying(true);
                    if (onPlaying) onPlaying();
                }}
                onLoadedData={() => {
                    if (onPlaying) onPlaying();
                }}
                onCanPlay={() => {
                    if (onPlaying) onPlaying();
                }}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    imageRendering: '-webkit-optimize-contrast',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden'
                }}
            />

            {showControls && (
                <div
                    className="yt-controls-bar"
                    style={{
                        position: 'absolute',
                        bottom: 0, left: 0, right: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0))',
                        borderTop: 'none',
                        opacity: isHovered || !isPlaying ? 1 : 0,
                        transition: 'opacity 0.3s ease-in-out',
                        zIndex: 20
                    }}
                >
                    <div className="yt-progress-container">
                        <div className="yt-progress-bg">
                            <div className="yt-progress-live"></div>
                        </div>
                    </div>

                    <div className="yt-controls-row">
                        <div className="yt-controls-left">
                            <button className="yt-btn" onClick={togglePlay} title={isPlaying ? "Pause" : "Play"}>
                                {isPlaying ? (
                                    <svg className="yt-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                                ) : (
                                    <svg className="yt-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                                )}
                            </button>

                            <div className="yt-volume-group">
                                <button className="yt-btn" onClick={toggleMute} title={isMuted ? "Unmute" : "Mute"}>
                                    {isMuted ? (
                                        <svg className="yt-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.87v2.06c2.89.86 5 3.54 5 6.81zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" /></svg>
                                    ) : (
                                        <svg className="yt-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" /></svg>
                                    )}
                                </button>
                                <input
                                    type="range"
                                    className="yt-volume-slider"
                                    min="0" max="1" step="0.05"
                                    value={isMuted ? 0 : volume}
                                    onChange={handleVolumeChange}
                                />
                            </div>

                            <div className="yt-live-tag">
                                <span className="yt-live-dot"></span> LIVE
                            </div>
                            <span className="yt-stream-info pl-2 border-l border-gray-700 ml-2 hidden sm:block">
                                WebRTC // 0ms Latency
                            </span>
                        </div>

                        <div className="yt-controls-right">
                            <button className="yt-btn" onClick={toggleFullscreen} title="Fullscreen">
                                {isFullscreen ? (
                                    <svg className="yt-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" /></svg>
                                ) : (
                                    <svg className="yt-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" /></svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}