// ==========================================
// File: src/components/Settings/AdGroupChipsInput.jsx
// ==========================================
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

export default function AdGroupChipsInput({
    chips = [],
    onAddGroups,
    onRemoveGroup,
    onOpenBrowser,
    placeholder = 'Type AD group name or select from directory…',
    disabled = false
}) {
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);

    const inputRef = useRef(null);
    const containerRef = useRef(null);
    const debounceTimerRef = useRef(null);

    // Normalize chips into { id, name }
    const normalizedChips = useMemo(() => chips.map((c, idx) => {
        if (typeof c === 'string') return { id: `chip_${idx}_${c}`, name: c };
        return { id: c.id || `chip_${idx}_${c.groupName}`, name: c.groupName };
    }), [chips]);

    // Existing group names lowercase for deduplication
    const existingNamesSet = useMemo(() => new Set(normalizedChips.map(c => c.name.toLowerCase())), [normalizedChips]);

    // Search autocomplete
    const fetchSuggestions = useCallback(async (query) => {
        if (!query.trim()) {
            setSuggestions([]);
            setIsSearching(false);
            return;
        }

        setIsSearching(true);
        try {
            const res = await fetch(`/api/v1/settings/security/ad/search?query=${encodeURIComponent(query.trim())}&limit=12`);
            if (res.ok) {
                const data = await res.json();
                const items = data.results || [];
                // Filter out already added groups
                const filtered = items.filter(i => !existingNamesSet.has(i.samAccountName.toLowerCase()));
                setSuggestions(filtered);
                setShowSuggestions(filtered.length > 0);
                setFocusedIndex(-1);
            }
        } catch (err) {
            console.error('[AdGroupChipsInput] Autocomplete search failed:', err);
        } finally {
            setIsSearching(false);
        }
    }, [existingNamesSet]);

    // Handle input change with debounce
    const handleInputChange = (e) => {
        const val = e.target.value;
        setInputValue(val);

        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        if (val.trim().length >= 1) {
            debounceTimerRef.current = setTimeout(() => {
                fetchSuggestions(val);
            }, 200);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    // Add a single group by name
    const commitGroup = (name) => {
        const trimmed = name.trim();
        if (!trimmed) return;
        if (existingNamesSet.has(trimmed.toLowerCase())) {
            setInputValue('');
            setShowSuggestions(false);
            return;
        }

        onAddGroups([trimmed]);
        setInputValue('');
        setSuggestions([]);
        setShowSuggestions(false);
        setFocusedIndex(-1);
    };

    // Keyboard navigation
    const handleKeyDown = (e) => {
        // Backspace on empty input removes the last chip
        if (e.key === 'Backspace' && !inputValue && normalizedChips.length > 0) {
            const last = normalizedChips[normalizedChips.length - 1];
            onRemoveGroup(last.name);
            return;
        }

        // Enter key
        if (e.key === 'Enter') {
            e.preventDefault();
            if (showSuggestions && focusedIndex >= 0 && focusedIndex < suggestions.length) {
                commitGroup(suggestions[focusedIndex].samAccountName);
            } else if (inputValue.trim()) {
                commitGroup(inputValue.trim());
            }
            return;
        }

        // Comma creates chip
        if (e.key === ',') {
            e.preventDefault();
            if (inputValue.trim()) {
                commitGroup(inputValue.trim());
            }
            return;
        }

        // Arrow navigation
        if (showSuggestions && suggestions.length > 0) {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setFocusedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : 0));
                return;
            }
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                setFocusedIndex(prev => (prev > 0 ? prev - 1 : suggestions.length - 1));
                return;
            }
            if (e.key === 'Escape') {
                setShowSuggestions(false);
                return;
            }
        }
    };

    // Close suggestions on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="ad-chips-input-wrapper" ref={containerRef}>
            <div className="chips-input-dock-row">
                {/* Tactical Chips Box (Containing chips + inline input) */}
                <div
                    className={`chips-input-container ${disabled ? 'disabled' : ''}`}
                    onClick={() => inputRef.current?.focus()}
                >
                    {/* Render active chips inside input */}
                    {normalizedChips.map(chip => (
                        <span key={chip.id} className="ad-group-chip">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12" className="chip-icon">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                            <span className="chip-label">{chip.name}</span>
                            <button
                                type="button"
                                className="btn-chip-remove"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onRemoveGroup(chip.name);
                                }}
                                title={`Remove ${chip.name}`}
                            >
                                ✕
                            </button>
                        </span>
                    ))}

                    {/* Inline Text Input */}
                    <input
                        ref={inputRef}
                        type="text"
                        className="chips-inline-input"
                        placeholder={normalizedChips.length === 0 ? placeholder : 'Add another…'}
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        onFocus={() => {
                            if (suggestions.length > 0) setShowSuggestions(true);
                        }}
                        disabled={disabled}
                    />

                    {isSearching && (
                        <div className="chips-input-spinner" title="Searching Active Directory…">
                            <span className="mini-spin" />
                        </div>
                    )}
                </div>

                {/* Browse AD Tree Action Button */}
                <button
                    type="button"
                    className="btn-browse-ad-tree"
                    onClick={onOpenBrowser}
                    disabled={disabled}
                    title="Browse Active Directory OUs and select security entities"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 11v6m-3-3h6" />
                    </svg>
                    <span>Browse AD Tree</span>
                </button>
            </div>

            {/* Floating Autocomplete Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
                <div className="ad-autocomplete-dropdown">
                    <div className="dropdown-header">
                        <span>ACTIVE DIRECTORY SUGGESTIONS ({suggestions.length})</span>
                        <span className="shortcut-hint">Press Enter or click to add</span>
                    </div>

                    <div className="suggestions-list">
                        {suggestions.map((item, index) => {
                            const isFocused = index === focusedIndex;

                            return (
                                <div
                                    key={item.distinguishedName || item.samAccountName}
                                    className={`suggestion-item ${isFocused ? 'focused' : ''}`}
                                    onMouseEnter={() => setFocusedIndex(index)}
                                    onClick={() => commitGroup(item.samAccountName)}
                                >
                                    <div className="item-icon-dock">
                                        {item.type === 'User' ? (
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" className="icon-user">
                                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                                <circle cx="12" cy="7" r="4" />
                                            </svg>
                                        ) : (
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" className="icon-group">
                                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                            </svg>
                                        )}
                                    </div>

                                    <div className="item-info">
                                        <div className="name-row">
                                            <span className="sam-name">{item.samAccountName}</span>
                                            <span className={`tag-badge ${item.type === 'Security Group' ? 'sec' : item.type === 'User' ? 'user' : 'dist'}`}>
                                                {item.type}
                                            </span>
                                        </div>
                                        <div className="desc-row">
                                            <span className="display-name">{item.displayName}</span>
                                            {item.parentOu && (
                                                <span className="ou-crumb" title={item.parentOu}>
                                                    • {item.parentOu}
                                                </span>
                                            )}
                                        </div>
                                        {item.description && (
                                            <span className="item-description-text">{item.description}</span>
                                        )}
                                    </div>

                                    <div className="item-action">
                                        <span className="add-pill">+ Add</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
