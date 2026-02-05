using System.Text.Json.Serialization;
using TRFSAE.MemberPortal.API.Enums;

namespace TRFSAE.MemberPortal.API.DTOs;

public class ProjectSummaryDto
{
    [JsonPropertyName("id")]
    public Guid ProjectId { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; } = null!;

    [JsonPropertyName("due_date")]
    public DateTime Deadline { get; set; }

    [JsonPropertyName("priority")]
    public ProjectPriority Priority { get; set; }

}