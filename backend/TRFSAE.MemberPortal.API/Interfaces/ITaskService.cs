using System.Text.Json;
using TRFSAE.MemberPortal.API.DTOs;

namespace TRFSAE.MemberPortal.API.Interfaces;

public interface ITaskService
{
    Task<List<TaskResponseDto>> GetAllTasksAsync();
    Task<TaskResponseDto> GetTaskByIdAsync(Guid id);
    Task<TaskResponseDto> UpdateTaskAllowedAsync(Guid id, JsonElement taskAllowed);
}
