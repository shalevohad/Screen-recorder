import React, { useState, useRef, useEffect } from 'react';
import { formatTimelineClock, formatDuration } from '../../utils/timeFormat';
import './TransportBar.scss';

export default function TransportBar({
    baseEpochMs,
    timeMode,
    totalDurationMs,
    inPointMs,
    setInPointMs,
    outPointMs,
    setOutPointMs,
    activeStationId,
    isPlaying,
    setIsPlaying,
    onExport
}) {
    const [editingMarker, setEditingMarker] = useState(null); // 'IN' | 'OUT' | null
    const [tempTimeText, setTempTimeText] = useState('');
    const editInputRef = useRef(null);

    const [volume, setVolume] = useState(80);
    const [isMuted, setIsMuted] = useState(false);

    const cutDurationMs = Math.max(0, outPointMs - inPointMs);

    useEffect(() => {
        if (editingMarker && editInputRef.current) {
            editInputRef.current.focus();
            editInputRef.current.select();
        }
    }, [editingMarker]);

    const handleStartEdit = (markerType) => {
        const currentMs = markerType === 'IN' ? inPointMs : outPointMs;
        setTempTimeText(formatTimelineClock(baseEpochMs + currentMs, timeMode));
        setEditingMarker(markerType);
    };

    const handleCommitEdit = () => {
        if (!editingMarker) return;

        const parts = tempTimeText.trim().split(':').map(Number);
        if (parts.length === 3 && parts.every(p => !isNaN(p))) {
            const [h, m, s] = parts;
            if (h >= 0 && h < 24 && m >= 0 && m < 60 && s >= 0 && s < 60) {
                const targetDate = new Date(baseEpochMs);
                if (timeMode === 'UTC') {
                    targetDate.setUTCHours(h, m, s, 0);
                } else {
                    targetDate.setHours(h, m, s, 0);
                }

                const targetOffsetMs = targetDate.getTime() - baseEpochMs;

                if (editingMarker === 'IN') {
                    const validIn = Math.max(0, Math.min(targetOffsetMs, outPointMs - 1000));
                    setInPointMs(validIn);
                } else {
                    const validOut = Math.min(totalDurationMs, Math.max(targetOffsetMs, inPointMs + 1000));
                    setOutPointMs(validOut);
                }
            }
        }
        setEditingMarker(null);
    };

    const handleEditKeyDown = (e) => {
        if (e.key === 'Enter') handleCommitEdit();
        if (e.key === 'Escape') setEditingMarker(null);
    };

    return (
        <div className="viewport-transport-bar">
            <div className="cut-readouts">
                <span>
                    IN:{' '}
                    {editingMarker === 'IN' ? (
                        <input
                            ref={editInputRef}
                            type="text"
                            className="inline-time-input"
                            value={tempTimeText}
                            onChange={(e) => setTempTimeText(e.target.value)}
                            onBlur={handleCommitEdit}
                            onKeyDown={handleEditKeyDown}
                        />
                    ) : (
                        <span
                            className="cut-val editable"
                            onClick={() => handleStartEdit('IN')}
                            title="Click to edit IN time"
                        >
                            {formatTimelineClock(baseEpochMs + inPointMs, timeMode)}
                        </span>
                    )}
                </span>

                <span>|</span>

                <span>
                    OUT:{' '}
                    {editingMarker === 'OUT' ? (
                        <input
                            ref={editInputRef}
                            type="text"
                            className="inline-time-input"
                            value={tempTimeText}
                            onChange={(e) => setTempTimeText(e.target.value)}
                            onBlur={handleCommitEdit}
                            onKeyDown={handleEditKeyDown}
                        />
                    ) : (
                        <span
                            className="cut-val editable"
                            onClick={() => handleStartEdit('OUT')}
                            title="Click to edit OUT time"
                        >
                            {formatTimelineClock(baseEpochMs + outPointMs, timeMode)}
                        </span>
                    )}
                </span>

                <span className="cut-duration">DUR: {formatDuration(cutDurationMs)}</span>
            </div>

            <div className="playback-controls">
                <button
                    type="button"
                    disabled={!activeStationId}
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`btn-round-playback ${!activeStationId ? 'disabled' : ''}`}
                    title={!activeStationId ? "Playback available in Solo View only" : (isPlaying ? "Pause" : "Play")}
                >
                    {isPlaying ? (
                        <svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                    ) : (
                        <svg viewBox="0 0 24 24" style={{ marginLeft: 2 }}><path d="M8 5v14l11-7z" /></svg>
                    )}
                </button>

                {activeStationId && (
                    <div className="volume-control-widget">
                        <button
                            type="button"
                            className="btn-volume-icon"
                            onClick={() => setIsMuted(!isMuted)}
                            title={isMuted ? "Unmute" : "Mute"}
                        >
                            {isMuted || volume === 0 ? (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                    <line x1="17" y1="9" x2="23" y2="15" strokeWidth="2" strokeLinecap="round" />
                                    <line x1="23" y1="9" x2="17" y2="15" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            ) : (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                </svg>
                            )}
                        </button>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={isMuted ? 0 : volume}
                            onChange={(e) => {
                                setVolume(Number(e.target.value));
                                if (isMuted) setIsMuted(false);
                            }}
                            className="volume-slider"
                            title={`Volume: ${isMuted ? 0 : volume}%`}
                        />
                        <span className="volume-text">{isMuted ? '0%' : `${volume}%`}</span>
                    </div>
                )}
            </div>

            <button type="button" onClick={onExport} className="btn-action-export">
                Export Smart Cut
            </button>
        </div>
    );
}