using Microsoft.EntityFrameworkCore;
using TRFSAE.MemberPortal.API.Models;

namespace TRFSAE.MemberPortal.API.Data
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options)
            : base(options) { }

        public DbSet<Order> Orders => Set<Order>();
    }
}