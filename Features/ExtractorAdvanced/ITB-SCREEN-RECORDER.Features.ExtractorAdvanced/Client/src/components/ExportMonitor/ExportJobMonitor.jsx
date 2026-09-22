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

    const [isOpen, setIsOpen] = useState(() => {
        try {
            return localStorage.getItem('itb_export_drawer_pinned') === 'true';
        } catch {
            return false;
        }
    });

    const isFetchingRef = useRef(false);

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

    useEffect(() => {
        const handleOpen = () => {
            setIsOpen(true);
            fetchJobs();
        };
        window.addEventListener('open-export-monitor', handleOpen);
        return () => window.removeEventListener('open-export-monitor', handleOpen);
    }, [fetchJobs]);

    useEffect(() => {
        if (!isOpen || isPinned) return;

        const handleOutsideClick = (e) => {
            if (drawerRef.current && !drawerRef.current.contains(e.target) && !e.target.closest('.export-floating-hud')) {
                setIsOpen(false);
            }
        };

        document.addEventListener('pointerdown', handleOutsideClick);
        return () => document.removeEventListener('pointerdown', handleOutsideClick);
    }, [isOpen, isPinned]);

    const activeJobs = jobs.filter(j => j.status === 'Processing' || j.status === 'Queued');
    const readyJobs = jobs.filter(j => j.status === 'Completed' || j.isCompleted);

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

    const formatSize = (bytes) => {
        if (!bytes || bytes <= 0) return '0 B';
        const mb = bytes / (1024 * 1024);
        if (mb >= 1000) return `${(mb / 1024).toFixed(2)} GB`;
        return `${mb.toFixed(1)} MB`;
    };

    if (jobs.length === 0 && !isOpen) return null;

    return createPortal(
        <div className="export-job-monitor-root" dir="ltr">
            {/* כפתור HUD צף */}
            {jobs.length > 0 && !isOpen && (
                <div
                    className={`export-floating-hud ${activeJobs.length > 0 ? 'has-active' : 'all-ready'}`}
                    onClick={() => setIsOpen(true)}
                    title="Open Export Queue"
                >
                    <span className={`beacon-dot ${activeJobs.length > 0 ? 'active' : 'done'}`} />
                    <div className="hud-content">
                        <span className="hud-title">
                            {activeJobs.length > 0 ? `EXPORTS: ${activeJobs.length} PACKAGING` : `${readyJobs.length} ARCHIVE${readyJobs.length > 1 ? 'S' : ''} READY`}
                        </span>
                        <span className={`hud-metric ${activeJobs.length > 0 ? '' : 'ready'}`}>
                            {activeJobs.length > 0 ? `${activeJobs[0].progressPercent}%` : 'DOWNLOAD'}
                        </span>
                    </div>
                </div>
            )}

            {/* מגירת המשימות */}
            {isOpen && (
                <div className="export-drawer-backdrop" onClick={() => !isPinned && setIsOpen(false)}>
                    <aside ref={drawerRef} className={`export-drawer-panel ${isPinned ? 'pinned' : ''}`} onClick={e => e.stopPropagation()}>

                        <div className="drawer-header">
                            <div className="header-left">
                                <span className="header-icon">📦</span>
                                <div>
                                    <h3 className="drawer-title">EXPORT QUEUE</h3>
                                    <span className="drawer-subtitle">{jobs.length} REGISTERED EXPORTS</span>
                                </div>
                            </div>
                            <div className="bar-actions" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <button
                                    type="button"
                                    className={`btn-pin ${isPinned ? 'active' : ''}`}
                                    onClick={handleTogglePin}
                                    title={isPinned ? "Unpin Drawer" : "Pin Drawer"}
                                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '14px', color: isPinned ? '#22d3ee' : '#94a3b8' }}
                                >
                                    📌
                                </button>
                                <button className="btn-close" onClick={handleCloseDrawer}>✕</button>
                            </div>
                        </div>

                        <div className="drawer-cards-scroll">
                            {jobs.map(job => {
                                const isReady = job.status === 'Completed' || job.isCompleted;
                                const isFailed = job.status === 'Failed' || job.isFailed;
                                const isProcessing = job.status === 'Processing' || job.status === 'Queued';
                                const id = job.jobId || job.id;
                                const isDismissing = dismissingIds.has(id);
                                const currentPct = isReady ? 100 : Math.round(job.progressPercent || job.progressPercentage || job.progress || 0);

                                return (
                                    <div
                                        key={id}
                                        className={`export-job-card ${job.status.toLowerCase()} ${job.isBookmarked ? 'is-bookmarked' : ''} ${isDismissing ? 'is-dismissing' : ''}`}
                                    >
                                        <div className="card-header-row">
                                            <div className="identity-group">
                                                <span className={`status-pill ${job.status.toLowerCase()}`}>
                                                    {isReady ? 'READY' : job.status}
                                                </span>
                                                <span className="file-name" title={job.fileName}>
                                                    {job.fileName}
                                                </span>
                                            </div>
                                            <button
                                                className="btn-dismiss-card"
                                                onClick={(e) => handleDismissJob(id, e)}
                                                title="Dismiss export task"
                                            >
                                                ✕
                                            </button>
                                        </div>

                                        {isProcessing && (
                                            <div className="job-progress-section">
                                                <div className="progress-top-line">
                                                    <span className="phase-lbl">{job.statusMessage || 'Processing...'}</span>
                                                    <span className="percent-val">{currentPct}%</span>
                                                </div>
                                                <div className="progress-rail">
                                                    <div className="progress-fill" style={{ width: `${Math.max(3, currentPct)}%` }} />
                                                </div>
                                                <div className="progress-bottom-meta">
                                                    <span className="size-streamed">{formatSize(job.fileSizeBytes)}</span>
                                                    <div className="telemetry-tags">
                                                        <span className="speed">{job.speedMBps > 0 ? `${job.speedMBps.toFixed(1)} MB/s` : 'Analyzing'}</span>
                                                        {job.estimatedSecondsRemaining > 0 && (
                                                            <span className="eta">ETA ~{Math.ceil(job.estimatedSecondsRemaining)}s</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* קוביית נתונים מתקדמת זהה למערכת הבסיסית */}
                                        {isReady && (
                                            <div className="job-ready-meta-box">
                                                <div className="meta-item">
                                                    <span className="lbl">ARCHIVE SIZE</span>
                                                    <span className="val highlight-emerald">{formatSize(job.fileSizeBytes)}</span>
                                                </div>
                                                <div className="meta-item">
                                                    <span className="lbl">DOWNLOADS</span>
                                                    <span className="val">📥 {job.downloadCount || 0}</span>
                                                </div>
                                                <div className="meta-item">
                                                    <span className="lbl">COMPLETED</span>
                                                    <span className="val">{job.completedAtUtc ? new Date(job.completedAtUtc).toLocaleTimeString() : '--:--'}</span>
                                                </div>
                                                <div className="meta-item">
                                                    <span className="lbl">RETENTION</span>
                                                    <span className={`val policy-tag ${job.isBookmarked ? 'pinned' : ''}`}>
                                                        {job.isBookmarked ? '★ PINNED' : '24H PURGE'}
                                                    </span>
                                                </div>
                                            </div>
                                        )}

                                        {/* סרגל פעולות מלא ותואם */}
                                        {isReady && (
                                            <div className="card-actions-bar">
                                                <div className="sub-actions">
                                                    <button
                                                        type="button"
                                                        className={`btn-action-tool ${job.isBookmarked ? 'bookmarked' : ''}`}
                                                        onClick={(e) => handleToggleBookmark(id, e)}
                                                        title={job.isBookmarked ? "Pinned archive (Protected from 24h purge)" : "Pin archive to protect from auto-purge"}
                                                    >
                                                        {job.isBookmarked ? '★ PINNED' : '☆ PIN'}
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="btn-action-tool"
                                                        onClick={(e) => handleCopyUncPath(job, e)}
                                                        title="Copy shared network directory path (UNC)"
                                                    >
                                                        📂 UNC
                                                    </button>
                                                </div>

                                                <button
                                                    type="button"
                                                    className="btn-download-primary"
                                                    onClick={() => handleDownload(job)}
                                                >
                                                    ⬇ DOWNLOAD ARCHIVE
                                                </button>
                                            </div>
                                        )}

                                        {isFailed && (
                                            <div className="job-failed-banner">
                                                <span>FAILED: {job.errorMessage || job.error || 'Export failed'}</span>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </aside>
                </div>
            )}
        </div>,
        document.body
    );
}