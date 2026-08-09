using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Models; // שימוש במודל המשותף מה-Core

namespace ITBRecorderAgent
{
    public class TelemetryReporter
    {
        private readonly HttpClient _httpClient;
        private readonly string _dashboardApiUrl;
        private readonly int _reportIntervalSeconds;
        public bool IsOnline { get; private set; }

        public TelemetryReporter(string dashboardApiUrl, int reportIntervalSeconds = 3)
        {
            _dashboardApiUrl = dashboardApiUrl;
            _reportIntervalSeconds = reportIntervalSeconds;
            _httpClient = new HttpClient { Timeout = TimeSpan.FromSeconds(5) };
        }

        public async Task StartReportingAsync(
            Func<AgentTelemetryReport> reportFactory,
            Action<AgentHeartbeatResponse> commandHandler, // מחווט ישירות ל-HandleServerCommand
            CancellationToken cancellationToken)
        {
            Logger.Info($"[TELEMETRY] Heartbeat loop started -> {_dashboardApiUrl}");

            // הגדרות JSON תואמות ל-Core (אינטרפרטציה גמישה ל-Case והמרת Enums ל-String אם צריך)
            var jsonOptions = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                Converters = { new JsonStringEnumConverter() },
                PropertyNameCaseInsensitive = true
            };

            while (!cancellationToken.IsCancellationRequested)
            {
                try
                {
                    // 1. גזירת הפריים העדכני של ה-Telemetry
                    AgentTelemetryReport report = reportFactory();
                    string jsonPayload = JsonSerializer.Serialize(report, jsonOptions);
                    using var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

                    // 2. שיגור ה-POST לשרת
                    HttpResponseMessage response = await _httpClient.PostAsync(_dashboardApiUrl, content, cancellationToken).ConfigureAwait(false);

                    if (response.IsSuccessStatusCode)
                    {
                        if (!IsOnline)
                        {
                            IsOnline = true;
                            Logger.Info("[TELEMETRY] Successfully connected to C2 Server!");
                        }

                        string responseJson = await response.Content.ReadAsStringAsync(cancellationToken).ConfigureAwait(false);

                        // 3. פענוח תשובת השרת והזרמתה ישירות למתודה שלך
                        var serverResponse = JsonSerializer.Deserialize<AgentHeartbeatResponse>(responseJson, jsonOptions);
                        if (serverResponse != null)
                        {
                            commandHandler(serverResponse); // 💡 קריאה ל-HandleServerCommand
                        }
                    }
                    else
                    {
                        IsOnline = false;
                        Logger.Warn($"[TELEMETRY] Server rejected heartbeat. Status: {response.StatusCode}");
                    }
                }
                catch (Exception ex)
                {
                    if (IsOnline)
                    {
                        IsOnline = false;
                        Logger.Error($"[TELEMETRY ERROR] Lost connection to Server: {ex.Message}");
                    }
                }

                await Task.Delay(TimeSpan.FromSeconds(_reportIntervalSeconds), cancellationToken).ConfigureAwait(false);
            }
        }
    }
}