using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using Tradof.Comman.Idenitity;

namespace Tradof.Admin.Services.Helpers
{
    public class HelperService : IHelperService
    {
        #region fields
        private readonly UserManager<ApplicationUser> _userManager;
        #endregion

        #region ctor
        public HelperService(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }
        #endregion

        #region GetAdmin
        public async Task<string> GetAdminAsync(ClaimsPrincipal user)
        {
            var userData = await _userManager.GetUserAsync(user);

            if (userData == null)
                return string.Empty;

            return userData.Id;
        }
        #endregion
    }
}
