using Microsoft.AspNetCore.Mvc;
using TRFSAE.MemberPortal.API.DTOs;
using TRFSAE.MemberPortal.API.Interfaces;

namespace TRFSAE.MemberPortal.API.Controllers
{
    [ApiController]
    [Route("api/purchase-item")]
    public class PurchaseItemController : ControllerBase
    {
        private readonly IPurchaseItemService _purchaseItemService;

        public PurchaseItemController(IPurchaseItemService purchaseItemService)
        {
            _purchaseItemService = purchaseItemService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllPurchaseItemsAsync()
        {
            var items = await _purchaseItemService.GetAllPurchaseItemsAsync();
            return Ok(items);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPurchaseItemByIDAsync(Guid id)
        {
            var item = await _purchaseItemService.GetPurchaseItemByIDAsync(id);
            return item is null ? NotFound() : Ok(item);
        }

        [HttpPost]
        public async Task<IActionResult> CreatePurchaseItemAsync(PurchaseItemResponseDto dto)
        {
            var created = await _purchaseItemService.CreatePurchaseItemAsync(dto);
            return CreatedAtAction(nameof(GetPurchaseItemByIDAsync), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePurchaseItemByIDAsync(Guid id, PurchaseItemResponseDto dto)
        {
            var updated = await _purchaseItemService.UpdatePurchaseItemByIDAsync(id, dto);
            return updated is null ? NotFound() : Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePurchaseItemAsync(Guid id, string confirmationString)
        {
            var deleted = await _purchaseItemService.DeletePurchaseItemAsync(id, confirmationString);
            return deleted ? NoContent() : NotFound();
        }
    }
}
