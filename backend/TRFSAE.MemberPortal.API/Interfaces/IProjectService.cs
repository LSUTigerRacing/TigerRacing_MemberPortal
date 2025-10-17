using System.Text.Json;
using TRFSAE.MemberPortal.API.DTOs;

namespace TRFSAE.MemberPortal.API.Interfaces;

public interface IProjectService
{
    Task<List<ProjectResponseDto>> GetAllProjectsAsync();
    Task<List<ProjectResponseDto>> GetAllProjectTasksAsync(Guid id);
    Task<ProjectResponseDto> UpdateUserProjectAsync(Guid userId, Guid projectId);
    Task<List<ProjectResponseDto>> GetAllAssignedProjectsAsync(Guid id);
    Task<ProjectResponseDto> CreateNewProjectAsync();


}