using TRFSAE.MemberPortal.API.Models;

namespace TRFSAE.MemberPortal.API.Interfaces;

public interface IRoleService
{
    Task<string> GetUserRoleAsync(Guid id);
    Task<bool> AssignRoleToUserAsync(Guid id, Role role);
    Task<bool> RemoveUserRoleAsync(Guid id);
}

