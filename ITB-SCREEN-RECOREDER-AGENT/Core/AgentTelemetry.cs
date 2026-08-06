using System;
using System.Text.Json;

namespace ITBRecorderAgent.Core
{
    public class AgentTelemetry
    {
        public string MachineName { get; set; } = Environment.MachineName;
        public string Timestamp { get; set; } = DateTime.UtcNow.ToString("o");

        // חיווי על תקינות ערוצי הזרמת המדיה
        public bool IsFfmpegRunning { get; set; }
        public bool IsScreenCapturing { get; set; }

        // חיווי אמיתי על מצב חומרת האודיו בעמדה
        public bool HasActiveSpeakers { get; set; }
        public bool HasActiveMicrophone { get; set; }

        public string ToJson()
        {
            return JsonSerializer.Serialize(this, new JsonSerializerOptions { WriteIndented = false });
        }
    }
}