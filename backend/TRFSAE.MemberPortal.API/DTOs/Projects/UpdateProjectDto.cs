using TRFSAE.MemberPortal.API.Enums;

namespace TRFSAE.MemberPortal.API.DTOs;

public class UpdateProjectDto
{
    public string? Name { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }

    public Subsystem? Subsystem { get; set; }
    public ProjectPriority? Priority { get; set; }
    public DateTime? ProjectStartDate { get; set; }
    public DateTime? ProjectDueDate { get; set; }
}
