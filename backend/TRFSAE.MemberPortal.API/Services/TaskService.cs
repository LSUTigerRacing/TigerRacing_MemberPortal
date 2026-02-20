using TRFSAE.MemberPortal.API.Models;
using TRFSAE.MemberPortal.API.Interfaces;
using TRFSAE.MemberPortal.API.DTOs;
using System.Text.Json;
using Supabase;

namespace TRFSAE.MemberPortal.API.Services;

public class TaskService : ITaskService
{
    private readonly Client _supabaseClient;
    public TaskService(Client supabaseClient)
    {
        _supabaseClient = supabaseClient;
    }
 
    public async Task<List<TaskDetailDto>> GetAllTasksAsync(Guid projectId)
    {
        var response = await _supabaseClient
        .From<ProjectTaskModel>()
        .Where(x => x.ProjectId == projectId)
        .Get();

        return response.Models.Select(task => new TaskDetailDto
        {
            Id = task.Id,
            ProjectId = task.ProjectId,
            AuthorId = task.AuthorId,
            AssigneeId = task.AssigneeId,
            Title = task.Title,
            Description = task.Description,
            Status = task.Status,
            Deadline = task.Deadline,
            CreatedAt = task.CreatedAt,
            UpdatedAt = task.UpdatedAt
        }).ToList();
    }

    public async Task<TaskDetailDto> GetTasksByIdAsync(Guid id)
    {
        var response = await _supabaseClient
        .From<ProjectTaskModel>()
        .Where(x => x.Id == id)
        .Single();

        if (response == null)
        {
            throw new Exception("Task not found");
        }

        var taskDetail = new TaskDetailDto
        {
            Id = response.Id,
            ProjectId = response.ProjectId,
            AuthorId = response.AuthorId,
            AssigneeId = response.AssigneeId,
            Title = response.Title,
            Description = response.Description,
            Status = response.Status,
            Deadline = response.Deadline,
            CreatedAt = response.CreatedAt,
            UpdatedAt = response.UpdatedAt
        };

        return taskDetail;
    }

    public async Task<TaskDetailDto> CreateTaskAsync(Guid projectId, CreateTaskDto createDto)
    {
        var newTask = new ProjectTaskModel
        {
            Id = Guid.NewGuid(),
            Title = createDto.Title,
            Deadline = createDto.Deadline
        };

        var response = await _supabaseClient
        .From<ProjectTaskModel>()
        .Insert(newTask);


        return new TaskDetailDto
        {
            Id = newTask.Id,
            Title = newTask.Title
        };
    }

    public async Task<TaskDetailDto> UpdateTaskAsync(Guid projectId, UpdateTaskDto createDto)
    {
        var newTask = new ProjectTaskModel
        {
            Id = Guid.NewGuid(),
            Title = createDto.Title,
            Deadline = createDto.Deadline
        };

        var response = await _supabaseClient
        .From<ProjectTaskModel>()
        .Insert(newTask);


        return new TaskDetailDto
        {
            Id = newTask.Id,
            Title = newTask.Title
        };
    }
    
    public async Task<TaskDetailDto> DeleteTaskAsync(Guid id)
    {
        await _supabaseClient
        .From<ProjectTaskModel>()
        .Where(x => x.Id == id)
        .Delete();



    }
}
