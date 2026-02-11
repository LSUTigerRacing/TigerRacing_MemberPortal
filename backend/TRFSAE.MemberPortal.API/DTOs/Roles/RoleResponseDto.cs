using System.Text.Json.Serialization;

namespace TRFSAE.MemberPortal.API.DTOs;

public class RoleResponseDto
{
    [JsonPropertyName("id")]
    public Guid RoleId { get; set; }
    [JsonPropertyName("name")]
    public string RoleName { get; set; } = string.Empty;
    [JsonPropertyName("permissions")]
    public Dictionary<string, object>? Permissions { get; set; }
}
