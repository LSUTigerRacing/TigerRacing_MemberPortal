using TRFSAE.MemberPortal.API.Models;
using TRFSAE.MemberPortal.API.Enums;

namespace TRFSAE.MemberPortal.API.Interfaces;

public interface IRoleService
{
    Task<string> GetUserRoleAsync(Guid id);
    Task<bool> AssignRoleToUserAsync(Guid id, Role role);
    Task<bool> RemoveUserRoleAsync(Guid id);
}

