// RemoteWidgetHost.jsx
import { useEffect, useRef, useState } from 'react';
import './RemoteWidgetHost.scss';

export default function RemoteWidgetHost({
    scriptUrl,
    widgetProps = {},
    fallback = (
        <div className="widget-fallback-loading">
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
            <div className="remote-widget-host-root">
                <div className="widget-error-box">
                    <div className="error-title">WIDGET LOAD ERROR:</div>
                    <div className="error-message">{loadState.error}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="remote-widget-host-root">
            {loadState.loading && fallback}
            <div ref={containerRef} className="widget-viewport-mount" />
        </div>
    );
}