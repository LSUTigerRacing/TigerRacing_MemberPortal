using Microsoft.AspNetCore.Mvc;
using TRFSAE.MemberPortal.API.DTOs;
using TRFSAE.MemberPortal.API.Interfaces;
using Supabase;

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
        public async Task<IActionResult> GetAllPurchaseItemsAsync([FromQuery] PurchaseItemSearchDto? dto)
        {
            var result = await _purchaseItemService.GetAllPurchaseItemsAsync(dto ?? new PurchaseItemSearchDto());
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPurchaseItemByIDAsync(Guid id)
        {
            var item = await _purchaseItemService.GetPurchaseItemByIDAsync(id);
            return item is null ? NotFound() : Ok(item);
        }

        [HttpPost]
        public async Task<IActionResult> CreatePurchaseItemAsync([FromBody] PurchaseItemCreateDto dto)
        {
            var created = await _purchaseItemService.CreatePurchaseItemAsync(dto);
            return Created($"/api/purchase-item/{created.Id}", created);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePurchaseItemByIDAsync(Guid id, PurchaseItemUpdateDto dto)
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
