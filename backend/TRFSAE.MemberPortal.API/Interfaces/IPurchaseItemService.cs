using TRFSAE.MemberPortal.API.DTOs;

namespace TRFSAE.MemberPortal.API.Interfaces
{
    public interface IPurchaseItemService
    {
        Task<List<PurchaseItemResponseDto>> GetAllPurchaseItemsAsync();
        Task<PurchaseItemResponseDto> GetPurchaseItemByIDAsync(Guid id);
        Task<PurchaseItemResponseDto> CreatePurchaseItemAsync(PurchaseItemResponseDto dto);
        Task<PurchaseItemResponseDto> UpdatePurchaseItemByIDAsync(Guid id, PurchaseItemResponseDto dto);
        Task<bool> DeletePurchaseItemAsync(Guid id, string confirmationString);
    }
}
