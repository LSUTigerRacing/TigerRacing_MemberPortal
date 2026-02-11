using Microsoft.AspNetCore.Mvc;
using TRFSAE.MemberPortal.API.DTOs;
using TRFSAE.MemberPortal.API.Interfaces;

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
    public async Task<IActionResult> GetAllTasks(TaskSearchDto searchDto)
    {
        var tasks = await _TaskService.GetAllTasksAsync(searchDto);
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
    public async Task<IActionResult> CreateTask([FromQuery] Guid id, CreateTaskDto createDto)
    {
        var task = await _TaskService.CreateTaskAsync(createDto);
        return Ok(task);
    }

    [HttpPatch("update")]
    public async Task<IActionResult> UpdateTask([FromQuery] Guid id, CreateTaskDto createDto)
    {
        return Ok();
    }


    [HttpPost("delete")]
    public async Task<IActionResult> DeleteTask([FromQuery] Guid id)
    {
        return Ok();
    }

}