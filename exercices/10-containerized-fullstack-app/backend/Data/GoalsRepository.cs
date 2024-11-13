using AutoMapper;
using backend.Models;
using backend.Dtos;

namespace backend.Data;

public class GoalsRepository(IConfiguration config) : IGoalsRepository
{
    private readonly DataContext _data = new(config);


    private readonly IMapper _mapper = new MapperConfiguration(cfg =>
    {
        cfg.CreateMap<GoalAddDto, Goal>();
    }).CreateMapper();

    private bool SaveChanges() => _data.SaveChanges() > 0;

    private void AddEntity<T>(T entity)
    {
        if (entity != null) _data.Add(entity);
    }

    private void RemoveEntity<T>(T entity)
    {
        if (entity != null) _data.Remove(entity);
    }

    public IEnumerable<Goal> GetGoals()
    {
        IEnumerable<Goal> goals = _data.Goals;
        if (goals != null) return goals;
        throw new Exception("There was an error getting the goals");
    }

    public Goal GetGoal(int goalId)
    {
        Goal? goal = _data.Goals.Where(u => u.Id == goalId).FirstOrDefault();
        if (goal != null) return goal;
        throw new Exception("Goal not found");
    }

    public bool AddGoal(GoalAddDto goal)
    {
        var userDb = _mapper.Map<Goal>(goal);
        this.AddEntity(userDb);
        return this.SaveChanges();
        throw new Exception("Could not add goal");
    }

    public bool EditGoal(GoalUpdateDto goal)
    {
        Goal? userDb = _data.Goals.Where(u => u.Id == goal.Id).FirstOrDefault();
        if (userDb != null)
        {
            userDb.Text = goal.Text;
            return this.SaveChanges();
        }
        throw new Exception("Could not edit goal");
    }

    public bool DeleteGoal(int goalId)
    {
        Goal? goalDb = _data.Goals.Where(u => u.Id == goalId).FirstOrDefault();
        if (goalDb != null)
        {
            this.RemoveEntity(goalDb);
            return this.SaveChanges();
        }
        throw new Exception("Could not delete goal");
    }
}