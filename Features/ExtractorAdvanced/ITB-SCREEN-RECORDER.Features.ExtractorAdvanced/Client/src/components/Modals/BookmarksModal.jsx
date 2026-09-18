import React, { useState, useEffect } from 'react';
import './BookmarksModal.scss';

export default function BookmarksModal({
    isOpen,
    onClose,
    currentState,
    onLoadBookmark
}) {
    const [bookmarks, setBookmarks] = useState([]);
    const [bookmarkTitle, setBookmarkTitle] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // טעינת רשימת ה-Bookmarks מהשרת בעת פתיחת המודאל
    useEffect(() => {
        if (!isOpen) return;
        const fetchBookmarks = async () => {
            try {
                const res = await fetch('/api/v1/extractor-advanced/bookmarks');
                if (res.ok) {
                    const data = await res.json();
                    setBookmarks(data);
                }
            } catch (err) {
                console.error('[Bookmarks] Failed to load:', err);
            }
        };
        fetchBookmarks();
    }, [isOpen]);

    const handleSave = async (e) => {
        e.preventDefault();
        if (!bookmarkTitle.trim()) return;

        setIsLoading(true);
        const payload = {
            title: bookmarkTitle.trim(),
            startTime: currentState.timeRange.start,
            endTime: currentState.timeRange.end,
            playheadMs: currentState.playheadMs,
            inPointMs: currentState.inPointMs,
            outPointMs: currentState.outPointMs,
            stationIds: currentState.selectedStationIds
        };

        try {
            const res = await fetch('/api/v1/extractor-advanced/bookmarks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                const data = await res.json();
                setBookmarks(prev => [data.bookmark, ...prev]);
                setBookmarkTitle('');
            }
        } catch (err) {
            console.error('[Bookmarks] Failed to save:', err);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="bookmarks-modal-overlay" onClick={onClose}>
            <div className="bookmarks-modal-container" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Investigation Bookmarks (Cases)</h3>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>

                <div className="modal-body">
                    {/* טופס שמירה */}
                    <form onSubmit={handleSave} className="save-bookmark-form">
                        <input
                            type="text"
                            placeholder="Enter case title / bookmark note..."
                            value={bookmarkTitle}
                            onChange={e => setBookmarkTitle(e.target.value)}
                        />
                        <button type="submit" disabled={isLoading || !bookmarkTitle.trim()}>
                            Save Current State
                        </button>
                    </form>

                    {/* רשימת התיקים השמורים */}
                    <div className="bookmarks-list">
                        <h4>Saved Investigation Points</h4>
                        {bookmarks.length === 0 ? (
                            <p className="no-bookmarks">No bookmarks saved yet.</p>
                        ) : (
                            bookmarks.map(bm => (
                                <div key={bm.id} className="bookmark-item">
                                    <div className="bm-info">
                                        <span className="bm-title">{bm.title}</span>
                                        <span className="bm-meta">
                                            {bm.startTime} | Stations: {bm.stationIds.length} | In/Out configured
                                        </span>
                                    </div>
                                    <button
                                        className="load-bm-btn"
                                        onClick={() => {
                                            onLoadBookmark(bm);
                                            onClose();
                                        }}
                                    >
                                        Load State
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}