using System.Text.Json.Serialization;

namespace TRFSAE.MemberPortal.API.DTOs
{
    public class SheetsResponseDTO
    {
        [JsonPropertyName("part_name")]
        public string? PartName { get; set; }

        [JsonPropertyName("supplier")]
        public string? Supplier { get; set; }

        [JsonPropertyName("unit_price")]
        public double? Price { get; set; }

        [JsonPropertyName("quantity")]
        public long? Quantity { get; set; }

        [JsonPropertyName("status")]
        public string? Status { get; set; }

        [JsonPropertyName("needed_by")]
        public DateTime? NeededBy { get; set; }

        [JsonPropertyName("notes")]
        public string? Notes { get; set; }
    }
}
