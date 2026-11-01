#if WINDOWS
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Versioning;
using ITB_SCREEN_RECORDER.Core.Common;
using ITB_SCREEN_RECORDER.Core.Contracts.Topology;
using Vortice.DXGI;

namespace ITBRecorderAgent.Providers.Video
{
    [SupportedOSPlatform("windows")]
    public static class DxgiDisplayEnumerator
    {
        public static List<DxgiDisplayDescriptor> EnumerateAttachedDisplays()
        {
            var descriptors = new List<DxgiDisplayDescriptor>();

            try
            {
                using var factory = DXGI.CreateDXGIFactory1<IDXGIFactory1>();
                uint globalIndex = 0;

                for (uint a = 0; factory.EnumAdapters1(a, out var adapter).Success; a++)
                {
                    using (adapter)
                    {
                        var aDesc = adapter.Description1;
                        if ((aDesc.Flags & AdapterFlags.Software) != 0)
                        {
                            continue;
                        }

                        string adapterName = aDesc.Description ?? $"GPU-{a}";
                        string adapterLuid = $"0x{aDesc.Luid:X16}";

                        for (uint o = 0; adapter.EnumOutputs(o, out var output).Success; o++)
                        {
                            using (output)
                            {
                                var oDesc = output.Description;
                                if (!oDesc.AttachedToDesktop)
                                {
                                    continue;
                                }

                                int left = oDesc.DesktopCoordinates.Left;
                                int top = oDesc.DesktopCoordinates.Top;
                                int width = oDesc.DesktopCoordinates.Right - oDesc.DesktopCoordinates.Left;
                                int height = oDesc.DesktopCoordinates.Bottom - oDesc.DesktopCoordinates.Top;

                                if (width <= 0 || height <= 0)
                                {
                                    continue;
                                }

                                string displayId = $"mon-{globalIndex}";
                                bool isPrimary = (left == 0 && top == 0);

                                descriptors.Add(new DxgiDisplayDescriptor(
                                    a,
                                    o,
                                    displayId,
                                    oDesc.DeviceName ?? $@"\\.\DISPLAY{globalIndex + 1}",
                                    adapterName,
                                    adapterLuid,
                                    left,
                                    top,
                                    width,
                                    height,
                                    isPrimary
                                ));

                                globalIndex++;
                            }
                        }
                    }
                }

                if (descriptors.Count > 0)
                {
                    if (!descriptors.Any(d => d.IsPrimary))
                    {
                        descriptors[0] = descriptors[0] with { IsPrimary = true };
                    }

                    // Ensure primary display is always mon-0 (Rule 11: mon-0 carries primary + audio),
                    // followed deterministically by secondary displays
                    descriptors = descriptors
                        .OrderByDescending(d => d.IsPrimary)
                        .ThenBy(d => d.AdapterIndex)
                        .ThenBy(d => d.OutputIndex)
                        .Select((d, idx) => d with { DisplayId = $"mon-{idx}" })
                        .ToList();
                }
            }
            catch (Exception ex)
            {
                Logger.Warn($"[DXGI:ENUM] Failed enumerating DXGI displays: {ex.Message}");
            }

            return descriptors;
        }

        public static StationDisplayTopologyDto BuildTopologyDto(string hostname)
        {
            var descriptors = EnumerateAttachedDisplays();
            var displays = new List<DisplayMetadataDto>();

            int minX = 0, minY = 0, maxX = 1920, maxY = 1080;
            if (descriptors.Count > 0)
            {
                minX = descriptors.Min(d => d.X);
                minY = descriptors.Min(d => d.Y);
                maxX = descriptors.Max(d => d.X + d.Width);
                maxY = descriptors.Max(d => d.Y + d.Height);

                foreach (var d in descriptors)
                {
                    displays.Add(new DisplayMetadataDto
                    {
                        DisplayId = d.DisplayId,
                        DisplayName = d.DeviceName,
                        AdapterName = d.AdapterName,
                        AdapterLuid = d.AdapterLuid,
                        IsPrimary = d.IsPrimary,
                        X = d.X,
                        Y = d.Y,
                        Width = d.Width,
                        Height = d.Height,
                        ScaleFactor = 1.0,
                        RefreshRateHz = 60,
                        TargetFps = d.IsPrimary ? 30 : 20
                    });
                }
            }
            else
            {
                displays.Add(new DisplayMetadataDto
                {
                    DisplayId = "mon-0",
                    DisplayName = @"\\.\DISPLAY1",
                    AdapterName = "Default Adapter",
                    IsPrimary = true,
                    X = 0,
                    Y = 0,
                    Width = 1920,
                    Height = 1080,
                    TargetFps = 30
                });
            }

            return new StationDisplayTopologyDto
            {
                Hostname = hostname,
                Displays = displays,
                VirtualDesktopBounds = new DesktopBoundsDto
                {
                    X = minX,
                    Y = minY,
                    Width = maxX - minX,
                    Height = maxY - minY
                },
                TimestampEpochMs = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()
            };
        }
    }
}
#endif
