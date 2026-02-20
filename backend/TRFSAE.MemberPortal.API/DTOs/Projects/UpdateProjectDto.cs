using TRFSAE.MemberPortal.API.Enums;

namespace TRFSAE.MemberPortal.API.DTOs;

public class UpdateProjectDto
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public Subsystem? Subsystem { get; set; }
    public ProjectPriority? Priority { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? Deadline { get; set; }
}
