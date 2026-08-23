#if WINDOWS

using System;
using System.IO;
using System.Runtime.InteropServices;

namespace ITB_SCREEN_RECORDER.AgentService.Infrastructure
{
    public static class InteractiveProcessLauncher
    {
        [DllImport("kernel32.dll", SetLastError = true)]
        private static extern uint WTSGetActiveConsoleSessionId();

        [DllImport("wtsapi32.dll", SetLastError = true)]
        private static extern bool WTSQueryUserToken(uint sessionId, out IntPtr phToken);

        // API ליצירת בלוק משתני הסביבה המדויק של המשתמש
        [DllImport("userenv.dll", SetLastError = true)]
        private static extern bool CreateEnvironmentBlock(out IntPtr lpEnvironment, IntPtr hToken, bool bInherit);

        [DllImport("userenv.dll", SetLastError = true)]
        private static extern bool DestroyEnvironmentBlock(IntPtr lpEnvironment);

        [DllImport("advapi32.dll", SetLastError = true, CharSet = CharSet.Unicode)]
        private static extern bool CreateProcessAsUserW(
            IntPtr hToken,
            string? lpApplicationName,
            string? lpCommandLine,
            IntPtr lpProcessAttributes,
            IntPtr lpThreadAttributes,
            bool bInheritHandles,
            uint dwCreationFlags,
            IntPtr lpEnvironment,
            string? lpCurrentDirectory,
            ref STARTUPINFO lpStartupInfo,
            out PROCESS_INFORMATION lpProcessInformation);

        [DllImport("kernel32.dll", SetLastError = true)]
        private static extern bool CloseHandle(IntPtr hHandle);

        [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Unicode)]
        private struct STARTUPINFO
        {
            public int cb;
            public string lpReserved;
            public string lpDesktop;
            public string lpTitle;
            public uint dwX; public uint dwY; public uint dwXSize; public uint dwYSize;
            public uint dwXCountChars; public uint dwYCountChars; public uint dwFillAttribute;
            public uint dwFlags; public short wShowWindow; public short cbReserved2;
            public IntPtr lpReserved2; public IntPtr hStdInput; public IntPtr hStdOutput; public IntPtr hStdError;
        }

        [StructLayout(LayoutKind.Sequential)]
        private struct PROCESS_INFORMATION
        {
            public IntPtr hProcess;
            public IntPtr hThread;
            public uint dwProcessId;
            public uint dwThreadId;
        }

        // דגל שמורה ל-Windows לקרוא את משתני הסביבה בפורמט הנכון
        private const uint CREATE_UNICODE_ENVIRONMENT = 0x00000400;

        public static bool StartProcessInActiveSession(string appPath, string arguments = "")
        {
            uint sessionId = WTSGetActiveConsoleSessionId();
            if (sessionId == 0xFFFFFFFF) return false;

            IntPtr userToken = IntPtr.Zero;
            IntPtr envBlock = IntPtr.Zero;

            try
            {
                if (!WTSQueryUserToken(sessionId, out userToken))
                {
                    Console.WriteLine($"[InteractiveLauncher] WTSQueryUserToken failed. Error: {Marshal.GetLastWin32Error()}");
                    return false;
                }

                // 1. קריטי: בניית סביבת המשתמש (מניעת שגיאת 0xc0000142)
                if (!CreateEnvironmentBlock(out envBlock, userToken, false))
                {
                    Console.WriteLine($"[InteractiveLauncher] CreateEnvironmentBlock failed. Error: {Marshal.GetLastWin32Error()}");
                    return false;
                }

                var startupInfo = new STARTUPINFO();
                startupInfo.cb = Marshal.SizeOf(startupInfo);

                // 2. שיוך לשולחן העבודה הפעיל של המשתמש לצורך הקלטת מסך
                startupInfo.lpDesktop = @"winsta0\default";

                string workDir = Path.GetDirectoryName(appPath) ?? AppContext.BaseDirectory;
                string cmdLine = $"\"{appPath}\" {arguments}";

                // 3. שיגור התהליך עם ה-Token ועם בלוק המשתנים שיצרנו
                bool result = CreateProcessAsUserW(
                    userToken,
                    null,
                    cmdLine,
                    IntPtr.Zero,
                    IntPtr.Zero,
                    false,
                    CREATE_UNICODE_ENVIRONMENT,
                    envBlock,
                    workDir,
                    ref startupInfo,
                    out PROCESS_INFORMATION processInfo);

                if (result)
                {
                    CloseHandle(processInfo.hProcess);
                    CloseHandle(processInfo.hThread);
                }
                else
                {
                    Console.WriteLine($"[InteractiveLauncher] CreateProcessAsUserW failed. Error: {Marshal.GetLastWin32Error()}");
                }

                return result;
            }
            finally
            {
                // ניקוי זיכרון חובה
                if (envBlock != IntPtr.Zero) DestroyEnvironmentBlock(envBlock);
                if (userToken != IntPtr.Zero) CloseHandle(userToken);
            }
        }
    }
}
#endif