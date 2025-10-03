namespace TRFSAE.MemberPortal.API.DTOs
{
    [Table("user")]
    public class UserUpdateDTO 
    {
        [PrimaryKey("id")]
        public Guid UserID { get; set; }

        [Column("name")]
        public String Name { get; set; }

        [Column("grad_date")]
        public int GradDate { get; set; }

        [Column("email")]
        public String PersonalEmail { get; set; }

        [Column("lsu_email")]
        public String LSUEmail { get; set; }

        [Column("eight_nine")]
        public int EightNine { get; set; }
    }
}
