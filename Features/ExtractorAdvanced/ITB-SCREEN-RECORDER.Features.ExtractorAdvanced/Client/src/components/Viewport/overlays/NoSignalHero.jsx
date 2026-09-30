// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Viewport/overlays/NoSignalHero.jsx
// ==========================================
import React from 'react';
import './NoSignalHero.scss';

export default function NoSignalHero({ isPlaying = false }) {
    return (
        <div className="tactical-no-signal-hero">
            <div className="spotlight-badge-container">
                <svg viewBox="0 0 40 40" fill="none" className="torch-fullscreen-svg">
                    <path d="M5 12V6a1 1 0 0 1 1-1h6" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M28 5h6a1 1 0 0 1 1 1v6" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M5 28v6a1 1 0 0 0 1 1h6" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M28 35h6a1 1 0 0 0 1-1v-6" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="20" y1="13" x2="20" y2="7" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
                    <polygon points="14,18 26,18 23,22 17,22" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.8" strokeLinejoin="round" />
                    <rect x="17" y="22" width="6" height="10" rx="1.5" fill="#0f172a" stroke="#22d3ee" strokeWidth="1.8" />
                </svg>
            </div>
            <span className="spotlight-title-label">
                NO SIGNAL / GAP {isPlaying ? '• PLAYING THROUGH' : ''}
            </span>
        </div>
    );
}