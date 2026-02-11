using TRFSAE.MemberPortal.API.Enums;
using TRFSAE.MemberPortal.API.Models;
using System.Text.Json.Serialization;

namespace TRFSAE.MemberPortal.API.DTOs;

public class CreateProjectResponse
{
    [JsonPropertyName("id")]
    public Guid ProjectId { get; set; }

    [JsonPropertyName("location")]
    public string Location { get; set; } = string.Empty;
}
