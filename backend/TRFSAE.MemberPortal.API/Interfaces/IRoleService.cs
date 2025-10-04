using System.Text.Json;
using TRFSAE.MemberPortal.API.DTOs;

namespace TRFSAE.MemberPortal.API.Interfaces;

public interface IRoleService
{
    Task<List<RoleResponseDto>> GetAllRolesAsync();
    Task<RoleResponseDto> GetRoleByIdAsync(Guid id);
    Task<RolePermissionDto> UpdateRolePermissionsAsync(Guid id, JsonElement permissions);
}
