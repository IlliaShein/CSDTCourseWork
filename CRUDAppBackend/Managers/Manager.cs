using AutoMapper;
using DbLib.Models.EntityFramework;

namespace CRUDAppBackend.Managers
{
    public class Manager
    {
        protected readonly MyDbContext DbContext;
        protected readonly IMapper Mapper;

        public Manager(MyDbContext dbContext, IMapper mapper)
        {
            DbContext = dbContext;
            Mapper = mapper;
        }
    }
}
