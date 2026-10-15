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
    /// מנהל PKI אוטונומי חוצה פלטפורמות (Windows & Linux).
    /// מייצר ומחדש אוטומטית תעודות Root CA ו-Server SSL ללא התערבות משתמש וללא צורך בכלים חיצוניים (OpenSSL וכד').
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
        /// מחזיר את נתיב תיקיית התעודות המאובטחת בהתאם למערכת ההפעלה.
        /// </summary>
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
                // Fallback לתיקיית האפליקציה המקומית במידה ואין הרשאות לתיקיית המערכת (למשל במצב פיתוח)
                string fallbackDir = Path.Combine(AppContext.BaseDirectory, "Certificates");
                if (!Directory.Exists(fallbackDir)) Directory.CreateDirectory(fallbackDir);
                Logger.Warn($"[PKI] Using fallback certificates directory '{fallbackDir}': {ex.Message}");
                return fallbackDir;
            }

            return dir;
        }

        /// <summary>
        /// מוודא שקיימות תעודות תקפות (Root CA ו-Server SSL).
        /// אם הן חסרות, עומדות לפוג (פחות מ-30 יום) או כבר פגו תוקף - הן מיוצרות ומחודשות אוטומטית.
        /// </summary>
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

                if (!needNewCa)
                {
                    try
                    {
                        caCert = new X509Certificate2(File.ReadAllBytes(caCrtPath));
                        DateTime caNotBeforeUtc = caCert.NotBefore.ToUniversalTime();
                        DateTime caNotAfterUtc = caCert.NotAfter.ToUniversalTime();
                        // בדיקת תוקף ה-CA ב-UTC: אם נותרו פחות מ-60 יום לתוקף ה-CA, נחדש אותו
                        if (caNotAfterUtc < DateTime.UtcNow.AddDays(60) || caNotBeforeUtc > DateTime.UtcNow.AddMinutes(5))
                        {
                            Logger.AlwaysInfo($"[PKI] Root CA is expired or expiring soon (NotAfter UTC: {caNotAfterUtc:u}). Renewing CA.");
                            needNewCa = true;
                            needNewServerCert = true;
                        }
                    }
                    catch (Exception ex)
                    {
                        Logger.AlwaysInfo($"[PKI] Failed to read existing Root CA: {ex.Message}. Re-generating.");
                        needNewCa = true;
                        needNewServerCert = true;
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

                    // שמירת CA CRT ו-KEY ללא BOM עבור תאימות מושלמת עם MediaMTX, Go ו-Linux
                    string caPem = caCert.ExportCertificatePem();
                    string caKeyPem = caPrivateKey.ExportPkcs8PrivateKeyPem();

                    File.WriteAllText(caCrtPath, caPem, Utf8NoBom);
                    File.WriteAllText(caKeyPath, caKeyPem, Utf8NoBom);

                    // עדכון ca-bundle.crt (צובר תעודות CA היסטוריות למעבר שקוף ללא השבתה)
                    AppendToCaBundle(caBundlePath, caPem);

                    Logger.AlwaysInfo($"[PKI] Root CA generated successfully. Thumbprint: {caCert.Thumbprint}, Valid until: {caCert.NotAfter:u}");

                    // רישום ה-CA בחנות התעודות של מערכת ההפעלה (Windows / Linux)
                    TryRegisterCaInSystemTrust(caCert, caCrtPath);
                }
                else if (needNewServerCert)
                {
                    try
                    {
                        caPrivateKey = RSA.Create();
                        caPrivateKey.ImportFromPem(File.ReadAllText(caKeyPath));
                    }
                    catch (Exception ex)
                    {
                        Logger.AlwaysInfo($"[PKI] Failed reading existing CA private key: {ex.Message}. Re-generating Root CA.");
                        needNewCa = true;
                    }
                }

                X509Certificate2? serverCert = null;

                if (!needNewServerCert)
                {
                    try
                    {
                        serverCert = new X509Certificate2(serverPfxPath, pfxPassword, X509KeyStorageFlags.Exportable | X509KeyStorageFlags.PersistKeySet);
                        DateTime srvNotBeforeUtc = serverCert.NotBefore.ToUniversalTime();
                        DateTime srvNotAfterUtc = serverCert.NotAfter.ToUniversalTime();
                        // חידוש אוטומטי אם נותרו פחות מ-30 יום לתעודת השרת
                        if (srvNotAfterUtc < DateTime.UtcNow.AddDays(30) || srvNotBeforeUtc > DateTime.UtcNow.AddMinutes(5))
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

                    // 💡 הוספת Subject Alternative Names (SAN) מקיפים לכל הכתובות הפעילות
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

                    // איסוף כל כתובות ה-IP המקומיות הפעילות במכונה
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

                    // חתימת תעודת השרת באמצעות ה-Root CA (תוקף ל-2 שנים עם חפיפה של 5 דקות לאחור למניעת בעיות סנכרון שעון)
                    byte[] serialNumber = new byte[16];
                    RandomNumberGenerator.Fill(serialNumber);

                    DateTimeOffset notBefore = DateTimeOffset.UtcNow.AddMinutes(-5);
                    DateTimeOffset notAfter = notBefore.AddYears(2);

                    using var issuedCertWithoutKey = serverReq.Create(caCert!, notBefore, notAfter, serialNumber);
                    using var issuedCertWithKey = issuedCertWithoutKey.CopyWithPrivateKey(serverRsa);

                    // ייצוא PFX עם שרשרת התעודה (כולל שרשרת ה-Root CA)
                    var pfxCollection = new X509Certificate2Collection();
                    pfxCollection.Add(issuedCertWithKey);
                    pfxCollection.Add(caCert!);
                    byte[]? pfxBytes = pfxCollection.Export(X509ContentType.Pfx, pfxPassword);
                    if (pfxBytes != null)
                    {
                        File.WriteAllBytes(serverPfxPath, pfxBytes);
                    }

                    // ייצוא CRT ו-KEY בפורמט PEM עבור MediaMTX
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
        /// רושם את ה-Root CA בחנות התעודות של מערכת ההפעלה באופן שקוף לחלוטין.
        /// בווינדוס: מוסיף ל-Trusted Root Certification Authorities (LocalMachine) כדי ש-Chrome ודפדפנים יזהו חיבור מאובטח.
        /// בלינוקס: מעתיק ל-/usr/local/share/ca-certificates/ ומריץ update-ca-certificates אם יש הרשאות.
        /// </summary>
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
                    // 1. בדיקה האם ה-CA כבר קיים בחנות LocalMachine (חנות המכונה הנדרשת עבור Chrome Root Store)
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

                    // יצירת סקריפט התקנה מהיר עם UAC Self-Elevation בלחיצה אחת לצד התעודה
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
                        // ניסיון התקנה אוטומטי מבוסס UAC כאשר האפליקציה רצה בסביבה אינטראקטיבית (Dev/Desktop)
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

                        // ניסיון התקנה לחנות משתמש נוכחי (CurrentUser\Root) כ-fallback
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

                        // הרצת update-ca-certificates אם קיים
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
