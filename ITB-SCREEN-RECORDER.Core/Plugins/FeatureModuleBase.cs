using System;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;

namespace ITB_SCREEN_RECORDER.Core.Plugins
{
    public abstract class FeatureModuleBase : IFeatureModule
    {
        public string Id { get; }
        public string Title { get; }
        public string[] SupersedesIds { get; }

        public abstract string IconName { get; }
        public abstract string ScriptUrl { get; }
        public abstract int DefaultWidth { get; }
        public abstract int DefaultHeight { get; }
        public abstract int MinWidth { get; }
        public abstract int MinHeight { get; }
        public virtual bool IsEnabled => true;

        protected FeatureModuleBase()
        {
            var assembly = this.GetType().Assembly;

            // 1. חיפוש חסין מערכות הפעלה (התעלמות מ-Case Sensitivity בלינוקס)
            var resourceName = assembly.GetManifestResourceNames()
                .FirstOrDefault(n => n.EndsWith("feature.json", StringComparison.OrdinalIgnoreCase));

            if (string.IsNullOrEmpty(resourceName))
            {
                throw new FileNotFoundException($"[Core] Missing embedded 'feature.json' in feature assembly: {assembly.GetName().Name}");
            }

            using var stream = assembly.GetManifestResourceStream(resourceName);

            // 2. הגדרת קידוד מפורש ל-UTF8 למניעת קריסות BOM בלינוקס
            using var reader = new StreamReader(stream!, Encoding.UTF8);
            var jsonString = reader.ReadToEnd();

            using var doc = JsonDocument.Parse(jsonString);
            var root = doc.RootElement;

            // 3. חילוץ Case-Insensitive בטוח
            Id = GetJsonPropertyCaseInsensitive(root, "id")?.GetString() ?? throw new Exception("Manifest missing 'id'");

            Title = GetJsonPropertyCaseInsensitive(root, "name")?.GetString() ??
                   (GetJsonPropertyCaseInsensitive(root, "title")?.GetString() ?? "Unknown Feature");

            var supersedesProp = GetJsonPropertyCaseInsensitive(root, "supersedes");
            if (supersedesProp.HasValue && supersedesProp.Value.ValueKind == JsonValueKind.Array)
            {
                SupersedesIds = supersedesProp.Value.EnumerateArray().Select(e => e.GetString()!).ToArray();
            }
            else
            {
                SupersedesIds = Array.Empty<string>();
            }
        }

        // פונקציית עזר קריטית לסביבות לינוקס: מאפשרת גמישות אם במניפסט נכתב "Id" במקום "id"
        private JsonElement? GetJsonPropertyCaseInsensitive(JsonElement element, string propertyName)
        {
            foreach (var prop in element.EnumerateObject())
            {
                if (string.Equals(prop.Name, propertyName, StringComparison.OrdinalIgnoreCase))
                {
                    return prop.Value;
                }
            }
            return null;
        }
    }
}