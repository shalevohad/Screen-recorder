import React from 'react';
import ReactDOM from 'react-dom/client';
import ExtractorAdvancedStudio from './ExtractorAdvancedStudio.jsx';
import './ExtractorAdvanced.scss';

export function mount(container, props = {}) {
    const root = ReactDOM.createRoot(container);
    root.render(React.createElement(ExtractorAdvancedStudio, props));

    return () => {
        root.unmount();
    };
}

export { ExtractorAdvancedStudio };
export default ExtractorAdvancedStudio;