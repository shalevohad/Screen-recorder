using SharpGen.Runtime;
using System;
using Vortice.Direct3D;
using Vortice.Direct3D11;
using Vortice.DXGI;

namespace ITBRecorderAgent.Providers.Video
{
    public class DxgiScreenCapture : IDisposable
    {
        private ID3D11Device? _device;
        private ID3D11DeviceContext? _context;
        private IDXGIOutputDuplication? _duplication;
        private ID3D11Texture2D? _screenTexture;
        private byte[]? _reusableFrameBuffer;

        public int Width { get; private set; }
        public int Height { get; private set; }

        public void Initialize()
        {
            CleanupResources();

            using var factory = DXGI.CreateDXGIFactory1<IDXGIFactory1>();
            if (factory == null) throw new InvalidOperationException("Failed to create DXGIFactory1.");

            // ב-Vortice משתמשים ב-EnumAdapters1
            factory.EnumAdapters1(0, out IDXGIAdapter1? adapter);
            if (adapter == null) throw new InvalidOperationException("Failed to get DXGI Adapter.");

            DeviceCreationFlags creationFlags = DeviceCreationFlags.BgraSupport;

            D3D11.D3D11CreateDevice(
                adapter,
                DriverType.Unknown,
                creationFlags,
                new[] { FeatureLevel.Level_11_0 },
                out ID3D11Device? device,
                out ID3D11DeviceContext? context
            );

            _device = device ?? throw new InvalidOperationException("Failed to create D3D11 Device.");
            _context = context ?? throw new InvalidOperationException("Failed to create D3D11 Context.");

            // ב-Vortice משתמשים ב-EnumOutputs
            adapter.EnumOutputs(0, out IDXGIOutput? output);
            if (output == null) throw new InvalidOperationException("Failed to get DXGI Output.");

            using var output1 = output.QueryInterface<IDXGIOutput1>();

            var bounds = output.Description.DesktopCoordinates;
            Width = bounds.Right - bounds.Left;
            Height = bounds.Bottom - bounds.Top;

            _duplication = output1.DuplicateOutput(_device);

            // התאמת הגדרות הטקסטורה לדרישות המחמירות של Vortice
            var textureDesc = new Texture2DDescription
            {
                Width = (uint)Width,
                Height = (uint)Height,
                MipLevels = 1,
                ArraySize = 1,
                Format = Format.B8G8R8A8_UNorm,
                SampleDescription = new SampleDescription(1, 0),
                Usage = ResourceUsage.Staging,
                BindFlags = BindFlags.None,
                CPUAccessFlags = CpuAccessFlags.Read,
                MiscFlags = ResourceOptionFlags.None
            };

            _screenTexture = _device.CreateTexture2D(textureDesc);

            int bufferSize = Width * Height * 4;
            _reusableFrameBuffer = new byte[bufferSize];

            Console.WriteLine($"[INFO] DXGI Capture Initialized via Vortice: {Width}x{Height}");

            // שחרור זיכרון זמני
            output?.Dispose();
            adapter?.Dispose();
        }

        public bool TryCaptureFrame(out byte[]? frameBuffer)
        {
            frameBuffer = null;

            if (_duplication == null || _device == null || _context == null || _screenTexture == null || _reusableFrameBuffer == null)
            {
                return false;
            }

            try
            {
                // ב-Vortice אובייקט המידע נקרא OutduplFrameInfo
                Result result = _duplication.AcquireNextFrame(500, out OutduplFrameInfo frameInfo, out IDXGIResource? screenResource);

                if (result.Failure || screenResource == null)
                {
                    // ציון נתיב מפורש לפתרון בעיית הדו-משמעות של ResultCode
                    if (result.Code == Vortice.DXGI.ResultCode.AccessLost.Code)
                    {
                        Console.WriteLine("[WARNING] DXGI Access Lost. Re-initializing engine...");
                        Initialize();
                    }
                    return false;
                }

                using (var texture2D = screenResource.QueryInterface<ID3D11Texture2D>())
                {
                    _context.CopyResource(_screenTexture, texture2D);
                }

                screenResource.Dispose();
                _duplication.ReleaseFrame();

                MappedSubresource mappedResource = _context.Map(_screenTexture, 0, MapMode.Read, Vortice.Direct3D11.MapFlags.None);

                unsafe
                {
                    byte* sourcePtr = (byte*)mappedResource.DataPointer;
                    fixed (byte* destPtr = _reusableFrameBuffer)
                    {
                        int rowSize = Width * 4;
                        for (int y = 0; y < Height; y++)
                        {
                            Buffer.MemoryCopy(
                                sourcePtr + (y * mappedResource.RowPitch),
                                destPtr + (y * rowSize),
                                rowSize,
                                rowSize
                            );
                        }
                    }
                }

                _context.Unmap(_screenTexture, 0);
                frameBuffer = _reusableFrameBuffer;
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[WARNING] Capture error: {ex.Message}");
                return false;
            }
        }

        private void CleanupResources()
        {
            _duplication?.Dispose();
            _duplication = null;
            _screenTexture?.Dispose();
            _screenTexture = null;
            _context?.Dispose();
            _context = null;
            _device?.Dispose();
            _device = null;
        }

        public void Dispose()
        {
            CleanupResources();
        }
    }
}