// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Modals/ShortcutsHelpModal.jsx
// Tactical Enterprise Cheat-Sheet Modal with NLE & Canvas Hotkeys
// ==========================================
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './ShortcutsHelpModal.scss';

const SHORTCUT_GROUPS = [
    {
        title: 'PLAYBACK & SHUTTLE (NLE)',
        shortcuts: [
            { keys: ['Space'], desc: 'Toggle timeline Play / Pause' },
            { keys: ['J', 'K', 'L'], desc: 'NLE Shuttle: J = Reverse, K = Pause, L = Forward (2x / 4x)' },
            { keys: ['M'], desc: 'Toggle Master Audio Mute' },
            { keys: ['←', '→'], desc: 'Adaptive step by zoom level' },
            { keys: ['Ctrl', '+', '← / →'], desc: 'Single frame precision step (1 Frame / 33ms)' },
            { keys: ['Shift', '+', '← / →'], desc: 'Fast jump 5 seconds backward / forward' },
            { keys: ['Home', 'End'], desc: 'Jump playhead to Mark In / Mark Out' }
        ]
    },
    {
        title: 'MARKING & SMART CUTTING',
        shortcuts: [
            { keys: ['I'], desc: 'Set Mark In boundary at current playhead' },
            { keys: ['O'], desc: 'Set Mark Out boundary at current playhead' },
            { keys: ['X'], desc: 'Clear / Reset In & Out to entire timeline' },
            { keys: ['S'], desc: 'Split Multicam Director cut at playhead' },
            { keys: ['Ctrl', '+', 'E'], desc: 'Export selected cut range directly' },
            { keys: ['Ctrl', '+', 'S'], desc: 'Save studio session draft state' }
        ]
    },
    {
        title: 'CANVAS & VIEWPORT PRESETS',
        shortcuts: [
            { keys: ['1', '2', '4'], desc: 'Instant layout presets (1x1 Focus, 2-Screen, 4-Screen Quad)' },
            { keys: ['G'], desc: 'Auto-Grid arrangement of all active screens' },
            { keys: ['R'], desc: 'Reset Canvas arrangement & center view' },
            { keys: ['F'], desc: 'Toggle Fullscreen Viewport mode' },
            { keys: ['↑', '↓'], desc: 'Select previous / next station in timeline' }
        ]
    },
    {
        title: 'TIMELINE, AUDIO & KEYFRAMES',
        shortcuts: [
            { keys: ['+', 'or', 'Ins'], desc: 'Add Canvas Keyframe at current playhead' },
            { keys: ['Delete', 'or', 'Bksp'], desc: 'Delete selected Keyframe or Audio Clip' },
            { keys: ['Ctrl', '+', 'Click'], desc: 'Multi-select Audio Clips (Windows style)' },
            { keys: ['[', 'or', ']'], desc: 'Zoom Timeline In / Out' },
            { keys: ['\\'], desc: 'Zoom to Fit Cut range in viewport' },
            { keys: ['Ctrl', '+', 'Z / Y'], desc: 'Undo / Redo editing actions' }
        ]
    }
];

export default function ShortcutsHelpModal({ isOpen, onClose }) {
    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return createPortal(
        <div className="shortcuts-modal-backdrop" onClick={onClose} dir="ltr">
            <div className="shortcuts-modal-card" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <div className="header-title-row">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="header-icon">
                            <rect x="2" y="4" width="20" height="16" rx="2" />
                            <line x1="6" y1="8" x2="6.01" y2="8" strokeWidth="3" />
                            <line x1="10" y1="8" x2="10.01" y2="8" strokeWidth="3" />
                            <line x1="14" y1="8" x2="14.01" y2="8" strokeWidth="3" />
                            <line x1="18" y1="18.01" y2="8" strokeWidth="3" />
                            <line x1="6" y1="12" x2="6.01" y2="12" strokeWidth="3" />
                            <line x1="18" y1="12" x2="18.01" y2="12" strokeWidth="3" />
                            <line x1="8" y1="16" x2="16" y2="16" strokeWidth="2.5" />
                        </svg>
                        <h3>KEYBOARD SHORTCUTS & OPERATIONAL CONTROLS</h3>
                    </div>
                    <button type="button" className="btn-close-modal" onClick={onClose} title="Close (Esc)">
                        ✕
                    </button>
                </div>

                <div className="modal-body-grid">
                    {SHORTCUT_GROUPS.map((group, gIdx) => (
                        <div key={gIdx} className="shortcut-group-panel">
                            <h4 className="group-title">{group.title}</h4>
                            <div className="group-items-list">
                                {group.shortcuts.map((item, iIdx) => (
                                    <div key={iIdx} className="shortcut-row">
                                        <div className="keys-cluster">
                                            {item.keys.map((k, kIdx) => (
                                                k === 'or' || k === '+' || k === '← / →' || k === 'Z / Y' ? (
                                                    <span key={kIdx} className="key-separator">{k}</span>
                                                ) : (
                                                    <kbd key={kIdx} className="tactical-kbd">{k}</kbd>
                                                )
                                            ))}
                                        </div>
                                        <span className="shortcut-desc">{item.desc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="modal-footer">
                    <span className="footer-hint">💡 Pro-Tip: Hardware-code mapped (I/O/J/K/L) ensures flawless operation across Hebrew & English keyboard layouts.</span>
                    <button type="button" className="btn-got-it" onClick={onClose}>
                        GOT IT
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}
