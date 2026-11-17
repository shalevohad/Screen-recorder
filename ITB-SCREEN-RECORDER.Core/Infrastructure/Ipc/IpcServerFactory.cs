using System;
using System.IO.Pipes;

#if WINDOWS
using System.Security.AccessControl;
using System.Security.Principal;
#endif

namespace ITB_SCREEN_RECORDER.Core.Ipc
{
    public static class IpcServerFactory
    {
        /// <summary>
        /// Creates a protected, cross-session NamedPipeServerStream.
        /// Under Windows, configures ACLs so that interactive user processes (Session 1+) can communicate
        /// with the background service running under NT AUTHORITY\SYSTEM (Session 0).
        /// </summary>
        /// <param name="pipeName">The unique named pipe identifier.</param>
        /// <returns>Configured and initialized NamedPipeServerStream instance.</returns>
        public static NamedPipeServerStream CreateSecureServerPipe(string pipeName)
        {
            if (OperatingSystem.IsWindows())
            {
#if WINDOWS
                // Security configuration: Grant read/write access to all local machine users (WorldSid)
                var pipeSecurity = new PipeSecurity();
                pipeSecurity.AddAccessRule(new PipeAccessRule(
                    new SecurityIdentifier(WellKnownSidType.WorldSid, null),
                    PipeAccessRights.ReadWrite,
                    AccessControlType.Allow));

                return NamedPipeServerStreamAcl.Create(
                    pipeName,
                    PipeDirection.InOut,
                    1, // Enforce single active worker client connection at any given time
                    PipeTransmissionMode.Byte,
                    PipeOptions.Asynchronous,
                    0,
                    0,
                    pipeSecurity);
#else
                return new NamedPipeServerStream(pipeName, PipeDirection.InOut, 1, PipeTransmissionMode.Byte, PipeOptions.Asynchronous);
#endif
            }

            // Default behavior under Linux/systemd (filesystem permissions govern socket access)
            return new NamedPipeServerStream(
                pipeName,
                PipeDirection.InOut,
                1,
                PipeTransmissionMode.Byte,
                PipeOptions.Asynchronous);
        }
    }
}