using System.Security.Cryptography;

namespace TRFSAE.MemberPortal.API.DTOs;

public class UpdateTaskDto
{
    public Guid TaskId { get; set; }
    public string TaskName { get; set; }
    public bool Completion_Status { get; set; }
    public DateTime Due_Date { get; set; }

}
