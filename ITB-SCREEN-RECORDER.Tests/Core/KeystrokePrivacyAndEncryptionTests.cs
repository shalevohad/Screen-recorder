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

            // במקרה ש-KeyResolver לא מזהה ישירות לפי ה-ID, מנסים fallback של כלל המפתחות
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

            // הצפנת מידע עם המפתח הראשוני
            string text1 = "PasswordInput";
            string enc1 = PayloadEncryptionManager.Encrypt(text1, initialKeyId, initialKeyBytes);

            // ביצוע סבב מפתחות (Key Rotation)
            string newKeyId = await keyRing.RotateKeyAsync();
            Assert.NotEqual(initialKeyId, newKeyId);

            var (activeId, activeBytes) = keyRing.GetActiveKey();
            Assert.Equal(newKeyId, activeId);

            // הצפנת מידע נוסף עם המפתח החדש
            string text2 = "NewSessionInput";
            string enc2 = PayloadEncryptionManager.Encrypt(text2, activeId, activeBytes);

            // פענוח אוטומטי של שניהם דרך ה-Keyring
            string dec1 = keyRing.Decrypt(enc1);
            string dec2 = keyRing.Decrypt(enc2);

            Assert.Equal(text1, dec1);
            Assert.Equal(text2, dec2);
        }
    }
}
