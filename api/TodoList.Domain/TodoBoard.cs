namespace TodoList.Domain;

public class TodoBoard : IEntity
{
    public Guid Id { get; private set; } = Guid.NewGuid();

    public required string Name { get; set; }

    public ICollection<TodoGroup> Groups { get; set; } = new List<TodoGroup>();
}