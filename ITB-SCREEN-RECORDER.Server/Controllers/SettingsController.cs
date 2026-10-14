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
    public record UpdateLdapSettingsRequest(string Server, int Port, string BaseDn, bool UseSsl);
    public record UpsertLdapMappingRequest(string AdGroupName, string RoleId);

    [ApiController]
    [Route("api/v1/settings")]
    [Route("api/settings")]
    [Route("api/system/config")]
    public class SettingsController : ControllerBase
    {
        private readonly ISystemConfigDbSyncService _syncService;
        private readonly IOptionsMonitor<SystemConfig> _configMonitor;
        private readonly ICatalogRepository _catalogRepo;

        public SettingsController(
            ISystemConfigDbSyncService syncService,
            IOptionsMonitor<SystemConfig> configMonitor,
            ICatalogRepository catalogRepo)
        {
            _syncService = syncService;
            _configMonitor = configMonitor;
            _catalogRepo = catalogRepo;
        }

        [HttpGet]
        [AuthorizePermission(PermissionKeys.SettingsView)]
        public IActionResult Get()
        {
            return Ok(_configMonitor.CurrentValue);
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
                });

                return Ok(_configMonitor.CurrentValue);
            }
            catch (Exception ex)
            {
                return Problem($"Failed to synchronize configuration: {ex.Message}", statusCode: 500);
            }
        }

        #region Security & Policy API

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

            // בדיקת הגנה מנעילה (Pre-Flight Lockout Validation)
            if (req.Mode != AuthMode.Open)
            {
                // בדיקה אם קיים משתמש העל הסודי או משתמש אדמין מקומי פעיל
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
            await _catalogRepo.UpdateLdapPolicySettingsAsync(req.Server, req.Port, req.BaseDn, req.UseSsl);
            return Ok(new { success = true });
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
            if (!deleted) return BadRequest(new { message = "Cannot delete built-in role or role not found." });
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