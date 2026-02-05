using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

namespace TRFSAE.MemberPortal.API.Models;

public enum Role
{
    SuperAdmin,
    Admin,
    SystemLead,
    SubsystemLead,
    Member
}
