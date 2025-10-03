using TRFSAE.MemberPortal.API.DTOs
using TRFSAE.MemberPortal.API.Services

namespace TRFSAE.MemberPortal.API.Controllers 
{
  [ApiController]
  [Route("api/users")]
  public class UserController : ControllerBase
  {
    private readonly IUserService _userService;

    public UserController(IUserService _userService)
    {
      _userService = userService;
    }

    [HttpGet]
    public async Task<IActionResult> GetUserByIDAsync(Guid id)
    {
      var User = await _userService.GetUserByIDAsync(id);
      return Ok(User);
    }

    [HttpPatch]
    public async Task<IActionResult> UpdateUserAsync(Guid id, UserUpdateDTO model)
    {
      var taskResult = await _userService.UpdateUserByIDAsync(id);
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
      var User = await _userService.GetUserByIDAsync(id);
      return Ok(User);
    }
  }
}
