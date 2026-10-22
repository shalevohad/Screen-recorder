import React from 'react';
import { useAudioSolo } from '../../context/AudioSoloContext';
import './MasterAudioDock.scss';

export default function MasterAudioDock({ stations = [] }) {
    const {
        activeAudioStationId,
        audioVolume,
        isGlobalMuted,
        setAudioVolume,
        toggleGlobalMute,
        stopAudioSolo
    } = useAudioSolo();

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

            {/* Tactical Spectral VU Meter (5 animated equalization bars) */}
            <div className={`dock-spectral-vu ${isGlobalMuted ? 'silent' : 'active'}`} title="Real-time WASAPI Loopback VU Flow">
                <span className="vu-bar bar-1" />
                <span className="vu-bar bar-2" />
                <span className="vu-bar bar-3" />
                <span className="vu-bar bar-4" />
                <span className="vu-bar bar-5" />
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
