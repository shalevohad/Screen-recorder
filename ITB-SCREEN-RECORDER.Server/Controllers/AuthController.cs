namespace ITB_SCREEN_RECORDER.Server.Controllers;

using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Server.Data.Repositories;
using ITB_SCREEN_RECORDER.Server.Models.Security;
using ITB_SCREEN_RECORDER.Server.Services.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

public record LoginRequest(string Username, string Password);

[ApiController]
[Route("api/v1/auth")]
public class AuthController : ControllerBase
{
    private readonly ISecurityService _securityService;
    private readonly ICatalogRepository _repository;
    private readonly LdapAuthenticationProvider _ldapAuth;

    public AuthController(ISecurityService securityService, ICatalogRepository repository, LdapAuthenticationProvider ldapAuth)
    {
        _securityService = securityService;
        _repository = repository;
        _ldapAuth = ldapAuth;
    }

    [HttpGet("status")]
    [AllowAnonymous]
    public async Task<IActionResult> GetAuthStatus()
    {
        var policy = await _repository.GetSecurityPolicyAsync();
        bool isOpenMode = policy.CurrentMode == AuthMode.Open;

        return Ok(new
        {
            Mode = policy.CurrentMode.ToString(),
            IsOpenMode = isOpenMode,
            IsAuthenticated = User.Identity?.IsAuthenticated ?? false,
            CurrentUsername = User.Identity?.Name,
            IsRoot = User.HasClaim("is_root", "true")
        });
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        if (request == null || string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password))
        {
            return BadRequest(new { message = "Username and password are required." });
        }

        var result = await _securityService.LoginAsync(request.Username.Trim(), request.Password);
        if (!result.Success)
        {
            return Unauthorized(new { message = result.ErrorMessage ?? "Invalid credentials." });
        }

        var permissions = await _securityService.CalculateAllUserPermissionsAsync(
            result.UserId!,
            result.AssignedRoleIds,
            result.IsSystemImmutable
        );

        string token = _securityService.GenerateJwtToken(
            result.UserId!,
            result.Username!,
            result.AssignedRoleIds,
            permissions,
            result.IsSystemImmutable
        );

        return Ok(new
        {
            token,
            userId = result.UserId,
            username = result.Username,
            displayName = result.DisplayName,
            isRoot = result.IsSystemImmutable,
            roles = result.AssignedRoleIds,
            permissions
        });
    }

    /// <summary>
    /// Issues an anonymous guest session in Open Mode, granting operational monitoring permissions only (excluding settings or security management).
    /// </summary>
    /// <returns>JSON payload containing JWT token, guest role, and operational permissions, or 403 Forbidden if system is not in Open Mode.</returns>
    [HttpPost("guest-session")]
    [AllowAnonymous]
    public async Task<IActionResult> CreateGuestSession()
    {
        var policy = await _repository.GetSecurityPolicyAsync();
        if (policy.CurrentMode != AuthMode.Open)
        {
            return Unauthorized(new { message = "Guest access is disabled in strict mode." });
        }

        var guestRoles = new[] { "role_viewer", "role_operator" };
        var guestPermissions = new[]
        {
            PermissionKeys.StationsView,
            PermissionKeys.StationsControl,
            PermissionKeys.PlaybackView,
            PermissionKeys.PlaybackExport,
            PermissionKeys.BookmarksManage,
            PermissionKeys.ExtractorView,
            PermissionKeys.StudioView
        };

        string token = _securityService.GenerateJwtToken(
            "usr_guest",
            "Guest",
            guestRoles,
            guestPermissions,
            false
        );

        return Ok(new
        {
            token,
            userId = "usr_guest",
            username = "Guest",
            displayName = "Guest Operator",
            isRoot = false,
            roles = guestRoles,
            permissions = guestPermissions
        });
    }

    /// <summary>
    /// Performs silent Single Sign-On (SSO) for domain users logged in via Windows / Active Directory.
    /// Resolves client Windows identity from Negotiate/NTLM or reverse proxy, searches directory groups,
    /// and issues an authenticated session token without requiring credentials input.
    /// </summary>
    [HttpGet("windows-sso")]
    [AllowAnonymous]
    public async Task<IActionResult> WindowsSso()
    {
        var policy = await _repository.GetSecurityPolicyAsync();

        // 1. Check if authenticated via Windows Authentication (Negotiate / Kerberos / NTLM)
        string? domainUsername = User.Identity?.Name;

        // 2. Check X-Remote-User or X-Forwarded-User header (common in corporate intranet reverse proxies)
        if (string.IsNullOrWhiteSpace(domainUsername))
        {
            domainUsername = Request.Headers["X-Remote-User"].FirstOrDefault()
                          ?? Request.Headers["X-Forwarded-User"].FirstOrDefault();
        }

        if (string.IsNullOrWhiteSpace(domainUsername))
        {
            return Unauthorized(new { message = "No Windows / Active Directory identity detected for SSO." });
        }

        string cleanUsername = domainUsername.Contains('\\')
            ? domainUsername.Split('\\', 2)[1]
            : (domainUsername.Contains('@') ? domainUsername.Split('@', 2)[0] : domainUsername);

        var result = await _ldapAuth.AuthenticateSsoUserAsync(cleanUsername);
        if (!result.Success)
        {
            return Unauthorized(new { message = result.ErrorMessage ?? "AD SSO authentication failed." });
        }

        if (policy.CurrentMode == AuthMode.StrictLdap && !result.AssignedRoleIds.Any())
        {
            return Unauthorized(new { message = "Access denied: No operational roles mapped to your Active Directory security groups." });
        }

        var permissions = await _securityService.CalculateAllUserPermissionsAsync(
            result.UserId!,
            result.AssignedRoleIds,
            result.IsSystemImmutable
        );

        string token = _securityService.GenerateJwtToken(
            result.UserId!,
            result.Username!,
            result.AssignedRoleIds,
            permissions,
            result.IsSystemImmutable
        );

        return Ok(new
        {
            token,
            userId = result.UserId,
            username = result.Username,
            displayName = result.DisplayName ?? result.Username,
            isRoot = result.IsSystemImmutable,
            roles = result.AssignedRoleIds,
            permissions,
            adGroups = result.AdGroups
        });
    }
}