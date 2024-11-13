using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Serilog;
using backend.Data;
using backend.Utils;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Logging
Log.Logger = new LoggerConfiguration()
    .WriteTo.File(
        path: "Logs/log-.txt",
        rollingInterval: RollingInterval.Day,
        retainedFileCountLimit: 7,
        outputTemplate: "{Timestamp:yyyy-MM-dd HH:mm:ss} [{Level:u3}] {Message:lj}{NewLine}{Exception}"
    )
    .CreateLogger();
builder.Host.UseSerilog();

// Controllers & Routing
builder.Services.AddControllers(
    options => options.Conventions.Add(new RouteTokenTransformerConvention(new SlugifyParameterTransformer()))
);
builder.Services.AddRouting(options => options.LowercaseUrls = true);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS
builder.Services.AddCors(
    options =>
        options.AddPolicy(
            "AllowAll", b => b.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()
        )
);

// Repositories
builder.Services.AddScoped<IGoalsRepository, GoalsRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();
app.UseCors("AllowAll");
app.UseAuthorization();
app.MapControllers();
app.Run();
