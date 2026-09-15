// ==========================================
// File: Features/Extractor/Client/src/ExtractorTile.jsx
// ==========================================
import { useState } from 'react';
import './ExtractorTile.scss';

export default function ExtractorTile({
    defaultWindowHours = 24
}) {
    const [startLocal, setStartLocal] = useState(() => {
        const d = new Date(Date.now() - defaultWindowHours * 60 * 60 * 1000);
        return d.toISOString().slice(0, 16);
    });
    const [endLocal, setEndLocal] = useState(() => {
        return new Date().toISOString().slice(0, 16);
    });

    const [availableHosts, setAvailableHosts] = useState([]);
    const [selectedHosts, setSelectedHosts] = useState([]);
    const [preview, setPreview] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [isStreaming, setIsStreaming] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const executeScan = async () => {
        setIsScanning(true);
        setPreview(null);
        setAvailableHosts([]);
        setHasSearched(true);

        try {
            const startUtc = new Date(startLocal).toISOString();
            const endUtc = new Date(endLocal).toISOString();

            const hostsRes = await fetch(`/api/v1/extractor/recorded-hosts?startUtc=${encodeURIComponent(startUtc)}&endUtc=${encodeURIComponent(endUtc)}`);
            if (!hostsRes.ok) throw new Error("Failed to fetch hosts");

            const hosts = await hostsRes.json();
            setAvailableHosts(hosts);
            setSelectedHosts(hosts);

            if (hosts.length > 0) {
                const previewRes = await fetch('/api/v1/extractor/preview', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        startTimeUtc: startUtc,
                        endTimeUtc: endUtc,
                        hostnames: hosts
                    })
                });

                if (previewRes.ok) {
                    const data = await previewRes.json();
                    setPreview(data);
                }
            }
        } catch (err) {
            console.error("Scan failed:", err);
        } finally {
            setIsScanning(false);
        }
    };

    const toggleHost = (host) => {
        setSelectedHosts(prev =>
            prev.includes(host) ? prev.filter(h => h !== host) : [...prev, host]
        );
    };

    const triggerTarStream = async () => {
        if (selectedHosts.length === 0) return;
        setIsStreaming(true);
        try {
            const res = await fetch('/api/v1/extractor/export', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    startTimeUtc: new Date(startLocal).toISOString(),
                    endTimeUtc: new Date(endLocal).toISOString(),
                    hostnames: selectedHosts
                })
            });

            if (!res.ok) throw new Error(`Export failed: ${res.status}`);

            const blob = await res.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = downloadUrl;
            anchor.download = `Investigation_${startLocal.replace(/[-:]/g, '')}.tar`;
            document.body.appendChild(anchor);
            anchor.click();
            document.body.removeChild(anchor);
            window.URL.revokeObjectURL(downloadUrl);
        } finally {
            setIsStreaming(false);
        }
    };

    const formatSize = (bytes) => {
        if (!bytes) return '0 B';
        const mb = bytes / (1024 * 1024);
        if (mb >= 1000) return `${(mb / 1024).toFixed(2)} GB`;
        return `${mb.toFixed(1)} MB`;
    };

    const activeStations = preview?.stations?.filter(s => selectedHosts.includes(s.hostname)) || [];
    const totalChunks = activeStations.reduce((sum, s) => sum + s.chunkCount, 0);
    const totalBytes = activeStations.reduce((sum, s) => sum + s.totalSizeBytes, 0);
    const hasAnyGaps = activeStations.some(s => s.hasTimeGaps);
    const totalGaps = activeStations.reduce((sum, s) => sum + (s.gaps?.length || 0), 0);

    const allGaps = activeStations.flatMap(s =>
        s.gaps.map(g => ({ ...g, hostname: s.hostname }))
    );

    return (
        <div className="extractor-tile">
            <div className="tile-header">
                <div className="header-left">
                    <span className="status-indicator" />
                    <span className="title">Extractor</span>
                </div>
                <span className="station-badge">
                    {selectedHosts.length} / {availableHosts.length} SELECTED
                </span>
            </div>

            <div className="tile-body">
                <div className="filter-grid">
                    <div className="field-group">
                        <label>Start Window</label>
                        <input
                            type="datetime-local"
                            className="control-input"
                            lang="en-GB"
                            value={startLocal}
                            onChange={(e) => setStartLocal(e.target.value)}
                        />
                    </div>
                    <div className="field-group">
                        <label>End Window</label>
                        <input
                            type="datetime-local"
                            className="control-input"
                            lang="en-GB"
                            value={endLocal}
                            onChange={(e) => setEndLocal(e.target.value)}
                        />
                    </div>
                </div>

                {hasSearched && availableHosts.length === 0 && !isScanning && (
                    <div className="no-hosts-banner">
                        <span>No matching recorded stations found for the specified time range.</span>
                    </div>
                )}

                {availableHosts.length > 0 && (
                    <div className="hosts-selector">
                        <label className="section-label">Available Stations & Continuity</label>
                        <div className="hosts-list">
                            {availableHosts.map(host => {
                                // מציאת נתוני ה-Preview עבור התחנה הספציפית הזו (אם קיימים)
                                const stationMeta = preview?.stations?.find(s => s.hostname === host);
                                const hasGaps = stationMeta?.hasTimeGaps;
                                const gapsCount = stationMeta?.gaps?.length || 0;
                                const isSelected = selectedHosts.includes(host);

                                return (
                                    <div
                                        key={host}
                                        className={`host-card ${isSelected ? 'selected' : ''} ${hasGaps ? 'has-gaps' : 'seamless'}`}
                                        onClick={() => toggleHost(host)}
                                    >
                                        <div className="host-info">
                                            <input
                                                type="checkbox"
                                                checked={isSelected}
                                                onChange={() => { }} // מטופל ע"י ה-div הראשי
                                            />
                                            <span className="host-name">{host}</span>
                                        </div>
                                        {preview && (
                                            <span className={`status-pill ${hasGaps ? 'warn' : 'ok'}`}>
                                                {hasGaps ? `${gapsCount} Gap(s)` : 'Seamless'}
                                            </span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                <div className="telemetry-summary">
                    <div className="metric-box">
                        <span className="label">Total Segments</span>
                        <span className="val">{totalChunks}</span>
                    </div>
                    <div className="metric-box">
                        <span className="label">Est. Archive Size</span>
                        <span className="val highlight">{formatSize(totalBytes)}</span>
                    </div>
                    <div className="metric-box">
                        <span className="label">Total Gaps</span>
                        <span className="val">{totalGaps}</span>
                    </div>
                </div>

                <div className={`continuity-status-banner ${hasAnyGaps ? 'interrupted' : 'healthy'}`}>
                    <span>Continuity Status</span>
                    <span>{hasAnyGaps ? 'Telemetry Gaps Found' : 'Unbroken Stream'}</span>
                </div>

                {hasAnyGaps && (
                    <div className="gaps-micro-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Station</th>
                                    <th>Expected (UTC)</th>
                                    <th>Resumed (UTC)</th>
                                    <th>Length</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allGaps.map((g, idx) => (
                                    <tr key={idx}>
                                        <td>{g.hostname}</td>
                                        <td>{new Date(g.expectedUtc).toLocaleTimeString()}</td>
                                        <td>{new Date(g.actualNextStartUtc).toLocaleTimeString()}</td>
                                        <td className="gap-len">{g.gapDuration?.split?.('.')[0] || g.gapDuration}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <div className="tile-footer">
                <button
                    className="btn btn-preview"
                    onClick={executeScan}
                    disabled={isScanning || isStreaming}
                >
                    {isScanning ? 'Scanning Network...' : 'Scan Range'}
                </button>
                <button
                    className="btn btn-export"
                    onClick={triggerTarStream}
                    disabled={isStreaming || selectedHosts.length === 0 || totalChunks === 0}
                >
                    {isStreaming ? 'Packaging TAR...' : 'Download TAR'}
                </button>
            </div>
        </div>
    );
}