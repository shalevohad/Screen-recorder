namespace ITB_SCREEN_RECORDER.Server.Services.Security;

using System;
using System.Net.Sockets;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

public static class LdapEndpointHelper
{
    /// <summary>
    /// Parses and sanitizes raw host/server input, stripping URL schemes (ldap://, ldaps://)
    /// and extracting any embedded port (e.g. "dc01.corp.internal:389" -> ("dc01.corp.internal", 389)).
    /// </summary>
    public static (string Host, int Port) ParseEndpoint(string? rawServer, int configuredPort, bool useSsl)
    {
        int fallbackPort = configuredPort > 0 ? configuredPort : (useSsl ? 636 : 389);
        if (string.IsNullOrWhiteSpace(rawServer))
        {
            return ("127.0.0.1", fallbackPort);
        }

        string cleaned = rawServer.Trim();
        if (cleaned.StartsWith("ldaps://", StringComparison.OrdinalIgnoreCase))
        {
            cleaned = cleaned.Substring(8);
        }
        else if (cleaned.StartsWith("ldap://", StringComparison.OrdinalIgnoreCase))
        {
            cleaned = cleaned.Substring(7);
        }

        cleaned = cleaned.TrimEnd('/');

        // Check if port is embedded after colon
        int colonIdx = cleaned.LastIndexOf(':');
        if (colonIdx > 0 && int.TryParse(cleaned.Substring(colonIdx + 1), out int parsedPort))
        {
            return (cleaned.Substring(0, colonIdx).Trim(), parsedPort);
        }

        return (cleaned, fallbackPort);
    }

    /// <summary>
    /// Derives the DNS domain name from an Active Directory Search Base DN
    /// e.g. "OU=Users,DC=corp,DC=internal" -> "corp.internal"
    /// </summary>
    public static string? ExtractDomainFromBaseDn(string? baseDn)
    {
        if (string.IsNullOrWhiteSpace(baseDn)) return null;
        var matches = Regex.Matches(baseDn, @"DC=([^,]+)", RegexOptions.IgnoreCase);
        if (matches.Count == 0) return null;

        var sb = new StringBuilder();
        foreach (Match m in matches)
        {
            if (sb.Length > 0) sb.Append('.');
            sb.Append(m.Groups[1].Value);
        }
        return sb.Length > 0 ? sb.ToString() : null;
    }

    /// <summary>
    /// Performs LDAP search filter escaping to prevent injection attacks and syntax errors.
    /// </summary>
    public static string EscapeFilter(string input)
    {
        if (string.IsNullOrEmpty(input)) return string.Empty;
        var sb = new StringBuilder(input.Length);
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

    /// <summary>
    /// Decodes Active Directory hex/decimal error codes (such as data 52e, 532, 775) into clear human-friendly explanations.
    /// </summary>
    public static string DecodeAdError(string? rawMessage)
    {
        if (string.IsNullOrWhiteSpace(rawMessage)) return "Authentication failed or domain controller was unreachable.";

        if (rawMessage.Contains("data 52e", StringComparison.OrdinalIgnoreCase))
            return "Invalid username or password (AD error 52e). Please verify credentials.";
        if (rawMessage.Contains("data 525", StringComparison.OrdinalIgnoreCase))
            return "User account does not exist in Active Directory (AD error 525).";
        if (rawMessage.Contains("data 530", StringComparison.OrdinalIgnoreCase))
            return "Logon not permitted at this time (AD error 530).";
        if (rawMessage.Contains("data 531", StringComparison.OrdinalIgnoreCase))
            return "Not permitted to logon from this workstation (AD error 531).";
        if (rawMessage.Contains("data 532", StringComparison.OrdinalIgnoreCase))
            return "Password has expired (AD error 532). User must update their password.";
        if (rawMessage.Contains("data 533", StringComparison.OrdinalIgnoreCase))
            return "User account is disabled (AD error 533).";
        if (rawMessage.Contains("data 701", StringComparison.OrdinalIgnoreCase))
            return "Account has expired (AD error 701).";
        if (rawMessage.Contains("data 773", StringComparison.OrdinalIgnoreCase))
            return "User must reset password at next logon (AD error 773).";
        if (rawMessage.Contains("data 775", StringComparison.OrdinalIgnoreCase))
            return "User account is locked out (AD error 775).";

        if (rawMessage.Contains("strong(er) authentication required", StringComparison.OrdinalIgnoreCase) ||
            rawMessage.Contains("LDAP_STRONG_AUTH_REQUIRED", StringComparison.OrdinalIgnoreCase))
        {
            return "Active Directory requires secure encryption (LDAPS Port 636) or Negotiate authentication for simple bind.";
        }

        if (rawMessage.Contains("The LDAP server is unavailable", StringComparison.OrdinalIgnoreCase))
        {
            return "The LDAP server is unavailable. Verify that the host and port are reachable and that any SSL/TLS certificates are trusted.";
        }

        return rawMessage;
    }

    /// <summary>
    /// Quickly probes TCP socket reachability on the target host and port with a timeout.
    /// </summary>
    public static async Task<(bool Success, long LatencyMs, string? Error)> ProbeTcpPortAsync(string host, int port, int timeoutMs = 2500)
    {
        var sw = System.Diagnostics.Stopwatch.StartNew();
        try
        {
            using var client = new TcpClient();
            var connectTask = client.ConnectAsync(host, port);
            var completed = await Task.WhenAny(connectTask, Task.Delay(timeoutMs));

            sw.Stop();
            if (completed == connectTask && client.Connected)
            {
                return (true, sw.ElapsedMilliseconds, null);
            }

            return (false, sw.ElapsedMilliseconds, $"TCP connection timed out after {timeoutMs}ms. Port {port} on {host} might be blocked by a firewall or closed.");
        }
        catch (SocketException ex)
        {
            sw.Stop();
            return (false, sw.ElapsedMilliseconds, $"TCP socket error ({ex.SocketErrorCode}): {ex.Message}");
        }
        catch (Exception ex)
        {
            sw.Stop();
            return (false, sw.ElapsedMilliseconds, ex.Message);
        }
    }

    /// <summary>
    /// Derives an Active Directory Base DN from a DNS host name or domain name.
    /// E.g. "dc01.corp.internal" -> "DC=corp,DC=internal", "corp.internal" -> "DC=corp,DC=internal"
    /// </summary>
    public static string? DeriveBaseDnFromHost(string? hostOrDomain)
    {
        if (string.IsNullOrWhiteSpace(hostOrDomain)) return null;

        string cleaned = hostOrDomain.Trim();
        // Ignore IP addresses
        if (System.Net.IPAddress.TryParse(cleaned, out _)) return null;

        string[] parts = cleaned.Split('.', StringSplitOptions.RemoveEmptyEntries);
        if (parts.Length < 2) return null;

        // If 3+ parts and first part looks like a server hostname (e.g. dc01, ldap, srv), skip it
        IEnumerable<string> domainParts = parts;
        if (parts.Length >= 3 && (parts[0].StartsWith("dc", StringComparison.OrdinalIgnoreCase) || 
                                  parts[0].StartsWith("ldap", StringComparison.OrdinalIgnoreCase) || 
                                  parts[0].StartsWith("srv", StringComparison.OrdinalIgnoreCase) ||
                                  parts[0].StartsWith("ad", StringComparison.OrdinalIgnoreCase)))
        {
            domainParts = parts.Skip(1);
        }

        var sb = new StringBuilder();
        foreach (var p in domainParts)
        {
            if (sb.Length > 0) sb.Append(',');
            sb.Append("DC=").Append(p);
        }
        return sb.Length > 0 ? sb.ToString() : null;
    }

    /// <summary>
    /// Resolves DNS addresses for a hostname and measures response time.
    /// </summary>
    public static async Task<(bool Success, string[] Addresses, long LatencyMs, string? Error)> ResolveDnsAsync(string host)
    {
        var sw = System.Diagnostics.Stopwatch.StartNew();
        try
        {
            if (System.Net.IPAddress.TryParse(host, out var ip))
            {
                sw.Stop();
                return (true, new[] { ip.ToString() }, sw.ElapsedMilliseconds, null);
            }

            var entries = await System.Net.Dns.GetHostAddressesAsync(host);
            sw.Stop();

            if (entries.Length == 0)
            {
                return (false, Array.Empty<string>(), sw.ElapsedMilliseconds, $"No DNS records found for host '{host}'.");
            }

            var ips = entries.Select(e => e.ToString()).ToArray();
            return (true, ips, sw.ElapsedMilliseconds, null);
        }
        catch (Exception ex)
        {
            sw.Stop();
            return (false, Array.Empty<string>(), sw.ElapsedMilliseconds, $"DNS resolution failed: {ex.Message}");
        }
    }

    /// <summary>
    /// Probes TLS/SSL handshake on the given endpoint to inspect certificates and TLS compatibility.
    /// </summary>
    public static async Task<(bool Success, string? CertSubject, string? CertIssuer, bool IsEnterpriseCa, long LatencyMs, string? Error)> ProbeSslHandshakeAsync(string host, int port, int timeoutMs = 3000)
    {
        var sw = System.Diagnostics.Stopwatch.StartNew();
        try
        {
            using var client = new TcpClient();
            var connectTask = client.ConnectAsync(host, port);
            var completed = await Task.WhenAny(connectTask, Task.Delay(timeoutMs));
            if (completed != connectTask || !client.Connected)
            {
                sw.Stop();
                return (false, null, null, false, sw.ElapsedMilliseconds, $"TCP connection to {host}:{port} timed out during SSL handshake.");
            }

            string? subject = null;
            string? issuer = null;
            bool isEnterpriseCa = false;

            using var sslStream = new System.Net.Security.SslStream(
                client.GetStream(),
                false,
                (sender, certificate, chain, errors) =>
                {
                    if (certificate != null)
                    {
                        subject = certificate.Subject;
                        issuer = certificate.Issuer;
                        // Enterprise internal CAs typically have CN matching internal domain or CA name
                        isEnterpriseCa = !string.Equals(subject, issuer, StringComparison.OrdinalIgnoreCase);
                    }
                    return true; // Accept to complete probe inspection
                }
            );

            var authTask = sslStream.AuthenticateAsClientAsync(host);
            var authCompleted = await Task.WhenAny(authTask, Task.Delay(timeoutMs));
            sw.Stop();

            if (authCompleted != authTask)
            {
                return (false, null, null, false, sw.ElapsedMilliseconds, $"SSL/TLS handshake timed out after {timeoutMs}ms.");
            }

            await authTask; // propagate any exception
            return (true, subject, issuer, isEnterpriseCa, sw.ElapsedMilliseconds, null);
        }
        catch (Exception ex)
        {
            sw.Stop();
            return (false, null, null, false, sw.ElapsedMilliseconds, $"SSL handshake error: {ex.Message}");
        }
    }
}

