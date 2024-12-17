using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Tradof.Comman.Enums;
using Tradof.Comman.Idenitity;
using Tradof.Data.Interfaces;
using Tradof.Repository.Repository;
using Tradof.ResponseHandler.Consts;
using Tradof.ResponseHandler.Models;
using Tradof.Admin.Services.DataTransferObject.AuthenticationDto;
using Tradof.Admin.Services.Interfaces;

namespace Tradof.Admin.Services.Implementation
{
    public class AuthenticationService : IAuthenticationService
    {
        #region fields
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        #endregion

        #region ctor
        public AuthenticationService(UserManager<ApplicationUser> userManager,
            UnitOfWork unitOfWork, IMapper mapper, IConfiguration configuration, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
            _mapper = mapper;
            _configuration = configuration;
            _roleManager = roleManager;
        }
        #endregion

        #region AddAdmin
        public async Task<APIOperationResponse<object>> AddAdminAsync(RegisterAdminDto addAdminDto)
        {
            try
            {
                var adminRole = UserType.Admin.ToString();
                var adminRoleExists = await _roleManager.RoleExistsAsync(adminRole);
                if (!adminRoleExists)
                {
                    return APIOperationResponse<object>.BadRequest(
                        "The 'Admin' role does not exist. Please create the role before registering an admin user.");
                }

                var newUser = _mapper.Map<ApplicationUser>(addAdminDto);
                newUser.UserType = UserType.Admin;
                IdentityResult result = await _userManager.CreateAsync(newUser, addAdminDto.Password);

                if (!result.Succeeded)
                {
                    var errors = result.Errors.Select(e => e.Description).ToList();
                    return APIOperationResponse<object>.BadRequest(
                        "Failed to register the admin user. Please check the provided details.", errors);
                }

                await _userManager.AddToRoleAsync(newUser, adminRole);
                return APIOperationResponse<object>.Created("Admin user created successfully.");
            }
            catch (Exception ex)
            {
                return APIOperationResponse<object>.ServerError(
                    "An error occurred while registering the admin user.", new List<string> { ex.Message });
            }
        }
        #endregion

        #region CreateRole
        public async Task<APIOperationResponse<object>> CreateRoleAsync(string roleName)
        {
            try
            {
                if (await _roleManager.RoleExistsAsync(roleName))
                    return APIOperationResponse<object>.BadRequest("Role already exists.");

                var result = await _roleManager.CreateAsync(new IdentityRole(roleName));
                if (!result.Succeeded)
                {
                    var errors = result.Errors.Select(e => e.Description).ToList();
                    return APIOperationResponse<object>.ServerError("Failed to create role.", errors);
                }

                return APIOperationResponse<object>.Created("Role created successfully.");
            }
            catch (Exception ex)
            {
                return APIOperationResponse<object>.ServerError(
                    "An error occurred while creating the role.", new List<string> { ex.Message });
            }
        }
        #endregion

        #region DeleteRole
        public async Task<APIOperationResponse<object>> DeleteRoleAsync(string roleName)
        {
            try
            {
                var role = await _roleManager.FindByNameAsync(roleName);
                if (role == null)
                    return APIOperationResponse<object>.BadRequest("Role not found.");

                var result = await _roleManager.DeleteAsync(role);
                if (!result.Succeeded)
                {
                    var errors = result.Errors.Select(e => e.Description).ToList();
                    return APIOperationResponse<object>.ServerError("Failed to delete role.", errors);
                }

                return APIOperationResponse<object>.Deleted("Role deleted successfully.");
            }
            catch (Exception ex)
            {
                return APIOperationResponse<object>.ServerError(
                    "An error occurred while deleting the role.", new List<string> { ex.Message });
            }
        }
        #endregion

        #region GetAllAdmin
        public async Task<APIOperationResponse<List<GetUserDto>>> GetAllAdminAsync()
        {
            return await GetUsersByTypeAsync(UserType.Admin);
        }
        #endregion

        #region ChangePassword
        public async Task<APIOperationResponse<object>> ChangePasswordAsync(ChangePasswordDto changePasswordDto, string userId)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(userId);
                if (user == null)
                {
                    return APIOperationResponse<object>.NotFound("User not found.");
                }

                var result = await ChangeUserPasswordAsync(user, changePasswordDto);
                if (!result.Succeeded)
                {
                    return APIOperationResponse<object>.BadRequest("Password change failed.", result.Errors);
                }

                return APIOperationResponse<object>.Success("Password changed successfully.");
            }
            catch (Exception ex)
            {
                return APIOperationResponse<object>.ServerError("An error occurred while changing the password.", new List<string> { ex.Message });
            }
        }
        #endregion

        #region GetUserById or profile
        public async Task<APIOperationResponse<GetUserDto>> GetUserByIdAsync(string userId)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(userId);
                if (user == null)
                {
                    return APIOperationResponse<GetUserDto>.NotFound("User not found.");
                }

                var usersDto = _mapper.Map<GetUserDto>(user);

                return APIOperationResponse<GetUserDto>.Success(usersDto, "users were successfully retrieved.");
            }
            catch (Exception ex)
            {
                return APIOperationResponse<GetUserDto>.ServerError("An error occurred while retrieving  users.", new List<string> { ex.Message });
            }
        }
        #endregion

        #region UpdateUser
        public async Task<APIOperationResponse<object>> UpdateUserAsync(GetUserDto updateUserDto)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(updateUserDto.Id);
                if (user == null)
                {
                    return APIOperationResponse<object>.NotFound("User not found.");
                }
                _mapper.Map(updateUserDto, user);
                var result = await _userManager.UpdateAsync(user);
                if (!result.Succeeded)
                {
                    var errors = result.Errors.Select(e => e.Description).ToList();
                    return APIOperationResponse<object>.BadRequest("Failed to update user.", errors);
                }

                return APIOperationResponse<object>.Success("User updated successfully.");
            }
            catch (Exception ex)
            {
                return APIOperationResponse<object>.ServerError("An error occurred while updating the user.", new List<string> { ex.Message });
            }
        }
        #endregion

        #region private method
        private async Task<APIOperationResponse<List<GetUserDto>>> GetUsersByTypeAsync(UserType userType)
        {
            try
            {
                var users = await _userManager.Users.Where(u => u.UserType == userType).ToListAsync();
                if (!users.Any())
                {
                    return APIOperationResponse<List<GetUserDto>>.NoContent();
                }

                var usersDto = _mapper.Map<List<GetUserDto>>(users);

                return APIOperationResponse<List<GetUserDto>>.Success(usersDto, $"{userType} users were successfully retrieved.");
            }
            catch (Exception ex)
            {
                return APIOperationResponse<List<GetUserDto>>.ServerError($"An error occurred while retrieving {userType} users.", new List<string> { ex.Message });
            }
        }
        private async Task<(bool Succeeded, List<string> Errors)> ChangeUserPasswordAsync(ApplicationUser user, ChangePasswordDto dto)
        {
            var changePasswordResult = await _userManager.ChangePasswordAsync(user, dto.OldPassword, dto.NewPassword);

            if (!changePasswordResult.Succeeded)
            {
                var errors = changePasswordResult.Errors.Select(e => e.Description).ToList();
                return (false, errors);
            }

            return (true, null);
        }
        #endregion

        #region login
        public async Task<APIOperationResponse<LoginResponse>> Login(LoginRequest request)
        {


            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user != null)
            {
                
                var isVaild = await _userManager.CheckPasswordAsync(user, request.Password);
                if (isVaild)
                {
                    var token = await GenerateJwtTokenAsync(user);
                    var APIOperationResponse = new LoginResponse(token);
                    return APIOperationResponse<LoginResponse>.Success(APIOperationResponse);
                }
            }
            return APIOperationResponse<LoginResponse>.Fail(ResponseType.NotFound, CommonErrorCodes.INVALID_EMAIL_OR_PASSWORD);

        }
        private async Task<string> GenerateJwtTokenAsync(ApplicationUser user)
            {
                //Token claims
                var claims = new List<Claim>()
                    {
                        new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                        new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName! ),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    };
                // Get user roles
                var roles = await _userManager.GetRolesAsync(user);
                foreach (var role in roles)
                {
                    claims.Add(new Claim("roles", role));
                }

                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));
                var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

              
                JwtSecurityToken token = new (
                    issuer: _configuration["JWT:ValidIssuer"],
                    audience: _configuration["JWT:ValidAudience"],
                    claims: claims,
                    expires: DateTime.Now.AddDays(10),
                    signingCredentials: signingCredentials
                    );

                return new JwtSecurityTokenHandler().WriteToken(token);
            }
            #endregion
    }
}
