namespace ITB_SCREEN_RECORDER.Server.Services.Security;

using System;
using System.Runtime.InteropServices;
using System.Security.Principal;
using ITB_SCREEN_RECORDER.Server.Data.Repositories;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

public static class RootPasswordRecovery
{
    [DllImport("libc")]
    private static extern uint geteuid();

    public static bool CheckLocalElevation()
    {
        if (OperatingSystem.IsWindows())
        {
            using var identity = WindowsIdentity.GetCurrent();
            var principal = new WindowsPrincipal(identity);
            return principal.IsInRole(WindowsBuiltInRole.Administrator);
        }

        if (OperatingSystem.IsLinux() || OperatingSystem.IsMacOS())
        {
            return geteuid() == 0;
        }

        return false;
    }

    public static bool TryHandleCliRecovery(string[] args, IHost host)
    {
        for (int i = 0; i < args.Length; i++)
        {
            if (string.Equals(args[i], "--reset-root-password", StringComparison.OrdinalIgnoreCase))
            {
                if (i + 1 >= args.Length || string.IsNullOrWhiteSpace(args[i + 1]))
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine("[ERROR] Missing new password argument. Usage: --reset-root-password <NewPassword>");
                    Console.ResetColor();
                    Environment.Exit(1);
                    return true;
                }

                string newPassword = args[i + 1];

                if (!CheckLocalElevation())
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine("[SECURITY DENIED] Password recovery requires elevated local OS administrator privileges (Run as Administrator / root).");
                    Console.ResetColor();
                    Environment.Exit(1);
                    return true;
                }

                if (newPassword.Length < 8)
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine("[ERROR] Password must be at least 8 characters long.");
                    Console.ResetColor();
                    Environment.Exit(1);
                    return true;
                }

                try
                {
                    using var scope = host.Services.CreateScope();
                    var repo = scope.ServiceProvider.GetRequiredService<ICatalogRepository>();

                    string newHash = PasswordHasher.Hash(newPassword);
                    bool success = repo.ResetRootPasswordDirectAsync(newHash).GetAwaiter().GetResult();

                    if (success)
                    {
                        Console.ForegroundColor = ConsoleColor.Green;
                        Console.WriteLine("[RECOVERY SUCCESS] Root superuser password has been updated successfully.");
                        Console.WriteLine("You may now start the server normally and authenticate.");
                        Console.ResetColor();
                        Environment.Exit(0);
                    }
                    else
                    {
                        Console.ForegroundColor = ConsoleColor.Red;
                        Console.WriteLine("[ERROR] Failed to locate root superuser in the database.");
                        Console.ResetColor();
                        Environment.Exit(1);
                    }
                }
                catch (Exception ex)
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine($"[CRITICAL FAILURE] Database recovery error: {ex.Message}");
                    Console.ResetColor();
                    Environment.Exit(1);
                }

                return true;
            }
        }

        return false;
    }
}