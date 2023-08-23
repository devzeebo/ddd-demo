using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TodoList.Domain;

namespace TodoList.Infrastructure;

public static class ServiceExtensions
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration config)
    {
        var connectionString = config.GetConnectionString("sql");

        services.AddDbContext<TodoListContext>(opts => opts.UseSqlServer(connectionString));

        services.AddScoped<IRepository>((services) => services.GetRequiredService<TodoListContext>());

        return services;
    }
}