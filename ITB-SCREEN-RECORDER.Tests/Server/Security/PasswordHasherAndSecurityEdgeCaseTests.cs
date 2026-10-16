using System;
using ITB_SCREEN_RECORDER.Server.Services.Security;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.Server.Security;

public class PasswordHasherAndSecurityEdgeCaseTests
{
    [Fact]
    public void PasswordHasher_UnicodeAndHebrewAndEmojis_HashesAndVerifiesSuccessfully()
    {
        string complexPassword = "סיסמת_מנהל_סודית_2026_🔒_בטוחה!";
        string hash = PasswordHasher.Hash(complexPassword);

        Assert.True(PasswordHasher.Verify(complexPassword, hash));
        Assert.False(PasswordHasher.Verify("סיסמת_מנהל_סודית_2026_🔒_שגויה", hash));
    }

    [Fact]
    public void PasswordHasher_VeryLongPassword_5000Chars_HandledWithoutIssue()
    {
        string longPassword = new string('A', 5000) + "!@#123";
        string hash = PasswordHasher.Hash(longPassword);

        Assert.True(PasswordHasher.Verify(longPassword, hash));
    }

    [Fact]
    public void PasswordHasher_TamperedHash_SingleBitFlipped_VerificationFails()
    {
        string password = "AuthenticPassword123";
        string hash = PasswordHasher.Hash(password);

        var parts = hash.Split('.');
        // Flip one character in the hash segment
        char flipped = parts[2][0] == 'A' ? 'B' : 'A';
        string tamperedSegment = flipped + parts[2].Substring(1);
        string tamperedHash = $"{parts[0]}.{parts[1]}.{tamperedSegment}";

        Assert.False(PasswordHasher.Verify(password, tamperedHash));
    }

    [Theory]
    [InlineData("0.c2FsdA==.aGFzaA==")]
    [InlineData("-1000.c2FsdA==.aGFzaA==")]
    [InlineData("100000.invalid_base64!!!.validbase64==")]
    [InlineData("100000.c2FsdA==.invalid_hash_base64$$$")]
    [InlineData("100000.c2FsdA==.aGFzaA==.extra_segment")]
    public void PasswordHasher_CorruptedOrTamperedMetadata_ReturnsFalseGracefully(string corruptedHash)
    {
        // Must not throw unhandled FormatException / CryptographicException
        bool verified = PasswordHasher.Verify("any_password", corruptedHash);
        Assert.False(verified);
    }

    [Fact]
    public void LdapEndpointHelper_Ipv6Addresses_ParsedCorrectly()
    {
        var (host, port) = LdapEndpointHelper.ParseEndpoint("[::1]:389", 0, false);
        Assert.Equal("[::1]", host);
        Assert.Equal(389, port);

        var (hostSsl, portSsl) = LdapEndpointHelper.ParseEndpoint("ldaps://[2001:db8::1]:636", 0, true);
        Assert.Equal("[2001:db8::1]", hostSsl);
        Assert.Equal(636, portSsl);
    }

    [Fact]
    public void LdapEndpointHelper_ComplexInjectionPayload_AllSpecialCharsEscaped()
    {
        string payload = @"admin*)(|(objectclass=*))(\0";
        string escaped = LdapEndpointHelper.EscapeFilter(payload);

        // Every * must become \2a, ( becomes \28, ) becomes \29, \0 becomes \00, \ becomes \5c
        Assert.DoesNotContain("*", escaped);
        Assert.DoesNotContain("(", escaped);
        Assert.DoesNotContain(")", escaped);
        Assert.Contains(@"\2a", escaped);
        Assert.Contains(@"\28", escaped);
        Assert.Contains(@"\29", escaped);
    }

    [Fact]
    public void LdapEndpointHelper_ExtractDomain_WithWhitespacesAndMixedCase()
    {
        string baseDn = "  ou = Users , DC = SubDomain , dc = Corp , DC = com  ";
        string? domain = LdapEndpointHelper.ExtractDomainFromBaseDn(baseDn);

        Assert.Equal("SubDomain.Corp.com", domain);
    }
}
