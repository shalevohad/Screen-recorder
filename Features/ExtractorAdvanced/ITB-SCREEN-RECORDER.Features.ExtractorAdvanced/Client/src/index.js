// ==========================================
// File: Features/ExtractorAdvanced/Client/src/index.js
// ==========================================
import React from 'react';
import ReactDOM from 'react-dom/client';
import ExtractorAdvancedStudio from './ExtractorAdvancedStudio.jsx';
import ExportJobMonitor from './components/ExportMonitor/ExportJobMonitor.jsx';
import './ExtractorAdvanced.scss';

const STYLE_ID = 'itb-extractor-advanced-theme';
const GLOBAL_MONITOR_CONTAINER_ID = 'itb-global-export-job-monitor-root';

/**
 * Injects module stylesheet into the document head if not already present.
 */
function injectStyles() {
    if (typeof document === 'undefined') return;

    if (!document.getElementById(STYLE_ID)) {
        const link = document.createElement('link');
        link.id = STYLE_ID;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = '/extractor-advanced/extractor-advanced.style.css';
        document.head.appendChild(link);
    }
}

// Execute on initial module load
injectStyles();

/**
 * Ensures global single-instance mounting of the ExportJobMonitor in document.body.
 * Keeps export status HUD floating even across tab navigation.
 */
(function ensureGlobalJobMonitorHost() {
    if (typeof document === 'undefined') return;

    let container = document.getElementById(GLOBAL_MONITOR_CONTAINER_ID);
    if (!container) {
        container = document.createElement('div');
        container.id = GLOBAL_MONITOR_CONTAINER_ID;
        document.body.appendChild(container);

        try {
            const root = ReactDOM.createRoot(container);
            root.render(React.createElement(ExportJobMonitor, { isGlobalHost: true }));
        } catch (err) {
            console.error('[ExtractorAdvanced] Failed initializing global job monitor:', err);
        }
    }
})();

/**
 * Mounts the ExtractorAdvancedStudio widget into the specified container element.
 * 
 * @param {HTMLElement} container - DOM host element.
 * @param {Object} [props={}] - Studio configuration props.
 * @returns {() => void} Unmount cleanup callback.
 */
export function mount(container, props = {}) {
    injectStyles();
    const root = ReactDOM.createRoot(container);
    root.render(React.createElement(ExtractorAdvancedStudio, props));

    return () => {
        root.unmount();
    };
}

export { ExtractorAdvancedStudio, ExportJobMonitor };
export default ExtractorAdvancedStudio;