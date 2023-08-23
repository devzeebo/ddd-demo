namespace TodoList.Domain;

public class TodoGroup : IEntity
{
    public Guid Id { get; private set; } = Guid.NewGuid();

    public required string Name { get; set; }

    public ICollection<Todo> Todos { get; set; } = new List<Todo>();
}