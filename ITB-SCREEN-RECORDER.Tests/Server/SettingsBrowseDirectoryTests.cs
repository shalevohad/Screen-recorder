namespace ITB_SCREEN_RECORDER.Tests.Server;

using System;
using System.IO;
using ITB_SCREEN_RECORDER.Server.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

public class SettingsBrowseDirectoryTests
{
    private static SettingsController CreateController()
    {
        var mockLogger = new Mock<ILogger<SettingsController>>();
        return new SettingsController(
            null!,
            null!,
            null!,
            null!,
            null!,
            null!,
            null!,
            null!,
            mockLogger.Object
        );
    }

    [Fact]
    public void BrowseDirectories_WhenPathEmpty_ReturnsRootLogicalDrives()
    {
        // Arrange
        var controller = CreateController();

        // Act
        var result = controller.BrowseDirectories(null);

        // Assert
        var ok = Assert.IsType<OkObjectResult>(result);
        dynamic val = ok.Value!;
        Assert.True((bool)val.isRoot);
        Assert.NotNull(val.drives);
    }

    [Fact]
    public void BrowseDirectories_WithValidDirectory_ReturnsSubdirectories()
    {
        // Arrange
        string tempDir = Path.Combine(Path.GetTempPath(), "ITB_Test_Browse_" + Guid.NewGuid().ToString("N"));
        string subDir1 = Path.Combine(tempDir, "Sub1");
        string subDir2 = Path.Combine(tempDir, "Sub2");

        try
        {
            Directory.CreateDirectory(subDir1);
            Directory.CreateDirectory(subDir2);

            var controller = CreateController();

            // Act
            var result = controller.BrowseDirectories(tempDir);

            // Assert
            var ok = Assert.IsType<OkObjectResult>(result);
            dynamic val = ok.Value!;
            Assert.False((bool)val.isRoot);
            Assert.Equal(tempDir, (string)val.currentPath);
            Assert.True(val.directories.Count >= 2);
        }
        finally
        {
            if (Directory.Exists(tempDir))
            {
                Directory.Delete(tempDir, true);
            }
        }
    }

    [Fact]
    public void CreateDirectory_WithValidPath_CreatesDirectorySuccessfully()
    {
        // Arrange
        string baseDir = Path.Combine(Path.GetTempPath(), "ITB_Test_Create_" + Guid.NewGuid().ToString("N"));

        try
        {
            Directory.CreateDirectory(baseDir);

            var controller = CreateController();

            // Act
            var result = controller.CreateDirectory(new SettingsController.CreateFolderRequest(baseDir, "NewFolder"));

            // Assert
            var ok = Assert.IsType<OkObjectResult>(result);
            dynamic val = ok.Value!;
            Assert.True((bool)val.success);
            string fullPath = (string)val.fullPath;
            Assert.True(Directory.Exists(fullPath));
        }
        finally
        {
            if (Directory.Exists(baseDir))
            {
                Directory.Delete(baseDir, true);
            }
        }
    }
}

