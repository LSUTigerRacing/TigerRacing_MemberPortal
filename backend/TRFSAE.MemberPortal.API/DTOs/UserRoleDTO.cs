using Supabase.Postgrest.Models;

namespace TRFSAE.MemberPortal.API.DTOs
{
  public class UserRoleDto : BaseModel {

    public Guid RoleID { get; set; }

    public Guid UserID {get; set; }

    public DateTime AssignedTime { get; set; }
  }
}
