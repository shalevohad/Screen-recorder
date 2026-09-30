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

// הזרקה אוטונומית של ה-CSS ל-Head של הדפדפן
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

// הרצה בעת הייבוא הראשוני
injectStyles();

/**
 * 💡 הזרקה גלובלית חד-פעמית של מנהל המשימות ל-DOM הראשי של המערכת.
 * מוצמד ישירות ל-document.body כך שה-Chip והמגירה ימשיכו לצוף ולפעול
 * גם כאשר המערכת מפרקת את טאב ה-Advanced במעבר למסכים אחרים.
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
 * נקודת הכניסה המחייבת של ה-Widget Loader של המערכת
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