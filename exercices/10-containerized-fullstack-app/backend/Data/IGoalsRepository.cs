using backend.Models;
using backend.Dtos;

namespace backend.Data;

public interface IGoalsRepository
{
    IEnumerable<Goal> GetGoals();
    Goal GetGoal(int goalId);
    bool AddGoal(GoalAddDto goal);
    bool EditGoal(Goal goal);
    bool DeleteGoal(int goalId);
}