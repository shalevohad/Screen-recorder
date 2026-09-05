using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ITB_SCREEN_RECORDER.Server.Features.Extractor.Models;
using ITB_SCREEN_RECORDER.Server.Features.Extractor.Services;

namespace ITB_SCREEN_RECORDER.Server.Features.Extractor
{
    public static class ExtractorFeatureExtensions
    {
        public static IServiceCollection AddExtractorFeature(this IServiceCollection services, IConfiguration configuration)
        {
            EnsureConfigurationInjected();

            services.Configure<ExtractorOptions>(configuration.GetSection(ExtractorOptions.SectionName));
            services.AddSingleton<IStorageScannerService, StorageScannerService>();
            services.AddSingleton<IFfmpegConcatRunner, FfmpegConcatRunner>();
            services.AddSingleton<IExtractorService, ExtractorService>();

            return services;
        }

        private static void EnsureConfigurationInjected()
        {
            try
            {
                string configPath = Path.Combine(AppContext.BaseDirectory, "appsettings.json");
                if (!File.Exists(configPath))
                {
                    configPath = Path.Combine(Directory.GetCurrentDirectory(), "appsettings.json");
                    if (!File.Exists(configPath)) return;
                }

                string jsonContent = File.ReadAllText(configPath);
                var jsonNode = System.Text.Json.Nodes.JsonNode.Parse(jsonContent);

                if (jsonNode is System.Text.Json.Nodes.JsonObject rootObj && !rootObj.ContainsKey(ExtractorOptions.SectionName))
                {
                    rootObj[ExtractorOptions.SectionName] = new System.Text.Json.Nodes.JsonObject
                    {
                        [nameof(ExtractorOptions.FfmpegPath)] = "",
                        [nameof(ExtractorOptions.MaxConcurrentFfmpegProcesses)] = 4
                    };

                    var writeOptions = new System.Text.Json.JsonSerializerOptions { WriteIndented = true };
                    File.WriteAllText(configPath, rootObj.ToJsonString(writeOptions));
                }
            }
            catch { }
        }
    }
}