using System.Text.Json.Serialization;
using TRFSAE.MemberPortal.API.Enums;

namespace TRFSAE.MemberPortal.API.DTOs;

public class UserSummaryDto
{
    [JsonPropertyName("id")]
    public Guid Id { get; set; }

    [JsonPropertyName("name")]
    public required string Name { get; set; } = null!;

    [JsonPropertyName("email")]
    public required string Email { get; set; } = null!;

    [JsonPropertyName("gradYear")]
    public required int GradYear { get; set; }

    [JsonPropertyName("subsystem")]
    public required Subsystem Subsystem { get; set; }
}
