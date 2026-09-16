using ITB_SCREEN_RECORDER.Core.Plugins;

namespace ITB_SCREEN_RECORDER.Features.Extractor
{
    public class ExtractorModule : FeatureModuleBase
    {
        // המאפיינים Id, Title, ו-SupersedesIds נשאבים כעת אוטומטית 
        // מקובץ ה-feature.json המוטמע ב-DLL דרך מחלקת הבסיס.

        public override string IconName => "Film";
        public override string ScriptUrl => "/extractor/extractor.widget.js";

        public override int DefaultWidth => 4;
        public override int DefaultHeight => 6;

        public override int MinWidth => 3;
        public override int MinHeight => 4;

        // הערה: IsEnabled כבר מוגדר כ-true ב-FeatureModuleBase, לכן אין חובה לדרוס אותו כאן.
    }
}