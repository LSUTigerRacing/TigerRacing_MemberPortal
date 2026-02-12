using TRFSAE.MemberPortal.API.DTOs;
using TRFSAE.MemberPortal.API.Enums;
using TRFSAE.MemberPortal.API.Interfaces;
using TRFSAE.MemberPortal.API.Models;
using Supabase;
using System.Linq.Expressions;
using System.Reflection.Metadata.Ecma335;

namespace TRFSAE.MemberPortal.API.Services;

public class RoleService : IRoleService
{
    private readonly Client _supabaseClient;

    public RoleService(Client supabaseClient)
    {
        _supabaseClient = supabaseClient;
    }

    public async Task<Role> GetUserRoleAsync(Guid id)
    {
        var user = await _supabaseClient
            .From<UserModel>()
            .Where(x => x.Id == id)
            .Single();

        return user.Role;
    }

    public async Task<bool> AssignRoleToUserAsync(Guid id, Role role)
    {
        var user = await _supabaseClient
         .From<UserModel>()
         .Where(x => x.Id == id)
         .Single();

        user.Role = role switch
        {
            Role.SuperAdmin => Role.SuperAdmin,
            Role.Admin => Role.Admin,
            Role.SystemLead => Role.SystemLead,
            Role.SubsystemLead => Role.SubsystemLead,
            _ => Role.Member
        };

        await user.Update<UserModel>();
        return true;
    }

    public async Task<bool> RemoveUserRoleAsync(Guid id)
    {
        return await AssignRoleToUserAsync(id, Role.Member);
    }
}
