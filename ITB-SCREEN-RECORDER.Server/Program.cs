using System;
using System.IO;
using System.Threading;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using ITB_SCREEN_RECORDER.Server.Services;
using ITB_SCREEN_RECORDER.Core.Configuration;
using ITB_SCREEN_RECORDER.Core.Common;
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

            var builder = WebApplication.CreateBuilder(args);
            builder.Logging.ClearProviders();
            builder.Logging.AddProvider(new CoreLoggerProvider());

            var appConfig = builder.Configuration.GetSection("AppConfig").Get<AppConfig>()
                            ?? new AppConfig
                            {
                                EnableFileLogging = true,
                                LogFilePath = Path.Combine(AppContext.BaseDirectory, "Logs", "Server-Log.txt"),
                                LogRetentionDays = 30
                            };

            Logger.Initialize(appConfig, "Server");
            Logger.AlwaysInfo("[SERVER] ITB-SCREEN-RECORDER Server process is starting...");

            using var serverMutex = new Mutex(true, MutexName, out bool createdNew);
            if (!createdNew)
            {
                Logger.Error("[CRITICAL] Another instance of ITB-SCREEN-RECORDER Server is already running. Shutting down.");
                return;
            }

            if (OperatingSystem.IsWindows())
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
                            Logger.AlwaysInfo($"[SERVER] Overriding Kestrel listening URL from Registry to port: {customHttpPort}");
                        }
                    }
                }
                catch (Exception ex)
                {
                    Logger.Warn($"[SERVER] Warning: Failed to read HttpPort from Registry: {ex.Message}");
                }
#pragma warning restore CA1416
            }

            if (OperatingSystem.IsWindows())
            {
#pragma warning disable CA1416
                builder.Host.UseWindowsService(options =>
                {
                    options.ServiceName = "ITB_ServerService";
                });
#pragma warning restore CA1416
            }
            else if (OperatingSystem.IsLinux())
            {
                builder.Host.UseSystemd();
            }

            builder.Services.AddSingleton(appConfig);

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

            // 💡 הוספת שירותי SignalR ותעבורת זמן אמת
            builder.Services.AddSingleton<TelemetryBroadcastService>();
            builder.Services.AddSignalR(options => {
                options.EnableDetailedErrors = true;
            });

            builder.Services.AddHttpClient();
            builder.Services.AddSingleton<StoragePathResolver>();
            builder.Services.AddSingleton<SettingsFileService>();

            builder.Services.AddSingleton<StationOverridesService>();
            builder.Services.AddSingleton<MediaMtxApiClient>();
            builder.Services.AddSingleton<EventLogger>();

            builder.Services.AddHostedService<MediaMtxSupervisorWorker>();
            builder.Services.AddHostedService<RecordingChunkScheduler>();

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseRouting();
            app.UseAuthorization();

            // 💡 מיפוי נקודת הקצה של Hub הטכנאים
            app.MapHub<TelemetryHub>("/hubs/telemetry");
            app.MapControllers();

            Logger.AlwaysInfo("[SERVER] ITB-SCREEN-RECORDER Middleware initialized successfully.");

            app.Run();
        }
    }
}