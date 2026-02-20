using TRFSAE.MemberPortal.API.DTOs;
using TRFSAE.MemberPortal.API.Interfaces;
using TRFSAE.MemberPortal.API.Models;
using TRFSAE.MemberPortal.API.Enums;

namespace TRFSAE.MemberPortal.API.Services;

public class ProjectService : IProjectService
{
    private readonly Supabase.Client _supabaseClient;

    public ProjectService(Supabase.Client supabaseClient)
    {
        _supabaseClient = supabaseClient;
    }

    public async Task<IEnumerable<ProjectSummaryDto>> GetAllProjectsAsync()
    {
        var query = _supabaseClient.From<ProjectModel>();

        var response = await query
            .Order(p => p.CreatedAt, Supabase.Postgrest.Constants.Ordering.Ascending)
            // .Range((pageNumber - 1) * pageSize, pageNumber * pageSize - 1)
            .Select("id,name,deadline,priority")
            .Get();

        var projectSummaries = response.Models.Select(p => new ProjectSummaryDto
        {
            ProjectId = p.Id,
            Title = p.Title,
            Deadline = p.Deadline,
            Priority = p.Priority
        });

        return projectSummaries;
    }

    public async Task<ProjectDetailDto> GetProjectByIdAsync(Guid projectId)
    {
        var project = await _supabaseClient
            .From<ProjectModel>()
            .Select("*")
            .Where(p => p.Id == projectId)
            .Single();

        if (project == null)
        {
            throw new Exception("Project not found");
        }

        var projectDetail = new ProjectDetailDto
        {
            Id = project.Id,
            AuthorId = project.AuthorId,
            Title = project.Title,
            Description = project.Description,
            Subsystem = project.Subsystem,
            Priority = project.Priority,
            StartDate = project.StartDate,
            Deadline = project.Deadline,
            CreatedAt = project.CreatedAt,
            UpdatedAt = project.UpdatedAt
        };

        return projectDetail;
    }

    public async Task<bool> CreateProjectAsync(CreateProjectDto createDto)
    {
        var projectId = Guid.NewGuid();

        var newProject = new ProjectModel
        {
            Id = projectId,
            AuthorId = new Guid("d168954f-f68c-479a-9740-a9034cb44edb"), // temp until JWT is setup
            Title = createDto.Title,
            Description = createDto.Description,
            Subsystem = createDto.Subsystem,
            Priority = createDto.Priority,
            StartDate = createDto.StartDate,
            Deadline = createDto.Deadline,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        try
        {
            var response = await _supabaseClient
                .From<ProjectModel>()
                .Insert(newProject);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error creating project: {ex.Message}");
            throw;
        }

        return new CreateProjectResponse
        {
            ProjectId = projectId,
            Location = $"/api/projects/{projectId}"
        };
    }

    public async Task<bool> UpdateProjectAsync(Guid id, UpdateProjectDto updateDto)
    {
        try
        {
            var model = await _supabaseClient.From<ProjectModel>()
                .Where(p => p.Id == id)
                .Single();

            if (model == null)
            {
                Console.WriteLine("Project not found");
                return false;
            }

            if (!string.IsNullOrEmpty(updateDto.Title))
            {
                model.Title = updateDto.Title;
            }
            if (!string.IsNullOrEmpty(updateDto.Description))
            {
                model.Description = updateDto.Description;
            }
            if (updateDto.Subsystem != null)
            {
                model.Subsystem = updateDto.Subsystem.Value;
            }
            if (updateDto.Priority != null)
            {
                model.Priority = updateDto.Priority.Value;
            }
            if (updateDto.ProjectStartDate != null)
            {
                model.StartDate = updateDto.ProjectStartDate.Value;
            }
            if (updateDto.ProjectDueDate != null)
            {
                model.Deadline = updateDto.ProjectDueDate.Value;
            }
            model.UpdatedAt = DateTime.UtcNow;

            var response = await _supabaseClient
                .From<ProjectModel>()
                .Update(model);

            return response.Models.Count > 0;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error attempting update: {ex.Message}");
            return false;
        }
    }

    public async Task<bool> DeleteProjectAsync(Guid id)
    {
        return false;
    }
}
