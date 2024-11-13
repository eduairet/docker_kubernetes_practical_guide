using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;
using backend.Dtos;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class GoalsController(IGoalsRepository goalsRepository, ILogger<GoalsController> logger) : ControllerBase
{
    private readonly ILogger<GoalsController> _logger = logger;
    private readonly IGoalsRepository _repo = goalsRepository;

    [HttpGet()]
    public IEnumerable<Goal> GetGoals()
    {
        _logger.LogInformation("Getting goals");
        return _repo.GetGoals();
    }

    [HttpGet("{goalId}")]
    public Goal GetGoal(int goalId)
    {
        _logger.LogInformation("Getting goal {goalId}", goalId);
        return _repo.GetGoal(goalId);
    }

    [HttpPost()]
    public IActionResult AddGoal(GoalAddDto goal)
    {
        _logger.LogInformation("Adding goal");
        return _repo.AddGoal(goal) ? Ok() : BadRequest("Could not add goal");
    }

    [HttpPut()]
    public IActionResult EditGoal(GoalUpdateDto goal)
    {
        _logger.LogInformation("Editing goal");
        return _repo.EditGoal(goal) ? Ok() : BadRequest("Could not edit goal");
    }

    [HttpDelete("{goalId}")]
    public IActionResult DeleteGoal(int goalId)
    {
        _logger.LogInformation("Deleting goal {goalId}", goalId);
        return _repo.DeleteGoal(goalId) ? Ok() : BadRequest("Could not delete goal");
    }
}