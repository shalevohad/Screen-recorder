using System;
using System.IO;

namespace ITB_SCREEN_RECORDER.Player.Core.Ingestion
{
    /// <summary>
    /// Thread-safe non-locking windowed stream representing a contiguous slice [startOffset, startOffset + length]
    /// inside a larger container file.
    /// </summary>
    public sealed class SubStream : Stream
    {
        private readonly Stream _baseStream;
        private readonly long _startOffset;
        private readonly long _length;
        private readonly bool _ownsStream;
        private long _position;
        private bool _isDisposed;

        public SubStream(Stream baseStream, long startOffset, long length, bool ownsStream = true)
        {
            _baseStream = baseStream ?? throw new ArgumentNullException(nameof(baseStream));
            if (startOffset < 0) throw new ArgumentOutOfRangeException(nameof(startOffset), "Offset cannot be negative.");
            if (length < 0) throw new ArgumentOutOfRangeException(nameof(length), "Length cannot be negative.");

            _startOffset = startOffset;
            _length = length;
            _ownsStream = ownsStream;
            _position = 0;

            if (_baseStream.CanSeek)
            {
                _baseStream.Seek(_startOffset, SeekOrigin.Begin);
            }
        }

        public override bool CanRead => !_isDisposed && _baseStream.CanRead;
        public override bool CanSeek => !_isDisposed && _baseStream.CanSeek;
        public override bool CanWrite => false;
        public override long Length => _length;

        public override long Position
        {
            get => _position;
            set => Seek(value, SeekOrigin.Begin);
        }

        public override int Read(byte[] buffer, int offset, int count)
        {
            ObjectDisposedException.ThrowIf(_isDisposed, this);

            if (_position >= _length) return 0;

            int toRead = (int)Math.Min(count, _length - _position);
            if (toRead <= 0) return 0;

            if (_baseStream.CanSeek && _baseStream.Position != _startOffset + _position)
            {
                _baseStream.Seek(_startOffset + _position, SeekOrigin.Begin);
            }

            int read = _baseStream.Read(buffer, offset, toRead);
            _position += read;
            return read;
        }

        public override long Seek(long offset, SeekOrigin origin)
        {
            ObjectDisposedException.ThrowIf(_isDisposed, this);

            long targetPos = origin switch
            {
                SeekOrigin.Begin => offset,
                SeekOrigin.Current => _position + offset,
                SeekOrigin.End => _length + offset,
                _ => throw new ArgumentOutOfRangeException(nameof(origin))
            };

            if (targetPos < 0) targetPos = 0;
            if (targetPos > _length) targetPos = _length;

            _position = targetPos;
            if (_baseStream.CanSeek)
            {
                _baseStream.Seek(_startOffset + _position, SeekOrigin.Begin);
            }

            return _position;
        }

        public override void Flush() { }

        public override void SetLength(long value) => throw new NotSupportedException();

        public override void Write(byte[] buffer, int offset, int count) => throw new NotSupportedException();

        protected override void Dispose(bool disposing)
        {
            if (!_isDisposed)
            {
                _isDisposed = true;
                if (disposing && _ownsStream)
                {
                    _baseStream.Dispose();
                }
            }
            base.Dispose(disposing);
        }
    }
}
