using System;
using System.Collections.Generic;

namespace ITB_SCREEN_RECORDER.Core.Contracts.Topology
{
    public class StationDisplayTopologyDto
    {
        public string Hostname { get; set; } = string.Empty;
        public string AudioCarrierDisplayId { get; set; } = "mon-0";
        public List<DisplayMetadataDto> Displays { get; set; } = new();
        public DesktopBoundsDto VirtualDesktopBounds { get; set; } = new();
        public long TimestampEpochMs { get; set; }
    }

    public class DisplayMetadataDto
    {
        public string DisplayId { get; set; } = "mon-0";          // "mon-0", "mon-1", "mon-2"
        public string DisplayName { get; set; } = string.Empty;     // @"\\.\DISPLAY1"
        public string AdapterName { get; set; } = string.Empty;     // e.g. "NVIDIA GeForce RTX 4070"
        public string AdapterLuid { get; set; } = string.Empty;     // e.g. "0x0001004A"
        public bool IsPrimary { get; set; }
        public bool HasAudio { get; set; }
        public int X { get; set; }                                 // Virtual desktop X coordinate
        public int Y { get; set; }                                 // Virtual desktop Y coordinate
        public int Width { get; set; }                             // e.g. 1920 or 3840
        public int Height { get; set; }                            // e.g. 1080 or 2160
        public double ScaleFactor { get; set; } = 1.0;             // DPI scale: 1.0, 1.25, 1.5
        public int RefreshRateHz { get; set; } = 60;
        public int TargetFps { get; set; } = 30;
    }

    public class DesktopBoundsDto
    {
        public int X { get; set; }
        public int Y { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
    }
}
