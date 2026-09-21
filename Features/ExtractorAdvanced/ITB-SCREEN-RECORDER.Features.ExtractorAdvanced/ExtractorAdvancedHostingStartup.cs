// ==========================================
// File: Features/ExtractorAdvanced/ExtractorAdvancedHostingStartup.cs
// ==========================================
using System;
using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using ITB_SCREEN_RECORDER.Core.Plugins;
using ITB_SCREEN_RECORDER.Features.Extractor.Services;
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
                // רישום המודול עבור ממשק המשתמש של המערכת
                services.AddSingleton<IFeatureModule, ExtractorAdvancedModule>();

                // דריסת מחולל השקופיות הבסיסי במחולל הטקטי המתקדם
                services.AddSingleton<IDummyVideoGenerator, AdvancedDummyVideoGenerator>();

                // מנוע ה-NLE המתקדם
                services.AddSingleton<AdvancedExtractorService>();

                // מנהל משימות הרקע המתקדם (מממש הן את הבסיס והן את המורחב)
                services.AddSingleton<AdvanceJobManager>();
                services.AddSingleton<IAdvanceJobManager>(sp => sp.GetRequiredService<AdvanceJobManager>());
                services.AddSingleton<IExportJobManager>(sp => sp.GetRequiredService<AdvanceJobManager>());
                services.AddHostedService<ExtractorGarbageCollectorService>();

                // רישום קונטרולרים
                services.AddControllers()
                    .AddApplicationPart(typeof(ExtractorAdvancedHostingStartup).Assembly);

                // הגשת תוצרי ה-Client בנתיב /extractor-advanced
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
                string asmLocation = typeof(ExtractorAdvancedStartupFilter).Assembly.Location;
                string baseDir = Path.GetDirectoryName(asmLocation) ?? AppContext.BaseDirectory;
                string featureWwwroot = Path.Combine(baseDir, "wwwroot");

                if (!Directory.Exists(featureWwwroot))
                {
                    featureWwwroot = Path.Combine(baseDir, "Features", "ExtractorAdvanced", "wwwroot");
                }

                if (Directory.Exists(featureWwwroot))
                {
                    app.UseFileServer(new FileServerOptions
                    {
                        FileProvider = new PhysicalFileProvider(featureWwwroot),
                        RequestPath = new PathString("/extractor-advanced"),
                        EnableDefaultFiles = false
                    });
                }

                next(app);
            };
        }
    }
}