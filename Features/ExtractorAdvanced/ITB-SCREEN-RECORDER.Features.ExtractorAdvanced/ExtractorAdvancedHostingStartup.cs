// ==========================================
// File: Features/ExtractorAdvanced/ExtractorAdvancedHostingStartup.cs
// ==========================================
using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using ITB_SCREEN_RECORDER.Core.Abstractions;
using ITB_SCREEN_RECORDER.Core.Plugins;
using ITB_SCREEN_RECORDER.Features.Extractor.Services;
using ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Data;
using ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Data.Repositories;
using ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Services;

[assembly: HostingStartup(typeof(ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.ExtractorAdvancedHostingStartup))]

namespace ITB_SCREEN_RECORDER.Features.ExtractorAdvanced
{
    public class ExtractorAdvancedHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices((context, services) =>
            {
                // 1. תשתית מסד הנתונים advance_extractor.db (SQLite ב-WAL Mode)
                services.AddSingleton<IAdvancedExtractorConnectionFactory, AdvancedExtractorConnectionFactory>();
                services.AddSingleton<IFeatureDbInitializer, AdvancedExtractorDbInitializer>();

                // 2. שכבת הנתונים (Repositories)
                services.AddSingleton<IBookmarkRepository, BookmarkRepository>();
                services.AddSingleton<IEditingDraftRepository, EditingDraftRepository>();
                services.AddSingleton<IAdvanceJobRepository, AdvanceJobRepository>();

                // 3. הגנת אחסון (Retention Shield)
                services.AddSingleton<IRetentionShieldProvider, AdvancedRetentionShieldProvider>();

                // 4. רישום המודול עבור מערך הפלאגינים וממשק ה-UI הראשי
                services.AddSingleton<IFeatureModule, ExtractorAdvancedModule>();

                // 5. שירותי מנוע העריכה המתקדם (ארכיטקטורה מודולרית)
                services.AddSingleton<IDummyVideoGenerator, AdvancedDummyVideoGenerator>();
                services.AddSingleton<INoSignalPatternService, NoSignalPatternService>();
                services.AddSingleton<IVideoMetadataService, VideoMetadataService>();
                services.AddSingleton<IMediaProbeService, MediaProbeService>();
                services.AddSingleton<IBridgeVideoGenerator, BridgeVideoGenerator>();
                services.AddSingleton<ISynchronizationPlanBuilder, SynchronizationPlanBuilder>();
                services.AddSingleton<ISynchronizedTrackCutter, SynchronizedTrackCutter>();
                services.AddSingleton<AdvancedExtractorService>();

                // 6. ניהול משימות NLE וניקוי רקע
                services.AddSingleton<AdvanceJobManager>();
                services.AddSingleton<IAdvanceJobManager>(sp => sp.GetRequiredService<AdvanceJobManager>());
                services.AddSingleton<IExportJobManager>(sp => sp.GetRequiredService<AdvanceJobManager>());
                services.AddHostedService<ExtractorGarbageCollectorService>();

                services.AddControllers()
                    .AddApplicationPart(typeof(ExtractorAdvancedHostingStartup).Assembly);

                // 7. פילטר לאתחול עצמאי של מסד הנתונים והגשת נכסי ה-UI
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