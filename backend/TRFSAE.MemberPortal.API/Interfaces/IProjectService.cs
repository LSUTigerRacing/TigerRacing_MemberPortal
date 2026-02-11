using TRFSAE.MemberPortal.API.DTOs;
using TRFSAE.MemberPortal.API.Enums;

namespace TRFSAE.MemberPortal.API.Interfaces;

public interface IProjectService
{
    Task<IEnumerable<ProjectSummaryDto>> GetAllProjectsAsync(int pageNumber, int pageSize, string? search, ProjectPriority? priority, Subsystem? subsystem);
    Task<ProjectDetailDto> GetProjectByIdAsync(Guid projectId);
    Task<CreateProjectResponse> CreateNewProjectAsync(CreateProjectDto createDto);
    Task<bool> UpdateProjectAsync(Guid projectId, UpdateProjectDto updateDto);
    Task<bool> AssignProjectUserAsync(Guid userId, Guid projectId);
    Task<bool> RemoveProjectUserAsync(Guid userId, Guid projectId);
    Task<IEnumerable<Guid>> GetAllProjectUsersAsync(Guid projectId);
}
