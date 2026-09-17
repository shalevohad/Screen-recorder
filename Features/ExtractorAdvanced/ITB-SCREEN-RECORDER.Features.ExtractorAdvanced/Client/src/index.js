import React from 'react';
import ReactDOM from 'react-dom/client';
import ExtractorAdvancedStudio from './ExtractorAdvancedStudio.jsx';
import './ExtractorAdvanced.scss';

const STYLE_ID = 'itb-extractor-advanced-theme';

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

export function mount(container, props = {}) {
    injectStyles();
    const root = ReactDOM.createRoot(container);
    root.render(React.createElement(ExtractorAdvancedStudio, props));

    return () => {
        root.unmount();
    };
}

export { ExtractorAdvancedStudio };
export default ExtractorAdvancedStudio;