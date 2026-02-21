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
            .Select("id,title,deadline,priority")
            .Get();

        var projectSummaries = response.Models.Select(p => new ProjectSummaryDto
        {
            Id = p.Id,
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
            AuthorId = new Guid("8cff6494-d336-4d38-947e-ff299ae3d204"), // temp until JWT is setup
            Title = createDto.Title,
            Description = createDto.Description,
            Subsystem = createDto.Subsystem,
            Priority = createDto.Priority ?? ProjectPriority.Medium,
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

        return true;
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
            if (updateDto.StartDate != null)
            {
                model.StartDate = updateDto.StartDate.Value;
            }
            if (updateDto.Deadline != null)
            {
                model.Deadline = updateDto.Deadline.Value;
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

    public async Task<bool> DeleteProjectAsync(Guid id) // needs to be turned into RPC; return value is true as long as GUID is valid
    {
        try
        {
            await _supabaseClient
            .From<ProjectModel>()
            .Where(x => x.Id == id)
            .Delete();

            return true;
        }
        catch (Exception e)
        {
            Console.WriteLine($"Delete Failed: {e.Message}");
            return false;
        }
    }
}
