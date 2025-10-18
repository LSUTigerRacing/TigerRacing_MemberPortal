using System.Text.Json.Serialization;
using Supabase.Postgrest.Models;

namespace TRFSAE.MemberPortal.API.DTOs
{
    public class UserResponseDto
    {
        [JsonPropertyName("id")]
        public Guid UserId { get; set; }

        [JsonPropertyName("name")]
        public required string Name { get; set; }

        [JsonPropertyName("email")]
        public required string PersonalEmail { get; set; }

        [JsonPropertyName("lsu_email")]
        public required string LSUEmail { get; set; }

        [JsonPropertyName("eight_nine")]
        public int EightNine { get; set; }

        [JsonPropertyName("hazing_status")]
        public bool HazingStatus { get; set; }

        [JsonPropertyName("fee_status")]
        public bool FeeStatus { get; set; }

        [JsonPropertyName("grad_date")]
        public DateTime GradDate { get; set; }

        [JsonPropertyName("shirt_size")]
        public string? ShirtSize { get; set; }

        [JsonPropertyName("system")]
        public string? System { get; set; }

        [JsonPropertyName("subsystem")]
        public string? Subsystem { get; set; }

        [JsonPropertyName("created_at")]
        public DateTime AccountCreationDate { get; set; }

        [JsonPropertyName("updated_at")]
        public DateTime AccountLastUpdatedDate { get; set; }
    }
}
