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

            // פונקציית עזר לאיתור תיקיית הפיצ'רים תוך שמירה על עמידות ל-Case Sensitivity בלינוקס
            string ResolveFeaturesDirectory()
            {
                var standardPath = Path.Combine(AppContext.BaseDirectory, "Features");
                if (Directory.Exists(standardPath)) return standardPath;

                var lowerPath = Path.Combine(AppContext.BaseDirectory, "features");
                if (Directory.Exists(lowerPath)) return lowerPath;

                return standardPath;
            }

            // 1. פותר אסמבליז שמטעין ישירות לתוך ה-AssemblyLoadContext הראשי
            AssemblyLoadContext.Default.Resolving += (context, assemblyName) =>
            {
                var loadedAssembly = AppDomain.CurrentDomain.GetAssemblies()
                    .FirstOrDefault(a => string.Equals(a.GetName().Name, assemblyName.Name, StringComparison.OrdinalIgnoreCase));
                if (loadedAssembly != null) return loadedAssembly;

                var featuresDir = ResolveFeaturesDirectory();
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
            Logger.AlwaysInfo($"[SERVER] ITB-SCREEN-RECORDER Server process starting on {RuntimeInformation.OSDescription}...");

            // ניהול מופע יחיד עמיד לקריסות (AbandonedMutex)
            Mutex? serverMutex = null;
            bool createdNew = false;
            try
            {
                serverMutex = new Mutex(true, MutexName, out createdNew);
            }
            catch (AbandonedMutexException)
            {
                // מופע קודם נהרג ללא שחרור מסודר - המופע הנוכחי מקבל בעלות
                createdNew = true;
                Logger.Warn("[SERVER] Acquired ownership of an abandoned server mutex from a previously terminated instance.");
            }

            if (!createdNew)
            {
                var conflictMsg = "[CRITICAL] Another instance of ITB-SCREEN-RECORDER Server is already running. Shutting down.";
                Console.WriteLine(conflictMsg);
                Logger.Error(conflictMsg);
                return;
            }

            try
            {
                // 2. זיהוי, טעינה ואתחול של כל מודול פיצ'ר שנמצא בתיקיית Features
                var loadedFeatureAssemblies = new List<Assembly>();
                var featuresBaseDir = ResolveFeaturesDirectory();

                if (Directory.Exists(featuresBaseDir))
                {
                    var featureDlls = Directory.GetFiles(featuresBaseDir, "ITB-SCREEN-RECORDER.Features.*.dll", SearchOption.AllDirectories);
                    foreach (var dllPath in featureDlls)
                    {
                        var fileName = Path.GetFileName(dllPath);
                        try
                        {
                            var asm = AssemblyLoadContext.Default.LoadFromAssemblyPath(dllPath);
                            loadedFeatureAssemblies.Add(asm);

                            Type[] types;
                            try
                            {
                                types = asm.GetTypes();
                            }
                            catch (ReflectionTypeLoadException ex)
                            {
                                types = ex.Types.Where(t => t != null).ToArray()!;
                                foreach (var loaderEx in ex.LoaderExceptions.Where(e => e != null))
                                {
                                    Logger.Error($"[PLUGIN-LOADER] LoaderException in '{fileName}': {loaderEx!.Message}");
                                }
                            }

                            var startupTypes = types.Where(t => typeof(IHostingStartup).IsAssignableFrom(t) && !t.IsInterface && !t.IsAbstract).ToList();

                            if (startupTypes.Count == 0)
                            {
                                Logger.Warn($"[PLUGIN-LOADER] WARNING: '{fileName}' was loaded, but NO class implements IHostingStartup! No services or IFeatureModule registered.");
                            }
                            else
                            {
                                foreach (var startupType in startupTypes)
                                {
                                    var startup = (IHostingStartup)Activator.CreateInstance(startupType)!;
                                    startup.Configure(builder.WebHost);
                                    Logger.AlwaysInfo($"[PLUGIN-LOADER] Successfully activated startup: {startupType.FullName} ({asm.GetName().Name})");
                                }
                            }
                        }
                        catch (Exception ex)
                        {
                            var errorMsg = $"[PLUGIN-LOADER] CRITICAL: Failed to load modular feature from '{dllPath}': {ex.Message}";
                            Console.WriteLine(errorMsg);
                            Logger.Error(errorMsg);
                        }
                    }
                }

                // הגדרת תקרת Kestrel
                builder.WebHost.ConfigureKestrel(serverOptions =>
                {
                    serverOptions.Limits.MaxRequestBodySize = BufferLimits.MaxRequestSizeBytes;
                });

                // קביעת פורט האזנה חוצה-פלטפורמות (Registry -> משתנה סביבה -> הגדרות -> ברירת מחדל 5090)
                int? resolvedHttpPort = null;

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
                                resolvedHttpPort = customHttpPort;
                                Logger.AlwaysInfo($"[SERVER] Resolved HttpPort from Windows Registry: {resolvedHttpPort}");
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        Logger.Warn($"[SERVER] Warning: Failed to read HttpPort from Registry: {ex.Message}");
                    }
#pragma warning restore CA1416
                }

                if (!resolvedHttpPort.HasValue)
                {
                    var envPort = Environment.GetEnvironmentVariable("SERVER_HTTP_PORT")
                               ?? Environment.GetEnvironmentVariable("HTTP_PORT");
                    if (!string.IsNullOrEmpty(envPort) && int.TryParse(envPort, out int envPortVal))
                    {
                        resolvedHttpPort = envPortVal;
                        Logger.AlwaysInfo($"[SERVER] Resolved HttpPort from environment variable: {resolvedHttpPort}");
                    }
                }

                if (!resolvedHttpPort.HasValue)
                {
                    var configPort = builder.Configuration.GetValue<int?>("SystemConfig:HttpPort")
                                  ?? builder.Configuration.GetValue<int?>("HttpPort");
                    if (configPort.HasValue)
                    {
                        resolvedHttpPort = configPort.Value;
                        Logger.AlwaysInfo($"[SERVER] Resolved HttpPort from configuration: {resolvedHttpPort}");
                    }
                }

                int finalListeningPort = resolvedHttpPort ?? 5090;
                builder.WebHost.UseUrls($"http://0.0.0.0:{finalListeningPort}");
                Logger.AlwaysInfo($"[SERVER] Kestrel listening endpoint bound to: http://0.0.0.0:{finalListeningPort}");

                // אירוח כשירות מערכת
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

                // קשירת הגדרות השרת הראשי
                builder.Services.AddOptions<SystemConfig>()
                    .Bind(builder.Configuration.GetSection("SystemConfig"))
                    .ValidateDataAnnotations()
                    .ValidateOnStart();

                // מדיניות CORS
                builder.Services.AddCors(options =>
                {
                    options.AddDefaultPolicy(policy =>
                    {
                        policy.SetIsOriginAllowed(_ => true)
                              .AllowAnyMethod()
                              .AllowAnyHeader()
                              .AllowCredentials();
                    });
                });

                // רישום קונטרולרים ושילוב אסמבליז של מודולים
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

                // שירותי טלמטריה ומצב
                builder.Services.AddSingleton<ITelemetryStateService, TelemetryStateService>();
                builder.Services.AddSingleton<OfflineSyncManager>();
                builder.Services.AddSingleton<TelemetryBroadcastService>();

                // שירות ניהול Tabs
                builder.Services.AddSingleton<CustomTabsService>();

                builder.Services.AddSignalR(options =>
                {
                    options.EnableDetailedErrors = true;
                }).AddJsonProtocol(options =>
                {
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

                // דיאגנוסטיקה: אימות מודולים רשומים ב-DI
                using (var scope = app.Services.CreateScope())
                {
                    var registeredFeatures = scope.ServiceProvider.GetServices<IFeatureModule>().ToList();
                    Logger.AlwaysInfo($"[PLUGIN-LOADER] Total registered IFeatureModules in DI: {registeredFeatures.Count}");

                    foreach (var feat in registeredFeatures)
                    {
                        Logger.AlwaysInfo($"[PLUGIN-LOADER] -> Active Module: Id='{feat.Id}', Title='{feat.Title}', Script='{feat.ScriptUrl}', Enabled={feat.IsEnabled}");
                    }

                    if (registeredFeatures.Count == 0)
                    {
                        Logger.Warn("[PLUGIN-LOADER] WARNING: Zero IFeatureModules registered! /api/v1/features/active will be empty.");
                    }
                }

                if (app.Environment.IsDevelopment())
                {
                    app.UseSwagger();
                    app.UseSwaggerUI();
                }

                app.UseDefaultFiles();
                app.UseStaticFiles();

                app.UseRouting();

                app.UseCors();
                app.UseAuthorization();

                app.MapHub<TelemetryHub>("/hubs/telemetry");
                app.MapControllers();

                // SPA Fallback
                app.MapFallbackToFile("index.html");

                Logger.AlwaysInfo("[SERVER] ITB-SCREEN-RECORDER Middleware initialized successfully.");

                app.Run();
            }
            finally
            {
                serverMutex?.Dispose();
            }
        }
    }
}