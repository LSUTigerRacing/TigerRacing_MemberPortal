namespace TRFSAE.MemberPortal.API.DTOs;

public class UpdateProjectDto
{
    public Guid ProjectId { get; set; }
    public string ProjectName { get; set; } = null!;
    public DateTime ProjectDueDate { get; set; }
    public int ProjectMemberCount { get; set; }
    
}