using System.Text.Json.Serialization;
namespace TRFSAE.MemberPortal.API.DTOs;

public class TaskResponseDto
{
    [JsonPropertyName("id")]
    public Guid TaskId { get; set; }

    [JsonPropertyName("name")]
    public string TaskName { get; set; }
    

}