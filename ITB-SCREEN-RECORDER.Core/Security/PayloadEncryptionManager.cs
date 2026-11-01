using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace ITB_SCREEN_RECORDER.Core.Security
{
    /// <summary>
    /// Encryption manager for sensitive payload data (such as keystrokes and telemetry)
    /// utilizing authenticated AES-256-GCM.
    /// The formatted envelope includes an embedded KeyId for automatic key resolution and key rotation.
    /// </summary>
    public static class PayloadEncryptionManager
    {
        public const string EnvelopePrefix = "ENC:v1:";
        private const int NonceSize = 12; // 96 bits for GCM
        private const int TagSize = 16;   // 128 bits auth tag

        /// <summary>
        /// Generates a cryptographically strong random AES-256 key (32 bytes).
        /// </summary>
        /// <returns>A 32-byte cryptographic key array.</returns>
        public static byte[] GenerateKey()
        {
            byte[] key = new byte[32];
            RandomNumberGenerator.Fill(key);
            return key;
        }

        /// <summary>
        /// Encrypts plaintext string using AES-256-GCM and returns an envelope formatted with KeyId.
        /// </summary>
        /// <param name="plaintext">Unencrypted text to protect.</param>
        /// <param name="keyId">Identifier of the encryption key for rotation support.</param>
        /// <param name="keyBytes">32-byte AES key.</param>
        /// <returns>Envelope formatted string (e.g., "ENC:v1:{keyId}:{base64Payload}").</returns>
        public static string Encrypt(string plaintext, string keyId, byte[] keyBytes)
        {
            if (string.IsNullOrEmpty(plaintext)) return string.Empty;
            if (keyBytes == null || keyBytes.Length != 32)
            {
                throw new ArgumentException("AES-256 key must be exactly 32 bytes (256 bits).", nameof(keyBytes));
            }

            byte[] plaintextBytes = Encoding.UTF8.GetBytes(plaintext);
            byte[] nonce = new byte[NonceSize];
            RandomNumberGenerator.Fill(nonce);

            byte[] ciphertext = new byte[plaintextBytes.Length];
            byte[] tag = new byte[TagSize];

            using (var aesGcm = new AesGcm(keyBytes, TagSize))
            {
                aesGcm.Encrypt(nonce, plaintextBytes, ciphertext, tag);
            }

            // Combine: Nonce (12) + Tag (16) + Ciphertext
            byte[] combined = new byte[NonceSize + TagSize + ciphertext.Length];
            Buffer.BlockCopy(nonce, 0, combined, 0, NonceSize);
            Buffer.BlockCopy(tag, 0, combined, NonceSize, TagSize);
            Buffer.BlockCopy(ciphertext, 0, combined, NonceSize + TagSize, ciphertext.Length);

            string payloadBase64 = Convert.ToBase64String(combined);
            return $"{EnvelopePrefix}{keyId}:{payloadBase64}";
        }

        /// <summary>
        /// Decrypts an encrypted envelope. If the input string is not encrypted (legacy plaintext), returns it untouched.
        /// </summary>
        /// <param name="input">Encrypted envelope or plaintext string.</param>
        /// <param name="keyResolver">Function resolving the 32-byte key given a KeyId.</param>
        /// <param name="fallbackResolver">Optional fallback function if decryption fails or key is missing.</param>
        /// <returns>Decrypted UTF-8 string or legacy plaintext.</returns>
        public static string Decrypt(string input, Func<string, byte[]?> keyResolver, Func<string, string>? fallbackResolver = null)
        {
            if (string.IsNullOrEmpty(input) || !input.StartsWith(EnvelopePrefix, StringComparison.Ordinal))
            {
                return input; // Legacy plaintext passthrough
            }

            try
            {
                string content = input.Substring(EnvelopePrefix.Length);
                int colonIdx = content.IndexOf(':');
                if (colonIdx <= 0) return input;

                string keyId = content.Substring(0, colonIdx);
                string payloadBase64 = content.Substring(colonIdx + 1);
                byte[] combined = Convert.FromBase64String(payloadBase64);

                if (combined.Length < NonceSize + TagSize)
                {
                    return "[CORRUPTED_PAYLOAD]";
                }

                byte[]? keyBytes = keyResolver(keyId);
                if (keyBytes == null || keyBytes.Length != 32)
                {
                    if (fallbackResolver != null)
                    {
                        return fallbackResolver(input);
                    }
                    return $"[UNRESOLVED_KEY:{keyId}]";
                }

                byte[] nonce = new byte[NonceSize];
                byte[] tag = new byte[TagSize];
                int cipherLength = combined.Length - NonceSize - TagSize;
                byte[] ciphertext = new byte[cipherLength];

                Buffer.BlockCopy(combined, 0, nonce, 0, NonceSize);
                Buffer.BlockCopy(combined, NonceSize, tag, 0, TagSize);
                Buffer.BlockCopy(combined, NonceSize + TagSize, ciphertext, 0, cipherLength);

                byte[] decrypted = new byte[cipherLength];
                using (var aesGcm = new AesGcm(keyBytes, TagSize))
                {
                    aesGcm.Decrypt(nonce, ciphertext, tag, decrypted);
                }

                return Encoding.UTF8.GetString(decrypted);
            }
            catch
            {
                if (fallbackResolver != null)
                {
                    return fallbackResolver(input);
                }
                return "[DECRYPTION_FAILED]";
            }
        }
    }
}
