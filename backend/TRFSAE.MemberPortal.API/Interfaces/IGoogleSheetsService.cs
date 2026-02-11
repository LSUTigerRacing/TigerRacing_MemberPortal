using System.Collections.Generic;
using System.Threading.Tasks;
using TRFSAE.MemberPortal.API.DTOs;

namespace TRFSAE.MemberPortal.API.Interfaces;

public interface IGoogleSheetsService
{
    Task<List<SheetsResponseDTO>> GetSupabase();
    Task ListenToSupabaseChangesAsync();

}
