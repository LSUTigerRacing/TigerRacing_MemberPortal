using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;


namespace TRFSAE.MemberPortal.API.Models
{
    [Table("purchase_item")]
    public class PurchaseItemModel : BaseModel
    {
        [PrimaryKey("id", false)]
        public Guid Id { get; set; }

        [Column("requester")]
        public Guid? Requester { get; set; }

        [Column("part_url")]
        public string PartUrl { get; set; } = string.Empty;

        [Column("part_name")]
        public string PartName { get; set; } = string.Empty;

        [Column("manufacturer_pt_no")]
        public int ManufacturerPtNo { get; set; }

        [Column("unit_price")]
        public decimal UnitPrice { get; set; }

        [Column("quantity")]
        public int Quantity { get; set; }

        [Column("supplier")]
        public string Supplier { get; set; } = string.Empty;

        [Column("status")]
        public string Status { get; set; } = string.Empty;

        [Column("notes")]
        public string? Notes { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; }

        [Column("needed_by")]
        public DateTime? NeededBy { get; set; }

        [Column("po_no")]
        public string? PoNo { get; set; }

        [Column("order_date")]
        public DateTime? OrderDate { get; set; }

        [Column("order_received_date")]
        public DateTime? OrderReceivedDate { get; set; }

        [Column("order_active_status")]
        public string? OrderActiveStatus { get; set; }

        [Column("request_id")]
        public Guid? RequestId { get; set; }

        [Column("approvals")]
        public bool[]? Approvals { get; set; }
    }
}
