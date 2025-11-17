using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

namespace TRFSAE.MemberPortal.API.Models
{
    [Table("purchase_request")]
    public class PurchaseRequestModel: BaseModel
    {
        [PrimaryKey("id", false)]
        public Guid Id { get; set; }

        [Column("status")]
        public string Status { get; set; } = string.Empty;

        [Column("requester")]
        public Guid Requester { get; set; }

        [Column("created_at")]
        public DateTimeOffset CreatedAt { get; set; }

        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; }
    }
}