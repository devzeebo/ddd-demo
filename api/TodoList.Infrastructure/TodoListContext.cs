using Microsoft.EntityFrameworkCore;
using TodoList.Domain;

namespace TodoList.Infrastructure;
public partial class TodoListContext : DbContext
{
    public TodoListContext(DbContextOptions<TodoListContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder model)
    {
        model.Entity<Todo>();

        model.Entity<TodoGroup>(entity =>
        {
            entity
                .HasMany(x => x.Todos)
                .WithOne();
        });

        model.Entity<TodoBoard>(entity =>
        {
            entity
                .HasMany(x => x.Groups)
                .WithOne();
        });
    }
}
