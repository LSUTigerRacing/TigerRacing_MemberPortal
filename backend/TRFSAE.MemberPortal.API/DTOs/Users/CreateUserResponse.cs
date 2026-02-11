using System.Text.Json.Serialization;

namespace TRFSAE.MemberPortal.API.DTOs;

public class CreateUserResponse
{
    [JsonPropertyName("id")]
    public Guid ProjectId { get; set; }

    [JsonPropertyName("location")]
    public string Location { get; set; } = string.Empty;
}
