// ==========================================
// File: ITB-SCREEN-RECORDER.Server/Program.cs
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
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Runtime.Loader;
using System.Text.RegularExpressions;
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

            // 💡 1. כיול ThreadPool להתמודדות חלקה עם עומס תחנות
            int minWorkerThreads = Math.Max(64, Environment.ProcessorCount * 8);
            int minIoThreads = Math.Max(64, Environment.ProcessorCount * 8);
            ThreadPool.SetMinThreads(minWorkerThreads, minIoThreads);

            // 💡 2. ניקוי קבצים זמניים
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

            // 💡 3. טעינה מפורשת של קובצי הקונפיגורציה
            builder.Configuration
                .SetBasePath(AppContext.BaseDirectory)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

            if (OperatingSystem.IsWindows())
            {
                builder.Configuration.AddJsonFile("appsettings.Windows.json", optional: true, reloadOnChange: true);
            }
            else if (OperatingSystem.IsLinux())
            {
                builder.Configuration.AddJsonFile("appsettings.Linux.json", optional: true, reloadOnChange: true);
            }
            builder.Configuration.AddEnvironmentVariables();

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
                // 💡 4. חילוץ הפורט מתוך ה-Configuration של קובצי ה-JSON
                int? kestrelPort = null;
                string? kestrelUrl = builder.Configuration["Kestrel:Endpoints:Http:Url"];
                if (!string.IsNullOrWhiteSpace(kestrelUrl))
                {
                    var portMatch = Regex.Match(kestrelUrl, @":(\d+)");
                    if (portMatch.Success && int.TryParse(portMatch.Groups[1].Value, out int kp))
                        kestrelPort = kp;
                }

                int finalListeningPort = builder.Configuration.GetValue<int?>("SystemConfig:HttpPort")
                    ?? kestrelPort
                    ?? 5090;

                builder.WebHost.UseUrls($"http://0.0.0.0:{finalListeningPort}");
                builder.Configuration["SystemConfig:HttpPort"] = finalListeningPort.ToString();

                // 💡 וידוא ותיקון mediamtx.yml ללא יצירת מפתחות כפולים
                int mtxApiPort = builder.Configuration.GetValue<int?>("SystemConfig:MediaMtx:ApiPort") ?? 9997;
                EnsureMediaMtxConfiguration(mtxApiPort);

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

                builder.WebHost.ConfigureKestrel(options =>
                {
                    options.Limits.MaxRequestBodySize = BufferLimits.MaxRequestSizeBytes;
                    options.ConfigureEndpointDefaults(listenOptions =>
                    {
                        listenOptions.Protocols = HttpProtocols.Http1AndHttp2;
                    });
                });

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

                builder.Services.PostConfigure<SystemConfig>(config =>
                {
                    config.HttpPort = finalListeningPort;
                });

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

                builder.Services.AddSingleton<ITelemetryStateService, TelemetryStateService>();
                builder.Services.AddSingleton<OfflineSyncManager>();
                builder.Services.AddSingleton<TelemetryBroadcastService>();
                builder.Services.AddSingleton<CustomTabsService>();
                builder.Services.AddSingleton<IStorageTelemetryService, StorageTelemetryService>();

                builder.Services.AddSignalR(options =>
                {
                    options.EnableDetailedErrors = true;
                    options.KeepAliveInterval = TimeSpan.FromSeconds(10);
                    options.ClientTimeoutInterval = TimeSpan.FromSeconds(60);
                    options.HandshakeTimeout = TimeSpan.FromSeconds(30);
                    options.MaximumReceiveMessageSize = 1024 * 1024;
                })
                .AddJsonProtocol(o => o.PayloadSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase);

                builder.Services.AddHttpClient();
                builder.Services.AddSingleton<StoragePathResolver>();
                builder.Services.AddSingleton<SettingsFileService>();
                builder.Services.AddSingleton<StationOverridesService>();
                builder.Services.AddSingleton<MediaMtxApiClient>();
                builder.Services.AddSingleton<EventLogger>();
                builder.Services.AddSingleton<ITB_SCREEN_RECORDER.Core.Diagnostics.NetworkTelemetry>();

                builder.Services.AddSingleton<ICatalogConnectionFactory, CatalogConnectionFactory>();
                builder.Services.AddSingleton<IFeatureDbInitializer, CatalogDbInitializer>();
                builder.Services.AddSingleton<ICatalogRepository, CatalogRepository>();
                builder.Services.AddSingleton<IVideoProbeService, VideoProbeService>();
                builder.Services.AddSingleton<IStorageScannerService, StorageScannerService>();
                builder.Services.AddSingleton<ISystemConfigDbSyncService, SystemConfigDbSyncService>();
                builder.Services.AddHostedService(sp => (SystemConfigDbSyncService)sp.GetRequiredService<ISystemConfigDbSyncService>());

                builder.Services.AddSingleton<CatalogMaintenanceService>();
                builder.Services.AddSingleton<ICatalogMaintenanceService>(sp => sp.GetRequiredService<CatalogMaintenanceService>());
                builder.Services.AddHostedService(sp => sp.GetRequiredService<CatalogMaintenanceService>());

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

                Logger.AlwaysInfo($"[SERVER] ITB-SCREEN-RECORDER listening on http://0.0.0.0:{finalListeningPort}");
                app.Run();
            }
            finally
            {
                serverMutex?.Dispose();
            }
        }

        private static void EnsureMediaMtxConfiguration(int apiPort = 9997)
        {
            try
            {
                var possibleDirs = new[]
                {
                    Path.Combine(AppContext.BaseDirectory, "MediaMTX"),
                    Path.Combine(AppContext.BaseDirectory, "mediamtx"),
                    AppContext.BaseDirectory
                };

                // סינון נתיבים כפולים למניעת ריצה כפולה על אותו קובץ ב-Windows
                var distinctPaths = possibleDirs
                    .Select(d => Path.Combine(d, "mediamtx.yml"))
                    .Where(File.Exists)
                    .Select(Path.GetFullPath)
                    .Distinct(StringComparer.OrdinalIgnoreCase)
                    .ToList();

                foreach (var yamlPath in distinctPaths)
                {
                    string yaml = File.ReadAllText(yamlPath);
                    var lines = yaml.Split(new[] { "\r\n", "\r", "\n" }, StringSplitOptions.None).ToList();
                    bool changed = false;

                    // 1. ניקוי שורות שהוזרקו בטעות לראש הקובץ (Lines 0..10)
                    for (int i = Math.Min(lines.Count - 1, 10); i >= 0; i--)
                    {
                        var trimmed = lines[i].Trim();
                        if (trimmed.StartsWith("api:") || trimmed.StartsWith("apiAddress:"))
                        {
                            bool existsLater = lines.Skip(i + 1).Any(l => Regex.IsMatch(l, @"^\s*#?\s*" + Regex.Escape(trimmed.Split(':')[0]) + @"\s*:"));
                            if (existsLater)
                            {
                                lines.RemoveAt(i);
                                changed = true;
                            }
                        }
                    }

                    // 2. עדכון מפתח ה-api במקומו הטבעי בקובץ
                    bool apiFound = false;
                    for (int i = 0; i < lines.Count; i++)
                    {
                        if (Regex.IsMatch(lines[i], @"^\s*#?\s*api\s*:\s*.*$") && !lines[i].Contains("apiAddress") && !lines[i].Contains("apiAllowOrigins"))
                        {
                            if (!apiFound)
                            {
                                if (lines[i] != "api: yes")
                                {
                                    lines[i] = "api: yes";
                                    changed = true;
                                }
                                apiFound = true;
                            }
                            else
                            {
                                lines.RemoveAt(i);
                                i--;
                                changed = true;
                            }
                        }
                    }

                    if (!apiFound)
                    {
                        lines.Add("api: yes");
                        changed = true;
                    }

                    // 3. עדכון מפתח apiAddress במקומו הטבעי
                    bool apiAddrFound = false;
                    string targetApiAddr = $"apiAddress: :{apiPort}";
                    for (int i = 0; i < lines.Count; i++)
                    {
                        if (Regex.IsMatch(lines[i], @"^\s*#?\s*apiAddress\s*:\s*.*$"))
                        {
                            if (!apiAddrFound)
                            {
                                if (lines[i] != targetApiAddr)
                                {
                                    lines[i] = targetApiAddr;
                                    changed = true;
                                }
                                apiAddrFound = true;
                            }
                            else
                            {
                                lines.RemoveAt(i);
                                i--;
                                changed = true;
                            }
                        }
                    }

                    if (!apiAddrFound)
                    {
                        lines.Add(targetApiAddr);
                        changed = true;
                    }

                    if (changed)
                    {
                        File.WriteAllText(yamlPath, string.Join("\r\n", lines));
                        Logger.AlwaysInfo($"[MEDIAMTX-CONFIG] Cleaned duplicate keys and configured Control API on port {apiPort} in '{yamlPath}'.");
                    }
                }
            }
            catch (Exception ex)
            {
                Logger.Warn($"[MEDIAMTX-CONFIG] Could not pre-configure mediamtx.yml: {ex.Message}");
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