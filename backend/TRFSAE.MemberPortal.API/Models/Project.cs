using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;
using TRFSAE.MemberPortal.API.Enums;

namespace TRFSAE.MemberPortal.API.Models
{
    [Table("project")]
    public class ProjectModel : BaseModel
    {
        [PrimaryKey]
        [Column("id")]
        public Guid Id { get; set; }

        [Column("authorId")]
        public Guid AuthorId { get; set; }

        [Column("name")]
        public string Name { get; set; } = "Untitled Project";

        [Column("description")]
        public string Description { get; set; } = string.Empty;

        [Column("subsystem")]
        public Subsystem Subsystem { get; set; }

        [Column("priority")]
        public ProjectPriority Priority { get; set; }

        [Column("startDate")]
        public DateTime StartDate { get; set; }

        [Column("deadline")]
        public DateTime Deadline { get; set; } 

        [Column("createdAt")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Column("updatedAt")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;  
    }
}