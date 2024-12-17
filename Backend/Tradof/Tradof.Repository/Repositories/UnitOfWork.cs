using Tradof.Data.Interfaces;
using Tradof.EntityFramework.DataBase_Context;

namespace Tradof.Repository.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly TradofDbContext _context;

        public UnitOfWork(TradofDbContext context)
        {
            _context = context;
        }

        public async Task CommitAsync()
        {
            await _context.SaveChangesAsync();
        }

        public IGeneralRepository<T> Repository<T>() where T : class
        {
            throw new NotImplementedException();
        }
    }
}
