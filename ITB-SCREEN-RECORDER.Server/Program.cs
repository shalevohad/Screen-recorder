using System;
using System.IO; // חובה עבור Directory
using System.Threading;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using ITB_SCREEN_RECORDER.Server.Services;
using ITB_SCREEN_RECORDER.Core.Configuration;

namespace ITB_SCREEN_RECORDER.Server
{
    public class Program
    {
        private const string MutexName = "ITB_SERVER_SINGLE_INSTANCE_DEV";

        public static void Main(string[] args)
        {
            // 1. קריטי ל-Windows Services ול-Systemd: קביעת נתיב העבודה לתיקיית ההתקנה הפיזית
            // זה מבטיח שהשרת תמיד ימצא את appsettings.json ו-mediamtx.yml
            Directory.SetCurrentDirectory(AppContext.BaseDirectory);

            // מניעת הרצת אינסטנסים כפולים ברמת מערכת ההפעלה
            using var serverMutex = new Mutex(true, MutexName, out bool createdNew);
            if (!createdNew)
            {
                Console.WriteLine("[CRITICAL] Another instance of ITB-SCREEN-RECORDER Server is already running. Shutting down.");
                return;
            }

            var builder = WebApplication.CreateBuilder(args);

            // 2. תמיכה שקופה ב-Windows Services (מופעל רק אם רץ תחת SCM בחלונות)
            builder.Host.UseWindowsService(options =>
            {
                options.ServiceName = "ITB_ServerService";
            });

            // 3. תמיכה שקופה ב-Linux Systemd (מופעל רק אם רץ תחת Systemd בלינוקס)
            builder.Host.UseSystemd();

            // 4. Single Source of Truth: טעינה, מיפוי ואימות של ה-SystemConfig מתוך appsettings.json
            builder.Services.AddOptions<SystemConfig>()
                .Bind(builder.Configuration.GetSection("SystemConfig"))
                .ValidateDataAnnotations()
                .ValidateOnStart(); // קריסה יזומה בעלייה אם חסר פורט או נתיב בקובץ ה-JSON

            // 5. רישום שירותי ליבה ב-DI Container
            builder.Services.AddControllers()
                .AddJsonOptions(options =>
                {
                    // מאפשר לשרת לקבל מספרים ולתרגם אותם ל-Enum של C# בצורה חלקה
                    options.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter());
                    // מבטל רגישות לאותיות גדולות/קטנות בשמות השדות
                    options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
                });
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // שירות ניהול ה-State של הטרמינלים ב-RAM
            builder.Services.AddSingleton<ITelemetryStateService, TelemetryStateService>();

            // תשתית HTTP + שירותי ניהול אחסון והקלטה
            builder.Services.AddHttpClient();
            builder.Services.AddSingleton<StoragePathResolver>();
            builder.Services.AddSingleton<MediaMtxApiClient>();
            builder.Services.AddSingleton<EventLogger>();

            // שירות רקע (Background Worker) המנהל ומנטר את תהליך ה-MediaMTX הבינארי
            builder.Services.AddHostedService<MediaMtxSupervisorWorker>();

            // שירות רקע האחראי על חיתוך הקלטות מדויק לפי שעון קיר
            builder.Services.AddHostedService<RecordingChunkScheduler>();

            var app = builder.Build();

            // 6. הגדרת Pipeline הטיפול בבקשות
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            // הגשת הדשבורד הסטטי (React)
            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseRouting();
            app.UseAuthorization();

            app.MapControllers();

            Console.WriteLine("[SERVER] ITB-SCREEN-RECORDER Middleware initialized successfully.");

            // 7. הרצה דינמית - Kestrel קורא אוטומטית את הגדרות השרת והפורטים
            app.Run();
        }
    }
}