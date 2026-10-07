using System;
using System.Diagnostics;

namespace ITBRecorderAgent.Providers.Video.Keyboard.Common
{
    public static class KeystrokeHudRasterizer
    {
        private const double DISPLAY_DURATION_MS = 2200.0;
        private const double FADE_DURATION_MS = 400.0;

        private const int SCALE = 3;
        private const int BASE_CHAR_W = 7;
        private const int BASE_CHAR_H = 11;
        private const int CHAR_W = BASE_CHAR_W * SCALE; // 21px
        private const int CHAR_H = BASE_CHAR_H * SCALE; // 33px
        private const int CHAR_SPACING = 4;

        private const int KEYCAP_HEIGHT = 62;
        private const int KEYCAP_PAD_X = 22;
        private const int PLUS_WIDTH = 30;
        private const int GAP = 14;
        private const int SHADOW_RADIUS = 10;

        private static readonly object _syncLock = new();
        public static string? CurrentShortcutText { get; private set; }
        public static long LastShortcutTick { get; private set; }

        public static void SetShortcut(string text)
        {
            if (string.IsNullOrWhiteSpace(text)) return;
            lock (_syncLock)
            {
                CurrentShortcutText = text;
                LastShortcutTick = Stopwatch.GetTimestamp();
            }
        }

        public static void RenderHud(byte[] buffer, int frameWidth, int frameHeight)
        {
            string? text;
            long tick;

            lock (_syncLock)
            {
                text = CurrentShortcutText;
                tick = LastShortcutTick;
            }

            if (string.IsNullOrEmpty(text) || tick == 0) return;

            double elapsed = Stopwatch.GetElapsedTime(tick).TotalMilliseconds;
            if (elapsed > DISPLAY_DURATION_MS) return;

            int alpha = 255;
            if (elapsed > (DISPLAY_DURATION_MS - FADE_DURATION_MS))
            {
                double fadeProgress = (elapsed - (DISPLAY_DURATION_MS - FADE_DURATION_MS)) / FADE_DURATION_MS;
                alpha = (int)(255 * (1.0 - Math.Clamp(fadeProgress, 0.0, 1.0)));
            }
            if (alpha <= 10) return;

            string[] keys = text.Split(new[] { " + " }, StringSplitOptions.RemoveEmptyEntries);
            if (keys.Length == 0) return;

            int[] keycapWidths = new int[keys.Length];
            int clusterWidth = 0;

            for (int i = 0; i < keys.Length; i++)
            {
                int textW = keys[i].Length * (CHAR_W + CHAR_SPACING) - CHAR_SPACING;
                int kw = Math.Max(64, textW + (KEYCAP_PAD_X * 2));
                keycapWidths[i] = kw;
                clusterWidth += kw;
                if (i < keys.Length - 1) clusterWidth += PLUS_WIDTH + (GAP * 2);
            }

            int originX = (frameWidth - clusterWidth) / 2;
            int originY = (frameHeight - KEYCAP_HEIGHT) / 2;

            int currentX = originX;

            for (int i = 0; i < keys.Length; i++)
            {
                int kw = keycapWidths[i];

                // 1. צל רך מקיף
                DrawKeycapShadow(buffer, frameWidth, frameHeight, currentX, originY, kw, KEYCAP_HEIGHT, (alpha * 130) / 255);

                // 2. גוף המקש הפיזי
                DrawKeycapBody(buffer, frameWidth, frameHeight, currentX, originY, kw, KEYCAP_HEIGHT, alpha);

                // 3. כיתוב המקש במרכז
                int textW = keys[i].Length * (CHAR_W + CHAR_SPACING) - CHAR_SPACING;
                int textX = currentX + (kw - textW) / 2;
                int textY = originY + (KEYCAP_HEIGHT - CHAR_H) / 2;

                for (int c = 0; c < keys[i].Length; c++)
                {
                    DrawScaledChar(buffer, frameWidth, frameHeight, textX, textY, keys[i][c], alpha);
                    textX += CHAR_W + CHAR_SPACING;
                }

                currentX += kw;

                // 4. סימן '+' זוהר בין המקשים
                if (i < keys.Length - 1)
                {
                    currentX += GAP;
                    int plusX = currentX + (PLUS_WIDTH - CHAR_W) / 2;
                    int plusY = originY + (KEYCAP_HEIGHT - CHAR_H) / 2;

                    DrawScaledChar(buffer, frameWidth, frameHeight, plusX, plusY, '+', alpha, isCyan: true);
                    currentX += PLUS_WIDTH + GAP;
                }
            }
        }

        private static void DrawKeycapShadow(byte[] buffer, int width, int height, int x0, int y0, int w, int h, int shadowAlpha)
        {
            int minX = Math.Max(0, x0 - SHADOW_RADIUS);
            int maxX = Math.Min(width - 1, x0 + w + SHADOW_RADIUS);
            int minY = Math.Max(0, y0 - SHADOW_RADIUS + 3);
            int maxY = Math.Min(height - 1, y0 + h + SHADOW_RADIUS + 3);

            for (int y = minY; y <= maxY; y++)
            {
                int dy = 0;
                if (y < y0) dy = y0 - y;
                else if (y >= y0 + h) dy = y - (y0 + h - 1);

                int rowIdx = y * width * 4;

                for (int x = minX; x <= maxX; x++)
                {
                    int dx = 0;
                    if (x < x0) dx = x0 - x;
                    else if (x >= x0 + w) dx = x - (x0 + w - 1);

                    if (dx == 0 && dy == 0) continue;

                    float dist = (float)Math.Sqrt(dx * dx + dy * dy);
                    if (dist > SHADOW_RADIUS) continue;

                    int curA = (int)(shadowAlpha * (1.0f - (dist / SHADOW_RADIUS)));
                    if (curA <= 0) continue;

                    int idx = rowIdx + x * 4;
                    int invA = 255 - curA;

                    buffer[idx] = (byte)((buffer[idx] * invA) / 255);
                    buffer[idx + 1] = (byte)((buffer[idx + 1] * invA) / 255);
                    buffer[idx + 2] = (byte)((buffer[idx + 2] * invA) / 255);
                }
            }
        }

        private static void DrawKeycapBody(byte[] buffer, int width, int height, int x0, int y0, int w, int h, int alpha)
        {
            byte bgR = 14, bgG = 18, bgB = 28;
            byte borderR = 0, borderG = 240, borderB = 255;
            byte bevelR = 80, bevelG = 100, bevelB = 130;

            int bgAlpha = (alpha * 245) / 255;
            int x1 = x0 + w;
            int y1 = y0 + h;

            for (int y = y0; y < y1 && y < height; y++)
            {
                int rowIdx = y * width * 4;
                int distY = Math.Min(y - y0, y1 - 1 - y);

                for (int x = x0; x < x1 && x < width; x++)
                {
                    int distX = Math.Min(x - x0, x1 - 1 - x);

                    if ((distX == 0 && distY <= 4) || (distY == 0 && distX <= 4)) continue;
                    if (distX == 1 && distY == 1) continue;

                    bool isBorder = (distX <= 1 || distY <= 1);
                    bool isBevel = (!isBorder && y == y0 + 2 && distX > 4);

                    byte curR = isBorder ? borderR : (isBevel ? bevelR : bgR);
                    byte curG = isBorder ? borderG : (isBevel ? bevelG : bgG);
                    byte curB = isBorder ? borderB : (isBevel ? bevelB : bgB);
                    int curA = isBorder ? alpha : bgAlpha;

                    int idx = rowIdx + x * 4;
                    int invA = 255 - curA;

                    buffer[idx] = (byte)((curB * curA + buffer[idx] * invA) / 255);
                    buffer[idx + 1] = (byte)((curG * curA + buffer[idx + 1] * invA) / 255);
                    buffer[idx + 2] = (byte)((curR * curA + buffer[idx + 2] * invA) / 255);
                }
            }
        }

        private static void DrawScaledChar(byte[] buffer, int width, int height, int x0, int y0, char c, int alpha, bool isCyan = false)
        {
            ushort[]? bitmap = Font7x11.Get(c);
            if (bitmap == null) return;

            byte textR = isCyan ? (byte)0 : (byte)255;
            byte textG = isCyan ? (byte)240 : (byte)255;
            byte textB = isCyan ? (byte)255 : (byte)255;

            // 1. צל פנימי שחור לאות
            DrawGlyphPass(buffer, width, height, x0 + 2, y0 + 2, bitmap, 0, 0, 0, (alpha * 180) / 255);
            // 2. גוף האות הראשי
            DrawGlyphPass(buffer, width, height, x0, y0, bitmap, textR, textG, textB, alpha);
        }

        private static void DrawGlyphPass(byte[] buffer, int width, int height, int x0, int y0, ushort[] bitmap, byte rCol, byte gCol, byte bCol, int passAlpha)
        {
            for (int r = 0; r < BASE_CHAR_H; r++)
            {
                ushort rowBits = bitmap[r];
                for (int cIdx = 0; cIdx < BASE_CHAR_W; cIdx++)
                {
                    if ((rowBits & (1 << (BASE_CHAR_W - 1 - cIdx))) == 0) continue;

                    int startX = x0 + (cIdx * SCALE);
                    int startY = y0 + (r * SCALE);

                    for (int dy = 0; dy < SCALE; dy++)
                    {
                        int targetY = startY + dy;
                        if (targetY < 0 || targetY >= height) continue;

                        int rowIdx = targetY * width * 4;

                        for (int dx = 0; dx < SCALE; dx++)
                        {
                            int targetX = startX + dx;
                            if (targetX < 0 || targetX >= width) continue;

                            int idx = rowIdx + targetX * 4;
                            int invA = 255 - passAlpha;

                            buffer[idx] = (byte)((bCol * passAlpha + buffer[idx] * invA) / 255);
                            buffer[idx + 1] = (byte)((gCol * passAlpha + buffer[idx + 1] * invA) / 255);
                            buffer[idx + 2] = (byte)((rCol * passAlpha + buffer[idx + 2] * invA) / 255);
                        }
                    }
                }
            }
        }

        #region Embedded Monospace Matrix
        private static class Font7x11
        {
            public static ushort[]? Get(char c)
            {
                return char.ToUpperInvariant(c) switch
                {
                    'A' => new ushort[] { 0x18, 0x24, 0x42, 0x42, 0x7E, 0x42, 0x42, 0x42, 0x42, 0x00, 0x00 },
                    'B' => new ushort[] { 0x3C, 0x22, 0x22, 0x3C, 0x22, 0x22, 0x22, 0x3C, 0x00, 0x00, 0x00 },
                    'C' => new ushort[] { 0x1C, 0x22, 0x40, 0x40, 0x40, 0x40, 0x22, 0x1C, 0x00, 0x00, 0x00 },
                    'D' => new ushort[] { 0x38, 0x24, 0x22, 0x22, 0x22, 0x22, 0x24, 0x38, 0x00, 0x00, 0x00 },
                    'E' => new ushort[] { 0x3E, 0x20, 0x20, 0x3C, 0x20, 0x20, 0x20, 0x3E, 0x00, 0x00, 0x00 },
                    'F' => new ushort[] { 0x3E, 0x20, 0x20, 0x3C, 0x20, 0x20, 0x20, 0x20, 0x00, 0x00, 0x00 },
                    'G' => new ushort[] { 0x1C, 0x22, 0x40, 0x40, 0x4E, 0x42, 0x22, 0x1C, 0x00, 0x00, 0x00 },
                    'H' => new ushort[] { 0x42, 0x42, 0x42, 0x7E, 0x42, 0x42, 0x42, 0x42, 0x00, 0x00, 0x00 },
                    'I' => new ushort[] { 0x1C, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x1C, 0x00, 0x00, 0x00 },
                    'J' => new ushort[] { 0x0E, 0x04, 0x04, 0x04, 0x04, 0x44, 0x44, 0x38, 0x00, 0x00, 0x00 },
                    'K' => new ushort[] { 0x44, 0x48, 0x50, 0x60, 0x50, 0x48, 0x44, 0x44, 0x00, 0x00, 0x00 },
                    'L' => new ushort[] { 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x3E, 0x00, 0x00, 0x00 },
                    'M' => new ushort[] { 0x42, 0x66, 0x5A, 0x42, 0x42, 0x42, 0x42, 0x42, 0x00, 0x00, 0x00 },
                    'N' => new ushort[] { 0x42, 0x62, 0x52, 0x4A, 0x46, 0x42, 0x42, 0x42, 0x00, 0x00, 0x00 },
                    'O' => new ushort[] { 0x1C, 0x22, 0x42, 0x42, 0x42, 0x42, 0x22, 0x1C, 0x00, 0x00, 0x00 },
                    'P' => new ushort[] { 0x3C, 0x22, 0x22, 0x3C, 0x20, 0x20, 0x20, 0x20, 0x00, 0x00, 0x00 },
                    'Q' => new ushort[] { 0x1C, 0x22, 0x42, 0x42, 0x42, 0x4A, 0x24, 0x1A, 0x00, 0x00, 0x00 },
                    'R' => new ushort[] { 0x3C, 0x22, 0x22, 0x3C, 0x28, 0x24, 0x22, 0x22, 0x00, 0x00, 0x00 },
                    'S' => new ushort[] { 0x1E, 0x20, 0x20, 0x1C, 0x02, 0x02, 0x02, 0x3C, 0x00, 0x00, 0x00 },
                    'T' => new ushort[] { 0x3E, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x00, 0x00, 0x00 },
                    'U' => new ushort[] { 0x42, 0x42, 0x42, 0x42, 0x42, 0x42, 0x42, 0x3C, 0x00, 0x00, 0x00 },
                    'V' => new ushort[] { 0x42, 0x42, 0x42, 0x42, 0x42, 0x24, 0x24, 0x18, 0x00, 0x00, 0x00 },
                    'W' => new ushort[] { 0x42, 0x42, 0x42, 0x42, 0x5A, 0x5A, 0x66, 0x42, 0x00, 0x00, 0x00 },
                    'X' => new ushort[] { 0x42, 0x24, 0x24, 0x18, 0x24, 0x24, 0x42, 0x42, 0x00, 0x00, 0x00 },
                    'Y' => new ushort[] { 0x42, 0x42, 0x24, 0x18, 0x08, 0x08, 0x08, 0x08, 0x00, 0x00, 0x00 },
                    'Z' => new ushort[] { 0x3E, 0x04, 0x08, 0x10, 0x20, 0x20, 0x04, 0x3E, 0x00, 0x00, 0x00 },
                    '0' => new ushort[] { 0x1C, 0x22, 0x26, 0x2A, 0x32, 0x22, 0x22, 0x1C, 0x00, 0x00, 0x00 },
                    '1' => new ushort[] { 0x08, 0x18, 0x08, 0x08, 0x08, 0x08, 0x08, 0x1C, 0x00, 0x00, 0x00 },
                    '2' => new ushort[] { 0x1C, 0x22, 0x02, 0x04, 0x08, 0x10, 0x20, 0x3E, 0x00, 0x00, 0x00 },
                    '3' => new ushort[] { 0x1C, 0x22, 0x02, 0x1C, 0x02, 0x02, 0x22, 0x1C, 0x00, 0x00, 0x00 },
                    '4' => new ushort[] { 0x04, 0x0C, 0x14, 0x24, 0x44, 0x7E, 0x04, 0x04, 0x00, 0x00, 0x00 },
                    '5' => new ushort[] { 0x3E, 0x20, 0x20, 0x3C, 0x02, 0x02, 0x22, 0x1C, 0x00, 0x00, 0x00 },
                    '6' => new ushort[] { 0x1C, 0x22, 0x20, 0x3C, 0x22, 0x22, 0x22, 0x1C, 0x00, 0x00, 0x00 },
                    '7' => new ushort[] { 0x3E, 0x02, 0x04, 0x08, 0x10, 0x10, 0x10, 0x10, 0x00, 0x00, 0x00 },
                    '8' => new ushort[] { 0x1C, 0x22, 0x22, 0x1C, 0x22, 0x22, 0x22, 0x1C, 0x00, 0x00, 0x00 },
                    '9' => new ushort[] { 0x1C, 0x22, 0x22, 0x1E, 0x02, 0x02, 0x22, 0x1C, 0x00, 0x00, 0x00 },
                    '+' => new ushort[] { 0x00, 0x08, 0x08, 0x3E, 0x08, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00 },
                    '-' => new ushort[] { 0x00, 0x00, 0x00, 0x3E, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 },
                    _ => null
                };
            }
        }
        #endregion
    }
}