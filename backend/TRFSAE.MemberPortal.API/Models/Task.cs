using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

namespace TRFSAE.MemberPortal.API.Models
{
    [Table("task")]
    public class Task : BaseModel
    {
        [PrimaryKey("id", true)]
        public Guid TaskId { get; set; }

        [Column("name")]
        public string TaskName { get; set; }

        [Column("Completion_Status")]
        public bool Completion_Status { get; set; }
        
    }
}
