using ITB_SCREEN_RECORDER.Server.Core.Plugins;

namespace ITB_SCREEN_RECORDER.Server.Features.Extractor
{
    public class ExtractorModule : IFeatureModule
    {
        public string Id => "extractor-slicer";
        public string Title => "Session Slicer";
        public string IconName => "Film";
        public string ScriptUrl => "/extractor/extractor.widget.js";
        public int DefaultWidth => 4;
        public int DefaultHeight => 6;
        public int MinWidth => 3;
        public int MinHeight => 4;
        public bool IsEnabled => true;
    }
}