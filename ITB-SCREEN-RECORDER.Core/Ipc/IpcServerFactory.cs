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
        /// יוצר צינור תקשורת (Named Pipe) מוגן וחוצה-הרשאות (Cross-Session).
        /// תחת Windows, הוא פותח את הצינור כך ש-Worker שרץ כמשתמש רגיל יוכל לדבר עם Service שרץ כ-SYSTEM.
        /// </summary>
        public static NamedPipeServerStream CreateSecureServerPipe(string pipeName)
        {
            if (OperatingSystem.IsWindows())
            {
#if WINDOWS
                // הגדרת הרשאות: גישה ציבורית לקריאה/כתיבה לכל המשתמשים במכונה (WorldSid)
                var pipeSecurity = new PipeSecurity();
                pipeSecurity.AddAccessRule(new PipeAccessRule(
                    new SecurityIdentifier(WellKnownSidType.WorldSid, null),
                    PipeAccessRights.ReadWrite,
                    AccessControlType.Allow));

                return NamedPipeServerStreamAcl.Create(
                    pipeName,
                    PipeDirection.InOut,
                    1, // מאפשר חיבור של Worker אחד בלבד בו-זמנית
                    PipeTransmissionMode.Byte,
                    PipeOptions.Asynchronous,
                    0,
                    0,
                    pipeSecurity);
#else
                return new NamedPipeServerStream(pipeName, PipeDirection.InOut, 1, PipeTransmissionMode.Byte, PipeOptions.Asynchronous);
#endif
            }

            // התנהגות ברירת המחדל תחת Linux/Systemd (ניהול הרשאות נעשה דרך ה-File System Sockets)
            return new NamedPipeServerStream(
                pipeName,
                PipeDirection.InOut,
                1,
                PipeTransmissionMode.Byte,
                PipeOptions.Asynchronous);
        }
    }
}