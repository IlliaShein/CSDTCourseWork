using Microsoft.EntityFrameworkCore;
using ReactCRUD.DB;

namespace DbLib.Models.EntityFramework
{
    public class MyDbContext : DbContext
    {
        public DbSet<Person> Person { get; set; }

        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
        {

        }
    }
}
