using Microsoft.AspNetCore.SignalR;
using ITB_SCREEN_RECORDER.Core.Contracts.Network;
using System.Threading.Tasks;

namespace ITB_SCREEN_RECORDER.Server.Services
{
    public class TelemetryHub : Hub
    {
        public override async Task OnConnectedAsync()
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, "DashboardWatchers");
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(System.Exception? exception)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, "DashboardWatchers");
            await base.OnDisconnectedAsync(exception);
        }
    }

    public class TelemetryBroadcastService
    {
        private readonly IHubContext<TelemetryHub> _hubContext;

        public TelemetryBroadcastService(IHubContext<TelemetryHub> hubContext)
        {
            _hubContext = hubContext;
        }

        public async Task BroadcastAgentUpdateAsync(AgentTelemetryReport report)
        {
            await _hubContext.Clients.Group("DashboardWatchers").SendAsync("ReceiveAgentMetrics", report);
        }

        public async Task BroadcastServerTelemetryAsync(object serverTelemetry)
        {
            await _hubContext.Clients.Group("DashboardWatchers").SendAsync("ReceiveServerTelemetry", serverTelemetry);
        }
    }
}