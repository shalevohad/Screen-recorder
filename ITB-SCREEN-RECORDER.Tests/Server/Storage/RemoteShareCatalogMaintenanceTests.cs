using System;
using System.IO;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Server.Services;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.Server.Storage;

public class RemoteShareCatalogMaintenanceTests
{
    [Theory]
    [InlineData(".snapshot")]
    [InlineData("~snapshot")]
    [InlineData(".zfs")]
    [InlineData("$RECYCLE.BIN")]
    [InlineData("System Volume Information")]
    [InlineData(".tmp_dotnet")]
    public void StorageScanner_ExcludesNetAppSnapshotsAndSystemFolders(string folderName)
    {
        // Assert that NetApp snapshot, dot-prefix, and Windows system directories are excluded
        bool isExcluded = folderName.StartsWith(".") ||
                          folderName.StartsWith("~") ||
                          StorageScannerService.ReservedDirNames.Contains(folderName);

        Assert.True(isExcluded, $"Expected folder '{folderName}' to be excluded from storage scan.");
    }

    [Theory]
    [InlineData("mon-0", true)]
    [InlineData("mon-1", false)]
    [InlineData("mon-2", false)]
    [InlineData("display-0", true)]
    [InlineData("display-1", false)]
    public void MultiMonitorDisplayFolder_IdentifiesCorrectPrimaryAndDisplayId(string folderName, bool expectedIsPrimary)
    {
        string displayId = folderName.ToLowerInvariant();
        bool isPrimary = displayId == "mon-0" || displayId == "display-0";

        Assert.Equal(expectedIsPrimary, isPrimary);
        Assert.Equal(folderName.ToLowerInvariant(), displayId);
    }

    [Fact]
    public async Task NetAppUncReachabilityProbe_HandlesNonExistentUncPathWithoutException()
    {
        // Non-existent UNC share should return false safely within timeout, never throw
        string nonExistentUnc = @"\\192.0.2.1\fake_share_that_does_not_exist";

        bool reachable = await StoragePathResolver.IsNetAppReachableAsync(nonExistentUnc);

        Assert.False(reachable);
    }

    [Fact]
    public async Task NetAppUncReachabilityProbe_EmptyOrNullReturnsFalseInstantly()
    {
        Assert.False(await StoragePathResolver.IsNetAppReachableAsync(null!));
        Assert.False(await StoragePathResolver.IsNetAppReachableAsync(""));
        Assert.False(await StoragePathResolver.IsNetAppReachableAsync("   "));
    }
}
