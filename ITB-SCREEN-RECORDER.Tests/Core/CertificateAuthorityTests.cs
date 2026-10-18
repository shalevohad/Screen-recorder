using System;
using System.IO;
using System.Net.Http;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
using ITB_SCREEN_RECORDER.Core.Security.Pki;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.Core;

public class CertificateAuthorityTests
{
    [Fact]
    public void ResolveCertificatesDirectory_ReturnsValidDirectory()
    {
        string dir = CertificateAuthorityManager.ResolveCertificatesDirectory();
        Assert.False(string.IsNullOrWhiteSpace(dir));
        Assert.True(Directory.Exists(dir));
    }

    [Fact]
    public void EnsureCertificates_GeneratesValidBundle()
    {
        var bundle = CertificateAuthorityManager.EnsureCertificates(new[] { "test-station", "10.0.0.99" });

        Assert.NotNull(bundle);
        Assert.NotNull(bundle.ServerCertificate);
        Assert.NotNull(bundle.RootCaCertificate);
        Assert.True(File.Exists(bundle.ServerCrtPath));
        Assert.True(File.Exists(bundle.ServerKeyPath));
        Assert.True(File.Exists(bundle.RootCaCrtPath));

        // Verify Root CA subject and validity
        Assert.Contains("CN=ITB Screen Recorder Enterprise Root CA", bundle.RootCaCertificate.Subject);
        Assert.True(bundle.RootCaCertificate.NotAfter > DateTime.UtcNow);

        // Verify Server certificate subject and issuer
        Assert.Contains("CN=ITB-SCREEN-RECORDER Server", bundle.ServerCertificate.Subject);
        Assert.Contains("CN=ITB Screen Recorder Enterprise Root CA", bundle.ServerCertificate.Issuer);
        Assert.True(bundle.ServerCertificate.NotAfter > DateTime.UtcNow);
    }

    [Fact]
    public void AgentCertificateValidator_WithValidServerCertificate_ReturnsTrue()
    {
        var bundle = CertificateAuthorityManager.EnsureCertificates();
        using var request = new HttpRequestMessage();

        bool isValid = AgentCertificateValidator.ValidateServerCertificate(
            request,
            bundle.ServerCertificate,
            null,
            SslPolicyErrors.None);

        Assert.True(isValid);
    }

    [Fact]
    public void AgentCertificateValidator_WithNullCertificate_ReturnsFalse()
    {
        using var request = new HttpRequestMessage();
        bool isValid = AgentCertificateValidator.ValidateServerCertificate(
            request,
            null,
            null,
            SslPolicyErrors.RemoteCertificateNotAvailable);

        Assert.False(isValid);
    }
}
