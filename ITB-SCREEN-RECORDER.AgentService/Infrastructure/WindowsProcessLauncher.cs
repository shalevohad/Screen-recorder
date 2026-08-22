#if WINDOWS
using System.Diagnostics;
using System.Runtime.InteropServices;

namespace ITB_SCREEN_RECORDER.AgentService.Infrastructure
{
    public static class WindowsProcessLauncher
    {
        [DllImport("kernel32.dll")]
        private static extern uint WTSGetActiveConsoleSessionId();

        [DllImport("wtsapi32.dll", SetLastError = true)]
        private static extern bool WTSQueryUserToken(uint sessionId, out IntPtr phToken);

        [DllImport("advapi32.dll", SetLastError = true, CharSet = CharSet.Auto)]
        private static extern bool DuplicateTokenEx(
            IntPtr hExistingToken,
            uint dwDesiredAccess,
            IntPtr lpTokenAttributes,
            int impersonationLevel,
            int tokenType,
            out IntPtr phNewToken);

        [DllImport("advapi32.dll", SetLastError = true, CharSet = CharSet.Unicode)]
        private static extern bool CreateProcessAsUser(
            IntPtr hToken,
            string? lpApplicationName,
            string lpCommandLine,
            IntPtr lpProcessAttributes,
            IntPtr lpThreadAttributes,
            bool bInheritHandles,
            uint dwCreationFlags,
            IntPtr lpEnvironment,
            string? lpCurrentDirectory,
            ref STARTUPINFO lpStartupInfo,
            out PROCESS_INFORMATION lpProcessInformation);

        [DllImport("kernel32.dll", SetLastError = true)]
        private static extern bool CloseHandle(IntPtr hObject);

        [StructLayout(LayoutKind.Sequential)]
        private struct STARTUPINFO
        {
            public int cb;
            public string lpReserved;
            public string lpDesktop;
            public string lpTitle;
            public int dwX, dwY, dwXSize, dwYSize, dwXCountChars, dwYCountChars, dwFillAttribute, dwFlags;
            public short wShowWindow, cbReserved2;
            public IntPtr lpReserved2, hStdInput, hStdOutput, hStdError;
        }

        [StructLayout(LayoutKind.Sequential)]
        private struct PROCESS_INFORMATION
        {
            public IntPtr hProcess;
            public IntPtr hThread;
            public int dwProcessId;
            public int dwThreadId;
        }

        public static uint GetActiveSessionId() => WTSGetActiveConsoleSessionId();

        public static bool StartWorkerInActiveSession(string workerExePath, string arguments)
        {
            uint sessionId = GetActiveSessionId();
            if (sessionId == 0xFFFFFFFF || sessionId == 0) return false;

            IntPtr userToken = IntPtr.Zero;
            IntPtr duplicatedToken = IntPtr.Zero;

            try
            {
                if (!WTSQueryUserToken(sessionId, out userToken))
                    return false;

                if (!DuplicateTokenEx(userToken, 0x10000000, IntPtr.Zero, 2, 1, out duplicatedToken))
                    return false;

                var si = new STARTUPINFO();
                si.cb = Marshal.SizeOf(si);
                si.lpDesktop = @"winsta0\default";

                var pi = new PROCESS_INFORMATION();
                string cmdLine = $"\"{workerExePath}\" {arguments}";

                bool success = CreateProcessAsUser(
                    duplicatedToken,
                    null,
                    cmdLine,
                    IntPtr.Zero,
                    IntPtr.Zero,
                    false,
                    0x00000020 | 0x08000000, // NORMAL_PRIORITY | CREATE_NO_WINDOW
                    IntPtr.Zero,
                    Path.GetDirectoryName(workerExePath),
                    ref si,
                    out pi);

                if (success)
                {
                    CloseHandle(pi.hProcess);
                    CloseHandle(pi.hThread);
                }

                return success;
            }
            finally
            {
                if (userToken != IntPtr.Zero) CloseHandle(userToken);
                if (duplicatedToken != IntPtr.Zero) CloseHandle(duplicatedToken);
            }
        }

        public static void TerminateWorkerProcesses()
        {
            foreach (var proc in Process.GetProcessesByName("ITB-SCREEN-RECORDER.AgentWorker"))
            {
                try { proc.Kill(true); } catch { }
            }
        }
    }
}

#endif