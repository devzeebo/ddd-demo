using System.Diagnostics.CodeAnalysis;
using TodoList.Domain;

namespace TodoList.Infrastructure;

public interface IRepository
{
    public T Add<T>(T entity) where T : class, IEntity;

    public void Delete<T>(T entity) where T : class, IEntity;

    public Task<int> SaveChangesAsync(CancellationToken token);

    public Task<T?> Query<T>(IQuery<T> query, CancellationToken token) where T : class, IEntity;
    public Task<T> Query<T>(IQuery<T> query, CancellationToken token, bool required = true) where T : class, IEntity;

    public Task<IEnumerable<T>> Query<T>(ICollectionQuery<T> query, CancellationToken token) where T : class, IEntity;
}
