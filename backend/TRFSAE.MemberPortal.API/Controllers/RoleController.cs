using Microsoft.AspNetCore.Mvc;
using TRFSAE.MemberPortal.API.DTOs;
using TRFSAE.MemberPortal.API.Interfaces;

namespace TRFSAE.MemberPortal.API.Controllers;

[ApiController]
[Route("api/role")]
public class RoleController : ControllerBase
{
    private readonly IRoleService _roleService;
    public RoleController(IRoleService roleService)
    {
        _roleService = roleService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllRoles()
    {
        var roles = await _roleService.GetAllRolesAsync();
        return Ok(roles);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetRoleById(Guid id)
    {
        var role = await _roleService.GetRoleByIdAsync(id);

        if (role == null)
        {
            return NotFound();
        }

        return Ok(role);
    }
    [HttpPatch("{id}")]
    public async Task<IActionResult> ChangeRolePermissionsById(Guid id, UpdateRoleDto updateDto)
    {
        var update = await _roleService.UpdateRoleAsync(id, updateDto);

        return Ok(update);
    }
}