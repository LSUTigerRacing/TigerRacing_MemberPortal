using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;
using TRFSAE.MemberPortal.API.Enums;

namespace TRFSAE.MemberPortal.API.Models
{
    [Table("user")]
    public class UserModel : BaseModel
    {
        [PrimaryKey("id")]
        public Guid Id { get; set; }

        [Column("name")]
        public string Name { get; set; } = string.Empty;

        [Column("email")]
        public string Email { get; set; } = string.Empty;

        [Column("role")]
        public Role Role { get; set; }

        [Column("studentId")]
        public int StudentId { get; set; } = -1;

        [Column("completedHazingForm")]
        public bool CompletedHazingForm { get; set; }

        [Column("paidMemberFee")]
        public bool PaidMemberFee { get; set; }

        [Column("gradDate")]
        public DateTime GradDate { get; set; }

        [Column("shirtSize")]
        public ShirtSize? ShirtSize { get; set; }

        [Column("subsystem")]
        public Subsystem? Subsystem { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; }

        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; }
    }
}