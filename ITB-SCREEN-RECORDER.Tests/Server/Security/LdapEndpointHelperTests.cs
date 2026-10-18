using ITB_SCREEN_RECORDER.Server.Services.Security;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.Server.Security;

public class LdapEndpointHelperTests
{
    [Theory]
    [InlineData("ldap://dc01.corp.internal:389", 0, false, "dc01.corp.internal", 389)]
    [InlineData("ldaps://dc02.corp.internal:636/", 0, true, "dc02.corp.internal", 636)]
    [InlineData("dc03.corp.internal", 0, true, "dc03.corp.internal", 636)]
    [InlineData("dc03.corp.internal", 0, false, "dc03.corp.internal", 389)]
    [InlineData("dc04.corp.internal", 10389, false, "dc04.corp.internal", 10389)]
    [InlineData("ldap://192.168.1.50:3268", 389, false, "192.168.1.50", 3268)]
    [InlineData(null, 389, false, "127.0.0.1", 389)]
    [InlineData("", 636, true, "127.0.0.1", 636)]
    public void ParseEndpoint_ReturnsExpectedHostAndPort(
        string? rawServer,
        int configuredPort,
        bool useSsl,
        string expectedHost,
        int expectedPort)
    {
        var (host, port) = LdapEndpointHelper.ParseEndpoint(rawServer, configuredPort, useSsl);
        Assert.Equal(expectedHost, host);
        Assert.Equal(expectedPort, port);
    }

    [Theory]
    [InlineData("OU=Users,DC=corp,DC=internal", "corp.internal")]
    [InlineData("OU=Computers,OU=HQ,DC=ad,DC=company,DC=com", "ad.company.com")]
    [InlineData("CN=Administrator,CN=Users", null)]
    [InlineData("", null)]
    [InlineData(null, null)]
    public void ExtractDomainFromBaseDn_ExtractsCorrectDnsDomain(string? baseDn, string? expectedDomain)
    {
        string? result = LdapEndpointHelper.ExtractDomainFromBaseDn(baseDn);
        Assert.Equal(expectedDomain, result);
    }

    [Theory]
    [InlineData("admin*", @"admin\2a")]
    [InlineData("user(test)", @"user\28test\29")]
    [InlineData(@"domain\user", @"domain\5cuser")]
    [InlineData("test/slash", @"test\2fslash")]
    [InlineData("normal_username", "normal_username")]
    [InlineData("", "")]
    [InlineData(null, "")]
    public void EscapeFilter_SanitizesLdapSpecialCharacters(string? input, string expected)
    {
        string escaped = LdapEndpointHelper.EscapeFilter(input!);
        Assert.Equal(expected, escaped);
    }
}
