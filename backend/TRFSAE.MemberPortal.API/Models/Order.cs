using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;
using System.Text.Json.Serialization;
using TRFSAE.MemberPortal.API.Enums;
namespace TRFSAE.MemberPortal.API.Models
{
    [Table("order")]
    public class OrderModel : BaseModel
    {
        [PrimaryKey("id", false)]
        public required Guid Id { get; set; }

        [Column("requesterId")]
        public required Guid RequesterId { get; set; }

        [Column("name")]
        public required string Name { get; set; }

        [Column("subsystem")]
        public required Subsystem Subsystem { get; set; }

        [Column("status")]
        public required OrderStatus Status { get; set; } = OrderStatus.Pending;

        [Column("deadline")]
        public required DateTime Deadline { get; set; }

        [Column("notes")]
        public string? Notes { get; set; }

        [Column("createdAt")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Column("updatedAt")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
