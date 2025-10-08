using Microsoft.VisualBasic;

namespace TRFSAE.MemberPortal.API.DTOs;

public class UpdateTaskDto
{
    public Guid TaskId { get; set; }
    public string TaskName { get; set; } = null!;
    public string TaskProgress { get; set; } = null!;

}