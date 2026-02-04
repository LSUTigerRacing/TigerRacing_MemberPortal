using TRFSAE.MemberPortal.API.Enums;

namespace TRFSAE.MemberPortal.API.DTOs;
public class CreateUserDto
{
    public string Name { get; set; } = "Untitled Project";
    public string Description { get; set; } = string.Empty;
    public Subsystem Subsystem { get; set; }
    public ProjectPriority Priority { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime Deadline { get; set; }
    public string Email { get; set; } = string.Empty;
    public Role Role { get; set; }
    public int StudentId { get; set; } = -1;
    public bool CompletedHazingForm { get; set; }
    public bool PaidMemberFee { get; set; }
    public int GradDate { get; set; }
    public ShirtSize? ShirtSize { get; set; }


}