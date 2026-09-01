import { useState, useEffect, useCallback } from 'react';
import DashboardGrid from './components/Dashboard/DashboardGrid';
import CommandCenterHeader from './components/UI/CommandCenterHeader';
import SettingsModal from './components/Settings/SettingsModal';
import './App.scss';

export default function App() {
    const [stations, setStations] = useState([]);
    const [actionPending, setActionPending] = useState({});

    const [settingsOpen, setSettingsOpen] = useState(false);
    const [telemetryOpen, setTelemetryOpen] = useState(false);

    // 💡 ניהול מדדי השרת המרכזיים ברמת ה-App כדי להזין את ה-Header העליון
    const [actualServerHealth, setActualServerHealth] = useState({
        hostCpuPct: 0,
        processCpuPct: 0,
        processRamMb: 0,
        hostTotalRamMb: 16384,
        netTxMbps: 0,
        netMaxMbps: 1000,
        uptimeSeconds: 0
    });

    const fetchStations = useCallback(async (isActive = true) => {
        try {
            const response = await fetch('/api/v1/dashboard/stations');
            if (response.ok) {
                const data = await response.json();
                if (isActive) {
                    setStations(data);
                }
            }
        } catch (err) {
            console.error('Failed to fetch stations telemetry:', err);
        }
    }, []);

    // 💡 דגימת מדדי השרת כל 2 שניות ברמת האפליקציה הראשית
    useEffect(() => {
        let isActive = true;

        const fetchServerHealth = async () => {
            try {
                const response = await fetch('/api/monitoring/server');
                if (response.ok && isActive) {
                    const data = await response.json();
                    setActualServerHealth({
                        hostCpuPct: data.hostCpuPct || 0,
                        processCpuPct: data.processCpuPct || 0,
                        processRamMb: data.processRamMb || 0,
                        hostTotalRamMb: data.hostTotalRamMb > 0 ? data.hostTotalRamMb : 16384,
                        netTxMbps: data.serverNetworkTxMbps || 0,
                        netMaxMbps: data.serverNetworkLinkSpeed > 0 ? data.serverNetworkLinkSpeed : 1000,
                        uptimeSeconds: data.uptimeSeconds || 0
                    });
                }
            } catch (error) {
                // התעלמות שקטה בשגיאות תקשורת זמניות
            }
        };

        fetchServerHealth();
        const healthInterval = setInterval(fetchServerHealth, 2000);

        return () => {
            isActive = false;
            clearInterval(healthInterval);
        };
    }, []);

    useEffect(() => {
        let isActive = true;

        const loadData = async () => {
            await fetchStations(isActive);
        };

        loadData();

        const interval = setInterval(() => {
            if (isActive) fetchStations(isActive);
        }, 15000);

        return () => {
            isActive = false;
            clearInterval(interval);
        };
    }, [fetchStations]);

    const toggleStreamingPolicy = async (hostname, currentStreamingStatus) => {
        const nextState = !currentStreamingStatus;
        setActionPending(prev => ({ ...prev, [hostname]: true }));
        try {
            const response = await fetch(`/api/v1/agent/command/${hostname}?enable=${nextState}`, { method: 'POST' });
            if (response.ok) await fetchStations();
        } catch (err) {
            console.error(err);
        } finally {
            setActionPending(prev => ({ ...prev, [hostname]: false }));
        }
    };

    return (
        <div className="p-6 bg-[#010409] min-h-screen text-white dashboard-container dir-ltr">
            {/* 💡 העברת מדדי השרת אל ה-CommandCenterHeader העליון */}
            <CommandCenterHeader
                activeAgentsCount={stations.length}
                serverHealth={actualServerHealth}
                onOpenTelemetry={() => setTelemetryOpen(true)}
                onOpenSettings={() => setSettingsOpen(true)}
            />

            <DashboardGrid
                stations={stations}
                actionPending={actionPending}
                onToggleStream={toggleStreamingPolicy}
                telemetryOpen={telemetryOpen}
                onCloseTelemetry={() => setTelemetryOpen(false)}
            />

            {settingsOpen && <SettingsModal onClose={() => setSettingsOpen(false)} />}
        </div>
    );
}