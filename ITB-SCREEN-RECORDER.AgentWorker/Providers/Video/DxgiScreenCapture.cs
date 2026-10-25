#if WINDOWS
using ITB_SCREEN_RECORDER.Core.Common;
using ITBRecorderAgent;
using System;
using System.IO;
using System.Runtime.InteropServices;
using System.Runtime.Versioning;
using Vortice.Direct3D;
using Vortice.Direct3D11;
using Vortice.DXGI;

namespace ITBRecorderAgent.Providers.Video
{
    [SupportedOSPlatform("windows")]
    public class DxgiScreenCapture : IScreenCaptureProvider
    {
        public int Width { get; private set; }
        public int Height { get; private set; }
        public int X { get; private set; }
        public int Y { get; private set; }
        public string DeviceName { get; private set; } = string.Empty;
        public uint AdapterIndex { get; }
        public uint OutputIndex { get; }
        public string DisplayId { get; }
        public bool IsInitialized { get; private set; }

        private ID3D11Device? _device;
        private ID3D11DeviceContext? _context;
        private IDXGIOutputDuplication? _deskDupl;
        private ID3D11Texture2D? _stagingTexture;

        // Reusable preallocated raw frame buffer to eliminate runtime heap allocations of byte[]
        private byte[]? _frameBuffer;

        private DateTime _lastReinitAttemptUtc = DateTime.MinValue;
        private static readonly TimeSpan ReinitRetryInterval = TimeSpan.FromSeconds(2);

        public DxgiScreenCapture(uint adapterIndex = 0, uint outputIndex = 0, string displayId = "mon-0")
        {
            AdapterIndex = adapterIndex;
            OutputIndex = outputIndex;
            DisplayId = displayId;
        }

        public void Initialize()
        {
            try
            {
                DesktopSecurityManager.TryAttachToInputDesktop();

                using var factory = DXGI.CreateDXGIFactory1<IDXGIFactory1>();
                if (!factory.EnumAdapters1(AdapterIndex, out var adapter).Success)
                {
                    throw new InvalidOperationException($"Cannot find DXGI Adapter {AdapterIndex}");
                }

                using (adapter)
                {
                    D3D11.D3D11CreateDevice(
                        adapter, DriverType.Unknown, DeviceCreationFlags.BgraSupport,
                        new[] { FeatureLevel.Level_11_1, FeatureLevel.Level_11_0 },
                        out _device, out _context);

                    if (!adapter.EnumOutputs(OutputIndex, out IDXGIOutput output).Success)
                    {
                        throw new InvalidOperationException($"Cannot find DXGI Output {OutputIndex} on Adapter {AdapterIndex}");
                    }

                    using (output)
                    {
                        using var output1 = output.QueryInterface<IDXGIOutput1>();

                        var desc = output.Description;
                        Width = desc.DesktopCoordinates.Right - desc.DesktopCoordinates.Left;
                        Height = desc.DesktopCoordinates.Bottom - desc.DesktopCoordinates.Top;
                        X = desc.DesktopCoordinates.Left;
                        Y = desc.DesktopCoordinates.Top;
                        DeviceName = desc.DeviceName;

                        // Ensure thread desktop attachment immediately before duplicating output surface
                        DesktopSecurityManager.TryAttachToInputDesktop();
                        _deskDupl = output1.DuplicateOutput(_device);
                    }
                }

                var textureDesc = new Texture2DDescription
                {
                    Width = (uint)Width,
                    Height = (uint)Height,
                    MipLevels = 1,
                    ArraySize = 1,
                    Format = Vortice.DXGI.Format.B8G8R8A8_UNorm,
                    SampleDescription = new SampleDescription(1, 0),
                    Usage = ResourceUsage.Staging,
                    BindFlags = BindFlags.None,
                    CPUAccessFlags = CpuAccessFlags.Read,
                    MiscFlags = ResourceOptionFlags.None
                };

                _stagingTexture = _device.CreateTexture2D(textureDesc);

                // One-time preallocation of byte array
                _frameBuffer = new byte[Width * Height * 4];

                IsInitialized = true;
                Logger.Info($"[VIDEO] DXGI Desktop Duplication initialized: {Width}x{Height}");
            }
            catch (Exception ex)
            {
                Logger.Error($"[VIDEO] DXGI initialization failed: {ex.Message}");
                Dispose();
                throw;
            }
        }

        /// <summary>
        /// Attempts to acquire the next screen frame from DXGI Desktop Duplication into a preallocated byte buffer.
        /// </summary>
        /// <param name="frameData">Outputs reference to preallocated BGRA frame buffer on success, or null on timeout/error.</param>
        /// <returns>True if a frame was successfully acquired and mapped; false on timeout or initialization error.</returns>
        public bool TryCaptureFrame(out byte[]? frameData)
        {
            frameData = null;

            if (!IsInitialized || _deskDupl == null || _stagingTexture == null || _context == null || _frameBuffer == null)
            {
                if (DateTime.UtcNow - _lastReinitAttemptUtc >= ReinitRetryInterval)
                {
                    _lastReinitAttemptUtc = DateTime.UtcNow;
                    try { Initialize(); } catch { }
                }
                if (!IsInitialized) return false;
            }

            try
            {
                // 5ms acquire timeout: returns immediately to capture loop if frame is unchanged
                var result = _deskDupl.AcquireNextFrame(5, out _, out var desktopResource);

                if (result.Failure)
                {
                    if (result.Code != Vortice.DXGI.ResultCode.WaitTimeout.Code)
                    {
                        Logger.Warn($"[VIDEO] DXGI error (0x{result.Code:X8}). Reinitializing capture pipeline...");
                        Reinitialize();
                    }
                    return false;
                }

                using (desktopResource)
                using (var desktopTexture = desktopResource.QueryInterface<ID3D11Texture2D>())
                {
                    _context.CopyResource(_stagingTexture, desktopTexture);
                }

                _deskDupl.ReleaseFrame();

                var mapped = _context.Map(_stagingTexture, 0, MapMode.Read, Vortice.Direct3D11.MapFlags.None);
                try
                {
                    int rowPitch = Width * 4;

                    // Optimization: if row pitch equals tightly packed width * 4, execute single block copy
                    if (mapped.RowPitch == rowPitch)
                    {
                        Marshal.Copy(mapped.DataPointer, _frameBuffer, 0, _frameBuffer.Length);
                    }
                    else
                    {
                        for (int y = 0; y < Height; y++)
                        {
                            IntPtr srcRow = IntPtr.Add(mapped.DataPointer, (int)(y * mapped.RowPitch));
                            Marshal.Copy(srcRow, _frameBuffer, y * rowPitch, rowPitch);
                        }
                    }

                    frameData = _frameBuffer; // Return cached buffer reference (zero runtime GC allocations)
                    return true;
                }
                finally
                {
                    _context.Unmap(_stagingTexture, 0);
                }
            }
            catch
            {
                return false;
            }
        }

        private void Reinitialize()
        {
            _lastReinitAttemptUtc = DateTime.UtcNow;
            Dispose();
            try
            {
                Initialize();
            }
            catch
            {
                // Desktop may still be locked, sleeping, or in transition.
                // IsInitialized remains false; TryCaptureFrame will retry per ReinitRetryInterval.
            }
        }

        public void Dispose()
        {
            IsInitialized = false;
            _stagingTexture?.Dispose();
            _stagingTexture = null;
            _deskDupl?.Dispose();
            _deskDupl = null;
            _context?.Dispose();
            _context = null;
            _device?.Dispose();
            _device = null;
        }
    }
}
#endif