namespace TRFSAE.MemberPortal.API.DTOs.UserResponseDTO 
{
    public class UserResponseDTO
    {
        public Guid UserId { get; set; }
        public String Username { get; set; }
        public String FirstName { get; set; }
        public String LastName { get; set; }
        public DateTime GradYear { get; set; }
        public String PersonalEmail { get; set; }
        public String LSUEmail { get; set; }
        public int EightNine { get; set; }
        public Boolean HazingStatus { get; set; }
        public Boolean FeeStatus { get; set; }
        public Boolean QualificationStatus { get; set; }
        public String System { get; set; }
        public String Subsystem { get; set; }
        public String ShirtSize { get; set; }
        public DateTime AccountCreationDate { get; set; }
        public DateTime AccountLastUpdatedDate { get; set; }
    }
}
