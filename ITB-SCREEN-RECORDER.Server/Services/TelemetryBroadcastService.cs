using Microsoft.AspNetCore.SignalR;
using ITB_SCREEN_RECORDER.Core.Contracts.Network;
using System.Threading.Tasks;

namespace ITB_SCREEN_RECORDER.Server.Services
{
    // Hub המנהל את קבוצות החיבורים של משתמשי הפאנל ב-React
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

    // השירות העסקי שמזריק נתונים אל תוך ה-Hub ב-Fire and Forget
    public class TelemetryBroadcastService
    {
        private readonly IHubContext<TelemetryHub> _hubContext;

        public TelemetryBroadcastService(IHubContext<TelemetryHub> hubContext)
        {
            _hubContext = hubContext;
        }

        public async Task BroadcastAgentUpdateAsync(AgentTelemetryReport report)
        {
            // דחיפת המידע המלא בזמן אמת לכל הדפדפנים המחוברים
            await _hubContext.Clients.Group("DashboardWatchers").SendAsync("ReceiveAgentMetrics", report);
        }
    }
}