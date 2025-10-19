namespace TRFSAE.MemberPortal.API.DTOs
{
    public class UserUpdateDto
    {
        public string Name { get; set; } = string.Empty;
        public DateTime? GradDate { get; set; }
        public string PersonalEmail { get; set; } = string.Empty;
        public string LSUEmail { get; set; } = string.Empty;
        public int? EightNine { get; set; }
        public bool? HazingStatus { get; set; }
        public bool? FeeStatus { get; set; }
        public string ShirtSize { get; set; } = string.Empty;
        public string System { get; set; } = string.Empty;
        public string Subsystem { get; set; } = string.Empty;
    }
}
