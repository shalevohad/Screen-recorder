// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/ExportMonitor/ExportJobMonitor.jsx
// ==========================================
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import './ExportJobMonitor.scss';

export default function ExportJobMonitor() {
    const [jobs, setJobs] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isPinned, setIsPinned] = useState(false);
    const isFetchingRef = useRef(false);

    // שליפת משימות רציפה (Polling כל 2.5 שניות)
    const fetchJobs = useCallback(async () => {
        if (isFetchingRef.current) return;
        isFetchingRef.current = true;
        try {
            // קריאה לקונטרולר המרכזי של המשימות
            const res = await fetch('/api/v1/extractor/jobs');
            if (res.ok) {
                const data = await res.json();
                const list = Array.isArray(data) ? data : [];
                setJobs(list);

                // שידור עדכון גלובלי לטובת מונים במסכים אחרים
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

    // האזנה לאירוע גלובלי לפתיחת המגירה בעת שיגור ייצוא
    useEffect(() => {
        const handleOpen = () => {
            setIsOpen(true);
            fetchJobs();
        };
        window.addEventListener('open-export-monitor', handleOpen);
        return () => window.removeEventListener('open-export-monitor', handleOpen);
    }, [fetchJobs]);

    const activeJobs = jobs.filter(j => j.status === 'Processing' || j.status === 'Queued');
    const readyJobs = jobs.filter(j => j.status === 'Completed');

    // אם אין משימות פעילות או מוכנות, והמגירה סגורה – אין צורך להציג דבר
    if (jobs.length === 0 && !isOpen) return null;

    const handleToggleBookmark = async (jobId, e) => {
        e.stopPropagation();
        try {
            await fetch(`/api/v1/extractor/jobs/${jobId}/bookmark`, { method: 'POST' });
            fetchJobs();
        } catch (err) {
            console.warn('[ExportJobMonitor] Failed to toggle bookmark:', err);
        }
    };

    const handleDismissJob = async (jobId, e) => {
        e.stopPropagation();
        try {
            await fetch(`/api/v1/extractor/jobs/${jobId}`, { method: 'DELETE' });
            fetchJobs();
        } catch (err) {
            console.warn('[ExportJobMonitor] Failed to dismiss job:', err);
        }
    };

    const handleCopyUncPath = (path, e) => {
        e.stopPropagation();
        if (!path) return;
        navigator.clipboard.writeText(path);
        alert(`UNC Directory Path copied to clipboard:\n${path}`);
    };

    const handleDownload = (job) => {
        const downloadUrl = `/api/v1/extractor/jobs/${job.jobId}/download`;
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = job.fileName || `archive_${job.jobId}.tar`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(fetchJobs, 1000);
    };

    const formatBytes = (bytes) => {
        if (!bytes || bytes <= 0) return '0 MB';
        const gb = bytes / (1024 * 1024 * 1024);
        if (gb >= 1) return `${gb.toFixed(2)} GB`;
        return `${(bytes / (1024 * 1024)).toFixed(0)} MB`;
    };

    const content = (
        <div className="export-job-monitor-root" dir="ltr">
            {/* באדג' צף בפינה הימנית-תחתונה המציג את כמות המשימות */}
            {!isOpen && (activeJobs.length > 0 || readyJobs.length > 0) && (
                <button
                    type="button"
                    className="floating-monitor-pill"
                    onClick={() => setIsOpen(true)}
                    title="Click to inspect background export queue"
                >
                    <div className="pill-pulse-lead">
                        <span className={`monitor-dot ${activeJobs.length > 0 ? 'active' : 'ready'}`} />
                    </div>
                    <div className="pill-text-group">
                        <span className="pill-title">EXPORTS</span>
                        <span className="pill-counter">
                            {activeJobs.length > 0 ? `${activeJobs.length} PACKAGING` : `${readyJobs.length} READY`}
                        </span>
                    </div>
                </button>
            )}

            {/* מגירת המשימות הנפתחת מימין */}
            {isOpen && (
                <div className={`export-monitor-drawer ${isPinned ? 'pinned' : ''}`}>
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
                                onClick={() => setIsPinned(!isPinned)}
                                title={isPinned ? "Unpin Drawer" : "Keep Drawer Pinned"}
                            >
                                📌
                            </button>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => setIsOpen(false)}
                                title="Close"
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

                            return (
                                <div key={job.jobId} className={`monitor-job-card ${job.status.toLowerCase()}`}>
                                    {/* קומה 1: זהות וסטטוס */}
                                    <div className="card-tier-identity">
                                        <div className="status-tag-group">
                                            <span className={`status-pill ${job.status.toLowerCase()}`}>
                                                {job.status.toUpperCase()}
                                            </span>
                                            {isProcessing && (
                                                <span className="pct-badge">{job.progressPercent || 0}%</span>
                                            )}
                                        </div>

                                        <span className="job-filename" title={job.fileName}>
                                            {job.fileName}
                                        </span>

                                        <button
                                            type="button"
                                            className="btn-card-dismiss"
                                            onClick={(e) => handleDismissJob(job.jobId, e)}
                                            title="Delete / Dismiss Task"
                                        >
                                            ✕
                                        </button>
                                    </div>

                                    {/* קומה 2: התקדמות וטלמטריה */}
                                    {isProcessing && (
                                        <div className="card-tier-progress">
                                            <div className="progress-track">
                                                <div
                                                    className="progress-fill"
                                                    style={{ width: `${Math.max(3, job.progressPercent || 0)}%` }}
                                                />
                                            </div>
                                            <div className="telemetry-row">
                                                <span className="speed-tag">
                                                    {job.speedMBps > 0 ? `${job.speedMBps} MB/s` : 'Analyzing Chunks...'}
                                                </span>
                                                <span className="status-msg">{job.statusMessage}</span>
                                            </div>
                                        </div>
                                    )}

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
                                            <span>{job.errorMessage || 'Export process interrupted'}</span>
                                        </div>
                                    )}

                                    {/* קומה 3: פעולות */}
                                    {isReady && (
                                        <div className="card-tier-actions">
                                            <button
                                                type="button"
                                                className={`btn-action-pin ${job.isBookmarked ? 'active' : ''}`}
                                                onClick={(e) => handleToggleBookmark(job.jobId, e)}
                                                title={job.isBookmarked ? "Remove Bookmark" : "Protect from 24h purge"}
                                            >
                                                {job.isBookmarked ? '★ PINNED' : '☆ PIN'}
                                            </button>

                                            {job.networkFolderPath && (
                                                <button
                                                    type="button"
                                                    className="btn-action-unc"
                                                    onClick={(e) => handleCopyUncPath(job.networkFolderPath, e)}
                                                    title="Copy Local UNC Network Directory"
                                                >
                                                    📂 UNC
                                                </button>
                                            )}

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