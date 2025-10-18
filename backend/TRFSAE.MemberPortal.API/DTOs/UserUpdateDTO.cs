namespace TRFSAE.MemberPortal.API.DTOs
{
    public class UserUpdateDto
    {
        public string Name { get; set; }
        public DateTime GradDate { get; set; }
        public string PersonalEmail { get; set; }
        public string LSUEmail { get; set; }
        public int EightNine { get; set; }
        public bool HazingStatus { get; set; }
        public bool FeeStatus { get; set; }
        public string ShirtSize { get; set; }
        public string System { get; set; }
        public string Subsystem { get; set; }

    }
}
