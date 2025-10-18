using TRFSAE.MemberPortal.API.DTOs;
using Supabase;
using TRFSAE.MemberPortal.API.Interfaces;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using TRFSAE.MemberPortal.API.Models;
using Microsoft.AspNetCore.Http.HttpResults;

namespace TRFSAE.MemberPortal.API.Services
{
  public class UserService : IUserService
  {
    private readonly Client _supabase;

    public UserService(Client supabase)
    {
      _supabase = supabase;
    }

    public async Task<UserResponseDTO> GetUserAsync(string name) 
    {
      var userTask = await _supabase
        .From<UserModel>()
        .Where(x => x.Name == name)
        .Get();
      var userResponse = JsonSerializer.Deserialize<UserResponseDTO>(userTask.Content);  
      return userResponse;
    }

    public async Task<UserResponseDTO> GetUserByIDAsync(Guid userID) 
    {
      var userTask = await _supabase
        .From<UserModel>()
        .Where(x => x.UserId == userID)
        .Get();

      var userResponse = JsonSerializer.Deserialize<UserResponseDTO>(userTask.Content);  
      return userResponse;
    }

    public async Task<IActionResult> UpdateUserAsync(Guid userID, UserUpdateDTO updateDto)
    {
      var updateModel = new UserModel
      {
        Name = updateDto.Name,
        PersonalEmail = updateDto.PersonalEmail,
        LSUEmail = updateDto.LSUEmail,
        EightNine = updateDto.EightNine,
        HazingStatus = updateDto.HazingStatus,
        FeeStatus = updateDto.FeeStatus,
        GradDate = updateDto.GradDate,
        ShirtSize = updateDto.ShirtSize,
        System = updateDto.System,
        Subsystem = updateDto.Subsystem
      };


      var taskResult = await _supabase
        .From<UserModel>()
        .Where(x => x.UserId == userID)
        .Update(updateModel);
      var taskResponse = JsonSerializer.Deserialize<UserResponseDto>(taskResult.Content);    
      return Ok(taskResponse);
    }

    public async Task<IActionResult> DeleteUserAsync(Guid currentUserId, string confirmationString)
    {
        var taskResult = await _supabase
            .From<UserModel>()
            .Where(x => x.UserId == currentUserId);
        if (confirmationString == "confirm")
        {
        taskResult.Delete();
        taskResult = JsonSerializer.Deserialize<RoleResponseDto>(taskResult.Content);    
      }
      return taskResult;

    }

    public async Task<RoleResponseDto> GetUserRolesAsync(Guid userID)
    {
      var userTask = await _supabase
        .From<UserModel>()
        .Where(x => x.UserId == userID)
        .Get();
      userTask = JsonSerializer.Deserialize<RoleResponseDto>(userTask.Content);    
      return userTask;
    }

        public Task<IActionResult> UpdateUserByIDAsync(Guid userID, UserUpdateDTO updateDto)
        {
            throw new NotImplementedException();
        }

        Task<UserResponseDTO> IUserService.GetUserRolesAsync(Guid userID)
        {
            throw new NotImplementedException();
        }
    }
}
