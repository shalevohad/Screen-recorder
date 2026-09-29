// ==========================================
// File: Features/Extractor/ExtractorHostingStartup.cs
// ==========================================
using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using ITB_SCREEN_RECORDER.Core.Abstractions;
using ITB_SCREEN_RECORDER.Core.Plugins;
using ITB_SCREEN_RECORDER.Features.Extractor.Data;
using ITB_SCREEN_RECORDER.Features.Extractor.Data.Repositories;
using ITB_SCREEN_RECORDER.Features.Extractor.Models;
using ITB_SCREEN_RECORDER.Features.Extractor.Services;

[assembly: HostingStartup(typeof(ITB_SCREEN_RECORDER.Features.Extractor.ExtractorHostingStartup))]

namespace ITB_SCREEN_RECORDER.Features.Extractor
{
    public class ExtractorHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices((context, services) =>
            {
                services.Configure<ExtractorOptions>(context.Configuration.GetSection(ExtractorOptions.SectionName));

                // 1. תשתית מסד הנתונים SQLite של הפיצ'ר
                services.AddSingleton<IExtractorConnectionFactory, ExtractorConnectionFactory>();
                services.AddSingleton<IFeatureDbInitializer, ExtractorDbInitializer>();
                services.AddSingleton<IExportJobRepository, ExportJobRepository>();

                // 2. שירות איתור בינאריים תשתיתי (FFmpeg / FFprobe)
                services.AddSingleton<IFfmpegBinaryResolver, FfmpegBinaryResolver>();

                // 3. שירותי ליבה
                services.AddSingleton<IStorageScannerService, StorageScannerService>();
                services.AddSingleton<IFfmpegConcatRunner, FfmpegConcatRunner>();
                services.AddSingleton<IExtractorService, ExtractorService>();
                services.AddSingleton<IFeatureModule, ExtractorModule>();
                services.AddSingleton<IDummyVideoGenerator, DummyVideoGenerator>();
                services.AddSingleton<IExportJobManager, ExportJobManager>();

                services.AddControllers()
                    .AddApplicationPart(typeof(ExtractorHostingStartup).Assembly);

                // 4. אתחול אוטונומי וניתוב UI
                services.AddTransient<IStartupFilter, ExtractorStartupFilter>();
            });
        }
    }

    public class ExtractorStartupFilter : IStartupFilter
    {
        public Action<IApplicationBuilder> Configure(Action<IApplicationBuilder> next)
        {
            return app =>
            {
                // אתחול אוטונומי של extractor.db בעליית המערכת (Stealth מלא)
                using (var scope = app.ApplicationServices.CreateScope())
                {
                    try
                    {
                        var initializer = scope.ServiceProvider.GetRequiredService<IFeatureDbInitializer>();
                        initializer.Initialize();
                    }
                    catch (Exception ex)
                    {
                        var logger = scope.ServiceProvider.GetService<ILogger<ExtractorStartupFilter>>();
                        logger?.LogError(ex, "[EXTRACTOR] Failed to auto-initialize extractor.db");
                    }
                }

                // הגשת נכסי הווב הסטטיים של הווידג'ט ישירות דרך ההרחבה ב-Core
                app.UseFeatureStaticAssets(typeof(ExtractorStartupFilter).Assembly, "/extractor");

                next(app);
            };
        }
    }
}