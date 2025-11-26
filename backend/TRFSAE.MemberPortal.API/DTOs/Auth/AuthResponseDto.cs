using TRFSAE.MemberPortal.API.DTOs;

namespace TRFSAE.MemberPortal.API.DTOs;

public class AuthResponseDto
{
    public bool Success { get; set; }
    public string Message { get; set; }
    public UserResponseDto User { get; set; }
    public string AccessToken { get; set; }
    public string RefreshToken { get; set; }
}