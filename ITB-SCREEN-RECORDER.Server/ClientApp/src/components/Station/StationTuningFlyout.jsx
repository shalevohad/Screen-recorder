import { useState, useEffect, useRef } from 'react';
import './StationTuningFlyout.scss';

const FPS_TICKS = [
    { val: 10, label: '10' },
    { val: 20, label: '20' },
    { val: 30, label: '30' },
    { val: 60, label: '60' }
];

const BITRATE_TICKS = [
    { val: 1000, label: '1M' },
    { val: 2500, label: '2.5M' },
    { val: 5000, label: '5M' },
    { val: 10000, label: '10M' },
    { val: 20000, label: '20M' }
];

const THUMB_RADIUS = 12;

export default function StationTuningFlyout(props) {
    const {
        hostname: directHostname,
        station,
        stationName,
        agentId,
        currentFps,
        currentBitrateKbps,
        apiBaseUrl = '',
        onClose
    } = props;

    const targetHostname = directHostname || station?.hostname || stationName || agentId || '';

    const cleanBaseUrl = (apiBaseUrl && apiBaseUrl !== 'undefined')
        ? apiBaseUrl.replace(/\/+$/, '')
        : '';

    const [selectedFps, setSelectedFps] = useState(
        currentFps || station?.actualFps || station?.targetFps || 30
    );
    const [selectedBitrate, setSelectedBitrate] = useState(
        currentBitrateKbps || station?.targetBitrateKbps || 3000
    );
    const [isSaving, setIsSaving] = useState(false);
    const [isLoadingConfig, setIsLoadingConfig] = useState(Boolean(targetHostname));
    const [statusText, setStatusText] = useState('');
    const [isFadingOut, setIsFadingOut] = useState(false);

    const closeTimerRef = useRef(null);

    useEffect(() => {
        return () => {
            if (closeTimerRef.current) {
                clearTimeout(closeTimerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (!targetHostname) {
            return;
        }

        let isMounted = true;
        async function fetchCurrentStationConfig() {
            try {
                const res = await fetch(`${cleanBaseUrl}/api/v1/agent/config/${encodeURIComponent(targetHostname)}`);
                if (res.ok) {
                    const policy = await res.json();
                    if (!isMounted) return;

                    if (policy.targetFps) {
                        setSelectedFps(policy.targetFps);
                    }

                    if (policy.videoBitrate) {
                        const rawBitrate = String(policy.videoBitrate).toLowerCase().replace('k', '').trim();
                        const parsedBitrate = parseInt(rawBitrate, 10);
                        if (!isNaN(parsedBitrate) && parsedBitrate >= 1000) {
                            setSelectedBitrate(parsedBitrate);
                        }
                    }
                }
            } catch (err) {
                console.warn(`[StationTuning] Could not fetch server config for ${targetHostname}, using defaults`, err);
            } finally {
                if (isMounted) setIsLoadingConfig(false);
            }
        }

        fetchCurrentStationConfig();
        return () => { isMounted = false; };
    }, [cleanBaseUrl, targetHostname]);

    const handleFpsBlur = () => {
        let num = parseInt(selectedFps, 10);
        if (isNaN(num) || num < 10) num = 10;
        if (num > 60) num = 60;
        setSelectedFps(num);
    };

    const handleBitrateBlur = () => {
        let num = parseInt(selectedBitrate, 10);
        if (isNaN(num) || num < 1000) num = 1000;
        if (num > 20000) num = 20000;
        setSelectedBitrate(num);
    };

    const handleApply = async () => {
        if (!targetHostname) {
            setStatusText('ERR: NO ID');
            return;
        }

        let fpsNum = parseInt(selectedFps, 10);
        if (isNaN(fpsNum) || fpsNum < 10) fpsNum = 10;
        if (fpsNum > 60) fpsNum = 60;

        let bitrateNum = parseInt(selectedBitrate, 10);
        if (isNaN(bitrateNum) || bitrateNum < 1000) bitrateNum = 1000;
        if (bitrateNum > 20000) bitrateNum = 20000;

        setSelectedFps(fpsNum);
        setSelectedBitrate(bitrateNum);
        setIsSaving(true);
        setStatusText('SYNCING...');

        try {
            const res = await fetch(`${cleanBaseUrl}/api/v1/agent/tuning/${encodeURIComponent(targetHostname)}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fps: fpsNum,
                    bitrateKbps: bitrateNum
                })
            });

            if (res.ok) {
                setStatusText('APPLIED');
                closeTimerRef.current = setTimeout(() => {
                    setIsFadingOut(true);
                    setTimeout(() => {
                        onClose?.();
                    }, 250);
                }, 750);
            } else {
                setStatusText('ERR');
            }
        } catch (err) {
            console.error(`[StationTuning] Failed for ${targetHostname}:`, err);
            setStatusText('FAILED');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div
            className={`station-tuning-flyout ${isFadingOut ? 'fade-out' : ''}`}
            onClick={(e) => e.stopPropagation()}
        >
            <div className="tuning-header">
                <span className="tuning-title">
                    STATION TUNING {isLoadingConfig && <span className="tuning-loading-dots">...</span>}
                </span>
                {statusText && <span className="tuning-status-tag">{statusText}</span>}
                <button className="tuning-close" onClick={onClose} title="Close">✕</button>
            </div>

            <div className="tuning-section">
                <div className="tuning-label-row">
                    <span className="tuning-label">TARGET FPS</span>
                    <div className="tuning-input-wrap">
                        <input
                            type="number"
                            min="10"
                            max="60"
                            value={selectedFps}
                            onChange={(e) => setSelectedFps(e.target.value)}
                            onBlur={handleFpsBlur}
                            className="tuning-num-input"
                            disabled={isSaving || isFadingOut}
                        />
                        <span className="tuning-unit">FPS</span>
                    </div>
                </div>

                <div className="tuning-slider-container">
                    <input
                        type="range"
                        min="10"
                        max="60"
                        step="1"
                        value={Math.max(10, Math.min(60, Number(selectedFps) || 10))}
                        onChange={(e) => setSelectedFps(Number(e.target.value))}
                        className="tuning-range-slider"
                        disabled={isSaving || isFadingOut}
                    />

                    <div className="slider-ticks-track">
                        {FPS_TICKS.map((tick) => {
                            const pct = ((tick.val - 10) / (60 - 10)) * 100;
                            const isCurrent = Number(selectedFps) === tick.val;
                            return (
                                <button
                                    key={tick.val}
                                    type="button"
                                    className={`tick-anchor ${isCurrent ? 'is-active' : ''}`}
                                    style={{ left: `calc(${THUMB_RADIUS}px + (100% - ${THUMB_RADIUS * 2}px) * ${pct / 100})` }}
                                    onClick={() => setSelectedFps(tick.val)}
                                    title={`Set ${tick.val} FPS`}
                                    disabled={isSaving || isFadingOut}
                                >
                                    <span className="tick-pip"></span>
                                    <span className="tick-text">{tick.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="tuning-section">
                <div className="tuning-label-row">
                    <span className="tuning-label">
                        VIDEO BITRATE
                        <span className="mbps-hint">
                            ({(Number(selectedBitrate) / 1000).toFixed(1)} Mbps)
                        </span>
                    </span>
                    <div className="tuning-input-wrap">
                        <input
                            type="number"
                            min="1000"
                            max="20000"
                            step="250"
                            value={selectedBitrate}
                            onChange={(e) => setSelectedBitrate(e.target.value)}
                            onBlur={handleBitrateBlur}
                            className="tuning-num-input bitrate"
                            disabled={isSaving || isFadingOut}
                        />
                        <span className="tuning-unit">KBPS</span>
                    </div>
                </div>

                <div className="tuning-slider-container">
                    <input
                        type="range"
                        min="1000"
                        max="20000"
                        step="250"
                        value={Math.max(1000, Math.min(20000, Number(selectedBitrate) || 1000))}
                        onChange={(e) => setSelectedBitrate(Number(e.target.value))}
                        className="tuning-range-slider"
                        disabled={isSaving || isFadingOut}
                    />

                    <div className="slider-ticks-track">
                        {BITRATE_TICKS.map((tick) => {
                            const pct = ((tick.val - 1000) / (20000 - 1000)) * 100;
                            const isCurrent = Number(selectedBitrate) === tick.val;
                            return (
                                <button
                                    key={tick.val}
                                    type="button"
                                    className={`tick-anchor ${isCurrent ? 'is-active' : ''}`}
                                    style={{ left: `calc(${THUMB_RADIUS}px + (100% - ${THUMB_RADIUS * 2}px) * ${pct / 100})` }}
                                    onClick={() => setSelectedBitrate(tick.val)}
                                    title={`Set ${tick.label}`}
                                    disabled={isSaving || isFadingOut}
                                >
                                    <span className="tick-pip"></span>
                                    <span className="tick-text">{tick.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <button
                className="tuning-apply-btn"
                onClick={handleApply}
                disabled={isSaving || isFadingOut}
            >
                {isSaving ? "APPLYING CONFIG..." : "APPLY TUNING"}
            </button>
        </div>
    );
}