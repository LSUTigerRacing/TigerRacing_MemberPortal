using Microsoft.EntityFrameworkCore;
using TRFSAE.MemberPortal.API.Data;
using TRFSAE.MemberPortal.API.Dtos;
using TRFSAE.MemberPortal.API.Models;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TRFSAE.MemberPortal.API.Services
{
    public class PurchaseItemService
    {
        private readonly ApplicationDBContext _db;
        public PurchaseItemService(ApplicationDBContext db) => _db = db;

        private static void Apply(PurchaseItemResponseDto dto, PurchaseItem model)
        {
            model.MemberId = dto.MemberId;
            model.Status = dto.Status;
            model.Total = dto.Total;
        }

        public async Task<List<PurchaseItemResponseDto>> GetAllAsync() =>
            await _db.PurchaseItem
                .Select(o => new PurchaseItemResponseDto
                {
                    Id = o.Id,
                    MemberId = o.MemberId,
                    Status = o.Status,
                    Total = o.Total,
                    CreatedAt = o.CreatedAt,
                    UpdatedAt = o.UpdatedAt
                })
                .ToListAsync();

        public async Task<PurchaseItemResponseDto?> GetByIdAsync(int id) =>
            await _db.PurchaseItem
                .Where(o => o.Id == id)
                .Select(o => new PurchaseItemResponseDto
                {
                    Id = o.Id,
                    MemberId = o.MemberId,
                    Status = o.Status,
                    Total = o.Total,
                    CreatedAt = o.CreatedAt,
                    UpdatedAt = o.UpdatedAt
                })
                .FirstOrDefaultAsync();

        public async Task<PurchaseItemResponseDto> CreateAsync(PurchaseItemResponseDto dto)
        {
            var model = new PurchaseItem();
            Apply(dto, model);
            _db.PurchaseItem.Add(model);
            await _db.SaveChangesAsync();

            return new PurchaseItemResponseDto
            {
                Id = model.Id,
                MemberId = model.MemberId,
                Status = model.Status,
                Total = model.Total,
                CreatedAt = model.CreatedAt,
                UpdatedAt = model.UpdatedAt
            };
        }

        public async Task<PurchaseItemResponseDto?> UpdateAsync(int id, PurchaseItemResponseDto dto)
        {
            var model = await _db.PurchaseItem.FindAsync(id);
            if (model is null) return null;

            Apply(dto, model);
            model.UpdatedAt = DateTime.UtcNow;

            await _db.SaveChangesAsync();

            return new PurchaseItemResponseDto
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
            var model = await _db.PurchaseItem.FindAsync(id);
            if (model is null) return false;

            _db.PurchaseItem.Remove(model);
            await _db.SaveChangesAsync();
            return true;
        }
    }
}
