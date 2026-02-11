using Microsoft.AspNetCore.Mvc;
using TRFSAE.MemberPortal.API.DTOs;
using TRFSAE.MemberPortal.API.Interfaces;
using Supabase;

namespace TRFSAE.MemberPortal.API.Controllers
{
    [ApiController]
    [Route("api/orders")]
    public class PurchaseItemController : ControllerBase
    {
        private readonly IPurchaseItemService _purchaseItemService;

        public PurchaseItemController(IPurchaseItemService purchaseItemService)
        {
            _purchaseItemService = purchaseItemService;
        }

        [HttpGet("list")]
        public async Task<IActionResult> GetAllPurchaseItemsAsync([FromQuery] PurchaseItemSearchDto? dto)
        {
            var result = await _purchaseItemService.GetAllPurchaseItemsAsync(dto);
            return Ok(result);
        }

        [HttpGet("fetch")]
        public async Task<IActionResult> GetPurchaseItemByIDAsync([FromQuery] Guid id)
        {
            var item = await _purchaseItemService.GetPurchaseItemByIDAsync(id);
            return item is null ? NotFound() : Ok(item);
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreatePurchaseItemAsync(PurchaseItemCreateDto dto)
        {
            var created = await _purchaseItemService.CreatePurchaseItemAsync(dto);
            return Created($"/api/purchase-item/{created.Id}", created);
        }


        [HttpPut("update")]
        public async Task<IActionResult> UpdatePurchaseItemByIDAsync([FromQuery] Guid id, PurchaseItemUpdateDto dto)
        {
            var updated = await _purchaseItemService.UpdatePurchaseItemByIDAsync(id, dto);
            return updated is null ? NotFound() : Ok(updated);
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> DeletePurchaseItemAsync([FromQuery] Guid id, string confirmationString)
        {
            var deleted = await _purchaseItemService.DeletePurchaseItemAsync(id, confirmationString);
            return deleted ? NoContent() : NotFound();
        }
    }
}
