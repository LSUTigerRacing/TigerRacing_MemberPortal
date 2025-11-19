namespace TRFSAE.MemberPortal.API.DTOs;

public class CreateProjectDto
{
    public string ProjectName { get; set; } = "untitled project";
    public DateTime ProjectDueDate { get; set; }
    public int ProjectMemberCount { get; set; }
    
}