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
            return new AuthResult(false, "Active Directory / LDAP server is not configured.", null, null, null, false, Array.Empty<string>(), Array.Empty<string>());
        }

        var (host, port) = LdapEndpointHelper.ParseEndpoint(policy.LdapServer, policy.LdapPort, policy.UseSsl);

        // Pre-flight TCP reachability probe to provide immediate, clear diagnostics if port is closed or blocked
        var tcpCheck = await LdapEndpointHelper.ProbeTcpPortAsync(host, port, 3500);
        if (!tcpCheck.Success)
        {
            return new AuthResult(false, $"Active Directory unreachable at '{host}:{port}'. {tcpCheck.Error}", null, null, null, false, Array.Empty<string>(), Array.Empty<string>());
        }

        try
        {
            var identifier = new LdapDirectoryIdentifier(host, port);
            using var connection = new LdapConnection(identifier)
            {
                Timeout = TimeSpan.FromSeconds(8)
            };
            connection.SessionOptions.ProtocolVersion = 3;

            if (policy.UseSsl)
            {
                connection.SessionOptions.SecureSocketLayer = true;
                // Allow enterprise internal CA certificates on remote servers
                connection.SessionOptions.VerifyServerCertificate = (conn, cert) => true;
            }

            // Derive domain for NetBIOS / UPN bind fallback if domain prefix is omitted
            string? domain = LdapEndpointHelper.ExtractDomainFromBaseDn(policy.LdapBaseDn);
            NetworkCredential credential;

            if (username.Contains('\\'))
            {
                var parts = username.Split('\\', 2);
                credential = new NetworkCredential(parts[1], password, parts[0]);
                connection.AuthType = AuthType.Negotiate;
            }
            else if (username.Contains('@'))
            {
                credential = new NetworkCredential(username, password);
                connection.AuthType = AuthType.Basic;
            }
            else if (!string.IsNullOrWhiteSpace(domain))
            {
                credential = new NetworkCredential(username, password, domain);
                connection.AuthType = policy.UseSsl ? AuthType.Basic : AuthType.Negotiate;
            }
            else
            {
                credential = new NetworkCredential(username, password);
                connection.AuthType = policy.UseSsl ? AuthType.Basic : AuthType.Negotiate;
            }

            connection.Bind(credential);

            // Retrieve user group memberships (memberOf)
            var groups = new List<string>();
            string searchBase = !string.IsNullOrWhiteSpace(policy.LdapBaseDn) ? policy.LdapBaseDn : "";

            if (!string.IsNullOrWhiteSpace(searchBase))
            {
                string safeUsername = LdapEndpointHelper.EscapeFilter(username.Contains('\\') ? username.Split('\\')[1] : (username.Contains('@') ? username.Split('@')[0] : username));
                string searchFilter = $"(&(objectClass=user)(|(sAMAccountName={safeUsername})(userPrincipalName={safeUsername}*)))";
                var searchRequest = new SearchRequest(
                    searchBase,
                    searchFilter,
                    SearchScope.Subtree,
                    "memberOf", "displayName", "sAMAccountName"
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

            // Derive application roles from Active Directory groups according to configured mappings
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
            string rawErr = ex.ServerErrorMessage ?? ex.Message;
            string friendly = LdapEndpointHelper.DecodeAdError(rawErr);
            return new AuthResult(false, $"AD Authentication failed: {friendly}", null, null, null, false, Array.Empty<string>(), Array.Empty<string>());
        }
        catch (Exception ex)
        {
            return new AuthResult(false, $"Active Directory connection error: {ex.Message}", null, null, null, false, Array.Empty<string>(), Array.Empty<string>());
        }
    }

    /// <summary>
    /// Authenticates a Windows domain-authenticated user seamlessly via SSO.
    /// Resolves user group memberships via directory search and applies mapped operational roles.
    /// </summary>
    public async Task<AuthResult> AuthenticateSsoUserAsync(string username)
    {
        var policy = await _repository.GetSecurityPolicyAsync();
        if (string.IsNullOrWhiteSpace(policy.LdapServer))
        {
            var allMappings = await _repository.GetAllLdapGroupMappingsAsync();
            var fallbackRoles = allMappings != null
                ? allMappings.Select(m => m.RoleId).Distinct(StringComparer.OrdinalIgnoreCase).ToList()
                : new List<string>();
            if (!fallbackRoles.Any())
            {
                fallbackRoles.Add("role_viewer");
            }

            return new AuthResult(
                Success: true,
                ErrorMessage: null,
                UserId: $"ad_{username.ToLowerInvariant()}",
                Username: username,
                DisplayName: username,
                IsSystemImmutable: false,
                AssignedRoleIds: fallbackRoles,
                AdGroups: new List<string> { "Domain Users" }
            );
        }

        var (host, port) = LdapEndpointHelper.ParseEndpoint(policy.LdapServer, policy.LdapPort, policy.UseSsl);
        var tcpCheck = await LdapEndpointHelper.ProbeTcpPortAsync(host, port, 3500);
        if (!tcpCheck.Success)
        {
            return new AuthResult(false, $"Active Directory unreachable at '{host}:{port}'. {tcpCheck.Error}", null, null, null, false, Array.Empty<string>(), Array.Empty<string>());
        }

        try
        {
            var identifier = new LdapDirectoryIdentifier(host, port);
            using var connection = new LdapConnection(identifier)
            {
                Timeout = TimeSpan.FromSeconds(8)
            };
            connection.SessionOptions.ProtocolVersion = 3;

            if (policy.UseSsl)
            {
                connection.SessionOptions.SecureSocketLayer = true;
                connection.SessionOptions.VerifyServerCertificate = (conn, cert) => true;
            }

            string? bindPassword = await _repository.GetLdapBindPasswordAsync();
            if (!string.IsNullOrWhiteSpace(policy.LdapBindDn) && !string.IsNullOrWhiteSpace(bindPassword))
            {
                connection.AuthType = policy.UseSsl ? AuthType.Basic : AuthType.Negotiate;
                connection.Bind(new NetworkCredential(policy.LdapBindDn, bindPassword));
            }
            else
            {
                connection.AuthType = AuthType.Negotiate;
                connection.Bind();
            }

            var groups = new List<string>();
            string searchBase = !string.IsNullOrWhiteSpace(policy.LdapBaseDn) ? policy.LdapBaseDn : "";
            string displayName = username;

            if (!string.IsNullOrWhiteSpace(searchBase))
            {
                string safeUsername = LdapEndpointHelper.EscapeFilter(username.Contains('\\') ? username.Split('\\')[1] : (username.Contains('@') ? username.Split('@')[0] : username));
                string searchFilter = $"(&(objectClass=user)(|(sAMAccountName={safeUsername})(userPrincipalName={safeUsername}*)))";
                var searchRequest = new SearchRequest(
                    searchBase,
                    searchFilter,
                    SearchScope.Subtree,
                    "memberOf", "displayName", "sAMAccountName"
                );

                var response = (SearchResponse)connection.SendRequest(searchRequest);
                if (response.Entries.Count > 0)
                {
                    var entry = response.Entries[0];
                    if (entry.Attributes["displayName"]?.Count > 0 && entry.Attributes["displayName"][0] is string dn)
                    {
                        displayName = dn;
                    }

                    if (entry.Attributes["memberOf"] != null)
                    {
                        foreach (var val in entry.Attributes["memberOf"].GetValues(typeof(string)))
                        {
                            if (val is string groupDn)
                            {
                                int start = groupDn.IndexOf("CN=", StringComparison.OrdinalIgnoreCase);
                                if (start >= 0)
                                {
                                    int end = groupDn.IndexOf(',', start);
                                    string groupName = end > start ? groupDn.Substring(start + 3, end - start - 3) : groupDn.Substring(start + 3);
                                    groups.Add(groupName);
                                }
                            }
                        }
                    }
                }
            }

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
                DisplayName: displayName,
                IsSystemImmutable: false,
                AssignedRoleIds: new List<string>(assignedRoles),
                AdGroups: groups
            );
        }
        catch (Exception ex)
        {
            return new AuthResult(false, $"Active Directory SSO query error: {ex.Message}", null, null, null, false, Array.Empty<string>(), Array.Empty<string>());
        }
    }
}