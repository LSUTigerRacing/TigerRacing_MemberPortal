// using System.ComponentModel.DataAnnotations.Schema;
using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

namespace TRFSAE.MemberPortal.API.Models
{
    [Table("project_task")]
    public class ProjectTaskModel : BaseModel
    {
        [PrimaryKey("id")]
        public Guid Id { get; set; }

        [Column("projectId")]
        public required Guid ProjectId { get; set; }

        [Column("authorId")]
        public required Guid AuthorId { get; set; }

        [Column("assigneeId")]
        public required Guid AssigneeId { get; set; }

        [Column("name")]
        public string Name { get; set; } = "Untitled";

        [Column("description")]
        public string? Description { get; set; }

        [Column("status")]
        public required bool Status { get; set; } = false;

        [Column("deadline")]
        public required DateTime Deadline { get; set; }

        [Column("createdAt")]
        public required DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Column("updatedAt")]
        public required DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
