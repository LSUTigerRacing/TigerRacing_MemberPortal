using TRFSAE.MemberPortal.API.Interfaces;
using TRFSAE.MemberPortal.API.Models;
using Npgsql;
using System.CodeDom;

namespace TRFSAE.MemberPortal.API.Services;

public class RoleService : IRoleService
{
    private readonly string _connectionString;

    public RoleService(IConfiguration config)
    {
        _connectionString = config.GetConnectionString("Postgres");
    }

    public async Task<Role> GetUserRoleAsync(Guid id)
    {
        await using var conn = new NpgsqlConnection(_connectionString);
        await conn.OpenAsync();

        const string sql = @"SELECT role FROM ""user"" WHERE id = @id;";

        await using var cmd = new NpgsqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("id", id);

        var result = await cmd.ExecuteScalarAsync();
        var dbRole = result.ToString()!;
        return DbRoleToEnum(dbRole);
    }

    public async Task AssignRoleToUserAsync(Guid id, Role role)
    {
        await using var conn = new NpgsqlConnection(_connectionString);
        await conn.OpenAsync();

        const string sql = @"UPDATE ""user"" SET role = @role WHERE id = @id;";
        await using var cmd = new NpgsqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("id", id);
        cmd.Parameters.AddWithValue("role", EnumToDbRole(role));

        var result = await cmd.ExecuteNonQueryAsync();
    }

    public async Task RemoveUserRoleAsync(Guid id)
    {
        await AssignRoleToUserAsync(id, Role.Member);
    }

    private static string EnumToDbRole(Role role) => role switch
    {
        Role.SuperAdmin => "Superadmin",
        Role.Admin => "Admin",
        Role.SystemLead => "System Lead",
        Role.SubsystemLead => "Subsystem Lead",
        Role.Member => "Member",
        _ => "Member"
    };

    private static Role DbRoleToEnum(string dbRole) => dbRole switch
    {
        "Superadmin" => Role.SuperAdmin,
        "Admin" => Role.Admin,
        "System Lead" => Role.SystemLead,
        "Subsystem Lead" => Role.SubsystemLead,
        "Member" => Role.Member,
        _ => Role.Member
    };
}


