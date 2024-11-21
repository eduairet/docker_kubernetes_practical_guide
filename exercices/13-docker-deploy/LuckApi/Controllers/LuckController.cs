using LuckApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace LuckApi.Controllers;

[ApiController]
[Route("[controller]")]
public class LuckController(ILogger<LuckController> logger) : ControllerBase
{
    private readonly ILogger<LuckController> _logger = logger;

    [HttpGet()]
    public Luck Get()
    {
        var rng = new Random();
        var luck = new Luck
        {
            Value = rng.Next(-5, 5)
        };

        _logger.LogInformation("Generated luck value: {Value}", luck.Value);

        return luck;
    }
}
