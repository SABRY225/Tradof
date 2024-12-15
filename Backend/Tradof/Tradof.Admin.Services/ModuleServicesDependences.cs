using Microsoft.Extensions.DependencyInjection;
using Tradof.Admin.Services.Helpers;
using Tradof.Admin.Services.Implementation;
using Tradof.Admin.Services.Interfaces;
using Tradof.Admin.Services.Mapper;

namespace Tradof.Admin.Services
{
    public static class ModuleServicesDependences
    {
        public static IServiceCollection AddReposetoriesServices(this IServiceCollection service)
        {
            service.AddAutoMapper(typeof(MappingProfile));
            service.AddTransient<IAuthenticationService, AuthenticationService>();
            service.AddTransient<IHelperService, HelperService>();
            return service;
        }
    }
}
