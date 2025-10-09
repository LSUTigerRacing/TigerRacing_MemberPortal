using Microsoft.AspNetCore.Mvc;
using TRFSAE.MemberPortal.API.DTOs;
using TRFSAE.MemberPortal.API.Interfaces;
using TRFSAE.MemberPortal.API.Services;

namespace TRFSAE.MemberPortal.API.Controllers 
{
  [ApiController]
  [Route("api/users")]
  public class UserController : ControllerBase
  {
    private readonly IUserService _userService;

    UserController(IUserService userService)
    {
      _userService = userService;
    }

    [HttpGet]
    public async Task<IActionResult> GetUserByIDAsync(Guid id)
    {
      var user = await _userService.GetUserByIDAsync(id);
      return Ok(user);
    }

    [HttpPatch]
    public async Task<IActionResult> UpdateUserAsync(Guid id, UserUpdateDTO model)
    {
      var taskResult = await _userService.UpdateUserByIDAsync(id, model);
      return Ok(taskResult);
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteUserAsync(Guid id)
    {
      var taskResult = await _userService.GetUserByIDAsync(id);
      return Ok(taskResult);
    }

    [HttpGet]
    public async Task<IActionResult> GetUserRoles(Guid id)
    {
      var user = await _userService.GetUserByIDAsync(id);
      return Ok(user);
    }
  }
}
