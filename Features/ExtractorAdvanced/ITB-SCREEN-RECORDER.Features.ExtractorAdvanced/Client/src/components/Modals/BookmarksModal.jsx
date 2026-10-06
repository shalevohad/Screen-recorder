// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Modals/BookmarksModal.jsx
// ==========================================
import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import './BookmarksModal.scss';

const FALLBACK_STORAGE_KEY = 'extractor_incident_bookmarks_fallback';
const SHARED_STORAGE_KEYS = ['itb_studio_bookmarks', 'itb_bookmarks', FALLBACK_STORAGE_KEY];

const pad = (n) => String(n).padStart(2, '0');

export default function BookmarksModal({
    isOpen,
    onClose,
    currentState,
    onLoadBookmark
}) {
    const [bookmarks, setBookmarks] = useState([]);
    const [noteText, setNoteText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // ניהול עריכה מוטבעת
    const [editingBmId, setEditingBmId] = useState(null);
    const [editTitleText, setEditTitleText] = useState('');

    const syncToLocalStorage = useCallback((list) => {
        SHARED_STORAGE_KEYS.forEach(k => {
            try {
                localStorage.setItem(k, JSON.stringify(list));
            } catch { }
        });
        window.dispatchEvent(new CustomEvent('bookmarks-updated', { detail: list }));
    }, []);

    const fetchBookmarks = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/v1/extractor-advanced/bookmarks');
            if (res.ok) {
                const data = await res.json();
                const list = Array.isArray(data) ? data : [];
                setBookmarks(list);
                syncToLocalStorage(list);
                return;
            }
        } catch (err) {
            console.warn('[BookmarksModal] Failed loading from server, falling back to local storage', err);
        } finally {
            setIsLoading(false);
        }

        try {
            const fallback = localStorage.getItem(FALLBACK_STORAGE_KEY) || localStorage.getItem('itb_studio_bookmarks');
            if (fallback) setBookmarks(JSON.parse(fallback));
        } catch { }
    }, [syncToLocalStorage]);

    useEffect(() => {
        if (isOpen) {
            fetchBookmarks();
        }
    }, [isOpen, fetchBookmarks]);

    if (!isOpen) return null;

    // 💡 שמירה מקיפה הכוללת את הטווח הכללי, זמני ה-CUT המדויקים, ורשימת התחנות
    const handleSaveCurrentState = async () => {
        if (!noteText.trim() || isSaving) return;

        const timelineBaseEpochMs = currentState?.timelineBaseEpochMs
            ?? currentState?.baseEpochMs
            ?? (currentState?.timeRange?.start ? new Date(currentState.timeRange.start.replace(' ', 'T')).getTime() : 0);

        const inPointMs = currentState?.inPointMs ?? 0;
        const outPointMs = currentState?.outPointMs ?? (currentState?.timeRange?.durationMs || 0);
        const playheadMs = currentState?.playheadMs ?? inPointMs;

        const inEpochMs = timelineBaseEpochMs + inPointMs;
        const outEpochMs = timelineBaseEpochMs + outPointMs;
        const playheadEpochMs = timelineBaseEpochMs + playheadMs;

        const selectedStationIds = currentState?.selectedStationIds || [];
        const selectedStationNames = currentState?.selectedStationNames || [];
        const allStationIds = currentState?.allStationIds?.length > 0
            ? currentState.allStationIds
            : selectedStationIds;

        const payload = {
            title: noteText.trim(),
            startTime: currentState?.timeRange?.start || '',
            endTime: currentState?.timeRange?.end || '',
            baseEpochMs: timelineBaseEpochMs,
            timelineBaseEpochMs,
            inPointMs,
            outPointMs,
            playheadMs,
            inEpochMs,
            outEpochMs,
            playheadEpochMs,
            selectedStationIds,
            selectedStationNames,
            allStationIds,
            stationIds: selectedStationIds.length > 0 ? selectedStationIds : allStationIds,
            activeStationId: currentState?.activeStationId || null,
            activeStationName: currentState?.activeStationName || null
        };

        setIsSaving(true);
        try {
            const res = await fetch('/api/v1/extractor-advanced/bookmarks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                const result = await res.json();
                const newBm = {
                    ...payload,
                    ...(result.bookmark || {}),
                    inEpochMs,
                    outEpochMs,
                    playheadEpochMs,
                    selectedStationIds,
                    selectedStationNames,
                    allStationIds,
                    id: result.bookmark?.id || result.id || `bm_${Date.now()}`
                };
                const updated = [newBm, ...bookmarks];
                setBookmarks(updated);
                syncToLocalStorage(updated);
                setNoteText('');
            } else {
                throw new Error(`Server returned ${res.status}`);
            }
        } catch (err) {
            console.error('[BookmarksModal] Failed saving bookmark to server:', err);
            const localFallbackBm = {
                ...payload,
                inEpochMs,
                outEpochMs,
                playheadEpochMs,
                selectedStationIds,
                selectedStationNames,
                allStationIds,
                id: `bm_local_${Date.now()}`,
                createdAt: new Date().toISOString()
            };
            const updated = [localFallbackBm, ...bookmarks];
            setBookmarks(updated);
            syncToLocalStorage(updated);
            setNoteText('');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteBookmark = async (bmId, e) => {
        e.stopPropagation();
        if (!window.confirm('Delete this mission bookmark permanently?')) return;

        const updated = bookmarks.filter(b => (b.id || b.startTime) !== bmId);
        setBookmarks(updated);
        syncToLocalStorage(updated);

        try {
            await fetch(`/api/v1/extractor-advanced/bookmarks/${bmId}`, { method: 'DELETE' });
        } catch (err) {
            console.warn('[BookmarksModal] Server delete failed, deleted locally:', err);
        }
    };

    const handleStartEdit = (bm, e) => {
        e.stopPropagation();
        setEditingBmId(bm.id || bm.startTime);
        setEditTitleText(bm.title || bm.name || '');
    };

    const handleSaveEdit = async (bmId, e) => {
        if (e) e.stopPropagation();
        if (!editTitleText.trim()) return;

        const targetBm = bookmarks.find(b => (b.id || b.startTime) === bmId);
        const updatedTitle = editTitleText.trim();

        const updated = bookmarks.map(b =>
            (b.id || b.startTime) === bmId ? { ...b, title: updatedTitle, name: updatedTitle } : b
        );
        setBookmarks(updated);
        syncToLocalStorage(updated);
        setEditingBmId(null);

        try {
            await fetch(`/api/v1/extractor-advanced/bookmarks/${bmId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...targetBm, title: updatedTitle })
            });
        } catch (err) {
            console.warn('[BookmarksModal] Server rename failed, updated locally:', err);
        }
    };

    const handleCancelEdit = (e) => {
        e.stopPropagation();
        setEditingBmId(null);
    };

    const formatEpochTime = (epochMs) => {
        if (!epochMs || isNaN(epochMs)) return '--:--:--';
        const d = new Date(epochMs);
        return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    };

    // 💡 1. טווח הזמנים הכללי שנבחר למשימה (General Mission Scope)
    const getGeneralScopeDisplay = (bm) => {
        const rawStart = bm.startTime || bm.StartTime;
        const rawEnd = bm.endTime || bm.EndTime;
        if (!rawStart) return '--';

        const sClean = String(rawStart).replace('T', ' ').substring(0, 19);
        const eClean = rawEnd ? String(rawEnd).replace('T', ' ').substring(0, 19) : sClean;
        return `${sClean} ➔ ${eClean}`;
    };

    // 💡 2. זמני ה-CUT ומשך החיתוך עבור ה-Header המשני
    const getCutDetails = (bm) => {
        let inEpoch = bm.inEpochMs || bm.InEpochMs;
        let outEpoch = bm.outEpochMs || bm.OutEpochMs;

        if (!inEpoch || !outEpoch) {
            const base = bm.timelineBaseEpochMs || bm.baseEpochMs || (bm.startTime ? new Date(String(bm.startTime).replace(' ', 'T')).getTime() : 0);
            const inPt = bm.inPointMs ?? bm.InPointMs;
            const outPt = bm.outPointMs ?? bm.OutPointMs;
            if (base && typeof inPt === 'number' && typeof outPt === 'number' && (inPt > 0 || outPt > 0)) {
                inEpoch = base + inPt;
                outEpoch = base + outPt;
            }
        }

        if (inEpoch && outEpoch && !isNaN(inEpoch) && !isNaN(outEpoch) && inEpoch > 0) {
            const inStr = formatEpochTime(inEpoch);
            const outStr = formatEpochTime(outEpoch);
            const durMs = Math.max(0, outEpoch - inEpoch);
            const durMinutes = Math.floor(durMs / 60000);
            const durHours = Math.floor(durMinutes / 60);
            const remMinutes = durMinutes % 60;
            const durText = durHours > 0 ? `${durHours}h ${remMinutes}m` : `${durMinutes}m`;
            return { timeText: `${inStr} ➔ ${outStr}`, duration: durText };
        }

        return { timeText: '--:--:-- ➔ --:--:--', duration: '' };
    };

    // 💡 3. רשימת התחנות שנבחרו ל-CUT
    const getCutStationsDisplay = (bm) => {
        const names = bm.selectedStationNames || [];
        const ids = bm.selectedStationIds || bm.cutStationIds || bm.stationIds || [];

        if (names.length > 0) {
            return names.join(', ');
        }
        if (ids.length > 0) {
            return ids.join(', ');
        }
        if (bm.cutStationName) return bm.cutStationName;
        if (bm.activeStationName) return bm.activeStationName;
        return 'All Stations in Scope';
    };

    return createPortal(
        <div className="bookmarks-modal-overlay" onClick={onClose} dir="ltr">
            <div className="bookmarks-modal-card" onClick={(e) => e.stopPropagation()}>
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
                            disabled={isSaving}
                            autoFocus
                        />
                    </div>
                    <button
                        className={`btn-save-state ${noteText.trim() && !isSaving ? 'active' : ''}`}
                        onClick={handleSaveCurrentState}
                        disabled={!noteText.trim() || isSaving}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        <span>{isSaving ? 'SAVING...' : 'SAVE SNAPSHOT'}</span>
                    </button>
                </div>

                <div className="bookmarks-section-heading">
                    <div className="heading-title-group">
                        <span className="pulse-indicator" />
                        <span>SAVED TIMELINE EVENTS</span>
                    </div>
                    <span className="count-badge">
                        {isLoading ? 'SYNCING...' : `${bookmarks.length} RECORDED`}
                    </span>
                </div>

                <div className="bookmarks-list-container">
                    {bookmarks.length === 0 && !isLoading ? (
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
                        bookmarks.map(bm => {
                            const bId = bm.id || bm.startTime;
                            const isEditing = editingBmId === bId;
                            const cut = getCutDetails(bm);
                            const cutStationsText = getCutStationsDisplay(bm);
                            const totalStationsInScope = bm.allStationIds?.length || bm.selectedStationIds?.length || bm.stationIds?.length || 0;

                            return (
                                <div
                                    key={bId}
                                    className={`bookmark-item-card ${isEditing ? 'is-editing' : ''}`}
                                    onClick={() => {
                                        if (isEditing) return;
                                        if (onLoadBookmark) onLoadBookmark(bm);
                                        onClose();
                                    }}
                                >
                                    <div className="card-indicator-accent" />
                                    <div className="bm-info">
                                        {/* כותרת הסימניה */}
                                        {isEditing ? (
                                            <div className="bm-edit-inline-wrap" onClick={(e) => e.stopPropagation()}>
                                                <input
                                                    type="text"
                                                    className="bm-edit-input"
                                                    value={editTitleText}
                                                    onChange={(e) => setEditTitleText(e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') handleSaveEdit(bId, e);
                                                        if (e.key === 'Escape') handleCancelEdit(e);
                                                    }}
                                                    autoFocus
                                                />
                                                <div className="edit-btn-group">
                                                    <button
                                                        type="button"
                                                        className="btn-edit-confirm"
                                                        onClick={(e) => handleSaveEdit(bId, e)}
                                                        title="Save (Enter)"
                                                    >
                                                        ✓
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn-edit-cancel"
                                                        onClick={handleCancelEdit}
                                                        title="Cancel (Esc)"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="bm-title-row">
                                                <span className="bm-title">{bm.title || bm.name || 'Untitled Event'}</span>
                                                <span className="bm-time-tag">
                                                    {bm.createdAt ? new Date(bm.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                                                </span>
                                            </div>
                                        )}

                                        {/* 1. שורה ראשית: טווח הזמנים הכללי שנבחר (General Mission Scope) */}
                                        <div className="bm-primary-scope-row">
                                            <span className="meta-pill main-scope" title="General timeline window selected">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                                    <line x1="16" y1="2" x2="16" y2="6" />
                                                    <line x1="8" y1="2" x2="8" y2="6" />
                                                    <line x1="3" y1="10" x2="21" y2="10" />
                                                </svg>
                                                <span className="scope-lbl">SCOPE:</span>
                                                <strong>{getGeneralScopeDisplay(bm)}</strong>
                                            </span>

                                            {totalStationsInScope > 0 && (
                                                <span className="meta-pill scope-stations" title="Total stations in this scope window">
                                                    <span className="dot" />
                                                    {totalStationsInScope} STATIONS IN SCOPE
                                                </span>
                                            )}
                                        </div>

                                        {/* 💡 2. Header משני ייעודי עבור זמני ה-CUT והתחנות שנבחרו ל-CUT */}
                                        <div className="bm-cut-secondary-header">
                                            <div className="cut-time-cell">
                                                <div className="cut-header-tag">
                                                    <span className="cut-icon">✂️</span>
                                                    <span>CUT WINDOW:</span>
                                                </div>
                                                <strong className="cut-time-val">{cut.timeText}</strong>
                                                {cut.duration && (
                                                    <span className="cut-duration-badge">({cut.duration})</span>
                                                )}
                                            </div>

                                            <div className="cut-stations-cell" title={`Selected Stations: ${cutStationsText}`}>
                                                <div className="cut-header-tag">
                                                    <span className="target-icon">🎯</span>
                                                    <span>CUT STATIONS:</span>
                                                </div>
                                                <strong className="cut-stations-names">{cutStationsText}</strong>
                                            </div>
                                        </div>
                                    </div>

                                    {/* כפתורי פעולה ימניים (עריכה ומחיקה) */}
                                    <div className="bm-card-actions" onClick={(e) => e.stopPropagation()}>
                                        {!isEditing && (
                                            <button
                                                type="button"
                                                className="btn-bm-control edit"
                                                onClick={(e) => handleStartEdit(bm, e)}
                                                title="Edit bookmark title"
                                            >
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
                                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                </svg>
                                            </button>
                                        )}
                                        <button
                                            type="button"
                                            className="btn-bm-control delete"
                                            onClick={(e) => handleDeleteBookmark(bId, e)}
                                            title="Delete bookmark permanently"
                                        >
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
                                                <polyline points="3 6 5 6 21 6" />
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
}