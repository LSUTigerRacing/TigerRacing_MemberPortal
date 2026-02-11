using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;
using TRFSAE.MemberPortal.API.Enums;

namespace TRFSAE.MemberPortal.API.Models;

[Table("project")]
public class ProjectModel : BaseModel
{
    [PrimaryKey("id", false)]
    [Column("id")]
    public Guid Id { get; set; }

    [Column("authorId")]
    public required Guid AuthorId { get; set; }

    [Column("name")]
    public required string Name { get; set; } = "Untitled";

    [Column("description")]
    public string? Description { get; set; }

    [Column("subsystem")]
    public required Subsystem Subsystem { get; set; }

    [Column("priority")]
    public required ProjectPriority Priority { get; set; }

    [Column("startDate")]
    public required DateTime StartDate { get; set; }

    [Column("deadline")]
    public required DateTime Deadline { get; set; }

    [Column("createdAt")]
    public required DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [Column("updatedAt")]
    public required DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
