// ==========================================
// File: ITB-SCREEN-RECORDER.Core/Security/Pki/CertificateAuthorityManager.cs
// ==========================================
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.NetworkInformation;
using System.Net.Sockets;
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using ITB_SCREEN_RECORDER.Core.Common;

namespace ITB_SCREEN_RECORDER.Core.Security.Pki
{
    public class CertificateBundle
    {
        public X509Certificate2 ServerCertificate { get; set; } = null!;
        public X509Certificate2 RootCaCertificate { get; set; } = null!;
        public string ServerPfxPath { get; set; } = string.Empty;
        public string ServerCrtPath { get; set; } = string.Empty;
        public string ServerKeyPath { get; set; } = string.Empty;
        public string RootCaCrtPath { get; set; } = string.Empty;
        public string RootCaBundlePath { get; set; } = string.Empty;
        public string PfxPassword { get; set; } = string.Empty;
    }

    /// <summary>
    /// Autonomous cross-platform PKI authority manager (Windows &amp; Linux).
    /// Automatically provisions, validates, and rotates Root CA and Server SSL certificates
    /// without manual intervention or reliance on external utilities (such as openssl.exe).
    /// </summary>
    public static class CertificateAuthorityManager
    {
        private const string CaCommonName = "ITB Screen Recorder Enterprise Root CA";
        private const string ServerCommonName = "ITB-SCREEN-RECORDER Server";
        private const string Organization = "ITB-SCREEN-RECORDER";
        private const string OrganizationalUnit = "Security";

        private static readonly object SyncLock = new();
        private static readonly Encoding Utf8NoBom = new UTF8Encoding(false);
        private static CertificateBundle? _activeBundle;

        public static event Action<CertificateBundle>? OnCertificateRenewed;

        /// <summary>
        /// Resolves the secure OS-specific certificates storage directory path.
        /// </summary>
        /// <returns>Absolute path to the platform certificates directory.</returns>
        public static string ResolveCertificatesDirectory()
        {
            string dir;
            if (OperatingSystem.IsWindows())
            {
                dir = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.CommonApplicationData), "ITB-SCREEN-RECORDER", "Certificates");
            }
            else
            {
                dir = "/var/lib/itb-screen-recorder/certificates";
            }

            try
            {
                if (!Directory.Exists(dir))
                {
                    Directory.CreateDirectory(dir);
                    if (OperatingSystem.IsLinux())
                    {
                        try
                        {
                            File.SetUnixFileMode(dir, UnixFileMode.UserRead | UnixFileMode.UserWrite | UnixFileMode.UserExecute);
                        }
                        catch { }
                    }
                }
            }
            catch (Exception ex)
            {
                // Fallback to local application base directory if permissions to system directory are restricted (e.g. dev mode)
                string fallbackDir = Path.Combine(AppContext.BaseDirectory, "Certificates");
                if (!Directory.Exists(fallbackDir)) Directory.CreateDirectory(fallbackDir);
                Logger.Warn($"[PKI] Using fallback certificates directory '{fallbackDir}': {ex.Message}");
                return fallbackDir;
            }

            return dir;
        }

        /// <summary>
        /// Ensures valid Root CA and Server SSL certificates exist.
        /// If missing, expired, or expiring within 30 days, regenerates and provisions them automatically.
        /// </summary>
        /// <param name="extraSanHosts">Optional additional Subject Alternative Names (DNS hostnames or IP addresses).</param>
        /// <param name="forceRenew">Force immediate generation regardless of certificate validity period.</param>
        /// <returns>The active certificate bundle containing certs, private keys, and file paths.</returns>
        public static CertificateBundle EnsureCertificates(IEnumerable<string>? extraSanHosts = null, bool forceRenew = false)
        {
            lock (SyncLock)
            {
                if (!forceRenew && _activeBundle != null)
                {
                    if (_activeBundle.ServerCertificate.NotAfter.ToUniversalTime() > DateTime.UtcNow.AddDays(30) &&
                        _activeBundle.RootCaCertificate.NotAfter.ToUniversalTime() > DateTime.UtcNow.AddDays(60))
                    {
                        return _activeBundle;
                    }
                }

                string certsDir = ResolveCertificatesDirectory();
                string serverPfxPath = Path.Combine(certsDir, "server.pfx");
                string serverCrtPath = Path.Combine(certsDir, "server.crt");
                string serverKeyPath = Path.Combine(certsDir, "server.key");
                string caCrtPath = Path.Combine(certsDir, "ca.crt");
                string caKeyPath = Path.Combine(certsDir, "ca.key");
                string caBundlePath = Path.Combine(certsDir, "ca-bundle.crt");

                string pfxPassword = string.Empty;

                bool needNewCa = forceRenew || !File.Exists(caCrtPath) || !File.Exists(caKeyPath);
                bool needNewServerCert = needNewCa || !File.Exists(serverPfxPath) || !File.Exists(serverCrtPath) || !File.Exists(serverKeyPath);

                X509Certificate2? caCert = null;
                RSA? caPrivateKey = null;

                // ==========================================
                // Phase 1: Validate and ensure healthy Root CA with private key
                // ==========================================
                if (!needNewCa)
                {
                    try
                    {
                        using var caRaw = new X509Certificate2(File.ReadAllBytes(caCrtPath));
                        DateTime caNotBeforeUtc = caRaw.NotBefore.ToUniversalTime();
                        DateTime caNotAfterUtc = caRaw.NotAfter.ToUniversalTime();

                        if (caNotAfterUtc < DateTime.UtcNow.AddDays(60) || caNotBeforeUtc > DateTime.UtcNow.AddMinutes(5))
                        {
                            Logger.AlwaysInfo($"[PKI] Root CA is expired or expiring soon (NotAfter UTC: {caNotAfterUtc:u}). Renewing CA.");
                            needNewCa = true;
                        }
                        else
                        {
                            // Load private key and associate with CA certificate (required for signing server leaf certificates)
                            caPrivateKey = RSA.Create();
                            caPrivateKey.ImportFromPem(File.ReadAllText(caKeyPath));
                            caCert = caRaw.CopyWithPrivateKey(caPrivateKey);
                        }
                    }
                    catch (Exception ex)
                    {
                        Logger.AlwaysInfo($"[PKI] Failed reading existing Root CA or private key: {ex.Message}. Re-generating.");
                        needNewCa = true;
                    }
                }

                if (needNewCa)
                {
                    Logger.AlwaysInfo("[PKI] Generating new autonomous 15-year Root Certificate Authority (CA)...");
                    caPrivateKey = RSA.Create(4096);
                    var caSubject = new X500DistinguishedName($"CN={CaCommonName}, O={Organization}, OU={OrganizationalUnit}");

                    var caReq = new CertificateRequest(caSubject, caPrivateKey, HashAlgorithmName.SHA256, RSASignaturePadding.Pkcs1);
                    caReq.CertificateExtensions.Add(new X509BasicConstraintsExtension(certificateAuthority: true, hasPathLengthConstraint: false, pathLengthConstraint: 0, critical: true));
                    caReq.CertificateExtensions.Add(new X509KeyUsageExtension(X509KeyUsageFlags.KeyCertSign | X509KeyUsageFlags.CrlSign | X509KeyUsageFlags.DigitalSignature, critical: true));
                    caReq.CertificateExtensions.Add(new X509SubjectKeyIdentifierExtension(caReq.PublicKey, false));

                    DateTimeOffset notBefore = DateTimeOffset.UtcNow.AddMinutes(-5);
                    DateTimeOffset notAfter = notBefore.AddYears(15);

                    caCert = caReq.CreateSelfSigned(notBefore, notAfter);

                    // Save CA CRT and KEY without UTF-8 BOM for compatibility with MediaMTX, Go, and Linux
                    string caPem = caCert.ExportCertificatePem();
                    string caKeyPem = caPrivateKey.ExportPkcs8PrivateKeyPem();

                    File.WriteAllText(caCrtPath, caPem, Utf8NoBom);
                    File.WriteAllText(caKeyPath, caKeyPem, Utf8NoBom);

                    // Update ca-bundle.crt (aggregates historical CA certificates for zero-downtime rolling transitions)
                    AppendToCaBundle(caBundlePath, caPem);

                    Logger.AlwaysInfo($"[PKI] Root CA generated successfully. Thumbprint: {caCert.Thumbprint}, Valid until: {caCert.NotAfter:u}");

                    // Register Root CA in OS system trust store (Windows / Linux)
                    TryRegisterCaInSystemTrust(caCert, caCrtPath);

                    needNewServerCert = true;
                }

                // ==========================================
                // Phase 2: Validate and ensure server certificate matching active CA
                // ==========================================
                X509Certificate2? serverCert = null;

                if (!needNewServerCert)
                {
                    try
                    {
                        serverCert = new X509Certificate2(serverPfxPath, pfxPassword, X509KeyStorageFlags.Exportable | X509KeyStorageFlags.PersistKeySet);
                        DateTime srvNotBeforeUtc = serverCert.NotBefore.ToUniversalTime();
                        DateTime srvNotAfterUtc = serverCert.NotAfter.ToUniversalTime();

                        // Critical check: Was the existing server certificate signed by the active Root CA?
                        bool isSignedByActiveCa = false;
                        try
                        {
                            using var chain = new X509Chain();
                            chain.ChainPolicy.ExtraStore.Add(caCert!);
                            chain.ChainPolicy.RevocationMode = X509RevocationMode.NoCheck;
                            chain.ChainPolicy.VerificationFlags = X509VerificationFlags.AllowUnknownCertificateAuthority;
                            if (chain.Build(serverCert))
                            {
                                foreach (var element in chain.ChainElements)
                                {
                                    if (element.Certificate.Thumbprint.Equals(caCert!.Thumbprint, StringComparison.OrdinalIgnoreCase))
                                    {
                                        isSignedByActiveCa = true;
                                        break;
                                    }
                                }
                            }
                        }
                        catch { }

                        if (!isSignedByActiveCa)
                        {
                            Logger.AlwaysInfo($"[PKI] Existing server certificate was issued by an older or different CA. Re-issuing server certificate to match active Root CA ({caCert!.Thumbprint})...");
                            needNewServerCert = true;
                        }
                        else if (srvNotAfterUtc < DateTime.UtcNow.AddDays(30) || srvNotBeforeUtc > DateTime.UtcNow.AddMinutes(5))
                        {
                            Logger.AlwaysInfo($"[PKI] Server certificate expiring soon or invalid (NotAfter UTC: {srvNotAfterUtc:u}). Auto-renewing...");
                            needNewServerCert = true;
                        }
                    }
                    catch (Exception ex)
                    {
                        Logger.Warn($"[PKI] Failed loading existing server certificate: {ex.Message}. Re-generating.");
                        needNewServerCert = true;
                    }
                }

                if (needNewServerCert)
                {
                    Logger.AlwaysInfo("[PKI] Issuing fresh Server SSL Certificate signed by ITB Root CA...");
                    using var serverRsa = RSA.Create(2048);

                    var serverSubject = new X500DistinguishedName($"CN={ServerCommonName}, O={Organization}, OU={OrganizationalUnit}");
                    var serverReq = new CertificateRequest(serverSubject, serverRsa, HashAlgorithmName.SHA256, RSASignaturePadding.Pkcs1);

                    serverReq.CertificateExtensions.Add(new X509BasicConstraintsExtension(certificateAuthority: false, hasPathLengthConstraint: false, pathLengthConstraint: 0, critical: true));
                    serverReq.CertificateExtensions.Add(new X509KeyUsageExtension(X509KeyUsageFlags.DigitalSignature | X509KeyUsageFlags.KeyEncipherment, critical: true));
                    serverReq.CertificateExtensions.Add(new X509EnhancedKeyUsageExtension(
                        new OidCollection
                        {
                            new Oid("1.3.6.1.5.5.7.3.1"), // Server Authentication
                            new Oid("1.3.6.1.5.5.7.3.2")  // Client Authentication
                        }, critical: false));

                    // Add comprehensive Subject Alternative Names (SAN) for all active endpoint hostnames and IP addresses
                    var sanBuilder = new SubjectAlternativeNameBuilder();
                    sanBuilder.AddDnsName("localhost");
                    sanBuilder.AddIpAddress(IPAddress.Loopback);
                    sanBuilder.AddIpAddress(IPAddress.IPv6Loopback);

                    try
                    {
                        string hostName = Dns.GetHostName();
                        sanBuilder.AddDnsName(hostName);
                        if (!hostName.Equals(Environment.MachineName, StringComparison.OrdinalIgnoreCase))
                        {
                            sanBuilder.AddDnsName(Environment.MachineName);
                        }
                    }
                    catch { }

                    // Aggregate all active local IP addresses on the machine
                    foreach (var ip in GetAllLocalIpAddresses())
                    {
                        sanBuilder.AddIpAddress(ip);
                    }

                    if (extraSanHosts != null)
                    {
                        foreach (var host in extraSanHosts)
                        {
                            if (string.IsNullOrWhiteSpace(host)) continue;
                            if (IPAddress.TryParse(host, out var parsedIp))
                            {
                                sanBuilder.AddIpAddress(parsedIp);
                            }
                            else
                            {
                                sanBuilder.AddDnsName(host.Trim());
                            }
                        }
                    }

                    serverReq.CertificateExtensions.Add(sanBuilder.Build());
                    serverReq.CertificateExtensions.Add(new X509SubjectKeyIdentifierExtension(serverReq.PublicKey, false));

                    // Sign server leaf certificate using Root CA (valid for 2 years with 5-minute pre-roll to prevent clock drift rejection)
                    byte[] serialNumber = new byte[16];
                    RandomNumberGenerator.Fill(serialNumber);

                    DateTimeOffset notBefore = DateTimeOffset.UtcNow.AddMinutes(-5);
                    DateTimeOffset notAfter = notBefore.AddYears(2);

                    using var issuedCertWithoutKey = serverReq.Create(caCert!, notBefore, notAfter, serialNumber);
                    using var issuedCertWithKey = issuedCertWithoutKey.CopyWithPrivateKey(serverRsa);

                    // Export PFX bundle with full trust chain (including Root CA)
                    var pfxCollection = new X509Certificate2Collection();
                    pfxCollection.Add(issuedCertWithKey);
                    pfxCollection.Add(caCert!);
                    byte[]? pfxBytes = pfxCollection.Export(X509ContentType.Pfx, pfxPassword);
                    if (pfxBytes != null)
                    {
                        File.WriteAllBytes(serverPfxPath, pfxBytes);
                    }

                    // Export CRT and private key in PEM format for MediaMTX integration
                    string serverCrtPem = issuedCertWithKey.ExportCertificatePem();
                    string serverKeyPem = serverRsa.ExportPkcs8PrivateKeyPem();

                    File.WriteAllText(serverCrtPath, serverCrtPem, Utf8NoBom);
                    File.WriteAllText(serverKeyPath, serverKeyPem, Utf8NoBom);

                    serverCert = new X509Certificate2(pfxBytes, pfxPassword, X509KeyStorageFlags.Exportable | X509KeyStorageFlags.PersistKeySet);
                    Logger.AlwaysInfo($"[PKI] Server certificate issued successfully. Thumbprint: {serverCert.Thumbprint}, Valid until: {serverCert.NotAfter:u}");
                }

                _activeBundle = new CertificateBundle
                {
                    ServerCertificate = serverCert!,
                    RootCaCertificate = caCert!,
                    ServerPfxPath = serverPfxPath,
                    ServerCrtPath = serverCrtPath,
                    ServerKeyPath = serverKeyPath,
                    RootCaCrtPath = caCrtPath,
                    RootCaBundlePath = File.Exists(caBundlePath) ? caBundlePath : caCrtPath,
                    PfxPassword = pfxPassword
                };

                OnCertificateRenewed?.Invoke(_activeBundle);
                return _activeBundle;
            }
        }

        public static CertificateBundle? GetActiveBundle() => _activeBundle;

        private static void AppendToCaBundle(string bundlePath, string caPem)
        {
            try
            {
                if (!File.Exists(bundlePath))
                {
                    File.WriteAllText(bundlePath, caPem, Utf8NoBom);
                }
                else
                {
                    string existing = File.ReadAllText(bundlePath);
                    if (!existing.Contains(caPem.Trim()))
                    {
                        File.AppendAllText(bundlePath, Environment.NewLine + caPem, Utf8NoBom);
                    }
                }
            }
            catch (Exception ex)
            {
                Logger.Warn($"[PKI] Could not update ca-bundle.crt: {ex.Message}");
            }
        }

        public static IEnumerable<IPAddress> GetAllLocalIpAddresses()
        {
            var results = new HashSet<IPAddress>();
            try
            {
                foreach (var iface in NetworkInterface.GetAllNetworkInterfaces())
                {
                    if (iface.OperationalStatus != OperationalStatus.Up) continue;
                    var props = iface.GetIPProperties();
                    foreach (var addr in props.UnicastAddresses)
                    {
                        var ip = addr.Address;
                        if (ip.AddressFamily == AddressFamily.InterNetwork || ip.AddressFamily == AddressFamily.InterNetworkV6)
                        {
                            results.Add(ip);
                        }
                    }
                }
            }
            catch { }
            return results;
        }

        /// <summary>
        /// Registers the Root CA certificate into the operating system trust store.
        /// Under Windows: installs to Trusted Root Certification Authorities (LocalMachine) for Chrome and browser trust.
        /// Under Linux: installs to /usr/local/share/ca-certificates/ and invokes update-ca-certificates if privileged.
        /// </summary>
        /// <param name="caCert">Root CA certificate.</param>
        /// <param name="caCrtFilePath">File path to Root CA certificate file.</param>
        /// <returns>True if registration succeeded or already exists; false otherwise.</returns>
        public static bool TryRegisterCaInSystemTrust(X509Certificate2 caCert, string caCrtFilePath)
        {
            if (OperatingSystem.IsWindows())
            {
                try
                {
                    bool isAdmin = false;
#if WINDOWS
                    try
                    {
                        var identity = System.Security.Principal.WindowsIdentity.GetCurrent();
                        var principal = new System.Security.Principal.WindowsPrincipal(identity);
                        isAdmin = principal.IsInRole(System.Security.Principal.WindowsBuiltInRole.Administrator);
                    }
                    catch { }
#endif
                    // 1. Verify if Root CA is already trusted in LocalMachine store
                    try
                    {
                        using var checkMachine = new X509Store(StoreName.Root, StoreLocation.LocalMachine);
                        checkMachine.Open(OpenFlags.ReadOnly);
                        if (checkMachine.Certificates.Find(X509FindType.FindByThumbprint, caCert.Thumbprint, false).Count > 0)
                        {
                            Logger.Info($"[PKI] Root CA already trusted in Windows LocalMachine store ({caCert.Thumbprint}).");
                            return true;
                        }
                    }
                    catch { }

                    // Create one-click helper script with UAC self-elevation alongside certificate
                    try
                    {
                        string scriptDir = Path.GetDirectoryName(caCrtFilePath) ?? AppContext.BaseDirectory;
                        string batPath = Path.Combine(scriptDir, "Install-ITB-RootCA.bat");
                        string batContent = "@echo off\r\n" +
                                            ":: Self-elevate script to Administrator if not already elevated\r\n" +
                                            "net session >nul 2>&1\r\n" +
                                            "if %ERRORLEVEL% neq 0 (\r\n" +
                                            "    echo Requesting Administrator privileges to trust ITB Root CA in Chrome & Windows...\r\n" +
                                            "    powershell -NoProfile -ExecutionPolicy Bypass -Command \"Start-Process cmd -ArgumentList '/c \\\"\\\"%~f0\\\"\\\"' -Verb RunAs\"\r\n" +
                                            "    exit /b\r\n" +
                                            ")\r\n\r\n" +
                                            "echo Installing ITB Root CA into Windows Trusted Root Certification Authorities (LocalMachine)...\r\n" +
                                            "certutil.exe -addstore -f \"Root\" \"%~dp0ca.crt\"\r\n" +
                                            "if %ERRORLEVEL% EQU 0 (\r\n" +
                                            "    echo.\r\n" +
                                            "    echo =========================================================================\r\n" +
                                            "    echo  [SUCCESS] ITB Root CA registered successfully in LocalMachine\\Root!\r\n" +
                                            "    echo  Chrome, Edge and Windows now fully trust ITB Screen Recorder HTTPS.\r\n" +
                                            "    echo =========================================================================\r\n" +
                                            ") else (\r\n" +
                                            "    echo.\r\n" +
                                            "    echo [ERROR] Failed to register Root CA in LocalMachine store.\r\n" +
                                            ")\r\n" +
                                            "timeout /t 5\r\n";
                        File.WriteAllText(batPath, batContent, Encoding.ASCII);
                    }
                    catch { }

                    if (isAdmin)
                    {
                        using var machineStore = new X509Store(StoreName.Root, StoreLocation.LocalMachine);
                        machineStore.Open(OpenFlags.ReadWrite);
                        var existing = machineStore.Certificates.Find(X509FindType.FindByThumbprint, caCert.Thumbprint, false);
                        if (existing.Count == 0)
                        {
                            machineStore.Add(caCert);
                            Logger.AlwaysInfo($"[PKI] Registered ITB Root CA in Windows LocalMachine Root store ({caCert.Thumbprint}).");
                        }
                        return true;
                    }
                    else
                    {
                        // Automated UAC elevation attempt when running in interactive desktop context
                        if (Environment.UserInteractive)
                        {
                            try
                            {
                                var psi = new ProcessStartInfo
                                {
                                    FileName = "certutil.exe",
                                    Arguments = $"-addstore -f \"Root\" \"{caCrtFilePath}\"",
                                    UseShellExecute = true,
                                    Verb = "runas",
                                    WindowStyle = ProcessWindowStyle.Hidden
                                };
                                using var proc = Process.Start(psi);
                                if (proc != null && proc.WaitForExit(10000) && proc.ExitCode == 0)
                                {
                                    Logger.AlwaysInfo($"[PKI] Registered ITB Root CA in Windows LocalMachine Root store via UAC ({caCert.Thumbprint}).");
                                    return true;
                                }
                            }
                            catch (Exception uacEx)
                            {
                                Logger.Info($"[PKI] Elevated UAC registration bypassed or cancelled: {uacEx.Message}");
                            }
                        }

                        // Fallback attempt to install to CurrentUser Root store
                        try
                        {
                            using var userStore = new X509Store(StoreName.Root, StoreLocation.CurrentUser);
                            userStore.Open(OpenFlags.ReadWrite);
                            var existing = userStore.Certificates.Find(X509FindType.FindByThumbprint, caCert.Thumbprint, false);
                            if (existing.Count == 0)
                            {
                                userStore.Add(caCert);
                                Logger.AlwaysInfo($"[PKI] Registered ITB Root CA in Windows CurrentUser store ({caCert.Thumbprint}).");
                            }
                        }
                        catch (Exception userEx)
                        {
                            Logger.Info($"[PKI] CurrentUser CA registration prompt bypassed: {userEx.Message}");
                        }

                        Logger.Info("[PKI] Running under standard user; utilizing in-memory CustomTrustStore.");
                        return false;
                    }
                }
                catch (Exception ex)
                {
                    Logger.Warn($"[PKI] System CA registration skipped: {ex.Message}");
                    return false;
                }
            }
            else if (OperatingSystem.IsLinux())
            {
                try
                {
                    const string linuxCaDir = "/usr/local/share/ca-certificates";
                    if (Directory.Exists(linuxCaDir) && File.Exists(caCrtFilePath))
                    {
                        string destPath = Path.Combine(linuxCaDir, "itb-screen-recorder-ca.crt");
                        File.Copy(caCrtFilePath, destPath, overwrite: true);

                        // Execute update-ca-certificates utility if present
                        using var proc = Process.Start(new ProcessStartInfo
                        {
                            FileName = "update-ca-certificates",
                            RedirectStandardOutput = true,
                            RedirectStandardError = true,
                            UseShellExecute = false
                        });
                        proc?.WaitForExit(3000);
                        Logger.AlwaysInfo("[PKI] Registered ITB Root CA in Linux system ca-certificates.");
                        return true;
                    }
                }
                catch (Exception ex)
                {
                    Logger.Warn($"[PKI] Linux system CA update skipped: {ex.Message}");
                }
            }

            return false;
        }
    }
}
