using TRFSAE.MemberPortal.API.DTOs;

namespace TRFSAE.MemberPortal.API.Interfaces;

public interface IProjectService
{
    Task<List<ProjectResponseDto>> GetAllProjectsAsync(ProjectSearchDto searchDto);
    // Task<ProjectResponseDto> UpdateUserProjectAsync(Guid userId, Guid projectId);
    // Task<List<ProjectResponseDto>> GetAllAssignedProjectsAsync(Guid id);
    Task<bool> CreateNewProjectAsync(CreateProjectDto createDto);
    Task<bool> AssignProjectAsync(Guid userId, Guid projectId);

}