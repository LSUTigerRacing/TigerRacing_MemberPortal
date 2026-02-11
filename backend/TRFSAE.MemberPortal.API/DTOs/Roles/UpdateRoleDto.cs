using System.Text.Json.Serialization;

namespace TRFSAE.MemberPortal.API.DTOs;

public class UpdateRoleDto
{
    [JsonPropertyName("roleName")]
    public string RoleName { get; set; } = string.Empty;

    [JsonPropertyName("permissions")]
    public Dictionary<string, object>? Permissions { get; set; }
}
