using System.IO;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Configuration;
using ITB_SCREEN_RECORDER.Server.Services;
using Microsoft.Extensions.Logging.Abstractions;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.Server.Storage;

public class StoragePathResolverEdgeCaseTests
{
    private readonly StoragePathResolver _resolver = new();
    private readonly SystemConfig _config = new();

    [Theory]
    [InlineData("  C:\\Recordings\\  ", "C:/Recordings/%path/%s_%f")]
    [InlineData("C:\\\\Recordings\\\\", "C://Recordings/%path/%s_%f")]
    [InlineData(@"\\nas\share\folder\", "//nas/share/folder/%path/%s_%f")]
    [InlineData(@"C:\הקלטות\רשת\", "C:/הקלטות/רשת/%path/%s_%f")]
    public void BuildRecordPath_SlashesAndWhitespace_SanitizedProperly(string inputRoot, string expected)
    {
        string path = _resolver.BuildRecordPath(inputRoot.Trim(), _config);
        Assert.Equal(expected, path);
    }

    [Theory]
    [InlineData("")]
    [InlineData("   ")]
    [InlineData(null)]
    public async Task ResolveActiveRootAsync_NullOrEmptyNetAppPath_ImmediatelyUsesFallback(string? emptyPath)
    {
        string localFallback = Path.Combine(Path.GetTempPath(), "itb_fallback_empty_check_" + Path.GetRandomFileName());
        try
        {
            var storage = new StorageSettings
            {
                NetAppUncPath = emptyPath!,
                LocalFallbackPath = localFallback
            };

            string active = await _resolver.ResolveActiveRootAsync(storage, NullLogger.Instance);

            Assert.Equal(localFallback, active);
            Assert.True(Directory.Exists(localFallback));
        }
        finally
        {
            if (Directory.Exists(localFallback))
            {
                try { Directory.Delete(localFallback, true); } catch { }
            }
        }
    }
}
