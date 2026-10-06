// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Modals/MasterTimeRangeModal.jsx
// ==========================================
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
    checkTimeAmbiguity,
    getLocalOffsetMinutes,
    findTransitionsInRange
} from '../../../utils/dstEngine.js';
import Tactical24HClockPicker from '../UI/Tactical24HClockPicker/Tactical24HClockPicker.jsx';
import './MasterTimeRangeModal.scss';

const MAX_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;
const pad = (n) => String(n).padStart(2, '0');

const parseInputDateTime = (dtStr, mode) => {
    if (!dtStr) return null;
    const parts = dtStr.split('T');
    if (parts.length !== 2) return null;

    const [year, month, day] = parts[0].split('-').map(Number);
    const timeParts = parts[1].split(':').map(Number);
    const hour = timeParts[0] || 0;
    const min = timeParts[1] || 0;
    const sec = timeParts[2] || 0;

    if (mode === 'UTC') {
        return new Date(Date.UTC(year, month - 1, day, hour, min, sec));
    }
    return new Date(year, month - 1, day, hour, min, sec);
};

export default function MasterTimeRangeModal({
    isOpen,
    onClose,
    currentRange,
    onApplyRange,
    onLoadBookmark,
    timeMode = 'LOCAL',
    onTimeModeChange
}) {
    const [startDateStr, setStartDateStr] = useState('');
    const [endDateStr, setEndDateStr] = useState('');

    const [startTimeStr, setStartTimeStr] = useState('00:00:00');
    const [endTimeStr, setEndTimeStr] = useState('00:00:00');

    const [calendarViewDate, setCalendarViewDate] = useState(() => new Date());
    const [hoverDateStr, setHoverDateStr] = useState(null);

    // ניהול Bookmarks
    const [bookmarks, setBookmarks] = useState([]);
    const [isBookmarksDrawerOpen, setIsBookmarksDrawerOpen] = useState(false);
    const [bookmarkSearchTerm, setBookmarkSearchTerm] = useState('');

    const [startOccurrence, setStartOccurrence] = useState(1);
    const [endOccurrence, setEndOccurrence] = useState(2);
    const [activePreset, setActivePreset] = useState(null);

    const loadBookmarksFromStorage = useCallback(() => {
        try {
            const raw = localStorage.getItem('itb_studio_bookmarks') || localStorage.getItem('itb_bookmarks');
            if (raw) {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed)) setBookmarks(parsed);
            }
        } catch { }

        fetch('/api/v1/extractor-advanced/bookmarks')
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    setBookmarks(data);
                }
            })
            .catch(() => { });
    }, []);

    useEffect(() => {
        if (!isOpen) return;
        loadBookmarksFromStorage();

        let sObj, eObj;
        if (currentRange?.start && currentRange?.end) {
            sObj = new Date(currentRange.start.replace(' ', 'T'));
            eObj = new Date(currentRange.end.replace(' ', 'T'));
            setActivePreset(null);
        } else {
            eObj = new Date();
            sObj = new Date(eObj.getTime() - (24 * 3600 * 1000));
            setActivePreset('24h');
        }

        const isUtc = timeMode === 'UTC';
        const sy = isUtc ? sObj.getUTCFullYear() : sObj.getFullYear();
        const sm = isUtc ? sObj.getUTCMonth() + 1 : sObj.getMonth() + 1;
        const sd = isUtc ? sObj.getUTCDate() : sObj.getDate();
        const sh = isUtc ? sObj.getUTCHours() : sObj.getHours();
        const sMin = isUtc ? sObj.getUTCMinutes() : sObj.getMinutes();
        const ss = isUtc ? sObj.getUTCSeconds() : sObj.getSeconds();

        const ey = isUtc ? eObj.getUTCFullYear() : eObj.getFullYear();
        const em = isUtc ? eObj.getUTCMonth() + 1 : eObj.getMonth() + 1;
        const ed = isUtc ? eObj.getUTCDate() : eObj.getDate();
        const eh = isUtc ? eObj.getUTCHours() : eObj.getHours();
        const eMin = isUtc ? eObj.getUTCMinutes() : eObj.getMinutes();
        const es = isUtc ? eObj.getUTCSeconds() : eObj.getSeconds();

        setStartDateStr(`${sy}-${pad(sm)}-${pad(sd)}`);
        setEndDateStr(`${ey}-${pad(em)}-${pad(ed)}`);
        setStartTimeStr(`${pad(sh)}:${pad(sMin)}:${pad(ss)}`);
        setEndTimeStr(`${pad(eh)}:${pad(eMin)}:${pad(es)}`);
        setCalendarViewDate(new Date(sObj));
    }, [isOpen, currentRange, timeMode, loadBookmarksFromStorage]);

    // 💡 הבטחה שאם נבחר רק תאריך התחלה וניגשים לשעון, תאריך הסיום יהיה זהה
    const ensureSameDayIfEmpty = useCallback(() => {
        if (startDateStr && !endDateStr) {
            setEndDateStr(startDateStr);
        }
    }, [startDateStr, endDateStr]);

    const effectiveEndDateStr = endDateStr || startDateStr;

    const startDateTime = useMemo(() => {
        if (!startDateStr) return '';
        return `${startDateStr}T${startTimeStr}`;
    }, [startDateStr, startTimeStr]);

    const endDateTime = useMemo(() => {
        if (!effectiveEndDateStr) return '';
        return `${effectiveEndDateStr}T${endTimeStr}`;
    }, [effectiveEndDateStr, endTimeStr]);

    const bookmarksByDateMap = useMemo(() => {
        const map = {};
        bookmarks.forEach(bm => {
            const rawStart = bm.startTime || bm.start;
            const rawEnd = bm.endTime || bm.end || rawStart;
            if (!rawStart) return;

            const sDate = String(rawStart).substring(0, 10);
            const eDate = String(rawEnd).substring(0, 10);

            let curr = new Date(sDate);
            const endLimit = new Date(eDate);

            while (curr <= endLimit) {
                const dKey = `${curr.getFullYear()}-${pad(curr.getMonth() + 1)}-${pad(curr.getDate())}`;
                if (!map[dKey]) map[dKey] = [];
                map[dKey].push(bm);
                curr.setDate(curr.getDate() + 1);
            }
        });
        return map;
    }, [bookmarks]);

    const handleDeleteBookmark = async (bmId, e) => {
        if (e) e.stopPropagation();
        if (!window.confirm('Delete this mission bookmark permanently?')) return;

        const updated = bookmarks.filter(b => (b.id || b.startTime) !== bmId);
        setBookmarks(updated);

        try {
            localStorage.setItem('itb_studio_bookmarks', JSON.stringify(updated));
            localStorage.setItem('itb_bookmarks', JSON.stringify(updated));
            window.dispatchEvent(new CustomEvent('bookmarks-updated', { detail: updated }));
        } catch { }

        try {
            await fetch(`/api/v1/extractor-advanced/bookmarks/${bmId}`, { method: 'DELETE' });
        } catch { }
    };

    const handleApplyBookmarkScope = (bm) => {
        const rawStart = bm.startTime || bm.start;
        const rawEnd = bm.endTime || bm.end;
        if (!rawStart || !rawEnd) return;

        const sDate = rawStart.substring(0, 10);
        const sTime = rawStart.includes('T') ? rawStart.split('T')[1].substring(0, 8) : '00:00:00';
        const eDate = rawEnd.substring(0, 10);
        const eTime = rawEnd.includes('T') ? rawEnd.split('T')[1].substring(0, 8) : '23:59:59';

        setStartDateStr(sDate);
        setEndDateStr(eDate);
        setStartTimeStr(sTime);
        setEndTimeStr(eTime);
        setCalendarViewDate(new Date(sDate));
        setIsBookmarksDrawerOpen(false);
    };

    const handleFullLoadBookmark = (bm) => {
        if (onLoadBookmark) {
            onLoadBookmark(bm);
            if (onClose) onClose();
        } else {
            handleApplyBookmarkScope(bm);
        }
    };

    const startAmbiguity = useMemo(() => {
        if (timeMode === 'UTC' || !startDateTime.includes('T')) return { isAmbiguous: false };
        const [d, t] = startDateTime.split('T');
        return checkTimeAmbiguity(d, t);
    }, [startDateTime, timeMode]);

    const endAmbiguity = useMemo(() => {
        if (timeMode === 'UTC' || !endDateTime.includes('T')) return { isAmbiguous: false };
        const [d, t] = endDateTime.split('T');
        return checkTimeAmbiguity(d, t);
    }, [endDateTime, timeMode]);

    const resolvedEpochs = useMemo(() => {
        if (!startDateTime || !endDateTime) return null;

        let startEpoch;
        let endEpoch;

        if (timeMode === 'UTC') {
            const s = parseInputDateTime(startDateTime, 'UTC');
            const e = parseInputDateTime(endDateTime, 'UTC');
            if (!s || !e) return null;
            startEpoch = s.getTime();
            endEpoch = e.getTime();
        } else {
            if (startAmbiguity.isAmbiguous) {
                startEpoch = startOccurrence === 1 ? startAmbiguity.firstOccurrenceEpoch : startAmbiguity.secondOccurrenceEpoch;
            } else {
                const dt = parseInputDateTime(startDateTime, 'LOCAL');
                if (!dt) return null;
                const { offsetMin } = getLocalOffsetMinutes(dt.getTime());
                startEpoch = dt.getTime() - (offsetMin * 60000);
            }

            if (endAmbiguity.isAmbiguous) {
                endEpoch = endOccurrence === 1 ? endAmbiguity.firstOccurrenceEpoch : endAmbiguity.secondOccurrenceEpoch;
            } else {
                const dt = parseInputDateTime(endDateTime, 'LOCAL');
                if (!dt) return null;
                const { offsetMin } = getLocalOffsetMinutes(dt.getTime());
                endEpoch = dt.getTime() - (offsetMin * 60000);
            }
        }

        return { startEpoch, endEpoch, durationMs: endEpoch - startEpoch };
    }, [startDateTime, endDateTime, timeMode, startAmbiguity, endAmbiguity, startOccurrence, endOccurrence]);

    const transitionsInScope = useMemo(() => {
        if (!resolvedEpochs || resolvedEpochs.durationMs <= 0) return [];
        return findTransitionsInRange(resolvedEpochs.startEpoch, resolvedEpochs.endEpoch);
    }, [resolvedEpochs]);

    const currentDurationFormatted = useMemo(() => {
        if (!resolvedEpochs || resolvedEpochs.durationMs <= 0) return '0h';
        const totalHours = resolvedEpochs.durationMs / (1000 * 60 * 60);
        if (totalHours >= 24) {
            const days = (totalHours / 24).toFixed(1);
            return `${days}d (${totalHours.toFixed(0)}h)`;
        }
        return `${totalHours.toFixed(1)}h`;
    }, [resolvedEpochs]);

    const calendarDays = useMemo(() => {
        const year = calendarViewDate.getFullYear();
        const month = calendarViewDate.getMonth();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const cells = [];
        for (let i = 0; i < firstDayOfMonth; i++) cells.push(null);
        for (let d = 1; d <= daysInMonth; d++) cells.push(`${year}-${pad(month + 1)}-${pad(d)}`);
        return cells;
    }, [calendarViewDate]);

    const handleCalendarDayClick = (dateStr) => {
        if (!dateStr) return;
        setActivePreset(null);

        if (!startDateStr || (startDateStr && endDateStr)) {
            setStartDateStr(dateStr);
            setEndDateStr('');
        } else if (startDateStr && !endDateStr) {
            if (dateStr < startDateStr) {
                setStartDateStr(dateStr);
                setEndDateStr('');
            } else {
                const s = new Date(startDateStr).getTime();
                const e = new Date(dateStr).getTime();
                if (e - s > MAX_WINDOW_MS) {
                    alert('The selected scope exceeds 7 days (168 hours). Capped to 7 days.');
                    const capped = new Date(s + MAX_WINDOW_MS);
                    setEndDateStr(`${capped.getFullYear()}-${pad(capped.getMonth() + 1)}-${pad(capped.getDate())}`);
                } else {
                    setEndDateStr(dateStr);
                }
            }
        }
    };

    const handleQuickPreset = (durationMs, presetLabel) => {
        setActivePreset(presetLabel);
        const now = new Date();
        const sObj = new Date(now.getTime() - durationMs);
        const isUtc = timeMode === 'UTC';

        const sy = isUtc ? sObj.getUTCFullYear() : sObj.getFullYear();
        const sm = isUtc ? sObj.getUTCMonth() + 1 : sObj.getMonth() + 1;
        const sd = isUtc ? sObj.getUTCDate() : sObj.getDate();
        const sh = isUtc ? sObj.getUTCHours() : sObj.getHours();
        const sMin = isUtc ? sObj.getUTCMinutes() : sObj.getMinutes();
        const ss = isUtc ? sObj.getUTCSeconds() : sObj.getSeconds();

        const ey = isUtc ? now.getUTCFullYear() : now.getFullYear();
        const em = isUtc ? now.getUTCMonth() + 1 : now.getMonth() + 1;
        const ed = isUtc ? now.getUTCDate() : now.getDate();
        const eh = isUtc ? now.getUTCHours() : now.getHours();
        const eMin = isUtc ? now.getUTCMinutes() : now.getMinutes();
        const es = isUtc ? now.getUTCSeconds() : now.getSeconds();

        setStartDateStr(`${sy}-${pad(sm)}-${pad(sd)}`);
        setEndDateStr(`${ey}-${pad(em)}-${pad(ed)}`);
        setStartTimeStr(`${pad(sh)}:${pad(sMin)}:${pad(ss)}`);
        setEndTimeStr(`${pad(eh)}:${pad(eMin)}:${pad(es)}`);
    };

    const handleApply = () => {
        ensureSameDayIfEmpty();

        if (!resolvedEpochs || isNaN(resolvedEpochs.startEpoch) || isNaN(resolvedEpochs.endEpoch)) {
            alert('Invalid date or time values');
            return;
        }

        if (resolvedEpochs.durationMs <= 0) {
            alert('End point must be strictly after the start point.');
            return;
        }

        if (resolvedEpochs.durationMs > MAX_WINDOW_MS) {
            alert('The selected scope cannot exceed 7 days (168 hours).');
            return;
        }

        if (onApplyRange) {
            onApplyRange({
                start: startDateTime,
                end: endDateTime,
                startEpochMs: resolvedEpochs.startEpoch,
                endEpochMs: resolvedEpochs.endEpoch,
                durationMs: resolvedEpochs.durationMs,
                timeMode
            });
        }
        if (onClose) onClose();
    };

    const filteredBookmarks = useMemo(() => {
        if (!bookmarkSearchTerm.trim()) return bookmarks;
        const q = bookmarkSearchTerm.toLowerCase();
        return bookmarks.filter(b =>
            (b.title || b.name || '').toLowerCase().includes(q) ||
            (b.startTime || '').includes(q)
        );
    }, [bookmarks, bookmarkSearchTerm]);

    if (!isOpen) return null;
    const isUtc = timeMode === 'UTC';

    return createPortal(
        <div className="modal-backdrop-overlay" dir="ltr">
            <div className="master-time-modal-card tactical-dual-clocks" onClick={(e) => e.stopPropagation()}>

                {/* כותרת עליונה */}
                <div className="modal-header">
                    <div className="title-block">
                        <span className="modal-title">MISSION RECORDING SCOPE</span>

                        <div className="header-actions-row">
                            <div className={`timezone-badge ${isUtc ? 'utc' : 'local'}`}>
                                <span className="pulse-indicator" />
                                <span className="badge-text">
                                    TIMEZONE: <strong>{isUtc ? 'UTC (ZULU)' : 'LOCAL (CONFIGURED)'}</strong>
                                </span>
                            </div>

                            {onTimeModeChange && (
                                <div className="modal-mode-toggle">
                                    <button
                                        type="button"
                                        className={`mode-pill ${!isUtc ? 'active' : ''}`}
                                        onClick={() => onTimeModeChange('LOCAL')}
                                    >
                                        LOCAL
                                    </button>
                                    <button
                                        type="button"
                                        className={`mode-pill ${isUtc ? 'active' : ''}`}
                                        onClick={() => onTimeModeChange('UTC')}
                                    >
                                        UTC
                                    </button>
                                </div>
                            )}

                            <button
                                type="button"
                                className={`btn-bookmarks-pill ${isBookmarksDrawerOpen ? 'active' : ''}`}
                                onClick={() => setIsBookmarksDrawerOpen(!isBookmarksDrawerOpen)}
                                title="Toggle Mission Bookmarks"
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
                                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                                </svg>
                                <span>BOOKMARKS</span>
                                <span className="bm-count-tag">{bookmarks.length}</span>
                            </button>
                        </div>
                    </div>
                    <button className="btn-modal-close" onClick={onClose} title="Close">✕</button>
                </div>

                {transitionsInScope.length > 0 && (
                    <div className="dst-notice-banner">
                        <span className="banner-icon">⚡</span>
                        <div className="banner-text">
                            <strong>DAYLIGHT SAVING TRANSITION DETECTED IN THIS SCOPE:</strong>
                            <span>{transitionsInScope.map(t => `${t.description} (${t.labelBefore} ➔ ${t.labelAfter})`).join(', ')}</span>
                        </div>
                    </div>
                )}

                {/* פריסטים מהירים */}
                <div className="quick-presets-grid">
                    <button
                        className={`btn-preset ${activePreset === '7d' ? 'active' : ''}`}
                        onClick={() => handleQuickPreset(7 * 24 * 3600 * 1000, '7d')}
                    >
                        7d Week Max <span className="dot" />
                    </button>
                    <button
                        className={`btn-preset ${activePreset === '3d' ? 'active' : ''}`}
                        onClick={() => handleQuickPreset(3 * 24 * 3600 * 1000, '3d')}
                    >
                        3d Block <span className="dot" />
                    </button>
                    <button
                        className={`btn-preset ${activePreset === '24h' ? 'active' : ''}`}
                        onClick={() => handleQuickPreset(24 * 3600 * 1000, '24h')}
                    >
                        24h Day <span className="dot" />
                    </button>
                    <button
                        className={`btn-preset ${activePreset === '8h' ? 'active' : ''}`}
                        onClick={() => handleQuickPreset(8 * 3600 * 1000, '8h')}
                    >
                        8h Shift <span className="dot" />
                    </button>
                </div>

                {/* מגירת סימניות */}
                {isBookmarksDrawerOpen && (
                    <div className="modal-bookmarks-shelf-drawer">
                        <div className="drawer-shelf-header">
                            <div className="search-box">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13">
                                    <circle cx="11" cy="11" r="8" />
                                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Filter saved mission bookmarks..."
                                    value={bookmarkSearchTerm}
                                    onChange={(e) => setBookmarkSearchTerm(e.target.value)}
                                />
                            </div>
                            <span className="total-hint">{filteredBookmarks.length} saved</span>
                        </div>

                        <div className="shelf-bookmarks-scroll">
                            {filteredBookmarks.length === 0 ? (
                                <div className="shelf-empty-state">No saved mission bookmarks found</div>
                            ) : (
                                filteredBookmarks.map(bm => {
                                    const bId = bm.id || bm.startTime;
                                    const title = bm.title || bm.name || 'Untitled Mission';
                                    const sStr = (bm.startTime || '').replace('T', ' ');
                                    const eStr = (bm.endTime || '').replace('T', ' ');

                                    return (
                                        <div key={bId} className="shelf-bookmark-card" onClick={() => handleApplyBookmarkScope(bm)}>
                                            <div className="card-info-col">
                                                <div className="card-title-row">
                                                    <span className="bm-pin-icon">🔖</span>
                                                    <strong className="bm-title">{title}</strong>
                                                    {bm.cutStationName && (
                                                        <span className="bm-focus-pill">🎯 {bm.cutStationName}</span>
                                                    )}
                                                    {bm.stationIds?.length > 0 && (
                                                        <span className="bm-stations-pill">{bm.stationIds.length} STATIONS</span>
                                                    )}
                                                </div>
                                                <span className="bm-dates-range">{sStr} ➔ {eStr}</span>
                                            </div>

                                            <div className="card-actions-col">
                                                <button
                                                    type="button"
                                                    className="btn-bm-action set-range"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleApplyBookmarkScope(bm);
                                                    }}
                                                >
                                                    SET SCOPE
                                                </button>
                                                {onLoadBookmark && (
                                                    <button
                                                        type="button"
                                                        className="btn-bm-action load-full"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleFullLoadBookmark(bm);
                                                        }}
                                                    >
                                                        LOAD ALL
                                                    </button>
                                                )}
                                                <button
                                                    type="button"
                                                    className="btn-bm-delete"
                                                    onClick={(e) => handleDeleteBookmark(bId, e)}
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                )}

                {/* מתחם הבחירה האחוד: לוח שנה בצד שמאל + שני שעונים במקביל בצד ימין */}
                <div className="tactical-pickers-split dual-clocks-mode">

                    {/* צד שמאל: לוח שנה עם סימוני Bookmarks */}
                    <div className="picker-panel calendar-panel">
                        <div className="panel-top-nav">
                            <span className="nav-title">
                                {calendarViewDate.toLocaleString('en-US', { month: 'long', year: 'numeric' }).toUpperCase()}
                            </span>
                            <div className="nav-arrows">
                                <button type="button" onClick={() => setCalendarViewDate(p => new Date(p.getFullYear(), p.getMonth() - 1, 1))} className="btn-nav">◀</button>
                                <button type="button" onClick={() => setCalendarViewDate(p => new Date(p.getFullYear(), p.getMonth() + 1, 1))} className="btn-nav">▶</button>
                            </div>
                        </div>

                        <div className="calendar-week-headers">
                            <span>SU</span><span>MO</span><span>TU</span><span>WE</span><span>TH</span><span>FR</span><span>SA</span>
                        </div>

                        <div className="calendar-grid-days">
                            {calendarDays.map((dateStr, idx) => {
                                if (!dateStr) return <div key={`empty-${idx}`} className="cal-cell empty" />;

                                const dayNum = parseInt(dateStr.split('-')[2], 10);
                                const isStart = dateStr === startDateStr;
                                const isEnd = dateStr === (endDateStr || startDateStr);
                                const effectiveEnd = endDateStr || hoverDateStr;
                                const isInRange = startDateStr && effectiveEnd && dateStr > startDateStr && dateStr < effectiveEnd;

                                const dayBms = bookmarksByDateMap[dateStr];
                                const hasBookmarks = Boolean(dayBms && dayBms.length > 0);

                                return (
                                    <div
                                        key={dateStr}
                                        className={`cal-cell ${isStart ? 'start-edge' : ''} ${isEnd ? 'end-edge' : ''} ${isInRange ? 'in-range' : ''} ${hasBookmarks ? 'has-bookmark' : ''}`}
                                        onClick={() => handleCalendarDayClick(dateStr)}
                                        onMouseEnter={() => !endDateStr && startDateStr && setHoverDateStr(dateStr)}
                                        onMouseLeave={() => setHoverDateStr(null)}
                                        title={hasBookmarks ? `${dayBms.length} Bookmark(s) on this date` : undefined}
                                    >
                                        <span className="cell-num">{dayNum}</span>

                                        {hasBookmarks && (
                                            <span
                                                className="cal-cell-bookmark-ribbon"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setIsBookmarksDrawerOpen(true);
                                                    setBookmarkSearchTerm(dateStr);
                                                }}
                                            >
                                                <svg viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                                                </svg>
                                                {dayBms.length > 1 && <span className="ribbon-count">{dayBms.length}</span>}
                                            </span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="range-status-footer">
                            <div className="point-chip start">
                                <span className="lbl">FROM:</span>
                                <strong>{startDateStr || 'SELECT'}</strong>
                            </div>
                            <span className="arrow-sep">➔</span>
                            <div className="point-chip end">
                                <span className="lbl">TO:</span>
                                <strong>{endDateStr || startDateStr || '--'}</strong>
                            </div>
                        </div>
                    </div>

                    {/* 💡 צד ימין: שני שעונים במקביל (שעון התחלה + שעון סיום) */}
                    <div className="picker-panel dual-clocks-wrapper" onPointerDown={ensureSameDayIfEmpty}>

                        {/* שעון 1: התחלה (CYAN) */}
                        <div className="single-clock-box start-clock">
                            <Tactical24HClockPicker
                                label="START TIME (FROM)"
                                value={startTimeStr}
                                onChange={(val) => {
                                    ensureSameDayIfEmpty();
                                    setStartTimeStr(val);
                                    setActivePreset(null);
                                }}
                                accent="cyan"
                                showSeconds={true}
                            />
                        </div>

                        {/* שעון 2: סיום (AMBER) */}
                        <div className="single-clock-box end-clock">
                            <Tactical24HClockPicker
                                label="END TIME (TO)"
                                value={endTimeStr}
                                onChange={(val) => {
                                    ensureSameDayIfEmpty();
                                    setEndTimeStr(val);
                                    setActivePreset(null);
                                }}
                                accent="amber"
                                showSeconds={true}
                            />
                        </div>
                    </div>
                </div>

                {/* פתרון עמימות DST */}
                {(startAmbiguity.isAmbiguous || endAmbiguity.isAmbiguous) && (
                    <div className="ambiguity-strip-banner">
                        {startAmbiguity.isAmbiguous && (
                            <div className="ambiguity-box">
                                <span className="amb-title">START HOUR ({startAmbiguity.transition.labelBefore} / {startAmbiguity.transition.labelAfter}):</span>
                                <div className="amb-btns">
                                    <button
                                        type="button"
                                        className={startOccurrence === 1 ? 'active' : ''}
                                        onClick={() => setStartOccurrence(1)}
                                    >
                                        1st Occurrence ({startAmbiguity.transition.labelBefore})
                                    </button>
                                    <button
                                        type="button"
                                        className={startOccurrence === 2 ? 'active' : ''}
                                        onClick={() => setStartOccurrence(2)}
                                    >
                                        2nd Occurrence ({startAmbiguity.transition.labelAfter})
                                    </button>
                                </div>
                            </div>
                        )}
                        {endAmbiguity.isAmbiguous && (
                            <div className="ambiguity-box">
                                <span className="amb-title">END HOUR ({endAmbiguity.transition.labelBefore} / {endAmbiguity.transition.labelAfter}):</span>
                                <div className="amb-btns">
                                    <button
                                        type="button"
                                        className={endOccurrence === 1 ? 'active' : ''}
                                        onClick={() => setEndOccurrence(1)}
                                    >
                                        1st Occurrence ({endAmbiguity.transition.labelBefore})
                                    </button>
                                    <button
                                        type="button"
                                        className={endOccurrence === 2 ? 'active' : ''}
                                        onClick={() => setEndOccurrence(2)}
                                    >
                                        2nd Occurrence ({endAmbiguity.transition.labelAfter})
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <div className="range-scope-summary-pill">
                    <span className="summary-label">SELECTED WINDOW:</span>
                    <strong className="summary-value" style={{ color: resolvedEpochs && resolvedEpochs.durationMs > MAX_WINDOW_MS ? '#f43f5e' : '#22d3ee' }}>
                        {currentDurationFormatted}
                    </strong>
                    <span className="summary-cap">
                        {transitionsInScope.length > 0 ? '(INCLUDES CLOCK SHIFT)' : '/ 7 DAYS MAXIMUM'}
                    </span>
                </div>

                <div className="modal-footer-actions">
                    <button className="btn-action-cancel" onClick={onClose}>Cancel</button>
                    <button className="btn-action-load" onClick={handleApply}>APPLY SCOPE</button>
                </div>
            </div>
        </div>,
        document.body
    );
}