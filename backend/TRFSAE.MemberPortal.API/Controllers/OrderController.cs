using Microsoft.AspNetCore.Mvc;
using TRFSAE.MemberPortal.API.Dtos;
using TRFSAE.MemberPortal.API.Services;

namespace TRFSAE.MemberPortal.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly OrderService _svc;
        public OrderController(OrderService svc) => _svc = svc;

        // GET /api/order
        [HttpGet]
        public async Task<ActionResult<List<OrderResponseDto>>> GetAll()
            => Ok(await _svc.GetAllAsync());

        // GET /api/order/#
        [HttpGet("{id:int}")]
        public async Task<ActionResult<OrderResponseDto>> GetById(int id)
        {
            var order = await _svc.GetByIdAsync(id);
            return order is null ? NotFound() : Ok(order);
        }

        // POST 
        [HttpPost]
        public async Task<ActionResult<OrderResponseDto>> Create([FromBody] OrderResponseDto dto)
        {
            var created = await _svc.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        // PUT 
        [HttpPut("{id:int}")]
        public async Task<ActionResult<OrderResponseDto>> Update(int id, [FromBody] OrderResponseDto dto)
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