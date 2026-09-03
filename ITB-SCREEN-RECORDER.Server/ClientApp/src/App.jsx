import { useState, useEffect, useCallback } from 'react';
import * as signalR from '@microsoft/signalr';
import CommandCenterHeader from './components/UI/CommandCenterHeader';
import DashboardGrid from './components/Dashboard/DashboardGrid';
import './App.scss';

export default function App() {
    const [stations, setStations] = useState([]);
    const [serverTelemetry, setServerTelemetry] = useState(null);
    const [actionPending, setActionPending] = useState({});
    const [hideOffline, setHideOffline] = useState(false);

    const apiPort = import.meta.env?.VITE_SERVER_PORT || '5090';
    const apiBaseUrl = `http://${window.location.hostname}:${apiPort}`;

    // 1. טעינה ראשונית של רשימת העמדות
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

    useEffect(() => {
        fetchStations();
    }, [fetchStations]);

    // 2. חיבור SignalR מרכזי לטלמטריית שרת ועמדות
    useEffect(() => {
        const hubUrl = `${apiBaseUrl}/hubs/telemetry`;
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl)
            .withAutomaticReconnect([0, 2000, 5000, 10000])
            .build();

        // קבלת טלמטריית שרת כוללת עבור השעון וה-Header
        connection.on('ReceiveServerTelemetry', (telemetry) => {
            setServerTelemetry(telemetry);
        });

        // קבלת מדדי סוכן חיים ועדכון סטטוס מקומי
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

    // 3. הפעלה/עצירה של שידור עמדה בודדת
    const handleToggleStream = async (hostname, isCurrentlyStreaming) => {
        setActionPending(prev => ({ ...prev, [hostname]: true }));

        const endpoint = isCurrentlyStreaming ? 'stop-stream' : 'start-stream';
        try {
            const res = await fetch(`${apiBaseUrl}/api/agents/${hostname}/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });

            if (res.ok) {
                setStations(prev => prev.map(st => {
                    if (st.hostname === hostname) {
                        return { ...st, isStreaming: !isCurrentlyStreaming };
                    }
                    return st;
                }));
            } else {
                console.error(`[App] Failed to ${endpoint} for ${hostname}`);
            }
        } catch (err) {
            console.error(`[App] Error toggling stream for ${hostname}:`, err);
        } finally {
            setActionPending(prev => ({ ...prev, [hostname]: false }));
        }
    };

    // 4. הפעלת שידור גורפת (Fleet Bulk Start)
    const handleBulkStart = async () => {
        try {
            const res = await fetch(`${apiBaseUrl}/api/agents/fleet/start-stream`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            if (res.ok) {
                setStations(prev => prev.map(s => s.isOnline ? { ...s, isStreaming: true } : s));
            }
        } catch (err) {
            console.error('[App] Failed bulk start:', err);
        }
    };

    // 5. עצירת שידור גורפת (Fleet Bulk Stop)
    const handleBulkStop = async () => {
        try {
            const res = await fetch(`${apiBaseUrl}/api/agents/fleet/stop-stream`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            if (res.ok) {
                setStations(prev => prev.map(s => ({ ...s, isStreaming: false })));
            }
        } catch (err) {
            console.error('[App] Failed bulk stop:', err);
        }
    };

    return (
        <div className="itb-command-center-app" dir="ltr">
            {/* Header טקטי ראשי עם שעון NOC, מודול טלמטריה וקאונטר סוכנים חכם */}
            <CommandCenterHeader
                stations={stations}
                hideOffline={hideOffline}
                onToggleFilter={() => setHideOffline(prev => !prev)}
                serverTelemetry={serverTelemetry}
            />

            {/* גריד העמדות וסרגל הצד הטקטי */}
            <DashboardGrid
                stations={stations}
                hideOffline={hideOffline}
                setHideOffline={setHideOffline}
                actionPending={actionPending}
                onToggleStream={handleToggleStream}
                onBulkStart={handleBulkStart}
                onBulkStop={handleBulkStop}
                direction="ltr"
            />
        </div>
    );
}