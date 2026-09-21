// ==========================================
// File: Features/Extractor/Client/src/index.js
// ==========================================
import React from 'react';
import ReactDOM from 'react-dom/client';
import ExtractorTile from './ExtractorTile.jsx';
import ExportJobMonitor from './components/ExportMonitor/ExportJobMonitor.jsx';

const DAEMON_CONTAINER_ID = 'itb-extractor-daemon-container';

/**
 * הרצת מנהל המשימות ישירות ב-document.body כ-Service עצמאי
 */
function bootstrapBackgroundDaemon() {
    if (typeof window === 'undefined') return;
    if (window.__ITB_EXTRACTOR_DAEMON_INITIALIZED__) return;

    let container = document.getElementById(DAEMON_CONTAINER_ID);
    if (!container) {
        container = document.createElement('div');
        container.id = DAEMON_CONTAINER_ID;
        document.body.appendChild(container);
    }

    try {
        const root = ReactDOM.createRoot(container);
        root.render(React.createElement(ExportJobMonitor));
        window.__ITB_EXTRACTOR_DAEMON_INITIALIZED__ = true;
    } catch (err) {
        console.warn('[Extractor] Daemon mount failed:', err);
    }
}

// הפעלה ברגע שהקובץ נטען על ידי RemoteWidgetHost
bootstrapBackgroundDaemon();

/**
 * מתודת ה-Mount הנקראת על ידי RemoteWidgetHost.jsx
 */
export function mount(container, props = {}) {
    bootstrapBackgroundDaemon();

    const root = ReactDOM.createRoot(container);
    root.render(React.createElement(ExtractorTile, props));

    // Cleanup: בעת יציאה מהטאב מנקים אך ורק את ה-Tile
    // ה-Daemon שיושב ב-document.body ממשיך ללוות את המשתמש בכל המערכת
    return () => {
        root.unmount();
    };
}

export { ExtractorTile, ExportJobMonitor };
export default ExtractorTile;