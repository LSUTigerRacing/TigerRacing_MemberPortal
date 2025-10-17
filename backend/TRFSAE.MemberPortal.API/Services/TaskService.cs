using System.Text.Json;
using Microsoft.EntityFrameworkCore.Query;
using TRFSAE.MemberPortal.API.DTOs;
using Supabase;

namespace TRFSAE.MemberPortal.API.Interfaces;

public class TaskService : ITaskService
{

    private readonly Client _supabaseClient;
    public TaskService(Client supabaseClient)
    {
        _supabaseClient = supabaseClient;
    }

    public async Task<List<TaskResponseDto>> GetAllTasksAsync()
    {
        var response = await _supabaseClient
        .Rpc("get_all_tasks", new Dictionary<string, object>());

        var tasks = JsonSerializer.Deserialize<List<TaskResponseDto>>(response.Content);

        return tasks ?? new List<TaskResponseDto>();
    }

    public async Task<TaskResponseDto> GetTasksByIdAsync(Guid id)
    {
        var parameters = new Dictionary<string, object>
        {
            { "task_id", id }
        };

        var response = await _supabaseClient
            .Rpc("get_task_by_id", parameters);

        var tasks = JsonSerializer.Deserialize<List<TaskResponseDto>>(response.Content);

        return tasks?.FirstOrDefault();
    }

    public async Task<TaskResponseDto> CreateTaskAsync()
    {
        var response = await _supabaseClient
        .Rpc("create_new_task", new Dictionary<string, object>());

        var task = JsonSerializer.Deserialize<List<TaskResponseDto>>(response.Content);

        return task?.FirstOrDefault();
    }

}