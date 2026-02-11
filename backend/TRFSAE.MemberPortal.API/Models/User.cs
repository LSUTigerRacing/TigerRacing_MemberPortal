using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;
using TRFSAE.MemberPortal.API.Enums;

namespace TRFSAE.MemberPortal.API.Models;

[Table("user")]
public class UserModel : BaseModel
{
    [PrimaryKey("id")]
    public required Guid Id { get; set; }

    [Column("name")]
    public required string Name { get; set; }

    [Column("email")]
    public required string Email { get; set; }

    [Column("role")]
    public required Role Role { get; set; } = Role.Member;

    [Column("sid")]
    public required int StudentId { get; set; }

    [Column("system")]
    public required TRSystem System { get; set; }

    [Column("subsystem")]
    public required Subsystem Subsystem { get; set; }

    [Column("shirtSize")]
    public required ShirtSize? ShirtSize { get; set; }

    [Column("hazingStatus")]
    public required bool HazingStatus { get; set; } = false;

    [Column("feeStatus")]
    public required bool FeeStatus { get; set; } = false;

    [Column("gradYear")]
    public required int GradYear { get; set; }

    [Column("createdAt")]
    public required DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [Column("updatedAt")]
    public required DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
