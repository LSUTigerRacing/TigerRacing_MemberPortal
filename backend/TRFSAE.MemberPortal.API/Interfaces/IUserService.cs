using Microsoft.AspNetCore.Mvc;
using TRFSAE.MemberPortal.API.DTOs;


namespace TRFSAE.MemberPortal.API.Interfaces
{
  public interface IUserService
  {
    public Task<UserResponseDTO> GetUserAsync(string name); 

    public Task<UserResponseDTO> GetUserByIDAsync(Guid userID);

    public Task<IActionResult> UpdateUserByIDAsync(Guid userID, UserUpdateDTO updateDto);

    public Task<IActionResult> DeleteUserAsync(Guid currentUserId, string confirmationString);

    public Task<UserResponseDTO> GetUserRolesAsync(Guid userID);
  }
}
