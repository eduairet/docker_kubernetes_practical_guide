namespace LuckApi.Models;

public class Luck
{
    public int Value { get; set; }
    public string Message => Value switch
    {
        < 0 => $"You've lost {Value} luck points!",
        > 0 => $"You've gained {Value} luck points!",
        _ => "You're luck hasn't changed."
    };
}
