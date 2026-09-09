using System;
using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using ITB_SCREEN_RECORDER.Server.Core.Plugins;
using ITB_SCREEN_RECORDER.Server.Features.Extractor;
using ITB_SCREEN_RECORDER.Server.Features.Extractor.Models;
using ITB_SCREEN_RECORDER.Server.Features.Extractor.Services;

[assembly: HostingStartup(typeof(ExtractorHostingStartup))]

namespace ITB_SCREEN_RECORDER.Server.Features.Extractor
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
                string featureWwwroot = Path.Combine(AppContext.BaseDirectory, "Features", "Extractor", "wwwroot");

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