using System.Collections.Generic;
using System.Threading.Tasks;
using Supabase.Gotrue;
using TRFSAE.MemberPortal.API.DTOs;
using TRFSAE.MemberPortal.API.Models;

namespace TRFSAE.MemberPortal.API.Interfaces;

public interface IAuthService
{
    Boolean ValidateSupabaseToken(); 
    Task<UserModel?> GetUserFromToken();
    Task SyncUserToDatabase(); 

}