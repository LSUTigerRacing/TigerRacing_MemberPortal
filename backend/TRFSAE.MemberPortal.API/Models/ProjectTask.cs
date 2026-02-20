using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;
using TRFSAE.MemberPortal.API.Enums;

namespace TRFSAE.MemberPortal.API.Models;

[Table("project_task")]
public class ProjectTaskModel : BaseModel
{
    [PrimaryKey("id")]
    public Guid Id { get; set; }

    [Column("projectId")]
    public Guid ProjectId { get; set; }

    [Column("authorId")]
    public Guid AuthorId { get; set; }

    [Column("assigneeId")]
    public Guid? AssigneeId { get; set; }

    [Column("title")]
    public string Title { get; set; } = null!;

    [Column("description")]
    public string? Description { get; set; }

    [Column("status")]
    public ProjectStatus Status { get; set; }

    [Column("deadline")]
    public DateTime Deadline { get; set; }

    [Column("createdAt")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [Column("updatedAt")]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
