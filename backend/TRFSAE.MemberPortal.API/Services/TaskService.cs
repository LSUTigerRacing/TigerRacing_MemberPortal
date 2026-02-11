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

    public async Task<TaskResponseDto> GetTasksByIdAsync(Guid id)
    {
        var response = await _supabaseClient
        .From<ProjectTaskModel>()
        .Where(x => x.Id == id)
        .Single();

        if (response == null)
        {
            throw new Exception("Task not found");
        }

        var taskResponse = new TaskResponseDto
        {
            Id = response.Id,
            Title = response.Title
        };

        return taskResponse;
    }


    public async Task<List<TaskResponseDto>> GetAllTasksAsync(TaskSearchDto searchDto)
    {
        var response = await _supabaseClient
        .From<ProjectTaskModel>()
        .Get() ?? throw new Exception("No tasks found");

        return new List<TaskResponseDto>();
    }


    public async Task<TaskResponseDto> CreateTaskAsync(CreateTaskDto createDto)
    {
        var newTask = new ProjectTaskModel
        {
            Id = Guid.NewGuid(),
            Title = createDto.Title,
            Deadline = createDto.Deadline
        };

        var response = await _supabaseClient
        .From<ProjectTaskModel>()
        .Insert(newTask);


        return new TaskResponseDto
        {
            Id = newTask.Id,
            Title = newTask.Title
        };
    }
}
