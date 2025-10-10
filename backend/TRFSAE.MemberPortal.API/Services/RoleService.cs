using TRFSAE.MemberPortal.API.DTOs;
using TRFSAE.MemberPortal.API.Interfaces;
using System.Text.Json;

namespace TRFSAE.MemberPortal.API.Services;

public class RoleService : IRoleService
{
    private readonly Supabase.Client _supabaseClient;

    public RoleService(Supabase.Client supabaseClient)
    {
        _supabaseClient = supabaseClient;
    }

    public async Task<List<RoleResponseDto>> GetAllRolesAsync()
    {
        var response = await _supabaseClient
            .Rpc("get_all_roles", new Dictionary<string, object>());

        var roles = JsonSerializer.Deserialize<List<RoleResponseDto>>(response.Content);

        return roles ?? new List<RoleResponseDto>();
    }

    public async Task<RoleResponseDto> GetRoleByIdAsync(Guid id)
    {
        var parameters = new Dictionary<string, object>
        {
            { "role_id", id }
        };

        var response = await _supabaseClient
            .Rpc("get_role_by_id", parameters);

        var roles = JsonSerializer.Deserialize<List<RoleResponseDto>>(response.Content);

        return roles?.FirstOrDefault();
    }

    public async Task<RoleResponseDto> UpdateRolePermissionsAsync(Guid id, UpdateRolePermissionsDto dto)
    {
        var parameters = new Dictionary<string, object>
        {
            { "role_id", id },
            { "permission_updates", dto.Permissions }
        };

        var response = await _supabaseClient
            .Rpc("update_role_permissions", parameters);

        var role = JsonSerializer.Deserialize<List<RoleResponseDto>>(response.Content);

        return role?.FirstOrDefault();
    }
}
