// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/ExportMonitor/ExportJobMonitor.jsx
// ==========================================
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import './ExportJobMonitor.scss';

export default function ExportJobMonitor({ isGlobalHost = false }) {
    const hasGlobalHost = typeof document !== 'undefined' && !!document.getElementById('itb-global-export-job-monitor-root');
    if (!isGlobalHost && hasGlobalHost) {
        return null;
    }

    const [jobs, setJobs] = useState([]);
    const [dismissingIds, setDismissingIds] = useState(new Set());
    const drawerRef = useRef(null);

    // טעינת מצב Pinned מ-localStorage
    const [isPinned, setIsPinned] = useState(() => {
        try {
            return localStorage.getItem('itb_export_drawer_pinned') === 'true';
        } catch {
            return false;
        }
    });

    // פתיחה אוטומטית רק אם נשמר מצב Pinned
    const [isOpen, setIsOpen] = useState(() => {
        try {
            return localStorage.getItem('itb_export_drawer_pinned') === 'true';
        } catch {
            return false;
        }
    });

    const isFetchingRef = useRef(false);

    // שליפת משימות רציפה מקונטרולר ה-Advanced המעודכן
    const fetchJobs = useCallback(async () => {
        if (isFetchingRef.current) return;
        isFetchingRef.current = true;
        try {
            let res = await fetch('/api/v1/extractor-advanced/jobs');
            if (!res.ok) {
                res = await fetch('/api/v1/extractor/jobs');
            }

            if (res.ok) {
                const data = await res.json();
                const list = Array.isArray(data) ? data : [];
                setJobs(list);
                window.dispatchEvent(new CustomEvent('export-jobs-updated', { detail: list }));
            }
        } catch (err) {
            console.warn('[ExportJobMonitor] Polling error:', err);
        } finally {
            isFetchingRef.current = false;
        }
    }, []);

    useEffect(() => {
        fetchJobs();
        const interval = setInterval(fetchJobs, 2500);
        return () => clearInterval(interval);
    }, [fetchJobs]);

    // פתיחה אוטומטית בעת שיגור משימת ייצוא
    useEffect(() => {
        const handleOpen = () => {
            setIsOpen(true);
            fetchJobs();
        };
        window.addEventListener('open-export-monitor', handleOpen);
        return () => window.removeEventListener('open-export-monitor', handleOpen);
    }, [fetchJobs]);

    // סגירת המגירה בלחיצה בחוץ כאשר היא אינה נעוצה (Pinned)
    useEffect(() => {
        if (!isOpen || isPinned) return;

        const handleOutsideClick = (e) => {
            if (drawerRef.current && !drawerRef.current.contains(e.target) && !e.target.closest('.floating-monitor-pill')) {
                setIsOpen(false);
            }
        };

        document.addEventListener('pointerdown', handleOutsideClick);
        return () => document.removeEventListener('pointerdown', handleOutsideClick);
    }, [isOpen, isPinned]);

    const activeJobs = jobs.filter(j => j.status === 'Processing' || j.status === 'Queued');
    const readyJobs = jobs.filter(j => j.status === 'Completed');

    const handleTogglePin = () => {
        setIsPinned(prev => {
            const next = !prev;
            try {
                localStorage.setItem('itb_export_drawer_pinned', String(next));
            } catch { }
            return next;
        });
    };

    const handleCloseDrawer = () => {
        setIsOpen(false);
        setIsPinned(false);
        try {
            localStorage.setItem('itb_export_drawer_pinned', 'false');
        } catch { }
    };

    // מחיקה עם Fade & Collapse הדרגתי (320ms) וקריאה ל-DismissJob בשרת
    const handleDismissJob = (jobId, e) => {
        e.stopPropagation();
        if (!jobId || dismissingIds.has(jobId)) return;

        setDismissingIds(prev => new Set(prev).add(jobId));

        setTimeout(() => {
            setJobs(prev => {
                const next = prev.filter(j => (j.jobId || j.id) !== jobId);
                window.dispatchEvent(new CustomEvent('export-jobs-updated', { detail: next }));
                return next;
            });
            setDismissingIds(prev => {
                const next = new Set(prev);
                next.delete(jobId);
                return next;
            });
        }, 320);

        fetch(`/api/v1/extractor-advanced/jobs/${jobId}`, { method: 'DELETE' })
            .catch(() => fetch(`/api/v1/extractor/jobs/${jobId}`, { method: 'DELETE' }))
            .catch(err => console.warn('[ExportJobMonitor] Dismiss failed:', err));
    };

    const handleToggleBookmark = async (jobId, e) => {
        e.stopPropagation();
        try {
            await fetch(`/api/v1/extractor-advanced/jobs/${jobId}/bookmark`, { method: 'POST' })
                .catch(() => fetch(`/api/v1/extractor/jobs/${jobId}/bookmark`, { method: 'POST' }));
            fetchJobs();
        } catch (err) {
            console.warn('[ExportJobMonitor] Bookmark failed:', err);
        }
    };

    const handleCopyUncPath = (job, e) => {
        e.stopPropagation();
        const path = job.networkFolderPath || (job.outputFilePath ? job.outputFilePath.substring(0, job.outputFilePath.lastIndexOf('\\')) : '');
        if (!path) return;
        navigator.clipboard.writeText(path);
        alert(`UNC Directory Path copied to clipboard:\n${path}`);
    };

    const handleDownload = (job) => {
        const id = job.jobId || job.id;
        const downloadUrl = `/api/v1/extractor-advanced/jobs/${id}/download`;
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = job.fileName || `archive_${id}.tar`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(fetchJobs, 1000);
    };

    const formatBytes = (bytes) => {
        if (!bytes || bytes <= 0) return '0 MB';
        const gb = bytes / (1024 * 1024 * 1024);
        if (gb >= 1) return `${gb.toFixed(2)} GB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    if (jobs.length === 0 && !isOpen) return null;

    const content = (
        <div className="export-job-monitor-root" dir="ltr">
            {/* Pill צף מרווח עם חיווי רדאר */}
            {!isOpen && (activeJobs.length > 0 || readyJobs.length > 0) && (
                <button
                    type="button"
                    className={`floating-monitor-pill ${activeJobs.length > 0 ? 'is-active' : 'is-ready'}`}
                    onClick={() => setIsOpen(true)}
                    title="Click to inspect background export queue"
                >
                    <div className="pill-status-indicator">
                        <span className={`pulse-beacon ${activeJobs.length > 0 ? 'active' : 'ready'}`} />
                        {activeJobs.length > 0 && <span className="radar-ring" />}
                    </div>

                    <span className="pill-label">EXPORTS</span>

                    <div className={`pill-counter-badge ${activeJobs.length > 0 ? 'active' : 'ready'}`}>
                        {activeJobs.length > 0 ? (
                            <>
                                <span className="counter-num">{activeJobs.length}</span>
                                <span className="counter-text">PACKAGING</span>
                            </>
                        ) : (
                            <>
                                <span className="counter-num">{readyJobs.length}</span>
                                <span className="counter-text">READY</span>
                            </>
                        )}
                    </div>

                    <svg className="pill-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </button>
            )}

            {/* מגירת המשימות */}
            {isOpen && (
                <div ref={drawerRef} className={`export-monitor-drawer ${isPinned ? 'pinned' : ''}`}>
                    <div className="drawer-top-bar">
                        <div className="title-cluster">
                            <span className="dot pulse" />
                            <span className="drawer-heading">EXPORT QUEUE</span>
                            <span className="task-badge">{jobs.length} TASKS</span>
                        </div>

                        <div className="bar-actions">
                            <button
                                type="button"
                                className={`btn-pin ${isPinned ? 'active' : ''}`}
                                onClick={handleTogglePin}
                                title={isPinned ? "Unpin Drawer (Auto-closes when clicking outside)" : "Pin Drawer (Stays open across all tabs)"}
                            >
                                📌
                            </button>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={handleCloseDrawer}
                                title="Close Drawer"
                            >
                                ✕
                            </button>
                        </div>
                    </div>

                    <div className="drawer-job-list">
                        {jobs.map(job => {
                            const isReady = job.status === 'Completed';
                            const isFailed = job.status === 'Failed';
                            const isProcessing = job.status === 'Processing' || job.status === 'Queued';
                            const id = job.jobId || job.id;
                            const isDismissing = dismissingIds.has(id);
                            const currentPct = isReady ? 100 : Math.round(job.progressPercent || job.progressPercentage || job.progress || 0);

                            return (
                                <div
                                    key={id}
                                    className={`monitor-job-card ${job.status.toLowerCase()} ${isDismissing ? 'is-dismissing' : ''}`}
                                >
                                    <div className="card-tier-identity">
                                        <div className="status-tag-group">
                                            <span className={`status-pill ${job.status.toLowerCase()}`}>
                                                {job.status.toUpperCase()}
                                            </span>
                                            {isProcessing && (
                                                <span className="pct-badge">{currentPct}%</span>
                                            )}
                                        </div>

                                        <span className="job-filename" title={job.fileName}>
                                            {job.fileName}
                                        </span>

                                        <button
                                            type="button"
                                            className="btn-card-dismiss"
                                            onClick={(e) => handleDismissJob(id, e)}
                                            title="Delete / Dismiss Task"
                                        >
                                            ✕
                                        </button>
                                    </div>

                                    {isProcessing && (
                                        <div className="card-tier-progress">
                                            <div className="progress-track">
                                                <div
                                                    className="progress-fill"
                                                    style={{ width: `${Math.max(3, currentPct)}%` }}
                                                />
                                            </div>
                                            <div className="telemetry-row">
                                                <span className="speed-tag">
                                                    {job.speedMBps > 0 ? `${job.speedMBps.toFixed(1)} MB/s` : 'Analyzing Chunks...'}
                                                    {job.estimatedSecondsRemaining > 0 && (() => {
                                                        const etaDate = new Date(Date.now() + job.estimatedSecondsRemaining * 1000);
                                                        const timeStr = etaDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                                                        return ` • ~${Math.ceil(job.estimatedSecondsRemaining)}s (${timeStr})`;
                                                    })()}
                                                </span>
                                                <span className="status-msg">{job.statusMessage || 'Packaging archive'}</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* גודל קובץ אמיתי, הורדות וסימנייה */}
                                    {isReady && (
                                        <div className="card-tier-telemetry">
                                            <span className="meta-item size">{formatBytes(job.fileSizeBytes)}</span>
                                            <span className="meta-item dls" title="Total downloads across all workstations">
                                                📥 {job.downloadCount || 0} dls
                                            </span>
                                            <span className={`meta-item policy ${job.isBookmarked ? 'pinned' : ''}`}>
                                                {job.isBookmarked ? '★ PINNED' : '24H PURGE'}
                                            </span>
                                        </div>
                                    )}

                                    {isFailed && (
                                        <div className="card-tier-error">
                                            <span>{job.errorMessage || job.error || 'Export process interrupted'}</span>
                                        </div>
                                    )}

                                    {/* פעולות משימה */}
                                    {isReady && (
                                        <div className="card-tier-actions">
                                            <button
                                                type="button"
                                                className={`btn-action-pin ${job.isBookmarked ? 'active' : ''}`}
                                                onClick={(e) => handleToggleBookmark(id, e)}
                                                title={job.isBookmarked ? "Remove Bookmark" : "Protect from 24h purge"}
                                            >
                                                {job.isBookmarked ? '★ PINNED' : '☆ PIN'}
                                            </button>

                                            <button
                                                type="button"
                                                className="btn-action-unc"
                                                onClick={(e) => handleCopyUncPath(job, e)}
                                                title="Copy Local UNC Network Directory"
                                            >
                                                📂 UNC
                                            </button>

                                            <button
                                                type="button"
                                                className="btn-action-download"
                                                onClick={() => handleDownload(job)}
                                            >
                                                ⬇ DOWNLOAD
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );

    return createPortal(content, document.body);
}