using Microsoft.EntityFrameworkCore.Query;
using TRFSAE.MemberPortal.API.Enums;

namespace TRFSAE.MemberPortal.API.DTOs
{
    public class UserUpdateDto
    {
        public string Name { get; set; } = string.Empty;
        public string PersonalEmail { get; set; } = string.Empty;
        public string LSUEmail { get; set; } = string.Empty;
        public int? EightNine { get; set; }
        public bool? HazingStatus { get; set; }
        public bool? FeeStatus { get; set; }
        public int GradDate { get; set; }
        public ShirtSize? ShirtSize { get; set; }
        public System System { get; set; } = string.Empty;
        public Subsystem Subsystem { get; set; }
        public Role? Role {get;set; }
        public int? StudentId {get;set; }
        
    }
}
