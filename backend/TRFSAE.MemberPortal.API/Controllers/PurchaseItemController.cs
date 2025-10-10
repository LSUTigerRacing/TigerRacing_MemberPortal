using Microsoft.AspNetCore.Mvc;
using TRFSAE.MemberPortal.API.Dtos;
using TRFSAE.MemberPortal.API.Services;

namespace TRFSAE.MemberPortal.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PurchaseItemController : ControllerBase
    {
        private readonly PurchaseItemService _svc;
        public PurchaseItemController(PurchaseItemService svc) => _svc = svc;

        // GET /api/order
        [HttpGet]
        public async Task<ActionResult<List<PurchaseItemResponseDto>>> GetAll()
            => Ok(await _svc.GetAllAsync());

        // GET /api/order/#
        [HttpGet("{id:int}")]
        public async Task<ActionResult<PurchaseItemResponseDto>> GetById(int id)
        {
            var PurchaseItem = await _svc.GetByIdAsync(id);
            return PurchaseItem is null ? NotFound() : Ok(PurchaseItem);
        }

        // POST 
        [HttpPost]
        public async Task<ActionResult<PurchaseItemResponseDto>> Create([FromBody] PurchaseItemResponseDto dto)
        {
            var created = await _svc.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        // PUT 
        [HttpPut("{id:int}")]
        public async Task<ActionResult<PurchaseItemResponseDto>> Update(int id, [FromBody] PurchaseItemResponseDto dto)
        {
            var updated = await _svc.UpdateAsync(id, dto);
            return updated is null ? NotFound() : Ok(updated);
        }

        // DELETE 
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
            => await _svc.DeleteAsync(id) ? NoContent() : NotFound();
    }
}