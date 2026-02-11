using TRFSAE.MemberPortal.API.DTOs;
using TRFSAE.MemberPortal.API.Interfaces;
using TRFSAE.MemberPortal.API.Models;
using TRFSAE.MemberPortal.API.Enums;
using System.Text.Json;
using Supabase;
using Supabase.Gotrue;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.CodeDom;

namespace TRFSAE.MemberPortal.API.Services;

public class UserService : IUserService
{
    private readonly Supabase.Client _supabaseClient;

    public UserService(Supabase.Client supabaseClient)
    {
        _supabaseClient = supabaseClient;
    }

    public async Task<IEnumerable<UserSummaryDto>> GetAllUsersAsync(
        int pageNumber,
        int pageSize,
        string? search,
        bool? hazingStatus,
        bool? feeStatus,
        int? gradYear,
        ShirtSize? shirtSize,
        Subsystem? subsystem
    )
    {
        var query = _supabaseClient.From<UserModel>();

        if (!string.IsNullOrEmpty(search))
        {
            query = (Supabase.Interfaces.ISupabaseTable<UserModel, Supabase.Realtime.RealtimeChannel>)
            query.Where(u => u.Name == search);
        }

        if (hazingStatus != null)
        {
            query = (Supabase.Interfaces.ISupabaseTable<UserModel, Supabase.Realtime.RealtimeChannel>)
            query.Where(u => u.HazingStatus == hazingStatus);
        }

        if (feeStatus != null)
        {
            query = (Supabase.Interfaces.ISupabaseTable<UserModel, Supabase.Realtime.RealtimeChannel>)
            query.Where(u => u.FeeStatus == feeStatus);
        }

        if (gradYear != null)
        {
            query = (Supabase.Interfaces.ISupabaseTable<UserModel, Supabase.Realtime.RealtimeChannel>)
            query.Where(u => u.GradYear == gradYear);
        }

        if (shirtSize != null)
        {
            query = (Supabase.Interfaces.ISupabaseTable<UserModel, Supabase.Realtime.RealtimeChannel>)
            query.Where(u => u.ShirtSize == shirtSize);
        }

        if (subsystem != null)
        {
            query = (Supabase.Interfaces.ISupabaseTable<UserModel, Supabase.Realtime.RealtimeChannel>)
            query.Where(u => u.Subsystem == subsystem);
        }

        var response = await query
            .Order(u => u.CreatedAt, Supabase.Postgrest.Constants.Ordering.Ascending)
            .Range((pageNumber - 1) * pageSize, pageNumber * pageSize - 1)
            .Select("id,name,email,gradDate,subsystem")
            .Get();

        var userSummaries = response.Models.Select(u => new UserSummaryDto
        {
            Id = u.Id,
            Name = u.Name,
            Email = u.Email,
            GradYear = u.GradYear,
            Subsystem = u.Subsystem
        });

        return userSummaries;
    }

    public async Task<UserDetailDto> GetUserByIDAsync(Guid id)
    {
        var response = await _supabaseClient
          .From<UserModel>()
          .Select("*")
          .Where(x => x.Id == id)
          .Single();

        if (response == null)
        {
            throw new Exception("User not found");
        }

        var userDetail = new UserDetailDto
        {
            Id = response.Id,
            Name = response.Name,
            Email = response.Email,
            GradYear = response.GradYear,
            Subsystem = response.Subsystem
        };

        return userDetail;
    }

    public async Task<CreateUserResponse> CreateUserAsync(CreateUserDto createDto)
    {
        var userId = Guid.NewGuid();

        var newUser = new UserModel
        {
            Id = userId,
            Name = createDto.Name,
            Email = createDto.Email,
            Role = createDto.Role,
            StudentId = createDto.StudentId,
            HazingStatus = createDto.HazingStatus,
            FeeStatus = createDto.FeeStatus,
            GradYear = createDto.GradYear,
            ShirtSize = createDto.ShirtSize,
            Subsystem = createDto.Subsystem,
            CreatedAt = DateTime.UtcNow,
        };

        try
        {
            var response = await _supabaseClient
                .From<UserModel>()
                .Insert(newUser);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error creating user: {ex.Message}");
            throw;
        }

        return new CreateUserResponse
        {
            Location = $"/api/users/{userId}"
        };
    }


    public async Task<UserResponseDto> UpdateUserByIdAsync(Guid userID, UserUpdateDto updateDto)
    {
        try
        {
            var response = await _supabaseClient
                .From<UserModel>()
                .Where(u => u.Id == userID)
                .Get();

            var model = response.Models.FirstOrDefault();

            if (model == null)
            {
                throw new Exception($"User with ID {userID} not found");
            }
            if (!string.IsNullOrEmpty(updateDto.Name))
            {
                model.Name = updateDto.Name;
            }
            if (!string.IsNullOrEmpty(updateDto.Email))
            {
                model.Email = updateDto.Email;
            }
            if (updateDto.Role.HasValue)
            {
                model.Role = updateDto.Role.Value;
            }
            if (updateDto.StudentId.HasValue)
            {
                model.StudentId = updateDto.StudentId.Value;
            }
            if (updateDto.HazingStatus.HasValue)
            {
                model.HazingStatus= updateDto.HazingStatus.Value;
            }
            if (updateDto.FeeStatus.HasValue)
            {
                model.FeeStatus = updateDto.FeeStatus.Value;
            }
            if (updateDto.GradYear.HasValue)
            {
                model.GradYear = updateDto.GradYear.Value;
            }
            if (updateDto.ShirtSize.HasValue)
            {
                model.ShirtSize = updateDto.ShirtSize.Value;
            }
            if (updateDto.Subsystem.HasValue)
            {
                model.Subsystem = updateDto.Subsystem.Value;
            }
            model.UpdatedAt = DateTime.UtcNow;

            var updateResponse = await _supabaseClient
                .From<UserModel>()
                .Where(u => u.Id == userID)
                .Update(model);

            var updatedUser = updateResponse.Models.FirstOrDefault();

            return new UserResponseDto
            {
                UserId = userID,
                Name = updatedUser.Name,
                Email = updatedUser.Email,
                Role = updatedUser.Role,
                StudentId = updatedUser.StudentId,
                HazingStatus = updatedUser.HazingStatus,
                FeeStatus = updatedUser.FeeStatus,
                GradYear = updatedUser.GradYear,
                ShirtSize = updatedUser.ShirtSize,
                Subsystem = updatedUser.Subsystem

            };
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error attempting update: {ex.Message}");
            throw;
        }
    }

    public async Task<bool> DeleteUserAsync(Guid userId, string confirmationString)
    {
        if (confirmationString != "confirm")
        {
            return false;
        }
        // Console.WriteLine("Attempting to delete user with ID: " + userId);
        try
        {
            await _supabaseClient
              .From<UserModel>()
              .Where(x => x.Id == userId)
              .Delete();

            return true;

        }
        catch (Exception e)
        {
            Console.WriteLine(e.ToString());
            return false;
        }
    }
}
