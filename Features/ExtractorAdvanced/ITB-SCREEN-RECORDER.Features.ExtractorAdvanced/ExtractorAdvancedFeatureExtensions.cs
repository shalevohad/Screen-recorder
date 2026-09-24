using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ITB_SCREEN_RECORDER.Core.Plugins;

namespace ITB_SCREEN_RECORDER.Features.ExtractorAdvanced;

public static class ExtractorAdvancedFeatureExtensions
{
    public static IServiceCollection AddExtractorAdvancedFeature(this IServiceCollection services, IConfiguration configuration)
    {
        // רישום המודול עבור ממשק המשתמש (נקודת הקצה /api/v1/features/active)
        services.AddSingleton<IFeatureModule, ExtractorAdvancedModule>();

        // כאן יירשמו שירותי ה-NLE העתידיים (TimelineGapCalculator, AccurateCutter וכו')

        return services;
    }
}