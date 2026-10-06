using System;
using System.Collections.Generic;
using System.Diagnostics;

namespace ITBRecorderAgent.Providers.Video.Mouse.Common
{
    public enum MouseInteractionType
    {
        LeftClick,
        RightClick,
        ScrollUp,
        ScrollDown
    }

    public sealed class MouseVisualEvent
    {
        public int X;
        public int Y;
        public MouseInteractionType Type;
        public long StartTick;
    }

    public static class MouseVisualRasterizer
    {
        private const double CLICK_DURATION_MS = 340.0;
        private const double SCROLL_DURATION_MS = 380.0;

        private const int BADGE_RADIUS = 11;

        private static readonly object _syncLock = new();
        private static readonly List<MouseVisualEvent> _activeEvents = new(16);

        #region Crisp 8x10 Bold Glyphs for L and R
        private static readonly byte[] GlyphL = new byte[8 * 10]
        {
            1,1,0,0,0,0,0,0,
            1,1,0,0,0,0,0,0,
            1,1,0,0,0,0,0,0,
            1,1,0,0,0,0,0,0,
            1,1,0,0,0,0,0,0,
            1,1,0,0,0,0,0,0,
            1,1,0,0,0,0,0,0,
            1,1,0,0,0,0,0,0,
            1,1,1,1,1,1,1,0,
            1,1,1,1,1,1,1,0
        };

        private static readonly byte[] GlyphR = new byte[8 * 10]
        {
            1,1,1,1,1,1,0,0,
            1,1,0,0,0,1,1,0,
            1,1,0,0,0,1,1,0,
            1,1,1,1,1,1,0,0,
            1,1,1,1,1,0,0,0,
            1,1,0,1,1,0,0,0,
            1,1,0,0,1,1,0,0,
            1,1,0,0,1,1,0,0,
            1,1,0,0,0,1,1,0,
            1,1,0,0,0,1,1,0
        };
        #endregion

        public static void EnqueueEvent(int x, int y, MouseInteractionType type)
        {
            lock (_syncLock)
            {
                if (_activeEvents.Count >= 16)
                {
                    _activeEvents.RemoveAt(0);
                }

                _activeEvents.Add(new MouseVisualEvent
                {
                    X = x,
                    Y = y,
                    Type = type,
                    StartTick = Stopwatch.GetTimestamp()
                });
            }
        }

        public static bool IsClickActive()
        {
            long now = Stopwatch.GetTimestamp();
            lock (_syncLock)
            {
                foreach (var ev in _activeEvents)
                {
                    if (ev.Type == MouseInteractionType.LeftClick || ev.Type == MouseInteractionType.RightClick)
                    {
                        if (Stopwatch.GetElapsedTime(ev.StartTick, now).TotalMilliseconds <= 180.0)
                        {
                            return true; // קליק נמצא ב-Pulse ראשוני
                        }
                    }
                }
            }
            return false;
        }

        public static void RenderRingsAndScroll(byte[] buffer, int width, int height)
        {
            var eventsToDraw = GetActiveEventsSnapshot();
            if (eventsToDraw == null || eventsToDraw.Length == 0) return;

            long now = Stopwatch.GetTimestamp();

            foreach (var ev in eventsToDraw)
            {
                double elapsed = Stopwatch.GetElapsedTime(ev.StartTick, now).TotalMilliseconds;
                double maxDuration = (ev.Type == MouseInteractionType.ScrollUp || ev.Type == MouseInteractionType.ScrollDown)
                    ? SCROLL_DURATION_MS
                    : CLICK_DURATION_MS;

                float progress = Math.Clamp((float)(elapsed / maxDuration), 0.0f, 1.0f);
                int alpha = (int)(255 * (1.0f - progress));
                if (alpha <= 4) continue;

                switch (ev.Type)
                {
                    case MouseInteractionType.LeftClick:
                        DrawExpandingRing(buffer, width, height, ev.X, ev.Y, progress, alpha, r: 0, g: 229, b: 255);
                        break;

                    case MouseInteractionType.RightClick:
                        DrawExpandingRing(buffer, width, height, ev.X, ev.Y, progress, alpha, r: 255, g: 59, b: 48);
                        break;

                    case MouseInteractionType.ScrollUp:
                        DrawSymmetricScrollArrow(buffer, width, height, ev.X, ev.Y, isUp: true, progress, alpha);
                        break;

                    case MouseInteractionType.ScrollDown:
                        DrawSymmetricScrollArrow(buffer, width, height, ev.X, ev.Y, isUp: false, progress, alpha);
                        break;
                }
            }
        }

        public static void RenderClickBadges(byte[] buffer, int width, int height, bool isCursorBright = true)
        {
            var eventsToDraw = GetActiveEventsSnapshot();
            if (eventsToDraw == null || eventsToDraw.Length == 0) return;

            long now = Stopwatch.GetTimestamp();

            foreach (var ev in eventsToDraw)
            {
                if (ev.Type != MouseInteractionType.LeftClick && ev.Type != MouseInteractionType.RightClick) continue;

                double elapsed = Stopwatch.GetElapsedTime(ev.StartTick, now).TotalMilliseconds;
                float progress = Math.Clamp((float)(elapsed / CLICK_DURATION_MS), 0.0f, 1.0f);
                int alpha = (int)(255 * (1.0f - (progress * 0.7f)));
                if (alpha <= 6) continue;

                bool isLeft = ev.Type == MouseInteractionType.LeftClick;

                // מיקום מוצמד לגוף הסמן (מתחשב בהגדלה)
                int badgeCenterX = Math.Clamp(ev.X + 13, BADGE_RADIUS, width - BADGE_RADIUS - 1);
                int badgeCenterY = Math.Clamp(ev.Y + 13, BADGE_RADIUS, height - BADGE_RADIUS - 1);

                DrawAdaptiveBadge(buffer, width, height, badgeCenterX, badgeCenterY, isLeft, alpha, isCursorBright);
            }
        }

        private static void DrawAdaptiveBadge(byte[] buffer, int width, int height, int cx, int cy, bool isLeft, int alpha, bool isCursorBright)
        {
            // צבע הפעולה הזוהר (ציאן שמאלי, אדום ימני)
            byte fgR = isLeft ? (byte)0 : (byte)255;
            byte fgG = isLeft ? (byte)240 : (byte)59;
            byte fgB = isLeft ? (byte)255 : (byte)48;

            // התאמת צבע הרקע לניגודיות מלאה:
            // אם הסמן בהיר -> רקע שחור עמוק (#090D1A)
            // אם הסמן שחור -> רקע לבן בוהק (#F8FAFC) כך שהתגית לעולם לא תיבלע
            byte bgR = isCursorBright ? (byte)9 : (byte)248;
            byte bgG = isCursorBright ? (byte)13 : (byte)250;
            byte bgB = isCursorBright ? (byte)26 : (byte)252;
            int bgAlpha = (alpha * 230) / 255;

            int r2 = BADGE_RADIUS * BADGE_RADIUS;
            int innerR2 = (BADGE_RADIUS - 2) * (BADGE_RADIUS - 2);

            int minX = cx - BADGE_RADIUS;
            int maxX = cx + BADGE_RADIUS;
            int minY = cy - BADGE_RADIUS;
            int maxY = cy + BADGE_RADIUS;

            for (int y = minY; y <= maxY; y++)
            {
                int dy2 = (y - cy) * (y - cy);
                int rowIdx = y * width * 4;

                for (int x = minX; x <= maxX; x++)
                {
                    int d2 = (x - cx) * (x - cx) + dy2;
                    if (d2 > r2) continue;

                    bool isBorder = d2 >= innerR2;
                    byte curR = isBorder ? fgR : bgR;
                    byte curG = isBorder ? fgG : bgG;
                    byte curB = isBorder ? fgB : bgB;
                    int curA = isBorder ? alpha : bgAlpha;

                    int idx = rowIdx + x * 4;
                    int invA = 255 - curA;

                    buffer[idx] = (byte)((curB * curA + buffer[idx] * invA) / 255);
                    buffer[idx + 1] = (byte)((curG * curA + buffer[idx + 1] * invA) / 255);
                    buffer[idx + 2] = (byte)((curR * curA + buffer[idx + 2] * invA) / 255);
                }
            }

            // הטבעת האות
            byte[] glyph = isLeft ? GlyphL : GlyphR;
            int glyphStartX = cx - 4;
            int glyphStartY = cy - 5;

            for (int gy = 0; gy < 10; gy++)
            {
                int targetY = glyphStartY + gy;
                if (targetY < 0 || targetY >= height) continue;

                int rowIdx = targetY * width * 4;

                for (int gx = 0; gx < 8; gx++)
                {
                    if (glyph[gy * 8 + gx] == 0) continue;

                    int targetX = glyphStartX + gx;
                    if (targetX < 0 || targetX >= width) continue;

                    int idx = rowIdx + targetX * 4;
                    int invA = 255 - alpha;

                    buffer[idx] = (byte)((fgB * alpha + buffer[idx] * invA) / 255);
                    buffer[idx + 1] = (byte)((fgG * alpha + buffer[idx + 1] * invA) / 255);
                    buffer[idx + 2] = (byte)((fgR * alpha + buffer[idx + 2] * invA) / 255);
                }
            }
        }

        private static void DrawSymmetricScrollArrow(byte[] buffer, int width, int height, int cx, int cy, bool isUp, float progress, int alpha)
        {
            int cursorMidX = cx + 6;
            int cursorMidY = cy + 10;

            float distance = 21f + (progress * 10f);
            int arrowCenterY = (int)(isUp ? (cursorMidY - distance) : (cursorMidY + distance));

            byte r = 250, g = 204, b = 21;
            byte borderR = 15, borderG = 23, borderB = 42;

            int h = 9;
            int minY = Math.Max(0, isUp ? (arrowCenterY - h) : arrowCenterY);
            int maxY = Math.Min(height - 1, isUp ? arrowCenterY : (arrowCenterY + h));

            for (int y = minY; y <= maxY; y++)
            {
                int rowIdx = y * width * 4;
                int progressY = isUp ? (y - (arrowCenterY - h)) : ((arrowCenterY + h) - y);
                int halfW = (progressY * 7) / h;

                int minX = Math.Max(0, cursorMidX - halfW);
                int maxX = Math.Min(width - 1, cursorMidX + halfW);

                for (int x = minX; x <= maxX; x++)
                {
                    bool isBorder = (x == minX || x == maxX || y == (isUp ? maxY : minY));
                    byte curR = isBorder ? borderR : r;
                    byte curG = isBorder ? borderG : g;
                    byte curB = isBorder ? borderB : b;

                    int idx = rowIdx + x * 4;
                    int invA = 255 - alpha;

                    buffer[idx] = (byte)((curB * alpha + buffer[idx] * invA) / 255);
                    buffer[idx + 1] = (byte)((curG * alpha + buffer[idx + 1] * invA) / 255);
                    buffer[idx + 2] = (byte)((curR * alpha + buffer[idx + 2] * invA) / 255);
                }
            }
        }

        private static void DrawExpandingRing(byte[] buffer, int width, int height, int cx, int cy, float progress, int alpha, byte r, byte g, byte b)
        {
            float radius = 10f + (progress * 26f);
            float thickness = 2.4f;

            int rOut = (int)Math.Ceiling(radius + thickness);
            int rIn = (int)Math.Floor(Math.Max(0, radius - thickness));
            int rOut2 = rOut * rOut;
            int rIn2 = rIn * rIn;

            int minX = Math.Max(0, cx - rOut);
            int maxX = Math.Min(width - 1, cx + rOut);
            int minY = Math.Max(0, cy - rOut);
            int maxY = Math.Min(height - 1, cy + rOut);

            byte fillAlpha = (byte)(alpha / 6);

            for (int y = minY; y <= maxY; y++)
            {
                int dy2 = (y - cy) * (y - cy);
                int rowIdx = y * width * 4;

                for (int x = minX; x <= maxX; x++)
                {
                    int dx = x - cx;
                    int d2 = dx * dx + dy2;

                    if (d2 > rOut2) continue;

                    byte curA = (d2 >= rIn2) ? (byte)alpha : fillAlpha;
                    if (curA == 0) continue;

                    int idx = rowIdx + x * 4;
                    int invA = 255 - curA;

                    buffer[idx] = (byte)((b * curA + buffer[idx] * invA) / 255);
                    buffer[idx + 1] = (byte)((g * curA + buffer[idx + 1] * invA) / 255);
                    buffer[idx + 2] = (byte)((r * curA + buffer[idx + 2] * invA) / 255);
                }
            }
        }

        private static MouseVisualEvent[]? GetActiveEventsSnapshot()
        {
            long now = Stopwatch.GetTimestamp();
            lock (_syncLock)
            {
                if (_activeEvents.Count == 0) return null;

                _activeEvents.RemoveAll(e =>
                {
                    double max = (e.Type == MouseInteractionType.ScrollUp || e.Type == MouseInteractionType.ScrollDown)
                        ? SCROLL_DURATION_MS
                        : CLICK_DURATION_MS;
                    return Stopwatch.GetElapsedTime(e.StartTick, now).TotalMilliseconds > max;
                });

                return _activeEvents.Count > 0 ? _activeEvents.ToArray() : null;
            }
        }
    }
}