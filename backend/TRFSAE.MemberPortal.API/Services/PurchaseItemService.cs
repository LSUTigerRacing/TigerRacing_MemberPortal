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
        public async Task<List<PurchaseItemResponseDto>> GetAllPurchaseItemsAsync()
        {
            var response = await _supabaseClient
                .From<PurchaseItemModel>()
                .Get();

            if (response.Models == null || response.Models.Count == 0)
                return new List<PurchaseItemResponseDto>();

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

        public async Task<PurchaseItemResponseDto> CreatePurchaseItemAsync(PurchaseItemResponseDto dto)
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
        public async Task<PurchaseItemResponseDto> UpdatePurchaseItemByIDAsync(Guid id, PurchaseItemResponseDto updateDto)
        {
            var updates = new Dictionary<string, object?>();

            updates["id"] = id;
            if (updateDto.Requester != Guid.Empty) updates["requester"] = updateDto.Requester;
            if (!string.IsNullOrWhiteSpace(updateDto.PartUrl)) updates["part_url"] = updateDto.PartUrl;
            if (!string.IsNullOrWhiteSpace(updateDto.PartName)) updates["part_name"] = updateDto.PartName;
            if (updateDto.ManufacturerPtNo != 0) updates["manufacturer_pt_no"] = updateDto.ManufacturerPtNo;
            if (updateDto.UnitPrice > 0) updates["unit_price"] = updateDto.UnitPrice;
            if (updateDto.Quantity > 0) updates["quantity"] = updateDto.Quantity;
            if (!string.IsNullOrWhiteSpace(updateDto.Supplier)) updates["supplier"] = updateDto.Supplier;
            if (!string.IsNullOrWhiteSpace(updateDto.Status)) updates["status"] = updateDto.Status;
            if (updateDto.Notes != null) updates["notes"] = updateDto.Notes;
            if (updateDto.NeededBy != null) updates["needed_by"] = updateDto.NeededBy;
            if (!string.IsNullOrWhiteSpace(updateDto.PoNumber)) updates["po_no"] = updateDto.PoNumber;
            if (updateDto.OrderDate != null) updates["order_date"] = updateDto.OrderDate;
            if (updateDto.OrderReceivedDate != null) updates["order_received_date"] = updateDto.OrderReceivedDate;
            if (!string.IsNullOrWhiteSpace(updateDto.OrderActiveStatus)) updates["order_active_status"] = updateDto.OrderActiveStatus;
            if (updateDto.RequestId != null) updates["request_id"] = updateDto.RequestId;
            if (updateDto.Subtotal != null) updates["subtotal"] = updateDto.Subtotal;
            if (updateDto.Approvals != null) updates["approvals"] = updateDto.Approvals;
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

        private static PurchaseItemModel MapToModel(PurchaseItemResponseDto d)
        {
            return new PurchaseItemModel
            {
                Id = d.Id,
                Requester = d.Requester,
                PartUrl = d.PartUrl,
                PartName = d.PartName,
                ManufacturerPtNo = d.ManufacturerPtNo,
                UnitPrice = d.UnitPrice,
                Quantity = d.Quantity,
                Supplier = d.Supplier,
                Status = d.Status,
                Notes = d.Notes,
                CreatedAt = d.CreatedAt,
                NeededBy = d.NeededBy,
                PoNo = d.PoNumber,
                OrderDate = d.OrderDate,
                OrderReceivedDate = d.OrderReceivedDate,
                OrderActiveStatus = d.OrderActiveStatus,
                RequestId = d.RequestId,
                Subtotal = d.Subtotal,
                Approvals = d.Approvals
            };
        }
    }
}