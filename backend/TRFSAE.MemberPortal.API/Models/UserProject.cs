using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

namespace TRFSAE.MemberPortal.API.Models
{
    [Table("project_user")]
    public class UserProjectModel: BaseModel
    {
        [Column("userId")]
        public Guid UserId { get; set; }

        [Column("projectId")]
        public Guid ProjectId { get; set; }
    }
}