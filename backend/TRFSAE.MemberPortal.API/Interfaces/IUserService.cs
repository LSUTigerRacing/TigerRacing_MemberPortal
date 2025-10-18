using Microsoft.AspNetCore.Mvc;
using TRFSAE.MemberPortal.API.DTOs;


namespace TRFSAE.MemberPortal.API.Interfaces
{
  public interface IUserService
  {
    public Task<UserResponseDto> GetUserAsync(string name); 

    public Task<UserResponseDto> GetUserByIDAsync(Guid userID);

    public Task<IActionResult> UpdateUserByIDAsync(Guid userID, UserUpdateDto updateDto);

    public Task<IActionResult> DeleteUserAsync(Guid currentUserId, string confirmationString);

    // public Task<UserResponseDto> GetUserRolesAsync(Guid userID);
  }
}
