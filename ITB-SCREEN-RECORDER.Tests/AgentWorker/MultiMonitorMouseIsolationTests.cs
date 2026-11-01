using System;
using ITBRecorderAgent.Providers.Video.Mouse.Common;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.AgentWorker
{
    public class MultiMonitorMouseIsolationTests
    {
        [Fact]
        public void PrimaryScreenClick_RendersOnlyOnPrimaryMonitorBuffer()
        {
            // Monitor 0: 1920x1080 @ (0, 0)
            // Monitor 1: 1920x1080 @ (1920, 0)
            int mon0Width = 1920, mon0Height = 1080, mon0OffsetX = 0, mon0OffsetY = 0;
            int mon1Width = 1920, mon1Height = 1080, mon1OffsetX = 1920, mon1OffsetY = 0;

            byte[] mon0Buffer = new byte[mon0Width * mon0Height * 4];
            byte[] mon1Buffer = new byte[mon1Width * mon1Height * 4];

            MouseVisualRasterizer.ClearEvents();

            // Click at global (500, 300) on Primary Monitor
            MouseVisualRasterizer.EnqueueEvent(500, 300, MouseInteractionType.LeftClick);

            // Rasterize onto Monitor 0
            MouseVisualRasterizer.RenderRingsAndScroll(mon0Buffer, mon0Width, mon0Height, mon0OffsetX, mon0OffsetY);
            MouseVisualRasterizer.RenderClickBadges(mon0Buffer, mon0Width, mon0Height, mon0OffsetX, mon0OffsetY, true);

            // Rasterize onto Monitor 1
            MouseVisualRasterizer.RenderRingsAndScroll(mon1Buffer, mon1Width, mon1Height, mon1OffsetX, mon1OffsetY);
            MouseVisualRasterizer.RenderClickBadges(mon1Buffer, mon1Width, mon1Height, mon1OffsetX, mon1OffsetY, true);

            // Verify Monitor 0 has drawn pixels (non-zero)
            bool mon0HasDrawnPixels = false;
            for (int i = 0; i < mon0Buffer.Length; i++)
            {
                if (mon0Buffer[i] != 0)
                {
                    mon0HasDrawnPixels = true;
                    break;
                }
            }

            // Verify Monitor 1 has ZERO drawn pixels (strictly pristine)
            bool mon1HasDrawnPixels = false;
            for (int i = 0; i < mon1Buffer.Length; i++)
            {
                if (mon1Buffer[i] != 0)
                {
                    mon1HasDrawnPixels = true;
                    break;
                }
            }

            Assert.True(mon0HasDrawnPixels, "Primary monitor should contain rendered click ripple and badge pixels.");
            Assert.False(mon1HasDrawnPixels, "Secondary monitor MUST remain completely pristine when click occurred on Primary monitor.");
        }

        [Fact]
        public void SecondaryScreenClick_RendersOnlyOnSecondaryMonitorBuffer()
        {
            // Monitor 0: 3440x1440 @ (0, 0)
            // Monitor 1: 1920x1080 @ (3440, 0)
            int mon0Width = 3440, mon0Height = 1440, mon0OffsetX = 0, mon0OffsetY = 0;
            int mon1Width = 1920, mon1Height = 1080, mon1OffsetX = 3440, mon1OffsetY = 0;

            byte[] mon0Buffer = new byte[mon0Width * mon0Height * 4];
            byte[] mon1Buffer = new byte[mon1Width * mon1Height * 4];

            MouseVisualRasterizer.ClearEvents();

            // Click at global (4000, 500) which is on Secondary Monitor (3440 + 560 = 4000)
            MouseVisualRasterizer.EnqueueEvent(4000, 500, MouseInteractionType.RightClick);

            // Rasterize onto Monitor 0
            MouseVisualRasterizer.RenderRingsAndScroll(mon0Buffer, mon0Width, mon0Height, mon0OffsetX, mon0OffsetY);
            MouseVisualRasterizer.RenderClickBadges(mon0Buffer, mon0Width, mon0Height, mon0OffsetX, mon0OffsetY, true);

            // Rasterize onto Monitor 1
            MouseVisualRasterizer.RenderRingsAndScroll(mon1Buffer, mon1Width, mon1Height, mon1OffsetX, mon1OffsetY);
            MouseVisualRasterizer.RenderClickBadges(mon1Buffer, mon1Width, mon1Height, mon1OffsetX, mon1OffsetY, true);

            // Verify Monitor 1 has drawn pixels
            bool mon1HasDrawnPixels = false;
            for (int i = 0; i < mon1Buffer.Length; i++)
            {
                if (mon1Buffer[i] != 0)
                {
                    mon1HasDrawnPixels = true;
                    break;
                }
            }

            // Verify Monitor 0 has ZERO drawn pixels
            bool mon0HasDrawnPixels = false;
            for (int i = 0; i < mon0Buffer.Length; i++)
            {
                if (mon0Buffer[i] != 0)
                {
                    mon0HasDrawnPixels = true;
                    break;
                }
            }

            Assert.True(mon1HasDrawnPixels, "Secondary monitor should contain rendered click ripple and badge pixels.");
            Assert.False(mon0HasDrawnPixels, "Primary monitor MUST remain completely pristine when click occurred on Secondary monitor.");
        }

        [Fact]
        public void ClicksInVerticalDeltaRegions_AreIsolatedAccurately()
        {
            // Monitor 0 is 1440 tall, Monitor 1 is only 1080 tall
            int mon1Width = 1920, mon1Height = 1080, mon1OffsetX = 3440, mon1OffsetY = 0;
            byte[] mon1Buffer = new byte[mon1Width * mon1Height * 4];

            MouseVisualRasterizer.ClearEvents();

            // Click at Y=1350 on Monitor 0 (where Monitor 1 does not exist vertically)
            MouseVisualRasterizer.EnqueueEvent(2000, 1350, MouseInteractionType.MiddleClick);

            MouseVisualRasterizer.RenderRingsAndScroll(mon1Buffer, mon1Width, mon1Height, mon1OffsetX, mon1OffsetY);
            MouseVisualRasterizer.RenderClickBadges(mon1Buffer, mon1Width, mon1Height, mon1OffsetX, mon1OffsetY, true);

            bool mon1HasDrawnPixels = false;
            for (int i = 0; i < mon1Buffer.Length; i++)
            {
                if (mon1Buffer[i] != 0)
                {
                    mon1HasDrawnPixels = true;
                    break;
                }
            }

            Assert.False(mon1HasDrawnPixels, "Secondary monitor must not render clicks occurring outside its vertical bounds.");
        }
    }
}
