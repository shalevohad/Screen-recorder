using ITB_SCREEN_RECORDER.Core.Plugins;

namespace ITB_SCREEN_RECORDER.Features.Extractor
{
    /// <summary>
    /// Feature plugin module descriptor for the Extractor UI widget and dashboard integration.
    /// </summary>
    public class ExtractorModule : FeatureModuleBase
    {
        // Note: The Id, Title, and SupersedesIds properties are loaded automatically
        // from the embedded feature.json manifest via the FeatureModuleBase class.

        public override string IconName => "Film";
        public override string ScriptUrl => "/extractor/extractor.widget.js";

        public override int DefaultWidth => 4;
        public override int DefaultHeight => 6;

        public override int MinWidth => 3;
        public override int MinHeight => 4;

        // Note: IsEnabled defaults to true in FeatureModuleBase.
    }
}