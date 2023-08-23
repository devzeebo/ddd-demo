using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace TodoList.Infrastructure.EntityFramework;

public class DesignTimeContextFactor : IDesignTimeDbContextFactory<TodoListContext>
{
    public TodoListContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<TodoListContext>()
            .UseSqlServer(
                "Data Source=localhost; User ID=sa; Password=Password!1; Trust Server Certificate=true; Initial Catalog=todo-list;",
                x => x.MigrationsAssembly("TodoList.Infrastructure.EntityFramework")
            );

        return new TodoListContext(optionsBuilder.Options);
    }
}