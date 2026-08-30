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
            {/* 💡 החלפת ה-Header הישן ב-CommandCenterHeader המבצעי החדש */}
            <CommandCenterHeader 
                activeAgentsCount={stations.length}
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