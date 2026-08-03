using Com.Example.Interview.Models;
using Microsoft.EntityFrameworkCore;

namespace Com.Example.Interview.Data;

public sealed class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
    public DbSet<Comment> Comments => Set<Comment>();
}
