using System;

namespace ITB_SCREEN_RECORDER.Core.DTO
{
    public class LoginRequestDto
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string MachineName { get; set; } = string.Empty;
    }

    public class AuthResponseDto
    {
        public bool IsSuccess { get; set; }
        public string Token { get; set; } = string.Empty;
        public string ErrorMessage { get; set; } = string.Empty;
        public DateTime Expiration { get; set; }
    }
}