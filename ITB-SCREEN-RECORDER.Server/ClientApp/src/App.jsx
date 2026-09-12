import { useState, useEffect, useCallback, useMemo } from 'react';
import * as signalR from '@microsoft/signalr';
import CommandCenterHeader from './components/UI/CommandCenterHeader';
import DashboardGrid from './components/Dashboard/DashboardGrid';
import SettingsModal from './components/Settings/SettingsModal';
import './App.scss';

export default function App() {
    const [stations, setStations] = useState([]);
    const [serverTelemetry, setServerTelemetry] = useState(null);
    const [systemConfig, setSystemConfig] = useState(null);
    const [actionPending, setActionPending] = useState({});

    const [hideOffline, setHideOffline] = useState(true);
    const [isFaultFilterActive, setIsFaultFilterActive] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const apiPort = import.meta.env?.VITE_SERVER_PORT || '5090';
    const apiBaseUrl = `http://${window.location.hostname}:${apiPort}`;

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

        return () => {
            isMounted = false;
        };
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

        connection.start()
            .then(() => console.log('[App] SignalR Connected to Hub'))
            .catch(err => console.error('[App] SignalR Connection Error:', err));

        return () => {
            connection.stop();
        };
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

    const handleToggleStream = async (hostname, isCurrentlyStreaming) => {
        setActionPending(prev => ({ ...prev, [hostname]: true }));
        const targetEnable = !isCurrentlyStreaming;

        try {
            const res = await fetch(`${apiBaseUrl}/api/v1/agent/command/${hostname}?enable=${targetEnable}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });

            if (res.ok) {
                setStations(prev => prev.map(st => {
                    if (st.hostname === hostname) {
                        return { ...st, isStreaming: targetEnable };
                    }
                    return st;
                }));
            }
        } catch (err) {
            console.error(`[App] Error toggling stream for ${hostname}:`, err);
        } finally {
            setActionPending(prev => ({ ...prev, [hostname]: false }));
        }
    };

    const handleBulkStart = async (targetHostnames = []) => {
        try {
            const res = await fetch(`${apiBaseUrl}/api/v1/agent/fleet-streaming-policy`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    enable: true,
                    hostnames: targetHostnames.length > 0 ? targetHostnames : null
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
        <div className="itb-command-center-app" dir="ltr">
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
    );
}