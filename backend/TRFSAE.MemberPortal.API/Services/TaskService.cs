using TRFSAE.MemberPortal.API.Models;
using TRFSAE.MemberPortal.API.Interfaces;
using TRFSAE.MemberPortal.API.DTOs;
using System.Text.Json;
using Supabase;

namespace TRFSAE.MemberPortal.API.Services;

public class TaskService : ITaskService
{
    private readonly Client _supabaseClient;
    public TaskService(Client supabaseClient)
    {
        _supabaseClient = supabaseClient;
    }

    public async Task<List<TaskResponseDto>> GetAllTasksAsync(TaskSearchDto searchDto)
    {
        var response = await _supabaseClient
        .From<TaskModel>()
        .Get() ?? throw new Exception("No tasks found");

        return new List<TaskResponseDto>();
    }

    public async Task<TaskResponseDto> GetTasksByIdAsync(Guid id)
    {
        var response = await _supabaseClient
        .From<TaskModel>()
        .Where(x => x.TaskId == id)
        .Single() ?? throw new Exception("Task not found");

        var taskResponse = new TaskResponseDto
        {
            TaskId = response.TaskId,
            TaskName = response.TaskName
        };

        return taskResponse;
    }

    public async Task<TaskResponseDto> CreateTaskAsync(CreateTaskDto createDto)
    {
        var newTask = new TaskModel
        {
            TaskId = Guid.NewGuid(),
            TaskName = createDto.TaskName,
            CompletionStatus = createDto.CompletionStatus,
            DueDate = createDto.DueDate
        };

        var response = await _supabaseClient
        .From<TaskModel>()
        .Insert(newTask);


        return new TaskResponseDto
        {
            TaskId = newTask.TaskId,
            TaskName = newTask.TaskName
        };
    }
}