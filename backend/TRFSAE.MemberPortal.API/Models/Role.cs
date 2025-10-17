using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

namespace TRFSAE.MemberPortal.API.Models
{
    [Table("roles")]
    public class Role : BaseModel
    {
        [PrimaryKey("id")]
        public Guid Id { get; set; }
        [Column("roleName")]
        public string RoleName { get; set; } = null!;
        [Column("permissions")]
        public Dictionary<string, object>? Permissions { get; set; }
    }
}
