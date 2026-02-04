using Microsoft.AspNetCore.Mvc;
using TRFSAE.MemberPortal.API.DTOs;
using TRFSAE.MemberPortal.API.Enums;
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
    public async Task<IActionResult> GetAllUsers(int pageNumber, int pageSize, string? search, bool? completedHazingForm, bool? paidMemberFee, DateTime? gradDate, ShirtSize? shirtSize, Subsystem? subsystem)
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


    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserByIDAsync(Guid id)
    {
      var user = await _userService.GetUserByIDAsync(id);
      return Ok(user);
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> UpdateUserByIdAsync(Guid id, UserUpdateDto model)
    {
      var taskResult = await _userService.UpdateUserByIdAsync(id, model);
      return Ok(taskResult);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUserAsync(Guid id, string confirmationString)
    {
      var taskResult = await _userService.DeleteUserAsync(id, confirmationString);
      return Ok(taskResult);
    }
  }
}
