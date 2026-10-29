import React, { useMemo } from 'react';
import WebRTCPlayer from '../Player/WebRTCPlayer';
import { calculateTopologyBounds, calculateNormalizedDisplayRect } from '../../utils/topologyLayout';
import './VirtualTopologyCanvas.scss';

export default function VirtualTopologyCanvas({
    station,
    activeDisplayId = 'canvas',
    onSelectDisplay,
    isMuted = true,
    volume = 1,
    webrtcBaseUrl = '/api/v1/whep',
    isInteractive = false,
    onPlaying,
    onStreamAvailable
}) {
    const stationHost = station?.hostname || station?.Hostname || station?.stationId || station?.StationId || '';

    const displays = useMemo(() => {
        const raw = station?.displays || station?.Displays || station?.displayTopology?.displays || station?.DisplayTopology?.Displays;
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
        return [
            {
                DisplayId: 'mon-0',
                DisplayName: 'Display 1',
                IsPrimary: true,
                X: 0,
                Y: 0,
                Width: 1920,
                Height: 1080
            }
        ];
    }, [station]);

    const bounds = useMemo(() => calculateTopologyBounds(displays), [displays]);

    // Single display station: Pure clean player
    if (displays.length <= 1) {
        const singleDisplay = displays[0];
        const streamPath = stationHost ? `live/${stationHost}/${singleDisplay.DisplayId}` : '';

        return (
            <div className="virtual-topology-solo-viewport single-display-pure">
                {streamPath && (
                    <WebRTCPlayer
                        streamPath={streamPath}
                        webrtcBaseUrl={webrtcBaseUrl}
                        isMuted={isMuted}
                        volume={volume}
                        showControls={false}
                        onPlaying={onPlaying}
                        onStreamAvailable={onStreamAvailable}
                    />
                )}
            </div>
        );
    }

    const isSoloMode = activeDisplayId !== 'canvas';

    // Multi-display: KEEP ALL PLAYERS MOUNTED CONTINUOUSLY.
    // Switching displays only animates CSS coordinates/classes, ensuring ZERO black screen and ZERO renegotiation!
    return (
        <div
            className={`virtual-topology-canvas-container ${isSoloMode ? 'in-solo-mode' : 'in-canvas-mode'} ${isInteractive ? 'interactive' : ''}`}
            style={{
                aspectRatio: isSoloMode ? undefined : `${bounds.totalWidth} / ${bounds.totalHeight}`
            }}
        >
            {!isSoloMode && <div className="virtual-canvas-grid-bg" />}

            {displays.map((d, index) => {
                const { leftPct, topPct, widthPct, heightPct } = calculateNormalizedDisplayRect(d, bounds);
                const streamPath = stationHost ? `live/${stationHost}/${d.DisplayId}` : '';
                const isThisSolo = isSoloMode && d.DisplayId === activeDisplayId;
                const isHiddenSolo = isSoloMode && d.DisplayId !== activeDisplayId;

                // Audio strictly plays on primary display (or when soloing primary)
                const isDisplayMuted = isMuted || !d.IsPrimary;

                return (
                    <div
                        key={d.DisplayId}
                        className={`sub-display-box ${d.IsPrimary ? 'is-primary' : 'is-secondary'} ${isThisSolo ? 'is-solo-expanded' : ''} ${isHiddenSolo ? 'is-solo-hidden' : ''}`}
                        style={{
                            left: isThisSolo ? '0%' : `${leftPct}%`,
                            top: isThisSolo ? '0%' : `${topPct}%`,
                            width: isThisSolo ? '100%' : `${widthPct}%`,
                            height: isThisSolo ? '100%' : `${heightPct}%`,
                            opacity: isHiddenSolo ? 0 : 1,
                            pointerEvents: isHiddenSolo ? 'none' : 'auto',
                            zIndex: isThisSolo ? 10 : 2
                        }}
                        onClick={() => {
                            if (!isSoloMode && isInteractive && onSelectDisplay) {
                                onSelectDisplay(d.DisplayId);
                            }
                        }}
                        title={!isSoloMode && isInteractive ? `Switch to ${d.DisplayName || d.DisplayId} (${d.Width}x${d.Height})` : undefined}
                    >
                        {streamPath && (
                            <WebRTCPlayer
                                streamPath={streamPath}
                                webrtcBaseUrl={webrtcBaseUrl}
                                isMuted={isDisplayMuted}
                                volume={volume}
                                showControls={false}
                                onPlaying={d.IsPrimary ? onPlaying : undefined}
                                onStreamAvailable={d.IsPrimary ? onStreamAvailable : undefined}
                            />
                        )}

                        {!isSoloMode && (
                            <div className="sub-display-overlay">
                                <span className="display-index-pill">
                                    {d.IsPrimary ? '★ ' : ''}🖥 {index + 1}
                                </span>
                                <span className="display-res-pill">
                                    {d.Width}x{d.Height}
                                </span>
                            </div>
                        )}

                        {isThisSolo && (
                            <div className="solo-display-badge">
                                <span className="solo-indicator">●</span>
                                <span className="solo-label">
                                    {d.DisplayName || d.DisplayId.toUpperCase()} ({d.Width}x{d.Height})
                                </span>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
