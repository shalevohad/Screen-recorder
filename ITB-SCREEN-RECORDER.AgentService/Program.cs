using System;
using System.IO;
using System.Runtime.InteropServices;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ITB_SCREEN_RECORDER.AgentService;
using ITB_SCREEN_RECORDER.Core.Configuration;
using ITB_SCREEN_RECORDER.Core.Common;

Directory.SetCurrentDirectory(AppContext.BaseDirectory);

if (args.Length >= 2 && string.Equals(args[0], "--configure", StringComparison.OrdinalIgnoreCase))
{
    return AgentConfigurator.ApplyConfig(args[1]);
}

var builder = Host.CreateApplicationBuilder(args);

if (OperatingSystem.IsWindows())
{
#if WINDOWS
    builder.Services.AddWindowsService(options =>
    {
        options.ServiceName = "ITB-SCREEN-RECORDER.AgentService";
    });
#endif
}
else if (OperatingSystem.IsLinux())
{
    builder.Services.AddSystemd();
}

var appConfig = ConfigLoader.Load();

Logger.Initialize(appConfig, "Service");
Logger.AlwaysInfo("[SERVICE] ITB-SCREEN-RECORDER Agent Supervisor Service is starting...");

builder.Logging.ClearProviders();
builder.Logging.AddProvider(new CoreLoggerProvider());
builder.Logging.SetMinimumLevel(LogLevel.Debug);

builder.Services.AddSingleton(appConfig);

// Register parallel hosted background services for supervisor and offline buffer drain
builder.Services.AddHostedService<AgentSupervisorService>();
builder.Services.AddHostedService<OfflineBufferDrainingService>();

try
{
    var host = builder.Build();
    Logger.AlwaysInfo("[SERVICE] Host built successfully. Running service loop...");
    host.Run();
}
catch (Exception ex)
{
    Logger.Error($"[SERVICE] Fatal error during startup or execution: {ex.Message}");
}
finally
{
    Logger.AlwaysInfo("[SERVICE] Service stopped cleanly.");
}

return 0;