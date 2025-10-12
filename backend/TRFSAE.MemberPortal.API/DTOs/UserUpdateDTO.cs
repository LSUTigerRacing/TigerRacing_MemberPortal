namespace TRFSAE.MemberPortal.API.DTOs
{
    public class UserUpdateDTO 
    {
        public Guid UserID { get; set; }

        public String Name { get; set; }

        public int GradDate { get; set; }

        public String PersonalEmail { get; set; }

        public String LSUEmail { get; set; }

        public int EightNine { get; set; }
    }
}
