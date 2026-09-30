import { useState, useEffect, useCallback } from 'react';

export default function MaintenanceTab() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [triggering, setTriggering] = useState(false);

    const fetchStats = useCallback(async () => {
        try {
            const res = await fetch('/api/v1/catalog/stats');
            if (res.ok) {
                const data = await res.json();
                setStats(data);
            }
        } catch (err) {
            console.error('Failed fetching catalog stats:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchStats();
        }, 0);
        const interval = setInterval(fetchStats, 2000);
        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, [fetchStats]);

    const handleTriggerReindex = async (force = false) => {
        const msg = force
            ? 'Are you sure you want to perform a deep re-audit? This will re-check all files on the storage root.'
            : 'Start background scan for missing recordings?';

        if (!window.confirm(msg)) return;

        setTriggering(true);
        try {
            await fetch(`/api/v1/catalog/reindex?forceFullRecheck=${force}`, { method: 'POST' });
            await fetchStats();
        } catch (err) {
            console.error('Failed triggering reindex:', err);
        } finally {
            setTriggering(false);
        }
    };

    if (loading && !stats) {
        return (
            <div className="settings-loader-box">
                <div className="connection-pulse-container">
                    <div className="pulse-dot-amber"></div>
                    <div className="pulse-ring"></div>
                </div>
                <span className="settings-status">Loading catalog telemetry…</span>
            </div>
        );
    }

    const job = stats?.activeJob;
    const isRunning = job?.isRunning;

    return (
        <fieldset className="settings-fieldset maintenance-fieldset">
            <legend>System Catalog & Storage Maintenance</legend>

            {/* כרטיסי טלמטריה טקטיים (4-Cell Grid) */}
            <div className="catalog-telemetry-grid">
                <div className="telemetry-card">
                    <span className="telemetry-lbl">TOTAL RECORDINGS</span>
                    <strong className="telemetry-val text-cyan">{stats?.totalChunks?.toLocaleString() || 0}</strong>
                </div>
                <div className="telemetry-card">
                    <span className="telemetry-lbl">CATALOG FOOTPRINT</span>
                    <strong className="telemetry-val">{stats?.totalSizeGb || 0} GB</strong>
                </div>
                <div className="telemetry-card">
                    <span className="telemetry-lbl">INDEXED STATIONS</span>
                    <strong className="telemetry-val">{stats?.totalStations || 0}</strong>
                </div>
                <div className="telemetry-card">
                    <span className="telemetry-lbl">OLDEST CHUNK</span>
                    <strong className="telemetry-val date">
                        {stats?.oldestRecordingUtc ? new Date(stats.oldestRecordingUtc).toLocaleDateString() : 'N/A'}
                    </strong>
                </div>
            </div>

            {/* חיווי משימה פעילה (Active Telemetry Micro-Bar) */}
            {isRunning ? (
                <div className="running-job-panel">
                    <div className="job-header">
                        <div className="pulse-indicator">
                            <span className="pulse-dot-cyan"></span>
                            <span className="pulse-ring-cyan"></span>
                        </div>
                        <span className="job-text">Storage Re-indexing in progress: {job?.progressPercent || 0}%</span>
                    </div>
                    <div className="job-track">
                        <div className="job-fill" style={{ width: `${job?.progressPercent || 0}%` }}></div>
                    </div>
                    <div className="job-footer">
                        <span>Scanned: <strong>{job?.totalFilesScanned || 0}</strong> files</span>
                        <span>Added: <strong className="text-cyan">{job?.newlyIndexedCount || 0}</strong></span>
                        {job?.currentTarget && (
                            <span className="station-badge">{job.currentTarget}</span>
                        )}
                    </div>
                </div>
            ) : (
                <div className="catalog-status-idle">
                    <span className="status-dot-emerald"></span>
                    <span>System Catalog Engine Nominal • Database in WAL Sync Mode</span>
                </div>
            )}

            {/* כפתורי פעולה טקטיים */}
            <div className="maintenance-actions-box">
                <div className="action-info">
                    <h4>Delta Storage Indexing</h4>
                    <p>Scans the NetApp UNC & Local Fallback storage for new video files added externally and registers them directly into the SQLite catalog without rescanning existing chunks.</p>
                </div>

                <div className="action-buttons-row">
                    <button
                        type="button"
                        className="btn-maintenance-action primary"
                        disabled={isRunning || triggering}
                        onClick={() => handleTriggerReindex(false)}
                    >
                        {isRunning ? 'Scan In Progress…' : '↻ Scan & Index Missing Files'}
                    </button>

                    <button
                        type="button"
                        className="btn-maintenance-action secondary"
                        disabled={isRunning || triggering}
                        onClick={() => handleTriggerReindex(true)}
                        title="Rescans all storage files regardless of indexed state"
                    >
                        Deep Audit (Full Rescan)
                    </button>
                </div>
            </div>
        </fieldset>
    );
}