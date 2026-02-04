using TRFSAE.MemberPortal.API.DTOs;
using TRFSAE.MemberPortal.API.Enums;

namespace TRFSAE.MemberPortal.API.Interfaces
{
  public interface IUserService
  {
    Task<IEnumerable<UserSummaryDto>> GetAllUsersAsync(int pageNumber, int pageSize, string? search, bool? completedHazingForm, bool? paidMemberFee, DateTime? gradDate, ShirtSize? shirtSize, Subsystem? subsystem);
    Task<UserDetailDto> GetUserByIDAsync(Guid userID);
    Task<CreateUserResponse> CreateUserAsync(CreateUserDto createDto);
    Task<UserResponseDto> UpdateUserByIdAsync(Guid userID, UserUpdateDto updateDto);
    Task<bool> DeleteUserAsync(Guid currentUserId, string confirmationString);
        //Task GetAllUsersAsync(UserSearchDto searchDto);
        //Task<bool> AssignUserRoleAsync(Guid userID, Role role);
        //Task<bool> RemoveUserRoleAsync(Guid userID);

        // public Task<UserResponseDto> GetUserRolesAsync(Guid userID);
    }
}
