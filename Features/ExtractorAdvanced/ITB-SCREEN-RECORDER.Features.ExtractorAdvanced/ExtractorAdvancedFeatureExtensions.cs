using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ITB_SCREEN_RECORDER.Core.Plugins;

namespace ITB_SCREEN_RECORDER.Features.ExtractorAdvanced;

/// <summary>
/// Extension methods for registering ExtractorAdvanced services into the dependency injection container.
/// </summary>
public static class ExtractorAdvancedFeatureExtensions
{
    /// <summary>
    /// Registers ExtractorAdvanced feature module and related services.
    /// </summary>
    /// <param name="services">The service collection.</param>
    /// <param name="configuration">Configuration properties.</param>
    /// <returns>The modified service collection.</returns>
    public static IServiceCollection AddExtractorAdvancedFeature(this IServiceCollection services, IConfiguration configuration)
    {
        // Register feature module for dashboard UI integration (/api/v1/features/active endpoint)
        services.AddSingleton<IFeatureModule, ExtractorAdvancedModule>();

        // TODO: Register upcoming NLE services (TimelineGapCalculator, AccurateCutter, etc.)

        return services;
    }
}