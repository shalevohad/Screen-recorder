using System;
using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using ITB_SCREEN_RECORDER.Core.Plugins;
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

                services.AddSingleton<IStorageScannerService, StorageScannerService>();
                services.AddSingleton<IFfmpegConcatRunner, FfmpegConcatRunner>();
                services.AddSingleton<IExtractorService, ExtractorService>();
                services.AddSingleton<IFeatureModule, ExtractorModule>();

                services.AddControllers()
                    .AddApplicationPart(typeof(ExtractorHostingStartup).Assembly);

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
                string asmLocation = typeof(ExtractorStartupFilter).Assembly.Location;
                string baseDir = Path.GetDirectoryName(asmLocation) ?? AppContext.BaseDirectory;
                string featureWwwroot = Path.Combine(baseDir, "wwwroot");

                if (!Directory.Exists(featureWwwroot))
                {
                    featureWwwroot = Path.Combine(baseDir, "Features", "Extractor", "wwwroot");
                }

                if (Directory.Exists(featureWwwroot))
                {
                    app.UseFileServer(new FileServerOptions
                    {
                        FileProvider = new PhysicalFileProvider(featureWwwroot),
                        RequestPath = new PathString("/extractor"),
                        EnableDefaultFiles = false
                    });
                }

                next(app);
            };
        }
    }
}