using TRFSAE.MemberPortal.API.DTOs;
using TRFSAE.MemberPortal.API.Interfaces;
using TRFSAE.MemberPortal.API.Models;
using Supabase;

namespace TRFSAE.MemberPortal.API.Services;

public class RoleService : IRoleService
{
    private readonly Client _supabaseClient;

    public RoleService(Client supabaseClient)
    {
        _supabaseClient = supabaseClient;
    }

    public async Task<List<RoleResponseDto>> GetAllRolesAsync()
    {
        var response = await _supabaseClient
            .From<RoleModel>()
            .Get();

        return new List<RoleResponseDto>();
    }

    public async Task<RoleResponseDto> GetRoleByIdAsync(Guid id)
    {
        var response = await _supabaseClient
            .From<RoleModel>()
            .Where(x => x.Id == id)
            .Single();

        return new RoleResponseDto();
    }

    public async Task<RoleResponseDto> UpdateRoleAsync(Guid id, UpdateRoleDto dto)
    {
        var parameters = new Dictionary<string, object>
        {
            { "role_id", id },
            { "permission_updates", dto }
        };

        var response = await _supabaseClient
            .Rpc("update_role_permissions", parameters);

        // var role = JsonSerializer.Deserialize<List<RoleResponseDto>>(response.Content);

        return new RoleResponseDto();
    }
}
