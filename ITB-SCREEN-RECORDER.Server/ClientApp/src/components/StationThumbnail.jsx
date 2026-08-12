import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export default function StationThumbnail({ hostname, hlsUrl, isOnline, isStreaming }) {
    const videoRef = React.useRef(null);
    const playerRef = React.useRef(null);
    const retryTimeoutRef = React.useRef(null);

    React.useEffect(() => {
        if (!isOnline || !isStreaming || !hlsUrl) {
            if (playerRef.current) {
                playerRef.current.dispose();
                playerRef.current = null;
            }
            if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
            return;
        }

        const attemptStreamConnection = () => {
            const player = playerRef.current;
            if (!player) return;
            player.error(null); 
            player.src({ src: hlsUrl, type: 'application/x-mpegURL' });
            player.load();
            player.play().catch(() => {});
        };

        if (!playerRef.current && videoRef.current) {
            playerRef.current = videojs(videoRef.current, {
                autoplay: true, controls: false, muted: true, fluid: true, responsive: true, liveui: true
            }, function() {
                this.on('error', () => {
                    if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
                    retryTimeoutRef.current = setTimeout(attemptStreamConnection, 3000);
                });
            });
            attemptStreamConnection();
        } else if (playerRef.current) {
            attemptStreamConnection();
        }

        return () => { if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current); };
    }, [hlsUrl, isOnline, isStreaming, hostname]);

    React.useEffect(() => {
        return () => { if (playerRef.current) { playerRef.current.dispose(); playerRef.current = null; } };
    }, []);

    return (
        <div className="relative w-full aspect-video bg-gray-950 rounded-lg overflow-hidden border border-gray-800">
            {isOnline && isStreaming && hlsUrl ? (
                <div data-vjs-player className="w-full h-full">
                    <video ref={videoRef} className="video-js vjs-fluid vjs-default-skin w-full h-full object-cover" playsInline muted />
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 text-xs font-mono bg-gray-950 select-none">
                    <span>📺 אין שידור חי פעיל מהעמדה</span>
                </div>
            )}
            <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/70 rounded text-[10px] text-white font-mono border border-gray-800">
                {hostname}
            </div>
        </div>
    );
}