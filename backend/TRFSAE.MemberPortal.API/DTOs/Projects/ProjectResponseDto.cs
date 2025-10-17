using System.Text.Json.Serialization;

namespace TRFSAE.MemberPortal.API.DTOs;

public class ProjectResponseDto
{
    [JsonPropertyName("id")]
    public Guid ProjectId { get; set; }

    [JsonPropertyName("name")]
    public string ProjectName { get; set; } = null!;

    [JsonPropertyName("due_date")]
    public DateTime ProjectDueDate { get; set; }

    [JsonPropertyName("member_count")]
    public int ProjectMemberCount { get; set; }

}