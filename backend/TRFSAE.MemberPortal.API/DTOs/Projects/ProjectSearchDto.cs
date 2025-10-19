namespace TRFSAE.MemberPortal.API.DTOs;

public class ProjectSearchDto
{
    public string ProjectName { get; set; } = null!;
    public DateTime ProjectDueDate { get; set; }
    public int ProjectMemberCount { get; set; }
    
}