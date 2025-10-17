using System.Text.Json.Serialization;

namespace TRFSAE.MemberPortal.API.DTOs;

public class UpdateRolePermissionsDto
{
    [JsonPropertyName("permissions")]
    public required Dictionary<string, object> Permissions { get; set; }
}