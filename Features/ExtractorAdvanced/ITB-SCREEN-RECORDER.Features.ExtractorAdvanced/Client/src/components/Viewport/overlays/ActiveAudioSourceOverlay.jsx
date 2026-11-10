// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Viewport/overlays/ActiveAudioSourceOverlay.jsx
// Tactical HUD Audio Playback Source Indicator
// Displays Active Workstation & Channel Mode (BOTH / SYS / MIC) with Dynamic Live VU Meters
// ==========================================
import React, { useState, useEffect } from 'react';
import './ActiveAudioSourceOverlay.scss';

export default function ActiveAudioSourceOverlay() {
    const [activeSource, setActiveSource] = useState(null);
    const [liveLevel, setLiveLevel] = useState({ rms: 0, peak: 0, db: -60, isPlaying: false });

    useEffect(() => {
        const handleSource = (e) => {
            setActiveSource(e.detail || null);
        };
        const handleLevel = (e) => {
            if (e.detail) setLiveLevel(e.detail);
        };

        window.addEventListener('itb-active-audio-source', handleSource);
        window.addEventListener('itb-live-audio-level', handleLevel);

        return () => {
            window.removeEventListener('itb-active-audio-source', handleSource);
            window.removeEventListener('itb-live-audio-level', handleLevel);
        };
    }, []);

    // Only visible when audio is actively routing during playback
    if (!activeSource || !liveLevel.isPlaying || (activeSource.gain || 1.0) <= 0) {
        return null;
    }

    const channelMode = (activeSource.channelMode || 'both').toUpperCase();
    const gainPct = Math.round((activeSource.gain || 1.0) * 100);

    return (
        <div className="active-audio-source-overlay" title={`Playing Audio from ${activeSource.stationName} (${channelMode}) • Gain ${gainPct}%`}>
            <div className="audio-live-pulse-dot" />
            <span className="audio-source-icon">🔊</span>
            <span className="audio-source-label">PLAYING AUDIO:</span>
            <span className="audio-source-station">{activeSource.stationName}</span>
            <span className={`audio-channel-badge mode-${(activeSource.channelMode || 'both').toLowerCase()}`}>
                {channelMode === 'MIC' ? '🎤 MIC' : channelMode === 'SYS' ? '🔊 SYS' : '🎧 BOTH'}
            </span>
            <span className="audio-gain-badge">{gainPct}%</span>

            {/* Live Reactive Acoustic VU Bars */}
            <div className="audio-vu-bars">
                <span className="vu-bar bar-1" style={{ height: `${Math.min(100, Math.max(20, liveLevel.rms * 160))}%` }} />
                <span className="vu-bar bar-2" style={{ height: `${Math.min(100, Math.max(30, liveLevel.rms * 240))}%` }} />
                <span className="vu-bar bar-3" style={{ height: `${Math.min(100, Math.max(15, liveLevel.rms * 190))}%` }} />
                <span className="vu-bar bar-4" style={{ height: `${Math.min(100, Math.max(35, liveLevel.rms * 280))}%` }} />
            </div>
        </div>
    );
}
