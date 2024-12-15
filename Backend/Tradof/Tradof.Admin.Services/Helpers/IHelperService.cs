using System.Security.Claims;

namespace Tradof.Admin.Services.Helpers
{
    public interface IHelperService
    {
        public Task<string> GetAdminAsync(ClaimsPrincipal user);
    }
}
