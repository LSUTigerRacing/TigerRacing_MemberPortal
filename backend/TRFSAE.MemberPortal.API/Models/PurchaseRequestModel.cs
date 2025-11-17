using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

namespace TRFSAE.MemberPortal.API.Models
{
    [Table("purchase_request")]
    public class PurchaseRequestModel: BaseModel
    {
    [PrimaryKey("id", false)]
    public Guid Id { get; set; }

    public string Status { get; set; } = string.Empty;

    public Guid Requester { get; set; }

    public DateTimeOffset CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
    }
}