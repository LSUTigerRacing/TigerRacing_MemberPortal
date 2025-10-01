using Supabase;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// register Supabase client as a singleton for reuse across project
builder.Services.AddSingleton(provider =>
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

var app = builder.Build();

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
