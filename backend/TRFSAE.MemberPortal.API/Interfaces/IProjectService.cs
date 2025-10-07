using System.Text.Json;
using TRFSAE.MemberPortal.API.DTOs;

namespace TRFSAE.MemberPortal.API.Interfaces;

public interface IProjectService
{
    Task<List<ProjectResponseDto>> GetAllProjectAsync();

}