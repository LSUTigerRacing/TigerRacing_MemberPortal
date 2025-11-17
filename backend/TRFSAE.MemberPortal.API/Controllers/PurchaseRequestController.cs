using Microsoft.AspNetCore.Mvc;
using TRFSAE.MemberPortal.API.DTOs;
using TRFSAE.MemberPortal.API.Interfaces;
using Supabase;

namespace TRFSAE.MemberPortal.API.Controllers
{
    [ApiController]
    [Route("api/purchase-request")]
    public class PurchaseRequestController : ControllerBase
    {
        private readonly IPurchaseRequestService _purchaseRequestService;

        public PurchaseRequestController(IPurchaseRequestService purchaseRequestService)
        {
            _purchaseRequestService = purchaseRequestService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllPurchaseAsync([FromQuery] PurchaseRequestSearchDto? dto)
        {
            var result = await _purchaseRequestService.GetAllPurchaseRequestsAsync(dto ?? new PurchaseRequestSearchDto());
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPurchaseRequestByIDAsync(Guid id)
        {
            var item = await _purchaseRequestService.GetPurchaseRequestByIDAsync(id);
            return item is null ? NotFound() : Ok(item);
        }

        [HttpPost]
        public async Task<IActionResult> CreatePurchaseRequestAsync(PurchaseRequestCreateDto dto)
        {
            var created = await _purchaseRequestService.CreatePurchaseRequestAsync(dto);
            return CreatedAtAction(nameof(GetPurchaseRequestByIDAsync), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePurchaseRequestByIDAsync(Guid id, PurchaseRequestUpdateDto dto)
        {
            var updated = await _purchaseRequestService.UpdatePurchaseRequestByIDAsync(id, dto);
            return updated is null ? NotFound() : Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePurchaseRequestAsync(Guid id, string confirmationString)
        {
            var deleted = await _purchaseRequestService.DeletePurchaseRequestAsync(id, confirmationString);
            return deleted ? NoContent() : NotFound();
        }
    }
}
