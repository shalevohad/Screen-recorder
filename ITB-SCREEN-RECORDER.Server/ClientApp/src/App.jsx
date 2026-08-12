import React from 'react';
import StationThumbnail from './components/StationThumbnail';
import './App.scss'; // כאן תוכל לכתוב קוד SCSS מלא ומקונן!

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
        <div className="p-6 bg-gray-950 min-h-screen text-white dashboard-container">
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stations.length === 0 ? (
                    <div className="text-gray-500 font-mono col-span-full text-center py-24 border border-dashed border-gray-800 rounded-xl bg-gray-900/30">
                        🔄 ממתין להתקשרות ראשונית...
                    </div>
                ) : (
                    stations.map((station) => (
                        <div key={station.hostname} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col justify-between hover:border-gray-700 transition-all duration-200">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <strong className="font-mono text-base text-gray-100">{station.hostname}</strong>
                                        <div className="text-[11px] text-gray-400 font-mono mt-0.5">{station.ipAddress}</div>
                                    </div>
                                    <div className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono border ${station.isOnline ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                                        {station.isOnline ? 'ONLINE' : 'OFFLINE'}
                                    </div>
                                </div>
                                <StationThumbnail hostname={station.hostname} hlsUrl={station.hlsUrl} isOnline={station.isOnline} isStreaming={station.isStreaming} />
                            </div>
                            
                            <div className="mt-4 pt-3 border-t border-gray-800 flex flex-col gap-3">
                                <div className="flex justify-between items-center text-[11px] text-gray-400 font-mono">
                                    <div className="flex gap-3">
                                        <span>CPU: <span className="text-gray-200">{station.cpuUsage}%</span></span>
                                        <span>GPU: <span className="text-gray-200">{station.gpuUsage}%</span></span>
                                    </div>
                                    <span>Mic: {station.hasAudio ? '🔊' : '🔇'}</span>
                                </div>
                                <div className="flex items-center justify-between gap-2">
                                    <span className="text-[11px] font-mono text-gray-400">Status: <span className="text-amber-400">{station.status}</span></span>
                                    <button onClick={() => toggleStreamingPolicy(station.hostname, station.isStreaming)} disabled={!station.isOnline || actionPending[station.hostname]} className="px-3 py-1 rounded text-xs font-mono font-bold bg-green-950/40 text-green-400 border border-green-900/50 hover:bg-green-900/30">
                                        {actionPending[station.hostname] ? '⏳...' : station.isStreaming ? 'Stop' : 'Start'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}