using System;
using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using ITB_SCREEN_RECORDER.Core.Plugins;

[assembly: HostingStartup(typeof(ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.ExtractorAdvancedHostingStartup))]

namespace ITB_SCREEN_RECORDER.Features.ExtractorAdvanced
{
    public class ExtractorAdvancedHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices((context, services) =>
            {
                // רישום המודול של הסטודיו המתקדם
                services.AddSingleton<IFeatureModule, ExtractorAdvancedModule>();

                // רישום קונטרולרים אם יהיו כאלה בפרויקט ה-Advanced
                services.AddControllers()
                    .AddApplicationPart(typeof(ExtractorAdvancedHostingStartup).Assembly);

                // הזרקת פילטר ה-Startup להגשת הקבצים הסטטיים בנתיב /extractor-advanced
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