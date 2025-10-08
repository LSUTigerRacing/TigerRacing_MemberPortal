using System.Text.Json.Serialization;
namespace TRFSAE.MemberPortal.API.DTOs;
public class TaskResponseDto
{
    [JsonPropertyName("id")]
    public Guid TaskId { get; set; }
    [JsonPropertyName("task")]
    public string TaskName { get; set; } = null!;
     [JsonPropertyName("taskAllowed")]
    public Dictionary<string, object>? TaskAllowed { get; set; }
}