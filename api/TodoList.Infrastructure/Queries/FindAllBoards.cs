using TodoList.Domain;

namespace TodoList.Infrastructure;

public class FindAllBoards : ICollectionQuery<TodoBoard>
{
    public FindAllBoards()
    {
    }

    public IQueryable<TodoBoard> Query(IQueryable<TodoBoard> query) => query;
}