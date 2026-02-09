// using System.ComponentModel.DataAnnotations.Schema;
using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

namespace TRFSAE.MemberPortal.API.Models
{
    [Table("project_user")]
    public class ProjectUserModel : BaseModel
    {
        // TODO: Change to compound primary key to reflect database.
        [PrimaryKey("id")]
        public required Guid Id { get; set; }

        [Column("projectId")]
        public required Guid ProjectId { get; set; }

        [Column("userId")]
        public required Guid UserId { get; set; }
    }
}
