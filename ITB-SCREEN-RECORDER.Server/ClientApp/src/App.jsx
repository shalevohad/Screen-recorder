// Client/src/App.jsx
import { useState, useEffect, useCallback, useMemo } from 'react';
import * as signalR from '@microsoft/signalr';
import CommandCenterHeader from './components/UI/CommandCenterHeader';
import DashboardGrid from './components/Dashboard/DashboardGrid';
import SettingsModal from './components/Settings/SettingsModal';
import './App.scss';

const LOCAL_WALLPAPERS = {
    dawn: '/images/wallpapers/dawn.jpg',
    day: '/images/wallpapers/day.jpg',
    dusk: '/images/wallpapers/dusk.jpg',
    night: '/images/wallpapers/night.jpg'
};

const resolveTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 8) return 'dawn';
    if (hour >= 8 && hour < 17) return 'day';
    if (hour >= 17 && hour < 20) return 'dusk';
    return 'night';
};

export default function App() {
    const [stations, setStations] = useState([]);
    const [serverTelemetry, setServerTelemetry] = useState(null);
    const [systemConfig, setSystemConfig] = useState(null);
    const [actionPending, setActionPending] = useState({});

    const [hideOffline, setHideOffline] = useState(true);
    const [isFaultFilterActive, setIsFaultFilterActive] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [timeOfDay, setTimeOfDay] = useState(resolveTimeOfDay);

    useEffect(() => {
        const interval = setInterval(() => {
            const current = resolveTimeOfDay();
            setTimeOfDay(prev => (prev !== current ? current : prev));
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    const apiPort = import.meta.env?.VITE_SERVER_PORT || '5090';
    const apiBaseUrl = `http://${window.location.hostname}:${apiPort}`;

    useEffect(() => {
        const handleGlobalContextMenu = (e) => {
            if (e.target.closest('input, textarea, [contenteditable="true"]')) return;
            if (e.target.closest('[data-allow-context="true"]')) return;
            e.preventDefault();
        };

        window.addEventListener('contextmenu', handleGlobalContextMenu);
        return () => {
            window.removeEventListener('contextmenu', handleGlobalContextMenu);
        };
    }, []);

    const fetchStations = useCallback(async () => {
        try {
            const res = await fetch(`${apiBaseUrl}/api/agents`);
            if (res.ok) {
                const data = await res.json();
                setStations(data);
            }
        } catch (err) {
            console.error('[App] Failed to fetch agents:', err);
        }
    }, [apiBaseUrl]);

    const fetchSystemConfig = useCallback(async () => {
        try {
            const res = await fetch(`${apiBaseUrl}/api/settings`);
            if (res.ok) {
                const data = await res.json();
                setSystemConfig(data);
                return;
            }
            const altRes = await fetch(`${apiBaseUrl}/api/system/config`);
            if (altRes.ok) {
                const data = await altRes.json();
                setSystemConfig(data);
            }
        } catch (err) {
            console.error('[App] Failed to fetch system config:', err);
        }
    }, [apiBaseUrl]);

    useEffect(() => {
        let isMounted = true;
        const loadInitialData = async () => {
            try {
                const [agentsRes, cfgRes] = await Promise.allSettled([
                    fetch(`${apiBaseUrl}/api/agents`),
                    fetch(`${apiBaseUrl}/api/settings`)
                ]);

                if (isMounted) {
                    if (agentsRes.status === 'fulfilled' && agentsRes.value.ok) {
                        const data = await agentsRes.value.json();
                        setStations(data);
                    }
                    if (cfgRes.status === 'fulfilled' && cfgRes.value.ok) {
                        const cfg = await cfgRes.value.json();
                        setSystemConfig(cfg);
                    }
                }
            } catch (err) {
                console.error('[App] Failed to load initial data:', err);
            }
        };

        loadInitialData();
        return () => { isMounted = false; };
    }, [apiBaseUrl]);

    useEffect(() => {
        const hubUrl = `${apiBaseUrl}/hubs/telemetry`;
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl)
            .withAutomaticReconnect([0, 2000, 5000, 10000])
            .build();

        connection.on('ReceiveServerTelemetry', (telemetry) => {
            setServerTelemetry(telemetry);
        });

        connection.on('ReceiveAgentMetrics', (report) => {
            setStations(prev => {
                const idx = prev.findIndex(s => s.hostname === report.hostname);
                const isOnline = report.status === 1 || report.status === 2 || report.isProcessRunning;

                if (idx > -1) {
                    const copy = [...prev];
                    copy[idx] = { ...copy[idx], ...report, isOnline };
                    return copy;
                }
                return [...prev, { ...report, isOnline }];
            });
        });

        connection.start().catch(err => console.error('[App] SignalR Connection Error:', err));
        return () => { connection.stop(); };
    }, [apiBaseUrl]);

    const sortedStations = useMemo(() => {
        return [...stations].sort((a, b) => {
            const nameA = (a.displayName || a.hostname || '').toLowerCase();
            const nameB = (b.displayName || b.hostname || '').toLowerCase();
            return nameA.localeCompare(nameB, undefined, { numeric: true, sensitivity: 'base' });
        });
    }, [stations]);

    const handleSettingsSaved = useCallback(async () => {
        await fetchStations();
        await fetchSystemConfig();
    }, [fetchStations, fetchSystemConfig]);

    const handleToggleStream = async (hostname, isCurrentlyStreaming, policy = {}) => {
        setActionPending(prev => ({ ...prev, [hostname]: true }));
        const targetEnable = !isCurrentlyStreaming;
        const queryParams = new URLSearchParams({ enable: targetEnable });
        if (targetEnable && policy.bitrate) queryParams.append('bitrate', policy.bitrate);
        if (targetEnable && policy.fps) queryParams.append('fps', policy.fps);

        try {
            const res = await fetch(`${apiBaseUrl}/api/v1/agent/command/${hostname}?${queryParams.toString()}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });

            if (res.ok) {
                setStations(prev => prev.map(st => st.hostname === hostname ? { ...st, isStreaming: targetEnable } : st));
            }
        } catch (err) {
            console.error(`[App] Error toggling stream for ${hostname}:`, err);
        } finally {
            setActionPending(prev => ({ ...prev, [hostname]: false }));
        }
    };

    const handleBulkStart = async (targetHostnames = [], policy = {}) => {
        try {
            const res = await fetch(`${apiBaseUrl}/api/v1/agent/fleet-streaming-policy`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    enable: true,
                    hostnames: targetHostnames.length > 0 ? targetHostnames : null,
                    bitrate: policy.bitrate || null,
                    fps: policy.fps || null
                })
            });

            if (res.ok) {
                setStations(prev => prev.map(s => {
                    const shouldUpdate = targetHostnames.length === 0 || targetHostnames.includes(s.hostname);
                    return (shouldUpdate && s.isOnline) ? { ...s, isStreaming: true } : s;
                }));
            }
        } catch (err) {
            console.error('[App] Failed bulk start:', err);
        }
    };

    const handleBulkStop = async (targetHostnames = []) => {
        try {
            const res = await fetch(`${apiBaseUrl}/api/v1/agent/fleet-streaming-policy`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    enable: false,
                    hostnames: targetHostnames.length > 0 ? targetHostnames : null
                })
            });

            if (res.ok) {
                setStations(prev => prev.map(s => {
                    const shouldUpdate = targetHostnames.length === 0 || targetHostnames.includes(s.hostname);
                    return shouldUpdate ? { ...s, isStreaming: false } : s;
                }));
            }
        } catch (err) {
            console.error('[App] Failed bulk stop:', err);
        }
    };

    return (
        <div className="itb-command-center-root" dir="ltr">
            <div
                className="dynamic-wallpaper-layer"
                style={{ backgroundImage: `url(${LOCAL_WALLPAPERS[timeOfDay]})` }}
                aria-hidden="true"
            />
            <div className="dynamic-scrim-overlay" aria-hidden="true" />

            <div className="itb-command-center-app">
                <CommandCenterHeader
                    stations={sortedStations}
                    serverTelemetry={serverTelemetry}
                    systemConfig={systemConfig}
                    isSettingsOpen={isSettingsOpen}
                    onOpenSettings={() => setIsSettingsOpen(prev => !prev)}
                    hideOffline={hideOffline}
                    isFaultFilterActive={isFaultFilterActive}
                    onToggleFaultFilter={() => setIsFaultFilterActive(prev => !prev)}
                />

                <DashboardGrid
                    key={sortedStations.length}
                    stations={sortedStations}
                    actionPending={actionPending}
                    onToggleStream={handleToggleStream}
                    onBulkStart={handleBulkStart}
                    onBulkStop={handleBulkStop}
                    onUpdateStationSettings={setStations}
                    systemConfig={systemConfig}
                    onSystemConfigUpdate={setSystemConfig}
                    direction="ltr"
                    hideOffline={hideOffline}
                    onToggleHideOffline={() => setHideOffline(prev => !prev)}
                    isFaultFilterActive={isFaultFilterActive}
                    onExitFaultFilter={() => setIsFaultFilterActive(false)}
                />

                {isSettingsOpen && (
                    <SettingsModal
                        onClose={() => setIsSettingsOpen(false)}
                        onSettingsSaved={handleSettingsSaved}
                    />
                )}
            </div>
        </div>
    );
}