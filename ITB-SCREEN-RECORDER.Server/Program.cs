using System;
using System.Threading;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using ITB_SCREEN_RECORDER.Core.Models;
using ITB_SCREEN_RECORDER.Server.Services;

namespace ITB_SCREEN_RECORDER.Server
{
    public class Program
    {
        private const string MutexName = "ITB_SERVER_SINGLE_INSTANCE_DEV";

        public static void Main(string[] args)
        {
            // מניעת הרצת אינסטנסים כפולים ברמת מערכת ההפעלה
            using var serverMutex = new Mutex(true, MutexName, out bool createdNew);
            if (!createdNew)
            {
                Console.WriteLine("[CRITICAL] Another instance of ITB-SCREEN-RECORDER Server is already running. Shutting down.");
                return;
            }

            var builder = WebApplication.CreateBuilder(args);

            // 1. Single Source of Truth: טעינה, מיפוי ואימות של ה-SystemConfig מתוך appsettings.json
            builder.Services.AddOptions<SystemConfig>()
                .Bind(builder.Configuration.GetSection("SystemConfig"))
                .ValidateDataAnnotations()
                .ValidateOnStart(); // קריסה יזומה בעלייה אם חסר פורט או נתיב בקובץ ה-JSON

            // 2. רישום שירותי ליבה ב-DI Container
            builder.Services.AddControllers()
                .AddJsonOptions(options =>
                {
                    // 1. מאפשר לשרת לקבל מספרים (כמו 1) ולתרגם אותם ל-Enum של C# בצורה חלקה
                    options.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter());

                    // 2. מבטל רגישות לאותיות גדולות/קטנות בשמות השדות (חסינות מפני camelCase)
                    options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
                });
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // שירות ניהול ה-State של הטרמינלים ב-RAM
            builder.Services.AddSingleton<ITelemetryStateService, TelemetryStateService>();

            // תשתית HTTP + שירותי ניהול אחסון והקלטה (NetApp/local fallback, MediaMTX Control API)
            builder.Services.AddHttpClient();
            builder.Services.AddSingleton<StoragePathResolver>();
            builder.Services.AddSingleton<MediaMtxApiClient>();
            builder.Services.AddSingleton<EventLogger>();

            // שירות רקע (Background Worker) המנהל ומנטר את תהליך ה-MediaMTX הבינארי
            builder.Services.AddHostedService<MediaMtxSupervisorWorker>();

            // שירות רקע האחראי על חיתוך הקלטות מדויק לפי שעון קיר (Wall-Clock) בהתאם ל-ChunkIntervalMinutes
            builder.Services.AddHostedService<RecordingChunkScheduler>();

            var app = builder.Build();

            // 3. הגדרת Pipeline הטיפול בבקשות (Middleware Pipeline)
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            // הגשת הדשבורד הסטטי (React) מתוך תיקיית wwwroot ללא צורך בשרת אינטרנט חיצוני
            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseRouting();
            app.UseAuthorization();

            app.MapControllers();

            Console.WriteLine("[SERVER] ITB-SCREEN-RECORDER Middleware initialized successfully.");

            // 4. הרצה דינמית - Kestrel קורא אוטומטית את הגדרות השרת והפורטים מבלוק ה-Kestrel ב-appsettings.json
            app.Run();
        }
    }
}