using TRFSAE.MemberPortal.API.DTOs
using TRFSAE.MemberPortal.API.Controllers
using Supabase

namespace TRFSAE.MemberPortal.API.Services
{
  public class UserService : IUserService<UserService>
  {
    
    private readonly Client _supabase;

    public UserService(Client supabase)
    {
      _supabase = supabase;
    }

    public async Task<UserResponseDTO> GetUserAsync(string name) 
    {
      var userTask = await _supabase
        .From<UserResponseDTO>()
        .Where(x => x.name = name)
        .get();
      return userTask
    }

    public async Task<UserResponseDTO> GetUserByIDAsync(Guid userID) 
    {
      var userTask = await _supabase
        .From<UserResponseDTO>()
        .Where(x => x.UserId = userID)
        .get();
      return userTask
    }

    public async Task<IActionResult> UpdateUserAsync(Guid userID, UserUpdateDTO updateDto) 
    {
      var taskResult = await _supabase
        .From<UserResponseDTO>()
        .Where(x => x.UserId, userID)
        .Upsert(updateDto);
      return taskResult
    }

    public async Task<IActionResult> DeleteUserAsync(Guid currentUserId, string confirmationString) 
    {
      if (confirmationString == "confirm")
      {
        var taskResult = await _supabase
          .From<UserResponseDTO>()
          .Where(x => x.UserId = currentUserId)
          .Delete();
        return taskResult
      }
    }

    public async Task<UserResponseDTO> GetUserRolesAsync(Guid userID)
    {
      var userTask = await _supabase
        .From<UserRoleDTO>()
        .Where(x => x.UserId = userID)
        .get();
      return userTask
    }
  }
}
