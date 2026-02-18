using Microsoft.AspNetCore.Mvc;
using TRFSAE.MemberPortal.API.Interfaces;
using TRFSAE.MemberPortal.API.Models;

namespace TRFSAE.MemberPortal.API.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("callback")]
    public async Task<IActionResult> Callback()
    {
        var token = GetTokenFromHeader();
        if (string.IsNullOrEmpty(token))
        {
            return Unauthorized();
        }

        await _authService.SyncUserToDatabase(token);
        return Ok(new { message = "User synchronized successfully" });
    }

    [HttpGet("me")]
    public async Task<IActionResult> Me()
    {
        var token = GetTokenFromHeader();
        if (string.IsNullOrEmpty(token) || !_authService.ValidateSupabaseToken(token))
        {
            return Unauthorized();
        }

        var user = await _authService.GetUserFromToken(token);
        if (user == null)
        {
            return NotFound(new { message = "User not found" });
        }

        return Ok(user);
    }

    private string GetTokenFromHeader()
    {
        var authHeader = HttpContext.Request.Headers["Authorization"].ToString();
        if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
        {
            return null;
        }
        return authHeader.Substring("Bearer ".Length);
    }
}