using Microsoft.AspNetCore.Mvc;
using TRFSAE.MemberPortal.API.DTOs;


namespace TRFSAE.MemberPortal.API.Interfaces
{
  public interface IUserService
  {
    Task<UserResponseDto> GetUserByIDAsync(Guid userID);
    Task<List<UserResponseDto>> GetAllUsersAsync(UserSearchDto searchDto); 
    Task<UserResponseDto> UpdateUserByIdAsync(Guid userID, UserUpdateDto updateDto);
    Task<bool> DeleteUserAsync(Guid currentUserId, string confirmationString);

    // public Task<UserResponseDto> GetUserRolesAsync(Guid userID);
  }
}
