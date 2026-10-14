namespace ITB_SCREEN_RECORDER.Server.Services.Security;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Dapper;
using ITB_SCREEN_RECORDER.Server.Data;
using ITB_SCREEN_RECORDER.Server.Data.Repositories;

public sealed class LocalAuthenticationProvider : IAuthenticationProvider
{
    private readonly ICatalogConnectionFactory _factory;
    private readonly ICatalogRepository _repository;

    public LocalAuthenticationProvider(ICatalogConnectionFactory factory, ICatalogRepository repository)
    {
        _factory = factory;
        _repository = repository;
    }

    public async Task<AuthResult> AuthenticateAsync(string username, string password)
    {
        using var db = _factory.CreateConnection();
        const string sql = @"
            SELECT id, username, display_name, password_hash, is_active, is_system_immutable 
            FROM users 
            WHERE username = @username COLLATE NOCASE;
        ";

        var user = await db.QuerySingleOrDefaultAsync(sql, new { username });
        if (user == null)
        {
            return new AuthResult(false, "Invalid username or password.", null, null, null, false, Array.Empty<string>(), Array.Empty<string>());
        }

        if ((int)user.is_active != 1)
        {
            return new AuthResult(false, "User account is disabled.", null, null, null, false, Array.Empty<string>(), Array.Empty<string>());
        }

        string storedHash = (string)user.password_hash;
        if (!PasswordHasher.Verify(password, storedHash))
        {
            return new AuthResult(false, "Invalid username or password.", null, null, null, false, Array.Empty<string>(), Array.Empty<string>());
        }

        string userId = (string)user.id;
        var roleIds = await db.QueryAsync<string>("SELECT role_id FROM user_roles WHERE user_id = @userId;", new { userId });

        return new AuthResult(
            Success: true,
            ErrorMessage: null,
            UserId: userId,
            Username: (string)user.username,
            DisplayName: (string)user.display_name,
            IsSystemImmutable: (int)user.is_system_immutable == 1,
            AssignedRoleIds: roleIds.AsList(),
            AdGroups: Array.Empty<string>()
        );
    }
}