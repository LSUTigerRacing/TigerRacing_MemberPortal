using Microsoft.EntityFrameworkCore.Query;
using TRFSAE.MemberPortal.API.Enums;

namespace TRFSAE.MemberPortal.API.DTOs
{
    public class UserSearchDto
    {
        public string? Name { get; set; }
        public int? GradDate { get; set; }
        public string? LSUEmail { get; set; }
        public string? System { get; set; }
        public Subsystem? Subsystem { get; set; }
        public int pageNumber { get; set; } = 1;
        public int pageSize { get; set; } = 25;
        public string? Search { get; set; }
        public bool? CompletedHazingForm { get; set; }
        public bool? PaidMemberFee { get; set; }
        public ShirtSize? ShirtSize { get; set; }
    }
}
