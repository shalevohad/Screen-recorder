using System;
using System.Diagnostics;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Text;
using System.IO;
using System.Runtime.InteropServices;
using System.Runtime.Versioning;
using System.Text;
using System.Threading;
using ITBRecorderAgent.Providers.Video.Keyboard.Common;

namespace ITBRecorderAgent.Providers.Video.Keyboard.Windows
{
    [SupportedOSPlatform("windows")]
    public class WindowsKeystrokeOverlay : IKeystrokeOverlayProvider
    {
        #region Win32 API
        private const int WH_KEYBOARD_LL = 13;
        private const int WM_KEYDOWN = 0x0100;
        private const int WM_SYSKEYDOWN = 0x0104;

        private const int VK_SHIFT = 0x10;
        private const int VK_CONTROL = 0x11;
        private const int VK_MENU = 0x12; // Alt
        private const int VK_LWIN = 0x5B;
        private const int VK_RWIN = 0x5C;

        private delegate IntPtr LowLevelKeyboardProc(int nCode, IntPtr wParam, IntPtr lParam);

        [DllImport("user32.dll", SetLastError = true)]
        private static extern IntPtr SetWindowsHookEx(int idHook, LowLevelKeyboardProc lpfn, IntPtr hMod, uint dwThreadId);

        [DllImport("user32.dll", SetLastError = true)]
        private static extern bool UnhookWindowsHookEx(IntPtr hhk);

        [DllImport("user32.dll")]
        private static extern IntPtr CallNextHookEx(IntPtr hhk, int nCode, IntPtr wParam, IntPtr lParam);

        [DllImport("user32.dll")]
        private static extern short GetKeyState(int nVirtKey);

        [DllImport("user32.dll")]
        private static extern sbyte GetMessage(out MSG lpMsg, IntPtr hWnd, uint wMsgFilterMin, uint wMsgFilterMax);

        [DllImport("user32.dll")]
        private static extern bool TranslateMessage(ref MSG lpMsg);

        [DllImport("user32.dll")]
        private static extern IntPtr DispatchMessage(ref MSG lpMsg);

        [DllImport("user32.dll")]
        private static extern bool PostThreadMessage(uint idThread, uint msg, IntPtr wParam, IntPtr lParam);

        [DllImport("kernel32.dll")]
        private static extern uint GetCurrentThreadId();

        [StructLayout(LayoutKind.Sequential)]
        private struct MSG { public IntPtr hwnd; public uint message; public IntPtr wParam; public IntPtr lParam; public uint time; public int pt_x; public int pt_y; }
        #endregion

        private const double DISPLAY_DURATION_MS = 2200.0;
        private const double FADE_DURATION_MS = 400.0;

        private LowLevelKeyboardProc? _proc;
        private IntPtr _hookId = IntPtr.Zero;
        private Thread? _hookThread;
        private uint _hookThreadId;
        private volatile bool _isInitialized;

        private static Font? _hudFont;
        private static Font? _plusFont;
        private static PrivateFontCollection? _fontCollection;
        private static Bitmap? _renderBmp;
        private static int[] _bmpPixels = new int[1600 * 250];

        public void Initialize()
        {
            if (_isInitialized) return;
            _isInitialized = true;

            EnsureFontLoaded();

            _hookThread = new Thread(() =>
            {
                _hookThreadId = GetCurrentThreadId();
                _proc = HookCallback;
                _hookId = SetWindowsHookEx(WH_KEYBOARD_LL, _proc, IntPtr.Zero, 0);

                while (GetMessage(out MSG msg, IntPtr.Zero, 0, 0) > 0)
                {
                    TranslateMessage(ref msg);
                    DispatchMessage(ref msg);
                }

                if (_hookId != IntPtr.Zero)
                {
                    UnhookWindowsHookEx(_hookId);
                    _hookId = IntPtr.Zero;
                }
            })
            {
                IsBackground = true,
                Name = "ITB_WinKeyboardHook"
            };

            _hookThread.SetApartmentState(ApartmentState.STA);
            _hookThread.Start();
        }

        private static void EnsureFontLoaded()
        {
            if (_hudFont != null) return;

            try
            {
                string baseDir = AppDomain.CurrentDomain.BaseDirectory;
                string[] candidates = new[]
                {
                    Path.Combine(baseDir, "arial.ttf"),
                    Path.Combine(baseDir, "Assets", "arial.ttf"),
                    Path.Combine(baseDir, "Fonts", "arial.ttf"),
                    Path.Combine(baseDir, "Resources", "arial.ttf"),
                    "arial.ttf"
                };

                string? fontPath = null;
                foreach (var p in candidates)
                {
                    if (File.Exists(p))
                    {
                        fontPath = p;
                        break;
                    }
                }

                if (fontPath != null)
                {
                    _fontCollection = new PrivateFontCollection();
                    _fontCollection.AddFontFile(fontPath);
                    if (_fontCollection.Families.Length > 0)
                    {
                        _hudFont = new Font(_fontCollection.Families[0], 28f, FontStyle.Bold, GraphicsUnit.Pixel);
                        _plusFont = new Font(_fontCollection.Families[0], 22f, FontStyle.Bold, GraphicsUnit.Pixel);
                    }
                }
            }
            catch { }

            _hudFont ??= new Font("Arial", 28f, FontStyle.Bold, GraphicsUnit.Pixel);
            _plusFont ??= new Font("Arial", 22f, FontStyle.Bold, GraphicsUnit.Pixel);
        }

        private IntPtr HookCallback(int nCode, IntPtr wParam, IntPtr lParam)
        {
            if (nCode >= 0)
            {
                int msg = wParam.ToInt32();
                if (msg == WM_KEYDOWN || msg == WM_SYSKEYDOWN)
                {
                    int vkCode = Marshal.ReadInt32(lParam);

                    bool ctrl = (GetKeyState(VK_CONTROL) & 0x8000) != 0;
                    bool alt = (GetKeyState(VK_MENU) & 0x8000) != 0;
                    bool shift = (GetKeyState(VK_SHIFT) & 0x8000) != 0;
                    bool win = (GetKeyState(VK_LWIN) & 0x8000) != 0 || (GetKeyState(VK_RWIN) & 0x8000) != 0;

                    if (ctrl || alt || win || IsSpecialKey(vkCode))
                    {
                        string formatted = FormatShortcut(vkCode, ctrl, alt, shift, win);
                        if (!string.IsNullOrEmpty(formatted))
                        {
                            KeystrokeHudRasterizer.SetShortcut(formatted);
                        }
                    }
                }
            }
            return CallNextHookEx(_hookId, nCode, wParam, lParam);
        }

        private static bool IsSpecialKey(int vk)
        {
            if (vk >= 0x70 && vk <= 0x7B) return true; // F1 - F12
            if (vk is 0x1B or 0x09 or 0x0D or 0x08 or 0x2E or 0x2D or 0x24 or 0x23 or 0x21 or 0x22) return true;
            return false;
        }

        private static string FormatShortcut(int vk, bool ctrl, bool alt, bool shift, bool win)
        {
            if (vk is VK_CONTROL or 0xA2 or 0xA3 or VK_MENU or 0xA4 or 0xA5 or VK_SHIFT or 0xA0 or 0xA1 or VK_LWIN or VK_RWIN)
                return string.Empty;

            var sb = new StringBuilder(32);
            if (ctrl) sb.Append("CTRL + ");
            if (alt) sb.Append("ALT + ");
            if (win) sb.Append("WIN + ");
            if (shift) sb.Append("SHIFT + ");

            sb.Append(GetKeyName(vk));
            return sb.ToString();
        }

        private static string GetKeyName(int vk)
        {
            return vk switch
            {
                >= 0x70 and <= 0x7B => $"F{vk - 0x70 + 1}",
                0x1B => "ESC",
                0x0D => "ENTER",
                0x09 => "TAB",
                0x08 => "BACKSPACE",
                0x2E => "DELETE",
                0x20 => "SPACE",
                0x24 => "HOME",
                0x23 => "END",
                0x21 => "PGUP",
                0x22 => "PGDN",
                0x25 => "LEFT",
                0x26 => "UP",
                0x27 => "RIGHT",
                0x28 => "DOWN",
                >= 0x30 and <= 0x39 => ((char)vk).ToString(),
                >= 0x41 and <= 0x5A => ((char)vk).ToString(),
                _ => $"KEY_{vk}"
            };
        }

        public void DrawKeystrokesToFrame(byte[] frameBuffer, int width, int height)
        {
            Initialize();

            string? text = KeystrokeHudRasterizer.CurrentShortcutText;
            long tick = KeystrokeHudRasterizer.LastShortcutTick;
            if (string.IsNullOrEmpty(text) || tick == 0 || _hudFont == null || _plusFont == null) return;

            double elapsed = Stopwatch.GetElapsedTime(tick).TotalMilliseconds;
            if (elapsed > DISPLAY_DURATION_MS) return;

            float alphaFactor = 1.0f;
            if (elapsed > (DISPLAY_DURATION_MS - FADE_DURATION_MS))
            {
                alphaFactor = (float)(1.0 - Math.Clamp((elapsed - (DISPLAY_DURATION_MS - FADE_DURATION_MS)) / FADE_DURATION_MS, 0.0, 1.0));
            }
            if (alphaFactor <= 0.04f) return;

            string[] keys = text.Split(new[] { " + " }, StringSplitOptions.RemoveEmptyEntries);
            if (keys.Length == 0) return;

            // מימדי Keycap פיזי ריאליסטי
            int keycapHeight = 62;
            int keyPaddingX = 24;
            int plusWidth = 32;
            int gap = 14;
            int shadowMargin = 20;

            int[] keycapWidths = new int[keys.Length];
            int clusterWidth = 0;

            using (var gMeasure = Graphics.FromHwnd(IntPtr.Zero))
            {
                for (int i = 0; i < keys.Length; i++)
                {
                    SizeF size = gMeasure.MeasureString(keys[i], _hudFont);
                    int kw = Math.Max(64, (int)Math.Ceiling(size.Width) + (keyPaddingX * 2));
                    keycapWidths[i] = kw;
                    clusterWidth += kw;
                    if (i < keys.Length - 1) clusterWidth += plusWidth + (gap * 2);
                }
            }

            int bmpW = clusterWidth + (shadowMargin * 2);
            int bmpH = keycapHeight + (shadowMargin * 2);

            if (_renderBmp == null || _renderBmp.Width < bmpW || _renderBmp.Height < bmpH)
            {
                _renderBmp?.Dispose();
                _renderBmp = new Bitmap(Math.Max(1600, bmpW), Math.Max(250, bmpH), System.Drawing.Imaging.PixelFormat.Format32bppPArgb);
            }

            using (var g = Graphics.FromImage(_renderBmp))
            {
                g.Clear(Color.Transparent);
                g.SmoothingMode = SmoothingMode.AntiAlias;
                g.InterpolationMode = InterpolationMode.HighQualityBicubic;
                g.TextRenderingHint = TextRenderingHint.AntiAliasGridFit;

                using var sf = new StringFormat
                {
                    Alignment = StringAlignment.Center,
                    LineAlignment = StringAlignment.Center
                };

                float currentX = shadowMargin;
                float keyY = shadowMargin;

                for (int i = 0; i < keys.Length; i++)
                {
                    int kw = keycapWidths[i];
                    RectangleF keyRect = new RectangleF(currentX, keyY, kw, keycapHeight);

                    // 1. הילת צל רכה מתחת לכל מקש (Outer Drop Shadow)
                    for (int s = 12; s >= 2; s -= 2)
                    {
                        using var sPath = CreateRoundedPath(keyRect.X - (s / 2f), keyRect.Y - (s / 2f) + 4, keyRect.Width + s, keyRect.Height + s, 14);
                        using var sBrush = new SolidBrush(Color.FromArgb((int)(34 * alphaFactor), 0, 0, 0));
                        g.FillPath(sBrush, sPath);
                    }

                    // 2. גוף המקש הפיזי (Keycap Plate) - גרדיאנט פלסטיק מט כהה ועמוק
                    using var keyPath = CreateRoundedPath(keyRect.X, keyRect.Y, keyRect.Width, keyRect.Height, 10);
                    using var bodyBrush = new LinearGradientBrush(
                        keyRect,
                        Color.FromArgb((int)(245 * alphaFactor), 28, 36, 52),  // משטח עליון
                        Color.FromArgb((int)(252 * alphaFactor), 12, 16, 26),  // משטח תחתון כהה
                        LinearGradientMode.Vertical);
                    g.FillPath(bodyBrush, keyPath);

                    // 3. מסגרת ניאון ציאן טקטית מודגשת (#00F0FF) בעובי 2.5px
                    using var borderPen = new Pen(Color.FromArgb((int)(245 * alphaFactor), 0, 240, 255), 2.5f);
                    g.DrawPath(borderPen, keyPath);

                    // 4. קו הדגשה עליון (Top Bevel Highlight) המעניק אפקט עומק פיזי
                    using var bevelPen = new Pen(Color.FromArgb((int)(120 * alphaFactor), 255, 255, 255), 1.4f);
                    g.DrawLine(bevelPen, keyRect.X + 10, keyRect.Y + 2.5f, keyRect.Right - 10, keyRect.Y + 2.5f);

                    // 5. צל פנימי לאותיות למניעת היבלעות
                    RectangleF shadowTextRect = new RectangleF(keyRect.X + 1.5f, keyRect.Y + 1.5f, keyRect.Width, keyRect.Height);
                    using var textShadowBrush = new SolidBrush(Color.FromArgb((int)(210 * alphaFactor), 0, 0, 0));
                    g.DrawString(keys[i], _hudFont, textShadowBrush, shadowTextRect, sf);

                    // 6. כיתוב המקש בלבן בוהק וממורכז
                    using var textBrush = new SolidBrush(Color.FromArgb((int)(255 * alphaFactor), 255, 255, 255));
                    g.DrawString(keys[i], _hudFont, textBrush, keyRect, sf);

                    currentX += kw;

                    // מפריד '+' זוהר בין המקשים
                    if (i < keys.Length - 1)
                    {
                        currentX += gap;
                        RectangleF plusRect = new RectangleF(currentX, keyY, plusWidth, keycapHeight);

                        RectangleF plusShadowRect = new RectangleF(plusRect.X + 1.5f, plusRect.Y + 1.5f, plusRect.Width, plusRect.Height);
                        using var plusShadowBrush = new SolidBrush(Color.FromArgb((int)(190 * alphaFactor), 0, 0, 0));
                        g.DrawString("+", _plusFont, plusShadowBrush, plusShadowRect, sf);

                        using var plusBrush = new SolidBrush(Color.FromArgb((int)(245 * alphaFactor), 0, 240, 255));
                        g.DrawString("+", _plusFont, plusBrush, plusRect, sf);

                        currentX += plusWidth + gap;
                    }
                }
            }

            // 🎯 תיקון קריטי: נעילת הזיכרון ודגימה לפי Stride תקין ללא שום עיוות
            var rect = new Rectangle(0, 0, bmpW, bmpH);
            var bmpData = _renderBmp.LockBits(rect, System.Drawing.Imaging.ImageLockMode.ReadOnly, System.Drawing.Imaging.PixelFormat.Format32bppPArgb);

            try
            {
                int strideInts = bmpData.Stride / 4;
                int totalInts = bmpH * strideInts;
                if (_bmpPixels.Length < totalInts)
                {
                    _bmpPixels = new int[totalInts];
                }

                Marshal.Copy(bmpData.Scan0, _bmpPixels, 0, totalInts);

                // מרכוז מוחלט במסך
                int centerX = (width - clusterWidth) / 2;
                int centerY = (height - keycapHeight) / 2;
                int startX = centerX - shadowMargin;
                int startY = centerY - shadowMargin;

                for (int y = 0; y < bmpH; y++)
                {
                    int targetY = startY + y;
                    if (targetY < 0 || targetY >= height) continue;

                    int targetRowOffset = targetY * width * 4;
                    int srcRowOffset = y * strideInts; // שימוש ב-Stride האמיתי

                    for (int x = 0; x < bmpW; x++)
                    {
                        int targetX = startX + x;
                        if (targetX < 0 || targetX >= width) continue;

                        int px = _bmpPixels[srcRowOffset + x];
                        byte alpha = (byte)((px >> 24) & 0xFF);
                        if (alpha == 0) continue;

                        int bufIdx = targetRowOffset + targetX * 4;
                        byte b = (byte)(px & 0xFF);
                        byte gCol = (byte)((px >> 8) & 0xFF);
                        byte r = (byte)((px >> 16) & 0xFF);

                        if (alpha == 255)
                        {
                            frameBuffer[bufIdx] = b;
                            frameBuffer[bufIdx + 1] = gCol;
                            frameBuffer[bufIdx + 2] = r;
                        }
                        else
                        {
                            float a = alpha / 255.0f;
                            float invA = 1.0f - a;
                            frameBuffer[bufIdx] = (byte)((b * a) + (frameBuffer[bufIdx] * invA));
                            frameBuffer[bufIdx + 1] = (byte)((gCol * a) + (frameBuffer[bufIdx + 1] * invA));
                            frameBuffer[bufIdx + 2] = (byte)((r * a) + (frameBuffer[bufIdx + 2] * invA));
                        }
                    }
                }
            }
            finally
            {
                _renderBmp.UnlockBits(bmpData);
            }
        }

        private static GraphicsPath CreateRoundedPath(float x, float y, float width, float height, float radius)
        {
            var path = new GraphicsPath();
            float d = radius * 2;
            path.AddArc(x, y, d, d, 180, 90);
            path.AddArc(x + width - d, y, d, d, 270, 90);
            path.AddArc(x + width - d, y + height - d, d, d, 0, 90);
            path.AddArc(x, y + height - d, d, d, 90, 90);
            path.CloseFigure();
            return path;
        }

        public void Dispose()
        {
            if (_hookThreadId != 0)
            {
                PostThreadMessage(_hookThreadId, 0x0012 /* WM_QUIT */, IntPtr.Zero, IntPtr.Zero);
            }
            _renderBmp?.Dispose();
            _renderBmp = null;
            _hudFont?.Dispose();
            _hudFont = null;
            _plusFont?.Dispose();
            _plusFont = null;
            _fontCollection?.Dispose();
            _fontCollection = null;
        }
    }
}