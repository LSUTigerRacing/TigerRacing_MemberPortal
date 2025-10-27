using System.Text.Json.Serialization;

namespace TRFSAE.MemberPortal.API.DTOs
{
    public class PurchaseItemResponseDto
    {
        [JsonPropertyName("id")]
        public Guid Id { get; set; }

        [JsonPropertyName("requester")]
        public Guid Requester { get; set; }

        [JsonPropertyName("part_url")]
        public string PartUrl { get; set; } = string.Empty;

        [JsonPropertyName("part_name")]
        public string PartName { get; set; } = string.Empty;

        [JsonPropertyName("manufacturer_pt_no")]
        public int ManufacturerPtNo { get; set; }

        [JsonPropertyName("unit_price")]
        public decimal UnitPrice { get; set; }

        [JsonPropertyName("quantity")]
        public int Quantity { get; set; }

        [JsonPropertyName("supplier")]
        public string Supplier { get; set; } = string.Empty;

        [JsonPropertyName("status")]
        public string Status { get; set; } = string.Empty;

        [JsonPropertyName("notes")]
        public string? Notes { get; set; }

        [JsonPropertyName("created_at")]
        public DateTime CreatedAt { get; set; }

        [JsonPropertyName("needed_by")]
        public DateTime? NeededBy { get; set; }

        [JsonPropertyName("po_no")]
        public string? PoNumber { get; set; }

        [JsonPropertyName("order_date")]
        public DateTime? OrderDate { get; set; }

        [JsonPropertyName("order_received_date")]
        public DateTime? OrderReceivedDate { get; set; }

        [JsonPropertyName("order_active_status")]
        public string? OrderActiveStatus { get; set; }

        [JsonPropertyName("request_id")]
        public Guid? RequestId { get; set; }

        [JsonPropertyName("subtotal")]
        public decimal? Subtotal { get; set; }

        [JsonPropertyName("approvals")]
        public bool[]? Approvals { get; set; }
    }
}
