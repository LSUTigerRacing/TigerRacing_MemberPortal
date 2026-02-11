using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;
using TRFSAE.MemberPortal.API.Enums;

namespace TRFSAE.MemberPortal.API.Models;

[Table("user")]
public class UserModel : BaseModel
{
    [PrimaryKey("id")]
    public  Guid Id { get; set; }

    [Column("name")]
    public string Name { get; set; } = null!;

    [Column("email")]
    public string Email { get; set; } = null!;

    [Column("role")]
    public Role Role { get; set; } = Role.Member;

    [Column("sid")]
    public int StudentId { get; set; }

    [Column("system")]
    public TRSystem System { get; set; }

    [Column("subsystem")]
    public Subsystem Subsystem { get; set; }

    [Column("shirtSize")]
    public ShirtSize? ShirtSize { get; set; }

    [Column("hazingStatus")]
    public bool HazingStatus { get; set; } = false;

    [Column("feeStatus")]
    public bool FeeStatus { get; set; } = false;

    [Column("gradYear")]
    public int GradYear { get; set; }

    [Column("createdAt")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [Column("updatedAt")]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
