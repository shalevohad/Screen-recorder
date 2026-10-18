using System.Linq;
using ITB_SCREEN_RECORDER.Server.Services.Security;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.Server.Security;

public class PermissionKeysTests
{
    [Fact]
    public void All_ContainsNoDuplicatesAndNoEmptyKeys()
    {
        Assert.NotEmpty(PermissionKeys.All);
        var duplicates = PermissionKeys.All.GroupBy(k => k).Where(g => g.Count() > 1).Select(g => g.Key).ToList();
        Assert.Empty(duplicates);

        foreach (var key in PermissionKeys.All)
        {
            Assert.False(string.IsNullOrWhiteSpace(key));
        }
    }

    [Fact]
    public void Catalog_MatchesAllKeysAndContainsCompleteMetadata()
    {
        Assert.NotEmpty(PermissionKeys.Catalog);

        var catalogKeys = PermissionKeys.Catalog.Select(c => c.Key).ToHashSet();
        foreach (var key in PermissionKeys.All)
        {
            Assert.Contains(key, catalogKeys);
        }

        foreach (var item in PermissionKeys.Catalog)
        {
            Assert.False(string.IsNullOrWhiteSpace(item.Key));
            Assert.False(string.IsNullOrWhiteSpace(item.Name));
            Assert.False(string.IsNullOrWhiteSpace(item.Category));
            Assert.False(string.IsNullOrWhiteSpace(item.Description));
        }
    }
}
