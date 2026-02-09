using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;
using System.Text.Json.Serialization;
namespace TRFSAE.MemberPortal.API.Models
{
    [Table("order_review")]
    public class OrderReviewModel : BaseModel
    {
        // TODO: Change to compound primary key to reflect database.
        [PrimaryKey("id", false)]
        public required Guid Id { get; set; }

        [Column("userId")]
        public required Guid UserId { get; set; }

        [Column("orderId")]
        public required Guid OrderId { get; set; }

        [Column("value")]
        public required bool Value { get; set; }
    }
}
