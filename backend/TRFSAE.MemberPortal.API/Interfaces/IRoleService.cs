using TRFSAE.MemberPortal.API.Models;

namespace TRFSAE.MemberPortal.API.Interfaces;
using TRFSAE.MemberPortal.API.Enums;

public interface IRoleService
{
    Task<string> GetUserRoleAsync(Guid id);
    Task<bool> AssignRoleToUserAsync(Guid id, Role role);
    Task<bool> RemoveUserRoleAsync(Guid id);
}

