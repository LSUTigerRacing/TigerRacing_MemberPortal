using TRFSAE.MemberPortal.API.Models;

namespace TRFSAE.MemberPortal.API.Interfaces;

public interface IRoleService
{
    Task<Role> GetUserRoleAsync(Guid id);
    Task AssignRoleToUserAsync(Guid id, Role role);
    Task RemoveUserRoleAsync(Guid id);
}

