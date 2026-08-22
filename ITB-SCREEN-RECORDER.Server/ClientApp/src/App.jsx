import { useState, useEffect, useCallback } from 'react';
import DashboardGrid from './components/DashboardGrid';
import './styles/App.scss';

export default function App() {
    const [stations, setStations] = useState([]);
    const [actionPending, setActionPending] = useState({});

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
        }, 3000);

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
        <div className="p-6 bg-[#010409] min-h-screen text-white dashboard-container">
            {/* Header */}
            <header className="mb-6 flex justify-between items-center border-b border-gray-800 pb-4">
                <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        ITB Screen Recorder - Live Fleet Dashboard
                    </h1>
                </div>
                <div className="text-xs font-mono px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-lg text-gray-300">
                    Active Agents: <span className="text-green-400 font-bold">{stations.length}</span>
                </div>
            </header>

            {/* החלפנו את הגריד הסטטי בקומפוננטת הזום הדינמית שלנו */}
            <DashboardGrid
                stations={stations}
                actionPending={actionPending}
                onToggleStream={toggleStreamingPolicy}
            />
        </div>
    );
}