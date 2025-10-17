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
    public async Task<IActionResult> GetAllProjects()
    {
        var projects = await _ProjectService.GetAllProjectsAsync();
        return Ok(projects);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetAllProjectTasks(Guid id)
    {
        var tasks = await _ProjectService.GetAllProjectTasksAsync(id);
        return Ok(tasks);
    }

    [HttpPut("{userId}/projectId")]
    public async Task<IActionResult> UpdateUserProject(Guid userId, Guid projectId)
    {
        var update = await _ProjectService.UpdateUserProjectAsync(userId, projectId);
        return Ok(update);

    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetAllAssignedProjects(Guid id)
    {
        var projects = await _ProjectService.GetAllAssignedProjectsAsync(id);
        return Ok(projects);
    }
    
    [HttpPost]
    public async Task<IActionResult> CreateNewProject()
    {
        var project = await _ProjectService.CreateNewProjectAsync();
        return Ok(project);

    }
}