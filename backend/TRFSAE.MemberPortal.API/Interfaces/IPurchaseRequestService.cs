using TRFSAE.MemberPortal.API.DTOs;

namespace TRFSAE.MemberPortal.API.Interfaces
{
    public interface IPurchaseRequestService
    {
        Task<List<PurchaseRequestResponseDto>> GetAllPurchaseRequestsAsync(PurchaseRequestSearchDto dto);
        Task<PurchaseRequestResponseDto> GetPurchaseRequestByIDAsync(Guid id);
        Task<PurchaseRequestResponseDto> CreatePurchaseRequestAsync(PurchaseRequestCreateDto dto);
        Task<PurchaseRequestResponseDto> UpdatePurchaseRequestByIDAsync(Guid id, PurchaseRequestUpdateDto dto);
        Task<bool> DeletePurchaseRequestAsync(Guid id, string confirmationString);
    }
}
