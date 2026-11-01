using System;
using System.Collections.Generic;
using System.Linq;

namespace ITB_SCREEN_RECORDER.Player.Core.Topology;

public sealed class DisplayGeometry
{
    public string Hostname { get; set; } = string.Empty;
    public string DisplayId { get; set; } = "mon-0";
    public int MonitorIndex { get; set; }
    public bool IsPrimary { get; set; } = true;
    public int Width { get; set; } = 1920;
    public int Height { get; set; } = 1080;
    public int X { get; set; } = 0;
    public int Y { get; set; } = 0;

    public double CanvasLeft { get; set; }
    public double CanvasTop { get; set; }
    public double CanvasWidth { get; set; }
    public double CanvasHeight { get; set; }
}

public sealed class StationTopologyResult
{
    public double BoundingWidth { get; set; }
    public double BoundingHeight { get; set; }
    public double MinX { get; set; }
    public double MinY { get; set; }
    public List<DisplayGeometry> Displays { get; set; } = new();
}

public static class StationTopologyCalculator
{
    public static StationTopologyResult Calculate(IEnumerable<DisplayGeometry> displays)
    {
        var list = displays.ToList();
        if (list.Count == 0)
        {
            return new StationTopologyResult
            {
                BoundingWidth = 1920,
                BoundingHeight = 1080,
                MinX = 0,
                MinY = 0,
                Displays = list
            };
        }

        double minX = list.Min(d => d.X);
        double minY = list.Min(d => d.Y);
        double maxX = list.Max(d => d.X + (d.Width > 0 ? d.Width : 1920));
        double maxY = list.Max(d => d.Y + (d.Height > 0 ? d.Height : 1080));

        double bWidth = Math.Max(640, maxX - minX);
        double bHeight = Math.Max(360, maxY - minY);

        foreach (var disp in list)
        {
            disp.CanvasLeft = disp.X - minX;
            disp.CanvasTop = disp.Y - minY;
            disp.CanvasWidth = disp.Width > 0 ? disp.Width : 1920;
            disp.CanvasHeight = disp.Height > 0 ? disp.Height : 1080;
        }

        return new StationTopologyResult
        {
            BoundingWidth = bWidth,
            BoundingHeight = bHeight,
            MinX = minX,
            MinY = minY,
            Displays = list
        };
    }
}
