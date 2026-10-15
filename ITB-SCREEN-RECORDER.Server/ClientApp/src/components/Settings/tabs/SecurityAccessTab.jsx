// ==========================================
// File: Client/src/components/Settings/tabs/SecurityAccessTab.jsx
// ==========================================
import { useState, useEffect, useCallback, useMemo } from 'react';

export default function SecurityAccessTab() {
    const [policy, setPolicy] = useState(null);
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [ldapMappings, setLdapMappings] = useState([]);
    const [loading, setLoading] = useState(true);

    const [ldapServer, setLdapServer] = useState('');
    const [ldapPort, setLdapPort] = useState(389);
    const [ldapBaseDn, setLdapBaseDn] = useState('');
    const [ldapUseSsl, setLdapUseSsl] = useState(false);
    const [savingLdap, setSavingLdap] = useState(false);

    const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
    const [newUsername, setNewUsername] = useState('');
    const [newDisplayName, setNewDisplayName] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newUserRoles, setNewUserRoles] = useState(['role_viewer']);

    const [passwordChangeUser, setPasswordChangeUser] = useState(null);
    const [newPasswordValue, setNewPasswordValue] = useState('');

    const [isAddMappingOpen, setIsAddMappingOpen] = useState(false);
    const [newAdGroup, setNewAdGroup] = useState('');
    const [newMappingRoleId, setNewMappingRoleId] = useState('role_operator');

    const loadSecurityData = useCallback(async () => {
        try {
            const [policyRes, usersRes, rolesRes, mappingsRes] = await Promise.all([
                fetch('/api/v1/settings/security/policy'),
                fetch('/api/v1/settings/security/users'),
                fetch('/api/v1/settings/security/roles'),
                fetch('/api/v1/settings/security/ldap-mappings')
            ]);

            if (policyRes.ok) {
                const pData = await policyRes.json();
                setPolicy(pData);
                setLdapServer(pData.ldapServer || '');
                setLdapPort(pData.ldapPort || 389);
                setLdapBaseDn(pData.ldapBaseDn || '');
                setLdapUseSsl(Boolean(pData.useSsl));
            }

            if (usersRes.ok) setUsers(await usersRes.json());
            if (rolesRes.ok) setRoles(await rolesRes.json());
            if (mappingsRes.ok) setLdapMappings(await mappingsRes.json());
        } catch (err) {
            console.error('[SecurityAccessTab] Failed loading security config:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadSecurityData();
    }, [loadSecurityData]);

    const normalizeMode = (m) => {
        if (typeof m === 'number') return m;
        if (typeof m === 'string') {
            const lower = m.toLowerCase();
            if (lower.includes('strictlocal') || lower === '1') return 1;
            if (lower.includes('strictldap') || lower === '2') return 2;
        }
        return 0; // Open
    };

    const currentMode = useMemo(() => normalizeMode(policy?.currentMode), [policy]);

    const handleSwitchMode = async (targetMode) => {
        if (targetMode === currentMode) return;

        if (targetMode !== 0) {
            const confirmed = window.confirm(
                `Switching to ${targetMode === 1 ? 'Strict Local' : 'Strict LDAP'} authentication will require all users to authenticate. Proceed?`
            );
            if (!confirmed) return;
        }

        try {
            const res = await fetch('/api/v1/settings/security/policy/mode', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mode: targetMode })
            });

            if (res.ok) {
                await loadSecurityData();
            } else {
                const err = await res.json().catch(() => ({}));
                alert(err.message || 'Failed changing security mode.');
            }
        } catch (err) {
            console.error('[SecurityAccessTab] Mode switch failed:', err);
        }
    };

    const handleSaveLdap = async (e) => {
        e.preventDefault();
        setSavingLdap(true);
        try {
            const res = await fetch('/api/v1/settings/security/policy/ldap', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    server: ldapServer.trim(),
                    port: Number(ldapPort),
                    baseDn: ldapBaseDn.trim(),
                    useSsl: ldapUseSsl
                })
            });
            if (res.ok) {
                await loadSecurityData();
                alert('LDAP configuration updated successfully.');
            }
        } catch (err) {
            console.error('[SecurityAccessTab] Failed saving LDAP:', err);
        } finally {
            setSavingLdap(false);
        }
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/v1/settings/security/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: newUsername.trim(),
                    displayName: newDisplayName.trim() || newUsername.trim(),
                    password: newPassword,
                    roleIds: newUserRoles
                })
            });
            if (res.ok) {
                setIsCreateUserOpen(false);
                setNewUsername('');
                setNewDisplayName('');
                setNewPassword('');
                await loadSecurityData();
            } else {
                const err = await res.json().catch(() => ({}));
                alert(err.message || 'Failed creating user.');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (!passwordChangeUser) return;
        try {
            const res = await fetch(`/api/v1/settings/security/users/${passwordChangeUser.id}/password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newPassword: newPasswordValue })
            });
            if (res.ok) {
                setPasswordChangeUser(null);
                setNewPasswordValue('');
                alert('Password updated.');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteUser = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        try {
            const res = await fetch(`/api/v1/settings/security/users/${userId}`, { method: 'DELETE' });
            if (res.ok) await loadSecurityData();
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddMapping = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/v1/settings/security/ldap-mappings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    adGroupName: newAdGroup.trim(),
                    roleId: newMappingRoleId
                })
            });
            if (res.ok) {
                setIsAddMappingOpen(false);
                setNewAdGroup('');
                await loadSecurityData();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteMapping = async (mappingId) => {
        try {
            const res = await fetch(`/api/v1/settings/security/ldap-mappings/${mappingId}`, { method: 'DELETE' });
            if (res.ok) await loadSecurityData();
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) {
        return <div className="settings-loader-box">Loading security parameters…</div>;
    }

    return (
        <fieldset className="settings-fieldset security-access-fieldset">
            <legend>Enterprise Security & Role-Based Access Control</legend>

            <div className="security-subpanel">
                <div className="subpanel-header">
                    <h4>SYSTEM AUTHENTICATION MODE</h4>
                    <span className="subpanel-desc">Configure operational gatekeeping and authentication enforcement across the fleet.</span>
                </div>

                <div className="auth-mode-cards-row">
                    <div
                        className={`auth-mode-card ${currentMode === 0 ? 'active' : ''}`}
                        onClick={() => handleSwitchMode(0)}
                    >
                        <div className="card-top">
                            <span className="mode-badge open">OPEN MODE</span>
                            <span className="radio-pip" />
                        </div>
                        <p>No credential required. Operators select their active operational role directly from the launchpad.</p>
                    </div>

                    <div
                        className={`auth-mode-card ${currentMode === 1 ? 'active' : ''}`}
                        onClick={() => handleSwitchMode(1)}
                    >
                        <div className="card-top">
                            <span className="mode-badge strict-local">STRICT LOCAL</span>
                            <span className="radio-pip" />
                        </div>
                        <p>Enforces local username/password verification before entering roles. Managed entirely in system catalog.</p>
                    </div>

                    <div
                        className={`auth-mode-card ${currentMode === 2 ? 'active' : ''}`}
                        onClick={() => handleSwitchMode(2)}
                    >
                        <div className="card-top">
                            <span className="mode-badge strict-ldap">ACTIVE DIRECTORY / LDAP</span>
                            <span className="radio-pip" />
                        </div>
                        <p>Cross-platform LDAP/AD binding. Roles are automatically mapped from Domain Security Groups.</p>
                    </div>
                </div>
            </div>

            <div className="security-subpanel">
                <div className="subpanel-header">
                    <h4>ACTIVE DIRECTORY & LDAP CONFIGURATION</h4>
                    <span className="subpanel-desc">Configure directory connection parameters for domain security groups.</span>
                </div>

                <form onSubmit={handleSaveLdap} className="ldap-form-grid">
                    <div className="settings-field">
                        <span>LDAP Server / Domain Controller</span>
                        <input
                            type="text"
                            placeholder="e.g. dc01.corp.local or 10.0.0.5"
                            value={ldapServer}
                            onChange={e => setLdapServer(e.target.value)}
                        />
                    </div>

                    <div className="settings-field">
                        <span>Port</span>
                        <input
                            type="number"
                            value={ldapPort}
                            onChange={e => setLdapPort(e.target.value)}
                        />
                    </div>

                    <div className="settings-field fullwidth">
                        <span>Search Base DN</span>
                        <input
                            type="text"
                            placeholder="e.g. DC=corp,DC=local"
                            value={ldapBaseDn}
                            onChange={e => setLdapBaseDn(e.target.value)}
                        />
                    </div>

                    <div className="ldap-form-actions fullwidth">
                        <label className="ssl-checkbox">
                            <input
                                type="checkbox"
                                checked={ldapUseSsl}
                                onChange={e => setLdapUseSsl(e.target.checked)}
                            />
                            <span>Use LDAPS (SSL/TLS Encryption)</span>
                        </label>

                        <button type="submit" className="btn-save-sm" disabled={savingLdap}>
                            {savingLdap ? 'Saving...' : 'Save LDAP Settings'}
                        </button>
                    </div>
                </form>
            </div>

            <div className="security-subpanel">
                <div className="subpanel-header flex-between">
                    <div>
                        <h4>ACTIVE DIRECTORY GROUP-TO-ROLE MAPPINGS</h4>
                        <span className="subpanel-desc">Map incoming domain security groups to local operational roles.</span>
                    </div>
                    <button type="button" className="btn-add-entity" onClick={() => setIsAddMappingOpen(true)}>
                        + Add Group Mapping
                    </button>
                </div>

                <div className="table-responsive-box">
                    <table className="security-data-table">
                        <thead>
                            <tr>
                                <th>AD SECURITY GROUP</th>
                                <th>ASSIGNED ROLE</th>
                                <th style={{ textAlign: 'right' }}>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ldapMappings.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="empty-row">No domain group mappings defined.</td>
                                </tr>
                            ) : (
                                ldapMappings.map(m => (
                                    <tr key={m.id}>
                                        <td className="mono-text">{m.adGroupName}</td>
                                        <td>
                                            <span className="role-tag-pill">
                                                {roles.find(r => r.id === m.roleId)?.name || m.roleId}
                                            </span>
                                        </td>
                                        <td style={{ textAlign: 'right' }}>
                                            <button
                                                type="button"
                                                className="btn-text-danger"
                                                onClick={() => handleDeleteMapping(m.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="security-subpanel">
                <div className="subpanel-header flex-between">
                    <div>
                        <h4>LOCAL USER ACCOUNTS</h4>
                        <span className="subpanel-desc">Manage local operators, passwords, and assigned permissions.</span>
                    </div>
                    <button type="button" className="btn-add-entity" onClick={() => setIsCreateUserOpen(true)}>
                        + Add Local User
                    </button>
                </div>

                <div className="table-responsive-box">
                    <table className="security-data-table">
                        <thead>
                            <tr>
                                <th>USERNAME</th>
                                <th>DISPLAY NAME</th>
                                <th>ROLES</th>
                                <th>LAST LOGIN</th>
                                <th style={{ textAlign: 'right' }}>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="empty-row">No local users found.</td>
                                </tr>
                            ) : (
                                users.map(u => (
                                    <tr key={u.id}>
                                        <td className="mono-text bold">{u.username}</td>
                                        <td>{u.displayName}</td>
                                        <td>
                                            <div className="roles-chips-cell">
                                                {u.assignedRoleIds.map(rid => (
                                                    <span key={rid} className="role-tag-pill">
                                                        {roles.find(r => r.id === rid)?.name || rid}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="mono-text date">
                                            {u.lastLoginUtc ? new Date(u.lastLoginUtc).toLocaleString() : 'Never'}
                                        </td>
                                        <td style={{ textAlign: 'right' }}>
                                            <div className="table-actions-group">
                                                <button
                                                    type="button"
                                                    className="btn-tbl-action"
                                                    onClick={() => setPasswordChangeUser(u)}
                                                >
                                                    Set Password
                                                </button>
                                                {!u.isSystemImmutable && (
                                                    <button
                                                        type="button"
                                                        className="btn-text-danger"
                                                        onClick={() => handleDeleteUser(u.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {isCreateUserOpen && (
                <div className="security-modal-overlay" onClick={() => setIsCreateUserOpen(false)}>
                    <div className="security-modal-card" onClick={e => e.stopPropagation()}>
                        <h3>Create Local User</h3>
                        <form onSubmit={handleCreateUser}>
                            <div className="settings-field">
                                <span>Username</span>
                                <input
                                    type="text"
                                    value={newUsername}
                                    onChange={e => setNewUsername(e.target.value)}
                                    required
                                    autoFocus
                                />
                            </div>
                            <div className="settings-field">
                                <span>Display Name</span>
                                <input
                                    type="text"
                                    value={newDisplayName}
                                    onChange={e => setNewDisplayName(e.target.value)}
                                />
                            </div>
                            <div className="settings-field">
                                <span>Password</span>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={e => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="settings-field">
                                <span>Assigned Roles</span>
                                <div className="roles-checkboxes-grid">
                                    {roles.map(r => (
                                        <label key={r.id} className="role-check-item">
                                            <input
                                                type="checkbox"
                                                checked={newUserRoles.includes(r.id)}
                                                onChange={e => {
                                                    if (e.target.checked) setNewUserRoles(prev => [...prev, r.id]);
                                                    else setNewUserRoles(prev => prev.filter(x => x !== r.id));
                                                }}
                                            />
                                            <span>{r.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="modal-actions-row">
                                <button type="button" className="btn-cancel" onClick={() => setIsCreateUserOpen(false)}>Cancel</button>
                                <button type="submit" className="btn-save">Create User</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {passwordChangeUser && (
                <div className="security-modal-overlay" onClick={() => setPasswordChangeUser(null)}>
                    <div className="security-modal-card" onClick={e => e.stopPropagation()}>
                        <h3>Change Password: {passwordChangeUser.username}</h3>
                        <form onSubmit={handleChangePassword}>
                            <div className="settings-field">
                                <span>New Password</span>
                                <input
                                    type="password"
                                    value={newPasswordValue}
                                    onChange={e => setNewPasswordValue(e.target.value)}
                                    required
                                    autoFocus
                                />
                            </div>
                            <div className="modal-actions-row">
                                <button type="button" className="btn-cancel" onClick={() => setPasswordChangeUser(null)}>Cancel</button>
                                <button type="submit" className="btn-save">Update Password</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isAddMappingOpen && (
                <div className="security-modal-overlay" onClick={() => setIsAddMappingOpen(false)}>
                    <div className="security-modal-card" onClick={e => e.stopPropagation()}>
                        <h3>Add Active Directory Group Mapping</h3>
                        <form onSubmit={handleAddMapping}>
                            <div className="settings-field">
                                <span>AD Security Group Name</span>
                                <input
                                    type="text"
                                    placeholder="e.g. Operations_Commanders"
                                    value={newAdGroup}
                                    onChange={e => setNewAdGroup(e.target.value)}
                                    required
                                    autoFocus
                                />
                            </div>
                            <div className="settings-field">
                                <span>Map to Operational Role</span>
                                <select
                                    value={newMappingRoleId}
                                    onChange={e => setNewMappingRoleId(e.target.value)}
                                    className="tactical-select"
                                >
                                    {roles.map(r => (
                                        <option key={r.id} value={r.id}>{r.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="modal-actions-row">
                                <button type="button" className="btn-cancel" onClick={() => setIsAddMappingOpen(false)}>Cancel</button>
                                <button type="submit" className="btn-save">Save Mapping</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </fieldset>
    );
}