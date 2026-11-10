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
        while (dir != null && dir.GetFiles("*.sln").Length == 0)
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
            FileName = isWindows ? "cmd.exe" : "npm",
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

    [Fact]
    public void ExtractorAdvanced_CanvasStageFrame_EnforcesMinDimensionsAndNonCollapsedStyles()
    {
        var clientDir = GetClientDirectory();
        var wwwrootDir = Path.Combine(clientDir, "..", "wwwroot");
        var styleCssPath = Path.Combine(wwwrootDir, "extractor-advanced.style.css");

        Assert.True(File.Exists(styleCssPath), $"Stylesheet missing: {styleCssPath}");
        var cssContent = File.ReadAllText(styleCssPath);

        // Verify min dimensions exist to prevent canvas collapsing to 4px/0px
        Assert.Contains("min-height:240px", cssContent.Replace(" ", ""));
        Assert.Contains("min-height:180px", cssContent.Replace(" ", ""));
        Assert.Contains("min-width:320px", cssContent.Replace(" ", ""));

        // Verify scss source directly has min-height and min-width constraints
        var scssPath = Path.Combine(clientDir, "src", "components", "Viewport", "MulticamViewport.scss");
        Assert.True(File.Exists(scssPath), $"SCSS missing: {scssPath}");
        var scssContent = File.ReadAllText(scssPath);

        Assert.Contains("min-height: 240px;", scssContent);
        Assert.Contains("min-height: 180px;", scssContent);
        Assert.Contains("min-width: 320px;", scssContent);
    }

    [Fact]
    public void ExtractorAdvanced_CanvasResponsiveEngine_HasResizeObserverAndStationFallback()
    {
        var clientDir = GetClientDirectory();
        var wwwrootDir = Path.Combine(clientDir, "..", "wwwroot");
        var widgetJsPath = Path.Combine(wwwrootDir, "extractor-advanced.widget.js");

        Assert.True(File.Exists(widgetJsPath), $"Compiled bundle missing: {widgetJsPath}");
        var jsContent = File.ReadAllText(widgetJsPath);

        // Verify ResizeObserver responsive logic is bundled
        Assert.Contains("ResizeObserver", jsContent);

        // Verify source files directly
        var viewportJsxPath = Path.Combine(clientDir, "src", "components", "Viewport", "MulticamViewport.jsx");
        var feedJsxPath = Path.Combine(clientDir, "src", "components", "Viewport", "views", "Feed", "CameraCardFeed.jsx");

        Assert.True(File.Exists(viewportJsxPath), $"Viewport JSX missing: {viewportJsxPath}");
        Assert.True(File.Exists(feedJsxPath), $"Feed JSX missing: {feedJsxPath}");

        var viewportContent = File.ReadAllText(viewportJsxPath);
        var feedContent = File.ReadAllText(feedJsxPath);

        Assert.Contains("stageWrapperRef", viewportContent);
        Assert.Contains("canvasFrameDimensions", viewportContent);
        Assert.Contains("station.hostname || station.name || station.id", feedContent);
    }

    [Fact]
    public void ExtractorAdvanced_NleTimelineEngine_PassesNodeTestSuiteWithZeroErrors()
    {
        var clientDir = GetClientDirectory();
        var nodeModules = Path.Combine(clientDir, "node_modules");

        if (!Directory.Exists(nodeModules))
        {
            return;
        }

        bool isWindows = OperatingSystem.IsWindows();
        var psi = new ProcessStartInfo
        {
            FileName = isWindows ? "cmd.exe" : "npm",
            Arguments = isWindows ? "/c npm test" : "test",
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
            Assert.Fail("npm test timed out after 30 seconds");
        }

        Assert.True(process.ExitCode == 0, $"Node test suite failed with code {process.ExitCode}.\nSTDOUT: {stdout}\nSTDERR: {stderr}");
        Assert.Contains("fail 0", stdout);
        Assert.Contains("pass", stdout);
    }

    [Fact]
    public void ExtractorAdvanced_NleTimelineEngine_KeyframeInspectorAndStyles_BundledInArtifacts()
    {
        var clientDir = GetClientDirectory();
        var wwwrootDir = Path.Combine(clientDir, "..", "wwwroot");

        var widgetJsPath = Path.Combine(wwwrootDir, "extractor-advanced.widget.js");
        var styleCssPath = Path.Combine(wwwrootDir, "extractor-advanced.style.css");

        Assert.True(File.Exists(widgetJsPath), $"Compiled bundle missing: {widgetJsPath}");
        Assert.True(File.Exists(styleCssPath), $"Compiled stylesheet missing: {styleCssPath}");

        var jsContent = File.ReadAllText(widgetJsPath);
        var cssContent = File.ReadAllText(styleCssPath);

        // Verify NLE engine source implementation exists
        var enginePath = Path.Combine(clientDir, "src", "utils", "nleTimelineEngine.js");
        Assert.True(File.Exists(enginePath), $"NLE Timeline Engine source missing: {enginePath}");
        var engineContent = File.ReadAllText(enginePath);
        Assert.Contains("synthesizeAutoKeyframe", engineContent);
        Assert.Contains("interpolateKeyframePlacements", engineContent);
        Assert.Contains("resolveActiveKeyframeIndex", engineContent);

        // Verify key NLE properties are compiled into production bundle
        Assert.Contains("transitionDurationSec", jsContent);
        Assert.Contains("transitionType", jsContent);

        // Verify tactical styling tokens for keyframe inspector are present
        Assert.Contains("keyframe-inspector-group", cssContent);
        Assert.Contains("kf-inspector-badge", cssContent);
    }
}
