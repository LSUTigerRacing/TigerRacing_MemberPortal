using Microsoft.EntityFrameworkCore;
using TRFSAE.MemberPortal.API.Data;
using TRFSAE.MemberPortal.API.Dtos;
using TRFSAE.MemberPortal.API.Models;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TRFSAE.MemberPortal.API.Services
{
    public class OrderService
    {
        private readonly ApplicationDBContext _db;
        public OrderService(ApplicationDBContext db) => _db = db;

        private static void Apply(OrderResponseDto dto, Order model)
        {
            model.MemberId = dto.MemberId;
            model.Status = dto.Status;
            model.Total = dto.Total;
        }

        public async Task<List<OrderResponseDto>> GetAllAsync() =>
            await _db.Orders
                .Select(o => new OrderResponseDto
                {
                    Id = o.Id,
                    MemberId = o.MemberId,
                    Status = o.Status,
                    Total = o.Total,
                    CreatedAt = o.CreatedAt,
                    UpdatedAt = o.UpdatedAt
                })
                .ToListAsync();

        public async Task<OrderResponseDto?> GetByIdAsync(int id) =>
            await _db.Orders
                .Where(o => o.Id == id)
                .Select(o => new OrderResponseDto
                {
                    Id = o.Id,
                    MemberId = o.MemberId,
                    Status = o.Status,
                    Total = o.Total,
                    CreatedAt = o.CreatedAt,
                    UpdatedAt = o.UpdatedAt
                })
                .FirstOrDefaultAsync();

        public async Task<OrderResponseDto> CreateAsync(OrderResponseDto dto)
        {
            var model = new Order();
            Apply(dto, model);
            _db.Orders.Add(model);
            await _db.SaveChangesAsync();

            return new OrderResponseDto
            {
                Id = model.Id,
                MemberId = model.MemberId,
                Status = model.Status,
                Total = model.Total,
                CreatedAt = model.CreatedAt,
                UpdatedAt = model.UpdatedAt
            };
        }

        public async Task<OrderResponseDto?> UpdateAsync(int id, OrderResponseDto dto)
        {
            var model = await _db.Orders.FindAsync(id);
            if (model is null) return null;

            Apply(dto, model);
            model.UpdatedAt = DateTime.UtcNow;

            await _db.SaveChangesAsync();

            return new OrderResponseDto
            {
                Id = model.Id,
                MemberId = model.MemberId,
                Status = model.Status,
                Total = model.Total,
                CreatedAt = model.CreatedAt,
                UpdatedAt = model.UpdatedAt
            };
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var model = await _db.Orders.FindAsync(id);
            if (model is null) return false;

            _db.Orders.Remove(model);
            await _db.SaveChangesAsync();
            return true;
        }
    }
}
