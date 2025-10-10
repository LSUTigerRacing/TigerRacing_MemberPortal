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

    public async Task<List<ProjectResponseDto>> GetAllProjectsAsync()
    {
        var response = await _supabaseClient
            .Rpc("get_all_project", new Dictionary<string, object>());
            
        var projects = JsonSerializer.Deserialize<List<ProjectResponseDto>>(response.Content);

        return projects ?? new List<ProjectResponseDto>();
    }

    public async Task<List<ProjectResponseDto>> GetAllProjectTasksAsync(Guid id)
    {
        var parameters = new Dictionary<string, object>
        {
            {"project_id", id}
        };

        var response = await _supabaseClient
            .Rpc("get_all_project_tasks", parameters);

        var tasks = JsonSerializer.Deserialize<List<ProjectResponseDto>>(response.Content);

        return tasks ?? new List<ProjectResponseDto>();


    }
    public async Task<ProjectResponseDto> UpdateUserProjectAsync(Guid userId, Guid projectId)
    {
        var parameters = new Dictionary<string, object>
        {
            {"user_id" , userId},
            {"project_id", projectId}
        };

        var response = await _supabaseClient
            .Rpc("update_user_project", parameters);

        var project = JsonSerializer.Deserialize<List<ProjectResponseDto>>(response.Content);

        return project?.FirstOrDefault();


    }

    public async Task<List<ProjectResponseDto>> GetAllAssignedProjectsAsync(Guid id)
    {
        var parameters = new Dictionary<string, object>
        {
            {"project_id", id}
        };

        var response = await _supabaseClient
            .Rpc("get_all_assigned_projects", parameters);

        var projects = JsonSerializer.Deserialize<List<ProjectResponseDto>>(response.Content);

        return projects ?? new List<ProjectResponseDto>();

    }

    public async Task<ProjectResponseDto> CreateNewProjectAsync()
    {   
            var response = await _supabaseClient
                .Rpc("create_new_project", new Dictionary<string, object>());

            var project = JsonSerializer.Deserialize<List<ProjectResponseDto>>(response.Content);

            return project?.FirstOrDefault();
        
    }

    


    

}