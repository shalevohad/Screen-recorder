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

        // Win32 API to construct the exact environment variable block for the target user token
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

        // Flag instructing Windows to read environment block formatted as Unicode
        private const uint CREATE_UNICODE_ENVIRONMENT = 0x00000400;

        public static uint GetActiveConsoleSessionId() => WTSGetActiveConsoleSessionId();

        /// <summary>
        /// Launches the worker executable inside the active interactive desktop session (Session 1+),
        /// duplicating user session token and constructing an explicit environment block to bypass Session 0 isolation.
        /// </summary>
        /// <param name="appPath">Target executable absolute path.</param>
        /// <param name="arguments">Command-line arguments.</param>
        /// <returns>True if process was spawned successfully; false otherwise.</returns>
        public static bool StartProcessInActiveSession(string appPath, string arguments = "")
        {
            uint sessionId = WTSGetActiveConsoleSessionId();
            if (sessionId == 0xFFFFFFFF || sessionId == 0) return false;

            IntPtr userToken = IntPtr.Zero;
            IntPtr envBlock = IntPtr.Zero;

            try
            {
                if (!WTSQueryUserToken(sessionId, out userToken))
                {
                    int lastError = Marshal.GetLastWin32Error();
                    bool isRunningAsSystem = false;
                    try
                    {
                        isRunningAsSystem = System.Security.Principal.WindowsIdentity.GetCurrent().IsSystem;
                    }
                    catch { }

                    if (isRunningAsSystem)
                    {
                        // When running as SYSTEM service in Session 0, never launch worker inside Session 0
                        // Await active user interactive logon into Session 1+
                        return false;
                    }

                    // Development / manual fallback when not running as SYSTEM: launch directly in current session
                    try
                    {
                        var psi = new System.Diagnostics.ProcessStartInfo
                        {
                            FileName = appPath,
                            Arguments = arguments,
                            WorkingDirectory = Path.GetDirectoryName(appPath) ?? AppContext.BaseDirectory,
                            UseShellExecute = false,
                            CreateNoWindow = true
                        };
                        var proc = System.Diagnostics.Process.Start(psi);
                        return proc != null && !proc.HasExited;
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"[InteractiveLauncher] WTSQueryUserToken failed ({lastError}) and direct fallback failed: {ex.Message}");
                        return false;
                    }
                }

                // 1. Critical: Construct user environment block to prevent error 0xc0000142
                if (!CreateEnvironmentBlock(out envBlock, userToken, false))
                {
                    Console.WriteLine($"[InteractiveLauncher] CreateEnvironmentBlock failed. Error: {Marshal.GetLastWin32Error()}");
                    return false;
                }

                var startupInfo = new STARTUPINFO();
                startupInfo.cb = Marshal.SizeOf(startupInfo);

                // 2. Associate with active interactive desktop station to enable DXGI screen capture
                startupInfo.lpDesktop = @"winsta0\default";

                string workDir = Path.GetDirectoryName(appPath) ?? AppContext.BaseDirectory;
                string cmdLine = $"\"{appPath}\" {arguments}";

                // 3. Spawn process under user token with constructed environment block
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
                // Mandatory unmanaged cleanup
                if (envBlock != IntPtr.Zero) DestroyEnvironmentBlock(envBlock);
                if (userToken != IntPtr.Zero) CloseHandle(userToken);
            }
        }
    }
}
#endif