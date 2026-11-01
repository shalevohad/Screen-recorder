using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security;
using System.Text;
using System.Text.Json;
using System.Xml.Linq;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.Installer;

public class FeatureSelectionSimulatorTests
{
    public class DiscoveredFeatureModel
    {
        public string Id { get; set; } = string.Empty;
        public string DirName { get; set; } = string.Empty;
        public string FullPath { get; set; } = string.Empty;
        public string CleanId => System.Text.RegularExpressions.Regex.Replace(DirName, @"[^a-zA-Z0-9_]", "_");
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public bool IsSelected { get; set; }
        public List<string> Supersedes { get; set; } = new();
        public List<string> RequireTools { get; set; } = new();
    }

    /// <summary>
    /// Headless WinForms dialog simulator for feature selection UI.
    /// Simulates clicks, locking, Select All / Clear All actions, and supersedes resolution without spinning up a graphical UI.
    /// </summary>
    public class FeatureSelectionDialogSimulator
    {
        public class FeatureCard
        {
            public DiscoveredFeatureModel Feature { get; set; } = null!;
            public bool Checked { get; set; }
            public bool Enabled { get; set; } = true;
            public string DisplayTitle { get; set; } = string.Empty;
            public bool IsSuperseded => !Enabled && DisplayTitle.EndsWith("(Superseded)");
        }

        public List<FeatureCard> Cards { get; } = new();

        public FeatureSelectionDialogSimulator(IEnumerable<DiscoveredFeatureModel> features)
        {
            foreach (var f in features)
            {
                Cards.Add(new FeatureCard
                {
                    Feature = f,
                    Checked = f.IsSelected,
                    Enabled = true,
                    DisplayTitle = f.Title
                });
            }
            EvaluateSupersedes();
        }

        public void ClickFeatureCard(string dirName)
        {
            var card = Cards.FirstOrDefault(c => c.Feature.DirName.Equals(dirName, StringComparison.OrdinalIgnoreCase));
            if (card != null && card.Enabled)
            {
                card.Checked = !card.Checked;
                EvaluateSupersedes();
            }
        }

        public void ClickSelectAll()
        {
            foreach (var c in Cards)
            {
                if (c.Enabled) c.Checked = true;
            }
            EvaluateSupersedes();
        }

        public void ClickClearAll()
        {
            foreach (var c in Cards)
            {
                if (c.Enabled) c.Checked = false;
            }
            EvaluateSupersedes();
        }

        public void EvaluateSupersedes()
        {
            // Collect IDs superseded by currently checked features
            var supIds = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
            foreach (var c in Cards)
            {
                if (c.Checked && c.Feature.Supersedes != null)
                {
                    foreach (var s in c.Feature.Supersedes) supIds.Add(s);
                }
            }

            // Update card states in simulator
            foreach (var c in Cards)
            {
                if (supIds.Contains(c.Feature.Id))
                {
                    c.Checked = false;
                    c.Enabled = false;
                    c.DisplayTitle = $"{c.Feature.Title} (Superseded)";
                }
                else
                {
                    c.Enabled = true;
                    c.DisplayTitle = c.Feature.Title;
                }
            }
        }

        public IReadOnlyList<DiscoveredFeatureModel> GetEffectiveSelectedFeatures()
        {
            return Cards.Where(c => c.Checked).Select(c => c.Feature).ToList();
        }
    }

    private static string GenerateWxsFragment(IEnumerable<DiscoveredFeatureModel> selectedFeatures)
    {
        var sb = new StringBuilder();
        sb.AppendLine("<?xml version=\"1.0\" encoding=\"utf-8\"?>");
        sb.AppendLine("<Wix xmlns=\"http://wixtoolset.org/schemas/v4/wxs\">");
        sb.AppendLine("  <Fragment>");
        sb.AppendLine("    <FeatureGroup Id=\"DynamicModularFeatures\">");

        foreach (var feat in selectedFeatures)
        {
            string escTitle = SecurityElement.Escape(feat.Title) ?? feat.Title;
            string escDesc = SecurityElement.Escape(feat.Description) ?? feat.Description;
            sb.AppendLine($"      <Feature Id=\"Feature_{feat.CleanId}\" Title=\"{escTitle}\" Description=\"{escDesc}\" Level=\"1\" Display=\"expand\" AllowAbsent=\"yes\" InstallDefault=\"local\" TypicalDefault=\"install\">");
            sb.AppendLine($"        <ComponentGroupRef Id=\"FeatureGroup_{feat.CleanId}\" />");
            sb.AppendLine("      </Feature>");
        }
        sb.AppendLine("    </FeatureGroup>");

        var list = selectedFeatures.ToList();
        if (list.Count > 0)
        {
            sb.AppendLine("    <DirectoryRef Id=\"INSTALLFOLDER\">");
            sb.AppendLine("      <Directory Id=\"FeaturesBaseFolder\" Name=\"Features\">");
            foreach (var feat in list)
            {
                sb.AppendLine($"        <Directory Id=\"Dir_{feat.CleanId}\" Name=\"{feat.DirName}\" />");
            }
            sb.AppendLine("      </Directory>");
            sb.AppendLine("    </DirectoryRef>");

            foreach (var feat in list)
            {
                sb.AppendLine($"    <ComponentGroup Id=\"FeatureGroup_{feat.CleanId}\" Directory=\"Dir_{feat.CleanId}\">");
                sb.AppendLine($"      <Files Include=\"$(var.FeaturesDir)\\{feat.DirName}\\**\" />");
                sb.AppendLine("    </ComponentGroup>");
            }
        }

        sb.AppendLine("  </Fragment>");
        sb.AppendLine("</Wix>");
        return sb.ToString();
    }

    #region Manifest Discovery & Parsing Tests

    [Fact]
    public void RealFeatures_FeatureJsonFiles_ExistAndAreValidJson()
    {
        string solutionRoot = Path.GetFullPath(Path.Combine(AppContext.BaseDirectory, "..", "..", "..", ".."));
        string featuresDir = Path.Combine(solutionRoot, "Features");

        if (!Directory.Exists(featuresDir)) return; // Pass if run in environments without repo checkout

        var manifests = Directory.GetFiles(featuresDir, "feature.json", SearchOption.AllDirectories);
        Assert.NotEmpty(manifests);

        foreach (var manifestPath in manifests)
        {
            string content = File.ReadAllText(manifestPath);
            using var doc = JsonDocument.Parse(content);
            var root = doc.RootElement;

            Assert.True(root.TryGetProperty("id", out var idProp));
            Assert.False(string.IsNullOrWhiteSpace(idProp.GetString()));

            Assert.True(root.TryGetProperty("description", out var descProp));
            Assert.False(string.IsNullOrWhiteSpace(descProp.GetString()));
        }
    }

    #endregion

    #region UI Dialog Simulation (Headless) Tests

    [Fact]
    public void DialogSimulation_InitialState_HonorsDefaultSelected()
    {
        var features = new List<DiscoveredFeatureModel>
        {
            new() { Id = "extractor-slicer", DirName = "Extractor", Title = "Session Extractor", IsSelected = true },
            new() { Id = "extractor-advanced-studio", DirName = "ExtractorAdvanced", Title = "Editing & Export Studio", IsSelected = false, Supersedes = new() { "extractor-slicer" } }
        };

        var dialog = new FeatureSelectionDialogSimulator(features);

        var baseCard = dialog.Cards.First(c => c.Feature.Id == "extractor-slicer");
        var advCard = dialog.Cards.First(c => c.Feature.Id == "extractor-advanced-studio");

        Assert.True(baseCard.Checked);
        Assert.True(baseCard.Enabled);
        Assert.False(baseCard.IsSuperseded);

        Assert.False(advCard.Checked);
        Assert.True(advCard.Enabled);
    }

    [Fact]
    public void DialogSimulation_SelectingAdvancedFeature_SupersedesBaseFeatureAutomatically()
    {
        var features = new List<DiscoveredFeatureModel>
        {
            new() { Id = "extractor-slicer", DirName = "Extractor", Title = "Session Extractor", IsSelected = true },
            new() { Id = "extractor-advanced-studio", DirName = "ExtractorAdvanced", Title = "Editing & Export Studio", IsSelected = false, Supersedes = new() { "extractor-slicer" } }
        };

        var dialog = new FeatureSelectionDialogSimulator(features);

        // Click the checkbox / card for ExtractorAdvanced
        dialog.ClickFeatureCard("ExtractorAdvanced");

        var baseCard = dialog.Cards.First(c => c.Feature.Id == "extractor-slicer");
        var advCard = dialog.Cards.First(c => c.Feature.Id == "extractor-advanced-studio");

        // Advanced is now checked
        Assert.True(advCard.Checked);

        // Base feature is locked and superseded
        Assert.False(baseCard.Checked);
        Assert.False(baseCard.Enabled);
        Assert.True(baseCard.IsSuperseded);
        Assert.Equal("Session Extractor (Superseded)", baseCard.DisplayTitle);

        // Only Advanced feature is effectively selected
        var effective = dialog.GetEffectiveSelectedFeatures();
        Assert.Single(effective);
        Assert.Equal("extractor-advanced-studio", effective[0].Id);
    }

    [Fact]
    public void DialogSimulation_UncheckingAdvancedFeature_RestoresBaseFeature()
    {
        var features = new List<DiscoveredFeatureModel>
        {
            new() { Id = "extractor-slicer", DirName = "Extractor", Title = "Session Extractor", IsSelected = true },
            new() { Id = "extractor-advanced-studio", DirName = "ExtractorAdvanced", Title = "Editing & Export Studio", IsSelected = false, Supersedes = new() { "extractor-slicer" } }
        };

        var dialog = new FeatureSelectionDialogSimulator(features);

        // Check Advanced
        dialog.ClickFeatureCard("ExtractorAdvanced");
        Assert.False(dialog.Cards.First(c => c.Feature.Id == "extractor-slicer").Enabled);

        // Uncheck Advanced
        dialog.ClickFeatureCard("ExtractorAdvanced");

        var baseCard = dialog.Cards.First(c => c.Feature.Id == "extractor-slicer");
        Assert.True(baseCard.Enabled);
        Assert.False(baseCard.IsSuperseded);
        Assert.Equal("Session Extractor", baseCard.DisplayTitle);
    }

    [Fact]
    public void DialogSimulation_SelectAllButton_ActivatesHigherTierWithoutConflicts()
    {
        var features = new List<DiscoveredFeatureModel>
        {
            new() { Id = "feat-base", DirName = "BaseFeature", Title = "Base Feature", IsSelected = false },
            new() { Id = "feat-pro", DirName = "ProFeature", Title = "Pro Feature", IsSelected = false, Supersedes = new() { "feat-base" } },
            new() { Id = "feat-independent", DirName = "IndependentFeature", Title = "Independent", IsSelected = false }
        };

        var dialog = new FeatureSelectionDialogSimulator(features);
        dialog.ClickSelectAll();

        var baseCard = dialog.Cards.First(c => c.Feature.Id == "feat-base");
        var proCard = dialog.Cards.First(c => c.Feature.Id == "feat-pro");
        var indCard = dialog.Cards.First(c => c.Feature.Id == "feat-independent");

        Assert.True(proCard.Checked);
        Assert.True(indCard.Checked);
        Assert.False(baseCard.Checked); // Superseded by Pro
        Assert.True(baseCard.IsSuperseded);

        var effective = dialog.GetEffectiveSelectedFeatures();
        Assert.Equal(2, effective.Count);
        Assert.Contains(effective, f => f.Id == "feat-pro");
        Assert.Contains(effective, f => f.Id == "feat-independent");
    }

    [Fact]
    public void DialogSimulation_ClearAllButton_UnchecksAllOptions()
    {
        var features = new List<DiscoveredFeatureModel>
        {
            new() { Id = "f1", DirName = "F1", Title = "F1", IsSelected = true },
            new() { Id = "f2", DirName = "F2", Title = "F2", IsSelected = true }
        };

        var dialog = new FeatureSelectionDialogSimulator(features);
        dialog.ClickClearAll();

        Assert.All(dialog.Cards, c => Assert.False(c.Checked));
        Assert.Empty(dialog.GetEffectiveSelectedFeatures());
    }

    #endregion

    #region WXS Generation Simulation Tests

    [Fact]
    public void GenerateWxsFragment_EscapesXmlEntitiesInTitlesAndDescriptions()
    {
        var selected = new List<DiscoveredFeatureModel>
        {
            new()
            {
                Id = "studio",
                DirName = "Studio",
                Title = "Editing & Export <Studio>",
                Description = "Fast \"non-linear\" cutter & exporter"
            }
        };

        string wxsXml = GenerateWxsFragment(selected);

        // Verify valid XML parsing
        var xmlDoc = XDocument.Parse(wxsXml);
        Assert.NotNull(xmlDoc.Root);

        // Verify characters were escaped
        Assert.Contains("Editing &amp; Export &lt;Studio&gt;", wxsXml);
        Assert.Contains("Fast &quot;non-linear&quot; cutter &amp; exporter", wxsXml);
    }

    [Fact]
    public void GenerateWxsFragment_ContainsDynamicFeatureGroupAndDirectoryRefs()
    {
        var selected = new List<DiscoveredFeatureModel>
        {
            new()
            {
                Id = "extractor-slicer",
                DirName = "Extractor",
                Title = "Session Extractor",
                Description = "Video slicer"
            }
        };

        string wxsXml = GenerateWxsFragment(selected);
        var xmlDoc = XDocument.Parse(wxsXml);

        XNamespace ns = "http://wixtoolset.org/schemas/v4/wxs";
        var featureGroup = xmlDoc.Descendants(ns + "FeatureGroup").FirstOrDefault();
        Assert.NotNull(featureGroup);
        Assert.Equal("DynamicModularFeatures", featureGroup.Attribute("Id")?.Value);

        var feature = featureGroup.Descendants(ns + "Feature").FirstOrDefault();
        Assert.NotNull(feature);
        Assert.Equal("Feature_Extractor", feature.Attribute("Id")?.Value);
        Assert.Equal("Session Extractor", feature.Attribute("Title")?.Value);

        var compGroup = xmlDoc.Descendants(ns + "ComponentGroup").FirstOrDefault();
        Assert.NotNull(compGroup);
        Assert.Equal("FeatureGroup_Extractor", compGroup.Attribute("Id")?.Value);
    }

    [Fact]
    public void GenerateWxsFragment_WithEmptySelection_GeneratesEmptyFeatureGroup()
    {
        string wxsXml = GenerateWxsFragment(Array.Empty<DiscoveredFeatureModel>());
        var xmlDoc = XDocument.Parse(wxsXml);

        XNamespace ns = "http://wixtoolset.org/schemas/v4/wxs";
        var featureGroup = xmlDoc.Descendants(ns + "FeatureGroup").FirstOrDefault();
        Assert.NotNull(featureGroup);
        Assert.Empty(featureGroup.Elements());
        Assert.Empty(xmlDoc.Descendants(ns + "DirectoryRef"));
    }

    #endregion
}
