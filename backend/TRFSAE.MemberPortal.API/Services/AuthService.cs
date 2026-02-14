using TRFSAE.MemberPortal.API.DTOs;
using TRFSAE.MemberPortal.API.Enums;
using TRFSAE.MemberPortal.API.Interfaces;
using TRFSAE.MemberPortal.API.Models;
using Supabase;
using Microsoft.AspNetCore.Http;

namespace TRFSAE.MemberPortal.API.Services;

public class AuthService: IAuthService
{
    private readonly Client _supabaseClient;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IUserService _userService;

    public AuthService(Client supabaseClient, IHttpContextAccessor httpContextAccessor, IUserService userService)
    {
        _supabaseClient = supabaseClient;
        _httpContextAccessor = httpContextAccessor;
        _userService = userService;
    }

    public bool ValidateSupabaseToken()
    {
        return _httpContextAccessor.HttpContext?.User?.Identity?.IsAuthenticated ?? false;
    }

    public async Task<UserModel?> GetUserFromToken()
    {
        var userIdClaim = _httpContextAccessor.HttpContext?
            .User?
            .FindFirst("sub")?
            .Value;

        if (string.IsNullOrEmpty(userIdClaim))
            return null;

        var userDto = await _userService.GetUserByIDAsync(Guid.Parse(userIdClaim));
        if (userDto == null)
            return null;

        return new UserModel
        {
            Id = userDto.Id,
            Name = userDto.Name,
            Email = userDto.Email,
            Subsystem = userDto.Subsystem ?? Subsystem.Frame,
            GradYear = userDto.GradYear
        };
    }


    public async Task SyncUserToDatabase()
    {
        var supabaseUser = _supabaseClient.Auth.CurrentUser;
        if (supabaseUser == null) return;

        var existing = await _userService.GetUserByIDAsync(Guid.Parse(supabaseUser.Id));
        if (existing != null) return;

        var createDto = new CreateUserDto
        {
            Name = supabaseUser.UserMetadata["name"]?.ToString() ?? supabaseUser.Email,
            Email = supabaseUser.Email,
            Subsystem = Subsystem.Frame, // defau
            Role = Role.Member,
            StudentId = 0, // default
            GradYear = 2025 // default
        };

        await _userService.CreateUserAsync(createDto);
    }
}