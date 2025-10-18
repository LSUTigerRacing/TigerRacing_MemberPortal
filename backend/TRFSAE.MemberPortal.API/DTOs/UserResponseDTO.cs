using System.Text.Json.Serialization;
using Supabase.Postgrest.Models;

namespace TRFSAE.MemberPortal.API.DTOs
{
    public class UserResponseDTO : BaseModel
    {
        [JsonPropertyName("id")]
        public Guid UserId { get; set; }

        [JsonPropertyName("name")]
        public String Name { get; set; }

        [JsonPropertyName("email")]
        public String PersonalEmail { get; set; }

        [JsonPropertyName("lsu_email")]
        public String LSUEmail { get; set; }

        [JsonPropertyName("eight_nine")]
        public int EightNine { get; set; }

        [JsonPropertyName("hazing_status")]
        public Boolean HazingStatus { get; set; }

        [JsonPropertyName("fee_status")]
        public Boolean FeeStatus { get; set; }

        [JsonPropertyName("grad_date")]
        public DateTime GradDate { get; set; }

        [JsonPropertyName("shirt_size")]
        public String ShirtSize { get; set; }

        [JsonPropertyName("system")]
        public String System { get; set; }

        [JsonPropertyName("subsystem")]
        public String Subsystem { get; set; }

        [JsonPropertyName("created_at")]
        public DateTime AccountCreationDate { get; set; }

        [JsonPropertyName("updated_at")]
        public DateTime AccountLastUpdatedDate { get; set; }
    }
}
