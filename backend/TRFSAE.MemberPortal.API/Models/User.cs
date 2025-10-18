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
        public String Name { get; set; }

        [Column("email")]
        public String PersonalEmail { get; set; }

        [Column("lsu_email")]
        public String LSUEmail { get; set; }

        [Column("eight_nine")]
        public int EightNine { get; set; }

        [Column("hazing_status")]
        public Boolean HazingStatus { get; set; }

        [Column("fee_status")]
        public Boolean FeeStatus { get; set; }

        [Column("grad_date")]
        public DateTime GradDate { get; set; }

        [Column("shirt_size")]
        public String ShirtSize { get; set; }

        [Column("system")]
        public String System { get; set; }

        [Column("subsystem")]
        public String Subsystem { get; set; }

        [Column("created_at")]
        public DateTime AccountCreationDate { get; set; }

        [Column("updated_at")]
        public DateTime AccountLastUpdatedDate { get; set; }
    }
}
