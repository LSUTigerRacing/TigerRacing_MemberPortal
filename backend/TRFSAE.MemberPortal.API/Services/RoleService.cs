using TRFSAE.MemberPortal.API.DTOs;
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

    public async Task<string> GetUserRoleAsync(Guid id)
    {
        var user = await _supabaseClient
            .From<UserModel>()
            .Where(x => x.UserId == id)
            .Single();

        return user.role;
    }

    public async Task<bool> AssignRoleToUserAsync(Guid id, Role role)
    {
        var user = await _supabaseClient
         .From<UserModel>()
         .Where(x => x.UserId == id)
         .Single();

        user.role = role switch
        {
            Role.SuperAdmin => "Superadmin",
            Role.Admin => "Admin",
            Role.SystemLead => "System Lead",
            Role.SubsystemLead => "Subsystem Lead",
            _ => "Member"
        };

        await user.Update<UserModel>();
        return true;
    }

    public async Task<bool> RemoveUserRoleAsync(Guid id)
    {
        return await AssignRoleToUserAsync(id, Role.Member);
    }
}