using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

namespace TRFSAE.MemberPortal.API.Models
{
    [Table("user")]
    public class UserModel: BaseModel
    {
        [PrimaryKey("id")]
        public Guid UserId { get; set; }

        [Column("name")]
        public string Name { get; set; }

        [Column("email")]
        public string PersonalEmail { get; set; }

        [Column("lsu_email")]
        public string LSUEmail { get; set; }

        [Column("eight_nine")]
        public int EightNine { get; set; }

        [Column("hazing_status")]
        public bool HazingStatus { get; set; }

        [Column("fee_status")]
        public bool FeeStatus { get; set; }

        [Column("grad_date")]
        public DateTime GradDate { get; set; }

        [Column("shirt_size")]
        public string ShirtSize { get; set; }

        [Column("system")]
        public string System { get; set; }

        [Column("subsystem")]
        public string Subsystem { get; set; }

        [Column("created_at")]
        public DateTime AccountCreationDate { get; set; }

        [Column("updated_at")]
        public DateTime AccountLastUpdatedDate { get; set; }
    }
}
