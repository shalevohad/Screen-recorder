using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using ITB_SCREEN_RECORDER.Core.Common;
using ITB_SCREEN_RECORDER.Core.Security;
using ITB_SCREEN_RECORDER.Server.Data;

namespace ITB_SCREEN_RECORDER.Server.Services.Security
{
    public interface IKeyRingService
    {
        Task InitializeAsync();
        (string KeyId, byte[] KeyBytes) GetActiveKey();
        byte[]? GetKey(string keyId);
        IReadOnlyDictionary<string, byte[]> GetAllKeys();
        Task<string> RotateKeyAsync();
        string Decrypt(string input);
    }

    public sealed class KeyRingService : IKeyRingService
    {
        private readonly ICatalogConnectionFactory _factory;
        private readonly ConcurrentDictionary<string, byte[]> _keys = new(StringComparer.OrdinalIgnoreCase);
        private string? _activeKeyId;
        private byte[]? _activeKeyBytes;
        private readonly object _lock = new();

        public KeyRingService(ICatalogConnectionFactory factory)
        {
            _factory = factory ?? throw new ArgumentNullException(nameof(factory));
        }

        public async Task InitializeAsync()
        {
            using var db = _factory.CreateConnection();
            const string querySql = @"
                SELECT key_id AS KeyId, key_material AS KeyMaterial, is_active AS IsActive, created_at_utc AS CreatedAtUtc 
                FROM encryption_keyring 
                ORDER BY created_at_utc ASC;
            ";

            var rows = (await db.QueryAsync<KeyRecord>(querySql)).ToList();

            if (!rows.Any())
            {
                // יצירה אוטומטית של מפתח מאסטר ראשוני אם המערכת חדשה
                byte[] newKey = PayloadEncryptionManager.GenerateKey();
                string newKeyId = $"KEY-{DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()}";
                string base64Material = Convert.ToBase64String(newKey);
                long now = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();

                const string insertSql = @"
                    INSERT INTO encryption_keyring (key_id, key_material, algorithm, is_active, created_at_utc)
                    VALUES (@newKeyId, @base64Material, 'AES-256-GCM', 1, @now);
                ";
                await db.ExecuteAsync(insertSql, new { newKeyId, base64Material, now });

                lock (_lock)
                {
                    _keys[newKeyId] = newKey;
                    _activeKeyId = newKeyId;
                    _activeKeyBytes = newKey;
                }

                Logger.Info($"[SECURITY:KEYRING] Auto-generated initial Master Encryption Key: {newKeyId}");
            }
            else
            {
                lock (_lock)
                {
                    _keys.Clear();
                    foreach (var r in rows)
                    {
                        try
                        {
                            byte[] keyBytes = Convert.FromBase64String(r.KeyMaterial);
                            _keys[r.KeyId] = keyBytes;
                        }
                        catch (Exception ex)
                        {
                            Logger.Error($"[SECURITY:KEYRING] Failed to decode key {r.KeyId}: {ex.Message}");
                        }
                    }

                    var activeRow = rows.FirstOrDefault(r => r.IsActive == 1) ?? rows.Last();
                    if (_keys.TryGetValue(activeRow.KeyId, out var activeBytes))
                    {
                        _activeKeyId = activeRow.KeyId;
                        _activeKeyBytes = activeBytes;
                    }
                }

                Logger.Info($"[SECURITY:KEYRING] Loaded {_keys.Count} encryption keys. Active Key: {_activeKeyId}");
            }
        }

        public (string KeyId, byte[] KeyBytes) GetActiveKey()
        {
            lock (_lock)
            {
                if (_activeKeyId == null || _activeKeyBytes == null)
                {
                    // Fallback חירום
                    InitializeAsync().GetAwaiter().GetResult();
                }
                return (_activeKeyId!, _activeKeyBytes!);
            }
        }

        public byte[]? GetKey(string keyId)
        {
            if (string.IsNullOrEmpty(keyId)) return null;
            if (_keys.TryGetValue(keyId, out var key)) return key;

            // אם המפתח עדיין לא בזיכרון, בדיקה במסד
            using var db = _factory.CreateConnection();
            string? material = db.QuerySingleOrDefault<string?>(
                "SELECT key_material FROM encryption_keyring WHERE key_id = @keyId;", new { keyId });

            if (!string.IsNullOrEmpty(material))
            {
                try
                {
                    byte[] parsed = Convert.FromBase64String(material);
                    _keys[keyId] = parsed;
                    return parsed;
                }
                catch { }
            }

            return null;
        }

        public IReadOnlyDictionary<string, byte[]> GetAllKeys() => _keys;

        public async Task<string> RotateKeyAsync()
        {
            byte[] newKey = PayloadEncryptionManager.GenerateKey();
            string newKeyId = $"KEY-{DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()}";
            string base64Material = Convert.ToBase64String(newKey);
            long now = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();

            using var db = _factory.CreateConnection();
            using var tx = db.BeginTransaction();

            await db.ExecuteAsync("UPDATE encryption_keyring SET is_active = 0;", transaction: tx);
            const string insertSql = @"
                INSERT INTO encryption_keyring (key_id, key_material, algorithm, is_active, created_at_utc)
                VALUES (@newKeyId, @base64Material, 'AES-256-GCM', 1, @now);
            ";
            await db.ExecuteAsync(insertSql, new { newKeyId, base64Material, now }, transaction: tx);
            tx.Commit();

            lock (_lock)
            {
                _keys[newKeyId] = newKey;
                _activeKeyId = newKeyId;
                _activeKeyBytes = newKey;
            }

            Logger.Info($"[SECURITY:KEYRING] Key rotated successfully. New Active Key: {newKeyId}");
            return newKeyId;
        }

        public string Decrypt(string input)
        {
            return PayloadEncryptionManager.Decrypt(
                input,
                keyId => GetKey(keyId),
                fallbackInput => TryDecryptWithAllKeys(fallbackInput));
        }

        private string TryDecryptWithAllKeys(string input)
        {
            if (!input.StartsWith(PayloadEncryptionManager.EnvelopePrefix, StringComparison.Ordinal))
            {
                return input;
            }

            // נסיון פענוח עיוור כנגד כלל המפתחות השמורים ב-Keyring
            foreach (var kvp in _keys.Reverse())
            {
                try
                {
                    string res = PayloadEncryptionManager.Decrypt(input, _ => kvp.Value);
                    if (!res.StartsWith("[") || !res.EndsWith("]"))
                    {
                        return res;
                    }
                }
                catch { }
            }

            return "[DECRYPTION_FAILED]";
        }

        private sealed class KeyRecord
        {
            public string KeyId { get; set; } = string.Empty;
            public string KeyMaterial { get; set; } = string.Empty;
            public int IsActive { get; set; }
            public long CreatedAtUtc { get; set; }
        }
    }
}
