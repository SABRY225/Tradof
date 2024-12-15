using AutoMapper;
using Tradof.Comman.Idenitity;
using Tradof.Admin.Services.DataTransferObject.AuthenticationDto;
namespace Tradof.Admin.Services.Mapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
         
            CreateMap<RegisterAdminDto, ApplicationUser>()
               .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Email));

            CreateMap<ApplicationUser, GetUserDto>()
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.UserName)).ReverseMap();

            //CreateMap<Customer, CustomerGetAllModel>().ReverseMap();
            //CreateMap<Customer, CustomerSearchModel>().ReverseMap();
            //CreateMap<CustomerCreateModel, Customer>().ReverseMap();

        }
    }
}
