using TRFSAE.MemberPortal.API.DTOs;
using TRFSAE.MemberPortal.API.Enums;
using TRFSAE.MemberPortal.API.Interfaces;
using TRFSAE.MemberPortal.API.Models;
using Supabase;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace TRFSAE.MemberPortal.API.Services;

public class AuthService: IAuthService
{
    private readonly Client _supabaseClient;
    private readonly IUserService _userService;

    public AuthService(Client supabaseClient, IUserService userService)
    {
        _supabaseClient = supabaseClient;
        _userService = userService;
    }

    public bool ValidateSupabaseToken(string token)
    {
        if (string.IsNullOrEmpty(token)) return false;

        try
        {
            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);
            // Basic validation: check if token is not expired
            return jwtToken.ValidTo > DateTime.UtcNow;
        }
        catch
        {
            return false;
        }
    }

    public async Task<UserModel?> GetUserFromToken(string token)
    {
        if (string.IsNullOrEmpty(token)) return null;

        try
        {
            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);
            var userIdClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;
            if (userIdClaim == null) return null;

            var userDto = await _userService.GetUserByIDAsync(Guid.Parse(userIdClaim));
            if (userDto == null) return null;

            return new UserModel
            {
                Id = userDto.Id,
                Name = userDto.Name,
                Email = userDto.Email,
                Subsystem = userDto.Subsystem ?? Subsystem.Frame,
                GradYear = userDto.GradYear
            };
        }
        catch
        {
            return null;
        }
    }

    public async Task SyncUserToDatabase(string token)
    {
        // Sync functionality removed to avoid changes outside auth
        await Task.CompletedTask;
    }
}