using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;
using System;

namespace TRFSAE.MemberPortal.API.Models
{
    [Table("purchase_item")]
    public class purchase_item : BaseModel
    {
        [PrimaryKey("id", false)]
        public long Id { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; }

        [Column("requester")]
        public Guid Requester { get; set; }

        [Column("part_url")]
        public string? PartUrl { get; set; }

        [Column("part_name")]
        public string? PartName { get; set; }

        [Column("manufacture_pt_no")]
        public long? ManufacturePtNo { get; set; }

        [Column("unit_price")]
        public double? UnitPrice { get; set; }

        [Column("quantity")]
        public long? Quantity { get; set; }

        [Column("supplier")]
        public string? Supplier { get; set; }

        [Column("status")]
        public string? Status { get; set; }

        [Column("notes")]
        public string? Notes { get; set; }

        [Column("needed_by")]
        public DateTime? NeededBy { get; set; }

        [Column("po_no")]
        public string? PoNo { get; set; }
    }
}
