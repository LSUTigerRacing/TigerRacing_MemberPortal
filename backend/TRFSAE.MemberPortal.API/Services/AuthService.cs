using Supabase;
using Supabase.Gotrue;
using TRFSAE.MemberPortal.API.DTOs;
using TRFSAE.MemberPortal.API.Models;
using System;
using System.Threading.Tasks;
using TRFSAE.MemberPortal.API.Interfaces;

namespace TRFSAE.MemberPortal.API.Services;

public class AuthService : IAuthService
{
    private readonly SupabaseClient _supabaseClient;

    public AuthService(SupabaseClient supabaseClient)
    {
        _supabaseClient = supabaseClient;
    }

    public async Task<AuthResponseDto> LoginAsync(LoginRequestDto request)
    {
        try
        {
            var response = await _supabaseClient.Auth.SignIn(
                Supabase.Gotrue.Constants.SignInType.Email,
                request.Email,
                request.Password
            );

            if (response?.User == null)
            {
                return new AuthResponseDto
                {
                    Success = false,
                    Message = "Invalid credentials"
                };
            }

            var user = await GetUserDetailsAsync(response.User.Id);

            return new AuthResponseDto
            {
                Success = true,
                Message = "Login successful",
                User = user,
                AccessToken = response.Session?.AccessToken,
                RefreshToken = response.Session?.RefreshToken
            };
        }
        catch (Exception ex)
        {
            return new AuthResponseDto
            {
                Success = false,
                Message = $"Login failed: {ex.Message}"
            };
        }
    }

    public async Task<AuthResponseDto> RegisterAsync(RegisterRequestDto request)
    {
        try
        {
            var response = await _supabaseClient.Auth.SignUp(
                Supabase.Gotrue.Constants.SignInType.Email,
                request.Email,
                request.Password
            );

            if (response?.User == null)
            {
                return new AuthResponseDto
                {
                    Success = false,
                    Message = "Registration failed"
                };
            }

            var newUser = new User
            {
                Id = response.User.Id,
                Email = request.Email,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
            };

            await _supabaseClient
                .From<User>()
                .Insert(newUser);

            var userDto = MapToUserDto(newUser);

            return new AuthResponseDto
            {
                Success = true,
                Message = "Registration successful. Please check your email to verify your account.",
                User = userDto,
                AccessToken = response.Session?.AccessToken,
                RefreshToken = response.Session?.RefreshToken
            };
        }
        catch (Exception ex)
        {
            return new AuthResponseDto
            {
                Success = false,
                Message = $"Registration failed: {ex.Message}"
            };
        }
    }

    public async Task<AuthResponseDto> LogoutAsync()
    {
        try
        {
            await _supabaseClient.Auth.SignOut();

            return new AuthResponseDto
            {
                Success = true,
                Message = "Logout successful"
            };
        }
        catch (Exception ex)
        {
            return new AuthResponseDto
            {
                Success = false,
                Message = $"Logout failed: {ex.Message}"
            };
        }
    }

    public async Task<AuthResponseDto> RefreshTokenAsync()
    {
        try
        {
            var session = _supabaseClient.Auth.CurrentSession;
            if (session?.RefreshToken == null)
            {
                return new AuthResponseDto
                {
                    Success = false,
                    Message = "No refresh token available"
                };
            }

            var response = await _supabaseClient.Auth.RefreshSession();

            if (response?.User == null)
            {
                return new AuthResponseDto
                {
                    Success = false,
                    Message = "Token refresh failed"
                };
            }

            var user = await GetUserDetailsAsync(response.User.Id);

            return new AuthResponseDto
            {
                Success = true,
                Message = "Token refreshed successfully",
                User = user,
                AccessToken = response.Session?.AccessToken,
                RefreshToken = response.Session?.RefreshToken
            };
        }
        catch (Exception ex)
        {
            return new AuthResponseDto
            {
                Success = false,
                Message = $"Token refresh failed: {ex.Message}"
            };
        }
    }

    public async Task<UserResponseDto> GetCurrentUserAsync()
    {
        try
        {
            var session = _supabaseClient.Auth.CurrentSession;
            if (session?.User == null)
                return null;

            return await GetUserDetailsAsync(session.User.Id);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Get current user failed: {ex.Message}");
            return null;
        }
    }

    private async Task<UserResponseDto> GetUserDetailsAsync(string userId)
    {
        try
        {
            var result = await _supabaseClient
                .From<User>()
                .Where(u => u.Id == userId)
                .Single();

            return MapToUserDto(result);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Get user details failed: {ex.Message}");
            return null;
        }
    }

    private UserResponseDto MapToUserDto(User user)
    {
        return new UserResponseDto
        {
            UserId = user.Id,
            PersonalEmail = user.Email,
            AccountCreationDate = user.CreatedAt,
            AccountLastUpdatedDate = user.UpdatedAt
        };
    }
}

