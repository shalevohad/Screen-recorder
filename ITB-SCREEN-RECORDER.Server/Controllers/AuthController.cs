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

    public AuthController(ISecurityService securityService, ICatalogRepository repository)
    {
        _securityService = securityService;
        _repository = repository;
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
    /// הנפקת סשן אורח במצב Open Mode – מכיל הרשאות מבצעיות בלבד (לעולם לא הגדרות או אבטחה)
    /// </summary>
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
}