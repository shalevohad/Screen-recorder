using ITB_SCREEN_RECORDER.AgentService;

var builder = Host.CreateApplicationBuilder(args);

builder.Services.AddWindowsService(options =>
{
    options.ServiceName = "ITB-SCREEN-RECORDER.AgentService";
});
builder.Services.AddSystemd();

builder.Services.AddHostedService<AgentSupervisorService>();

var host = builder.Build();
host.Run();