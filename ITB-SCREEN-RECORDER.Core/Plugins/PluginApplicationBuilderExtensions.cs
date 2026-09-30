namespace ITB_SCREEN_RECORDER.Core.Plugins;

using System.IO;
using System.Reflection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.FileProviders;

public static class PluginApplicationBuilderExtensions
{
    public static IApplicationBuilder UseFeatureStaticAssets(
        this IApplicationBuilder app,
        Assembly featureAssembly,
        string requestPath)
    {
        string baseDir = Path.GetDirectoryName(featureAssembly.Location) ?? AppContext.BaseDirectory;
        string featureWwwroot = Path.Combine(baseDir, "wwwroot");

        if (!Directory.Exists(featureWwwroot))
        {
            featureWwwroot = Path.Combine(baseDir, "Features", featureAssembly.GetName().Name!.Replace("ITB-SCREEN-RECORDER.Features.", ""), "wwwroot");
        }

        if (Directory.Exists(featureWwwroot))
        {
            app.UseFileServer(new FileServerOptions
            {
                FileProvider = new PhysicalFileProvider(featureWwwroot),
                RequestPath = new PathString(requestPath),
                EnableDefaultFiles = false
            });
        }

        return app;
    }
}