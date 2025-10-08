using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

namespace TRFSAE.MemberPortal.API.Models
{
    [Table("tasks")]
    public class Task : BaseModel
    {
        [PrimaryKey("id", false)]
        public Guid Id { get; set; }
        [Column("taskName")]
        public string TaskName { get; set; } = null!;
        [Column("taskAllowed")]
        public Dictionary<string, object>? TaskAllowed { get; set; }
        
    }
}
