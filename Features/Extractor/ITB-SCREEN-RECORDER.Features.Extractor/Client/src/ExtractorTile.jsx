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

export default function ExtractorTile({
    defaultWindowHours = 24,
    renderExtraHeaderActions,
    renderExtraControls
}) {
    // 1. הגדרות תצוגת זמן (Local מול UTC)
    const [timeMode, setTimeMode] = useState('LOCAL'); // 'LOCAL' | 'UTC'
    const [startEpoch, setStartEpoch] = useState(() => Date.now() - defaultWindowHours * 60 * 60 * 1000);
    const [endEpoch, setEndEpoch] = useState(() => Date.now());

    // 2. עמדות מוקלטות ותצוגה מקדימה
    const [availableHosts, setAvailableHosts] = useState([]);
    const [selectedHosts, setSelectedHosts] = useState([]);
    const [preview, setPreview] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    // 3. סנכרון תור משימות הרקע (מול ה-Daemon הגלובלי)
    const [activeJobsCount, setActiveJobsCount] = useState(0);
    const [readyJobsCount, setReadyJobsCount] = useState(0);
    const [isSubmittingJob, setIsSubmittingJob] = useState(false);

    const isUtc = timeMode === 'UTC';

    // משיכת סטטוס ראשונית והאזנה לעדכונים מה-Daemon הגלובלי
    useEffect(() => {
        const syncJobsCount = (jobsList) => {
            if (!Array.isArray(jobsList)) return;
            const active = jobsList.filter(j => j.status === 'Processing' || j.status === 'Queued').length;
            const ready = jobsList.filter(j => j.isCompleted).length;
            setActiveJobsCount(active);
            setReadyJobsCount(ready);
        };

        // משיכה קלה בעלייה
        fetch('/api/v1/extractor/jobs')
            .then(res => (res.ok ? res.json() : []))
            .then(syncJobsCount)
            .catch(() => { });

        // האזנה לאירוע גלובלי המשודר מה-ExportJobMonitor
        const handleJobsUpdated = (e) => syncJobsCount(e.detail || []);
        window.addEventListener('export-jobs-updated', handleJobsUpdated);

        return () => window.removeEventListener('export-jobs-updated', handleJobsUpdated);
    }, []);

    // סריקת הקלטות בטווח הזמנים המבוקש
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

    // שיגור משימת אריזה ברקע ופתיחת מגירת הניטור
    const triggerExport = async () => {
        if (selectedHosts.length === 0) return;
        setIsSubmittingJob(true);

        try {
            const res = await fetch('/api/v1/extractor/jobs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    startTimeUtc: new Date(startEpoch).toISOString(),
                    endTimeUtc: new Date(endEpoch).toISOString(),
                    hostnames: selectedHosts
                })
            });

            if (!res.ok) throw new Error('Failed to enqueue export task');

            // פתיחת המגירה הימנית מיד לצפייה במד ההתקדמות וה-Streaming
            window.dispatchEvent(new CustomEvent('open-export-monitor'));
        } catch (err) {
            alert('Export Error: ' + err.message);
        } finally {
            setIsSubmittingJob(false);
        }
    };

    // חישובי עמדות, גדלים ופערי רציפות (Gaps)
    const activeStations = preview?.stations?.filter(s => selectedHosts.includes(s.hostname)) || [];
    const totalChunks = activeStations.reduce((sum, s) => sum + s.chunkCount, 0);
    const totalBytes = activeStations.reduce((sum, s) => sum + s.totalSizeBytes, 0);
    const hasAnyGaps = activeStations.some(s => s.hasTimeGaps);
    const totalGaps = activeStations.reduce((sum, s) => sum + (s.gaps?.length || 0), 0);
    const allGaps = activeStations.flatMap(s => s.gaps.map(g => ({ ...g, hostname: s.hostname })));

    return (
        <div className="extractor-tile">
            {/* Header: כולל Local/UTC ואינדיקציה כפולה למשימות Streaming ומוכנות */}
            <ExtractorHeader
                timeMode={timeMode}
                onToggleTimeMode={setTimeMode}
                activeJobsCount={activeJobsCount}
                readyJobsCount={readyJobsCount}
                selectedCount={selectedHosts.length}
                totalCount={availableHosts.length}
            />

            {/* נקודת הרחבה להורשה (לשימוש Advance או תוספים עתידיים) */}
            {renderExtraHeaderActions && renderExtraHeaderActions()}

            <div className="tile-body">
                {/* סרגל בחירת חלון הזמן וכפתור סריקה */}
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

                {/* מאגר עמדות מרווח (רשת עמדות, סינונים ובחירה מרובה) */}
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

                {/* נקודת הרחבה להזרקת פקדים ייעודיים של מודולים יורשים */}
                {renderExtraControls && renderExtraControls({ selectedHosts, preview })}

                {/* בר טלמטריה ורציפות מרכזית */}
                <TelemetryBar
                    totalChunks={totalChunks}
                    totalBytes={totalBytes}
                    totalGaps={totalGaps}
                    hasAnyGaps={hasAnyGaps}
                />

                {/* טבלת פערי זמן (Gaps > 1s) */}
                <GapsTable gaps={allGaps} timeMode={timeMode} />
            </div>

            {/* כפתור הפעולה הראשי (CTA) */}
            <div className="tile-footer">
                <button
                    className="btn-cta-export"
                    onClick={triggerExport}
                    disabled={isSubmittingJob || selectedHosts.length === 0 || totalChunks === 0}
                >
                    {isSubmittingJob
                        ? 'ENQUEUING EXPORT TASK...'
                        : `DOWNLOAD TAR (BACKGROUND) • ${selectedHosts.length} STATIONS`}
                </button>
            </div>
        </div>
    );
}