using Microsoft.AspNetCore.Mvc;
using TRFSAE.MemberPortal.API.Models;
using TRFSAE.MemberPortal.API.Interfaces;
using Sprache;

namespace TRFSAE.MemberPortal.API.Controllers;

[ApiController]
[Route("api/user/role")]
public class RoleController : ControllerBase
{
    private readonly IRoleService _roleService;
    public RoleController(IRoleService roleService)
    {
        _roleService = roleService;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserRole(Guid id)
    {
        var role = await _roleService.GetUserRoleAsync(id);
        return Ok(role);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> AssignRoleToUser(Guid id, Role role)
    {
        await _roleService.AssignRoleToUserAsync(id, role);
        return Ok(new { message = $"Change role to {role}" });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> RemoveUserRole(Guid id)
    {
        await _roleService.RemoveUserRoleAsync(id);
        return Ok(new { message = "Change role to Member" });
    }
}