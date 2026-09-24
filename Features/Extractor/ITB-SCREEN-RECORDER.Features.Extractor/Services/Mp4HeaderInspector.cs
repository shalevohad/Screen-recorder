// ==========================================
// File: Features/Extractor/Services/Mp4HeaderInspector.cs
// ==========================================
using System;
using System.IO;
using System.Text;

namespace ITB_SCREEN_RECORDER.Features.Extractor.Services
{
    public static class Mp4HeaderInspector
    {
        public static TimeSpan? ExtractDuration(string filePath)
        {
            try
            {
                using var fs = new FileStream(filePath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
                byte[] buffer = new byte[8];

                while (fs.Position < fs.Length)
                {
                    if (fs.Read(buffer, 0, 8) < 8) break;

                    uint size = (uint)((buffer[0] << 24) | (buffer[1] << 16) | (buffer[2] << 8) | buffer[3]);
                    string type = Encoding.ASCII.GetString(buffer, 4, 4);

                    if (size == 1) // 64-bit box size
                    {
                        byte[] largeSizeBuf = new byte[8];
                        if (fs.Read(largeSizeBuf, 0, 8) < 8) break;
                        break;
                    }

                    if (type == "moov")
                    {
                        long moovEnd = fs.Position + (size - 8);
                        while (fs.Position < moovEnd)
                        {
                            byte[] subBox = new byte[8];
                            if (fs.Read(subBox, 0, 8) < 8) break;
                            uint subSize = (uint)((subBox[0] << 24) | (subBox[1] << 16) | (subBox[2] << 8) | subBox[3]);
                            string subType = Encoding.ASCII.GetString(subBox, 4, 4);

                            if (subType == "mvhd")
                            {
                                int version = fs.ReadByte();
                                fs.Seek(3, SeekOrigin.Current); // Flags

                                uint timescale;
                                ulong duration;

                                if (version == 1)
                                {
                                    fs.Seek(16, SeekOrigin.Current); // Creation & Modification time (64-bit)
                                    byte[] buf = new byte[12];
                                    fs.Read(buf, 0, 12);
                                    timescale = (uint)((buf[0] << 24) | (buf[1] << 16) | (buf[2] << 8) | buf[3]);
                                    duration = (ulong)((buf[4] << 56) | (buf[5] << 48) | (buf[6] << 40) | (buf[7] << 32) |
                                                       (buf[8] << 24) | (buf[9] << 16) | (buf[10] << 8) | buf[11]);
                                }
                                else
                                {
                                    fs.Seek(8, SeekOrigin.Current); // Creation & Modification time (32-bit)
                                    byte[] buf = new byte[8];
                                    fs.Read(buf, 0, 8);
                                    timescale = (uint)((buf[0] << 24) | (buf[1] << 16) | (buf[2] << 8) | buf[3]);
                                    duration = (uint)((buf[4] << 24) | (buf[5] << 16) | (buf[6] << 8) | buf[7]);
                                }

                                if (timescale > 0 && duration > 0)
                                {
                                    return TimeSpan.FromSeconds((double)duration / timescale);
                                }
                                return null;
                            }
                            fs.Seek(subSize - 8, SeekOrigin.Current);
                        }
                    }
                    else
                    {
                        if (size < 8) break;
                        fs.Seek(size - 8, SeekOrigin.Current);
                    }
                }
            }
            catch { }
            return null;
        }
    }
}