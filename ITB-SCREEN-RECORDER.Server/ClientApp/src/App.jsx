// ==========================================
// File: ClientApp/src/App.jsx
// ==========================================
import { useState, useEffect, useCallback, useMemo } from 'react';
import * as signalR from '@microsoft/signalr';
import CommandCenterHeader from './components/Layout/CommandCenterHeader';
import GlobalJobIndicator from './components/Layout/GlobalJobIndicator';
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

    // 💡 בייצור (Production build) כל הקריאות יחסיות לחלוטין ('') ופונות אוטומטית לפורט שממנו נטען הדף.
    // בפיתוח (Vite dev server) הפניות עוברות דרך הפרוקסי ב-vite.config.js.
    const isDev = import.meta.env.DEV;
    const apiBaseUrl = isDev ? (import.meta.env?.VITE_API_BASE_URL || '') : '';

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

    // 💡 משיכת תחנות עם נתיב ה-Dashboard התקני
    const fetchStations = useCallback(async () => {
        try {
            let res = await fetch(`${apiBaseUrl}/api/v1/dashboard/stations`);
            if (!res.ok) {
                res = await fetch(`${apiBaseUrl}/api/agents`);
            }
            if (res.ok) {
                const data = await res.json();
                if (Array.isArray(data)) {
                    setStations(data);
                }
            }
        } catch (err) {
            console.error('[App] Failed to fetch stations:', err);
        }
    }, [apiBaseUrl]);

    const fetchSystemConfig = useCallback(async () => {
        try {
            let res = await fetch(`${apiBaseUrl}/api/v1/settings`);
            if (!res.ok) {
                res = await fetch(`${apiBaseUrl}/api/system/config`);
            }
            if (res.ok) {
                const data = await res.json();
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
                await Promise.allSettled([
                    fetchStations(),
                    fetchSystemConfig()
                ]);
            } catch (err) {
                console.error('[App] Failed to load initial data:', err);
            }
        };

        if (isMounted) loadInitialData();
        return () => { isMounted = false; };
    }, [fetchStations, fetchSystemConfig]);

    useEffect(() => {
        const hubUrl = `${apiBaseUrl}/hubs/telemetry`;
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl)
            .withAutomaticReconnect([0, 2000, 5000, 10000])
            .build();

        // מיזוג נתוני טלמטריה ללא דריסת מדדי שרת קיימים
        connection.on('ReceiveServerTelemetry', (telemetry) => {
            if (!telemetry) return;
            setServerTelemetry(prev => {
                if (!prev) return telemetry;
                return {
                    ...prev,
                    ...telemetry,
                    uptimeSeconds: telemetry.uptimeSeconds ?? telemetry.systemUptimeSeconds ?? prev.uptimeSeconds ?? prev.systemUptimeSeconds,
                    cpuPct: telemetry.cpuPct !== undefined ? telemetry.cpuPct : prev.cpuPct,
                    hostRamPct: telemetry.hostRamPct !== undefined ? telemetry.hostRamPct : prev.hostRamPct,
                    storagePool: telemetry.storagePool !== undefined ? telemetry.storagePool : prev.storagePool,
                    netUtilPct: telemetry.netUtilPct !== undefined ? telemetry.netUtilPct : prev.netUtilPct
                };
            });
        });

        connection.on('ReceiveMaintenanceJob', (job) => {
            setServerTelemetry(prev => ({
                ...prev,
                maintenanceJob: job
            }));
        });

        // קליטת עדכוני מדדים של עמדה בודדת
        connection.on('ReceiveAgentMetrics', (report) => {
            if (!report) return;
            setStations(prev => {
                const host = (report.hostname || report.stationId || '').toLowerCase();
                const idx = prev.findIndex(s => (s.hostname || s.stationId || '').toLowerCase() === host);
                const isOnline = report.status === 1 || report.status === 2 || report.isProcessRunning || report.isOnline;

                if (idx > -1) {
                    const copy = [...prev];
                    copy[idx] = { ...copy[idx], ...report, isOnline };
                    return copy;
                }
                return [...prev, { ...report, isOnline }];
            });
        });

        connection.on('ReceiveAllStations', (allStations) => {
            if (Array.isArray(allStations)) {
                setStations(allStations);
            }
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

                <GlobalJobIndicator />
            </div>
        </div>
    );
}