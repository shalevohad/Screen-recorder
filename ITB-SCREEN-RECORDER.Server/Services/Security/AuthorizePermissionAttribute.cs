namespace ITB_SCREEN_RECORDER.Server.Services.Security;

using System;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Server.Data.Repositories;
using ITB_SCREEN_RECORDER.Server.Models.Security;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization.Policy;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

[AttributeUsage(AttributeTargets.Method | AttributeTargets.Class, AllowMultiple = true)]
public sealed class AuthorizePermissionAttribute : AuthorizeAttribute
{
    public AuthorizePermissionAttribute(string permission) : base(policy: permission)
    {
    }
}

/// <summary>
/// Default passthrough authentication scheme returning 401 Unauthorized / 403 Forbidden without throwing unhandled exceptions.
/// User identity is established by the Bearer middleware in Program.cs.
/// </summary>
public sealed class BearerPassthroughAuthenticationHandler : AuthenticationHandler<AuthenticationSchemeOptions>
{
    public const string SchemeName = "Bearer";

    public BearerPassthroughAuthenticationHandler(IOptionsMonitor<AuthenticationSchemeOptions> options, ILoggerFactory logger, UrlEncoder encoder)
        : base(options, logger, encoder) { }

    protected override Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        return Task.FromResult(Context.User.Identity?.IsAuthenticated == true
            ? AuthenticateResult.Success(new AuthenticationTicket(Context.User, Scheme.Name))
            : AuthenticateResult.NoResult());
    }
}

public sealed class PermissionRequirement : IAuthorizationRequirement
{
    public string Permission { get; }
    public PermissionRequirement(string permission) => Permission = permission;
}

public sealed class PermissionPolicyProvider : DefaultAuthorizationPolicyProvider
{
    public PermissionPolicyProvider(IOptions<AuthorizationOptions> options) : base(options) { }

    public override async Task<AuthorizationPolicy?> GetPolicyAsync(string policyName)
    {
        var policy = await base.GetPolicyAsync(policyName);
        if (policy != null) return policy;

        return new AuthorizationPolicyBuilder()
            .AddRequirements(new PermissionRequirement(policyName))
            .Build();
    }
}

public sealed class PermissionAuthorizationHandler : AuthorizationHandler<PermissionRequirement>
{
    private readonly ICatalogRepository _repository;

    public PermissionAuthorizationHandler(ICatalogRepository repository)
    {
        _repository = repository;
    }

    protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, PermissionRequirement requirement)
    {
        // 1. Root superuser (is_root) is always authorized for all operations
        if (context.User.HasClaim("is_root", "true"))
        {
            context.Succeed(requirement);
            return;
        }

        // 2. User carries the explicit permission claim
        if (context.User.HasClaim("perm", requirement.Permission))
        {
            context.Succeed(requirement);
            return;
        }

        // 3. Open Mode: permits operational actions only!
        // Settings and security permissions remain protected and require an authenticated administrator:
        var policy = await _repository.GetSecurityPolicyAsync();
        if (policy.CurrentMode == AuthMode.Open)
        {
            bool isProtectedAdminPermission =
                requirement.Permission.StartsWith("settings.", StringComparison.OrdinalIgnoreCase) ||
                requirement.Permission.StartsWith("security.", StringComparison.OrdinalIgnoreCase);

            if (!isProtectedAdminPermission)
            {
                context.Succeed(requirement);
                return;
            }
        }
    }
}

public sealed class CustomAuthorizationMiddlewareResultHandler : IAuthorizationMiddlewareResultHandler
{
    public async Task HandleAsync(
        RequestDelegate next,
        HttpContext context,
        AuthorizationPolicy policy,
        PolicyAuthorizationResult authorizeResult)
    {
        if (authorizeResult.Challenged)
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            context.Response.ContentType = "application/json";
            await context.Response.WriteAsync("{\"message\":\"Unauthorized: Administrator credentials required.\"}");
            return;
        }

        if (authorizeResult.Forbidden)
        {
            context.Response.StatusCode = StatusCodes.Status403Forbidden;
            context.Response.ContentType = "application/json";
            await context.Response.WriteAsync("{\"message\":\"Forbidden: Insufficient administrative privileges.\"}");
            return;
        }

        await next(context);
    }
}