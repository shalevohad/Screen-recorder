using System;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace ITBRecorderAgent.Core
{
    public class TelemetryReporter : IDisposable
    {
        private readonly HttpClient _httpClient;
        private readonly string _dashboardApiUrl;

        // החיווי הפומבי שיקבע האם ה-Middleware זמין
        public bool IsOnline { get; private set; }

        public TelemetryReporter(string dashboardApiUrl)
        {
            _dashboardApiUrl = dashboardApiUrl;
            _httpClient = new HttpClient { Timeout = TimeSpan.FromSeconds(3) };
            IsOnline = false; // ברירת מחדל: מניחים שהשרת למטה עד שיוכח אחרת
        }

        public async Task StartReportingAsync(Func<AgentTelemetry> getStatus, CancellationToken cancellationToken)
        {
            // אם הכתובת ריקה בקונפיג, נעביר את הסטטוס ל-True כדי לא לחסום את המערכת סתם
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
                    AgentTelemetry status = getStatus();
                    var content = new StringContent(status.ToJson(), Encoding.UTF8, "application/json");

                    var response = await _httpClient.PostAsync(_dashboardApiUrl, content, cancellationToken);

                    // מתעדכן ל-True רק אם ה-Middleware החזיר HTTP Success (למשל 200 OK)
                    IsOnline = response.IsSuccessStatusCode;
                }
                catch (TaskCanceledException) { break; }
                catch
                {
                    // שגיאת תקשורת / Timeout / Middleware למטה
                    IsOnline = false;
                }

                // הדפסה ללוג רק כאשר יש שינוי סטטוס
                if (IsOnline != wasOnline)
                {
                    if (IsOnline) Logger.Info("[TELEMETRY] Middleware connection established. Green light.");
                    else Logger.Warn("[TELEMETRY] Middleware unreachable. Red light.");
                }

                await Task.Delay(5000, cancellationToken);
            }
        }

        public void Dispose() => _httpClient?.Dispose();
    }
}