using TRFSAE.MemberPortal.API.DTOs;
using TRFSAE.MemberPortal.API.Enums;

namespace TRFSAE.MemberPortal.API.Interfaces;

public interface IProjectService
{
    Task<IEnumerable<ProjectSummaryDto>> GetAllProjectsAsync();
    Task<ProjectDetailDto> GetProjectByIdAsync(Guid id);
    Task<bool> CreateProjectAsync(CreateProjectDto createDto);
    Task<bool> UpdateProjectAsync(Guid id, UpdateProjectDto updateDto);
    Task<bool> DeleteProjectAsync(Guid id);
}
