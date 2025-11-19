namespace TRFSAE.MemberPortal.API.DTOs;

public class UpdateProjectDto
{
    public string ProjectName { get; set; } = string.Empty;
    public DateTime? ProjectDueDate { get; set; }
    public int? ProjectMemberCount { get; set; }
    
}