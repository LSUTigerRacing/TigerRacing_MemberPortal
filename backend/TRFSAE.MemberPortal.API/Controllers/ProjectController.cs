using Microsoft.AspNetCore.Mvc;
using TRFSAE.MemberPortal.API.Interfaces;
using TRFSAE.MemberPortal.API.Services;


namespace TRFSAE.MemberPortal.API.Controllers;

[ApiController]
[Route("api/project")]
public class ProjectController : ControllerBase
{
    private readonly IProjectService _ProjectService;
    public ProjectController(IProjectService projectService)
    {
        _ProjectService = projectService;
    }

    [HttpGet]

    public async Task<IActionResult> GetAllProject()
    {
        var projects = await _ProjectService.GetAllProjectAsync();
        return Ok(projects);
    }
}