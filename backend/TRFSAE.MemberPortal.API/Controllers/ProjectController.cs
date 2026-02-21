using Microsoft.AspNetCore.Mvc;
using TRFSAE.MemberPortal.API.DTOs;
using TRFSAE.MemberPortal.API.Interfaces;
using TRFSAE.MemberPortal.API.Enums;

namespace TRFSAE.MemberPortal.API.Controllers;

[ApiController]
[Route("api/projects")]
public class ProjectController : ControllerBase
{
    private readonly IProjectService _ProjectService;
    public ProjectController(IProjectService projectService)
    {
        _ProjectService = projectService;
    }

    [HttpGet("list")]
    public async Task<IActionResult> GetAllProjects()
    {
        var projects = await _ProjectService.GetAllProjectsAsync();
        return Ok(projects);
    }

    [HttpGet("fetch")]
    public async Task<IActionResult> GetProjectById([FromQuery] Guid id)
    {
        var projects = await _ProjectService.GetProjectByIdAsync(id);
        return Ok(projects);
    }

    [HttpPost("create")]
    public async Task<IActionResult> CreateProject(CreateProjectDto createDto)
    {
        var project = await _ProjectService.CreateProjectAsync(createDto);
        return Ok(project);
    }

    [HttpPatch("update")]
    public async Task<IActionResult> UpdateProject([FromQuery] Guid id, UpdateProjectDto updateDto)
    {
        var project = await _ProjectService.UpdateProjectAsync(id, updateDto);
        return Ok(project);
    }

    [HttpDelete("delete")]
    public async Task<IActionResult> DeleteProject([FromQuery] Guid id) // needs to be turned into RPC; return value is true as long as GUID is valid
    {
        var project = await _ProjectService.DeleteProjectAsync(id);
        return Ok(project);
    }
}
