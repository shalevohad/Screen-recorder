using System;
using System.Diagnostics;

namespace ITBRecorderAgent.Providers.Video.Keyboard.Common
{
    public static class KeystrokeHudRasterizer
    {
        private const double DISPLAY_DURATION_MS = 2200.0;
        private const double FADE_DURATION_MS = 450.0;

        // מידות פונט מוגדל פי 3 (3x Scale)
        private const int SCALE = 3;
        private const int BASE_CHAR_W = 7;
        private const int BASE_CHAR_H = 11;
        private const int CHAR_W = BASE_CHAR_W * SCALE; // 21px
        private const int CHAR_H = BASE_CHAR_H * SCALE; // 33px
        private const int CHAR_SPACING = 2 * SCALE;     // 6px

        private const int PADDING_X = 26;
        private const int PADDING_Y = 18;
        private const int SHADOW_RADIUS = 8; // רדיוס הילת הצל החיצונית

        private static readonly object _syncLock = new();
        private static string? _currentText;
        private static long _lastTick;

        public static void SetShortcut(string text)
        {
            if (string.IsNullOrWhiteSpace(text)) return;
            lock (_syncLock)
            {
                _currentText = text;
                _lastTick = Stopwatch.GetTimestamp();
            }
        }

        public static void RenderHud(byte[] buffer, int frameWidth, int frameHeight)
        {
            string? text;
            long tick;

            lock (_syncLock)
            {
                text = _currentText;
                tick = _lastTick;
            }

            if (string.IsNullOrEmpty(text) || tick == 0) return;

            double elapsed = Stopwatch.GetElapsedTime(tick).TotalMilliseconds;
            if (elapsed > DISPLAY_DURATION_MS) return;

            // חישוב שקיפות עם Fade-Out רך בסיום
            int alpha = 255;
            if (elapsed > (DISPLAY_DURATION_MS - FADE_DURATION_MS))
            {
                double fadeProgress = (elapsed - (DISPLAY_DURATION_MS - FADE_DURATION_MS)) / FADE_DURATION_MS;
                alpha = (int)(255 * (1.0 - Math.Clamp(fadeProgress, 0.0, 1.0)));
            }
            if (alpha <= 10) return;

            // חישוב מימדים
            int textWidth = text.Length * (CHAR_W + CHAR_SPACING) - CHAR_SPACING;
            int boxWidth = textWidth + (PADDING_X * 2);
            int boxHeight = CHAR_H + (PADDING_Y * 2);

            // 🎯 מיקום במרכז המוחלט של המסך (Center Screen)
            int originX = (frameWidth - boxWidth) / 2;
            int originY = (frameHeight - boxHeight) / 2;

            if (originX < 0 || originY < 0) return;

            // 1. הילת צל עמוקה סביב הכרטיס (מונעת בליעה במסכים לבנים/בהירים)
            DrawOuterShadow(buffer, frameWidth, frameHeight, originX, originY, boxWidth, boxHeight, alpha);

            // 2. כרטיס טקטי מוגן (#090D1A) עם מסגרת כפולה וניאון ציאן (#00F0FF)
            DrawCenterKeycapPlate(buffer, frameWidth, frameHeight, originX, originY, boxWidth, boxHeight, alpha);

            // 3. רינדור האותיות המוגדלות (כולל צל פנימי לאותיות)
            int textX = originX + PADDING_X;
            int textY = originY + PADDING_Y;

            for (int i = 0; i < text.Length; i++)
            {
                DrawScaledGlyph(buffer, frameWidth, frameHeight, textX, textY, text[i], alpha);
                textX += CHAR_W + CHAR_SPACING;
            }
        }

        /// <summary>
        /// שכבת צל שחור עמוקה המבודדת את הכרטיס מכל סוג של רקע
        /// </summary>
        private static void DrawOuterShadow(byte[] buffer, int width, int height, int x0, int y0, int w, int h, int alpha)
        {
            int minX = Math.Max(0, x0 - SHADOW_RADIUS);
            int maxX = Math.Min(width - 1, x0 + w + SHADOW_RADIUS);
            int minY = Math.Max(0, y0 - SHADOW_RADIUS);
            int maxY = Math.Min(height - 1, y0 + h + SHADOW_RADIUS);

            int baseShadowAlpha = (alpha * 160) / 255;

            for (int y = minY; y <= maxY; y++)
            {
                // חישוב מרחק מחוץ לגבולות התיבה
                int dy = 0;
                if (y < y0) dy = y0 - y;
                else if (y >= y0 + h) dy = y - (y0 + h - 1);

                int rowIdx = y * width * 4;

                for (int x = minX; x <= maxX; x++)
                {
                    int dx = 0;
                    if (x < x0) dx = x0 - x;
                    else if (x >= x0 + w) dx = x - (x0 + w - 1);

                    // אם הנקודה בתוך גוף התיבה עצמה – מדלגים (הכרטיס ייצבע עליה)
                    if (dx == 0 && dy == 0) continue;

                    float dist = (float)Math.Sqrt(dx * dx + dy * dy);
                    if (dist > SHADOW_RADIUS) continue;

                    float factor = 1.0f - (dist / SHADOW_RADIUS);
                    int curA = (int)(baseShadowAlpha * factor);
                    if (curA <= 0) continue;

                    int idx = rowIdx + x * 4;
                    int invA = 255 - curA;

                    // החשכה הדרגתית של פיקסלי הרקע (Shadow Blend)
                    buffer[idx] = (byte)((buffer[idx] * invA) / 255);
                    buffer[idx + 1] = (byte)((buffer[idx + 1] * invA) / 255);
                    buffer[idx + 2] = (byte)((buffer[idx + 2] * invA) / 255);
                }
            }
        }

        /// <summary>
        /// רינדור גוף הכרטיס עם מסגרת כפולה: קו מתאר שחור חיצוני + פס ציאן זוהר
        /// </summary>
        private static void DrawCenterKeycapPlate(byte[] buffer, int width, int height, int x0, int y0, int w, int h, int alpha)
        {
            byte bgR = 9, bgG = 13, bgB = 26;          // שחור-אובסידיאן עמוק (#090D1A)
            byte borderR = 0, borderG = 240, borderB = 255; // ציאן ניאון חשמלי (#00F0FF)
            byte darkBorderR = 0, darkBorderG = 0, darkBorderB = 0;

            int bgAlpha = (alpha * 235) / 255;

            int x1 = x0 + w;
            int y1 = y0 + h;

            for (int y = y0; y < y1 && y < height; y++)
            {
                int rowIdx = y * width * 4;
                int distY = Math.Min(y - y0, y1 - 1 - y);

                for (int x = x0; x < x1 && x < width; x++)
                {
                    int distX = Math.Min(x - x0, x1 - 1 - x);
                    int borderDist = Math.Min(distX, distY);

                    byte curR, curG, curB;
                    int curA;

                    if (borderDist == 0)
                    {
                        // קו מתאר שחור חיצוני של 1px
                        curR = darkBorderR; curG = darkBorderG; curB = darkBorderB;
                        curA = alpha;
                    }
                    else if (borderDist >= 1 && borderDist <= 3)
                    {
                        // מסגרת ציאן בעובי 3px
                        curR = borderR; curG = borderG; curB = borderB;
                        curA = alpha;
                    }
                    else
                    {
                        // מילוי פנימי כהה
                        curR = bgR; curG = bgG; curB = bgB;
                        curA = bgAlpha;
                    }

                    int idx = rowIdx + x * 4;
                    int invA = 255 - curA;

                    buffer[idx] = (byte)((curB * curA + buffer[idx] * invA) / 255);
                    buffer[idx + 1] = (byte)((curG * curA + buffer[idx + 1] * invA) / 255);
                    buffer[idx + 2] = (byte)((curR * curA + buffer[idx + 2] * invA) / 255);
                }
            }
        }

        /// <summary>
        /// רינדור אות מוגדלת פי 3 עם צל פנימי מובנה (3x Scaled Glyph with Self-Shadow)
        /// </summary>
        private static void DrawScaledGlyph(byte[] buffer, int frameWidth, int frameHeight, int x0, int y0, char c, int alpha)
        {
            ushort[]? bitmap = Font7x11.Get(c);
            if (bitmap == null) return;

            // 1. צל פנימי שחור לאות בהיסט של 2px למטה וימינה
            DrawGlyphPass(buffer, frameWidth, frameHeight, x0 + 2, y0 + 2, bitmap, 0, 0, 0, (alpha * 180) / 255);

            // 2. גוף האות הלבן הבוהק (#FFFFFF)
            DrawGlyphPass(buffer, frameWidth, frameHeight, x0, y0, bitmap, 255, 255, 255, alpha);
        }

        private static void DrawGlyphPass(byte[] buffer, int frameWidth, int frameHeight, int x0, int y0, ushort[] bitmap, byte rCol, byte gCol, byte bCol, int passAlpha)
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
                        if (targetY < 0 || targetY >= frameHeight) continue;

                        int rowIdx = targetY * frameWidth * 4;

                        for (int dx = 0; dx < SCALE; dx++)
                        {
                            int targetX = startX + dx;
                            if (targetX < 0 || targetX >= frameWidth) continue;

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

        #region Embedded 7x11 Monospace Matrix
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
                    ' ' => new ushort[] { 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 },
                    _ => null
                };
            }
        }
        #endregion
    }
}