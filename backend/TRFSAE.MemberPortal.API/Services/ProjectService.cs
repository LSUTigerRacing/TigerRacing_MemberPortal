using TRFSAE.MemberPortal.API.DTOs;
using TRFSAE.MemberPortal.API.Interfaces;
using System.Text.Json;
using TRFSAE.MemberPortal.API.Models;
using Supabase.Gotrue;
using Microsoft.AspNetCore.Mvc;

namespace TRFSAE.MemberPortal.API.Services;

public class ProjectService : IProjectService
{
    private readonly Supabase.Client _supabaseClient;

    public ProjectService(Supabase.Client supabaseClient)
    {
        _supabaseClient = supabaseClient;
    }

    public async Task<List<ProjectResponseDto>> GetAllProjectsAsync(ProjectSearchDto searchDto)
    {
        var response = await _supabaseClient
        .From<ProjectModel>()
        .Get();
            
        var projectResponse = new ProjectResponseDto
        {
            ProjectId = Guid.NewGuid(),
            ProjectName = "Sample Project"
        };

        return  new List<ProjectResponseDto>();
    }

    // public async Task<List<ProjectResponseDto>> GetAllProjectTasksAsync(Guid id)
    // {
    //     var parameters = new Dictionary<string, object>
    //     {
    //         {"project_id", id}
    //     };

    //     var response = await _supabaseClient
    //         .Rpc("get_all_project_tasks", parameters);

    //     var tasks = JsonSerializer.Deserialize<List<ProjectResponseDto>>(response.Content);

    //     return tasks ?? new List<ProjectResponseDto>();


    // }
    // public async Task<ProjectResponseDto> UpdateUserProjectAsync(Guid userId, Guid projectId)
    // {
    //     var parameters = new Dictionary<string, object>
    //     {
    //         {"user_id" , userId},
    //         {"project_id", projectId}
    //     };

    //     var response = await _supabaseClient
    //         .From<ProjectModel>()
    //         .Where(x => x.ProjectId == projectId)
    //         .Not;

    //     var project = JsonSerializer.Deserialize<List<ProjectResponseDto>>(response.Content);

    //     return project?.FirstOrDefault();


    // }

    // public async Task<List<ProjectResponseDto>> GetAllAssignedProjectsAsync(Guid id)
    // {
    //     var parameters = new Dictionary<string, object>
    //     {
    //         {"project_id", id}
    //     };

    //     var response = await _supabaseClient
    //         .Rpc("get_all_assigned_projects", parameters);

    //     var projects = JsonSerializer.Deserialize<List<ProjectResponseDto>>(response.Content);

    //     return projects ?? new List<ProjectResponseDto>();

    // }

    public async Task<bool> CreateNewProjectAsync(CreateProjectDto createDto)
    {
        var newProject = new ProjectModel
        {
            ProjectId = Guid.NewGuid(),
            ProjectName = createDto.ProjectName,
            ProjectDueDate = createDto.ProjectDueDate,
            ProjectMemberCount = createDto.ProjectMemberCount,
        };

        try
        {
            var response = await _supabaseClient
            .From<ProjectModel>()
            .Insert(newProject);

            return true;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error creating project: {ex.Message}");
            return false;
        }

    }

    public async Task<bool> AssignProjectAsync(Guid userId, Guid projectId)
    {
        var response = await _supabaseClient
            .From<UserProjectModel>()
            .Where(x => x.UserId == userId && x.ProjectId == projectId)
            .Get();

        var exist = response.Models.FirstOrDefault();

        if (exist != null)
        {
            await _supabaseClient
                .From<UserProjectModel>()
                .Where(x => x.UserId == userId && x.ProjectId == projectId)
                .Delete();

            return true;

        }

        var newUserProject = new UserProjectModel
        {
            UserId = userId,
            ProjectId = projectId

        };

        try
        {
            await _supabaseClient
                .From<UserProjectModel>()
                .Insert(new[] { newUserProject });

            return true;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error creating user project: {ex.Message}");
            return false;
        }

    }

}