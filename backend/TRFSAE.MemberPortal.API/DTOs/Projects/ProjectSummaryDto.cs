using System.Text.Json.Serialization;
using TRFSAE.MemberPortal.API.Enums;

namespace TRFSAE.MemberPortal.API.DTOs;

public class ProjectSummaryDto
{
    [JsonPropertyName("id")]
    public Guid Id { get; set; }

    [JsonPropertyName("title")]
    public string Title { get; set; } = null!;
    
    [JsonPropertyName("priority")]
    public ProjectPriority Priority { get; set; }

    [JsonPropertyName("deadline")]
    public DateTime Deadline { get; set; }
}
