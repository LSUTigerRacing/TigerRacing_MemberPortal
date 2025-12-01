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

    public async Task<IEnumerable<ProjectSummaryDto>> GetAllProjectsAsync(
        int pageNumber, int pageSize, string? search, ProjectPriority? priority, Subsystem? subsystem)
    {
        var query = _supabaseClient.From<ProjectModel>();

        if (!string.IsNullOrEmpty(search))
        {
            query = (Supabase.Interfaces.ISupabaseTable<ProjectModel, Supabase.Realtime.RealtimeChannel>)
            query.Where(p => p.Name == search);
        }

        if (priority != null)
        {
            query = (Supabase.Interfaces.ISupabaseTable<ProjectModel, Supabase.Realtime.RealtimeChannel>)
            query.Where(p => p.Priority == priority);
        }

        if (subsystem != null)
        {
            query = (Supabase.Interfaces.ISupabaseTable<ProjectModel, Supabase.Realtime.RealtimeChannel>)
            query.Where(p => p.Subsystem == subsystem);
        }

        var response = await query
            .Order(p => p.CreatedAt, Supabase.Postgrest.Constants.Ordering.Ascending)
            .Range((pageNumber - 1) * pageSize, pageNumber * pageSize - 1)
            .Select("id,name,deadline,priority")
            .Get();

        var projectSummaries = response.Models.Select(p => new ProjectSummaryDto
        {
            ProjectId = p.Id,
            Name = p.Name,
            Deadline = p.Deadline,
            Priority = p.Priority
        });

        return projectSummaries;
    }

    public async Task<CreateProjectResponse> CreateNewProjectAsync(CreateProjectDto createDto)
    {
        var projectId = Guid.NewGuid();

        var newProject = new ProjectModel
        {
            Id = projectId,
            AuthorId = new Guid("d168954f-f68c-479a-9740-a9034cb44edb"), // temp until JWT is setup
            Name = createDto.Name,
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

    public async Task<bool> AssignProjectUserAsync(Guid userId, Guid projectId)
    {
        try
        {
            var userProject = new UserProjectModel
            {
                UserId = userId,
                ProjectId = projectId
            };

            var response = await _supabaseClient
                .From<UserProjectModel>()
                .Insert(userProject);

            return true;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error assigning project: {ex.Message}");
            return false;
        }
    }

    public async Task<bool> RemoveProjectUserAsync(Guid userId, Guid projectId)
    {
        try
        {
            await _supabaseClient
                .From<UserProjectModel>()
                .Where(pm => pm.UserId == userId && pm.ProjectId == projectId)
                .Delete();
            return true;
        } 
        catch (Exception ex)
        {
            Console.WriteLine($"Error removing user from project: {ex.Message}");
            return false;
        }
    }
}