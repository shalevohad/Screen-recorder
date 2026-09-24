import React, { useState, useMemo } from 'react';
import './JobsQueue.scss';

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

export default function JobsQueue({ jobs, onDownloadJob, onDismissJob, onClearCompleted }) {
    const [tab, setTab] = useState('ALL');

    const activeJobs = jobs.filter(j => j.status === 'Processing' || j.status === 'Queued');
    const completedJobs = jobs.filter(j => j.isCompleted);

    const filtered = useMemo(() => {
        if (tab === 'ACTIVE') return activeJobs;
        if (tab === 'DONE') return completedJobs;
        return jobs;
    }, [jobs, tab, activeJobs, completedJobs]);

    if (!jobs || jobs.length === 0) return null;

    return (
        <div className="jobs-multi-card">
            <div className="jobs-header-row">
                <div className="header-left-wrap">
                    <span className="title">BACKGROUND JOBS QUEUE ({jobs.length})</span>
                    <div className="jobs-tabs">
                        <button className={`tab-btn ${tab === 'ALL' ? 'active' : ''}`} onClick={() => setTab('ALL')}>
                            ALL ({jobs.length})
                        </button>
                        <button className={`tab-btn ${tab === 'ACTIVE' ? 'active' : ''}`} onClick={() => setTab('ACTIVE')}>
                            RUNNING ({activeJobs.length})
                        </button>
                        <button className={`tab-btn ${tab === 'DONE' ? 'active' : ''}`} onClick={() => setTab('DONE')}>
                            READY ({completedJobs.length})
                        </button>
                    </div>
                </div>

                {completedJobs.length > 0 && (
                    <button className="btn-clean-done" onClick={onClearCompleted}>
                        CLEAR COMPLETED
                    </button>
                )}
            </div>

            <div className="jobs-scroll-list">
                {filtered.map(job => (
                    <div key={job.jobId} className={`job-row ${job.status.toLowerCase()}`}>
                        <div className="job-meta-cell">
                            <span className={`status-beacon ${job.status.toLowerCase()}`} />
                            <span className="job-name" title={job.fileName}>{job.fileName}</span>
                        </div>

                        {(job.status === 'Processing' || job.status === 'Queued') ? (
                            <div className="job-active-cell">
                                <div className="mini-rail">
                                    <div className="mini-fill" style={{ width: `${job.progressPercent}%` }} />
                                </div>
                                <div className="telemetry-readout">
                                    <span>{job.progressPercent}%</span>
                                    <span className="spd">{job.speedMBps} MB/s</span>
                                    <span className="eta">ETA -{formatSecondsToEta(job.etaSeconds)}</span>
                                </div>
                            </div>
                        ) : (
                            <div className="job-done-cell">
                                {job.isCompleted ? (
                                    <button className="btn-download-pill" onClick={() => onDownloadJob(job.jobId, job.fileName)}>
                                        ⬇ DOWNLOAD ({formatSize(job.fileSizeBytes)})
                                    </button>
                                ) : (
                                    <span className="error-lbl">FAILED</span>
                                )}
                            </div>
                        )}

                        <button className="btn-close-job" onClick={(e) => onDismissJob(job.jobId, e)} title="Dismiss task">
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}