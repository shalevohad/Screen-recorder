// ==========================================
// File: Features/ExtractorAdvanced/ExtractorAdvancedHostingStartup.cs
// ==========================================
using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using ITB_SCREEN_RECORDER.Core.Abstractions;
using ITB_SCREEN_RECORDER.Core.Plugins;
using ITB_SCREEN_RECORDER.Features.Extractor.Models;
using ITB_SCREEN_RECORDER.Features.Extractor.Services;
using ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Data;
using ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Data.Repositories;
using ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Services;

[assembly: HostingStartup(typeof(ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.ExtractorAdvancedHostingStartup))]

namespace ITB_SCREEN_RECORDER.Features.ExtractorAdvanced
{
    /// <summary>
    /// Autonomous hosting startup for the ExtractorAdvanced (Forensic Studio / NLE) plugin assembly.
    /// Configures SQLite persistence, repositories, retention shield, and overrides core extraction services.
    /// </summary>
    public class ExtractorAdvancedHostingStartup : IHostingStartup
    {
        /// <summary>
        /// Configures web host services for the ExtractorAdvanced feature plugin.
        /// </summary>
        /// <param name="builder">The web host builder to configure.</param>
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices((context, services) =>
            {
                services.Configure<ExtractorOptions>(context.Configuration.GetSection(ExtractorOptions.SectionName));

                // 1. Database infrastructure for advance_extractor.db (SQLite in WAL mode)
                services.AddSingleton<IAdvancedExtractorConnectionFactory, AdvancedExtractorConnectionFactory>();
                services.AddSingleton<IFeatureDbInitializer, AdvancedExtractorDbInitializer>();

                // 2. Data Access Repositories
                services.AddSingleton<IBookmarkRepository, BookmarkRepository>();
                services.AddSingleton<IEditingDraftRepository, EditingDraftRepository>();
                services.AddSingleton<IAdvanceJobRepository, AdvanceJobRepository>();

                // 3. Storage Retention Shield (protects bookmarked / active studio ranges from purge)
                services.AddSingleton<IRetentionShieldProvider, AdvancedRetentionShieldProvider>();

                // 4. Feature Module registration for UI plugins list and command dashboard integration
                services.AddSingleton<IFeatureModule, ExtractorAdvancedModule>();

                // 5. In-Memory caching for frame sprites and timeline LOD
                services.AddMemoryCache();

                // 6. Advanced NLE Services and Extractor Engine Override
                services.AddSingleton<IFfmpegBinaryResolver, AdvancedFfmpegBinaryResolver>();
                services.AddSingleton<AdvancedExtractorService>();

                // Override core IExtractorService so all extraction exports utilize advanced Studio pipelines
                services.AddSingleton<IExtractorService>(sp => sp.GetRequiredService<AdvancedExtractorService>());

                // 7. Advanced Job Execution Management
                services.AddSingleton<AdvanceJobManager>();
                services.AddSingleton<IAdvanceJobManager>(sp => sp.GetRequiredService<AdvanceJobManager>());
                services.AddSingleton<IExportJobManager>(sp => sp.GetRequiredService<AdvanceJobManager>());

                services.AddControllers()
                    .AddApplicationPart(typeof(ExtractorAdvancedHostingStartup).Assembly);

                services.AddTransient<IStartupFilter, ExtractorAdvancedStartupFilter>();
            });
        }
    }

    public class ExtractorAdvancedStartupFilter : IStartupFilter
    {
        public Action<IApplicationBuilder> Configure(Action<IApplicationBuilder> next)
        {
            return app =>
            {
                using (var scope = app.ApplicationServices.CreateScope())
                {
                    try
                    {
                        var initializer = scope.ServiceProvider.GetRequiredService<IFeatureDbInitializer>();
                        initializer.Initialize();
                    }
                    catch (Exception ex)
                    {
                        var logger = scope.ServiceProvider.GetService<ILogger<ExtractorAdvancedStartupFilter>>();
                        logger?.LogError(ex, "[EXTRACTOR ADVANCED] Failed to initialize advance_extractor.db on startup");
                    }
                }

                app.UseFeatureStaticAssets(typeof(ExtractorAdvancedStartupFilter).Assembly, "/extractor-advanced");

                next(app);
            };
        }
    }
}