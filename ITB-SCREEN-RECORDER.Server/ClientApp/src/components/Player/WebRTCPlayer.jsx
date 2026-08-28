import { useEffect, useRef, useState } from 'react';
import './VideoPlayer.scss';

export default function WebRTCPlayer({
    streamPath,
    webrtcBaseUrl = 'http://127.0.0.1:8889',
    showControls = false,
    onPlaying
}) {
    const containerRef = useRef(null);
    const videoRef = useRef(null);
    const peerRef = useRef(null);

    const [isVisible, setIsVisible] = useState(false);
    const [hasError, setHasError] = useState(false);

    const [isHovered, setIsHovered] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const [volume, setVolume] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        const currentContainer = containerRef.current; // 💡 שמירת רפרנס לנקודת זמן נוכחית לטובת ה-cleanup

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
            },
            { threshold: 0.1 }
        );

        if (currentContainer) {
            observer.observe(currentContainer);
        }

        return () => {
            if (currentContainer) {
                observer.unobserve(currentContainer);
            }
        };
    }, []);

    useEffect(() => {
        const currentVideo = videoRef.current; // 💡 שמירת רפרנס לוידאו לטובת ניקוי 

        if (!isVisible) {
            if (peerRef.current) {
                peerRef.current.close();
                peerRef.current = null;
            }
            if (currentVideo) {
                currentVideo.srcObject = null;
            }
            return;
        }

        let isSubscribed = true;
        const pc = new RTCPeerConnection();
        peerRef.current = pc;

        pc.addTransceiver('video', { direction: 'recvonly' });
        pc.addTransceiver('audio', { direction: 'recvonly' });

        pc.ontrack = (event) => {
            if (currentVideo && event.streams && event.streams[0]) {
                currentVideo.srcObject = event.streams[0];
            }
        };

        pc.onconnectionstatechange = () => {
            if (pc.connectionState === 'failed' || pc.connectionState === 'disconnected') {
                if (isSubscribed) setHasError(true);
            }
        };

        const connectToWHEP = async () => {
            try {
                const offer = await pc.createOffer();
                await pc.setLocalDescription(offer);

                const whepUrl = `${webrtcBaseUrl}/${streamPath}/whep`;
                const response = await fetch(whepUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/sdp' },
                    body: pc.localDescription.sdp
                });

                if (!response.ok) throw new Error("WHEP failed");

                const answerSdp = await response.text();

                if (isSubscribed) {
                    await pc.setRemoteDescription(new RTCSessionDescription({
                        type: 'answer',
                        sdp: answerSdp
                    }));
                    setHasError(false);
                }
            } catch (err) {
                console.error(`[WebRTC] Connection failed:`, err);
                if (isSubscribed) setHasError(true);
            }
        };

        connectToWHEP();

        return () => {
            isSubscribed = false;
            pc.close();
            peerRef.current = null;
            if (currentVideo) {
                currentVideo.srcObject = null;
            }
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
            {hasError && (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', zIndex: 10 }}>
                    <span style={{ backgroundColor: 'rgba(0,0,0,0.7)', padding: '4px 8px', borderRadius: '4px' }}>
                        Stream Offline
                    </span>
                </div>
            )}

            <video
                ref={videoRef}
                autoPlay
                muted={isMuted}
                playsInline
                onPlaying={onPlaying}
                onLoadedData={onPlaying}
                onCanPlay={onPlaying}
                onTimeUpdate={onPlaying}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
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