import React from 'react';
import ReactDOM from 'react-dom/client';
import ExtractorTile from './ExtractorTile.jsx';

export function mount(container, props = {}) {
    const root = ReactDOM.createRoot(container);
    root.render(React.createElement(ExtractorTile, props));

    return () => {
        root.unmount();
    };
}

export { ExtractorTile };
export default ExtractorTile;