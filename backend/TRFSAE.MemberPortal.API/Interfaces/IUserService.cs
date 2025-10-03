using TRFSAE.MemberPortal.API.DTOs

namespace TRFSAE.MemberPortal.API.Interfaces
{
  interface IUserService<T>
  {
    public async Task<UserResponseDTO> GetUserAsync(string name); 

    public async Task<UserResponseDTO> GetUserByIDAsync(Guid userID);

    public async Task<IActionResult> UpdateUserAsync(Guid userID, UserUpdateDTO updateDto);

    public async Task<IActionResult> DeleteUserAsync(Guid currentUserId, string confirmationString);

    public async Task<UserResponseDTO> GetUserRolesAsync(Guid userID);
  }
}
