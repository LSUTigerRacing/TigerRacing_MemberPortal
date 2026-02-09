using System.Text.Json.Serialization;
using TRFSAE.MemberPortal.API.Enums;

namespace TRFSAE.MemberPortal.API.DTOs;
public class CreateProjectDto
{
    [JsonPropertyName("name")]
    public string Name { get; set; } = "Untitled Project";

    [JsonPropertyName("description")]
    public string? Description { get; set; }

    [JsonPropertyName("subsystem")]
    public required Subsystem Subsystem { get; set; }

    [JsonPropertyName("priority")]
    public ProjectPriority Priority { get; set; }

    [JsonPropertyName("startDate")]
    public DateTime StartDate { get; set; }

    [JsonPropertyName("deadline")]
    public DateTime Deadline { get; set; }
}
