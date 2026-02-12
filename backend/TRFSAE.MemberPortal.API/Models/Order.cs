using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;
using System.Text.Json.Serialization;
using TRFSAE.MemberPortal.API.Enums;

namespace TRFSAE.MemberPortal.API.Models;

[Table("order")]
public class OrderModel : BaseModel
{
    [PrimaryKey("id", false)]
    public Guid Id { get; set; }

    [Column("requesterId")]
    public Guid RequesterId { get; set; }

    [Column("name")]
    public string Name { get; set; } = null!;

    [Column("subsystem")]
    public Subsystem Subsystem { get; set; }

    [Column("status")]
    public OrderStatus Status { get; set; } = OrderStatus.Pending;

    [Column("deadline")]
    public DateTime Deadline { get; set; }

    [Column("notes")]
    public string? Notes { get; set; }

    [Column("createdAt")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [Column("updatedAt")]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
