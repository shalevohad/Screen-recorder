using System;
using System.Collections.Generic;
using System.Diagnostics;

namespace ITBRecorderAgent.Providers.Video.Mouse.Common
{
    public enum MouseInteractionType
    {
        LeftClick,
        RightClick,
        MiddleClick,
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
        private const double CLICK_DURATION_MS = 380.0;
        private const double SCROLL_DURATION_MS = 420.0;

        private const int BADGE_RADIUS = 15;

        private static readonly object _syncLock = new();
        private static readonly List<MouseVisualEvent> _activeEvents = new(16);

        #region Crisp 10x12 Bold Glyphs for L, R and M
        private static readonly byte[] GlyphL = new byte[10 * 12]
        {
            1,1,0,0,0,0,0,0,0,0,
            1,1,0,0,0,0,0,0,0,0,
            1,1,0,0,0,0,0,0,0,0,
            1,1,0,0,0,0,0,0,0,0,
            1,1,0,0,0,0,0,0,0,0,
            1,1,0,0,0,0,0,0,0,0,
            1,1,0,0,0,0,0,0,0,0,
            1,1,0,0,0,0,0,0,0,0,
            1,1,0,0,0,0,0,0,0,0,
            1,1,0,0,0,0,0,0,0,0,
            1,1,1,1,1,1,1,1,0,0,
            1,1,1,1,1,1,1,1,0,0
        };

        private static readonly byte[] GlyphR = new byte[10 * 12]
        {
            1,1,1,1,1,1,1,0,0,0,
            1,1,1,1,1,1,1,1,0,0,
            1,1,0,0,0,0,1,1,0,0,
            1,1,0,0,0,0,1,1,0,0,
            1,1,1,1,1,1,1,1,0,0,
            1,1,1,1,1,1,1,0,0,0,
            1,1,0,0,1,1,1,0,0,0,
            1,1,0,0,0,1,1,0,0,0,
            1,1,0,0,0,1,1,1,0,0,
            1,1,0,0,0,0,1,1,0,0,
            1,1,0,0,0,0,1,1,1,0,
            1,1,0,0,0,0,0,1,1,0
        };

        private static readonly byte[] GlyphM = new byte[10 * 12]
        {
            1,1,0,0,0,0,0,0,1,1,
            1,1,1,0,0,0,0,1,1,1,
            1,1,1,1,0,0,1,1,1,1,
            1,1,0,1,1,1,1,0,1,1,
            1,1,0,0,1,1,0,0,1,1,
            1,1,0,0,1,1,0,0,1,1,
            1,1,0,0,0,0,0,0,1,1,
            1,1,0,0,0,0,0,0,1,1,
            1,1,0,0,0,0,0,0,1,1,
            1,1,0,0,0,0,0,0,1,1,
            1,1,0,0,0,0,0,0,1,1,
            1,1,0,0,0,0,0,0,1,1
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

        public static float GetCurrentCursorScale()
        {
            long now = Stopwatch.GetTimestamp();
            float maxBoost = 0f;

            lock (_syncLock)
            {
                foreach (var ev in _activeEvents)
                {
                    if (ev.Type == MouseInteractionType.LeftClick ||
                        ev.Type == MouseInteractionType.RightClick ||
                        ev.Type == MouseInteractionType.MiddleClick)
                    {
                        double elapsed = Stopwatch.GetElapsedTime(ev.StartTick, now).TotalMilliseconds;
                        if (elapsed <= 280.0)
                        {
                            float t = (float)(elapsed / 280.0);
                            float pulse = (1.0f - t) * (1.0f - t);
                            if (pulse > maxBoost) maxBoost = pulse;
                        }
                    }
                }
            }

            // Base scale of 1.35x ensures the cursor is always clearly visible and easy to track
            // During clicks, smoothly jumps up to 2.10x for visual emphasis
            return 1.35f + (maxBoost * 0.75f);
        }

        public static bool IsClickActive()
        {
            return GetCurrentCursorScale() > 1.40f;
        }

        public static void RenderRingsAndScroll(byte[] buffer, int width, int height, int screenOffsetX = 0, int screenOffsetY = 0)
        {
            var eventsToDraw = GetActiveEventsSnapshot();
            if (eventsToDraw == null || eventsToDraw.Length == 0) return;

            long now = Stopwatch.GetTimestamp();

            foreach (var ev in eventsToDraw)
            {
                // Translate global desktop coordinates into monitor-local coordinates
                int localX = ev.X - screenOffsetX;
                int localY = ev.Y - screenOffsetY;

                // Skip events completely if they didn't occur on this monitor (with a 64px ripple margin)
                if (localX < -64 || localX >= width + 64 || localY < -64 || localY >= height + 64)
                {
                    continue;
                }

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
                        // Cyan shockwave ring
                        DrawExpandingRing(buffer, width, height, localX, localY, progress, alpha, r: 0, g: 229, b: 255);
                        break;

                    case MouseInteractionType.RightClick:
                        // Coral Red shockwave ring
                        DrawExpandingRing(buffer, width, height, localX, localY, progress, alpha, r: 255, g: 59, b: 48);
                        break;

                    case MouseInteractionType.MiddleClick:
                        // Vibrant Violet shockwave ring for wheel click (#A855F7)
                        DrawExpandingRing(buffer, width, height, localX, localY, progress, alpha, r: 168, g: 85, b: 247);
                        break;

                    case MouseInteractionType.ScrollUp:
                        DrawSymmetricScrollArrow(buffer, width, height, localX, localY, isUp: true, progress, alpha);
                        break;

                    case MouseInteractionType.ScrollDown:
                        DrawSymmetricScrollArrow(buffer, width, height, localX, localY, isUp: false, progress, alpha);
                        break;
                }
            }
        }

        public static void RenderClickBadges(byte[] buffer, int width, int height, int screenOffsetX = 0, int screenOffsetY = 0, bool isCursorBright = true)
        {
            var eventsToDraw = GetActiveEventsSnapshot();
            if (eventsToDraw == null || eventsToDraw.Length == 0) return;

            long now = Stopwatch.GetTimestamp();
            float currentScale = GetCurrentCursorScale();
            int offset = (int)(16 * currentScale);

            foreach (var ev in eventsToDraw)
            {
                if (ev.Type != MouseInteractionType.LeftClick &&
                    ev.Type != MouseInteractionType.RightClick &&
                    ev.Type != MouseInteractionType.MiddleClick)
                {
                    continue;
                }

                // Translate global desktop coordinates into monitor-local coordinates
                int localX = ev.X - screenOffsetX;
                int localY = ev.Y - screenOffsetY;

                // Strictly do NOT clamp across monitors - if the click occurred on another monitor, skip it!
                if (localX < 0 || localX >= width || localY < 0 || localY >= height)
                {
                    continue;
                }

                double elapsed = Stopwatch.GetElapsedTime(ev.StartTick, now).TotalMilliseconds;
                float progress = Math.Clamp((float)(elapsed / CLICK_DURATION_MS), 0.0f, 1.0f);
                int alpha = (int)(255 * (1.0f - (progress * 0.7f)));
                if (alpha <= 6) continue;

                // Position anchored directly to the body of the scaled cursor inside this monitor
                int badgeCenterX = Math.Clamp(localX + offset, BADGE_RADIUS + 2, width - BADGE_RADIUS - 2);
                int badgeCenterY = Math.Clamp(localY + offset, BADGE_RADIUS + 2, height - BADGE_RADIUS - 2);

                DrawAdaptiveBadge(buffer, width, height, badgeCenterX, badgeCenterY, ev.Type, alpha, isCursorBright);
            }
        }

        private static void DrawAdaptiveBadge(byte[] buffer, int width, int height, int cx, int cy, MouseInteractionType clickType, int alpha, bool isCursorBright)
        {
            // Glowing action indicator color (cyan for left click, coral red for right click, violet for middle scroll click)
            byte fgR, fgG, fgB;
            byte[] glyph;

            switch (clickType)
            {
                case MouseInteractionType.LeftClick:
                    fgR = 0;   fgG = 240; fgB = 255; // Cyan
                    glyph = GlyphL;
                    break;
                case MouseInteractionType.RightClick:
                    fgR = 255; fgG = 59;  fgB = 48;  // Coral Red
                    glyph = GlyphR;
                    break;
                case MouseInteractionType.MiddleClick:
                default:
                    fgR = 168; fgG = 85;  fgB = 247; // Violet (#A855F7)
                    glyph = GlyphM;
                    break;
            }

            // Adaptive background color for maximum contrast:
            // If the cursor is bright -> deep black background (#090D1A)
            // If the cursor is black -> bright white background (#F8FAFC) so the badge never washes out
            byte bgR = isCursorBright ? (byte)9 : (byte)248;
            byte bgG = isCursorBright ? (byte)13 : (byte)250;
            byte bgB = isCursorBright ? (byte)26 : (byte)252;
            int bgAlpha = (alpha * 235) / 255;

            int r2 = BADGE_RADIUS * BADGE_RADIUS;
            int innerR2 = (BADGE_RADIUS - 2) * (BADGE_RADIUS - 2);

            int minX = Math.Max(0, cx - BADGE_RADIUS);
            int maxX = Math.Min(width - 1, cx + BADGE_RADIUS);
            int minY = Math.Max(0, cy - BADGE_RADIUS);
            int maxY = Math.Min(height - 1, cy + BADGE_RADIUS);

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

            // Stamp the glyph letter (10x12 size centered within 15px radius badge)
            int glyphStartX = cx - 5;
            int glyphStartY = cy - 6;

            for (int gy = 0; gy < 12; gy++)
            {
                int targetY = glyphStartY + gy;
                if (targetY < 0 || targetY >= height) continue;

                int rowIdx = targetY * width * 4;

                for (int gx = 0; gx < 10; gx++)
                {
                    if (glyph[gy * 10 + gx] == 0) continue;

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
            float currentScale = GetCurrentCursorScale();
            int cursorMidX = cx + (int)(6 * currentScale);
            int cursorMidY = cy + (int)(10 * currentScale);

            float distance = 26f + (progress * 18f);
            int arrowCenterY = (int)(isUp ? (cursorMidY - distance) : (cursorMidY + distance));

            byte r = 250, g = 204, b = 21; // Bright Amber Yellow (#FACC15)
            byte borderR = 15, borderG = 23, borderB = 42; // Deep Slate (#0F172A)

            int h = 15;
            int minY = Math.Max(0, isUp ? (arrowCenterY - h) : arrowCenterY);
            int maxY = Math.Min(height - 1, isUp ? arrowCenterY : (arrowCenterY + h));

            for (int y = minY; y <= maxY; y++)
            {
                int rowIdx = y * width * 4;
                int progressY = isUp ? (y - (arrowCenterY - h)) : ((arrowCenterY + h) - y);
                int halfW = (progressY * 12) / h;

                int minX = Math.Max(0, cursorMidX - halfW);
                int maxX = Math.Min(width - 1, cursorMidX + halfW);

                for (int x = minX; x <= maxX; x++)
                {
                    // Double border with 2px thickness for optimal contrast on any background
                    bool isBorder = (x - minX < 2 || maxX - x < 2 ||
                                    (isUp ? (maxY - y < 2) : (y - minY < 2)));
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
            // Large and prominent ripple ring (expands from 16 to 64 pixels)
            float radius = 16f + (progress * 48f);
            float thickness = 3.6f;

            int rOut = (int)Math.Ceiling(radius + thickness);
            int rIn = (int)Math.Floor(Math.Max(0, radius - thickness));
            int rOut2 = rOut * rOut;
            int rIn2 = rIn * rIn;

            int minX = Math.Max(0, cx - rOut);
            int maxX = Math.Min(width - 1, cx + rOut);
            int minY = Math.Max(0, cy - rOut);
            int maxY = Math.Min(height - 1, cy + rOut);

            byte fillAlpha = (byte)(alpha / 7);

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