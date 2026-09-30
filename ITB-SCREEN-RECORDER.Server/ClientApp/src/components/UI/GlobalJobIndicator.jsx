import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './GlobalJobIndicator.scss';

export default function GlobalJobIndicator() {
    const [job, setJob] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const checkStatus = async () => {
            try {
                const res = await fetch('/api/v1/catalog/reindex/status');
                if (res.ok) {
                    const data = await res.json();
                    if (isMounted) {
                        if (data.isRunning) {
                            setJob(data);
                        } else if (data.completedAtUtc && (Date.now() - new Date(data.completedAtUtc).getTime()) < 6000) {
                            setJob(data);
                        } else {
                            setJob(null);
                        }
                    }
                }
            } catch (err) {
                // Silently ignore polling network errors
                void err;
            }
        };

        const interval = setInterval(checkStatus, 1500);
        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, []);

    if (!job) return null;

    const isDone = !job.isRunning && job.progressPercent === 100;

    const content = (
        <aside
            className={`global-job-capsule ${isDone ? 'completed' : 'running'} ${isExpanded ? 'expanded' : ''}`}
            dir="ltr"
        >
            <div className="capsule-header" onClick={() => setIsExpanded(p => !p)}>
                <div className="status-indicator">
                    {isDone ? (
                        <span className="dot-success">✓</span>
                    ) : (
                        <div className="pulse-spinner" />
                    )}
                </div>

                <div className="job-meta">
                    <span className="job-title">STORAGE CATALOG SYNC</span>
                    <span className="job-desc">
                        {job.statusMessage || (isDone ? 'Scan Completed' : 'Indexing recordings…')}
                    </span>
                </div>

                <div className="progress-badge">
                    {job.progressPercent || 0}%
                </div>
            </div>

            <div className="capsule-progress-track">
                <div className="progress-fill" style={{ width: `${job.progressPercent || 0}%` }} />
            </div>

            {isExpanded && (
                <div className="capsule-details">
                    <div className="detail-row">
                        <span>Scanned Files:</span>
                        <strong>{job.totalFilesScanned || 0}</strong>
                    </div>
                    <div className="detail-row">
                        <span>New Chunks Added:</span>
                        <strong className="text-cyan">{job.newlyIndexedCount || 0}</strong>
                    </div>
                    {job.currentTarget && (
                        <div className="detail-row">
                            <span>Target Station:</span>
                            <strong className="font-mono">{job.currentTarget}</strong>
                        </div>
                    )}
                </div>
            )}
        </aside>
    );

    return createPortal(content, document.body);
}