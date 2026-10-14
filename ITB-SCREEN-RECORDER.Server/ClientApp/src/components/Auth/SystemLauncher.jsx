// ==========================================
// File: Client/src/components/Auth/SystemLauncher.jsx
// ==========================================
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './SystemLauncher.scss';

export default function SystemLauncher({ onLaunchApp }) {
    const { isOpenMode, isAuthenticated, user, isSystemRoot, hasPermission, login, logout, enterAsGuest } = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [pendingTargetApp, setPendingTargetApp] = useState(null);

    const canAccessSettings = isSystemRoot || hasPermission('settings.view');

    // כניסה מהירה כאורח - זמינה אך ורק למרכז הקלטות המסכים!
    const handleLaunchAsGuest = async (appId) => {
        if (appId === 'settings') return; // חסימה מוחלטת
        if (!isAuthenticated) {
            await enterAsGuest();
        }
        setPendingTargetApp(null);
        onLaunchApp(appId);
    };

    // בחירת מערכת מהפורטל
    const handleSelectSystem = async (appId) => {
        // 🔒 מערכת ההגדרות: לעולם לא כאורח!
        if (appId === 'settings') {
            if (isAuthenticated && canAccessSettings) {
                onLaunchApp('settings');
                return;
            }

            // פתיחת מודאל אימות מנהל
            setPendingTargetApp('settings');
            setUsername('');
            setPassword('');
            setLoginError(
                isAuthenticated && !canAccessSettings
                    ? `User '${user?.username}' lacks administrative access. Please authenticate as Administrator.`
                    : null
            );
            return;
        }

        // 🎬 מרכז הקלטות המסכים:
        if (isOpenMode) {
            await handleLaunchAsGuest('recording');
            return;
        }

        if (isAuthenticated && user) {
            onLaunchApp('recording');
            return;
        }

        setPendingTargetApp('recording');
        setUsername('');
        setPassword('');
        setLoginError(null);
    };

    // הגשת טופס התחברות
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        if (!username.trim() || !password) return;

        setIsSubmitting(true);
        setLoginError(null);

        try {
            const userData = await login(username.trim(), password);
            const target = pendingTargetApp || 'recording';

            if (target === 'settings') {
                const isAdmin = userData.isRoot || (Array.isArray(userData.permissions) && userData.permissions.includes('settings.view'));
                if (!isAdmin) {
                    setLoginError("Access denied: Account does not have administrative permissions.");
                    setIsSubmitting(false);
                    return;
                }
            }

            setPendingTargetApp(null);
            onLaunchApp(target);
        } catch (err) {
            setLoginError(err.message || 'Authentication failed.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="system-launcher-backdrop" dir="ltr">
            <div className="launcher-canvas">
                {/* סרגל עליון לחיווי משתמש מחובר */}
                {user && (
                    <div className="active-user-strip">
                        <div className="user-details">
                            <span className="user-dot"></span>
                            <span className="lbl">ACTIVE USER:</span>
                            <span className="val">{user.displayName || user.username}</span>
                            {isSystemRoot ? (
                                <span className="root-pill">ROOT ADMIN</span>
                            ) : canAccessSettings ? (
                                <span className="admin-pill">ADMINISTRATOR</span>
                            ) : (
                                <span className="mode-pill">{isOpenMode ? 'OPEN DEMO' : 'OPERATOR'}</span>
                            )}
                        </div>
                        <button type="button" className="btn-logout-launcher" onClick={logout} title="Sign Out">
                            Sign Out / Switch Account
                        </button>
                    </div>
                )}

                {/* לוגו המערכת הגדול והכותרת */}
                <div className="launcher-header">
                    <div className="launcher-brand-emblem">
                        <img
                            src="/images/LogoDark2.png"
                            alt="ITB System Logo"
                            onError={(e) => { e.target.style.display = 'none'; }}
                        />
                        <div className="emblem-halo-pulse" />
                    </div>

                    <div className="brand-title">
                        <span className="brand-accent">ITB</span>
                        <span className="brand-main">ENTERPRISE PORTAL</span>
                    </div>
                    <p className="brand-desc">
                        CENTRAL COMMAND & CONTROL PLATFORM • SELECT AN OPERATIONAL SUBSYSTEM
                    </p>
                </div>

                {/* 2 המערכות לבחירה */}
                <div className="systems-dual-grid">
                    {/* מערכת 1: מרכז הקלטות המסכים (מאפשרת כניסת אורח ב-Open Mode) */}
                    <div
                        className="system-app-card recording-card"
                        onClick={() => handleSelectSystem('recording')}
                    >
                        <div className="card-ambient-glow" />
                        <div className="card-content">
                            <div className="system-icon-box">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                                    <rect x="2" y="3" width="20" height="14" rx="2" />
                                    <line x1="8" y1="21" x2="16" y2="21" />
                                    <line x1="12" y1="17" x2="12" y2="21" />
                                </svg>
                            </div>
                            <div className="system-meta">
                                <span className="system-tag">OPERATIONAL COMMAND</span>
                                <h3>Screen Recording Center</h3>
                                <p>Live screen & audio surveillance, multi-station telemetry monitoring, synchronized video extraction, and timeline playback.</p>
                            </div>

                            <div className="card-actions-row">
                                <div className="system-enter-pill">
                                    <span>{isOpenMode ? '⚡ ENTER AS GUEST' : 'ENTER RECORDING CENTER'}</span>
                                    <span className="arrow">→</span>
                                </div>
                                {isOpenMode && (
                                    <button
                                        type="button"
                                        className="btn-auth-link"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setPendingTargetApp('recording');
                                        }}
                                    >
                                        Sign In
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* מערכת 2: ניהול והגדרות מערכת (נעולה לחלוטין – מנהל בלבד) */}
                    <div
                        className={`system-app-card settings-card ${!canAccessSettings ? 'admin-required' : ''}`}
                        onClick={() => handleSelectSystem('settings')}
                    >
                        <div className="card-ambient-glow" />
                        <div className="card-content">
                            <div className="system-icon-box">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                                    <circle cx="12" cy="12" r="3" />
                                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                                </svg>
                            </div>
                            <div className="system-meta">
                                <span className="system-tag">ADMINISTRATION & SECURITY</span>
                                <h3>System Settings & Management</h3>
                                <p>Storage retention policies, station recording tuning, role aliases, Active Directory LDAP synchronization, and user security.</p>
                            </div>

                            <div className="card-actions-row">
                                <div className="system-enter-pill">
                                    {canAccessSettings ? (
                                        <>
                                            <span>ENTER SYSTEM SETTINGS</span>
                                            <span className="arrow">→</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="lock-icon">🔒</span>
                                            <span>ADMIN LOGIN REQUIRED</span>
                                            <span className="arrow">→</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* דיאלוג כניסה / אימות חשבון */}
            {pendingTargetApp && (
                <div className="portal-login-modal-overlay" onClick={() => setPendingTargetApp(null)}>
                    <div className="portal-login-card" onClick={e => e.stopPropagation()}>
                        <div className="modal-top-accent" />
                        <div className="modal-title-row">
                            <span className={`target-pill ${pendingTargetApp === 'settings' ? 'admin' : ''}`}>
                                {pendingTargetApp === 'settings' ? 'SYSTEM SETTINGS (ADMIN ONLY)' : 'SCREEN RECORDING CENTER'}
                            </span>
                            <h3>Enterprise Authentication</h3>
                        </div>

                        <p className="modal-sub">
                            {pendingTargetApp === 'settings'
                                ? 'Administrator credentials required (ROOT or assigned Admin account)'
                                : 'Authenticate to access the operational Screen Recording Center'}
                        </p>

                        {/* כפתור אורח מוצג אך ורק אם היעד אינו הגדרות! */}
                        {isOpenMode && pendingTargetApp !== 'settings' && (
                            <div className="guest-quick-access-box">
                                <button
                                    type="button"
                                    className="btn-enter-guest"
                                    onClick={() => handleLaunchAsGuest(pendingTargetApp)}
                                >
                                    ⚡ CONTINUE AS GUEST (FAST DEMO)
                                </button>
                                <div className="login-divider">
                                    <span>OR SIGN IN WITH ACCOUNT</span>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleLoginSubmit}>
                            {loginError && <div className="login-error-badge">{loginError}</div>}

                            <div className="form-group">
                                <label>Username</label>
                                <input
                                    type="text"
                                    autoFocus
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    placeholder="Enter username (e.g. sys_master)..."
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="Enter password..."
                                    required
                                />
                            </div>

                            <div className="modal-actions-row">
                                <button type="button" className="btn-cancel" onClick={() => setPendingTargetApp(null)}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn-portal-login" disabled={isSubmitting}>
                                    {isSubmitting ? 'Verifying…' : pendingTargetApp === 'settings' ? 'Sign In as Admin' : 'Sign In & Enter'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}