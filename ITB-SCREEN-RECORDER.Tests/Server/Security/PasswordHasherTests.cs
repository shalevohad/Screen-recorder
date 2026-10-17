using System;
using ITB_SCREEN_RECORDER.Server.Services.Security;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.Server.Security;

public class PasswordHasherTests
{
    [Fact]
    public void Hash_ProducesValidThreePartPbkdf2Format()
    {
        string password = "SecretMasterPassword123!";
        string hash = PasswordHasher.Hash(password);

        Assert.NotNull(hash);
        var parts = hash.Split('.');
        Assert.Equal(3, parts.Length);

        // First part: iterations
        Assert.True(int.TryParse(parts[0], out int iterations));
        Assert.Equal(100_000, iterations);

        // Second part: salt (base64 of 16 bytes = 24 chars)
        byte[] salt = Convert.FromBase64String(parts[1]);
        Assert.Equal(16, salt.Length);

        // Third part: hash (base64 of 32 bytes = 44 chars)
        byte[] hashBytes = Convert.FromBase64String(parts[2]);
        Assert.Equal(32, hashBytes.Length);
    }

    [Fact]
    public void Hash_SamePasswordTwice_GeneratesDifferentSaltsAndHashes()
    {
        string password = "IdenticalPassword99";
        string hash1 = PasswordHasher.Hash(password);
        string hash2 = PasswordHasher.Hash(password);

        Assert.NotEqual(hash1, hash2);
    }

    [Fact]
    public void Verify_CorrectPassword_ReturnsTrue()
    {
        string password = "SuperSecret_Admin_Pass#2026";
        string storedHash = PasswordHasher.Hash(password);

        bool result = PasswordHasher.Verify(password, storedHash);
        Assert.True(result);
    }

    [Theory]
    [InlineData("wrongpassword")]
    [InlineData("supersecret_admin_pass#2026")] // case sensitivity
    [InlineData("")]
    [InlineData(" ")]
    public void Verify_IncorrectPassword_ReturnsFalse(string wrongPassword)
    {
        string correctPassword = "SuperSecret_Admin_Pass#2026";
        string storedHash = PasswordHasher.Hash(correctPassword);

        bool result = PasswordHasher.Verify(wrongPassword, storedHash);
        Assert.False(result);
    }

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("   ")]
    [InlineData("not-a-hash")]
    [InlineData("1000.onlytwoparts")]
    [InlineData("invaliditerations.c2FsdA==.aGFzaA==")]
    public void Verify_MalformedStoredHash_ReturnsFalse(string? malformedHash)
    {
        bool result = PasswordHasher.Verify("anyPassword", malformedHash);
        Assert.False(result);
    }
}
