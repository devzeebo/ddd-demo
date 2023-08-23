using Microsoft.Extensions.DependencyInjection;

namespace TodoList.App;

public static class ServiceExtensions
{
    public static IServiceCollection AddAppServices(this IServiceCollection services)
    {
        services.AddMediatR(x => x.RegisterServicesFromAssemblyContaining(typeof(ServiceExtensions)));

        return services;
    }
}