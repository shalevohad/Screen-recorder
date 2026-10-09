// ==========================================
// File: Features/Extractor/Client/src/ExtractorTile.jsx
// ==========================================
import React, { useState, useEffect } from 'react';
import './ExtractorTile.scss';

import ExtractorHeader from './components/ExtractorHeader/ExtractorHeader.jsx';
import TimeRangeBar from './components/TimeRangeBar/TimeRangeBar.jsx';
import StationPool from './components/StationPool/StationPool.jsx';
import TelemetryBar from './components/TelemetryBar/TelemetryBar.jsx';
import GapsTable from './components/GapsTable/GapsTable.jsx';

const epochToInputString = (epochMs, isUtc) => {
    const d = new Date(epochMs);
    if (isUtc) return d.toISOString().slice(0, 16);
    const pad = n => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const inputStringToEpoch = (str, isUtc) => {
    if (!str) return Date.now();
    return isUtc ? Date.parse(str + ':00.000Z') : new Date(str).getTime();
};

// 💡 מודאל בחירת אופן ייצוא המקשים (מוטמע מקומית למניעת שגיאות Bundler)
function ExportOptionsModal({
    isOpen,
    onClose,
    onConfirm,
    title = 'EXPORT CONFIRMATION',
    summaryText = ''
}) {
    const [mode, setMode] = useState('Caption');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleConfirm = async () => {
        setIsSubmitting(true);
        try {
            await onConfirm(mode);
            onClose();
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="itb-export-modal-backdrop" onClick={onClose}>
            <div className="itb-export-modal-card" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <div className="header-title">
                        <span className="dot" />
                        <h3>{title}</h3>
                    </div>
                    <button type="button" className="btn-close" onClick={onClose}>✕</button>
                </div>

                <div className="modal-body">
                    {summaryText && <div className="summary-banner">{summaryText}</div>}

                    <div className="options-title">SELECT KEYSTROKE PRESENTATION</div>

                    <div className="modes-grid">
                        <label className={`mode-card ${mode === 'Caption' ? 'active' : ''}`}>
                            <input
                                type="radio"
                                name="keystrokeMode"
                                value="Caption"
                                checked={mode === 'Caption'}
                                onChange={() => setMode('Caption')}
                            />
                            <div className="mode-content">
                                <div className="mode-name">SOFT CAPTIONS (RECOMMENDED)</div>
                                <div className="mode-desc">
                                    Embeds a soft subtitle track (mov_text). Toggable in VLC/Players, keeps video pristine and clean.
                                </div>
                            </div>
                        </label>

                        <label className={`mode-card ${mode === 'BurnIn' ? 'active' : ''}`}>
                            <input
                                type="radio"
                                name="keystrokeMode"
                                value="BurnIn"
                                checked={mode === 'BurnIn'}
                                onChange={() => setMode('BurnIn')}
                            />
                            <div className="mode-content">
                                <div className="mode-name">HARD BURN-IN</div>
                                <div className="mode-desc">
                                    Permanently bakes keystrokes directly onto the video pixels for unalterable court evidence.
                                </div>
                            </div>
                        </label>

                        <label className={`mode-card ${mode === 'None' ? 'active' : ''}`}>
                            <input
                                type="radio"
                                name="keystrokeMode"
                                value="None"
                                checked={mode === 'None'}
                                onChange={() => setMode('None')}
                            />
                            <div className="mode-content">
                                <div className="mode-name">NONE (CLEAN VIDEO)</div>
                                <div className="mode-desc">
                                    Export video without any keystroke overlays or subtitle tracks.
                                </div>
                            </div>
                        </label>
                    </div>
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn-cancel" onClick={onClose} disabled={isSubmitting}>
                        CANCEL
                    </button>
                    <button type="button" className="btn-confirm" onClick={handleConfirm} disabled={isSubmitting}>
                        {isSubmitting ? 'PREPARING...' : 'CONFIRM & EXPORT'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function ExtractorTile({
    defaultWindowHours = 24,
    renderExtraHeaderActions,
    renderExtraControls
}) {
    const [timeMode, setTimeMode] = useState('LOCAL');
    const [startEpoch, setStartEpoch] = useState(() => Date.now() - defaultWindowHours * 60 * 60 * 1000);
    const [endEpoch, setEndEpoch] = useState(() => Date.now());

    const [availableHosts, setAvailableHosts] = useState([]);
    const [selectedHosts, setSelectedHosts] = useState([]);
    const [preview, setPreview] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const [activeJobsCount, setActiveJobsCount] = useState(0);
    const [readyJobsCount, setReadyJobsCount] = useState(0);
    const [isSubmittingJob, setIsSubmittingJob] = useState(false);
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);

    const isUtc = timeMode === 'UTC';

    useEffect(() => {
        const syncJobsCount = (jobsList) => {
            if (!Array.isArray(jobsList)) return;
            const active = jobsList.filter(j => j.status === 'Processing' || j.status === 'Queued').length;
            const ready = jobsList.filter(j => j.isCompleted).length;
            setActiveJobsCount(active);
            setReadyJobsCount(ready);
        };

        fetch('/api/v1/extractor/jobs')
            .then(res => (res.ok ? res.json() : []))
            .then(syncJobsCount)
            .catch(() => { });

        const handleJobsUpdated = (e) => syncJobsCount(e.detail || []);
        window.addEventListener('export-jobs-updated', handleJobsUpdated);

        return () => window.removeEventListener('export-jobs-updated', handleJobsUpdated);
    }, []);

    const executeScan = async () => {
        setIsScanning(true);
        setPreview(null);
        setAvailableHosts([]);
        setHasSearched(true);

        try {
            const startUtcIso = new Date(startEpoch).toISOString();
            const endUtcIso = new Date(endEpoch).toISOString();

            const res = await fetch(
                `/api/v1/extractor/recorded-hosts?startUtc=${encodeURIComponent(startUtcIso)}&endUtc=${encodeURIComponent(endUtcIso)}`
            );
            if (!res.ok) throw new Error('Failed to retrieve recorded stations');

            const hosts = await res.json();
            setAvailableHosts(hosts);
            setSelectedHosts(hosts);

            if (hosts.length > 0) {
                const prevRes = await fetch('/api/v1/extractor/preview', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ startTimeUtc: startUtcIso, endTimeUtc: endUtcIso, hostnames: hosts })
                });

                if (prevRes.ok) {
                    setPreview(await prevRes.json());
                }
            }
        } catch (err) {
            console.error('[ExtractorTile] Scan error:', err);
        } finally {
            setIsScanning(false);
        }
    };

    const handleConfirmExport = async (keystrokeMode) => {
        if (selectedHosts.length === 0) return;
        setIsSubmittingJob(true);

        try {
            const res = await fetch('/api/v1/extractor/jobs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    startTimeUtc: new Date(startEpoch).toISOString(),
                    endTimeUtc: new Date(endEpoch).toISOString(),
                    hostnames: selectedHosts,
                    keystrokeMode: keystrokeMode
                })
            });

            if (!res.ok) throw new Error('Failed to enqueue export task');

            window.dispatchEvent(new CustomEvent('open-export-monitor'));
        } catch (err) {
            alert('Export Error: ' + err.message);
        } finally {
            setIsSubmittingJob(false);
        }
    };

    const activeStations = preview?.stations?.filter(s => selectedHosts.includes(s.hostname)) || [];
    const totalChunks = activeStations.reduce((sum, s) => sum + s.chunkCount, 0);
    const totalBytes = activeStations.reduce((sum, s) => sum + s.totalSizeBytes, 0);
    const hasAnyGaps = activeStations.some(s => s.hasTimeGaps);
    const totalGaps = activeStations.reduce((sum, s) => sum + (s.gaps?.length || 0), 0);
    const allGaps = activeStations.flatMap(s => s.gaps.map(g => ({ ...g, hostname: s.hostname })));

    return (
        <div className="extractor-tile">
            <ExtractorHeader
                timeMode={timeMode}
                onToggleTimeMode={setTimeMode}
                activeJobsCount={activeJobsCount}
                readyJobsCount={readyJobsCount}
                selectedCount={selectedHosts.length}
                totalCount={availableHosts.length}
            />

            {renderExtraHeaderActions && renderExtraHeaderActions()}

            <div className="tile-body">
                <TimeRangeBar
                    startString={epochToInputString(startEpoch, isUtc)}
                    endString={epochToInputString(endEpoch, isUtc)}
                    timeMode={timeMode}
                    isScanning={isScanning}
                    isSubmitting={isSubmittingJob}
                    onStartChange={(val) => setStartEpoch(inputStringToEpoch(val, isUtc))}
                    onEndChange={(val) => setEndEpoch(inputStringToEpoch(val, isUtc))}
                    onScan={executeScan}
                />

                {hasSearched && availableHosts.length === 0 && !isScanning && (
                    <div className="no-hosts-banner">
                        <span>⚠️ No recorded station streams found in the requested time range.</span>
                    </div>
                )}

                {availableHosts.length > 0 && (
                    <StationPool
                        availableHosts={availableHosts}
                        selectedHosts={selectedHosts}
                        preview={preview}
                        onToggleHost={(host) =>
                            setSelectedHosts(prev =>
                                prev.includes(host) ? prev.filter(h => h !== host) : [...prev, host]
                            )
                        }
                        onSelectBatch={(batch) =>
                            setSelectedHosts(prev => Array.from(new Set([...prev, ...batch])))
                        }
                        onClearBatch={(batch) =>
                            setSelectedHosts(prev => prev.filter(h => !batch.includes(h)))
                        }
                    />
                )}

                {renderExtraControls && renderExtraControls({ selectedHosts, preview })}

                <TelemetryBar
                    totalChunks={totalChunks}
                    totalBytes={totalBytes}
                    totalGaps={totalGaps}
                    hasAnyGaps={hasAnyGaps}
                />

                <GapsTable gaps={allGaps} timeMode={timeMode} />
            </div>

            <div className="tile-footer">
                <button
                    className="btn-cta-export"
                    onClick={() => setIsExportModalOpen(true)}
                    disabled={isSubmittingJob || selectedHosts.length === 0 || totalChunks === 0}
                >
                    {isSubmittingJob
                        ? 'ENQUEUING EXPORT TASK...'
                        : `DOWNLOAD TAR (BACKGROUND) • ${selectedHosts.length} STATIONS`}
                </button>
            </div>

            <ExportOptionsModal
                isOpen={isExportModalOpen}
                onClose={() => setIsExportModalOpen(false)}
                onConfirm={handleConfirmExport}
                title="BASIC EXTRACTOR - EXPORT TAR"
                summaryText={`Selected Stations: ${selectedHosts.length} | Chunks: ${totalChunks}`}
            />
        </div>
    );
}