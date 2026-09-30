// ==========================================
// File: Program.cs
// ==========================================
using ITB_SCREEN_RECORDER.Core.Abstractions;
using ITB_SCREEN_RECORDER.Core.Common;
using ITB_SCREEN_RECORDER.Core.Configuration;
using ITB_SCREEN_RECORDER.Core.Plugins;
using ITB_SCREEN_RECORDER.Server.Data;
using ITB_SCREEN_RECORDER.Server.Data.Repositories;
using ITB_SCREEN_RECORDER.Server.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Server.Kestrel.Core;
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
            Environment.SetEnvironmentVariable("ASPNETCORE_HOSTINGSTARTUPASSEMBLIES", null);

            // 💡 1. כיול ThreadPool להתמודדות חלקה עם 73 תחנות ועשרות בקשות מקביליות
            int minWorkerThreads = Math.Max(64, Environment.ProcessorCount * 8);
            int minIoThreads = Math.Max(64, Environment.ProcessorCount * 8);
            ThreadPool.SetMinThreads(minWorkerThreads, minIoThreads);

            // 💡 2. ניקוי קובצי spool ו-concat זמניים שנותרו פתוחים מקריסות קודמות
            CleanupOrphanedTempFiles();

            string ResolveFeaturesDirectory()
            {
                var standardPath = Path.Combine(AppContext.BaseDirectory, "Features");
                if (Directory.Exists(standardPath)) return standardPath;
                var lowerPath = Path.Combine(AppContext.BaseDirectory, "features");
                return Directory.Exists(lowerPath) ? lowerPath : standardPath;
            }

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

            Mutex? serverMutex = null;
            bool createdNew = false;
            try
            {
                serverMutex = new Mutex(true, MutexName, out createdNew);
            }
            catch (AbandonedMutexException)
            {
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
                            try { types = asm.GetTypes(); }
                            catch (ReflectionTypeLoadException ex)
                            {
                                types = ex.Types.Where(t => t != null).ToArray()!;
                                foreach (var loaderEx in ex.LoaderExceptions.Where(e => e != null))
                                    Logger.Error($"[PLUGIN-LOADER] LoaderException in '{fileName}': {loaderEx!.Message}");
                            }

                            var startupTypes = types.Where(t => typeof(IHostingStartup).IsAssignableFrom(t) && !t.IsInterface && !t.IsAbstract).ToList();
                            foreach (var startupType in startupTypes)
                            {
                                var startup = (IHostingStartup)Activator.CreateInstance(startupType)!;
                                startup.Configure(builder.WebHost);
                                Logger.AlwaysInfo($"[PLUGIN-LOADER] Activated modular feature: {startupType.FullName}");
                            }
                        }
                        catch (Exception ex)
                        {
                            Logger.Error($"[PLUGIN-LOADER] Failed loading feature '{dllPath}': {ex.Message}");
                        }
                    }
                }

                // 💡 3. הגדרת Kestrel עם תמיכת HTTP/1.1 ו-HTTP/2 (Multiplexing)
                builder.WebHost.ConfigureKestrel(options =>
                {
                    options.Limits.MaxRequestBodySize = BufferLimits.MaxRequestSizeBytes;
                    options.ConfigureEndpointDefaults(listenOptions =>
                    {
                        listenOptions.Protocols = HttpProtocols.Http1AndHttp2;
                    });
                });

                int? resolvedHttpPort = null;
                if (OperatingSystem.IsWindows())
                {
#pragma warning disable CA1416
                    try
                    {
                        using var key = Registry.LocalMachine.OpenSubKey(@"SOFTWARE\ITB\ScreenRecorderServer");
                        if (key != null && int.TryParse(key.GetValue("HttpPort")?.ToString(), out int customHttpPort))
                            resolvedHttpPort = customHttpPort;
                    }
                    catch { }
#pragma warning restore CA1416
                }

                int finalListeningPort = resolvedHttpPort ?? builder.Configuration.GetValue<int?>("SystemConfig:HttpPort") ?? 5090;
                builder.WebHost.UseUrls($"http://0.0.0.0:{finalListeningPort}");

                if (OperatingSystem.IsWindows())
                {
#pragma warning disable CA1416
                    builder.Host.UseWindowsService(options => options.ServiceName = "ITB_ServerService");
#pragma warning restore CA1416
                }
                else if (OperatingSystem.IsLinux())
                {
                    builder.Host.UseSystemd();
                }

                builder.Services.AddSingleton(appConfig);
                builder.Services.AddMemoryCache();
                builder.Services.Configure<FormOptions>(options => options.MultipartBodyLengthLimit = BufferLimits.MaxRequestSizeBytes);
                builder.Services.AddOptions<SystemConfig>().Bind(builder.Configuration.GetSection("SystemConfig")).ValidateDataAnnotations().ValidateOnStart();

                builder.Services.AddCors(options =>
                {
                    options.AddDefaultPolicy(p => p.SetIsOriginAllowed(_ => true).AllowAnyMethod().AllowAnyHeader().AllowCredentials());
                });

                var mvcBuilder = builder.Services.AddControllers()
                    .AddJsonOptions(options =>
                    {
                        options.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter());
                        options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
                    });

                foreach (var featureAsm in loadedFeatureAssemblies) mvcBuilder.AddApplicationPart(featureAsm);

                builder.Services.AddEndpointsApiExplorer();
                builder.Services.AddSwaggerGen();

                // שירותי טלמטריה ומצב שרת
                builder.Services.AddSingleton<ITelemetryStateService, TelemetryStateService>();
                builder.Services.AddSingleton<OfflineSyncManager>();
                builder.Services.AddSingleton<TelemetryBroadcastService>();
                builder.Services.AddSingleton<CustomTabsService>();

                // 💡 4. שירות ניטור האחסון הרוחבי (Cross-Platform Storage & IOPS Telemetry)
                builder.Services.AddSingleton<IStorageTelemetryService, StorageTelemetryService>();

                builder.Services.AddSignalR(o => o.EnableDetailedErrors = true)
                    .AddJsonProtocol(o => o.PayloadSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase);

                builder.Services.AddHttpClient();
                builder.Services.AddSingleton<StoragePathResolver>();
                builder.Services.AddSingleton<SettingsFileService>();
                builder.Services.AddSingleton<StationOverridesService>();
                builder.Services.AddSingleton<MediaMtxApiClient>();
                builder.Services.AddSingleton<EventLogger>();
                builder.Services.AddSingleton<ITB_SCREEN_RECORDER.Core.Diagnostics.NetworkTelemetry>();

                // תשתית SQLite Core, סריקת אחסון וסנכרון תצורה
                builder.Services.AddSingleton<ICatalogConnectionFactory, CatalogConnectionFactory>();
                builder.Services.AddSingleton<IFeatureDbInitializer, CatalogDbInitializer>();
                builder.Services.AddSingleton<ICatalogRepository, CatalogRepository>();
                builder.Services.AddSingleton<IVideoProbeService, VideoProbeService>();
                builder.Services.AddSingleton<IStorageScannerService, StorageScannerService>();
                builder.Services.AddSingleton<ISystemConfigDbSyncService, SystemConfigDbSyncService>();
                builder.Services.AddHostedService(sp => (SystemConfigDbSyncService)sp.GetRequiredService<ISystemConfigDbSyncService>());

                // מנוע תחזוקת האחסון והאינדוקס האוטומטי
                builder.Services.AddSingleton<CatalogMaintenanceService>();
                builder.Services.AddSingleton<ICatalogMaintenanceService>(sp => sp.GetRequiredService<CatalogMaintenanceService>());
                builder.Services.AddHostedService(sp => sp.GetRequiredService<CatalogMaintenanceService>());

                // שירותי הרקע המובנים
                builder.Services.AddHostedService<MediaMtxSupervisorWorker>();
                builder.Services.AddHostedService<RecordingChunkScheduler>();
                builder.Services.AddHostedService<ServerTelemetryHostService>();
                builder.Services.AddHostedService<StorageRetentionWorker>();

                var app = builder.Build();

                using (var scope = app.Services.CreateScope())
                {
                    var initializers = scope.ServiceProvider.GetServices<IFeatureDbInitializer>().OrderBy(i => i.ExecutionOrder).ToList();
                    Logger.AlwaysInfo($"[DATABASE] Discovered {initializers.Count} database initializers.");
                    foreach (var init in initializers)
                    {
                        try
                        {
                            init.Initialize();
                            Logger.AlwaysInfo($"[DATABASE] Initialized schema for '{init.FeatureName}' (Order: {init.ExecutionOrder})");
                        }
                        catch (Exception ex)
                        {
                            Logger.Error($"[DATABASE] CRITICAL: Failed to initialize schema for '{init.FeatureName}': {ex.Message}");
                            throw;
                        }
                    }

                    var registeredFeatures = scope.ServiceProvider.GetServices<IFeatureModule>().ToList();
                    Logger.AlwaysInfo($"[PLUGIN-LOADER] Total registered IFeatureModules in DI: {registeredFeatures.Count}");
                    foreach (var feat in registeredFeatures)
                        Logger.AlwaysInfo($"[PLUGIN-LOADER] -> Active Module: Id='{feat.Id}', Title='{feat.Title}', Script='{feat.ScriptUrl}', Enabled={feat.IsEnabled}");
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
                app.MapFallbackToFile("index.html");

                Logger.AlwaysInfo("[SERVER] ITB-SCREEN-RECORDER Middleware initialized successfully.");
                app.Run();
            }
            finally
            {
                serverMutex?.Dispose();
            }
        }

        private static void CleanupOrphanedTempFiles()
        {
            try
            {
                string tempDir = Path.GetTempPath();
                var prefixes = new[] { "itb_spool_", "stream_", "cut_" };
                var files = Directory.EnumerateFiles(tempDir)
                    .Where(f => prefixes.Any(p => Path.GetFileName(f).StartsWith(p, StringComparison.OrdinalIgnoreCase)));

                foreach (var file in files)
                {
                    try
                    {
                        var fi = new FileInfo(file);
                        if (DateTime.UtcNow - fi.LastWriteTimeUtc > TimeSpan.FromMinutes(30))
                        {
                            File.Delete(file);
                        }
                    }
                    catch { }
                }
            }
            catch { }
        }
    }
}