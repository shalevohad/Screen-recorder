namespace ITB_SCREEN_RECORDER.Core.Configuration
{
    public static class ConfigValidationRules
    {
        public const string BitrateRegex = @"^[1-9][0-9]*([kKmM])?$";
        public const string BitrateErrorMessage = "DefaultVideoBitrate must be a valid format (e.g., '2500k', '2500', '5M').";
    }
}