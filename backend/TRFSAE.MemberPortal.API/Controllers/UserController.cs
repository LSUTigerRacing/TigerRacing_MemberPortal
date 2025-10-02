using TRFSAE.MemberPortal.API.DTOs

DotNetEnv.Env.TraversePath().Load();

namespace TRFSAE.MemberPortal.API.Controllers 
{
  public class UserController 
  {
    var url = Environment.GetEnvironmentVariable("SUPABASE_URL");
    var key = Environment.GetEnvironmentVariable("SUPABASE_KEY");

    var options = new Supabase.SupabaseOptions 
    {
      AutoConnectRealtime = true;
    };

    var supabase = new SupabaseClient(url, key, options);

    public async Task<UserResponseDTO> GetUserByIDAsync(Guid id)
    {
      await supabase.InitializeAsync();
      return (await supabase
          .From<UserResponseDTO>()
          .Where(x => x.UserId == id)
          .get()
      );
    }

    public async Task<UserResponseDTO> UpdateUserAsync(Guid id, UserUpdateDTO model)
    {
      await supabase.InitializeAsync();
      return Ok(await supabase
        .From<UserUpdateDTO>().Upsert(model)
      );
    }

    public async Task<UserResponseDTO> DeleteUserAsync(Guid id)
    {
      await supabase.InitializeAsync();
      return Ok(await supabase
          .From<UserResponseDTO>()
          .Where(x => x.UserId == id)
          .Delete()
      );
    }

    public async Task<UserResponseDTO> GetUserRoles(Guid id)
    {
      await supabase.InitializeAsync();
      return (await supabase
          .From<UserRoleDTO>()
          .Where(x => x.UserId == id)
          .get()
      );
    }
  }
}
