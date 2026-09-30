namespace ITB_SCREEN_RECORDER.Core.Abstractions;

using System;
using System.Data;
using System.IO;
using System.Runtime.InteropServices;
using Microsoft.Data.Sqlite;
using Microsoft.Extensions.Configuration;

public abstract class BaseSqliteConnectionFactory
{
    private readonly string _connectionString;
    private readonly int _busyTimeoutMs;
    public string DatabasePath { get; }

    static BaseSqliteConnectionFactory()
    {
        EnsureSqliteNativeLoaded();
    }

    private static void EnsureSqliteNativeLoaded()
    {
        try
        {
            bool isWindows = RuntimeInformation.IsOSPlatform(OSPlatform.Windows);
            string libName = isWindows ? "e_sqlite3.dll" : "libe_sqlite3.so";
            string rid = isWindows ? "win-x64" : "linux-x64";
            string baseDir = AppContext.BaseDirectory;

            // נתיבי חיפוש אפשריים: שורש הפלט, תת-ספריית runtimes של NuGet, או סביבת פיתוח
            string[] probePaths =
            [
                Path.Combine(baseDir, libName),
                Path.Combine(baseDir, "runtimes", rid, "native", libName),
                Path.Combine(baseDir, "..", "..", "runtimes", rid, "native", libName)
            ];

            foreach (var path in probePaths)
            {
                if (File.Exists(path) && NativeLibrary.TryLoad(path, out _))
                {
                    break;
                }
            }

            // אתחול מנוע הסוללות של SQLitePCL
            SQLitePCL.Batteries_V2.Init();
        }
        catch
        {
            // המשך - ייכשל עם פירוט מדויק בעת פתיחת החיבור אם הקובץ לא יימצא
        }
    }

    /// <summary>
    /// קונסטרקטור מבוסס IConfiguration - שולף נתיבים וזמני Timeout מתוך הקונפיגורציה
    /// </summary>
    protected BaseSqliteConnectionFactory(IConfiguration configuration, string dbFileName)
        : this(
            dbFileName: dbFileName,
            customDirectory: configuration?["Database:BaseDirectory"],
            busyTimeoutSeconds: configuration?.GetValue<int>("Database:BusyTimeoutSeconds", 5) ?? 5)
    {
    }

    /// <summary>
    /// קונסטרקטור בסיסי - תומך בנתיב ישיר ומטפל בברירות מחדל חוצות-פלטפורמות
    /// </summary>
    protected BaseSqliteConnectionFactory(string dbFileName, string? customDirectory = null, int busyTimeoutSeconds = 5)
    {
        if (string.IsNullOrWhiteSpace(dbFileName))
        {
            throw new ArgumentNullException(nameof(dbFileName));
        }

        var targetDirectory = !string.IsNullOrWhiteSpace(customDirectory)
            ? customDirectory
            : ResolveDefaultDataDirectory();

        try
        {
            Directory.CreateDirectory(targetDirectory);
        }
        catch
        {
            // Fallback: במקרה של חוסר הרשאות בנתיב היעד (כגון סביבת Linux מוגבלת), שימוש בתיקיית הריצה
            targetDirectory = AppContext.BaseDirectory;
            Directory.CreateDirectory(targetDirectory);
        }

        DatabasePath = Path.Combine(targetDirectory, dbFileName);
        _busyTimeoutMs = Math.Max(1000, busyTimeoutSeconds * 1000);

        var builder = new SqliteConnectionStringBuilder
        {
            DataSource = DatabasePath,
            Mode = SqliteOpenMode.ReadWriteCreate,
            Cache = SqliteCacheMode.Shared,
            DefaultTimeout = busyTimeoutSeconds
        };

        _connectionString = builder.ToString();
    }

    private static string ResolveDefaultDataDirectory()
    {
        if (OperatingSystem.IsLinux())
        {
            return "/var/lib/itb-screen-recorder/data";
        }

        return Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.CommonApplicationData),
            "ITB-SCREEN-RECORDER",
            "Data");
    }

    public IDbConnection CreateConnection()
    {
        var connection = new SqliteConnection(_connectionString);
        connection.Open();

        using var cmd = connection.CreateCommand();
        cmd.CommandText = $@"
            PRAGMA journal_mode = WAL;
            PRAGMA synchronous = NORMAL;
            PRAGMA busy_timeout = {_busyTimeoutMs};
        ";
        cmd.ExecuteNonQuery();

        return connection;
    }
}