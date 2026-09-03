import { useEffect, useRef, useState } from 'react';
import LiveTelemetryChart from './LiveTelemetryChart';
import './TelemetryModal.scss';

export default function TelemetryModal({ chartData, onClose }) {
    const modalRef = useRef(null);
    const [activeLayers, setActiveLayers] = useState({
        hostCpu: true,
        appCpu: true,
        ramAvg: true,
        netTotal: true,
        netApp: true,
        telem: true
    });

    useEffect(() => {
        const handleKeyDown = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const handleBackdropClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
    };

    const handleToggleLayer = (layer) => {
        setActiveLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
    };

    return (
        <div className="telemetry-modal-backdrop" onClick={handleBackdropClick}>
            <div ref={modalRef} className="telemetry-modal-box">
                <div className="telemetry-modal-header">
                    <h2>GLOBAL AGENTS DIAGNOSTICS & TELEMETRY</h2>
                    <button onClick={onClose} className="telemetry-modal-close-btn" title="Close (ESC)">✕</button>
                </div>

                <div className="telemetry-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'flex-start' }}>
                    {/* גרף 1: חומרה (Host CPU vs App CPU & RAM) */}
                    <LiveTelemetryChart
                        chartData={chartData}
                        activeLayers={activeLayers}
                        onToggleLayer={handleToggleLayer}
                        type="hardware"
                    />

                    {/* גרף 2: רשת (Total Network vs App Streaming Tx) */}
                    <LiveTelemetryChart
                        chartData={chartData}
                        activeLayers={activeLayers}
                        onToggleLayer={handleToggleLayer}
                        type="network"
                    />
                </div>
            </div>
        </div>
    );
}