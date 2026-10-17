using System.IO;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Configuration;
using ITB_SCREEN_RECORDER.Server.Services;
using Microsoft.Extensions.Logging.Abstractions;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.Server.Storage;

public class StoragePathResolverTests
{
    [Theory]
    [InlineData(@"C:\ProgramData\ITB-SCREEN-RECORDER\Recordings\", "C:/ProgramData/ITB-SCREEN-RECORDER/Recordings/%path/%s_%f")]
    [InlineData(@"\\nas\share\recordings", "//nas/share/recordings/%path/%s_%f")]
    [InlineData("/var/recordings/", "/var/recordings/%path/%s_%f")]
    public void BuildRecordPath_FormatsExpectedMediaMtxEpochPattern(string root, string expected)
    {
        var resolver = new StoragePathResolver();
        var config = new SystemConfig();

        string recordPath = resolver.BuildRecordPath(root, config);
        Assert.Equal(expected, recordPath);
    }

    [Fact]
    public async Task ResolveActiveRootAsync_WhenNetAppUnreachable_FallsBackToLocal()
    {
        var resolver = new StoragePathResolver();
        string tempLocalPath = Path.Combine(Path.GetTempPath(), "itb_test_fallback_" + Path.GetRandomFileName());

        try
        {
            var storage = new StorageSettings
            {
                NetAppUncPath = @"\\non_existent_nas_host_9999\recordings",
                LocalFallbackPath = tempLocalPath,
                ChunkIntervalMinutes = 5
            };

            string activeRoot = await resolver.ResolveActiveRootAsync(storage, NullLogger.Instance);

            Assert.Equal(tempLocalPath, activeRoot);
            Assert.True(Directory.Exists(tempLocalPath));
        }
        finally
        {
            if (Directory.Exists(tempLocalPath))
            {
                try { Directory.Delete(tempLocalPath, true); } catch { }
            }
        }
    }
}
