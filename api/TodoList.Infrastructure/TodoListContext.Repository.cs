using Microsoft.EntityFrameworkCore;
using TodoList.Domain;

namespace TodoList.Infrastructure;
public partial class TodoListContext : IRepository
{
    public new T Add<T>(T entity) where T : class, IEntity
    {
        Set<IEntity>().Add(entity);

        return entity;
    }

    public void Delete<T>(T entity) where T : class, IEntity
    {
        Set<IEntity>().Remove(entity);
    }

    public async Task<T?> Query<T>(IQuery<T> query, CancellationToken token) where T : class, IEntity
    {
        return await query.Query(Set<T>().AsQueryable())
            .FirstOrDefaultAsync(token);
    }

    public async Task<T> Query<T>(IQuery<T> query, CancellationToken token, bool required = true) where T : class, IEntity
    {
        return await query.Query(Set<T>().AsQueryable())
            .FirstAsync(token);
    }

    public async Task<IEnumerable<T>> Query<T>(ICollectionQuery<T> query, CancellationToken token) where T : class, IEntity
    {
        return await query.Query(Set<T>().AsQueryable())
            .ToListAsync(token);
    }
}
