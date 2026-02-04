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
}