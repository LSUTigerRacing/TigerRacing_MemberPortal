using System.Text.Json;
using TRFSAE.MemberPortal.API.DTOs;
namespace TRFSAE.MemberPortal.API.Interfaces;


public interface ITaskService
{
    Task<List<TaskResponseDto>> GetAllTasksAsync();
    Task<TaskResponseDto> GetTasksByIdAsync(Guid id);
    Task<TaskResponseDto> CreateTaskAsync();
}
