// ==========================================
// File: ITB-SCREEN-RECORDER.Server/Controllers/SettingsController.cs
// ==========================================
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ITB_SCREEN_RECORDER.Server.Services;
using ITB_SCREEN_RECORDER.Server.Services.Security;
using ITB_SCREEN_RECORDER.Server.Data.Repositories;
using ITB_SCREEN_RECORDER.Server.Models.Security;
using ITB_SCREEN_RECORDER.Core.Configuration;
using Microsoft.Extensions.Options;

namespace ITB_SCREEN_RECORDER.Server.Controllers
{
    public record CreateUserRequest(string Username, string DisplayName, string Password, List<string> RoleIds);
    public record UpdateUserRequest(List<string> RoleIds, List<string> GrantedOverrides, List<string> RevokedOverrides);
    public record SetUserPasswordRequest(string NewPassword);
    public class SetSecurityModeRequest
    {
        public AuthMode Mode { get; set; }
    }
    public record UpdateLdapSettingsRequest(string Server, int Port, string BaseDn, bool UseSsl, string? BindDn = null, string? BindPassword = null);
    public record UpsertLdapMappingRequest(string AdGroupName, string RoleId);
    public record BatchUpsertLdapMappingRequest(List<string> AdGroupNames, string RoleId);
    public record TestLdapConnectionRequest(string? Server, int? Port, string? BaseDn, bool? UseSsl, string? BindDn, string? BindPassword);
    public record AdAutoDetectRequest(string? HostOrDomain, bool? PreferSsl = null);
    public record AdDiagnosticsRequest(string? Server, int? Port, string? BaseDn, bool? UseSsl, string? BindDn, string? BindPassword);

    [ApiController]
    [Route("api/v1/settings")]
    [Route("api/settings")]
    [Route("api/system/config")]
    public class SettingsController : ControllerBase
    {
        private readonly ISystemConfigDbSyncService _syncService;
        private readonly IOptionsMonitor<SystemConfig> _configMonitor;
        private readonly ICatalogRepository _catalogRepo;
        private readonly ILdapDirectoryService _ldapDirectoryService;
        private readonly RecordingChunkScheduler _chunkScheduler;
        private readonly ServerTelemetryHostService _telemetryHostService;
        private readonly TelemetryBroadcastService _broadcastService;
        private readonly IStorageTelemetryService _storageTelemetryService;
        private readonly Microsoft.Extensions.Logging.ILogger<SettingsController> _logger;

        public SettingsController(
            ISystemConfigDbSyncService syncService,
            IOptionsMonitor<SystemConfig> configMonitor,
            ICatalogRepository catalogRepo,
            ILdapDirectoryService ldapDirectoryService,
            RecordingChunkScheduler chunkScheduler,
            ServerTelemetryHostService telemetryHostService,
            TelemetryBroadcastService broadcastService,
            IStorageTelemetryService storageTelemetryService,
            Microsoft.Extensions.Logging.ILogger<SettingsController> logger)
        {
            _syncService = syncService;
            _configMonitor = configMonitor;
            _catalogRepo = catalogRepo;
            _ldapDirectoryService = ldapDirectoryService;
            _chunkScheduler = chunkScheduler;
            _telemetryHostService = telemetryHostService;
            _broadcastService = broadcastService;
            _storageTelemetryService = storageTelemetryService;
            _logger = logger;
        }

        [HttpGet]
        [AuthorizePermission(PermissionKeys.StationsView)]
        public IActionResult Get()
        {
            var config = _configMonitor.CurrentValue;
            if (!User.HasClaim("is_root", "true") && !User.HasClaim("perm", PermissionKeys.SecurityRolesManage))
            {
                if (config.Security != null && !string.IsNullOrEmpty(config.Security.JwtSecretKey))
                {
                    var masked = new SystemConfig
                    {
                        HttpPort = config.HttpPort,
                        RecordingRetentionDays = config.RecordingRetentionDays,
                        MaxStorageQuotaGb = config.MaxStorageQuotaGb,
                        DashboardRefreshRateMs = config.DashboardRefreshRateMs,
                        DisplayTimezone = config.DisplayTimezone,
                        DisplayLocale = config.DisplayLocale,
                        ManualDstTransitions = config.ManualDstTransitions,
                        Dashboard = config.Dashboard,
                        MediaMtx = config.MediaMtx,
                        Storage = config.Storage,
                        DefaultVideoBitrate = config.DefaultVideoBitrate,
                        DefaultTargetFps = config.DefaultTargetFps,
                        Discovery = config.Discovery,
                        Security = new SecuritySettings
                        {
                            AllowedAdAdminGroup = config.Security.AllowedAdAdminGroup,
                            TokenExpirationHours = config.Security.TokenExpirationHours,
                            JwtSecretKey = "***"
                        }
                    };
                    return Ok(masked);
                }
            }
            return Ok(config);
        }

        [HttpGet("dst-transitions")]
        [AuthorizePermission(PermissionKeys.StationsView)]
        public IActionResult GetDstTransitions()
        {
            var config = _configMonitor.CurrentValue;
            return Ok(new
            {
                timezone = config.DisplayTimezone,
                transitions = config.ManualDstTransitions ?? new List<DstTransitionRule>()
            });
        }

        [HttpPut]
        [HttpPost]
        [AuthorizePermission(PermissionKeys.SettingsAgents)]
        public async Task<IActionResult> Save([FromBody] SystemConfig updatedConfig)
        {
            if (updatedConfig == null) return BadRequest(new { message = "Invalid configuration payload." });

            try
            {
                await _syncService.UpdateSystemConfigAsync(config =>
                {
                    if (updatedConfig.HttpPort > 0) config.HttpPort = updatedConfig.HttpPort;
                    config.DefaultTargetFps = updatedConfig.DefaultTargetFps;
                    config.DefaultVideoBitrate = updatedConfig.DefaultVideoBitrate;
                    config.RecordingRetentionDays = updatedConfig.RecordingRetentionDays;
                    config.MaxStorageQuotaGb = updatedConfig.MaxStorageQuotaGb;
                    config.DashboardRefreshRateMs = updatedConfig.DashboardRefreshRateMs;

                    if (!string.IsNullOrWhiteSpace(updatedConfig.DisplayTimezone)) config.DisplayTimezone = updatedConfig.DisplayTimezone;
                    if (!string.IsNullOrWhiteSpace(updatedConfig.DisplayLocale)) config.DisplayLocale = updatedConfig.DisplayLocale;

                    if (updatedConfig.ManualDstTransitions != null)
                        config.ManualDstTransitions = new List<DstTransitionRule>(updatedConfig.ManualDstTransitions);

                    if (updatedConfig.Storage != null)
                    {
                        config.Storage ??= new StorageSettings();
                        config.Storage.NetAppUncPath = updatedConfig.Storage.NetAppUncPath;
                        config.Storage.LocalFallbackPath = updatedConfig.Storage.LocalFallbackPath;
                        config.Storage.ChunkIntervalMinutes = updatedConfig.Storage.ChunkIntervalMinutes;
                        config.Storage.RetentionDays = updatedConfig.Storage.RetentionDays;
                        config.Storage.RecordFormat = updatedConfig.Storage.RecordFormat;
                        if (!string.IsNullOrWhiteSpace(updatedConfig.Storage.ChunkEventLogPath))
                            config.Storage.ChunkEventLogPath = updatedConfig.Storage.ChunkEventLogPath;
                    }

                    if (updatedConfig.MediaMtx != null)
                    {
                        config.MediaMtx ??= new MediaMtxSettings();
                        config.MediaMtx.ExecutablePath = updatedConfig.MediaMtx.ExecutablePath;
                        config.MediaMtx.RtmpPort = updatedConfig.MediaMtx.RtmpPort;
                        config.MediaMtx.HlsPort = updatedConfig.MediaMtx.HlsPort;
                        config.MediaMtx.ApiPort = updatedConfig.MediaMtx.ApiPort;
                        config.MediaMtx.PlaybackPort = updatedConfig.MediaMtx.PlaybackPort;
                        config.MediaMtx.MetricsPort = updatedConfig.MediaMtx.MetricsPort;
                        config.MediaMtx.PprofPort = updatedConfig.MediaMtx.PprofPort;
                        config.MediaMtx.EnableMetrics = updatedConfig.MediaMtx.EnableMetrics;
                        config.MediaMtx.EnablePprof = updatedConfig.MediaMtx.EnablePprof;
                        config.MediaMtx.EnablePlayback = updatedConfig.MediaMtx.EnablePlayback;
                        config.MediaMtx.HlsAlwaysRemux = updatedConfig.MediaMtx.HlsAlwaysRemux;
                        config.MediaMtx.HlsVariant = updatedConfig.MediaMtx.HlsVariant;
                        config.MediaMtx.HlsSegmentDuration = updatedConfig.MediaMtx.HlsSegmentDuration;
                        config.MediaMtx.Timezone = updatedConfig.MediaMtx.Timezone;
                    }

                    if (updatedConfig.Dashboard != null)
                    {
                        config.Dashboard ??= new DashboardSettings();
                        config.Dashboard.SnapshotMinDelayMs = updatedConfig.Dashboard.SnapshotMinDelayMs;
                        config.Dashboard.SnapshotMaxDelayMs = updatedConfig.Dashboard.SnapshotMaxDelayMs;
                        config.Dashboard.SnapshotBufferMarginPx = updatedConfig.Dashboard.SnapshotBufferMarginPx;
                        config.Dashboard.MaxConcurrentLiveStreams = updatedConfig.Dashboard.MaxConcurrentLiveStreams;
                    }

                    if (updatedConfig.Security != null)
                    {
                        config.Security ??= new SecuritySettings();
                        config.Security.AllowedAdAdminGroup = updatedConfig.Security.AllowedAdAdminGroup;
                        config.Security.JwtSecretKey = updatedConfig.Security.JwtSecretKey;
                        config.Security.TokenExpirationHours = updatedConfig.Security.TokenExpirationHours;
                    }

                    if (updatedConfig.Discovery != null)
                    {
                        config.Discovery ??= new DiscoverySettings();
                        if (updatedConfig.Discovery.Port > 0) config.Discovery.Port = updatedConfig.Discovery.Port;
                        if (!string.IsNullOrWhiteSpace(updatedConfig.Discovery.MulticastAddress))
                            config.Discovery.MulticastAddress = updatedConfig.Discovery.MulticastAddress;
                        if (!string.IsNullOrWhiteSpace(updatedConfig.Discovery.BroadcastAddress))
                            config.Discovery.BroadcastAddress = updatedConfig.Discovery.BroadcastAddress;
                        config.Discovery.EnableBroadcastFallback = updatedConfig.Discovery.EnableBroadcastFallback;
                        config.Discovery.NetworkInterfaceName = updatedConfig.Discovery.NetworkInterfaceName;
                    }
                });

                var currentConfig = _configMonitor.CurrentValue;

                // 1. Immediately apply and propagate storage paths, format, and intervals to MediaMTX
                try
                {
                    await _chunkScheduler.ApplyMediaMtxStorageConfigAsync(currentConfig, HttpContext.RequestAborted);
                    _logger.LogInformation("[SETTINGS] Successfully propagated live storage configuration to MediaMTX.");
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "[SETTINGS] Failed to apply storage changes to MediaMTX immediately.");
                }

                // 2. Immediately calculate and broadcast updated system and storage telemetry to all connected clients
                try
                {
                    await _telemetryHostService.BroadcastImmediateTelemetryAsync();
                    _logger.LogInformation("[SETTINGS] Broadcasted immediate telemetry update after settings save.");
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "[SETTINGS] Failed broadcasting immediate telemetry after settings save.");
                }

                // 3. Broadcast updated system configuration in real-time to Dashboard (ReceiveSystemConfig)
                try
                {
                    await _broadcastService.BroadcastSystemConfigUpdateAsync(currentConfig);
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "[SETTINGS] Failed broadcasting updated system config.");
                }

                return Ok(currentConfig);
            }
            catch (Exception ex)
            {
                return Problem($"Failed to synchronize configuration: {ex.Message}", statusCode: 500);
            }
        }

        [HttpGet("storage-status")]
        [AuthorizePermission(PermissionKeys.SettingsView)]
        public IActionResult GetStorageStatus()
        {
            var telemetry = _storageTelemetryService.GetCurrentStorageTelemetry();
            return Ok(telemetry);
        }

        #region Security & Policy API

        [HttpGet("security/permissions")]
        [AuthorizePermission(PermissionKeys.SettingsView)]
        public IActionResult GetPermissionsCatalog()
        {
            return Ok(PermissionKeys.Catalog);
        }

        [HttpGet("security/policy")]
        [AuthorizePermission(PermissionKeys.SettingsView)]
        public async Task<IActionResult> GetSecurityPolicy()
        {
            var policy = await _catalogRepo.GetSecurityPolicyAsync();
            return Ok(policy);
        }

        [HttpPost("security/policy/mode")]
        [AuthorizePermission(PermissionKeys.SecurityRolesManage)]
        public async Task<IActionResult> SetSecurityMode([FromBody] SetSecurityModeRequest req)
        {
            if (req == null)
            {
                return BadRequest(new { message = "Invalid request payload." });
            }

            // Pre-Flight Lockout Validation
            if (req.Mode != AuthMode.Open)
            {
                // Verify that either the built-in sys_master account or an active local administrator account exists
                var rootUser = await _catalogRepo.GetUserByUsernameAsync("sys_master");
                bool hasRootAdmin = rootUser != null && rootUser.IsActive;

                var users = await _catalogRepo.GetAllUsersAsync();
                bool hasOtherAdmins = users.Any(u => u.IsActive && u.AssignedRoleIds.Contains("role_admin", StringComparer.OrdinalIgnoreCase));

                if (!hasRootAdmin && !hasOtherAdmins && req.Mode == AuthMode.StrictLocal)
                {
                    return BadRequest(new { message = "Cannot switch to StrictLocal: No active local administrator account found." });
                }

                if (req.Mode == AuthMode.StrictLdap)
                {
                    var policy = await _catalogRepo.GetSecurityPolicyAsync();
                    if (string.IsNullOrWhiteSpace(policy.LdapServer))
                    {
                        return BadRequest(new { message = "Cannot switch to StrictLdap: LDAP Server / Domain Controller is not configured." });
                    }
                }
            }

            await _catalogRepo.SetSecurityPolicyModeAsync(req.Mode);
            return Ok(new { success = true, mode = req.Mode.ToString() });
        }

        [HttpPost("security/policy/ldap")]
        [AuthorizePermission(PermissionKeys.SecurityRolesManage)]
        public async Task<IActionResult> UpdateLdapSettings([FromBody] UpdateLdapSettingsRequest req)
        {
            var (cleanHost, cleanPort) = LdapEndpointHelper.ParseEndpoint(req.Server, req.Port, req.UseSsl);
            await _catalogRepo.UpdateLdapPolicySettingsAsync(cleanHost, cleanPort, req.BaseDn?.Trim() ?? string.Empty, req.UseSsl, req.BindDn?.Trim(), req.BindPassword);
            return Ok(new { success = true });
        }

        [HttpGet("security/ad/browse")]
        [AuthorizePermission(PermissionKeys.SecurityRolesManage)]
        public async Task<IActionResult> BrowseAdTree([FromQuery] string? baseDn = null, [FromQuery] bool simulate = false)
        {
            var result = await _ldapDirectoryService.BrowseOuTreeAsync(baseDn, simulate);
            return Ok(result);
        }

        [HttpGet("security/ad/search")]
        [AuthorizePermission(PermissionKeys.SecurityRolesManage)]
        public async Task<IActionResult> SearchAdEntities([FromQuery] string query = "", [FromQuery] string? baseDn = null, [FromQuery] int limit = 30, [FromQuery] bool simulate = false)
        {
            var result = await _ldapDirectoryService.SearchEntitiesAsync(query ?? string.Empty, baseDn, limit, simulate);
            return Ok(result);
        }

        [HttpPost("security/ad/test-connection")]
        [AuthorizePermission(PermissionKeys.SecurityRolesManage)]
        public async Task<IActionResult> TestLdapConnection([FromBody] TestLdapConnectionRequest req)
        {
            var result = await _ldapDirectoryService.TestConnectionAsync(req.Server, req.Port, req.BaseDn, req.UseSsl, req.BindDn, req.BindPassword);
            return Ok(result);
        }

        [HttpPost("security/ad/auto-detect")]
        [AuthorizePermission(PermissionKeys.SecurityRolesManage)]
        public async Task<IActionResult> AutoDetectAdSettings([FromBody] AdAutoDetectRequest req)
        {
            var result = await _ldapDirectoryService.AutoDetectSettingsAsync(req.HostOrDomain, req.PreferSsl);
            return Ok(result);
        }

        [HttpPost("security/ad/diagnose")]
        [AuthorizePermission(PermissionKeys.SecurityRolesManage)]
        public async Task<IActionResult> RunAdDiagnostics([FromBody] AdDiagnosticsRequest req)
        {
            var result = await _ldapDirectoryService.RunDiagnosticsAsync(req.Server, req.Port, req.BaseDn, req.UseSsl, req.BindDn, req.BindPassword);
            return Ok(result);
        }


        [HttpGet("security/users")]
        [AuthorizePermission(PermissionKeys.SecurityUsersManage)]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _catalogRepo.GetAllUsersAsync();
            return Ok(users);
        }

        [HttpPost("security/users")]
        [AuthorizePermission(PermissionKeys.SecurityUsersManage)]
        public async Task<IActionResult> CreateUser([FromBody] CreateUserRequest req)
        {
            if (string.IsNullOrWhiteSpace(req.Username) || string.IsNullOrWhiteSpace(req.Password))
                return BadRequest(new { message = "Username and Password are required." });

            string hash = PasswordHasher.Hash(req.Password);
            string userId = await _catalogRepo.CreateUserAsync(req.Username.Trim(), req.DisplayName.Trim(), hash, "Local", req.RoleIds);
            return Ok(new { userId, success = true });
        }

        [HttpPut("security/users/{userId}")]
        [AuthorizePermission(PermissionKeys.SecurityUsersManage)]
        public async Task<IActionResult> UpdateUser(string userId, [FromBody] UpdateUserRequest req)
        {
            await _catalogRepo.UpdateUserRolesAndOverridesAsync(userId, req.RoleIds, req.GrantedOverrides, req.RevokedOverrides);
            return Ok(new { success = true });
        }

        [HttpPost("security/users/{userId}/password")]
        [AuthorizePermission(PermissionKeys.SecurityUsersManage)]
        public async Task<IActionResult> SetUserPassword(string userId, [FromBody] SetUserPasswordRequest req)
        {
            if (string.IsNullOrWhiteSpace(req.NewPassword) || req.NewPassword.Length < 6)
                return BadRequest(new { message = "Password must be at least 6 characters." });

            string hash = PasswordHasher.Hash(req.NewPassword);
            await _catalogRepo.UpdateUserPasswordAsync(userId, hash);
            return Ok(new { success = true });
        }

        [HttpDelete("security/users/{userId}")]
        [AuthorizePermission(PermissionKeys.SecurityUsersManage)]
        public async Task<IActionResult> DeleteUser(string userId)
        {
            bool deleted = await _catalogRepo.DeleteUserAsync(userId);
            if (!deleted) return BadRequest(new { message = "Cannot delete system user or user not found." });
            return Ok(new { success = true });
        }

        [HttpGet("security/roles")]
        [AuthorizePermission(PermissionKeys.SecurityRolesManage)]
        public async Task<IActionResult> GetAllRoles()
        {
            var roles = await _catalogRepo.GetAllRolesAsync();
            return Ok(roles);
        }

        [HttpPost("security/roles")]
        [AuthorizePermission(PermissionKeys.SecurityRolesManage)]
        public async Task<IActionResult> UpsertRole([FromBody] RoleDto role)
        {
            await _catalogRepo.UpsertRoleAsync(role);
            return Ok(new { success = true });
        }

        [HttpDelete("security/roles/{roleId}")]
        [AuthorizePermission(PermissionKeys.SecurityRolesManage)]
        public async Task<IActionResult> DeleteRole(string roleId)
        {
            bool deleted = await _catalogRepo.DeleteRoleAsync(roleId);
            if (!deleted) return BadRequest(new { message = "Cannot delete protected system roles (role_admin, role_viewer) or role not found." });
            return Ok(new { success = true });
        }

        [HttpGet("security/ldap-mappings")]
        [AuthorizePermission(PermissionKeys.SecurityRolesManage)]
        public async Task<IActionResult> GetLdapMappings()
        {
            var mappings = await _catalogRepo.GetAllLdapGroupMappingsAsync();
            return Ok(mappings);
        }

        [HttpPost("security/ldap-mappings")]
        [AuthorizePermission(PermissionKeys.SecurityRolesManage)]
        public async Task<IActionResult> UpsertLdapMapping([FromBody] UpsertLdapMappingRequest req)
        {
            await _catalogRepo.UpsertLdapGroupMappingAsync(req.AdGroupName, req.RoleId);
            return Ok(new { success = true });
        }

        [HttpPost("security/ldap-mappings/batch")]
        [AuthorizePermission(PermissionKeys.SecurityRolesManage)]
        public async Task<IActionResult> BatchUpsertLdapMappings([FromBody] BatchUpsertLdapMappingRequest req)
        {
            if (req == null || req.AdGroupNames == null || !req.AdGroupNames.Any())
            {
                return BadRequest(new { message = "At least one AD group name is required." });
            }
            await _catalogRepo.BulkUpsertLdapGroupMappingsAsync(req.AdGroupNames, req.RoleId);
            return Ok(new { success = true, count = req.AdGroupNames.Count });
        }

        [HttpDelete("security/ldap-mappings/{mappingId}")]
        [AuthorizePermission(PermissionKeys.SecurityRolesManage)]
        public async Task<IActionResult> DeleteLdapMapping(string mappingId)
        {
            await _catalogRepo.DeleteLdapGroupMappingAsync(mappingId);
            return Ok(new { success = true });
        }

        #endregion
    }
}