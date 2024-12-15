using Tradof.ResponseHandler.Models;
using Tradof.Admin.Services.DataTransferObject.AuthenticationDto;

namespace Tradof.Admin.Services.Interfaces
{
    public interface IAuthenticationService
    {
        Task<APIOperationResponse<object>> AddAdminAsync(RegisterAdminDto addAdminDto);
        Task<APIOperationResponse<object>> CreateRoleAsync(string roleName);
        Task<APIOperationResponse<object>> DeleteRoleAsync(string roleName);
        Task<APIOperationResponse<List<GetUserDto>>> GetAllAdminAsync();
        Task<APIOperationResponse<object>> ChangePasswordAsync(ChangePasswordDto changePasswordDto, string userId);
        Task<APIOperationResponse<LoginResponse>> Login(LoginRequest request);
        Task<APIOperationResponse<GetUserDto>> GetUserByIdAsync(string userId);
        Task<APIOperationResponse<object>> UpdateUserAsync(GetUserDto updateUserDto);
    }
}
