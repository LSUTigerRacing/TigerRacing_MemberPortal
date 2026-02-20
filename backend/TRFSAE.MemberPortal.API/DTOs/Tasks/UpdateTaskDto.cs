namespace TRFSAE.MemberPortal.API.DTOs;

public class UpdateTaskDto
{
    public required string Title { get; set; }
    public bool CompletionStatus { get; set; }
    public DateTime Deadline { get; set; }
}
