using System;
using System.Buffers.Binary;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace ITB_SCREEN_RECORDER.Player.Core.Ipc;

/// <summary>
/// Authenticated, encrypted framing layer over bidirectional streams (such as Named Pipes).
/// Protects against eavesdropping, bit tampering, payload injection, and replay attacks
/// using AES-256-GCM authenticated encryption and monotonic sequence counters.
/// </summary>
public sealed class SecureIpcChannel : IDisposable
{
    private static readonly byte[] MagicBytes = new byte[] { 0x49, 0x54, 0x42, 0x53 }; // "ITBS"
    private const int NonceSize = 12; // 96-bit AES-GCM nonce
    private const int TagSize = 16;   // 128-bit authentication tag
    private const int HeaderSize = 4 + 8 + NonceSize + TagSize + 4; // 44 bytes

    private readonly Stream _stream;
    private readonly byte[] _sessionKey;
    private readonly AesGcm _aesGcm;
    private readonly SemaphoreSlim _writeLock = new(1, 1);
    private ulong _localSequence = 0;
    private ulong _lastReceivedSequence = 0;
    private bool _disposed;

    public SecureIpcChannel(Stream stream, byte[] sessionKey)
    {
        _stream = stream ?? throw new ArgumentNullException(nameof(stream));
        if (sessionKey == null || sessionKey.Length != 32)
        {
            throw new ArgumentException("Session key must be exactly 32 bytes (256-bit AES key).", nameof(sessionKey));
        }

        _sessionKey = (byte[])sessionKey.Clone();
        _aesGcm = new AesGcm(_sessionKey, TagSize);
    }

    /// <summary>
    /// Encrypts and sends a UTF-8 string payload with authentication tag and anti-replay sequence number.
    /// </summary>
    public async Task SendMessageAsync(string jsonPayload, CancellationToken ct = default)
    {
        ObjectDisposedException.ThrowIf(_disposed, this);
        if (jsonPayload == null) throw new ArgumentNullException(nameof(jsonPayload));

        byte[] plaintextBytes = Encoding.UTF8.GetBytes(jsonPayload);
        byte[] nonce = new byte[NonceSize];
        RandomNumberGenerator.Fill(nonce);

        byte[] ciphertext = new byte[plaintextBytes.Length];
        byte[] tag = new byte[TagSize];

        await _writeLock.WaitAsync(ct).ConfigureAwait(false);
        try
        {
            _localSequence++;
            byte[] seqBytes = new byte[8];
            BinaryPrimitives.WriteUInt64LittleEndian(seqBytes, _localSequence);

            // Encrypt with AES-256-GCM. Sequence number is bound as Associated Authenticated Data (AAD)
            _aesGcm.Encrypt(nonce, plaintextBytes, ciphertext, tag, seqBytes);

            // Construct frame: Magic (4) + Seq (8) + Nonce (12) + Tag (16) + Len (4) + Ciphertext
            byte[] frame = new byte[HeaderSize + ciphertext.Length];
            Buffer.BlockCopy(MagicBytes, 0, frame, 0, 4);
            Buffer.BlockCopy(seqBytes, 0, frame, 4, 8);
            Buffer.BlockCopy(nonce, 0, frame, 12, NonceSize);
            Buffer.BlockCopy(tag, 0, frame, 12 + NonceSize, TagSize);
            BinaryPrimitives.WriteInt32LittleEndian(frame.AsSpan(12 + NonceSize + TagSize, 4), ciphertext.Length);
            Buffer.BlockCopy(ciphertext, 0, frame, HeaderSize, ciphertext.Length);

            await _stream.WriteAsync(frame, ct).ConfigureAwait(false);
            await _stream.FlushAsync(ct).ConfigureAwait(false);
        }
        finally
        {
            _writeLock.Release();
        }
    }

    /// <summary>
    /// Reads and decrypts an authenticated frame from the stream.
    /// Validates the 128-bit authentication tag and ensures strictly increasing sequence counter.
    /// Throws CryptographicException if tampering, corruption, or replay is detected.
    /// </summary>
    public async Task<string> ReceiveMessageAsync(CancellationToken ct = default)
    {
        ObjectDisposedException.ThrowIf(_disposed, this);

        byte[] headerBuffer = new byte[HeaderSize];
        await ReadExactBytesAsync(headerBuffer, 0, HeaderSize, ct).ConfigureAwait(false);

        // Verify magic
        if (headerBuffer[0] != MagicBytes[0] ||
            headerBuffer[1] != MagicBytes[1] ||
            headerBuffer[2] != MagicBytes[2] ||
            headerBuffer[3] != MagicBytes[3])
        {
            throw new CryptographicException("Invalid frame magic header. Stream corrupted or untrusted client.");
        }

        // Extract sequence number (AAD)
        ulong sequence = BinaryPrimitives.ReadUInt64LittleEndian(headerBuffer.AsSpan(4, 8));
        if (sequence <= _lastReceivedSequence)
        {
            throw new CryptographicException($"Anti-replay violation: Received sequence {sequence} <= last seen {_lastReceivedSequence}.");
        }

        byte[] seqBytes = new byte[8];
        Buffer.BlockCopy(headerBuffer, 4, seqBytes, 0, 8);

        byte[] nonce = new byte[NonceSize];
        Buffer.BlockCopy(headerBuffer, 12, nonce, 0, NonceSize);

        byte[] tag = new byte[TagSize];
        Buffer.BlockCopy(headerBuffer, 12 + NonceSize, tag, 0, TagSize);

        int payloadLength = BinaryPrimitives.ReadInt32LittleEndian(headerBuffer.AsSpan(12 + NonceSize + TagSize, 4));
        if (payloadLength < 0 || payloadLength > 64 * 1024 * 1024) // 64MB sanity limit
        {
            throw new CryptographicException($"Invalid encrypted payload length: {payloadLength} bytes.");
        }

        byte[] ciphertext = new byte[payloadLength];
        if (payloadLength > 0)
        {
            await ReadExactBytesAsync(ciphertext, 0, payloadLength, ct).ConfigureAwait(false);
        }

        byte[] plaintextBytes = new byte[payloadLength];
        try
        {
            // Decrypt and authenticate. Any tampering with ciphertext, nonce, tag, or sequence number causes AEAD failure.
            _aesGcm.Decrypt(nonce, ciphertext, tag, plaintextBytes, seqBytes);
        }
        catch (CryptographicException ex)
        {
            throw new CryptographicException("Authentication tag verification failed. Payload was tampered with or corrupted.", ex);
        }

        _lastReceivedSequence = sequence;
        return Encoding.UTF8.GetString(plaintextBytes);
    }

    private async Task ReadExactBytesAsync(byte[] buffer, int offset, int count, CancellationToken ct)
    {
        int totalRead = 0;
        while (totalRead < count)
        {
            int bytesRead = await _stream.ReadAsync(buffer.AsMemory(offset + totalRead, count - totalRead), ct).ConfigureAwait(false);
            if (bytesRead == 0)
            {
                throw new EndOfStreamException($"Stream closed prematurely after reading {totalRead}/{count} bytes.");
            }
            totalRead += bytesRead;
        }
    }

    public void Dispose()
    {
        if (_disposed) return;
        _disposed = true;
        _aesGcm.Dispose();
        _writeLock.Dispose();
        CryptographicOperations.ZeroMemory(_sessionKey);
    }
}
