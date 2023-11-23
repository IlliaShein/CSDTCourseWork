using AutoMapper;
using ReactCRUD.DB;

namespace CRUDAppBackend.DTOs
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<PersonDTO, Person>().ReverseMap();
        }
    }
}
