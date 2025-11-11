using TRFSAE.MemberPortal.API.DTOs;

namespace TRFSAE.MemberPortal.API.Interfaces
{
    public interface IPurchaseItemService
    {
        Task<List<PurchaseItemResponseDto>> GetAllPurchaseItemsAsync(PurchaseItemSearchDto searchDto);
        Task<PurchaseItemResponseDto> GetPurchaseItemByIDAsync(Guid id);
        Task<PurchaseItemResponseDto> CreatePurchaseItemAsync(PurchaseItemCreateDto createDto);
        Task<PurchaseItemResponseDto> UpdatePurchaseItemByIDAsync(Guid id, PurchaseItemUpdateDto updateDto);
        Task<bool> DeletePurchaseItemAsync(Guid id, string confirmationString);
    }
}
