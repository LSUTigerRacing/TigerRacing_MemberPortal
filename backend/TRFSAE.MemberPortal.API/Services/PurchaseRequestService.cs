using TRFSAE.MemberPortal.API.DTOs;
using TRFSAE.MemberPortal.API.Interfaces;
using TRFSAE.MemberPortal.API.Models;
using System.Text.Json;
using Supabase;

namespace TRFSAE.MemberPortal.API.Services
{
    public class PurchaseRequestService : IPurchaseRequestService
    {
        private readonly Client _supabaseClient;

        public PurchaseRequestService(Client supabaseClient)
        {
            _supabaseClient = supabaseClient;
        }

        private PurchaseRequestResponseDto MapToDto(PurchaseRequestModel model)
        {
            return new PurchaseRequestResponseDto
            {
                Id = model.Id,
                Status = model.Status,
                Requester = model.Requester,
                CreatedAt = model.CreatedAt,
                UpdatedAt = model.UpdatedAt
            };
        }

        private PurchaseRequestModel MapToModel(PurchaseRequestCreateDto dto)
        {
            return new PurchaseRequestModel
            {
                Status = dto.Status,
                Requester = dto.Requester
            };
        }

        public async Task<List<PurchaseRequestResponseDto>> GetAllPurchaseRequestsAsync(PurchaseRequestSearchDto dto)
        {
            var response = await _supabaseClient
                .From<PurchaseRequestModel>()
                .Get();

            var results = response.Models.AsEnumerable();

            if (!string.IsNullOrWhiteSpace(dto.Status))
            {
                results = results.Where(x => x.Status == dto.Status);
            }

            if (dto.Requester.HasValue && dto.Requester != Guid.Empty)
            {
                results = results.Where(x => x.Requester == dto.Requester);
            }

            return results.Select(MapToDto).ToList();
        }

        public async Task<PurchaseRequestResponseDto> GetPurchaseRequestByIDAsync(Guid id)
        {
            var response = await _supabaseClient
                .From<PurchaseRequestModel>()
                .Where(x => x.Id == id)
                .Single();

            if (response == null)
            {
                throw new Exception("Purchase request not found");
            }

            return MapToDto(response);
        }

        public async Task<PurchaseRequestResponseDto> CreatePurchaseRequestAsync(PurchaseRequestCreateDto dto)
        {
            var newModel = MapToModel(dto);
            if (newModel.Id == Guid.Empty) 
                newModel.Id = Guid.NewGuid();
            if (newModel.CreatedAt == default) 
                newModel.CreatedAt = DateTimeOffset.UtcNow;

            var response = await _supabaseClient
                .From<PurchaseRequestModel>()
                .Insert(new List<PurchaseRequestModel> { newModel });

            if (response.Models is null || response.Models.Count == 0)
                throw new Exception("Failed to create purchase request");

            return MapToDto(response.Models.First());
        }

        public async Task<PurchaseRequestResponseDto> UpdatePurchaseRequestByIDAsync(Guid id, PurchaseRequestUpdateDto dto)
        {
            var currentRequest = await _supabaseClient
                .From<PurchaseRequestModel>()
                .Where(x => x.Id == id)
                .Single();

            if (currentRequest == null)
                throw new Exception("Purchase request not found");

            if (!string.IsNullOrWhiteSpace(dto.Status))
                currentRequest.Status = dto.Status;
            
            if (dto.Requester != Guid.Empty)
                currentRequest.Requester = dto.Requester;
            
            currentRequest.UpdatedAt = DateTime.UtcNow;

            var response = await _supabaseClient
                .From<PurchaseRequestModel>()
                .Update(currentRequest);

            if (response.Models is null || response.Models.Count == 0)
                throw new Exception("Failed to update purchase request");

            return MapToDto(response.Models.First());
        }

        public async Task<bool> DeletePurchaseRequestAsync(Guid id, string confirmationString)
        {
            if (confirmationString != "confirm")
                return false;

            try
            {
                await _supabaseClient
                    .From<PurchaseRequestModel>()
                    .Where(x => x.Id == id)
                    .Delete();
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}