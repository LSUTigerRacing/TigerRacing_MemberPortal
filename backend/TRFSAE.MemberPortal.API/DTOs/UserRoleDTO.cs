namespace TRFSAE.MemberPortal.API.DTOs
{
  [Table("user_role")]
  public class UserRoleDTO {

    [PrimaryKey("role_id")]
    public Guid RoleID { get; set; }

    [PrimaryKey("user_id")]
    public Guid UserID {get; set; }

    [Column("assigned_at")]
    public DateTime AssignedTime { get; set; }
  }
}
