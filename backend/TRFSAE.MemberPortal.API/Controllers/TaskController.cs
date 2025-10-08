using System.IO.Pipelines;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Supabase;
using TRFSAE.MemberPortal.API.Interfaces;

[ApiController]
[Route("api/task")]

public class TaskController : ControllerBase
{
    private readonly ITaskService _taskService;
    public TaskController(ITaskService taskService)
    {
        _taskService = taskService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllTasks()
    {
        var tasks = await _taskService.GetAllTasksAsync();
        return Ok(tasks);
    }

    [HttpGet("id")]
    public async Task<IActionResult> GetTaskById(Guid id)
    {
        var task = await _taskService.GetTaskByIdAsync(id);
       
        if (task == null)
        {
            return NotFound();
        }

        return Ok(task);
    }

    [HttpGet("{id}/taskAllowed")]

    public async Task<IActionResult> ChangeTaskAllowedByID(Guid id, JsonElement taskAllowed)
    {
        var update = await _taskService.UpdateTaskAllowedAsync(id, taskAllowed);
        return Ok(update);
    }
}