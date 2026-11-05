// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Modals/CanvasComposerModal.jsx
// Visual Drag-and-Drop Canvas Composer & Multi-Keyframe Timeline Layout Studio
// ==========================================
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import './CanvasComposerModal.scss';

const VIRTUAL_CANVAS_W = 1920;
const VIRTUAL_CANVAS_H = 1080;

function getDisplayTitle(displayId) {
    if (!displayId) return 'Screen 1';
    if (displayId.startsWith('mon-')) {
        const idx = parseInt(displayId.replace('mon-', ''), 10);
        return `Screen ${isNaN(idx) ? 1 : idx + 1}`;
    }
    return displayId;
}

function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
}

export default function CanvasComposerModal({
    isOpen,
    onClose,
    onConfirmExport,
    timelineStations = [],
    timelineBaseEpochMs = 0,
    inPointMs = 0,
    outPointMs = 0,
    playheadMs = 0,
    playheadEpochMs = 0,
    initialTimeline = null,
    onSaveTimeline = null
}) {
    const cutStartEpochMs = timelineBaseEpochMs + inPointMs;
    const cutEndEpochMs = timelineBaseEpochMs + outPointMs;
    const totalCutDurMs = Math.max(1000, outPointMs - inPointMs);

    // Initial default placements generator
    const generateDefaultPlacements = useCallback(() => {
        const feeds = [];
        timelineStations.forEach(st => {
            const displays = (st.displays && st.displays.length > 0)
                ? st.displays
                : (st.topology && st.topology.displays && st.topology.displays.length > 0)
                    ? st.topology.displays
                    : [{ displayId: 'mon-0', isPrimary: true }];

            displays.forEach((d) => {
                feeds.push({
                    stationId: st.id,
                    displayId: d.displayId || 'mon-0',
                    label: st.roleAlias ? `${st.roleAlias} - ${getDisplayTitle(d.displayId)}` : `${st.name || st.id} - ${getDisplayTitle(d.displayId)}`
                });
            });
        });

        if (feeds.length === 0) return [];

        if (feeds.length === 1) {
            return [{
                stationId: feeds[0].stationId,
                displayId: feeds[0].displayId,
                x: 0,
                y: 0,
                width: 1920,
                height: 1080,
                zIndex: 0,
                borderWidth: 0,
                borderColor: '#06B6D4',
                label: feeds[0].label
            }];
        }

        if (feeds.length === 2) {
            return [
                {
                    stationId: feeds[0].stationId,
                    displayId: feeds[0].displayId,
                    x: 0,
                    y: 0,
                    width: 960,
                    height: 1080,
                    zIndex: 0,
                    borderWidth: 2,
                    borderColor: '#06B6D4',
                    label: feeds[0].label
                },
                {
                    stationId: feeds[1].stationId,
                    displayId: feeds[1].displayId,
                    x: 960,
                    y: 0,
                    width: 960,
                    height: 1080,
                    zIndex: 1,
                    borderWidth: 2,
                    borderColor: '#10B981',
                    label: feeds[1].label
                }
            ];
        }

        // Quad layout for 3 or 4 feeds
        return feeds.slice(0, 4).map((f, idx) => {
            const col = idx % 2;
            const row = Math.floor(idx / 2);
            return {
                stationId: f.stationId,
                displayId: f.displayId,
                x: col * 960,
                y: row * 540,
                width: 960,
                height: 540,
                zIndex: idx,
                borderWidth: 2,
                borderColor: idx === 0 ? '#06B6D4' : idx === 1 ? '#10B981' : idx === 2 ? '#F59E0B' : '#F43F5E',
                label: f.label
            };
        });
    }, [timelineStations]);

    // Keyframes State
    const [keyframes, setKeyframes] = useState(() => {
        if (initialTimeline && initialTimeline.keyframes && initialTimeline.keyframes.length > 0) {
            return JSON.parse(JSON.stringify(initialTimeline.keyframes));
        }
        return [
            {
                timestampEpochMs: cutStartEpochMs,
                transitionDurationSec: 0.5,
                transitionType: 'smooth',
                layout: {
                    width: 1920,
                    height: 1080,
                    backgroundColor: '#070A10',
                    fps: 30.0,
                    placements: generateDefaultPlacements()
                }
            }
        ];
    });

    const [activeKfIndex, setActiveKfIndex] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [keystrokeMode, setKeystrokeMode] = useState('BurnIn');
    const [resolution, setResolution] = useState(initialTimeline?.resolution || '2K');

    useEffect(() => {
        if (isOpen && initialTimeline?.keyframes?.length > 0) {
            setKeyframes(JSON.parse(JSON.stringify(initialTimeline.keyframes)));
            if (initialTimeline.resolution) {
                setResolution(initialTimeline.resolution);
            }
        }
    }, [isOpen, initialTimeline]);
    const [isXmlJsonModalOpen, setIsXmlJsonModalOpen] = useState(false);
    const [dataModalTab, setDataModalTab] = useState('json'); // 'json' | 'xml'
    const [dataText, setDataText] = useState('');

    const canvasRef = useRef(null);

    // Active keyframe & placements reference
    const currentKf = keyframes[activeKfIndex] || keyframes[0];
    const currentPlacements = currentKf?.layout?.placements || [];
    const selectedPlacement = currentPlacements[selectedIndex] || null;

    // Synchronize placements updates back to the active keyframe
    const updatePlacements = useCallback((newPlacements) => {
        setKeyframes(prev => {
            const next = [...prev];
            if (!next[activeKfIndex]) return prev;
            next[activeKfIndex] = {
                ...next[activeKfIndex],
                layout: {
                    ...next[activeKfIndex].layout,
                    placements: newPlacements
                }
            };
            return next;
        });
    }, [activeKfIndex]);

    // Apply current layout to all keyframes (Global Entire Timeline)
    const handleApplyToAllTimeline = useCallback(() => {
        setKeyframes([
            {
                timestampEpochMs: cutStartEpochMs,
                transitionDurationSec: 0.5,
                transitionType: 'smooth',
                layout: {
                    ...currentKf.layout,
                    placements: JSON.parse(JSON.stringify(currentPlacements))
                }
            }
        ]);
        setActiveKfIndex(0);
    }, [cutStartEpochMs, currentKf.layout, currentPlacements]);

    // Add Keyframe at Current Playhead
    const handleAddKeyframeAtPlayhead = useCallback(() => {
        const targetEpoch = playheadEpochMs > 0 ? playheadEpochMs : (cutStartEpochMs + playheadMs);
        const clampedEpoch = clamp(targetEpoch, cutStartEpochMs, cutEndEpochMs);

        // Check if keyframe already exists very close to this timestamp
        const existingIdx = keyframes.findIndex(k => Math.abs(k.timestampEpochMs - clampedEpoch) < 200);
        if (existingIdx >= 0) {
            setActiveKfIndex(existingIdx);
            return;
        }

        const newKf = {
            timestampEpochMs: clampedEpoch,
            transitionDurationSec: 0.5,
            transitionType: 'smooth',
            layout: {
                width: 1920,
                height: 1080,
                backgroundColor: currentKf.layout.backgroundColor || '#070A10',
                fps: 30.0,
                placements: JSON.parse(JSON.stringify(currentPlacements))
            }
        };

        const nextKeyframes = [...keyframes, newKf].sort((a, b) => a.timestampEpochMs - b.timestampEpochMs);
        setKeyframes(nextKeyframes);
        const newIdx = nextKeyframes.findIndex(k => k.timestampEpochMs === clampedEpoch);
        setActiveKfIndex(newIdx >= 0 ? newIdx : 0);
    }, [playheadEpochMs, cutStartEpochMs, playheadMs, cutEndEpochMs, keyframes, currentKf.layout, currentPlacements]);

    const handleDeleteKeyframe = useCallback((indexToDelete, e) => {
        e?.stopPropagation();
        if (keyframes.length <= 1) return;
        setKeyframes(prev => {
            const next = prev.filter((_, idx) => idx !== indexToDelete);
            return next;
        });
        setActiveKfIndex(prev => (prev >= indexToDelete ? Math.max(0, prev - 1) : prev));
    }, [keyframes.length]);

    // ------------------------------------------
    // DRAG & RESIZE ENGINE
    // ------------------------------------------
    const dragStateRef = useRef(null);

    const handleMouseDownBox = (e, index) => {
        e.stopPropagation();
        setSelectedIndex(index);

        if (!canvasRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();
        const p = currentPlacements[index];
        if (!p) return;

        dragStateRef.current = {
            mode: 'drag',
            index,
            startX: e.clientX,
            startY: e.clientY,
            initialX: p.x,
            initialY: p.y,
            canvasW: rect.width,
            canvasH: rect.height,
            scaleX: VIRTUAL_CANVAS_W / rect.width,
            scaleY: VIRTUAL_CANVAS_H / rect.height
        };

        const handleMouseMove = (moveEvent) => {
            if (!dragStateRef.current || dragStateRef.current.mode !== 'drag') return;
            const ds = dragStateRef.current;
            const dx = (moveEvent.clientX - ds.startX) * ds.scaleX;
            const dy = (moveEvent.clientY - ds.startY) * ds.scaleY;

            const pTarget = currentPlacements[ds.index];
            if (!pTarget) return;

            let newX = Math.round(ds.initialX + dx);
            let newY = Math.round(ds.initialY + dy);

            // Snap to bounds
            newX = clamp(newX, 0, VIRTUAL_CANVAS_W - pTarget.width);
            newY = clamp(newY, 0, VIRTUAL_CANVAS_H - pTarget.height);

            // Snap to center guides (within 16px)
            if (Math.abs(newX - (VIRTUAL_CANVAS_W - pTarget.width) / 2) < 16) {
                newX = Math.round((VIRTUAL_CANVAS_W - pTarget.width) / 2);
            }
            if (Math.abs(newY - (VIRTUAL_CANVAS_H - pTarget.height) / 2) < 16) {
                newY = Math.round((VIRTUAL_CANVAS_H - pTarget.height) / 2);
            }

            const next = [...currentPlacements];
            next[ds.index] = { ...pTarget, x: newX, y: newY };
            updatePlacements(next);
        };

        const handleMouseUp = () => {
            dragStateRef.current = null;
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseDownResize = (e, index) => {
        e.stopPropagation();
        setSelectedIndex(index);

        if (!canvasRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();
        const p = currentPlacements[index];
        if (!p) return;

        dragStateRef.current = {
            mode: 'resize',
            index,
            startX: e.clientX,
            startY: e.clientY,
            initialW: p.width,
            initialH: p.height,
            scaleX: VIRTUAL_CANVAS_W / rect.width,
            scaleY: VIRTUAL_CANVAS_H / rect.height
        };

        const handleMouseMove = (moveEvent) => {
            if (!dragStateRef.current || dragStateRef.current.mode !== 'resize') return;
            const ds = dragStateRef.current;
            const dw = (moveEvent.clientX - ds.startX) * ds.scaleX;
            const dh = (moveEvent.clientY - ds.startY) * ds.scaleY;

            const pTarget = currentPlacements[ds.index];
            if (!pTarget) return;

            let newW = Math.round(ds.initialW + dw);
            let newH = Math.round(ds.initialH + dh);

            // Keep within bounds & minimum size
            newW = clamp(newW, 160, VIRTUAL_CANVAS_W - pTarget.x);
            newH = clamp(newH, 90, VIRTUAL_CANVAS_H - pTarget.y);

            const next = [...currentPlacements];
            next[ds.index] = { ...pTarget, width: newW, height: newH };
            updatePlacements(next);
        };

        const handleMouseUp = () => {
            dragStateRef.current = null;
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    // ------------------------------------------
    // LAYER ORDER / STACKING ACTIONS
    // ------------------------------------------
    const handleBringToFront = () => {
        if (!selectedPlacement) return;
        const maxZ = Math.max(...currentPlacements.map(p => p.zIndex), 0);
        const next = [...currentPlacements];
        next[selectedIndex] = { ...selectedPlacement, zIndex: maxZ + 1 };
        updatePlacements(next);
    };

    const handleSendToBack = () => {
        if (!selectedPlacement) return;
        const minZ = Math.min(...currentPlacements.map(p => p.zIndex), 0);
        const next = [...currentPlacements];
        next[selectedIndex] = { ...selectedPlacement, zIndex: Math.max(0, minZ - 1) };
        updatePlacements(next);
    };

    const handleBringForward = () => {
        if (!selectedPlacement) return;
        const next = [...currentPlacements];
        next[selectedIndex] = { ...selectedPlacement, zIndex: selectedPlacement.zIndex + 1 };
        updatePlacements(next);
    };

    const handleSendBackward = () => {
        if (!selectedPlacement) return;
        const next = [...currentPlacements];
        next[selectedIndex] = { ...selectedPlacement, zIndex: Math.max(0, selectedPlacement.zIndex - 1) };
        updatePlacements(next);
    };

    const handleRemovePlacement = (idx) => {
        const next = currentPlacements.filter((_, i) => i !== idx);
        updatePlacements(next);
        setSelectedIndex(prev => Math.max(0, prev - 1));
    };

    const handleAddFeedToCanvas = (stationId, displayId, stationName, roleAlias) => {
        const label = roleAlias ? `${roleAlias} - ${getDisplayTitle(displayId)}` : `${stationName} - ${getDisplayTitle(displayId)}`;
        const maxZ = currentPlacements.length > 0 ? Math.max(...currentPlacements.map(p => p.zIndex)) + 1 : 0;

        const newPlacement = {
            stationId,
            displayId,
            x: 200 + (currentPlacements.length * 40) % 600,
            y: 150 + (currentPlacements.length * 40) % 400,
            width: 640,
            height: 360,
            zIndex: maxZ,
            borderWidth: 2,
            borderColor: '#06B6D4',
            label
        };

        const next = [...currentPlacements, newPlacement];
        updatePlacements(next);
        setSelectedIndex(next.length - 1);
    };

    // ------------------------------------------
    // PRESET LAYOUTS
    // ------------------------------------------
    const applyPresetSplitHorizontal = () => {
        if (currentPlacements.length < 2) return;
        const next = [...currentPlacements];
        next[0] = { ...next[0], x: 0, y: 0, width: 960, height: 1080, zIndex: 0 };
        next[1] = { ...next[1], x: 960, y: 0, width: 960, height: 1080, zIndex: 1 };
        updatePlacements(next);
    };

    const applyPresetSplitVertical = () => {
        if (currentPlacements.length < 2) return;
        const next = [...currentPlacements];
        next[0] = { ...next[0], x: 0, y: 0, width: 1920, height: 540, zIndex: 0 };
        next[1] = { ...next[1], x: 0, y: 540, width: 1920, height: 540, zIndex: 1 };
        updatePlacements(next);
    };

    const applyPresetPipTopRight = () => {
        if (currentPlacements.length < 2) return;
        const next = [...currentPlacements];
        next[0] = { ...next[0], x: 0, y: 0, width: 1920, height: 1080, zIndex: 0 };
        next[1] = { ...next[1], x: 1380, y: 40, width: 500, height: 281, zIndex: 10, borderWidth: 3, borderColor: '#06B6D4' };
        updatePlacements(next);
    };

    const applyPresetPipBottomRight = () => {
        if (currentPlacements.length < 2) return;
        const next = [...currentPlacements];
        next[0] = { ...next[0], x: 0, y: 0, width: 1920, height: 1080, zIndex: 0 };
        next[1] = { ...next[1], x: 1380, y: 759, width: 500, height: 281, zIndex: 10, borderWidth: 3, borderColor: '#06B6D4' };
        updatePlacements(next);
    };

    const applyPresetQuad = () => {
        const next = currentPlacements.map((p, idx) => {
            const col = idx % 2;
            const row = Math.floor(idx / 2) % 2;
            return {
                ...p,
                x: col * 960,
                y: row * 540,
                width: 960,
                height: 540,
                zIndex: idx
            };
        });
        updatePlacements(next);
    };

    const applyPresetHeroStacked = () => {
        if (currentPlacements.length < 3) return;
        const next = [...currentPlacements];
        next[0] = { ...next[0], x: 0, y: 0, width: 1280, height: 1080, zIndex: 0 };
        next[1] = { ...next[1], x: 1280, y: 0, width: 640, height: 540, zIndex: 1 };
        next[2] = { ...next[2], x: 1280, y: 540, width: 640, height: 540, zIndex: 2 };
        updatePlacements(next);
    };

    const handleClearCanvas = () => {
        updatePlacements([]);
        setSelectedIndex(0);
    };

    // ------------------------------------------
    // XML & JSON SERIALIZATION & IMPORT
    // ------------------------------------------
    const generateJsonString = () => {
        return JSON.stringify({ keyframes }, null, 2);
    };

    const generateXmlString = () => {
        let xml = `<?xml version="1.0" encoding="utf-8"?>\n<CanvasLayoutTimeline>\n`;
        keyframes.forEach(kf => {
            xml += `  <Keyframe timestampEpochMs="${kf.timestampEpochMs}" transitionDurationSec="${kf.transitionDurationSec}" transitionType="${kf.transitionType}">\n`;
            xml += `    <Layout>\n`;
            xml += `      <Width>${kf.layout.width || 1920}</Width>\n`;
            xml += `      <Height>${kf.layout.height || 1080}</Height>\n`;
            xml += `      <BackgroundColor>${kf.layout.backgroundColor || '#070A10'}</BackgroundColor>\n`;
            xml += `      <Fps>${kf.layout.fps || 30.0}</Fps>\n`;
            (kf.layout.placements || []).forEach(p => {
                xml += `      <Placement>\n`;
                xml += `        <StationId>${p.stationId || ''}</StationId>\n`;
                xml += `        <DisplayId>${p.displayId || 'mon-0'}</DisplayId>\n`;
                xml += `        <X>${p.x}</X>\n`;
                xml += `        <Y>${p.y}</Y>\n`;
                xml += `        <Width>${p.width}</Width>\n`;
                xml += `        <Height>${p.height}</Height>\n`;
                xml += `        <ZIndex>${p.zIndex || 0}</ZIndex>\n`;
                xml += `        <BorderWidth>${p.borderWidth || 0}</BorderWidth>\n`;
                xml += `        <BorderColor>${p.borderColor || '#06B6D4'}</BorderColor>\n`;
                if (p.label) xml += `        <Label>${p.label}</Label>\n`;
                xml += `      </Placement>\n`;
            });
            xml += `    </Layout>\n`;
            xml += `  </Keyframe>\n`;
        });
        xml += `</CanvasLayoutTimeline>`;
        return xml;
    };

    const handleOpenDataModal = (tab = 'json') => {
        setDataModalTab(tab);
        setDataText(tab === 'json' ? generateJsonString() : generateXmlString());
        setIsXmlJsonModalOpen(true);
    };

    const handleApplyImportedData = () => {
        try {
            if (dataModalTab === 'json') {
                const parsed = JSON.parse(dataText);
                if (parsed.keyframes && Array.isArray(parsed.keyframes)) {
                    setKeyframes(parsed.keyframes);
                    setActiveKfIndex(0);
                    setIsXmlJsonModalOpen(false);
                    return;
                }
                if (parsed.placements && Array.isArray(parsed.placements)) {
                    // Single layout JSON
                    setKeyframes([{
                        timestampEpochMs: cutStartEpochMs,
                        transitionDurationSec: 0.5,
                        transitionType: 'smooth',
                        layout: {
                            width: parsed.width || 1920,
                            height: parsed.height || 1080,
                            backgroundColor: parsed.backgroundColor || '#070A10',
                            fps: parsed.fps || 30.0,
                            placements: parsed.placements
                        }
                    }]);
                    setActiveKfIndex(0);
                    setIsXmlJsonModalOpen(false);
                    return;
                }
            } else {
                // Basic XML parser for browser
                const parser = new DOMParser();
                const doc = parser.parseFromString(dataText, 'application/xml');
                const kfNodes = doc.querySelectorAll('Keyframe');
                if (kfNodes.length > 0) {
                    const parsedKfs = [];
                    kfNodes.forEach(node => {
                        const ts = parseInt(node.getAttribute('timestampEpochMs') || String(cutStartEpochMs), 10);
                        const dur = parseFloat(node.getAttribute('transitionDurationSec') || '0.5');
                        const trans = node.getAttribute('transitionType') || 'smooth';

                        const placements = [];
                        node.querySelectorAll('Placement').forEach(pNode => {
                            placements.push({
                                stationId: pNode.querySelector('StationId')?.textContent || '',
                                displayId: pNode.querySelector('DisplayId')?.textContent || 'mon-0',
                                x: parseFloat(pNode.querySelector('X')?.textContent || '0'),
                                y: parseFloat(pNode.querySelector('Y')?.textContent || '0'),
                                width: parseFloat(pNode.querySelector('Width')?.textContent || '1920'),
                                height: parseFloat(pNode.querySelector('Height')?.textContent || '1080'),
                                zIndex: parseInt(pNode.querySelector('ZIndex')?.textContent || '0', 10),
                                borderWidth: parseInt(pNode.querySelector('BorderWidth')?.textContent || '0', 10),
                                borderColor: pNode.querySelector('BorderColor')?.textContent || '#06B6D4',
                                label: pNode.querySelector('Label')?.textContent || ''
                            });
                        });

                        parsedKfs.push({
                            timestampEpochMs: ts,
                            transitionDurationSec: dur,
                            transitionType: trans,
                            layout: {
                                width: 1920,
                                height: 1080,
                                backgroundColor: '#070A10',
                                fps: 30.0,
                                placements
                            }
                        });
                    });

                    if (parsedKfs.length > 0) {
                        setKeyframes(parsedKfs);
                        setActiveKfIndex(0);
                        setIsXmlJsonModalOpen(false);
                        return;
                    }
                }
            }
            alert('Invalid data structure. Please ensure valid JSON or XML syntax.');
        } catch (err) {
            alert(`Parse error: ${err.message}`);
        }
    };

    // ------------------------------------------
    // SUBMIT & EXECUTE MASTER EXPORT
    // ------------------------------------------
    const handleClose = () => {
        onSaveTimeline?.({ keyframes, resolution });
        onClose();
    };

    const handleExecuteMasterExport = () => {
        onSaveTimeline?.({ keyframes, resolution });
        onConfirmExport({
            canvasLayoutTimeline: { keyframes, resolution },
            keystrokeMode,
            resolution
        });
        onClose();
    };

    // Sorted placements for rendering on canvas (lowest zIndex in back)
    const sortedRenderPlacements = useMemo(() => {
        return currentPlacements.map((p, originalIndex) => ({ ...p, originalIndex }))
            .sort((a, b) => a.zIndex - b.zIndex);
    }, [currentPlacements]);

    if (!isOpen) return null;

    return (
        <div className="itb-canvas-composer-backdrop" onClick={handleClose}>
            <div className="itb-canvas-composer-card" onClick={(e) => e.stopPropagation()}>

                {/* MODAL HEADER */}
                <div className="composer-header">
                    <div className="header-left">
                        <span className="composer-icon">🎨</span>
                        <h2>VISUAL CANVAS COMPOSER & EXPORT STUDIO</h2>
                        <div className="resolution-selector-pills">
                            {[
                                { id: 'HD', label: '720p HD', desc: '1280×720' },
                                { id: 'FHD', label: '1080p FHD', desc: '1920×1080' },
                                { id: '2K', label: '2K QHD', desc: '2560×1440' },
                                { id: '4K', label: '4K UHD', desc: '3840×2160' }
                            ].map(tier => (
                                <button
                                    key={tier.id}
                                    type="button"
                                    className={`pill-btn ${resolution === tier.id ? 'active' : ''}`}
                                    onClick={() => setResolution(tier.id)}
                                    title={`${tier.label} (${tier.desc})`}
                                >
                                    <span className="pill-dot" />
                                    {tier.label}
                                </button>
                            ))}
                        </div>
                        <span className="canvas-badge">
                            {resolution === '4K' ? '3840×2160 4K UHD' : resolution === '2K' ? '2560×1440 2K QHD' : resolution === 'HD' ? '1280×720 HD' : '1920×1080 FHD'}
                        </span>
                    </div>
                    <div className="header-right">
                        <button type="button" className="btn-close" onClick={onClose}>✕</button>
                    </div>
                </div>

                {/* THREE-PANE BODY */}
                <div className="composer-body">

                    {/* LEFT PANEL: PRESETS & PALETTE */}
                    <div className="composer-sidebar-left">
                        <div className="sidebar-section-title">
                            <span>PRESET TEMPLATES</span>
                        </div>
                        <div className="presets-grid">
                            <button type="button" className="btn-preset" onClick={applyPresetSplitHorizontal}>
                                <span className="preset-icon">⊞</span>
                                <span>Split 50/50 H</span>
                            </button>
                            <button type="button" className="btn-preset" onClick={applyPresetSplitVertical}>
                                <span className="preset-icon">◫</span>
                                <span>Split 50/50 V</span>
                            </button>
                            <button type="button" className="btn-preset" onClick={applyPresetPipTopRight}>
                                <span className="preset-icon">⧉</span>
                                <span>PiP Top-R</span>
                            </button>
                            <button type="button" className="btn-preset" onClick={applyPresetPipBottomRight}>
                                <span className="preset-icon">⧈</span>
                                <span>PiP Bottom-R</span>
                            </button>
                            <button type="button" className="btn-preset" onClick={applyPresetQuad}>
                                <span className="preset-icon">▦</span>
                                <span>Quad 2×2</span>
                            </button>
                            <button type="button" className="btn-preset" onClick={applyPresetHeroStacked}>
                                <span className="preset-icon">▤</span>
                                <span>Hero + 2 Stack</span>
                            </button>
                            <button type="button" className="btn-preset btn-clear" onClick={handleClearCanvas}>
                                <span>🗑️ Clear Canvas</span>
                            </button>
                        </div>

                        <div className="sidebar-section-title" style={{ marginTop: '12px' }}>
                            <span>AVAILABLE TIMELINE FEEDS</span>
                        </div>
                        <div className="feeds-inventory">
                            {timelineStations.map(st => {
                                const displays = (st.displays && st.displays.length > 0)
                                    ? st.displays
                                    : (st.topology && st.topology.displays && st.topology.displays.length > 0)
                                        ? st.topology.displays
                                        : [{ displayId: 'mon-0', isPrimary: true }];

                                return (
                                    <div key={st.id} className="station-group">
                                        <div className="station-group-header">
                                            <span className="station-name">{st.name || st.id}</span>
                                            {st.roleAlias && <span className="role-badge">{st.roleAlias}</span>}
                                        </div>
                                        <div className="display-items-list">
                                            {displays.map(d => (
                                                <div key={d.displayId || 'mon-0'} className="display-item">
                                                    <div className="display-title">
                                                        <span className="screen-badge">{getDisplayTitle(d.displayId)}</span>
                                                        {d.isPrimary && <span style={{ fontSize: '9px', opacity: 0.6 }}>(Pri)</span>}
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="btn-add-feed"
                                                        onClick={() => handleAddFeedToCanvas(st.id, d.displayId || 'mon-0', st.name || st.id, st.roleAlias)}
                                                    >
                                                        + Add
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* CENTER PANEL: INTERACTIVE CANVAS STAGE & KEYFRAME TIMELINE */}
                    <div className="composer-workspace-center">
                        <div className="canvas-top-bar">
                            <div className="canvas-meta">
                                <span>CANVAS: <strong className="canvas-dim">1920 × 1080 (16:9)</strong></span>
                                <span className="feed-count-pill">{currentPlacements.length} PLACEMENT{currentPlacements.length !== 1 ? 'S' : ''}</span>
                            </div>
                            <div className="canvas-controls-group">
                                <label>
                                    <span>BG:</span>
                                    <select
                                        value={currentKf.layout.backgroundColor || '#070A10'}
                                        onChange={(e) => {
                                            setKeyframes(prev => {
                                                const next = [...prev];
                                                next[activeKfIndex].layout.backgroundColor = e.target.value;
                                                return next;
                                            });
                                        }}
                                    >
                                        <option value="#070A10">Dark NOC (#070A10)</option>
                                        <option value="#0B132B">Deep Navy (#0B132B)</option>
                                        <option value="#000000">Pure Black (#000000)</option>
                                    </select>
                                </label>
                            </div>
                        </div>

                        {/* Interactive Canvas Stage */}
                        <div className="canvas-stage-wrapper">
                            <div
                                ref={canvasRef}
                                className="canvas-stage"
                                style={{ backgroundColor: currentKf.layout.backgroundColor || '#070A10' }}
                            >
                                {currentPlacements.length === 0 && (
                                    <div className="canvas-empty-guide">
                                        <span className="empty-icon">⊞</span>
                                        <span className="empty-text">CANVAS IS EMPTY</span>
                                        <span className="empty-sub">Add feeds from the left palette or select a preset template</span>
                                    </div>
                                )}

                                {sortedRenderPlacements.map((p) => {
                                    const origIdx = p.originalIndex;
                                    const isSel = origIdx === selectedIndex;
                                    const leftPct = (p.x / VIRTUAL_CANVAS_W) * 100;
                                    const topPct = (p.y / VIRTUAL_CANVAS_H) * 100;
                                    const widthPct = (p.width / VIRTUAL_CANVAS_W) * 100;
                                    const heightPct = (p.height / VIRTUAL_CANVAS_H) * 100;

                                    return (
                                        <div
                                            key={`${p.stationId}-${p.displayId}-${origIdx}`}
                                            className={`feed-placement-box ${isSel ? 'selected' : ''}`}
                                            style={{
                                                left: `${leftPct}%`,
                                                top: `${topPct}%`,
                                                width: `${widthPct}%`,
                                                height: `${heightPct}%`,
                                                borderWidth: `${Math.max(2, p.borderWidth || 2)}px`,
                                                borderColor: p.borderColor || '#06B6D4',
                                                zIndex: p.zIndex
                                            }}
                                            onMouseDown={(e) => handleMouseDownBox(e, origIdx)}
                                        >
                                            <div className="box-header-badge">
                                                <div className="badge-title">
                                                    <span className="dot-indicator" />
                                                    <span>{p.label || `${p.stationId} ${getDisplayTitle(p.displayId)}`}</span>
                                                </div>
                                                <span className="badge-zlayer">L{p.zIndex}</span>
                                            </div>

                                            <div className="box-center-coords">
                                                {Math.round(p.width)}×{Math.round(p.height)} @ ({Math.round(p.x)},{Math.round(p.y)})
                                            </div>

                                            <div className="box-footer-label">
                                                {getDisplayTitle(p.displayId)}
                                            </div>

                                            {/* Resize Handle */}
                                            <div
                                                className="resize-handle"
                                                onMouseDown={(e) => handleMouseDownResize(e, origIdx)}
                                                title="Drag to resize feed dimensions"
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* KEYFRAME TIMELINE STRIP */}
                        <div className="timeline-keyframe-strip-panel">
                            <div className="keyframe-header-row">
                                <div className="keyframe-mode-switches">
                                    <button
                                        type="button"
                                        className="btn-kf-mode"
                                        onClick={handleApplyToAllTimeline}
                                        title="Apply this exact layout across the entire export duration"
                                    >
                                        🌐 Apply to Entire Timeline (Global)
                                    </button>
                                    <button
                                        type="button"
                                        className="btn-kf-mode active"
                                        onClick={handleAddKeyframeAtPlayhead}
                                        title="Add a keyframe at current playhead to change layout dynamically with animation"
                                    >
                                        ⏱️ Add Keyframe at Playhead (+{Math.round(playheadMs / 1000)}s)
                                    </button>
                                </div>

                                <div className="keyframe-transition-controls">
                                    <label>
                                        <span>Transition:</span>
                                        <select
                                            value={currentKf.transitionType || 'smooth'}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                setKeyframes(prev => {
                                                    const next = [...prev];
                                                    next[activeKfIndex].transitionType = val;
                                                    return next;
                                                });
                                            }}
                                        >
                                            <option value="smooth">🌊 Smooth Animation / Fade</option>
                                            <option value="cut">⚡ Instant Cut</option>
                                            <option value="dip">🌑 Dip to Black</option>
                                        </select>
                                    </label>

                                    <label>
                                        <span>Duration:</span>
                                        <input
                                            type="range"
                                            className="dur-slider"
                                            min="0.1"
                                            max="2.0"
                                            step="0.1"
                                            value={currentKf.transitionDurationSec || 0.5}
                                            onChange={(e) => {
                                                const dur = parseFloat(e.target.value);
                                                setKeyframes(prev => {
                                                    const next = [...prev];
                                                    next[activeKfIndex].transitionDurationSec = dur;
                                                    return next;
                                                });
                                            }}
                                        />
                                        <span className="dur-val">{(currentKf.transitionDurationSec || 0.5).toFixed(1)}s</span>
                                    </label>
                                </div>
                            </div>

                            {/* Keyframes Track Bar */}
                            <div className="keyframes-track-bar">
                                <div
                                    className="track-progress-fill"
                                    style={{ width: `${clamp((playheadMs / totalCutDurMs) * 100, 0, 100)}%` }}
                                />

                                {keyframes.map((kf, kfIdx) => {
                                    const offsetMs = kf.timestampEpochMs - cutStartEpochMs;
                                    const pct = clamp((offsetMs / totalCutDurMs) * 100, 0, 100);
                                    const isKfActive = kfIdx === activeKfIndex;
                                    const secFromIn = (offsetMs / 1000).toFixed(1);

                                    return (
                                        <div
                                            key={`kf-${kfIdx}-${kf.timestampEpochMs}`}
                                            className={`keyframe-chip ${isKfActive ? 'active' : ''}`}
                                            style={{ left: `${pct}%` }}
                                            onClick={() => setActiveKfIndex(kfIdx)}
                                        >
                                            <span>
                                                {kfIdx === 0 ? 'Start (0.0s)' : `+${secFromIn}s (${kf.transitionType === 'cut' ? '⚡' : kf.transitionType === 'dip' ? '🌑' : '🌊'})`}
                                            </span>
                                            {keyframes.length > 1 && kfIdx > 0 && (
                                                <span
                                                    className="btn-del-kf"
                                                    onClick={(e) => handleDeleteKeyframe(kfIdx, e)}
                                                    title="Delete this keyframe"
                                                >
                                                    ✕
                                                </span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT PANEL: LAYER STACK & PROPERTY INSPECTOR */}
                    <div className="composer-sidebar-right">
                        <div className="sidebar-section-title">
                            <span>SELECTED FEED INSPECTOR</span>
                        </div>

                        {selectedPlacement ? (
                            <div className="properties-inspector">
                                <div className="inspector-row">
                                    <span className="row-label">STATION:</span>
                                    <span className="row-val">{selectedPlacement.stationId}</span>
                                </div>
                                <div className="inspector-row">
                                    <span className="row-label">DISPLAY:</span>
                                    <span className="row-val">{getDisplayTitle(selectedPlacement.displayId)}</span>
                                </div>

                                <div className="inspector-row">
                                    <span className="row-label">LABEL:</span>
                                    <input
                                        type="text"
                                        value={selectedPlacement.label || ''}
                                        onChange={(e) => {
                                            const next = [...currentPlacements];
                                            next[selectedIndex] = { ...selectedPlacement, label: e.target.value };
                                            updatePlacements(next);
                                        }}
                                        placeholder="Burned on video"
                                    />
                                </div>

                                <div className="coords-inputs-grid">
                                    <div className="coord-field">
                                        <span>X:</span>
                                        <input
                                            type="number"
                                            value={Math.round(selectedPlacement.x)}
                                            onChange={(e) => {
                                                const next = [...currentPlacements];
                                                next[selectedIndex] = { ...selectedPlacement, x: parseInt(e.target.value, 10) || 0 };
                                                updatePlacements(next);
                                            }}
                                        />
                                    </div>
                                    <div className="coord-field">
                                        <span>Y:</span>
                                        <input
                                            type="number"
                                            value={Math.round(selectedPlacement.y)}
                                            onChange={(e) => {
                                                const next = [...currentPlacements];
                                                next[selectedIndex] = { ...selectedPlacement, y: parseInt(e.target.value, 10) || 0 };
                                                updatePlacements(next);
                                            }}
                                        />
                                    </div>
                                    <div className="coord-field">
                                        <span>W:</span>
                                        <input
                                            type="number"
                                            value={Math.round(selectedPlacement.width)}
                                            onChange={(e) => {
                                                const next = [...currentPlacements];
                                                next[selectedIndex] = { ...selectedPlacement, width: parseInt(e.target.value, 10) || 160 };
                                                updatePlacements(next);
                                            }}
                                        />
                                    </div>
                                    <div className="coord-field">
                                        <span>H:</span>
                                        <input
                                            type="number"
                                            value={Math.round(selectedPlacement.height)}
                                            onChange={(e) => {
                                                const next = [...currentPlacements];
                                                next[selectedIndex] = { ...selectedPlacement, height: parseInt(e.target.value, 10) || 90 };
                                                updatePlacements(next);
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="sidebar-section-title" style={{ marginTop: '6px' }}>
                                    <span>STACKING DEPTH (Z-INDEX)</span>
                                </div>
                                <div className="zindex-actions-group">
                                    <button type="button" onClick={handleBringForward}>⬆️ Bring Forward</button>
                                    <button type="button" onClick={handleSendBackward}>⬇️ Send Backward</button>
                                    <button type="button" onClick={handleBringToFront}>⏫ To Front</button>
                                    <button type="button" onClick={handleSendToBack}>⏬ To Back</button>
                                </div>

                                <div className="sidebar-section-title" style={{ marginTop: '6px' }}>
                                    <span>BORDER STYLING</span>
                                </div>
                                <div className="border-controls">
                                    <select
                                        value={selectedPlacement.borderWidth || 0}
                                        onChange={(e) => {
                                            const next = [...currentPlacements];
                                            next[selectedIndex] = { ...selectedPlacement, borderWidth: parseInt(e.target.value, 10) };
                                            updatePlacements(next);
                                        }}
                                    >
                                        <option value="0">0px (No Border)</option>
                                        <option value="2">2px Tactical</option>
                                        <option value="4">4px Medium</option>
                                        <option value="6">6px Heavy</option>
                                    </select>

                                    <div className="color-swatches">
                                        {['#06B6D4', '#10B981', '#F43F5E', '#F59E0B', '#FFFFFF'].map(c => (
                                            <span
                                                key={c}
                                                className={`swatch ${selectedPlacement.borderColor === c ? 'active' : ''}`}
                                                style={{ backgroundColor: c }}
                                                onClick={() => {
                                                    const next = [...currentPlacements];
                                                    next[selectedIndex] = { ...selectedPlacement, borderColor: c };
                                                    updatePlacements(next);
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    className="btn-remove-selected"
                                    onClick={() => handleRemovePlacement(selectedIndex)}
                                >
                                    🗑️ Remove Feed from Canvas
                                </button>
                            </div>
                        ) : (
                            <div style={{ color: '#64748b', fontSize: '11px', textAlign: 'center', padding: '20px' }}>
                                Select a placement on the canvas to inspect and edit its properties.
                            </div>
                        )}

                        <div className="sidebar-section-title" style={{ marginTop: '14px' }}>
                            <span>LAYER STACK HIERARCHY</span>
                        </div>
                        <div className="layer-stack-list">
                            {sortedRenderPlacements.slice().reverse().map(p => (
                                <div
                                    key={`layer-${p.originalIndex}`}
                                    className={`layer-stack-item ${p.originalIndex === selectedIndex ? 'selected' : ''}`}
                                    onClick={() => setSelectedIndex(p.originalIndex)}
                                >
                                    <div className="layer-info">
                                        <span className="layer-badge">L{p.zIndex}</span>
                                        <span>{p.label || `${p.stationId} ${getDisplayTitle(p.displayId)}`}</span>
                                    </div>
                                    <span
                                        className="layer-delete-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleRemovePlacement(p.originalIndex);
                                        }}
                                    >
                                        ✕
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* MODAL FOOTER */}
                <div className="composer-footer">
                    <div className="footer-left">
                        <button
                            type="button"
                            className="btn-data-modal"
                            onClick={() => handleOpenDataModal('json')}
                        >
                            📋 JSON / XML Layout Data
                        </button>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '16px', fontSize: '11px', color: '#94a3b8' }}>
                            <span>Keystrokes:</span>
                            <select
                                style={{ background: '#172133', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', borderRadius: '4px', padding: '3px 6px', fontSize: '11px' }}
                                value={keystrokeMode}
                                onChange={(e) => setKeystrokeMode(e.target.value)}
                            >
                                <option value="BurnIn">Burn-In (Coordinates)</option>
                                <option value="None">None (Clean Video)</option>
                            </select>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: '14px', fontSize: '11px', color: '#94a3b8' }}>
                            <span>Target:</span>
                            <span style={{ color: '#06b6d4', fontWeight: 'bold' }}>
                                {resolution === '4K' ? '4K UHD (3840×2160)' : resolution === '2K' ? '2K QHD (2560×1440)' : resolution === 'HD' ? 'HD (1280×720)' : 'FHD (1920×1080)'}
                            </span>
                        </div>
                    </div>

                    <div className="footer-right">
                        <button type="button" className="btn-cancel" onClick={onClose}>
                            CANCEL
                        </button>
                        <button
                            type="button"
                            className="btn-export-master"
                            onClick={handleExecuteMasterExport}
                            disabled={currentPlacements.length === 0}
                        >
                            🎬 EXPORT MASTER MP4 (APPLY CANVAS)
                        </button>
                    </div>
                </div>

                {/* JSON / XML SUB-MODAL */}
                {isXmlJsonModalOpen && (
                    <div className="xml-json-submodal-backdrop" onClick={() => setIsXmlJsonModalOpen(false)}>
                        <div className="xml-json-submodal-card" onClick={(e) => e.stopPropagation()}>
                            <div className="submodal-header">
                                <h3>CANVAS TIMELINE DATA SPECIFICATION</h3>
                                <button type="button" className="btn-subclose" onClick={() => setIsXmlJsonModalOpen(false)}>✕</button>
                            </div>
                            <div className="submodal-body">
                                <div className="submodal-format-tabs">
                                    <button
                                        type="button"
                                        className={dataModalTab === 'json' ? 'active' : ''}
                                        onClick={() => handleOpenDataModal('json')}
                                    >
                                        JSON Schema
                                    </button>
                                    <button
                                        type="button"
                                        className={dataModalTab === 'xml' ? 'active' : ''}
                                        onClick={() => handleOpenDataModal('xml')}
                                    >
                                        XML Schema
                                    </button>
                                </div>
                                <textarea
                                    value={dataText}
                                    onChange={(e) => setDataText(e.target.value)}
                                    placeholder="Paste JSON or XML canvas layout specification here..."
                                />
                            </div>
                            <div className="submodal-footer">
                                <div className="sub-left">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            navigator.clipboard?.writeText(dataText);
                                            alert('Copied layout data to clipboard!');
                                        }}
                                    >
                                        📋 Copy to Clipboard
                                    </button>
                                </div>
                                <div className="sub-right">
                                    <button
                                        type="button"
                                        className="btn-apply-paste"
                                        onClick={handleApplyImportedData}
                                    >
                                        ✓ Import & Apply to Canvas
                                    </button>
                                    <button type="button" onClick={() => setIsXmlJsonModalOpen(false)}>
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
