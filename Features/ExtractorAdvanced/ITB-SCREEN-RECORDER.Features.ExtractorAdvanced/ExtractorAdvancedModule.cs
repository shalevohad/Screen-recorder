using ITB_SCREEN_RECORDER.Core.Plugins;

namespace ITB_SCREEN_RECORDER.Features.ExtractorAdvanced;

public class ExtractorAdvancedModule : IFeatureModule
{
    public string Id => "extractor-advanced-studio";
    public string Title => "Advanced Studio";
    public string IconName => "Video";
    public string ScriptUrl => "/extractor-advanced/extractor-advanced.widget.js";

    public int DefaultWidth => 8;
    public int DefaultHeight => 8;

    public int MinWidth => 4;
    public int MinHeight => 4;

    public bool IsEnabled => true;
}