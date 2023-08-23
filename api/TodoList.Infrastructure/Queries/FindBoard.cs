using Microsoft.EntityFrameworkCore;
using TodoList.Domain;

namespace TodoList.Infrastructure;

public class FindBoard : IQuery<TodoBoard>
{
    readonly string _name;

    public FindBoard(string name)
    {
        _name = name;
    }

    public IQueryable<TodoBoard> Query(IQueryable<TodoBoard> query) => query
        .Where(x => x.Name == _name)
        .Include(x => x.Groups)
            .ThenInclude(x => x.Todos);
}