using System.IO.Pipelines;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Supabase;
using TRFSAE.MemberPortal.API.Interfaces;

[ApiController]
[Route("api/task")]

public class TaskController : ControllerBase
{
    private readonly ITaskService _TaskService;
    public TaskController(ITaskService taskService)
    {
        _TaskService = taskService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllTasks()
    {
        var tasks = await _TaskService.GetAllTasksAsync();
        return Ok(tasks);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetTaskById(Guid id)
    {
        var task = await _TaskService.GetTasksByIdAsync(id);

        if (task == null)
        {
            return NotFound();
        }

        return Ok(task);
    }

    [HttpPost]
    public async Task<IActionResult> CreateNewTask()
    {
        var task = await _TaskService.CreateNewTaskAsync();
        return Ok(task);
    }

}