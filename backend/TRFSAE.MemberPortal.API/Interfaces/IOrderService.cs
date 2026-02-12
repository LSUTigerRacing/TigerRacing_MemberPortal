using TRFSAE.MemberPortal.API.DTOs;

namespace TRFSAE.MemberPortal.API.Interfaces;

public interface IOrderService
{
    Task<List<OrderResponseDto>> GetAllOrdersAsync(OrderSearchDto dto);
    Task<OrderResponseDto> GetOrderByIDAsync(Guid id);
    Task<OrderResponseDto> CreateOrderAsync(OrderCreateDto dto);
    Task<OrderResponseDto> UpdateOrderByIDAsync(Guid id, OrderUpdateDto dto);
    Task<bool> DeleteOrderAsync(Guid id, string confirmationString);
}
