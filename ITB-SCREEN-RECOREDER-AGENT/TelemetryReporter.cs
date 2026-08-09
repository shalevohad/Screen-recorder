using System;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Models; // הפניה ל-Core המשותף

namespace ITBRecorderAgent.Core
{
    public class TelemetryReporter : IDisposable
    {
        private readonly HttpClient _httpClient;
        private readonly string _dashboardApiUrl;

        public bool IsOnline { get; private set; }

        public TelemetryReporter(string dashboardApiUrl)
        {
            _dashboardApiUrl = dashboardApiUrl;
            _httpClient = new HttpClient { Timeout = TimeSpan.FromSeconds(3) };
            IsOnline = false;
        }

        public async Task StartReportingAsync(Func<AgentTelemetryReport> getReport, Action<AgentHeartbeatResponse> onCommandReceived, CancellationToken cancellationToken)
        {
            if (string.IsNullOrEmpty(_dashboardApiUrl))
            {
                IsOnline = true;
                return;
            }

            while (!cancellationToken.IsCancellationRequested)
            {
                bool wasOnline = IsOnline;

                try
                {
                    AgentTelemetryReport report = getReport();

                    // שימוש ב-PostAsJsonAsync המובנה והמהיר של .NET 8
                    var response = await _httpClient.PostAsJsonAsync(_dashboardApiUrl, report, cancellationToken).ConfigureAwait(false);

                    if (response.IsSuccessStatusCode)
                    {
                        IsOnline = true;
                        var commandResponse = await response.Content.ReadFromJsonAsync<AgentHeartbeatResponse>(cancellationToken).ConfigureAwait(false);

                        if (commandResponse != null)
                        {
                            onCommandReceived(commandResponse);
                        }
                    }
                    else
                    {
                        IsOnline = false;
                    }
                }
                catch (TaskCanceledException) { break; }
                catch
                {
                    IsOnline = false;
                }

                if (IsOnline != wasOnline)
                {
                    if (IsOnline) Logger.Info("[TELEMETRY] Middleware connection established. Control Engine synchronized.");
                    else Logger.Warn("[TELEMETRY] Middleware unreachable. Switching status to Standalone.");
                }

                await Task.Delay(5000, cancellationToken).ConfigureAwait(false);
            }
        }

        public void Dispose() => _httpClient?.Dispose();
    }
}