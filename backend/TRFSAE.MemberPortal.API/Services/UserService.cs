using TRFSAE.MemberPortal.API.DTOs;
using Supabase;
using TRFSAE.MemberPortal.API.Interfaces;
using TRFSAE.MemberPortal.API.Models;

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
      return new List<UserResponseDto>();
    }

    public async Task<UserResponseDto> UpdateUserByIdAsync(Guid userID, UserUpdateDto updateDto)
    {
      var updateModel = new UserModel
      {
        UserId = userID,
        Name = updateDto.Name,
        PersonalEmail = updateDto.PersonalEmail,
        LSUEmail = updateDto.LSUEmail,
        EightNine = updateDto.EightNine ?? -1,
        HazingStatus = updateDto.HazingStatus ?? false,
        FeeStatus = updateDto.FeeStatus ?? false,
        GradDate = updateDto.GradDate,
        ShirtSize = updateDto.ShirtSize,
        System = updateDto.System,
        Subsystem = updateDto.Subsystem
      };

      var response = await _supabaseClient
        .From<UserModel>()
        .Where(x => x.UserId == userID)
        .Update(updateModel);

      var updatedUser = response.Models.FirstOrDefault();

      if (updatedUser == null)
      {
        throw new Exception("User not found or update failed");
      }

      var userResponse = new UserResponseDto
      {
        UserId = updatedUser.UserId,
        Name = updatedUser.Name,
        PersonalEmail = updatedUser.PersonalEmail,
        LSUEmail = updatedUser.LSUEmail,
        EightNine = updatedUser.EightNine,
        HazingStatus = updatedUser.HazingStatus,
        FeeStatus = updatedUser.FeeStatus,
        GradDate = updatedUser.GradDate,
        ShirtSize = updatedUser.ShirtSize,
        System = updatedUser.System,
        Subsystem = updatedUser.Subsystem
      };
      
      return userResponse;
    }

    public async Task<bool> DeleteUserAsync(Guid currentUserId, string confirmationString)
    {
      if (confirmationString != "confirm")
      {
        return false;
      }
      try
      {
        await _supabaseClient
          .From<UserModel>()
          .Where(x => x.UserId == currentUserId)
          .Delete();

        return true;

      } catch (Exception)
      {
          return false;
      }
    }
  }
}