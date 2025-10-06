namespace TRFSAE.MemberPortal.API.DTOs
{
  public class UserRoleDTO {

    public Guid RoleID { get; set; }

    public Guid UserID {get; set; }

    public DateTime AssignedTime { get; set; }
  }
}
