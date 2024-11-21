using LuckApi.Utils;
using Microsoft.AspNetCore.Mvc.ApplicationModels;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

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

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "LuckApi v1");
    c.RoutePrefix = string.Empty;
});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
