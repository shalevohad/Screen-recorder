// ==========================================
// File: Features/Extractor/Client/src/index.js
// ==========================================
import React from 'react';
import ReactDOM from 'react-dom/client';
import ExtractorTile from './ExtractorTile.jsx';
import ExportJobMonitor from './components/ExportMonitor/ExportJobMonitor.jsx';

const DAEMON_CONTAINER_ID = 'itb-extractor-daemon-container';

/**
 * Bootstraps the export job monitor daemon directly on document.body as an independent background service.
 * @returns {void}
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

// Bootstrap daemon immediately when file is loaded by RemoteWidgetHost
bootstrapBackgroundDaemon();

/**
 * Mount method invoked by RemoteWidgetHost.jsx to mount the tile widget inside a dashboard container.
 * @param {HTMLElement} container - Target DOM container node.
 * @param {Object} [props={}] - Properties passed into the widget tile.
 * @returns {Function} Cleanup function to unmount the tile.
 */
export function mount(container, props = {}) {
    bootstrapBackgroundDaemon();

    const root = ReactDOM.createRoot(container);
    root.render(React.createElement(ExtractorTile, props));

    // Cleanup: When navigating away from tab, unmount only the tile widget.
    // The background daemon mounted on document.body remains active across the app.
    return () => {
        root.unmount();
    };
}

export { ExtractorTile, ExportJobMonitor };
export default ExtractorTile;