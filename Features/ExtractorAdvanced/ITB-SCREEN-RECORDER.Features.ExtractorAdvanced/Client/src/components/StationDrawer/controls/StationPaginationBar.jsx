// Client/src/components/StationDrawer/controls/StationPaginationBar.jsx
import React from 'react';
import './StationPaginationBar.scss';

export default function StationPaginationBar({
    currentPage,
    totalPages,
    pageSize,
    totalItems,
    onPageChange,
    onPageSizeChange,
    viewMode = 'table'
}) {
    if (totalItems === 0) return null;

    const startItem = Math.min((currentPage - 1) * pageSize + 1, totalItems);
    const endItem = Math.min(currentPage * pageSize, totalItems);

    const pageSizeOptions = viewMode === 'table' ? [5, 10, 15, 25] : [4, 8, 12, 16];
    const isSinglePage = totalPages <= 1;

    // בדיקה מתמטית האם בחירה באפשרות זו תשנה בפועל את תמונת המסך או את מספר העמודים
    const wouldChangeView = (candidateSize) => {
        if (candidateSize === pageSize) return true; // הכפתור הפעיל תמיד מוצג כ-active
        const currentVisibleCount = Math.min(pageSize, totalItems);
        const newVisibleCount = Math.min(candidateSize, totalItems);
        const currentPages = Math.ceil(totalItems / pageSize);
        const newPages = Math.ceil(totalItems / candidateSize);
        return currentVisibleCount !== newVisibleCount || currentPages !== newPages;
    };

    return (
        <div className={`hub-pagination-bar ${isSinglePage ? 'is-single-page-mode' : ''}`}>
            <div className="pagination-range-info">
                <span>SHOWING</span>
                <strong className="accent-num">{startItem}-{endItem}</strong>
                <span>OF</span>
                <strong className="total-num">{totalItems}</strong>
                <span>STATIONS</span>
            </div>

            <div className={`pagination-controls ${isSinglePage ? 'controls-disabled-compact' : ''}`}>
                <button
                    type="button"
                    className="btn-page-step"
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(1)}
                    title="First Page"
                >
                    «
                </button>
                <button
                    type="button"
                    className="btn-page-step"
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                    title="Previous Page"
                >
                    ‹
                </button>

                <div className="page-indicator">
                    <span className="current-page">{currentPage}</span>
                    <span className="divider">/</span>
                    <span className="total-pages">{totalPages}</span>
                </div>

                <button
                    type="button"
                    className="btn-page-step"
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                    title="Next Page"
                >
                    ›
                </button>
                <button
                    type="button"
                    className="btn-page-step"
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(totalPages)}
                    title="Last Page"
                >
                    »
                </button>
            </div>

            <div className="pagination-size-selector">
                <span className="selector-label">PER PAGE:</span>
                <div className="size-pills-group">
                    {pageSizeOptions.map(size => {
                        const isActive = pageSize === size;
                        const isRedundant = !wouldChangeView(size);

                        return (
                            <button
                                key={size}
                                type="button"
                                className={`btn-size-pill ${isActive ? 'active' : ''} ${isRedundant ? 'redundant-disabled' : ''}`}
                                disabled={isRedundant}
                                onClick={() => onPageSizeChange(size)}
                                title={isRedundant ? `All stations already fit on screen (Total: ${totalItems})` : `Show ${size} per page`}
                            >
                                {size}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}