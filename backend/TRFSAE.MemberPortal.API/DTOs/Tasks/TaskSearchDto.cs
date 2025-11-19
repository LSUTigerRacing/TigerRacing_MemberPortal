using System.Security.Cryptography;

namespace TRFSAE.MemberPortal.API.DTOs;

public class TaskSearchDto
{
    public Guid TaskId { get; set; }
    public string? TaskName { get; set; }
    public bool CompletionStatus { get; set; }
    public DateTime DueDate { get; set; }

}
