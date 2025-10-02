using TRFSAE.MemberPortal.API.DTOs
using TRFSAE.MemberPortal.API.Controllers

namespace TRFSAE.MemberPortal.API.Services
{
  public class UserService 
  {

    public async Task<UserResponseDTO> GetUserAsync(string name) 
    {
      // TODO 
    }

    public async Task<UserResponseDTO> GetUserByIDAsync(Guid userID) 
    {
      // TODO 
    }

    public async Task<IActionResult> UpdateUserAsync(Guid userID, UserUpdateDTO updateDto) 
    {
      // TODO 
    }

    public async Task<IActionResult> DeleteUserAsync(Guid currentUserId, string confirmationString) 
    {
      if (confirmationString == "confirm")
      {
        //TODO
      }
    }

    public async Task<UserResponseDTO> GetUserRolesAsync(Guid userID)
    {
      // TODO 
    }
  }
}
