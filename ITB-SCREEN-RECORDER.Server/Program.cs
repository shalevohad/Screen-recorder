using System;
using System.IO;
using System.Threading;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using ITB_SCREEN_RECORDER.Server.Services;
using ITB_SCREEN_RECORDER.Core.Configuration;
using Microsoft.Win32;
using System.Runtime.InteropServices;

namespace ITB_SCREEN_RECORDER.Server
{
    public class Program
    {
        private const string MutexName = "ITB_SERVER_SINGLE_INSTANCE_DEV";

        public static void Main(string[] args)
        {
            Directory.SetCurrentDirectory(AppContext.BaseDirectory);

            using var serverMutex = new Mutex(true, MutexName, out bool createdNew);
            if (!createdNew)
            {
                Console.WriteLine("[CRITICAL] Another instance of ITB-SCREEN-RECORDER Server is already running. Shutting down.");
                return;
            }

            var builder = WebApplication.CreateBuilder(args);

            if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
            {
#pragma warning disable CA1416
                try
                {
                    using var key = Microsoft.Win32.Registry.LocalMachine.OpenSubKey(@"SOFTWARE\ITB\ScreenRecorderServer");
                    if (key != null)
                    {
                        var httpPortVal = key.GetValue("HttpPort");
                        if (httpPortVal != null && int.TryParse(httpPortVal.ToString(), out int customHttpPort))
                        {
                            builder.WebHost.UseUrls($"http://0.0.0.0:{customHttpPort}");
                            Console.WriteLine($"[SERVER] Overriding Kestrel listening URL from Registry to port: {customHttpPort}");
                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"[SERVER] Warning: Failed to read HttpPort from Registry: {ex.Message}");
                }
#pragma warning restore CA1416
            }

            builder.Host.UseWindowsService(options =>
            {
                options.ServiceName = "ITB_ServerService";
            });

            builder.Host.UseSystemd();

            builder.Services.AddOptions<SystemConfig>()
                .Bind(builder.Configuration.GetSection("SystemConfig"))
                .ValidateDataAnnotations()
                .ValidateOnStart();

            builder.Services.AddControllers()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter());
                    options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
                });
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddSingleton<ITelemetryStateService, TelemetryStateService>();

            builder.Services.AddHttpClient();
            builder.Services.AddSingleton<StoragePathResolver>();
            builder.Services.AddSingleton<SettingsFileService>();

            // תוספת קריטית - רישום השירות החדש
            builder.Services.AddSingleton<StationOverridesService>();

            builder.Services.AddSingleton<MediaMtxApiClient>();
            builder.Services.AddSingleton<EventLogger>();

            builder.Services.AddHostedService<MediaMtxSupervisorWorker>();

            // שירות רקע האחראי על חיתוך הקלטות מדויק לפי שעון קיר
            builder.Services.AddHostedService<RecordingChunkScheduler>();

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            // הגשת הדשבורד הסטטי (React)
            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseRouting();
            app.UseAuthorization();

            app.MapControllers();

            Console.WriteLine("[SERVER] ITB-SCREEN-RECORDER Middleware initialized successfully.");

            app.Run();
        }
    }
}