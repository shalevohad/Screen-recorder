namespace ITB_SCREEN_RECORDER.Server.Services.Security;

using ITB_SCREEN_RECORDER.Server.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Diagnostics.Eventing.Reader;
using System.DirectoryServices.Protocols;
using System.Net;
using System.Threading.Tasks;

public sealed class LdapAuthenticationProvider : IAuthenticationProvider
{
    private readonly ICatalogRepository _repository;

    public LdapAuthenticationProvider(ICatalogRepository repository)
    {
        _repository = repository;
    }

    public async Task<AuthResult> AuthenticateAsync(string username, string password)
    {
        var policy = await _repository.GetSecurityPolicyAsync();
        if (string.IsNullOrWhiteSpace(policy.LdapServer))
        {
            return new AuthResult(false, "LDAP server is not configured.", null, null, null, false, Array.Empty<string>(), Array.Empty<string>());
        }

        try
        {
            var identifier = new LdapDirectoryIdentifier(policy.LdapServer, policy.LdapPort);
            using var connection = new LdapConnection(identifier);
            connection.AuthType = AuthType.Basic;
            connection.SessionOptions.ProtocolVersion = 3;

            if (policy.UseSsl)
            {
                connection.SessionOptions.SecureSocketLayer = true;
            }

            // אימות מול ה-DC
            var credential = new NetworkCredential(username, password);
            connection.Bind(credential);

            // שליפת קבוצות המשתמש (MemberOf)
            var groups = new List<string>();
            if (!string.IsNullOrWhiteSpace(policy.LdapBaseDn))
            {
                string searchFilter = $"(&(objectClass=user)(sAMAccountName={username}))";
                var searchRequest = new SearchRequest(
                    policy.LdapBaseDn,
                    searchFilter,
                    SearchScope.Subtree,
                    "memberOf", "displayName"
                );

                var response = (SearchResponse)connection.SendRequest(searchRequest);
                if (response.Entries.Count > 0)
                {
                    var entry = response.Entries[0];
                    if (entry.Attributes["memberOf"] != null)
                    {
                        foreach (var val in entry.Attributes["memberOf"].GetValues(typeof(string)))
                        {
                            if (val is string dn)
                            {
                                // חילוץ ה-CN מתוך ה-DN (למשל CN=Operations_Team,OU=Groups... -> Operations_Team)
                                int start = dn.IndexOf("CN=", StringComparison.OrdinalIgnoreCase);
                                if (start >= 0)
                                {
                                    int end = dn.IndexOf(',', start);
                                    string groupName = end > start ? dn.Substring(start + 3, end - start - 3) : dn.Substring(start + 3);
                                    groups.Add(groupName);
                                }
                            }
                        }
                    }
                }
            }

            // גזירת תפקידים מקבוצות ה-AD לפי המיפוי השמור
            var mappings = await _repository.GetAllLdapGroupMappingsAsync();
            var assignedRoles = new HashSet<string>(StringComparer.OrdinalIgnoreCase);

            foreach (var group in groups)
            {
                foreach (var map in mappings)
                {
                    if (string.Equals(map.AdGroupName, group, StringComparison.OrdinalIgnoreCase))
                    {
                        assignedRoles.Add(map.RoleId);
                    }
                }
            }

            return new AuthResult(
                Success: true,
                ErrorMessage: null,
                UserId: $"ad_{username.ToLowerInvariant()}",
                Username: username,
                DisplayName: username,
                IsSystemImmutable: false,
                AssignedRoleIds: new List<string>(assignedRoles),
                AdGroups: groups
            );
        }
        catch (LdapException ex)
        {
            return new AuthResult(false, $"AD Authentication failed: {ex.Message}", null, null, null, false, Array.Empty<string>(), Array.Empty<string>());
        }
        catch (Exception ex)
        {
            return new AuthResult(false, $"LDAP Connection error: {ex.Message}", null, null, null, false, Array.Empty<string>(), Array.Empty<string>());
        }
    }
}