namespace TRFSAE.MemberPortal.API.DTOs;

public class CreateTaskDto
{
    public required string TaskName { get; set; }
    public bool CompletionStatus { get; set; }
    public DateTime DueDate { get; set; }
    public DateTime StartDate { get; set; }

}