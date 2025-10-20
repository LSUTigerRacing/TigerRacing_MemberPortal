using TRFSAE.MemberPortal.API.DTOs;
using TRFSAE.MemberPortal.API.Interfaces;
using TRFSAE.MemberPortal.API.Models;
using System.Text.Json;
using Supabase;

namespace TRFSAE.MemberPortal.API.Services
{
  public class UserService : IUserService
  {
    private readonly Client _supabaseClient;

    public UserService(Client supabaseClient)
    {
      _supabaseClient = supabaseClient;
    }

    public async Task<UserResponseDto> GetUserByIDAsync(Guid userID)
    {
      var response = await _supabaseClient
        .From<UserModel>()
        .Where(x => x.UserId == userID)
        .Single();

      if (response == null)
      {
        throw new Exception("User not found");
      }

      var userResponse = new UserResponseDto
      {
        UserId = response.UserId,
        Name = response.Name,
        PersonalEmail = response.PersonalEmail,
        LSUEmail = response.LSUEmail,
        EightNine = response.EightNine,
        HazingStatus = response.HazingStatus,
        FeeStatus = response.FeeStatus,
        GradDate = response.GradDate,
        ShirtSize = response.ShirtSize,
        System = response.System,
        Subsystem = response.Subsystem
      };

      return userResponse;
    }

    public async Task<List<UserResponseDto>> GetAllUsersAsync(UserSearchDto searchDto)
    {
      var response = await _supabaseClient
        .From<UserModel>()
        .Get();
      return new List<UserResponseDto>();
    }

    public async Task<UserResponseDto> UpdateUserByIdAsync(Guid userID, UserUpdateDto updateDto)
    {
      var updates = new Dictionary<string, object?>();

      updates["user_id"] = userID;
      if (updateDto.Name != string.Empty) updates["name"] = updateDto.Name;
      if (updateDto.PersonalEmail != string.Empty) updates["email"] = updateDto.PersonalEmail;
      if (updateDto.LSUEmail != string.Empty) updates["lsu_email"] = updateDto.LSUEmail;
      if (updateDto.EightNine != -1) updates["eight_nine"] = updateDto.EightNine;
      if (updateDto.HazingStatus != null) updates["hazing_status"] = updateDto.HazingStatus;
      if (updateDto.FeeStatus != null) updates["fee_status"] = updateDto.FeeStatus;
      if (updateDto.GradDate != null) updates["grad_date"] = updateDto.GradDate;
      if (updateDto.ShirtSize != string.Empty) updates["shirt_size"] = updateDto.ShirtSize;
      if (updateDto.System != string.Empty) updates["system"] = updateDto.System;
      if (updateDto.Subsystem != string.Empty) updates["subsystem"] = updateDto.Subsystem;

      var response = await _supabaseClient
        .Rpc("update_user", new { updates = updates });

      if (response.Content == null)
      {
        throw new Exception("User not found or update failed");
      }

      var userResponse = JsonSerializer.Deserialize<List<UserResponseDto>>(response.Content);

      if (userResponse == null)
      {
        throw new Exception("User not found or update failed");
      }

      return userResponse.FirstOrDefault() ?? new UserResponseDto();
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
          .Where(x => x.UserId == userId)
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
}