/* eslint-disable react-refresh/only-export-components */
// ==========================================
// File: Client/src/context/AuthContext.jsx
// ==========================================
import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEYS = {
    TOKEN: 'itb_auth_token',
    USER: 'itb_auth_user',
    ROLES: 'itb_auth_roles',
    PERMS: 'itb_auth_perms'
};

if (typeof window !== 'undefined' && !window._itbFetchIntercepted) {
    window._itbFetchIntercepted = true;
    const originalFetch = window.fetch;
    window.fetch = async (input, init = {}) => {
        const token = sessionStorage.getItem(STORAGE_KEYS.TOKEN);
        const urlStr = typeof input === 'string' ? input : input?.url || '';

        if (token && urlStr.includes('/api/')) {
            const headers = new Headers(init?.headers || (typeof input !== 'string' ? input.headers : undefined) || {});
            if (!headers.has('Authorization')) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return originalFetch(input, { ...init, headers });
        }

        return originalFetch(input, init);
    };
}

export function AuthProvider({ children }) {
    const [authMode, setAuthMode] = useState('Open');
    const [isOpenMode, setIsOpenMode] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [roles, setRoles] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [isSystemRoot, setIsSystemRoot] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    const checkServerAuthStatus = useCallback(async () => {
        try {
            const res = await fetch('/api/v1/auth/status');
            if (res.ok) {
                const data = await res.json();
                setAuthMode(data.mode);
                setIsOpenMode(data.isOpenMode);
                return data;
            }
        } catch (err) {
            console.error('[AuthContext] Failed checking status:', err);
        }
        return { isOpenMode: true, mode: 'Open' };
    }, []);

    // Guest login - operational monitoring permissions only (no administrative settings or security modifications)
    const enterAsGuest = useCallback(async () => {
        try {
            const res = await fetch('/api/v1/auth/guest-session', { method: 'POST' });
            if (res.ok) {
                const data = await res.json();
                sessionStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
                sessionStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data));
                sessionStorage.setItem(STORAGE_KEYS.ROLES, JSON.stringify(data.roles || []));
                sessionStorage.setItem(STORAGE_KEYS.PERMS, JSON.stringify(data.permissions || []));

                setUser(data);
                setRoles(data.roles || []);
                setPermissions(data.permissions || []);
                setIsSystemRoot(false);
                setIsAuthenticated(true);
                return data;
            }
        } catch (err) {
            console.warn('[AuthContext] Falling back to local guest session:', err);
        }

        const fallbackGuest = {
            token: 'guest_token_open_mode',
            userId: 'usr_guest',
            username: 'Guest',
            displayName: 'Guest Operator',
            isRoot: false,
            roles: ['role_viewer', 'role_operator'],
            permissions: [
                'stations.view',
                'stations.control',
                'playback.view',
                'playback.export'
            ]
        };
        sessionStorage.setItem(STORAGE_KEYS.TOKEN, fallbackGuest.token);
        sessionStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(fallbackGuest));
        sessionStorage.setItem(STORAGE_KEYS.ROLES, JSON.stringify(fallbackGuest.roles));
        sessionStorage.setItem(STORAGE_KEYS.PERMS, JSON.stringify(fallbackGuest.permissions));
        setUser(fallbackGuest);
        setRoles(fallbackGuest.roles);
        setPermissions(fallbackGuest.permissions);
        setIsAuthenticated(true);
        return fallbackGuest;
    }, []);

    useEffect(() => {
        const init = async () => {
            await checkServerAuthStatus();

            const savedToken = sessionStorage.getItem(STORAGE_KEYS.TOKEN);
            const savedUser = sessionStorage.getItem(STORAGE_KEYS.USER);
            const savedRoles = sessionStorage.getItem(STORAGE_KEYS.ROLES);
            const savedPerms = sessionStorage.getItem(STORAGE_KEYS.PERMS);

            if (savedToken && savedUser) {
                const parsedUser = JSON.parse(savedUser);
                setUser(parsedUser);
                setRoles(savedRoles ? JSON.parse(savedRoles) : []);
                setPermissions(savedPerms ? JSON.parse(savedPerms) : []);
                setIsSystemRoot(Boolean(parsedUser.isRoot));
                setIsAuthenticated(true);
            }

            setIsInitialized(true);
        };

        init();
    }, [checkServerAuthStatus]);

    const login = useCallback(async (username, password) => {
        const res = await fetch('/api/v1/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.message || 'Authentication failed.');
        }

        const data = await res.json();
        sessionStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
        sessionStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data));
        sessionStorage.setItem(STORAGE_KEYS.ROLES, JSON.stringify(data.roles || []));
        sessionStorage.setItem(STORAGE_KEYS.PERMS, JSON.stringify(data.permissions || []));

        setUser(data);
        setRoles(data.roles || []);
        setPermissions(data.permissions || []);
        setIsSystemRoot(Boolean(data.isRoot));
        setIsAuthenticated(true);

        return data;
    }, []);

    const logout = useCallback(() => {
        sessionStorage.removeItem(STORAGE_KEYS.TOKEN);
        sessionStorage.removeItem(STORAGE_KEYS.USER);
        sessionStorage.removeItem(STORAGE_KEYS.ROLES);
        sessionStorage.removeItem(STORAGE_KEYS.PERMS);

        setUser(null);
        setRoles([]);
        setPermissions([]);
        setIsSystemRoot(false);
        setIsAuthenticated(false);
    }, []);

    // Secure permission enforcement check
    const hasPermission = useCallback((permissionKey) => {
        if (!permissionKey) return true;
        if (isSystemRoot) return true;

        // In Open Mode: grants operational permissions only (never settings or security management)
        if (isOpenMode) {
            const isProtectedAdminPermission =
                permissionKey.startsWith('settings.') || permissionKey.startsWith('security.');
            if (!isProtectedAdminPermission) {
                return true;
            }
        }

        return permissions.includes(permissionKey);
    }, [isOpenMode, isSystemRoot, permissions]);

    const value = useMemo(() => ({
        isInitialized,
        authMode,
        isOpenMode,
        isAuthenticated,
        user,
        roles,
        permissions,
        isSystemRoot,
        login,
        logout,
        enterAsGuest,
        hasPermission
    }), [
        isInitialized,
        authMode,
        isOpenMode,
        isAuthenticated,
        user,
        roles,
        permissions,
        isSystemRoot,
        login,
        logout,
        enterAsGuest,
        hasPermission
    ]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
}

export function Can({ permission, children, fallback = null, disabled = false, disabledTooltip = 'Access restricted' }) {
    const { hasPermission } = useAuth();
    const allowed = hasPermission(permission);

    if (allowed) return <>{children}</>;

    if (disabled) {
        return (
            <span className="permission-disabled-wrapper" title={disabledTooltip} style={{ cursor: 'not-allowed', display: 'inline-flex' }}>
                {React.cloneElement(children, { disabled: true, style: { ...children.props?.style, pointerEvents: 'none', opacity: 0.4 } })}
            </span>
        );
    }

    return fallback;
}