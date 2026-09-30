// ==========================================
// File: Client/src/components/ExportMonitor/ExportJobMonitor.jsx
// ==========================================
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import './ExportJobMonitor.scss';

const formatSecondsToEta = (sec) => {
    if (!sec || sec <= 0) return '--:--';
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

const formatSize = (bytes) => {
    if (!bytes) return '0 B';
    const mb = bytes / (1024 * 1024);
    if (mb >= 1000) return `${(mb / 1024).toFixed(2)} GB`;
    return `${mb.toFixed(1)} MB`;
};

export default function ExportJobMonitor({ externalOpen, onCloseExternal }) {
    const [jobs, setJobs] = useState([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [filterTab, setFilterTab] = useState('ALL');
    const pollTimerRef = useRef(null);

    const isOpen = externalOpen !== undefined ? externalOpen : isDrawerOpen;

    const setOpen = (val) => {
        setIsDrawerOpen(val);
        if (!val && onCloseExternal) onCloseExternal();
    };

    const fetchJobs = async () => {
        try {
            const res = await fetch('/api/v1/extractor/jobs');
            if (res.ok) {
                const data = await res.json();
                setJobs(data);
                window.dispatchEvent(new CustomEvent('export-jobs-updated', { detail: data }));
            }
        } catch (err) {
            console.warn('[ExportJobMonitor] Polling failed:', err);
        }
    };

    useEffect(() => {
        fetchJobs();
        pollTimerRef.current = setInterval(fetchJobs, 2500);

        const handleOpenEvent = () => setIsDrawerOpen(true);
        window.addEventListener('open-export-monitor', handleOpenEvent);

        return () => {
            if (pollTimerRef.current) clearInterval(pollTimerRef.current);
            window.removeEventListener('open-export-monitor', handleOpenEvent);
        };
    }, []);

    const activeJobs = useMemo(() => jobs.filter(j => j.status === 'Processing' || j.status === 'Queued'), [jobs]);
    const completedJobs = useMemo(() => jobs.filter(j => j.isCompleted), [jobs]);

    const filteredJobs = useMemo(() => {
        if (filterTab === 'ACTIVE') return activeJobs;
        if (filterTab === 'READY') return completedJobs;
        return jobs;
    }, [jobs, filterTab, activeJobs, completedJobs]);

    const handleDownload = (job) => {
        const url = `/api/v1/extractor/jobs/${job.jobId}/download`;
        const a = document.createElement('a');
        a.href = url;
        a.download = job.fileName || 'Archive_Export.tar';
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(fetchJobs, 1000);
    };

    const handleToggleBookmark = async (jobId, e) => {
        e.stopPropagation();
        try {
            await fetch(`/api/v1/extractor/jobs/${jobId}/bookmark`, { method: 'POST' });
            fetchJobs();
        } catch { }
    };

    const handleCopyPath = (path, e) => {
        e.stopPropagation();
        if (!path) return;
        navigator.clipboard.writeText(path);
        alert(`Shared Network Directory copied:\n${path}`);
    };

    const handleDismiss = async (jobId, e) => {
        e.stopPropagation();
        try {
            await fetch(`/api/v1/extractor/jobs/${jobId}`, { method: 'DELETE' });
            setJobs(prev => prev.filter(j => j.jobId !== jobId));
        } catch { }
    };

    if (jobs.length === 0 && !isOpen) return null;

    return createPortal(
        <div className="export-job-monitor-root">
            {/* כפתור ה-HUD הצף בפינה הימנית-תחתונה */}
            {jobs.length > 0 && (
                <div
                    className={`export-floating-hud ${activeJobs.length > 0 ? 'has-active' : 'all-ready'}`}
                    onClick={() => setOpen(!isOpen)}
                    title="Open Export Queue"
                >
                    {activeJobs.length > 0 ? (
                        <>
                            <span className="beacon-dot active" />
                            <div className="hud-content">
                                <span className="hud-title">EXPORTS: {activeJobs.length} PACKAGING</span>
                                <span className="hud-metric">{activeJobs[0].progressPercent}% • ETA -{formatSecondsToEta(activeJobs[0].etaSeconds)}</span>
                            </div>
                        </>
                    ) : (
                        <>
                            <span className="beacon-dot done" />
                            <div className="hud-content">
                                <span className="hud-title">{completedJobs.length} ARCHIVE{completedJobs.length > 1 ? 'S' : ''} READY</span>
                                <span className="hud-metric ready">DOWNLOAD</span>
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* מגירת המשימות */}
            {isOpen && (
                <div className="export-drawer-backdrop" onClick={() => setOpen(false)}>
                    <aside className="export-drawer-panel" onClick={e => e.stopPropagation()}>

                        {/* Header */}
                        <div className="drawer-header">
                            <div className="header-left">
                                <span className="header-icon">📦</span>
                                <div>
                                    <h3 className="drawer-title">EXPORT QUEUE</h3>
                                    <span className="drawer-subtitle">{jobs.length} REGISTERED EXPORTS</span>
                                </div>
                            </div>
                            <button className="btn-close" onClick={() => setOpen(false)}>✕</button>
                        </div>

                        {/* Toolbar: טאבים לסינון בלבד ללא מחיקה גורפת */}
                        <div className="drawer-toolbar">
                            <div className="tabs-group">
                                <button className={`tab-btn ${filterTab === 'ALL' ? 'active' : ''}`} onClick={() => setFilterTab('ALL')}>
                                    ALL ({jobs.length})
                                </button>
                                <button className={`tab-btn ${filterTab === 'ACTIVE' ? 'active' : ''}`} onClick={() => setFilterTab('ACTIVE')}>
                                    STREAMING ({activeJobs.length})
                                </button>
                                <button className={`tab-btn ${filterTab === 'READY' ? 'active' : ''}`} onClick={() => setFilterTab('READY')}>
                                    READY ({completedJobs.length})
                                </button>
                            </div>
                        </div>

                        {/* רשימת המשימות */}
                        <div className="drawer-cards-scroll">
                            {filteredJobs.length === 0 ? (
                                <div className="empty-queue-notice">
                                    <span>No export tasks found in this view.</span>
                                </div>
                            ) : (
                                filteredJobs.map(job => {
                                    const isBusy = job.status === 'Processing' || job.status === 'Queued';

                                    return (
                                        <div key={job.jobId} className={`export-job-card ${job.status.toLowerCase()} ${job.isBookmarked ? 'is-bookmarked' : ''}`}>

                                            {/* קומה 1: פרטי הקובץ והסרה ידנית בודדת */}
                                            <div className="card-header-row">
                                                <div className="identity-group">
                                                    <span className={`status-pill ${job.status.toLowerCase()}`}>
                                                        {job.isCompleted ? 'READY' : job.status}
                                                    </span>
                                                    <span className="file-name" title={job.fileName}>
                                                        {job.fileName}
                                                    </span>
                                                </div>
                                                <button
                                                    className="btn-dismiss-card"
                                                    onClick={(e) => handleDismiss(job.jobId, e)}
                                                    title="Dismiss export task"
                                                >
                                                    ✕
                                                </button>
                                            </div>

                                            {/* קומה 2 (Streaming): אחוזים בולטים + מד התקדמות */}
                                            {isBusy && (
                                                <div className="job-progress-section">
                                                    <div className="progress-top-line">
                                                        <span className="phase-lbl">{job.statusMessage}</span>
                                                        <span className="percent-val">{job.progressPercent}%</span>
                                                    </div>
                                                    <div className="progress-rail">
                                                        <div className="progress-fill" style={{ width: `${job.progressPercent}%` }} />
                                                    </div>
                                                    <div className="progress-bottom-meta">
                                                        <span className="size-streamed">{formatSize(job.fileSizeBytes)}</span>
                                                        <div className="telemetry-tags">
                                                            <span className="speed">{job.speedMBps} MB/s</span>
                                                            <span className="eta">ETA -{formatSecondsToEta(job.etaSeconds)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* קומה 2 (Ready): נתוני הארכיון */}
                                            {job.isCompleted && (
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

                                            {/* קומה 3: כפתורי פעולה */}
                                            {job.isCompleted && (
                                                <div className="card-actions-bar">
                                                    <div className="sub-actions">
                                                        <button
                                                            className={`btn-action-tool ${job.isBookmarked ? 'bookmarked' : ''}`}
                                                            onClick={(e) => handleToggleBookmark(job.jobId, e)}
                                                            title={job.isBookmarked ? "Pinned archive (Protected from 24h purge)" : "Pin archive to protect from auto-purge"}
                                                        >
                                                            {job.isBookmarked ? '★ PINNED' : '☆ PIN'}
                                                        </button>

                                                        {job.networkFolderPath && (
                                                            <button
                                                                className="btn-action-tool"
                                                                onClick={(e) => handleCopyPath(job.networkFolderPath, e)}
                                                                title="Copy shared network directory path (UNC)"
                                                            >
                                                                📂 UNC
                                                            </button>
                                                        )}
                                                    </div>

                                                    <button
                                                        className="btn-download-primary"
                                                        onClick={() => handleDownload(job)}
                                                    >
                                                        ⬇ DOWNLOAD ARCHIVE
                                                    </button>
                                                </div>
                                            )}

                                            {job.isFailed && (
                                                <div className="job-failed-banner">
                                                    <span>FAILED: {job.errorMessage || 'Export failed'}</span>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </aside>
                </div>
            )}
        </div>,
        document.body
    );
}