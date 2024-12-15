namespace Tradof.Data.Interfaces
{
    public interface IUnitOfWork
    {
        Task CommitAsync();
        IGeneralRepository<T> Repository<T>() where T : class;
    }
}
