import { useState, useMemo, useEffect, useRef } from 'react';

const isStationFaulty = (s) => (s.isOnline || s.status === 1 || s.status === 2) && (s.droppedFrames || 0) > 5;

// שליפת משתני CSS גלובליים המוגדרים ב-SCSS
const getCssPixelValue = (varName, fallback) => {
    if (typeof window === 'undefined') return fallback;
    const val = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    return val ? parseFloat(val) : fallback;
};

export function useDashboardLogic({
    stations = [],
    systemConfig,
    hideOffline = true,
    isFaultFilterActive = false,
    onExitFaultFilter,
    onBulkStart,
    onBulkStop,
    onUpdateStationSettings,
    onQuickExport
}) {
    const [sortAsc, setSortAsc] = useState(true);
    const [inspectedHostname, setInspectedHostname] = useState(null);
    const [fullscreenHostname, setFullscreenHostname] = useState(null);

    const [activeTabId, setActiveTabId] = useState('ALL');
    const [tabFilters, setTabFilters] = useState({});
    const currentTabFilter = tabFilters[activeTabId] || 'ALL';
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 24;

    const fleetTabsList = useMemo(() => systemConfig?.dashboard?.fleetTabs || [], [systemConfig]);
    const activeFleetTabConfig = useMemo(() => fleetTabsList.find(t => t.id === activeTabId) || null, [fleetTabsList, activeTabId]);

    const tabFilteredStations = useMemo(() => {
        if (activeTabId === 'ALL') return stations;
        if (!activeFleetTabConfig) return stations;

        return stations.filter(station => {
            const matchesNames = activeFleetTabConfig.assignedHostnames?.some(h =>
                h.toLowerCase() === station.hostname?.toLowerCase() ||
                h.toLowerCase() === station.displayName?.toLowerCase()
            );
            const matchesOu = activeFleetTabConfig.assignedOus?.some(ou =>
                station.ou?.toLowerCase().includes(ou.toLowerCase()) ||
                station.group?.toLowerCase().includes(ou.toLowerCase())
            );
            return matchesNames || matchesOu;
        });
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

    const [isSearchOpen, setIsSearchOpen] = useState(() => {
        const saved = localStorage.getItem('itb_dashboard_search_open');
        return saved !== null ? JSON.parse(saved) : false;
    });
    const [searchQuery, setSearchQuery] = useState(() => localStorage.getItem('itb_dashboard_search_query') || '');

    useEffect(() => localStorage.setItem('itb_dashboard_search_open', JSON.stringify(isSearchOpen)), [isSearchOpen]);
    useEffect(() => localStorage.setItem('itb_dashboard_search_query', searchQuery), [searchQuery]);

    const searchInputRef = useRef(null);

    const hasActiveFilter = useMemo(() => {
        return Boolean(searchQuery.trim() || (currentTabFilter && currentTabFilter !== 'ALL'));
    }, [searchQuery, currentTabFilter]);

    const handleClearFilter = () => { setSearchQuery(''); searchInputRef.current?.focus(); };
    const setFilterForTab = (val) => setTabFilters(p => ({ ...p, [activeTabId]: val }));
    const handleResetAllFilters = () => {
        setSearchQuery('');
        setFilterForTab('ALL');
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

    const faultyStationsCount = useMemo(() => tabFilteredStations.filter(isStationFaulty).length, [tabFilteredStations]);
    useEffect(() => { if (isFaultFilterActive && faultyStationsCount === 0) onExitFaultFilter?.(); }, [isFaultFilterActive, faultyStationsCount, onExitFaultFilter]);

    const processedStations = useMemo(() => {
        let list = [...tabFilteredStations];
        if (isFaultFilterActive) list = list.filter(isStationFaulty);
        else if (hideOffline) list = list.filter(s => s.isOnline || s.status === 1 || s.status === 2 || s.isProcessRunning);

        if (currentTabFilter === 'RECORDING') list = list.filter(s => s.isStreaming);
        else if (currentTabFilter === 'IDLE') list = list.filter(s => s.isOnline && !s.isStreaming);
        else if (currentTabFilter === 'OFFLINE') list = list.filter(s => !s.isOnline);
        else if (currentTabFilter === 'ONLINE') list = list.filter(s => s.isOnline);

        if (searchQuery.trim()) {
            const q = searchQuery.trim().toLowerCase();
            list = list.filter(s => (s.hostname && s.hostname.toLowerCase().includes(q)) || (s.displayName && s.displayName.toLowerCase().includes(q)) || (s.ipAddress && s.ipAddress.includes(q)));
        }

        list.sort((a, b) => {
            const comp = (a.displayName || a.hostname || '').toLowerCase().localeCompare((b.displayName || b.hostname || '').toLowerCase(), undefined, { numeric: true, sensitivity: 'base' });
            return sortAsc ? comp : -comp;
        });

        if (activeFleetTabConfig) {
            list = list.map(station => ({
                ...station,
                effectiveBitrate: station.customBitrate || activeFleetTabConfig.defaultBitrate || station.bitrate,
                effectiveFps: station.customFps || activeFleetTabConfig.defaultFps || station.fps
            }));
        }

        return list;
    }, [tabFilteredStations, isFaultFilterActive, hideOffline, currentTabFilter, searchQuery, sortAsc, activeFleetTabConfig]);

    const [prevFilters, setPrevFilters] = useState({ searchQuery, tabFilters, activeTabId, viewMode, hideOffline });
    if (
        prevFilters.searchQuery !== searchQuery ||
        prevFilters.tabFilters !== tabFilters ||
        prevFilters.activeTabId !== activeTabId ||
        prevFilters.viewMode !== viewMode ||
        prevFilters.hideOffline !== hideOffline
    ) {
        setPrevFilters({ searchQuery, tabFilters, activeTabId, viewMode, hideOffline });
        setCurrentPage(1);
    }

    const totalPages = Math.ceil(processedStations.length / itemsPerPage) || 1;
    const paginatedStations = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return processedStations.slice(start, start + itemsPerPage);
    }, [processedStations, currentPage, itemsPerPage]);

    const canSort = processedStations.length > 1;
    const canStartAny = useMemo(() => processedStations.some(s => (s.isOnline || s.status === 1 || s.status === 2 || s.isProcessRunning) && !s.isStreaming), [processedStations]);
    const canStopAny = useMemo(() => processedStations.some(s => s.isStreaming), [processedStations]);

    const handleFilteredBulkStart = () => {
        if (!canStartAny) return;
        const targetHostnames = processedStations.filter(s => (s.isOnline || s.status === 1 || s.status === 2 || s.isProcessRunning) && !s.isStreaming).map(s => s.hostname);
        onBulkStart?.(targetHostnames, { bitrate: activeFleetTabConfig?.defaultBitrate || null, fps: activeFleetTabConfig?.defaultFps || null });
    };

    const handleFilteredBulkStop = () => {
        if (!canStopAny) return;
        const targetHostnames = processedStations.filter(s => s.isStreaming).map(s => s.hostname);
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

    // מעקב מידות קונטיינר דרך ResizeObserver
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

    // חישוב זום אוטומטי המבוסס על שטח ה-Pane הזמין בלבד
    const autoOptimalZoom = useMemo(() => {
        const count = paginatedStations.length + activeInlineFeatures.length;
        if (count === 0) return 3;

        const pane = typeof document !== 'undefined' ? document.querySelector('.tab-pane-content-wrapper') : null;
        const padY = pane ? (parseFloat(getComputedStyle(pane).paddingTop) + parseFloat(getComputedStyle(pane).paddingBottom)) : 52;
        const padX = pane ? (parseFloat(getComputedStyle(pane).paddingLeft) + parseFloat(getComputedStyle(pane).paddingRight)) : 32;

        const availW = Math.max(300, (pane ? pane.clientWidth : containerSize.width) - padX);
        // גובה זמין נטו (ללא צורך בקיזוז ידני, מכיוון שהסרגלים יושבים מחוץ ל-Pane)
        const availH = Math.max(160, (pane ? pane.clientHeight : containerSize.height) - padY - 8);

        const cardWidths = { 5: 700, 4: 570, 3: 450, 2: 360, 1: 290 };

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
    }, [paginatedStations.length, activeInlineFeatures.length, containerSize]);

    const effectiveZoom = isAutoZoom ? autoOptimalZoom : manualZoom;

    const handleZoomOut = () => { setIsAutoZoom(false); setManualZoom(p => Math.max(p - 1, 1)); };
    const handleZoomIn = () => { setIsAutoZoom(false); setManualZoom(p => Math.min(p + 1, 5)); };
    const handleSliderChange = (e) => { setIsAutoZoom(false); setManualZoom(Number(e.target.value)); };

    return {
        sortAsc, setSortAsc,
        inspectedHostname, setInspectedHostname,
        fullscreenHostname, setFullscreenHostname,
        activeTabId, setActiveTabId,
        tabFilters, setFilterForTab, currentTabFilter,
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

        handleToggleFeature, handleCloseFeature, handleFeatureQuickExport,
        handleZoomOut, handleZoomIn, handleSliderChange,
        handleFilteredBulkStart, handleFilteredBulkStop, handlePolicyApplication
    };
}