using Microsoft.AspNetCore.Mvc;
using TRFSAE.MemberPortal.API.DTOs;
using TRFSAE.MemberPortal.API.Interfaces;

namespace TRFSAE.MemberPortal.API.Controllers 
{
  [ApiController]
  [Route("api/user")]
  public class UserController : ControllerBase
  {
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
      _userService = userService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllUsers(UserSearchDto searchDto)
    {
      var users = await _userService.GetAllUsersAsync(searchDto);
      return Ok(users);
    }


    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserByIDAsync(Guid id)
    {
      var user = await _userService.GetUserByIDAsync(id);
      return Ok(user);
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> UpdateUserAsync(Guid id, UserUpdateDto model)
    {
      var taskResult = await _userService.UpdateUserByIdAsync(id, model);
      return Ok(taskResult);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUserAsync(Guid id)
    {
      var taskResult = await _userService.GetUserByIDAsync(id);
      return Ok(taskResult);
    }
  }
}
