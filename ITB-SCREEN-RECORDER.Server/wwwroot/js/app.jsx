// 1. קומפוננטת ה-Thumbnail החיה המבוססת על Video.js
function StationThumbnail({ hostname, hlsUrl, isOnline, isStreaming }) {
    const videoRef = React.useRef(null);
    const playerRef = React.useRef(null);

    React.useEffect(() => {
        if (isOnline && isStreaming && hlsUrl) {
            if (!playerRef.current && videoRef.current) {
                // אתחול ראשוני של הנגן
                playerRef.current = videojs(videoRef.current, {
                    autoplay: true,
                    controls: false, // ללא כפתורים כדי שישמש כ-Thumbnail נקי
                    muted: true,     // חובה לדפדפנים להפעלה אוטומטית
                    fluid: true,
                    liveui: true,
                    sources: [{ src: hlsUrl, type: 'application/x-mpegURL' }]
                }, () => {
                    playerRef.current.play().catch(() => { });
                });
            } else if (playerRef.current) {
                // עדכון כתובת ה-Stream במידה והשתנתה
                playerRef.current.src({ src: hlsUrl, type: 'application/x-mpegURL' });
                playerRef.current.play().catch(() => { });
            }
        }

        return () => {
            if (playerRef.current) {
                playerRef.current.dispose();
                playerRef.current = null;
            }
        };
    }, [hlsUrl, isOnline, isStreaming]);

    return (
        <div className="relative w-full aspect-video bg-gray-950 rounded-lg overflow-hidden border border-gray-800 shadow-inner">
            {isOnline && isStreaming && hlsUrl ? (
                <div data-vjs-player className="w-full h-full">
                    <video
                        ref={videoRef}
                        className="video-js vjs-fluid vjs-default-skin w-full h-full object-cover"
                        playsInline
                        muted
                    />
                </div>
            ) : (
                <div className="flex items-center justify-center h-full text-gray-500 text-xs font-mono">
                    📺 אין שידור חי מהעמדה
                </div>
            )}

            <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/70 backdrop-blur-sm rounded text-[10px] text-white font-mono z-10 border border-gray-800">
                {hostname}
            </div>
        </div>
    );
}

// 2. קומפוננטת ה-Dashboard הראשית
function App() {
    const [stations, setStations] = React.useState([]);

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
        const interval = setInterval(fetchStations, 3000); // רענון נתונים אוטומטי
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="p-6 bg-gray-950 min-h-screen text-white">
            <header className="mb-6 flex justify-between items-center border-b border-gray-800 pb-4">
                <h1 className="text-2xl font-bold tracking-wide">ITB Screen Recorder - Live Fleet Dashboard</h1>
                <div className="text-xs font-mono text-gray-400">Total Stations: {stations.length}</div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stations.length === 0 ? (
                    <div className="text-gray-400 font-mono col-span-full text-center py-12">
                        ממתין לנתוני טלמטריה וחיבור מהשרת...
                    </div>
                ) : (
                    stations.map((station) => (
                        <div
                            className="bg-gray-900 border border-gray-800 rounded-xl p-4 shadow-xl flex flex-col justify-between"
                            key={station.hostname}
                        >
                            <div>
                                <div className="flex justify-between items-center mb-3">
                                    <div>
                                        <strong className="font-mono text-base">{station.hostname}</strong>
                                        <div className="text-[11px] text-gray-400 font-mono">{station.ipAddress}</div>
                                    </div>
                                    <div className={`px-2.5 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1.5 ${station.isOnline ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                                        }`}>
                                        <span className={`w-2 h-2 rounded-full ${station.isOnline ? 'bg-green-500' : 'bg-red-500'}`} />
                                        {station.isOnline ? 'מחובר' : 'מנותק'}
                                    </div>
                                </div>

                                {/* שילוב קומפוננטת ה-Thumbnail החיה */}
                                <StationThumbnail
                                    hostname={station.hostname}
                                    hlsUrl={station.hlsUrl}
                                    isOnline={station.isOnline}
                                    isStreaming={station.isStreaming}
                                />
                            </div>

                            <div className="mt-4 pt-3 border-t border-gray-800 flex justify-between text-xs text-gray-400 font-mono">
                                <span>מצב: {station.status}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

// 3. רינדור האפליקציה ל-DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);