import { useState, useEffect, useCallback } from 'react';
import DashboardGrid from './components/Dashboard/DashboardGrid';
import SettingsModal from './components/Settings/SettingsModal';
import './App.scss';

export default function App() {
    const [stations, setStations] = useState([]);
    const [actionPending, setActionPending] = useState({});

    const [settingsOpen, setSettingsOpen] = useState(false);
    const [telemetryOpen, setTelemetryOpen] = useState(false); // הסטייט החדש לגרף

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
            {/* Header */}
            <header className="mb-6 flex justify-between items-center border-b border-gray-800 pb-4 dir-ltr">
                <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        ITB Screen Recorder - Live Agents Dashboard
                    </h1>
                </div>
                <div className="flex items-center gap-3">
                    <div className="text-xs font-mono px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-lg text-gray-300">
                        Active Agents: <span className="text-green-400 font-bold">{stations.length}</span>
                    </div>

                    {/* 💡 כפתור הגרף החדש */}
                    <button
                        onClick={() => setTelemetryOpen(true)}
                        title="Global Telemetry"
                        className="p-2 bg-gray-900 border border-gray-800 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                        </svg>
                    </button>

                    <button
                        onClick={() => setSettingsOpen(true)}
                        title="Settings"
                        className="p-2 bg-gray-900 border border-gray-800 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="3" />
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                        </svg>
                    </button>
                </div>
            </header>

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