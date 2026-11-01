// ==========================================
// File: Client/src/components/Settings/tabs/SecurityAccessTab.jsx
// ==========================================
import { useState, useEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import AdGroupChipsInput from '../AdGroupChipsInput';
import AdTreeBrowserModal from '../AdTreeBrowserModal';

function PortalModal({ children }) {
    if (typeof document === 'undefined') return children;
    return createPortal(children, document.body);
}

export default function SecurityAccessTab() {
    const [policy, setPolicy] = useState(null);
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [ldapMappings, setLdapMappings] = useState([]);
    const [permissionsCatalog, setPermissionsCatalog] = useState([]);
    const [loading, setLoading] = useState(true);

    const [activeSection, setActiveSection] = useState('all');

    // LDAP Form state
    const [ldapServer, setLdapServer] = useState('');
    const [ldapPort, setLdapPort] = useState(389);
    const [ldapBaseDn, setLdapBaseDn] = useState('');
    const [ldapUseSsl, setLdapUseSsl] = useState(false);
    const [ldapBindDn, setLdapBindDn] = useState('');
    const [ldapBindPassword, setLdapBindPassword] = useState('');
    const [savingLdap, setSavingLdap] = useState(false);
    const [testingLdap, setTestingLdap] = useState(false);
    const [testResult, setTestResult] = useState(null);

    // AD Auto-Discovery & Diagnostics
    const [autoDetectHost, setAutoDetectHost] = useState('');
    const [isAutoDetecting, setIsAutoDetecting] = useState(false);
    const [autoDetectResult, setAutoDetectResult] = useState(null);
    const [showDiscoveryLogs, setShowDiscoveryLogs] = useState(false);
    const [isRunningDiagnostics, setIsRunningDiagnostics] = useState(false);
    const [diagnosticsReport, setDiagnosticsReport] = useState(null);
    const [showDiagnosticsModal, setShowDiagnosticsModal] = useState(false);

    // Modal states
    const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
    const [newUsername, setNewUsername] = useState('');
    const [newDisplayName, setNewDisplayName] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newUserRoles, setNewUserRoles] = useState(['role_viewer']); // Default to Viewer

    const [passwordChangeUser, setPasswordChangeUser] = useState(null);
    const [newPasswordValue, setNewPasswordValue] = useState('');

    const [isAddMappingOpen, setIsAddMappingOpen] = useState(false);
    const [standaloneMappedGroups, setStandaloneMappedGroups] = useState([]);
    const [newMappingRoleId, setNewMappingRoleId] = useState('role_operator');

    // Tree browser modal controls
    const [isTreeBrowserOpen, setIsTreeBrowserOpen] = useState(false);
    const [isTreeBrowserOpenForStandalone, setIsTreeBrowserOpenForStandalone] = useState(false);

    // Role editing / creation modal
    const [roleModalData, setRoleModalData] = useState(null);

    // Permission -> Roles assignment modal
    const [permRoleModalData, setPermRoleModalData] = useState(null); // { key, name, category, assignedRoleIds: [] }

    // User editing (Roles & Overrides) modal
    const [userEditData, setUserEditData] = useState(null);

    const loadSecurityData = useCallback(async () => {
        try {
            const [policyRes, usersRes, rolesRes, mappingsRes, permsRes] = await Promise.all([
                fetch('/api/v1/settings/security/policy'),
                fetch('/api/v1/settings/security/users'),
                fetch('/api/v1/settings/security/roles'),
                fetch('/api/v1/settings/security/ldap-mappings'),
                fetch('/api/v1/settings/security/permissions')
            ]);

            if (policyRes.ok) {
                const pData = await policyRes.json();
                setPolicy(pData);
                setLdapServer(pData.ldapServer || '');
                setLdapPort(pData.ldapPort || 389);
                setLdapBaseDn(pData.ldapBaseDn || '');
                setLdapUseSsl(Boolean(pData.useSsl));
                setLdapBindDn(pData.ldapBindDn || '');
            }

            if (usersRes.ok) setUsers(await usersRes.json());
            if (rolesRes.ok) setRoles(await rolesRes.json());
            if (mappingsRes.ok) setLdapMappings(await mappingsRes.json());
            if (permsRes.ok) setPermissionsCatalog(await permsRes.json());
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

    // Permissions grouped by category
    const categorizedPermissions = useMemo(() => {
        const groups = {};
        permissionsCatalog.forEach(p => {
            const cat = p.category || 'General';
            if (!groups[cat]) groups[cat] = [];
            groups[cat].push(p);
        });
        return groups;
    }, [permissionsCatalog]);

    // Lookup: which roles have permission X
    const rolesPerPermission = useMemo(() => {
        const map = {};
        roles.forEach(r => {
            (r.permissions || []).forEach(pKey => {
                if (!map[pKey]) map[pKey] = [];
                map[pKey].push(r);
            });
        });
        return map;
    }, [roles]);

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
                    useSsl: ldapUseSsl,
                    bindDn: ldapBindDn.trim() || null,
                    bindPassword: ldapBindPassword || null
                })
            });
            if (res.ok) {
                await loadSecurityData();
                setLdapBindPassword('');
                alert('Active Directory / LDAP parameters updated successfully.');
            }
        } catch (err) {
            console.error('[SecurityAccessTab] Failed saving LDAP:', err);
        } finally {
            setSavingLdap(false);
        }
    };

    const handleTestLdap = async () => {
        setTestingLdap(true);
        setTestResult(null);
        try {
            const res = await fetch('/api/v1/settings/security/ad/test-connection', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    server: ldapServer.trim(),
                    port: Number(ldapPort),
                    baseDn: ldapBaseDn.trim(),
                    useSsl: ldapUseSsl,
                    bindDn: ldapBindDn.trim() || null,
                    bindPassword: ldapBindPassword || null
                })
            });
            const data = await res.json();
            setTestResult(data);
        } catch (err) {
            setTestResult({ success: false, message: err.message || 'Connection test failed.' });
        } finally {
            setTestingLdap(false);
        }
    };

    const handleAutoDetect = async (e) => {
        if (e) e.preventDefault();
        const target = autoDetectHost.trim() || ldapServer.trim();
        if (!target) {
            alert('Please enter an Active Directory Domain Controller IP, Hostname, or Domain name (e.g., 10.0.0.5 or corp.internal).');
            return;
        }
        setIsAutoDetecting(true);
        setAutoDetectResult(null);
        try {
            const res = await fetch('/api/v1/settings/security/ad/auto-detect', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ hostOrDomain: target })
            });
            const data = await res.json();
            setAutoDetectResult(data);
            if (data.success) {
                if (data.discoveredServer) setLdapServer(data.discoveredServer);
                if (data.discoveredPort) setLdapPort(data.discoveredPort);
                if (data.discoveredBaseDn) setLdapBaseDn(data.discoveredBaseDn);
                setLdapUseSsl(Boolean(data.useSsl));
            }
        } catch (err) {
            setAutoDetectResult({
                success: false,
                message: err.message || 'Auto-detection request failed.'
            });
        } finally {
            setIsAutoDetecting(false);
        }
    };

    const handleRunDiagnostics = async () => {
        setIsRunningDiagnostics(true);
        setDiagnosticsReport(null);
        setShowDiagnosticsModal(true);
        try {
            const res = await fetch('/api/v1/settings/security/ad/diagnose', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    server: ldapServer.trim(),
                    port: Number(ldapPort),
                    baseDn: ldapBaseDn.trim(),
                    useSsl: ldapUseSsl,
                    bindDn: ldapBindDn.trim() || null,
                    bindPassword: ldapBindPassword || null
                })
            });
            const data = await res.json();
            setDiagnosticsReport(data);
        } catch (err) {
            setDiagnosticsReport({
                overallSuccess: false,
                summary: 'Diagnostics request failed: ' + (err.message || 'Unknown network error'),
                steps: [{ stepName: '1. Network Communication', success: false, latencyMs: 0, message: err.message }]
            });
        } finally {
            setIsRunningDiagnostics(false);
        }
    };

    const handlePortPreset = (port, useSsl) => {
        setLdapPort(port);
        setLdapUseSsl(useSsl);
    };

    const handleServerChange = (e) => {
        let val = e.target.value;
        if (val.startsWith('ldaps://')) {
            val = val.substring(8);
            setLdapUseSsl(true);
            setLdapPort(636);
        } else if (val.startsWith('ldap://')) {
            val = val.substring(7);
            setLdapUseSsl(false);
            setLdapPort(389);
        }
        const colonIdx = val.lastIndexOf(':');
        if (colonIdx > 0) {
            const portStr = val.substring(colonIdx + 1);
            const parsedP = parseInt(portStr, 10);
            if (!isNaN(parsedP)) {
                val = val.substring(0, colonIdx);
                setLdapPort(parsedP);
                if (parsedP === 636) setLdapUseSsl(true);
                else if (parsedP === 389) setLdapUseSsl(false);
            }
        }
        setLdapServer(val);
    };

    // User creation

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
                    roleIds: newUserRoles.length > 0 ? newUserRoles : ['role_viewer']
                })
            });
            if (res.ok) {
                setIsCreateUserOpen(false);
                setNewUsername('');
                setNewDisplayName('');
                setNewPassword('');
                setNewUserRoles(['role_viewer']);
                await loadSecurityData();
            } else {
                const err = await res.json().catch(() => ({}));
                alert(err.message || 'Failed creating user.');
            }
        } catch (err) {
            console.error(err);
        }
    };

    // Change Password
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

    // Delete User
    const handleDeleteUser = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this user account?')) return;
        try {
            const res = await fetch(`/api/v1/settings/security/users/${userId}`, { method: 'DELETE' });
            if (res.ok) await loadSecurityData();
        } catch (err) {
            console.error(err);
        }
    };

    // Save User Roles & Overrides
    const handleSaveUserRolesAndOverrides = async (e) => {
        e.preventDefault();
        if (!userEditData) return;
        try {
            const res = await fetch(`/api/v1/settings/security/users/${userEditData.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    roleIds: userEditData.assignedRoleIds,
                    grantedOverrides: userEditData.permissionOverridesGranted,
                    revokedOverrides: userEditData.permissionOverridesRevoked
                })
            });
            if (res.ok) {
                setUserEditData(null);
                await loadSecurityData();
            } else {
                alert('Failed saving user roles and overrides.');
            }
        } catch (err) {
            console.error(err);
        }
    };

    // Add AD Mapping directly (supporting multiple chips)
    const handleAddMapping = async (e) => {
        e.preventDefault();
        if (standaloneMappedGroups.length === 0) {
            alert('Please select or enter at least one Active Directory group.');
            return;
        }
        try {
            const res = await fetch('/api/v1/settings/security/ldap-mappings/batch', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    adGroupNames: standaloneMappedGroups,
                    roleId: newMappingRoleId
                })
            });
            if (res.ok) {
                setIsAddMappingOpen(false);
                setStandaloneMappedGroups([]);
                await loadSecurityData();
            } else {
                const err = await res.json().catch(() => ({}));
                alert(err.message || 'Failed saving mappings.');
            }
        } catch (err) {
            console.error(err);
        }
    };

    // Delete AD Mapping
    const handleDeleteMapping = async (mappingId) => {
        if (!window.confirm('Delete this Active Directory group mapping?')) return;
        try {
            const res = await fetch(`/api/v1/settings/security/ldap-mappings/${mappingId}`, { method: 'DELETE' });
            if (res.ok) await loadSecurityData();
        } catch (err) {
            console.error(err);
        }
    };

    // Open Role Editor Modal
    const handleOpenRoleModal = (role, isNew = false) => {
        const assignedUserIds = users
            .filter(u => (u.assignedRoleIds || []).includes(role.id))
            .map(u => u.id);

        const mappedAdGroups = ldapMappings
            .filter(m => m.roleId === role.id)
            .map(m => ({ id: m.id, groupName: m.adGroupName }));

        setRoleModalData({
            ...role,
            isNew,
            assignedUserIds,
            mappedAdGroups,
            activeModalTab: 'permissions' // 'permissions' | 'users' | 'ldap'
        });
    };

    // Save Role (including attached Local Users and AD Groups)
    const handleSaveRole = async (e) => {
        e.preventDefault();
        if (!roleModalData) return;

        try {
            // 1. Save Role definition
            const roleRes = await fetch('/api/v1/settings/security/roles', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: roleModalData.id,
                    name: roleModalData.name,
                    description: roleModalData.description || '',
                    icon: roleModalData.icon || 'ShieldCheck',
                    color: roleModalData.color || '#06B6D4',
                    displayOrder: Number(roleModalData.displayOrder) || 10,
                    isBuiltIn: Boolean(roleModalData.isBuiltIn),
                    permissions: roleModalData.permissions || []
                })
            });

            if (!roleRes.ok) {
                alert('Failed saving role definition.');
                return;
            }

            // 2. Sync Local Users (attach/detach this role)
            const targetRole = roleModalData.id;
            const chosenUserIds = new Set(roleModalData.assignedUserIds || []);

            const userSyncPromises = users.map(async u => {
                const hadRole = (u.assignedRoleIds || []).includes(targetRole);
                const shouldHave = chosenUserIds.has(u.id);

                if (hadRole !== shouldHave) {
                    let updatedRoles;
                    if (shouldHave) {
                        updatedRoles = [...(u.assignedRoleIds || []), targetRole];
                    } else {
                        updatedRoles = (u.assignedRoleIds || []).filter(rid => rid !== targetRole);
                    }

                    return fetch(`/api/v1/settings/security/users/${u.id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            roleIds: updatedRoles,
                            grantedOverrides: u.permissionOverridesGranted || [],
                            revokedOverrides: u.permissionOverridesRevoked || []
                        })
                    });
                }
            });

            // 3. Sync Active Directory Group Mappings
            const currentMappedNames = (roleModalData.mappedAdGroups || []).map(g => g.groupName.toLowerCase());
            const originalMappingsForRole = ldapMappings.filter(m => m.roleId === targetRole);

            // Add newly mapped AD groups
            const adSyncPromises = [];
            for (const item of (roleModalData.mappedAdGroups || [])) {
                if (item.isNew) {
                    adSyncPromises.push(
                        fetch('/api/v1/settings/security/ldap-mappings', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                adGroupName: item.groupName,
                                roleId: targetRole
                            })
                        })
                    );
                }
            }

            // Delete unmapped AD groups
            for (const orig of originalMappingsForRole) {
                if (!currentMappedNames.includes(orig.adGroupName.toLowerCase())) {
                    adSyncPromises.push(
                        fetch(`/api/v1/settings/security/ldap-mappings/${orig.id}`, { method: 'DELETE' })
                    );
                }
            }

            await Promise.all([...userSyncPromises, ...adSyncPromises]);

            setRoleModalData(null);
            await loadSecurityData();
        } catch (err) {
            console.error('[SecurityAccessTab] Failed updating role:', err);
            alert('Error updating role configuration.');
        }
    };

    // Delete Role
    const handleDeleteRole = async (roleId) => {
        if (roleId === 'role_admin' || roleId === 'role_viewer') {
            alert('Cannot delete protected system roles (role_admin, role_viewer).');
            return;
        }

        if (!window.confirm(`Are you sure you want to delete role [${roleId}]? This will remove it from all users and AD mappings.`)) return;

        try {
            const res = await fetch(`/api/v1/settings/security/roles/${roleId}`, { method: 'DELETE' });
            if (res.ok) {
                await loadSecurityData();
            } else {
                const err = await res.json().catch(() => ({}));
                alert(err.message || 'Cannot delete protected role.');
            }
        } catch (err) {
            console.error(err);
        }
    };

    // Save Role assignments for a single Permission from Catalog
    const handleSavePermissionRoles = async () => {
        if (!permRoleModalData) return;
        const targetPerm = permRoleModalData.key;
        const selectedRoleIds = new Set(permRoleModalData.assignedRoleIds || []);

        try {
            const updatePromises = roles.map(async r => {
                const hasPerm = (r.permissions || []).includes(targetPerm);
                const shouldHave = selectedRoleIds.has(r.id);

                if (hasPerm !== shouldHave) {
                    let updatedPerms;
                    if (shouldHave) {
                        updatedPerms = [...(r.permissions || []), targetPerm];
                    } else {
                        updatedPerms = (r.permissions || []).filter(p => p !== targetPerm);
                    }

                    return fetch('/api/v1/settings/security/roles', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            id: r.id,
                            name: r.name,
                            description: r.description || '',
                            icon: r.icon || 'ShieldCheck',
                            color: r.color || '#06B6D4',
                            displayOrder: r.displayOrder || 1,
                            isBuiltIn: r.isBuiltIn,
                            permissions: updatedPerms
                        })
                    });
                }
            });

            await Promise.all(updatePromises);
            setPermRoleModalData(null);
            await loadSecurityData();
        } catch (err) {
            console.error('Failed saving permission roles:', err);
            alert('Error saving permission role assignments.');
        }
    };

    if (loading) {
        return <div className="settings-loader-box">Loading security parameters…</div>;
    }

    return (
        <fieldset className="settings-fieldset security-access-fieldset">
            <legend>Enterprise Security, Roles & RBAC Matrix</legend>

            {/* Quick Section Filter Bar */}
            <div className="sec-subnav-dock">
                <button
                    type="button"
                    className={`sec-subnav-btn ${activeSection === 'all' ? 'active' : ''}`}
                    onClick={() => setActiveSection('all')}
                >
                    <span>All Sections</span>
                </button>
                <button
                    type="button"
                    className={`sec-subnav-btn ${activeSection === 'permissions' ? 'active' : ''}`}
                    onClick={() => setActiveSection('permissions')}
                >
                    <span>Permissions Catalog</span>
                    <span className="badge-count">{permissionsCatalog.length}</span>
                </button>
                <button
                    type="button"
                    className={`sec-subnav-btn ${activeSection === 'roles' ? 'active' : ''}`}
                    onClick={() => setActiveSection('roles')}
                >
                    <span>Operational Roles</span>
                    <span className="badge-count">{roles.length}</span>
                </button>
                <button
                    type="button"
                    className={`sec-subnav-btn ${activeSection === 'ldap' ? 'active' : ''}`}
                    onClick={() => setActiveSection('ldap')}
                >
                    <span>Active Directory / LDAP</span>
                    <span className="badge-count">{ldapMappings.length} Mappings</span>
                </button>
                <button
                    type="button"
                    className={`sec-subnav-btn ${activeSection === 'users' ? 'active' : ''}`}
                    onClick={() => setActiveSection('users')}
                >
                    <span>User Accounts & Overrides</span>
                    <span className="badge-count">{users.length}</span>
                </button>
            </div>

            {/* Subpanel 1: Authentication Mode */}
            {(activeSection === 'all' || activeSection === 'ldap') && (
                <div className="security-subpanel">
                    <div className="subpanel-header">
                        <h4>SYSTEM AUTHENTICATION MODE</h4>
                        <span className="subpanel-desc">Configure operational gatekeeping, local database credentials, or Active Directory domain synchronization.</span>
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
                            <p>No credential required. Operators select their active operational role directly from the launchpad. System and security settings remain restricted to admins.</p>
                        </div>

                        <div
                            className={`auth-mode-card ${currentMode === 1 ? 'active' : ''}`}
                            onClick={() => handleSwitchMode(1)}
                        >
                            <div className="card-top">
                                <span className="mode-badge strict-local">STRICT LOCAL</span>
                                <span className="radio-pip" />
                            </div>
                            <p>Enforces local username/password verification before entering roles. Managed entirely in system catalog database.</p>
                        </div>

                        <div
                            className={`auth-mode-card ${currentMode === 2 ? 'active' : ''}`}
                            onClick={() => handleSwitchMode(2)}
                        >
                            <div className="card-top">
                                <span className="mode-badge strict-ldap">ACTIVE DIRECTORY / LDAP</span>
                                <span className="radio-pip" />
                            </div>
                            <p>Cross-platform LDAP/AD binding. Operational roles are dynamically mapped from Domain Security Groups upon login.</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Subpanel 2: Active Directory & LDAP (with Mapping Table and Status) */}
            {(activeSection === 'all' || activeSection === 'ldap') && (
                <div className="security-subpanel">
                    <div className="subpanel-header flex-between">
                        <div>
                            <h4>ACTIVE DIRECTORY & DOMAIN SECURITY GROUP MAPPINGS</h4>
                            <span className="subpanel-desc">Connect to Domain Controllers (DC) and map AD security groups to operational roles.</span>
                        </div>
                        <button
                            type="button"
                            className="btn-add-entity"
                            onClick={() => {
                                setIsAddMappingOpen(true);
                                setStandaloneMappedGroups([]);
                            }}
                        >
                            + Add Group Mapping
                        </button>
                    </div>

                    {/* LDAP Active Status Callout */}
                    <div className={`ldap-status-banner ${currentMode === 2 ? 'active-ldap' : ''}`}>
                        <div className="status-left">
                            <span className="status-dot-pulse" style={{ background: currentMode === 2 ? '#10B981' : '#64748B' }} />
                            <div className="status-info">
                                <span className="status-title">
                                    {currentMode === 2 ? 'ACTIVE DIRECTORY AUTHENTICATION IS LIVE' : 'LDAP MODE STANDBY (Local Mode Active)'}
                                </span>
                                <span className="status-sub">
                                    {policy?.ldapServer
                                        ? `Target DC: ${policy.ldapServer}:${policy.ldapPort || 389} • Base DN: ${policy.ldapBaseDn || 'N/A'} • LDAPS: ${policy.useSsl ? 'Enabled' : 'Disabled'}`
                                        : 'LDAP Server is not configured. Local accounts remain available in all modes.'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* 1-Click Auto-Discovery Card */}
                    <div className="ldap-autodetect-card">
                        <div className="autodetect-header">
                            <div className="autodetect-title-row">
                                <span className="autodetect-icon">⚡</span>
                                <div>
                                    <h4 className="autodetect-title">Active Directory Auto-Discovery & Zero-Touch Setup</h4>
                                    <p className="autodetect-subtitle">
                                        Type your Domain Controller Hostname, IP address, or Domain FQDN (e.g. <code>10.0.0.5</code> or <code>corp.internal</code>). The system will automatically probe open ports (389 / 636), test TLS encryption, and query the RootDSE Base DN.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="autodetect-input-group">
                            <input
                                type="text"
                                className="autodetect-input"
                                placeholder="Enter Domain Controller IP or FQDN (e.g. 10.0.0.5 or dc01.corp.internal)"
                                value={autoDetectHost}
                                onChange={e => setAutoDetectHost(e.target.value)}
                                onKeyDown={e => { if (e.key === 'Enter') handleAutoDetect(e); }}
                            />
                            <button
                                type="button"
                                className="btn-autodetect"
                                onClick={handleAutoDetect}
                                disabled={isAutoDetecting || (!autoDetectHost.trim() && !ldapServer.trim())}
                            >
                                {isAutoDetecting ? 'Probing Domain Controller…' : '⚡ Auto-Detect & Configure'}
                            </button>
                        </div>

                        {autoDetectResult && (
                            <div className={`autodetect-result-banner ${autoDetectResult.success ? 'success' : 'fail'}`}>
                                <div className="result-header">
                                    <span className="result-icon">{autoDetectResult.success ? '✓' : '✗'}</span>
                                    <div className="result-text">
                                        <strong>{autoDetectResult.message}</strong>
                                        {autoDetectResult.success && (
                                            <div className="result-meta">
                                                <span>DC Endpoint: <code>{autoDetectResult.discoveredServer}:{autoDetectResult.discoveredPort}</code></span>
                                                <span>Protocol: <code>{autoDetectResult.useSsl ? 'LDAPS (Secure Port 636)' : 'Standard LDAP (Port 389)'}</code></span>
                                                <span>Discovered Base DN: <code>{autoDetectResult.discoveredBaseDn}</code></span>
                                                <span>TCP Latency: <code>{autoDetectResult.latencyMs} ms</code></span>
                                            </div>
                                        )}
                                    </div>
                                    {autoDetectResult.details?.length > 0 && (
                                        <button
                                            type="button"
                                            className="btn-toggle-details"
                                            onClick={() => setShowDiscoveryLogs(!showDiscoveryLogs)}
                                        >
                                            {showDiscoveryLogs ? 'Hide Log' : 'Probe Log'}
                                        </button>
                                    )}
                                </div>

                                {showDiscoveryLogs && autoDetectResult.details?.length > 0 && (
                                    <div className="discovery-log-terminal">
                                        {autoDetectResult.details.map((line, idx) => (
                                            <div key={idx} className="terminal-line">› {line}</div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* LDAP Server Config Form */}
                    <form onSubmit={handleSaveLdap} className="ldap-settings-form">
                        <div className="settings-fields-row">
                            <div className="settings-field" style={{ flex: '1.4' }}>
                                <span>Domain Controller Host / IP</span>
                                <input
                                    type="text"
                                    placeholder="dc01.corp.internal or 10.0.0.5"
                                    value={ldapServer}
                                    onChange={handleServerChange}
                                    required
                                />
                                <span className="field-hint">Accepts hostname, IP, or host:port (protocol prefixes stripped automatically)</span>
                            </div>

                            <div className="settings-field port-field-container" style={{ flex: '1.2' }}>
                                <div className="port-header-row">
                                    <span>Port & Preset</span>
                                    <div className="port-presets">
                                        <button
                                            type="button"
                                            className={`btn-port-preset ${Number(ldapPort) === 389 && !ldapUseSsl ? 'active' : ''}`}
                                            onClick={() => handlePortPreset(389, false)}
                                            title="Standard Active Directory LDAP port (Plain / Negotiate)"
                                        >
                                            389 (Standard)
                                        </button>
                                        <button
                                            type="button"
                                            className={`btn-port-preset ${Number(ldapPort) === 636 && ldapUseSsl ? 'active' : ''}`}
                                            onClick={() => handlePortPreset(636, true)}
                                            title="Secure Active Directory LDAPS over TLS/SSL"
                                        >
                                            636 (LDAPS)
                                        </button>
                                        <button
                                            type="button"
                                            className={`btn-port-preset ${Number(ldapPort) === 3268 ? 'active' : ''}`}
                                            onClick={() => handlePortPreset(3268, false)}
                                            title="Global Catalog forest-wide query port"
                                        >
                                            3268 (GC)
                                        </button>
                                    </div>
                                </div>
                                <input
                                    type="number"
                                    value={ldapPort}
                                    onChange={e => setLdapPort(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="settings-field" style={{ flex: '1.4' }}>
                                <span>Search Base DN</span>
                                <input
                                    type="text"
                                    placeholder="DC=corp,DC=internal"
                                    value={ldapBaseDn}
                                    onChange={e => setLdapBaseDn(e.target.value)}
                                    required
                                />
                                <span className="field-hint">Active Directory root search container (RootDSE)</span>
                            </div>
                        </div>

                        <div className="settings-fields-row" style={{ marginTop: '8px' }}>
                            <div className="settings-field">
                                <span>Directory Bind DN / Service Account (Optional)</span>
                                <input
                                    type="text"
                                    placeholder="CN=svc_recorder,OU=ServiceAccounts,DC=corp,DC=internal or svc@corp.internal"
                                    value={ldapBindDn}
                                    onChange={e => setLdapBindDn(e.target.value)}
                                />
                                <span className="field-hint">For OU browsing and group discovery. Anonymous used if omitted.</span>
                            </div>
                            <div className="settings-field">
                                <span>Service Account Password (Optional)</span>
                                <input
                                    type="password"
                                    placeholder={policy?.hasBindPassword ? '•••••••• (Stored securely in vault)' : 'Enter service account password'}
                                    value={ldapBindPassword}
                                    onChange={e => setLdapBindPassword(e.target.value)}
                                    autoComplete="new-password"
                                />
                            </div>
                        </div>

                        <div className="ldap-form-actions">
                            <label className="tactical-checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={ldapUseSsl}
                                    onChange={e => {
                                        const checked = e.target.checked;
                                        setLdapUseSsl(checked);
                                        if (checked && Number(ldapPort) === 389) setLdapPort(636);
                                        else if (!checked && Number(ldapPort) === 636) setLdapPort(389);
                                    }}
                                />
                                <span>Use LDAPS (SSL/TLS - Port 636) • Enterprise CA Bypass Enabled</span>
                            </label>

                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <button
                                    type="button"
                                    className="btn-diagnostics"
                                    onClick={handleRunDiagnostics}
                                    disabled={isRunningDiagnostics || !ldapServer.trim()}
                                    title="Run comprehensive 5-step active directory connectivity diagnostics"
                                >
                                    {isRunningDiagnostics ? 'Diagnosing…' : '🔍 Deep Diagnostics'}
                                </button>
                                <button
                                    type="button"
                                    className="btn-test-ldap"
                                    onClick={handleTestLdap}
                                    disabled={testingLdap || !ldapServer.trim()}
                                >
                                    {testingLdap ? 'Testing DC…' : 'Quick Test'}
                                </button>
                                <button type="submit" className="btn-save-ldap" disabled={savingLdap}>
                                    {savingLdap ? 'Saving Connection…' : 'Save Connection Parameters'}
                                </button>
                            </div>
                        </div>

                        {testResult && (
                            <div
                                className={`ldap-test-banner ${testResult.success ? 'success' : 'fail'}`}
                                style={{
                                    marginTop: '10px',
                                    padding: '8px 12px',
                                    borderRadius: '6px',
                                    fontSize: '0.74rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    background: testResult.success ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                                    border: `1px solid ${testResult.success ? 'rgba(16, 185, 129, 0.4)' : 'rgba(239, 68, 68, 0.4)'}`,
                                    color: testResult.success ? '#34D399' : '#F87171'
                                }}
                            >
                                <span>{testResult.success ? '✓' : '✗'}</span>
                                <span>{testResult.message}</span>
                                {testResult.defaultNamingContext && (
                                    <span style={{ color: '#94A3B8' }}>(Root DSE: {testResult.defaultNamingContext})</span>
                                )}
                            </div>
                        )}
                    </form>

                    {/* AD Group Mappings Table */}
                    <div className="table-responsive-box" style={{ marginTop: '16px' }}>
                        <table className="security-data-table">
                            <thead>
                                <tr>
                                    <th>AD SECURITY GROUP NAME</th>
                                    <th>MAPPED OPERATIONAL ROLE</th>
                                    <th>PERMISSIONS GRANTED</th>
                                    <th style={{ textAlign: 'right' }}>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ldapMappings.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="empty-row">No Active Directory group mappings defined. Click "+ Add Group Mapping" to connect domain groups to roles.</td>
                                    </tr>
                                ) : (
                                    ldapMappings.map(m => {
                                        const role = roles.find(r => r.id === m.roleId);
                                        return (
                                            <tr key={m.id}>
                                                <td className="mono-text bold">{m.adGroupName}</td>
                                                <td>
                                                    <span
                                                        className="role-tag-pill"
                                                        style={{ borderColor: role?.color || '#06B6D4', color: role?.color || '#38BDF8' }}
                                                    >
                                                        {role?.name || m.roleId}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="mono-text date">
                                                        {role?.permissions?.length || 0} granular permissions
                                                    </span>
                                                </td>
                                                <td style={{ textAlign: 'right' }}>
                                                    <button
                                                        type="button"
                                                        className="btn-tbl-danger"
                                                        onClick={() => handleDeleteMapping(m.id)}
                                                        title="Delete Active Directory Group Mapping"
                                                    >
                                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                        <span>Delete</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Subpanel 3: Permissions Catalog */}
            {(activeSection === 'all' || activeSection === 'permissions') && (
                <div className="security-subpanel">
                    <div className="subpanel-header">
                        <h4>SYSTEM PERMISSIONS CATALOG</h4>
                        <span className="subpanel-desc">All atomic capabilities recognized by the backend and enforced across the frontend. You can assign roles to each permission directly.</span>
                    </div>

                    <div className="permissions-catalog-container">
                        {Object.entries(categorizedPermissions).map(([category, items]) => (
                            <div key={category} className="perm-category-block">
                                <div className="category-header">
                                    <span className="cat-title">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                        </svg>
                                        {category}
                                    </span>
                                    <span className="cat-count">{items.length} permissions</span>
                                </div>

                                <div className="perms-cards-grid">
                                    {items.map(p => {
                                        const matchingRoles = rolesPerPermission[p.key] || [];
                                        return (
                                            <div key={p.key} className="perm-card">
                                                <div className="perm-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <span className="perm-key">{p.key}</span>
                                                    <button
                                                        type="button"
                                                        className="btn-edit-perm-roles"
                                                        onClick={() => setPermRoleModalData({
                                                            key: p.key,
                                                            name: p.name,
                                                            category: p.category,
                                                            assignedRoleIds: matchingRoles.map(r => r.id)
                                                        })}
                                                        title="Assign or remove roles for this permission"
                                                    >
                                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12">
                                                            <path d="M12 20h9"/>
                                                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                                                        </svg>
                                                        <span>Assign Roles</span>
                                                    </button>
                                                </div>
                                                <span className="perm-name">{p.name}</span>
                                                <p className="perm-desc">{p.description}</p>

                                                <div className="perm-roles-row">
                                                    <span className="lbl-roles">Granted by roles:</span>
                                                    {matchingRoles.length === 0 ? (
                                                        <span className="role-mini-pill" style={{ opacity: 0.5 }}>None (Unassigned)</span>
                                                    ) : (
                                                        matchingRoles.map(r => (
                                                            <span
                                                                key={r.id}
                                                                className="role-mini-pill"
                                                                style={{ borderColor: r.color, color: r.color }}
                                                            >
                                                                {r.name}
                                                            </span>
                                                        ))
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Subpanel 4: Roles Management */}
            {(activeSection === 'all' || activeSection === 'roles') && (
                <div className="security-subpanel">
                    <div className="subpanel-header flex-between">
                        <div>
                            <h4>OPERATIONAL ROLES CATALOG & RBAC MATRIX</h4>
                            <span className="subpanel-desc">Manage all system and custom roles, edit permission bundles, and attach roles to local users or AD groups.</span>
                        </div>
                        <button
                            type="button"
                            className="btn-add-entity"
                            onClick={() => handleOpenRoleModal({
                                id: `role_custom_${Date.now().toString(36)}`,
                                name: '',
                                description: '',
                                icon: 'ShieldCheck',
                                color: '#10B981',
                                displayOrder: roles.length + 1,
                                isBuiltIn: false,
                                permissions: ['stations.view']
                            }, true)}
                        >
                            + Add Custom Role
                        </button>
                    </div>

                    <div className="roles-grid-container">
                        {roles.map(r => (
                            <div key={r.id} className="role-overview-card">
                                <div className="role-card-top">
                                    <div className="role-name-stack">
                                        <div className="role-title-row">
                                            <span className="role-color-dot" style={{ background: r.color || '#06B6D4' }} />
                                            <h5>{r.name}</h5>
                                            <span className="role-id-code">[{r.id}]</span>
                                        </div>
                                        <span className="role-description">{r.description || 'No description provided.'}</span>
                                    </div>
                                    <span className={`role-type-pill ${r.isBuiltIn ? 'builtin' : 'custom'}`}>
                                        {r.isBuiltIn ? 'BUILT-IN' : 'CUSTOM'}
                                    </span>
                                </div>

                                <div className="role-permissions-summary">
                                    <div className="summary-header">
                                        <span>PERMISSIONS ({r.permissions?.length || 0})</span>
                                        <span className="mono-text">Order: #{r.displayOrder}</span>
                                    </div>
                                    <div className="perms-chips-wrap">
                                        {(r.permissions || []).map(pKey => (
                                            <span key={pKey} className="perm-chip">
                                                {pKey}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="role-card-actions">
                                    <button
                                        type="button"
                                        className="btn-role-edit"
                                        onClick={() => handleOpenRoleModal(r, false)}
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                        </svg>
                                        <span>Edit Role, Users & AD Groups</span>
                                    </button>
                                    {r.id !== 'role_admin' && r.id !== 'role_viewer' && (
                                        <button
                                            type="button"
                                            className="btn-role-delete"
                                            onClick={() => handleDeleteRole(r.id)}
                                            title={`Delete role ${r.name}`}
                                        >
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            <span>Delete</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Subpanel 5: User Accounts */}
            {(activeSection === 'all' || activeSection === 'users') && (
                <div className="security-subpanel">
                    <div className="subpanel-header flex-between">
                        <div>
                            <h4>USER ACCOUNTS, AUTH SOURCE & OVERRIDES</h4>
                            <span className="subpanel-desc">Manage local operators, view authentication origin, and assign granular permission overrides.</span>
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
                                    <th>AUTH SOURCE</th>
                                    <th>ASSIGNED ROLES</th>
                                    <th>PERMISSION OVERRIDES</th>
                                    <th>LAST LOGIN</th>
                                    <th style={{ textAlign: 'right' }}>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="empty-row">No user accounts found.</td>
                                    </tr>
                                ) : (
                                    users.map(u => (
                                        <tr key={u.id}>
                                            <td className="mono-text bold">{u.username}</td>
                                            <td>{u.displayName}</td>
                                            <td>
                                                <span className={`auth-source-pill ${u.authSource?.toLowerCase() === 'ldap' ? 'ldap' : 'local'}`}>
                                                    {u.authSource?.toLowerCase() === 'ldap' ? 'ACTIVE DIRECTORY (LDAP)' : 'LOCAL ACCOUNT'}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="roles-chips-cell">
                                                    {(u.assignedRoleIds || []).length === 0 ? (
                                                        <span className="role-mini-pill" style={{ borderColor: '#EF4444', color: '#F87171' }}>
                                                            No Roles (Restricted)
                                                        </span>
                                                    ) : (
                                                        (u.assignedRoleIds || []).map(rid => {
                                                            const rObj = roles.find(r => r.id === rid);
                                                            return (
                                                                <span
                                                                    key={rid}
                                                                    className="role-tag-pill"
                                                                    style={{ borderColor: rObj?.color || '#38BDF8', color: rObj?.color || '#38BDF8' }}
                                                                >
                                                                    {rObj?.name || rid}
                                                                </span>
                                                            );
                                                        })
                                                    )}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="overrides-chips-cell">
                                                    {(u.permissionOverridesGranted || []).map(p => (
                                                        <span key={p} className="override-pill grant" title="Explicitly Granted">
                                                            +{p}
                                                        </span>
                                                    ))}
                                                    {(u.permissionOverridesRevoked || []).map(p => (
                                                        <span key={p} className="override-pill revoke" title="Explicitly Revoked">
                                                            -{p}
                                                        </span>
                                                    ))}
                                                    {(!u.permissionOverridesGranted?.length && !u.permissionOverridesRevoked?.length) && (
                                                        <span className="mono-text muted">Role Inherited</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td>
                                                <span className="mono-text date">
                                                    {u.lastLoginUtc ? new Date(u.lastLoginUtc).toLocaleString() : 'Never'}
                                                </span>
                                            </td>
                                            <td style={{ textAlign: 'right' }}>
                                                <div className="row-actions-cluster">
                                                    <button
                                                        type="button"
                                                        className="btn-tbl-action"
                                                        onClick={() => setUserEditData({
                                                            id: u.id,
                                                            username: u.username,
                                                            displayName: u.displayName,
                                                            assignedRoleIds: [...(u.assignedRoleIds || [])],
                                                            permissionOverridesGranted: [...(u.permissionOverridesGranted || [])],
                                                            permissionOverridesRevoked: [...(u.permissionOverridesRevoked || [])]
                                                        })}
                                                    >
                                                        Roles & Overrides
                                                    </button>
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
                                                            className="btn-tbl-danger"
                                                            onClick={() => handleDeleteUser(u.id)}
                                                            title={`Delete user account ${u.username}`}
                                                        >
                                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                            <span>Delete</span>
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
            )}

            {/* Modal: Create Local User */}
            {isCreateUserOpen && (
                <PortalModal>
                    <div className="security-modal-overlay" onClick={() => setIsCreateUserOpen(false)}>
                        <div className="security-modal-card" onClick={e => e.stopPropagation()}>
                            <h3>Create Local User</h3>
                            <span className="modal-subtitle">Default assigned role is Viewer. Add roles as needed.</span>
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
                                    <span>Assigned Roles (Default: Viewer)</span>
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
                                                <span style={{ color: r.color }}>{r.name}</span>
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
                </PortalModal>
            )}

            {/* Modal: Change Password */}
            {passwordChangeUser && (
                <PortalModal>
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
                </PortalModal>
            )}

            {/* Modal: Add AD Group Mapping */}
            {isAddMappingOpen && (
                <PortalModal>
                    <div className="security-modal-overlay" onClick={() => setIsAddMappingOpen(false)}>
                        <div className="security-modal-card" onClick={e => e.stopPropagation()} style={{ width: '560px' }}>
                            <h3>Add Active Directory Group Mappings</h3>
                            <span className="modal-subtitle">Assign one or more domain security groups to an operational role.</span>
                            <form onSubmit={handleAddMapping} style={{ marginTop: '12px' }}>
                                <div className="settings-field">
                                    <span>Active Directory Security Groups (Chips / Multi-Select)</span>
                                    <AdGroupChipsInput
                                        chips={standaloneMappedGroups}
                                        onAddGroups={(names) => {
                                            setStandaloneMappedGroups(prev => {
                                                const existingLower = prev.map(n => n.toLowerCase());
                                                const toAdd = names.filter(n => !existingLower.includes(n.toLowerCase()));
                                                return [...prev, ...toAdd];
                                            });
                                        }}
                                        onRemoveGroup={(groupName) => {
                                            setStandaloneMappedGroups(prev => prev.filter(g => g.toLowerCase() !== groupName.toLowerCase()));
                                        }}
                                        onOpenBrowser={() => setIsTreeBrowserOpenForStandalone(true)}
                                        placeholder="Type AD group name or click Browse AD Tree…"
                                    />
                                </div>
                                <div className="settings-field" style={{ marginTop: '14px' }}>
                                    <span>Map to Operational Role</span>
                                    <select
                                        value={newMappingRoleId}
                                        onChange={e => setNewMappingRoleId(e.target.value)}
                                        className="tactical-select"
                                    >
                                        {roles.map(r => (
                                            <option key={r.id} value={r.id}>{r.name} ({r.id})</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="modal-actions-row">
                                    <button type="button" className="btn-cancel" onClick={() => setIsAddMappingOpen(false)}>Cancel</button>
                                    <button type="submit" className="btn-save" disabled={standaloneMappedGroups.length === 0}>
                                        Save {standaloneMappedGroups.length > 1 ? `(${standaloneMappedGroups.length}) Mappings` : 'Mapping'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </PortalModal>
            )}

            {/* Standalone Tree Browser Modal */}
            {isTreeBrowserOpenForStandalone && (
                <AdTreeBrowserModal
                    isOpen={isTreeBrowserOpenForStandalone}
                    onClose={() => setIsTreeBrowserOpenForStandalone(false)}
                    alreadySelectedNames={standaloneMappedGroups}
                    onSelectEntities={(entities) => {
                        const names = entities.map(e => e.samAccountName);
                        setStandaloneMappedGroups(prev => {
                            const existingLower = prev.map(n => n.toLowerCase());
                            const toAdd = names.filter(n => !existingLower.includes(n.toLowerCase()));
                            return [...prev, ...toAdd];
                        });
                    }}
                />
            )}

            {/* Modal: Assign Roles for a Permission (From Catalog) */}
            {permRoleModalData && (
                <PortalModal>
                    <div className="security-modal-overlay" onClick={() => setPermRoleModalData(null)}>
                    <div className="security-modal-card" onClick={e => e.stopPropagation()}>
                        <h3>Assign Roles: {permRoleModalData.name}</h3>
                        <span className="modal-subtitle">Permission Key: <code style={{ color: '#38BDF8' }}>{permRoleModalData.key}</code></span>

                        <div className="settings-field" style={{ marginTop: '12px' }}>
                            <span>Select Roles that will grant this permission:</span>
                            <div className="roles-checkboxes-grid" style={{ gridTemplateColumns: '1fr', gap: '8px', marginTop: '8px' }}>
                                {roles.map(r => {
                                    const isChecked = (permRoleModalData.assignedRoleIds || []).includes(r.id);
                                    return (
                                        <label key={r.id} className="role-check-item" style={{ padding: '8px 12px', background: 'rgba(30, 41, 59, 0.4)', borderRadius: '6px' }}>
                                            <input
                                                type="checkbox"
                                                checked={isChecked}
                                                onChange={e => {
                                                    if (e.target.checked) {
                                                        setPermRoleModalData(prev => ({
                                                            ...prev,
                                                            assignedRoleIds: [...(prev.assignedRoleIds || []), r.id]
                                                        }));
                                                    } else {
                                                        setPermRoleModalData(prev => ({
                                                            ...prev,
                                                            assignedRoleIds: (prev.assignedRoleIds || []).filter(x => x !== r.id)
                                                        }));
                                                    }
                                                }}
                                            />
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span style={{ color: r.color, fontWeight: 700 }}>{r.name} [{r.id}]</span>
                                                <span style={{ fontSize: '0.68rem', color: '#94A3B8' }}>{r.description}</span>
                                            </div>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="modal-actions-row">
                            <button type="button" className="btn-cancel" onClick={() => setPermRoleModalData(null)}>Cancel</button>
                            <button type="button" className="btn-save" onClick={handleSavePermissionRoles}>Save Role Assignments</button>
                        </div>
                    </div>
                </div>
            </PortalModal>
            )}

            {/* Modal: Complete Role Editor (Permissions, Local Users & AD Groups) */}
            {roleModalData && (
                <PortalModal>
                    <div className="security-modal-overlay" onClick={() => setRoleModalData(null)}>
                    <div className="security-modal-card large-modal" onClick={e => e.stopPropagation()}>
                        <h3>{roleModalData.isNew ? 'Create Operational Role' : `Edit Role: ${roleModalData.name}`}</h3>
                        <span className="modal-subtitle">Configure role properties, permissions, assigned local users, and AD group mappings.</span>

                        {/* Modal Subtabs */}
                        <div className="modal-subtabs-dock" style={{ marginTop: '12px' }}>
                            <button
                                type="button"
                                className={`modal-subtab-btn ${roleModalData.activeModalTab === 'permissions' ? 'active' : ''}`}
                                onClick={() => setRoleModalData(prev => ({ ...prev, activeModalTab: 'permissions' }))}
                            >
                                <span>Permissions ({roleModalData.permissions?.length || 0})</span>
                            </button>
                            <button
                                type="button"
                                className={`modal-subtab-btn ${roleModalData.activeModalTab === 'users' ? 'active' : ''}`}
                                onClick={() => setRoleModalData(prev => ({ ...prev, activeModalTab: 'users' }))}
                            >
                                <span>Local Users ({roleModalData.assignedUserIds?.length || 0})</span>
                            </button>
                            <button
                                type="button"
                                className={`modal-subtab-btn ${roleModalData.activeModalTab === 'ldap' ? 'active' : ''}`}
                                onClick={() => setRoleModalData(prev => ({ ...prev, activeModalTab: 'ldap' }))}
                            >
                                <span>Active Directory Groups ({roleModalData.mappedAdGroups?.length || 0})</span>
                            </button>
                        </div>

                        <form onSubmit={handleSaveRole}>
                            {/* Tab 1: Role Info & Permissions */}
                            {roleModalData.activeModalTab === 'permissions' && (
                                <>
                                    <div className="settings-fields-row" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px' }}>
                                        <div className="settings-field">
                                            <span>Role Display Name</span>
                                            <input
                                                type="text"
                                                value={roleModalData.name}
                                                onChange={e => setRoleModalData(prev => ({ ...prev, name: e.target.value }))}
                                                required
                                            />
                                        </div>
                                        <div className="settings-field">
                                            <span>Role Accent Color</span>
                                            <input
                                                type="text"
                                                placeholder="#06B6D4"
                                                value={roleModalData.color}
                                                onChange={e => setRoleModalData(prev => ({ ...prev, color: e.target.value }))}
                                            />
                                        </div>
                                    </div>

                                    <div className="settings-field">
                                        <span>Description</span>
                                        <input
                                            type="text"
                                            value={roleModalData.description}
                                            onChange={e => setRoleModalData(prev => ({ ...prev, description: e.target.value }))}
                                        />
                                    </div>

                                    <div className="settings-field">
                                        <span>Granted Permissions Matrix</span>
                                        <div className="perms-selector-by-category">
                                            {Object.entries(categorizedPermissions).map(([cat, perms]) => (
                                                <div key={cat} className="perm-cat-group">
                                                    <span className="group-title">{cat}</span>
                                                    <div className="perms-list-checkboxes">
                                                        {perms.map(p => {
                                                            const isChecked = (roleModalData.permissions || []).includes(p.key);
                                                            return (
                                                                <label key={p.key} className="perm-check-row">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={isChecked}
                                                                        onChange={e => {
                                                                            if (e.target.checked) {
                                                                                setRoleModalData(prev => ({
                                                                                    ...prev,
                                                                                    permissions: [...(prev.permissions || []), p.key]
                                                                                }));
                                                                            } else {
                                                                                setRoleModalData(prev => ({
                                                                                    ...prev,
                                                                                    permissions: (prev.permissions || []).filter(x => x !== p.key)
                                                                                }));
                                                                            }
                                                                        }}
                                                                    />
                                                                    <div className="perm-info-text">
                                                                        <span className="perm-code">{p.key} — {p.name}</span>
                                                                        <span className="perm-description">{p.description}</span>
                                                                    </div>
                                                                </label>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Tab 2: Assigned Local Users */}
                            {roleModalData.activeModalTab === 'users' && (
                                <div className="settings-field">
                                    <span style={{ marginBottom: '6px' }}>Select local user accounts that hold this role:</span>
                                    <div className="role-users-select-grid">
                                        {users.map(u => {
                                            const isChecked = (roleModalData.assignedUserIds || []).includes(u.id);
                                            return (
                                                <label key={u.id} className="user-check-item">
                                                    <input
                                                        type="checkbox"
                                                        checked={isChecked}
                                                        onChange={e => {
                                                            if (e.target.checked) {
                                                                setRoleModalData(prev => ({
                                                                    ...prev,
                                                                    assignedUserIds: [...(prev.assignedUserIds || []), u.id]
                                                                }));
                                                            } else {
                                                                setRoleModalData(prev => ({
                                                                    ...prev,
                                                                    assignedUserIds: (prev.assignedUserIds || []).filter(uid => uid !== u.id)
                                                                }));
                                                            }
                                                        }}
                                                    />
                                                    <div className="user-text-stack">
                                                        <span className="u-name">{u.username}</span>
                                                        <span className="u-disp">{u.displayName} ({u.authSource || 'Local'})</span>
                                                    </div>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Tab 3: Mapped Active Directory Groups */}
                            {roleModalData.activeModalTab === 'ldap' && (
                                <div className="settings-field">
                                    <div className="role-ad-groups-block">
                                        <span style={{ fontSize: '0.78rem', color: '#CBD5E1', fontWeight: 700 }}>
                                            Active Directory Security Groups Assigned to this Role:
                                        </span>
                                        <p style={{ fontSize: '0.72rem', color: '#94A3B8', margin: '0 0 10px 0' }}>
                                            Users authenticating via domain credentials will inherit this role if they are members of any assigned AD group. Type a group name with autocomplete or browse the Organizational Unit tree.
                                        </p>

                                        <AdGroupChipsInput
                                            chips={roleModalData.mappedAdGroups || []}
                                            onAddGroups={(names) => {
                                                setRoleModalData(prev => {
                                                    const existingLower = (prev.mappedAdGroups || []).map(g => g.groupName.toLowerCase());
                                                    const newItems = names
                                                        .filter(n => !existingLower.includes(n.toLowerCase()))
                                                        .map(n => ({ id: `new_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`, groupName: n, isNew: true }));
                                                    return {
                                                        ...prev,
                                                        mappedAdGroups: [...(prev.mappedAdGroups || []), ...newItems]
                                                    };
                                                });
                                            }}
                                            onRemoveGroup={(groupName) => {
                                                setRoleModalData(prev => ({
                                                    ...prev,
                                                    mappedAdGroups: (prev.mappedAdGroups || []).filter(g => g.groupName.toLowerCase() !== groupName.toLowerCase())
                                                }));
                                            }}
                                            onOpenBrowser={() => setIsTreeBrowserOpen(true)}
                                            placeholder="Type AD group name or click Browse AD Tree…"
                                        />

                                        <div className="mapped-groups-summary-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px' }}>
                                            <span style={{ fontSize: '0.74rem', color: '#94A3B8', fontWeight: 700 }}>
                                                Currently Assigned AD Groups ({(roleModalData.mappedAdGroups || []).length}):
                                            </span>
                                            {(roleModalData.mappedAdGroups || []).length > 0 && (
                                                <button
                                                    type="button"
                                                    className="btn-clear-all-role-ad"
                                                    onClick={() => setRoleModalData(prev => ({ ...prev, mappedAdGroups: [] }))}
                                                    style={{ background: 'transparent', border: 'none', color: '#EF4444', fontSize: '0.7rem', cursor: 'pointer', fontWeight: 600 }}
                                                >
                                                    Clear All Mappings
                                                </button>
                                            )}
                                        </div>

                                        <div className="ad-groups-chip-list">
                                            {(!roleModalData.mappedAdGroups || roleModalData.mappedAdGroups.length === 0) ? (
                                                <span style={{ fontSize: '0.74rem', color: '#64748B', fontStyle: 'italic', padding: '8px 0' }}>
                                                    No AD groups mapped to this role yet. Type a group name above or click &ldquo;Browse AD Tree&rdquo; to select from the directory.
                                                </span>
                                            ) : (
                                                roleModalData.mappedAdGroups.map(g => (
                                                    <div key={g.id || g.groupName} className="ad-group-row-item">
                                                        <span className="ad-group-name">{g.groupName}</span>
                                                        {g.isNew && <span className="badge-new-mapping" style={{ fontSize: '0.62rem', background: 'rgba(16, 185, 129, 0.2)', color: '#34D399', padding: '1px 5px', borderRadius: '3px', fontWeight: 700 }}>NEW</span>}
                                                        <button
                                                            type="button"
                                                            className="btn-remove-ad-group"
                                                            onClick={() => {
                                                                setRoleModalData(prev => ({
                                                                    ...prev,
                                                                    mappedAdGroups: (prev.mappedAdGroups || []).filter(item => item !== g)
                                                                }));
                                                            }}
                                                            title="Remove AD Group Mapping"
                                                        >
                                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="11" height="11">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                            <span>Remove</span>
                                                        </button>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Tree Browser Modal for Role Editor */}
                            {isTreeBrowserOpen && (
                                <AdTreeBrowserModal
                                    isOpen={isTreeBrowserOpen}
                                    onClose={() => setIsTreeBrowserOpen(false)}
                                    alreadySelectedNames={(roleModalData?.mappedAdGroups || []).map(g => g.groupName)}
                                    onSelectEntities={(entities) => {
                                        const names = entities.map(e => e.samAccountName);
                                        setRoleModalData(prev => {
                                            const existingLower = (prev.mappedAdGroups || []).map(g => g.groupName.toLowerCase());
                                            const newItems = names
                                                .filter(n => !existingLower.includes(n.toLowerCase()))
                                                .map(n => ({ id: `new_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`, groupName: n, isNew: true }));
                                            return {
                                                ...prev,
                                                mappedAdGroups: [...(prev.mappedAdGroups || []), ...newItems]
                                            };
                                        });
                                    }}
                                />
                            )}

                            <div className="modal-actions-row">
                                <button type="button" className="btn-cancel" onClick={() => setRoleModalData(null)}>Cancel</button>
                                <button type="submit" className="btn-save">Save Role Configuration</button>
                            </div>
                        </form>
                    </div>
                </div>
            </PortalModal>
            )}

            {/* Modal: User Roles & Overrides Editor */}
            {userEditData && (
                <PortalModal>
                    <div className="security-modal-overlay" onClick={() => setUserEditData(null)}>
                    <div className="security-modal-card large-modal" onClick={e => e.stopPropagation()}>
                        <h3>Edit User Roles & Overrides: {userEditData.username}</h3>
                        <span className="modal-subtitle">Assign bundle roles or grant/revoke specific permissions directly.</span>

                        <form onSubmit={handleSaveUserRolesAndOverrides}>
                            <div className="settings-field">
                                <span>Assigned Roles</span>
                                <div className="roles-checkboxes-grid">
                                    {roles.map(r => (
                                        <label key={r.id} className="role-check-item">
                                            <input
                                                type="checkbox"
                                                checked={userEditData.assignedRoleIds.includes(r.id)}
                                                onChange={e => {
                                                    if (e.target.checked) {
                                                        setUserEditData(prev => ({
                                                            ...prev,
                                                            assignedRoleIds: [...prev.assignedRoleIds, r.id]
                                                        }));
                                                    } else {
                                                        setUserEditData(prev => ({
                                                            ...prev,
                                                            assignedRoleIds: prev.assignedRoleIds.filter(x => x !== r.id)
                                                        }));
                                                    }
                                                }}
                                            />
                                            <span style={{ color: r.color }}>{r.name}</span>
                                        </label>
                                    ))}
                                </div>

                                {userEditData.assignedRoleIds.length === 0 && (
                                    <div className="warning-callout-box">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                                            <line x1="12" y1="9" x2="12" y2="13"/>
                                            <line x1="12" y1="17" x2="12.01" y2="17"/>
                                        </svg>
                                        <span>Warning: This user has no assigned operational roles. If the system is in Strict mode, this user will be blocked from logging in.</span>
                                    </div>
                                )}
                            </div>

                            <div className="settings-field">
                                <span>Granular Permission Overrides</span>
                                <div className="perms-selector-by-category">
                                    {permissionsCatalog.map(p => {
                                        const isGranted = userEditData.permissionOverridesGranted.includes(p.key);
                                        const isRevoked = userEditData.permissionOverridesRevoked.includes(p.key);
                                        const state = isGranted ? 'grant' : isRevoked ? 'revoke' : 'inherit';

                                        return (
                                            <div
                                                key={p.key}
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    padding: '6px 10px',
                                                    background: 'rgba(30, 41, 59, 0.4)',
                                                    borderRadius: '4px',
                                                    marginBottom: '4px'
                                                }}
                                            >
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <span style={{ fontSize: '0.72rem', fontWeight: 'bold', color: '#FFF' }}>{p.key}</span>
                                                    <span style={{ fontSize: '0.66rem', color: '#94A3B8' }}>{p.name}</span>
                                                </div>

                                                <div style={{ display: 'flex', gap: '6px' }}>
                                                    <button
                                                        type="button"
                                                        style={{
                                                            padding: '2px 8px',
                                                            fontSize: '0.66rem',
                                                            borderRadius: '4px',
                                                            border: state === 'inherit' ? '1px solid #38BDF8' : '1px solid rgba(148, 163, 184, 0.2)',
                                                            background: state === 'inherit' ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                                                            color: state === 'inherit' ? '#38BDF8' : '#94A3B8',
                                                            cursor: 'pointer'
                                                        }}
                                                        onClick={() => {
                                                            setUserEditData(prev => ({
                                                                ...prev,
                                                                permissionOverridesGranted: prev.permissionOverridesGranted.filter(x => x !== p.key),
                                                                permissionOverridesRevoked: prev.permissionOverridesRevoked.filter(x => x !== p.key)
                                                            }));
                                                        }}
                                                    >
                                                        Inherit
                                                    </button>
                                                    <button
                                                        type="button"
                                                        style={{
                                                            padding: '2px 8px',
                                                            fontSize: '0.66rem',
                                                            borderRadius: '4px',
                                                            border: state === 'grant' ? '1px solid #10B981' : '1px solid rgba(148, 163, 184, 0.2)',
                                                            background: state === 'grant' ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
                                                            color: state === 'grant' ? '#34D399' : '#94A3B8',
                                                            cursor: 'pointer'
                                                        }}
                                                        onClick={() => {
                                                            setUserEditData(prev => ({
                                                                ...prev,
                                                                permissionOverridesGranted: [...prev.permissionOverridesGranted.filter(x => x !== p.key), p.key],
                                                                permissionOverridesRevoked: prev.permissionOverridesRevoked.filter(x => x !== p.key)
                                                            }));
                                                        }}
                                                    >
                                                        + Grant
                                                    </button>
                                                    <button
                                                        type="button"
                                                        style={{
                                                            padding: '2px 8px',
                                                            fontSize: '0.66rem',
                                                            borderRadius: '4px',
                                                            border: state === 'revoke' ? '1px solid #EF4444' : '1px solid rgba(148, 163, 184, 0.2)',
                                                            background: state === 'revoke' ? 'rgba(239, 68, 68, 0.2)' : 'transparent',
                                                            color: state === 'revoke' ? '#F87171' : '#94A3B8',
                                                            cursor: 'pointer'
                                                        }}
                                                        onClick={() => {
                                                            setUserEditData(prev => ({
                                                                ...prev,
                                                                permissionOverridesGranted: prev.permissionOverridesGranted.filter(x => x !== p.key),
                                                                permissionOverridesRevoked: [...prev.permissionOverridesRevoked.filter(x => x !== p.key), p.key]
                                                            }));
                                                        }}
                                                    >
                                                        - Revoke
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="modal-actions-row">
                                <button type="button" className="btn-cancel" onClick={() => setUserEditData(null)}>Cancel</button>
                                <button type="submit" className="btn-save">Save Overrides</button>
                            </div>
                        </form>
                    </div>
                </div>
            </PortalModal>
            )}

            {/* Deep Diagnostics Modal */}
            {showDiagnosticsModal && (
                <PortalModal>
                    <div className="modal-backdrop" onClick={() => setShowDiagnosticsModal(false)}>
                    <div className="modal-box diagnostics-modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <div className="title-area">
                                <span className="modal-icon">🔍</span>
                                <div>
                                    <h3>Active Directory Connectivity Diagnostics</h3>
                                    <p className="modal-sub">
                                        Multi-stage network probe, DNS verification, TLS handshake check, and bind validation for <code>{ldapServer}:{ldapPort}</code>
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                className="modal-close"
                                onClick={() => setShowDiagnosticsModal(false)}
                            >
                                ✕
                            </button>
                        </div>

                        <div className="diagnostics-modal-body">
                            {isRunningDiagnostics ? (
                                <div className="diagnostics-loading">
                                    <div className="spinner-tactical" />
                                    <span>Running socket & LDAP protocol probes…</span>
                                </div>
                            ) : diagnosticsReport ? (
                                <div className="diagnostics-content">
                                    <div className={`diagnostics-overall-banner ${diagnosticsReport.overallSuccess ? 'pass' : 'fail'}`}>
                                        <div className="banner-left">
                                            <span className="badge-icon">{diagnosticsReport.overallSuccess ? '✓' : '⚠️'}</span>
                                            <div>
                                                <h4>{diagnosticsReport.overallSuccess ? 'All Diagnostic Checks Passed' : 'Connectivity or Configuration Issue Detected'}</h4>
                                                <p>{diagnosticsReport.summary}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {diagnosticsReport.recommendation && (
                                        <div className="diagnostics-recommendation-box">
                                            <span className="rec-title">💡 Actionable Recommendation:</span>
                                            <p className="rec-text">{diagnosticsReport.recommendation}</p>
                                        </div>
                                    )}

                                    <div className="diagnostics-steps-list">
                                        {diagnosticsReport.steps?.map((step, idx) => (
                                            <div key={idx} className={`diag-step-card ${step.success ? 'step-ok' : 'step-fail'}`}>
                                                <div className="step-header">
                                                    <span className="step-status-pill">{step.success ? 'PASS' : 'FAIL'}</span>
                                                    <span className="step-name">{step.stepName}</span>
                                                    {step.latencyMs > 0 && (
                                                        <span className="step-latency">{step.latencyMs} ms</span>
                                                    )}
                                                </div>
                                                <div className="step-body">
                                                    <p className="step-message">{step.message}</p>
                                                    {step.details && (
                                                        <div className="step-detail-box">
                                                            <span>Details / Remedy:</span> {step.details}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : null}
                        </div>

                        <div className="modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                            <button
                                type="button"
                                className="btn-cancel"
                                onClick={() => setShowDiagnosticsModal(false)}
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn-primary"
                                onClick={handleRunDiagnostics}
                                disabled={isRunningDiagnostics}
                                style={{
                                    background: '#06B6D4',
                                    border: 'none',
                                    color: '#020617',
                                    fontWeight: 700,
                                    borderRadius: '6px',
                                    padding: '8px 16px',
                                    cursor: 'pointer'
                                }}
                            >
                                {isRunningDiagnostics ? 'Testing…' : 'Re-Run Diagnostics'}
                            </button>
                        </div>
                    </div>
                </div>
            </PortalModal>
            )}
        </fieldset>
    );
}