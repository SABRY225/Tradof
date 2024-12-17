using Microsoft.AspNetCore.Mvc;
using Tradof.ResponseHandler.Models;
using Tradof.Admin.Services.DataTransferObject.AuthenticationDto;
using Tradof.Admin.Services.Helpers;
using Tradof.Admin.Services.Interfaces;

namespace Tradof.Admin.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ApiControllerBase
    {
        #region fields
        private readonly IAuthenticationService _authenticationService;
        private readonly IHelperService _helperService;
        #endregion

        #region ctor
        public AccountController(IAuthenticationService authenticationService, IHelperService helperService)
        {
            _authenticationService = authenticationService;
            _helperService = helperService;
        }
        #endregion

        #region AddAdmin
        [Route("AddAdmin")]
        [HttpPost]
        public async Task<IActionResult> AddAdmin(RegisterAdminDto addAdminDto)
        {
            var response = await _authenticationService.AddAdminAsync(addAdminDto);
            return StatusCode(response.StatusCode, response);
        }
        #endregion

        #region Manage Roles
        [Route("CreateRole")]
        [HttpPost]
        public async Task<IActionResult> CreateRole(string roleName)
        {
            var response = await _authenticationService.CreateRoleAsync(roleName);
            return StatusCode(response.StatusCode, response);
        }

        [Route("DeleteRole")]
        [HttpPost]
        public async Task<IActionResult> DeleteRole(string roleName)
        {
            var response = await _authenticationService.DeleteRoleAsync(roleName);
            return StatusCode(response.StatusCode, response);
        }
        #endregion
    }
}