namespace ITB_SCREEN_RECORDER.Server.Services.Security;

using System.Collections.Generic;
using System.Threading.Tasks;

public record AuthResult(
    bool Success,
    string? ErrorMessage,
    string? UserId,
    string? Username,
    string? DisplayName,
    bool IsSystemImmutable,
    IReadOnlyList<string> AssignedRoleIds,
    IReadOnlyList<string> AdGroups
);

public interface IAuthenticationProvider
{
    Task<AuthResult> AuthenticateAsync(string username, string password);
}