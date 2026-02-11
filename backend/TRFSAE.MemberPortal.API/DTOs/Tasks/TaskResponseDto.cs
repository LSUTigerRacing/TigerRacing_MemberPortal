using System.Text.Json.Serialization;

namespace TRFSAE.MemberPortal.API.DTOs;

public class TaskResponseDto
{
    [JsonPropertyName("id")]
    public Guid TaskId { get; set; }

    [JsonPropertyName("name")]
    public required string TaskName { get; set; }

    [JsonPropertyName("assigner")]
    public string? Assigner { get; set; }

    [JsonPropertyName("completion_status")]
    public bool CompletionStatus { get; set; }

    [JsonPropertyName("start_date")]
    public DateTime StartDate { get; set; }

    [JsonPropertyName("due_date")]
    public DateTime DueDate { get; set; }

    [JsonPropertyName("description")]
    public string? Description { get; set; }
}
