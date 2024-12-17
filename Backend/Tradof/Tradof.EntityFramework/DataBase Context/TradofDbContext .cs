using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Tradof.Comman.Idenitity;

namespace Tradof.EntityFramework.DataBase_Context
{
    public class TradofDbContext : IdentityDbContext
    {
        public TradofDbContext(DbContextOptions<TradofDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        public virtual DbSet<ApplicationUser> Users { get; set; }
    }
}