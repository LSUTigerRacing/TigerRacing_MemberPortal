using Microsoft.EntityFrameworkCore.Query;
using System.Text.Json.Serialization;
using TRFSAE.MemberPortal.API.Enums;

namespace TRFSAE.MemberPortal.API.DTOs;

public class UserUpdateDto
{
    [JsonPropertyName("name")]
    public string? Name { get; set; }

    [JsonPropertyName("email")]
    public string? Email { get; set; }

    [JsonPropertyName("studentId")]
    public int? StudentId { get; set; }

    [JsonPropertyName("hazingStatus")]
    public bool? HazingStatus { get; set; }

    [JsonPropertyName("feeStatus")]
    public bool? FeeStatus { get; set; }

    [JsonPropertyName("gradYear")]
    public int? GradYear { get; set; }

    [JsonPropertyName("shirtSize")]
    public ShirtSize? ShirtSize { get; set; }

    [JsonPropertyName("system")]
    public TRSystem? System { get; set; }

    [JsonPropertyName("subsystem")]
    public Subsystem? Subsystem { get; set; }

    [JsonPropertyName("role")]
    public Role? Role { get; set; }
}
