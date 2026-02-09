using System.Text.Json.Serialization;
using TRFSAE.MemberPortal.API.Enums;

namespace TRFSAE.MemberPortal.API.DTOs;
public class CreateUserDto
{
    [JsonPropertyName("name")]
    public required string Name { get; set; }

    [JsonPropertyName("subsystem")]
    public required Subsystem Subsystem { get; set; }

    [JsonPropertyName("email")]
    public required string Email { get; set; }

    [JsonPropertyName("role")]
    public required Role Role { get; set; }

    [JsonPropertyName("sid")]
    public required int StudentId { get; set; }

    [JsonPropertyName("hazingStatus")]
    public bool HazingStatus { get; set; } = false;

    [JsonPropertyName("feeStatus")]
    public bool FeeStatus { get; set; } = false;

    [JsonPropertyName("gradYear")]
    public required int GradYear { get; set; }

    [JsonPropertyName("shirtSize")]
    public ShirtSize? ShirtSize { get; set; }
}
