using TRFSAE.MemberPortal.API.DTOs;
using TRFSAE.MemberPortal.API.Interfaces;
using System.Text.Json;
using TRFSAE.MemberPortal.API.Models;

namespace TRFSAE.MemberPortal.API.Services;

public class ProjectService : IProjectService
{
    private readonly Supabase.Client _supabaseClient;

    public ProjectService(Supabase.Client supabaseClient)
    {
        _supabaseClient = supabaseClient;
    }

    public async Task<List<ProjectResponseDto>> GetAllProjectAsync()
    {
        var response = await _supabaseClient
            .Rpc("get_all_project", new Dictionary<string, object>());
        var projects = JsonSerializer.Deserialize<List<ProjectResponseDto>>(response.Content);

        return projects ?? new List<ProjectResponseDto>();
    }

    

}