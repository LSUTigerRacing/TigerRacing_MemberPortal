using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;
using System.Text.Json.Serialization;

namespace TRFSAE.MemberPortal.API.Models;

[Table("order_item")]
public class OrderItemModel : BaseModel
{
    [PrimaryKey("id", false)]
    public required Guid Id { get; set; }

    [Column("orderId")]
    public required Guid OrderId { get; set; }

    [Column("name")]
    public required string Name { get; set; }

    [Column("partNumber")]
    public required string PartNumber { get; set; }

    [Column("supplier")]
    public required string Supplier { get; set; }

    [Column("url")]
    public required string URL { get; set; }

    [Column("quantity")]
    public required int Quantity { get; set; }

    [Column("price")]
    public required decimal Price { get; set; }

    [Column("createdAt")]
    public required DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [Column("updatedAt")]
    public required DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
