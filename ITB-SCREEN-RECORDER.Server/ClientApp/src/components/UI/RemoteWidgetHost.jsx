import { useEffect, useRef, useState } from 'react';

export default function RemoteWidgetHost({
    scriptUrl,
    widgetProps = {},
    fallback = (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: '#64748b',
            fontSize: '0.8rem',
            letterSpacing: '0.05em',
            fontFamily: 'monospace'
        }}>
            INITIALIZING MODULE...
        </div>
    )
}) {
    const containerRef = useRef(null);
    const [loadState, setLoadState] = useState({ loading: true, error: null });
    const [currentUrl, setCurrentUrl] = useState(scriptUrl);

    if (currentUrl !== scriptUrl) {
        setCurrentUrl(scriptUrl);
        setLoadState({ loading: true, error: null });
    }

    const serializedProps = JSON.stringify(widgetProps);

    useEffect(() => {
        if (!scriptUrl) return;

        let isMounted = true;
        let cleanupFn = null;

        const linkId = 'extractor-widget-style';
        if (!document.getElementById(linkId)) {
            const link = document.createElement('link');
            link.id = linkId;
            link.rel = 'stylesheet';
            link.href = '/extractor/style.css';
            document.head.appendChild(link);
        }

        const parsedProps = JSON.parse(serializedProps);

        import(/* @vite-ignore */ scriptUrl)
            .then((mod) => {
                if (!isMounted) return;
                setLoadState({ loading: false, error: null });

                if (typeof mod.mount === 'function' && containerRef.current) {
                    cleanupFn = mod.mount(containerRef.current, parsedProps);
                } else {
                    throw new Error('Module does not export a mount() function.');
                }
            })
            .catch((err) => {
                if (!isMounted) return;
                console.error('[RemoteWidgetHost] Error loading widget:', err);
                setLoadState({
                    loading: false,
                    error: err?.message || 'Failed to load remote widget'
                });
            });

        return () => {
            isMounted = false;
            if (typeof cleanupFn === 'function') {
                try {
                    cleanupFn();
                } catch (err) {
                    console.error('[RemoteWidgetHost] Cleanup error:', err);
                }
            }
        };
    }, [scriptUrl, serializedProps]);

    if (loadState.error) {
        return (
            <div style={{
                padding: '16px',
                color: '#f43f5e',
                backgroundColor: 'rgba(244, 63, 94, 0.1)',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontFamily: 'monospace'
            }}>
                <strong>WIDGET LOAD ERROR:</strong>
                <div style={{ marginTop: '4px' }}>{loadState.error}</div>
            </div>
        );
    }

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            {loadState.loading && fallback}
            <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
        </div>
    );
}