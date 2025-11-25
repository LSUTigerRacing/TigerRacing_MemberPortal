using Microsoft.AspNetCore.Mvc;
using TRFSAE.MemberPortal.API.DTOs;
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
    public async Task<IActionResult> GetAllTasks(TaskSearchDto searchDto)
    {
        var tasks = await _TaskService.GetAllTasksAsync(searchDto);
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
    public async Task<IActionResult> CreateTask(CreateTaskDto createDto)
    {
        var task = await _TaskService.CreateTaskAsync(createDto);
        return Ok(task);
    }

}