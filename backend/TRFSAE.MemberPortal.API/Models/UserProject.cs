using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

namespace TRFSAE.MemberPortal.API.Models
{
    [Table("user_project")]
    public class UserProjectModel: BaseModel
    {
        [PrimaryKey("user_id")]
        public Guid UserId { get; set; }

        [PrimaryKey("project_id")]
        public Guid ProjectId { get; set; }
    }
}