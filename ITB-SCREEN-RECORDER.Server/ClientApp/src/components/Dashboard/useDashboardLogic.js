import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useAlertSnooze } from '../../hooks/useAlertSnooze';

const isStationFaulty = (s) => (s.isOnline || s.status === 1 || s.status === 2) && (s.droppedFrames || 0) > 5;

export const isStationNotRecording = (s) => {
    if (!s) return false;
    const isOnline = Boolean(s.isOnline || s.status === 1 || s.status === 2 || s.isProcessRunning);
    if (!isOnline) return false;
    const isRec = Boolean(s.isRecording ?? (s.status === 'Recording'));
    return !isRec;
};

const getCssPixelValue = (varName, fallback) => {
    if (typeof window === 'undefined') return fallback;
    const val = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    return val ? parseFloat(val) : fallback;
};

export function useDashboardLogic({
    stations = [],
    hideOffline = true,
    isFaultFilterActive = false,
    onExitFaultFilter,
    onBulkStart,
    onBulkStop,
    onUpdateStationSettings,
    onQuickExport,
    onToggleStream
}) {
    const [sortAsc, setSortAsc] = useState(true);
    const [inspectedHostname, setInspectedHostname] = useState(null);
    const [fullscreenHostname, setFullscreenHostname] = useState(null);

    const [activeTabId, setActiveTabId] = useState('ALL');
    const [tabFilters, setTabFilters] = useState({});
    const currentTabFilter = tabFilters[activeTabId] || 'ALL';
    const [monitoredSubFilters, setMonitoredSubFilters] = useState({});
    const currentMonitoredSubFilter = monitoredSubFilters[activeTabId] || 'ALL'; // 'ALL' | 'NOT_SNOOZED' | 'SNOOZED'
    const [currentPage, setCurrentPage] = useState(1);

    // Fetch operational tab definitions directly from SQLite
    const [fleetTabsList, setFleetTabsList] = useState([]);

    const fetchTabsFromDb = useCallback(async () => {
        try {
            const res = await fetch('/api/v1/dashboard/tabs');
            if (res.ok) {
                const data = await res.json();
                setFleetTabsList(Array.isArray(data) ? data : []);
            }
        } catch (err) {
            console.error('Failed fetching fleet tabs in useDashboardLogic:', err);
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchTabsFromDb();
        }, 0);
        const handleTabsChanged = () => fetchTabsFromDb();
        window.addEventListener('itb-fleet-tabs-updated', handleTabsChanged);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('itb-fleet-tabs-updated', handleTabsChanged);
        };
    }, [fetchTabsFromDb]);

    const activeFleetTabConfig = useMemo(() => {
        if (activeTabId === 'ALL') return null;
        return fleetTabsList.find(t => t.id === activeTabId) || null;
    }, [fleetTabsList, activeTabId]);

    // Filter stations belonging to the active tab while preserving reference stability to prevent re-render jumps
    const prevFilteredStationsRef = useRef([]);
    const tabFilteredStations = useMemo(() => {
        if (activeTabId === 'ALL' || !activeFleetTabConfig) return stations;

        const assigned = (activeFleetTabConfig.assignedHostnames || []).map(h => h.toLowerCase());
        const assignedOus = (activeFleetTabConfig.assignedOus || []).map(ou => ou.toLowerCase());

        const filtered = stations.filter(station => {
            const host = (station.hostname || '').toLowerCase();
            const disp = (station.displayName || '').toLowerCase();
            const alias = (station.roleAlias || '').toLowerCase();
            const matchesNames = assigned.includes(host) || assigned.includes(disp) || (alias && assigned.includes(alias));

            const ou = (station.ou || '').toLowerCase();
            const grp = (station.group || '').toLowerCase();
            const matchesOu = assignedOus.some(o => ou.includes(o) || grp.includes(o));

            return matchesNames || matchesOu;
        });

        // Shallow equality check to avoid UI jumps if an unrelated station changed/added/removed
        const prev = prevFilteredStationsRef.current;
        if (prev && prev.length === filtered.length) {
            let isIdentical = true;
            for (let i = 0; i < filtered.length; i++) {
                if (prev[i] !== filtered[i]) {
                    isIdentical = false;
                    break;
                }
            }
            if (isIdentical) return prev;
        }

        prevFilteredStationsRef.current = filtered;
        return filtered;
    }, [stations, activeTabId, activeFleetTabConfig]);

    const [availableFeatures, setAvailableFeatures] = useState([]);
    const [openFeatureIds, setOpenFeatureIds] = useState(() => {
        try {
            const saved = localStorage.getItem('itb_dashboard_open_features');
            return saved ? JSON.parse(saved) : [];
        } catch { return []; }
    });
    const [focusedWidgetHost, setFocusedWidgetHost] = useState(null);

    useEffect(() => {
        fetch('/api/v1/features/active')
            .then(res => res.ok ? res.json() : [])
            .then(data => setAvailableFeatures(Array.isArray(data) ? data : []))
            .catch(() => setAvailableFeatures([]));
    }, []);

    useEffect(() => {
        localStorage.setItem('itb_dashboard_open_features', JSON.stringify(openFeatureIds));
    }, [openFeatureIds]);

    const handleToggleFeature = (feat) => {
        const isOpen = openFeatureIds.includes(feat.id);
        if (isOpen) {
            setOpenFeatureIds(prev => prev.filter(id => id !== feat.id));
            if (activeTabId === feat.id) setActiveTabId('ALL');
        } else {
            setOpenFeatureIds(prev => [...prev, feat.id]);
            if (feat.displayMode === 'tab' || !feat.displayMode) setActiveTabId(feat.id);
        }
    };

    const handleCloseFeature = (featureId) => {
        setOpenFeatureIds(prev => prev.filter(id => id !== featureId));
        if (activeTabId === featureId) setActiveTabId('ALL');
    };

    const openFeatureTabs = useMemo(() => availableFeatures.filter(f => openFeatureIds.includes(f.id) && (f.displayMode === 'tab' || !f.displayMode)), [availableFeatures, openFeatureIds]);
    const activeInlineFeatures = useMemo(() => availableFeatures.filter(f => openFeatureIds.includes(f.id) && f.displayMode === 'inline'), [availableFeatures, openFeatureIds]);
    const activeFeatureObject = openFeatureTabs.find(f => f.id === activeTabId);

    const handleFeatureQuickExport = (hostname) => {
        const extractorFeat = availableFeatures.find(f => f.id === 'extractor-slicer');
        if (extractorFeat) {
            setFocusedWidgetHost(hostname);
            if (!openFeatureIds.includes(extractorFeat.id)) setOpenFeatureIds(prev => [...prev, extractorFeat.id]);
            if (extractorFeat.displayMode === 'tab' || !extractorFeat.displayMode) setActiveTabId(extractorFeat.id);
        }
        onQuickExport?.(hostname);
    };

    const inspectedStation = useMemo(() => stations.find(s => s.hostname === inspectedHostname) || null, [stations, inspectedHostname]);
    const fullscreenStation = useMemo(() => stations.find(s => s.hostname === fullscreenHostname) || null, [stations, fullscreenHostname]);

    const [viewMode, setViewMode] = useState(() => localStorage.getItem('itb_dashboard_view_mode') || 'grid');
    useEffect(() => localStorage.setItem('itb_dashboard_view_mode', viewMode), [viewMode]);

    // Keystroke overlay presentation mode: 'burn-in' (hard HUD) | 'caption' (soft subtitle) | 'none' (disabled)
    const [keystrokeMode, setKeystrokeMode] = useState(() => localStorage.getItem('itb_dashboard_keystroke_mode') || 'burn-in');
    useEffect(() => localStorage.setItem('itb_dashboard_keystroke_mode', keystrokeMode), [keystrokeMode]);

    const handleCycleKeystrokeMode = () => {
        setKeystrokeMode(prev => {
            const norm = (prev || 'burn-in').toLowerCase().replace('_', '-');
            if (norm === 'burn-in') return 'caption';
            if (norm === 'caption') return 'none';
            return 'burn-in';
        });
    };

    const [isSearchOpen, setIsSearchOpen] = useState(() => {
        const saved = localStorage.getItem('itb_dashboard_search_open');
        return saved !== null ? JSON.parse(saved) : false;
    });
    const [searchQuery, setSearchQuery] = useState(() => localStorage.getItem('itb_dashboard_search_query') || '');

    useEffect(() => localStorage.setItem('itb_dashboard_search_open', JSON.stringify(isSearchOpen)), [isSearchOpen]);
    useEffect(() => localStorage.setItem('itb_dashboard_search_query', searchQuery), [searchQuery]);

    const searchInputRef = useRef(null);

    const hasActiveFilter = useMemo(() => {
        return Boolean(
            searchQuery.trim() ||
            (currentTabFilter && currentTabFilter !== 'ALL') ||
            ((currentTabFilter === 'MONITORED' || currentTabFilter === 'IDLE') && currentMonitoredSubFilter !== 'ALL')
        );
    }, [searchQuery, currentTabFilter, currentMonitoredSubFilter]);

    const handleClearFilter = () => { setSearchQuery(''); searchInputRef.current?.focus(); };
    const setFilterForTab = (val) => {
        setTabFilters(p => ({ ...p, [activeTabId]: val }));
        setCurrentPage(1);
    };
    const setMonitoredSubFilterForTab = (val) => {
        setMonitoredSubFilters(p => ({ ...p, [activeTabId]: val }));
        setCurrentPage(1);
    };
    const handleResetAllFilters = () => {
        setSearchQuery('');
        setFilterForTab('ALL');
        setMonitoredSubFilterForTab('ALL');
        searchInputRef.current?.focus();
    };

    const [manualZoom, setManualZoom] = useState(() => {
        const savedZoom = localStorage.getItem('itb_dashboard_zoom');
        return savedZoom ? Number(savedZoom) : 3;
    });

    const [isAutoZoom, setIsAutoZoom] = useState(() => {
        const savedAuto = localStorage.getItem('itb_dashboard_auto_zoom');
        return savedAuto !== null ? JSON.parse(savedAuto) : true;
    });

    useEffect(() => localStorage.setItem('itb_dashboard_zoom', manualZoom), [manualZoom]);
    useEffect(() => localStorage.setItem('itb_dashboard_auto_zoom', JSON.stringify(isAutoZoom)), [isAutoZoom]);
    useEffect(() => { if (isSearchOpen && searchInputRef.current) searchInputRef.current.focus(); }, [isSearchOpen]);

    // ==========================================
    // 🔔 Recording Alert Snooze & Prioritization Engine
    // ==========================================
    const {
        isStationSnoozed,
        getRemainingMinutes,
        getSnoozeReason,
        snoozeStation,
        snoozeMultipleStations,
        cancelSnooze,
        cancelAllSnoozes
    } = useAlertSnooze();

    const [isPrioritizeAlertsAtFront, setIsPrioritizeAlertsAtFront] = useState(() => {
        try {
            const saved = localStorage.getItem('itb_dashboard_prioritize_alerts');
            return saved !== null ? JSON.parse(saved) : true;
        } catch {
            return true;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('itb_dashboard_prioritize_alerts', JSON.stringify(isPrioritizeAlertsAtFront));
        } catch { /* noop */ }
    }, [isPrioritizeAlertsAtFront]);

    // All unrecorded stations across current tab selection
    const unrecordedStations = useMemo(() => {
        return tabFilteredStations.filter(isStationNotRecording);
    }, [tabFilteredStations]);

    // Active unrecorded alerts (not snoozed)
    const activeUnrecordedStations = useMemo(() => {
        return unrecordedStations.filter(s => !isStationSnoozed(s.hostname));
    }, [unrecordedStations, isStationSnoozed]);

    // Snoozed unrecorded stations
    const activeSnoozedStations = useMemo(() => {
        return unrecordedStations
            .filter(s => isStationSnoozed(s.hostname))
            .map(s => ({
                ...s,
                remainingMinutes: typeof getRemainingMinutes === 'function'
                    ? getRemainingMinutes(s.hostname)
                    : 0,
                snoozeReason: typeof getSnoozeReason === 'function' ? getSnoozeReason(s.hostname) : ''
            }));
    }, [unrecordedStations, isStationSnoozed, getRemainingMinutes, getSnoozeReason]);

    // Counts for monitored filter pills & sub-filter badges
    const monitoredCounts = useMemo(() => {
        const monitored = tabFilteredStations.filter(isStationNotRecording);
        const snoozed = monitored.filter(s => isStationSnoozed(s.hostname)).length;
        const notSnoozed = monitored.length - snoozed;
        return {
            total: monitored.length,
            snoozed,
            notSnoozed
        };
    }, [tabFilteredStations, isStationSnoozed]);

    // Modal state for snoozing alert(s)
    const [snoozeModalState, setSnoozeModalState] = useState({
        isOpen: false,
        targetHostname: null,
        isBulk: false,
        bulkCount: 0
    });

    const handleOpenSnoozeModal = useCallback((hostname) => {
        setSnoozeModalState({
            isOpen: true,
            targetHostname: hostname,
            isBulk: false,
            bulkCount: 1
        });
    }, []);

    const handleOpenBulkSnoozeModal = useCallback(() => {
        setSnoozeModalState({
            isOpen: true,
            targetHostname: null,
            isBulk: true,
            bulkCount: activeUnrecordedStations.length
        });
    }, [activeUnrecordedStations.length]);

    const handleCloseSnoozeModal = useCallback(() => {
        setSnoozeModalState(prev => ({ ...prev, isOpen: false }));
    }, []);

    const handleConfirmSnooze = useCallback((minutes, reason) => {
        if (snoozeModalState.isBulk) {
            const targets = activeUnrecordedStations.map(s => s.hostname);
            snoozeMultipleStations(targets, minutes, reason);
        } else if (snoozeModalState.targetHostname) {
            snoozeStation(snoozeModalState.targetHostname, minutes, reason);
        }
        setSnoozeModalState(prev => ({ ...prev, isOpen: false }));
    }, [snoozeModalState, activeUnrecordedStations, snoozeMultipleStations, snoozeStation]);

    const handleCancelSnoozeModal = useCallback(() => {
        if (snoozeModalState.targetHostname) {
            cancelSnooze(snoozeModalState.targetHostname);
        }
        setSnoozeModalState(prev => ({ ...prev, isOpen: false }));
    }, [snoozeModalState.targetHostname, cancelSnooze]);

    const handleStartRecordingStation = useCallback((hostname) => {
        onToggleStream?.(hostname, false, {
            bitrate: activeFleetTabConfig?.defaultBitrate || null,
            fps: activeFleetTabConfig?.defaultFps || null
        });
    }, [onToggleStream, activeFleetTabConfig]);

    const handleStartRecordingAllUnrecorded = useCallback(() => {
        const targets = activeUnrecordedStations.map(s => s.hostname);
        if (targets.length === 0) return;
        onBulkStart?.(targets, {
            bitrate: activeFleetTabConfig?.defaultBitrate || null,
            fps: activeFleetTabConfig?.defaultFps || null
        });
    }, [activeUnrecordedStations, onBulkStart, activeFleetTabConfig]);

    const faultyStationsCount = useMemo(() => tabFilteredStations.filter(isStationFaulty).length, [tabFilteredStations]);
    useEffect(() => { if (isFaultFilterActive && faultyStationsCount === 0) onExitFaultFilter?.(); }, [isFaultFilterActive, faultyStationsCount, onExitFaultFilter]);

    const processedStations = useMemo(() => {
        let list = [...tabFilteredStations];
        if (isFaultFilterActive) {
            list = list.filter(isStationFaulty);
        } else if (currentTabFilter === 'OFFLINE') {
            list = list.filter(s => !s.isOnline);
        }

        if (currentTabFilter === 'RECORDING' || currentTabFilter === 'REC') {
            list = list.filter(s => Boolean(s.isRecording ?? (s.status === 'Recording')));
        } else if (currentTabFilter === 'MONITORED' || currentTabFilter === 'IDLE') {
            list = list.filter(isStationNotRecording);
            if (currentMonitoredSubFilter === 'SNOOZED') {
                list = list.filter(s => isStationSnoozed(s.hostname));
            } else if (currentMonitoredSubFilter === 'NOT_SNOOZED') {
                list = list.filter(s => !isStationSnoozed(s.hostname));
            }
        } else if (currentTabFilter === 'ONLINE') {
            list = list.filter(s => s.isOnline);
        }

        if (searchQuery.trim()) {
            const q = searchQuery.trim().toLowerCase();
            list = list.filter(s =>
                (s.hostname && s.hostname.toLowerCase().includes(q)) ||
                (s.roleAlias && s.roleAlias.toLowerCase().includes(q)) ||
                (s.displayName && s.displayName.toLowerCase().includes(q)) ||
                (s.ipAddress && s.ipAddress.includes(q))
            );
        }

        list.sort((a, b) => {
            if (isPrioritizeAlertsAtFront) {
                const aAlertActive = isStationNotRecording(a) && !isStationSnoozed(a.hostname);
                const bAlertActive = isStationNotRecording(b) && !isStationSnoozed(b.hostname);
                if (aAlertActive && !bAlertActive) return -1;
                if (!aAlertActive && bAlertActive) return 1;
            }
            const aName = a.roleAlias || a.displayName || a.hostname || '';
            const bName = b.roleAlias || b.displayName || b.hostname || '';
            const comp = aName.toLowerCase().localeCompare(bName.toLowerCase(), undefined, { numeric: true, sensitivity: 'base' });
            return sortAsc ? comp : -comp;
        });

        list = list.map(station => {
            const isSnoozed = isStationSnoozed(station.hostname);
            return {
                ...station,
                isSnoozed,
                snoozeRemainingMinutes: isSnoozed
                    ? (typeof getRemainingMinutes === 'function'
                        ? getRemainingMinutes(station.hostname)
                        : 0)
                    : 0,
                snoozeReason: isSnoozed
                    ? (typeof getSnoozeReason === 'function' ? getSnoozeReason(station.hostname) : null)
                    : null,
                effectiveBitrate: station.customBitrate || activeFleetTabConfig?.defaultBitrate || station.bitrate,
                effectiveFps: station.customFps || activeFleetTabConfig?.defaultFps || station.fps
            };
        });

        return list;
    }, [tabFilteredStations, isFaultFilterActive, currentTabFilter, currentMonitoredSubFilter, searchQuery, sortAsc, isPrioritizeAlertsAtFront, isStationSnoozed, getRemainingMinutes, getSnoozeReason, activeFleetTabConfig]);

    const [prevFilters, setPrevFilters] = useState({ searchQuery, tabFilters, monitoredSubFilters, activeTabId, viewMode });
    if (
        prevFilters.searchQuery !== searchQuery ||
        prevFilters.tabFilters !== tabFilters ||
        prevFilters.monitoredSubFilters !== monitoredSubFilters ||
        prevFilters.activeTabId !== activeTabId ||
        prevFilters.viewMode !== viewMode
    ) {
        setPrevFilters({ searchQuery, tabFilters, monitoredSubFilters, activeTabId, viewMode });
        setCurrentPage(1);
    }

    const [containerSize, setContainerSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth - 100 : 1400,
        height: typeof window !== 'undefined' ? window.innerHeight - 240 : 700
    });

    useEffect(() => {
        const updateSize = () => {
            const el = document.querySelector('.tab-pane-content-wrapper');
            if (el) {
                setContainerSize({ width: el.clientWidth, height: el.clientHeight });
            } else if (typeof window !== 'undefined') {
                setContainerSize({ width: window.innerWidth - 100, height: window.innerHeight - 240 });
            }
        };

        updateSize();
        window.addEventListener('resize', updateSize);

        let ro = null;
        const el = document.querySelector('.tab-pane-content-wrapper');
        if (el && typeof ResizeObserver !== 'undefined') {
            ro = new ResizeObserver(() => updateSize());
            ro.observe(el);
        }

        return () => {
            window.removeEventListener('resize', updateSize);
            if (ro) ro.disconnect();
        };
    }, []);

    const autoOptimalZoom = useMemo(() => {
        const count = processedStations.length + activeInlineFeatures.length;
        if (count === 0) return 3;

        const pane = typeof document !== 'undefined' ? document.querySelector('.tab-pane-content-wrapper') : null;
        const padY = pane ? (parseFloat(getComputedStyle(pane).paddingTop) + parseFloat(getComputedStyle(pane).paddingBottom)) : 40;
        const padX = pane ? (parseFloat(getComputedStyle(pane).paddingLeft) + parseFloat(getComputedStyle(pane).paddingRight)) : 40;

        const availW = Math.max(300, (pane ? pane.clientWidth : containerSize.width) - padX);
        const availH = Math.max(160, (pane ? pane.clientHeight : containerSize.height) - padY - 8);

        const cardWidths = { 5: 760, 4: 620, 3: 500, 2: 420, 1: 340 };

        for (let z = 5; z >= 1; z--) {
            const w = getCssPixelValue(`--zoom-card-w-${z}`, cardWidths[z]);
            const cardH = Math.round(w * (9 / 16) + 82);

            const cols = Math.max(1, Math.floor((availW + 20) / (w + 20)));
            const rows = Math.ceil(count / cols);
            const neededH = (rows * cardH) + ((rows - 1) * 20);

            if (neededH <= availH || z === 1) {
                return z;
            }
        }

        return 1;
    }, [processedStations.length, activeInlineFeatures.length, containerSize]);

    const effectiveZoom = isAutoZoom ? autoOptimalZoom : manualZoom;

    // Dynamically calculate page capacity as multiple of full rows and columns (cols * rows) for seamless grid tile packing
    const itemsPerPage = useMemo(() => {
        const pane = typeof document !== 'undefined' ? document.querySelector('.tab-pane-content-wrapper') : null;
        const padY = pane ? (parseFloat(getComputedStyle(pane).paddingTop) + parseFloat(getComputedStyle(pane).paddingBottom)) : 40;
        const padX = pane ? (parseFloat(getComputedStyle(pane).paddingLeft) + parseFloat(getComputedStyle(pane).paddingRight)) : 40;

        const availW = Math.max(300, (pane ? pane.clientWidth : containerSize.width) - padX);
        const paginationBarH = 76;
        const availH = Math.max(160, (pane ? pane.clientHeight : containerSize.height) - padY - paginationBarH);

        if (viewMode === 'grid') {
            const cardWidths = { 5: 700, 4: 570, 3: 450, 2: 360, 1: 290 };
            const w = getCssPixelValue(`--zoom-card-w-${effectiveZoom}`, cardWidths[effectiveZoom] || 360);
            const cardH = Math.round(w * (9 / 16) + 82);

            const cols = Math.max(1, Math.floor((availW + 20) / (w + 20)));
            const rows = Math.max(1, Math.floor((availH + 20) / (cardH + 20)));
            return Math.max(cols * rows, cols);
        } else {
            const denseW = 650;
            const denseH = 54;
            const cols = Math.max(1, Math.floor((availW + 12) / (denseW + 12)));
            const rows = Math.max(1, Math.floor((availH + 12) / (denseH + 12)));
            return Math.max(cols * rows, cols * 4, 20);
        }
    }, [viewMode, effectiveZoom, containerSize]);

    const totalPages = Math.ceil(processedStations.length / itemsPerPage) || 1;

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(Math.max(1, totalPages));
        }
    }, [totalPages, currentPage]);

    const paginatedStations = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return processedStations.slice(start, start + itemsPerPage);
    }, [processedStations, currentPage, itemsPerPage]);

    const canSort = processedStations.length > 1;
    const canStartAny = useMemo(() => processedStations.some(s => (s.isOnline || s.status === 1 || s.status === 2 || s.isProcessRunning) && !(s.isRecording ?? (s.status === 'Recording'))), [processedStations]);
    const canStopAny = useMemo(() => processedStations.some(s => Boolean(s.isRecording ?? (s.status === 'Recording'))), [processedStations]);

    const handleFilteredBulkStart = () => {
        if (!canStartAny) return;
        const targetHostnames = processedStations.filter(s => (s.isOnline || s.status === 1 || s.status === 2 || s.isProcessRunning) && !(s.isRecording ?? (s.status === 'Recording'))).map(s => s.hostname);
        onBulkStart?.(targetHostnames, { bitrate: activeFleetTabConfig?.defaultBitrate || null, fps: activeFleetTabConfig?.defaultFps || null });
    };

    const handleFilteredBulkStop = () => {
        if (!canStopAny) return;
        const targetHostnames = processedStations.filter(s => Boolean(s.isRecording ?? (s.status === 'Recording'))).map(s => s.hostname);
        onBulkStop?.(targetHostnames);
    };

    const handlePolicyApplication = ({ tabData, overrideCustomSettings }) => {
        if (!overrideCustomSettings) return;
        onUpdateStationSettings?.(prev => prev.map(st => {
            const matchesName = tabData.assignedHostnames?.includes(st.hostname);
            const matchesOu = tabData.assignedOus?.some(ou => st.ou?.toLowerCase().includes(ou.toLowerCase()) || st.group?.toLowerCase().includes(ou.toLowerCase()));
            if (matchesName || matchesOu) return { ...st, customBitrate: tabData.defaultBitrate, customFps: tabData.defaultFps };
            return st;
        }));
    };

    const handleZoomOut = () => { setIsAutoZoom(false); setManualZoom(p => Math.max(p - 1, 1)); };
    const handleZoomIn = () => { setIsAutoZoom(false); setManualZoom(p => Math.min(p + 1, 5)); };
    const handleSliderChange = (e) => { setIsAutoZoom(false); setManualZoom(Number(e.target.value)); };

    return {
        sortAsc, setSortAsc,
        inspectedHostname, setInspectedHostname,
        fullscreenHostname, setFullscreenHostname,
        activeTabId, setActiveTabId,
        tabFilters, setFilterForTab, currentTabFilter,
        monitoredSubFilters, setMonitoredSubFilterForTab, currentMonitoredSubFilter, monitoredCounts,
        currentPage, setCurrentPage, itemsPerPage, totalPages,
        viewMode, setViewMode,
        isSearchOpen, setIsSearchOpen,
        searchQuery, setSearchQuery, searchInputRef, handleClearFilter,
        hasActiveFilter, handleResetAllFilters,
        isAutoZoom, setIsAutoZoom, effectiveZoom,

        availableFeatures, openFeatureIds,
        focusedWidgetHost,
        processedStations, paginatedStations,
        openFeatureTabs, activeInlineFeatures, activeFeatureObject,
        inspectedStation, fullscreenStation,

        canSort, canStartAny, canStopAny,
        keystrokeMode, setKeystrokeMode, handleCycleKeystrokeMode,

        // Alert & Snooze engine exports
        isPrioritizeAlertsAtFront, setIsPrioritizeAlertsAtFront,
        unrecordedStations, activeUnrecordedStations, activeSnoozedStations,
        snoozeModalState, handleOpenSnoozeModal, handleOpenBulkSnoozeModal,
        handleCloseSnoozeModal, handleConfirmSnooze, handleCancelSnoozeModal,
        cancelSnooze, cancelAllSnoozes,
        handleStartRecordingStation, handleStartRecordingAllUnrecorded,

        handleToggleFeature, handleCloseFeature, handleFeatureQuickExport,
        handleZoomOut, handleZoomIn, handleSliderChange,
        handleFilteredBulkStart, handleFilteredBulkStop, handlePolicyApplication
    };
}