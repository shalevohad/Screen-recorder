import React from 'react';
import StationThumbnail from './components/StationThumbnail';
import './styles/App.scss';

export default function App() {
    const [stations, setStations] = React.useState([]);
    const [actionPending, setActionPending] = React.useState({});

    const fetchStations = async () => {
        try {
            const response = await fetch('/api/v1/dashboard/stations');
            if (response.ok) {
                const data = await response.json();
                setStations(data);
            }
        } catch (err) {
            console.error('Failed to fetch stations telemetry:', err);
        }
    };

    React.useEffect(() => {
        fetchStations();
        const interval = setInterval(fetchStations, 3000);
        return () => clearInterval(interval);
    }, []);

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

            {/* NetSupport Style Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                {stations.length === 0 ? (
                    <div className="text-gray-500 font-mono col-span-full text-center py-24 border border-dashed border-gray-800 rounded-xl bg-gray-900/30">
                        🔄 ממתין להתקשרות ראשונית...
                    </div>
                ) : (
                    stations.map((station) => (
                        <StationThumbnail
                            key={station.hostname}
                            hostname={station.hostname}
                            ipAddress={station.ipAddress}
                            hlsUrl={station.hlsUrl}
                            isOnline={station.isOnline}
                            isStreaming={station.isStreaming}
                            cpuUsage={station.cpuUsage}
                            gpuUsage={station.gpuUsage}
                            hasAudio={station.hasAudio}
                            isPending={actionPending[station.hostname]}
                            onToggleStream={() => toggleStreamingPolicy(station.hostname, station.isStreaming)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}