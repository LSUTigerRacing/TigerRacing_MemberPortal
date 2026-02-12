using Microsoft.AspNetCore.Mvc;
using TRFSAE.MemberPortal.API.DTOs;
using TRFSAE.MemberPortal.API.Interfaces;
using Supabase;

namespace TRFSAE.MemberPortal.API.Controllers;

[ApiController]
[Route("api/orders")]
public class OrderController : ControllerBase
{
    private readonly IOrderService _orderService;

    public OrderController(IOrderService orderService)
    {
        _orderService = orderService;
    }

    [HttpGet("list")]
    public async Task<IActionResult> GetAllOrdersAsync([FromQuery] OrderSearchDto? dto)
    {
        var result = await _orderService.GetAllOrdersAsync(dto);
        return Ok(result);
    }

    [HttpGet("fetch")]
    public async Task<IActionResult> GetOrderByIDAsync([FromQuery] Guid id)
    {
        var item = await _orderService.GetOrderByIDAsync(id);
        return item is null ? NotFound() : Ok(item);
    }

    [HttpPost("create")]
    public async Task<IActionResult> CreateOrderAsync(OrderCreateDto dto)
    {
        var created = await _orderService.CreateOrderAsync(dto);
        return Created($"/api/purchase-item/{created.Id}", created);
    }


    [HttpPut("update")]
    public async Task<IActionResult> UpdateOrderByIDAsync([FromQuery] Guid id, OrderUpdateDto dto)
    {
        var updated = await _orderService.UpdateOrderByIDAsync(id, dto);
        return updated is null ? NotFound() : Ok(updated);
    }

    [HttpDelete("delete")]
    public async Task<IActionResult> DeleteOrderAsync([FromQuery] Guid id, string confirmationString)
    {
        var deleted = await _orderService.DeleteOrderAsync(id, confirmationString);
        return deleted ? NoContent() : NotFound();
    }
}
