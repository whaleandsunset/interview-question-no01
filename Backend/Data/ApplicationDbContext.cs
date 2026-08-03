using Microsoft.EntityFrameworkCore;
using Com.Example.Interview.Models;

namespace Com.Example.Interview.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Comment> Comments { get; set; }
    }
}