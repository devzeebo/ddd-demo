namespace TodoList.Domain;

public class Todo : IEntity
{
    public Guid Id { get; private set; } = Guid.NewGuid();

    public required string Title { get; set; }

    public required bool Completed { get; set; } = false;
}