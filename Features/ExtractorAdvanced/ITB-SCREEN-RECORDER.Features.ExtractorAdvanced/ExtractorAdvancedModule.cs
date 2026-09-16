using ITB_SCREEN_RECORDER.Core.Plugins;

namespace ITB_SCREEN_RECORDER.Features.ExtractorAdvanced;

public class ExtractorAdvancedModule : FeatureModuleBase
{
    public override string IconName => "Video";
    public override string ScriptUrl => "/extractor-advanced/extractor-advanced.widget.js";
    public override int DefaultWidth => 8;
    public override int DefaultHeight => 8;
    public override int MinWidth => 4;
    public override int MinHeight => 4;
}