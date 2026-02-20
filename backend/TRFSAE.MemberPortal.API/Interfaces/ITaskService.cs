using System.Text.Json;
using TRFSAE.MemberPortal.API.DTOs;

namespace TRFSAE.MemberPortal.API.Interfaces;

public interface ITaskService
{
    Task<List<TaskDetailDto>> GetAllTasksAsync(Guid projectId);
    Task<TaskDetailDto> GetTasksByIdAsync(Guid id);
    Task<TaskDetailDto> CreateTaskAsync(Guid projectId, CreateTaskDto createDto);
    Task<TaskDetailDto> UpdateTaskAsync(Guid projectId, UpdateTaskDto createDto);
    Task<TaskDetailDto> DeleteTaskAsync(Guid id);
}
