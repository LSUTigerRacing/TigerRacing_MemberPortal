using TRFSAE.MemberPortal.API.DTOs;

namespace TRFSAE.MemberPortal.API.Interfaces;

public interface IRoleService
{
    Task<List<RoleResponseDto>> GetAllRolesAsync();
    Task<RoleResponseDto> GetRoleByIdAsync(Guid id);
    Task<RoleResponseDto> UpdateRoleAsync(Guid id, UpdateRoleDto dto);
}

