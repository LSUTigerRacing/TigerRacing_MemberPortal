using TRFSAE.MemberPortal.API.DTOs;
using TRFSAE.MemberPortal.API.Controllers;
using Supabase;
using TRFSAE.MemberPortal.API.Interfaces;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http.HttpResults;
using TRFSAE.MemberPortal.API.Models;

namespace TRFSAE.MemberPortal.API.Services
{
  public class UserService : IUserService
  {
    
    private readonly Supabase.Client _supabase;

    public UserService(Supabase.Client supabase)
    {
      _supabase = supabase;
    }

    public async Task<UserResponseDTO> GetUserAsync(string name) 
    {
      var userTask = await _supabase
        .From<UserModel>()
        .Where(x => x.Name == name)
        .Get();
      userTask = JsonSerializer.Deserialize<RoleResponseDto>(userTask.Content);  
      return userTask;
    }

    public async Task<UserResponseDTO> GetUserByIDAsync(Guid userID) 
    {
      var userTask = await _supabase
        .From<UserModel>()
        .Where(x => x.UserId == userID)
        .Get();
      userTask = JsonSerializer.Deserialize<RoleResponseDto>(userTask.Content);    
      return userTask;
    }

    public async Task<IActionResult> UpdateUserAsync(Guid userID, UserUpdateDTO updateDto) 
    {
      var taskResult = await _supabase
        .From<UserModel>()
        .Where(x => x.UserId == userID)
        .Upsert(updateDto);
      taskResult = JsonSerializer.Deserialize<RoleResponseDto>(taskResult.Content);    
      return taskResult;
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

    public async Task<IActionResult> GetUserRolesAsync(Guid userID)
    {
      var userTask = await _supabase
        .From<UserModel>()
        .Where(x => x.UserId == userID)
        .Get();
      userTask = JsonSerializer.Deserialize<RoleResponseDto>(userTask.Content);    
      return userTask;
    }
  }
}
