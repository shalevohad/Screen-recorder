// ==========================================
// File: ClientApp/src/App.jsx
// ==========================================
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import * as signalR from '@microsoft/signalr';
import CommandCenterHeader from './components/Layout/CommandCenterHeader';
import GlobalJobIndicator from './components/Layout/GlobalJobIndicator';
import DashboardGrid from './components/Dashboard/DashboardGrid';
import SettingsView from './components/Settings/SettingsView';
import SystemLauncher from './components/Auth/SystemLauncher';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AudioSoloProvider } from './context/AudioSoloContext';
import MasterAudioDock from './components/Station/MasterAudioDock';
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

const DISCONNECT_GRACE_PERIOD_MS = 8000;

export default function App() {
    return (
        <AuthProvider>
            <AudioSoloProvider>
                <CommandCenterApp />
            </AudioSoloProvider>
        </AuthProvider>
    );
}

function CommandCenterApp() {
    const { isInitialized, isAuthenticated } = useAuth();

    // ניווט: 'portal' (שער בחירת מערכת), 'recording' (חמ"ל הקלטות בלבד), 'settings' (ניהול מערכת בלבד)
    const [currentSubsystem, setCurrentSubsystem] = useState('portal');

    const [stations, setStations] = useState([]);

    // 💡 אתחול בטוח למניעת שגיאות של null reading
    const [serverTelemetry, setServerTelemetry] = useState(() => ({
        cpuPct: 0,
        hostRamPct: 0,
        storagePool: null,
        netUtilPct: 0,
        uptimeSeconds: 0
    }));

    const [systemConfig, setSystemConfig] = useState(null);
    const [actionPending, setActionPending] = useState({});
    const actionPendingTimeoutsRef = useRef({});

    useEffect(() => {
        return () => {
            Object.values(actionPendingTimeoutsRef.current).forEach(t => clearTimeout(t));
        };
    }, []);

    const [isServerOfflineModal, setIsServerOfflineModal] = useState(false);
    const [lastServerContact, setLastServerContact] = useState(() => new Date());
    const [isRetryingConnection, setIsRetryingConnection] = useState(false);

    const [clusterConfig, setClusterConfig] = useState(() => {
        try {
            return {
                role: localStorage.getItem('itb_cluster_role') || 'Active-Active',
                partnerServerUrl: localStorage.getItem('itb_cluster_partner_url') || '',
                autoFailoverDashboard: localStorage.getItem('itb_cluster_failover_enabled') !== 'false',
                failoverDelaySeconds: Number(localStorage.getItem('itb_cluster_failover_delay')) || 8,
                virtualIp: localStorage.getItem('itb_cluster_vip') || '',
                enableVirtualIp: localStorage.getItem('itb_cluster_vip_enabled') === 'true',
                isHoldingVip: false,
                isStandalone: true,
                totalActiveNodes: 1,
                clusterMode: 'Standalone'
            };
        } catch {
            return {
                role: 'Active-Active',
                partnerServerUrl: '',
                autoFailoverDashboard: true,
                failoverDelaySeconds: 8,
                virtualIp: '',
                enableVirtualIp: false,
                isHoldingVip: false,
                isStandalone: true,
                totalActiveNodes: 1,
                clusterMode: 'Standalone'
            };
        }
    });

    const [failoverCountdown, setFailoverCountdown] = useState(8);
    const [isFailoverPaused, setIsFailoverPaused] = useState(false);

    const lastContactTimestampRef = useRef(0);

    useEffect(() => {
        lastContactTimestampRef.current = Date.now();
    }, []);

    const [hideOffline, setHideOffline] = useState(true);
    const [isFaultFilterActive, setIsFaultFilterActive] = useState(false);
    const [timeOfDay, setTimeOfDay] = useState(resolveTimeOfDay);
    const [liveKeystrokes, setLiveKeystrokes] = useState({});

    const handleIncomingKeystrokes = useCallback((hostname, keys) => {
        if (!keys || !keys.length || !hostname) return;
        const hostKey = hostname.toLowerCase();
        const now = Date.now();
        const incoming = keys.map(k => {
            const combo = k.keyCombination || k.KeyCombination || k.combo || (typeof k === 'string' ? k : '');
            const epoch = k.epochMs || k.EpochMs || now;
            return {
                id: `${epoch}_${Math.random()}`,
                combo,
                epochMs: epoch,
                receivedAt: now
            };
        }).filter(item => item.combo && item.combo.trim() !== '');

        if (!incoming.length) return;

        // 💡 סנכרון תצוגת מקשים עם לטנסי ה-WebRTC (120ms): מונע הופעה מוקדמת מדי ומנעיל את ה-overlay לסרטון בדיוק כשהעכבר מגיע לנקודה
        setTimeout(() => {
            setLiveKeystrokes(prev => {
                const currentNow = Date.now();
                const existing = (prev[hostKey] || []).filter(k => currentNow - k.receivedAt < 3500);
                // מניעת כפילויות של אותו מקש תוך 400ms (בין אם מה-Fast Path או מטלמטריה שוטפת)
                const uniqueIncoming = incoming.filter(inc =>
                    !existing.some(ex => ex.combo === inc.combo && Math.abs((ex.epochMs || 0) - (inc.epochMs || 0)) < 400)
                );
                if (!uniqueIncoming.length) return prev;
                return {
                    ...prev,
                    [hostKey]: [...existing, ...uniqueIncoming].slice(-8)
                };
            });
        }, 120);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            const now = Date.now();
            setLiveKeystrokes(prev => {
                let changed = false;
                const next = {};
                for (const [host, keys] of Object.entries(prev)) {
                    const filtered = keys.filter(k => now - k.receivedAt < 3000);
                    if (filtered.length !== keys.length) changed = true;
                    if (filtered.length > 0) next[host] = filtered;
                }
                return changed ? next : prev;
            });
        }, 500);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const current = resolveTimeOfDay();
            setTimeOfDay(prev => (prev !== current ? current : prev));
        }, 60000);
        return () => clearInterval(interval);
    }, []);

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

    const registerServerHeartbeat = useCallback(() => {
        lastContactTimestampRef.current = Date.now();
        setLastServerContact(new Date());
        setIsServerOfflineModal(false);
        setIsRetryingConnection(false);
    }, []);

    useEffect(() => {
        if (!isAuthenticated) return;

        const checkConnectionTicker = setInterval(() => {
            if (!lastContactTimestampRef.current) return;

            const elapsedSinceLastContact = Date.now() - lastContactTimestampRef.current;
            if (elapsedSinceLastContact >= DISCONNECT_GRACE_PERIOD_MS) {
                setIsServerOfflineModal(true);
            } else {
                setIsServerOfflineModal(false);
            }
        }, 1000);

        return () => clearInterval(checkConnectionTicker);
    }, [isAuthenticated]);

    const fetchStations = useCallback(async () => {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3500);

            let res = await fetch(`${apiBaseUrl}/api/v1/dashboard/stations`, { signal: controller.signal });
            clearTimeout(timeoutId);

            if (!res.ok) {
                res = await fetch(`${apiBaseUrl}/api/agents`);
            }

            if (res.ok) {
                const data = await res.json();
                if (Array.isArray(data)) {
                    setActionPending(prev => {
                        let hasChanges = false;
                        const next = { ...prev };
                        for (const hostKey of Object.keys(prev)) {
                            const pending = prev[hostKey];
                            const match = data.find(s => (s.hostname || s.stationId || '').toLowerCase() === hostKey.toLowerCase());
                            if (match) {
                                const matchIsRec = match.isRecording !== undefined ? Boolean(match.isRecording) : (match.status === 'Recording');
                                const isConfirmed =
                                    (pending === 'starting' && matchIsRec) ||
                                    (pending === 'stopping' && !matchIsRec) ||
                                    (match.isOnline === false);
                                if (isConfirmed) {
                                    if (actionPendingTimeoutsRef.current[hostKey]) {
                                        clearTimeout(actionPendingTimeoutsRef.current[hostKey]);
                                        delete actionPendingTimeoutsRef.current[hostKey];
                                    }
                                    delete next[hostKey];
                                    hasChanges = true;
                                }
                            }
                        }
                        return hasChanges ? next : prev;
                    });
                    setStations(data);
                }
                registerServerHeartbeat();
            }
        } catch (err) {
            console.warn('[App] fetchStations timeout or error:', err.message);
        }
    }, [apiBaseUrl, registerServerHeartbeat]);

    const fetchSystemConfig = useCallback(async () => {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3500);

            let res = await fetch(`${apiBaseUrl}/api/v1/settings`, { signal: controller.signal });
            clearTimeout(timeoutId);

            if (!res.ok) {
                res = await fetch(`${apiBaseUrl}/api/system/config`);
            }
            if (res.ok) {
                const data = await res.json();
                setSystemConfig(data);
                registerServerHeartbeat();
            }
        } catch (err) {
            console.warn('[App] fetchSystemConfig timeout or error:', err.message);
        }
    }, [apiBaseUrl, registerServerHeartbeat]);

    const fetchClusterConfig = useCallback(async () => {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3500);
            const res = await fetch(`${apiBaseUrl}/api/v1/dashboard/cluster`, { signal: controller.signal });
            clearTimeout(timeoutId);

            if (res.ok) {
                const data = await res.json();
                const role = data.role || data.Role || 'Active-Active';
                const partner = (data.partnerServerUrl || data.PartnerServerUrl || '').trim();
                const autoFailover = data.autoFailoverDashboard ?? data.AutoFailoverDashboard ?? true;
                const delay = Number(data.failoverDelaySeconds || data.FailoverDelaySeconds) || 8;
                const virtualIp = (data.virtualIp || data.VirtualIp || '').trim();
                const enableVip = Boolean(data.enableVirtualIp ?? data.EnableVirtualIp);
                const isHoldingVip = Boolean(data.isHoldingVip ?? data.IsHoldingVip);
                const isStandalone = Boolean(data.isStandalone ?? data.IsStandalone ?? true);
                const totalActiveNodes = Number(data.totalActiveNodes || data.TotalActiveNodes) || 1;
                const clusterMode = data.clusterMode || data.ClusterMode || (isStandalone ? 'Standalone' : 'Active-Active Mesh');

                localStorage.setItem('itb_cluster_role', role);
                localStorage.setItem('itb_cluster_partner_url', partner);
                localStorage.setItem('itb_cluster_failover_enabled', String(autoFailover));
                localStorage.setItem('itb_cluster_failover_delay', String(delay));
                localStorage.setItem('itb_cluster_vip', virtualIp);
                localStorage.setItem('itb_cluster_vip_enabled', String(enableVip));

                setClusterConfig({
                    role,
                    priority: data.priority ?? data.Priority,
                    serverName: data.serverName || data.ServerName,
                    discoveryPort: data.discoveryPort || data.DiscoveryPort,
                    multicastAddress: data.multicastAddress || data.MulticastAddress,
                    broadcastAddress: data.broadcastAddress || data.BroadcastAddress,
                    partnerServerUrl: partner,
                    autoFailoverDashboard: autoFailover,
                    failoverDelaySeconds: delay,
                    virtualIp,
                    enableVirtualIp: enableVip,
                    isHoldingVip,
                    isStandalone,
                    totalActiveNodes,
                    clusterMode,
                    activeInterface: data.activeInterface || data.ActiveInterface || ''
                });
                setFailoverCountdown(delay);
            }
        } catch (err) {
            console.warn('[App] fetchClusterConfig error:', err.message);
        }
    }, [apiBaseUrl]);

    // ניהול ספירה לאחור ומעבר אוטומטי לצומת עמית / כתובת VIP בעת ניתוק
    useEffect(() => {
        if (!isServerOfflineModal) {
            setFailoverCountdown(clusterConfig.failoverDelaySeconds || 8);
            setIsFailoverPaused(false);
            return;
        }

        const canFailover = clusterConfig.autoFailoverDashboard && (
            Boolean(clusterConfig.partnerServerUrl?.trim()) ||
            (clusterConfig.enableVirtualIp && Boolean(clusterConfig.virtualIp?.trim()))
        );
        if (!canFailover || isFailoverPaused) return;

        const timer = setInterval(() => {
            setFailoverCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    const isAlreadyOnVip = clusterConfig.virtualIp && window.location.hostname === clusterConfig.virtualIp;
                    if (isAlreadyOnVip) {
                        // המשתמש כבר גולש דרך כתובת ה-VIP: כתובת ה-VIP עברה אוטונומית לצומת הבא, רענון פשוט מחדש את החיבור
                        window.location.reload();
                    } else if (clusterConfig.enableVirtualIp && clusterConfig.virtualIp) {
                        const port = window.location.port ? `:${window.location.port}` : '';
                        window.location.href = `${window.location.protocol}//${clusterConfig.virtualIp}${port}`;
                    } else if (clusterConfig.partnerServerUrl?.trim()) {
                        window.location.href = clusterConfig.partnerServerUrl.trim();
                    }
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isServerOfflineModal, isFailoverPaused, clusterConfig]);

    useEffect(() => {
        if (!isAuthenticated) return;

        let isMounted = true;
        const loadInitialData = async () => {
            try {
                await Promise.allSettled([
                    fetchStations(),
                    fetchSystemConfig(),
                    fetchClusterConfig()
                ]);
            } catch (err) {
                console.error('[App] Failed to load initial data:', err);
            }
        };

        if (isMounted) loadInitialData();

        const heartbeatInterval = setInterval(() => {
            fetchStations();
        }, 4000);

        return () => {
            isMounted = false;
            clearInterval(heartbeatInterval);
        };
    }, [isAuthenticated, fetchStations, fetchSystemConfig, fetchClusterConfig]);

    useEffect(() => {
        if (!isAuthenticated) return;

        const hubUrl = `${apiBaseUrl}/hubs/telemetry`;
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl)
            .withAutomaticReconnect({
                nextRetryDelayInMilliseconds: (retryContext) => {
                    if (retryContext.previousRetryCount === 0) return 0;
                    if (retryContext.previousRetryCount <= 3) return 2000;
                    return 5000;
                }
            })
            .build();

        connection.onreconnected(() => {
            registerServerHeartbeat();
            fetchStations();
            fetchSystemConfig();
            fetchClusterConfig();
        });

        connection.onclose(() => {
            setTimeout(() => {
                connection.start().then(registerServerHeartbeat).catch(() => { });
            }, 5000);
        });

        connection.on('ReceiveServerTelemetry', (telemetry) => {
            if (!telemetry) return;
            registerServerHeartbeat();
            setServerTelemetry(prev => {
                const base = prev || {};
                return {
                    ...base,
                    ...telemetry,
                    storage: telemetry.storage ?? base.storage ?? null,
                    uptimeSeconds: telemetry.uptimeSeconds ?? telemetry.systemUptimeSeconds ?? base.uptimeSeconds ?? 0,
                    cpuPct: telemetry.cpuPct ?? telemetry.hostCpuPct ?? base.cpuPct ?? 0,
                    hostRamPct: telemetry.hostRamPct ?? telemetry.ramPct ?? base.hostRamPct ?? 0,
                    storagePool: telemetry.storagePool ?? base.storagePool ?? null,
                    netUtilPct: telemetry.netUtilPct ?? base.netUtilPct ?? 0
                };
            });
        });

        connection.on('ReceiveSystemConfig', (newConfig) => {
            if (!newConfig) return;
            registerServerHeartbeat();
            setSystemConfig(newConfig);
        });

        connection.on('ReceiveMaintenanceJob', (job) => {
            registerServerHeartbeat();
            setServerTelemetry(prev => ({ ...(prev || {}), maintenanceJob: job }));
        });

        connection.on('ReceiveAgentMetrics', (report) => {
            if (!report) return;
            registerServerHeartbeat();
            const host = (report.hostname || report.stationId || '').toLowerCase();
            const isRec = report.isRecording !== undefined ? Boolean(report.isRecording) : (report.status === 'Recording');
            const status = typeof report.status === 'string' ? report.status : (isRec ? 'Recording' : (report.isStreaming ? 'Monitoring' : 'Standby'));

            setActionPending(prev => {
                const key = Object.keys(prev).find(k => k.toLowerCase() === host);
                if (!key) return prev;
                const pending = prev[key];
                const isConfirmed =
                    (pending === 'starting' && isRec) ||
                    (pending === 'stopping' && !isRec) ||
                    (!isOnline);

                if (isConfirmed) {
                    if (actionPendingTimeoutsRef.current[key]) {
                        clearTimeout(actionPendingTimeoutsRef.current[key]);
                        delete actionPendingTimeoutsRef.current[key];
                    }
                    const next = { ...prev };
                    delete next[key];
                    return next;
                }
                return prev;
            });

            setStations(prev => {
                const idx = prev.findIndex(s => (s.hostname || s.stationId || '').toLowerCase() === host);
                if (idx > -1) {
                    const copy = [...prev];
                    copy[idx] = { ...copy[idx], ...report, isOnline, status };
                    return copy;
                }
                return [...prev, { ...report, isOnline, status }];
            });

            const rawKeys = report.keystrokes || report.Keystrokes;
            if (rawKeys && rawKeys.length > 0) {
                handleIncomingKeystrokes(report.hostname || report.Hostname || host, rawKeys);
            }
        });

        connection.on('ReceiveLiveKeystrokes', (host, keys) => {
            registerServerHeartbeat();
            handleIncomingKeystrokes(host, keys);
        });

        connection.on('ReceiveAllStations', (allStations) => {
            if (Array.isArray(allStations)) {
                registerServerHeartbeat();
                setActionPending(prev => {
                    let hasChanges = false;
                    const next = { ...prev };
                    for (const hostKey of Object.keys(prev)) {
                        const pending = prev[hostKey];
                        const match = allStations.find(s => (s.hostname || s.stationId || '').toLowerCase() === hostKey.toLowerCase());
                        if (match) {
                            const matchIsRec = match.isRecording !== undefined ? Boolean(match.isRecording) : (match.status === 'Recording');
                            const isConfirmed =
                                (pending === 'starting' && matchIsRec) ||
                                (pending === 'stopping' && !matchIsRec) ||
                                (match.isOnline === false);
                            if (isConfirmed) {
                                if (actionPendingTimeoutsRef.current[hostKey]) {
                                    clearTimeout(actionPendingTimeoutsRef.current[hostKey]);
                                    delete actionPendingTimeoutsRef.current[hostKey];
                                }
                                delete next[hostKey];
                                hasChanges = true;
                            }
                        }
                    }
                    return hasChanges ? next : prev;
                });
                setStations(allStations);
            }
        });

        connection.start().then(registerServerHeartbeat).catch(() => { });
        return () => { connection.stop(); };
    }, [apiBaseUrl, isAuthenticated, fetchStations, fetchSystemConfig, registerServerHeartbeat]);

    const handleManualRetry = async () => {
        setIsRetryingConnection(true);
        await Promise.allSettled([
            fetchStations(),
            fetchSystemConfig()
        ]);
        setIsRetryingConnection(false);
    };

    const sortedStations = useMemo(() => {
        return [...stations].sort((a, b) => {
            const nameA = (a.roleAlias || a.displayName || a.hostname || '').toLowerCase();
            const nameB = (b.roleAlias || b.displayName || b.hostname || '').toLowerCase();
            return nameA.localeCompare(nameB, undefined, { numeric: true, sensitivity: 'base' });
        });
    }, [stations]);

    const handleToggleStream = async (hostname, isCurrentlyStreaming, policy = {}) => {
        const targetEnable = !isCurrentlyStreaming;
        const pendingState = targetEnable ? 'starting' : 'stopping';

        if (actionPendingTimeoutsRef.current[hostname]) {
            clearTimeout(actionPendingTimeoutsRef.current[hostname]);
        }

        setActionPending(prev => ({ ...prev, [hostname]: pendingState }));

        actionPendingTimeoutsRef.current[hostname] = setTimeout(() => {
            setActionPending(prev => {
                if (!prev[hostname]) return prev;
                const next = { ...prev };
                delete next[hostname];
                return next;
            });
            delete actionPendingTimeoutsRef.current[hostname];
        }, 25000);

        const queryParams = new URLSearchParams({ enable: targetEnable });
        if (targetEnable && policy.bitrate) queryParams.append('bitrate', policy.bitrate);
        if (targetEnable && policy.fps) queryParams.append('fps', policy.fps);

        try {
            const res = await fetch(`${apiBaseUrl}/api/v1/agent/command/${hostname}?${queryParams.toString()}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            if (!res.ok) {
                if (actionPendingTimeoutsRef.current[hostname]) {
                    clearTimeout(actionPendingTimeoutsRef.current[hostname]);
                    delete actionPendingTimeoutsRef.current[hostname];
                }
                setActionPending(prev => {
                    const next = { ...prev };
                    delete next[hostname];
                    return next;
                });
            }
        } catch (err) {
            console.error('[App] Failed to send stream command:', err);
            if (actionPendingTimeoutsRef.current[hostname]) {
                clearTimeout(actionPendingTimeoutsRef.current[hostname]);
                delete actionPendingTimeoutsRef.current[hostname];
            }
            setActionPending(prev => {
                const next = { ...prev };
                delete next[hostname];
                return next;
            });
        }
    };

    const handleBulkStart = useCallback(async (targetHostnames = [], policy = {}) => {
        if (!targetHostnames || !targetHostnames.length) return;

        const nextPending = {};
        targetHostnames.forEach(hostname => {
            if (actionPendingTimeoutsRef.current[hostname]) {
                clearTimeout(actionPendingTimeoutsRef.current[hostname]);
            }
            nextPending[hostname] = 'starting';
            actionPendingTimeoutsRef.current[hostname] = setTimeout(() => {
                setActionPending(prev => {
                    if (!prev[hostname]) return prev;
                    const next = { ...prev };
                    delete next[hostname];
                    return next;
                });
                delete actionPendingTimeoutsRef.current[hostname];
            }, 25000);
        });

        setActionPending(prev => ({ ...prev, ...nextPending }));

        try {
            const res = await fetch(`${apiBaseUrl}/api/v1/agent/fleet-streaming-policy`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    enable: true,
                    hostnames: targetHostnames
                })
            });
            if (res.ok) {
                await fetchStations();
            }
        } catch (err) {
            console.error('[App] Failed to execute bulk start:', err);
        }
    }, [apiBaseUrl, fetchStations]);

    const handleBulkStop = useCallback(async (targetHostnames = []) => {
        if (!targetHostnames || !targetHostnames.length) return;

        const nextPending = {};
        targetHostnames.forEach(hostname => {
            if (actionPendingTimeoutsRef.current[hostname]) {
                clearTimeout(actionPendingTimeoutsRef.current[hostname]);
            }
            nextPending[hostname] = 'stopping';
            actionPendingTimeoutsRef.current[hostname] = setTimeout(() => {
                setActionPending(prev => {
                    if (!prev[hostname]) return prev;
                    const next = { ...prev };
                    delete next[hostname];
                    return next;
                });
                delete actionPendingTimeoutsRef.current[hostname];
            }, 25000);
        });

        setActionPending(prev => ({ ...prev, ...nextPending }));

        try {
            const res = await fetch(`${apiBaseUrl}/api/v1/agent/fleet-streaming-policy`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    enable: false,
                    hostnames: targetHostnames
                })
            });
            if (res.ok) {
                await fetchStations();
            }
        } catch (err) {
            console.error('[App] Failed to execute bulk stop:', err);
        }
    }, [apiBaseUrl, fetchStations]);

    if (!isInitialized) return null;

    // 1. שער המערכות הראשי (PORTAL LAUNCHER)
    if (!isAuthenticated || currentSubsystem === 'portal') {
        return (
            <SystemLauncher
                onLaunchApp={(appId) => {
                    lastContactTimestampRef.current = Date.now();
                    setCurrentSubsystem(appId);
                    if (appId === 'recording') {
                        fetchStations();
                    }
                }}
            />
        );
    }

    return (
        <div className={`itb-command-center-root ${isServerOfflineModal ? 'is-server-blurred' : ''}`} dir="ltr">
            <div
                className="dynamic-wallpaper-layer"
                style={{ backgroundImage: `url(${LOCAL_WALLPAPERS[timeOfDay]})` }}
                aria-hidden="true"
            />
            <div className="dynamic-scrim-overlay" aria-hidden="true" />

            <div className="itb-command-center-app">
                {/* 2. מערכת ההגדרות (SYSTEM SETTINGS) - מערכת עצמאית מקצה לקצה */}
                {currentSubsystem === 'settings' ? (
                    <SettingsView
                        onReturnToPortal={() => setCurrentSubsystem('portal')}
                        onSettingsSaved={(savedConfig) => {
                            if (savedConfig) setSystemConfig(savedConfig);
                            fetchStations();
                            fetchSystemConfig();
                            fetchClusterConfig();
                        }}
                    />
                ) : (
                    /* 3. מרכז הקלטות המסכים (SCREEN RECORDING CENTER) */
                    <>
                        <CommandCenterHeader
                            stations={sortedStations}
                            serverTelemetry={serverTelemetry}
                            systemConfig={systemConfig}
                            clusterConfig={clusterConfig}
                            onOpenAppSwitcher={(target) => setCurrentSubsystem(typeof target === 'string' ? target : 'portal')}
                            hideOffline={hideOffline}
                            isFaultFilterActive={isFaultFilterActive}
                            onToggleFaultFilter={() => setIsFaultFilterActive(prev => !prev)}
                            isServerConnected={!isServerOfflineModal}
                            lastServerContact={lastServerContact}
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
                            isServerConnected={!isServerOfflineModal}
                            liveKeystrokes={liveKeystrokes}
                        />
                    </>
                )}

                <GlobalJobIndicator />
                <MasterAudioDock stations={stations} />
            </div>

            {/* דיאלוג ניתוק שרת */}
            {isServerOfflineModal && (
                <div className="tactical-modal-backdrop" role="dialog" aria-modal="true">
                    <div className="tactical-disconnect-modal-card">
                        <div className="modal-top-accent-bar" />
                        <div className="modal-header-section">
                            <div className="disconnect-radar-emitter">
                                <div className="radar-ring" />
                                <div className="radar-core-dot" />
                            </div>
                            <div className="modal-title-group">
                                <span className="modal-sub-tag">SYSTEM HEALTH ALERT</span>
                                <h2 className="modal-main-title">C2 SERVER LINK LOST</h2>
                            </div>
                        </div>

                        <div className="modal-body-section">
                            <p className="modal-explanation">
                                Communication with the central recording server has been lost. The display has been frozen to prevent stale telemetry display.
                            </p>
                            <div className="disconnect-diagnostics-box">
                                <div className="diag-row">
                                    <span className="diag-label">STATUS</span>
                                    <span className="diag-val red">SERVER OFFLINE</span>
                                </div>
                                <div className="diag-row">
                                    <span className="diag-label">LAST CONTACT</span>
                                    <span className="diag-val mono">
                                        {lastServerContact ? lastServerContact.toLocaleTimeString() : 'N/A'}
                                    </span>
                                </div>
                                {clusterConfig.clusterMode && (
                                    <div className="diag-row">
                                        <span className="diag-label">CLUSTER MODE</span>
                                        <span className="diag-val cyan">
                                            {clusterConfig.clusterMode.toUpperCase()}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Autonomous Active-Active Failover / VIP Redirection Card */}
                            {clusterConfig.autoFailoverDashboard && (clusterConfig.virtualIp || clusterConfig.partnerServerUrl) ? (
                                <div className="failover-automation-box">
                                    <div className="failover-box-header">
                                        <span className="pulse-warning-dot" />
                                        <span className="failover-title">AUTONOMOUS FAILOVER IN PROGRESS</span>
                                        <span className="failover-countdown-pill">
                                            {isFailoverPaused ? 'PAUSED' : `${failoverCountdown}s`}
                                        </span>
                                    </div>
                                    <p className="failover-desc">
                                        {clusterConfig.enableVirtualIp && clusterConfig.virtualIp ? (
                                            <>
                                                {window.location.hostname === clusterConfig.virtualIp ? (
                                                    <>Virtual IP (<strong>{clusterConfig.virtualIp}</strong>) has floated to surviving Active-Active node. Reconnecting...</>
                                                ) : (
                                                    <>Cluster Virtual IP (VIP): <strong>{clusterConfig.virtualIp}</strong> (Auto-routing to active node)</>
                                                )}
                                            </>
                                        ) : (
                                            <>Active Cluster Peer: <strong>{clusterConfig.partnerServerUrl}</strong></>
                                        )}
                                    </p>
                                    <div className="failover-progress-track">
                                        <div
                                            className={`failover-progress-fill ${isFailoverPaused ? 'paused' : ''}`}
                                            style={{
                                                width: `${Math.max(0, Math.min(100, (failoverCountdown / (clusterConfig.failoverDelaySeconds || 8)) * 100))}%`
                                            }}
                                        />
                                    </div>
                                </div>
                            ) : null}
                        </div>

                        <div className="modal-actions-section">
                            {clusterConfig.enableVirtualIp && clusterConfig.virtualIp && window.location.hostname !== clusterConfig.virtualIp && (
                                <button
                                    type="button"
                                    className="btn-modal-failover"
                                    onClick={() => {
                                        const port = window.location.port ? `:${window.location.port}` : '';
                                        window.location.href = `${window.location.protocol}//${clusterConfig.virtualIp}${port}`;
                                    }}
                                >
                                    👑 CONNECT VIA CLUSTER VIP ({clusterConfig.virtualIp})
                                </button>
                            )}

                            {clusterConfig.partnerServerUrl && (
                                <button
                                    type="button"
                                    className="btn-modal-failover"
                                    onClick={() => {
                                        const target = clusterConfig.partnerServerUrl.trim();
                                        if (target) window.location.href = target;
                                    }}
                                >
                                    ⚡ SWITCH TO ACTIVE PEER NODE
                                </button>
                            )}

                            <div className="modal-actions-secondary-row">
                                <button
                                    type="button"
                                    className="btn-modal-reconnect"
                                    onClick={handleManualRetry}
                                    disabled={isRetryingConnection}
                                >
                                    {isRetryingConnection ? 'CHECKING CONNECTION...' : '⟳ RECONNECT NOW'}
                                </button>

                                {clusterConfig.autoFailoverDashboard && (clusterConfig.partnerServerUrl || clusterConfig.virtualIp) && (
                                    <button
                                        type="button"
                                        className="btn-modal-pause-failover"
                                        onClick={() => setIsFailoverPaused(p => !p)}
                                    >
                                        {isFailoverPaused ? '▶ RESUME FAILOVER' : '⏸ PAUSE FAILOVER'}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}