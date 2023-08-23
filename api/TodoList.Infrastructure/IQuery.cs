using TodoList.Domain;

namespace TodoList.Infrastructure;

public interface IQuery<T> where T : class, IEntity
{
    public IQueryable<T> Query(IQueryable<T> query);
}

public interface ICollectionQuery<T> where T : class, IEntity
{
    public IQueryable<T> Query(IQueryable<T> query);
}