using ITB_SCREEN_RECORDER.Core.Common;
using ITB_SCREEN_RECORDER.Core.Configuration;
using ITB_SCREEN_RECORDER.Core.Plugins;
using ITB_SCREEN_RECORDER.Server.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Runtime.Loader;
using System.Threading;

namespace ITB_SCREEN_RECORDER.Server
{
    public class Program
    {
        private const string MutexName = "ITB_SERVER_SINGLE_INSTANCE_DEV";

        public static void Main(string[] args)
        {
            Directory.SetCurrentDirectory(AppContext.BaseDirectory);

            // ניקוי משתנה הסביבה למניעת קריסות של מנוע ה-HostingStartup בעת הרצה עם F5
            Environment.SetEnvironmentVariable("ASPNETCORE_HOSTINGSTARTUPASSEMBLIES", null);

            // 1. פותר אסמבליז שמטעין ישירות לתוך ה-AssemblyLoadContext הראשי
            AssemblyLoadContext.Default.Resolving += (context, assemblyName) =>
            {
                var loadedAssembly = AppDomain.CurrentDomain.GetAssemblies()
                    .FirstOrDefault(a => string.Equals(a.GetName().Name, assemblyName.Name, StringComparison.OrdinalIgnoreCase));
                if (loadedAssembly != null) return loadedAssembly;

                var featuresDir = Path.Combine(AppContext.BaseDirectory, "Features");
                if (!Directory.Exists(featuresDir)) return null;

                var matchedDll = Directory.GetFiles(featuresDir, $"{assemblyName.Name}.dll", SearchOption.AllDirectories).FirstOrDefault();
                return matchedDll != null ? context.LoadFromAssemblyPath(matchedDll) : null;
            };

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
                var conflictMsg = "[CRITICAL] Another instance of ITB-SCREEN-RECORDER Server is already running. Shutting down.";
                Console.WriteLine(conflictMsg);
                Logger.Error(conflictMsg);
                return;
            }

            // 2. זיהוי, טעינה ואתחול של כל מודול פיצ'ר שנמצא בתיקיית Features
            var loadedFeatureAssemblies = new List<Assembly>();
            var featuresBaseDir = Path.Combine(AppContext.BaseDirectory, "Features");
            if (Directory.Exists(featuresBaseDir))
            {
                var featureDlls = Directory.GetFiles(featuresBaseDir, "ITB-SCREEN-RECORDER.Features.*.dll", SearchOption.AllDirectories);
                foreach (var dllPath in featureDlls)
                {
                    try
                    {
                        var asm = AssemblyLoadContext.Default.LoadFromAssemblyPath(dllPath);
                        loadedFeatureAssemblies.Add(asm);

                        Type[] types;
                        try { types = asm.GetTypes(); }
                        catch (ReflectionTypeLoadException ex) { types = ex.Types.Where(t => t != null).ToArray()!; }

                        var startupTypes = types.Where(t => typeof(IHostingStartup).IsAssignableFrom(t) && !t.IsInterface && !t.IsAbstract);
                        foreach (var startupType in startupTypes)
                        {
                            var startup = (IHostingStartup)Activator.CreateInstance(startupType)!;
                            startup.Configure(builder.WebHost);
                            Logger.AlwaysInfo($"[SERVER] Successfully activated modular feature startup: {startupType.FullName} ({asm.GetName().Name})");
                        }
                    }
                    catch (Exception ex)
                    {
                        var errorMsg = $"[SERVER] Failed to load modular feature from '{dllPath}': {ex.Message}";
                        Console.WriteLine(errorMsg);
                        Logger.Error(errorMsg);
                    }
                }
            }

            // הגדרת תקרת Kestrel (מחושב אוטומטית לפי 300MB + 20MB)
            builder.WebHost.ConfigureKestrel(serverOptions =>
            {
                serverOptions.Limits.MaxRequestBodySize = BufferLimits.MaxRequestSizeBytes;
            });

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

            // תמיכה ב-FormReader עבור Multipart
            builder.Services.Configure<FormOptions>(options =>
            {
                options.MultipartBodyLengthLimit = BufferLimits.MaxRequestSizeBytes;
            });

            builder.Services.AddOptions<SystemConfig>()
                .Bind(builder.Configuration.GetSection("SystemConfig"))
                .ValidateDataAnnotations()
                .ValidateOnStart();

            // רישום קונטרולרים ושילוב האסמבליז של הפיצ'רים למערכת הניתוב
            var mvcBuilder = builder.Services.AddControllers()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter());
                    options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
                });

            foreach (var featureAsm in loadedFeatureAssemblies)
            {
                mvcBuilder.AddApplicationPart(featureAsm);
            }

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddSingleton<ITelemetryStateService, TelemetryStateService>();
            builder.Services.AddSingleton<OfflineSyncManager>();
            builder.Services.AddSingleton<TelemetryBroadcastService>();

            builder.Services.AddSignalR(options => {
                options.EnableDetailedErrors = true;
            }).AddJsonProtocol(options => {
                options.PayloadSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
            });

            builder.Services.AddHttpClient();
            builder.Services.AddSingleton<StoragePathResolver>();
            builder.Services.AddSingleton<SettingsFileService>();

            builder.Services.AddSingleton<StationOverridesService>();
            builder.Services.AddSingleton<MediaMtxApiClient>();
            builder.Services.AddSingleton<EventLogger>();

            builder.Services.AddSingleton<ITB_SCREEN_RECORDER.Core.Diagnostics.NetworkTelemetry>();

            builder.Services.AddHostedService<MediaMtxSupervisorWorker>();
            builder.Services.AddHostedService<RecordingChunkScheduler>();
            builder.Services.AddHostedService<ServerTelemetryHostService>();

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

            app.MapHub<TelemetryHub>("/hubs/telemetry");
            app.MapControllers();

            Logger.AlwaysInfo("[SERVER] ITB-SCREEN-RECORDER Middleware initialized successfully.");

            app.Run();
        }
    }
}