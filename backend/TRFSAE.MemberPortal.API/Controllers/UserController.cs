using Microsoft.AspNetCore.Mvc;
using TRFSAE.MemberPortal.API.DTOs;
using TRFSAE.MemberPortal.API.Enums;
using TRFSAE.MemberPortal.API.Interfaces;

namespace TRFSAE.MemberPortal.API.Controllers;

[ApiController]
[Route("api/users")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet("list")]
    public async Task<IActionResult> GetAllUsers(string? search, bool? completedHazingForm, bool? paidMemberFee, int? gradDate, ShirtSize? shirtSize, Subsystem? subsystem, int pageNumber = 1, int pageSize = 8)
    {
        var users = await _userService.GetAllUsersAsync(
          pageNumber,
          pageSize,
          search,
          completedHazingForm,
          paidMemberFee,
          gradDate,
          shirtSize,
          subsystem);
        return Ok(users);
    }


    [HttpGet("fetch")]
    public async Task<IActionResult> GetUserByIDAsync([FromQuery] Guid id)
    {
        var user = await _userService.GetUserByIDAsync(id);
        return Ok(user);
    }

    [HttpPost("create")]
    public async Task<IActionResult> CreateUserAsync(CreateUserDto model)
    {
        var taskResult = await _userService.CreateUserAsync(model);
        return Ok(taskResult);
    }

    [HttpPatch("update")]
    public async Task<IActionResult> UpdateUserByIdAsync([FromQuery] Guid id, UserUpdateDto model)
    {
        var taskResult = await _userService.UpdateUserByIdAsync(id, model);
        return Ok(taskResult);
    }

    [HttpDelete("delete")]
    public async Task<IActionResult> DeleteUserAsync([FromQuery] Guid id, string confirmationString)
    {
        var taskResult = await _userService.DeleteUserAsync(id, confirmationString);
        return Ok(taskResult);
    }
}
