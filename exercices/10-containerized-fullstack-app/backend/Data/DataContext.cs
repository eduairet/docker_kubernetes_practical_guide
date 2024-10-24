using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data;

public class DataContext : DbContext
{
    private readonly IConfiguration _config;
    private readonly string? _connectionString;

    public DataContext(IConfiguration config)
    {
        _config = config;
        _connectionString = Environment.GetEnvironmentVariable("DefaultConnection") ?? _config.GetConnectionString("DefaultConnection");
    }

    public virtual DbSet<Goal> Goals { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseSqlServer(
                _connectionString,
                optionsBuilder => optionsBuilder.EnableRetryOnFailure()
            );
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("GoalsSchema");
        modelBuilder.Entity<Goal>().ToTable("Goals").HasKey(u => u.Id);
    }
}