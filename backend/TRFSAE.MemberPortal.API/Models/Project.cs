using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

namespace TRFSAE.MemberPortal.API.Models
{
    [Table("project")]
    public class ProjectModel : BaseModel
    {
        [PrimaryKey]
        public Guid ProjectId { get; set; }

        [Column("name")]
        public string ProjectName { get; set; }

        [Column("due_date")]
        public DateTime ProjectDueDate { get; set; }

        [Column("member_count")]
        public int ProjectMemberCount { get; set; }

        
    }
}