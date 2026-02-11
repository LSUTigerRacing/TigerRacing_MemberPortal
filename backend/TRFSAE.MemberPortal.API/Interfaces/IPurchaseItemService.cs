using TRFSAE.MemberPortal.API.DTOs;

namespace TRFSAE.MemberPortal.API.Interfaces;

public interface IPurchaseItemService
{
    Task<List<PurchaseItemResponseDto>> GetAllPurchaseItemsAsync(PurchaseItemSearchDto dto);
    Task<PurchaseItemResponseDto> GetPurchaseItemByIDAsync(Guid id);
    Task<PurchaseItemResponseDto> CreatePurchaseItemAsync(PurchaseItemCreateDto dto);
    Task<PurchaseItemResponseDto> UpdatePurchaseItemByIDAsync(Guid id, PurchaseItemUpdateDto dto);
    Task<bool> DeletePurchaseItemAsync(Guid id, string confirmationString);
}
