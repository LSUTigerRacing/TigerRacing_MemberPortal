using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

namespace TRFSAE.MemberPortal.API.Models
{
    [Table("task")]
    public class Task : BaseModel
    {
        [PrimaryKey("id")]
        public Guid TaskId { get; set; }

        [Column("assigner")]
        public string Assigner { get; set; }

        [Column("name")]
        public string TaskName { get; set; }

        [Column("completion_status")]
        public bool Completion_Status { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; }

        [Column("start_date")]
        public DateTime ProjectStartDate { get; set; }

        [Column("due_date")]
        public DateTime ProjectDueDate { get; set; }

        [Column("description")]
        public string Description { get; set; }
        

    }
}
