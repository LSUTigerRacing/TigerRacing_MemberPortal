using Microsoft.AspNetCore.Mvc;
using TRFSAE.MemberPortal.API.DTOs;
using TRFSAE.MemberPortal.API.Interfaces;

namespace TRFSAE.MemberPortal.API.Controllers;

[ApiController]
[Route("api/projects/tasks")]

public class TaskController : ControllerBase
{
    private readonly ITaskService _TaskService;
    public TaskController(ITaskService taskService)
    {
        _TaskService = taskService;
    }

    [HttpGet("list")]
    public async Task<IActionResult> GetAllTasks([FromQuery] Guid projectId)
    {
        var tasks = await _TaskService.GetAllTasksAsync(projectId);
        return Ok(tasks);
    }

    [HttpGet("fetch")]
    public async Task<IActionResult> GetTaskById([FromQuery] Guid id)
    {
        var task = await _TaskService.GetTasksByIdAsync(id);

        if (task == null)
        {
            return NotFound();
        }

        return Ok(task);
    }

    [HttpPost("create")]
    public async Task<IActionResult> CreateTask([FromQuery] Guid projectId, CreateTaskDto createDto)
    {
        var task = await _TaskService.CreateTaskAsync(projectId, createDto);
        return Ok(task);
    }

    [HttpPatch("update")]
    public async Task<IActionResult> UpdateTask([FromQuery] Guid id, UpdateTaskDto createDto)
    {
        var task = await _TaskService.UpdateTaskAsync(id, createDto);
        return Ok(task);
    }


    [HttpPost("delete")]
    public async Task<IActionResult> DeleteTask([FromQuery] Guid id)
    {
        var task = await _TaskService.DeleteTaskAsync(id);

        return Ok(task);
    }

}
