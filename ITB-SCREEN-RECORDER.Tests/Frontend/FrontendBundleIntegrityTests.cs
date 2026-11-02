using System;
using System.Diagnostics;
using System.IO;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.Frontend;

public class FrontendBundleIntegrityTests
{
    private string GetClientDirectory()
    {
        var baseDir = AppContext.BaseDirectory;
        // Search upwards to solution root
        var dir = new DirectoryInfo(baseDir);
        while (dir != null && !File.Exists(Path.Combine(dir.FullName, "ITB-SCREEN-RECORDER.sln")))
        {
            dir = dir.Parent;
        }

        if (dir == null)
        {
            throw new DirectoryNotFoundException("Could not locate solution root from " + baseDir);
        }

        var clientDir = Path.Combine(dir.FullName, "Features", "ExtractorAdvanced", "ITB-SCREEN-RECORDER.Features.ExtractorAdvanced", "Client");
        return clientDir;
    }

    [Fact]
    public void ExtractorAdvanced_WidgetBundle_ExistsAndHasValidArtifacts()
    {
        var clientDir = GetClientDirectory();
        var wwwrootDir = Path.Combine(clientDir, "..", "wwwroot");

        var widgetJsPath = Path.Combine(wwwrootDir, "extractor-advanced.widget.js");
        var styleCssPath = Path.Combine(wwwrootDir, "extractor-advanced.style.css");

        Assert.True(File.Exists(widgetJsPath), $"Compiled bundle missing: {widgetJsPath}");
        Assert.True(File.Exists(styleCssPath), $"Compiled stylesheet missing: {styleCssPath}");

        var jsContent = File.ReadAllText(widgetJsPath);
        Assert.True(jsContent.Length > 100_000, "Bundle size suspiciously small; expected production JS bundle.");

        // Assert known previous error signatures are completely absent from the bundle
        Assert.DoesNotContain("canvasTimeline", jsContent);
    }

    [Fact]
    public void ExtractorAdvanced_ClientSource_PassesEslintWithZeroErrors()
    {
        var clientDir = GetClientDirectory();
        var nodeModules = Path.Combine(clientDir, "node_modules");

        // Only run if node_modules are installed (e.g. during developer / local test runs)
        if (!Directory.Exists(nodeModules))
        {
            return;
        }

        bool isWindows = OperatingSystem.IsWindows();
        var psi = new ProcessStartInfo
        {
            FileName = isWindows ? "cmd.exe" : "npx",
            Arguments = isWindows ? "/c npm run lint" : "run lint",
            WorkingDirectory = clientDir,
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            UseShellExecute = false,
            CreateNoWindow = true
        };

        using var process = new Process { StartInfo = psi };
        process.Start();

        string stdout = process.StandardOutput.ReadToEnd();
        string stderr = process.StandardError.ReadToEnd();
        bool exited = process.WaitForExit(30000);

        if (!exited)
        {
            process.Kill(entireProcessTree: true);
            Assert.Fail("npm run lint timed out after 30 seconds");
        }

        Assert.True(process.ExitCode == 0, $"ESLint failed with code {process.ExitCode}.\nSTDOUT: {stdout}\nSTDERR: {stderr}");
        Assert.Contains("0 errors", stdout);
    }
}
