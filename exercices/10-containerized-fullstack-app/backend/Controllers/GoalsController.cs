using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;
using backend.Dtos;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class GoalsController(IGoalsRepository goalsRepository) : ControllerBase
{
    private readonly IGoalsRepository _repo = goalsRepository;

    [HttpGet()]
    public IEnumerable<Goal> GetGoals() => _repo.GetGoals();

    [HttpGet("{goalId}")]
    public Goal GetGoal(int goalId) => _repo.GetGoal(goalId);

    [HttpPost()]
    public IActionResult AddGoal(GoalAddDto goal) => _repo.AddGoal(goal) ? Ok() : BadRequest("Could not add goal");

    [HttpPut()]
    public IActionResult EditGoal(Goal goal) => _repo.EditGoal(goal) ? Ok() : BadRequest("Could not edit goal");

    [HttpDelete("{goalId}")]
    public IActionResult DeleteGoal(int goalId) => _repo.DeleteGoal(goalId) ? Ok() : BadRequest("Could not delete goal");
}