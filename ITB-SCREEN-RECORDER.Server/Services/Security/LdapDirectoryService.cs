namespace ITB_SCREEN_RECORDER.Server.Services.Security;

using System;
using System.Collections.Generic;
using System.DirectoryServices.Protocols;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using ITB_SCREEN_RECORDER.Server.Data.Repositories;
using ITB_SCREEN_RECORDER.Server.Models.Security;

public sealed class LdapDirectoryService : ILdapDirectoryService
{
    private readonly ICatalogRepository _repository;
    private readonly ILogger<LdapDirectoryService> _logger;

    public LdapDirectoryService(ICatalogRepository repository, ILogger<LdapDirectoryService> logger)
    {
        _repository = repository;
        _logger = logger;
    }

    public async Task<AdBrowseResultDto> BrowseOuTreeAsync(string? baseDn = null, bool simulate = false)
    {
        var policy = await _repository.GetSecurityPolicyAsync();
        string? bindPassword = await _repository.GetLdapBindPasswordAsync();

        if (simulate || string.IsNullOrWhiteSpace(policy.LdapServer))
        {
            return GetSimulatedBrowse(baseDn, string.IsNullOrWhiteSpace(policy.LdapServer) ? "Active Directory server is not configured. Showing directory preview." : null);
        }

        try
        {
            using var connection = CreateConnection(policy, bindPassword);

            string targetDn = string.IsNullOrWhiteSpace(baseDn) 
                ? (string.IsNullOrWhiteSpace(policy.LdapBaseDn) ? GetDefaultNamingContext(connection) : policy.LdapBaseDn)
                : baseDn.Trim();

            if (string.IsNullOrWhiteSpace(targetDn))
            {
                targetDn = "DC=corp,DC=internal";
            }

            string currentName = ExtractRdnValue(targetDn);

            // 1. Query child OUs & Containers
            var subOus = new List<AdOuNodeDto>();
            string ouFilter = "(&(|(objectClass=organizationalUnit)(objectClass=container)(objectClass=builtinDomain))(!(objectClass=computer)))";
            var ouRequest = new SearchRequest(
                targetDn,
                ouFilter,
                SearchScope.OneLevel,
                "distinguishedName", "name", "ou", "cn", "objectClass", "description"
            );

            var ouResponse = (SearchResponse)connection.SendRequest(ouRequest);
            foreach (SearchResultEntry entry in ouResponse.Entries)
            {
                string dn = entry.DistinguishedName;
                string name = GetAttributeString(entry, "ou") 
                           ?? GetAttributeString(entry, "name") 
                           ?? GetAttributeString(entry, "cn") 
                           ?? ExtractRdnValue(dn);

                bool isOu = HasObjectClass(entry, "organizationalUnit");
                string type = isOu ? "ou" : "container";

                subOus.Add(new AdOuNodeDto(
                    DistinguishedName: dn,
                    Name: name,
                    Type: type,
                    HasChildren: true,
                    EntityCount: 0
                ));
            }

            // 2. Query direct entities (Groups & Users) inside targetDn
            var entities = new List<AdEntityDto>();
            string entityFilter = "(&(|(objectClass=group)(&(objectClass=user)(!(objectClass=computer))))(!(objectClass=organizationalUnit)))";
            var entityRequest = new SearchRequest(
                targetDn,
                entityFilter,
                SearchScope.OneLevel,
                "sAMAccountName", "cn", "displayName", "distinguishedName", "objectClass", "groupType", "description"
            );

            var entityResponse = (SearchResponse)connection.SendRequest(entityRequest);
            foreach (SearchResultEntry entry in entityResponse.Entries)
            {
                string sam = GetAttributeString(entry, "sAMAccountName") 
                          ?? GetAttributeString(entry, "cn") 
                          ?? ExtractRdnValue(entry.DistinguishedName);

                string disp = GetAttributeString(entry, "displayName") ?? sam;
                string desc = GetAttributeString(entry, "description") ?? "";

                string entityType = "Security Group";
                if (HasObjectClass(entry, "group"))
                {
                    int groupType = GetAttributeInt(entry, "groupType");
                    // ADS_GROUP_TYPE_SECURITY_ENABLED = 0x80000000 (-2147483648)
                    bool isSecurity = (groupType & unchecked((int)0x80000000)) != 0;
                    entityType = isSecurity ? "Security Group" : "Distribution Group";
                }
                else if (HasObjectClass(entry, "user"))
                {
                    entityType = "User";
                }

                entities.Add(new AdEntityDto(
                    SamAccountName: sam,
                    DisplayName: disp,
                    DistinguishedName: entry.DistinguishedName,
                    Type: entityType,
                    Description: desc,
                    ParentOu: targetDn
                ));
            }

            return new AdBrowseResultDto(
                CurrentDn: targetDn,
                CurrentName: currentName,
                SubOus: subOus.OrderBy(o => o.Name).ToList(),
                Entities: entities.OrderBy(e => e.SamAccountName).ToList(),
                IsSimulated: false,
                Message: null
            );
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "[LdapDirectoryService] Live browse failed on '{TargetDn}', falling back to simulated preview: {Message}", baseDn, ex.Message);
            return GetSimulatedBrowse(baseDn, $"Active Directory connection failed ({ex.Message}). Showing simulated directory preview.");
        }
    }

    public async Task<AdSearchResultDto> SearchEntitiesAsync(string query, string? baseDn = null, int limit = 30, bool simulate = false)
    {
        var policy = await _repository.GetSecurityPolicyAsync();
        string? bindPassword = await _repository.GetLdapBindPasswordAsync();

        if (simulate || string.IsNullOrWhiteSpace(policy.LdapServer))
        {
            return GetSimulatedSearch(query, string.IsNullOrWhiteSpace(policy.LdapServer) ? "Active Directory server is not configured. Showing directory preview." : null);
        }

        try
        {
            using var connection = CreateConnection(policy, bindPassword);

            string searchBase = string.IsNullOrWhiteSpace(baseDn)
                ? (string.IsNullOrWhiteSpace(policy.LdapBaseDn) ? GetDefaultNamingContext(connection) : policy.LdapBaseDn)
                : baseDn.Trim();

            if (string.IsNullOrWhiteSpace(searchBase))
            {
                searchBase = "DC=corp,DC=internal";
            }

            string safeQuery = EscapeLdapFilter(query.Trim());
            string filter = string.IsNullOrWhiteSpace(safeQuery)
                ? "(objectClass=group)"
                : $"(&(|(objectClass=group)(&(objectClass=user)(!(objectClass=computer))))(|(sAMAccountName=*{safeQuery}*)(cn=*{safeQuery}*)(displayName=*{safeQuery}*)))";

            var searchRequest = new SearchRequest(
                searchBase,
                filter,
                SearchScope.Subtree,
                "sAMAccountName", "cn", "displayName", "distinguishedName", "objectClass", "groupType", "description"
            );

            var response = (SearchResponse)connection.SendRequest(searchRequest);
            var results = new List<AdEntityDto>();

            foreach (SearchResultEntry entry in response.Entries)
            {
                if (results.Count >= limit) break;

                string sam = GetAttributeString(entry, "sAMAccountName") 
                          ?? GetAttributeString(entry, "cn") 
                          ?? ExtractRdnValue(entry.DistinguishedName);

                string disp = GetAttributeString(entry, "displayName") ?? sam;
                string desc = GetAttributeString(entry, "description") ?? "";

                string entityType = "Security Group";
                if (HasObjectClass(entry, "group"))
                {
                    int groupType = GetAttributeInt(entry, "groupType");
                    bool isSecurity = (groupType & unchecked((int)0x80000000)) != 0;
                    entityType = isSecurity ? "Security Group" : "Distribution Group";
                }
                else if (HasObjectClass(entry, "user"))
                {
                    entityType = "User";
                }

                results.Add(new AdEntityDto(
                    SamAccountName: sam,
                    DisplayName: disp,
                    DistinguishedName: entry.DistinguishedName,
                    Type: entityType,
                    Description: desc,
                    ParentOu: ExtractParentDn(entry.DistinguishedName)
                ));
            }

            return new AdSearchResultDto(
                Query: query,
                Results: results.OrderBy(r => r.SamAccountName).ToList(),
                IsSimulated: false,
                Message: null
            );
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "[LdapDirectoryService] Live search failed for query '{Query}', falling back to simulated preview: {Message}", query, ex.Message);
            return GetSimulatedSearch(query, $"Active Directory query error ({ex.Message}). Showing matching simulated entities.");
        }
    }

    public async Task<LdapTestResultDto> TestConnectionAsync(
        string? server = null, 
        int? port = null, 
        string? baseDn = null, 
        bool? useSsl = null, 
        string? bindDn = null, 
        string? bindPassword = null)
    {
        var policy = await _repository.GetSecurityPolicyAsync();
        string rawServer = !string.IsNullOrWhiteSpace(server) ? server.Trim() : (policy.LdapServer ?? "");
        int cfgPort = (port.HasValue && port.Value > 0) ? port.Value : policy.LdapPort;
        bool ssl = useSsl ?? policy.UseSsl;
        string? bDn = bindDn ?? policy.LdapBindDn;
        string? bPwd = bindPassword ?? await _repository.GetLdapBindPasswordAsync();

        if (string.IsNullOrWhiteSpace(rawServer))
        {
            return new LdapTestResultDto(false, "Active Directory Server Host / IP must not be empty.", null, rawServer);
        }

        var (host, p) = LdapEndpointHelper.ParseEndpoint(rawServer, cfgPort, ssl);

        // Pre-flight TCP reachability probe
        var tcp = await LdapEndpointHelper.ProbeTcpPortAsync(host, p, 3000);
        if (!tcp.Success)
        {
            return new LdapTestResultDto(
                Success: false,
                Message: $"Cannot connect to '{host}' on port {p}: {tcp.Error}",
                DefaultNamingContext: null,
                Server: $"{host}:{p}"
            );
        }

        try
        {
            var identifier = new LdapDirectoryIdentifier(host, p);
            using var connection = new LdapConnection(identifier)
            {
                Timeout = TimeSpan.FromSeconds(6)
            };
            connection.SessionOptions.ProtocolVersion = 3;
            if (ssl)
            {
                connection.SessionOptions.SecureSocketLayer = true;
                connection.SessionOptions.VerifyServerCertificate = (conn, cert) => true;
            }

            if (!string.IsNullOrWhiteSpace(bDn))
            {
                if (bDn.Contains('@') || bDn.Contains('\\'))
                {
                    connection.AuthType = AuthType.Negotiate;
                }
                else
                {
                    connection.AuthType = AuthType.Basic;
                }
                connection.Bind(new NetworkCredential(bDn, bPwd ?? string.Empty));
            }
            else
            {
                connection.Bind();
            }

            string namingContext = GetDefaultNamingContext(connection);
            return new LdapTestResultDto(
                Success: true,
                Message: $"Connected and authenticated to Active Directory at '{host}:{p}' successfully.",
                DefaultNamingContext: namingContext,
                Server: $"{host}:{p}"
            );
        }
        catch (LdapException ex)
        {
            string friendly = LdapEndpointHelper.DecodeAdError(ex.ServerErrorMessage ?? ex.Message);
            return new LdapTestResultDto(
                Success: false,
                Message: $"Active Directory error: {friendly}",
                DefaultNamingContext: null,
                Server: $"{host}:{p}"
            );
        }
        catch (Exception ex)
        {
            return new LdapTestResultDto(
                Success: false,
                Message: $"Connection failed: {ex.Message}",
                DefaultNamingContext: null,
                Server: $"{host}:{p}"
            );
        }
    }

    public async Task<AdAutoDetectResultDto> AutoDetectSettingsAsync(string? hostOrDomain, bool? preferSsl = null)
    {
        var policy = await _repository.GetSecurityPolicyAsync();
        string input = !string.IsNullOrWhiteSpace(hostOrDomain) ? hostOrDomain.Trim() : (policy.LdapServer ?? "");
        if (string.IsNullOrWhiteSpace(input))
        {
            return new AdAutoDetectResultDto(false, "Please provide an Active Directory server hostname, IP, or domain name.", null, 0, null, false, 0);
        }

        var (host, explicitPort) = LdapEndpointHelper.ParseEndpoint(input, 0, preferSsl ?? false);
        var logs = new List<string> { $"Target host parsed as: '{host}'" };

        // DNS check
        var dns = await LdapEndpointHelper.ResolveDnsAsync(host);
        if (dns.Success)
        {
            logs.Add($"DNS resolved to: {string.Join(", ", dns.Addresses)} ({dns.LatencyMs}ms)");
        }
        else
        {
            logs.Add($"DNS notice: {dns.Error}");
        }

        int selectedPort = 0;
        bool useSsl = false;
        long tcpLatency = 0;

        if (explicitPort > 0)
        {
            var testProbe = await LdapEndpointHelper.ProbeTcpPortAsync(host, explicitPort, 3000);
            if (testProbe.Success)
            {
                selectedPort = explicitPort;
                useSsl = (explicitPort == 636 || preferSsl == true);
                tcpLatency = testProbe.LatencyMs;
                logs.Add($"Configured port {selectedPort} is OPEN ({tcpLatency}ms)");
            }
            else
            {
                logs.Add($"Port {explicitPort} unreachable: {testProbe.Error}");
            }
        }

        if (selectedPort == 0)
        {
            var candidates = (preferSsl == true)
                ? new[] { (Port: 636, Ssl: true), (Port: 389, Ssl: false), (Port: 3268, Ssl: false) }
                : (preferSsl == false)
                    ? new[] { (Port: 389, Ssl: false), (Port: 636, Ssl: true), (Port: 3268, Ssl: false) }
                    : new[] { (Port: 636, Ssl: true), (Port: 389, Ssl: false), (Port: 3268, Ssl: false) };

            foreach (var candidate in candidates)
            {
                var probe = await LdapEndpointHelper.ProbeTcpPortAsync(host, candidate.Port, 2000);
                if (probe.Success)
                {
                    selectedPort = candidate.Port;
                    useSsl = candidate.Ssl;
                    tcpLatency = probe.LatencyMs;
                    logs.Add($"Discovered open LDAP port {selectedPort} (SSL={useSsl}) in {tcpLatency}ms");
                    break;
                }
                else
                {
                    logs.Add($"Port {candidate.Port} closed: {probe.Error}");
                }
            }
        }

        if (selectedPort == 0)
        {
            return new AdAutoDetectResultDto(
                Success: false,
                Message: $"Could not reach any LDAP service on host '{host}' (tested ports 389, 636, 3268). Please check server IP and network firewall.",
                DiscoveredServer: host,
                DiscoveredPort: 389,
                DiscoveredBaseDn: null,
                UseSsl: false,
                LatencyMs: 0,
                Details: logs
            );
        }

        string? discoveredBaseDn = null;
        try
        {
            var identifier = new LdapDirectoryIdentifier(host, selectedPort);
            using var connection = new LdapConnection(identifier)
            {
                Timeout = TimeSpan.FromSeconds(5)
            };
            connection.SessionOptions.ProtocolVersion = 3;
            if (useSsl)
            {
                connection.SessionOptions.SecureSocketLayer = true;
                connection.SessionOptions.VerifyServerCertificate = (c, crt) => true;
            }
            connection.Bind();

            var searchRequest = new SearchRequest(
                "",
                "(objectClass=*)",
                SearchScope.Base,
                "defaultNamingContext", "dnsHostName", "rootDomainNamingContext"
            );
            var response = (SearchResponse)connection.SendRequest(searchRequest);
            if (response.Entries.Count > 0)
            {
                var entry = response.Entries[0];
                discoveredBaseDn = GetAttributeString(entry, "defaultNamingContext") 
                                ?? GetAttributeString(entry, "rootDomainNamingContext");
                string? dcHost = GetAttributeString(entry, "dnsHostName");
                logs.Add($"RootDSE query succeeded. Default Base DN: '{discoveredBaseDn}', DC Host: '{dcHost}'");
            }
        }
        catch (Exception ex)
        {
            logs.Add($"RootDSE query notice: {ex.Message}");
        }

        if (string.IsNullOrWhiteSpace(discoveredBaseDn))
        {
            discoveredBaseDn = LdapEndpointHelper.DeriveBaseDnFromHost(host) ?? "DC=corp,DC=internal";
            logs.Add($"Derived Base DN from domain name: '{discoveredBaseDn}'");
        }

        return new AdAutoDetectResultDto(
            Success: true,
            Message: $"Active Directory auto-configured successfully on '{host}:{selectedPort}'!",
            DiscoveredServer: host,
            DiscoveredPort: selectedPort,
            DiscoveredBaseDn: discoveredBaseDn,
            UseSsl: useSsl,
            LatencyMs: tcpLatency,
            Details: logs
        );
    }

    public async Task<AdDiagnosticsReportDto> RunDiagnosticsAsync(
        string? server = null, 
        int? port = null, 
        string? baseDn = null, 
        bool? useSsl = null, 
        string? bindDn = null, 
        string? bindPassword = null)
    {
        var policy = await _repository.GetSecurityPolicyAsync();
        string rawServer = !string.IsNullOrWhiteSpace(server) ? server.Trim() : (policy.LdapServer ?? "");
        int cfgPort = (port.HasValue && port.Value > 0) ? port.Value : policy.LdapPort;
        bool ssl = useSsl ?? policy.UseSsl;
        string? bDn = bindDn ?? policy.LdapBindDn;
        string? bPwd = bindPassword ?? await _repository.GetLdapBindPasswordAsync();

        var steps = new List<AdDiagnosticStepDto>();
        bool allPassed = true;

        // Step 1: Input & Endpoint Sanitation
        var sw = System.Diagnostics.Stopwatch.StartNew();
        if (string.IsNullOrWhiteSpace(rawServer))
        {
            steps.Add(new AdDiagnosticStepDto("1. Endpoint Verification", false, 0, "No LDAP Server specified."));
            return new AdDiagnosticsReportDto(false, "Active Directory configuration incomplete.", steps, "Enter an Active Directory hostname or IP.");
        }

        var (host, p) = LdapEndpointHelper.ParseEndpoint(rawServer, cfgPort, ssl);
        sw.Stop();
        steps.Add(new AdDiagnosticStepDto(
            StepName: "1. Endpoint Parsing & Formatting",
            Success: true,
            LatencyMs: sw.ElapsedMilliseconds,
            Message: $"Target resolved to Host: '{host}', Port: {p}, SSL: {(ssl ? "Enabled (LDAPS)" : "Disabled (Plain LDAP)")}.",
            Details: rawServer != host ? $"Note: URL prefix or embedded port was automatically normalized from '{rawServer}'." : null
        ));

        // Step 2: DNS Resolution
        var dns = await LdapEndpointHelper.ResolveDnsAsync(host);
        steps.Add(new AdDiagnosticStepDto(
            StepName: "2. DNS Resolution",
            Success: dns.Success,
            LatencyMs: dns.LatencyMs,
            Message: dns.Success ? $"Resolved '{host}' to: {string.Join(", ", dns.Addresses)}" : $"DNS resolution failed: {dns.Error}",
            Details: dns.Success ? null : "Check local DNS server, hosts file, or use an IP address directly."
        ));
        if (!dns.Success) allPassed = false;

        // Step 3: TCP Port Connectivity
        var tcp = await LdapEndpointHelper.ProbeTcpPortAsync(host, p, 3500);
        steps.Add(new AdDiagnosticStepDto(
            StepName: "3. TCP Socket Connectivity",
            Success: tcp.Success,
            LatencyMs: tcp.LatencyMs,
            Message: tcp.Success ? $"Port {p} is open and reachable." : $"Port {p} unreachable: {tcp.Error}",
            Details: tcp.Success ? null : $"Check if Windows Firewall, network security groups, or enterprise firewalls are blocking port {p} between this server and {host}."
        ));
        if (!tcp.Success)
        {
            allPassed = false;
            return new AdDiagnosticsReportDto(
                OverallSuccess: false,
                Summary: $"TCP connection failed on port {p}.",
                Steps: steps,
                Recommendation: $"Firewall or port issue detected. Ensure port {p} is open on {host} and listening for LDAP connections."
            );
        }

        // Step 4: SSL/TLS Handshake (if enabled)
        if (ssl)
        {
            var sslProbe = await LdapEndpointHelper.ProbeSslHandshakeAsync(host, p, 4000);
            steps.Add(new AdDiagnosticStepDto(
                StepName: "4. SSL/TLS Certificate Handshake",
                Success: sslProbe.Success,
                LatencyMs: sslProbe.LatencyMs,
                Message: sslProbe.Success 
                    ? $"TLS handshake succeeded. Certificate Subject: {sslProbe.CertSubject}" 
                    : $"TLS handshake failed: {sslProbe.Error}",
                Details: sslProbe.Success 
                    ? (sslProbe.IsEnterpriseCa ? "Enterprise Internal CA detected. Bypassing untrusted root verification for enterprise compatibility." : null)
                    : "If the domain controller uses an enterprise certificate, ensure LDAPS is properly bound to port 636."
            ));
            if (!sslProbe.Success) allPassed = false;
        }

        // Step 5: RootDSE & Authentication Bind
        sw.Restart();
        try
        {
            var identifier = new LdapDirectoryIdentifier(host, p);
            using var connection = new LdapConnection(identifier)
            {
                Timeout = TimeSpan.FromSeconds(6)
            };
            connection.SessionOptions.ProtocolVersion = 3;
            if (ssl)
            {
                connection.SessionOptions.SecureSocketLayer = true;
                connection.SessionOptions.VerifyServerCertificate = (conn, cert) => true;
            }

            if (!string.IsNullOrWhiteSpace(bDn))
            {
                if (bDn.Contains('@') || bDn.Contains('\\'))
                {
                    connection.AuthType = AuthType.Negotiate;
                }
                else
                {
                    connection.AuthType = AuthType.Basic;
                }
                connection.Bind(new NetworkCredential(bDn, bPwd ?? string.Empty));
            }
            else
            {
                connection.Bind();
            }

            string namingContext = GetDefaultNamingContext(connection);
            sw.Stop();

            steps.Add(new AdDiagnosticStepDto(
                StepName: "5. Active Directory RootDSE & Bind",
                Success: true,
                LatencyMs: sw.ElapsedMilliseconds,
                Message: $"Connected and authenticated. Default Base DN: '{namingContext}'.",
                Details: !string.IsNullOrWhiteSpace(bDn) ? $"Authenticated with service account: {bDn}" : "Anonymous / Default bind accepted."
            ));
        }
        catch (LdapException ex)
        {
            sw.Stop();
            allPassed = false;
            string friendly = LdapEndpointHelper.DecodeAdError(ex.ServerErrorMessage ?? ex.Message);
            steps.Add(new AdDiagnosticStepDto(
                StepName: "5. Active Directory RootDSE & Bind",
                Success: false,
                LatencyMs: sw.ElapsedMilliseconds,
                Message: friendly,
                Details: ex.ServerErrorMessage
            ));
        }
        catch (Exception ex)
        {
            sw.Stop();
            allPassed = false;
            steps.Add(new AdDiagnosticStepDto(
                StepName: "5. Active Directory RootDSE & Bind",
                Success: false,
                LatencyMs: sw.ElapsedMilliseconds,
                Message: $"Bind error: {ex.Message}"
            ));
        }

        string summary = allPassed 
            ? "All diagnostic checks passed! Active Directory is fully reachable and operational."
            : "Diagnostic checks identified one or more connectivity or configuration issues.";

        string? recommendation = allPassed
            ? "No action needed. You can safely switch Security Mode to 'Active Directory (LDAP)'."
            : "Review the failed step above for specific network or credential remedies.";

        return new AdDiagnosticsReportDto(allPassed, summary, steps, recommendation);
    }

    #region Private Connection & Protocol Helpers
    private LdapConnection CreateConnection(SecurityPolicyStateDto policy, string? bindPassword)
    {
        var (host, port) = LdapEndpointHelper.ParseEndpoint(policy.LdapServer, policy.LdapPort, policy.UseSsl);
        var identifier = new LdapDirectoryIdentifier(host, port);
        var connection = new LdapConnection(identifier)
        {
            Timeout = TimeSpan.FromSeconds(8)
        };
        connection.SessionOptions.ProtocolVersion = 3;

        if (policy.UseSsl)
        {
            connection.SessionOptions.SecureSocketLayer = true;
            connection.SessionOptions.VerifyServerCertificate = (conn, cert) => true;
        }

        if (!string.IsNullOrWhiteSpace(policy.LdapBindDn))
        {
            string bindDn = policy.LdapBindDn.Trim();
            if (bindDn.Contains('@') || bindDn.Contains('\\'))
            {
                connection.AuthType = AuthType.Negotiate;
            }
            else
            {
                connection.AuthType = AuthType.Basic;
            }
            connection.Bind(new NetworkCredential(bindDn, bindPassword ?? string.Empty));
        }
        else
        {
            connection.Bind();
        }

        return connection;
    }


    private static string GetDefaultNamingContext(LdapConnection connection)
    {
        try
        {
            var searchRequest = new SearchRequest(
                "",
                "(objectClass=*)",
                SearchScope.Base,
                "defaultNamingContext"
            );
            var response = (SearchResponse)connection.SendRequest(searchRequest);
            if (response.Entries.Count > 0)
            {
                var entry = response.Entries[0];
                return GetAttributeString(entry, "defaultNamingContext") ?? "DC=corp,DC=internal";
            }
        }
        catch
        {
            // Ignore RootDSE failures
        }
        return "DC=corp,DC=internal";
    }

    private static string? GetAttributeString(SearchResultEntry entry, string attributeName)
    {
        if (entry.Attributes.Contains(attributeName) && entry.Attributes[attributeName].Count > 0)
        {
            var val = entry.Attributes[attributeName][0];
            return val is byte[] bytes ? Encoding.UTF8.GetString(bytes) : val?.ToString();
        }
        return null;
    }

    private static int GetAttributeInt(SearchResultEntry entry, string attributeName)
    {
        string? val = GetAttributeString(entry, attributeName);
        return int.TryParse(val, out int res) ? res : 0;
    }

    private static bool HasObjectClass(SearchResultEntry entry, string expectedClass)
    {
        if (entry.Attributes.Contains("objectClass"))
        {
            foreach (var val in entry.Attributes["objectClass"].GetValues(typeof(string)))
            {
                if (string.Equals(val?.ToString(), expectedClass, StringComparison.OrdinalIgnoreCase))
                {
                    return true;
                }
            }
        }
        return false;
    }

    private static string ExtractRdnValue(string dn)
    {
        if (string.IsNullOrWhiteSpace(dn)) return string.Empty;
        int eq = dn.IndexOf('=');
        if (eq < 0) return dn;
        int comma = dn.IndexOf(',', eq);
        return comma > eq ? dn.Substring(eq + 1, comma - eq - 1) : dn.Substring(eq + 1);
    }

    private static string ExtractParentDn(string dn)
    {
        if (string.IsNullOrWhiteSpace(dn)) return string.Empty;
        int comma = dn.IndexOf(',');
        return comma >= 0 ? dn.Substring(comma + 1).Trim() : dn;
    }

    private static string EscapeLdapFilter(string input)
    {
        if (string.IsNullOrEmpty(input)) return string.Empty;
        var sb = new StringBuilder();
        foreach (char c in input)
        {
            switch (c)
            {
                case '*': sb.Append(@"\2a"); break;
                case '(': sb.Append(@"\28"); break;
                case ')': sb.Append(@"\29"); break;
                case '\\': sb.Append(@"\5c"); break;
                case '\0': sb.Append(@"\00"); break;
                case '/': sb.Append(@"\2f"); break;
                default: sb.Append(c); break;
            }
        }
        return sb.ToString();
    }
    #endregion

    #region Simulated Active Directory Data
    private static readonly (string Dn, string Name, string? ParentDn, string Type)[] SimulatedOus = new[]
    {
        ("DC=corp,DC=internal", "corp.internal", null, "domain"),
        ("OU=HQ,DC=corp,DC=internal", "HQ (Headquarters)", "DC=corp,DC=internal", "ou"),
        ("OU=Command_Center,OU=HQ,DC=corp,DC=internal", "Command Center & Ops", "OU=HQ,DC=corp,DC=internal", "ou"),
        ("OU=Cyber_Security,OU=HQ,DC=corp,DC=internal", "Cyber Security & SOC", "OU=HQ,DC=corp,DC=internal", "ou"),
        ("OU=Engineering,OU=HQ,DC=corp,DC=internal", "Engineering & DevOps", "OU=HQ,DC=corp,DC=internal", "ou"),
        ("OU=Branches,DC=corp,DC=internal", "Regional Branches", "DC=corp,DC=internal", "ou"),
        ("OU=North_District,OU=Branches,DC=corp,DC=internal", "North District Command", "OU=Branches,DC=corp,DC=internal", "ou"),
        ("OU=South_District,OU=Branches,DC=corp,DC=internal", "South District Command", "OU=Branches,DC=corp,DC=internal", "ou"),
        ("CN=Builtin,DC=corp,DC=internal", "Builtin Security Principals", "DC=corp,DC=internal", "container")
    };

    private static readonly AdEntityDto[] SimulatedEntities = new[]
    {
        // In Command Center
        new AdEntityDto("C2_Admins", "Command Center Administrators", "CN=C2_Admins,OU=Command_Center,OU=HQ,DC=corp,DC=internal", "Security Group", "Full tactical and administrative authority over recorder fleet and control matrix.", "OU=Command_Center,OU=HQ,DC=corp,DC=internal"),
        new AdEntityDto("C2_Watch_Officers", "Situation Room Watch Officers", "CN=C2_Watch_Officers,OU=Command_Center,OU=HQ,DC=corp,DC=internal", "Security Group", "Real-time tactical monitoring, broadcast control, and event bookmarks.", "OU=Command_Center,OU=HQ,DC=corp,DC=internal"),
        new AdEntityDto("Fleet_Operators", "Fleet Workstation Operators", "CN=Fleet_Operators,OU=Command_Center,OU=HQ,DC=corp,DC=internal", "Security Group", "Standard workstation live view and operational display permissions.", "OU=Command_Center,OU=HQ,DC=corp,DC=internal"),
        new AdEntityDto("Tactical_Audio_Monitors", "Tactical Audio Monitoring Team", "CN=Tactical_Audio_Monitors,OU=Command_Center,OU=HQ,DC=corp,DC=internal", "Security Group", "Authorized to monitor live and recorded audio streams.", "OU=Command_Center,OU=HQ,DC=corp,DC=internal"),

        // In Cyber Security
        new AdEntityDto("SOC_Incident_Responders", "SOC Tier 2 & 3 Incident Responders", "CN=SOC_Incident_Responders,OU=Cyber_Security,OU=HQ,DC=corp,DC=internal", "Security Group", "Forensic extractor, historical playback audit, and security timeline investigations.", "OU=Cyber_Security,OU=HQ,DC=corp,DC=internal"),
        new AdEntityDto("Security_Auditors", "Enterprise Security Compliance Auditors", "CN=Security_Auditors,OU=Cyber_Security,OU=HQ,DC=corp,DC=internal", "Security Group", "Read-only audit access across session recordings and system logs.", "OU=Cyber_Security,OU=HQ,DC=corp,DC=internal"),
        new AdEntityDto("Threat_Hunting_Unit", "Threat Intelligence & Hunting Unit", "CN=Threat_Hunting_Unit,OU=Cyber_Security,OU=HQ,DC=corp,DC=internal", "Security Group", "Special forensic and studio extractor tools for cyber threat investigations.", "OU=Cyber_Security,OU=HQ,DC=corp,DC=internal"),

        // In Engineering
        new AdEntityDto("DevOps_Infrastructure", "Platform & Infrastructure Operations", "CN=DevOps_Infrastructure,OU=Engineering,OU=HQ,DC=corp,DC=internal", "Security Group", "Storage management, system agents, retention policies, and network config.", "OU=Engineering,OU=HQ,DC=corp,DC=internal"),
        new AdEntityDto("System_Integrators", "System Software Integrators", "CN=System_Integrators,OU=Engineering,OU=HQ,DC=corp,DC=internal", "Security Group", "API and custom tabs integration privilege.", "OU=Engineering,OU=HQ,DC=corp,DC=internal"),

        // In North District
        new AdEntityDto("North_Operations_Team", "Northern Command Operations Team", "CN=North_Operations_Team,OU=North_District,OU=Branches,DC=corp,DC=internal", "Security Group", "Operational control over Northern sector recording stations.", "OU=North_District,OU=Branches,DC=corp,DC=internal"),
        new AdEntityDto("North_Field_Supervisors", "Northern Field Station Supervisors", "CN=North_Field_Supervisors,OU=North_District,OU=Branches,DC=corp,DC=internal", "Security Group", "Supervisory rights over Northern regional assets.", "OU=North_District,OU=Branches,DC=corp,DC=internal"),

        // In South District
        new AdEntityDto("South_Operations_Team", "Southern Command Operations Team", "CN=South_Operations_Team,OU=South_District,OU=Branches,DC=corp,DC=internal", "Security Group", "Operational control over Southern sector recording stations.", "OU=South_District,OU=Branches,DC=corp,DC=internal"),
        new AdEntityDto("South_Field_Supervisors", "Southern Field Station Supervisors", "CN=South_Field_Supervisors,OU=South_District,OU=Branches,DC=corp,DC=internal", "Security Group", "Supervisory rights over Southern regional assets.", "OU=South_District,OU=Branches,DC=corp,DC=internal"),

        // In Builtin
        new AdEntityDto("Domain_Admins", "Domain Administrators", "CN=Domain_Admins,CN=Builtin,DC=corp,DC=internal", "Security Group", "Enterprise Domain Admins.", "CN=Builtin,DC=corp,DC=internal"),
        new AdEntityDto("Domain_Users", "All Domain Users", "CN=Domain_Users,CN=Builtin,DC=corp,DC=internal", "Security Group", "All standard domain user accounts.", "CN=Builtin,DC=corp,DC=internal")
    };

    private static AdBrowseResultDto GetSimulatedBrowse(string? baseDn, string? message)
    {
        string targetDn = string.IsNullOrWhiteSpace(baseDn) ? "DC=corp,DC=internal" : baseDn.Trim();
        var currentOu = SimulatedOus.FirstOrDefault(o => string.Equals(o.Dn, targetDn, StringComparison.OrdinalIgnoreCase));
        string currentName = currentOu.Name ?? ExtractRdnValue(targetDn);

        var subOus = SimulatedOus
            .Where(o => string.Equals(o.ParentDn, targetDn, StringComparison.OrdinalIgnoreCase))
            .Select(o => new AdOuNodeDto(
                DistinguishedName: o.Dn,
                Name: o.Name,
                Type: o.Type,
                HasChildren: SimulatedOus.Any(c => string.Equals(c.ParentDn, o.Dn, StringComparison.OrdinalIgnoreCase)),
                EntityCount: SimulatedEntities.Count(e => string.Equals(e.ParentOu, o.Dn, StringComparison.OrdinalIgnoreCase))
            ))
            .OrderBy(o => o.Name)
            .ToList();

        var entities = SimulatedEntities
            .Where(e => string.Equals(e.ParentOu, targetDn, StringComparison.OrdinalIgnoreCase))
            .OrderBy(e => e.SamAccountName)
            .ToList();

        return new AdBrowseResultDto(
            CurrentDn: targetDn,
            CurrentName: currentName,
            SubOus: subOus,
            Entities: entities,
            IsSimulated: true,
            Message: message ?? "Simulated Active Directory Preview"
        );
    }

    private static AdSearchResultDto GetSimulatedSearch(string query, string? message)
    {
        string q = query.Trim().ToLowerInvariant();
        var matches = SimulatedEntities
            .Where(e => e.SamAccountName.ToLowerInvariant().Contains(q) ||
                        e.DisplayName.ToLowerInvariant().Contains(q) ||
                        e.Description.ToLowerInvariant().Contains(q) ||
                        (e.ParentOu != null && e.ParentOu.ToLowerInvariant().Contains(q)))
            .OrderBy(e => e.SamAccountName)
            .ToList();

        return new AdSearchResultDto(
            Query: query,
            Results: matches,
            IsSimulated: true,
            Message: message ?? "Simulated Active Directory Search"
        );
    }
    #endregion
}
