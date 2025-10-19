using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

namespace TRFSAE.MemberPortal.API.Models
{
    [Table("task")]
    public class TaskModel : BaseModel
    {
        [PrimaryKey("id")]
        public Guid TaskId { get; set; }

        [Column("assigner")]
        public string? Assigner { get; set; }

        [Column("name")]
        public string TaskName { get; set; } = "untitled task";

        [Column("completion_status")]
        public bool CompletionStatus { get; set; }

        [Column("start_date")]
        public DateTime StartDate { get; set; }

        [Column("due_date")]
        public DateTime DueDate { get; set; }

        [Column("description")]
        public string? Description { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; }
    }
}
