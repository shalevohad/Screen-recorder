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
            <CommandCenterApp />
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

    const [isServerOfflineModal, setIsServerOfflineModal] = useState(false);
    const [lastServerContact, setLastServerContact] = useState(() => new Date());
    const [isRetryingConnection, setIsRetryingConnection] = useState(false);

    const [clusterConfig, setClusterConfig] = useState(() => {
        try {
            return {
                role: localStorage.getItem('itb_cluster_role') || 'Primary',
                partnerServerUrl: localStorage.getItem('itb_cluster_partner_url') || '',
                autoFailoverDashboard: localStorage.getItem('itb_cluster_failover_enabled') !== 'false',
                failoverDelaySeconds: Number(localStorage.getItem('itb_cluster_failover_delay')) || 8,
                primaryServerUrl: localStorage.getItem('itb_cluster_primary_url') || ''
            };
        } catch {
            return { role: 'Primary', partnerServerUrl: '', autoFailoverDashboard: true, failoverDelaySeconds: 8, primaryServerUrl: '' };
        }
    });

    const [failoverCountdown, setFailoverCountdown] = useState(8);
    const [isFailoverPaused, setIsFailoverPaused] = useState(false);
    const [primaryRecovered, setPrimaryRecovered] = useState(false);
    const [failbackCountdown, setFailbackCountdown] = useState(5);
    const [isFailbackDismissed, setIsFailbackDismissed] = useState(false);

    const lastContactTimestampRef = useRef(0);

    useEffect(() => {
        lastContactTimestampRef.current = Date.now();
    }, []);

    const [hideOffline, setHideOffline] = useState(true);
    const [isFaultFilterActive, setIsFaultFilterActive] = useState(false);
    const [timeOfDay, setTimeOfDay] = useState(resolveTimeOfDay);

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
                const role = data.role || data.Role || 'Primary';
                const partner = (data.partnerServerUrl || data.PartnerServerUrl || '').trim();
                const autoFailover = data.autoFailoverDashboard ?? data.AutoFailoverDashboard ?? true;
                const delay = Number(data.failoverDelaySeconds || data.FailoverDelaySeconds) || 8;

                const currentOrigin = window.location.origin;
                let primaryUrl = '';
                if (role.toLowerCase() === 'primary') {
                    primaryUrl = currentOrigin;
                    localStorage.setItem('itb_cluster_primary_url', currentOrigin);
                } else if (role.toLowerCase() === 'secondary') {
                    primaryUrl = partner || localStorage.getItem('itb_cluster_primary_url') || '';
                    if (primaryUrl) localStorage.setItem('itb_cluster_primary_url', primaryUrl);
                }

                localStorage.setItem('itb_cluster_role', role);
                localStorage.setItem('itb_cluster_partner_url', partner);
                localStorage.setItem('itb_cluster_failover_enabled', String(autoFailover));
                localStorage.setItem('itb_cluster_failover_delay', String(delay));

                setClusterConfig({
                    role,
                    priority: data.priority ?? data.Priority,
                    serverName: data.serverName || data.ServerName,
                    discoveryPort: data.discoveryPort || data.DiscoveryPort,
                    multicastAddress: data.multicastAddress || data.MulticastAddress,
                    partnerServerUrl: partner,
                    autoFailoverDashboard: autoFailover,
                    failoverDelaySeconds: delay,
                    primaryServerUrl: primaryUrl
                });
                setFailoverCountdown(delay);
            }
        } catch (err) {
            console.warn('[App] fetchClusterConfig error:', err.message);
        }
    }, [apiBaseUrl]);

    // ניהול ספירה לאחור ומעבר אוטומטי לשרת המשני בעת ניתוק
    useEffect(() => {
        if (!isServerOfflineModal) {
            setFailoverCountdown(clusterConfig.failoverDelaySeconds || 8);
            setIsFailoverPaused(false);
            return;
        }

        const canFailover = clusterConfig.autoFailoverDashboard && Boolean(clusterConfig.partnerServerUrl?.trim());
        if (!canFailover || isFailoverPaused) return;

        const timer = setInterval(() => {
            setFailoverCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    const target = clusterConfig.partnerServerUrl.trim();
                    if (target) {
                        window.location.href = target;
                    }
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isServerOfflineModal, isFailoverPaused, clusterConfig]);

    // בדיקת שרידות וזמינות של השרת הראשי כאשר המשתמש מחובר לשרת המשני (Failback Health Probe)
    useEffect(() => {
        if (!isAuthenticated) return;
        const isSecondary = clusterConfig.role?.toLowerCase() === 'secondary';
        const primaryTarget = clusterConfig.primaryServerUrl || clusterConfig.partnerServerUrl;
        if (!isSecondary || !primaryTarget || isFailbackDismissed) return;

        const probeInterval = setInterval(async () => {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 2000);
                const res = await fetch(`${primaryTarget}/api/v1/health`, {
                    signal: controller.signal,
                    mode: 'cors',
                    cache: 'no-cache'
                });
                clearTimeout(timeoutId);

                if (res.ok) {
                    const data = await res.json();
                    if (data.status === 'Healthy' || data.Status === 'Healthy') {
                        setPrimaryRecovered(true);
                    }
                }
            } catch {
                // Primary node still unavailable
            }
        }, 6000);

        return () => clearInterval(probeInterval);
    }, [isAuthenticated, clusterConfig, isFailbackDismissed]);

    // ספירה לאחור ומעבר אוטומטי חזרה לשרת הראשי (Auto-Failback)
    useEffect(() => {
        if (!primaryRecovered || isFailbackDismissed) return;

        const timer = setInterval(() => {
            setFailbackCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    const target = clusterConfig.primaryServerUrl || clusterConfig.partnerServerUrl;
                    if (target) window.location.href = target;
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [primaryRecovered, isFailbackDismissed, clusterConfig]);

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
                    uptimeSeconds: telemetry.uptimeSeconds ?? telemetry.systemUptimeSeconds ?? base.uptimeSeconds ?? 0,
                    cpuPct: telemetry.cpuPct ?? telemetry.hostCpuPct ?? base.cpuPct ?? 0,
                    hostRamPct: telemetry.hostRamPct ?? telemetry.ramPct ?? base.hostRamPct ?? 0,
                    storagePool: telemetry.storagePool ?? base.storagePool ?? null,
                    netUtilPct: telemetry.netUtilPct ?? base.netUtilPct ?? 0
                };
            });
        });

        connection.on('ReceiveMaintenanceJob', (job) => {
            registerServerHeartbeat();
            setServerTelemetry(prev => ({ ...(prev || {}), maintenanceJob: job }));
        });

        connection.on('ReceiveAgentMetrics', (report) => {
            if (!report) return;
            registerServerHeartbeat();
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
                registerServerHeartbeat();
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
        } finally {
            setActionPending(prev => ({ ...prev, [hostname]: false }));
        }
    };

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
                        onSettingsSaved={() => {
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
                            onOpenAppSwitcher={() => setCurrentSubsystem('portal')}
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
                            onBulkStart={() => { }}
                            onBulkStop={() => { }}
                            onUpdateStationSettings={setStations}
                            systemConfig={systemConfig}
                            onSystemConfigUpdate={setSystemConfig}
                            direction="ltr"
                            hideOffline={hideOffline}
                            onToggleHideOffline={() => setHideOffline(prev => !prev)}
                            isFaultFilterActive={isFaultFilterActive}
                            onExitFaultFilter={() => setIsFaultFilterActive(false)}
                            isServerConnected={!isServerOfflineModal}
                        />
                    </>
                )}

                <GlobalJobIndicator />
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
                                {clusterConfig.role && (
                                    <div className="diag-row">
                                        <span className="diag-label">ACTIVE NODE ROLE</span>
                                        <span className="diag-val cyan">
                                            {clusterConfig.role.toUpperCase()}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Failover Automation Card */}
                            {clusterConfig.autoFailoverDashboard && clusterConfig.partnerServerUrl ? (
                                <div className="failover-automation-box">
                                    <div className="failover-box-header">
                                        <span className="pulse-warning-dot" />
                                        <span className="failover-title">AUTOMATIC FAILOVER INITIATED</span>
                                        <span className="failover-countdown-pill">
                                            {isFailoverPaused ? 'PAUSED' : `${failoverCountdown}s`}
                                        </span>
                                    </div>
                                    <p className="failover-desc">
                                        Standby Partner Node: <strong>{clusterConfig.partnerServerUrl}</strong>
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
                            {clusterConfig.autoFailoverDashboard && clusterConfig.partnerServerUrl && (
                                <button
                                    type="button"
                                    className="btn-modal-failover"
                                    onClick={() => {
                                        const target = clusterConfig.partnerServerUrl.trim();
                                        if (target) window.location.href = target;
                                    }}
                                >
                                    ⚡ SWITCH TO SECONDARY NOW
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

                                {clusterConfig.autoFailoverDashboard && clusterConfig.partnerServerUrl && (
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

            {/* Failback Alert Banner when Primary recovers */}
            {primaryRecovered && !isFailbackDismissed && (
                <aside className="tactical-failback-toast-bar" role="alert">
                    <div className="failback-toast-content">
                        <div className="failback-beacon">
                            <span className="beacon-ring" />
                            <span className="beacon-core" />
                        </div>
                        <div className="failback-text-group">
                            <span className="failback-tag">FAILBACK READY</span>
                            <span className="failback-title">
                                Primary C2 Server is back online. Returning to Primary in <strong>{failbackCountdown}s</strong>...
                            </span>
                        </div>
                    </div>
                    <div className="failback-actions">
                        <button
                            type="button"
                            className="btn-failback-now"
                            onClick={() => {
                                const target = clusterConfig.primaryServerUrl || clusterConfig.partnerServerUrl;
                                if (target) window.location.href = target;
                            }}
                        >
                            RETURN TO PRIMARY NOW
                        </button>
                        <button
                            type="button"
                            className="btn-failback-dismiss"
                            onClick={() => setIsFailbackDismissed(true)}
                        >
                            STAY ON SECONDARY
                        </button>
                    </div>
                </aside>
            )}
        </div>
    );
}