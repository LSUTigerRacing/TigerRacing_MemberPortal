using System.Text.Json;
using TRFSAE.MemberPortal.API.DTOs;

namespace TRFSAE.MemberPortal.API.Interfaces;

public class TaskService : ITaskService
{

    private readonly Supabase.Client _supabaseClient;
    public TaskService(Supabase.Client supabaseClient)
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

    public async Task<TaskResponseDto> GetTaskByIdAsync(Guid id)
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

    public async Task<TaskResponseDto> UpdateTaskAllowedAsync(Guid id, JsonElement taskAllowed)
    {
        var parameters = new Dictionary<string, object>
        {
            { "task_id", id },
            { "taskAllowed_updates", taskAllowed }
        };

        var response = await _supabaseClient
            .Rpc("update_task_taskAllowed", parameters);

        var task = JsonSerializer.Deserialize<List<TaskResponseDto>>(response.Content);

        return task?.FirstOrDefault();
    }

}