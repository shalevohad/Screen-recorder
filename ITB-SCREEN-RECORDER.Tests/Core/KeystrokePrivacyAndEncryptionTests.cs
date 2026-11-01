using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Security;
using ITB_SCREEN_RECORDER.Server.Data;
using ITB_SCREEN_RECORDER.Server.Data.Repositories;
using ITB_SCREEN_RECORDER.Server.Services.Security;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.Core
{
    public class KeystrokePrivacyAndEncryptionTests
    {
        [Fact]
        public void PayloadEncryptionManager_EncryptAndDecrypt_RoundTrip_Success()
        {
            byte[] key = PayloadEncryptionManager.GenerateKey();
            string keyId = "KEY-TEST-001";
            string plaintext = "Ctrl+Alt+Delete";

            string encrypted = PayloadEncryptionManager.Encrypt(plaintext, keyId, key);

            Assert.StartsWith(PayloadEncryptionManager.EnvelopePrefix + keyId + ":", encrypted);

            string decrypted = PayloadEncryptionManager.Decrypt(encrypted, id => id == keyId ? key : null);

            Assert.Equal(plaintext, decrypted);
        }

        [Fact]
        public void PayloadEncryptionManager_LegacyPlaintext_ReturnsUnchanged()
        {
            byte[] key = PayloadEncryptionManager.GenerateKey();
            string plaintext = "LegacyUnencryptedKeystroke";

            string decrypted = PayloadEncryptionManager.Decrypt(plaintext, _ => key);

            Assert.Equal(plaintext, decrypted);
        }

        [Fact]
        public void PayloadEncryptionManager_FallbackToOtherKeys_CanDecryptOlderKey()
        {
            byte[] oldKey = PayloadEncryptionManager.GenerateKey();
            byte[] newKey = PayloadEncryptionManager.GenerateKey();

            string oldKeyId = "KEY-OLD";
            string text = "SecretData123";

            string encryptedWithOld = PayloadEncryptionManager.Encrypt(text, oldKeyId, oldKey);

            // When KeyResolver does not directly map the ID, evaluate dictionary key fallback
            var keyDict = new Dictionary<string, byte[]>
            {
                { "KEY-NEW", newKey },
                { "KEY-OLD", oldKey }
            };

            string decrypted = PayloadEncryptionManager.Decrypt(
                encryptedWithOld,
                id => keyDict.TryGetValue(id, out var k) ? k : null);

            Assert.Equal(text, decrypted);
        }

        [Fact]
        public async Task KeyRingService_AutoGeneratesKeyWhenEmpty_AndRotatesWithoutLosingPastKeys()
        {
            using var factory = new ITB_SCREEN_RECORDER.Tests.Server.Data.TestSqliteConnectionFactory();
            var initializer = new CatalogDbInitializer(factory);
            initializer.Initialize();

            var keyRing = new KeyRingService(factory);
            await keyRing.InitializeAsync();

            var (initialKeyId, initialKeyBytes) = keyRing.GetActiveKey();
            Assert.False(string.IsNullOrEmpty(initialKeyId));
            Assert.Equal(32, initialKeyBytes.Length);

            // Encrypt data with the initial active key
            string text1 = "PasswordInput";
            string enc1 = PayloadEncryptionManager.Encrypt(text1, initialKeyId, initialKeyBytes);

            // Execute key rotation
            string newKeyId = await keyRing.RotateKeyAsync();
            Assert.NotEqual(initialKeyId, newKeyId);

            var (activeId, activeBytes) = keyRing.GetActiveKey();
            Assert.Equal(newKeyId, activeId);

            // Encrypt additional data with the rotated new key
            string text2 = "NewSessionInput";
            string enc2 = PayloadEncryptionManager.Encrypt(text2, activeId, activeBytes);

            // Transparent automatic decryption of both entries via KeyRing
            string dec1 = keyRing.Decrypt(enc1);
            string dec2 = keyRing.Decrypt(enc2);

            Assert.Equal(text1, dec1);
            Assert.Equal(text2, dec2);
        }
    }
}
