using TRFSAE.MemberPortal.API.DTOs

namespace TRFSAE.MemberPortal.API.Services
{

  public async UserResponseDTO GetUserAsync(string name) 
  {
    // TODO 
  }

  public async UserResponseDTO GetUserByIDAsync(Guid userID) 
  {
    // TODO 
  }

  public async void UpdateUserAsync(Guid userID, UserUpdateDTO updateDto) 
  {
    // TODO 
  }

  public async void DeleteUserAsync(Guid currentUserId, string confirmationString) 
  {
    if (confirmationString == "confirm")
    {
      //TODO
    }
  }

  public async GetUserRolesAsync(Guid userID)
  {
    // TODO 
  }
}
