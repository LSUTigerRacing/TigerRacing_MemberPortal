using Supabase;
using Scalar.AspNetCore;
using TRFSAE.MemberPortal.API.Interfaces;
using TRFSAE.MemberPortal.API.Services;
using dotenv.net;

DotEnv.Load();

var builder = WebApplication.CreateBuilder(args);
{
    builder.Services.AddScoped<IRoleService, RoleService>();
    builder.Services.AddScoped<ITaskService, TaskService>();
    builder.Services.AddScoped<IProjectService, ProjectService>();
}

// register Supabase client as scoped for reuse across project
builder.Services.AddScoped(provider =>
{
    var options = new SupabaseOptions
    {
        AutoConnectRealtime = true,
        AutoRefreshToken = true,
    };

    var url = builder.Configuration["SupabaseUrl"] ?? throw new InvalidOperationException("Supabase URL is not configured.");
    var key = builder.Configuration["SupabaseKey"] ?? throw new InvalidOperationException("Supabase Key is not configured.");

    var client = new Client(url, key, options);

    // Synchronously initialize the client
    client.InitializeAsync().GetAwaiter().GetResult();

    return client;
});

// register Supabase client as a singleton for reuse across project
builder.Services.AddScoped(provider =>
{
    var options = new SupabaseOptions
    {
        AutoConnectRealtime = true,
        AutoRefreshToken = true,
    };

    var url = builder.Configuration["SupabaseUrl"] ?? throw new InvalidOperationException("Supabase URL is not configured.");
    var key = builder.Configuration["SupabaseKey"] ?? throw new InvalidOperationException("Supabase Key is not configured.");
    return new Client(url, key, options);
});

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi();
builder.Services.AddControllers();

// CORS stuff
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

app.UseCors("AllowReactApp");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
