// ==========================================
// File: ITB-SCREEN-RECORDER.Server/ClientApp/src/components/Settings/FolderBrowseModal.jsx
// ==========================================
import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import './FolderBrowseModal.scss';

export default function FolderBrowseModal({
    isOpen,
    initialPath = '',
    title = 'Browse Directory',
    onSelect,
    onClose
}) {
    const [currentPath, setCurrentPath] = useState(initialPath || '');
    const [inputPath, setInputPath] = useState(initialPath || '');
    const [parentPath, setParentPath] = useState(null);
    const [drives, setDrives] = useState([]);
    const [directories, setDirectories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [isCreatingFolder, setIsCreatingFolder] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');

    const loadPath = useCallback(async (targetPath) => {
        setIsLoading(true);
        setErrorMsg('');
        try {
            const url = targetPath 
                ? `/api/v1/settings/browse-directories?path=${encodeURIComponent(targetPath)}`
                : '/api/v1/settings/browse-directories';
            const res = await fetch(url);
            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || `HTTP ${res.status}`);
            }
            const data = await res.json();
            setCurrentPath(data.currentPath || '');
            setInputPath(data.currentPath || '');
            setParentPath(data.parentPath || null);
            setDrives(data.drives || []);
            setDirectories(data.directories || []);
        } catch (err) {
            console.error('[FolderBrowseModal] Failed loading path:', err);
            setErrorMsg(err.message || 'Failed to access directory');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (isOpen) {
            loadPath(initialPath || '');
            setIsCreatingFolder(false);
            setNewFolderName('');
        }
    }, [isOpen, initialPath, loadPath]);

    const handleNavigateTo = (target) => {
        loadPath(target);
    };

    const handleNavigateUp = () => {
        if (parentPath) {
            loadPath(parentPath);
        } else {
            loadPath(''); // Go to root/drives
        }
    };

    const handleCreateFolder = async (e) => {
        e.preventDefault();
        if (!newFolderName.trim() || !currentPath) return;

        try {
            const res = await fetch('/api/v1/settings/create-directory', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    parentPath: currentPath,
                    folderName: newFolderName.trim()
                })
            });

            if (!res.ok) throw new Error('Failed to create folder');
            const data = await res.json();
            setIsCreatingFolder(false);
            setNewFolderName('');
            loadPath(data.fullPath || currentPath);
        } catch (err) {
            setErrorMsg(err.message || 'Failed to create folder');
        }
    };

    const handleSelectCurrent = () => {
        if (!currentPath) return;
        onSelect?.(currentPath);
        onClose?.();
    };

    if (!isOpen) return null;

    // Use Portal to document.body to guarantee centering on scrolled screens
    return ReactDOM.createPortal(
        <div className="folder-browse-modal-backdrop" onClick={onClose}>
            <div className="folder-browse-modal-card" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <div className="header-title-stack">
                        <span className="folder-icon">📁</span>
                        <div className="title-text-wrap">
                            <h3>{title}</h3>
                            <span className="header-subtitle">SERVER FILESYSTEM DIRECTORY EXPLORER</span>
                        </div>
                    </div>
                    <button type="button" className="btn-close-modal" onClick={onClose} title="Close">✕</button>
                </div>

                <div className="modal-toolbar">
                    <div className="path-input-row">
                        <button
                            type="button"
                            className="btn-toolbar-nav"
                            onClick={handleNavigateUp}
                            disabled={!currentPath}
                            title="Navigate up one level"
                        >
                            ⬆ UP
                        </button>
                        <input
                            type="text"
                            className="path-text-input"
                            value={inputPath}
                            onChange={e => setInputPath(e.target.value)}
                            onKeyDown={e => {
                                if (e.key === 'Enter') handleNavigateTo(inputPath);
                            }}
                            placeholder="Type or paste server directory path or UNC share..."
                        />
                        <button
                            type="button"
                            className="btn-toolbar-go"
                            onClick={() => handleNavigateTo(inputPath)}
                        >
                            GO
                        </button>
                    </div>

                    {drives.length > 0 && (
                        <div className="drives-shortcuts-row">
                            <span className="drives-label">DRIVES:</span>
                            {drives.map(d => (
                                <button
                                    key={d.name}
                                    type="button"
                                    className="btn-drive-chip"
                                    onClick={() => handleNavigateTo(d.fullPath || d.name)}
                                    title={`Root ${d.name} (${d.driveType})`}
                                >
                                    💾 {d.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {errorMsg && (
                    <div className="folder-browse-error">
                        <span>⚠️ {errorMsg}</span>
                        <button type="button" onClick={() => loadPath('')}>Back to Drives</button>
                    </div>
                )}

                <div className="modal-body-content">
                    {isLoading ? (
                        <div className="folder-loading-spinner">
                            <span className="spinner-ring" />
                            <span>ACCESSING SERVER DIRECTORY...</span>
                        </div>
                    ) : (
                        <div className="directories-list-container">
                            {directories.length === 0 && drives.length === 0 ? (
                                <div className="empty-directories-placeholder">
                                    <span>No subdirectories found in this location</span>
                                </div>
                            ) : (
                                <div className="directory-items-grid">
                                    {directories.map(dir => (
                                        <div
                                            key={dir.fullPath}
                                            className="directory-item-card"
                                            onClick={() => handleNavigateTo(dir.fullPath)}
                                            title={`Open ${dir.name}`}
                                        >
                                            <span className="item-icon">📁</span>
                                            <div className="item-meta">
                                                <span className="item-name">{dir.name}</span>
                                                {dir.lastModifiedUtc && (
                                                    <span className="item-date">
                                                        {new Date(dir.lastModifiedUtc).toLocaleDateString()}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Inline New Folder Form */}
                {isCreatingFolder ? (
                    <form className="new-folder-form-bar" onSubmit={handleCreateFolder}>
                        <span>📁 New Folder Name:</span>
                        <input
                            type="text"
                            value={newFolderName}
                            onChange={e => setNewFolderName(e.target.value)}
                            placeholder="Enter folder name..."
                            autoFocus
                            required
                        />
                        <button type="submit" className="btn-confirm-create">Create</button>
                        <button type="button" className="btn-cancel-create" onClick={() => setIsCreatingFolder(false)}>Cancel</button>
                    </form>
                ) : (
                    <div className="create-folder-toggle-bar">
                        <button
                            type="button"
                            className="btn-toggle-create"
                            onClick={() => setIsCreatingFolder(true)}
                            disabled={!currentPath}
                        >
                            ➕ Create New Folder Here
                        </button>
                    </div>
                )}

                <div className="modal-footer">
                    <div className="selected-path-preview">
                        <span className="preview-label">SELECTED TARGET:</span>
                        <span className="preview-val" title={currentPath}>{currentPath || 'Root Drives'}</span>
                    </div>

                    <div className="footer-actions">
                        <button type="button" className="btn-cancel" onClick={onClose}>
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn-select"
                            disabled={!currentPath}
                            onClick={handleSelectCurrent}
                        >
                            ✔ SELECT THIS FOLDER
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}
