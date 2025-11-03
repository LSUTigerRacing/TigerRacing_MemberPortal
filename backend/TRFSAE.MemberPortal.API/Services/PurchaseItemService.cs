using TRFSAE.MemberPortal.API.DTOs;
using TRFSAE.MemberPortal.API.Interfaces;
using TRFSAE.MemberPortal.API.Models;
using System.Text.Json;
using Supabase;

namespace TRFSAE.MemberPortal.API.Services
{
    public class PurchaseItemService : IPurchaseItemService
    {
        private readonly Client _supabaseClient;

        public PurchaseItemService(Client supabaseClient)
        {
            _supabaseClient = supabaseClient;
        }
        public async Task<List<PurchaseItemResponseDto>> GetAllPurchaseItemsAsync(PurchaseItemSearchDto dto)
        {
            var response = await _supabaseClient
        .From<PurchaseItemModel>()
        .Get();
            return response.Models.Select(MapToDto).ToList();
        }

        public async Task<PurchaseItemResponseDto> GetPurchaseItemByIDAsync(Guid id)
        {
            var response = await _supabaseClient
              .From<PurchaseItemModel>()
              .Where(x => x.Id == id)
              .Single();

            if (response == null)
            {
                throw new Exception("Purchase item not found");
            }

            return MapToDto(response);
        }

        public async Task<PurchaseItemResponseDto> CreatePurchaseItemAsync(PurchaseItemCreateDto dto)
        {
            var newModel = MapToModel(dto);
            if (newModel.Id == Guid.Empty) newModel.Id = Guid.NewGuid();
            if (newModel.CreatedAt == default) newModel.CreatedAt = DateTime.UtcNow;

            var insert = await _supabaseClient
                .From<PurchaseItemModel>()
                .Insert(newModel);

            if (insert.Models is null || insert.Models.Count == 0)
                throw new Exception("Failed to create purchase item");

            return MapToDto(insert.Models.First());
        }
        public async Task<PurchaseItemResponseDto> UpdatePurchaseItemByIDAsync(Guid id, PurchaseItemUpdateDto dto)
        {
            var updates = new Dictionary<string, object?>();

            updates["id"] = id;
            if (dto.Requester != Guid.Empty) updates["requester"] = dto.Requester;
            if (!string.IsNullOrWhiteSpace(dto.PartUrl)) updates["part_url"] = dto.PartUrl;
            if (!string.IsNullOrWhiteSpace(dto.PartName)) updates["part_name"] = dto.PartName;
            if (dto.ManufacturerPtNo != 0) updates["manufacturer_pt_no"] = dto.ManufacturerPtNo;
            if (dto.UnitPrice > 0) updates["unit_price"] = dto.UnitPrice;
            if (dto.Quantity > 0) updates["quantity"] = dto.Quantity;
            if (!string.IsNullOrWhiteSpace(dto.Supplier)) updates["supplier"] = dto.Supplier;
            if (!string.IsNullOrWhiteSpace(dto.Status)) updates["status"] = dto.Status;
            if (dto.Notes != null) updates["notes"] = dto.Notes;
            if (dto.NeededBy != null) updates["needed_by"] = dto.NeededBy;
            if (!string.IsNullOrWhiteSpace(dto.PoNumber)) updates["po_no"] = dto.PoNumber;
            if (dto.OrderDate != null) updates["order_date"] = dto.OrderDate;
            if (dto.OrderReceivedDate != null) updates["order_received_date"] = dto.OrderReceivedDate;
            if (!string.IsNullOrWhiteSpace(dto.OrderActiveStatus)) updates["order_active_status"] = dto.OrderActiveStatus;
            if (dto.RequestId != null) updates["request_id"] = dto.RequestId;
            if (dto.Subtotal != null) updates["subtotal"] = dto.Subtotal;
            if (dto.Approvals != null) updates["approvals"] = dto.Approvals;
            updates["updated_at"] = DateTime.UtcNow;

            var rpc = await _supabaseClient
                .Rpc("update_purchase_item", new { updates });

            var updated = JsonSerializer.Deserialize<List<PurchaseItemResponseDto>>(rpc.Content ?? "[]");

            if (updated == null)
                throw new Exception("Purchase item not found or update failed");

            return updated.FirstOrDefault() ?? new PurchaseItemResponseDto();
        }

        public async Task<bool> DeletePurchaseItemAsync(Guid id, string confirmationString)
        {
            if (confirmationString != "confirm")
                return false;

            try
            {
                await _supabaseClient
                  .From<PurchaseItemModel>()
                  .Where(x => x.Id == id)
                  .Delete();
                return true;
            }
            catch
            {
                return false;
            }
        }

        private static PurchaseItemResponseDto MapToDto(PurchaseItemModel m)
        {
            return new PurchaseItemResponseDto
            {
                Id = m.Id,
                Requester = m.Requester,
                PartUrl = m.PartUrl,
                PartName = m.PartName,
                ManufacturerPtNo = m.ManufacturerPtNo,
                UnitPrice = m.UnitPrice,
                Quantity = m.Quantity,
                Supplier = m.Supplier,
                Status = m.Status,
                Notes = m.Notes,
                CreatedAt = m.CreatedAt,
                NeededBy = m.NeededBy,
                PoNumber = m.PoNo,
                OrderDate = m.OrderDate,
                OrderReceivedDate = m.OrderReceivedDate,
                OrderActiveStatus = m.OrderActiveStatus,
                RequestId = m.RequestId,
                Subtotal = m.Subtotal,
                Approvals = m.Approvals
            };
        }

        private static PurchaseItemModel MapToModel(PurchaseItemCreateDto d)
        {
            return new PurchaseItemModel
            {
                Requester = d.Requester,
                PartUrl = d.PartUrl,
                PartName = d.PartName,
                ManufacturerPtNo = d.ManufacturerPtNo,
                UnitPrice = d.UnitPrice,
                Quantity = d.Quantity,
                Supplier = d.Supplier,
                Status = d.Status,
                Notes = d.Notes,
                NeededBy = d.NeededBy,
                OrderActiveStatus = d.OrderActiveStatus,
                RequestId = d.RequestId,
                Subtotal = d.Subtotal,
                Approvals = d.Approvals
            };
        }
    }
}