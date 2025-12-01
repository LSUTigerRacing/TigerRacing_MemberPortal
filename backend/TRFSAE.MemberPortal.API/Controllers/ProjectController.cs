using Microsoft.AspNetCore.Mvc;
using TRFSAE.MemberPortal.API.DTOs;
using TRFSAE.MemberPortal.API.Interfaces;
using TRFSAE.MemberPortal.API.Enums;

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
    public async Task<IActionResult> GetAllProjects(string? search, ProjectPriority? priority, Subsystem? subsystem, int pageNumber = 1, int pageSize = 8)
    {
        var projects = await _ProjectService.GetAllProjectsAsync(pageNumber, pageSize, search, priority, subsystem);
        return Ok(projects);
    }

    [HttpPost]
    public async Task<IActionResult> CreateNewProject(CreateProjectDto createDto)
    {
        var project = await _ProjectService.CreateNewProjectAsync(createDto);
        return Ok(project);
    }

    [HttpPost("{projectId}/users/{userId}")]
    public async Task<IActionResult> AssignProjectUser(Guid userId, Guid projectId)
    {
        var assign = await _ProjectService.AssignProjectUserAsync(userId, projectId);
        return Ok(assign);
    }

    [HttpDelete("{projectId}/users/{userId}")]
    public async Task<IActionResult> RemoveProjectUser(Guid userId, Guid projectId)
    {
        var assign = await _ProjectService.RemoveProjectUserAsync(userId, projectId);
        return Ok(assign);
    }
}