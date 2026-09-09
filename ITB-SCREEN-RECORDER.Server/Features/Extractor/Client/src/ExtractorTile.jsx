import { useState, useEffect } from 'react';
import './ExtractorTile.scss';

export default function ExtractorTile({
    activeHost = 'OHAD-DESKTOP',
    defaultWindowHours = 24
}) {
    const [startLocal, setStartLocal] = useState(() => {
        const d = new Date(Date.now() - defaultWindowHours * 60 * 60 * 1000);
        return d.toISOString().slice(0, 16);
    });
    const [endLocal, setEndLocal] = useState(() => {
        return new Date().toISOString().slice(0, 16);
    });

    const [preview, setPreview] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [isStreaming, setIsStreaming] = useState(false);

    const executePreview = async () => {
        if (!activeHost) return;
        setIsScanning(true);
        try {
            const res = await fetch('/api/v1/extractor/preview', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    startTimeUtc: new Date(startLocal).toISOString(),
                    endTimeUtc: new Date(endLocal).toISOString(),
                    hostnames: [activeHost]
                })
            });

            if (res.ok) {
                const data = await res.json();
                setPreview(data);
            }
        } catch {
        } finally {
            setIsScanning(false);
        }
    };

    useEffect(() => {
        executePreview();
    }, [activeHost]);

    const triggerTarStream = async () => {
        if (!activeHost) return;
        setIsStreaming(true);
        try {
            const res = await fetch('/api/v1/extractor/export', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    startTimeUtc: new Date(startLocal).toISOString(),
                    endTimeUtc: new Date(endLocal).toISOString(),
                    hostnames: [activeHost]
                })
            });

            if (!res.ok) throw new Error(`Export failed: ${res.status}`);

            const blob = await res.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = downloadUrl;
            anchor.download = `Session_${activeHost}_${startLocal.replace(/[-:]/g, '')}.tar`;
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

    const stationData = preview?.stations?.[0];

    return (
        <div className="extractor-tile">
            <div className="tile-header">
                <div className="header-left">
                    <span className="status-indicator" />
                    <span className="title">Session Slicer</span>
                </div>
                <span className="station-badge">{activeHost}</span>
            </div>

            <div className="tile-body">
                <div className="filter-grid">
                    <div className="field-group">
                        <label>Start Window</label>
                        <input
                            type="datetime-local"
                            className="control-input"
                            value={startLocal}
                            onChange={(e) => setStartLocal(e.target.value)}
                        />
                    </div>
                    <div className="field-group">
                        <label>End Window</label>
                        <input
                            type="datetime-local"
                            className="control-input"
                            value={endLocal}
                            onChange={(e) => setEndLocal(e.target.value)}
                        />
                    </div>
                </div>

                <div className="telemetry-summary">
                    <div className="metric-box">
                        <span className="label">Segments</span>
                        <span className="val">{stationData?.chunkCount ?? 0}</span>
                    </div>
                    <div className="metric-box">
                        <span className="label">Archive Size</span>
                        <span className="val highlight">{formatSize(stationData?.totalSizeBytes ?? 0)}</span>
                    </div>
                    <div className="metric-box">
                        <span className="label">Gaps Detected</span>
                        <span className="val">{stationData?.gaps?.length ?? 0}</span>
                    </div>
                </div>

                <div
                    className={`continuity-status-banner ${stationData?.hasTimeGaps ? 'interrupted' : 'healthy'
                        }`}
                >
                    <span>Continuity Status</span>
                    <span>{stationData?.hasTimeGaps ? 'Telemetry Gaps Found' : 'Unbroken Stream'}</span>
                </div>

                {stationData?.hasTimeGaps && (
                    <div className="gaps-micro-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Expected (UTC)</th>
                                    <th>Resumed (UTC)</th>
                                    <th>Length</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stationData.gaps.map((g, idx) => (
                                    <tr key={idx}>
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
                    onClick={executePreview}
                    disabled={isScanning || isStreaming}
                >
                    {isScanning ? 'Inspecting...' : 'Scan Range'}
                </button>
                <button
                    className="btn btn-export"
                    onClick={triggerTarStream}
                    disabled={isStreaming || !stationData || stationData.chunkCount === 0}
                >
                    {isStreaming ? 'Packaging TAR...' : 'Download TAR'}
                </button>
            </div>
        </div>
    );
}