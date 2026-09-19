// Client/src/components/Modals/BookmarksModal.jsx
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './BookmarksModal.scss';

const STORAGE_KEY = 'extractor_incident_bookmarks';

export default function BookmarksModal({
    isOpen,
    onClose,
    currentState,
    onLoadBookmark
}) {
    const [bookmarks, setBookmarks] = useState([]);
    const [noteText, setNoteText] = useState('');

    useEffect(() => {
        if (isOpen) {
            try {
                const stored = localStorage.getItem(STORAGE_KEY);
                if (stored) {
                    setBookmarks(JSON.parse(stored));
                }
            } catch (e) {
                console.error('[BookmarksModal] Failed to load bookmarks', e);
            }
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSaveCurrentState = () => {
        if (!noteText.trim()) return;

        const newBookmark = {
            id: `bm_${Date.now()}`,
            title: noteText.trim(),
            createdAt: new Date().toISOString(),
            startTime: currentState?.timeRange?.start || '',
            endTime: currentState?.timeRange?.end || '',
            inPointMs: currentState?.inPointMs || 0,
            outPointMs: currentState?.outPointMs || 0,
            playheadMs: currentState?.playheadMs || 0,
            stationIds: currentState?.selectedStationIds || []
        };

        const updated = [newBookmark, ...bookmarks];
        setBookmarks(updated);
        setNoteText('');

        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch (e) {
            console.error('[BookmarksModal] Failed to save bookmark', e);
        }
    };

    const handleDeleteBookmark = (id, e) => {
        e.stopPropagation();
        const updated = bookmarks.filter(b => b.id !== id);
        setBookmarks(updated);
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch (err) {
            console.error('[BookmarksModal] Failed to delete bookmark', err);
        }
    };

    const formatShortTime = (isoString) => {
        if (!isoString) return '--:--:--';
        const parts = isoString.split('T');
        return parts[1] ? parts[1].split('.')[0] : isoString;
    };

    return createPortal(
        <div className="bookmarks-modal-overlay" onClick={onClose} dir="ltr">
            <div className="bookmarks-modal-card" onClick={(e) => e.stopPropagation()}>
                {/* Header מבצעי מותאם לתחקור הקלטות ואירועים */}
                <div className="modal-header">
                    <div className="header-brand-wrap">
                        <div className="brand-icon-box">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                            </svg>
                        </div>
                        <div className="brand-text-col">
                            <span className="modal-title">SESSION BOOKMARKS</span>
                            <span className="modal-subtitle">OPERATIONAL TIMELINE POINTS & DEBRIEFING SNAPSHOTS</span>
                        </div>
                    </div>
                    <button className="btn-modal-close" onClick={onClose} title="Close (Esc)">✕</button>
                </div>

                {/* שורת יצירת Bookmark */}
                <div className="create-bookmark-row">
                    <div className="input-field-wrap">
                        <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="4" y1="9" x2="20" y2="9" />
                            <line x1="4" y1="15" x2="20" y2="15" />
                            <line x1="10" y1="3" x2="8" y2="21" />
                            <line x1="16" y1="3" x2="14" y2="21" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Enter event tag or debriefing note..."
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSaveCurrentState()}
                            autoFocus
                        />
                    </div>
                    <button
                        className={`btn-save-state ${noteText.trim() ? 'active' : ''}`}
                        onClick={handleSaveCurrentState}
                        disabled={!noteText.trim()}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        <span>SAVE SNAPSHOT</span>
                    </button>
                </div>

                {/* כותרת המקטע */}
                <div className="bookmarks-section-heading">
                    <div className="heading-title-group">
                        <span className="pulse-indicator" />
                        <span>SAVED TIMELINE EVENTS</span>
                    </div>
                    <span className="count-badge">{bookmarks.length} RECORDED</span>
                </div>

                {/* רשימת ה-Bookmarks */}
                <div className="bookmarks-list-container">
                    {bookmarks.length === 0 ? (
                        <div className="empty-bookmarks-state">
                            <div className="empty-reticle-box">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <circle cx="12" cy="12" r="9" strokeDasharray="3 3" />
                                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" opacity="0.6" />
                                </svg>
                            </div>
                            <span className="empty-title">NO SAVED TIMELINE POINTS</span>
                            <p className="empty-desc">
                                Bookmark operational moments and active screen configurations to quickly return to them during debriefing.
                            </p>
                        </div>
                    ) : (
                        bookmarks.map(bm => (
                            <div
                                key={bm.id}
                                className="bookmark-item-card"
                                onClick={() => {
                                    if (onLoadBookmark) onLoadBookmark(bm);
                                    onClose();
                                }}
                            >
                                <div className="card-indicator-accent" />
                                <div className="bm-info">
                                    <div className="bm-title-row">
                                        <span className="bm-title">{bm.title}</span>
                                        <span className="bm-time-tag">
                                            {new Date(bm.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                    <div className="bm-meta-row">
                                        <span className="meta-pill scope">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <circle cx="12" cy="12" r="10" />
                                                <polyline points="12 6 12 12 16 14" />
                                            </svg>
                                            {formatShortTime(bm.startTime)} → {formatShortTime(bm.endTime)}
                                        </span>
                                        <span className="meta-pill stations">
                                            <span className="dot" />
                                            {bm.stationIds?.length || 0} STATIONS
                                        </span>
                                    </div>
                                </div>

                                <div className="bm-actions">
                                    <button
                                        className="btn-delete-bm"
                                        onClick={(e) => handleDeleteBookmark(bm.id, e)}
                                        title="Delete Bookmark"
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <line x1="18" y1="6" x2="6" y2="18" />
                                            <line x1="6" y1="6" x2="18" y2="18" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
}