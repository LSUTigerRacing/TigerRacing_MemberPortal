using Microsoft.AspNetCore.Mvc;
using TRFSAE.MemberPortal.API.DTOs;
using TRFSAE.MemberPortal.API.Interfaces;

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
    public async Task<IActionResult> GetAllProjects(ProjectSearchDto searchDto)
    {
        var projects = await _ProjectService.GetAllProjectsAsync(searchDto);
        return Ok(projects);
    }

    // [HttpGet("{id}")]
    // public async Task<IActionResult> GetAllProjectTasks(Guid id)
    // {
    //     var tasks = await _ProjectService.GetAllProjectTasksAsync(id);
    //     return Ok(tasks);
    // }

    // [HttpPut("{userId}/projectId")]
    // public async Task<IActionResult> UpdateUserProject(Guid userId, Guid projectId)
    // {
    //     var update = await _ProjectService.UpdateUserProjectAsync(userId, projectId);
    //     return Ok(update);
    // }

    // [HttpGet("{id}")]
    // public async Task<IActionResult> GetAllAssignedProjects(Guid id)
    // {
    //     var projects = await _ProjectService.GetAllAssignedProjectsAsync(id);
    //     return Ok(projects);
    // }

    [HttpPost]
    public async Task<IActionResult> CreateNewProject(CreateProjectDto createDto)
    {
        var project = await _ProjectService.CreateNewProjectAsync(createDto);
        return Ok(project);
    }

    [HttpPost("{projectId}/users/{userId}")]
    public async Task<IActionResult> AssignProject(Guid userId, Guid projectId)
    {
        var assign = await _ProjectService.AssignProjectAsync(userId, projectId);
        return Ok(assign);
    }
}