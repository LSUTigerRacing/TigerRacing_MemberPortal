using Microsoft.AspNetCore.Mvc;
using TRFSAE.MemberPortal.API.Enums;
using TRFSAE.MemberPortal.API.Models;
using TRFSAE.MemberPortal.API.Interfaces;

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

    [HttpGet("fetch")]
    public async Task<IActionResult> GetUserRole([FromQuery] Guid id)
    {
        var role = await _roleService.GetUserRoleAsync(id);
        return Ok(role);
    }

    [HttpPut("update")]
    public async Task<IActionResult> AssignRoleToUser([FromQuery] Guid id, Role role)
    {
        await _roleService.AssignRoleToUserAsync(id, role);
        return Ok(new { message = $"Change role to {role}" });
    }

    [HttpDelete("delete")]
    public async Task<IActionResult> RemoveUserRole([FromQuery] Guid id)
    {
        await _roleService.RemoveUserRoleAsync(id);
        return Ok(new { message = "Change role to Member" });
    }
}
