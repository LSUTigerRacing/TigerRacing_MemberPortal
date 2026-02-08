using TRFSAE.MemberPortal.API.DTOs;
using TRFSAE.MemberPortal.API.Interfaces;
using TRFSAE.MemberPortal.API.Models;
using TRFSAE.MemberPortal.API.Enums;
using System.Text.Json;
using Supabase;
using Supabase.Gotrue;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.CodeDom;

namespace TRFSAE.MemberPortal.API.Services
{
    public class UserService : IUserService
    {
        private readonly Supabase.Client _supabaseClient;
        

        public UserService(Supabase.Client supabaseClient)
        {
            _supabaseClient = supabaseClient;
        }

        public async Task<IEnumerable<UserSummaryDto>> GetAllUsersAsync(
            int pageNumber,
            int pageSize,
            string? search,
            bool? completedHazingForm,
            bool? paidMemberFee,
            int? gradDate,
            ShirtSize? shirtSize,
            Subsystem? subsystem
        )
        {
            var query = _supabaseClient.From<UserModel>();

            if (!string.IsNullOrEmpty(search))
            {
                query = (Supabase.Interfaces.ISupabaseTable<UserModel, Supabase.Realtime.RealtimeChannel>)
                query.Where(u => u.Name == search);
            }

            if (completedHazingForm != null)
            {
                query = (Supabase.Interfaces.ISupabaseTable<UserModel, Supabase.Realtime.RealtimeChannel>)
                query.Where(u => u.CompletedHazingForm == completedHazingForm);
            }

            if (paidMemberFee != null)
            {
                query = (Supabase.Interfaces.ISupabaseTable<UserModel, Supabase.Realtime.RealtimeChannel>)
                query.Where(u => u.PaidMemberFee == paidMemberFee);
            }

            if (gradDate != null)
            {
                query = (Supabase.Interfaces.ISupabaseTable<UserModel, Supabase.Realtime.RealtimeChannel>)
                query.Where(u => u.GradDate == gradDate);
            }

            if (shirtSize != null)
            {
                query = (Supabase.Interfaces.ISupabaseTable<UserModel, Supabase.Realtime.RealtimeChannel>)
                query.Where(u => u.ShirtSize == shirtSize);
            }

            if (subsystem != null)
            {
                query = (Supabase.Interfaces.ISupabaseTable<UserModel, Supabase.Realtime.RealtimeChannel>)
                query.Where(u => u.Subsystem == subsystem);
            }

            var response = await query
                .Order(u => u.CreatedAt, Supabase.Postgrest.Constants.Ordering.Ascending)
                .Range((pageNumber - 1) * pageSize, pageNumber * pageSize - 1)
                .Select("id,name,email,gradDate,subsystem")
                .Get();
            
            var userSummaries = response.Models.Select(u => new UserSummaryDto
            {
                Id = u.Id,
                Name = u.Name,
                Email = u.Email,
                GradDate = u.GradDate,
                Subsystem = u.Subsystem
            });

            return userSummaries;
        }

        public async Task<UserDetailDto> GetUserByIDAsync(Guid id)
        {
            var response = await _supabaseClient
              .From<UserModel>()
              .Select("*")
              .Where(x => x.Id == id)
              .Single();

            if (response == null)
            {
                throw new Exception("User not found");
            }

            var userDetail = new UserDetailDto
            {
                Id = response.Id,
                Name = response.Name,
                Email = response.Email,
                GradDate = response.GradDate,
                Subsystem = response.Subsystem
            };

            return userDetail;
        }

        public async Task<CreateUserResponse> CreateUserAsync(CreateUserDto createDto)
        {
            var userId = Guid.NewGuid();

            var newUser = new UserModel
            {
                Id = userId,
                Name = createDto.Name,
                Email = createDto.Email,
                Role = createDto.Role,
                StudentId = createDto.StudentId,
                CompletedHazingForm = createDto.CompletedHazingForm,
                PaidMemberFee = createDto.PaidMemberFee,
                GradDate = createDto.GradDate,
                ShirtSize = createDto.ShirtSize,
                Subsystem = createDto.Subsystem,
                CreatedAt = DateTime.UtcNow,
            };

            try
            {
                var response = await _supabaseClient
                    .From<UserModel>()
                    .Insert(newUser);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error creating user: {ex.Message}");
                throw;
            }

            return new CreateUserResponse
            {
                Location = $"/api/users/{userId}"
            };
        }


        public async Task<UserResponseDto> UpdateUserByIdAsync(Guid userID, UserUpdateDto updateDto)
        {
            try
            {
                var model = await _supabaseClient.From<UserModel>()
                    .Where(u => u.Id == userID)
                    .Single();

                if (model == null)
                {
                    throw new Exception($"User with ID {userID} not found");
                }
                if (!string.IsNullOrEmpty(updateDto.Name))
                {
                    model.Name = updateDto.Name;
                }
                if (!string.IsNullOrEmpty(updateDto.LSUEmail))
                {
                    model.Email = updateDto.LSUEmail;
                }
                if (updateDto.Role.HasValue)
                {
                    model.Role = updateDto.Role.Value;
                }
                if (updateDto.StudentId.HasValue)
                {
                    model.StudentId = updateDto.StudentId.Value;
                }
                if (updateDto.HazingStatus.HasValue)
                {
                    model.CompletedHazingForm = updateDto.HazingStatus.Value;
                }
                if (updateDto.FeeStatus.HasValue)
                {
                    model.PaidMemberFee = updateDto.FeeStatus.Value;
                }
                if (updateDto.GradDate.HasValue)
                {
                    model.GradDate = updateDto.GradDate.Value;
                }
                if (updateDto.ShirtSize.HasValue)
                {
                    model.ShirtSize = updateDto.ShirtSize;
                }
                if (updateDto.Subsystem.HasValue)
                {
                    model.Subsystem = updateDto.Subsystem;
                }
                model.UpdatedAt = DateTime.UtcNow;

                var response = await _supabaseClient
                    .From<UserModel>()
                    .Where(u => u.Id == userID)
                    .Update(model);

                return new UserResponseDto
                {
                    UserId = userID,
                    Name = model.Name,
                    LSUEmail = model.Email,
                    Role = model.Role,
                    StudentId = model.StudentId,
                    HazingStatus = model.CompletedHazingForm,
                    FeeStatus = model.PaidMemberFee,
                    GradDate = model.GradDate,
                    ShirtSize = model.ShirtSize,
                    Subsystem = model.Subsystem

                };
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error attempting update: {ex.Message}");
                throw;
            }
        }

        public async Task<bool> DeleteUserAsync(Guid userId, string confirmationString)
        {
            if (confirmationString != "confirm")
            {
                return false;
            }
            // Console.WriteLine("Attempting to delete user with ID: " + userId);
            try
            {
                await _supabaseClient
                  .From<UserModel>()
                  .Where(x => x.Id == userId)
                  .Delete();

                return true;

            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
                return false;
            }
        }
    }
}