using CRUDAppBackend.DB;
using Microsoft.EntityFrameworkCore;
using ReactCRUD.DB;

namespace DbLib.Models.EntityFramework
{
    public class MyDbContext : DbContext
    {
        public DbSet<Person> Persons { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<PersonPayment> PersonPayments { get; set; }

        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
        {

        }
    }
}
